import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createHowToJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { HomePageClient } from "./home-client";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Teacher-First Support for Parent Emails, Tone, and Meaningful Reports | Zaza Draft",
  description:
    "Zaza Draft helps teachers draft calm parent emails, more meaningful report comments, and clear school messages before tone, wording, or timing turn a situation into something bigger.",
  path: "/",
  alternates: {
    en: "https://zazadraft.com",
    de: "https://zazadraft.com/de",
  },
  keywords: [
    "AI parent email help for teachers",
    "teacher email tone",
    "high-stakes school communication",
    "teacher communication safety",
    "parent communication AI",
    "teacher co-writer",
    "meaningful report comments",
    "defensible school wording",
  ],
});

const homeHowToSteps = [
  {
    name: "Paste your draft or describe what you need",
    text: "Start with rough notes, bullet points, or a full draft",
  },
  {
    name: "Choose your tone and let Draft pressure-test the wording",
    text: "Reduce tone risk and keep the message calm, clear, and editable",
  },
  {
    name: "Review before sending",
    text: "You keep control of every word before anything leaves your inbox",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "home-webpage-schema",
            data: createWebPageJsonLd({
              name: "Zaza Draft Home",
              description:
                "Zaza Draft helps teachers draft calm parent emails, clearer school messages, and more meaningful report comments before tone, wording, or timing turn a situation into something bigger.",
              path: "/",
              inLanguage: "en-GB",
              potentialActionName: "Start with Zaza Draft",
            }),
          },
          {
            id: "home-software-schema",
            data: createSoftwareApplicationJsonLd({
              description:
                "Zaza Draft is a teacher-first communication safety layer for parent emails, complaint replies, behaviour updates, documentation, and report comments. It helps teachers shape messages where tone, trust, value, and interpretation matter before anything is sent.",
              inLanguage: "en-GB",
            }),
          },
          {
            id: "home-howto-schema",
            data: createHowToJsonLd({
              name: "How Draft restores clarity",
              description:
                "A three-step workflow for turning rough school communication into calmer, clearer wording before sending.",
              path: "/",
              steps: [...homeHowToSteps],
              inLanguage: "en-GB",
            }),
          },
        ]}
      />
      <HomePageClient />
    </>
  );
}
