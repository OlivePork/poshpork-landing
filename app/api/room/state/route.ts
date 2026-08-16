import { NextResponse } from "next/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

/**
 * What is happening in the room right now. Polled by every device
 * roughly every 1.5 seconds.
 *
 * Polling rather than websockets on purpose: venue wifi drops, and a
 * dropped socket needs reconnection logic that fails in exactly the
 * situation you cannot debug — a room full of people watching you.
 * A missed poll simply succeeds on the next one.
 *
 * GET /api/room/state?code=BKQR47&token=...
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = normaliseCode(searchParams.get("code"));
  const token = searchParams.get("token");

  if (code.length < 4) {
    return NextResponse.json({ error: "No code given" }, { status: 400 });
  }

  const admin = roomAdmin();

  const { data: room } = await admin
    .from("rooms")
    .select("id, code, status, current_question_id, question_open, question_opened_at, lang")
    .eq("code", code)
    .maybeSingle();

  if (!room) return NextResponse.json({ error: "No such room" }, { status: 404 });

  // The question currently on screen, if any.
  let question:
    | { id: string; question_text: string; options: string[]; order_number: number; verdict_group: string | null }
    | null = null;

  if (room.current_question_id) {
    const { data: q } = await admin
      .from("questions")
      .select("id, order_number, verdict_group, question_translations!inner(question_text, options, lang)")
      .eq("id", room.current_question_id)
      .eq("question_translations.lang", room.lang)
      .maybeSingle();

    if (q) {
      const tr = (q as unknown as {
        question_translations: { question_text: string; options: string[] }[];
      }).question_translations?.[0];

      question = {
        id: q.id as string,
        order_number: q.order_number as number,
        verdict_group: (q.verdict_group as string | null) ?? null,
        question_text: tr?.question_text ?? "",
        options: tr?.options ?? [],
      };
    }
  }

  // Live count for the host's screen.
  let tally: Record<string, number> = {};
  let answered = 0;

  if (room.current_question_id) {
    const { data: rows } = await admin.rpc("room_question_tally", {
      r_id: room.id,
      q_id: room.current_question_id,
    });
    for (const r of (rows ?? []) as { answer: string; votes: number }[]) {
      tally[r.answer] = Number(r.votes);
      answered += Number(r.votes);
    }
  }

  const { count: playerCount } = await admin
    .from("room_players")
    .select("id", { count: "exact", head: true })
    .eq("room_id", room.id);

  // Has this device already answered the open question?
  let mine: string | null = null;
  let playerId: string | null = null;

  if (token) {
    const { data: player } = await admin
      .from("room_players")
      .select("id, table_id, name")
      .eq("room_id", room.id)
      .eq("device_token", token)
      .maybeSingle();

    playerId = player?.id ?? null;

    if (playerId && room.current_question_id) {
      const { data: answer } = await admin
        .from("room_answers")
        .select("answer")
        .eq("room_id", room.id)
        .eq("question_id", room.current_question_id)
        .eq("player_id", playerId)
        .maybeSingle();

      mine = answer?.answer ?? null;
    }
  }

  return NextResponse.json({
    status: room.status,
    question_open: room.question_open,
    question,
    tally,
    answered,
    players: playerCount ?? 0,
    mine,
    player_id: playerId,
  });
}
