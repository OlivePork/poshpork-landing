import type { Metadata } from "next";
import {
  ARTICLES,
  INDEX_DESCRIPTION,
  INDEX_INTRO,
  INDEX_PATH,
  INDEX_TITLE,
  articlePath,
  inlineText,
} from "@/lib/articles";
import { indexJsonLd, serializeJsonLd } from "@/lib/articles/schema";

export const metadata: Metadata = {
  title: "Articles | Which Food Is Killing You?",
  description: INDEX_DESCRIPTION,
  alternates: { canonical: INDEX_PATH },
  openGraph: {
    title: "Articles | Which Food Is Killing You?",
    description: INDEX_DESCRIPTION,
    url: INDEX_PATH,
    type: "website",
  },
};

export default function ArticlesIndexPage() {
  return (
    <main className="article-page" style={{ background: "#f5f1e8", color: "#2c1810", minHeight: "100vh" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px 96px" }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
          <ol style={crumbList}>
            <li>
              <a href="/" style={crumbLink}>Home</a>
            </li>
            <li aria-hidden="true" style={crumbSep}>/</li>
            <li aria-current="page">Articles</li>
          </ol>
        </nav>

        <p style={eyebrow}>Posh Pork</p>
        <h1 style={h1}>{INDEX_TITLE}</h1>
        {INDEX_INTRO.map((sentence) => (
          <p key={sentence} style={intro}>{sentence}</p>
        ))}

        <ul style={cardList}>
          {ARTICLES.map((article) => (
            <li key={article.slug} style={card}>
              <h2 style={h2}>
                <a href={articlePath(article)} style={titleLink}>
                  {article.title}
                </a>
              </h2>
              <p style={deck}>{inlineText(article.answer.inlines)}</p>
            </li>
          ))}
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(indexJsonLd(ARTICLES)) }}
      />
    </main>
  );
}

const crumbList: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  listStyle: "none",
  margin: 0,
  padding: 0,
  fontFamily: "Georgia, serif",
  fontSize: "15px",
};

const crumbLink: React.CSSProperties = { color: "#5c3d00", textDecoration: "underline" };
const crumbSep: React.CSSProperties = { color: "#5c3d00" };

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
  fontSize: "clamp(32px, 5vw, 46px)",
  fontWeight: "normal",
  lineHeight: 1.2,
  margin: "0 0 20px",
};

const intro: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "18px",
  lineHeight: 1.6,
  margin: "0 0 12px",
};

const cardList: React.CSSProperties = {
  listStyle: "none",
  margin: "36px 0 0",
  padding: 0,
  display: "grid",
  gap: "18px",
};

const card: React.CSSProperties = {
  background: "#fffaf2",
  border: "1px solid #e4d3b0",
  borderRadius: "8px",
  padding: "22px 22px 8px",
};

const h2: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "24px",
  fontWeight: "normal",
  lineHeight: 1.35,
  margin: "0 0 12px",
};

const titleLink: React.CSSProperties = { color: "#5c3d00", textDecoration: "underline" };

const deck: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "18px",
  lineHeight: 1.6,
  margin: "0 0 18px",
};
