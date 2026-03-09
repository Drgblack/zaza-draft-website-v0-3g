import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Support for Teacher AI Writing Accounts and Billing | Zaza Draft",
  description:
    "Contact Zaza Draft for help with onboarding, billing, privacy questions, or teacher account support for parent communication and report writing workflows.",
  path: "/support",
  alternates: {
    en: "https://zazadraft.com/support",
    de: "https://zazadraft.com/de/support",
  },
  keywords: [
    "teacher AI support",
    "Zaza Draft support",
    "AI parent email tool support",
  ],
});
