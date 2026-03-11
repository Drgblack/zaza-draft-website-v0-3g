import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ComparisonPage } from "@/components/ComparisonPage";
import {
  buildComparisonPageData,
  getComparisonParams,
  type Competitor,
  type UseCase,
} from "@/lib/comparison-matrix";
import {
  buildProgrammaticMetadata,
  buildProgrammaticNotFoundMetadata,
} from "@/lib/seo-helpers";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return getComparisonParams().map(({ competitor, usecase }) => ({
    competitor,
    useCase: usecase,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { competitor: string; useCase: string };
}): Metadata {
  const page = buildComparisonPageData(
    params.competitor as Competitor,
    params.useCase as UseCase,
  );

  if (!page) {
    return buildProgrammaticNotFoundMetadata(
      "Comparison page not found | Zaza Draft",
      "The requested comparison page could not be found.",
    );
  }

  return buildProgrammaticMetadata({
    title: page.title,
    description: page.metaDescription,
    path: page.path,
    canonicalPath: "/alternatives",
    type: "article",
    keywords: [
      page.keyword,
      "alternative to teacher ai tool",
      "teacher writing support",
      "parent communication",
      "report comments",
      "tone safety",
      "professional communication",
      "teacher-first AI",
    ],
  });
}

export default function AlternativesProgrammaticPage({
  params,
}: {
  params: { competitor: string; useCase: string };
}) {
  const page = buildComparisonPageData(
    params.competitor as Competitor,
    params.useCase as UseCase,
  );

  if (!page) {
    notFound();
  }

  return <ComparisonPage page={page} />;
}
