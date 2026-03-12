// Resource Detail Page with Static Generation
// Save this as: app/ai-literacy/resources/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceDetailClient from "./resource-detail-client";
import {
  getResourceBySlug,
  getAllResourceSlugs,
} from "@/lib/data/ai-literacy-resources";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllResourceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return {
      title: "Resource Not Found | Zaza Draft",
    };
  }

  const canonical = `https://zazadraft.com/de/ai-literacy/resources/${slug}`;
  const englishUrl = `https://zazadraft.com/ai-literacy/resources/${slug}`;

  return {
    title: `${resource.title} | Zaza Draft AI Literacy`,
    description: resource.description,
    alternates: {
      canonical,
      languages: {
        en: englishUrl,
        de: canonical,
        "x-default": englishUrl,
      },
    },
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: "website",
      url: canonical,
      locale: "de_DE",
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return <ResourceDetailClient resource={resource} />;
}
