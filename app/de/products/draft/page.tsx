import type { Metadata } from "next";
import DraftClient from "@/app/products/draft/draft-client";
import { SetLanguage } from "@/components/set-language";

const ogImage = "/shared-teacher-desk-hero.jpg";
const canonicalUrl = "https://zazadraft.com/de/products/draft";

export const metadata: Metadata = {
  title:
    "Zaza Draft | Ruhigere Elternmails und aussagekraeftigere Zeugnisbemerkungen",
  description:
    "Zaza Draft hilft Lehrkraeften, ruhige Elternmails, klarere Schulnachrichten und aussagekraeftigere Zeugnisbemerkungen mit mehr Sicherheit zu formulieren - nicht nur schneller.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: "https://zazadraft.com/products/draft",
      de: canonicalUrl,
    },
  },
  openGraph: {
    title:
      "Zaza Draft | Ruhigere Elternmails und aussagekraeftigere Zeugnisbemerkungen",
    description:
      "Professionell muss nicht kuehl klingen. Zaza Draft hilft Lehrkraeften bei Ton, Klarheit und Aussagekraft in sensibler Schulkommunikation.",
    url: canonicalUrl,
    type: "website",
    locale: "de_DE",
    siteName: "Zaza Draft",
    images: [
      {
        url: ogImage,
        alt: "Lehrkraft verfasst eine Elternmail mit Zaza Draft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Zaza Draft | Ruhigere Elternmails und aussagekraeftigere Zeugnisbemerkungen",
    description:
      "Nicht nur schneller formulieren - sicherer formulieren. Fuer Elternkommunikation, Zeugnisbemerkungen und andere sensible Schultexte.",
    images: [ogImage],
  },
};

export default function DraftDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <DraftClient />
    </>
  );
}
