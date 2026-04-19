"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoModal } from "@/components/demo-modal";
import { useState } from "react";
import { track, trackCtaClick } from "@/lib/analytics";
import { DraftDemo } from "@/components/draft-demo";
import { getDraftPricingHref } from "@/lib/draft-cta";

export default function DraftClient() {
  const { t, language } = useLanguage();
  const [demoOpen, setDemoOpen] = useState(false);
  const pricingHref = getDraftPricingHref(language);
  const aboutFounderHref =
    language === "de" ? "/de/about/founder-story" : "/about/founder-story";
  const heroSubheadline =
    language === "de"
      ? "Hoeren Sie auf, jedes Wort zu zerdenken. Draft hilft Ihnen, ruhige, professionelle Eltern-E-Mails, wertvollere Zeugnisbemerkungen und belastbare Schulnachrichten zu schreiben, die Sie mit Sicherheit senden oder einreichen koennen."
      : "Stop agonising over every word. Draft helps you write calm, professional parent emails, more meaningful report comments, and defensible school messages you can send with confidence.";
  const heroContextLine =
    language === "de"
      ? "Du siehst Zaza Draft - den ruhigen, sicheren Co-Writer fuer Lehrkraefte."
      : "You're viewing Zaza Draft - the calm, safe co-writer for teachers.";
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
          "Eine Zeugnisbemerkung klingt noch zu offensichtlich und sagt Eltern nichts Neues.",
          "Sie brauchen Formulierungen, die Beziehungen und Ihre Professionalität schützen.",
        ]
      : [
          "A parent disputes a grade and copies in senior leadership.",
          "A behaviour update could be forwarded beyond the original thread.",
          "The email tone is escalating and you still need to stay calm.",
          "A report comment still sounds obvious and does not tell parents anything useful.",
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
      ? "Starter enthaelt 10 Nachrichten pro Monat. Upgrade jederzeit, wenn du mehr Entwuerfe und Ueberarbeitungen brauchst."
      : "Starter includes 10 messages each month. Upgrade any time when you need more drafts and revisions.";
  const inviteLine =
    language === "de"
      ? "Teacher schaltet unbegrenzte Entwuerfe, Tone Tutor und erweiterte Unterstuetzung fuer sensible Kommunikation frei."
      : "Teacher unlocks unlimited drafts, Tone Tutor, and deeper support for sensitive communication.";
  const urgencyLine =
    language === "de"
      ? "Waehl auf der Preisseite den Plan, der zu deinem Arbeitsalltag passt."
      : "Use the pricing page to choose the plan that fits your workload.";
  const nextSteps =
    language === "de"
      ? [
          "Plan waehlen",
          "Mit Starter beginnen oder auf Teacher upgraden",
          "Nachrichten direkt in Draft schreiben und ueberarbeiten",
        ]
      : [
          "Choose your plan",
          "Start with Starter or upgrade to Teacher",
          "Write and revise messages in Draft right away",
        ];
  const betaFeedbackHeading =
    language === "de"
      ? "Draft ist bereit fuer deinen Arbeitsalltag"
      : "Draft is ready for your workflow";
  const betaFeedbackBody =
    language === "de"
      ? "Sieh dir die aktuellen Plaene an und starte mit Draft fuer Eltern-E-Mails, Zeugnisbemerkungen und andere sensible Nachrichten."
      : "See the live plans and start using Draft for parent emails, report comments, and other sensitive messages.";
  const betaFeedbackCta = language === "de" ? "Preise ansehen" : "See pricing";
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
  const insightLinksHeading =
    language === "de"
      ? "Mehr Hilfe fuer bessere E-Mails und aussagekraeftigere Berichte"
      : "More help for better emails and more meaningful reports";
  const insightLinksBody =
    language === "de"
      ? "Professional ist nicht gleich kalt. Gute Zeugnisbemerkungen sagen Eltern etwas, das sie noch nicht wissen. Diese Guides vertiefen genau diese beiden Punkte."
      : "Professional is not the same as cold. Good report comments tell parents something they do not already know. These guides go deeper on both ideas.";
  const insightLinks =
    language === "de"
      ? [
          {
            href: "/professional-parent-emails-for-teachers",
            title: "Professionelle Eltern-E-Mails fuer Lehrkraefte",
            body: "Praktische Hilfe fuer klare, kurze und professionell klingende Elternkommunikation.",
          },
          {
            href: "/teacher-email-tone-guide",
            title: "Leitfaden zum E-Mail-Ton mit Eltern",
            body: "Woran man erkennt, wenn eine Mail defensiv, zu direkt oder leicht missverstaendlich klingt.",
          },
          {
            href: "/how-to-write-better-report-comments",
            title: "Wie man bessere Zeugnisbemerkungen schreibt",
            body: "Mehr Tiefe, mehr Aussagekraft, weniger generische Formulierungen in Berichten.",
          },
          {
            href: "/what-parents-already-know-report-comments",
            title:
              "Keine Zeugnisbemerkungen mehr schreiben, die Eltern schon kennen",
            body: "Ein klarer Blick darauf, wie Kommentare mehr professionellen Mehrwert fuer Eltern liefern koennen.",
          },
        ]
      : [
          {
            href: "/professional-parent-emails-for-teachers",
            title: "Professional Parent Emails for Teachers",
            body: "Practical guidance on writing clear, concise parent emails that still sound warm and professional.",
          },
          {
            href: "/teacher-email-tone-guide",
            title: "A Teacher's Guide to Email Tone with Parents",
            body: "Spot the lines that may read as defensive, too blunt, or easy to misread before you send them.",
          },
          {
            href: "/how-to-write-better-report-comments",
            title: "How to Write Better Report Comments",
            body: "Write comments that say something more useful than broad praise and familiar observations.",
          },
          {
            href: "/what-parents-already-know-report-comments",
            title: "Stop Writing Report Comments Parents Already Know",
            body: "See how to move from obvious wording to comments that add real parent value.",
          },
        ];
  const founderTopLink =
    language === "de" ? "Gründerstory lesen" : "Read the founder story";
  const gdprLine =
    language === "de"
      ? "Ihre Texte bleiben Ihre Texte. Draft trainiert nicht auf Ihren Nachrichten. Sie entscheiden, was Sie einfügen und senden."
      : "Your text stays yours. Draft does not train on your messages. You control what you paste and what you send.";
  const privacyLinkLabel = language === "de" ? "Privacy" : "Privacy";
  const screenshotCaption =
    language === "de"
      ? "Produktvorschau - Draft Arbeitsbereich"
      : "Product preview - Draft workspace";
  const screenshotHonestyLine =
    language === "de"
      ? "Die gezeigte Produktvorschau entwickelt sich weiter, waehrend der Zugang schrittweise oeffnet."
      : "The product preview is evolving as access opens in stages.";
  const comparisonExamplesHeading =
    language === "de"
      ? "Was besseres Formulieren in Draft praktisch bedeutet"
      : "What better wording looks like inside Draft";
  const comparisonExamplesIntro =
    language === "de"
      ? "Draft ist nicht nur dazu da, schneller Text auszugeben. Es hilft dabei, professioneller, klarer und wertvoller zu formulieren."
      : "Draft is not there to generate text faster for the sake of it. It helps teachers make the final wording more professional, clearer, and more useful.";
  const comparisonExamples =
    language === "de"
      ? [
          {
            title: "Kalt vs professionell",
            weakerLabel: "Klingt kuehl",
            weaker:
              "Ich habe Ihre Nachricht erhalten. Oliver muss sein Verhalten verbessern.",
            strongerLabel: "Klingt professionell",
            stronger:
              "Danke fuer Ihre Nachricht. Ich wollte kurz schildern, was heute passiert ist und wie wir Oliver weiter dabei unterstuetzen, positive Verhaltensmuster aufzubauen.",
          },
          {
            title: "Offensichtlich vs aussagekraeftig",
            weakerLabel: "Zu offensichtlich",
            weaker: "Ava ist freundlich und arbeitet hart.",
            strongerLabel: "Sagt mehr",
            stronger:
              "Ava arbeitet zuverlaessig und aufmerksam. Besonders stark ist ihre Faehigkeit, Feedback ruhig aufzunehmen und ihre Arbeit danach durchdacht zu verbessern.",
          },
        ]
      : [
          {
            title: "Cold vs professional",
            weakerLabel: "Reads colder",
            weaker:
              "I have received your email. Oliver needs to improve his behaviour.",
            strongerLabel: "Reads more professional",
            stronger:
              "Thank you for your email. I wanted to briefly share what happened today and how we are continuing to support Oliver in building more positive classroom habits.",
          },
          {
            title: "Obvious vs meaningful",
            weakerLabel: "Too obvious",
            weaker: "Ava is kind and works hard.",
            strongerLabel: "Adds more value",
            stronger:
              "Ava works with steady concentration and responds thoughtfully to feedback. She is particularly strong at refining her work once she has reflected on the next step.",
          },
        ];

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
                      onClick={() => {
                        trackCtaClick({
                          ctaText: t("products.draft.hero.cta.primary"),
                          ctaLocation: "draft_hero",
                        });
                        track("cta_click_draft_start_free", {
                          language,
                          source: "hero",
                        });
                      }}
                    >
                      <Link href={pricingHref}>
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
                  src="/shared-teacher-desk-hero.jpg"
                  alt="Teacher working at a desk with a laptop in a warm classroom setting"
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

        <section className="py-12 bg-[#0F172A]">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="rounded-3xl border border-[#374151] bg-[#111827] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
                {language === "de"
                  ? "Vergleiche aus dem echten Schulalltag"
                  : "Real writing comparisons"}
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-[#F9FAFB]">
                {comparisonExamplesHeading}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[#CBD5E1]">
                {comparisonExamplesIntro}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {comparisonExamples.map((example) => (
                  <div
                    key={example.title}
                    className="rounded-2xl border border-[#374151] bg-[#0B1220] p-5"
                  >
                    <h3 className="text-lg font-semibold text-[#F9FAFB]">
                      {example.title}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-2xl border border-rose-400/15 bg-rose-400/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-200">
                          {example.weakerLabel}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#E5E7EB]">
                          {example.weaker}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                          {example.strongerLabel}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white">
                          {example.stronger}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#0F172A]">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="rounded-3xl border border-[#374151] bg-[#111827] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
                Better judgement in writing
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-[#F9FAFB]">
                {insightLinksHeading}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[#CBD5E1]">
                {insightLinksBody}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {insightLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-[#374151] bg-[#0B1220] p-5 transition hover:border-[#A78BFA] hover:bg-[#111827]"
                  >
                    <p className="text-lg font-semibold text-[#F9FAFB]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                      {item.body}
                    </p>
                  </Link>
                ))}
              </div>
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
                <Link href={pricingHref}>{betaFeedbackCta}</Link>
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
                <Link href={pricingHref}>
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
