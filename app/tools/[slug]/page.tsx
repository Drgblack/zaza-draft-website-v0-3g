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
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;
export const revalidate = 604800;

export function generateStaticParams() {
  return getToolLandingSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolLandingRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getToolLandingPage(slug);

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

export default async function ToolLandingRoute({
  params,
}: ToolLandingRouteProps) {
  const { slug } = await params;
  const page = getToolLandingPage(slug);

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
