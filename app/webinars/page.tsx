import type { Metadata } from "next"
import WebinarsClient from "./webinars-client"

export const metadata: Metadata = {`n  alternates: { languages: { en: "https://zazadraft.com/webinars", de: "https://zazadraft.com/de/webinars" } },
  title: "Live Webinars for Teachers | Zaza Draft",
  description: "Join expert-led sessions on AI in education. Register for upcoming webinars and watch recordings on-demand.",
  openGraph: {
    title: "Teacher Webinars | Zaza Draft",
    description: "Expert-led AI education webinars with recordings and certificates.",
    type: "website",
  },
}

export default function WebinarsPage() {
  return <WebinarsClient />
}
