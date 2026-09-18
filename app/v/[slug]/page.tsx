import { notFound } from "next/navigation";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import VenueBuy from "@/components/VenueBuy";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: "Tonight's screening | Which Food Is Killing You?",
    description: "Take your seat on the jury.",
  };
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: venue } = await admin
    .from("venues")
    .select("id, slug, name, adult_price_cents, seats_per_table, billing_mode")
    .eq("slug", slug.toLowerCase())
    .eq("status", "active")
    .maybeSingle();

  if (!venue) notFound();

  // A subscription venue has already paid. Guests join free, which means
  // no checkout, no account, and nothing standing between them and the
  // room while the film is waiting to start.
  const free = venue.billing_mode === "subscription";
  const price = venue.adult_price_cents / 100;

  return (
    <main style={{
      background: "#0a0a0a",
      color: "#f2ece1",
      minHeight: "100dvh",
      display: "grid",
      placeItems: "center",
      padding: "24px 20px 56px",
      fontFamily: "Georgia, serif",
    }}>
      <div style={{ width: "min(460px, 100%)", textAlign: "center" }}>

        <p style={eyebrow}>Tonight at {venue.name}</p>

        <h1 style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(27px, 7.5vw, 36px)",
          color: "#d4af37",
          lineHeight: 1.12,
          margin: "0 0 16px",
        }}>
          Which Food Is Killing You?
        </h1>

        <p style={{ fontSize: "16px", lineHeight: 1.6, opacity: .78, margin: "0 0 30px" }}>
          Four foods stand trial. Your table hears the evidence, argues about it, and
          delivers a verdict &mdash; and so does every other table in the room.
        </p>

        {free ? (
          <>
            <div style={{
              border: "1px solid rgba(212,175,55,.4)",
              borderRadius: "10px",
              background: "linear-gradient(180deg, rgba(24,24,24,.9), rgba(14,14,14,.9))",
              padding: "28px 22px",
            }}>
              <p style={{
                fontFamily: "Cinzel, serif",
                fontSize: "clamp(22px, 6vw, 28px)",
                color: "#d4af37",
                margin: "0 0 10px",
                lineHeight: 1.2,
              }}>
                It&apos;s on the house
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.6, opacity: .7, margin: "0 0 24px" }}>
                {venue.name} has taken care of it. Nothing to pay.
              </p>

              <a
                href={`/join?v=${venue.slug}`}
                style={{
                  display: "block",
                  padding: "20px",
                  fontFamily: "Cinzel, serif",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0a0a0a",
                  background: "linear-gradient(135deg,#a67c00,#d4af37 50%,#a67c00)",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Take my seat
              </a>
            </div>

            <div style={{ textAlign: "left", margin: "32px 0 26px" }}>
              <Point n="1" text="Pick the table you are actually sitting at, and a name." />
              <Point n="2" text="When a question appears, your table agrees one answer." />
              <Point n="3" text="At the end, every person delivers their own verdict." />
            </div>
          </>
        ) : (
          <>
            <VenueBuy
              slug={venue.slug}
              priceEuros={price}
              seatsPerTable={venue.seats_per_table}
            />

            <div style={{ textAlign: "left", margin: "34px 0 26px" }}>
              <Point n="1" text="Pay for the adults in your group. Under 18s are free." />
              <Point n="2" text="You go straight through to the room — no code to type." />
              <Point n="3" text="Pick the table you are actually sitting at, and your name." />
              <Point n="4" text="When a question appears, your table agrees one answer." />
              <Point n="5" text="At the end, every person delivers their own verdict." />
            </div>

            <div style={{
              borderLeft: "2px solid #d4af37",
              paddingLeft: "18px",
              textAlign: "left",
              marginBottom: "26px",
            }}>
              <p style={{ fontSize: "15px", lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: "#d4af37" }}>You keep the film.</strong> Tonight is a
                one-off, but your access is permanent &mdash; watch it again at home, with
                whoever you like, whenever you like.
              </p>
            </div>
          </>
        )}

        <p style={{ fontSize: "12px", lineHeight: 1.7, opacity: .45, margin: 0 }}>
          1 hour 23 minutes. Suitable for all ages.<br />
          This film is for entertainment and education only. It is not medical advice.
        </p>

      </div>
    </main>
  );
}

function Point({ n, text }: { n: string; text: string }) {
  return (
    <div style={{ display: "flex", gap: "13px", padding: "9px 0" }}>
      <span style={{
        flexShrink: 0,
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        border: "1px solid rgba(212,175,55,.45)",
        color: "#d4af37",
        fontFamily: "Cinzel, serif",
        fontSize: "13px",
        display: "grid",
        placeItems: "center",
      }}>
        {n}
      </span>
      <span style={{ fontSize: "15px", lineHeight: 1.55, opacity: .8 }}>{text}</span>
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "12px",
  letterSpacing: ".24em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: .75,
  margin: "0 0 16px",
};