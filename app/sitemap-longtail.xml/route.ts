import type { MetadataRoute } from "next";
import { NextResponse } from "next/server";
import { getTieredSitemap } from "@/app/sitemap";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderAlternateLinks(entry: MetadataRoute.Sitemap[number]): string {
  const languages = entry.alternates?.languages;

  if (!languages) {
    return "";
  }

  return Object.entries(languages)
    .flatMap(([hreflang, href]) => {
      if (typeof href !== "string" || href.length === 0) {
        return [];
      }

      return [
        `<xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}" />`,
      ];
    })
    .join("\n");
}

function renderEntry(entry: MetadataRoute.Sitemap[number]) {
  const lines = ["<url>", `<loc>${escapeXml(entry.url)}</loc>`];

  const alternates = renderAlternateLinks(entry);

  if (alternates) {
    lines.push(alternates);
  }

  if (entry.lastModified) {
    lines.push(
      `<lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>`,
    );
  }

  if (entry.changeFrequency) {
    lines.push(`<changefreq>${entry.changeFrequency}</changefreq>`);
  }

  if (typeof entry.priority === "number") {
    lines.push(`<priority>${entry.priority}</priority>`);
  }

  lines.push("</url>");

  return lines.join("\n");
}

function renderSitemap(entries: MetadataRoute.Sitemap) {
  const body = entries.map(renderEntry).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    body,
    "</urlset>",
  ].join("\n");
}

export async function GET() {
  const entries = await getTieredSitemap("longtail");

  return new NextResponse(renderSitemap(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
