import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UkClusterPage } from "@/components/UkClusterPage";
import {
  buildUkSenPageData,
  getUkSenParams,
  type UkNeed,
} from "@/lib/uk-matrix";
import {
  buildProgrammaticMetadata,
  buildProgrammaticNotFoundMetadata,
} from "@/lib/seo-helpers";

export const revalidate = 604800;
export const dynamicParams = false;

export function generateStaticParams() {
  return getUkSenParams();
}

export function generateMetadata({
  params,
}: {
  params: { need: string };
}): Metadata {
  const page = buildUkSenPageData(params.need as UkNeed);

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
      "SEN report comments",
      "UK SEN report writing",
      "professional communication",
      "British school reports",
      "teacher-first AI",
    ],
  });
}

export default function UkSenReportCommentsPage({
  params,
}: {
  params: { need: string };
}) {
  const page = buildUkSenPageData(params.need as UkNeed);

  if (!page) {
    notFound();
  }

  return <UkClusterPage page={page} />;
}
