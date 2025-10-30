import type { Metadata } from "next"
import PricingClient from "./PricingClient"
import { SetLanguage } from "@/components/set-language"


export const metadata: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/pricing",
    languages: {
      en: "https://zazadraft.com/pricing",
      de: "https://zazadraft.com/de/pricing",
    },
  },
}

export default function PricingPage() {
  return (
    <>
      <SetLanguage lang="de" />
      <PricingClient />
}
