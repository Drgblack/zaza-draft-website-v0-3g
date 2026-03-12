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

  const canonical = `https://zazadraft.com/de/integrations/${params.slug}`;
  const englishUrl = `https://zazadraft.com/integrations/${params.slug}`;

  return {
    title: `${integrationName} Integration - Zaza Draft`,
    description: `Verbinden Sie Zaza Draft mit ${integrationName}. Schritt-für-Schritt-Anleitung, Anwendungsfälle und Best Practices für Lehrer.`,
    alternates: {
      canonical,
      languages: {
        en: englishUrl,
        de: canonical,
        "x-default": englishUrl,
      },
    },
    openGraph: {
      title: `${integrationName} Integration - Zaza Draft`,
      description: `Verbinden Sie Zaza Draft mit ${integrationName}. Schritt-für-Schritt-Anleitung, Anwendungsfälle und Best Practices für Lehrer.`,
      url: canonical,
      type: "website",
      locale: "de_DE",
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
