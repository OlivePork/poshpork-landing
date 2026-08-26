import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.poshpork.com";

function admin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

/**
 * Build a one-click sign-in link.
 *
 * We construct the URL ourselves from `hashed_token` and point it at
 * /auth/confirm rather than using `action_link`. The default action_link uses
 * the PKCE flow, and Gmail pre-fetches links to scan them — which consumes the
 * single-use code before the recipient ever clicks it. The token-hash flow
 * survives that.
 */
export async function buildSignInLink(email: string, next = "/watch") {
  try {
    const { data, error } = await admin().auth.admin.generateLink({
      type: "magiclink",
      email,
    });
    if (error) console.error("generateLink error:", error);

    const hash = data?.properties?.hashed_token;
    if (hash) {
      return `${SITE_URL}/auth/confirm?token_hash=${hash}&type=email&next=${next}`;
    }
  } catch (err) {
    console.error("generateLink threw:", err);
  }
  return `${SITE_URL}${next}`;
}

/* ------------------------------------------------------------------ */
/* Shared shell                                                        */
/* ------------------------------------------------------------------ */

function shell({ tagline, body }: { tagline: string; body: string }) {
  return `
    <div style="font-family: Georgia, serif; color: #2c1810; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: #d4af37; font-size: 26px; margin: 0;">Which Food Is Killing You?</h1>
        <p style="color: #f5f1e8; font-style: italic; margin-top: 10px;">${tagline}</p>
      </div>
      <div style="background: #f5f1e8; padding: 40px 30px;">
        ${body}
      </div>
      <div style="background: #2c1810; padding: 20px; text-align: center;">
        <p style="color: #f5f1e8; font-size: 12px; margin: 0 0 8px;">&copy; 2026 Posh Pork. Mallorca, Spain.</p>
        <p style="color: #9a8f80; font-size: 11px; margin: 0; line-height: 1.6;">
          This film is for entertainment and education only. It is not medical advice,
          and nothing in it should replace a conversation with your doctor.
        </p>
      </div>
    </div>
  `;
}

function button(href: string, label: string) {
  return `
    <div style="text-align: center; margin: 34px 0;">
      <a href="${href}"
         style="display: inline-block; padding: 16px 36px; background: #d4af37; color: #0a0a0a; text-decoration: none; border-radius: 6px; font-weight: bold;">
        ${label}
      </a>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/* Buyer                                                               */
/* ------------------------------------------------------------------ */

export async function sendPurchaseEmail(email: string) {
  const link = await buildSignInLink(email);

  return resend.emails.send({
    from: "Posh Pork <mystery@poshpork.com>",
    replyTo: "colin@poshpork.com",
    to: email,
    subject: "Your film is ready to watch",
    html: shell({
      tagline: "Join the jury. Weigh the evidence.",
      body: `
        <p style="font-size: 16px; line-height: 1.6;"><strong>Thank you &mdash; your purchase is confirmed.</strong></p>
        <p style="font-size: 16px; line-height: 1.6;">
          One click and you're watching. No password, nothing to remember.
        </p>
        ${button(link, "Watch the Film")}
        <p style="font-size: 14px; line-height: 1.6; color: #888;">
          That link works once and expires. To watch again later, go to
          <a href="${SITE_URL}/login" style="color: #a67c00;">poshpork.com/login</a>
          and sign in with <strong>${email}</strong> &mdash; access is permanent.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #666;">
          Watch alone and the film waits for your answers, or put it on the big
          screen and let the whole room decide.
        </p>
      `,
    }),
  });
}

/* ------------------------------------------------------------------ */
/* Press                                                               */
/* ------------------------------------------------------------------ */

export async function sendPressEmail(email: string, outlet?: string) {
  const link = await buildSignInLink(email);
  const greeting = outlet
    ? `Access for <strong>${outlet}</strong> is set up.`
    : `Your press access is set up.`;

  return resend.emails.send({
    from: "Colin Marry <colin@poshpork.com>",
    replyTo: "colin@poshpork.com",
    to: email,
    subject: "Press access — Which Food Is Killing You?",
    html: shell({
      tagline: "A film that puts you on the jury.",
      body: `
        <p style="font-size: 16px; line-height: 1.6;">${greeting}</p>
        <p style="font-size: 16px; line-height: 1.6;">
          One click and it plays. No payment, no code, nothing to enter.
        </p>
        ${button(link, "Watch the Film")}
        <p style="font-size: 15px; line-height: 1.6;">
          There is no embargo and no conditions attached. Write whenever suits you,
          or not at all.
        </p>
        <p style="font-size: 15px; line-height: 1.6;">
          Every substantive claim in the film is published with its status &mdash; consensus,
          contested, or my own synthesis &mdash; and its source, at
          <a href="${SITE_URL}/press" style="color: #a67c00;">poshpork.com/press</a>,
          along with stills and production details.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #888;">
          That link works once. To return later, go to
          <a href="${SITE_URL}/login" style="color: #a67c00;">poshpork.com/login</a>
          and sign in with <strong>${email}</strong>.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #666;">
          Any questions, or anything you want to put to me directly, just reply to this.
        </p>
        <p style="font-size: 16px; line-height: 1.6; margin-top: 26px;">Colin Marry</p>
      `,
    }),
  });
}

/* ------------------------------------------------------------------ */
/* Screening licence                                                   */
/* ------------------------------------------------------------------ */

export async function sendLicenceEmail(
  email: string,
  opts: {
    organisation: string;
    licenceLabel: string;
    blurb: string;
    expiresAt: Date | null;
    invoiceRef?: string;
  },
) {
  const link = await buildSignInLink(email);

  const expiryLine = opts.expiresAt
    ? `Your licence runs until <strong>${opts.expiresAt.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}</strong>.`
    : `Your licence has no expiry date.`;

  const invoiceLine = opts.invoiceRef
    ? `<p style="font-size: 14px; line-height: 1.6; color: #888;">Invoice reference: ${opts.invoiceRef}</p>`
    : "";

  return resend.emails.send({
    from: "Colin Marry <colin@poshpork.com>",
    replyTo: "screening@poshpork.com",
    to: email,
    subject: `Your screening licence — Which Food Is Killing You?`,
    html: shell({
      tagline: "Put a room on the jury.",
      body: `
        <p style="font-size: 16px; line-height: 1.6;">
          <strong>Thank you.</strong> The ${opts.licenceLabel.toLowerCase()} for
          <strong>${opts.organisation}</strong> is now active &mdash; ${opts.blurb}.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">${expiryLine}</p>

        ${button(link, "Open the film")}

        <p style="font-size: 14px; line-height: 1.6; color: #888;">
          That link works once. To return at any time during your licence, go to
          <a href="${SITE_URL}/login" style="color: #a67c00;">poshpork.com/login</a>
          and sign in with <strong>${email}</strong>.
        </p>
        ${invoiceLine}

        <div style="border-top: 2px solid #d4af37; margin: 34px 0 0; padding-top: 26px;">
          <h2 style="color: #d4af37; font-size: 19px; margin: 0 0 16px; font-family: Georgia, serif;">
            Running it with a room
          </h2>

          <p style="font-size: 15px; line-height: 1.7;">
            <strong>1. Sit them in fours.</strong> Tables of four argue; tables of six
            have a quiet person in them.
          </p>

          <p style="font-size: 15px; line-height: 1.7;">
            <strong>2. Open a room.</strong> Before you press play, choose
            <em>Open a room</em>, set how many tables you have, and a six-character code
            appears. Put it on the screen or read it out.
          </p>

          <p style="font-size: 15px; line-height: 1.7;">
            <strong>3. Everyone joins.</strong> They go to
            <a href="${SITE_URL}/join" style="color: #a67c00;"><strong>poshpork.com/join</strong></a>
            on their phone and type the code. No app, no accounts, no sign-up. They pick
            a name and a table, and that is it.
          </p>

          <p style="font-size: 15px; line-height: 1.7;">
            <strong>4. Play the film.</strong> When a question comes up it appears on
            every phone at the same moment. Each table answers once &mdash; so they have
            to talk it through. Anyone at the table can put the answer in, or change it,
            and everyone at that table can see who did.
          </p>

          <p style="font-size: 15px; line-height: 1.7;">
            <strong>5. Watch the bar.</strong> Your screen shows the answers arriving.
            When the room is in, press continue and the film carries on. That is the only
            button you need to touch.
          </p>

          <p style="font-size: 15px; line-height: 1.7;">
            <strong>6. The verdict.</strong> At the end, every person votes individually
            on each of the four suspects, and the tables are ranked. Leave that on the
            screen while they argue about it.
          </p>

          <p style="font-size: 15px; line-height: 1.7; color: #666;">
            <strong>No phones allowed?</strong> Choose <em>Watching as a group</em>
            instead. Take a show of hands, type the number in, carry on. Works with any
            size of room and needs nothing but your own screen.
          </p>

          <p style="font-size: 15px; line-height: 1.7;">
            The full guide, with the questions and what to do with them, is at
            <a href="${SITE_URL}/facilitator" style="color: #a67c00;">poshpork.com/facilitator</a>.
          </p>
        </div>

        <div style="border-top: 1px solid #d9d2c4; margin-top: 30px; padding-top: 22px;">
          <p style="font-size: 15px; line-height: 1.7;">
            Every claim in the film is published with its source and its status at
            <a href="${SITE_URL}/press" style="color: #a67c00;">poshpork.com/press</a>
            &mdash; useful if you want to set follow-up work, or if someone challenges
            something.
          </p>

          <p style="font-size: 15px; line-height: 1.7; color: #666;">
            Anything at all &mdash; a question, a problem on the day, a room that will not
            connect &mdash; just reply to this. It comes straight to me.
          </p>

          <p style="font-size: 16px; line-height: 1.6; margin-top: 26px;">Colin Marry</p>
        </div>
      `,
    }),
  });
}


/* ------------------------------------------------------------------ */
/* Venue                                                               */
/* ------------------------------------------------------------------ */

export async function sendVenueEmail(
  email: string,
  v: { name: string; slug: string; priceEuros: number; tables: number; seats: number },
) {
  const link = await buildSignInLink(email);
  const screen = `${SITE_URL}/v/${v.slug}/screen`;

  return resend.emails.send({
    from: "Colin Marry <colin@poshpork.com>",
    replyTo: "screening@poshpork.com",
    to: email,
    subject: `${v.name} — everything you need to run a screening`,
    html: shell({
      tagline: "Four foods stand trial. Your room is the jury.",
      body: `
        <p style="font-size: 16px; line-height: 1.7;">
          <strong>${v.name} is set up.</strong> You can run a screening whenever you
          like, as often as you like. Here is everything you need.
        </p>

        <h2 style="color: #d4af37; font-size: 18px; margin: 32px 0 12px; font-family: Georgia, serif;">
          Your two links
        </h2>

        <p style="font-size: 15px; line-height: 1.7;">
          <strong>The lobby screen</strong> &mdash; put this on your projector or TV while
          guests arrive:<br>
          <a href="${screen}" style="color: #a67c00; word-break: break-all;">${screen}</a>
        </p>

        <p style="font-size: 15px; line-height: 1.7;">
          <strong>The film</strong> &mdash; this is yours, permanently:
        </p>

        ${button(link, "Open the film")}

        <p style="font-size: 14px; line-height: 1.6; color: #888;">
          That link works once. To come back at any time, go to
          <a href="${SITE_URL}/login" style="color: #a67c00;">poshpork.com/login</a>
          and sign in with <strong>${email}</strong>.
        </p>

        <h2 style="color: #d4af37; font-size: 18px; margin: 34px 0 12px; font-family: Georgia, serif;">
          Running an evening
        </h2>

        <p style="font-size: 15px; line-height: 1.7;">
          <strong>1. Open the room first.</strong> On the laptop driving the screen, sign in,
          open the film, and choose <em>Open a room</em>. Set the number of tables
          (you are set up for ${v.tables} tables of ${v.seats}). Do this before anyone starts
          scanning, or guests will pay and be told the screening has not opened.
        </p>

        <p style="font-size: 15px; line-height: 1.7;">
          <strong>2. Put the lobby screen up.</strong> Open the link above in a second tab
          and show it on the projector. Guests scan it from their seats.
        </p>

        <p style="font-size: 15px; line-height: 1.7;">
          <strong>3. Guests pay on their phones.</strong> &euro;${v.priceEuros.toFixed(0)} an
          adult, under 18s free. They go straight into the room afterwards &mdash; no code to
          type. They pick the table they are actually sitting at.
        </p>

        <p style="font-size: 15px; line-height: 1.7;">
          <strong>4. Switch to the film tab and press play.</strong> When a question comes up,
          the film pauses and it appears on every phone. Each table agrees one answer. Your
          screen shows them arriving &mdash; when the room is in, press continue. That is the
          only button you need all evening.
        </p>

        <p style="font-size: 15px; line-height: 1.7;">
          <strong>5. At the end</strong>, every person votes on each of the four suspects and
          the tables are ranked. Leave that up while they argue about it.
        </p>

        <h2 style="color: #d4af37; font-size: 18px; margin: 34px 0 12px; font-family: Georgia, serif;">
          What you keep
        </h2>

        <p style="font-size: 15px; line-height: 1.7;">
          Everything you sell around it &mdash; food, drink, rooms. We take no share of that
          and ask for no account of it. Guests pay us directly for the film, and they keep
          it afterwards to watch again at home.
        </p>

        <p style="font-size: 15px; line-height: 1.7;">
          The full guide is at
          <a href="${SITE_URL}/facilitator" style="color: #a67c00;">poshpork.com/facilitator</a>.
        </p>

        <p style="font-size: 15px; line-height: 1.7; color: #666;">
          Anything at all &mdash; including on the night, mid-screening &mdash; just reply to
          this. It comes straight to me.
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-top: 26px;">Colin Marry</p>
      `,
    }),
  });
}

/* ------------------------------------------------------------------ */
/* Experience booking                                                  */
/* ------------------------------------------------------------------ */

export async function sendBookingEmail(
  email: string,
  b: {
    title: string;
    startsAt: Date;
    durationMins: number;
    adults: number;
    children: number;
    extras: number;
    extraLabel: string | null;
    venueName: string | null;
    venueTown: string | null;
    address: string | null;
    mapsUrl: string | null;
    directions: string | null;
  },
) {
  const link = await buildSignInLink(email);

  const day = b.startsAt.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Madrid",
  });

  const time = b.startsAt.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });

  const who = [
    `${b.adults} ${b.adults === 1 ? "adult" : "adults"}`,
    b.children > 0 ? `${b.children} under 18` : null,
    b.extras > 0 && b.extraLabel ? `${b.extras} × ${b.extraLabel.toLowerCase()}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const place = b.address ?? [b.venueName, b.venueTown].filter(Boolean).join(", ");

  /* ---------------- the guest ---------------- */

  const guest = resend.emails.send({
    from: "Posh Pork <mystery@poshpork.com>",
    replyTo: "screening@poshpork.com",
    to: email,
    subject: `You're booked — ${day}, ${time}`,
    html: shell({
      tagline: "Four foods stand trial. Your table is the jury.",
      body: `
        <p style="font-size: 16px; line-height: 1.7;">
          <strong>You have a place.</strong> Here is everything you need.
        </p>

        <table style="width:100%; border-collapse:collapse; margin:28px 0;">
          <tr>
            <td style="padding:12px 16px 12px 0; border-bottom:1px solid #e0d9cb; font-size:13px; letter-spacing:.1em; text-transform:uppercase; color:#a67c00; white-space:nowrap; vertical-align:top;">When</td>
            <td style="padding:12px 0; border-bottom:1px solid #e0d9cb; font-size:16px;"><strong>${day}</strong><br>${time}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px 12px 0; border-bottom:1px solid #e0d9cb; font-size:13px; letter-spacing:.1em; text-transform:uppercase; color:#a67c00; white-space:nowrap; vertical-align:top;">Where</td>
            <td style="padding:12px 0; border-bottom:1px solid #e0d9cb; font-size:16px;">
              ${place}
              ${b.mapsUrl ? `<br><a href="${b.mapsUrl}" style="color:#a67c00; font-size:15px;">Open in maps</a>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px 12px 0; border-bottom:1px solid #e0d9cb; font-size:13px; letter-spacing:.1em; text-transform:uppercase; color:#a67c00; white-space:nowrap; vertical-align:top;">Who</td>
            <td style="padding:12px 0; border-bottom:1px solid #e0d9cb; font-size:16px;">${who}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px 12px 0; font-size:13px; letter-spacing:.1em; text-transform:uppercase; color:#a67c00; white-space:nowrap; vertical-align:top;">How long</td>
            <td style="padding:12px 0; font-size:16px;">About ${Math.round(b.durationMins / 60)} hours</td>
          </tr>
        </table>

        ${b.directions ? `<p style="font-size:15px; line-height:1.7; color:#666;">${b.directions}</p>` : ""}

        <h2 style="color:#d4af37; font-size:18px; margin:34px 0 12px; font-family:Georgia,serif;">On the day</h2>

        <p style="font-size:15px; line-height:1.7;">
          Come a few minutes early. You will be seated with other people &mdash; that is
          deliberate, and it is where the whole thing happens.
        </p>

        <p style="font-size:15px; line-height:1.7;">
          <strong>Bring your phone.</strong> There will be a code on the screen; you scan
          it and you are in. No app, no sign-up, and it takes about a minute.
        </p>

        <p style="font-size:15px; line-height:1.7;">
          When a question appears during the film, your table answers once &mdash; so you
          have to talk it through first. At the end everyone votes on each of the four
          suspects, and the tables are ranked.
        </p>

        <h2 style="color:#d4af37; font-size:18px; margin:34px 0 12px; font-family:Georgia,serif;">The film is yours</h2>

        <p style="font-size:15px; line-height:1.7;">
          Your booking includes permanent access, so you can watch it again at home with
          whoever you like.
        </p>

        ${button(link, "Open the film")}

        <p style="font-size:14px; line-height:1.6; color:#888;">
          That link works once. To come back later, go to
          <a href="${SITE_URL}/login" style="color:#a67c00;">poshpork.com/login</a>
          and sign in with <strong>${email}</strong>.
        </p>

        <p style="font-size:15px; line-height:1.7; color:#666;">
          If something changes, or you cannot come, just reply to this. It comes straight
          to me.
        </p>

        <p style="font-size:16px; line-height:1.6; margin-top:26px;">Colin Marry</p>
      `,
    }),
  });

  /* ---------------- the host ---------------- */
  /* Short, plain, and readable on a phone. The only thing that       */
  /* matters is knowing somebody is coming and when.                  */

  const host = resend.emails.send({
    from: "Posh Pork <mystery@poshpork.com>",
    replyTo: email,
    to: process.env.ADMIN_EMAIL || "colin@poshpork.com",
    subject: `Booking — ${day}, ${time} · ${who}`,
    html: `
      <div style="font-family: Georgia, serif; color: #2c1810; max-width: 520px; margin: 0 auto; padding: 24px;">
        <p style="font-size: 20px; margin: 0 0 6px; color: #a67c00;"><strong>${day}</strong></p>
        <p style="font-size: 28px; margin: 0 0 22px;"><strong>${time}</strong></p>

        <table style="width:100%; border-collapse:collapse; font-size:16px;">
          <tr>
            <td style="padding:8px 16px 8px 0; color:#888; white-space:nowrap;">Who</td>
            <td style="padding:8px 0;">${who}</td>
          </tr>
          <tr>
            <td style="padding:8px 16px 8px 0; color:#888; white-space:nowrap;">Email</td>
            <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#a67c00;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 16px 8px 0; color:#888; white-space:nowrap;">Where</td>
            <td style="padding:8px 0;">${place}</td>
          </tr>
        </table>

        <p style="font-size:14px; color:#888; margin-top:26px;">
          Reply to this and it goes to them.
        </p>
      </div>
    `,
  });

  // Both go out together. The guest's confirmation is the one that
  // must not fail — if the host note fails, the booking is still fine.
  const [guestResult] = await Promise.all([guest, host.catch((err) => {
    console.error("Host booking notification failed:", err);
    return null;
  })]);

  return guestResult;
}