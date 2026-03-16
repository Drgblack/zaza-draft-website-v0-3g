import Link from "next/link";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createFAQPageJsonLd,
  createSoftwareApplicationJsonLd,
} from "@/lib/seo/json-ld";
import type { ClusterSpokePage } from "@/lib/seo/teacher-safe-ai-cluster";

interface ClusterSpokeOutlinePageProps {
  page: ClusterSpokePage;
}

const defaultCompanionLinks = [
  {
    href: "/teacher-parent-communication-hub",
    label: "Teacher parent communication hub",
    description:
      "See the wider cluster of guides on safe AI, parent emails, report comments, and school writing.",
  },
  {
    href: "/products/draft",
    label: "Explore Zaza Draft",
    description:
      "See the teacher-first co-writer built for parent communication, report comments, and school writing.",
  },
  {
    href: "/free-resources",
    label: "Free teacher writing resources",
    description:
      "Access calm parent email templates, phrase banks, and practical downloads for school communication.",
  },
];

export function ClusterSpokeOutlinePage({
  page,
}: ClusterSpokeOutlinePageProps) {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: `${page.slug}-article-schema`,
            data: createArticleJsonLd({
              headline: page.h1,
              description: page.metaDescription,
              path: `/${page.slug}`,
            }),
          },
          {
            id: `${page.slug}-breadcrumb-schema`,
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "Teacher parent communication hub",
                path: "/teacher-parent-communication-hub",
              },
              { name: page.h1, path: `/${page.slug}` },
            ]),
          },
          {
            id: `${page.slug}-faq-schema`,
            data: createFAQPageJsonLd(page.faq),
          },
          {
            id: `${page.slug}-software-schema`,
            data: createSoftwareApplicationJsonLd({
              path: `/${page.slug}`,
              description: `${page.h1}. Zaza Draft supports teachers with calmer parent emails, report comments, and school writing while keeping full editorial control.`,
            }),
          },
        ]}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.14),_transparent_30%),radial-gradient(circle_at_right,_rgba(148,163,184,0.1),_transparent_34%)]">
          <div className="mx-auto max-w-5xl px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
            <div className="max-w-4xl space-y-6">
              <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
                {page.intent}
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {page.h1}
              </h1>
              <div className="space-y-4 text-lg leading-8 text-slate-300">
                {page.hero.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
                >
                  Try Zaza Draft
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-5xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="rounded-[28px] border border-teal-200/20 bg-teal-200/10 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-50/80">
              Featured snippet answer
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-teal-50">
              {page.featuredSnippet}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              Why {page.keyword} matters in schools
            </h2>
            <p className="max-w-4xl text-base leading-8 text-slate-300">
              These outlines are written for teachers who need calm,
              professional support with parent communication, report comments,
              safeguarding-sensitive wording, and other school writing tasks
              where tone matters. The aim is not to replace professional
              judgement. It is to make the work easier to start and safer to
              review.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              Suggested page structure
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {page.outline.map((section) => (
                <div
                  key={section.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {page.faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <summary className="cursor-pointer list-none font-medium text-white">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {defaultCompanionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Internal link
                </p>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  {link.label}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {link.description}
                </p>
              </Link>
            ))}
          </section>

          <section className="rounded-[32px] border border-teal-200/20 bg-gradient-to-br from-teal-300/10 via-white/5 to-slate-200/10 p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold text-white">GDPR-ready</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Built for cautious school writing workflows and minimal-input
                  drafting.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold text-white">
                  No invented facts
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Teachers need support that stays close to their notes and does
                  not create unnecessary risk.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold text-white">
                  Teacher-founded
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Built by Dr Greg Blackburn for teacher writing tasks where
                  professional tone matters.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
              >
                Create free account
              </Link>
              <Link
                href="/teacher-parent-communication-hub"
                className="inline-flex items-center rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Return to the hub
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
