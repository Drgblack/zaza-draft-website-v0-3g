import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GeneratedMarkdownPage } from "@/components/GeneratedMarkdownPage";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import {
  getGeneratedPageBySlug,
  getGeneratedPageMetadata,
  getGeneratedPageSlugs,
} from "@/lib/generated-pages";
import { TeacherWritingLandingPage } from "@/components/seo/teacher-writing-landing-page";
import {
  getTeacherWritingPage,
  teacherWritingPageSlugs,
} from "@/lib/seo/teacher-writing-pages";
import { buildTeacherWritingMetadata } from "@/lib/seo/teacher-writing-schema";
import {
  generateMetadata as buildProgrammaticMetadata,
  programmaticSingleSlugSlugs,
  slugToProps,
} from "@/lib/programmatic-seo";

export const dynamicParams = false;
export const revalidate = 604800;

export function generateStaticParams() {
  return Array.from(
    new Set([
      ...teacherWritingPageSlugs,
      ...programmaticSingleSlugSlugs,
      ...getGeneratedPageSlugs(),
    ]),
  ).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getTeacherWritingPage(params.slug);

  if (page) {
    return buildTeacherWritingMetadata(page);
  }

  const generatedPage = getGeneratedPageBySlug(params.slug);

  if (generatedPage) {
    return getGeneratedPageMetadata(params.slug);
  }

  const programmaticPage = slugToProps(params.slug);

  if (programmaticPage) {
    return buildProgrammaticMetadata(params.slug);
  }

  return {
    title: "Page not found | Zaza Draft",
  };
}

export default function TeacherWritingPageRoute({
  params,
}: {
  params: { slug: string };
}) {
  const page = getTeacherWritingPage(params.slug);

  if (page) {
    return <TeacherWritingLandingPage page={page} />;
  }

  const generatedPage = getGeneratedPageBySlug(params.slug);

  if (generatedPage) {
    return <GeneratedMarkdownPage page={generatedPage} />;
  }

  const programmaticPage = slugToProps(params.slug);

  if (programmaticPage) {
    return <ProgrammaticPage page={programmaticPage} />;
  }

  notFound();
}
