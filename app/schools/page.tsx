import type { Metadata } from "next";

import { SchoolsLandingPage } from "@/components/schools/schools-landing-page";
import { schoolsEnContent } from "@/components/schools/content";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Zaza for Schools | Safer High-Stakes Parent Communication Support for Staff",
  description:
    "Zaza for Schools helps school leaders support staff with calmer, clearer, more professional parent communication before difficult emails turn into complaints, escalation, or unnecessary workload.",
  path: "/schools",
  image: schoolsEnContent.heroImage,
  alternates: {
    en: "https://zazadraft.com/schools",
    de: "https://zazadraft.com/de/schools",
  },
  keywords: [
    "school communication support",
    "parent email risk reduction for schools",
    "school leadership communication workflow",
    "staff parent communication system",
    "high-stakes parent communication",
  ],
});

export default function SchoolsPage() {
  return <SchoolsLandingPage content={schoolsEnContent} />;
}
