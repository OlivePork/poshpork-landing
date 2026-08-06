import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { session_id, question_id, answer, answer_mode, group_size, seconds_to_answer } =
    await req.json();

  const { data: session } = await supabase
    .from("watch_sessions")
    .select("id")
    .eq("id", session_id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!session) return NextResponse.json({ error: "Unknown session" }, { status: 403 });

  // Scoring happens here — correct_answer never reaches the browser.
  const { data: question } = await supabase
    .from("questions")
    .select("correct_answer")
    .eq("id", question_id)
    .maybeSingle();

  const isCorrect =
    question?.correct_answer && answer ? answer === question.correct_answer : null;

  const { error } = await supabase.from("answers").upsert(
    {
      session_id,
      user_id: user.id,
      question_id,
      answer: answer ?? null,
      is_correct: isCorrect,
      answer_mode,
      group_size: Math.min(Math.max(Number(group_size) || 1, 1), 200),
      seconds_to_answer,
    },
    { onConflict: "session_id,question_id" },
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, is_correct: isCorrect });
}