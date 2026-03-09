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
import howToKeywords from "@/data/how-to-keywords.json";

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

type HowToKeywordEntry = {
  slug: string;
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
  const howToEntries = howToKeywords as HowToKeywordEntry[];

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
      path: "/about/founder-story",
      priority: 0.65,
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

  const localeAndLegalEntries: SitemapEntryConfig[] = [
    {
      path: "/de",
      priority: 0.95,
      changeFrequency: "daily",
      lastModified: now,
    },
    {
      path: "/privacy",
      priority: 0.55,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/terms",
      priority: 0.55,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/impressum",
      priority: 0.5,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/features",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/about",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/about/company",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/about/founder",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/about/founder-story",
      priority: 0.65,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/about/press",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/pricing",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/suite",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/products/draft",
      priority: 0.9,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/products/teach",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/products/gradeflow",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/products/shield",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/resources",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/ai-literacy",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/videos",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/webinars",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/success-stories",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/compare",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/integrations",
      priority: 0.72,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/community",
      priority: 0.72,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/glossary",
      priority: 0.72,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/blog",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/state-of-ai-education",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/best-ai-tool-parent-emails",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/best-ai-writing-tools-for-teachers-2025",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/ai-for-student-reports",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/early-access",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/reduce-stress-parent-messages",
      priority: 0.9,
      changeFrequency: "daily",
      lastModified: now,
    },
    {
      path: "/de/roi-calculator",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/contact",
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/support",
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/faq",
      priority: 0.65,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/manifesto",
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/ambassadors",
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/privacy",
      priority: 0.55,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/terms",
      priority: 0.55,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/de/impressum",
      priority: 0.5,
      changeFrequency: "monthly",
      lastModified: now,
    },
  ];

  const productEntries: SitemapEntryConfig[] = [
    {
      path: "/suite",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/products/teach",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/products/gradeflow",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/products/shield",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
  ];

  const contentHubEntries: SitemapEntryConfig[] = [
    {
      path: "/resources",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/ai-literacy",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/videos",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/webinars",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/success-stories",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/teacher-stories",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/compare",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/alternatives",
      priority: 0.78,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/integrations",
      priority: 0.72,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/community",
      priority: 0.72,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/glossary",
      priority: 0.72,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/learning-centre",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/state-of-ai-education",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
  ];

  const campaignAndToolEntries: SitemapEntryConfig[] = [
    {
      path: "/best-ai-tool-parent-emails",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/best-ai-writing-tools-for-teachers-2025",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/ai-for-student-reports",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/early-access",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/contact",
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/support",
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/faq",
      priority: 0.65,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/ambassadors",
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      path: "/manifesto",
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: now,
    },
  ];

  const programmaticHubEntries: SitemapEntryConfig[] = [
    {
      path: "/how-to-reply",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/reply-scenarios",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/parent-email-scenarios",
      priority: 0.82,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/parent-communication-problems",
      priority: 0.82,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/report-comments",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/report-comment-builder",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/scenario-builder",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/scenario-combinations",
      priority: 0.82,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/uk-school-communication",
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/how-to",
      priority: 0.82,
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
    ...howToEntries.map((entry) =>
      toSitemapEntry({
        path: `/how-to/${entry.slug}`,
        priority: 0.78,
        changeFrequency: "weekly",
        lastModified: now,
      }),
    ),
  ];

  return dedupeEntries([
    ...primaryEntries.map(toSitemapEntry),
    ...coreMarketingEntries.map(toSitemapEntry),
    ...localeAndLegalEntries.map(toSitemapEntry),
    ...productEntries.map(toSitemapEntry),
    ...contentHubEntries.map(toSitemapEntry),
    ...campaignAndToolEntries.map(toSitemapEntry),
    ...programmaticHubEntries.map(toSitemapEntry),
    ...painEntries.map(toSitemapEntry),
    ...teacherWritingEntries.map(toSitemapEntry),
    ...topicalClusterEntries.map(toSitemapEntry),
    ...ukEntries.map(toSitemapEntry),
    ...englandEntries.map(toSitemapEntry),
    ...dynamicProgrammaticEntries,
    ...getBlogEntries(),
  ]);
}
