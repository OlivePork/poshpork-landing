import { NextResponse } from "next/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

/**
 * Join a room, or move between tables.
 *
 * Tables are not set up in advance. The first guest creates Table 1;
 * once it reaches the venue's usual size a new one appears. A group who
 * have just sat down together can start their own, and anyone who taps
 * the wrong thing can move.
 *
 * POST /api/room/join
 *   { code }                                        → look up the room
 *   { code, name, device_token }                    → first table with room
 *   { code, name, device_token, new_table: true }   → a fresh table
 *   { code, name, device_token, table_id }          → that table
 *   { code, name, device_token, table_id, force }   → join one at its usual size
 *   { code, device_token, move: true, ... }         → change tables
 */
export async function POST(req: Request) {
  let body: {
    code?: string;
    name?: string;
    device_token?: string;
    table_id?: string | null;
    force?: boolean;
    new_table?: boolean;
    move?: boolean;
  };

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
    .select("id, code, name, status, expires_at, seats_default, question_open")
    .eq("code", code)
    .maybeSingle();

  if (!room) {
    return NextResponse.json({ error: "No room with that code." }, { status: 404 });
  }

  if (new Date(room.expires_at) < new Date()) {
    return NextResponse.json({ error: "That room has closed." }, { status: 410 });
  }

  const listTables = async () => {
    const { data } = await admin.rpc("room_table_list", { r_id: room.id });
    return (data ?? []) as {
      id: string;
      name: string;
      colour: string | null;
      seats_taken: number;
      seats_soft: number;
    }[];
  };

  // Lookup only.
  if (!body.device_token || (!body.name && !body.move)) {
    return NextResponse.json({
      room: { id: room.id, code: room.code, name: room.name, status: room.status },
      tables: await listTables(),
      seats_default: room.seats_default ?? 4,
    });
  }

  const { data: existing } = await admin
    .from("room_players")
    .select("id, name, table_id")
    .eq("room_id", room.id)
    .eq("device_token", body.device_token)
    .maybeSingle();

  // Moving tables mid-question would land answers on a table you have
  // just left. Make them wait the few seconds.
  if (body.move && room.question_open) {
    return NextResponse.json(
      { error: "Wait until the question is over, then move." },
      { status: 409 },
    );
  }

  const name = (body.name ?? existing?.name ?? "").trim().slice(0, 40);
  if (!name) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }

  const previousTable = existing?.table_id ?? null;

  // Keep the existing seat unless they are deliberately moving or choosing.
  let tableId = previousTable;
  const wantsSomewhere = body.move || body.new_table || body.table_id;

  if (!tableId || wantsSomewhere) {
    const { data: seat, error: seatErr } = await admin.rpc("claim_seat", {
      r_id: room.id,
      want_table: body.table_id ?? null,
      force_join: body.force === true,
      new_table: body.new_table === true,
    });

    if (seatErr) {
      const msg = seatErr.message || "";
      if (msg.includes("usual size")) {
        return NextResponse.json(
          { error: "That table is at its usual size.", needsForce: true },
          { status: 409 },
        );
      }
      if (msg.includes("table is full")) {
        return NextResponse.json({ error: "That table is full." }, { status: 409 });
      }
      if (msg.includes("room is full")) {
        return NextResponse.json({ error: "This room is full." }, { status: 409 });
      }
      console.error("claim_seat error:", seatErr);
      return NextResponse.json({ error: "Could not find you a seat." }, { status: 500 });
    }

    tableId = (seat ?? [])[0]?.table_id ?? null;
  }

  const { data: player, error } = await admin
    .from("room_players")
    .upsert(
      {
        room_id: room.id,
        device_token: body.device_token,
        name,
        table_id: tableId,
      },
      { onConflict: "room_id,device_token" },
    )
    .select("id, name, table_id")
    .single();

  if (error) {
    console.error("Room join error:", error);
    return NextResponse.json({ error: "Could not join the room." }, { status: 500 });
  }

  // A table nobody is sitting at should not clutter the list.
  if (previousTable && previousTable !== tableId) {
    await admin.rpc("prune_empty_tables", { r_id: room.id });
  }

  const tables = await listTables();
  const mine = tables.find((t) => t.id === player.table_id);

  return NextResponse.json({
    room: { id: room.id, code: room.code, name: room.name, status: room.status },
    tables,
    seats_default: room.seats_default ?? 4,
    player,
    table: mine ?? null,
  });
}
