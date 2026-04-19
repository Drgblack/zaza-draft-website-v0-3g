import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { HomePageClient } from "@/app/home-client";
import { SetLanguage } from "@/components/set-language";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Professionelle Elternkommunikation und aussagekraeftigere Berichte | Zaza Draft",
  description:
    "Zaza Draft hilft Lehrkraeften, ruhigere Elternmails, klarere Schulnachrichten und aussagekraeftigere Berichtskommentare zu formulieren - mit mehr Sicherheit vor dem Senden.",
  path: "/de",
  alternates: {
    en: "https://zazadraft.com",
    de: "https://zazadraft.com/de",
  },
  keywords: [
    "professionelle Elternkommunikation Schule",
    "E-Mail-Ton Lehrkraefte",
    "bessere Zeugnisbemerkungen",
    "ruhigere Elternmails",
  ],
});

export default function HomeDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <HomePageClient />
    </>
  );
}
