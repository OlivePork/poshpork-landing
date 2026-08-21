import { NextResponse } from "next/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

/**
 * Join a room. No account needed — the player is identified by a token
 * their own browser generates and keeps.
 *
 * Tables are not set up in advance. The first guest creates Table 1;
 * once it reaches the venue's usual size a new table appears. A larger
 * group can keep joining a full table up to twelve, so a dinner-party
 * evening needs no configuring.
 *
 * POST /api/room/join
 *   { "code": "BKQR47" }                                    → look up
 *   { "code", "name", "device_token", "table_id"?, "force"? } → take a seat
 *
 * table_id omitted  → the room picks the first table with room in it
 * table_id given    → that table specifically
 * force: true       → join a table that is already at its usual size
 */
export async function POST(req: Request) {
  let body: {
    code?: string;
    name?: string;
    device_token?: string;
    table_id?: string | null;
    force?: boolean;
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
    .select("id, code, name, status, expires_at, seats_default")
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

  // Lookup only — used to show the room before anyone commits.
  if (!body.name || !body.device_token) {
    return NextResponse.json({
      room: { id: room.id, code: room.code, name: room.name, status: room.status },
      tables: await listTables(),
      seats_default: room.seats_default ?? 4,
    });
  }

  const name = body.name.trim().slice(0, 40);
  if (!name) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }

  // Already in this room? Keep the seat rather than claiming another.
  const { data: existing } = await admin
    .from("room_players")
    .select("id, table_id")
    .eq("room_id", room.id)
    .eq("device_token", body.device_token)
    .maybeSingle();

  let tableId = existing?.table_id ?? null;

  if (!tableId) {
    // claim_seat does the finding-or-creating in one statement, so two
    // people tapping at the same moment cannot both make Table 3.
    const { data: seat, error: seatErr } = await admin.rpc("claim_seat", {
      r_id: room.id,
      want_table: body.table_id ?? null,
      force_join: body.force === true,
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
