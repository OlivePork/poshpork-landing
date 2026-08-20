import { NextResponse } from "next/server";
import Stripe from "stripe";
import { roomAdmin } from "@/lib/rooms";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const origin = new URL(req.url).origin;

  let body: { slug?: string; adults?: number; children?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const slug = String(body.slug ?? "").toLowerCase();
  const adults = Math.min(Math.max(Number(body.adults) || 1, 1), 20);
  const children = Math.min(Math.max(Number(body.children) || 0, 0), 20);

  const admin = roomAdmin();

  const { data: venue } = await admin
    .from("venues")
    .select("id, slug, name, adult_price_cents")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (!venue) {
    return NextResponse.json({ error: "No such venue" }, { status: 404 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: venue.adult_price_cents,
          product_data: {
            name: `Which Food Is Killing You? — ${venue.name}`,
            description:
              "One adult ticket. Under 18s free. Permanent access to the film afterwards.",
          },
        },
        quantity: adults,
      },
    ],
    metadata: {
      product: "movie",
      source: "venue",
      venue_id: venue.id,
      venue_slug: venue.slug,
      adults: String(adults),
      children: String(children),
    },
    // Straight into the room. No code to type — the venue slug finds it.
    success_url: `${origin}/join?v=${venue.slug}`,
    cancel_url: `${origin}/v/${venue.slug}`,
  });

  return NextResponse.json({ url: session.url });
}