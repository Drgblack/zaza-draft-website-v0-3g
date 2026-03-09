import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    host: "https://zazadraft.com",
    sitemap: "https://zazadraft.com/sitemap.xml",
  };
}
