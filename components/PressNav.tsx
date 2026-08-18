/**
 * Jump-to bar for the press page. Anchors only — no client state needed.
 * Sits directly under the header so a journalist can see what is here
 * without scrolling the whole page first.
 */
export default function PressNav() {
  const items = [
    { href: "#trailer", label: "Trailer" },
    { href: "#glance", label: "At a glance" },
    { href: "#synopsis", label: "Synopsis" },
    { href: "#access", label: "Watch the film" },
    { href: "#evidence", label: "Claims & sources" },
    { href: "#made", label: "How it was made" },
    { href: "#disclosure", label: "Disclosure" },
    { href: "#director", label: "Director" },
    { href: "#downloads", label: "Stills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      aria-label="On this page"
      style={{
        background: "#141414",
        borderBottom: "1px solid rgba(212,175,55,.2)",
        padding: "18px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p style={{
          fontFamily: "Cinzel, serif",
          fontSize: "11px",
          letterSpacing: ".24em",
          textTransform: "uppercase",
          color: "#d4af37",
          opacity: .6,
          margin: "0 0 12px",
        }}>
          On this page
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px" }}>
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              style={{
                fontSize: "13px",
                lineHeight: 1,
                padding: "8px 13px",
                borderRadius: "4px",
                textDecoration: "none",
                color: "#e8e2d5",
                border: "1px solid rgba(232,226,213,.18)",
                whiteSpace: "nowrap",
              }}
            >
              {i.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}