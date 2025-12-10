import type { Metadata } from "next";
import GlossaryClient from "@/app/glossary/glossary-client";
import { BreadcrumbSchema } from "@/lib/seo/schema";
import Script from "next/script";

export const metadata: Metadata = {
  title: "AI Glossary for Teachers | Zaza Draft",
  description:
    "Comprehensive AI terminology glossary with 150+ terms explained in teacher-friendly language. Search by category or alphabetically to understand AI concepts for education.",
  openGraph: {
    title: "AI Glossary for Teachers | Zaza Draft",
    description:
      "150+ AI terms explained for educators with practical examples",
    type: "website",
  },
};

export default function GlossaryPage() {
  return (
    <>
      <Script id="glossary-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "AI Glossary for Teachers",
          description:
            "150+ AI terms explained in teacher-friendly language with practical examples",
          url: "https://zazadraft.com/glossary",
          inDefinedTermSet: "https://zazadraft.com/glossary",
        })}
      </Script>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zazadraft.com" },
          { name: "AI Glossary", url: "https://zazadraft.com/glossary" },
        ]}
      />
      <GlossaryClient />
    </>
  );
}
// import type { Metadata } from "next";

