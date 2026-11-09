import bacon from "./bacon";
import { LIST_ARTICLES } from "./lists";
import pasture from "./pasture";
import { ARTICLE_PUBLISHED, SITE_ORIGIN, articleUrl, type Article } from "./types";
import ultraProcessed from "./ultra-processed";

export {
  ARTICLE_PUBLISHED,
  CTA_LABEL,
  SITE_ORIGIN,
  articlePath,
  articleUrl,
  collectHrefs,
  inlineText,
  proseSentences,
  splitSentences,
  wordCount,
} from "./types";
export type { Article, Block, Inline } from "./types";

export const ARTICLES: Article[] = [ultraProcessed, bacon, pasture, ...LIST_ARTICLES];

export const INDEX_PATH = "/articles";

export const INDEX_TITLE = "Articles";

export const INDEX_DESCRIPTION =
  "Food evidence, selected documentaries, and a note on films made with AI.";

export const INDEX_INTRO = [
  "Some pages answer a food question from public scientific and regulatory sources.",
  "Other pages name real documentaries. They are selections, not rankings.",
  "None of these pages report search volume. Health pages are not medical advice.",
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function articleSitemapEntries(): {
  url: string;
  lastModified: string;
  priority: number;
}[] {
  return [
    { url: `${SITE_ORIGIN}${INDEX_PATH}`, lastModified: ARTICLE_PUBLISHED, priority: 0.7 },
    ...ARTICLES.map((article) => ({
      url: articleUrl(article),
      lastModified: ARTICLE_PUBLISHED,
      priority: 0.6,
    })),
  ];
}
