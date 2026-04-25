import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";
import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { CONTENT_FRESHNESS } from "@/lib/seo/content-freshness";
import type { ProgrammaticPageData } from "@/lib/programmatic-seo";

type ProgrammaticPageProps = {
  page: ProgrammaticPageData;
};

type BreadcrumbItem = {
  href: string;
  label: string;
};

function formatSegmentLabel(segment: string) {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildBreadcrumbTrail(page: ProgrammaticPageData): BreadcrumbItem[] {
  const segments = page.path.split("/").filter(Boolean);
  const trail: BreadcrumbItem[] = [{ href: "/", label: "Home" }];

  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;
    trail.push({
      href: currentPath,
      label:
        page.breadcrumbOverrides?.[currentPath] ?? formatSegmentLabel(segment),
    });
  }

  return trail;
}

function buildCoWriterNotes(page: ProgrammaticPageData) {
  return [
    `Task: ${page.h1}`,
    `Need: ${page.heroBullets[0] ?? "Calm teacher-first wording"}`,
    `Keep in mind: ${page.howToSteps[0]?.text ?? page.featuredSnippet}`,
  ];
}

function getDraftPreview(page: ProgrammaticPageData) {
  return page.examples[0]?.example ?? page.featuredSnippet;
}

export function ProgrammaticPage({ page }: ProgrammaticPageProps) {
  const breadcrumbTrail = buildBreadcrumbTrail(page);
  const coWriterNotes = buildCoWriterNotes(page);
  const draftPreview = getDraftPreview(page);

  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          id: `${page.path}-webpage-jsonld`,
          path: page.path,
          title: page.h1,
          description: page.metaDescription,
          potentialActionName: "Try this in Zaza Draft",
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
            "Zaza Draft helps teachers write calmer parent emails, clearer school messages, and more meaningful report comments before anything is sent or submitted.",
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
        type="HowTo"
        data={{
          id: `${page.path}-howto-jsonld`,
          path: page.path,
          title: page.h1,
          description: page.metaDescription,
          steps: page.howToSteps,
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
      <StructuredData
        type="BreadcrumbList"
        data={{
          id: `${page.path}-breadcrumb-jsonld`,
          path: page.path,
          title: page.h1,
          description: page.metaDescription,
          breadcrumbs: page.breadcrumbOverrides,
        }}
      />

      <div className="min-h-screen bg-[#f6f1e8] text-slate-900">
        <section className="border-b border-[#ddd2c3] bg-[radial-gradient(circle_at_top_left,_rgba(29,78,68,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.16),_transparent_32%),linear-gradient(180deg,_#fcfaf6_0%,_#f6f1e8_100%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap gap-2 text-sm text-slate-600"
            >
              {breadcrumbTrail.map((item, index) => {
                const isLast = index === breadcrumbTrail.length - 1;

                return (
                  <span key={item.href} className="flex items-center gap-2">
                    {isLast ? (
                      <span className="font-medium text-slate-900">
                        {item.label}
                      </span>
                    ) : (
                      <Link href={item.href} className="hover:text-slate-900">
                        {item.label}
                      </Link>
                    )}
                    {!isLast ? <span>/</span> : null}
                  </span>
                );
              })}
            </nav>

            <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="max-w-4xl space-y-6">
                <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  {page.heroEyebrow}
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  {page.h1}
                </h1>
                <LastUpdated
                  isoDate={page.lastReviewed}
                  precision={CONTENT_FRESHNESS.programmaticPages.precision}
                />
                {page.heroDescription.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-3xl text-lg leading-8 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
                <ul className="grid gap-3 sm:grid-cols-3">
                  {page.heroBullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-2xl border border-[#d8d0c5] bg-white/85 px-4 py-3 text-sm leading-6 text-slate-700 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={page.cta.primaryHref}
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    {page.cta.primaryLabel}
                  </Link>
                  <Link
                    href={page.cta.secondaryHref}
                    className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    {page.cta.secondaryLabel}
                  </Link>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Clear answer first
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-800">
                  {page.featuredSnippet}
                </p>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      What this page gives you
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                      <li>- 4 to 6 editable examples you can adapt quickly</li>
                      <li>- A calmer structure for difficult school wording</li>
                      <li>
                        - A direct route into Zaza Draft when you want a custom
                        draft
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Why teachers land here
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Usually because the facts are already clear, but the tone
                      still feels risky. These pages are built to reduce that
                      friction without taking judgement away from the teacher.
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      Estimated page depth: {page.estimatedWordCount} words.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
            <div className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Practical steps
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                A calmer way to handle {page.h1.toLowerCase()}
              </h2>
              <ol className="mt-6 space-y-4">
                {page.howToSteps.map((step, index) => (
                  <li
                    key={step.name}
                    className="rounded-3xl border border-[#e6ddd1] bg-[#fcfaf6] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#164e3f] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {step.name}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-700">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <section className="rounded-[32px] border border-[#ddd2c3] bg-[#173d35] p-6 text-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.5)] md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">
                Inside Zaza Draft
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Use the co-writer, then edit the final version yourself
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-emerald-50/90">
                Zaza Draft is built as a teacher-first co-writer. You bring the
                facts, choose the tone, and approve the final wording. The
                workflow is there to reduce stress, not to override professional
                judgement.
              </p>

              <div className="mt-8 grid gap-4 lg:grid-cols-[0.85fr,1.15fr]">
                <div className="rounded-3xl border border-white/15 bg-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">
                    Teacher notes
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-emerald-50/90">
                    {coWriterNotes.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-emerald-50/90">
                    <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5">
                      Calm tone
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5">
                      Teacher review
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5">
                      School-ready wording
                    </span>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/15 bg-[#f9f7f3] p-5 text-slate-900">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Zaza Draft first draft
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        Generated from teacher notes. Final edit still sits with
                        you.
                      </p>
                    </div>
                    <span className="rounded-full bg-[#e8f1ee] px-3 py-1.5 text-xs font-semibold text-[#164e3f]">
                      Teacher approval required
                    </span>
                  </div>
                  <div className="mt-4 whitespace-pre-wrap rounded-3xl border border-[#e3dacd] bg-white px-5 py-4 text-sm leading-7 text-slate-800">
                    {draftPreview}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={page.cta.primaryHref}
                      className="inline-flex items-center rounded-full bg-[#164e3f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                    >
                      Try this in Zaza Draft
                    </Link>
                    <Link
                      href={page.cta.secondaryHref}
                      className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-[#faf6f0]"
                    >
                      See the full workflow
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            {page.sections.map((section) => (
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

          {page.comparisonMatrix ? (
            <section className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
              <h2 className="text-3xl font-semibold text-slate-950">
                {page.comparisonMatrix.title}
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
                {page.comparisonMatrix.intro}
              </p>
              <div className="mt-6 overflow-hidden rounded-3xl border border-[#e6ddd1]">
                <table className="min-w-full divide-y divide-[#e6ddd1] text-left text-sm">
                  <thead className="bg-[#f8f3eb] text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-medium">Comparison area</th>
                      <th className="px-4 py-3 font-medium">Zaza Draft</th>
                      <th className="px-4 py-3 font-medium">
                        {page.comparisonMatrix.alternativeLabel}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6ddd1] bg-white text-slate-700">
                    {page.comparisonMatrix.rows.map((row) => (
                      <tr key={row.label}>
                        <td className="px-4 py-3 font-medium text-slate-950">
                          {row.label}
                        </td>
                        <td className="px-4 py-3">{row.zaza}</td>
                        <td className="px-4 py-3">{row.alternative}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                {page.comparisonMatrix.note}
              </p>
            </section>
          ) : null}

          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Editable examples
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                  Sample wording you can adapt
                </h2>
              </div>
              <Link
                href={page.cta.primaryHref}
                className="text-sm font-semibold text-[#164e3f] hover:text-[#123f34]"
              >
                Generate a custom version in Zaza Draft
              </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {page.examples.map((example) => (
                <article
                  key={example.title}
                  className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {example.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {example.intro}
                  </p>
                  <div className="mt-4 whitespace-pre-wrap rounded-3xl border border-[#e6ddd1] bg-[#fcfaf6] p-5 text-sm leading-7 text-slate-800">
                    {example.example}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {example.note}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
              <h2 className="text-3xl font-semibold text-slate-950">
                How Zaza Draft helps you stay in control
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                {page.trustItems.map((item) => (
                  <li key={item.title}>
                    <span className="font-semibold text-slate-950">
                      {item.title}
                    </span>
                    <span>{`: ${item.body}`}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border border-[#ddd2c3] bg-[#1e293b] p-6 text-white md:p-8">
              <h2 className="text-3xl font-semibold">
                Testimonial placeholders
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                These cards are intentionally placeholder-led so the rollout can
                be completed without inventing social proof. Replace them only
                with verified teacher quotes.
              </p>
              <div className="mt-5 space-y-4">
                {page.testimonialPlaceholders.map((item) => (
                  <div
                    key={item.role}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-sm font-semibold text-white">
                      {item.role}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {item.quotePrompt}
                    </p>
                  </div>
                ))}
              </div>
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

          <section className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Internal links
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Related pages worth opening next
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {page.internalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 transition hover:bg-white"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Related page
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
            title="What this page is helping you do"
            intro="If you want the short version before you click into the app, this summary explains what Zaza Draft is, who it helps, and what to do next."
            answers={{
              whatIsIt: (
                <>
                  Zaza Draft is a teacher-first writing support tool for parent
                  emails, report comments, and other school communication where
                  the wording needs to stay calm and defensible.
                </>
              ),
              whoIsItFor: (
                <>
                  It is for teachers and school teams who already know the
                  facts, but want help shaping the wording into something safer
                  to send or submit.
                </>
              ),
              problemItSolves: (
                <>
                  It solves the problem of knowing what happened but not yet
                  trusting the tone, structure, or usefulness of the draft in
                  front of you.
                </>
              ),
              howItWorks: (
                <>
                  You start with a rough version or a few notes, use Zaza Draft
                  to shape the next version, then review and approve the final
                  wording yourself.
                </>
              ),
              whatItCosts: (
                <>
                  You can start free, then move to a paid plan if you want
                  ongoing support.{" "}
                  <Link href="/pricing" className="font-semibold underline">
                    The pricing page has the current plan details.
                  </Link>
                </>
              ),
              nextStep: (
                <>
                  If this page matches the situation you are handling,{" "}
                  <Link
                    href={page.cta.primaryHref}
                    className="font-semibold underline"
                  >
                    try it in Zaza Draft
                  </Link>{" "}
                  or open the next guide linked on this page.
                </>
              ),
            }}
          />

          <section className="rounded-[32px] border border-[#d8cdbf] bg-[linear-gradient(135deg,_#123f34_0%,_#1f5b4a_100%)] p-8 text-white md:p-10">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {page.cta.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">
              {page.cta.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={page.cta.primaryHref}
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123f34] transition hover:bg-[#f3efe7]"
              >
                {page.cta.primaryLabel}
              </Link>
              <Link
                href={page.cta.secondaryHref}
                className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {page.cta.secondaryLabel}
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
