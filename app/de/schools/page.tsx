import type { Metadata } from "next";

import { SchoolsLandingPage } from "@/components/schools/schools-landing-page";
import { schoolsDeContent } from "@/components/schools/content";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Zaza für Schulen | Unterstützung für anspruchsvolle Elternkommunikation",
  description:
    "Zaza für Schulen hilft Schulleitungen, Mitarbeitende bei ruhigerer, klarerer und professionellerer Elternkommunikation zu unterstützen, bevor schwierige Nachrichten zu Beschwerden, Eskalation oder unnötiger Belastung werden.",
  path: "/de/schools",
  image: schoolsDeContent.heroImage,
  alternates: {
    en: "https://zazadraft.com/schools",
    de: "https://zazadraft.com/de/schools",
  },
  keywords: [
    "Schulkommunikation Unterstützung",
    "Elternmail Eskalationsrisiko Schule",
    "Schulleitung Kommunikationsworkflow",
    "anspruchsvolle Elternkommunikation",
    "Zaza für Schulen",
  ],
});

export default function DeSchoolsPage() {
  return <SchoolsLandingPage content={schoolsDeContent} />;
}
