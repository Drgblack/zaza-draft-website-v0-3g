import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import BestAIToolParentEmailsClient from "./best-ai-tool-parent-emails-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Best AI Tool for Parent Emails for Teachers in 2026 | Zaza Draft",
  description:
    "Compare the best AI tool for parent emails for teachers. See why Zaza Draft is built for calmer tone, difficult parent communication, and school-safe professional wording.",
  path: "/best-ai-tool-parent-emails",
  type: "article",
  alternates: {
    en: "https://zazadraft.com/best-ai-tool-parent-emails",
  },
  keywords: [
    "best AI tool for parent emails",
    "AI parent email generator for teachers",
    "teacher parent communication software",
  ],
});

export default function BestAIToolPage() {
  return <BestAIToolParentEmailsClient />;
}
