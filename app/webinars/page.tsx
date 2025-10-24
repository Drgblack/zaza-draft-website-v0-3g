import type { Metadata } from "next"
import { cookies, headers } from "next/headers"
import WebinarsClient from "./webinars-client"
import { BreadcrumbSchema } from "@/lib/seo/schema"
import Script from "next/script"

export async function generateMetadata(): Promise<Metadata> {
  const langCookie = cookies().get("language")?.value
  const referer = headers().get("referer") || ""
  const hrefHint = headers().get("x-pathname") || ""
  const path = hrefHint || referer
  const locale = langCookie === "de" || path.includes("/de/") || path.endsWith("/de") ? "de" : "en"

  const titles = {
    en: "Professional Development Webinars | Zaza Draft",
    de: "Fortbildungs-Webinare | Zaza Draft"
}
  const descriptions = {
    en: "Join live webinars and watch on-demand professional development sessions on AI in education.",
    de: "Nehmen Sie an Live-Webinaren teil und sehen Sie Fortbildungssitzungen zu KI in der Bildung auf Abruf."
}

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: "https://zazadraft.com/webinars",
      languages: {
        en: "https://zazadraft.com/webinars",
        de: "https://zazadraft.com/de/webinars"
}
},
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website"
},
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale]
}
}
}

export default function WebinarsPage() {
  return (
    <>
      <Script id="webinar-series-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Zaza Draft Webinar Series",
          description: "Professional development webinars for teachers on AI in education",
          url: "https://zazadraft.com/webinars",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
}
})}
      </Script>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zazadraft.com" },
          { name: "Webinars", url: "https://zazadraft.com/webinars" },
        ]}
      />
      <WebinarsClient />
    </>
  )
}
import type { Metadata } from "next"


}
}
