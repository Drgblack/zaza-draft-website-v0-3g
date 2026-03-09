import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "England Teacher Writing Pages | Zaza Draft",
  description:
    "England-focused teacher writing pages for Ofsted-related documentation, school records, and calmer parent communication support.",
  path: "/england",
  keywords: [
    "England teacher writing pages",
    "Ofsted documentation help",
    "parent contact records England",
  ],
});

export default function EnglandLandingPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "england-landing-webpage-schema",
            data: createWebPageJsonLd({
              name: "England Teacher Writing Pages",
              description:
                "An England-focused entry page for Ofsted-related documentation, parent-contact records, and calmer school writing support.",
              path: "/england",
            }),
          },
          {
            id: "england-landing-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "England", path: "/england" },
            ]),
          },
        ]}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-28 lg:px-8">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
              England overview
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
              England teacher writing pages
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Browse England-specific pages for Ofsted-related parent-contact
              documentation and school writing that may need to stand up to
              leadership review later.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/england/how-to-document-parent-contact-for-ofsted"
                className="inline-flex items-center rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
              >
                Open England pages
              </Link>
              <Link
                href="/uk/teacher-communication-resources"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore the UK hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
