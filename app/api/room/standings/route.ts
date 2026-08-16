// ============================================================
// app/api/room/answer/route.ts
// ============================================================
import { NextResponse } from "next/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

/**
 * A player answers the open question.
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
    .select("id, current_question_id, question_open")
    .eq("code", code)
    .maybeSingle();

  if (!room) return NextResponse.json({ error: "No such room" }, { status: 404 });

  if (!room.question_open || !room.current_question_id) {
    return NextResponse.json({ error: "Nothing open to answer" }, { status: 409 });
  }

  const { data: player } = await admin
    .from("room_players")
    .select("id, table_id")
    .eq("room_id", room.id)
    .eq("device_token", body.device_token)
    .maybeSingle();

  if (!player) {
    return NextResponse.json({ error: "You are not in this room" }, { status: 403 });
  }

  // Scoring stays on the server.
  const { data: question } = await admin
    .from("questions")
    .select("correct_answer")
    .eq("id", room.current_question_id)
    .maybeSingle();

  const isCorrect = question?.correct_answer
    ? body.answer === question.correct_answer
    : null;

  // One answer per player per question. A second submission replaces
  // the first, so a mis-tap can be corrected while the question is open.
  const { error } = await admin.from("room_answers").upsert(
    {
      room_id: room.id,
      question_id: room.current_question_id,
      player_id: player.id,
      table_id: player.table_id,
      answer: body.answer,
      is_correct: isCorrect,
    },
    { onConflict: "room_id,question_id,player_id" },
  );

  if (error) {
    console.error("Room answer error:", error);
    return NextResponse.json({ error: "Could not record that." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}


// ============================================================
// app/api/room/question/route.ts   — host control
// ============================================================
/*
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let body: { code?: string; question_id?: string | null; open?: boolean; status?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const code = normaliseCode(body.code);
  const admin = roomAdmin();

  const { data: room } = await admin
    .from("rooms").select("id, host_user_id").eq("code", code).maybeSingle();

  if (!room) return NextResponse.json({ error: "No such room" }, { status: 404 });
  if (room.host_user_id !== user.id) {
    return NextResponse.json({ error: "Not your room" }, { status: 403 });
  }

  const patch: Record<string, unknown> = {};
  if (body.question_id !== undefined) {
    patch.current_question_id = body.question_id;
    patch.question_opened_at = body.question_id ? new Date().toISOString() : null;
  }
  if (body.open !== undefined) patch.question_open = body.open;
  if (body.status) patch.status = body.status;

  const { error } = await admin.from("rooms").update(patch).eq("id", room.id);
  if (error) {
    console.error("Room question error:", error);
    return NextResponse.json({ error: "Could not update the room." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
*/


// ============================================================
// app/api/room/standings/route.ts  — table scores
// ============================================================
/*
import { NextResponse } from "next/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = normaliseCode(searchParams.get("code"));
  const admin = roomAdmin();

  const { data: room } = await admin
    .from("rooms").select("id").eq("code", code).maybeSingle();

  if (!room) return NextResponse.json({ error: "No such room" }, { status: 404 });

  const { data, error } = await admin.rpc("room_standings", { r_id: room.id });
  if (error) {
    console.error("Standings error:", error);
    return NextResponse.json({ error: "Could not read the standings." }, { status: 500 });
  }

  return NextResponse.json({ standings: data ?? [] });
}
*/
