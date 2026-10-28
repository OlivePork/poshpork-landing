import { NextResponse } from "next/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

/**
 * Table scores for a room.
 *
 * GET /api/room/standings?code=BKQR47
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = normaliseCode(searchParams.get("code"));
  const admin = roomAdmin();

  const { data: room } = await admin
    .from("rooms")
    .select("id")
    .eq("code", code)
    .maybeSingle();

  if (!room) return NextResponse.json({ error: "No such room" }, { status: 404 });

  const { data, error } = await admin.rpc("room_standings", { r_id: room.id });
  if (error) {
    console.error("Standings error:", error);
    return NextResponse.json({ error: "Could not read the standings." }, { status: 500 });
  }

  return NextResponse.json({ standings: data ?? [] });
}