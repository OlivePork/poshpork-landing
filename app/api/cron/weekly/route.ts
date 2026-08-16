import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { SITE_URL } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY!);

/**
 * Monday morning summary, plus a gentle note to any licence holder who has
 * gone past what they bought.
 *
 * Runs from Vercel Cron. Add to vercel.json:
 *   { "crons": [{ "path": "/api/cron/weekly", "schedule": "0 8 * * 1" }] }
 *
 * Vercel sends an Authorization header with CRON_SECRET on scheduled runs.
 */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const [{ data: week }, { data: licences }, { data: events }] = await Promise.all([
    admin.rpc("usage_week"),
    admin.rpc("usage_by_licence"),
    admin.rpc("usage_events", { since: new Date(Date.now() - 7 * 864e5).toISOString() }),
  ]);

  const w = (week ?? [])[0] ?? {
    events: 0, players: 0, answers: 0, new_licences: 0, film_sales: 0,
  };

  type L = {
    licence_id: string; organisation: string; email: string; licence_type: string;
    headcount: number | null; events_run: number; largest_event: number;
    expires_at: string | null; over_headcount: boolean; limit_notified_at: string | null;
  };

  const rows = (licences ?? []) as L[];
  const flagged = rows.filter((l) => l.over_headcount);

  // Expiring within 30 days.
  const soon = rows.filter((l) => {
    if (!l.expires_at) return false;
    const d = new Date(l.expires_at).getTime();
    return d > Date.now() && d < Date.now() + 30 * 864e5;
  });

  /* ---------------- the weekly summary ---------------- */

  const eventList = ((events ?? []) as { room_name: string | null; code: string; organisation: string | null; host_email: string; players: number; started_at: string }[])
    .map((e) => `
      <tr>
        <td style="padding:8px 12px 8px 0;border-bottom:1px solid #e0d9cb;">${new Date(e.started_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</td>
        <td style="padding:8px 12px 8px 0;border-bottom:1px solid #e0d9cb;">${e.organisation ?? e.room_name ?? e.code}</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0d9cb;text-align:right;">${e.players}</td>
      </tr>`)
    .join("");

  const flagBlock = flagged.length
    ? `
      <h3 style="color:#8c2f27;font-size:16px;margin:30px 0 10px;">Worth a look</h3>
      ${flagged.map((l) => `
        <p style="font-size:14px;line-height:1.6;margin:0 0 8px;">
          <strong>${l.organisation}</strong> —
          ${l.events_run > 1
            ? `${l.events_run} events on a single-event licence`
            : `${l.largest_event} people, licensed for ${l.headcount}`}
          <br><span style="color:#888;">${l.email}</span>
        </p>`).join("")}
    `
    : "";

  const expiryBlock = soon.length
    ? `
      <h3 style="color:#a67c00;font-size:16px;margin:30px 0 10px;">Expiring within 30 days</h3>
      ${soon.map((l) => `
        <p style="font-size:14px;line-height:1.6;margin:0 0 6px;">
          <strong>${l.organisation}</strong> — ${new Date(l.expires_at!).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          <br><span style="color:#888;">${l.email}</span>
        </p>`).join("")}
    `
    : "";

  try {
    await resend.emails.send({
      from: "Posh Pork <mystery@poshpork.com>",
      to: process.env.ADMIN_EMAIL!,
      subject: `Week in review — ${w.events} events, ${w.players} people`,
      html: `
        <div style="font-family:Georgia,serif;color:#2c1810;max-width:600px;margin:0 auto;">
          <div style="background:#2c1810;padding:28px 20px;text-align:center;">
            <h1 style="color:#d4af37;font-size:20px;margin:0;">Which Food Is Killing You?</h1>
            <p style="color:#f5f1e8;font-size:13px;margin:6px 0 0;">The last seven days</p>
          </div>
          <div style="background:#f5f1e8;padding:32px 26px;">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:6px 0;font-size:15px;">Events run</td>
                <td style="padding:6px 0;text-align:right;font-size:20px;color:#a67c00;"><strong>${w.events}</strong></td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:15px;">Participants</td>
                <td style="padding:6px 0;text-align:right;font-size:20px;color:#a67c00;"><strong>${w.players}</strong></td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:15px;">Answers cast</td>
                <td style="padding:6px 0;text-align:right;font-size:20px;color:#a67c00;"><strong>${w.answers}</strong></td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:15px;">New licences</td>
                <td style="padding:6px 0;text-align:right;font-size:20px;color:#a67c00;"><strong>${w.new_licences}</strong></td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:15px;">Film sales</td>
                <td style="padding:6px 0;text-align:right;font-size:20px;color:#a67c00;"><strong>${w.film_sales}</strong></td>
              </tr>
            </table>

            ${eventList ? `
              <h3 style="color:#a67c00;font-size:16px;margin:0 0 10px;">Events</h3>
              <table style="width:100%;border-collapse:collapse;font-size:14px;">${eventList}</table>
            ` : `<p style="font-size:14px;color:#888;">No events this week.</p>`}

            ${flagBlock}
            ${expiryBlock}

            <p style="margin:32px 0 0;">
              <a href="${SITE_URL}/admin/usage" style="color:#a67c00;">Full dashboard</a>
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Weekly email error:", err);
  }

  /* ---------------- limit warnings ---------------- */
  // Sent once per licence, not weekly. Friendly, not legal.

  let warned = 0;

  for (const l of flagged) {
    if (l.limit_notified_at) continue;

    try {
      await resend.emails.send({
        from: "Colin Marry <colin@poshpork.com>",
        replyTo: "screening@poshpork.com",
        to: l.email,
        subject: "Your screening licence",
        html: `
          <div style="font-family:Georgia,serif;color:#2c1810;max-width:600px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#2c1810,#0a0a0a);padding:32px 20px;text-align:center;">
              <h1 style="color:#d4af37;font-size:22px;margin:0;">Which Food Is Killing You?</h1>
            </div>
            <div style="background:#f5f1e8;padding:36px 28px;">
              <p style="font-size:16px;line-height:1.7;">
                I can see the film is getting used at <strong>${l.organisation}</strong>,
                which is genuinely good to know.
              </p>
              <p style="font-size:16px;line-height:1.7;">
                ${l.events_run > 1
                  ? `Your licence covers one event, and I can see ${l.events_run} have been run.`
                  : `Your licence covers ${l.headcount} people, and the last event had ${l.largest_event}.`}
              </p>
              <p style="font-size:16px;line-height:1.7;">
                No difficulty at all &mdash; I would just rather sort it out than leave it.
                Reply and tell me roughly what you are planning, and I will send a licence
                that fits. If it is going to be a regular thing, an annual arrangement is
                cheaper than doing it event by event.
              </p>
              <p style="font-size:15px;line-height:1.7;color:#666;">
                And if you have run out of budget, say so. I would rather it was seen.
              </p>
              <p style="font-size:16px;line-height:1.6;margin-top:26px;">Colin Marry</p>
            </div>
          </div>
        `,
      });

      await admin
        .from("licences")
        .update({ limit_notified_at: new Date().toISOString() })
        .eq("id", l.licence_id);

      warned++;
    } catch (err) {
      console.error("Limit warning error:", err);
    }
  }

  return NextResponse.json({ ok: true, week: w, flagged: flagged.length, warned });
}
