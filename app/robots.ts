import type { MetadataRoute } from "next";

const SITE = "https://protocoldmc.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the admin area and auth flow out of the index.
      disallow: ["/dashboard", "/admin", "/api"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
