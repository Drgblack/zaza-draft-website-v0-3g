import type { Metadata } from "next"
import ReduceStressClient from "@/app/reduce-stress-parent-messages/reduce-stress-client"

const pageUrl = "https://zazadraft.com/de/reduce-stress-parent-messages"

export const metadata: Metadata = {
  title: "Weniger Stress mit Elternnachrichten | Zaza Draft",
  description:
    "Entdecken Sie, wie Zaza Draft Lehrkräften hilft, Elternnachrichten schneller, klarer und stressärmer zu schreiben - auf Englisch oder Deutsch.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: "https://zazadraft.com/reduce-stress-parent-messages",
      de: pageUrl,
    },
  },
  openGraph: {
    title: "Weniger Stress mit Elternnachrichten | Zaza Draft",
    description:
      "Entdecken Sie, wie Zaza Draft Lehrkräften hilft, Elternnachrichten schneller, klarer und stressärmer zu schreiben.",
    url: pageUrl,
    type: "article",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [
      {
        url: "https://zazadraft.com/og-reduce-stress.jpg",
        width: 1200,
        height: 630,
        alt: "Lehrkraft schreibt eine Nachricht mit Zaza Draft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weniger Stress mit Elternnachrichten | Zaza Draft",
    description:
      "Entdecken Sie, wie Zaza Draft Lehrkräften hilft, Elternnachrichten schneller, klarer und stressärmer zu schreiben.",
    images: ["https://zazadraft.com/og-reduce-stress.jpg"],
  },
}

export default function ReduceStressPage() {
  return <ReduceStressClient />
}
