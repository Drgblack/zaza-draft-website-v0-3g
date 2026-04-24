import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";
import type { CompareDetailPage } from "@/lib/compare-detail-pages";

type BottomFunnelComparePageProps = {
  page: CompareDetailPage;
};

export function BottomFunnelComparePage({
  page,
}: BottomFunnelComparePageProps) {
  const breadcrumbs = {
    "/compare": "Compare",
    [page.path]: page.h1,
  };

  return (
    <>
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
              <Link href="/compare" className="transition hover:text-slate-900">
                Compare
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
                <div className="max-w-3xl space-y-4 text-lg leading-8 text-slate-700">
                  {page.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/start?src=compare-hero"
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    Start with Zaza Draft
                  </Link>
                  <Link
                    href="/parent-email-risk-checker?src=compare-hero"
                    className="inline-flex items-center rounded-full border border-[#d7ccbd] bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    Try the free tone and risk checker
                  </Link>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Quick answer
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-800">
                  {page.quickAnswer}
                </p>
                <div className="mt-6 rounded-3xl border border-[#e7ded1] bg-[#fbf8f2] p-5">
                  <h2 className="text-lg font-semibold text-slate-950">
                    Trust reminder
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    Any AI draft still needs teacher review. The difference here
                    is whether the tool helps reduce tone mistakes and review
                    strain before the message leaves your outbox.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Comparison
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {page.comparisonTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                {page.comparisonIntro}
              </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-[#e7ded1]">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#e7ded1] text-left text-sm">
                  <thead className="bg-[#f8f3eb] text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-medium">Comparison area</th>
                      {page.comparisonTable.columns.map((column) => (
                        <th key={column} className="px-4 py-3 font-medium">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7ded1] bg-white text-slate-700">
                    {page.comparisonTable.rows.map((row) => (
                      <tr key={row.label}>
                        <td className="px-4 py-4 font-medium text-slate-950">
                          {row.label}
                        </td>
                        {row.values.map((value, index) => (
                          <td
                            key={`${row.label}-${index}`}
                            className="px-4 py-4"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {page.comparisonTable.note}
            </p>
          </section>

          <section className="space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Best fit
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {page.bestForTitle}
              </h2>
            </div>
            <div
              className={`grid gap-4 ${
                page.bestForCards.length === 3
                  ? "md:grid-cols-3"
                  : "md:grid-cols-2"
              }`}
            >
              {page.bestForCards.map((card) => (
                <article
                  key={card.tool}
                  className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {card.tool}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                    {card.items.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
            <article className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                {page.otherToolsUsefulTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                {page.otherToolsUsefulIntro}
              </p>
              <div className="mt-6 space-y-4">
                {page.otherToolsUsefulCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-[#e7ded1] bg-[#fbf8f2] p-5"
                  >
                    <h3 className="text-lg font-semibold text-slate-950">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[32px] border border-[#cfddd8] bg-[#163f37] p-6 text-white md:p-8">
              <h2 className="text-3xl font-semibold tracking-tight">
                {page.zazaDifferentTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-emerald-50/90">
                {page.zazaDifferentIntro}
              </p>
              <div className="mt-6 space-y-4">
                {page.zazaDifferentCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-emerald-50/90">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Internal links
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {page.internalLinksTitle}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {page.internalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 transition hover:bg-white"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Teacher scenario
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
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                FAQ
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Questions teachers ask before choosing
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
                {page.ctaTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">
                {page.ctaBody}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/start?src=compare-bottom"
                  className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123f34] transition hover:bg-[#f3efe7]"
                >
                  Go to /start
                </Link>
                <Link
                  href="/parent-email-risk-checker?src=compare-bottom"
                  className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Try the free checker
                </Link>
              </div>
            </article>

            <article className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                {page.checkerCtaTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                {page.checkerCtaBody}
              </p>
              <Link
                href="/parent-email-risk-checker?src=compare-side"
                className="mt-6 inline-flex items-center rounded-full border border-[#164e3f] px-5 py-3 text-sm font-semibold text-[#164e3f] transition hover:bg-[#164e3f] hover:text-white"
              >
                Open the free checker
              </Link>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}
