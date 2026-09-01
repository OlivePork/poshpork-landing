import Stripe from 'stripe';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { sendBookingEmail } from '../../lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.poshpork.com';
const REPLY_TO = 'colin@poshpork.com';

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

/**
 * A one-click sign-in link.
 *
 * Built from `hashed_token` and pointed at /auth/confirm rather than using
 * `action_link`. The default action_link uses the PKCE flow, and Gmail
 * pre-fetches links to scan them — which consumes the single-use code
 * before the buyer ever clicks it. The token-hash flow survives that.
 */
async function signInLink(email, next = '/watch') {
  try {
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
    });
    if (error) console.error('Magic link error:', error);

    const hash = data?.properties?.hashed_token;
    if (hash) {
      // /open holds the token until a human presses a button. Corporate
      // mail scanners fetch every link in an email, which consumes a
      // single-use token before the recipient ever clicks it.
      return `${SITE_URL}/open?token_hash=${hash}&next=${encodeURIComponent(next)}`;
    }
  } catch (err) {
    console.error('Magic link error:', err);
  }
  return `${SITE_URL}${next}`;
}

/** Find the account for an email, or make one. */
async function findOrCreateUser(email) {
  if (!email) return null;

  const { data: existing } = await supabase
    .from('user_lookup')
    .select('id')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (existing?.id) return existing.id;

  const { data: created, error } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  });
  if (error) {
    console.error('Create user error:', error);
    return null;
  }
  return created?.user?.id || null;
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
    // EXPERIENCE BOOKING
    //
    // Must come before the movie branch: a booking also carries
    // product='movie' in its metadata, because it includes the film.
    // ================================================================
    if (session.metadata?.source === 'session' && session.metadata?.booking_id) {
      const bookingId = session.metadata.booking_id;

      // 1. Mark it paid. Until this happens the seats are only held,
      //    and the hold expires in fifteen minutes.
      const { error: bookErr } = await supabase
        .from('bookings')
        .update({
          status: 'paid',
          amount_cents: session.amount_total,
          stripe_session_id: session.id,
          name: session.customer_details?.name || null,
          held_until: null,
        })
        .eq('id', bookingId);

      if (bookErr) {
        console.error('Booking update error — asking Stripe to retry:', bookErr);
        return res.status(500).json({ error: 'Could not confirm the booking' });
      }

      // 2. Everything the confirmation needs, in one call.
      const { data: rows, error: detailErr } = await supabase
        .rpc('booking_details', { b_id: bookingId });

      const d = (rows || [])[0];

      if (detailErr || !d) {
        console.error('Booking details error:', detailErr);
        return res.status(500).json({ error: 'Could not read the booking' });
      }

      // 3. Account and film access, so they keep it afterwards.
      const userId = await findOrCreateUser(d.email);

      if (userId) {
        await supabase.from('bookings').update({ user_id: userId }).eq('id', bookingId);

        const { error: purchaseErr } = await supabase.from('purchases').upsert(
          {
            user_id: userId,
            product: 'movie',
            source: 'session',
            venue_id: session.metadata.venue_id || null,
            adults: Number(session.metadata.adults) || null,
            children: Number(session.metadata.children) || null,
            stripe_session_id: session.id,
            amount_cents: session.amount_total,
          },
          { onConflict: 'stripe_session_id' }
        );

        if (purchaseErr) {
          console.error('Booking purchase error:', purchaseErr);
          return res.status(500).json({ error: 'Could not grant access' });
        }
      } else {
        console.error('Could not resolve user for booking', d.email);
      }

      // 4. The confirmation. Everything above is idempotent, so a
      //    Stripe retry after an email failure is safe.
      try {
        await sendBookingEmail(d.email, {
          title: d.title,
          startsAt: new Date(d.starts_at),
          durationMins: d.duration_mins,
          adults: d.adults,
          children: d.children,
          extras: d.extras,
          extraLabel: d.extra_label,
          venueName: d.venue_name,
          venueTown: d.venue_town,
          address: d.address,
          mapsUrl: d.maps_url,
          directions: d.directions,
        });
        console.log('Booking confirmation sent to', d.email);
      } catch (emailErr) {
        console.error('Booking email error — asking Stripe to retry:', emailErr);
        return res.status(500).json({ error: 'Email failed, retry please' });
      }

      return res.status(200).json({ received: true });
    }

    // ================================================================
    // MOVIE PURCHASE
    // ================================================================
    if (session.metadata?.product === 'movie') {
      const email = session.customer_details?.email || session.customer_email;
      let userId = session.metadata.user_id || null;

      try {
        if (!userId && email) {
          // Look first. Creating blind is what produced duplicate accounts.
          userId = await findOrCreateUser(email);
        }

        if (userId) {
          // Venue screenings carry their attribution in the Stripe metadata,
          // so a ticket bought at a hotel can be traced back to that hotel.
          const venueId = session.metadata?.venue_id || null;
          const adults = session.metadata?.adults ? Number(session.metadata.adults) : null;
          const children = session.metadata?.children ? Number(session.metadata.children) : null;

          const { error } = await supabase.from('purchases').upsert(
            {
              user_id: userId,
              product: 'movie',
              source: session.metadata?.source || 'stripe',
              venue_id: venueId,
              adults,
              children,
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

      const watchLink = await signInLink(email);

      try {
        await resend.emails.send({
          from: 'Posh Pork <mystery@poshpork.com>',
          replyTo: REPLY_TO,
          to: email,
          subject: 'Your film is ready to watch',
          html: `
            <div style="font-family: Georgia, serif; color: #2c1810; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #d4af37; font-size: 26px; margin: 0;">Which Food Is Killing You?</h1>
                <p style="color: #f5f1e8; font-style: italic; margin-top: 10px;">Join the jury. Weigh the evidence.</p>
              </div>
              <div style="background: #f5f1e8; padding: 40px 30px;">
                <p style="font-size: 16px; line-height: 1.6;"><strong>Thank you &mdash; your purchase is confirmed.</strong></p>
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
                  <a href="${SITE_URL}/login" style="color: #a67c00;">poshpork.com/login</a>
                  and sign in with <strong>${email}</strong> &mdash; access is permanent.
                </p>
                <p style="font-size: 15px; line-height: 1.6; color: #666;">
                  Watch alone and the film waits for your answers, or put it on the big
                  screen and let the whole room decide.
                </p>
              </div>
              <div style="background: #2c1810; padding: 20px; text-align: center;">
                <p style="color: #f5f1e8; font-size: 12px; margin: 0 0 8px;">&copy; 2026 Posh Pork. Mallorca, Spain.</p>
                <p style="color: #9a8f80; font-size: 11px; margin: 0; line-height: 1.6;">
                  This film is for entertainment and education only. It is not medical advice,
                  and nothing in it should replace a conversation with your doctor.
                </p>
              </div>
            </div>
          `,
        });
        console.log('Movie email sent');
      } catch (emailErr) {
        // Do NOT swallow this. The purchase is already saved and keyed on
        // stripe_session_id, so a retry cannot duplicate access — but a
        // swallowed failure means the buyer paid and never got their link.
        //
        // Returning a non-200 makes Stripe retry with backoff over 72 hours,
        // which is free, automatic retry logic we would otherwise have to build.
        console.error('Movie email error — asking Stripe to retry:', emailErr);
        return res.status(500).json({ error: 'Email failed, retry please' });
      }

      return res.status(200).json({ received: true });
    }

    // ================================================================
    // GIFT PURCHASE
    // ================================================================
    if (session.metadata?.product === 'gift') {
      const email = session.customer_details?.email || session.customer_email;
      const userId = session.metadata.user_id || null;

      // POSH-XXXX-XXXX, avoiding characters people misread.
      const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      const chunk = () =>
        Array.from({ length: 4 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
      const code = `POSH-${chunk()}-${chunk()}`;

      // Upsert on the Stripe session, not insert. If the email fails and
      // Stripe retries this webhook, the same session must not mint a
      // second code.
      let issuedCode = code;
      try {
        const { data: existingGift } = await supabase
          .from('gift_codes')
          .select('code')
          .eq('stripe_session_id', session.id)
          .maybeSingle();

        if (existingGift?.code) {
          issuedCode = existingGift.code;
          console.log('Gift code already issued for this session', issuedCode);
        } else {
          await supabase.from('gift_codes').insert({
            code,
            purchaser_user_id: userId,
            purchaser_email: email,
            stripe_session_id: session.id,
          });
          console.log('Gift code created', code);
        }
      } catch (giftErr) {
        console.error('Gift code error:', giftErr);
        return res.status(500).json({ error: 'Could not issue the code, retry please' });
      }

      try {
        const shareText = encodeURIComponent(
          `I've sent you a film - Which Food Is Killing You?\n\nRedeem it here: ${SITE_URL}/redeem?code=${issuedCode}`
        );

        await resend.emails.send({
          from: 'Posh Pork <mystery@poshpork.com>',
          replyTo: REPLY_TO,
          to: email,
          subject: 'Your gift code is ready',
          html: `
            <div style="font-family: Georgia, serif; color: #2c1810; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #d4af37; font-size: 26px; margin: 0;">Which Food Is Killing You?</h1>
                <p style="color: #f5f1e8; font-style: italic; margin-top: 10px;">A gift worth arguing about.</p>
              </div>
              <div style="background: #f5f1e8; padding: 40px 30px; text-align: center;">
                <p style="font-size: 16px; line-height: 1.6;">Thank you. Here is your gift code:</p>
                <p style="font-size: 30px; font-family: monospace; letter-spacing: 2px; color: #2c1810; background: #fff; border: 2px dashed #d4af37; border-radius: 8px; padding: 20px; margin: 26px 0;">
                  ${issuedCode}
                </p>
                <a href="https://wa.me/?text=${shareText}"
                   style="display: inline-block; padding: 16px 36px; background: #25D366; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Send it on WhatsApp
                </a>
                <p style="font-size: 14px; line-height: 1.6; color: #888; margin-top: 26px;">
                  Or send them this link yourself:<br/>
                  <a href="${SITE_URL}/redeem?code=${issuedCode}" style="color: #a67c00;">${SITE_URL}/redeem?code=${issuedCode}</a>
                </p>
              </div>
              <div style="background: #2c1810; padding: 20px; text-align: center;">
                <p style="color: #f5f1e8; font-size: 12px; margin: 0;">&copy; 2026 Posh Pork. Mallorca, Spain.</p>
              </div>
            </div>
          `,
        });
        console.log('Gift email sent');
      } catch (emailErr) {
        // The code is already saved, and the insert is keyed on the Stripe
        // session, so a retry will not mint a second code.
        console.error('Gift email error — asking Stripe to retry:', emailErr);
        return res.status(500).json({ error: 'Email failed, retry please' });
      }

      return res.status(200).json({ received: true });
    }

    // ================================================================
    // SUPPORT LIST
    // ================================================================
    if (session.metadata?.product === 'support') {
      const email = session.customer_details?.email || session.customer_email;

      try {
        await supabase.from('supporters').insert({
          user_id: session.metadata.user_id || null,
          email,
          supermarket: session.metadata.supermarket,
          country: session.metadata.country,
          stripe_session_id: session.id,
        });
        console.log('Supporter added', email, session.metadata.supermarket);
      } catch (supErr) {
        console.error('Supporter insert error:', supErr);
      }

      return res.status(200).json({ received: true });
    }

    // ================================================================
    // Anything else.
    //
    // The old live-event branch was removed with BookingTabs — nothing
    // creates those checkout sessions any more, and the `bookings` table
    // it wrote to is now the experiences table with a different shape.
    // ================================================================
    console.log('Unrecognised checkout session, no action taken:', session.id);
    return res.status(200).json({ received: true });
  }

  res.status(200).json({ received: true });
}
