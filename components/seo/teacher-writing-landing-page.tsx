import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildTeacherWritingJsonLd } from "@/lib/seo/teacher-writing-schema";
import {
  getTeacherWritingPageOrThrow,
  type TeacherWritingPage,
} from "@/lib/seo/teacher-writing-pages";

interface TeacherWritingLandingPageProps {
  page: TeacherWritingPage;
  jsonLd?: Record<string, unknown>[];
}

function SectionCard({
  title,
  body,
  bullets,
  exampleLabel,
  exampleBody,
}: TeacherWritingPage["sections"][number]) {
  return (
    <Card className="border-white/10 bg-white/5 py-0 shadow-none">
      <CardContent className="space-y-5 px-6 py-6 md:px-8 md:py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h2>
        <div className="space-y-4 text-base leading-8 text-slate-300">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {bullets && bullets.length > 0 ? (
          <ul className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {exampleBody ? (
          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-100">
              {exampleLabel ?? "Example"}
            </p>
            <div className="whitespace-pre-wrap text-sm leading-7 text-amber-50">
              {exampleBody}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function ComparisonTable({ page }: { page: TeacherWritingPage }) {
  if (!page.comparisonBlock) {
    return null;
  }

  const { comparisonBlock } = page;

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-teal-200/80">
          Comparison
        </p>
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          {comparisonBlock.title}
        </h2>
        <p className="max-w-3xl text-base leading-8 text-slate-300">
          {comparisonBlock.intro}
        </p>
      </div>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/5 text-left text-slate-200">
            <tr>
              <th className="px-5 py-4 font-semibold">Area</th>
              <th className="px-5 py-4 font-semibold">Zaza Draft</th>
              <th className="px-5 py-4 font-semibold">
                {comparisonBlock.alternativeLabel}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-slate-300">
            {comparisonBlock.rows.map((row) => (
              <tr key={row.label}>
                <td className="px-5 py-4 font-medium text-white">
                  {row.label}
                </td>
                <td className="px-5 py-4">{row.zaza}</td>
                <td className="px-5 py-4">{row.alternative}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {comparisonBlock.note ? (
        <p className="text-sm text-slate-400">{comparisonBlock.note}</p>
      ) : null}
    </section>
  );
}

function TrustBlock({ page }: { page: TeacherWritingPage }) {
  if (!page.trustBlock) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-200/80">
          Trust
        </p>
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          {page.trustBlock.title}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {page.trustBlock.items.map((item) => (
          <Card
            key={item.title}
            className="border-white/10 bg-white/5 py-0 shadow-none"
          >
            <CardContent className="space-y-3 px-6 py-6">
              <div className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 p-2 text-emerald-100">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-300">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQBlock({ page }: { page: TeacherWritingPage }) {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">FAQ</p>
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Frequently asked questions
        </h2>
      </div>
      <div className="space-y-3">
        {page.faq.map((item) => (
          <details
            key={item.question}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
          >
            <summary className="cursor-pointer list-none font-medium text-white">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function InternalLinksBlock({ page }: { page: TeacherWritingPage }) {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Internal linking
        </p>
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Suggested next clicks
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {page.internalLinks.map((link) => (
          <Card
            key={link.href}
            className="border-white/10 bg-white/5 py-0 shadow-none"
          >
            <CardContent className="space-y-3 px-6 py-6">
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 text-lg font-semibold text-white transition hover:text-teal-100"
              >
                {link.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-sm leading-7 text-slate-300">
                {link.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function RelatedPagesBlock({ page }: { page: TeacherWritingPage }) {
  const relatedPages = page.relatedSlugs.flatMap((slug) => {
    try {
      return [getTeacherWritingPageOrThrow(slug)];
    } catch {
      return [];
    }
  });

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Related guides
        </p>
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Keep exploring teacher writing help
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {relatedPages.map((relatedPage) => (
          <Card
            key={relatedPage.slug}
            className="border-white/10 bg-white/5 py-0 shadow-none"
          >
            <CardContent className="space-y-3 px-6 py-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {relatedPage.intent}
              </p>
              <Link
                href={`/${relatedPage.slug}`}
                className="text-lg font-semibold text-white transition hover:text-teal-100"
              >
                {relatedPage.h1}
              </Link>
              <p className="text-sm leading-7 text-slate-300">
                {relatedPage.description}
              </p>
            </CardContent>
          </Card>
        ))}
        <Card className="border-white/10 bg-white/5 py-0 shadow-none">
          <CardContent className="space-y-3 px-6 py-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Primary CTA
            </p>
            <Link
              href="/start"
              className="text-lg font-semibold text-white transition hover:text-teal-100"
            >
              Try Zaza Draft
            </Link>
            <p className="text-sm leading-7 text-slate-300">
              Use Zaza Draft before sending if the message needs calmer,
              clearer, more defensible wording.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function CTASection({ page }: { page: TeacherWritingPage }) {
  return (
    <section className="rounded-[32px] border border-teal-200/20 bg-gradient-to-br from-teal-300/10 via-white/5 to-amber-200/10 p-8 md:p-10">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-teal-100/80">
          CTA
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {page.cta.title}
        </h2>
        <p className="max-w-2xl text-base leading-8 text-slate-200">
          {page.cta.body}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          asChild
          className="bg-teal-200 text-slate-950 hover:bg-teal-100"
        >
          <Link href={page.cta.primaryHref}>{page.cta.primaryLabel}</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
        >
          <Link href={page.cta.secondaryHref}>{page.cta.secondaryLabel}</Link>
        </Button>
      </div>
    </section>
  );
}

export function TeacherWritingLandingPage({
  page,
  jsonLd: providedJsonLd,
}: TeacherWritingLandingPageProps) {
  const jsonLd = providedJsonLd ?? buildTeacherWritingJsonLd(page);

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`${page.slug}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.12),_transparent_32%),radial-gradient(circle_at_right,_rgba(251,191,36,0.08),_transparent_24%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 lg:px-8 lg:pb-24">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
                {page.heroEyebrow}
              </div>
              <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {page.h1}
              </h1>
              <div className="space-y-4 text-lg leading-8 text-slate-300">
                {page.heroDescription.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="grid gap-3 pt-2 md:grid-cols-3">
                {page.heroBullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
                  >
                    {bullet}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  className="bg-teal-200 text-slate-950 hover:bg-teal-100"
                >
                  <Link href={page.cta.primaryHref}>
                    {page.cta.primaryLabel}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  <Link href={page.cta.secondaryHref}>
                    {page.cta.secondaryLabel}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          {page.featuredSnippet ? (
            <section className="rounded-[28px] border border-teal-200/20 bg-teal-200/10 p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-50/80">
                Featured snippet answer
              </p>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-teal-50">
                {page.featuredSnippet}
              </p>
            </section>
          ) : null}

          <TrustBlock page={page} />

          <div className="space-y-6">
            {page.sections.map((section) => (
              <SectionCard key={section.id} {...section} />
            ))}
          </div>

          <ComparisonTable page={page} />
          <InternalLinksBlock page={page} />
          <FAQBlock page={page} />
          <RelatedPagesBlock page={page} />
          <CTASection page={page} />
        </main>
      </div>
    </>
  );
}
