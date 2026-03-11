import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import PricingClient from "./PricingClient";

const ogImage = "/professional-female-teacher-in-modern-classroom.jpg";

export const metadata: Metadata = buildPageMetadata({
  title: "Teacher AI Writing Pricing - Parent Emails and Reports | Zaza Draft",
  description:
    "See Zaza Draft pricing for teacher-first AI writing support. Start free, then upgrade for calmer parent emails, report comments, and professional school communication.",
  path: "/pricing",
  image: ogImage,
  alternates: {
    en: "https://zazadraft.com/pricing",
    de: "https://zazadraft.com/de/pricing",
  },
  keywords: [
    "teacher AI pricing",
    "AI parent email generator pricing",
    "teacher writing assistant pricing",
  ],
});

export default function PricingPage() {
  return <PricingClient />;
}
