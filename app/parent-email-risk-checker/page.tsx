import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { SetLanguage } from "@/components/set-language";
import {
  createHowToJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { CONTENT_FRESHNESS, toSchemaDate } from "@/lib/seo/content-freshness";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { CHECKER_COPY } from "./copy";
import ParentEmailRiskCheckerClient from "./parent-email-risk-checker-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Parent Email Risk Checker for Teachers | Zaza Draft",
  description:
    "Paste a draft parent email and check the tone risk before you send it. Get a risk score, flagged issues, and a calmer rewritten version built for teachers.",
  path: "/parent-email-risk-checker",
  type: "website",
  keywords: [
    "parent email risk checker",
    "teacher tone checker",
    "check parent email before sending",
  ],
  alternates: {
    en: "https://zazadraft.com/parent-email-risk-checker",
    de: "https://zazadraft.com/de/parent-email-risk-checker",
  },
});

export default function ParentEmailRiskCheckerPage() {
  const copy = CHECKER_COPY.en;

  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "parent-email-risk-webpage-schema",
            data: createWebPageJsonLd({
              name: "Parent Email Risk Checker for Teachers",
              description:
                "Paste a draft parent email and check the tone risk before you send it. Get a risk score, flagged issues, and a calmer rewritten version built for teachers.",
              path: "/parent-email-risk-checker",
              inLanguage: "en-GB",
              potentialActionName: "Check a parent email draft",
              modifiedTime: toSchemaDate(
                CONTENT_FRESHNESS.parentEmailRiskChecker.isoDate,
              ),
            }),
          },
          {
            id: "parent-email-risk-software-schema",
            data: createSoftwareApplicationJsonLd({
              description:
                "Zaza Draft helps teachers check tone risk in parent emails, spot escalation triggers, and rewrite messages into calmer wording before sending.",
              inLanguage: "en-GB",
            }),
          },
          {
            id: "parent-email-risk-howto-schema",
            data: createHowToJsonLd({
              name: copy.howItWorksTitle,
              description: copy.introTop,
              path: "/parent-email-risk-checker",
              steps: copy.howItWorksSteps.map((step) => ({
                name: step.title,
                text: step.body,
              })),
              inLanguage: "en-GB",
            }),
          },
        ]}
      />
      <SetLanguage lang="en" />
      <ParentEmailRiskCheckerClient />
    </>
  );
}
