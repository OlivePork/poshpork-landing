import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = { title: "Usage" };

type LicenceRow = {
  licence_id: string;
  organisation: string;
  email: string;
  licence_type: string;
  headcount: number | null;
  events_run: number;
  total_players: number;
  largest_event: number;
  last_event_at: string | null;
  expires_at: string | null;
  over_headcount: boolean;
};

type VenueRow = {
  venue_id: string;
  slug: string;
  name: string;
  town: string | null;
  status: string;
  events_run: number;
  tickets_sold: number;
  adults: number;
  children: number;
  revenue_cents: number;
  last_event_at: string | null;
};

type EventRow = {
  room_id: string;
  code: string;
  room_name: string | null;
  host_email: string;
  organisation: string | null;
  licence_type: string | null;
  headcount: number | null;
  players: number;
  tables_used: number;
  answers: number;
  started_at: string;
};

function fmt(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default async function UsagePage() {
  // Only the owner sees this.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const owner = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!user || !owner || user.email?.toLowerCase() !== owner) {
    redirect("/");
  }

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const [{ data: week }, { data: licences }, { data: events }, { data: venues }] =
    await Promise.all([
      admin.rpc("usage_week"),
      admin.rpc("usage_by_licence"),
      admin.rpc("usage_events"),
      admin.rpc("venue_summary"),
    ]);

  const w = (week ?? [])[0] ?? { events: 0, players: 0, answers: 0, new_licences: 0, film_sales: 0 };
  const licenceRows = (licences ?? []) as LicenceRow[];
  const venueRows = (venues ?? []) as VenueRow[];
  const venueRevenue = venueRows.reduce((n, v) => n + Number(v.revenue_cents || 0), 0);
  const eventRows = (events ?? []) as EventRow[];
  const flagged = licenceRows.filter((l) => l.over_headcount);

  return (
    <main style={{ background: "#0f0f0f", color: "#e8e2d5", minHeight: "100vh", padding: "48px 20px 96px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <p style={eyebrow}>Usage</p>
        <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(28px,4vw,40px)", color: "#d4af37", margin: "0 0 40px" }}>
          The last seven days
        </h1>

        {/* HEADLINE */}
        <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", marginBottom: "56px" }}>
          <Stat n={w.events} label="Events run" />
          <Stat n={w.players} label="Participants" />
          <Stat n={w.answers} label="Answers cast" />
          <Stat n={w.new_licences} label="New licences" />
          <Stat n={w.film_sales} label="Film sales" />
        </div>

        {/* FLAGS */}
        {flagged.length > 0 && (
          <section style={{ marginBottom: "56px" }}>
            <h2 style={h2}>Worth a look</h2>
            {flagged.map((l) => (
              <div key={l.licence_id} style={{
                border: "1px solid rgba(201,139,94,.4)",
                background: "rgba(201,139,94,.08)",
                borderRadius: "6px",
                padding: "16px 18px",
                marginBottom: "10px",
              }}>
                <strong style={{ color: "#c98b5e" }}>{l.organisation}</strong>
                {" — "}
                {l.events_run > 1
                  ? `${l.events_run} events on a single-event licence`
                  : `${l.largest_event} people at one event, licensed for ${l.headcount}`}
                <span style={{ display: "block", fontSize: "13px", opacity: .6, marginTop: "4px" }}>
                  {l.email}
                </span>
              </div>
            ))}
          </section>
        )}

        {/* VENUES */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={h2}>
            Venues
            {venueRevenue > 0 && (
              <span style={{ fontSize: "15px", opacity: .55, marginLeft: "14px" }}>
                €{(venueRevenue / 100).toFixed(0)} in tickets
              </span>
            )}
          </h2>

          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Venue</th>
                  <th style={th}>Status</th>
                  <th style={{ ...th, textAlign: "right" }}>Events</th>
                  <th style={{ ...th, textAlign: "right" }}>Tickets</th>
                  <th style={{ ...th, textAlign: "right" }}>Adults</th>
                  <th style={{ ...th, textAlign: "right" }}>Children</th>
                  <th style={{ ...th, textAlign: "right" }}>Revenue</th>
                  <th style={th}>Last event</th>
                </tr>
              </thead>
              <tbody>
                {venueRows.length === 0 && (
                  <tr><td style={td} colSpan={8}>No venues yet.</td></tr>
                )}
                {venueRows.map((v) => (
                  <tr key={v.venue_id}>
                    <td style={td}>
                      {v.name}
                      <span style={{ display: "block", fontSize: "12px", opacity: .45 }}>
                        {v.town ? `${v.town} · ` : ""}/v/{v.slug}
                      </span>
                    </td>
                    <td style={{
                      ...td,
                      color: v.status === "active" ? "#7fa87f"
                           : v.status === "paused" ? "#c98b5e"
                           : undefined,
                    }}>
                      {v.status}
                    </td>
                    <td style={{ ...td, textAlign: "right" }}>{v.events_run}</td>
                    <td style={{ ...td, textAlign: "right" }}>{v.tickets_sold}</td>
                    <td style={{ ...td, textAlign: "right" }}>{v.adults ?? 0}</td>
                    <td style={{ ...td, textAlign: "right", opacity: .6 }}>{v.children ?? 0}</td>
                    <td style={{ ...td, textAlign: "right", color: "#d4af37" }}>
                      €{(Number(v.revenue_cents || 0) / 100).toFixed(0)}
                    </td>
                    <td style={td}>{fmt(v.last_event_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {venueRows.some((v) => v.status === "active" && !v.last_event_at) && (
            <p style={{ fontSize: "13px", opacity: .55, marginTop: "16px" }}>
              A venue marked active with no events has been set up but has not run one yet.
              Worth a nudge.
            </p>
          )}
        </section>

        {/* LICENCES */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={h2}>Licences</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Organisation</th>
                  <th style={th}>Type</th>
                  <th style={{ ...th, textAlign: "right" }}>Licensed</th>
                  <th style={{ ...th, textAlign: "right" }}>Events</th>
                  <th style={{ ...th, textAlign: "right" }}>People</th>
                  <th style={{ ...th, textAlign: "right" }}>Largest</th>
                  <th style={th}>Last event</th>
                  <th style={th}>Expires</th>
                </tr>
              </thead>
              <tbody>
                {licenceRows.length === 0 && (
                  <tr><td style={td} colSpan={8}>No licences yet.</td></tr>
                )}
                {licenceRows.map((l) => (
                  <tr key={l.licence_id}>
                    <td style={td}>
                      {l.organisation}
                      <span style={{ display: "block", fontSize: "12px", opacity: .45 }}>{l.email}</span>
                    </td>
                    <td style={td}>{l.licence_type}</td>
                    <td style={{ ...td, textAlign: "right" }}>{l.headcount ?? "—"}</td>
                    <td style={{ ...td, textAlign: "right", color: l.over_headcount ? "#c98b5e" : undefined }}>
                      {l.events_run}
                    </td>
                    <td style={{ ...td, textAlign: "right" }}>{l.total_players}</td>
                    <td style={{ ...td, textAlign: "right", color: l.over_headcount ? "#c98b5e" : undefined }}>
                      {l.largest_event}
                    </td>
                    <td style={td}>{fmt(l.last_event_at)}</td>
                    <td style={td}>{fmt(l.expires_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* EVENTS */}
        <section>
          <h2 style={h2}>Every event, last 90 days</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Date</th>
                  <th style={th}>Room</th>
                  <th style={th}>Host</th>
                  <th style={{ ...th, textAlign: "right" }}>People</th>
                  <th style={{ ...th, textAlign: "right" }}>Tables</th>
                  <th style={{ ...th, textAlign: "right" }}>Answers</th>
                </tr>
              </thead>
              <tbody>
                {eventRows.length === 0 && (
                  <tr><td style={td} colSpan={6}>No events yet.</td></tr>
                )}
                {eventRows.map((e) => (
                  <tr key={e.room_id}>
                    <td style={td}>{fmt(e.started_at)}</td>
                    <td style={td}>
                      {e.room_name ?? e.code}
                      <span style={{ display: "block", fontSize: "12px", opacity: .45, fontFamily: "monospace" }}>
                        {e.code}
                      </span>
                    </td>
                    <td style={td}>
                      {e.organisation ?? "—"}
                      <span style={{ display: "block", fontSize: "12px", opacity: .45 }}>{e.host_email}</span>
                    </td>
                    <td style={{ ...td, textAlign: "right" }}>{e.players}</td>
                    <td style={{ ...td, textAlign: "right" }}>{e.tables_used}</td>
                    <td style={{ ...td, textAlign: "right" }}>{e.answers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div style={{
      border: "1px solid rgba(212,175,55,.25)",
      borderRadius: "8px",
      padding: "20px 18px",
    }}>
      <p style={{
        fontFamily: "Cinzel, serif",
        fontSize: "34px",
        color: "#d4af37",
        margin: "0 0 6px",
        fontVariantNumeric: "tabular-nums",
      }}>
        {n}
      </p>
      <p style={{ fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", opacity: .5, margin: 0 }}>
        {label}
      </p>
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "12px",
  letterSpacing: ".28em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: .8,
  margin: "0 0 14px",
};

const h2: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "20px",
  color: "#d4af37",
  margin: "0 0 18px",
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
  minWidth: "720px",
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 14px 10px 0",
  borderBottom: "1px solid rgba(212,175,55,.35)",
  fontFamily: "Cinzel, serif",
  fontSize: "11px",
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#d4af37",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "12px 14px 12px 0",
  borderBottom: "1px solid rgba(232,226,213,.1)",
  verticalAlign: "top",
  lineHeight: 1.5,
};
