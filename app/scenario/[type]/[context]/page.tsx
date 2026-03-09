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
  return seedScenarioParams.map(([type, context]) => ({ type, context }));
}

export function generateMetadata({
  params,
}: {
  params: { type: string; context: string };
}): Metadata {
  return buildProgrammaticMetadata(["scenario", params.type, params.context]);
}

export default function ScenarioProgrammaticPage({
  params,
}: {
  params: { type: string; context: string };
}) {
  const page = slugToProps(["scenario", params.type, params.context]);

  if (!page) {
    notFound();
  }

  return <ProgrammaticPage page={page} />;
}
