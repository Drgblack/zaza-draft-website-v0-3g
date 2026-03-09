import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ScenarioPage } from "@/components/ScenarioPage";
import {
  buildReportPageData,
  getReportCombinations,
  type ReportStage,
  type StudentType,
  type Subject,
} from "@/lib/matrix";
import {
  buildProgrammaticMetadata,
  buildProgrammaticNotFoundMetadata,
} from "@/lib/seo-helpers";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return getReportCombinations().map((item) => ({
    "student-type": item.studentType,
    subject: item.subject,
    phase: item.phase,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { "student-type": string; subject: string; phase: string };
}): Metadata {
  const page = buildReportPageData(
    params["student-type"] as StudentType,
    params.subject as Subject,
    params.phase as ReportStage,
  );

  if (!page) {
    return buildProgrammaticNotFoundMetadata(
      "Report comments page not found | Zaza Draft",
      "The requested report comments page could not be found.",
    );
  }

  return buildProgrammaticMetadata({
    title: page.title,
    description: page.metaDescription,
    path: page.path,
    type: "article",
    keywords: [
      page.keyword,
      "report comments",
      "report writing",
      "teacher reports",
      "parents' evening",
      "SEN",
      "professional communication",
      "teacher-first AI",
    ],
  });
}

export default function ReportCommentsMatrixPage({
  params,
}: {
  params: { "student-type": string; subject: string; phase: string };
}) {
  const page = buildReportPageData(
    params["student-type"] as StudentType,
    params.subject as Subject,
    params.phase as ReportStage,
  );

  if (!page) {
    notFound();
  }

  return (
    <ScenarioPage
      mode="report-comments"
      phase={params.phase as ReportStage}
      studentType={params["student-type"] as StudentType}
      subject={params.subject as Subject}
    />
  );
}
