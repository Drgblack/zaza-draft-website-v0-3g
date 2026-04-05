import type { Metadata } from "next";
import { SetLanguage } from "@/components/set-language";
import ParentEmailRiskCheckerClient from "@/app/parent-email-risk-checker/parent-email-risk-checker-client";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Elternmail-Risiko-Check fuer Lehrkraefte | Zaza Draft",
  description:
    "Fuege den Entwurf einer Elternmail ein und pruefe das Tonrisiko, bevor du sie sendest. Du bekommst einen Risiko-Score, erkannte Probleme und eine ruhigere Version fuer Lehrkraefte.",
  alternates: {
    canonical: `${siteConfig.url}/de/parent-email-risk-checker`,
    languages: {
      en: `${siteConfig.url}/parent-email-risk-checker`,
      de: `${siteConfig.url}/de/parent-email-risk-checker`,
    },
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
