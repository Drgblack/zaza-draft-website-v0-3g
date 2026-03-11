import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import BestAIWritingClient from "./best-ai-writing-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Best AI Writing Tools for Teachers in 2026 | Zaza Draft",
  description:
    "A teacher-first comparison of the best AI writing tools for teachers, with a focus on parent communication, report comments, writing quality, and professional tone.",
  path: "/best-ai-writing-tools-for-teachers-2025",
  type: "article",
  alternates: {
    en: "https://zazadraft.com/best-ai-writing-tools-for-teachers-2025",
  },
  keywords: [
    "best AI writing tools for teachers",
    "teacher writing software comparison",
    "AI report writing tools for teachers",
  ],
});

export default function Page() {
  return <BestAIWritingClient />;
}
