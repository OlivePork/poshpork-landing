import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const origin = new URL(req.url).origin;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_GIFT_PRICE_ID!, quantity: 1 }],
    customer_email: user?.email,
    metadata: { user_id: user?.id ?? "", product: "gift" },
    allow_promotion_codes: true,
    success_url: `${origin}/gift/sent?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/movie`,
  });

  return NextResponse.json({ url: session.url });
}