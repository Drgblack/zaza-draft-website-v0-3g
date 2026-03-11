"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { SignupModal } from "@/components/signup-modal";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/analytics";
import { DraftDemo } from "@/components/draft-demo";
import { CaseStudyCarousel } from "@/components/case-study-carousel";
import { SocialProofBadges } from "@/components/social-proof-badges";

const Check = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const SliderIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110 4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
    />
  </svg>
);

export function HomePageClient() {
  const { t, language } = useLanguage();
  const [signupOpen, setSignupOpen] = useState(false);
  const [showHallucinationTooltip, setShowHallucinationTooltip] =
    useState(false);
  const prefersReducedMotion = useReducedMotion();
  const earlyAccessHref =
    language === "de" ? "/de/early-access" : "/early-access";
  const founderStoryHref =
    language === "de" ? "/de/about/founder" : "/about/founder";
  const heroEyebrow = language === "de" ? "FUER LEHRKRAEFTE" : "FOR TEACHERS";
  const heroBadge =
    language === "de"
      ? "E-Mails an Eltern und Zeugnisformulierungen"
      : "Parent emails and report comments";
  const heroHeadline =
    language === "de"
      ? "Schreibe Schulkommunikation,"
      : "Write school communication";
  const heroHeadlineAccent =
    language === "de"
      ? "die sich sicher senden laesst."
      : "that feels safe to send.";
  const heroSubheading =
    language === "de"
      ? "Ruhige, professionelle Schreibunterstuetzung fuer die Momente, die Lehrkraefte am meisten zerdenken, von E-Mails an Eltern bis zu Zeugnisformulierungen."
      : "Calm, professional writing support for the moments teachers overthink most, from parent emails to report comments.";
  const heroEntityLine =
    language === "de"
      ? "Zaza Draft ist ein lehrkraft-zentrierter Co-Writer fuer sensible Schulkommunikation. Du pruefst, bearbeitest und gibst jede Formulierung selbst frei."
      : "Zaza Draft is a teacher-first co-writer for sensitive school communication. You review, edit, and approve every word before it is used.";
  const heroOutcomeLabel =
    language === "de" ? "Sieh den Unterschied" : "See the difference";
  const heroProofLabel =
    language === "de"
      ? "Sensible Schulkommunikation, vor und nach Zaza Draft"
      : "Sensitive school communication, before and after Zaza Draft";
  const heroProofIntro =
    language === "de"
      ? "Sieh, wie rohe Formulierungen klarer, ruhiger und sendesicher werden."
      : "See how rough wording becomes clearer, calmer, and safer to send.";
  const heroProofFrameLine =
    language === "de"
      ? "Gebaut fuer Nachrichten, die Lehrkraefte nur ungern absenden."
      : "Built for the messages teachers hesitate to send.";
  const heroBeforeLabel = language === "de" ? "Vorher" : "Before";
  const heroAfterLabel = language === "de" ? "Nachher" : "After";
  const heroBeforeMeta =
    language === "de" ? "Riskanter Erstentwurf" : "Risky first draft";
  const heroAfterMeta =
    language === "de"
      ? "Ruhigere, belastbare Version"
      : "Calmer, defensible version";
  const heroProofSections =
    language === "de"
      ? [
          {
            title: "E-Mail an Eltern",
            context: "Verhaltensvorfall",
            before:
              "Oliver war heute erneut sehr stoerend und hat mehrere Anweisungen ignoriert. Dieses Verhalten ist nicht akzeptabel und muss sich verbessern.",
            after:
              "Ich wollte Sie wissen lassen, dass es Oliver heute trotz mehrerer Erinnerungen schwerfiel, waehrend des Unterrichts konzentriert zu bleiben. Wir unterstuetzen ihn weiter dabei, positive Unterrichtsgewohnheiten aufzubauen, und wuerden Ihre Partnerschaft sehr schaetzen, um diese Erwartungen auch zu Hause zu bestaerken.",
          },
          {
            title: "Zeugnisformulierung",
            context: "Negative Formulierung entschaerft",
            before:
              "Oliver arbeitet zu hastig und die Qualitaet ist oft schwach.",
            after:
              "Oliver ist faehig und beteiligt sich positiv am Unterricht. Wenn er seine Arbeit vor der Abgabe noch etwas sorgfaeltiger prueft, kann er Ergebnisse zeigen, die seinem Verstaendnis staerker entsprechen.",
          },
          {
            title: "Sensible Mitteilung",
            context: "Koerperlicher Vorfall",
            before:
              "Oliver hat heute einen anderen Schueler geschubst und sich geweigert, sich zu entschuldigen. Dieses Verhalten ist nicht akzeptabel und kann so nicht weitergehen.",
            after:
              "Ich wollte Sie ueber einen Vorfall aus dem heutigen Unterricht informieren, bei dem Oliver frustriert wurde und einen anderen Schueler schubste. Wir haben mit ihm ueber positive Entscheidungen gesprochen und er versteht, dass koerperliches Verhalten nicht angemessen ist. Wir werden ihn weiter dabei unterstuetzen, solche Momente besser zu regulieren, und waeren fuer Ihre Unterstuetzung zu Hause dankbar.",
          },
        ]
      : [
          {
            title: "Parent email",
            context: "Behaviour incident",
            before:
              "Oliver was very disruptive again today and ignored multiple instructions. This behaviour is becoming unacceptable and needs to improve.",
            after:
              "I wanted to let you know that Oliver found it challenging to stay focused during today's lesson despite several reminders. We are continuing to support him in developing positive classroom habits and would really appreciate your partnership in reinforcing these expectations at home.",
          },
          {
            title: "Report comment",
            context: "Honest but more defensible",
            before: "Oliver rushes his work and the quality is often poor.",
            after:
              "Oliver is capable and contributes positively in class. With a little more care in checking his work before submitting it, he will be able to produce work that more fully reflects his understanding.",
          },
          {
            title: "Sensitive incident",
            context: "Emotionally loaded follow-up",
            before:
              "Oliver pushed another student today and refused to apologise. This behaviour is unacceptable and cannot continue.",
            after:
              "I wanted to let you know about an incident during today's lesson where Oliver became frustrated and pushed another pupil. We spoke with him about making positive choices and he understands that physical behaviour is not appropriate. We will continue supporting him in managing these moments and would appreciate your reinforcement of this at home.",
          },
        ];
  const heroProofCaption =
    language === "de"
      ? "Vom angespannten Entwurf zur ruhigen, belastbaren Kommunikation."
      : "From tense draft to calm, defensible communication.";
  const heroMentalLoadLine =
    language === "de"
      ? "Weniger Zweifeln, bevor du auf Senden drueckst."
      : "Less second-guessing before you press send.";
  const heroTrustBarIntro =
    language === "de"
      ? "Lehrkraefte vertrauen Zaza Draft fuer ruhige, belastbare Kommunikation."
      : "Trusted by teachers who want calm, defensible communication.";
  const heroTrustBarDifferentiator =
    language === "de"
      ? "Kein generischer KI-Schreiber, sondern ein lehrkraft-zentrierter Co-Writer fuer sensible Schulkommunikation."
      : "Not a generic AI writer, but a teacher-first co-writer for sensitive school communication.";
  const heroCtaMicrocopy =
    language === "de"
      ? "Schreibe jeden Monat bis zu 10 Nachrichten kostenlos. Keine Verpflichtung."
      : "Write up to 10 messages free each month. No commitment.";
  const heroTeacherUsageLine =
    language === "de"
      ? "Entwickelt fuer Lehrkraefte, die E-Mails an Eltern, Zeugnisformulierungen und andere sensible Schulkommunikation schreiben."
      : "Built for teachers writing parent emails, report comments, and other high-stakes school communication.";
  const heroTrustBarPoints =
    language === "de"
      ? [
          "Fuer Lehrkraefte entwickelt",
          "Ruhiger, professioneller Ton",
          "Du pruefst jede Nachricht vor dem Senden",
        ]
      : [
          "Built for teachers",
          "Calm, professional tone",
          "You review every message before sending",
        ];
  const betaFeedbackHeading =
    language === "de"
      ? "Feedback von Lehrkraeften folgt"
      : "Teacher feedback is coming";
  const betaFeedbackBody =
    language === "de"
      ? "Wir sammeln gerade die ersten Rueckmeldungen. Echte Zitate erscheinen hier, sobald wir sie gesammelt haben. Trag dich in die Warteliste ein, wenn du zum Launch benachrichtigt werden moechtest."
      : "We are collecting our first round of teacher feedback now. Real quotes will appear here as soon as they are collected. Join the waitlist if you want to be notified at launch.";
  const betaFeedbackCta =
    language === "de" ? "Zur Warteliste" : "Join the waitlist";
  const trustPanelHeading =
    language === "de"
      ? "KI, der du bei echter Schulkommunikation vertrauen kannst"
      : "AI you can trust with real school communication";
  const trustPanelSubtext =
    language === "de"
      ? "Entwickelt fuer ruhige, professionelle Formulierungen in den Momenten, die Lehrkraefte am meisten zerdenken."
      : "Built to support calm, professional writing in the moments teachers second-guess most.";
  const trustPanelCards =
    language === "de"
      ? [
          {
            title: "Du bleibst in Kontrolle",
            body: "Pruefe jede Nachricht, bevor etwas gesendet wird.",
            icon: SliderIcon,
          },
          {
            title: "Fuer Lehrkraefte gebaut",
            body: "Entwickelt fuer E-Mails an Eltern, Zeugnisformulierungen und sensible Schulkommunikation.",
            icon: DocumentIcon,
          },
          {
            title: "Ruhige Tonleitplanken",
            body: "Hilft, Eskalation zu reduzieren und Formulierungen professionell zu halten.",
            icon: CheckCircleIcon,
          },
          {
            title: "Privacy-first gedacht",
            body: "Gebaut fuer verantwortungsvollen Unterrichtseinsatz und sorgfaeltige Kommunikationsablaeufe.",
            icon: ShieldIcon,
          },
        ]
      : [
          {
            title: "You stay in control",
            body: "Review every message before anything is sent.",
            icon: SliderIcon,
          },
          {
            title: "Built for teachers",
            body: "Designed for parent emails, report comments, and sensitive school communication.",
            icon: DocumentIcon,
          },
          {
            title: "Calm tone guardrails",
            body: "Helps reduce escalation and keeps wording professional.",
            icon: CheckCircleIcon,
          },
          {
            title: "Privacy-first design",
            body: "Built for responsible classroom use and careful communication workflows.",
            icon: ShieldIcon,
          },
        ];
  const situationsHeading =
    language === "de"
      ? "Situationen, die Lehrkraefte nur ungern formulieren"
      : "Situations teachers worry about writing";
  const situationsItems =
    language === "de"
      ? [
          "Verhaltensvorfaelle",
          "Beschwerden von Eltern",
          "Sensible Zeugnisformulierungen",
          "Schwierige Follow-up-E-Mails",
          "Eskalationen an Familien",
          "Emotional aufgeladene Nachrichten",
        ]
      : [
          "Behaviour incidents",
          "Parent complaints",
          "Sensitive report comments",
          "Difficult follow-up emails",
          "Escalation to families",
          "Emotionally charged messages",
        ];

  const scrollToDemo = () => {
    track("cta_click_home_see_examples", { language });
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F172A] pt-32 lg:pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-xs uppercase tracking-[2px] text-[#A855F7] font-semibold mb-4"
              >
                {heroEyebrow}
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full bg-[#8B5CF6]/10 px-4 py-2 text-sm font-medium text-[#A78BFA] border border-[#8B5CF6]/30 backdrop-blur-sm"
              >
                <span className="text-xl" aria-hidden="true">
                  ✦
                </span>
                <span>{heroBadge}</span>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="space-y-4"
              >
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                  <span className="text-white">{heroHeadline}</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {heroHeadlineAccent}
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="text-lg lg:text-xl text-[#CBD5E1] leading-relaxed max-w-[600px] mx-auto lg:mx-0"
              >
                {heroSubheading}
              </motion.p>
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34, ease: "easeOut" }}
                className="text-base text-[#94A3B8] leading-relaxed max-w-[600px] mx-auto lg:mx-0"
              >
                {heroEntityLine}
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-transform transition-shadow duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/30 active:scale-[0.98]"
                >
                  <Link
                    href={earlyAccessHref}
                    onClick={() =>
                      track("cta_click_home_get_started", { language })
                    }
                  >
                    {t("hero.ctaPrimary")}
                  </Link>
                </Button>
                <Button
                  onClick={scrollToDemo}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-transform transition-shadow duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 group active:scale-[0.98]"
                >
                  {t("hero.ctaSecondary")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.44, ease: "easeOut" }}
                className="text-sm text-[#CBD5E1] leading-relaxed max-w-[600px] mx-auto lg:mx-0"
              >
                {heroCtaMicrocopy}
              </motion.p>
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.46, ease: "easeOut" }}
                className="inline-flex max-w-[680px] items-start gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm leading-6 text-[#CBD5E1] mx-auto lg:mx-0"
              >
                <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-emerald-300" />
                <span>{heroTeacherUsageLine}</span>
              </motion.p>
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.48, ease: "easeOut" }}
                className="text-sm text-[#94A3B8] leading-relaxed max-w-[600px] mx-auto lg:mx-0"
              >
                {t("hero.earlyAccessLine")}
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="max-w-[720px] rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-sm"
              >
                <p className="text-sm leading-6 text-[#CBD5E1]">
                  {heroTrustBarIntro}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#A78BFA]">
                  {heroTrustBarDifferentiator}
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-3 text-sm text-[#94A3B8] sm:grid-cols-3">
                  {heroTrustBarPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.52, ease: "easeOut" }}
                className="text-sm text-[#94A3B8] leading-relaxed max-w-[600px] mx-auto lg:mx-0"
              >
                {t("hero.privacyLine")}
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-6 text-sm text-gray-400 justify-center lg:justify-start pt-4"
              >
                <div className="relative flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>{t("hero.trustIndicators.hallucinationSafe")}</span>
                  <button
                    onClick={() =>
                      setShowHallucinationTooltip(!showHallucinationTooltip)
                    }
                    className="inline-flex items-center justify-center w-4 h-4 text-purple-400 hover:text-purple-300 transition-colors"
                    aria-label={t("hallucinationSafe.tooltip.heading")}
                  >
                    <InfoIcon className="w-4 h-4" />
                  </button>
                  {showHallucinationTooltip && (
                    <div className="absolute left-0 top-8 z-50 w-80 bg-white rounded-lg shadow-2xl p-5 border border-gray-200">
                      <button
                        onClick={() => setShowHallucinationTooltip(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        aria-label="Close"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {t("hallucinationSafe.tooltip.heading")}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {t("hallucinationSafe.tooltip.body")}
                      </p>
                      <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  {t("hero.trustIndicators.ferpaCompliant")}
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  {t("hero.trustIndicators.teachers")}
                </div>
              </motion.div>
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                className="text-xs text-gray-400 leading-relaxed max-w-[640px] mx-auto lg:mx-0"
              >
                {t("hero.trustClarifier")}
              </motion.p>
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.48, ease: "easeOut" }}
                className="text-xs text-gray-400 leading-relaxed max-w-[640px] mx-auto lg:mx-0"
              >
                {t("hero.founderLine")}{" "}
                <Link
                  href={founderStoryHref}
                  className="text-[#A78BFA] hover:text-[#C4B5FD]"
                >
                  {t("hero.founderLink")}
                </Link>
              </motion.p>
            </div>

            <motion.div
              className="w-full lg:h-[600px]"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      x: 0,
                      y: [0, -6, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.8, delay: 0.3 }
                  : {
                      opacity: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                      x: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                      y: {
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                      },
                    }
              }
            >
              <div className="relative mx-auto flex h-full max-w-[540px] items-center">
                <div className="absolute inset-x-8 inset-y-10 rounded-[32px] bg-gradient-to-br from-[#A855F7]/35 via-[#1E1B4B]/20 to-[#EC4899]/30 blur-3xl" />
                <div className="relative w-full overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_35px_120px_-45px_rgba(168,85,247,0.65)] backdrop-blur-xl sm:p-5">
                  <div className="rounded-[24px] border border-white/10 bg-[#0B1120]/95 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A78BFA]">
                          {heroOutcomeLabel}
                        </p>
                        <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                          {heroProofLabel}
                        </h2>
                        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#A78BFA]">
                          {heroProofFrameLine}
                        </p>
                        <p className="mt-2 max-w-[440px] text-sm leading-6 text-[#94A3B8]">
                          {heroProofIntro}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#CBD5E1]">
                        <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                        <span>{heroAfterMeta}</span>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {heroProofSections.map((section) => (
                        <section
                          key={section.title}
                          className="rounded-[22px] border border-white/10 bg-[#0F172A]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-semibold text-white sm:text-base">
                                {section.title}
                              </h3>
                              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#64748B]">
                                {section.context}
                              </p>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#CBD5E1]">
                              <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                              <span>{heroAfterMeta}</span>
                            </div>
                          </div>

                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <article className="rounded-[20px] border border-white/10 bg-[#111827] p-4">
                              <div className="flex items-center justify-between gap-3">
                                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-200">
                                  <span>{heroBeforeLabel}</span>
                                </div>
                                <span className="text-xs text-[#94A3B8]">
                                  {heroBeforeMeta}
                                </span>
                              </div>
                              <p className="mt-4 text-sm leading-7 text-[#CBD5E1] sm:text-[15px]">
                                {section.before}
                              </p>
                            </article>

                            <article className="rounded-[20px] border border-emerald-400/20 bg-[linear-gradient(180deg,rgba(17,24,39,0.98),rgba(15,23,42,0.94))] p-4 shadow-[0_24px_70px_-36px_rgba(16,185,129,0.35)] ring-1 ring-white/5">
                              <div className="flex items-center justify-between gap-3">
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                                  <span>{heroAfterLabel}</span>
                                </div>
                                <span className="text-xs text-[#C4B5FD]">
                                  {heroAfterMeta}
                                </span>
                              </div>
                              <p className="mt-4 text-sm leading-7 text-white sm:text-[15px]">
                                {section.after}
                              </p>
                            </article>
                          </div>
                        </section>
                      ))}
                    </div>

                    <p className="mt-4 text-sm text-[#94A3B8]">
                      {heroProofCaption}
                    </p>
                    <p className="mt-2 text-sm text-[#CBD5E1]">
                      {heroMentalLoadLine}
                    </p>
                    <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
                            {situationsHeading}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
                            {language === "de"
                              ? "Genau fuer die Formulierungen, die man zu leicht zu lange offen laesst."
                              : "For the drafts teachers are most likely to leave open too long."}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {situationsItems.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#111827]/70 px-4 py-3 text-sm text-[#E2E8F0]"
                          >
                            <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#A78BFA]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-[#0F172A] py-16 md:py-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,41,59,0.92),rgba(15,23,42,0.98))] p-8 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.95)] ring-1 ring-white/5 md:p-10">
            <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-emerald-400/8 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#C4B5FD]">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                <span>
                  {language === "de" ? "Vertrauensrahmen" : "Trust framework"}
                </span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {trustPanelHeading}
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#CBD5E1]">
                {trustPanelSubtext}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {trustPanelCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article
                      key={card.title}
                      className="rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_50px_-40px_rgba(168,85,247,0.45)]"
                    >
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#C4B5FD]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">
                        {card.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1E293B] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg text-[#CBD5E1] leading-relaxed text-pretty max-w-[780px] mx-auto mb-8"
          >
            {t("philosophy.topParagraph")}
          </motion.p>
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-balance"
          >
            {t("problem.heading")}
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed text-pretty max-w-[700px] mx-auto"
          >
            {t("problem.body")}
          </motion.p>

          {/* Optional Supporting Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                value: t("problem.stats.parentEmails.value"),
                label: t("problem.stats.parentEmails.label"),
                note: t("problem.stats.parentEmails.note"),
              },
              {
                value: t("problem.stats.reportCards.value"),
                label: t("problem.stats.reportCards.label"),
                note: t("problem.stats.reportCards.note"),
              },
              {
                value: t("problem.stats.gradingFeedback.value"),
                label: t("problem.stats.gradingFeedback.label"),
                note: t("problem.stats.gradingFeedback.note"),
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#A855F7] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {stat.note}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-1/4 w-1/3 h-1/2 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Solution/Mission Statement Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-balance"
          >
            {t("solution.heading")}
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed text-pretty max-w-[900px] mx-auto mb-6"
          >
            {t("solution.bodyPrimary")}
          </motion.p>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-[#94A3B8] leading-relaxed text-pretty max-w-[800px] mx-auto"
          >
            {t("solution.bodySecondary")}
          </motion.p>
        </div>
        <div className="absolute top-0 left-1/4 w-1/3 h-1/2 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/2 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0F172A] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                value: t("stats.documentsRefined.number"),
                label: t("stats.documentsRefined.label"),
              },
              {
                value: t("stats.teachers.number"),
                label: t("stats.teachers.label"),
              },
              {
                value: t("stats.timeSaved.number"),
                label: t("stats.timeSaved.label"),
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <div className="text-lg text-white font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-lg text-[#94A3B8] mt-16"
          >
            {t("stats.subtitle")}
          </motion.p>
          <SocialProofBadges />
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16"
          >
            {t("howItWorks.heading")}
          </motion.h2>

          {/* Visual Workflow Diagram */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
              {[
                {
                  icon: <DocumentIcon className="w-12 h-12 text-[#A855F7]" />,
                  title: t("howItWorks.diagram.step1.title"),
                  description: t("howItWorks.diagram.step1.description"),
                  example: t("howItWorks.diagram.step1.example"),
                },
                {
                  icon: <SliderIcon className="w-12 h-12 text-[#A855F7]" />,
                  title: t("howItWorks.diagram.step2.title"),
                  description: t("howItWorks.diagram.step2.description"),
                  example: t("howItWorks.diagram.step2.example"),
                },
                {
                  icon: (
                    <CheckCircleIcon className="w-12 h-12 text-[#A855F7]" />
                  ),
                  title: t("howItWorks.diagram.step3.title"),
                  description: t("howItWorks.diagram.step3.description"),
                  example: t("howItWorks.diagram.step3.example"),
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl p-8 shadow-lg h-full">
                    <div className="flex justify-center mb-4">{step.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                      {step.description}
                    </p>
                    <p className="text-xs italic text-gray-500 text-center">
                      {step.example}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-[#A855F7]" />
                    </div>
                  )}
                  {index < 2 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight className="w-8 h-8 text-[#A855F7] rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3-Step Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                num: t("howItWorks.steps.step1.number"),
                title: t("howItWorks.steps.step1.title"),
                desc: t("howItWorks.steps.step1.description"),
              },
              {
                num: t("howItWorks.steps.step2.number"),
                title: t("howItWorks.steps.step2.title"),
                desc: t("howItWorks.steps.step2.description"),
              },
              {
                num: t("howItWorks.steps.step3.number"),
                title: t("howItWorks.steps.step3.title"),
                desc: t("howItWorks.steps.step3.description"),
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6"
                >
                  {step.num}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo">
        <DraftDemo
          language={language}
          onTryItYourself={() => {
            track("cta_click_home_try_demo", { language, location: "home" });
            setSignupOpen(true);
          }}
        />
      </section>

      {/* Use Cases Section */}
      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16"
          >
            {t("useCases.heading")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📩",
                title: t("useCases.cards.parentMessages.title"),
                desc: t("useCases.cards.parentMessages.description"),
                examples: t("useCases.cards.parentMessages.examples"),
              },
              {
                icon: "📋",
                title: t("useCases.cards.reportCards.title"),
                desc: t("useCases.cards.reportCards.description"),
                examples: t("useCases.cards.reportCards.examples"),
              },
              {
                icon: "📝",
                title: t("useCases.cards.gradingComments.title"),
                desc: t("useCases.cards.gradingComments.description"),
                examples: t("useCases.cards.gradingComments.examples"),
              },
              {
                icon: "📣",
                title: t("useCases.cards.schoolCommunications.title"),
                desc: t("useCases.cards.schoolCommunications.description"),
                examples: t("useCases.cards.schoolCommunications.examples"),
              },
              {
                icon: "🏅",
                title: t("useCases.cards.referenceLetters.title"),
                desc: t("useCases.cards.referenceLetters.description"),
                examples: t("useCases.cards.referenceLetters.examples"),
              },
              {
                icon: "📘",
                title: t("useCases.cards.documentation.title"),
                desc: t("useCases.cards.documentation.description"),
                examples: t("useCases.cards.documentation.examples"),
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -3 }}
                className="bg-[#1E293B] border border-[#334155] rounded-xl p-8 transition-transform transition-shadow duration-200 hover:border-[#8B5CF6] hover:shadow-[0_12px_30px_rgba(139,92,246,0.2)] hover:-translate-y-1 transform-gpu"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-base text-[#CBD5E1] mb-4 leading-relaxed">
                  {card.desc}
                </p>
                <p className="text-sm text-[#94A3B8] italic">{card.examples}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyCarousel />

      {/* Comparison Section */}
      <section className="bg-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("comparison.heading")}
            </h2>
            <p className="text-lg text-[#CBD5E1]">
              {t("comparison.subheading")}
            </p>
            <p className="text-sm text-[#94A3B8] mt-3 max-w-3xl mx-auto">
              {t("comparison.clarifier")}
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#334155]">
                    <th className="text-left py-4 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                      {t("comparison.tableHeaders.feature")}
                    </th>
                    <th className="text-center py-4 px-6 text-[#94A3B8] font-medium text-sm uppercase tracking-wider">
                      {t("comparison.tableHeaders.genericAI")}
                    </th>
                    <th className="text-center py-4 px-6 bg-[#8B5CF6]/10 text-[#A78BFA] font-semibold text-sm uppercase tracking-wider rounded-t-lg">
                      {t("comparison.tableHeaders.zazaDraft")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: t("comparison.rows.training.feature"),
                      generic: t("comparison.rows.training.generic"),
                      zaza: t("comparison.rows.training.zaza"),
                    },
                    {
                      feature: t("comparison.rows.safety.feature"),
                      generic: t("comparison.rows.safety.generic"),
                      zaza: t("comparison.rows.safety.zaza"),
                    },
                    {
                      feature: t("comparison.rows.toneControl.feature"),
                      generic: t("comparison.rows.toneControl.generic"),
                      zaza: t("comparison.rows.toneControl.zaza"),
                    },
                    {
                      feature: t("comparison.rows.compliance.feature"),
                      generic: t("comparison.rows.compliance.generic"),
                      zaza: t("comparison.rows.compliance.zaza"),
                    },
                    {
                      feature: t("comparison.rows.useCases.feature"),
                      generic: t("comparison.rows.useCases.generic"),
                      zaza: t("comparison.rows.useCases.zaza"),
                    },
                    {
                      feature: t("comparison.rows.outputQuality.feature"),
                      generic: t("comparison.rows.outputQuality.generic"),
                      zaza: t("comparison.rows.outputQuality.zaza"),
                    },
                    {
                      feature: t("comparison.rows.learningCurve.feature"),
                      generic: t("comparison.rows.learningCurve.generic"),
                      zaza: t("comparison.rows.learningCurve.zaza"),
                    },
                    {
                      feature: t("comparison.rows.community.feature"),
                      generic: t("comparison.rows.community.generic"),
                      zaza: t("comparison.rows.community.zaza"),
                    },
                  ].map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={
                        prefersReducedMotion ? {} : { opacity: 0, y: 10 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-[#334155] hover:bg-white/5 transition-colors"
                    >
                      <td className="py-5 px-6 text-white font-medium text-base">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-[#94A3B8] text-sm">
                          <XIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span>{row.generic}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center bg-[#8B5CF6]/5">
                        <div className="flex items-center justify-center gap-2 text-[#A78BFA] text-sm font-medium">
                          <Check className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
                          <span>{row.zaza}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Zaza Section */}
      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16"
          >
            {t("whyChoose.heading")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                title: t("whyChoose.benefits.beatWritersBlock.title"),
                desc: t("whyChoose.benefits.beatWritersBlock.description"),
              },
              {
                title: t("whyChoose.benefits.writeWithConfidence.title"),
                desc: t("whyChoose.benefits.writeWithConfidence.description"),
              },
              {
                title: t("whyChoose.benefits.saveTime.title"),
                desc: t("whyChoose.benefits.saveTime.description"),
              },
              {
                title: t("whyChoose.benefits.breakBarriers.title"),
                desc: t("whyChoose.benefits.breakBarriers.description"),
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0F172A] border border-[#8B5CF6]/20 rounded-xl p-10 transition-transform transition-shadow duration-200 hover:border-[#8B5CF6] hover:shadow-[0_8px_20px_rgba(139,92,246,0.2)] hover:-translate-y-1 transform-gpu"
              >
                <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center mb-5">
                  <Check className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16"
          >
            {t("testimonials.heading")}
          </motion.h2>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl rounded-xl border border-[#334155] bg-[#1E293B] p-8 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {betaFeedbackHeading}
            </h3>
            <p className="text-[#CBD5E1] mb-6">{betaFeedbackBody}</p>
            <Button asChild className="gradient-primary text-white rounded-xl">
              <Link href={earlyAccessHref}>{betaFeedbackCta}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {t("finalCTA.heading")}
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-white/95 mb-10 max-w-2xl mx-auto"
          >
            {t("finalCTA.subheading")}
          </motion.p>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              onClick={() => {
                track("cta_click_home_final", { language });
                setSignupOpen(true);
              }}
              size="lg"
              className="bg-white text-[#8B5CF6] hover:bg-gray-50 font-semibold px-12 py-5 text-xl rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105"
              style={{ minHeight: "44px" }}
            >
              {t("finalCTA.button")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Signup Modal */}
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  );
}
