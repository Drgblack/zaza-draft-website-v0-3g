import type { Metadata } from "next";
import PricingClient from "@/app/pricing/PricingClient";
import { SetLanguage } from "@/components/set-language";

const ogImage = "/professional-female-teacher-in-modern-classroom.jpg";
const pageUrl = "https://zazadraft.com/de/pricing";

export const metadata: Metadata = {
  title:
    "Preise fuer professionelle Elternkommunikation und bessere Kommentare | Zaza Draft",
  description:
    "Zaza Draft hilft Lehrkraeften, ruhige Elternmails, klarere Schulnachrichten und aussagekraeftigere Zeugnisbemerkungen mit mehr Sicherheit zu formulieren. Starte kostenlos.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-GB": "https://zazadraft.com/pricing",
      "de-DE": pageUrl,
      "x-default": "https://zazadraft.com/pricing",
    },
  },
  openGraph: {
    title:
      "Preise fuer professionelle Elternkommunikation und bessere Kommentare | Zaza Draft",
    description:
      "Nicht nur schneller formulieren - sicherer formulieren. Vergleiche die Zaza-Draft-Plaene fuer ruhigere Elternkommunikation und aussagekraeftigere Kommentare.",
    url: pageUrl,
    type: "website",
    locale: "de_DE",
    siteName: "Zaza Draft",
    images: [
      { url: ogImage, alt: "Lehrkraft prüft die Preise von Zaza Draft" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Preise fuer professionelle Elternkommunikation und bessere Kommentare | Zaza Draft",
    description:
      "Transparente Tarife für lehrerzentrierte KI-Schreibhilfe. Starte kostenlos, upgrade jederzeit.",
    images: [ogImage],
  },
};

export default function PricingDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <PricingClient />
    </>
  );
}
