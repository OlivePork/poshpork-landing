import { NextResponse } from "next/server";
import { roomAdmin } from "@/lib/rooms";

/**
 * What is coming up.
 *
 * GET /api/sessions/upcoming?n=8
 *
 * Seats left counts paid bookings plus unexpired holds, so a room
 * cannot be oversold by two people checking out at once.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const n = Math.min(Math.max(Number(searchParams.get("n")) || 8, 1), 40);

  const admin = roomAdmin();

  const { data, error } = await admin.rpc("upcoming_sessions", { limit_n: n });

  if (error) {
    console.error("upcoming_sessions error:", error);
    return NextResponse.json({ error: "Could not read the dates." }, { status: 500 });
  }

  return NextResponse.json({ sessions: data ?? [] });
}
