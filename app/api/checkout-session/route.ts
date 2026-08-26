import { NextResponse } from "next/server";
import Stripe from "stripe";
import { roomAdmin } from "@/lib/rooms";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Book a place at a session.
 *
 * Seats are held for fifteen minutes at the moment this is called,
 * so a slow checkout cannot oversell the room. An abandoned payment
 * quietly returns its seats.
 *
 * POST /api/checkout-session
 *   { "session_id": "...", "email": "...", "adults": 2, "children": 1, "extras": 2 }
 */
export async function POST(req: Request) {
  const origin = new URL(req.url).origin;

  let body: {
    session_id?: string;
    email?: string;
    adults?: number;
    children?: number;
    extras?: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email.includes("@")) {
    return NextResponse.json({ error: "We need an email to send your tickets to." }, { status: 400 });
  }

  const adults = Math.min(Math.max(Number(body.adults) || 1, 1), 24);
  const children = Math.min(Math.max(Number(body.children) || 0, 0), 24);
  const extras = Math.min(Math.max(Number(body.extras) || 0, 0), adults + children);

  const admin = roomAdmin();

  const { data: session } = await admin
    .from("sessions")
    .select("id, title, starts_at, adult_price_cents, extra_label, extra_cents, venue_id, status")
    .eq("id", body.session_id ?? "")
    .eq("status", "open")
    .maybeSingle();

  if (!session) {
    return NextResponse.json({ error: "That session is no longer open." }, { status: 404 });
  }

  // Hold the seats before taking any money.
  const { data: holdId, error: holdErr } = await admin.rpc("hold_seats", {
    s_id: session.id,
    n_adults: adults,
    n_children: children,
    n_extras: extras,
    buyer_email: email,
  });

  if (holdErr) {
    const msg = holdErr.message || "";
    if (msg.includes("seats left")) {
      return NextResponse.json({ error: msg }, { status: 409 });
    }
    console.error("hold_seats error:", holdErr);
    return NextResponse.json({ error: "Could not hold those seats." }, { status: 500 });
  }

  const when = new Date(session.starts_at).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });

  type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;
  const items: LineItem[] = [
    {
      price_data: {
        currency: "eur",
        unit_amount: session.adult_price_cents,
        product_data: {
          name: `${session.title} — ${when}`,
          description: "One adult place. Under 18s free. Includes the film to keep afterwards.",
        },
      },
      quantity: adults,
    },
  ];

  if (extras > 0 && session.extra_cents) {
    items.push({
      price_data: {
        currency: "eur",
        unit_amount: session.extra_cents,
        product_data: { name: session.extra_label ?? "Extra" },
      },
      quantity: extras,
    });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: items,
    metadata: {
      product: "movie",
      source: "session",
      booking_id: String(holdId),
      session_id: session.id,
      venue_id: session.venue_id ?? "",
      adults: String(adults),
      children: String(children),
      extras: String(extras),
    },
    success_url: `${origin}/experiences?booked=1`,
    cancel_url: `${origin}/experiences`,
    // A held seat expires in fifteen minutes; give Stripe a little less.
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
  });

  return NextResponse.json({ url: checkout.url });
}
