import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import ReduceStressClient from "./reduce-stress-client";

export const metadata: Metadata = buildPageMetadata({
  title: "How to Reduce Stress from Parent Messages for Teachers | Zaza Draft",
  description:
    "Practical ways to reduce stress from parent messages without ignoring families. Learn calmer routines, safer wording, and teacher-first AI support for difficult emails.",
  path: "/reduce-stress-parent-messages",
  type: "article",
  image: "/hero/teacher.jpg",
  alternates: {
    en: "https://zazadraft.com/reduce-stress-parent-messages",
    de: "https://zazadraft.com/de/reduce-stress-parent-messages",
  },
  keywords: [
    "reduce stress from parent messages",
    "teacher parent communication stress",
    "difficult parent emails",
    "teacher wellbeing parent communication",
  ],
});

export default function ReduceStressPage() {
  return <ReduceStressClient />;
}
