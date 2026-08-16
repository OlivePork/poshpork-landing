import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

/**
 * Aggregate jury results for one or more questions.
 *
 * POST /api/results  { "question_ids": ["uuid", ...] }
 *
 * Returns only counts. Individual answers never leave the server — the
 * question_results function is security definer and returns nothing but
 * an answer string and a total.
 */
export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let body: { question_ids?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const ids = (body.question_ids ?? []).filter(
    (id) => typeof id === "string" && id.length > 0,
  );

  if (!ids.length) {
    return NextResponse.json({ error: "No questions given" }, { status: 400 });
  }

  if (ids.length > 20) {
    return NextResponse.json({ error: "Too many questions" }, { status: 400 });
  }

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data, error } = await admin.rpc("question_results", { q_ids: ids });

  if (error) {
    console.error("Results error:", error);
    return NextResponse.json({ error: "Could not read the tally." }, { status: 500 });
  }

  // Shape: { [question_id]: { total, byAnswer: { [answer]: votes } } }
  const results: Record<string, { total: number; byAnswer: Record<string, number> }> = {};

  for (const row of (data ?? []) as { question_id: string; answer: string; votes: number }[]) {
    const q = (results[row.question_id] ??= { total: 0, byAnswer: {} });
    q.byAnswer[row.answer] = Number(row.votes);
    q.total += Number(row.votes);
  }

  return NextResponse.json({ results });
}
