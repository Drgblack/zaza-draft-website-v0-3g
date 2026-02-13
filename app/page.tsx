import type { Metadata } from "next";
import { HomePageClient } from "./home-client";

const siteUrl = "https://zazadraft.com";
const ogImage = "/hero/teacher.jpg";

export const metadata: Metadata = {
  title: "Zaza Draft | Zaza - Just Teach.",
  description:
    "Zaza helps teachers thrive. Draft reduces writing burden so teachers can focus on teaching with calm, professional communication support.",
  openGraph: {
    title: "Zaza Draft | Zaza - Just Teach.",
    description:
      "Zaza helps teachers thrive. Draft reduces cognitive load and supports clear, professional school communication.",
    type: "website",
    locale: "en_GB",
    siteName: "Zaza Draft",
    alternateLocale: ["de_DE"],
    url: siteUrl,
    images: [
      {
        url: ogImage,
        alt: "Teacher using Zaza Draft to write a parent message",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Draft | Zaza - Just Teach.",
    description:
      "Draft removes writing burden so teachers can focus on teaching with calm, professional support.",
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      de: `${siteUrl}/de`,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Zaza Technologies",
            url: "https://zazatechnologies.com",
            logo: `${siteUrl}/zaza-logo.png`,
            description:
              "Zaza helps teachers thrive with calm, professional tools that reduce cognitive load and protect teacher judgment.",
            founder: {
              "@type": "Person",
              name: "Dr. Greg Blackburn",
              jobTitle: "Founder & CEO",
              description:
                "PhD in Professional Education from City, University of London. Over 20 years experience in Learning & Development and educational technology.",
            },
            sameAs: [
              "https://www.linkedin.com/company/zaza-technologies",
              "https://x.com/zazateachapp",
              "https://www.tiktok.com/@zazatechnologies",
            ],
          }),
        }}
      />
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
              price: "0",
              priceCurrency: "GBP",
              description: "Free tier with 5 drafts per month",
            },
            description:
              "Professional writing support for teachers that reduces cognitive load, protects tone, and keeps teacher judgment in control.",
            featureList: [
              "Hallucination prevention",
              "School-appropriate tone guardrails",
              "One-click translation to 50+ languages",
              "GDPR-compliant data handling",
              "Privacy-focused design",
              "Hours saved each week",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              ratingCount: "6",
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />
      <HomePageClient />
    </>
  );
}
