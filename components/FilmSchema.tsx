/**
 * Structured data for the film.
 *
 * Tells search engines that poshpork.com/movie is a feature film with a
 * director, a runtime, a price and a trailer — rather than an unidentified
 * page that happens to mention food. Without it they have to guess, and
 * for an independent release with no IMDb entry and no distributor they
 * usually guess wrong.
 *
 * Drop <FilmSchema /> into app/movie/page.tsx, anywhere inside the return.
 * It renders nothing visible.
 */

const SITE = "https://www.poshpork.com";

// Change this to the actual release date before it goes live.
const RELEASED = "2026-08-01";

const film = {
  "@context": "https://schema.org",
  "@type": "Movie",
  "@id": `${SITE}/movie#film`,
  name: "Which Food Is Killing You?",
  alternateName: "Which Food Is Killing You? Inside the Greatest Fraud In Human History",
  url: `${SITE}/movie`,
  description:
    "A feature-length animated documentary built as a murder trial. Four foods stand accused, the audience sits on the jury, and questions appear during the film that viewers must answer before the evidence continues. Written and directed by Colin Marry, an Irish pig farmer, working alone over a year.",
  image: [
    `${SITE}/press/posh-pork-key-art.jpg`,
    `${SITE}/press/posh-pork-suspects-lineup.jpg`,
    `${SITE}/og-image.jpg`,
  ],
  genre: ["Documentary", "Animation"],
  duration: "PT1H23M",
  datePublished: RELEASED,
  inLanguage: "en",
  countryOfOrigin: {
    "@type": "Country",
    name: "Spain",
  },
  isFamilyFriendly: true,
  director: {
    "@type": "Person",
    "@id": `${SITE}/about#colin-marry`,
    name: "Colin Marry",
    jobTitle: "Director",
    description:
      "Irish pig farmer with an MSc in Agricultural Economics. Founded Olive Pork in 2018; the business was liquidated in 2023. This is his first film.",
  },
  author: { "@id": `${SITE}/about#colin-marry` },
  creator: { "@id": `${SITE}/about#colin-marry` },
  productionCompany: {
    "@type": "Organization",
    "@id": `${SITE}#org`,
    name: "Posh Pork",
    url: SITE,
  },
  about: [
    { "@type": "Thing", name: "Nutrition" },
    { "@type": "Thing", name: "Chronic inflammation" },
    { "@type": "Thing", name: "Ultra-processed food" },
    { "@type": "Thing", name: "Food industry" },
  ],
  keywords:
    "food documentary, nutrition, chronic inflammation, seed oils, ultra-processed food, animated documentary, interactive film",
  offers: {
    "@type": "Offer",
    url: `${SITE}/movie`,
    price: "15.00",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    category: "Purchase",
    seller: { "@id": `${SITE}#org` },
  },
  trailer: {
    "@type": "VideoObject",
    "@id": `${SITE}/movie#trailer`,
    name: "Which Food Is Killing You? — trailer",
    description:
      "Four foods stand trial. Your table is the jury. Trailer for the animated documentary by Colin Marry.",
    thumbnailUrl: [`${SITE}/og-image.jpg`],
    uploadDate: RELEASED,
    duration: "PT1M",
    embedUrl: "https://player.vimeo.com/video/1218849286",
    contentUrl: "https://vimeo.com/1218849286",
  },
};

const organisation = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}#org`,
  name: "Posh Pork",
  url: SITE,
  logo: `${SITE}/posh-pork-pig.png`,
  email: "colin@poshpork.com",
  founder: { "@id": `${SITE}/about#colin-marry` },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Mallorca",
    addressCountry: "ES",
  },
};

export default function FilmSchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(film) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
      />
    </>
  );
}