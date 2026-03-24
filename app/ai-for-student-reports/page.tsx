import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { AiForStudentReportsClient } from "./ai-for-student-reports-client";

export const metadata: Metadata = buildPageMetadata({
  title: "AI for Student Reports | Zaza Draft",
  description:
    "Turn classroom observations into clear, professional student reports with teacher-first AI drafting support.",
  path: "/ai-for-student-reports",
  alternates: {
    en: "https://zazadraft.com/ai-for-student-reports",
    de: "https://zazadraft.com/de/ai-for-student-reports",
  },
  keywords: [
    "AI for student reports",
    "student report writing AI",
    "teacher report writer",
    "AI report comments for teachers",
  ],
});

export default function AiForStudentReportsPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "ai-student-reports-webpage-schema",
            data: createWebPageJsonLd({
              name: "AI for Student Reports",
              description:
                "Teacher-first AI support for drafting student reports and formal school writing with professional tone control.",
              path: "/ai-for-student-reports",
              potentialActionName: "Draft student reports",
            }),
          },
          {
            id: "ai-student-reports-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "AI for Student Reports",
                path: "/ai-for-student-reports",
              },
            ]),
          },
        ]}
      />
      <AiForStudentReportsClient />
    </>
  );
}
