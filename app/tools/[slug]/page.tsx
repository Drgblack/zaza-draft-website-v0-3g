import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SetLanguage } from "@/components/set-language";
import { ToolLandingPageTemplate } from "@/components/tool-landing-page";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import {
  getToolLandingPage,
  getToolLandingSlugs,
} from "@/lib/tool-landing-pages";

type ToolLandingRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getToolLandingSlugs().map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: ToolLandingRouteProps): Metadata {
  const page = getToolLandingPage(params.slug);

  if (!page) {
    return {
      title: "Tool Page Not Found",
    };
  }

  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    type: "article",
    keywords: page.keywords,
    alternates: {
      en: `https://zazadraft.com${page.path}`,
    },
  });
}

export default function ToolLandingRoute({ params }: ToolLandingRouteProps) {
  const page = getToolLandingPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <SetLanguage lang="en" />
      <ToolLandingPageTemplate page={page} />
    </>
  );
}
