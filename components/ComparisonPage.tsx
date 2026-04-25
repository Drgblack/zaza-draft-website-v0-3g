import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";
import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { GuideLinksBlock } from "@/components/seo/GuideLinksBlock";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { CONTENT_FRESHNESS } from "@/lib/seo/content-freshness";
import { getContextualGuideLinks } from "@/lib/guides";
import type { ComparisonPageData } from "@/lib/comparison-matrix";

type ComparisonPageProps = {
  page: ComparisonPageData;
};

export function ComparisonPage({ page }: ComparisonPageProps) {
  const guideLinks = getContextualGuideLinks(
    `${page.h1} ${page.metaDescription} ${page.quickAnswer}`,
    { limit: 4 },
  );

  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          id: `${page.path}-webpage-jsonld`,
          path: page.path,
          title: page.h1,
          description: page.metaDescription,
          potentialActionName: "Explore Zaza Draft",
          modifiedTime: `${page.lastReviewed}T00:00:00.000Z`,
        }}
      />
      <StructuredData
        type="SoftwareApplication"
        data={{
          id: `${page.path}-software-jsonld`,
          path: page.path,
          title: "Zaza Draft",
          description:
            "Zaza Draft gives teachers calmer, more focused support for parent emails, report comments, and other school writing where tone matters.",
        }}
      />
      <StructuredData
        type="Article"
        data={{
          id: `${page.path}-article-jsonld`,
          path: page.path,
          title: page.h1,
          description: page.metaDescription,
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          id: `${page.path}-faq-jsonld`,
          path: page.path,
          title: page.h1,
          description: page.metaDescription,
          faqs: page.faq,
        }}
      />

      <div className="min-h-screen bg-[#f6f1e8] text-slate-900">
        <section className="border-b border-[#ddd2c3] bg-[radial-gradient(circle_at_top_left,_rgba(29,78,68,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.16),_transparent_32%),linear-gradient(180deg,_#fcfaf6_0%,_#f6f1e8_100%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
            <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="max-w-4xl space-y-6">
                <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  {page.eyebrow}
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  {page.h1}
                </h1>
                <LastUpdated
                  isoDate={page.lastReviewed}
                  precision={CONTENT_FRESHNESS.comparisonPages.precision}
                />
                {page.hero.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-3xl text-lg leading-8 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    Start free trial
                  </Link>
                  <Link
                    href="/products/draft"
                    className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    Explore Zaza Draft
                  </Link>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Clear answer first
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-800">
                  {page.quickAnswer}
                </p>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Best fit for
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                      <li>
                        - Teachers who want a calmer, more focused product
                      </li>
                      <li>
                        - Parent communication and report comments where tone
                        matters
                      </li>
                      <li>
                        - School writing that still needs teacher review and
                        approval
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Trust reminder
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Hallucination-safe framing, GDPR-aware workflows, and full
                      teacher control still matter whichever tool you choose.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
            <article className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                {page.introTitle}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {page.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <article className="rounded-[32px] border border-[#ddd2c3] bg-[#173d35] p-6 text-white md:p-8">
              <h2 className="text-3xl font-semibold tracking-tight">
                {page.whyTitle}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-emerald-50/90">
                {page.whyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </section>

          <section className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              {page.comparisonTitle}
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
              {page.comparisonIntro}
            </p>
            <div className="mt-6 overflow-hidden rounded-3xl border border-[#e6ddd1]">
              <table className="min-w-full divide-y divide-[#e6ddd1] text-left text-sm">
                <thead className="bg-[#f8f3eb] text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-medium">Comparison area</th>
                    <th className="px-4 py-3 font-medium">Zaza Draft</th>
                    <th className="px-4 py-3 font-medium">Alternative</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6ddd1] bg-white text-slate-700">
                  {page.tableRows.map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-3 font-medium text-slate-950">
                        {row.label}
                      </td>
                      <td className="px-4 py-3">{row.zaza}</td>
                      <td className="px-4 py-3">{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                FAQ
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Questions teachers usually ask before switching tools
              </h2>
            </div>
            <div className="space-y-3">
              {page.faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-3xl border border-[#ddd2c3] bg-white/90 px-5 py-4"
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

          <GuideLinksBlock
            eyebrow="Teacher communication guides"
            title="Learn more before you choose a tool"
            intro="If you are comparing platforms because parent communication or report comments still feel risky, these guides explain the teacher problems behind the tool choice."
            links={guideLinks}
            hubHref="/guides"
            hubLabel="Browse all guides"
          />

          <section className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Related pages
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Useful next pages
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {page.relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 transition hover:bg-white"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Internal link
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <AgentReadableSummary
            title="The short version before you switch tools"
            intro="If you are comparing options quickly, this summary explains where Zaza Draft fits and what to do next."
            answers={{
              whatIsIt: (
                <>
                  Zaza Draft is a teacher-first writing support tool focused on
                  parent emails, report comments, and school communication where
                  tone and judgement matter.
                </>
              ),
              whoIsItFor: (
                <>
                  It is for teachers and school teams who want calmer wording
                  and more relevant support than a generic AI writing tool
                  usually gives.
                </>
              ),
              problemItSolves: (
                <>
                  It solves the problem of getting text quickly but still not
                  trusting whether that text is safe, specific, and
                  school-appropriate enough to use.
                </>
              ),
              howItWorks: (
                <>
                  You bring the draft or prompt, Zaza Draft helps shape the next
                  version for a teacher context, and you still review and
                  approve the final wording.
                </>
              ),
              whatItCosts: (
                <>
                  You can start free, then move to a paid plan if you want
                  regular support.{" "}
                  <Link href="/pricing" className="font-semibold underline">
                    The pricing page shows the current plan options.
                  </Link>
                </>
              ),
              nextStep: (
                <>
                  If the tradeoffs here match what you need,{" "}
                  <Link href="/pricing" className="font-semibold underline">
                    start free
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/products/draft"
                    className="font-semibold underline"
                  >
                    explore Zaza Draft
                  </Link>{" "}
                  in more detail.
                </>
              ),
            }}
          />

          <section className="rounded-[32px] border border-[#d8cdbf] bg-[linear-gradient(135deg,_#123f34_0%,_#1f5b4a_100%)] p-8 text-white md:p-10">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">
              {page.ctaBody}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123f34] transition hover:bg-[#f3efe7]"
              >
                Start free trial
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
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
