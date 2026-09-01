export const dynamic = "force-dynamic";

export const metadata = {
  title: "Open the film | Which Food Is Killing You?",
  // Scanners sometimes follow links in meta tags too. Keep them out.
  robots: { index: false, follow: false },
};

/**
 * The page every emailed sign-in link points at.
 *
 * Corporate mail filters — Microsoft Defender Safe Links, Proofpoint,
 * Mimecast — fetch every URL in an email to check it is safe. A fetch is
 * indistinguishable from a click, so it consumes the single-use token and
 * the recipient is told their link has expired before they ever touched it.
 *
 * This page holds the token and does nothing with it. The exchange only
 * happens when somebody presses the button, and scanners do not press
 * buttons. It costs the viewer one extra click and saves the ones behind
 * a corporate mail filter entirely.
 */
export default async function OpenPage({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string; next?: string }>;
}) {
  const { token_hash, next } = await searchParams;
  const target = next && next.startsWith("/") ? next : "/watch";

  const href = token_hash
    ? `/auth/confirm?token_hash=${encodeURIComponent(token_hash)}&type=email&next=${encodeURIComponent(target)}`
    : "/login";

  return (
    <main style={{
      background: "#0a0a0a",
      color: "#f2ece1",
      minHeight: "100dvh",
      display: "grid",
      placeItems: "center",
      padding: "24px 20px",
      fontFamily: "Georgia, serif",
    }}>
      <div style={{ width: "min(420px, 100%)", textAlign: "center" }}>

        <p style={{
          fontFamily: "Cinzel, serif",
          fontSize: "12px",
          letterSpacing: ".26em",
          textTransform: "uppercase",
          color: "#d4af37",
          opacity: .75,
          margin: "0 0 18px",
        }}>
          Which Food Is Killing You?
        </p>

        <h1 style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(26px, 7vw, 34px)",
          color: "#d4af37",
          lineHeight: 1.15,
          margin: "0 0 20px",
        }}>
          {token_hash ? "Ready when you are" : "Something went missing"}
        </h1>

        {token_hash ? (
          <>
            <p style={{ fontSize: "16px", lineHeight: 1.65, opacity: .78, margin: "0 0 32px" }}>
              One press and the film opens. No password, nothing to remember.
            </p>

            <a
              href={href}
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
              Open the film
            </a>

            <p style={{ fontSize: "13px", lineHeight: 1.7, opacity: .5, margin: "26px 0 0" }}>
              If nothing happens, or you are told the link has expired, go to{" "}
              <a href="/login" style={{ color: "#d4af37" }}>poshpork.com/login</a>{" "}
              and ask for another. Your access does not expire, only the link does.
            </p>
          </>
        ) : (
          <>
            <p style={{ fontSize: "16px", lineHeight: 1.65, opacity: .78, margin: "0 0 32px" }}>
              This link is missing the part that identifies you. It may have been
              trimmed by an email programme.
            </p>

            <a
              href="/login"
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
              Send me a new one
            </a>
          </>
        )}

      </div>
    </main>
  );
}
