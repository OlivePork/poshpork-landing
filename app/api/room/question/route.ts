import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

/**
 * Host control: open, close or clear the room's current question.
 * Only the signed-in host of the room may do this.
 *
 * POST /api/room/question
 *   { "code": "BKQR47", "question_id": "...", "open": true }   open a question
 *   { "code": "BKQR47", "open": false }                        close it
 *   { "code": "BKQR47", "question_id": null }                  clear it
 *   { "code": "BKQR47", "status": "ended" }                    change room status
 */
export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let body: { code?: string; question_id?: string | null; open?: boolean; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const code = normaliseCode(body.code);
  const admin = roomAdmin();

  const { data: room } = await admin
    .from("rooms")
    .select("id, host_user_id")
    .eq("code", code)
    .maybeSingle();

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

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to change" }, { status: 400 });
  }

  const { error } = await admin.from("rooms").update(patch).eq("id", room.id);
  if (error) {
    console.error("Room question error:", error);
    return NextResponse.json({ error: "Could not update the room." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}