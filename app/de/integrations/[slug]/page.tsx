import type { Metadata } from "next";
import IntegrationClient from "../../../integrations/[slug]/integration-client";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const integrationName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${integrationName} Integration - Zaza Draft`,
    description: `Verbinden Sie Zaza Draft mit ${integrationName}. Schritt-für-Schritt-Anleitung, Anwendungsfälle und Best Practices für Lehrer.`,
    alternates: {
      canonical: `https://zazadraft.com/de/integrations/${params.slug}`,
      languages: {
        en: `/integrations/${params.slug}`,
        de: `/de/integrations/${params.slug}`,
      },
    },
  };
}

export default function DeIntegrationPage({
  params,
}: {
  params: { slug: string };
}) {
  return <IntegrationClient slug={params.slug} />;
}
