import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import {
  generateMetadata as buildProgrammaticMetadata,
  seedReportParams,
  slugToProps,
} from "@/lib/programmatic-seo";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return seedReportParams.map(([studentType, subject, yearGroup]) => ({
    studentType,
    subject,
    yearGroup,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { studentType: string; subject: string; yearGroup: string };
}): Metadata {
  return buildProgrammaticMetadata([
    "report-comments",
    params.studentType,
    params.subject,
    params.yearGroup,
  ]);
}

export default function ReportCommentsProgrammaticPage({
  params,
}: {
  params: { studentType: string; subject: string; yearGroup: string };
}) {
  const page = slugToProps([
    "report-comments",
    params.studentType,
    params.subject,
    params.yearGroup,
  ]);

  if (!page) {
    notFound();
  }

  return <ProgrammaticPage page={page} />;
}
