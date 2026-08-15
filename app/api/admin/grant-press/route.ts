import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendPressEmail } from "@/lib/email";

/**
 * Grant press access and send the branded invitation, in one call.
 *
 * POST /api/admin/grant-press
 *   { "secret": "...", "email": "reporter@example.com", "outlet": "The New York Times" }
 *
 * Creates the auth user if they don't exist, records the purchase with
 * source = 'press', then emails a one-click sign-in link that lands on /watch.
 * Safe to call twice — the purchase is keyed so a repeat call re-sends the
 * email rather than duplicating access.
 */
export async function POST(req: Request) {
  let body: { secret?: string; email?: string; outlet?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { secret, email, outlet } = body;

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const normalised = email.trim().toLowerCase();

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // 1. Find or create the user.
  let userId: string | null = null;

  const { data: existing } = await admin
    .from("user_lookup")
    .select("id")
    .eq("email", normalised)
    .maybeSingle();

  userId = existing?.id ?? null;

  if (!userId) {
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: normalised,
      email_confirm: true,
    });
    if (createErr) {
      console.error("Press createUser error:", createErr);
      return NextResponse.json({ error: "Could not create the account." }, { status: 500 });
    }
    userId = created?.user?.id ?? null;
  }

  if (!userId) {
    return NextResponse.json({ error: "Could not resolve the account." }, { status: 500 });
  }

  // 2. Grant access. Keyed on a deterministic id so repeat calls don't duplicate.
  const { error: purchaseErr } = await admin.from("purchases").upsert(
    {
      user_id: userId,
      product: "movie",
      source: "press",
      stripe_session_id: `press-${normalised}`,
    },
    { onConflict: "stripe_session_id" }
  );

  if (purchaseErr) {
    console.error("Press purchase error:", purchaseErr);
    return NextResponse.json({ error: "Could not grant access." }, { status: 500 });
  }

  // 3. Send the branded invitation.
  try {
    await sendPressEmail(normalised, outlet);
  } catch (emailErr) {
    console.error("Press email error:", emailErr);
    return NextResponse.json(
      { ok: true, emailed: false, warning: "Access granted, but the email failed to send." },
      { status: 207 }
    );
  }

  return NextResponse.json({ ok: true, emailed: true, email: normalised, outlet: outlet ?? null });
}