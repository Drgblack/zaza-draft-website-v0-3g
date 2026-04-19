import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import PricingClient from "./PricingClient";

const ogImage = "/professional-female-teacher-in-modern-classroom.jpg";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Teacher Writing Pricing for Parent Emails, Tone Support, and Reports | Zaza Draft",
  description:
    "See Zaza Draft pricing for teacher-first writing support. Start free, then upgrade for calmer parent emails, better tone judgement, and more meaningful report comments.",
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
