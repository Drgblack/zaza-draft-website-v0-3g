import Link from "next/link";
import { SeoInternalLinkingBlocks } from "@/components/seo/internal-linking-blocks";
import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { appendDistributionParams } from "@/lib/distribution-analytics";
import { StructuredData } from "@/components/StructuredData";
import {
  getScenarioPageLastReviewed,
  type ScenarioPage,
} from "@/lib/seo/scenario-pages";
import { CONTENT_FRESHNESS } from "@/lib/seo/content-freshness";

type ScenarioPageTemplateProps = {
  page: ScenarioPage;
};

export function ScenarioPageTemplate({ page }: ScenarioPageTemplateProps) {
  const lastReviewed = getScenarioPageLastReviewed(page);
  const distributionMeta = {
    product: "zaza_draft" as const,
    pageType: "scenario" as const,
    slug: page.slug,
  };
  const startHref = appendDistributionParams("/start", distributionMeta);
  const checkerHref = appendDistributionParams(
    "/parent-email-risk-checker",
    distributionMeta,
  );

  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          id: `${page.slug}-webpage-jsonld`,
          path: `/${page.slug}`,
          title: page.h1,
          description: page.metaDescription,
          potentialActionName: "Start with Zaza Draft",
          modifiedTime: `${lastReviewed}T00:00:00.000Z`,
        }}
      />
      <StructuredData
        type="SoftwareApplication"
        data={{
          id: `${page.slug}-software-jsonld`,
          path: `/${page.slug}`,
          title: "Zaza Draft",
          description:
            "Zaza Draft helps teachers rewrite difficult parent emails and school messages into calmer wording they can review before sending.",
        }}
      />
      <StructuredData
        type="Article"
        data={{
          id: `${page.slug}-article-jsonld`,
          path: `/${page.slug}`,
          title: page.h1,
          description: page.metaDescription,
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          id: `${page.slug}-faq-jsonld`,
          path: `/${page.slug}`,
          title: page.h1,
          description: page.metaDescription,
          faqs: page.faq,
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          id: `${page.slug}-breadcrumb-jsonld`,
          path: `/${page.slug}`,
          title: page.h1,
          description: page.metaDescription,
          breadcrumbs: {
            [`/${page.slug}`]: page.shortTitle,
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
              <span className="text-slate-900">{page.shortTitle}</span>
            </nav>

            <div className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-6">
                <p className="inline-flex rounded-full border border-[#cfd8cd] bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  Teacher communication scenario
                </p>
                <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  {page.h1}
                </h1>
                <LastUpdated
                  isoDate={lastReviewed}
                  precision={CONTENT_FRESHNESS.scenarioPages.precision}
                />
                <div className="max-w-3xl space-y-4 text-lg leading-8 text-slate-700">
                  {page.problemFraming.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={startHref}
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    Start with Zaza Draft
                  </Link>
                  <Link
                    href={checkerHref}
                    className="inline-flex items-center rounded-full border border-[#d7ccbd] bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    Check my message
                  </Link>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Why teachers pause on these emails
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-800">
                  You are usually not asking, &quot;What words can I use?&quot;
                  You are asking, &quot;How do I say this without making the
                  situation worse?&quot;
                </p>
                <div className="mt-6 rounded-3xl border border-[#e7ded1] bg-[#fbf8f2] p-5">
                  <h2 className="text-lg font-semibold text-slate-950">
                    Fast next step
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    If you already have a draft, paste it into the free parent
                    email risk checker before you send it. If you are starting
                    from scratch, use Zaza Draft to write the calmer version
                    sooner.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
            <article className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Common mistake
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {page.commonMistake.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {page.commonMistake.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <article className="rounded-[32px] border border-[#cfddd8] bg-[#163f37] p-6 text-white md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">
                Safer wording principles
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                What makes the wording safer
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-emerald-50/90">
                {page.saferWordingPrinciples.map((principle) => (
                  <li key={principle}>- {principle}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Before and after
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {page.beforeAfter.label}
              </h2>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <article className="rounded-[32px] border border-rose-200 bg-rose-50/70 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-rose-700">
                  Before
                </p>
                <p className="mt-3 text-base leading-8 text-slate-800">
                  {page.beforeAfter.before}
                </p>
              </article>
              <article className="rounded-[32px] border border-emerald-200 bg-emerald-50/70 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
                  After
                </p>
                <p className="mt-3 text-base leading-8 text-slate-800">
                  {page.beforeAfter.after}
                </p>
              </article>
            </div>
            <div className="mt-6 rounded-[32px] border border-[#e7ded1] bg-[#fbf8f2] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Why this version is safer
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                {page.beforeAfter.whySafer.map((point) => (
                  <li key={point}>- {point}</li>
                ))}
              </ul>
            </div>
          </section>

          <AgentReadableSummary
            title="The short version for this parent-email scenario"
            intro="If you want the fast explanation before you decide what to do next, this block answers the core questions clearly."
            answers={{
              whatIsIt: (
                <>
                  Zaza Draft is a teacher-first writing support tool for parent
                  emails and other school messages where tone, clarity, and
                  defensibility matter.
                </>
              ),
              whoIsItFor: (
                <>
                  It is for teachers who want help writing difficult messages
                  without sounding harsher, colder, or more reactive than they
                  intend.
                </>
              ),
              problemItSolves: (
                <>
                  It solves the problem of knowing what needs to be said, but
                  not yet trusting how the wording will land with a parent.
                </>
              ),
              howItWorks: (
                <>
                  You start with a real draft or situation, Zaza helps shape a
                  calmer version, and you still review the final message before
                  using it.
                </>
              ),
              whatItCosts: (
                <>
                  You can start free, then move to a paid plan if you want
                  regular support.{" "}
                  <Link href="/pricing" className="font-semibold underline">
                    Current plan details are on the pricing page.
                  </Link>
                </>
              ),
              nextStep: (
                <>
                  If you already have a draft,{" "}
                  <Link href={checkerHref} className="font-semibold underline">
                    check the message
                  </Link>
                  . If you want to write from scratch,{" "}
                  <Link href={startHref} className="font-semibold underline">
                    start with Zaza Draft
                  </Link>
                  .
                </>
              ),
            }}
          />

          <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <article className="rounded-[32px] border border-[#d4c6b4] bg-[linear-gradient(135deg,_#123f34_0%,_#1a5c4a_100%)] p-8 text-white md:p-10">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
                Use Zaza Draft when the first version still feels risky
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">
                Zaza Draft is built for parent emails, report comments, and
                other school messages where the challenge is not speed alone. It
                is getting the tone right before you send.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/products/draft"
                  className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123f34] transition hover:bg-[#f3efe7]"
                >
                  See how Zaza Draft works
                </Link>
                <Link
                  href={startHref}
                  className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Go to /start
                </Link>
              </div>
            </article>

            <article className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Not sure how your message will land?
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Paste it into the free parent email risk checker before you send
                it.
              </p>
              <Link
                href={checkerHref}
                className="mt-6 inline-flex items-center rounded-full border border-[#164e3f] px-5 py-3 text-sm font-semibold text-[#164e3f] transition hover:bg-[#164e3f] hover:text-white"
              >
                Check my message
              </Link>
            </article>
          </section>

          <SeoInternalLinkingBlocks
            relatedTitle="Keep going with related parent email scenarios"
            relatedLinks={page.internalLinks}
            checkerHref={checkerHref}
            startHref={startHref}
            includeReportCommentLinks={
              page.slug ===
              "how-to-write-a-report-comment-without-sounding-harsh"
            }
          />

          <section className="space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                FAQ
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Questions teachers ask in this situation
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
        </main>
      </div>
    </>
  );
}
