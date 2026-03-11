import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UkClusterPage } from "@/components/UkClusterPage";
import {
  buildUkParentsEveningPageData,
  getUkParentsEveningParams,
  type UkPhase,
} from "@/lib/uk-matrix";
import {
  buildProgrammaticMetadata,
  buildProgrammaticNotFoundMetadata,
} from "@/lib/seo-helpers";

export const revalidate = 604800;
export const dynamicParams = false;

export function generateStaticParams() {
  return getUkParentsEveningParams();
}

export function generateMetadata({
  params,
}: {
  params: { phase: string };
}): Metadata {
  const page = buildUkParentsEveningPageData(params.phase as UkPhase);

  if (!page) {
    return buildProgrammaticNotFoundMetadata(
      "UK page not found | Zaza Draft",
      "The requested UK page could not be found.",
    );
  }

  return buildProgrammaticMetadata({
    title: page.title,
    description: page.metaDescription,
    path: page.path,
    type: "article",
    keywords: [
      page.keyword,
      "parents' evening email templates",
      "UK teacher communication",
      "British school parent email",
      "professional communication",
      "teacher-first AI",
    ],
  });
}

export default function UkParentsEveningPage({
  params,
}: {
  params: { phase: string };
}) {
  const page = buildUkParentsEveningPageData(params.phase as UkPhase);

  if (!page) {
    notFound();
  }

  return <UkClusterPage page={page} />;
}
