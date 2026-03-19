import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { createArticleJsonLd, createBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { freeResourceIdeas } from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Free Teacher Writing Resources - Parent Emails and Reports | Zaza Draft",
  description:
    "Download free teacher writing resources, including calm parent email templates, report comment phrase banks, and practical school communication guides.",
  path: "/free-resources",
  type: "article",
  keywords: [
    "free teacher writing resources",
    "parent email templates for teachers",
    "report comment phrase bank",
  ],
});

export default function FreeResourcesPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "free-resources-article-schema",
            data: createArticleJsonLd({
              headline: "Free teacher writing resources",
              description:
                "Downloadable parent email templates, report phrase banks, and teacher communication resources from Zaza Draft.",
              path: "/free-resources",
            }),
          },
          {
            id: "free-resources-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free resources", path: "/free-resources" },
            ]),
          },
        ]}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.12),_transparent_28%),radial-gradient(circle_at_right,_rgba(148,163,184,0.1),_transparent_34%)]">
          <div className="mx-auto max-w-5xl px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
            <div className="max-w-4xl space-y-6">
              <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
                Free resources
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Free teacher writing resources
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                Free teacher writing resources should feel immediately useful,
                not like another task. This page collects calm parent email
                templates, report phrase banks, and short school communication
                guides that teachers can use straight away.
              </p>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-5xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="grid gap-4 md:grid-cols-2">
            {freeResourceIdeas.map((resource) => (
              <div
                key={resource.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h2 className="text-2xl font-semibold text-white">
                  {resource.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  {resource.description}
                </p>
              </div>
            ))}
          </section>

          <section className="rounded-[32px] border border-teal-200/20 bg-gradient-to-br from-teal-300/10 via-white/5 to-slate-200/10 p-8 md:p-10">
            <h2 className="text-3xl font-semibold text-white">
              Email signup form placeholder
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              Use this section for a simple gated PDF flow. Collect name and
              email, send the selected resource, and invite the teacher to try
              Zaza Draft for calmer parent communication and report writing.
            </p>
            <form className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <input
                type="text"
                placeholder="Name"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400"
              />
              <input
                type="email"
                placeholder="Email address"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400"
              />
              <button
                type="button"
                className="rounded-2xl bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950"
              >
                Get the PDF
              </button>
            </form>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/teacher-parent-communication-hub"
                className="inline-flex items-center rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Return to the hub
              </Link>
              <Link
                href="/get-started"
                className="inline-flex items-center rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
              >
                Try Zaza Draft
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
