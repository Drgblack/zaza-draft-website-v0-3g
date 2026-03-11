import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TeacherWritingLandingPage } from "@/components/seo/teacher-writing-landing-page";
import {
  getRegionalTeacherWritingPage,
  getRegionalTeacherWritingSlugs,
} from "@/lib/seo/regional-writing-pages";
import {
  buildRegionalTeacherWritingJsonLd,
  buildRegionalTeacherWritingMetadata,
} from "@/lib/seo/regional-writing-schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getRegionalTeacherWritingSlugs("uk").map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getRegionalTeacherWritingPage("uk", params.slug);

  if (!page) {
    return {
      title: "Page not found | Zaza Draft",
    };
  }

  return buildRegionalTeacherWritingMetadata("uk", page);
}

export default function UkTeacherWritingPageRoute({
  params,
}: {
  params: { slug: string };
}) {
  const page = getRegionalTeacherWritingPage("uk", params.slug);

  if (!page) {
    notFound();
  }

  return (
    <TeacherWritingLandingPage
      page={page}
      jsonLd={buildRegionalTeacherWritingJsonLd("uk", page)}
    />
  );
}
