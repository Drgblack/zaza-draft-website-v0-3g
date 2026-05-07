import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createBreadcrumbJsonLd,
  createFAQPageJsonLd,
  createOfferJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import DraftClient from "./draft-client";

const ogImage = "/images/draft-interface.png";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Teacher Communication AI for Parent Emails, Tone, and Reports | Zaza Draft",
  description:
    "Explore Zaza Draft, the teacher-first co-writer for professional parent communication, more meaningful report comments, and school messages where tone, trust, and teacher control matter.",
  path: "/products/draft",
  image: ogImage,
  alternates: {
    en: "https://www.zazadraft.com/products/draft",
    de: "https://www.zazadraft.com/de/products/draft",
  },
  keywords: [
    "teacher-first AI co-writer",
    "AI parent email tool for teachers",
    "AI report writing for teachers",
    "teacher communication software",
  ],
});

const draftFaqItems = [
  {
    question: "What is Zaza Draft built for?",
    answer:
      "Zaza Draft is built for parent emails, report comments, behaviour updates, and other school communication where wording needs to stay calm, clear, and professionally defensible.",
  },
  {
    question: "Who is Zaza Draft for?",
    answer:
      "It is for teachers, departments, and schools that want more support than a generic AI writing tool usually gives in sensitive communication.",
  },
  {
    question: "How do you start?",
    answer:
      "Most teachers start with the free tier or the Parent Email Risk Checker, then move to a paid plan when they want regular drafting and revision support.",
  },
] as const;

export default function DraftPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "draft-product-webpage-schema",
            data: createWebPageJsonLd({
              name: "Zaza Draft Product Overview",
              description:
                "Explore Zaza Draft, the teacher-first AI writing support product for parent emails, report comments, and school communication where tone matters.",
              path: "/products/draft",
              inLanguage: "en-GB",
              potentialActionName: "Explore Zaza Draft",
            }),
          },
          {
            id: "draft-product-software-schema",
            data: createSoftwareApplicationJsonLd({
              description:
                "Zaza Draft is teacher communication AI for calmer parent emails, clearer school messages, and more meaningful report comments.",
              featureList: [
                "Teacher-first parent email drafting",
                "Risk-aware tone support before send",
                "Report comment and school writing help",
                "Teacher review and approval for every final message",
              ],
              offers: [
                createOfferJsonLd({
                  name: "Zaza Draft Starter",
                  price: 0,
                  priceCurrency: "EUR",
                  url: "/pricing",
                  description:
                    "Free starting access for teachers exploring Zaza Draft.",
                }),
                createOfferJsonLd({
                  name: "Zaza Draft Teacher",
                  price: 14.99,
                  priceCurrency: "EUR",
                  url: "/pricing",
                  description:
                    "Paid teacher plan for ongoing drafting, revisions, and tone support.",
                }),
              ],
            }),
          },
          {
            id: "draft-product-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Zaza Draft", path: "/products/draft" },
            ]),
          },
          {
            id: "draft-product-faq-schema",
            data: createFAQPageJsonLd([...draftFaqItems]),
          },
        ]}
      />
      <DraftClient />
    </>
  );
}
