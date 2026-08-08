import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing under these should ever be indexed.
      disallow: ["/admin", "/admin/", "/login"],
    },
    sitemap: "https://www.goldentravels.co/sitemap.xml",
    host: "https://www.goldentravels.co",
  };
}
