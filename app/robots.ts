import type { MetadataRoute } from "next";

/**
 * robots.txt, generated at build.
 *
 * Crawlers are welcome on everything that is meant to be read, and kept
 * away from the parts that only work for a signed-in person or in the
 * middle of an event. A crawler that indexes /join gets a page asking
 * for a room code, which helps nobody.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/watch",       // behind a purchase
          "/join",        // only means anything during an event
          "/open",        // one-time sign-in links
          "/redeem",      // gift codes
          "/login",
          "/auth/",
          "/v/",          // venue pages, live only on the night
        ],
      },
    ],
    sitemap: "https://www.poshpork.com/sitemap.xml",
    host: "https://www.poshpork.com",
  };
}