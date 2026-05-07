import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo/site-metadata";
import StateOfAIClient from "./state-of-ai-client";

export const metadata: Metadata = buildPageMetadata({
  title: "AI in Education Resource Hub | Zaza Draft",
  description:
    "Explore Zaza Draft's current thinking on AI in education, responsible teacher communication workflows, and future resource updates for schools and educators.",
  path: "/state-of-ai-education",
  keywords: [
    "ai in education resource hub",
    "teacher ai guidance",
    "responsible ai in schools",
    "school communication ai",
  ],
  alternates: {
    en: "https://www.zazadraft.com/state-of-ai-education",
    de: "https://www.zazadraft.com/de/state-of-ai-education",
  },
});

export default function StateOfAIPage() {
  return <StateOfAIClient />;
}
