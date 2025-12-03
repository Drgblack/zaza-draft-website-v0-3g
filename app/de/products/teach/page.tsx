"use client"

import TeachClient from "@/app/products/teach/teach-client"
import { SetLanguage } from "@/components/set-language"

export default function TeachDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <TeachClient />
    </>
  )
}
