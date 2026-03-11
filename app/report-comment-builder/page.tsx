import { notFound } from "next/navigation";
import { ProgrammaticTemplate } from "@/components/ProgrammaticTemplate";
import {
  generateMetadata as buildProgrammaticMetadata,
  slugToProps,
} from "@/lib/programmatic";

export const revalidate = 604800;

export const metadata = buildProgrammaticMetadata("report-comment-builder");

export default function ReportCommentBuilderPage() {
  const page = slugToProps("report-comment-builder");

  if (!page) {
    notFound();
  }

  return <ProgrammaticTemplate page={page} />;
}
