import type { Metadata } from "next";
import EarlyAccessClient from "@/app/early-access/early-access-client";

const canonicalUrl = "https://zazadraft.com/de/early-access";

export const metadata: Metadata = {
  title: "Zaza Draft Early Access | Lehrerzentrierte Beta",
  description:
    "Tritt dem Zaza Draft Early-Access-Programm bei, teste geführte Entwürfe, Tonoptionen und Insights und gestalte die private Beta mit.",
  openGraph: {
    title: "Zaza Draft Early Access | Lehrerzentrierte Beta",
    description:
      "Hilf mit, Tonleitplanken, geführte Modi und Fortschrittsmetriken für Zaza Draft zu formen, bevor wir für alle starten.",
    url: canonicalUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [
      {
        url: "/images/draft-interface.png",
        alt: "Zaza Draft geführte Schreiboberfläche",
      },
      {
        url: "/images/insights-dashboard.png",
        alt: "Zaza Draft Insights-Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Early Access für Zaza Draft",
    description:
      "Jetzt Beta-Partner: Gestalte geführte Entwürfe, Tonoptionen und Insights für Lehrkräfte mit.",
    images: ["/images/draft-interface.png"],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      de: canonicalUrl,
      en: "https://zazadraft.com/early-access",
    },
  },
};

export default function EarlyAccessPage() {
  return <EarlyAccessClient />;
}
