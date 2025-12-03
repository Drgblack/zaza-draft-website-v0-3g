"use client"

import { HomePageClient } from "@/app/home-client"
import { SetLanguage } from "@/components/set-language"

export default function HomeDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <HomePageClient />
    </>
  )
}
