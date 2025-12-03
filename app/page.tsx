import type { Metadata } from "next"
import { HomePageClient } from "./home-client"

const siteUrl = "https://zazadraft.com"
const ogImage = "/hero/teacher.jpg"

export const metadata: Metadata = {
  title: "Zaza Draft | AI writing help built for teachers, not tech hype",
  description:
    "Teacher-first AI that drafts parent messages, calm replies, and kinder feedback in minutes. Save hours every week with safety guardrails you can trust.",
  openGraph: {
    title: "Zaza Draft | AI writing help built for teachers",
    description:
      "Draft parent emails, de-escalate tough replies, and write kinder feedback faster. Hallucination-safe guardrails keep your voice and credibility intact.",
    type: "website",
    locale: "en_GB",
    alternateLocale: ["de_DE"],
    url: siteUrl,
    images: [{ url: ogImage, alt: "Teacher using Zaza Draft to write a parent message" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Draft | Teacher-first AI writing support",
    description:
      "Save time on parent messages and feedback with explainable AI guardrails made for teachers.",
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-GB": siteUrl,
      "de-DE": `${siteUrl}/de`,
    },
  },
}

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
              "Zaza Technologies builds hallucination-safe AI tools for teachers, including Zaza Draft, Zaza Teach, and GradeFlow. Save 10+ hours weekly with trusted AI support.",
            founder: {
              "@type": "Person",
              name: "Dr. Greg Blackburn",
              jobTitle: "Founder & CEO",
              description:
                "PhD in Professional Education from City, University of London. Over 20 years experience in Learning & Development and educational technology.",
            },
            sameAs: [
              "https://www.linkedin.com/company/zaza-technologies",
              "https://twitter.com/zazatech",
              "https://www.tiktok.com/@zazatech",
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
              "Hallucination-safe AI writing assistant for teachers. Save 10+ hours weekly generating professional parent emails, report comments, and student messages with built-in safety features and school-appropriate tone guardrails.",
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
  )
}
