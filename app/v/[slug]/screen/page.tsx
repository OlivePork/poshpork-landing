import { notFound } from "next/navigation";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Tonight's screening" };

/**
 * The lobby screen. Put this on the projector while guests arrive
 * and order drinks. Nothing to print, nothing to hand out.
 *
 * Shows the room code once the venue has opened one, so a guest who
 * goes to /join directly is not stuck.
 */
export default async function VenueScreenPage({
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
    .select("slug, name, adult_price_cents, billing_mode")
    .eq("slug", slug.toLowerCase())
    .eq("status", "active")
    .maybeSingle();

  if (!venue) notFound();

  // Is a room open? Shown so anyone joining directly has the code.
  const { data: roomRows } = await admin.rpc("venue_open_room", { v_slug: slug.toLowerCase() });
  const roomCode = (roomRows ?? [])[0]?.code as string | undefined;

  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.poshpork.com";
  const url = `${site}/v/${venue.slug}`;
  const price = (venue.adult_price_cents / 100).toFixed(0);
  const free = venue.billing_mode === "subscription";

  return (
    <main style={{
      background: "#0a0a0a",
      color: "#f2ece1",
      minHeight: "100dvh",
      display: "grid",
      placeItems: "center",
      padding: "4vh 4vw",
      fontFamily: "Georgia, serif",
      overflow: "hidden",
    }}>
      {/* The page refreshes itself, so the code appears as soon as the
          room is opened — nobody has to remember to reload the projector. */}
      <meta httpEquiv="refresh" content="20" />

      <div style={{ width: "100%", maxWidth: "1400px", textAlign: "center" }}>

        <p style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(14px, 1.6vw, 22px)",
          letterSpacing: ".3em",
          textTransform: "uppercase",
          color: "#d4af37",
          opacity: .7,
          margin: "0 0 2vh",
        }}>
          Tonight at {venue.name}
        </p>

        <h1 style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(34px, 6vw, 88px)",
          color: "#d4af37",
          lineHeight: 1.05,
          margin: "0 0 1.2vh",
        }}>
          Which Food Is Killing You?
        </h1>

        <p style={{
          fontSize: "clamp(15px, 1.9vw, 28px)",
          opacity: .75,
          margin: "0 0 4vh",
          fontStyle: "italic",
        }}>
          Four foods stand trial. Your table is the jury.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(24px, 4vw, 64px)",
          alignItems: "center",
          justifyItems: "center",
        }}>

          {/* QR */}
          <div style={{
            background: "#f2ece1",
            padding: "clamp(14px, 1.6vw, 26px)",
            borderRadius: "12px",
            lineHeight: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/qr?data=${encodeURIComponent(url)}`}
              alt=""
              style={{
                display: "block",
                width: "clamp(190px, 20vw, 320px)",
                height: "clamp(190px, 20vw, 320px)",
              }}
            />
          </div>

          {/* Instructions */}
          <div style={{ textAlign: "left", maxWidth: "34ch" }}>
            <p style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(19px, 2.3vw, 34px)",
              color: "#d4af37",
              margin: "0 0 2.4vh",
              lineHeight: 1.2,
            }}>
              Scan to take your seat
            </p>

            <p style={{ fontSize: "clamp(14px, 1.5vw, 22px)", opacity: .7, margin: "0 0 1vh" }}>
              Or go to
            </p>
            <p style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(18px, 2.1vw, 32px)",
              color: "#d4af37",
              margin: "0 0 3.4vh",
              wordBreak: "break-all",
            }}>
              poshpork.com/v/{venue.slug}
            </p>

            <div style={{
              borderLeft: "3px solid #d4af37",
              paddingLeft: "clamp(14px, 1.4vw, 24px)",
            }}>
              <p style={{
                fontFamily: "Cinzel, serif",
                fontSize: "clamp(22px, 2.8vw, 42px)",
                color: "#f2ece1",
                margin: "0 0 .5vh",
                lineHeight: 1,
              }}>
                {free ? "Free to join" : `\u20AC${price} an adult`}
              </p>
              <p style={{
                fontSize: "clamp(14px, 1.6vw, 24px)",
                color: "#d4af37",
                margin: 0,
              }}>
                {free ? `${venue.name} has taken care of it` : "Under 18s go free"}
              </p>
            </div>
          </div>
        </div>

        {/* Room code, once the venue has opened one */}
        {roomCode ? (
          <div style={{
            marginTop: "4.5vh",
            paddingTop: "3vh",
            borderTop: "1px solid rgba(212,175,55,.25)",
          }}>
            <p style={{
              fontSize: "clamp(12px, 1.3vw, 19px)",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              opacity: .5,
              margin: "0 0 1vh",
            }}>
              Already paid? Go to poshpork.com/join and enter
            </p>
            <p style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(40px, 6vw, 88px)",
              letterSpacing: ".2em",
              color: "#d4af37",
              margin: 0,
              lineHeight: 1,
            }}>
              {roomCode}
            </p>
          </div>
        ) : (
          <p style={{
            marginTop: "4.5vh",
            fontSize: "clamp(13px, 1.4vw, 20px)",
            opacity: .4,
          }}>
            Opening shortly.
          </p>
        )}

        <p style={{
          fontSize: "clamp(11px, 1.1vw, 17px)",
          opacity: .4,
          margin: "3vh 0 0",
          lineHeight: 1.6,
        }}>
          {free
            ? "One phone each. Nothing to pay."
            : "One phone each. You keep the film afterwards, to watch again at home."}
        </p>

      </div>
    </main>
  );
}