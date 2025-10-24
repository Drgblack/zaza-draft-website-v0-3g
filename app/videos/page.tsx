import type { Metadata } from "next"
import { cookies, headers } from "next/headers"
import { VideoHubClient } from "./video-hub-client"

export async function generateMetadata(): Promise<Metadata> {
  const langCookie = cookies().get("language")?.value
  const referer = headers().get("referer") || ""
  const hrefHint = headers().get("x-pathname") || ""
  const path = hrefHint || referer
  const locale = langCookie === "de" || path.includes("/de/") || path.endsWith("/de") ? "de" : "en"

  const titles = {
    en: "Video Tutorials and Demos | Zaza Draft",
    de: "Video-Tutorials und Demos | Zaza Draft",
  }
  const descriptions = {
    en: "Watch step-by-step tutorials and product demos to master AI-powered parent communication.",
    de: "Sehen Sie Schritt-für-Schritt-Tutorials und Produktdemos für KI-gestützte Elternkommunikation.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: "https://zazadraft.com/videos",
      languages: {
        en: "https://zazadraft.com/videos",
        de: "https://zazadraft.com/de/videos",
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
    },
  }
}

export default function VideoHubPage() {
  return <VideoHubClient />
}
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/videos",
    languages: {
      en: "https://zazadraft.com/videos",
      de: "https://zazadraft.com/de/videos",
    },
  },
}
