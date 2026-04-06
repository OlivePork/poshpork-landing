import type { NextApiRequest, NextApiResponse } from 'next';
const Stripe = require('stripe');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { date, numPeople } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'The Posh Pork Murder Mystery Experience',
            description: `${date} - ${numPeople} people`,
          },
          unit_amount: 1500,
        },
        quantity: numPeople,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000?success=true',
      cancel_url: 'http://localhost:3000?canceled=true',
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}