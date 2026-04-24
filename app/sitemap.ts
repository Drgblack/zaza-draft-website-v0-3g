import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { getGeneratedPageSitemapEntries } from "@/lib/generated-pages";
import { getIndexControlDecision } from "@/lib/index-control";
import { getReportPruneDecision } from "@/lib/report-prune";
import { scenarioPageSlugs } from "@/lib/seo/scenario-pages";
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

const COMPARE_DETAIL_SLUGS = [
  {
    slug: "zaza-draft-vs-magicschool",
    locales: ["en", "de"] as const,
  },
  {
    slug: "zaza-draft-vs-chatgpt",
    locales: ["en", "de"] as const,
  },
  {
    slug: "zaza-draft-vs-grammarly",
    locales: ["en", "de"] as const,
  },
  {
    slug: "best-ai-parent-email-tool-for-teachers",
    locales: ["en"] as const,
  },
] as const;

const SUCCESS_STORY_SLUGS = [
  "lincoln-elementary-parent-communication",
  "riverside-unified-district-rollout",
  "washington-middle-language-barriers",
  "oakwood-special-education-reports",
  "jefferson-new-teacher-confidence",
] as const;

const STATE_OF_AI_REPORT_YEARS = ["2022", "2023", "2024"] as const;
const TOOL_LANDING_SLUGS = [
  "email-tone-checker-for-teachers",
  "check-if-parent-email-sounds-rude",
  "rewrite-parent-email-calmly",
  "parent-email-risk-checker",
] as const;

export type SitemapSourceGroup = {
  source: string;
  entries: MetadataRoute.Sitemap;
};

export type SitemapTier = "main" | "longtail";
type ConfidenceTier = "high" | "medium" | "low";
type LongtailQualityAssessment = {
  include: boolean;
  reason: string;
  depth: number;
  estimatedWordCount: number;
  uniqueExamples: number;
  matchesPopularMatrixCell: boolean;
};
type LongtailExclusionLog = {
  source: string;
  path: string;
  reason: string;
};

const REDIRECT_ONLY_PATHS = new Set([
  "/learning-centre",
  "/de/learning-centre",
  "/communication-diagnosis",
  "/how-to-reply-angry-parent",
  "/behaviour-email-diagnosis",
  "/parent-ignores-email-help",
  "/report-writing-stress-help",
  "/slt-documentation-help",
  "/legal/privacy",
  "/de/ambassadors",
  "/de/state-of-ai-education",
  "/de/best-ai-writing-tools-for-teachers-2025",
]);

const STALE_OR_PLACEHOLDER_PATHS = new Set(["/internal/seo-article-generator"]);
const LONGTAIL_STATIC_LASTMOD = new Date("2026-01-15T00:00:00.000Z");
const LONGTAIL_EXCLUSION_LOG_LIMIT = 200;

export const LONGTAIL_QUALITY_CRITERIA = {
  minimumEstimatedWordCount: 900,
  minimumUniqueExamples: 4,
  maxSlugDepth: 4,
  popularReportComments: {
    phases: ["primary", "ks2"],
    subjects: ["english", "maths"],
    studentTypes: ["struggling", "anxious-eal", "sen-needs"],
  },
  popularScenario: {
    phases: ["primary", "ks2"],
    issues: ["behaviour", "low-attainment"],
    yearGroups: ["year-5", "year-6"],
  },
  familyHeuristics: {
    comparison_entries: {
      estimatedWordCount: 1100,
      uniqueExamples: 4,
    },
    england_regional_entries: {
      estimatedWordCount: 1000,
      uniqueExamples: 4,
    },
    expanded_page_entries: {
      estimatedWordCount: 1365,
      uniqueExamples: 4,
    },
    generated_page_entries: {
      estimatedWordCount: 980,
      uniqueExamples: 4,
    },
    how_to_keyword_entries: {
      estimatedWordCount: 950,
      uniqueExamples: 4,
    },
    matrix_entries: {
      estimatedWordCount: 950,
      uniqueExamples: 3,
    },
    programmatic_entries: {
      estimatedWordCount: 920,
      uniqueExamples: 4,
    },
    uk_regional_entries: {
      estimatedWordCount: 1000,
      uniqueExamples: 4,
    },
  },
} as const;

const MAIN_SOURCE_GROUPS = new Set([
  "primary_entries",
  "core_marketing_entries",
  "locale_and_legal_entries",
  "product_entries",
  "content_hub_entries",
  "campaign_and_tool_entries",
  "programmatic_hub_entries",
  "pain_entries",
  "teacher_writing_entries",
  "topical_cluster_entries",
  "uk_cluster_entries",
  "blog_entries",
  "de_blog_entries",
  "compare_detail_entries",
  "success_story_detail_entries",
  "state_of_ai_year_entries",
]);

const LONGTAIL_SOURCE_GROUPS = new Set([
  "uk_regional_entries",
  "england_regional_entries",
  "expanded_page_entries",
  "comparison_entries",
  "matrix_entries",
  "programmatic_entries",
  "generated_page_entries",
  "how_to_keyword_entries",
]);
const MEDIUM_CONFIDENCE_SOURCE_GROUPS = new Set([
  "uk_regional_entries",
  "england_regional_entries",
  "comparison_entries",
  "how_to_keyword_entries",
]);

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

function getPathFromEntry(entry: MetadataRoute.Sitemap[number]) {
  return new URL(entry.url).pathname;
}

function getPathDepth(path: string) {
  return path.split("/").filter(Boolean).length;
}

function getFamilyHeuristic(source: string) {
  return (
    LONGTAIL_QUALITY_CRITERIA.familyHeuristics[
      source as keyof typeof LONGTAIL_QUALITY_CRITERIA.familyHeuristics
    ] ?? {
      estimatedWordCount: LONGTAIL_QUALITY_CRITERIA.minimumEstimatedWordCount,
      uniqueExamples: LONGTAIL_QUALITY_CRITERIA.minimumUniqueExamples,
    }
  );
}

function matchesPopularLongtailMatrixCell(path: string) {
  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "report-comments" && segments.length === 4) {
    const [, studentType, subject, phase] = segments;

    return (
      LONGTAIL_QUALITY_CRITERIA.popularReportComments.studentTypes.includes(
        studentType as (typeof LONGTAIL_QUALITY_CRITERIA.popularReportComments.studentTypes)[number],
      ) &&
      LONGTAIL_QUALITY_CRITERIA.popularReportComments.subjects.includes(
        subject as (typeof LONGTAIL_QUALITY_CRITERIA.popularReportComments.subjects)[number],
      ) &&
      LONGTAIL_QUALITY_CRITERIA.popularReportComments.phases.includes(
        phase as (typeof LONGTAIL_QUALITY_CRITERIA.popularReportComments.phases)[number],
      )
    );
  }

  if (segments[0] === "scenario" && segments.length === 4) {
    const [, phase, issue, yearGroup] = segments;

    return (
      LONGTAIL_QUALITY_CRITERIA.popularScenario.phases.includes(
        phase as (typeof LONGTAIL_QUALITY_CRITERIA.popularScenario.phases)[number],
      ) &&
      LONGTAIL_QUALITY_CRITERIA.popularScenario.issues.includes(
        issue as (typeof LONGTAIL_QUALITY_CRITERIA.popularScenario.issues)[number],
      ) &&
      LONGTAIL_QUALITY_CRITERIA.popularScenario.yearGroups.includes(
        yearGroup as (typeof LONGTAIL_QUALITY_CRITERIA.popularScenario.yearGroups)[number],
      )
    );
  }

  return false;
}

function assessLongtailQuality(
  source: string,
  path: string,
): LongtailQualityAssessment {
  const depth = getPathDepth(path);
  const familyHeuristic = getFamilyHeuristic(source);
  const matchesPopularMatrixCell = matchesPopularLongtailMatrixCell(path);
  const isMatrixPath =
    source === "matrix_entries" ||
    path.startsWith("/report-comments/") ||
    path.startsWith("/scenario/");
  const estimatedWordCount = familyHeuristic.estimatedWordCount;
  const uniqueExamples =
    isMatrixPath && !matchesPopularMatrixCell
      ? Math.min(familyHeuristic.uniqueExamples, 3)
      : familyHeuristic.uniqueExamples;

  if (depth > LONGTAIL_QUALITY_CRITERIA.maxSlugDepth) {
    return {
      include: false,
      reason: `Excluded: slug depth ${depth} exceeds the longtail threshold of ${LONGTAIL_QUALITY_CRITERIA.maxSlugDepth}.`,
      depth,
      estimatedWordCount,
      uniqueExamples,
      matchesPopularMatrixCell,
    };
  }

  if (
    estimatedWordCount < LONGTAIL_QUALITY_CRITERIA.minimumEstimatedWordCount
  ) {
    return {
      include: false,
      reason: `Excluded: estimated word count ${estimatedWordCount} is below the ${LONGTAIL_QUALITY_CRITERIA.minimumEstimatedWordCount}-word threshold.`,
      depth,
      estimatedWordCount,
      uniqueExamples,
      matchesPopularMatrixCell,
    };
  }

  if (uniqueExamples < LONGTAIL_QUALITY_CRITERIA.minimumUniqueExamples) {
    return {
      include: false,
      reason: `Excluded: estimated unique examples ${uniqueExamples} is below the threshold of ${LONGTAIL_QUALITY_CRITERIA.minimumUniqueExamples}.`,
      depth,
      estimatedWordCount,
      uniqueExamples,
      matchesPopularMatrixCell,
    };
  }

  if (isMatrixPath && !matchesPopularMatrixCell) {
    return {
      include: false,
      reason:
        "Excluded: matrix page does not match the promoted primary or ks2, english or maths, and behaviour or low-attainment cohorts for the longtail sitemap.",
      depth,
      estimatedWordCount,
      uniqueExamples,
      matchesPopularMatrixCell,
    };
  }

  return {
    include: true,
    reason:
      "Included: longtail URL meets the current depth, estimated content, and cohort heuristics.",
    depth,
    estimatedWordCount,
    uniqueExamples,
    matchesPopularMatrixCell,
  };
}

function isHighConfidenceProgrammaticPath(path: string) {
  if (path.startsWith("/report-comments/") || path.startsWith("/scenario/")) {
    return getIndexControlDecision(path).indexable;
  }

  return false;
}

function getConfidenceTier(source: string, path: string): ConfidenceTier {
  if (MAIN_SOURCE_GROUPS.has(source)) {
    return "high";
  }

  if (isHighConfidenceProgrammaticPath(path)) {
    return "high";
  }

  if (MEDIUM_CONFIDENCE_SOURCE_GROUPS.has(source)) {
    return "medium";
  }

  return "low";
}

function isExcludedPath(path: string) {
  if (!path || path.includes("?")) {
    return true;
  }

  if (path.startsWith("/report-comments/")) {
    return getReportPruneDecision(path).action !== "keep";
  }

  if (path.startsWith("/scenario/")) {
    return !getIndexControlDecision(path).indexable;
  }

  if (
    REDIRECT_ONLY_PATHS.has(path) ||
    STALE_OR_PLACEHOLDER_PATHS.has(path) ||
    path.startsWith("/internal/")
  ) {
    return true;
  }

  return false;
}

function shouldIncludeInTier(
  source: string,
  entry: MetadataRoute.Sitemap[number],
  tier: SitemapTier,
  longtailExclusions?: LongtailExclusionLog[],
) {
  const path = getPathFromEntry(entry);
  const confidence = getConfidenceTier(source, path);

  if (isExcludedPath(path)) {
    return false;
  }

  if (tier === "main") {
    return confidence === "high";
  }

  if (!LONGTAIL_SOURCE_GROUPS.has(source) || confidence === "high") {
    return false;
  }

  const qualityAssessment = assessLongtailQuality(source, path);

  if (!qualityAssessment.include) {
    longtailExclusions?.push({
      source,
      path,
      reason: qualityAssessment.reason,
    });
  }

  return qualityAssessment.include;
}

function applyTierFreshness(
  entry: MetadataRoute.Sitemap[number],
  source: string,
  tier: SitemapTier,
  highConfidenceLastModified: Date,
) {
  const path = getPathFromEntry(entry);
  const confidence = getConfidenceTier(source, path);

  return {
    ...entry,
    lastModified:
      tier === "main" || confidence === "high"
        ? highConfidenceLastModified
        : LONGTAIL_STATIC_LASTMOD,
  };
}

function logLongtailExclusions(exclusions: LongtailExclusionLog[]) {
  if (exclusions.length === 0) {
    return;
  }

  console.info(
    `[sitemap-longtail] excluded ${exclusions.length} URLs with the current quality filter`,
  );

  for (const exclusion of exclusions.slice(0, LONGTAIL_EXCLUSION_LOG_LIMIT)) {
    console.info(
      `[sitemap-longtail] ${exclusion.path} :: ${exclusion.source} :: ${exclusion.reason}`,
    );
  }

  if (exclusions.length > LONGTAIL_EXCLUSION_LOG_LIMIT) {
    console.info(
      `[sitemap-longtail] ${exclusions.length - LONGTAIL_EXCLUSION_LOG_LIMIT} additional exclusions truncated from log output`,
    );
  }
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

function getGermanBlogEntries(): MetadataRoute.Sitemap {
  const blogDirectory = join(process.cwd(), "content", "blog");
  const files = readdirSync(blogDirectory, { withFileTypes: true });

  return files
    .filter(
      (file) =>
        file.isFile() &&
        !file.name.startsWith("_") &&
        /\.(md|mdx)$/i.test(file.name) &&
        (file.name.endsWith(".de.md") || file.name.endsWith(".de.mdx")),
    )
    .map((file) => {
      const fullPath = join(blogDirectory, file.name);
      const slug = file.name.replace(/\.de\.(md|mdx)$/i, "");

      return toSitemapEntry({
        path: `/de/blog/${slug}`,
        priority: 0.8,
        changeFrequency: "weekly",
        lastModified: statSync(fullPath).mtime,
      });
    });
}

export async function getSitemapSourceGroups(): Promise<SitemapSourceGroup[]> {
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
      path: "/de/best-ai-tool-parent-emails",
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
      path: "/state-of-ai-education",
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/tools",
      priority: 0.76,
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
      path: "/parent-email-risk-checker",
      priority: 0.86,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      path: "/de/parent-email-risk-checker",
      priority: 0.72,
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
    ...TOOL_LANDING_SLUGS.map((slug) => ({
      path: `/tools/${slug}`,
      priority: 0.84,
      changeFrequency: "weekly" as const,
      lastModified: now,
    })),
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

  const teacherWritingEntries: SitemapEntryConfig[] = [
    ...scenarioPageSlugs,
    ...teacherWritingPageSlugs,
  ].map((slug) => ({
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

  const compareDetailEntries: SitemapEntryConfig[] =
    COMPARE_DETAIL_SLUGS.flatMap(({ slug, locales }) =>
      locales.map((locale) => ({
        path: locale === "de" ? `/de/compare/${slug}` : `/compare/${slug}`,
        priority: 0.74,
        changeFrequency: "monthly" as const,
        lastModified: now,
      })),
    );

  const successStoryDetailEntries: SitemapEntryConfig[] =
    SUCCESS_STORY_SLUGS.map((slug) => ({
      path: `/success-stories/${slug}`,
      priority: 0.72,
      changeFrequency: "monthly",
      lastModified: now,
    }));

  const stateOfAiYearEntries: SitemapEntryConfig[] =
    STATE_OF_AI_REPORT_YEARS.map((year) => ({
      path: `/state-of-ai-education/${year}`,
      priority: 0.68,
      changeFrequency: "yearly",
      lastModified: now,
    }));

  return [
    {
      source: "primary_entries",
      entries: primaryEntries.map(toSitemapEntry),
    },
    {
      source: "core_marketing_entries",
      entries: coreMarketingEntries.map(toSitemapEntry),
    },
    {
      source: "locale_and_legal_entries",
      entries: localeAndLegalEntries.map(toSitemapEntry),
    },
    {
      source: "product_entries",
      entries: productEntries.map(toSitemapEntry),
    },
    {
      source: "content_hub_entries",
      entries: contentHubEntries.map(toSitemapEntry),
    },
    {
      source: "campaign_and_tool_entries",
      entries: campaignAndToolEntries.map(toSitemapEntry),
    },
    {
      source: "programmatic_hub_entries",
      entries: programmaticHubEntries.map(toSitemapEntry),
    },
    {
      source: "pain_entries",
      entries: painEntries.map(toSitemapEntry),
    },
    {
      source: "teacher_writing_entries",
      entries: teacherWritingEntries.map(toSitemapEntry),
    },
    {
      source: "topical_cluster_entries",
      entries: topicalClusterEntries.map(toSitemapEntry),
    },
    {
      source: "uk_regional_entries",
      entries: ukEntries.map(toSitemapEntry),
    },
    {
      source: "england_regional_entries",
      entries: englandEntries.map(toSitemapEntry),
    },
    {
      source: "uk_cluster_entries",
      entries: getUkClusterSitemapEntries(now),
    },
    {
      source: "expanded_page_entries",
      entries: getExpandedPageSitemapEntries(now),
    },
    {
      source: "comparison_entries",
      entries: getComparisonSitemapEntries(now),
    },
    {
      source: "matrix_entries",
      entries: getMatrixSitemapEntries(now),
    },
    {
      source: "programmatic_entries",
      entries: getProgrammaticSitemapEntries(now),
    },
    {
      source: "generated_page_entries",
      entries: getGeneratedPageSitemapEntries(now),
    },
    {
      source: "how_to_keyword_entries",
      entries: howToEntries.map((entry) =>
        toSitemapEntry({
          path: `/how-to/${entry.slug}`,
          priority: 0.78,
          changeFrequency: "weekly",
          lastModified: now,
        }),
      ),
    },
    {
      source: "blog_entries",
      entries: getBlogEntries(),
    },
    {
      source: "de_blog_entries",
      entries: getGermanBlogEntries(),
    },
    {
      source: "compare_detail_entries",
      entries: compareDetailEntries.map(toSitemapEntry),
    },
    {
      source: "success_story_detail_entries",
      entries: successStoryDetailEntries.map(toSitemapEntry),
    },
    {
      source: "state_of_ai_year_entries",
      entries: stateOfAiYearEntries.map(toSitemapEntry),
    },
  ];
}

export async function getTieredSitemap(
  tier: SitemapTier,
): Promise<MetadataRoute.Sitemap> {
  const sourceGroups = await getSitemapSourceGroups();
  const highConfidenceLastModified = new Date();
  const longtailExclusions: LongtailExclusionLog[] = [];

  // Tiering strategy:
  // - main: core commercial pages, hubs, blog, localised essentials, and a
  //   curated high-confidence slice of scenario/report-comment URLs
  // - longtail: remaining programmatic inventory, comparisons, regional
  //   expansions, and deeper long-tail pages submitted separately in GSC
  const sitemapEntries = dedupeEntries(
    sourceGroups.flatMap((group) =>
      group.entries
        .filter((entry) =>
          shouldIncludeInTier(group.source, entry, tier, longtailExclusions),
        )
        .map((entry) =>
          applyTierFreshness(
            entry,
            group.source,
            tier,
            highConfidenceLastModified,
          ),
        ),
    ),
  );

  if (tier === "longtail") {
    logLongtailExclusions(longtailExclusions);
  }

  return sitemapEntries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getTieredSitemap("main");
}
