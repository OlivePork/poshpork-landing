import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import sitemap from "../app/sitemap";
import {
  ARTICLE_PUBLISHED,
  ARTICLES,
  CTA_LABEL,
  INDEX_INTRO,
  SITE_ORIGIN,
  articlePath,
  collectHrefs,
  proseSentences,
  wordCount,
} from "../lib/articles";
import { articleJsonLd, filmListJsonLd, indexJsonLd } from "../lib/articles/schema";

const emDash = /[\u2014\u2013]/;
const waitlist = /waitlist|waiting list/i;
const EVIDENCE_SLUGS = [
  "ultra-processed-food",
  "uncured-bacon-celery-powder",
  "pasture-raised-and-conventional-pork",
];
const LIST_SLUGS = [
  "food-documentaries-for-families",
  "documentaries-like-food-inc",
  "food-documentaries-2026",
  "ultra-processed-food-documentaries",
  "films-made-with-ai",
];

function read(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

describe("article prose", () => {
  it("keeps the evidence articles and adds the five film lists", () => {
    const slugs = ARTICLES.map((article) => article.slug);
    for (const slug of [...EVIDENCE_SLUGS, ...LIST_SLUGS]) {
      assert.ok(slugs.includes(slug), slug);
    }
    assert.equal(slugs.length, EVIDENCE_SLUGS.length + LIST_SLUGS.length);
  });

  it("answers before the later sections and stays inside the sentence limit", () => {
    for (const article of ARTICLES) {
      assert.equal(article.answer.kind, "p");
      assert.ok(article.answer.inlines.length > 0);
      for (const sentence of proseSentences(article)) {
        const count = wordCount(sentence);
        assert.ok(
          count <= 25,
          `${article.slug} has a ${count}-word sentence: ${sentence}`,
        );
        assert.equal(emDash.test(sentence), false, sentence);
      }
      for (const intro of INDEX_INTRO) {
        assert.ok(wordCount(intro) <= 25, intro);
        assert.equal(emDash.test(intro), false);
      }
    }
  });

  it("keeps hazard, association, sources, and the film CTA", () => {
    for (const article of ARTICLES) {
      const headings = article.blocks
        .filter((block) => block.kind === "h2")
        .map((block) => block.text);
      if (EVIDENCE_SLUGS.includes(article.slug)) {
        assert.ok(headings.includes("Hazard and risk"));
        assert.ok(headings.includes("Association and causation"));
      }
      assert.ok(article.faqs.length >= 4);
      assert.ok(article.references.length >= 4);
      assert.ok(article.limits.length >= 4);
      assert.equal(CTA_LABEL, "Buy the film");
      const blob = JSON.stringify(article);
      assert.equal(waitlist.test(blob), false);
      assert.equal(emDash.test(blob), false);
      assert.equal(/fully AI-generated/i.test(blob), false, article.slug);
    }
  });

  it("names only checked films and keeps this site's film off streaming apps", () => {
    for (const slug of LIST_SLUGS) {
      const article = ARTICLES.find((item) => item.slug === slug);
      assert.ok(article?.films && article.films.length >= 4);
      const blob = JSON.stringify(article);
      assert.match(blob, /Which Food Is Killing You\?/);
      assert.equal(/on Netflix/i.test(blob), false, slug);
      for (const film of article!.films!) {
        assert.ok(film.sourceHref.startsWith("https://"), film.title);
        assert.match(blob, new RegExp(film.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      }
    }
  });

  it("links every in-text source and uses real https references", () => {
    const referenceHrefs = new Set(ARTICLES.flatMap((article) => article.references.map((reference) => reference.href)));
    for (const article of ARTICLES) {
      const hrefs = collectHrefs(article);
      for (const href of hrefs) {
        if (href.startsWith("http")) {
          assert.ok(referenceHrefs.has(href), `${href} is cited without a reference`);
          assert.ok(href.startsWith("https://"), href);
        } else {
          assert.match(href, /^\//);
        }
      }
      const unique = new Set(article.references.map((reference) => reference.href));
      assert.equal(unique.size, article.references.length);
    }
  });
});

describe("structured data", () => {
  it("uses the organisation and the real publication date, with no reviewer", () => {
    for (const article of ARTICLES) {
      const data = articleJsonLd(article);
      const serialised = JSON.stringify(data);
      assert.equal(data["@type"], "Article");
      assert.equal(data.headline, article.title);
      assert.equal(data.datePublished, ARTICLE_PUBLISHED);
      assert.equal(data.author["@type"], "Organization");
      assert.equal(data.author.name, "Posh Pork");
      assert.equal(data.url, `${SITE_ORIGIN}${articlePath(article)}`);
      if (EVIDENCE_SLUGS.includes(article.slug)) {
        assert.equal(serialised.includes("Person"), false);
      }
      assert.equal(serialised.includes("dateReviewed"), false);
      assert.equal(serialised.includes("reviewRating"), false);
      assert.equal(data.citation.length, article.references.length);
    }
  });

  it("adds an ItemList of real films on each list article", () => {
    for (const slug of LIST_SLUGS) {
      const article = ARTICLES.find((item) => item.slug === slug);
      const list = filmListJsonLd(article!);
      assert.ok(list);
      assert.equal(list["@type"], "ItemList");
      assert.equal(list.itemListElement.length, article!.films!.length);
      const ours = list.itemListElement.find(
        (entry) => entry.item.name === "Which Food Is Killing You?",
      );
      assert.ok(ours);
      assert.ok(ours.item.director);
      assert.equal(ours.item.director[0].name, "Colin Marry");
      assert.equal(JSON.stringify(ours).includes("aggregateRating"), false);
    }
  });

  it("lists the real article urls on the index", () => {
    const data = indexJsonLd(ARTICLES);
    assert.equal(data["@type"], "CollectionPage");
    assert.equal(data.url, `${SITE_ORIGIN}/articles`);
    const urls = data.mainEntity.itemListElement.map((item) => item.url);
    assert.deepEqual(
      urls,
      ARTICLES.map((article) => `${SITE_ORIGIN}${articlePath(article)}`),
    );
  });
});

describe("routes", () => {
  it("adds the index and every article to the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    const expected = [
      `${SITE_ORIGIN}/articles`,
      ...ARTICLES.map((article) => `${SITE_ORIGIN}${articlePath(article)}`),
    ];
    for (const url of expected) {
      assert.ok(urls.includes(url), url);
    }
  });

  it("points the article CTA at the existing checkout and not a waitlist", () => {
    const cta = read("components/BuyFilmCta.tsx");
    const button = read("components/BuyButton.tsx");
    const header = read("components/SiteHeader.tsx");
    const footer = read("components/Footer.tsx");
    assert.match(cta, /label="Buy the film"/);
    assert.equal(waitlist.test(cta), false);
    assert.match(button, /\/api\/checkout/);
    assert.match(header, /href="\/articles"/);
    assert.match(footer, /href="\/articles"/);
    assert.match(read("app/articles/[slug]/page.tsx"), /canonical: articlePath/);
  });
});
