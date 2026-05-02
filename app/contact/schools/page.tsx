import type { Metadata } from "next";
import { SchoolSalesContactClient } from "@/components/contact/school-sales-contact-client";
import { parseSchoolSalesPlan, sanitizeLeadSource } from "@/lib/draft-cta";

const pageUrl = "https://zazadraft.com/contact/schools";
const ogImage = "/hero/teacher.jpg";

export const metadata: Metadata = {
  title: "School Sales | Zaza Draft",
  description:
    "Talk to the Zaza Draft schools team about department, school, and district rollout options.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-GB": pageUrl,
      "de-DE": "https://zazadraft.com/de/contact/schools",
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "School Sales | Zaza Draft",
    description:
      "Department, school, and district pricing enquiries for Zaza Draft.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    images: [
      { url: ogImage, alt: "School team discussing Zaza Draft rollout" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School Sales | Zaza Draft",
    description:
      "Talk to the Zaza Draft schools team about rollout and pricing.",
    images: [ogImage],
  },
};

type SchoolSalesPageProps = {
  searchParams?: {
    plan?: string;
    source?: string;
  };
};

export default function SchoolSalesPage({
  searchParams,
}: SchoolSalesPageProps) {
  return (
    <SchoolSalesContactClient
      initialPlan={parseSchoolSalesPlan(searchParams?.plan)}
      initialSource={sanitizeLeadSource(searchParams?.source)}
    />
  );
}
