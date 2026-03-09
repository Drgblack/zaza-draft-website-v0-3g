import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import {
  generateMetadata as buildProgrammaticMetadata,
  seedScenarioParams,
  slugToProps,
} from "@/lib/programmatic-seo";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return seedScenarioParams.map(([phase, issue]) => ({ phase, issue }));
}

export function generateMetadata({
  params,
}: {
  params: { phase: string; issue: string };
}): Metadata {
  return buildProgrammaticMetadata(["scenario", params.phase, params.issue]);
}

export default function ScenarioProgrammaticPage({
  params,
}: {
  params: { phase: string; issue: string };
}) {
  const page = slugToProps(["scenario", params.phase, params.issue]);

  if (!page) {
    notFound();
  }

  return <ProgrammaticPage page={page} />;
}
