import type { MetadataRoute } from "next";
import { getTieredSitemap } from "@/app/sitemap";

export default async function sitemapLongtail(): Promise<MetadataRoute.Sitemap> {
  return getTieredSitemap("longtail");
}
