import type { Metadata } from "next";
import IntegrationClient from "./integration-client";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const integrationName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return buildPageMetadata({
    title: `${integrationName} Integration - Zaza Draft`,
    description: `Connect Zaza Draft with ${integrationName}. Step-by-step setup guide, use cases, and best practices for teachers.`,
    path: `/integrations/${params.slug}`,
    alternates: {
      en: `https://zazadraft.com/integrations/${params.slug}`,
      de: `https://zazadraft.com/de/integrations/${params.slug}`,
    },
  });
}

export default function IntegrationPage({
  params,
}: {
  params: { slug: string };
}) {
  return <IntegrationClient slug={params.slug} />;
}
