/**
 * Shared shape for the /articles section.
 *
 * Prose lives here as data so pages, structured data, the sitemap, and
 * tests all read one source. Do not add a named reviewer, a review date,
 * or a search-volume field. Those values are not known.
 */

export const SITE_ORIGIN = "https://www.poshpork.com";

/** The day these pages were first added to the site. */
export const ARTICLE_PUBLISHED = "2026-11-09";

export const CTA_LABEL = "Buy the film";

export type Inline = {
  text: string;
  href?: string;
};

export type Paragraph = {
  kind: "p";
  inlines: Inline[];
};

export type Heading = {
  kind: "h2";
  text: string;
};

export type BulletList = {
  kind: "ul";
  items: string[];
};

export type Block = Paragraph | Heading | BulletList;

export type Faq = {
  question: string;
  answer: string;
};

export type Reference = {
  title: string;
  href: string;
  note: string;
};

/** A real film named on a list page. Schema uses only these fields. */
export type ListedFilm = {
  title: string;
  /** Omit when the site or source does not state a year. */
  year?: string;
  /** Empty when the source names an organisation instead of a director. */
  directors: string[];
  maker?: string;
  summary: string;
  sourceName: string;
  sourceHref: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** Direct answer, rendered before any later section. */
  answer: Paragraph;
  blocks: Block[];
  faqs: Faq[];
  /** What this page cannot show. */
  limits: string[];
  references: Reference[];
  /** Present only on list articles. */
  films?: ListedFilm[];
};

export function paragraph(inlines: Inline[]): Paragraph {
  return { kind: "p", inlines: inlines };
}

export function t(text: string): Inline {
  return { text };
}

export function a(text: string, href: string): Inline {
  return { text, href };
}

export function inlineText(inlines: Inline[]): string {
  return inlines.map((part) => part.text).join("");
}

export function articlePath(article: Article): string {
  return `/articles/${article.slug}`;
}

export function articleUrl(article: Article): string {
  return `${SITE_ORIGIN}${articlePath(article)}`;
}

/** Sentences in our own prose. Reference titles are official names, not our sentences. */
export function proseSentences(article: Article): string[] {
  const chunks: string[] = [
    article.title,
    article.description,
    inlineText(article.answer.inlines),
  ];

  for (const block of article.blocks) {
    if (block.kind === "h2") chunks.push(block.text);
    if (block.kind === "p") chunks.push(inlineText(block.inlines));
    if (block.kind === "ul") chunks.push(...block.items);
  }

  for (const faq of article.faqs) {
    chunks.push(faq.question, faq.answer);
  }

  chunks.push(...article.limits);

  for (const reference of article.references) {
    chunks.push(reference.note);
  }

  return chunks.flatMap(splitSentences);
}

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}

export function wordCount(sentence: string): number {
  return sentence.split(/\s+/).filter(Boolean).length;
}

export function collectHrefs(article: Article): string[] {
  const hrefs: string[] = [];
  const take = (inlines: Inline[]) => {
    for (const part of inlines) {
      if (part.href) hrefs.push(part.href);
    }
  };
  take(article.answer.inlines);
  for (const block of article.blocks) {
    if (block.kind === "p") take(block.inlines);
  }
  for (const reference of article.references) hrefs.push(reference.href);
  return hrefs;
}
