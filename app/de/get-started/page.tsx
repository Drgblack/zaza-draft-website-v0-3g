import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import GetStartedClient from "@/app/get-started/get-started-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Kostenlos starten | Zaza Draft",
  description:
    "Erstelle dein kostenloses Zaza Draft Konto fuer ruhigere, professionellere Schulkommunikation mit lehrkraft-zentrierter Unterstuetzung.",
  path: "/de/get-started",
  image: "/images/draft-interface.png",
  alternates: {
    de: "https://zazadraft.com/de/get-started",
    en: "https://zazadraft.com/get-started",
  },
  keywords: [
    "kostenlos starten zaza draft",
    "ki schreibhilfe lehrkraefte kostenlos",
    "zaza draft konto erstellen",
  ],
});

export default function GermanGetStartedPage() {
  return <GetStartedClient />;
}
