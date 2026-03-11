import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UkClusterPage } from "@/components/UkClusterPage";
import {
  buildUkOfstedPageData,
  getUkOfstedParams,
  type UkSubject,
} from "@/lib/uk-matrix";
import {
  buildProgrammaticMetadata,
  buildProgrammaticNotFoundMetadata,
} from "@/lib/seo-helpers";

export const revalidate = 604800;
export const dynamicParams = false;

export function generateStaticParams() {
  return getUkOfstedParams();
}

export function generateMetadata({
  params,
}: {
  params: { subject: string };
}): Metadata {
  const page = buildUkOfstedPageData(params.subject as UkSubject);

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
      "Ofsted report comments",
      "UK report comments",
      "teacher report writing",
      "professional communication",
      "teacher-first AI",
    ],
  });
}

export default function UkOfstedReportCommentsPage({
  params,
}: {
  params: { subject: string };
}) {
  const page = buildUkOfstedPageData(params.subject as UkSubject);

  if (!page) {
    notFound();
  }

  return <UkClusterPage page={page} />;
}
