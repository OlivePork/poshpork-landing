import { NextResponse } from "next/server";
import { roomAdmin } from "@/lib/rooms";

/**
 * The room a venue currently has open, if any.
 *
 * GET /api/room/for-venue?slug=son-mir
 *
 * Lets a guest who has just paid at a venue land straight in the room
 * without typing a code. If the venue has not opened one yet, this
 * returns 404 and the join page says so.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = String(searchParams.get("slug") ?? "").toLowerCase().trim();

  if (!slug) {
    return NextResponse.json({ error: "No venue given" }, { status: 400 });
  }

  const admin = roomAdmin();

  const { data, error } = await admin.rpc("venue_open_room", { v_slug: slug });

  if (error) {
    console.error("venue_open_room error:", error);
    return NextResponse.json({ error: "Could not look that up" }, { status: 500 });
  }

  const room = (data ?? [])[0] as { code: string; room_id: string } | undefined;

  if (!room?.code) {
    return NextResponse.json({ error: "No room open" }, { status: 404 });
  }

  return NextResponse.json({ code: room.code });
}
