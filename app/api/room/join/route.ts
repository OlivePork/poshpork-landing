import { NextResponse } from "next/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

/**
 * Join a room. No account needed — the player is identified by a token
 * their own browser generates and keeps.
 *
 * POST /api/room/join
 *   { "code": "BKQR47", "name": "Ana", "device_token": "...", "table_id": "..." }
 *
 * Called twice: once to look up the room and its tables (name omitted),
 * and again to take a seat.
 */
export async function POST(req: Request) {
  let body: { code?: string; name?: string; device_token?: string; table_id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const code = normaliseCode(body.code);
  if (code.length < 4) {
    return NextResponse.json({ error: "Enter the room code." }, { status: 400 });
  }

  const admin = roomAdmin();

  const { data: room } = await admin
    .from("rooms")
    .select("id, code, name, status, expires_at")
    .eq("code", code)
    .maybeSingle();

  if (!room) {
    return NextResponse.json({ error: "No room with that code." }, { status: 404 });
  }

  if (new Date(room.expires_at) < new Date()) {
    return NextResponse.json({ error: "That room has closed." }, { status: 410 });
  }

  const { data: tables } = await admin
    .from("room_tables")
    .select("id, name, colour, max_seats")
    .eq("room_id", room.id)
    .order("name");

  // Seat counts, so a full table can be shown as full.
  const { data: seated } = await admin
    .from("room_players")
    .select("table_id")
    .eq("room_id", room.id);

  const taken: Record<string, number> = {};
  for (const p of seated ?? []) {
    if (p.table_id) taken[p.table_id] = (taken[p.table_id] ?? 0) + 1;
  }

  const tableList = (tables ?? []).map((t) => ({
    ...t,
    seats_taken: taken[t.id] ?? 0,
  }));

  // Lookup only.
  if (!body.name || !body.device_token) {
    return NextResponse.json({
      room: { id: room.id, code: room.code, name: room.name, status: room.status },
      tables: tableList,
    });
  }

  const name = body.name.trim().slice(0, 40);
  if (!name) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }

  // Upsert on device_token, so a refresh rejoins rather than duplicating.
  const { data: player, error } = await admin
    .from("room_players")
    .upsert(
      {
        room_id: room.id,
        device_token: body.device_token,
        name,
        table_id: body.table_id ?? null,
      },
      { onConflict: "room_id,device_token" },
    )
    .select("id, name, table_id")
    .single();

  if (error) {
    console.error("Room join error:", error);
    return NextResponse.json({ error: "Could not join the room." }, { status: 500 });
  }

  return NextResponse.json({
    room: { id: room.id, code: room.code, name: room.name, status: room.status },
    tables: tableList,
    player,
  });
}
