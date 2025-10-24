import type { Metadata } from "next"
import { HomePageClient } from "./home-client"

export const metadata: Metadata = {
  title: "Zaza Draft – AI Lesson Planning & Grading that Saves Teachers 10+ Hours Weekly",
  description:
    "Trusted AI support for teachers. Save 10+ hours every week with hallucination-safe tools for lesson planning, grading, and parent communication.",
  keywords: [
    // English target keywords
    "AI lesson planning",
    "AI grading tool",
    "teacher productivity",
    "save time teaching",
    "Zaza Draft",
    "Zaza GradeFlow",
    "AI for teachers",
    "parent message generator",
    "report comments AI",
    "lesson planner AI",
    "automated grading",
    "teacher workload reduction",
    "hallucination-safe AI",
    "save 10 hours weekly",
    // German target keywords
    "KI Unterrichtsplanung",
    "KI Bewertungstool",
    "Lehrer Produktivität",
    "Zeit sparen Lehre",
    "KI für Lehrer",
    "Elternbriefe KI",
    "Zeugniskommentare KI",
    "halluzinationssichere KI",
    "10 Stunden pro Woche sparen",
  ],
  openGraph: {
    title: "Zaza Draft – AI Lesson Planning & Grading that Saves Teachers 10+ Hours Weekly",
    description:
      "Trusted AI support for teachers. Save 10+ hours every week with hallucination-safe tools for lesson planning, grading, and parent communication.",
    type: "website",
    locale: "en_GB",
    alternateLocale: ["de_DE"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Draft – Save Teachers 10+ Hours Weekly",
    description:
      "Trusted AI support for teachers. Save 10+ hours every week with hallucination-safe tools for lesson planning, grading, and parent communication.",
  },
  alternates: {
    canonical: "https://zazadraft.com",
    languages: {
      "en-GB": "https://zazadraft.com",
      "de-DE": "https://zazadraft.com/de",
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
            logo: "https://zazadraft.com/zaza-logo.png",
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
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/",
    languages: {
      en: "https://zazadraft.com/",
      de: "https://zazadraft.com/de",
    },
  },
}
