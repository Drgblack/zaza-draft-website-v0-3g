"use client"

import PricingClient from "@/app/pricing/PricingClient"
import { SetLanguage } from "@/components/set-language"

export default function PricingDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <PricingClient />
    </>
  )
}
