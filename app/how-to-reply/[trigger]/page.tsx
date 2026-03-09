import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import {
  generateMetadata as buildProgrammaticMetadata,
  seedReplyParams,
  slugToProps,
} from "@/lib/programmatic-seo";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return seedReplyParams.map((trigger) => ({ trigger }));
}

export function generateMetadata({
  params,
}: {
  params: { trigger: string };
}): Metadata {
  return buildProgrammaticMetadata(["how-to-reply", params.trigger]);
}

export default function HowToReplyProgrammaticPage({
  params,
}: {
  params: { trigger: string };
}) {
  const page = slugToProps(["how-to-reply", params.trigger]);

  if (!page) {
    notFound();
  }

  return <ProgrammaticPage page={page} />;
}
