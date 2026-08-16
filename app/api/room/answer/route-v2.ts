import { NextResponse } from "next/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

/**
 * Record an answer.
 *
 * By default a table answers as a group: any phone at the table can set
 * or change it while the question is open, and the last change stands.
 * Everyone at the table sees what is currently in — which is the point,
 * because a table can watch itself being overruled and argue about it.
 *
 * The final verdict on each suspect is always individual.
 *
 * POST /api/room/answer
 *   { "code": "BKQR47", "device_token": "...", "answer": "Hard butter" }
 */
export async function POST(req: Request) {
  let body: { code?: string; device_token?: string; answer?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const code = normaliseCode(body.code);
  if (!code || !body.device_token || !body.answer) {
    return NextResponse.json({ error: "Incomplete request" }, { status: 400 });
  }

  const admin = roomAdmin();

  const { data: room } = await admin
    .from("rooms")
    .select("id, current_question_id, question_open, answer_mode")
    .eq("code", code)
    .maybeSingle();

  if (!room) return NextResponse.json({ error: "No such room" }, { status: 404 });

  if (!room.question_open || !room.current_question_id) {
    return NextResponse.json({ error: "Nothing open to answer" }, { status: 409 });
  }

  const { data: player } = await admin
    .from("room_players")
    .select("id, table_id, name")
    .eq("room_id", room.id)
    .eq("device_token", body.device_token)
    .maybeSingle();

  if (!player) {
    return NextResponse.json({ error: "You are not in this room" }, { status: 403 });
  }

  // Is this question part of the closing verdict? Those are always individual.
  const { data: question } = await admin
    .from("questions")
    .select("correct_answer, verdict_group")
    .eq("id", room.current_question_id)
    .maybeSingle();

  const isVerdict = !!question?.verdict_group;

  const asTable =
    room.answer_mode === "table" && !isVerdict && !!player.table_id;

  const isCorrect = question?.correct_answer
    ? body.answer === question.correct_answer
    : null;

  if (asTable) {
    // One row per table. Replace whatever is there — last change stands.
    const { error } = await admin.from("room_answers").upsert(
      {
        room_id: room.id,
        question_id: room.current_question_id,
        player_id: player.id,
        table_id: player.table_id,
        answer: body.answer,
        is_correct: isCorrect,
        is_table_answer: true,
        set_by_player_id: player.id,
        set_by_name: player.name,
        answered_at: new Date().toISOString(),
      },
      { onConflict: "room_id,question_id,table_id" },
    );

    if (error) {
      console.error("Table answer error:", error);
      return NextResponse.json({ error: "Could not record that." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, as_table: true, set_by: player.name });
  }

  // Individual: one row per player.
  const { error } = await admin.from("room_answers").upsert(
    {
      room_id: room.id,
      question_id: room.current_question_id,
      player_id: player.id,
      table_id: player.table_id,
      answer: body.answer,
      is_correct: isCorrect,
      is_table_answer: false,
      set_by_player_id: player.id,
      set_by_name: player.name,
      answered_at: new Date().toISOString(),
    },
    { onConflict: "room_id,question_id,player_id" },
  );

  if (error) {
    console.error("Room answer error:", error);
    return NextResponse.json({ error: "Could not record that." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, as_table: false });
}
