import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Please sign in first, then redeem." }, { status: 401 });
  }

  const { code } = await req.json();

  const { data: gift } = await supabase
    .from("gift_codes")
    .select("code, redeemed_by")
    .eq("code", code)
    .maybeSingle();

  if (!gift) {
    return NextResponse.json({ error: "We don't recognise that code." }, { status: 404 });
  }

  if (gift.redeemed_by) {
    return NextResponse.json({ error: "That code has already been used." }, { status: 409 });
  }

  const { error: markErr } = await supabase
    .from("gift_codes")
    .update({ redeemed_by: user.id, redeemed_at: new Date().toISOString() })
    .eq("code", code)
    .is("redeemed_by", null);

  if (markErr) {
    return NextResponse.json({ error: "Couldn't redeem that code." }, { status: 500 });
  }

  const { error: purchaseErr } = await supabase.from("purchases").insert({
    user_id: user.id,
    product: "movie",
    source: "gift",
  });

  if (purchaseErr) {
    return NextResponse.json({ error: "Couldn't grant access." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}