import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zazadraft.com";

export function generatedProgrammaticEntries(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/how-to-write-behaviour-email-to-parents-year-1-ks1`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/how-to-write-missing-homework-email-to-parents-year-1-ks1`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/how-to-write-angry-parent-reply-email-to-parents-year-1-ks1`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/how-to-write-grade-complaint-email-to-parents-year-1-ks1`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/how-to-write-behaviour-email-to-parents-year-2-ks1`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}

// In app/sitemap.ts:
// return [...staticRoutes, ...generatedProgrammaticEntries()];
