/**
 * "What viewers say": short, exact quotes from IMDb reviews, each linking
 * to the full review so visitors can check it for themselves.
 * Sits directly under the manifesto on the home page.
 *
 * To add a review: copy the line exactly as written, add the review's
 * title and link. Add `rating` (out of 10) only if the reviewer gave one.
 */

const IMDB_REVIEWS = "https://www.imdb.com/title/tt47438286/reviews/";

const REVIEWS: { quote: string; title: string; href: string; rating?: number }[] = [
  {
    quote: "I came away from watching with a much greater interest in what I\u2019m putting into my body.",
    title: "Worth your time",
    href: "https://www.imdb.com/title/tt47438286/review/rw11995318/",
  },
  {
    quote: "It\u2019s a bit wacky and weird at times, but that\u2019s part of what makes it interesting. \u2026 I definitely came away feeling more informed and I\u2019m glad I watched it. Worth watching, especially for anyone interested in health and nutrition.",
    title: "Not A Typical Documentary",
    href: "https://www.imdb.com/title/tt47438286/review/rw11983367/",
  },
  {
    quote: "\u2026encourages you to think differently about something as fundamental as the food we eat.",
    title: "Worth your time",
    href: "https://www.imdb.com/title/tt47438286/review/rw11995318/",
  },
];

export default function Reviews() {
  return (
    <section aria-label="What viewers say" style={{
      background: "#0d0805",
      color: "#f2ece1",
      padding: "clamp(40px,6vw,64px) 20px",
      borderTop: "1px solid rgba(212,175,55,.18)",
    }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
        <p style={{
          fontFamily: "Cinzel, serif",
          fontSize: "12px",
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: "#d4af37",
          opacity: 0.85,
          margin: "0 0 26px",
        }}>
          What viewers say
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(18px,3vw,32px)",
          textAlign: "left",
        }}>
          {REVIEWS.map((r, i) => (
            <figure key={i} style={{
              margin: 0,
              padding: "24px 24px 20px",
              borderLeft: "2px solid rgba(212,175,55,.55)",
              background: "linear-gradient(180deg, rgba(212,175,55,.06), rgba(212,175,55,0))",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}>
              {typeof r.rating === "number" && (
                <span aria-label={`${r.rating} out of 10`} style={{ color: "#d4af37", fontSize: "15px", letterSpacing: "2px" }}>
                  {"\u2605".repeat(Math.round(r.rating / 2))}
                  <span style={{ opacity: 0.6, marginLeft: "8px", letterSpacing: 0, fontSize: "13px" }}>{r.rating}/10</span>
                </span>
              )}
              <blockquote style={{
                margin: 0,
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(18px,2vw,21px)",
                lineHeight: 1.5,
              }}>
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption style={{ fontSize: "13px", opacity: 0.65, marginTop: "auto" }}>
                <a href={r.href} target="_blank" rel="noopener noreferrer" style={{ color: "#d4af37", textDecoration: "none" }}>
                  &ldquo;{r.title}&rdquo;
                </a>
                , IMDb review
              </figcaption>
            </figure>
          ))}
        </div>

        <p style={{ margin: "28px 0 0", fontSize: "14px" }}>
          <a href={IMDB_REVIEWS} target="_blank" rel="noopener noreferrer"
            style={{ color: "#d4af37", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Read the full reviews on IMDb
          </a>
        </p>
      </div>
    </section>
  );
}