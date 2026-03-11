import { notFound, permanentRedirect } from "next/navigation";
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
import { getReportPruneDecision } from "@/lib/report-prune";
import { getCanonicalPath, getIndexDecision, isIndexable } from "@/lib/seo";

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

  const indexDecision = getIndexDecision(page.path);
  const pruneDecision = getReportPruneDecision(page.path);
  const indexable = isIndexable(page.path) && pruneDecision.action === "keep";

  if (pruneDecision.action !== "keep") {
    console.info(
      `[report-prune] ${pruneDecision.action} ${page.path} -> ${pruneDecision.redirectTo ?? page.path} :: ${pruneDecision.reason} :: index=${indexDecision.reason} :: keep-signals=${pruneDecision.keepSignalCount ?? "n/a"}`,
    );
  }

  return {
    ...buildProgrammaticMetadata({
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
      canonicalPath: getCanonicalPath(page.path),
    }),
    robots: {
      index: indexable,
      follow: true,
    },
  };
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

  const pruneDecision = getReportPruneDecision(page.path);

  if (pruneDecision.action === "redirect" && pruneDecision.redirectTo) {
    console.info(
      `[report-prune] redirect ${page.path} -> ${pruneDecision.redirectTo}`,
    );
    permanentRedirect(pruneDecision.redirectTo);
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
