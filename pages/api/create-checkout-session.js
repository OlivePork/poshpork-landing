const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Log for debugging
  console.log('API called');
  console.log('Has Stripe key:', !!process.env.STRIPE_SECRET_KEY);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { date, numPeople, dateDisplay } = req.body;
  
  console.log('Request body:', { date, numPeople, dateDisplay });

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY');
    return res.status(500).json({ error: 'Stripe configuration error' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'The Posh Pork Murder Mystery Experience',
              description: `Session: ${dateDisplay}`,
            },
            unit_amount: 1500,
          },
          quantity: numPeople,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}?success=true`,
      cancel_url: `${req.headers.origin}?canceled=true`,
      metadata: {
        session_date: date,
        session_display: dateDisplay,
        num_people: numPeople.toString(),
      },
    });

    console.log('Stripe session created:', session.id);
    console.log('Session URL:', session.url);

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}