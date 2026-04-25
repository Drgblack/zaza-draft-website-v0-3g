import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { SetLanguage } from "@/components/set-language";
import {
  createHowToJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import ParentEmailRiskCheckerClient from "@/app/parent-email-risk-checker/parent-email-risk-checker-client";
import { CHECKER_COPY } from "@/app/parent-email-risk-checker/copy";
import { CONTENT_FRESHNESS, toSchemaDate } from "@/lib/seo/content-freshness";
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
  const copy = CHECKER_COPY.de;

  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "parent-email-risk-de-webpage-schema",
            data: createWebPageJsonLd({
              name: "Elternmail-Risiko-Check fuer Lehrkraefte",
              description:
                "Fuege den Entwurf einer Elternmail ein und pruefe das Tonrisiko, bevor du sie sendest. Du bekommst einen Risiko-Score, erkannte Probleme und eine ruhigere Version fuer Lehrkraefte.",
              path: "/de/parent-email-risk-checker",
              inLanguage: "de-DE",
              potentialActionName: "Eine Elternmail pruefen",
              modifiedTime: toSchemaDate(
                CONTENT_FRESHNESS.parentEmailRiskChecker.isoDate,
              ),
            }),
          },
          {
            id: "parent-email-risk-de-software-schema",
            data: createSoftwareApplicationJsonLd({
              description:
                "Zaza Draft hilft Lehrkraeften, Tonrisiken in Elternmails zu erkennen, Eskalationssignale zu pruefen und vor dem Senden ruhigere Formulierungen zu erstellen.",
              inLanguage: "de-DE",
            }),
          },
          {
            id: "parent-email-risk-de-howto-schema",
            data: createHowToJsonLd({
              name: copy.howItWorksTitle,
              description: copy.introTop,
              path: "/de/parent-email-risk-checker",
              steps: copy.howItWorksSteps.map((step) => ({
                name: step.title,
                text: step.body,
              })),
              inLanguage: "de-DE",
            }),
          },
        ]}
      />
      <SetLanguage lang="de" />
      <ParentEmailRiskCheckerClient locale="de" />
    </>
  );
}
