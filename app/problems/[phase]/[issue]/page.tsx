import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProgrammaticTemplate } from "@/components/ProgrammaticTemplate";
import {
  generateMetadata as buildProgrammaticMetadata,
  problemSeedParams,
  slugToProps,
} from "@/lib/programmatic";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return problemSeedParams;
}

export function generateMetadata({
  params,
}: {
  params: { phase: string; issue: string };
}): Metadata {
  return buildProgrammaticMetadata(["problems", params.phase, params.issue]);
}

export default function ProblemsProgrammaticPage({
  params,
}: {
  params: { phase: string; issue: string };
}) {
  const page = slugToProps(["problems", params.phase, params.issue]);

  if (!page) {
    notFound();
  }

  return <ProgrammaticTemplate page={page} />;
}
