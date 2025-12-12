import type { Metadata } from "next"

const pageUrl = "https://zazadraft.com/de/success-stories"

export const metadata: Metadata = {
  title: "Erfolgsgeschichten | Zaza Draft",
  description:
    "Lesen Sie, wie Lehrkräfte und Schulen mit Zaza Draft Kommunikationszeit sparen und bessere Beziehungen zu Eltern pflegen.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: "https://zazadraft.com/success-stories",
      de: pageUrl,
    },
  },
  openGraph: {
    title: "Erfolgsgeschichten | Zaza Draft",
    description: "Lehrerzentrierte Berichte über Zeit- und Qualitätsgewinne mit Zaza Draft.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erfolgsgeschichten | Zaza Draft",
    description: "Lehrerzentrierte Berichte über Zeit- und Qualitätsgewinne mit Zaza Draft.",
  },
}
