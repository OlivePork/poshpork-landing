const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log('API called');
  console.log('Has Stripe key:', !!process.env.STRIPE_SECRET_KEY);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { date, tickets, numPeople, dateDisplay } = req.body;
  
  console.log('Request body:', { date, tickets, numPeople, dateDisplay });

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY');
    return res.status(500).json({ error: 'Stripe configuration error' });
  }

  try {
    // Build line items from ticket breakdown
    const lineItems = [];
    
    // Count each ticket type
    const ticketCounts = {
      adult: 0,
      teenager: 0,
      child: 0
    };
    
    tickets.forEach(ticket => {
      ticketCounts[ticket.type]++;
    });
    
    // Add line items for each ticket type present
    if (ticketCounts.adult > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Adult Ticket',
            description: `The Posh Pork Murder Mystery - ${dateDisplay}`,
          },
          unit_amount: 1750, // €17.50
        },
        quantity: ticketCounts.adult,
      });
    }
    
    if (ticketCounts.teenager > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Teenager Ticket (13-17)',
            description: `The Posh Pork Murder Mystery - ${dateDisplay}`,
          },
          unit_amount: 1000, // €10
        },
        quantity: ticketCounts.teenager,
      });
    }
    
    if (ticketCounts.child > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Child Ticket (4-12)',
            description: `The Posh Pork Murder Mystery - ${dateDisplay}`,
          },
          unit_amount: 700, // €7
        },
        quantity: ticketCounts.child,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
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