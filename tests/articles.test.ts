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
import { articleJsonLd, indexJsonLd } from "../lib/articles/schema";

const emDash = /[\u2014\u2013]/;
const waitlist = /waitlist|waiting list/i;

function read(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

describe("article prose", () => {
  it("publishes exactly the three approved questions", () => {
    assert.deepEqual(
      ARTICLES.map((article) => article.slug),
      [
        "ultra-processed-food",
        "uncured-bacon-celery-powder",
        "pasture-raised-and-conventional-pork",
      ],
    );
    assert.deepEqual(
      ARTICLES.map((article) => article.title),
      [
        "Is ultra-processed food really that bad?",
        "Uncured bacon and celery powder: is it safer than nitrates?",
        "Pasture-raised versus conventional pork: what is the difference?",
      ],
    );
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
      assert.ok(headings.includes("Hazard and risk"));
      assert.ok(headings.includes("Association and causation"));
      assert.ok(article.faqs.length >= 4);
      assert.ok(article.references.length >= 4);
      assert.ok(article.limits.length >= 4);
      assert.equal(CTA_LABEL, "Buy the film");
      const blob = JSON.stringify(article);
      assert.equal(waitlist.test(blob), false);
      assert.equal(emDash.test(blob), false);
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
      assert.equal(serialised.includes("Person"), false);
      assert.equal(serialised.includes("dateReviewed"), false);
      assert.equal(serialised.includes("reviewRating"), false);
      assert.equal(data.citation.length, article.references.length);
    }
  });

  it("lists the three real article urls on the index", () => {
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
  it("adds the index and the three articles to the sitemap", () => {
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
