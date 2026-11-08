import { NextResponse } from "next/server";
import { roomAdmin } from "@/lib/rooms";

/**
 * The game questions, in order, for the host's games screen.
 * GET /api/room/games
 */
export async function GET() {
  const admin = roomAdmin();

  const { data, error } = await admin
    .from("questions")
    .select("id, order_number, game_round, game_kind, question_text, options, correct_answer, explanation, stamp")
    .eq("film_key", "games")
    .order("order_number", { ascending: true });

  if (error) {
    console.error("Games list error:", error);
    return NextResponse.json({ error: "Could not load the games." }, { status: 500 });
  }

  return NextResponse.json({ questions: data ?? [] });
}