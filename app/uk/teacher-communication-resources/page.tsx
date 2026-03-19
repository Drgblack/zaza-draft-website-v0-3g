import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { getRegionalTeacherWritingEntries } from "@/lib/seo/regional-writing-pages";

const ukPages = getRegionalTeacherWritingEntries("uk");
const pagesByIntent = {
  templates: ukPages.filter((page) => page.intent === "Template intent"),
  howTo: ukPages.filter((page) => page.intent === "How-to/problem intent"),
  tools: ukPages.filter((page) => page.intent === "Tool intent"),
};

export const metadata: Metadata = buildPageMetadata({
  title: "UK Teacher Communication Resources | Zaza Draft",
  description:
    "UK teacher communication resources for parents' evening, Ofsted-friendly report comments, behaviour letters home, GDPR-safe AI, and calmer school writing.",
  path: "/uk/teacher-communication-resources",
  type: "article",
  keywords: [
    "UK teacher communication resources",
    "parents' evening email templates UK",
    "Ofsted-friendly report comments",
    "behaviour letter home primary school",
    "GDPR safe AI for teachers UK",
  ],
});

const trustItems = [
  {
    title: "Trusted by UK teachers - GDPR compliant, built for British schools",
    body: "Built around British school language, parents' evening, Ofsted-friendly wording, SLT follow-up, and report comments that still need teacher review.",
  },
  {
    title: "No invented student facts",
    body: "The safest workflow stays close to teacher notes and produces calmer first drafts rather than risky guesswork.",
  },
  {
    title: "Teacher-first co-writing",
    body: "Zaza Draft supports parent communication and report writing without taking the final judgement away from the teacher.",
  },
];

export default function UkTeacherCommunicationResourcesPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "uk-teacher-communication-resources-webpage-schema",
            data: createWebPageJsonLd({
              name: "UK Teacher Communication Resources",
              description:
                "A UK-focused hub for parents' evening templates, Ofsted-friendly report comments, behaviour letters home, GDPR-safe AI, and calmer school writing.",
              path: "/uk/teacher-communication-resources",
              keywords: [
                "UK teacher communication resources",
                "British school writing help",
                "parents' evening templates",
                "Ofsted-friendly report comments",
              ],
            }),
          },
          {
            id: "uk-teacher-communication-resources-article-schema",
            data: createArticleJsonLd({
              headline: "UK Teacher Communication Resources",
              description:
                "A UK-focused cluster for parent communication, report comments, safer AI drafting, and school writing support.",
              path: "/uk/teacher-communication-resources",
            }),
          },
          {
            id: "uk-teacher-communication-resources-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "UK", path: "/uk" },
              {
                name: "Teacher Communication Resources",
                path: "/uk/teacher-communication-resources",
              },
            ]),
          },
          {
            id: "uk-teacher-communication-resources-software-schema",
            data: createSoftwareApplicationJsonLd({
              path: "/uk/teacher-communication-resources",
              description:
                "Zaza Draft is a teacher-first AI co-writer for British-school parent communication, report comments, and school writing where professional tone matters.",
            }),
          },
        ]}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.14),_transparent_28%),radial-gradient(circle_at_right,_rgba(251,191,36,0.08),_transparent_26%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
            <div className="max-w-4xl space-y-6">
              <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
                UK hub
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
                UK teacher communication resources
              </h1>
              <div className="space-y-4 text-lg leading-8 text-slate-300">
                <p>
                  UK teacher communication resources are most useful when they
                  solve the writing that quietly drains time after school:
                  parents&apos; evening follow-up, behaviour letters home,
                  Ofsted-friendly report comments, SLT notes, and calmer parent
                  emails.
                </p>
                <p>
                  This hub brings those British-school use cases together in one
                  place. Zaza Draft is not a generic AI writer. It is a
                  teacher-first co-writer for parent communication and report
                  comments where tone, caution, and professional judgement
                  matter.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
                >
                  Try Zaza Draft
                </Link>
                <Link
                  href="/products/draft"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  See how it works
                </Link>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="rounded-[28px] border border-teal-200/20 bg-teal-200/10 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-50/80">
              Cluster map
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-xl font-semibold text-white">Templates</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Parents&apos; evening emails, behaviour letters home, and
                  Ofsted-friendly parent communication.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-xl font-semibold text-white">How-to</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Angry parent replies and cleaner documentation for SLT in
                  British-school contexts.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-xl font-semibold text-white">Safe AI</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Focused guidance on GDPR-safe workflows and calmer report
                  wording for UK teachers.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              UK template pages
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pagesByIntent.templates.map((page) => (
                <Link
                  key={page.slug}
                  href={`/uk/${page.slug}`}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    Template intent
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {page.h1}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {page.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white">
                UK how-to pages
              </h2>
              <div className="grid gap-4">
                {pagesByIntent.howTo.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/uk/${page.slug}`}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {page.h1}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {page.metaDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white">
                UK safe AI and report pages
              </h2>
              <div className="grid gap-4">
                {pagesByIntent.tools.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/uk/${page.slug}`}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {page.h1}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {page.metaDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-teal-200/20 bg-gradient-to-br from-teal-300/10 via-white/5 to-slate-200/10 p-8 md:p-10">
            <h2 className="text-3xl font-semibold text-white">Trust block</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {trustItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
              >
                Start the trial
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Read more practical guides
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
