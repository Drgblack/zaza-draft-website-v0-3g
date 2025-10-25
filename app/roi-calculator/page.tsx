import type { Metadata } from "next"
import { ROICalculatorClient } from "./roi-calculator-client"

export const metadata: Metadata = {
  title: "ROI Calculator: Calculate Teacher Time Savings | Zaza Draft",
  description:
    "Calculate exactly how many hours and dollars Zaza Draft saves teachers and schools. Free interactive calculator based on real teacher data.",
  openGraph: {
    title: "ROI Calculator | Zaza Draft",
    description: "Calculate your time and cost savings with Zaza Draft",
    type: "website",
  },
}

export default function ROICalculatorPage() {
  return <ROICalculatorClient />
}
import type { Metadata } from "next"

export const metadata_disabled_1: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/roi-calculator",
    languages: {
      en: "https://zazadraft.com/roi-calculator",
      de: "https://zazadraft.com/de/roi-calculator",
    },
  },
}
