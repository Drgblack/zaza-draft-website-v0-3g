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
import { buildStripeCheckoutPath } from "@/config/pricing";

export default function DraftClient() {
  const { t, language } = useLanguage();
  const [demoOpen, setDemoOpen] = useState(false);
  const productPath =
    language === "de" ? "/de/products/draft" : "/products/draft";
  const teacherCheckoutHref = buildStripeCheckoutPath({
    plan: "draft",
    interval: "monthly",
    currency: "EUR",
    returnPath: productPath,
  });
  const aboutFounderHref =
    language === "de" ? "/de/about/founder-story" : "/about/founder-story";
  const heroEyebrow =
    language === "de"
      ? "TOOL FUER SICHERE LEHRKRAFT-KOMMUNIKATION"
      : "TEACHER COMMUNICATION SAFETY TOOL";
  const heroTitle =
    language === "de"
      ? "Schreiben Sie heikle Schulnachrichten, ohne staendig zu befuerchten, das Falsche zu sagen"
      : "Write high-stakes school messages without worrying you'll say the wrong thing";
  const heroSubheadline =
    language === "de"
      ? "Draft ist fuer Nachrichten gebaut, die weitergeleitet, gescreenshottet oder eskaliert werden koennen. Es hilft Ihnen, professionell zu schreiben, ohne Ihr Urteil oder Ihre Ruhe zu verlieren."
      : "Draft is built for messages that can be forwarded, screenshotted, or escalated. It helps you write with professional calm without giving up your judgement.";
  const heroContextLine =
    language === "de"
      ? "Zaza Draft unterstuetzt Lehrkraefte bei beschwerdesensibler Kommunikation mit mehr Sicherheit, Klarheit und professioneller Ruhe."
      : "Zaza Draft supports teachers through complaint-sensitive communication with more safety, clarity, and professional calm.";
  const heroAssumption =
    language === "de"
      ? "Nutzen Sie es, wenn eine Nachricht ruhig, belastbar und schulgeeignet sein muss - nicht nur sprachlich glatter."
      : "Use it when a message needs to be calm, defensible, and ready for school context, not just polished by generic AI.";
  const heroSupporting =
    language === "de"
      ? "Lehrkraft-zentrierte Sicherheitsunterstuetzung mit sichereren Umformulierungen, Elternreaktions-Vorschau und Dokumentationsmodus in einem Ablauf."
      : "Teacher-first communication safety support with safer rewrites, parent-reaction forecasting, and documentation mode in one workflow.";
  const heroPrivacyLine =
    language === "de"
      ? "Sie pruefen jede Nachricht selbst, bevor irgendetwas rausgeht. Draft stuetzt Ihr Urteil; es ersetzt es nicht."
      : "You review every message before it goes anywhere. Draft supports your judgement; it does not replace it.";
  const heroExamplesLabel =
    language === "de" ? "Beispiele ansehen" : "See examples";
  const situationsHeading =
    language === "de"
      ? "Wenn aus einer Nachricht schnell eine Beschwerde werden kann"
      : "When a message could easily turn into a complaint";
  const situationsProofLine =
    language === "de"
      ? "Vor allem dann, wenn Nachrichten spaeter weitergeleitet, gescreenshottet oder von Leitungspersonen gelesen werden."
      : "Especially when messages may be forwarded, screenshotted, or read by leadership later.";
  const situationsStatLine =
    language === "de"
      ? "Genau fuer diese Momente wurde Draft gebaut."
      : "These are the moments Draft is built for.";
  const situationsBullets =
    language === "de"
      ? [
          "Ein Elternteil stellt eine Note infrage und setzt die Schulleitung in CC.",
          "Ein Verhaltenshinweis koennte ausserhalb des urspruenglichen Gespraechs weitergeschickt werden.",
          "Die Stimmung in einer Mail kippt und trotzdem muessen Sie ruhig bleiben.",
          "Sie brauchen Formulierungen, die Beziehungen schuetzen und zugleich professionell belastbar sind.",
        ]
      : [
          "A parent disputes a grade and copies in senior leadership.",
          "A behaviour update could be forwarded beyond the original thread.",
          "The tone in the email is escalating and you still need to stay calm.",
          "You need wording that protects relationships while still standing up professionally.",
        ];
  const protectionHeading =
    language === "de"
      ? "Gebaut, um Lehrkraefte zu schuetzen"
      : "Built to protect teachers";
  const protectionIntro =
    language === "de"
      ? "Draft ist nicht nur Schreibunterstuetzung. Es hilft Ihnen, sprachliche Risiken frueh zu erkennen und heikle Kommunikation defensibler zu formulieren."
      : "Draft is not just writing assistance. It helps you catch communication risk early and turn sensitive wording into something more defensible.";
  const protectionBullets =
    language === "de"
      ? [
          "Erkennt Formulierungen, die defensiv, vorwurfsvoll oder emotional aufgeladen wirken koennten.",
          "Schlaegt sicherere Umformulierungen vor, die Ihre professionelle Einschaetzung erhalten.",
          "Hilft dabei, Eskalationsrisiko zu senken, bevor eine Nachricht unnoetig groesser wird.",
          "Zeigt, wie eine Nachricht bei Eltern ankommen koennte, bevor Sie auf Senden klicken.",
          "Unterstuetzt einen Dokumentationsmodus, wenn statt Beziehungspflege eine klare Sachaufzeichnung noetig ist.",
        ]
      : [
          "Flags wording that could sound defensive, dismissive, or emotionally charged.",
          "Offers safer rewrites that keep your professional judgement intact.",
          "Helps reduce escalation risk before a message becomes a larger issue.",
          "Shows how a parent may read the message before you press send.",
          "Supports a documentation mode when you need a clearer factual record instead of softer prose.",
        ];
  const nextStepsHeading =
    language === "de" ? "Wie geht es weiter" : "What happens next";
  const commitmentLine =
    language === "de"
      ? "Der kostenlose Tarif enthaelt 10 Entwuerfe pro Monat. Keine Kreditkarte erforderlich."
      : "The free plan includes 10 drafts each month. No credit card required.";
  const inviteLine =
    language === "de"
      ? "Der Teacher Tarif ist jetzt live. Auf der Preisseite koennen Sie auch mit dem kostenlosen Tarif starten."
      : "The Teacher plan is live now. You can also start with the free plan from the pricing page.";
  const urgencyLine =
    language === "de"
      ? "Waehlen Sie den Teacher Tarif, wenn Sie heute mit unbegrenzten Entwuerfen starten moechten."
      : "Choose the Teacher plan if you want to start with unlimited drafts today.";
  const nextSteps =
    language === "de"
      ? [
          "Teacher Tarif in Stripe starten",
          "Sofort mit unbegrenzten Entwuerfen loslegen",
          "Oder auf der Preisseite zuerst ein kostenloses Konto anlegen",
        ]
      : [
          "Start the Teacher plan in Stripe",
          "Begin using unlimited drafts right away",
          "Or create a free account first from the pricing page",
        ];
  const betaFeedbackHeading =
    language === "de"
      ? "Feedback von Lehrkraeften folgt"
      : "Teacher feedback is coming";
  const betaFeedbackBody =
    language === "de"
      ? "Wir sammeln gerade die ersten Rueckmeldungen von Lehrkraeften im Live-Einsatz. Reale Zitate erscheinen hier, sobald sie freigegeben sind."
      : "We are collecting our first round of feedback from live teacher use now. Real quotes will appear here as soon as they are approved.";
  const betaFeedbackCta =
    language === "de" ? "Mit Zaza Draft starten" : "Start using Zaza Draft";
  const restoreHeading =
    language === "de"
      ? "Vom angespannten Entwurf zur belastbaren Nachricht"
      : "From tense draft to defensible message";
  const restoreSteps =
    language === "de"
      ? [
          "Fuegen Sie Ihren ersten Entwurf, Stichpunkte oder die relevanten Fakten eines heiklen Falls ein.",
          "Draft markiert riskante Sprache, schlaegt sicherere Umformulierungen vor und zeigt, wo Eltern den Ton anders lesen koennten.",
          "Sie entscheiden, ob Sie senden oder in den Dokumentationsmodus wechseln, wenn eine klarere Aufzeichnung noetig ist.",
        ]
      : [
          "Paste your rough draft, notes, or the key facts of a sensitive situation.",
          "Draft checks for risky wording, suggests safer rewrites, and shows where a parent could read tone the wrong way.",
          "You decide whether to send or switch into documentation mode if the situation needs a clearer record.",
        ];
  const founderTopLine =
    language === "de"
      ? "Entwickelt von Dr Greg Blackburn (PhD, Professional Education) in Deutschland."
      : "Built by Dr Greg Blackburn (PhD, Professional Education) in Germany.";
  const founderTopBody =
    language === "de"
      ? "Draft wurde entwickelt, um den Stress rund um heikle Schulkommunikation zu senken und Lehrkraeften bei Nachrichten zu helfen, die auch ausserhalb des Kontexts bestehen koennen."
      : "Draft exists to reduce the stress around high-stakes school communication and help teachers write messages that still hold up when read out of context.";
  const founderTopLink =
    language === "de" ? "Gruenderstory lesen" : "Read the founder story";
  const privacyNote =
    language === "de"
      ? "Ihre Texte bleiben Ihre Texte. Draft trainiert nicht auf Ihren Nachrichten. Sie entscheiden, was Sie einfuegen, was Sie aendern und was Sie senden."
      : "Your text stays yours. Draft does not train on your messages. You decide what you paste, what you change, and what you send.";
  const visualSectionHeading =
    language === "de"
      ? "Eine klarere Produktansicht, Schutzmechanismus fuer Schutzmechanismus"
      : "A clearer product view, one safeguard at a time";
  const visualSectionIntro =
    language === "de"
      ? "Draft wird am klarsten, wenn jede Schutzfunktion ihren eigenen Fokus bekommt. Diese Sequenz ist fuer enge Feature-Crops gedacht und funktioniert bis dahin auch mit ruhigen Platzhalteransichten."
      : "Draft is easiest to understand when each safeguard gets its own focus. This sequence is built for tight feature crops and still reads cleanly while final assets are being prepared.";
  const visualSlots =
    language === "de"
      ? [
          {
            title: "Trigger erkennen",
            body: "Macht Formulierungen sichtbar, die schnell schaerfer, defensiver oder vorwurfsvoll wirken koennten.",
            imageSrc: null,
          },
          {
            title: "Berufsrisiko markieren",
            body: "Hebt Stellen hervor, die bei Beschwerden oder spaeterer Weiterleitung unnoetigen professionellen Druck erzeugen koennen.",
            imageSrc: null,
          },
          {
            title: "Nachrichten sicherer umschreiben",
            body: "Fuehrt von einer emotionalen Erstfassung zu ruhigerer, defensiblerer Sprache, ohne die Fakten zu verlieren.",
            imageSrc: null,
          },
          {
            title: "Elternreaktion vorausahnen",
            body: "Hilft einzuschaetzen, wie Ton und Formulierungen bei Eltern ankommen koennten, bevor etwas eskaliert.",
            imageSrc: null,
          },
          {
            title: "In den Dokumentationsmodus wechseln",
            body: "Unterstuetzt einen sachlicheren Modus, wenn ein Fall klarer festgehalten werden muss.",
            imageSrc: null,
          },
        ]
      : [
          {
            title: "Detect trigger language",
            body: "Surface wording that could quickly read as sharp, defensive, or accusatory.",
            imageSrc: null,
          },
          {
            title: "Flag professional-risk alerts",
            body: "Highlight phrases that could create complaint or leadership risk when a message is read out of context.",
            imageSrc: null,
          },
          {
            title: "Rewrite messages safely",
            body: "Move from an emotional first draft to calmer, more defensible wording without losing the facts.",
            imageSrc: null,
          },
          {
            title: "See how a parent may react",
            body: "Pressure-test likely parent interpretation before you send something that may escalate.",
            imageSrc: null,
          },
          {
            title: "Switch to documentation mode",
            body: "Move into a clearer factual record when a situation needs documentation instead of softer phrasing.",
            imageSrc: null,
          },
        ];

  const featureHeading =
    language === "de"
      ? "Was Draft in heikler Schulkommunikation konkret fuer Sie uebernimmt"
      : "What Draft actually helps you do in high-stakes school communication";
  const features =
    language === "de"
      ? [
          {
            title: "Berufliches Risiko frueh erkennen",
            description:
              "Entdeckt Trigger-Formulierungen, Schuldzuschreibungen und Woerter, die Beschwerden wahrscheinlicher machen koennten.",
          },
          {
            title: "Heikle Formulierungen sicherer umschreiben",
            description:
              "Verwandelt einen angespannten Entwurf in eine ruhigere, klarere Nachricht mit belastbarem Ton.",
          },
          {
            title: "Elternreaktion vorausahnen",
            description:
              "Hilft Ihnen einzuschaetzen, wie eine Nachricht ausserhalb Ihrer eigenen Absicht gelesen werden koennte.",
          },
          {
            title: "In den Dokumentationsmodus wechseln",
            description:
              "Wenn ein Fall sauber festgehalten werden muss, unterstuetzt Draft eine klarere, sachlichere Aufzeichnung.",
          },
        ]
      : [
          {
            title: "Detect professional risk early",
            description:
              "Spot trigger phrases, blame language, and wording likely to create complaints before they travel further.",
          },
          {
            title: "Rewrite sensitive messages more safely",
            description:
              "Turn a tense draft into a calmer message with clearer facts and steadier tone.",
          },
          {
            title: "Forecast parent reaction",
            description:
              "Pressure-test how a message may land when a parent reads it in emotion or shares it onward.",
          },
          {
            title: "Switch into documentation mode",
            description:
              "When needed, move from relationship-oriented email to a cleaner factual record that is easier to stand behind later.",
          },
        ];

  const differenceHeading =
    language === "de"
      ? "Warum Draft anders gebaut ist als generische KI"
      : "Why Draft is built differently from generic AI";
  const differenceIntro =
    language === "de"
      ? "Generische KI kann Texte glatter wirken lassen. Draft ist dafuer gebaut, Lehrkraeften bei schulischer Kommunikation zu helfen, ohne staendig zu befuerchten, das Falsche zu schreiben."
      : "Generic AI can make text sound smoother. Draft is built to help teachers handle school communication without constantly worrying they will say the wrong thing.";
  const differences =
    language === "de"
      ? [
          "Generische KI hilft beim Formulieren. Draft ist fuer Elternmails, Verhaltenshinweise und beschwerdesensible Follow-ups im Schulkontext gebaut.",
          "Es erkennt Formulierungen, die defensiv, schaerfer oder beruflich angreifbar wirken koennten, bevor Sie senden.",
          "Es hilft, eskalationsanfaellige Sprache ruhiger und defensibler umzuschreiben, statt nur glatter klingen zu lassen.",
          "Es bietet eine Elternreaktions-Vorschau, damit Sie Wirkung und Missverstaendnisse vorher abwaegen koennen.",
          "Es unterstuetzt einen Dokumentationsmodus, wenn statt netterer Sprache ein klarerer, sachlicherer Schriftverlauf gebraucht wird.",
        ]
      : [
          "Generic AI helps generate text. Draft is built for parent emails, behaviour updates, and complaint-sensitive follow-up in school context.",
          "It detects wording that could read as defensive, sharp, or professionally exposed before you send it.",
          "It helps teachers rewrite escalation-prone language into calmer, more defensible communication, not just smoother prose.",
          "It offers parent-reaction forecasting so you can judge likely impact before the message leaves your inbox.",
          "It supports a documentation mode when you need a clearer factual record, not simply friendlier phrasing.",
        ];
  const techNoteTitle =
    language === "de"
      ? "Lehrkraft-Kontrolle bleibt zentral:"
      : "Teacher control stays central:";
  const techNoteBody =
    language === "de"
      ? "Draft sendet nichts fuer Sie und erfindet keine Schuelerinformationen. Sie pruefen jede Ausgabe selbst und entscheiden, ob sie fuer Ihren Kontext geeignet ist."
      : "Draft does not send messages for you or invent student details. You review every output yourself and decide whether it is appropriate for your context.";
  const ctaTitle =
    language === "de"
      ? "Starten Sie Zaza Draft fuer ruhigere, sicherere Schulkommunikation"
      : "Start using Zaza Draft for calmer, safer school communication";
  const ctaSubtitle =
    language === "de"
      ? "Sehen Sie, wie Draft Lehrkraeften hilft, Nachrichten zu schreiben, hinter denen sie auch bei heiklen Situationen stehen koennen."
      : "See how Draft helps teachers write messages they can stand behind when the stakes are high.";

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
                    {heroEyebrow}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F9FAFB] leading-tight">
                  {heroTitle}
                </h1>
                <p className="text-sm text-[#94A3B8]">{heroContextLine}</p>
                <p className="text-lg md:text-xl text-[#D1D5DB] leading-relaxed">
                  {heroSubheadline}
                </p>
                <p className="text-base text-[#CBD5E1] leading-relaxed">
                  {heroAssumption}
                </p>
                <p className="text-sm text-[#9CA3AF]">{heroSupporting}</p>
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
                        track("cta_click_draft_start_teacher", {
                          language,
                          source: "hero",
                        })
                      }
                    >
                      <Link href={teacherCheckoutHref}>
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
                <p className="text-sm text-[#9CA3AF]">{heroPrivacyLine}</p>
                <p className="text-sm text-[#9CA3AF]">
                  {privacyNote}{" "}
                  <Link
                    href={language === "de" ? "/de/privacy" : "/privacy"}
                    className="text-[#A78BFA] hover:text-[#C4B5FD]"
                  >
                    Privacy
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
              <p className="text-sm text-[#CBD5E1] leading-relaxed mb-4">
                {protectionIntro}
              </p>
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
              {featureHeading}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="bg-[#111827] border-[#1F2937] p-6"
                >
                  <h3 className="text-xl font-semibold text-[#F9FAFB] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#D1D5DB]">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Draft is different */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-center mb-4">
              {differenceHeading}
            </h2>
            <p className="text-lg text-[#CBD5E1] text-center mb-8">
              {differenceIntro}
            </p>
            <ul className="space-y-4">
              {differences.map((item) => (
                <li key={item} className="flex items-start gap-3">
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

        {/* Product visuals */}
        <section className="py-16 bg-gradient-to-r from-[#111827] via-[#0B1220] to-[#050A16]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {visualSectionHeading}
              </h2>
              <p className="mt-4 text-lg text-white/75">{visualSectionIntro}</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {visualSlots.map((slot) => (
                <Card
                  key={slot.title}
                  className="border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#070B16]">
                      {slot.imageSrc ? (
                        <Image
                          src={slot.imageSrc}
                          alt={slot.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),transparent_42%)]" />
                      )}
                      <div className="relative flex h-full flex-col justify-end p-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <div className="h-2 rounded-full bg-white/20" />
                            <div className="mt-2 h-2 w-4/5 rounded-full bg-white/10" />
                            <div className="mt-2 h-2 w-3/5 rounded-full bg-white/10" />
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                            <div className="text-sm font-medium text-white/80">
                              {slot.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {slot.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/72">
                        {slot.body}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tech note */}
        <section className="py-8 bg-[#111827]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Card className="bg-[#1F2937] border-[#374151] p-6">
              <p className="text-sm text-[#9CA3AF] text-center">
                <strong className="text-[#D1D5DB]">{techNoteTitle}</strong>{" "}
                {techNoteBody}
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
                <Link href={teacherCheckoutHref}>{betaFeedbackCta}</Link>
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
              {ctaTitle}
            </h2>
            <p className="text-xl text-white/90 mb-8">{ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#7C3AED] hover:bg-gray-100 font-medium rounded-xl"
              >
                <Link href={teacherCheckoutHref}>
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
