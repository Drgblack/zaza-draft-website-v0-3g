import Link from "next/link";
import { DistributionPageViewTracker } from "@/components/analytics/distribution-page-view-tracker";
import { StructuredData } from "@/components/StructuredData";
import { GuideLinksBlock } from "@/components/seo/GuideLinksBlock";
import { SeoInternalLinkingBlocks } from "@/components/seo/internal-linking-blocks";
import { appendDistributionParams } from "@/lib/distribution-analytics";
import { getContextualGuideLinks } from "@/lib/guides";
import type { ToolLandingPage } from "@/lib/tool-landing-pages";

type ToolLandingPageProps = {
  page: ToolLandingPage;
};

export function ToolLandingPageTemplate({ page }: ToolLandingPageProps) {
  const breadcrumbs = {
    "/tools": "Tools",
    [page.path]: page.h1,
  };
  const distributionMeta = {
    product: "zaza_draft" as const,
    pageType: "free_tool" as const,
    slug: page.slug,
  };
  const guideLinks = getContextualGuideLinks(
    `${page.h1} ${page.heroBody} ${page.painIntro}`,
    { limit: 4 },
  );

  return (
    <>
      <DistributionPageViewTracker meta={distributionMeta} />
      <StructuredData
        type="Article"
        data={{
          id: `${page.slug}-article-jsonld`,
          path: page.path,
          title: page.h1,
          description: page.metaDescription,
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          id: `${page.slug}-faq-jsonld`,
          path: page.path,
          title: page.h1,
          description: page.metaDescription,
          faqs: page.faq,
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          id: `${page.slug}-breadcrumb-jsonld`,
          path: page.path,
          title: page.h1,
          description: page.metaDescription,
          breadcrumbs,
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
              <Link href="/tools" className="transition hover:text-slate-900">
                Tools
              </Link>
              <span>/</span>
              <span className="text-slate-900">{page.title}</span>
            </nav>

            <div className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-6">
                <p className="inline-flex rounded-full border border-[#cfd8cd] bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  {page.eyebrow}
                </p>
                <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  {page.h1}
                </h1>
                <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                  {page.heroTitle}
                </h2>
                <p className="max-w-3xl text-lg leading-8 text-slate-700">
                  {page.heroBody}
                </p>
                <div className="rounded-3xl border border-[#e7ded1] bg-white/88 px-5 py-5">
                  <p className="text-base font-medium leading-7 text-slate-800">
                    {page.voiceLine}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={page.checkerHref}
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    {page.checkerCta}
                  </Link>
                  <Link
                    href={appendDistributionParams(
                      page.startHref,
                      distributionMeta,
                    )}
                    className="inline-flex items-center rounded-full border border-[#d7ccbd] bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    {page.startCta}
                  </Link>
                </div>
                <p className="text-sm leading-7 text-slate-600">
                  {page.checkerSupport}
                </p>
              </div>

              <aside className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Free tool
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  Use the existing checker
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  Paste the draft you are worried about into the free Zaza Draft
                  checker and get a calmer, safer version to work from.
                </p>
                <div className="mt-6 rounded-3xl border border-[#e7ded1] bg-[#fbf8f2] p-5">
                  <p className="text-sm leading-7 text-slate-700">
                    This is designed for teacher language, not generic AI
                    writing. It is for the emails you keep revisiting because
                    something about the tone still feels risky.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={page.checkerHref}
                    className="inline-flex items-center justify-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    {page.checkerCta}
                  </Link>
                  <Link
                    href={appendDistributionParams(
                      page.startHref,
                      distributionMeta,
                    )}
                    className="inline-flex items-center justify-center rounded-full border border-[#d7ccbd] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#fbf8f2]"
                  >
                    {page.startCta}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
            <article className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                {page.painTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                {page.painIntro}
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                {page.painPoints.map((point) => (
                  <li key={point}>- {point}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[32px] border border-[#cfddd8] bg-[#163f37] p-6 text-white md:p-8">
              <h2 className="text-3xl font-semibold tracking-tight">
                {page.howItHelpsTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-emerald-50/90">
                {page.howItHelpsIntro}
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-emerald-50/90">
                {page.howItHelpsBullets.map((point) => (
                  <li key={point}>- {point}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Teacher scenarios
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {page.scenariosTitle}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {page.scenarios.map((scenario) => (
                <article
                  key={scenario.title}
                  className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {scenario.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {scenario.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Before and after
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {page.beforeAfterTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                {page.beforeAfterIntro}
              </p>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {page.examples.map((example) => (
                <article
                  key={example.label}
                  className="rounded-[32px] border border-[#e7ded1] bg-[#fbf8f2] p-6"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {example.label}
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-3xl border border-rose-200 bg-white px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-rose-700">
                        Before
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-700">
                        {example.before}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-emerald-200 bg-white px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
                        After
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-700">
                        {example.after}
                      </p>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">
                      {example.whyItWorks}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <GuideLinksBlock
            eyebrow="Teacher communication guides"
            title="Learn how to handle this properly"
            intro="If the checker matches a real situation on your screen, these guides give you calmer examples before you send the final version."
            links={guideLinks}
            hubHref="/guides"
            hubLabel="Browse all guides"
          />

          <SeoInternalLinkingBlocks
            relatedTitle={page.relatedLinksTitle}
            relatedLinks={page.relatedLinks}
            checkerHref={page.checkerHref}
            startHref={appendDistributionParams(
              page.startHref,
              distributionMeta,
            )}
            includeReportCommentLinks
          />

          <section className="space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                FAQ
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Questions teachers ask before using the checker
              </h2>
            </div>
            <div className="space-y-3">
              {page.faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-3xl border border-[#ddd1c0] bg-white/92 px-5 py-4"
                >
                  <summary className="cursor-pointer list-none font-medium text-slate-950">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <article className="rounded-[32px] border border-[#d4c6b4] bg-[linear-gradient(135deg,_#123f34_0%,_#1a5c4a_100%)] p-8 text-white md:p-10">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
                {page.closingTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">
                {page.closingBody}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={page.checkerHref}
                  className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123f34] transition hover:bg-[#f3efe7]"
                >
                  {page.checkerCta}
                </Link>
                <Link
                  href={appendDistributionParams(
                    page.startHref,
                    distributionMeta,
                  )}
                  className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {page.startCta}
                </Link>
              </div>
            </article>

            <article className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Need the full drafting workflow?
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                The free checker is the quick first step. Zaza Draft helps with
                the wider pattern of parent emails, report comments, and other
                messages where the wording still has to feel safe tomorrow.
              </p>
              <Link
                href={appendDistributionParams(
                  page.startHref,
                  distributionMeta,
                )}
                className="mt-6 inline-flex items-center rounded-full border border-[#164e3f] px-5 py-3 text-sm font-semibold text-[#164e3f] transition hover:bg-[#164e3f] hover:text-white"
              >
                {page.startCta}
              </Link>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}
