import type { Metadata } from "next"
import { ROICalculatorClient } from "./roi-calculator-client"

export const metadata: Metadata = {
  title: "ROI Calculator | Zaza Draft",
  description: "Calculate how much time and money your school or district can save with Zaza Draft's AI tools.",
  openGraph: {
    title: "ROI Calculator | Zaza Draft",
    description: "See the impact of AI efficiency on your school's budget and teacher well-being.",
  },
}

export default function ROICalculatorPage() {
  return <ROICalculatorClient />
}
