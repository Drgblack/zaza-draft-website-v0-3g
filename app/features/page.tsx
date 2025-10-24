import type { Metadata } from "next"
import FeaturesClient from "./FeaturesClient"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/features",
    languages: {
      en: "https://zazadraft.com/features",
      de: "https://zazadraft.com/de/features",
    },
  },
}

export default function FeaturesPage() {
  return <FeaturesClient />
}
