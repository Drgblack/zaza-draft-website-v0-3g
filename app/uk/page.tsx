import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "UK Teacher Writing Help | Zaza Draft",
  description:
    "UK-focused teacher writing help for parents' evening emails, Ofsted-friendly report comments, behaviour letters home, and calmer parent communication.",
  path: "/uk",
  keywords: [
    "UK teacher writing help",
    "British school parent communication",
    "parents' evening email templates UK",
    "Ofsted-friendly report comments",
  ],
});

export default function UkLandingPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "uk-landing-webpage-schema",
            data: createWebPageJsonLd({
              name: "UK Teacher Writing Help",
              description:
                "A UK-focused entry page for teacher communication resources, Ofsted-friendly report comments, parents' evening templates, and safer AI drafting.",
              path: "/uk",
            }),
          },
          {
            id: "uk-landing-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "UK", path: "/uk" },
            ]),
          },
        ]}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-28 lg:px-8">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
              UK overview
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
              UK teacher writing help
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Explore the UK cluster for parents&apos; evening emails,
              Ofsted-friendly report comments, behaviour letters home, safer AI
              workflows, and calmer school writing support.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/uk/teacher-communication-resources"
                className="inline-flex items-center rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
              >
                Open the UK resources hub
              </Link>
              <Link
                href="/england"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View England pages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
