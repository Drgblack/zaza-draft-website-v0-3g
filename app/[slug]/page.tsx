import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GeneratedMarkdownPage } from "@/components/GeneratedMarkdownPage";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import { ScenarioPageTemplate } from "@/components/seo/scenario-page-template";
import {
  getGeneratedPageBySlug,
  getGeneratedPageMetadata,
  getGeneratedPageSlugs,
} from "@/lib/generated-pages";
import {
  buildScenarioPageMetadata,
  getScenarioPage,
  scenarioPageSlugs,
} from "@/lib/seo/scenario-pages";
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
      ...scenarioPageSlugs,
      ...teacherWritingPageSlugs,
      ...programmaticSingleSlugSlugs,
      ...getGeneratedPageSlugs(),
    ]),
  ).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scenarioPage = getScenarioPage(slug);

  if (scenarioPage) {
    return buildScenarioPageMetadata(scenarioPage);
  }

  const page = getTeacherWritingPage(slug);

  if (page) {
    return buildTeacherWritingMetadata(page);
  }

  const generatedPage = getGeneratedPageBySlug(slug);

  if (generatedPage) {
    return getGeneratedPageMetadata(slug);
  }

  const programmaticPage = slugToProps(slug);

  if (programmaticPage) {
    return buildProgrammaticMetadata(slug);
  }

  return {
    title: "Page not found | Zaza Draft",
  };
}

export default async function TeacherWritingPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scenarioPage = getScenarioPage(slug);

  if (scenarioPage) {
    return <ScenarioPageTemplate page={scenarioPage} />;
  }

  const page = getTeacherWritingPage(slug);

  if (page) {
    return <TeacherWritingLandingPage page={page} />;
  }

  const generatedPage = getGeneratedPageBySlug(slug);

  if (generatedPage) {
    return <GeneratedMarkdownPage page={generatedPage} />;
  }

  const programmaticPage = slugToProps(slug);

  if (programmaticPage) {
    return <ProgrammaticPage page={programmaticPage} />;
  }

  notFound();
}
