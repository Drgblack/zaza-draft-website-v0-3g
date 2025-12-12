import type { Metadata } from "next"

const pageUrl = "https://zazadraft.com/de/features"

export const metadata: Metadata = {
  title: "Funktionen | Zaza Draft",
  description: "Überblick über die Funktionen von Zaza Draft für Lehrkräfte.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: "https://zazadraft.com/features",
      de: pageUrl,
    },
  },
  openGraph: {
    title: "Funktionen | Zaza Draft",
    description: "Überblick über die Funktionen von Zaza Draft für Lehrkräfte.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Funktionen | Zaza Draft",
    description: "Überblick über die Funktionen von Zaza Draft für Lehrkräfte.",
  },
}
