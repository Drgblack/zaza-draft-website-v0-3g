import type { Metadata } from "next";
import Link from "next/link";
import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { getAllGuides } from "@/lib/guides";
import { createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Teacher Communication Guides",
  description:
    "Clear, safe, and professional communication with parents - explained simply through practical teacher-first guides.",
  path: "/guides",
  keywords: [
    "teacher communication guides",
    "parent email guide for teachers",
    "teacher communication with parents",
    "professional report comments guide",
  ],
  alternates: {
    en: "https://zazadraft.com/guides",
  },
});

const guides = getAllGuides();

export default function GuidesPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "guides-webpage-schema",
            data: createWebPageJsonLd({
              name: "Teacher Communication Guides",
              description:
                "Clear, safe, and professional communication with parents - explained simply through practical teacher-first guides.",
              path: "/guides",
              inLanguage: "en-GB",
              potentialActionName: "Browse teacher communication guides",
            }),
          },
        ]}
      />

      <div className="min-h-screen bg-[#f6f1e8] text-slate-900">
        <section className="border-b border-[#ddd2c3] bg-[radial-gradient(circle_at_top_left,_rgba(29,78,68,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.16),_transparent_32%),linear-gradient(180deg,_#fcfaf6_0%,_#f6f1e8_100%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-600"
            >
              <Link href="/" className="transition hover:text-slate-900">
                Home
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-900">Guides</span>
            </nav>

            <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-6">
                <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  Teacher communication library
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  Teacher Communication Guides
                </h1>
                <p className="max-w-4xl text-xl leading-8 text-slate-700">
                  Clear, safe, and professional communication with parents -
                  explained simply
                </p>
                <div className="max-w-4xl space-y-4 text-lg leading-8 text-slate-700">
                  <p>
                    This section is for teachers who already know the situation
                    they are dealing with, but want clearer guidance on the
                    wording, tone, and structure that will make a message easier
                    to stand behind.
                  </p>
                  <p>
                    The guides focus on high-friction communication moments:
                    angry parent replies, phrases to avoid, de-escalation, and
                    more professional report comments. They are practical on
                    purpose, not generic communication advice.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/start"
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    Start with Zaza Draft
                  </Link>
                  <Link
                    href="/parent-email-risk-checker"
                    className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    Try the free risk checker
                  </Link>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  What these guides are for
                </p>
                <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                  <p>
                    Use these guides when the hard part is not the facts, but
                    shaping those facts into wording that sounds calm, clear,
                    and professionally safe.
                  </p>
                  <p>
                    If you already have a draft, the fastest next step is often
                    the free risk checker. If you want to build or reshape the
                    message with more support, go to /start.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
          <section className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] px-5 py-5">
                <h2 className="text-xl font-semibold text-slate-950">
                  What this section covers
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                  <li>angry parent replies</li>
                  <li>de-escalation wording</li>
                  <li>risky phrases to avoid</li>
                  <li>more professional report comments</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] px-5 py-5">
                <h2 className="text-xl font-semibold text-slate-950">
                  Who it is for
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                  <li>teachers handling difficult parent communication</li>
                  <li>school staff needing calmer, clearer wording</li>
                  <li>
                    educators who want practical examples, not vague advice
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] px-5 py-5">
                <h2 className="text-xl font-semibold text-slate-950">
                  What to do next
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                  <li>
                    pick the guide that matches the conversation you are
                    handling
                  </li>
                  <li>use the free risk checker if you already have a draft</li>
                  <li>
                    go to /start if you want help rewriting the full message
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-14">
            <AgentReadableSummary
              locale="en"
              theme="light"
              title="The short version of the guides section"
              intro="This summary is for teachers who want to know what the guides cover, who they are for, and where to go next."
              labels={{
                eyebrow: "Guides at a glance",
                whatIsIt: "What is this section about?",
                whoIsItFor: "Who is it for?",
                problemItSolves: "What problem does it solve?",
                howItWorks: "How should you use it?",
                whatItCosts: "What does it cost?",
                nextStep: "What should you do next?",
              }}
              answers={{
                whatIsIt:
                  "This is Zaza Draft's public guide library for high-stakes teacher communication, including angry parent replies, de-escalation, risky phrasing, and report comments.",
                whoIsItFor: (
                  <ul className="list-disc space-y-2 pl-5">
                    <li>teachers handling difficult parent communication</li>
                    <li>school staff who need practical wording examples</li>
                    <li>
                      educators who want clearer next steps before sending a
                      message
                    </li>
                  </ul>
                ),
                problemItSolves:
                  "It helps when the hard part is not the facts, but turning those facts into wording that sounds calm, clear, and professionally safe.",
                howItWorks:
                  "Choose the guide that matches the issue you are dealing with, read the examples and frameworks, then apply the wording patterns to your own message.",
                whatItCosts: (
                  <>
                    The guides are free to read. If you want help with a real
                    draft, you can try the{" "}
                    <Link
                      href="/parent-email-risk-checker"
                      className="font-semibold underline"
                    >
                      free Parent Email Risk Checker
                    </Link>{" "}
                    or see live plans on the{" "}
                    <Link href="/pricing" className="font-semibold underline">
                      pricing page
                    </Link>
                    .
                  </>
                ),
                nextStep: (
                  <>
                    Start with the guide that matches your situation, then move
                    to{" "}
                    <Link href="/start" className="font-semibold underline">
                      /start
                    </Link>{" "}
                    if you want to shape a real draft with Zaza Draft.
                  </>
                ),
              }}
            />
          </section>

          <section>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Guide collection
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Start with the guide that matches the conversation you are
                handling
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {guides.map((guide) => (
                <article
                  key={guide.slug}
                  className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.2)]"
                >
                  <h3 className="text-2xl font-semibold text-slate-950">
                    {guide.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-700">
                    {guide.cardDescription}
                  </p>
                  <Link
                    href={guide.path}
                    className="mt-6 inline-flex items-center rounded-full border border-[#164e3f] px-5 py-3 text-sm font-semibold text-[#164e3f] transition hover:bg-[#164e3f] hover:text-white"
                  >
                    Read guide
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
