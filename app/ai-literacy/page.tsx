import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { BreadcrumbSchema, CourseSchema } from "@/lib/seo/schema";
import AILiteracyClient from "./ai-literacy-client";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Literacy for Teachers | Free Courses & Certification | Zaza Draft",
  description:
    "Master AI tools for education with free courses, certification programs, and downloadable resources. Learn prompt engineering, ethical AI use, and practical classroom applications.",
  path: "/ai-literacy",
  alternates: {
    en: "https://zazadraft.com/ai-literacy",
    de: "https://zazadraft.com/de/ai-literacy",
  },
  keywords: [
    "AI literacy for teachers",
    "AI education courses",
    "teacher AI certification",
    "prompt engineering for educators",
    "ethical AI in education",
  ],
});

export default function AILiteracyPage() {
  return (
    <>
      <CourseSchema
        name="AI Literacy for Teachers"
        description="Comprehensive AI education program with free courses, certification, and resources for teachers"
        provider="Zaza Draft"
        url="https://zazadraft.com/ai-literacy"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zazadraft.com" },
          { name: "AI Literacy", url: "https://zazadraft.com/ai-literacy" },
        ]}
      />
      <AILiteracyClient />
    </>
  );
}
