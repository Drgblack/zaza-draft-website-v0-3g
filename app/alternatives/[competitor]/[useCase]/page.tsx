import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import {
  generateMetadata as buildProgrammaticMetadata,
  seedAlternativeParams,
  slugToProps,
} from "@/lib/programmatic-seo";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return seedAlternativeParams.map(([competitor, useCase]) => ({
    competitor,
    useCase,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { competitor: string; useCase: string };
}): Metadata {
  return buildProgrammaticMetadata([
    "alternatives",
    params.competitor,
    params.useCase,
  ]);
}

export default function AlternativesProgrammaticPage({
  params,
}: {
  params: { competitor: string; useCase: string };
}) {
  const page = slugToProps(["alternatives", params.competitor, params.useCase]);

  if (!page) {
    notFound();
  }

  return <ProgrammaticPage page={page} />;
}
