import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createFAQPageJsonLd,
  createHowToJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { CONTENT_FRESHNESS, toSchemaDate } from "@/lib/seo/content-freshness";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { funnelCopy } from "../../funnel/content";
import JessicaReedFunnel from "../../funnel/JessicaReedFunnel";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Ruhigere Eltern-E-Mails und bessere Zeugnisbemerkungen starten | Zaza Draft",
  description:
    "Starten Sie mit dem Entwurf, der noch nicht richtig klingt. Zaza Draft hilft Lehrkraeften bei Ton, Professionalitaet und aussagekraeftigeren Berichtskommentaren vor dem Senden oder Einreichen.",
  path: "/de/start",
  alternates: {
    en: "https://zazadraft.com/start",
    de: "https://zazadraft.com/de/start",
  },
});

export default function GermanStartPage() {
  const copy = funnelCopy.de;

  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "start-de-webpage-schema",
            data: createWebPageJsonLd({
              name: "Ruhigere Eltern-E-Mails und bessere Zeugnisbemerkungen starten",
              description:
                "Starten Sie mit dem Entwurf, der noch nicht richtig klingt. Zaza Draft hilft Lehrkraeften bei Ton, Professionalitaet und aussagekraeftigeren Berichtskommentaren vor dem Senden oder Einreichen.",
              path: "/de/start",
              inLanguage: "de-DE",
              potentialActionName: "Echten Entwurf pruefen",
              modifiedTime: toSchemaDate(CONTENT_FRESHNESS.start.isoDate),
            }),
          },
          {
            id: "start-de-software-schema",
            data: createSoftwareApplicationJsonLd({
              description: copy.solution.subheading,
              inLanguage: "de-DE",
            }),
          },
          {
            id: "start-de-howto-schema",
            data: createHowToJsonLd({
              name: `${copy.howItWorks.heading} ${copy.howItWorks.headingAccent}`,
              description: copy.howItWorks.subheading,
              path: "/de/start",
              steps: copy.howItWorks.steps.map((step) => ({
                name: step.title,
                text: step.body,
              })),
              inLanguage: "de-DE",
            }),
          },
          {
            id: "start-de-faq-schema",
            data: createFAQPageJsonLd(copy.faq.items),
          },
        ]}
      />
      <Suspense fallback={null}>
        <JessicaReedFunnel locale="de" />
      </Suspense>
    </>
  );
}
