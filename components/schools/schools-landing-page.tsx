import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle2 } from "lucide-react";

import { JsonLdCollection } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createBreadcrumbJsonLd,
  createFAQPageJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";

import type { SchoolsContent } from "./content";

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function DemoCta({
  content,
  secondaryLabel,
  secondaryHref,
  className,
  microcopy,
}: {
  content: SchoolsContent;
  secondaryLabel: string;
  secondaryHref: string;
  className?: string;
  microcopy?: string[];
}) {
  const copy = microcopy ?? content.cta.microcopy;

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          asChild
          size="lg"
          className="h-11 rounded-full px-6 text-sm font-semibold"
        >
          <Link href={content.demoHref}>
            {content.cta.primary}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Link
          href={secondaryHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
        >
          {secondaryLabel}
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-1 text-xs leading-6 text-slate-500 sm:text-sm">
        {copy.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export function SchoolsLandingPage({ content }: { content: SchoolsContent }) {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: `${content.locale}-schools-webpage-schema`,
            data: createWebPageJsonLd({
              name: content.brandLabel,
              description: content.hero.description,
              path: content.path,
              keywords: [
                content.brandLabel,
                content.locale === "de"
                  ? "Schul-Kommunikationssystem"
                  : "school communication support system",
                content.locale === "de"
                  ? "Schulleitungsdemo"
                  : "leadership demo",
              ],
              potentialActionName: content.cta.primary,
            }),
          },
          {
            id: `${content.locale}-schools-breadcrumb-schema`,
            data: createBreadcrumbJsonLd([
              {
                name: content.locale === "de" ? "Startseite" : "Home",
                path: content.locale === "de" ? "/de" : "/",
              },
              { name: content.brandLabel, path: content.path },
            ]),
          },
          {
            id: `${content.locale}-schools-faq-schema`,
            data: createFAQPageJsonLd(
              content.faq.items.map((item) => ({
                question: item.question,
                answer: item.answer,
              })),
            ),
          },
        ]}
      />

      <main className="bg-white text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.18),transparent_38%),radial-gradient(circle_at_top_right,_rgba(217,119,6,0.10),transparent_28%),linear-gradient(180deg,#f8f6f2_0%,#ffffff_56%,#f8fafc_100%)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center lg:px-12 lg:py-24">
            <div className="max-w-2xl space-y-8">
              <div className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm backdrop-blur">
                {content.hero.badge}
              </div>

              <div className="space-y-5">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  {content.hero.title}
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                  {content.hero.description}
                </p>
                <p className="max-w-xl text-base leading-8 text-slate-500">
                  {content.hero.support}
                </p>
              </div>

              <div className="space-y-3">
                <DemoCta
                  content={content}
                  secondaryLabel={content.cta.secondary}
                  secondaryHref="#how-it-works"
                />
                <p className="max-w-lg text-sm leading-7 text-slate-500">
                  {content.cta.finalSupport}
                </p>
              </div>

              <dl className="grid gap-4 pt-3 sm:grid-cols-3">
                {content.hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur"
                  >
                    <dt className="text-sm text-slate-500">{stat.label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-amber-200/40 blur-3xl lg:block" />
              <div className="absolute -right-8 bottom-4 hidden h-28 w-28 rounded-full bg-slate-300/40 blur-3xl lg:block" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <Image
                    src={content.heroImage}
                    alt={content.heroImageAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/10" />
                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-slate-950/70 p-5 text-white shadow-lg backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-200/90">
                      {content.hero.imageOverlayLabel}
                    </p>
                    <p className="mt-3 text-lg font-semibold leading-7">
                      {content.hero.imageOverlayText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.problemStrip.map(
                ({ title, description, icon: Icon }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <Icon className="size-5 text-amber-300" />
                    <h2 className="mt-4 text-base font-semibold">{title}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {description}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div className="space-y-6">
                <SectionIntro
                  eyebrow={content.proof.eyebrow}
                  title={content.proof.title}
                  description={content.proof.description}
                />
                <p className="max-w-2xl text-sm leading-7 text-slate-500">
                  {content.proof.note}
                </p>
                <DemoCta
                  content={content}
                  secondaryLabel={content.cta.pricingSecondary}
                  secondaryHref="#commercial-model"
                  microcopy={content.cta.microcopy.slice(0, 2)}
                />
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <Card className="rounded-[1.75rem] border-slate-200 bg-slate-50 py-0 shadow-none">
                  <CardHeader className="px-7 pt-7">
                    <CardTitle className="text-lg tracking-[0.16em] uppercase text-slate-500">
                      {content.proof.beforeLabel}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-7 pb-7 pt-0">
                    <p className="text-base leading-8 text-slate-700">
                      {content.proof.beforeText}
                    </p>
                  </CardContent>
                </Card>
                <Card className="rounded-[1.75rem] border-slate-900 bg-slate-950 py-0 text-white shadow-sm">
                  <CardHeader className="px-7 pt-7">
                    <CardTitle className="text-lg tracking-[0.16em] uppercase text-amber-300">
                      {content.proof.afterLabel}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-7 pb-7 pt-0">
                    <p className="text-base leading-8 text-slate-200">
                      {content.proof.afterText}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <SectionIntro
                eyebrow={content.leadershipPain.eyebrow}
                title={content.leadershipPain.title}
                description={content.leadershipPain.description}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                {content.leadershipPain.cards.map((card) => (
                  <Card
                    key={card.title}
                    className="h-full rounded-[1.75rem] border-slate-200 bg-slate-50/80 py-0 shadow-none"
                  >
                    <CardHeader className="px-7 pt-7">
                      <CardTitle className="text-xl leading-8 text-slate-950">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-7 pb-7 pt-0">
                      <p className="text-sm leading-7 text-slate-600">
                        {card.body}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-b border-slate-200 bg-slate-50"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div className="space-y-8">
                <SectionIntro
                  eyebrow={content.howItWorks.eyebrow}
                  title={content.howItWorks.title}
                  description={content.howItWorks.description}
                />
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-slate-100">
                    <Image
                      src={content.rolloutImage}
                      alt={content.rolloutImageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 34vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-white/10" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {content.howItWorks.steps.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Step {item.step}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">
                          {item.title}
                        </h3>
                      </div>
                      <div className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                        {content.howItWorks.tag}
                      </div>
                    </div>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
              <SectionIntro
                eyebrow={content.inclusions.eyebrow}
                title={content.inclusions.title}
                description={content.inclusions.description}
              />

              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                      {content.inclusions.badge}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                      {content.inclusions.heading}
                    </h3>
                  </div>
                  <Briefcase className="size-10 text-amber-300" />
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {content.inclusions.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-amber-300" />
                        <p className="text-sm leading-7 text-slate-200">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionIntro
                eyebrow={content.scenarios.eyebrow}
                title={content.scenarios.title}
                description={content.scenarios.description}
              />
              <DemoCta
                content={content}
                className="lg:pb-1"
                secondaryLabel={content.cta.pricingSecondary}
                secondaryHref="#commercial-model"
                microcopy={content.cta.microcopy.slice(0, 2)}
              />
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {content.scenarios.items.map((scenario) => (
                <div
                  key={scenario}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-base font-medium leading-8 text-slate-900">
                    {scenario}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <SectionIntro
                eyebrow={content.comparison.eyebrow}
                title={content.comparison.title}
                description={content.comparison.description}
              />

              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-sm">
                <div className="grid gap-px bg-white/10 md:grid-cols-2">
                  <div className="bg-slate-900/90 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                      {content.comparison.genericLabel}
                    </p>
                  </div>
                  <div className="bg-slate-900 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                      {content.comparison.zazaLabel}
                    </p>
                  </div>
                  {content.comparison.rows.map((row) => (
                    <div key={row.generic} className="contents">
                      <div className="bg-slate-900/85 p-6 text-sm leading-7 text-slate-300">
                        {row.generic}
                      </div>
                      <div className="bg-slate-900 p-6 text-sm leading-7 text-white">
                        {row.zaza}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="commercial-model"
          className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionIntro
                eyebrow={content.commercial.eyebrow}
                title={content.commercial.title}
                description={content.commercial.description}
              />
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">
                  {content.commercial.supportBox}
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 xl:grid-cols-3">
              {content.commercial.tiers.map((option) => (
                <Card
                  key={option.name}
                  className="rounded-[1.75rem] border-slate-200 bg-white py-0 shadow-sm"
                >
                  <CardHeader className="px-7 pt-7">
                    <CardTitle className="text-2xl tracking-tight text-slate-950">
                      {option.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-7 text-slate-600">
                      {option.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-7 pb-7 pt-0">
                    <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                      {content.commercial.scopeLabel}
                    </div>
                    <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                      {option.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <CheckCircle2 className="mt-1 size-4 shrink-0 text-slate-900" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-8 text-white shadow-sm lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                  {content.commercial.ctaLabel}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  {content.commercial.ctaTitle}
                </h3>
                <div className="mt-3 flex flex-col gap-1 text-sm leading-7 text-slate-300">
                  {content.cta.finalMicrocopy.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                <Link href={content.demoHref}>
                  {content.cta.primary}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <SectionIntro
                eyebrow={content.faq.eyebrow}
                title={content.faq.title}
                description={content.faq.description}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {content.faq.items.map((item) => (
                  <Card
                    key={item.question}
                    className="rounded-[1.5rem] border-slate-200 bg-slate-50 py-0 shadow-none"
                  >
                    <CardHeader className="px-6 pt-6">
                      <CardTitle className="text-lg leading-7 text-slate-950">
                        {item.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-0">
                      <p className="text-sm leading-7 text-slate-600">
                        {item.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8 lg:px-12 lg:py-24">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
              {content.finalCta.eyebrow}
            </p>
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {content.finalCta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {content.finalCta.description}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                <Link href={content.demoHref}>
                  {content.cta.primary}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="flex flex-col gap-1 text-sm leading-7 text-slate-400">
                {content.cta.finalMicrocopy.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
