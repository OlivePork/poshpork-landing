import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { roomAdmin, normaliseCode } from "@/lib/rooms";

/**
 * The verdict, once it has been delivered.
 *
 * GET /api/verdict            → how everyone has voted
 * GET /api/verdict?code=ABC12 → how that room voted, and everyone
 *
 * Counts only. Nobody is told they were wrong, because on a verdict
 * there is nothing to be wrong about.
 */
export async function GET(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const code = normaliseCode(searchParams.get("code"));

  const admin = roomAdmin();

  const { data: everyone, error: gErr } = await admin.rpc("global_verdict");

  if (gErr) {
    console.error("global_verdict error:", gErr);
    return NextResponse.json({ error: "Could not read the tally." }, { status: 500 });
  }

  let room = null;

  if (code.length >= 4) {
    const { data: r } = await admin
      .from("rooms")
      .select("id, name")
      .eq("code", code)
      .maybeSingle();

    if (r) {
      const { data: rows, error: rErr } = await admin.rpc("room_verdict", { r_id: r.id });
      if (rErr) console.error("room_verdict error:", rErr);
      else room = { name: r.name, verdict: rows ?? [] };
    }
  }

  return NextResponse.json({ everyone: everyone ?? [], room });
}