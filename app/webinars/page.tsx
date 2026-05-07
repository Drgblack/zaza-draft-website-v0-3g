import type { Metadata } from "next";
import WebinarsClient from "./webinars-client";
import { BreadcrumbSchema } from "@/lib/seo/schema";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Professional Development Webinars | Zaza Draft";
  const description =
    "Join live webinars and watch on-demand professional development sessions on AI in education.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://www.zazadraft.com/webinars",
      languages: {
        "en-GB": "https://www.zazadraft.com/webinars",
        "de-DE": "https://www.zazadraft.com/de/webinars",
        "x-default": "https://www.zazadraft.com/webinars",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function WebinarsPage() {
  return (
    <>
      <Script id="webinar-series-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Zaza Draft Webinar Series",
          description:
            "Professional development webinars for teachers on AI in education",
          url: "https://www.zazadraft.com/webinars",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        })}
      </Script>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.zazadraft.com" },
          { name: "Webinars", url: "https://www.zazadraft.com/webinars" },
        ]}
      />
      <WebinarsClient />
    </>
  );
}
