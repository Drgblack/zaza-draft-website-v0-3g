import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { FAQPageClient } from "./faq-client";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Teacher AI Writing FAQ - Safety, Privacy, and Parent Emails | Zaza Draft",
  description:
    "Get clear answers about Zaza Draft, teacher-first AI writing, privacy, GDPR-ready workflows, parent emails, report comments, pricing, and school-safe use.",
  path: "/faq",
  alternates: {
    en: "https://zazadraft.com/faq",
    de: "https://zazadraft.com/de/faq",
  },
  keywords: [
    "teacher AI FAQ",
    "AI parent email safety",
    "GDPR-ready teacher AI",
    "teacher report writing software FAQ",
  ],
});

export default function FAQPage() {
  return <FAQPageClient />;
}
