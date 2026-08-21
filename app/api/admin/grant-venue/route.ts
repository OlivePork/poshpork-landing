import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendVenueEmail } from "@/lib/email";

/**
 * Set a venue up: create the staff account, grant access to the film,
 * link it to the venue record, and send them everything they need.
 *
 * POST /api/admin/grant-venue
 *   { "secret": "...", "slug": "son-mir", "email": "maria@example.com" }
 *
 * The venue row must already exist. Create it in Supabase first.
 * Safe to call twice — re-sends the email rather than duplicating anything.
 */
export async function POST(req: Request) {
  let body: { secret?: string; slug?: string; email?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { secret, slug, email } = body;

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json({ error: "Venue slug required" }, { status: 400 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: venue } = await admin
    .from("venues")
    .select("id, slug, name, contact_email, adult_price_cents, table_count, seats_per_table")
    .eq("slug", slug.toLowerCase())
    .maybeSingle();

  if (!venue) {
    return NextResponse.json(
      { error: "No venue with that slug. Create the row in Supabase first." },
      { status: 404 },
    );
  }

  const staffEmail = (email ?? venue.contact_email ?? "").trim().toLowerCase();

  if (!staffEmail || !staffEmail.includes("@")) {
    return NextResponse.json({ error: "No usable email for that venue" }, { status: 400 });
  }

  // 1. Find or create the staff account.
  let userId: string | null = null;

  const { data: existing } = await admin
    .from("user_lookup")
    .select("id")
    .eq("email", staffEmail)
    .maybeSingle();

  userId = existing?.id ?? null;

  if (!userId) {
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: staffEmail,
      email_confirm: true,
    });
    if (createErr) {
      console.error("Venue createUser error:", createErr);
      return NextResponse.json({ error: "Could not create the account." }, { status: 500 });
    }
    userId = created?.user?.id ?? null;
  }

  if (!userId) {
    return NextResponse.json({ error: "Could not resolve the account." }, { status: 500 });
  }

  // 2. Grant access to the film so they can open rooms. No expiry —
  //    the venue agreement runs until either side ends it.
  const { error: purchaseErr } = await admin.from("purchases").upsert(
    {
      user_id: userId,
      product: "movie",
      source: "venue-staff",
      venue_id: venue.id,
      stripe_session_id: `venue-${venue.slug}`,
    },
    { onConflict: "stripe_session_id" },
  );

  if (purchaseErr) {
    console.error("Venue purchase error:", purchaseErr);
    return NextResponse.json({ error: "Could not grant access." }, { status: 500 });
  }

  // 3. Link the venue to the account that will open its rooms.
  const { error: linkErr } = await admin
    .from("venues")
    .update({ host_user_id: userId })
    .eq("id", venue.id);

  if (linkErr) console.error("Venue link error:", linkErr);

  // 4. Send them everything they need.
  try {
    await sendVenueEmail(staffEmail, {
      name: venue.name,
      slug: venue.slug,
      priceEuros: venue.adult_price_cents / 100,
      tables: venue.table_count,
      seats: venue.seats_per_table,
    });
  } catch (emailErr) {
    console.error("Venue email error:", emailErr);
    return NextResponse.json(
      { ok: true, emailed: false, warning: "Access granted, but the email failed to send." },
      { status: 207 },
    );
  }

  return NextResponse.json({
    ok: true,
    emailed: true,
    venue: venue.name,
    slug: venue.slug,
    email: staffEmail,
    screen: `/v/${venue.slug}/screen`,
  });
}
