import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProgrammaticTemplate } from "@/components/ProgrammaticTemplate";
import {
  generateMetadata as buildProgrammaticMetadata,
  replySeedParams,
  slugToProps,
} from "@/lib/programmatic";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return replySeedParams;
}

export function generateMetadata({
  params,
}: {
  params: { trigger: string; context: string };
}): Metadata {
  return buildProgrammaticMetadata(["reply", params.trigger, params.context]);
}

export default function ReplyProgrammaticPage({
  params,
}: {
  params: { trigger: string; context: string };
}) {
  const page = slugToProps(["reply", params.trigger, params.context]);

  if (!page) {
    notFound();
  }

  return <ProgrammaticTemplate page={page} />;
}
