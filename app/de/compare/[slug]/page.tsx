import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ComparisonClient } from "../../../compare/[slug]/comparison-client";

const comparisons = {
  "zaza-draft-vs-magicschool": {
    title: "Zaza Draft vs. MagicSchool",
    metaTitle:
      "Zaza Draft vs. MagicSchool: Welches KI-Tool für Lehrkräfte? (2025)",
    metaDescription:
      "Ehrlicher Vergleich von Zaza Draft und MagicSchool für Lehrkräfte: Funktionen, Preis, Bedienbarkeit und Eignung im Schulalltag.",
    competitor: "MagicSchool",
    lastUpdated: "Oktober 2025",
  },
  "zaza-draft-vs-chatgpt": {
    title: "Zaza Draft vs. ChatGPT",
    metaTitle:
      "Zaza Draft vs. ChatGPT: Das bessere KI-Tool für Lehrkräfte (2025)",
    metaDescription:
      "Vergleiche Zaza Draft und ChatGPT für Elternmails, Rückmeldungen und schulische Kommunikation.",
    competitor: "ChatGPT",
    lastUpdated: "Oktober 2025",
  },
  "zaza-draft-vs-grammarly": {
    title: "Zaza Draft vs. Grammarly",
    metaTitle:
      "Zaza Draft vs. Grammarly: Welches Schreibtool passt für Lehrkräfte? (2025)",
    metaDescription:
      "Detaillierter Vergleich von Zaza Draft und Grammarly für Lehrkräfte: Stärken, Unterschiede und passende Einsatzbereiche.",
    competitor: "Grammarly",
    lastUpdated: "Oktober 2025",
  },
} as const;

export async function generateStaticParams() {
  return Object.keys(comparisons).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const comparison = comparisons[params.slug as keyof typeof comparisons];

  if (!comparison) {
    return {
      title: "Vergleich nicht gefunden",
    };
  }

  const canonical = `https://zazadraft.com/de/compare/${params.slug}`;
  const en = `https://zazadraft.com/compare/${params.slug}`;

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    alternates: {
      canonical,
      languages: {
        en,
        de: canonical,
      },
    },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      locale: "de_DE",
      type: "article",
      url: canonical,
    },
  };
}

export default function DeComparisonSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const comparison = comparisons[params.slug as keyof typeof comparisons];

  if (!comparison) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-20 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Startseite", href: "/de" },
            { label: "Vergleich", href: "/de/compare" },
            { label: comparison.title },
          ]}
        />
        <ComparisonClient comparison={comparison} slug={params.slug} />
      </div>
    </div>
  );
}
