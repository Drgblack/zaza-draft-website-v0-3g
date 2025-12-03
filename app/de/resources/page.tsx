import type { Metadata } from "next"
import ResourcesClient from "@/app/resources/ResourcesClient"
import { SetLanguage } from "@/components/set-language"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/de/resources",
    languages: {
      en: "https://zazadraft.com/resources",
      de: "https://zazadraft.com/de/resources",
    },
  },
}

export default function ResourcesPage() {
  return (
    <>
      <SetLanguage lang="de" />
      <ResourcesClient />
    </>
  )
}
