import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SetLanguage } from "@/components/set-language";
import { BottomFunnelComparePage } from "@/components/bottom-funnel-compare-page";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import {
  getCompareDetailPage,
  getCompareDetailSlugs,
} from "@/lib/compare-detail-pages";
import { ComparisonClient } from "./comparison-client";

const legacyComparisons = {
  "zaza-draft-vs-magicschool": {
    title: "Zaza Draft vs MagicSchool",
    metaTitle:
      "Zaza Draft vs MagicSchool: Which AI Tool for Teachers? (2025 Comparison)",
    metaDescription:
      "Honest comparison of Zaza Draft vs MagicSchool for teachers. Compare features, pricing, ease of use, and find the best AI tool for your needs.",
    competitor: "MagicSchool",
    lastUpdated: "October 2025",
  },
} as const;

type ComparePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;
export const revalidate = 604800;

export async function generateStaticParams() {
  return Array.from(
    new Set([...getCompareDetailSlugs(), ...Object.keys(legacyComparisons)]),
  ).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCompareDetailPage(slug);

  if (page) {
    return buildPageMetadata({
      title: page.metaTitle,
      description: page.metaDescription,
      path: page.path,
      type: "article",
      keywords: page.keywords,
      alternates: page.alternates,
    });
  }

  const legacyComparison =
    legacyComparisons[slug as keyof typeof legacyComparisons];

  if (!legacyComparison) {
    return {
      title: "Comparison Not Found",
    };
  }

  return buildPageMetadata({
    title: legacyComparison.metaTitle,
    description: legacyComparison.metaDescription,
    path: `/compare/${slug}`,
    type: "article",
    alternates: {
      en: `https://zazadraft.com/compare/${slug}`,
      de: `https://zazadraft.com/de/compare/${slug}`,
    },
    keywords: [
      "teacher ai comparison",
      "compare AI tools for teachers",
      "parent email tool comparison",
    ],
  });
}

export default async function CompareDetailPage({ params }: ComparePageProps) {
  const { slug } = await params;
  const page = getCompareDetailPage(slug);

  if (page) {
    return (
      <>
        <SetLanguage lang="en" />
        <BottomFunnelComparePage page={page} />
      </>
    );
  }

  const legacyComparison =
    legacyComparisons[slug as keyof typeof legacyComparisons];

  if (!legacyComparison) {
    notFound();
  }

  return (
    <>
      <SetLanguage lang="en" />
      <div className="min-h-screen bg-[#0F172A] py-20 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Compare", href: "/compare" },
              { label: legacyComparison.title },
            ]}
          />

          <ComparisonClient comparison={legacyComparison} slug={slug} />
        </div>
      </div>
    </>
  );
}
