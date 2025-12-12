import type { Metadata } from "next"

const ogImage = "/greg-blackburn-headshot.jpg"
const canonicalUrl = "https://zazadraft.com/de/about/founder"

export const metadata: Metadata = {
  title: "Gründer | Zaza Draft",
  description:
    "Lernen Sie Dr. Greg Blackburn kennen, den Lernwissenschaftler und Gründer von Zaza Draft. Zwei Jahrzehnte Erfahrung in L&D machen ihn zum Bauherrn sicherer KI-Unterstützung für Lehrkräfte.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: "https://zazadraft.com/about/founder",
      de: canonicalUrl,
    },
  },
  openGraph: {
    title: "Gründer | Zaza Draft",
    description:
      "Erfahren Sie, warum Dr. Greg Blackburn Zaza Draft gebaut hat, um Lehrkräfte mit ruhigeren, vertrauenswürdigen KI-Guardrails zu unterstützen.",
    url: canonicalUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [{ url: ogImage, alt: "Dr. Greg Blackburn, Gründer von Zaza Draft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gründer | Zaza Draft",
    description: "Learning Scientist, der lehrerzentrierte KI-Schreibhilfe baut.",
    images: [ogImage],
  },
}
