import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createBreadcrumbJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { ROICalculatorClient } from "./roi-calculator-client";

const title =
  "Teacher ROI Calculator for Reports and Parent Emails | Zaza Draft";
const description =
  "Use the Zaza Draft ROI calculator to estimate hours and staff-cost value saved on report comments and parent emails. Calm planning support for schools and teachers.";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/roi-calculator",
  keywords: [
    "teacher ROI calculator",
    "report writing time saved calculator",
    "parent email time saved calculator",
    "teacher workload calculator",
    "AI report comments ROI",
  ],
});

export default function ROICalculatorPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "roi-calculator-webpage-schema",
            data: createWebPageJsonLd({
              name: title,
              description,
              path: "/roi-calculator",
              keywords: [
                "teacher ROI calculator",
                "teacher workload planning",
                "report comments",
                "parent communication",
                "Zaza Draft",
              ],
              potentialActionName:
                "Calculate teacher time saved on report comments and parent emails",
            }),
          },
          {
            id: "roi-calculator-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "ROI Calculator", path: "/roi-calculator" },
            ]),
          },
          {
            id: "roi-calculator-software-schema",
            data: createSoftwareApplicationJsonLd({
              path: "/roi-calculator",
              description:
                "Zaza Draft is a teacher-first AI co-writer for parent emails, report comments, and school writing. This ROI calculator helps schools estimate time and staff-cost value saved with a calmer drafting workflow.",
            }),
          },
        ]}
      />
      <ROICalculatorClient />
    </>
  );
}
