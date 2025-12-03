"use client"

import DraftClient from "@/app/products/draft/draft-client"
import { SetLanguage } from "@/components/set-language"

export default function DraftDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <DraftClient />
    </>
  )
}
