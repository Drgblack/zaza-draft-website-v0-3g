import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createSoftwareApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import {
  clusterSpokes,
  teacherPainPages,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata: Metadata = buildPageMetadata({
  title: "Teacher Parent Communication Hub - Safe AI Writing Help | Zaza Draft",
  description:
    "Explore a topical hub on teacher parent communication, safe AI writing help, report comments, difficult emails, and calmer school communication workflows.",
  path: "/teacher-parent-communication-hub",
  type: "article",
  keywords: [
    "teacher parent communication hub",
    "safe AI writing help for teachers",
    "parent communication AI",
    "teacher report writing help",
  ],
});

const trustItems = [
  {
    title: "GDPR-ready workflow",
    body: "Built for cautious school writing tasks where teachers want minimal-input drafting and review-led use.",
  },
  {
    title: "No invented facts",
    body: "The safest school writing support stays close to the notes the teacher provides and avoids unnecessary guesswork.",
  },
  {
    title: "Teacher-founded",
    body: "Built by Dr Greg Blackburn for parent communication, report comments, and school writing where tone matters.",
  },
];

export default function TeacherParentCommunicationHubPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "teacher-parent-communication-hub-article-schema",
            data: createArticleJsonLd({
              headline: "Teacher parent communication hub",
              description:
                "A topical authority hub for teacher parent communication, safe AI writing, report comments, and school-safe email support.",
              path: "/teacher-parent-communication-hub",
            }),
          },
          {
            id: "teacher-parent-communication-hub-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "Teacher parent communication hub",
                path: "/teacher-parent-communication-hub",
              },
            ]),
          },
          {
            id: "teacher-parent-communication-hub-software-schema",
            data: createSoftwareApplicationJsonLd({
              path: "/teacher-parent-communication-hub",
              description:
                "Zaza Draft is a teacher-first AI co-writer for parent communication, report comments, and school writing where calm, professional wording matters.",
            }),
          },
        ]}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.12),_transparent_28%),radial-gradient(circle_at_right,_rgba(148,163,184,0.1),_transparent_34%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
            <div className="max-w-4xl space-y-6">
              <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
                Hub page
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Teacher parent communication hub
              </h1>
              <div className="space-y-4 text-lg leading-8 text-slate-300">
                <p>
                  Teacher parent communication is rarely just about sending an
                  email. It is about sounding calm when you are tired, being
                  clear when the issue is sensitive, and protecting professional
                  judgement when the wording may later be revisited by parents,
                  SLT, or school records.
                </p>
                <p>
                  This hub brings together Zaza Draft guides on safe AI writing
                  help for teachers, including parent emails, report comments,
                  behaviour letters, SEN wording, parents’ evening templates,
                  and ways to reduce workload without sounding generic. Zaza
                  Draft is a teacher-first co-writer. You stay in control,
                  review every line, and use AI to reduce stress rather than
                  create new risk.
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
                  href="/free-resources"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Get free resources
                </Link>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="rounded-[28px] border border-teal-200/20 bg-teal-200/10 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-50/80">
              Intro pain
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-teal-50">
              Exhausted teachers do not need louder AI. They need safer help
              with the writing that carries emotional weight: parent complaints,
              behaviour updates, report comments, documentation for SLT, and
              follow-up after parents’ evening. The right support makes those
              tasks easier to start and safer to send.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-3xl font-semibold text-white">
                Why safe AI matters for teachers
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Generic AI can feel broad and clever, but school writing needs
                caution. A parent email, report comment, safeguarding note, or
                behaviour summary should not contain invented details, harsher
                tone than intended, or vague professional phrasing that leaves
                teachers exposed. Safer AI should behave like a co-writer that
                helps with clarity and tone while leaving final judgement with
                the teacher.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-3xl font-semibold text-white">
                Where Zaza Draft helps most
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Parent communication where the tone has to stay calm.</li>
                <li>Report comments where repetition and nuance collide.</li>
                <li>
                  Behaviour letters and pastoral follow-up that need care.
                </li>
                <li>Professional communication that may later be reviewed.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              Core teacher pain pages
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {teacherPainPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    Existing page
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {page.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-white">
                  New long-tail spokes
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-slate-300">
                  These spoke pages target practical teacher searches around
                  safe AI, report writing, Ofsted-friendly communication, and
                  emotionally difficult writing tasks. The layout below uses a
                  horizontal card row so teachers can scan the cluster quickly.
                </p>
              </div>
            </div>
            <div className="overflow-x-auto pb-3">
              <div className="flex min-w-max gap-4">
                {clusterSpokes.map((spoke) => (
                  <Link
                    key={spoke.slug}
                    href={`/${spoke.slug}`}
                    className="w-[320px] rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-teal-200/80">
                      {spoke.intent}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {spoke.h1}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {spoke.metaDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              Free resources and practical downloads
            </h2>
            <p className="max-w-4xl text-base leading-8 text-slate-300">
              Free resources give teachers something immediately useful and make
              the cluster easier to cite in AI overviews and answer engines. The
              strongest downloads are simple, calm, and tied to real pain:
              parent email templates, report phrase banks, and short tone
              checklists for difficult messages.
            </p>
            <Link
              href="/free-resources"
              className="inline-flex items-center rounded-full bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10"
            >
              Explore free resources
            </Link>
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
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Book a demo
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
