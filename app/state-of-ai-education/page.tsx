import type { Metadata } from "next"
import StateOfAIClient from "./state-of-ai-client"

export const metadata: Metadata = {
  title: "State of AI in Education 2025 Report | Zaza Draft",
  description:
    "Download our comprehensive 120-page report surveying 15,000+ teachers across 50 states. Discover how educators are using AI, key challenges, and future trends in education technology.",
  openGraph: {
    title: "State of AI in Education 2025 Report | Zaza Draft",
    description: "Download our comprehensive 120-page report surveying 15,000+ teachers across 50 states.",
    type: "website",
  },
}

export default function StateOfAIPage() {
  return <StateOfAIClient />
}
