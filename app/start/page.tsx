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
import { funnelCopy } from "../funnel/content";
import JessicaReedFunnel from "../funnel/JessicaReedFunnel";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Start Writing Calm Parent Emails and Better Report Comments | Zaza Draft",
  description:
    "Start with the draft that still does not sound right. Zaza Draft helps teachers improve tone, professionalism, and report-comment quality before sending or submitting.",
  path: "/start",
  alternates: {
    en: "https://zazadraft.com/start",
    de: "https://zazadraft.com/de/start",
  },
  keywords: [
    "teacher email tone support",
    "professional parent emails for teachers",
    "better report comments for teachers",
  ],
});

export default function StartPage() {
  const copy = funnelCopy.en;

  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "start-webpage-schema",
            data: createWebPageJsonLd({
              name: "Start Writing Calm Parent Emails and Better Report Comments",
              description:
                "Start with the draft that still does not sound right. Zaza Draft helps teachers improve tone, professionalism, and report-comment quality before sending or submitting.",
              path: "/start",
              inLanguage: "en-GB",
              potentialActionName: "Check a real draft",
              modifiedTime: toSchemaDate(CONTENT_FRESHNESS.start.isoDate),
            }),
          },
          {
            id: "start-software-schema",
            data: createSoftwareApplicationJsonLd({
              description: copy.solution.subheading,
              inLanguage: "en-GB",
            }),
          },
          {
            id: "start-howto-schema",
            data: createHowToJsonLd({
              name: `${copy.howItWorks.heading} ${copy.howItWorks.headingAccent}`,
              description: copy.howItWorks.subheading,
              path: "/start",
              steps: copy.howItWorks.steps.map((step) => ({
                name: step.title,
                text: step.body,
              })),
              inLanguage: "en-GB",
            }),
          },
          {
            id: "start-faq-schema",
            data: createFAQPageJsonLd(copy.faq.items),
          },
        ]}
      />
      <Suspense fallback={null}>
        <JessicaReedFunnel locale="en" />
      </Suspense>
    </>
  );
}
