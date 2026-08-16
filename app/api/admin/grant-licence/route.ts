    import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendLicenceEmail } from "@/lib/email";

/**
 * Grant a screening licence and send the branded confirmation, in one call.
 *
 * POST /api/admin/grant-licence
 *   {
 *     "secret": "...",
 *     "email": "head@stmarys.ie",
 *     "organisation": "St Mary's Secondary School",
 *     "type": "school",            // single | school | organisation
 *     "invoiceRef": "INV-2026-014" // optional
 *   }
 *
 * single       — one event, no expiry on access but a one-off licence
 * school       — two years
 * organisation — one year, renewable
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
    label: "Organisation licence",
    months: 12,
    blurb: "unlimited internal viewing for twelve months, at one site or organisation",
  },
};

export async function POST(req: Request) {
  let body: {
    secret?: string;
    email?: string;
    organisation?: string;
    type?: string;
    invoiceRef?: string;
    amountCents?: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { secret, email, organisation, type, invoiceRef, amountCents } = body;

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

  // 2. Work out the expiry.
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
    invoice_ref: invoiceRef ?? null,
    amount_cents: amountCents ?? null,
    starts_at: startsAt.toISOString(),
    expires_at: expiresAt?.toISOString() ?? null,
  });

  if (licenceErr) {
    console.error("Licence insert error:", licenceErr);
    return NextResponse.json({ error: "Could not record the licence." }, { status: 500 });
  }

  // 4. Grant access. Keyed so a renewal updates rather than duplicates.
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
      blurb: terms.blurb,
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
    expires: expiresAt?.toISOString().slice(0, 10) ?? "never",
  });
}
