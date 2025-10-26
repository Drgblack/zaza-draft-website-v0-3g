import type { Metadata } from "next"
import WebinarsClient from "../../webinars/webinars-client"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Lehrer-Webinare | Zaza Draft",
  description:
    "Live-Sessions zu KI im Unterricht. Jetzt fur kommende Webinare registrieren oder Aufzeichnungen ansehen. NEEDS NATIVE REVIEW",
  openGraph: {
    title: "Lehrer-Webinare | Zaza Draft",
    description: "Experten-Webinare zur KI-Bildung mit Aufzeichnungen und Zertifikaten. NEEDS NATIVE REVIEW",
    type: "website",
  },
}

export default function WebinarsPageDE() {
  return <WebinarsClient />
}

