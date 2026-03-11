import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import {
  generateMetadata as buildProgrammaticMetadata,
  seedFutureCategoryParams,
  slugToProps,
} from "@/lib/programmatic-seo";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return seedFutureCategoryParams.map((item) => ({
    slug: item.category,
    segments: item.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; segments: string[] };
}): Metadata {
  return buildProgrammaticMetadata([params.slug, ...params.segments]);
}

export default function ProgrammaticCatchAllPage({
  params,
}: {
  params: { slug: string; segments: string[] };
}) {
  const page = slugToProps([params.slug, ...params.segments]);

  if (!page) {
    notFound();
  }

  return <ProgrammaticPage page={page} />;
}
