import Link from "next/link";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { CONTENT_FRESHNESS } from "@/lib/seo/content-freshness";
import type { AiSearchPageData } from "@/lib/ai-search-pages";

type AiSearchPageProps = {
  page: AiSearchPageData;
};

export function AiSearchPage({ page }: AiSearchPageProps) {
  return (
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
            <span className="font-medium text-slate-900">{page.h1}</span>
          </nav>

          <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                {page.eyebrow}
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                {page.h1}
              </h1>
              <LastUpdated
                isoDate={page.lastReviewed}
                precision={CONTENT_FRESHNESS.aiSearchPages.precision}
              />
              <div className="max-w-4xl space-y-4 text-lg leading-8 text-slate-700">
                {page.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
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
                Quick answer
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-800">
                {page.quickAnswer}
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Best next step
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    If you already have a draft, check it first in the free
                    Parent Email Risk Checker. If you want to build from
                    scratch, go to /start and use the main Zaza Draft workflow.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Positioning in one line
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    Zaza Draft is not just faster writing. It is teacher-first
                    support for wording that needs to be calm, clear, and easier
                    to stand behind.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
        <section className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <article className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Who this is for
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Teachers who care how a message will be received
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
              {page.whoItsFor.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] px-4 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[32px] border border-[#ddd2c3] bg-[#173d35] p-6 text-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.5)] md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">
              What problem it solves
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              The wording problem teachers actually feel
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-emerald-50/90">
              {page.problemItSolves.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Where generic AI tools fall short
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Broad AI tools can help, but they leave more judgement work with
              the teacher
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              {page.genericShortfallsIntro}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {page.genericShortfalls.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-[#e6ddd1] bg-[#fcfaf6] p-6"
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#d4c6b4] bg-[linear-gradient(135deg,_#123f34_0%,_#1a5c4a_100%)] p-8 text-white md:p-10">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">
              How Zaza Draft helps
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Teacher-first support for safer wording
            </h2>
            <p className="mt-4 text-base leading-8 text-emerald-50/90">
              {page.howZazaHelpsIntro}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {page.howZazaHelps.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-white/15 bg-white/8 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-emerald-50/90">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              When not to use it
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Honest limits matter
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              {page.whenNotToUseIntro}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {page.whenNotToUse.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-[#e6ddd1] bg-[#fcfaf6] p-6"
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <article className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Pricing and start
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Start with a real message, not a theoretical comparison
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              {page.pricingSummary}
            </p>
            <p className="mt-4 text-base leading-8 text-slate-700">
              {page.pricingNote}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/start"
                className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
              >
                Go to /start
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#faf6f0]"
              >
                See pricing
              </Link>
            </div>
          </article>

          <article className="rounded-[32px] border border-[#ddd2c3] bg-[#fcfaf6] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Free tool
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Use the Parent Email Risk Checker first
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              If you already have a real draft, the fastest next step is to
              paste it into the free risk checker and see whether the wording
              feels too sharp, too cold, or too easy to misread.
            </p>
            <Link
              href="/parent-email-risk-checker"
              className="mt-6 inline-flex items-center rounded-full border border-[#164e3f] px-5 py-3 text-sm font-semibold text-[#164e3f] transition hover:bg-[#164e3f] hover:text-white"
            >
              Open the free checker
            </Link>
          </article>
        </section>

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

        <section className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              FAQ
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Questions teachers usually ask here
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
      </div>
    </div>
  );
}
