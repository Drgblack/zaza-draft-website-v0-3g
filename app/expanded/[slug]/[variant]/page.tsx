import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExpandedBlogLandingPage } from "@/components/ExpandedBlogLandingPage";
import {
  getExpandedPageByRoute,
  getExpandedPageMetadata,
  getExpandedPageParams,
} from "@/lib/expanded-pages";

export const revalidate = 604800;
export const dynamicParams = false;

export function generateStaticParams() {
  return getExpandedPageParams();
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; variant: string };
}): Metadata {
  return getExpandedPageMetadata(params.slug, params.variant);
}

export default function ExpandedBlogRoute({
  params,
}: {
  params: { slug: string; variant: string };
}) {
  const page = getExpandedPageByRoute(params.slug, params.variant);

  if (!page) {
    notFound();
  }

  return <ExpandedBlogLandingPage page={page} />;
}
