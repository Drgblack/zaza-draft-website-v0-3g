import type { Metadata } from "next";
import { HomePageClient } from "./home-client";

const siteUrl = "https://zazadraft.com";
const ogImage = "/hero/teacher.jpg";

export const metadata: Metadata = {
  title: "Zaza Draft | AI writing help built for teachers, not tech hype",
  description:
    "Teacher-first AI built with educators to calm Sunday night admin - join early access to shape the private beta.",
  openGraph: {
    title: "Zaza Draft | AI writing help built for teachers",
    description:
      "Draft calm parent emails and report comments faster - join early access to help shape the private beta experience.",
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
    title: "Zaza Draft | Teacher-first AI writing support",
    description:
      "Calm parent messages and report comments with teacher-first AI - join early access to shape the beta.",
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
              "Zaza Technologies builds teacher-first AI to calm Sunday night admin and invites early access partners to shape the private beta.",
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
              "Hallucination-safe AI writing assistant for teachers. Calm parent emails and report comments faster - join early access to shape the private beta.",
            featureList: [
              "Hallucination prevention",
              "School-appropriate tone guardrails",
              "One-click translation to 50+ languages",
              "GDPR-compliant data handling",
              "Privacy-focused design",
              "Save 10+ hours weekly",
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
