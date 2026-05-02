import type { Metadata } from "next";
import EarlyAccessClient from "@/app/early-access/early-access-client";

const canonicalUrl = "https://zazadraft.com/de/early-access";

export const metadata: Metadata = {
  title: "Zaza Draft Warteliste | Lehrerzentrierte KI-Schreibhilfe",
  description:
    "Trag dich in die Zaza Draft Warteliste ein und erfahre, sobald der Zugang fuer Lehrkraefte geoeffnet wird. Erhalte Produktupdates und Launch-News.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Zaza Draft Warteliste",
    description:
      "Erfahre als Erste oder Erster, wenn Zaza Draft fuer Lehrkraefte geoeffnet wird. Warteliste fuer Updates, Launch-News und fruehen Zugang.",
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
    title: "Zaza Draft Warteliste",
    description:
      "Trag dich in die Warteliste ein und erhalte Produktupdates, Launch-News und fruehen Zugang.",
    images: ["/images/draft-interface.png"],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-GB": "https://zazadraft.com/early-access",
      "de-DE": canonicalUrl,
      "x-default": "https://zazadraft.com/early-access",
    },
  },
};

export default function EarlyAccessPage() {
  return <EarlyAccessClient />;
}
