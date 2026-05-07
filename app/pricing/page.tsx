import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import PricingClient from "./PricingClient";

const ogImage = "/professional-female-teacher-in-modern-classroom.jpg";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing for Teacher Communication AI | Zaza Draft",
  description:
    "See Zaza Draft pricing for teacher communication AI. Start free, then upgrade for calmer parent emails, better tone judgement, and more meaningful report comments.",
  path: "/pricing",
  image: ogImage,
  alternates: {
    en: "https://www.zazadraft.com/pricing",
    de: "https://www.zazadraft.com/de/pricing",
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
