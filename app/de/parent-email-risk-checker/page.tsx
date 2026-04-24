import type { Metadata } from "next";
import { SetLanguage } from "@/components/set-language";
import ParentEmailRiskCheckerClient from "@/app/parent-email-risk-checker/parent-email-risk-checker-client";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

const deCheckerMetadata = buildPageMetadata({
  title: "Elternmail-Risiko-Check für Lehrkräfte | Zaza Draft",
  description:
    "Füge den Entwurf einer Elternmail ein und prüfe das Tonrisiko, bevor du sie sendest. Du bekommst einen Risiko-Score, erkannte Probleme und eine ruhigere Version für Lehrkräfte.",
  path: "/de/parent-email-risk-checker",
  type: "website",
  keywords: [
    "Elternmail Risiko Check",
    "Lehrkräfte E-Mail Ton prüfen",
    "Elternmail vor dem Senden prüfen",
  ],
  alternates: {
    en: "https://zazadraft.com/parent-email-risk-checker",
    de: "https://zazadraft.com/de/parent-email-risk-checker",
  },
});

export const metadata: Metadata = {
  ...deCheckerMetadata,
  openGraph: {
    ...(deCheckerMetadata.openGraph ?? {}),
    locale: "de_DE",
  },
};

export default function ParentEmailRiskCheckerDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <ParentEmailRiskCheckerClient locale="de" />
    </>
  );
}
