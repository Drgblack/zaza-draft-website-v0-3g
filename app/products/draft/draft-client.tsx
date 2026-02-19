"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoModal } from "@/components/demo-modal";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { DraftDemo } from "@/components/draft-demo";

export default function DraftClient() {
  const { t, language } = useLanguage();
  const [demoOpen, setDemoOpen] = useState(false);
  const earlyAccessHref =
    language === "de" ? "/de/early-access" : "/early-access";
  const aboutFounderHref =
    language === "de" ? "/de/about/founder-story" : "/about/founder-story";
  const heroContextLine =
    language === "de"
      ? "Du siehst Zaza Draft - den ruhigen, sicheren E-Mail-Co-Writer für Lehrkräfte."
      : "You're viewing Zaza Draft - the calm, safe email co-writer for teachers.";
  const nextStepsHeading =
    language === "de" ? "Wie geht es weiter" : "What happens next";
  const commitmentLine =
    language === "de"
      ? "Early Access ist kostenlos. Erhalte deinen ersten Entwurf in Minuten. Keine Karte erforderlich."
      : "Early access is free. Get your first draft in minutes. No card required.";
  const nextSteps =
    language === "de"
      ? [
          "Early Access beitreten (30 Sekunden)",
          "Wir senden dir eine Einladung, sobald dein Zugang bereit ist",
          "Ersten Entwurf kostenlos testen - keine Karte erforderlich",
        ]
      : [
          "Join early access (30 seconds)",
          "We email you an invite when your access is ready",
          "Try your first draft free - no card required",
        ];
  const betaFeedbackHeading =
    language === "de"
      ? "Feedback aus der Beta folgt"
      : "Beta feedback is coming";
  const betaFeedbackBody =
    language === "de"
      ? "Wir onboarden gerade die erste Gruppe Lehrkräfte. Echte Zitate erscheinen hier, sobald wir sie gesammelt haben. Wenn du Draft mitgestalten möchtest, tritt dem Early Access bei."
      : "We are onboarding our first cohort of teachers now. Real quotes will appear here as soon as they are collected. If you would like to shape Draft, join early access.";
  const betaFeedbackCta =
    language === "de" ? "Early Access" : "Join Early Access";
  const founderHeading =
    language === "de"
      ? "Von einem Bildungsexperten entwickelt"
      : "Built by a learning expert";
  const founderBody =
    language === "de"
      ? "Hallo, ich bin Dr Greg Blackburn (PhD Professional Education). Seit 20 Jahren arbeite ich in Learning und EdTech - nah an Lehrkräften. Draft hilft, anspruchsvolle Schulkommunikation ruhig, sicher und professionell zu formulieren."
      : "Hi, I'm Dr Greg Blackburn (PhD Professional Education). I've spent 20 years in learning and education technology, working closely with teachers. Draft exists to make high-stakes school communication feel safe and calm.";
  const founderLinkLabel =
    language === "de" ? "Gründerstory lesen" : "Read the founder story";

  const features = [
    {
      title: t("products.draft.features.toneGuardrails.title"),
      description: t("products.draft.features.toneGuardrails.desc"),
    },
    {
      title: t("products.draft.features.translationChecks.title"),
      description: t("products.draft.features.translationChecks.desc"),
    },
    {
      title: t("products.draft.features.reviewSteps.title"),
      description: t("products.draft.features.reviewSteps.desc"),
    },
  ];

  const steps = [
    {
      number: "1",
      title: t("products.draft.howItWorks.step1.title"),
      description: t("products.draft.howItWorks.step1.desc"),
    },
    {
      number: "2",
      title: t("products.draft.howItWorks.step2.title"),
      description: t("products.draft.howItWorks.step2.desc"),
    },
    {
      number: "3",
      title: t("products.draft.howItWorks.step3.title"),
      description: t("products.draft.howItWorks.step3.desc"),
    },
  ];

  const whoItsFor = [
    t("products.draft.whoItsFor.item1"),
    t("products.draft.whoItsFor.item2"),
    t("products.draft.whoItsFor.item3"),
  ];

  return (
    <>
      <div className="min-h-screen bg-[#0B1220]">
        {/* Breadcrumbs */}
        <div className="border-b border-[#1F2937]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("nav.products"), href: "/suite" },
                { label: "Draft", href: "/products/draft" },
              ]}
            />
          </div>
        </div>

        {/* Hero */}
        <section className="py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 xl:gap-12 items-center">
              {/* Text content */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#1F2937] border border-[#374151]">
                  <span className="text-sm font-medium text-[#D1D5DB]">
                    {t("products.draft.hero.eyebrow")}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F9FAFB] leading-tight">
                  {t("products.draft.hero.title")}
                </h1>
                <p className="text-sm text-[#94A3B8]">{heroContextLine}</p>
                <p className="text-lg md:text-xl text-[#D1D5DB] leading-relaxed">
                  {t("products.draft.hero.subtitle")}
                </p>
                <p className="text-base text-[#CBD5E1] leading-relaxed">
                  {t("products.draft.hero.assumption")}
                </p>
                <p className="text-sm text-[#9CA3AF]">
                  {t("products.draft.hero.supporting")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:items-start">
                  <div className="space-y-2">
                    <div className="rounded-xl border border-[#374151] bg-[#111827]/60 p-3 text-left">
                      <p className="text-xs font-semibold text-[#E5E7EB] mb-2">
                        {nextStepsHeading}
                      </p>
                      <ol className="list-decimal pl-4 space-y-1 text-xs text-[#94A3B8]">
                        {nextSteps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="gradient-primary text-white font-medium rounded-xl"
                      onClick={() =>
                        track("cta_click_draft_start_free", {
                          language,
                          source: "hero",
                        })
                      }
                    >
                      <Link href={earlyAccessHref}>
                        {t("products.draft.hero.cta.primary")}
                      </Link>
                    </Button>
                    <p className="text-xs text-[#9CA3AF]">{commitmentLine}</p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-[#374151] bg-transparent text-[#F9FAFB] hover:bg-[#1F2937] rounded-xl"
                  >
                    <Link
                      href="#examples"
                      onClick={() =>
                        track("cta_click_draft_see_examples", {
                          language,
                          source: "hero",
                        })
                      }
                    >
                      {t("products.draft.hero.cta.secondary")}
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-[#9CA3AF]">
                  {t("products.draft.hero.privacyLine")}
                </p>
              </div>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/teacher-writing-parent-email-on-laptop.jpg"
                  alt="Teacher writing parent messages"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Turn section to agitate the problem */}
        <section className="py-12 bg-[#111827]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg text-[#D1D5DB]">
                  {t("products.draft.turn.pain1")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg text-[#D1D5DB]">
                  {t("products.draft.turn.pain2")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg text-[#D1D5DB]">
                  {t("products.draft.turn.pain3")}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-center mb-12">
              {t("products.draft.features.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-[#111827] border-[#1F2937] p-6">
                  <h3 className="text-xl font-semibold text-[#F9FAFB] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#D1D5DB]">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-[#111827]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-center mb-12">
              {t("products.draft.howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary text-white font-bold text-xl mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#D1D5DB]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights & Interface showcase */}
        <section className="py-16 bg-gradient-to-r from-[#111827] via-[#0B1220] to-[#050A16]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="relative w-full min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-[#070B16]">
                <Image
                  src="/images/insights-dashboard.png"
                  alt={t("products.draft.insights.imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
              <div className="space-y-4 text-white">
                <h3 className="text-3xl font-bold">
                  {t("products.draft.insights.heading")}
                </h3>
                <p className="text-lg text-white/80">
                  {t("products.draft.insights.body")}
                </p>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="relative w-full min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-[#070B16] order-1 lg:order-2">
                <Image
                  src="/images/draft-interface.png"
                  alt={t("products.draft.interface.imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
              <div className="space-y-4 text-white order-2 lg:order-1">
                <h3 className="text-3xl font-bold">
                  {t("products.draft.interface.heading")}
                </h3>
                <p className="text-lg text-white/80">
                  {t("products.draft.interface.body")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-center mb-8">
              {t("products.draft.whoItsFor.title")}
            </h2>
            <ul className="space-y-4">
              {whoItsFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#7C3AED] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg text-[#D1D5DB]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <DraftDemo
          language={language}
          sectionId="examples"
          onTryItYourself={() => {
            track("cta_click_draft_demo_try", { language });
            setDemoOpen(true);
          }}
        />

        {/* Change section to introduce solution */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-center mb-12">
              {t("products.draft.change.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                    {num}
                  </div>
                  <p className="text-[#D1D5DB]">
                    {t(`products.draft.change.step${num}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech note */}
        <section className="py-8 bg-[#111827]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Card className="bg-[#1F2937] border-[#374151] p-6">
              <p className="text-sm text-[#9CA3AF] text-center">
                <strong className="text-[#D1D5DB]">
                  {t("products.draft.techNote.title")}
                </strong>{" "}
                {t("products.draft.techNote.body")}
              </p>
            </Card>
          </div>
        </section>

        {/* Beta feedback placeholder */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Card className="bg-[#111827] border-[#1F2937] p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-4">
                {betaFeedbackHeading}
              </h2>
              <p className="text-[#D1D5DB] max-w-2xl mx-auto mb-6">
                {betaFeedbackBody}
              </p>
              <Button
                asChild
                className="gradient-primary text-white rounded-xl"
              >
                <Link href={earlyAccessHref}>{betaFeedbackCta}</Link>
              </Button>
              <p className="text-xs text-[#9CA3AF] mt-3">{commitmentLine}</p>
            </Card>
          </div>
        </section>

        {/* Bottom CTA band */}
        <section className="py-16 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("products.draft.cta.title")}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t("products.draft.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#7C3AED] hover:bg-gray-100 font-medium rounded-xl"
              >
                <Link href={earlyAccessHref}>
                  {t("products.draft.cta.primary")}
                </Link>
              </Button>
              <Button
                onClick={() => setDemoOpen(true)}
                size="lg"
                variant="outline"
                className="border-white/60 bg-white/10 text-white hover:bg-white/20 rounded-xl"
              >
                {t("products.draft.cta.secondary")}
              </Button>
            </div>
            <p className="text-xs text-white/85 mt-4">{commitmentLine}</p>
          </div>
        </section>

        {/* Founder trust card */}
        <section className="py-8 border-t border-[#1F2937] bg-[#0B1220]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Card className="bg-[#111827] border-[#1F2937] p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#1F2937] border border-[#374151] text-[#C4B5FD] font-semibold flex items-center justify-center mb-4">
                GB
              </div>
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-3">
                {founderHeading}
              </h3>
              <p className="text-sm text-[#CBD5E1] max-w-2xl mx-auto">
                {founderBody}
              </p>
              <Link
                href={aboutFounderHref}
                className="inline-flex mt-4 h-10 items-center justify-center rounded-xl border border-[#A78BFA]/50 px-4 text-sm text-[#A78BFA] hover:bg-[#A78BFA]/10 hover:text-[#C4B5FD]"
              >
                {founderLinkLabel}
              </Link>
            </Card>
          </div>
        </section>
      </div>

      <DemoModal
        open={demoOpen}
        onOpenChange={setDemoOpen}
        defaultProduct="Draft"
      />
    </>
  );
}
