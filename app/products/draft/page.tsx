import type { Metadata } from "next";
import DraftClient from "./draft-client";

const ogImage = "/images/draft-interface.png";
const canonicalUrl = "https://zazadraft.com/products/draft";

export const metadata: Metadata = {
  title: "Zaza Draft | Teacher-first AI for calm parent communication",
  description:
    "Teacher-built Zaza Draft calms Sunday night messaging with guided tone guardrails and insights on time saved, streaks, and quality—join early access to help shape the beta.",
  openGraph: {
    title: "Zaza Draft | Teacher-first AI for calm parent communication",
    description:
      "Zaza Draft pairs guided drafting modes with insights on time saved, streaks, and quality score so you can share calm, confident parent messages faster. Join early access to shape the teacher-first experience.",
    url: canonicalUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    images: [
      { url: ogImage, alt: "Zaza Draft writing interface" },
      {
        url: "/images/insights-dashboard.png",
        alt: "Zaza Draft insights dashboard showing progress metrics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Draft | Teacher-first early access",
    description:
      "Guided drafts, tone guardrails, and metrics on time saved, streaks, and quality—join early access to help shape the private beta.",
    images: [ogImage],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      de: "https://zazadraft.com/de/products/draft",
    },
  },
};

export default function DraftPage() {
  return (
    <>
      <DraftClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Zaza Draft",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "9.99",
              priceCurrency: "GBP",
              availability: "https://schema.org/InStock",
              description:
                "Private beta early access with guided drafts, tone guardrails, and insights for teachers.",
            },
            description:
              "Teacher-built AI for calm parent communication. Guided drafts, tone guardrails, and insights on time saved, streaks, and quality score invite teachers to shape the private beta.",
            image: [`${ogImage}`, "/images/insights-dashboard.png"],
            featureList: [
              "Teacher-first tone guardrails",
              "Guided drafting modes for parents, reports, and languages",
              "Insights dashboards that track time saved, streaks, and quality score",
              "Translation checks for 50+ languages",
              "Review steps and hallucination safeguards before sending",
              "Early access to help shape the teacher-first private beta",
            ],
          }),
        }}
      />
    </>
  );
}
