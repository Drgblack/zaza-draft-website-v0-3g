import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createFAQPageJsonLd,
  createHowToJsonLd,
  createOfferJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { HomePageClient } from "./home-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Parent Email Risk Checker for Teachers | Zaza Draft",
  description:
    "Late-night parent email doubts? Use Zaza Draft's free Parent Email Risk Checker to calm tone, reduce risk, and send clearer replies with confidence.",
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

const homeFaqItems = [
  {
    question: "What is the Parent Email Risk Checker?",
    answer:
      "It is a free tool that checks a parent email draft for tone risk, escalation signals, and wording that could be misread, then suggests a calmer and more professional version.",
  },
  {
    question: "Is Zaza Draft just another ChatGPT wrapper?",
    answer:
      "No. It is a teacher-first AI shield built specifically for school communication, including parent emails, behaviour notes, report comments, and difficult conversations.",
  },
  {
    question: "Do I have to pay to use the Risk Checker?",
    answer: "No. The basic Parent Email Risk Checker is free to use.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Zaza Draft is privacy-first and GDPR-aware, and it does not train on your emails.",
  },
  {
    question: "Can schools or departments buy this?",
    answer:
      "Yes. Schools and teams can use Zaza Draft through the schools offering, with bulk licensing and admin features.",
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
                "Zaza Draft is a parent email risk checker and AI shield for teachers. It helps with parent emails, behaviour notes, report comments, and other school messages where tone and interpretation matter before anything is sent.",
              featureList: [
                "Free Parent Email Risk Checker",
                "AI shield for parent emails",
                "Teacher-first communication support",
                "Support for behaviour notes and report comments",
                "Review before sending",
              ],
              offers: createOfferJsonLd({
                name: "Free Parent Email Risk Checker",
                price: 0,
                priceCurrency: "EUR",
                url: "/parent-email-risk-checker",
                description:
                  "Free access to the Parent Email Risk Checker for teachers.",
              }),
              inLanguage: "en-GB",
            }),
          },
          {
            id: "home-faq-schema",
            data: createFAQPageJsonLd([...homeFaqItems]),
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
