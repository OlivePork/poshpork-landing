import BuyFilmCta from "@/components/BuyFilmCta";
import {
  ARTICLE_PUBLISHED,
  ARTICLES,
  articlePath,
  type Article,
  type Block,
  inlineText,
} from "@/lib/articles";
import { serializeJsonLd, structuredData } from "@/lib/articles/schema";

function headingId(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "section";
}

function publishedLabel(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
  return `Published ${formatted} by Posh Pork.`;
}

export default function EditorialArticle({ article }: { article: Article }) {
  const headings = article.blocks.filter((block): block is Extract<Block, { kind: "h2" }> => block.kind === "h2");
  const toc = [
    ...headings.map((heading) => ({ text: heading.text, id: headingId(heading.text) })),
    { text: "Questions", id: "questions" },
    { text: "Limits of this evidence", id: "limits" },
    { text: "References", id: "references" },
  ];
  const others = ARTICLES.filter((item) => item.slug !== article.slug);

  return (
    <main className="article-page" style={{ background: "#f5f1e8", color: "#2c1810" }}>
      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px 0" }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
          <ol style={crumbList}>
            <li>
              <a href="/" style={crumbLink}>Home</a>
            </li>
            <li aria-hidden="true" style={crumbSep}>/</li>
            <li>
              <a href="/articles" style={crumbLink}>Articles</a>
            </li>
            <li aria-hidden="true" style={crumbSep}>/</li>
            <li aria-current="page" style={crumbCurrent}>{article.title}</li>
          </ol>
        </nav>

        <p style={eyebrow}>Articles</p>
        <h1 style={h1}>{article.title}</h1>
        <p style={meta}>{publishedLabel(ARTICLE_PUBLISHED)}</p>
        <p style={meta}>Posh Pork publishes this page. Posh Pork is not a medical body.</p>

        <p id="answer" style={answer}>
          {inlineText(article.answer.inlines)}
        </p>

        <nav aria-label="On this page" style={tocNav}>
          <h2 style={tocHeading}>On this page</h2>
          <ol>
            {toc.map((item) => (
              <li key={item.id} style={{ marginBottom: "8px" }}>
                <a href={`#${item.id}`} style={bodyLink}>{item.text}</a>
              </li>
            ))}
          </ol>
        </nav>

        {article.blocks.map((block, index) => {
          if (block.kind === "h2") {
            return (
              <h2 key={index} id={headingId(block.text)} style={h2}>
                {block.text}
              </h2>
            );
          }
          if (block.kind === "ul") {
            return (
              <ul key={index} style={list}>
                {block.items.map((item) => (
                  <li key={item} style={listItem}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={index} style={body}>
              {block.inlines.map((part, partIndex) =>
                part.href ? (
                  <a
                    key={partIndex}
                    href={part.href}
                    style={bodyLink}
                    {...(part.href.startsWith("http")
                      ? { rel: "noopener noreferrer" }
                      : {})}
                  >
                    {part.text}
                  </a>
                ) : (
                  <span key={partIndex}>{part.text}</span>
                ),
              )}
            </p>
          );
        })}

        <h2 id="questions" style={h2}>Questions</h2>
        <div>
          {article.faqs.map((faq) => (
            <section key={faq.question} aria-labelledby={headingId(faq.question)}>
              <h3 id={headingId(faq.question)} style={h3}>{faq.question}</h3>
              <p style={body}>{faq.answer}</p>
            </section>
          ))}
        </div>

        <h2 id="limits" style={h2}>Limits of this evidence</h2>
        <ul style={list}>
          {article.limits.map((limit) => (
            <li key={limit} style={listItem}>{limit}</li>
          ))}
        </ul>

        <h2 id="references" style={h2}>References</h2>
        <ol style={list}>
          {article.references.map((reference) => (
            <li key={reference.href} style={listItem}>
              <a href={reference.href} style={bodyLink} rel="noopener noreferrer">
                {reference.title}
              </a>
              <span>. {reference.note}</span>
            </li>
          ))}
        </ol>

        <nav aria-label="More articles">
          <h2 style={h2}>More articles</h2>
          <ul style={list}>
            {others.map((item) => (
              <li key={item.slug} style={listItem}>
                <a href={articlePath(item)} style={bodyLink}>{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </article>

      <BuyFilmCta />

      {structuredData(article).map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        />
      ))}
    </main>
  );
}

const crumbList: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  alignItems: "baseline",
  listStyle: "none",
  margin: 0,
  padding: 0,
  fontFamily: "Georgia, serif",
  fontSize: "15px",
};

const crumbLink: React.CSSProperties = {
  color: "#5c3d00",
  textDecoration: "underline",
};

const crumbSep: React.CSSProperties = { color: "#5c3d00" };

const crumbCurrent: React.CSSProperties = { color: "#2c1810" };

const eyebrow: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "12px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#5c3d00",
  margin: "0 0 14px",
};

const h1: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "clamp(30px, 4vw, 42px)",
  lineHeight: 1.25,
  fontWeight: "normal",
  color: "#2c1810",
  margin: "0 0 16px",
};

const meta: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "16px",
  lineHeight: 1.5,
  margin: "0 0 8px",
};

const answer: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "20px",
  lineHeight: 1.55,
  margin: "28px 0 8px",
  padding: "18px 18px 18px 20px",
  borderLeft: "4px solid #5c3d00",
  background: "#fffaf2",
};

const tocNav: React.CSSProperties = { margin: "28px 0 8px" };

const tocHeading: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "15px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#5c3d00",
  margin: "0 0 10px",
};

const h2: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "clamp(22px, 3vw, 28px)",
  lineHeight: 1.3,
  color: "#5c3d00",
  margin: "40px 0 14px",
};

const h3: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "20px",
  lineHeight: 1.4,
  fontWeight: "bold",
  color: "#2c1810",
  margin: "22px 0 8px",
};

const body: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "18px",
  lineHeight: 1.7,
  margin: "0 0 16px",
};

const bodyLink: React.CSSProperties = {
  color: "#5c3d00",
  textDecoration: "underline",
};

const list: React.CSSProperties = {
  margin: "0 0 16px",
  paddingLeft: "22px",
};

const listItem: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "18px",
  lineHeight: 1.6,
  marginBottom: "10px",
};
