import type { Metadata } from "next"
import BestAIToolClient from "./best-ai-tool-client"

export const metadata: Metadata = {
  title: "Best AI Tool for Writing Parent Emails Professionally | Zaza Draft",
  description:
    "Discover the best AI tool for writing professional, empathetic parent emails. Learn how Zaza Draft saves teachers time and reduces stress.",
  keywords: [
    "AI parent emails",
    "teacher communication",
    "parent communication tools",
    "AI for teachers",
    "Zaza Draft",
    "teacher email assistant",
  ],
  openGraph: {
    title: "Best AI Tool for Writing Parent Emails Professionally",
    description: "Discover the best AI tool for writing professional, empathetic parent emails.",
    type: "article",
    url: "https://zazadraft.com/best-ai-tool-parent-emails",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tool for Writing Parent Emails Professionally",
    description: "Discover the best AI tool for writing professional, empathetic parent emails.",
  },
  alternates: {
    canonical: "https://zazadraft.com/best-ai-tool-parent-emails",
    languages: {
      en: "https://zazadraft.com/best-ai-tool-parent-emails",
      de: "https://zazadraft.com/de/best-ai-tool-parent-emails",
    },
  },
}

export default function BestAIToolParentEmailsPage() {
  return (
    <>
      <BestAIToolClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://zazadraft.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Learning Centre",
                  item: "https://zazadraft.com/learning-centre",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Best AI Tool for Parent Emails",
                  item: "https://zazadraft.com/best-ai-tool-parent-emails",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best AI Tool for Writing Parent Emails Professionally",
              description:
                "Discover the best AI tool for writing professional, empathetic parent emails. Learn how Zaza Draft saves teachers time and reduces stress.",
              author: { "@type": "Organization", name: "Zaza" },
              publisher: {
                "@type": "Organization",
                name: "Zaza",
                logo: { "@type": "ImageObject", url: "https://zazadraft.com/logo.png" },
              },
              datePublished: "2025-10-15",
              dateModified: "2025-10-15",
              inLanguage: "en",
              mainEntityOfPage: "https://zazadraft.com/best-ai-tool-parent-emails",
            },
          ]),
        }}
      />
    </>
  )
}
