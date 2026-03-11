import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UkClusterPage } from "@/components/UkClusterPage";
import {
  buildUkBehaviourLetterPageData,
  getUkBehaviourLetterParams,
  type UkYearGroup,
} from "@/lib/uk-matrix";
import {
  buildProgrammaticMetadata,
  buildProgrammaticNotFoundMetadata,
} from "@/lib/seo-helpers";

export const revalidate = 604800;
export const dynamicParams = false;

export function generateStaticParams() {
  return getUkBehaviourLetterParams().map(({ yearGroup }) => ({
    "year-group": yearGroup,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { "year-group": string };
}): Metadata {
  const page = buildUkBehaviourLetterPageData(
    params["year-group"] as UkYearGroup,
  );

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
      "behaviour letter home",
      "UK parent communication",
      "behaviour email to parents",
      "professional communication",
      "teacher-first AI",
    ],
  });
}

export default function UkBehaviourLetterHomePage({
  params,
}: {
  params: { "year-group": string };
}) {
  const page = buildUkBehaviourLetterPageData(
    params["year-group"] as UkYearGroup,
  );

  if (!page) {
    notFound();
  }

  return <UkClusterPage page={page} />;
}
