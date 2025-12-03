"use client"

import SupportPage from "@/app/support/page"
import { SetLanguage } from "@/components/set-language"

export default function SupportDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <SupportPage />
    </>
  )
}
