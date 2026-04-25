import Link from "next/link";
import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { ZazaFramework } from "@/components/seo/ZazaFramework";
import { getContextualGuideLinks, getRelatedGuideLinks } from "@/lib/guides";
import { CONTENT_FRESHNESS } from "@/lib/seo/content-freshness";
import type { GuidePageData } from "@/lib/guides";

export function GuidePage({ guide }: { guide: GuidePageData }) {
  const relatedGuides = getRelatedGuideLinks(guide.slug);
  const contextualGuideLinks = getContextualGuideLinks(guide.title, {
    excludeSlug: guide.slug,
    limit: 2,
  });

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
            <Link href="/guides" className="transition hover:text-slate-900">
              Guides
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-900">{guide.title}</span>
          </nav>

          <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                {guide.eyebrow}
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                {guide.title}
              </h1>
              <LastUpdated
                isoDate={guide.lastReviewed}
                precision={CONTENT_FRESHNESS.guidesPages.precision}
              />
              <div className="max-w-4xl space-y-4 text-lg leading-8 text-slate-700">
                {guide.intro.map((paragraph) => (
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
                Who this guide is for
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                {guide.whoItsFor.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] px-4 py-4"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
        {guide.useZazaFramework ? <ZazaFramework /> : null}

        {guide.steps.length && !guide.useZazaFramework ? (
          <section className="rounded-[32px] border border-[#d4c6b4] bg-[linear-gradient(135deg,_#123f34_0%,_#1a5c4a_100%)] p-8 text-white md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">
              {guide.frameworkTitle ? "A simple framework" : "A clearer path"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {guide.frameworkTitle ??
                "Four ways to make the message safer and easier to stand behind"}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {guide.steps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-3xl border border-white/15 bg-white/8 p-6"
                >
                  <p className="text-sm font-semibold text-emerald-100">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-50/90">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {guide.emotionalFraming?.length ? (
          <section className="rounded-[32px] border border-[#ddd2c3] bg-[#fcfaf6] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Why this feels hard
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              This is usually a stress problem before it is a wording problem
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
              {guide.emotionalFraming.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-3">
          {guide.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold text-slate-950">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-5 space-y-2 text-sm leading-7 text-slate-700">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>- {bullet}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>

        <section className="rounded-[32px] border border-[#ddd2c3] bg-[#fcfaf6] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Before you send
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Use the guide, then test the real wording
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
            If you already have a draft, use the{" "}
            <Link
              href="/parent-email-risk-checker"
              className="font-semibold underline"
            >
              Parent Email Risk Checker
            </Link>{" "}
            before you send it. If you want help reshaping the whole message, go
            to{" "}
            <Link href="/start" className="font-semibold underline">
              /start
            </Link>
            . If this page is close but not quite the right scenario, continue
            with{" "}
            {contextualGuideLinks.map((link, index) => (
              <span key={link.href}>
                <Link href={link.href} className="font-semibold underline">
                  {link.label}
                </Link>
                {index === 0 && contextualGuideLinks.length > 1 ? " or " : ""}
              </span>
            ))}
            .
          </p>
        </section>

        {guide.riskyPhrases?.length ? (
          <section className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Risky phrases
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                What to stop saying, and what to say instead
              </h2>
            </div>
            <div className="grid gap-6">
              {guide.riskyPhrases.map((item, index) => (
                <article
                  key={item.riskySentence}
                  className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Item {index + 1}
                  </p>
                  <div className="mt-5 grid gap-5 lg:grid-cols-3">
                    <div className="rounded-3xl border border-[#f1d0d0] bg-[#fff7f7] p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9f2f2f]">
                        Risky sentence
                      </h3>
                      <p className="mt-3 text-base leading-8 text-slate-800">
                        {item.riskySentence}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-[#e6ddd1] bg-[#fcfaf6] p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                        Why it is risky
                      </h3>
                      <p className="mt-3 text-base leading-8 text-slate-700">
                        {item.whyItsRisky}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-[#d4e7df] bg-[#f7fcfa] p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#164e3f]">
                        Safer version
                      </h3>
                      <p className="mt-3 text-base leading-8 text-slate-800">
                        {item.saferVersion}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {guide.example ? (
          <section className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Example
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Before vs after
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <article className="rounded-[32px] border border-[#f1d0d0] bg-[#fff7f7] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9f2f2f]">
                  Bad version
                </p>
                <div className="mt-4 whitespace-pre-wrap text-base leading-8 text-slate-800">
                  {guide.example.badVersion}
                </div>
              </article>
              <article className="rounded-[32px] border border-[#d4e7df] bg-[#f7fcfa] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#164e3f]">
                  Improved version
                </p>
                <div className="mt-4 whitespace-pre-wrap text-base leading-8 text-slate-800">
                  {guide.example.improvedVersion}
                </div>
              </article>
            </div>
            <p className="mt-6 text-base leading-8 text-slate-700">
              {guide.example.note}
            </p>
          </section>
        ) : null}

        {guide.summaryChecklist?.length ? (
          <section className="rounded-[32px] border border-[#ddd2c3] bg-[#fcfaf6] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Summary checklist
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Quick check before you send
            </h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {guide.summaryChecklist.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[#e6ddd1] bg-white px-5 py-4 text-sm leading-7 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <AgentReadableSummary
          locale="en"
          theme="light"
          title="The short version of this guide"
          intro="If you want the quick read before acting on the advice, this section explains what the guide covers, who it helps, and what to do next."
          labels={{
            eyebrow: "Guide at a glance",
            whatIsIt: "What is this guide about?",
            whoIsItFor: "Who is it for?",
            problemItSolves: "What problem does it solve?",
            howItWorks: "How should you use it?",
            whatItCosts: "What does it cost?",
            nextStep: "What should you do next?",
          }}
          answers={{
            whatIsIt: guide.cardDescription,
            whoIsItFor: (
              <ul className="list-disc space-y-2 pl-5">
                {guide.whoItsFor.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
            problemItSolves:
              guide.sections[0]?.paragraphs[0] ??
              "It helps teachers make sensitive school communication calmer, clearer, and easier to stand behind.",
            howItWorks: (
              <>
                Read the framework, examples, and checklist on this page, then
                use the safer wording patterns in your own message or report
                comment.
              </>
            ),
            whatItCosts: (
              <>
                This guide is free to read. If you want help with a real draft,
                you can start free in{" "}
                <Link href="/start" className="font-semibold underline">
                  Zaza Draft
                </Link>{" "}
                or check the live plans on the{" "}
                <Link href="/pricing" className="font-semibold underline">
                  pricing page
                </Link>
                .
              </>
            ),
            nextStep: (
              <>
                Use the{" "}
                <Link
                  href="/parent-email-risk-checker"
                  className="font-semibold underline"
                >
                  Parent Email Risk Checker
                </Link>{" "}
                if you already have a draft, or go to{" "}
                <Link href="/start" className="font-semibold underline">
                  /start
                </Link>{" "}
                if you want to build the next version with more support.
              </>
            ),
          }}
        />

        <section className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Related guides
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Keep reading with the next teacher-first guide
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedGuides.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] px-5 py-5 transition hover:bg-white"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {link.label}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <article className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Best next move
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Turn the advice into a real draft
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              {guide.nextMove}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/start"
                className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
              >
                Go to /start
              </Link>
              <Link
                href="/parent-email-risk-checker"
                className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#faf6f0]"
              >
                Open the free checker
              </Link>
            </div>
          </article>

          <article className="rounded-[32px] border border-[#ddd2c3] bg-[#fcfaf6] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Tools and next pages
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Useful next steps
            </h2>
            <div className="mt-6 space-y-4">
              {guide.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-2xl border border-[#e6ddd1] bg-white px-5 py-4 transition hover:bg-[#faf6f0]"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    {link.label}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </article>
        </section>

        {guide.faq?.length ? (
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
              {guide.faq.map((item) => (
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
        ) : null}
      </div>
    </div>
  );
}
