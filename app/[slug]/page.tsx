import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TeacherWritingLandingPage } from "@/components/seo/teacher-writing-landing-page";
import {
  getTeacherWritingPage,
  teacherWritingPageSlugs,
  type TeacherWritingSlug,
} from "@/lib/seo/teacher-writing-pages";
import { buildTeacherWritingMetadata } from "@/lib/seo/teacher-writing-schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return teacherWritingPageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: TeacherWritingSlug };
}): Metadata {
  const page = getTeacherWritingPage(params.slug);

  if (!page) {
    return {
      title: "Page not found | Zaza Draft",
    };
  }

  return buildTeacherWritingMetadata(page);
}

export default function TeacherWritingPageRoute({
  params,
}: {
  params: { slug: TeacherWritingSlug };
}) {
  const page = getTeacherWritingPage(params.slug);

  if (!page) {
    notFound();
  }

  return <TeacherWritingLandingPage page={page} />;
}
