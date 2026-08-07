import Stripe from 'stripe';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Service role — bypasses RLS so we can create users and write purchases.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await getRawBody(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // ================================================================
    // MOVIE PURCHASE
    // ================================================================
    if (session.metadata?.product === 'movie') {
      const email = session.customer_details?.email || session.customer_email;
      let userId = session.metadata.user_id || null;

      try {
        // Create the account if they bought without signing in first.
        if (!userId && email) {
          const { data: created } = await supabase.auth.admin.createUser({
            email,
            email_confirm: true,
          });
          userId = created?.user?.id || null;

          // Already existed — find them instead.
          if (!userId) {
            const { data: list } = await supabase.auth.admin.listUsers();
            userId = list?.users?.find((u) => u.email === email)?.id || null;
          }
        }

        if (userId) {
          const { error } = await supabase.from('purchases').upsert(
            {
              user_id: userId,
              product: 'movie',
              stripe_session_id: session.id,
              amount_cents: session.amount_total,
            },
            { onConflict: 'stripe_session_id' }
          );
          if (error) console.error('Purchase insert error:', error);
          else console.log('Movie purchase saved for', email);
        } else {
          console.error('Could not resolve user for movie purchase', email);
        }
      } catch (movieErr) {
        console.error('Movie purchase error:', movieErr);
      }

      // Generate a one-click sign-in link so they never type their email.
      let watchLink = 'https://www.poshpork.com/watch';
      try {
        const { data: linkData } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email,
          options: { redirectTo: 'https://www.poshpork.com/auth/callback?next=/watch' },
        });
        if (linkData?.properties?.action_link) {
          watchLink = linkData.properties.action_link;
        }
      } catch (linkErr) {
        console.error('Magic link error:', linkErr);
      }

      try {
        await resend.emails.send({
          from: 'Posh Pork <mystery@poshpork.com>',
          replyTo: 'colin@permapigs.com',
          to: email,
          subject: 'Your film is ready to watch 🔍',
          html: `
            <div style="font-family: Georgia, serif; color: #2c1810; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #d4af37; font-size: 26px; margin: 0;">Which Food Is Killing You?</h1>
                <p style="color: #f5f1e8; font-style: italic; margin-top: 10px;">Join the jury. Weigh the evidence.</p>
              </div>
              <div style="background: #f5f1e8; padding: 40px 30px;">
                <p style="font-size: 16px; line-height: 1.6;"><strong>Thank you — your purchase is confirmed.</strong></p>
                <p style="font-size: 16px; line-height: 1.6;">
                  One click and you're watching. No password, nothing to remember.
                </p>
                <div style="text-align: center; margin: 34px 0;">
                  <a href="${watchLink}"
                     style="display: inline-block; padding: 16px 36px; background: #d4af37; color: #0a0a0a; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Watch the Film
                  </a>
                </div>
                <p style="font-size: 14px; line-height: 1.6; color: #888;">
                  That link works once and expires. To watch again later, go to
                  <a href="https://www.poshpork.com/login" style="color: #a67c00;">poshpork.com/login</a>
                  and sign in with <strong>${email}</strong> — access is permanent.
                </p>
                <p style="font-size: 15px; line-height: 1.6; color: #666;">
                  Watch alone and the film waits for your answers, or put it on the big
                  screen and let the whole room decide.
                </p>
              </div>
              <div style="background: #2c1810; padding: 20px; text-align: center;">
                <p style="color: #f5f1e8; font-size: 12px; margin: 0;">© 2026 Posh Pork. Mallorca, Spain.</p>
              </div>
            </div>
          `,
        });
        console.log('Movie email sent');
      } catch (emailErr) {
        console.error('Movie email error:', emailErr);
      }

      return res.status(200).json({ received: true });
    }

    // ================================================================
    // LIVE EVENT BOOKING — unchanged
    // ================================================================
    const customerEmail = session.customer_details.email;
    const customerName = session.customer_details.name;
    const sessionDate = session.metadata.session_date;
    const sessionDisplay = session.metadata.session_display;
    const numPeople = session.metadata.num_people;

    try {
      const { error } = await supabase.from('bookings').insert([{
        session_date: sessionDate,
        session_display: sessionDisplay,
        num_people: parseInt(numPeople),
        customer_email: customerEmail,
        customer_name: customerName,
        stripe_session_id: session.id,
      }]);

      if (error) {
        console.error('Supabase error:', error);
      } else {
        console.log('Booking saved');
      }
    } catch (dbErr) {
      console.error('DB error:', dbErr);
    }

    try {
      await resend.emails.send({
        from: 'Posh Pork <mystery@poshpork.com>',
        replyTo: 'colin@permapigs.com',
        to: customerEmail,
        subject: 'Your Posh Pork Murder Mystery Experience is Confirmed! 🔍',
        html: `
          <div style="font-family: Georgia, serif; color: #2c1810; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #d4af37; font-size: 28px; margin: 0;">The Posh Pork Murder Mystery</h1>
              <p style="color: #f5f1e8; font-style: italic; margin-top: 10px;">Join the jury. Solve the mystery.</p>
            </div>
            
            <div style="background: #f5f1e8; padding: 40px 30px;">
              <p style="font-size: 18px; margin-bottom: 20px;">Dear ${customerName},</p>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                <strong>Thank you for booking The Posh Pork Murder Mystery Experience!</strong>
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Your seat is confirmed for:
              </p>
              
              <div style="background: white; border: 2px solid #d4af37; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
                <p style="font-size: 20px; color: #d4af37; margin: 0; font-weight: bold;">📅 ${sessionDisplay}</p>
                <p style="font-size: 16px; margin: 10px 0 0 0;">👥 ${numPeople} Guest${numPeople > 1 ? 's' : ''}</p>
              </div>
              
              <div style="border-top: 1px solid #d4af37; padding-top: 20px; margin-top: 30px;">
                <h2 style="color: #d4af37; font-size: 20px; margin-bottom: 15px;">📍 LOCATION</h2>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 10px;">
                  <strong>Possessió Vernissa</strong><br/>
                  Llucmajor, Mallorca, Spain
                </p>
                <p style="font-size: 14px; line-height: 1.6; font-style: italic; color: #666;">
                  Detailed directions and access information will be sent to you 48 hours before your session.
                </p>
              </div>
              
              <div style="border-top: 1px solid #d4af37; padding-top: 20px; margin-top: 30px;">
                <h2 style="color: #d4af37; font-size: 20px; margin-bottom: 15px;">🔍 WHAT TO EXPECT</h2>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                  This is a 90-minute interactive virtual murder mystery experience focused on food education and entertainment. 
                  Your session will be hosted by the creator himself over coffee.
                </p>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                  You'll join the jury, examine the evidence, and cast your verdict in a groundbreaking new tourism experience.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  As one of our trial participants, your feedback will help shape the future of this experience.
                </p>
              </div>
              
              <div style="border-top: 1px solid #d4af37; padding-top: 20px; margin-top: 30px;">
                <h2 style="color: #d4af37; font-size: 20px; margin-bottom: 15px;">📋 WHAT TO BRING</h2>
                <ul style="font-size: 16px; line-height: 1.8; padding-left: 20px;">
                  <li>An open mind and curiosity</li>
                  <li>Yourself and your guest(s)</li>
                  <li>Questions are welcome!</li>
                </ul>
              </div>
              
              <div style="border-top: 1px solid #d4af37; padding-top: 20px; margin-top: 30px;">
                <h2 style="color: #d4af37; font-size: 20px; margin-bottom: 15px;">💬 QUESTIONS OR NEED TO RESCHEDULE?</h2>
                <p style="font-size: 16px; line-height: 1.6;">
                  Contact us at <a href="mailto:mystery@poshpork.com" style="color: #a67c00; text-decoration: underline;">mystery@poshpork.com</a>
                </p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; margin-top: 40px; margin-bottom: 10px;">
                We look forward to seeing you!
              </p>
              
              <p style="font-size: 16px; font-weight: bold; margin: 0;">
                The Posh Pork Team
              </p>
              <p style="font-size: 14px; font-style: italic; color: #a67c00; margin-top: 5px;">
                Join the jury. Solve the mystery.
              </p>
            </div>
            
            <div style="background: #2c1810; padding: 20px; text-align: center;">
              <p style="color: #f5f1e8; font-size: 12px; margin: 0;">
                © 2026 Posh Pork. Mallorca, Spain.
              </p>
            </div>
          </div>
        `,
      });
      console.log('Email sent');
    } catch (emailErr) {
      console.error('Email error:', emailErr);
    }
  }

  res.status(200).json({ received: true });
}