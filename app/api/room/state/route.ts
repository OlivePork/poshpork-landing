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
 * Games: when the host reveals a question, the answer, explanation and
 * stamp are included. After the three opening food questions are
 * revealed, every table's suspect is included too.
 *
 * GET /api/room/state?code=BKQR47&token=...
 */

type Weights = Record<string, Record<string, number>>;

const SUSPECTS: Record<string, { name: string; line: string }> = {
  meat: { name: "Lady Posh Pork", line: "Old-fashioned, real food, no nonsense. The court notes your excellent taste." },
  carbs: { name: "Mr Carbohydrates", line: "Bread with everything. The court has questions." },
  oils: { name: "Mr Vegetable Oils", line: "Smooth, modern and everywhere. The court is watching you." },
  bliss: { name: "The Bliss Brothers", line: "Convenient, tasty and engineered. The court is very concerned." },
};

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
    .select("id, code, status, current_question_id, question_open, lang, answer_mode, revealed")
    .eq("code", code)
    .maybeSingle();

  if (!room) return NextResponse.json({ error: "No such room" }, { status: 404 });

  let question:
    | {
        id: string;
        question_text: string;
        options: string[];
        order_number: number;
        verdict_group: string | null;
        kind: string | null;
        round: number | null;
      }
    | null = null;
  let reveal: { correct_answer: string | null; explanation: string | null; stamp: string | null } | null = null;

  if (room.current_question_id) {
    const { data: q } = await admin
      .from("questions")
      .select(
        "id, order_number, verdict_group, game_kind, game_round, explanation, stamp, correct_answer, question_translations!inner(question_text, options, correct_answer, lang)",
      )
      .eq("id", room.current_question_id)
      .eq("question_translations.lang", room.lang)
      .maybeSingle();

    if (q) {
      const tr = (q as unknown as {
        question_translations: { question_text: string; options: string[]; correct_answer: string | null }[];
      }).question_translations?.[0];

      question = {
        id: q.id as string,
        order_number: q.order_number as number,
        verdict_group: (q.verdict_group as string | null) ?? null,
        kind: (q.game_kind as string | null) ?? null,
        round: (q.game_round as number | null) ?? null,
        question_text: tr?.question_text ?? "",
        options: tr?.options ?? [],
      };

      if (room.revealed) {
        reveal = {
          correct_answer: tr?.correct_answer ?? (q.correct_answer as string | null) ?? null,
          explanation: (q.explanation as string | null) ?? null,
          stamp: (q.stamp as string | null) ?? null,
        };
      }
    }
  }

  // Verdict questions are always individual, whatever the room setting.
  const tableMode = room.answer_mode === "table" && !question?.verdict_group;

  const tally: Record<string, number> = {};
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

  // How many units should answer — tables with someone at them, or people.
  const { data: expectedRaw } = await admin.rpc("room_expected", {
    r_id: room.id,
    table_mode: tableMode,
  });
  const expected = Number(expectedRaw ?? 0);

  const { count: playerCount } = await admin
    .from("room_players")
    .select("id", { count: "exact", head: true })
    .eq("room_id", room.id);

  // This device: its own answer, or its table's.
  let mine: string | null = null;
  let setByName: string | null = null;
  let playerId: string | null = null;
  let tableId: string | null = null;
  let tableName: string | null = null;

  if (token) {
    const { data: player } = await admin
      .from("room_players")
      .select("id, table_id, name, room_tables(name)")
      .eq("room_id", room.id)
      .eq("device_token", token)
      .maybeSingle();

    playerId = player?.id ?? null;
    tableId = player?.table_id ?? null;
    tableName =
      (player as unknown as { room_tables?: { name: string } | null })?.room_tables?.name ?? null;

    if (playerId && room.current_question_id) {
      const q = admin
        .from("room_answers")
        .select("answer, set_by_name")
        .eq("room_id", room.id)
        .eq("question_id", room.current_question_id);

      const { data: answer } = tableMode && tableId
        ? await q.eq("table_id", tableId).eq("is_table_answer", true).maybeSingle()
        : await q.eq("player_id", playerId).eq("is_table_answer", false).maybeSingle();

      mine = answer?.answer ?? null;
      setByName = answer?.set_by_name ?? null;
    }
  }

  // After the opening food questions are revealed: which suspect is each table?
  let profiles:
    | { table_id: string; table_name: string; colour: string | null; suspects: { key: string; name: string; line: string }[] }[]
    | null = null;

  if (room.revealed && question?.kind === "profile") {
    const { data: pq } = await admin
      .from("questions")
      .select("id, profile_weights")
      .eq("film_key", "games")
      .eq("game_kind", "profile");

    const weights = new Map<string, Weights>();
    for (const p of (pq ?? []) as { id: string; profile_weights: Weights | null }[]) {
      if (p.profile_weights) weights.set(p.id, p.profile_weights);
    }

    const { data: ans } = await admin
      .from("room_answers")
      .select("table_id, question_id, answer")
      .eq("room_id", room.id)
      .in("question_id", [...weights.keys()]);

    const scores = new Map<string, Record<string, number>>();
    for (const a of (ans ?? []) as { table_id: string | null; question_id: string; answer: string }[]) {
      if (!a.table_id) continue;
      const w = weights.get(a.question_id)?.[a.answer];
      if (!w) continue;
      const s = scores.get(a.table_id) ?? { meat: 0, carbs: 0, oils: 0, bliss: 0 };
      for (const [k, v] of Object.entries(w)) s[k] = (s[k] ?? 0) + v;
      scores.set(a.table_id, s);
    }

    const { data: tables } = await admin.rpc("room_table_list", { r_id: room.id });
    profiles = ((tables ?? []) as { id: string; name: string; colour: string | null }[])
      .filter((t) => scores.has(t.id))
      .map((t) => {
        const s = scores.get(t.id)!;
        const top = Math.max(...Object.values(s));
        const keys = Object.keys(s).filter((k) => top > 0 && Math.abs(s[k] - top) < 0.01);
        return {
          table_id: t.id,
          table_name: t.name,
          colour: t.colour,
          suspects: keys.map((k) => ({ key: k, ...SUSPECTS[k] })),
        };
      });
  }

  // Which tables have answered the current question (for the host's screen).
  let tables: { id: string; name: string; colour: string | null; answered: boolean }[] = [];
  {
    const { data: tl } = await admin.rpc("room_table_list", { r_id: room.id });
    const done = new Set<string>();
    if (room.current_question_id) {
      const { data: rows } = await admin
        .from("room_answers")
        .select("table_id")
        .eq("room_id", room.id)
        .eq("question_id", room.current_question_id);
      for (const r of (rows ?? []) as { table_id: string | null }[]) if (r.table_id) done.add(r.table_id);
    }
    tables = ((tl ?? []) as { id: string; name: string; colour: string | null; seats_taken?: number }[])
      .filter((t) => (t.seats_taken ?? 1) > 0)
      .map((t) => ({ id: t.id, name: t.name, colour: t.colour, answered: done.has(t.id) }));
  }

  return NextResponse.json({
    status: room.status,
    tables,
    question_open: room.question_open,
    revealed: !!room.revealed,
    question,
    reveal,
    profiles,
    table_mode: tableMode,
    tally,
    answered,
    expected,
    players: playerCount ?? 0,
    mine,
    set_by: setByName,
    player_id: playerId,
    table_id: tableId,
    table_name: tableName,
  });
}