import { notFound } from "next/navigation";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export const metadata = { title: "Tonight's screening" };

/**
 * The lobby screen. Put this on the projector while guests arrive
 * and order drinks. Nothing to print, nothing to hand out — people
 * scan it from their seats.
 *
 * The QR is generated at request time and points at the venue's
 * permanent buy page.
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
    .select("slug, name, adult_price_cents")
    .eq("slug", slug.toLowerCase())
    .eq("status", "active")
    .maybeSingle();

  if (!venue) notFound();

  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.poshpork.com";
  const url = `${site}/v/${venue.slug}`;
  const price = (venue.adult_price_cents / 100).toFixed(0);

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
          fontSize: "clamp(38px, 6.5vw, 96px)",
          color: "#d4af37",
          lineHeight: 1.05,
          margin: "0 0 1.5vh",
        }}>
          Which Food Is Killing You?
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 30px)",
          opacity: .75,
          margin: "0 0 5vh",
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
                width: "clamp(200px, 22vw, 340px)",
                height: "clamp(200px, 22vw, 340px)",
              }}
            />
          </div>

          {/* Instructions */}
          <div style={{ textAlign: "left", maxWidth: "34ch" }}>
            <p style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(20px, 2.4vw, 36px)",
              color: "#d4af37",
              margin: "0 0 3vh",
              lineHeight: 1.2,
            }}>
              Scan to take your seat
            </p>

            <p style={{
              fontSize: "clamp(15px, 1.6vw, 24px)",
              lineHeight: 1.5,
              opacity: .8,
              margin: "0 0 2vh",
            }}>
              Or go to
            </p>
            <p style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(19px, 2.2vw, 34px)",
              color: "#d4af37",
              margin: "0 0 4vh",
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
                fontSize: "clamp(24px, 3vw, 46px)",
                color: "#f2ece1",
                margin: "0 0 .6vh",
                lineHeight: 1,
              }}>
                &euro;{price} an adult
              </p>
              <p style={{
                fontSize: "clamp(15px, 1.7vw, 26px)",
                color: "#d4af37",
                margin: 0,
              }}>
                Under 18s go free
              </p>
            </div>
          </div>
        </div>

        <p style={{
          fontSize: "clamp(12px, 1.2vw, 18px)",
          opacity: .45,
          margin: "5vh 0 0",
          lineHeight: 1.6,
        }}>
          One phone each. You keep the film afterwards, to watch again at home.
        </p>

      </div>
    </main>
  );
}
