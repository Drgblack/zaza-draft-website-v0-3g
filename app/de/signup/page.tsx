import type { Metadata } from "next";
import SignupClient from "@/app/signup/signup-client";

const canonicalUrl = "https://zazadraft.com/de/signup";

export const metadata: Metadata = {
  title:
    "Kostenloses Zaza Draft Konto erstellen | Schreibunterstuetzung fuer Lehrkraefte",
  description:
    "Erstellen Sie Ihr kostenloses Zaza Draft Konto und erhalten Sie 10 Entwuerfe pro Monat ohne Kreditkarte. Wechseln Sie spaeter nur bei Bedarf in den Teacher Tarif.",
  openGraph: {
    title: "Kostenloses Zaza Draft Konto erstellen",
    description:
      "Starten Sie mit 10 kostenlosen Entwuerfen pro Monat. Fuer den Gratis-Tarif ist keine Kreditkarte erforderlich.",
    url: canonicalUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [
      {
        url: "/images/draft-interface.png",
        alt: "Zaza Draft gefuehrte Schreiboberflaeche",
      },
      {
        url: "/images/insights-dashboard.png",
        alt: "Zaza Draft Insights-Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kostenloses Zaza Draft Konto erstellen",
    description:
      "Starten Sie mit 10 kostenlosen Entwuerfen pro Monat. Keine Kreditkarte fuer den Gratis-Tarif erforderlich.",
    images: ["/images/draft-interface.png"],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      de: canonicalUrl,
      en: "https://zazadraft.com/signup",
    },
  },
};

export default function SignupPage() {
  return <SignupClient />;
}
