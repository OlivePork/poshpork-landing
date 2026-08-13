import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  // User-scoped client, used only to establish who is asking.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Please sign in first, then redeem." }, { status: 401 });
  }

  const { code } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "We don't recognise that code." }, { status: 404 });
  }

  const normalised = code.trim().toUpperCase();

  // Service role for all table work. The browser must never be able to read or
  // update gift_codes directly — with a readable table, anyone could list every
  // unredeemed code and claim them.
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Claim atomically. The `.is("redeemed_by", null)` filter combined with
  // .select() means two people racing on the same code cannot both succeed —
  // the second update matches no rows and returns nothing.
  const { data: claimed, error: markErr } = await admin
    .from("gift_codes")
    .update({ redeemed_by: user.id, redeemed_at: new Date().toISOString() })
    .eq("code", normalised)
    .is("redeemed_by", null)
    .select("code")
    .maybeSingle();

  if (markErr) {
    console.error("Redeem update error:", markErr);
    return NextResponse.json({ error: "Couldn't redeem that code." }, { status: 500 });
  }

  if (!claimed) {
    // Either no such code, or it was already used. Look it up to give the
    // right message — this read is server-side only.
    const { data: existing } = await admin
      .from("gift_codes")
      .select("redeemed_by")
      .eq("code", normalised)
      .maybeSingle();

    if (existing?.redeemed_by) {
      return NextResponse.json({ error: "That code has already been used." }, { status: 409 });
    }
    return NextResponse.json({ error: "We don't recognise that code." }, { status: 404 });
  }

  const { error: purchaseErr } = await admin.from("purchases").insert({
    user_id: user.id,
    product: "movie",
    source: "gift",
  });

  if (purchaseErr) {
    console.error("Redeem purchase error:", purchaseErr);
    // Release the code rather than burning it on a failed grant.
    await admin
      .from("gift_codes")
      .update({ redeemed_by: null, redeemed_at: null })
      .eq("code", normalised);
    return NextResponse.json({ error: "Couldn't grant access." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}