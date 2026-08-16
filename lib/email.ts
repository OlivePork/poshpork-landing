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
      tagline: "Join the jury. Weigh the evidence.",
      body: `
        <p style="font-size: 16px; line-height: 1.6;">
          <strong>Thank you.</strong> The ${opts.licenceLabel.toLowerCase()} for
          <strong>${opts.organisation}</strong> is now active &mdash; ${opts.blurb}.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">${expiryLine}</p>
        ${button(link, "Watch the Film")}
        <p style="font-size: 14px; line-height: 1.6; color: #888;">
          That link works once. To return at any time during your licence, go to
          <a href="${SITE_URL}/login" style="color: #a67c00;">poshpork.com/login</a>
          and sign in with <strong>${email}</strong>.
        </p>
        ${invoiceLine}
        <h2 style="color: #d4af37; font-size: 18px; margin: 32px 0 12px; font-family: Georgia, serif;">Showing it to a room</h2>
        <p style="font-size: 15px; line-height: 1.6;">
          The film pauses at points and puts a question on screen. Choose
          <strong>Watching as a group</strong> when it starts, and tell it how many
          people are in the room. Number keys answer, <strong>T</strong> holds the
          clock if you want longer, and <strong>Enter</strong> moves on.
        </p>
        <p style="font-size: 15px; line-height: 1.6;">
          You only need one screen and one device. Take the room's answer, tap it in,
          and carry on. At the end everyone votes on each of the four suspects.
        </p>
        <p style="font-size: 15px; line-height: 1.6;">
          Every claim in the film is published with its source at
          <a href="${SITE_URL}/press" style="color: #a67c00;">poshpork.com/press</a>
          &mdash; useful if you want to set follow-up work.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #666;">
          Anything at all, just reply to this. It comes straight to me.
        </p>
        <p style="font-size: 16px; line-height: 1.6; margin-top: 26px;">Colin Marry</p>
      `,
    }),
  });
}
