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
  const heroSubheadline =
    language === "de"
      ? "Hören Sie auf, jedes Wort zu zerdenken. Draft hilft Ihnen, ruhige, belastbare Nachrichten zu schreiben, die Sie mit Sicherheit senden können."
      : "Stop agonising over every word. Draft helps you write calm, defensible messages you can send with confidence.";
  const heroContextLine =
    language === "de"
      ? "Du siehst Zaza Draft - den ruhigen, sicheren E-Mail-Co-Writer für Lehrkräfte."
      : "You're viewing Zaza Draft - the calm, safe email co-writer for teachers.";
  const heroExamplesLabel =
    language === "de" ? "Beispiele ansehen" : "See examples";
  const situationsHeading =
    language === "de"
      ? "Situationen, die Sie kennen"
      : "Situations you'll recognise";
  const situationsProofLine = t("products.draft.situations.proofLine");
  const situationsStatLine = t("products.draft.situations.statLine");
  const situationsBullets =
    language === "de"
      ? [
          "Ein Elternteil stellt eine Note infrage und setzt die Schulleitung in CC.",
          "Ein Verhaltenshinweis könnte ausserhalb des ursprünglichen Gesprächs weitergeleitet werden.",
          "Der Ton in der Mail eskaliert und Sie müssen trotzdem ruhig bleiben.",
          "Sie brauchen Formulierungen, die Beziehungen und Ihre Professionalität schützen.",
        ]
      : [
          "A parent disputes a grade and copies in senior leadership.",
          "A behaviour update could be forwarded beyond the original thread.",
          "The email tone is escalating and you still need to stay calm.",
          "You need wording that protects relationships and your professional judgement.",
        ];
  const protectionHeading =
    language === "de" ? "Wie Draft Sie schützt" : "How Draft protects you";
  const protectionBullets =
    language === "de"
      ? [
          "Keine erfundenen Details - Draft erfindet keine Informationen zu Schülern oder Elternkontakten.",
          "Sie behalten die Kontrolle - Sie prüfen und bearbeiten jede Nachricht vor dem Senden.",
          "Schultauglich als Standard - Leitplanken halten Ton und Sprache professionell und passend.",
        ]
      : [
          "No invented details - Draft does not make up student information or parent interactions.",
          "You stay in control - You approve and edit every message before sending.",
          "School-safe by default - Tone guardrails keep language professional and appropriate.",
        ];
  const nextStepsHeading =
    language === "de" ? "Wie geht es weiter" : "What happens next";
  const commitmentLine =
    language === "de"
      ? "Early Access ist kostenlos. Erhalte deinen ersten Entwurf in Minuten. Keine Karte erforderlich."
      : "Early access is free. Get your first draft in minutes. No card required.";
  const inviteLine =
    language === "de"
      ? "Wir senden Ihnen eine E-Mail, wenn Ihre Einladung bereit ist - meist innerhalb weniger Tage."
      : "We'll email you when your invite is ready - usually within a few days.";
  const urgencyLine =
    language === "de"
      ? "Early-Access-Mitglieder gestalten das Produkt mit und behalten ihren Startpreis zum Launch."
      : "Early access members shape the product and keep their rate when we launch.";
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
  const restoreHeading =
    language === "de"
      ? "So stellt Draft Klarheit wieder her"
      : "How Draft restores clarity";
  const restoreSteps =
    language === "de"
      ? [
          "Sie fügen einen angespannten Entwurf ein - zum Beispiel bei einer Notenbeschwerde mit Schulleitung in CC.",
          "Draft entfernt vorwurfsvolle Formulierungen, ordnet die Fakten und hält den Ton professionell.",
          "Sie senden eine Nachricht, die Sie, den Schüler und die Beziehung zur Familie schützt.",
        ]
      : [
          "You paste a tense draft - for example, a grade dispute email with senior leadership CC'd.",
          "Draft removes blame language, keeps facts clear, and sets a professional tone.",
          "You send a message that protects you, the student, and the school relationship.",
        ];
  const founderTopLine =
    language === "de"
      ? "Entwickelt von Dr Greg Blackburn (PhD, Professional Education) in Deutschland."
      : "Built by Dr Greg Blackburn (PhD, Professional Education) in Germany.";
  const founderTopBody =
    language === "de"
      ? "Draft wurde entwickelt, um Sunday-night E-Mail-Stress zu reduzieren und Lehrkräften zu helfen, Nachrichten zu schreiben, die auch ausserhalb des Kontexts standhalten."
      : "Draft exists to reduce Sunday-night email stress and help teachers write messages that hold up out of context.";
  const founderTopLink =
    language === "de" ? "Gründerstory lesen" : "Read the founder story";
  const gdprLine =
    language === "de"
      ? "Ihre Texte bleiben Ihre Texte. Draft trainiert nicht auf Ihren Nachrichten. Sie entscheiden, was Sie einfügen und senden."
      : "Your text stays yours. Draft does not train on your messages. You control what you paste and what you send.";
  const privacyLinkLabel = language === "de" ? "Privacy" : "Privacy";
  const screenshotCaption =
    language === "de"
      ? "Produkt-Screenshot - Early-Access-UI"
      : "Product screenshot - early access UI";
  const screenshotHonestyLine =
    language === "de"
      ? "Die Early-Access-UI entwickelt sich mit Feedback von Lehrkräften weiter."
      : "Early access UI is evolving with teacher feedback.";

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
                  {heroSubheadline}
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
                    <p className="text-xs text-[#9CA3AF]">{inviteLine}</p>
                    <p className="text-xs text-[#9CA3AF]">{urgencyLine}</p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-[#374151] bg-transparent text-[#F9FAFB] hover:bg-[#1F2937] rounded-xl"
                  >
                    <Link
                      href="#examples"
                      className="inline-flex items-center gap-2"
                      onClick={() =>
                        track("cta_click_draft_see_examples", {
                          language,
                          source: "hero",
                        })
                      }
                    >
                      {heroExamplesLabel}
                      <span aria-hidden="true">↓</span>
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-[#9CA3AF]">
                  {t("products.draft.hero.privacyLine")}
                </p>
                <p className="text-sm text-[#9CA3AF]">
                  {gdprLine}{" "}
                  <Link
                    href={language === "de" ? "/de/privacy" : "/privacy"}
                    className="text-[#A78BFA] hover:text-[#C4B5FD]"
                  >
                    {privacyLinkLabel}
                  </Link>
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

        {/* Situations */}
        <section className="py-12 bg-[#111827]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F9FAFB] mb-6">
              {situationsHeading}
            </h2>
            <ul className="space-y-4">
              {situationsBullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
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
                  <span className="text-lg text-[#D1D5DB]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-[#374151] bg-[#0B1220] p-4">
              <p className="text-sm font-semibold text-[#E5E7EB]">
                {situationsStatLine}
              </p>
              <p className="text-sm text-[#9CA3AF] mt-1">
                {situationsProofLine}
              </p>
            </div>
          </div>
        </section>

        {/* Founder note */}
        <section className="py-6">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Card className="bg-[#111827] border-[#1F2937] p-5">
              <p className="text-sm text-[#CBD5E1]">{founderTopLine}</p>
              <p className="text-sm text-[#CBD5E1] mt-2">{founderTopBody}</p>
              <Link
                href={aboutFounderHref}
                className="inline-block mt-3 text-sm text-[#A78BFA] hover:text-[#C4B5FD]"
              >
                {founderTopLink}
              </Link>
            </Card>
          </div>
        </section>

        {/* Protection micro section */}
        <section className="py-6">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Card className="bg-[#111827] border-[#1F2937] p-5">
              <h2 className="text-lg md:text-xl font-semibold text-[#F9FAFB] mb-3">
                {protectionHeading}
              </h2>
              <ul className="space-y-2">
                {protectionBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm text-[#CBD5E1] leading-relaxed"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
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

        {/* High-stakes 3-step section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-center mb-12">
              {restoreHeading}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {restoreSteps.map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <p className="text-[#D1D5DB]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights & Interface showcase */}
        <section className="py-16 bg-gradient-to-r from-[#111827] via-[#0B1220] to-[#050A16]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
            <p className="text-sm text-[#9CA3AF] text-center">
              {screenshotHonestyLine}
            </p>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="relative w-full min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-[#070B16]">
                  <Image
                    src="/images/insights-dashboard.png"
                    alt={t("products.draft.insights.imageAlt")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
                <p className="mt-3 text-xs text-[#9CA3AF]">
                  {screenshotCaption}
                </p>
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
              <div className="order-1 lg:order-2">
                <div className="relative w-full min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-[#070B16]">
                  <Image
                    src="/images/draft-interface.png"
                    alt={t("products.draft.interface.imageAlt")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
                <p className="mt-3 text-xs text-[#9CA3AF]">
                  {screenshotCaption}
                </p>
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
              <p className="text-xs text-[#9CA3AF] mt-1">{inviteLine}</p>
              <p className="text-xs text-[#9CA3AF] mt-1">{urgencyLine}</p>
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
            <p className="text-xs text-white/85 mt-1">{inviteLine}</p>
            <p className="text-xs text-white/85 mt-1">{urgencyLine}</p>
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
