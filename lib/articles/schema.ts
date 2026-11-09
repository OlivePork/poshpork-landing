import {
  ARTICLE_PUBLISHED,
  INDEX_DESCRIPTION,
  INDEX_TITLE,
  SITE_ORIGIN,
  articleUrl,
  type Article,
} from "./index";

const publisher = {
  "@type": "Organization",
  name: "Posh Pork",
  url: SITE_ORIGIN,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_ORIGIN}/posh-pork-pig.png`,
  },
};

/**
 * Article structured data uses only values this site can stand behind:
 * the headline we published, the organisation that publishes the site,
 * and the sources linked on the page. There is no named reviewer and no
 * review date, because none was commissioned.
 */
export function articleJsonLd(article: Article) {
  const url = articleUrl(article);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: ARTICLE_PUBLISHED,
    inLanguage: "en",
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: "Posh Pork",
      url: SITE_ORIGIN,
    },
    publisher,
    citation: article.references.map((reference) => ({
      "@type": "CreativeWork",
      name: reference.title,
      url: reference.href,
    })),
    isAccessibleForFree: true,
  };
}

export function indexJsonLd(articles: Article[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: INDEX_TITLE,
    description: INDEX_DESCRIPTION,
    url: `${SITE_ORIGIN}/articles`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Posh Pork",
      url: SITE_ORIGIN,
    },
    publisher,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: articleUrl(article),
      })),
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
