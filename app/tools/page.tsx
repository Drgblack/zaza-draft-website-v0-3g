import Link from "next/link";
import { DistributionPageViewTracker } from "@/components/analytics/distribution-page-view-tracker";
import { StructuredData } from "@/components/StructuredData";
import { SetLanguage } from "@/components/set-language";
import { appendDistributionParams } from "@/lib/distribution-analytics";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { getToolLandingPages } from "@/lib/tool-landing-pages";

export const metadata = buildPageMetadata({
  title: "Teacher Email Tone and Risk Tools | Zaza Draft",
  description:
    "Free teacher tools from Zaza Draft to check email tone, spot escalation risk, and rewrite parent emails more calmly before you send them.",
  path: "/tools",
  type: "website",
  keywords: [
    "teacher email tools",
    "teacher tone checker",
    "parent email risk checker",
    "teacher communication tools",
  ],
  alternates: {
    en: "https://zazadraft.com/tools",
  },
});

const toolPages = getToolLandingPages();

export default function ToolsHubPage() {
  const distributionMeta = {
    product: "zaza_draft" as const,
    pageType: "free_tool" as const,
    slug: "tools",
  };

  return (
    <>
      <SetLanguage lang="en" />
      <DistributionPageViewTracker meta={distributionMeta} />
      <StructuredData
        type="Article"
        data={{
          id: "tools-hub-article-jsonld",
          path: "/tools",
          title: "Teacher Email Tone and Risk Tools",
          description:
            "Free teacher tools from Zaza Draft to check tone, reduce escalation risk, and rewrite sensitive school communication more calmly.",
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          id: "tools-hub-breadcrumb-jsonld",
          path: "/tools",
          title: "Teacher Email Tone and Risk Tools",
          description:
            "Free teacher tools from Zaza Draft to check tone, reduce escalation risk, and rewrite sensitive school communication more calmly.",
          breadcrumbs: {
            "/tools": "Tools",
          },
        }}
      />

      <div className="min-h-screen bg-[#f7f2e8] text-slate-900">
        <section className="border-b border-[#ddd1c0] bg-[radial-gradient(circle_at_top_left,_rgba(20,83,45,0.12),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.18),_transparent_36%),linear-gradient(180deg,_#fcfaf6_0%,_#f7f2e8_100%)]">
          <div className="mx-auto max-w-6xl px-6 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-600"
            >
              <Link href="/" className="transition hover:text-slate-900">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900">Tools</span>
            </nav>

            <div className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-6">
                <p className="inline-flex rounded-full border border-[#cfd8cd] bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  Free teacher tools
                </p>
                <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  Teacher email tone and risk tools
                </h1>
                <div className="max-w-3xl space-y-4 text-lg leading-8 text-slate-700">
                  <p>
                    These tools are for the emails teachers rewrite three times
                    because the wording still feels risky.
                  </p>
                  <p>
                    Use them to check whether a parent email sounds ruder,
                    colder, or more escalatory than you mean before you send it.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/parent-email-risk-checker?src=tools-hub"
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    Open the free checker
                  </Link>
                  <Link
                    href={appendDistributionParams(
                      "/start?src=tools-hub",
                      distributionMeta,
                    )}
                    className="inline-flex items-center rounded-full border border-[#d7ccbd] bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    Start with Zaza Draft
                  </Link>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Best fit
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  Use these when the draft exists, but the tone still feels off
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                  <li>- Check whether a parent email sounds rude</li>
                  <li>- Rewrite a tense draft more calmly</li>
                  <li>- Spot escalation risk before the thread grows</li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Tool pages
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Choose the page that matches the problem
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {toolPages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 transition hover:bg-white"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Teacher tool
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                    {page.h1}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {page.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
            <article className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Useful next pages
              </h2>
              <div className="mt-6 grid gap-4">
                <Link
                  href="/teacher-parent-communication-hub"
                  className="rounded-3xl border border-[#e7ded1] bg-[#fbf8f2] p-5 transition hover:bg-white"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    Teacher parent communication hub
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    Explore more teacher-first pages for difficult parent
                    communication situations.
                  </p>
                </Link>
                <Link
                  href="/compare/best-ai-parent-email-tool-for-teachers"
                  className="rounded-3xl border border-[#e7ded1] bg-[#fbf8f2] p-5 transition hover:bg-white"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    Best AI parent email tool for teachers
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    Compare teacher-specific tools with more general AI writing
                    options.
                  </p>
                </Link>
              </div>
            </article>

            <article className="rounded-[32px] border border-[#d4c6b4] bg-[linear-gradient(135deg,_#123f34_0%,_#1a5c4a_100%)] p-8 text-white md:p-10">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
                Need more than a quick tone check?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">
                The free checker is the fast first step. Zaza Draft is for the
                wider pattern of parent emails, report comments, and sensitive
                school communication that needs calmer wording from the start.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={appendDistributionParams(
                    "/start?src=tools-hub-bottom",
                    distributionMeta,
                  )}
                  className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123f34] transition hover:bg-[#f3efe7]"
                >
                  Go to /start
                </Link>
                <Link
                  href="/products/draft"
                  className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  See how Zaza Draft works
                </Link>
              </div>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}
