import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  // Re-check the purchase here too — never trust that the page did it.
  const { data: purchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product", "movie")
    .maybeSingle();

  if (!purchase) return NextResponse.json({ error: "No purchase found" }, { status: 403 });

  const { video_id, mode, group_size } = await req.json();

  const { data, error } = await supabase
    .from("watch_sessions")
    .insert({
      user_id: user.id,
      video_id,
      mode: ["interactive", "group", "off"].includes(mode) ? mode : "interactive",
      group_size: Math.min(Math.max(Number(group_size) || 1, 1), 200),
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ session_id: data.id });
}