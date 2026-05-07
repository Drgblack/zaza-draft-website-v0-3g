import type { Metadata } from "next";

const pageUrl = "https://www.zazadraft.com/de/support";

export const metadata: Metadata = {
  title: "Support | Zaza Draft",
  description:
    "Kontaktieren Sie Zaza Draft für Hilfe bei Onboarding, Berichten, Abrechnung oder Kontofragen.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-GB": "https://www.zazadraft.com/support",
      "de-DE": pageUrl,
      "x-default": "https://www.zazadraft.com/support",
    },
  },
  openGraph: {
    title: "Support | Zaza Draft",
    description:
      "Kontaktieren Sie Zaza Draft für Hilfe bei Onboarding, Berichten, Abrechnung oder Kontofragen.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support | Zaza Draft",
    description:
      "Kontaktieren Sie Zaza Draft für Hilfe bei Onboarding, Berichten, Abrechnung oder Kontofragen.",
  },
};
