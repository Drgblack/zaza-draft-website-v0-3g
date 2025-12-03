"use client"

import ShieldClient from "@/app/products/shield/shield-client"
import { SetLanguage } from "@/components/set-language"

export default function ShieldDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <ShieldClient />
    </>
  )
}
