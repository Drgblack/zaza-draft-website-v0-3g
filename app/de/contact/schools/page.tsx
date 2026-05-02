import type { Metadata } from "next";
import { SchoolSalesContactClient } from "@/components/contact/school-sales-contact-client";
import { parseSchoolSalesPlan, sanitizeLeadSource } from "@/lib/draft-cta";

const pageUrl = "https://zazadraft.com/de/contact/schools";
const ogImage = "/hero/teacher.jpg";

export const metadata: Metadata = {
  title: "Schulvertrieb | Zaza Draft",
  description:
    "Sprechen Sie mit dem Zaza Draft Schulteam über Rollout-Optionen für Fachbereiche, Schulen und Bezirke.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-GB": "https://zazadraft.com/contact/schools",
      "de-DE": pageUrl,
      "x-default": "https://zazadraft.com/contact/schools",
    },
  },
  openGraph: {
    title: "Schulvertrieb | Zaza Draft",
    description:
      "Preis- und Rollout-Anfragen für Fachbereiche, Schulen und Bezirke.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [
      { url: ogImage, alt: "Schulteam bespricht den Einsatz von Zaza Draft" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schulvertrieb | Zaza Draft",
    description:
      "Sprechen Sie mit dem Zaza Draft Schulteam über Rollout und Preise.",
    images: [ogImage],
  },
};

type DeSchoolSalesPageProps = {
  searchParams?: {
    plan?: string;
    source?: string;
  };
};

export default function DeSchoolSalesPage({
  searchParams,
}: DeSchoolSalesPageProps) {
  return (
    <SchoolSalesContactClient
      initialPlan={parseSchoolSalesPlan(searchParams?.plan)}
      initialSource={sanitizeLeadSource(searchParams?.source)}
    />
  );
}
