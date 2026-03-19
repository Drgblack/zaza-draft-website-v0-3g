import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";
import {
  buildReportPageData,
  buildScenarioPageData,
  type MatrixPageData,
  type Phase,
  type ReportStage,
  type StudentType,
  type Subject,
  type Issue,
  type YearGroup,
} from "@/lib/matrix";

type ScenarioRouteProps = {
  mode: "scenario";
  phase: Phase;
  issue: Issue;
  yearGroup: YearGroup;
};

type ReportRouteProps = {
  mode: "report-comments";
  phase: ReportStage;
  studentType: StudentType;
  subject: Subject;
};

export type ScenarioPageProps = ScenarioRouteProps | ReportRouteProps;

function buildPageData(props: ScenarioPageProps): MatrixPageData | null {
  if (props.mode === "scenario") {
    return buildScenarioPageData(props.phase, props.issue, props.yearGroup);
  }

  return buildReportPageData(props.studentType, props.subject, props.phase);
}

export function ScenarioPage(props: ScenarioPageProps) {
  const page = buildPageData(props);

  if (!page) {
    return null;
  }

  return (
    <>
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
          breadcrumbs: page.breadcrumbs,
        }}
      />

      <div className="min-h-screen bg-[#f6f1e8] text-slate-900">
        <section className="border-b border-[#ddd2c3] bg-[radial-gradient(circle_at_top_left,_rgba(29,78,68,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.16),_transparent_32%),linear-gradient(180deg,_#fcfaf6_0%,_#f6f1e8_100%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
            <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="max-w-4xl space-y-6">
                <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  {page.heroEyebrow}
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  {page.h1}
                </h1>
                {page.heroDescription.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-3xl text-lg leading-8 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/get-started"
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    Start free trial
                  </Link>
                  <Link
                    href="/diagnosis"
                    className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    Diagnose the issue
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
                      <li>- 5 editable examples you can adapt quickly</li>
                      <li>
                        - A teacher-safe structure for calm school writing
                      </li>
                      <li>
                        - A direct path into Zaza Draft when you want a custom
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
                Step-by-step
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                A calmer way to handle {page.keyword.toLowerCase()}
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
                Why Zaza helps
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Teacher-first writing help, not generic AI
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-emerald-50/90">
                Zaza Draft is built for school writing where tone matters:
                parent communication, report comments, behaviour notes, and
                documentation that still needs professional judgement. It helps
                you move faster, but you still edit and approve every final
                word.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-emerald-50">
                  Teacher-specific support
                </span>
                <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-emerald-50">
                  Safer tone
                </span>
                <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-emerald-50">
                  You stay in control
                </span>
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

          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Examples
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                  Wording you can adapt safely
                </h2>
              </div>
              <Link
                href="/products/draft"
                className="text-sm font-semibold text-[#164e3f] hover:text-[#123f34]"
              >
                See how the co-writer works
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
                Trust, safety, and teacher control
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

            <div className="rounded-[32px] border border-[#ddd2c3] bg-[#fcfaf6] p-6 md:p-8">
              <h2 className="text-3xl font-semibold text-slate-950">
                Featured snippet answer
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                {page.featuredSnippet}
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                FAQ
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Questions teachers usually ask next
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
                Related pages
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Useful next pages
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

          <section className="rounded-[32px] border border-[#d8cdbf] bg-[linear-gradient(135deg,_#123f34_0%,_#1f5b4a_100%)] p-8 text-white md:p-10">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">
              {page.ctaBody}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123f34] transition hover:bg-[#f3efe7]"
              >
                Start free trial
              </Link>
              <Link
                href="/products/draft"
                className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Zaza Draft
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
