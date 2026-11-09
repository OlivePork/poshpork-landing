import bacon from "./bacon";
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

export const ARTICLES: Article[] = [ultraProcessed, bacon, pasture];

export const INDEX_PATH = "/articles";

export const INDEX_TITLE = "Articles";

export const INDEX_DESCRIPTION =
  "Three evidence-led answers on ultra-processed food, uncured bacon, and pasture-raised pork.";

export const INDEX_INTRO = [
  "These pages answer three food questions from public scientific and regulatory sources.",
  "Each page names its sources and states what the evidence cannot show.",
  "They are not medical advice.",
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
