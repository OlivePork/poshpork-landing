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
    .select("id, code, status, current_question_id, question_open, lang, answer_mode")
    .eq("code", code)
    .maybeSingle();

  if (!room) return NextResponse.json({ error: "No such room" }, { status: 404 });

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

  return NextResponse.json({
    status: room.status,
    question_open: room.question_open,
    question,
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