import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendLicenceEmail } from "@/lib/email";

/**
 * Grant a screening licence and send the branded confirmation, in one call.
 *
 * POST /api/admin/grant-licence
 *   {
 *     "secret": "...",
 *     "email": "hr@acme.com",
 *     "organisation": "Acme Ltd",
 *     "type": "organisation",       // single | school | organisation
 *     "headcount": 40,              // organisations only
 *     "invoiceRef": "INV-2026-014"
 *   }
 *
 * single       — one event, community rate, 3 months' access
 * school       — two years, unlimited classroom use, one site
 * organisation — one event, priced per person, 3 months' access
 */

const TERMS: Record<string, { label: string; months: number | null; blurb: string }> = {
  single: {
    label: "Single screening",
    months: 3,
    blurb: "one screening, one audience, one date",
  },
  school: {
    label: "School licence",
    months: 24,
    blurb: "unlimited classroom use for two years, at one school site",
  },
  organisation: {
    label: "Organisation screening",
    months: 3,
    blurb: "one event, priced per person",
  },
};

/** €12 a head, €10 over fifty, never less than the €249 single-screening rate. */
function priceOrganisation(headcount: number) {
  const rate = headcount > 50 ? 1000 : 1200; // cents
  return Math.max(headcount * rate, 24900);
}

export async function POST(req: Request) {
  let body: {
    secret?: string;
    email?: string;
    organisation?: string;
    type?: string;
    headcount?: number;
    invoiceRef?: string;
    amountCents?: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { secret, email, organisation, type, headcount, invoiceRef } = body;

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  if (!organisation) {
    return NextResponse.json({ error: "Organisation required" }, { status: 400 });
  }

  const terms = TERMS[type ?? ""];
  if (!terms) {
    return NextResponse.json(
      { error: "Type must be single, school or organisation" },
      { status: 400 },
    );
  }

  const heads = Number(headcount) || 0;

  if (type === "organisation" && heads < 1) {
    return NextResponse.json(
      { error: "Organisations are priced per person — give a headcount." },
      { status: 400 },
    );
  }

  // Work out what was charged, unless it was given explicitly.
  const amountCents =
    body.amountCents ??
    (type === "organisation"
      ? priceOrganisation(heads)
      : type === "school"
        ? 29500
        : 24900);

  const normalised = email.trim().toLowerCase();

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  // 1. Find or create the account.
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
      console.error("Licence createUser error:", createErr);
      return NextResponse.json({ error: "Could not create the account." }, { status: 500 });
    }
    userId = created?.user?.id ?? null;
  }

  if (!userId) {
    return NextResponse.json({ error: "Could not resolve the account." }, { status: 500 });
  }

  // 2. Expiry.
  const startsAt = new Date();
  const expiresAt = terms.months
    ? new Date(new Date().setMonth(startsAt.getMonth() + terms.months))
    : null;

  // 3. Record the licence.
  const { error: licenceErr } = await admin.from("licences").insert({
    user_id: userId,
    email: normalised,
    organisation,
    licence_type: type,
    headcount: heads || null,
    invoice_ref: invoiceRef ?? null,
    amount_cents: amountCents,
    starts_at: startsAt.toISOString(),
    expires_at: expiresAt?.toISOString() ?? null,
  });

  if (licenceErr) {
    console.error("Licence insert error:", licenceErr);
    return NextResponse.json({ error: "Could not record the licence." }, { status: 500 });
  }

  // 4. Grant access. Keyed so a repeat booking updates rather than duplicates.
  const { error: purchaseErr } = await admin.from("purchases").upsert(
    {
      user_id: userId,
      product: "movie",
      source: "licence",
      stripe_session_id: `licence-${normalised}`,
      expires_at: expiresAt?.toISOString() ?? null,
    },
    { onConflict: "stripe_session_id" },
  );

  if (purchaseErr) {
    console.error("Licence purchase error:", purchaseErr);
    return NextResponse.json({ error: "Could not grant access." }, { status: 500 });
  }

  // 5. Send the confirmation.
  try {
    await sendLicenceEmail(normalised, {
      organisation,
      licenceLabel: terms.label,
      blurb: heads
        ? `${terms.blurb}, for ${heads} ${heads === 1 ? "person" : "people"}`
        : terms.blurb,
      expiresAt,
      invoiceRef,
    });
  } catch (emailErr) {
    console.error("Licence email error:", emailErr);
    return NextResponse.json(
      { ok: true, emailed: false, warning: "Licence granted, but the email failed to send." },
      { status: 207 },
    );
  }

  return NextResponse.json({
    ok: true,
    emailed: true,
    email: normalised,
    organisation,
    type,
    headcount: heads || null,
    amount: `€${(amountCents / 100).toFixed(2)}`,
    expires: expiresAt?.toISOString().slice(0, 10) ?? "never",
  });
}
