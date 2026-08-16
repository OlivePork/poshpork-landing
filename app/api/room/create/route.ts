import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { roomAdmin, makeCode, TABLE_COLOURS } from "@/lib/rooms";

/**
 * Create a live room. Host only — requires a purchase or licence.
 *
 * POST /api/room/create
 *   { "name": "St Mary's, 5th year", "tables": 6, "lang": "en" }
 */
export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { data: purchases } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product", "movie")
    .limit(1);

  if (!purchases?.[0]) {
    return NextResponse.json({ error: "No access found" }, { status: 403 });
  }

  let body: { name?: string; tables?: number; lang?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const tableCount = Math.min(Math.max(Number(body.tables) || 4, 1), 20);
  const admin = roomAdmin();

  // Codes are short, so collisions are possible. Try a few times.
  let room: { id: string; code: string } | null = null;

  for (let attempt = 0; attempt < 6 && !room; attempt++) {
    const code = makeCode();
    const { data, error } = await admin
      .from("rooms")
      .insert({
        code,
        host_user_id: user.id,
        name: body.name?.slice(0, 120) ?? null,
        lang: body.lang ?? "en",
        status: "lobby",
      })
      .select("id, code")
      .single();

    if (!error && data) room = data;
  }

  if (!room) {
    return NextResponse.json({ error: "Could not create the room." }, { status: 500 });
  }

  const tables = Array.from({ length: tableCount }, (_, i) => ({
    room_id: room!.id,
    name: `Table ${i + 1}`,
    colour: TABLE_COLOURS[i % TABLE_COLOURS.length],
  }));

  const { error: tableErr } = await admin.from("room_tables").insert(tables);

  if (tableErr) {
    console.error("Room tables error:", tableErr);
    return NextResponse.json({ error: "Could not set up the tables." }, { status: 500 });
  }

  return NextResponse.json({ room_id: room.id, code: room.code });
}
