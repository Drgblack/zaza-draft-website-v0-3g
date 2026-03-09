import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { getGeneratedPageSitemapEntries } from "@/lib/generated-pages";
import { teacherWritingPageSlugs } from "@/lib/seo/teacher-writing-pages";
import { clusterSpokes } from "@/lib/seo/teacher-safe-ai-cluster";
import { getRegionalTeacherWritingSlugs } from "@/lib/seo/regional-writing-pages";
import { getProgrammaticSitemapEntries } from "@/lib/programmatic";
import { getMatrixSitemapEntries } from "@/lib/matrix";
import { getComparisonSitemapEntries } from "@/lib/comparison-matrix";
import { getUkClusterSitemapEntries } from "@/lib/uk-matrix";
import { getExpandedPageSitemapEntries } from "@/lib/expanded-pages";

const BASE_URL = "https://zazadraft.com";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

type SitemapEntryConfig = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified?: Date;
};

function toSitemapEntry({
  path,
  priority,
  changeFrequency,
  lastModified = new Date(),
}: SitemapEntryConfig): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

function dedupeEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}

function getBlogEntries(): MetadataRoute.Sitemap {
  const blogDirectory = join(process.cwd(), "content", "blog");
  const files = readdirSync(blogDirectory, { withFileTypes: true });

  return files
    .filter(
      (file) =>
        file.isFile() &&
        !file.name.startsWith("_") &&
        /\.(md|mdx)$/i.test(file.name) &&
        !file.name.endsWith(".de.md") &&
        !file.name.endsWith(".de.mdx"),
    )
    .map((file) => {
      const fullPath = join(blogDirectory, file.name);
      const slug = file.name.replace(/\.(md|mdx)$/i, "");

      return toSitemapEntry({
        path: `/blog/${slug}`,
        priority: 0.8,
        changeFrequency: "weekly",
        lastModified: statSync(fullPath).mtime,
      });
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const primaryEntries: SitemapEntryConfig[] = [
    { path: "/", priority: 1.0, changeFrequency: "daily", lastModified: now },
    {
      path: "/teacher-parent-communication-hub",
      priority: 1.0,
      changeFrequency: "daily",
      lastModified: now,
    },
    {
      path: "/uk/teacher-communication-resources",
      priority: 1.0,
      changeFrequency: "daily",
      lastModified: now,
    },
  ];

  const coreMarketingEntries: SitemapEntryConfig[] = [
    {
      path: "/features",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/about",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/about/company",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/about/founder",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/about/press",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/pricing",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/products/draft",
      priority: 0.9,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/free-resources",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/roi-calculator",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/blog",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/uk",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/england",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: now,
    },
  ];

  const painEntries: SitemapEntryConfig[] = [
    {
      path: "/diagnosis",
      priority: 0.95,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/communication-diagnosis",
      priority: 0.6,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/how-to-reply-angry-parent",
      priority: 0.65,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/parent-ignores-email-help",
      priority: 0.65,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/report-writing-stress-help",
      priority: 0.65,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/behaviour-email-diagnosis",
      priority: 0.65,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/slt-documentation-help",
      priority: 0.65,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/how-to-reply-to-an-angry-parent-email",
      priority: 0.9,
      changeFrequency: "daily",
      lastModified: now,
    },
    {
      path: "/reduce-stress-parent-messages",
      priority: 0.9,
      changeFrequency: "daily",
      lastModified: now,
    },
  ];

  const teacherWritingEntries: SitemapEntryConfig[] =
    teacherWritingPageSlugs.map((slug) => ({
      path: `/${slug}`,
      priority: 0.9,
      changeFrequency: "daily",
      lastModified: now,
    }));

  const topicalClusterEntries: SitemapEntryConfig[] = clusterSpokes.map(
    (page) => ({
      path: `/${page.slug}`,
      priority: 0.9,
      changeFrequency: "daily",
      lastModified: now,
    }),
  );

  const ukEntries: SitemapEntryConfig[] = getRegionalTeacherWritingSlugs(
    "uk",
  ).map((slug) => ({
    path: `/uk/${slug}`,
    priority: 0.9,
    changeFrequency: "daily",
    lastModified: now,
  }));

  const englandEntries: SitemapEntryConfig[] = getRegionalTeacherWritingSlugs(
    "england",
  ).map((slug) => ({
    path: `/england/${slug}`,
    priority: 0.9,
    changeFrequency: "daily",
    lastModified: now,
  }));

  const dynamicProgrammaticEntries: MetadataRoute.Sitemap = [
    ...getUkClusterSitemapEntries(now),
    ...getExpandedPageSitemapEntries(now),
    ...getComparisonSitemapEntries(now),
    ...getMatrixSitemapEntries(now),
    ...getProgrammaticSitemapEntries(now),
    ...getGeneratedPageSitemapEntries(now),
  ];

  return dedupeEntries([
    ...primaryEntries.map(toSitemapEntry),
    ...coreMarketingEntries.map(toSitemapEntry),
    ...painEntries.map(toSitemapEntry),
    ...teacherWritingEntries.map(toSitemapEntry),
    ...topicalClusterEntries.map(toSitemapEntry),
    ...ukEntries.map(toSitemapEntry),
    ...englandEntries.map(toSitemapEntry),
    ...dynamicProgrammaticEntries,
    ...getBlogEntries(),
  ]);
}
