import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const origin = new URL(req.url).origin;
  const { supermarket, country } = await req.json();

  if (!supermarket?.trim() || !country?.trim()) {
    return NextResponse.json({ error: "Supermarket and country needed" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_SUPPORT_PRICE_ID!, quantity: 1 }],
    customer_email: user?.email,
    metadata: {
      user_id: user?.id ?? "",
      product: "support",
      supermarket: supermarket.trim().slice(0, 120),
      country: country.trim().slice(0, 60),
    },
    success_url: `${origin}/watch?supported=1`,
    cancel_url: `${origin}/watch`,
  });

  return NextResponse.json({ url: session.url });
}