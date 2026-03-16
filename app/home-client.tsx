"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { SignupModal } from "@/components/signup-modal";
import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/analytics";
import { DraftDemo } from "@/components/draft-demo";
import { CaseStudyCarousel } from "@/components/case-study-carousel";
import { SocialProofBadges } from "@/components/social-proof-badges";
import { buildStripeCheckoutPath } from "@/config/pricing";

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
  const [activeProofIndex, setActiveProofIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const signupHref = language === "de" ? "/de/signup" : "/signup";
  const starterSignupHref =
    language === "de"
      ? "https://www.zazadraft.com/de/signup?source=homepage&plan=starter"
      : "https://www.zazadraft.com/signup?source=homepage&plan=starter";
  const teacherCheckoutHref = buildStripeCheckoutPath({
    plan: "draft",
    interval: "monthly",
    currency: "EUR",
    returnPath: language === "de" ? "/de" : "/",
  });
  const founderStoryHref =
    language === "de" ? "/de/about/founder" : "/about/founder";
  const heroEyebrow = language === "de" ? "FUER LEHRKRAEFTE" : "FOR TEACHERS";
  const heroBadge =
    language === "de"
      ? "Sensible Schulkommunikation mit Sicherheitsleitplanken"
      : "High-stakes school messages with safety guardrails";
  const heroHeadline =
    language === "de"
      ? "Schreibe Eltern-E-Mails und Zeugnisbemerkungen"
      : "Write parent emails and report comments";
  const heroHeadlineAccent =
    language === "de"
      ? "ohne zu fuerchten, dass du das Falsche schreibst."
      : "without worrying you will say the wrong thing.";
  const heroPrimaryCtaLabel =
    language === "de" ? "Sicher schreiben starten" : "Start writing safely";
  const heroSecondaryCtaLabel =
    language === "de"
      ? "Kostenlos testen (10 Entwuerfe/Monat)"
      : "Try free (10 drafts/month)";
  const heroSubheading =
    language === "de"
      ? "Zaza Draft hilft Lehrkraeften, riskante Formulierungen zu erkennen, sensible Nachrichten sicherer umzuschreiben und mit mehr Ruhe auf Senden zu druecken."
      : "Zaza Draft helps teachers spot risky wording, rewrite sensitive messages more safely, and press send with more confidence.";
  const heroEntityLine =
    language === "de"
      ? "Es ist kein generischer KI-Schreiber. Es ist ein lehrkraft-zentriertes System fuer sicherere Schulkommunikation, das bei Elternkommunikation, Zeugnistexten und schriftlicher Dokumentation hilft, wenn Formulierungen berufliches Risiko tragen."
      : "It is not a generic AI writer. It is a teacher-first communication safety system for parent communication, report comments, and written documentation where wording carries professional risk.";
  const heroOutcomeLabel =
    language === "de" ? "Sieh den Unterschied" : "See the difference";
  const heroProofLabel =
    language === "de"
      ? "Sensible Schulkommunikation, vor und nach Zaza Draft"
      : "Sensitive school communication, before and after Zaza Draft";
  const heroProofIntro =
    language === "de"
      ? "Sieh, wie riskante Entwuerfe klarer, ruhiger und leichter zu vertreten werden."
      : "See how risky drafts become clearer, calmer, and easier to stand behind.";
  const heroProofFrameLine =
    language === "de"
      ? "Die Nachrichten, die Lehrkraefte nur ungern absenden."
      : "The messages teachers hesitate to send.";
  const heroProofBrowseLabel =
    language === "de" ? "Weitere Beispiele" : "Browse examples";
  const heroBeforeLabel = language === "de" ? "Vorher" : "Before";
  const heroAfterLabel = language === "de" ? "Nachher" : "After";
  const heroBeforeMeta =
    language === "de" ? "Riskante Formulierung" : "Risky wording";
  const heroAfterMeta =
    language === "de"
      ? "Ruhigere, belastbare Formulierung"
      : "Calmer, defensible wording";
  const heroProofSections =
    language === "de"
      ? [
          {
            title: "E-Mail an Eltern",
            context:
              "Verhaltensvorfall nach einem schwierigen Unterrichtsmoment",
            before:
              "Oliver war heute erneut sehr stoerend und hat mehrere Anweisungen ignoriert. Dieses Verhalten ist nicht akzeptabel und muss sich verbessern.",
            after:
              "Ich wollte Sie wissen lassen, dass es Oliver heute trotz mehrerer Erinnerungen schwerfiel, waehrend des Unterrichts konzentriert zu bleiben. Wir unterstuetzen ihn weiter dabei, positive Unterrichtsgewohnheiten aufzubauen, und wuerden Ihre Partnerschaft sehr schaetzen, um diese Erwartungen auch zu Hause zu bestaerken.",
          },
          {
            title: "Zeugnisformulierung",
            context: "Ehrlich, aber belastbarer formuliert",
            before:
              "Oliver arbeitet zu hastig und die Qualitaet ist oft schwach.",
            after:
              "Oliver ist faehig und beteiligt sich positiv am Unterricht. Wenn er seine Arbeit vor der Abgabe noch etwas sorgfaeltiger prueft, kann er Ergebnisse zeigen, die seinem Verstaendnis staerker entsprechen.",
          },
          {
            title: "Sensible Mitteilung",
            context: "Eine Nachricht, die man ungern absendet",
            before:
              "Oliver hat heute einen anderen Schueler geschubst und sich geweigert, sich zu entschuldigen. Dieses Verhalten ist nicht akzeptabel und kann so nicht weitergehen.",
            after:
              "Ich wollte Sie ueber einen Vorfall aus dem heutigen Unterricht informieren, bei dem Oliver frustriert wurde und einen anderen Schueler schubste. Wir haben mit ihm ueber positive Entscheidungen gesprochen und er versteht, dass koerperliches Verhalten nicht angemessen ist. Wir werden ihn weiter dabei unterstuetzen, solche Momente besser zu regulieren, und waeren fuer Ihre Unterstuetzung zu Hause dankbar.",
          },
        ]
      : [
          {
            title: "Parent email",
            context: "Behaviour incident after a difficult lesson",
            before:
              "Oliver was very disruptive again today and ignored multiple instructions. This behaviour is becoming unacceptable and needs to improve.",
            after:
              "I wanted to let you know that Oliver found it challenging to stay focused during today's lesson despite several reminders. We are continuing to support him in developing positive classroom habits and would really appreciate your partnership in reinforcing these expectations at home.",
          },
          {
            title: "Report comment",
            context: "Honest, but more defensible",
            before: "Oliver rushes his work and the quality is often poor.",
            after:
              "Oliver is capable and contributes positively in class. With a little more care in checking his work before submitting it, he will be able to produce work that more fully reflects his understanding.",
          },
          {
            title: "Sensitive incident",
            context: "A message teachers hesitate to send",
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
      ? "Kein generischer KI-Schreiber, sondern lehrkraft-zentrierte Unterstuetzung fuer sicherere Schulkommunikation."
      : "Not a generic AI writer, but teacher-first support for safer school communication.";
  const heroCtaMicrocopy =
    language === "de"
      ? "10 Entwuerfe gratis pro Monat • Keine Kreditkarte erforderlich"
      : "10 drafts free every month • No credit card required";
  const heroCtaReassuranceLine =
    language === "de"
      ? "Immer bearbeitbar. Du bleibst bei jedem Wort in Kontrolle."
      : "Always editable. You stay in control of every word.";
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
      ? "Erste Rueckmeldungen von Lehrkraeften folgen bald"
      : "Early teacher feedback coming soon";
  const betaFeedbackBody =
    language === "de"
      ? "Wir sammeln gerade die ersten Rueckmeldungen von Lehrkraeften im Live-Einsatz. Echte Zitate erscheinen hier, sobald sie freigegeben sind."
      : "We are gathering our first round of teacher feedback from live use now. Real quotes will appear here as soon as they are ready.";
  const betaFeedbackCta =
    language === "de" ? "Kostenloses Konto erstellen" : "Create free account";
  const recognitionMomentsHeading =
    language === "de"
      ? "Wenn Lehrkraefte Draft am ehesten nutzen"
      : "When teachers use Draft most";
  const recognitionMomentsIntro =
    language === "de"
      ? "Keine grossen Szenarien. Eher die Momente, in denen eine Nachricht offen bleibt, weil der Ton noch nicht ganz stimmt."
      : "Not dramatic edge cases. More often the moments when a message stays open because the wording still does not feel quite right.";
  const recognitionMoments =
    language === "de"
      ? [
          {
            title: "Sonntagabend",
            body: "Eine Eltern-E-Mail, die Sie schon zum dritten Mal ueberarbeiten, weil sie ruhig klingen soll, aber trotzdem klar bleiben muss.",
          },
          {
            title: "Nach einem schwierigen Unterrichtsmoment",
            body: "Sie muessen nachfassen, ohne dass die Nachricht schaerfer wirkt oder die Situation unnoetig weiter eskaliert.",
          },
          {
            title: "In der Zeugniswoche",
            body: "Sie brauchen Formulierungen, die professionell, ruhig und sofort einsatzbereit sind, auch wenn die Zeit knapp wird.",
          },
        ]
      : [
          {
            title: "Sunday evening",
            body: "A parent email you keep rewriting because it needs to sound calm, but still be clear.",
          },
          {
            title: "After a difficult lesson",
            body: "You need to follow up without making the tone sharper or turning the situation into something bigger.",
          },
          {
            title: "Report deadline week",
            body: "You need wording that feels calm, professional, and ready to use, even when time is tight.",
          },
        ];
  const trustPanelHeading =
    language === "de"
      ? "Lehrkraft-zentrierte Unterstuetzung fuer echte Schulkommunikation"
      : "Teacher-first support for real school communication";
  const trustPanelSubtext =
    language === "de"
      ? "Entwickelt fuer ruhigere, professionellere Formulierungen in den Momenten, in denen Lehrkraefte am ehesten befuerchten, das Falsche zu schreiben."
      : "Built for calmer, more professional wording in the moments teachers are most likely to worry they will say the wrong thing.";
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
            body: "Hilft, Eskalation zu reduzieren und Formulierungen ruhiger und professioneller zu halten.",
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
            title: "Safer wording guardrails",
            body: "Helps reduce escalation and keeps wording calm and professional.",
            icon: CheckCircleIcon,
          },
          {
            title: "Privacy-first design",
            body: "Built for responsible classroom use and careful communication workflows.",
            icon: ShieldIcon,
          },
        ];
  const protectionHeading =
    language === "de"
      ? "Gebaut, um Lehrkraefte zu schuetzen"
      : "Built to protect teachers";
  const protectionSubheading =
    language === "de"
      ? "Draft wurde fuer Kommunikation entwickelt, die weitergeleitet, gescreenshottet oder spaeter geprueft werden kann. Es hilft nicht nur beim Schreiben, sondern dabei, sprachliches und berufliches Risiko zu senken."
      : "Draft is built for communication that may be forwarded, screenshotted, or reviewed later. It does not just help you write faster - it helps reduce language risk and professional risk.";
  const protectionFeatures =
    language === "de"
      ? [
          {
            title: "Riskante Formulierungen erkennen",
            body: "Markiert Wendungen, die zu hart, zu vage oder zu eskalierend wirken koennten, bevor du sendest.",
            icon: InfoIcon,
          },
          {
            title: "Sensible Nachrichten sicherer umschreiben",
            body: "Hilft, schwierige Botschaften ruhiger, klarer und belastbarer zu formulieren, ohne kuenstlich zu klingen.",
            icon: CheckCircleIcon,
          },
          {
            title: "Elternreaktionen besser antizipieren",
            body: "Zeigt, wie eine Formulierung wahrscheinlich ankommt, damit du Missverstaendnisse frueher abfangen kannst.",
            icon: ShieldIcon,
          },
          {
            title: "In den Dokumentationsmodus wechseln",
            body: "Wenn ein Vorfall sauber festgehalten werden muss, stuetzt Draft sachlichere, nachvollziehbare Formulierungen.",
            icon: DocumentIcon,
          },
        ]
      : [
          {
            title: "Detect risky wording",
            body: "Flags phrasing that may read as too sharp, too vague, or too escalatory before you send it.",
            icon: InfoIcon,
          },
          {
            title: "Rewrite sensitive messages more safely",
            body: "Helps turn difficult drafts into calmer, clearer wording without sounding robotic or evasive.",
            icon: CheckCircleIcon,
          },
          {
            title: "Anticipate parent reactions",
            body: "Shows how wording may land with families so you can reduce friction before it starts.",
            icon: ShieldIcon,
          },
          {
            title: "Switch into documentation mode",
            body: "When a situation needs a cleaner paper trail, Draft supports more factual, defensible wording.",
            icon: DocumentIcon,
          },
        ];
  const protectionVisualHeading =
    language === "de"
      ? "So zeigt sich das Schutzsystem im Produkt"
      : "How the safety system shows up in the product";
  const protectionVisualSubheading =
    language === "de"
      ? "Jeder Schutzmechanismus wird mit einem eigenen Produktausschnitt gezeigt, damit Lehrkraefte schnell sehen koennen, wie Draft im echten Schreibmoment hilft."
      : "Each safeguard is shown with its own product view so teachers can quickly see how Draft helps in real writing moments.";
  const protectionVisuals =
    language === "de"
      ? [
          {
            title: "Trigger-Erkennung",
            body: "Warnsignale fuer heikle Formulierungen oder moegliche Eskalations-Trigger.",
            imageSrc: "/images/product/draft-trigger-detection.png",
            alt: "Screenshot of Zaza Draft highlighting trigger detection in a teacher message.",
          },
          {
            title: "Professional-Risk-Alert",
            body: "Ein klarer Hinweis, wenn eine Nachricht beruflich angreifbar wirken koennte.",
            imageSrc: "/images/product/draft-professional-risk-alert.png",
            alt: "Screenshot of Zaza Draft showing a professional risk alert for school communication.",
          },
          {
            title: "Sicherere Ueberarbeitung",
            body: "Vorher-nachher-Ausschnitt einer ruhigeren, belastbareren Formulierung.",
            imageSrc: "/images/product/draft-safer-rewrite.png",
            alt: "Screenshot of Zaza Draft suggesting a safer rewrite for a teacher message.",
          },
          {
            title: "Ueberarbeitung erklaert",
            body: "Eine kurze Erklaerung, warum die ueberarbeitete Version ruhiger, klarer und defensibler klingt.",
            imageSrc: "/images/product/draft-safer-rewrite-explain.png",
            alt: "Screenshot of Zaza Draft explaining why a safer rewrite is recommended.",
          },
          {
            title: "Elternreaktions-Vorschau",
            body: "Ein enger Ausschnitt, der zeigt, wie eine Nachricht wahrscheinlich auf Familien wirkt.",
            imageSrc: "/images/product/draft-parent-reaction-forecast.png",
            alt: "Screenshot of Zaza Draft forecasting how a parent may react to a message.",
          },
          {
            title: "Dokumentationsmodus",
            body: "Beispiel fuer sachliche, nachvollziehbare Formulierungen bei Vorfaellen.",
            imageSrc: "/images/product/draft-documentation-mode.png",
            alt: "Screenshot of Zaza Draft in documentation mode for a factual school record.",
          },
        ]
      : [
          {
            title: "Trigger detection",
            body: "A focused crop showing flagged phrasing or escalation triggers.",
            imageSrc: "/images/product/draft-trigger-detection.png",
            alt: "Screenshot of Zaza Draft highlighting trigger detection in a teacher message.",
          },
          {
            title: "Professional-risk alert",
            body: "A callout that warns when wording may create avoidable professional exposure.",
            imageSrc: "/images/product/draft-professional-risk-alert.png",
            alt: "Screenshot of Zaza Draft showing a professional risk alert for school communication.",
          },
          {
            title: "Safer rewrite",
            body: "A before-and-after crop showing calmer, more defensible wording.",
            imageSrc: "/images/product/draft-safer-rewrite.png",
            alt: "Screenshot of Zaza Draft suggesting a safer rewrite for a teacher message.",
          },
          {
            title: "Rewrite explained",
            body: "A short explanation of why the revised version sounds calmer, clearer, and easier to stand behind.",
            imageSrc: "/images/product/draft-safer-rewrite-explain.png",
            alt: "Screenshot of Zaza Draft explaining why a safer rewrite is recommended.",
          },
          {
            title: "Parent reaction forecast",
            body: "A tight crop showing how wording may land with families before it escalates.",
            imageSrc: "/images/product/draft-parent-reaction-forecast.png",
            alt: "Screenshot of Zaza Draft forecasting how a parent may react to a message.",
          },
          {
            title: "Documentation mode",
            body: "A factual writing view for incident notes and paper-trail communication.",
            imageSrc: "/images/product/draft-documentation-mode.png",
            alt: "Screenshot of Zaza Draft in documentation mode for a factual school record.",
          },
        ];
  const insightsFeatureBadge =
    language === "de" ? "Draft Insights" : "Draft Insights";
  const insightsFeatureHeading =
    language === "de"
      ? "Einblicke, die dir helfen, klueger zu arbeiten"
      : "Insights that help you work smarter";
  const insightsFeatureBody =
    language === "de"
      ? "Draft lernt unaufdringlich aus deinen Schreibmustern und zeigt, wann und wie du am besten kommunizierst. So lassen sich Arbeit nach Feierabend reduzieren und Formulierungen mit der Zeit klarer machen."
      : "Draft quietly learns from your writing patterns and shows when and how you communicate best - helping reduce after-hours work and improve clarity over time.";
  const insightsFeaturePoints =
    language === "de"
      ? [
          "Zeigt, wann deine ruhigsten und produktivsten Schreibzeiten liegen.",
          "Macht Muster sichtbar, die zu klarerer Elternkommunikation fuehren.",
          "Hilft, Arbeit am Abend bewusster zu begrenzen.",
        ]
      : [
          "Shows when your calmest, most productive writing windows happen.",
          "Highlights patterns that lead to clearer parent communication.",
          "Helps you reduce unnecessary after-hours drafting over time.",
        ];
  const insightsFeatureAlt =
    language === "de"
      ? "Screenshot des Zaza-Draft-Insights-Dashboards mit Heatmap der produktivsten Schreibzeiten."
      : "Screenshot of the Zaza Draft Insights dashboard heatmap showing a teacher's strongest drafting times.";
  const heroProofBarHeadline =
    language === "de"
      ? "Lehrkraefte in der ersten Nutzungsphase haben mit Draft bereits 70+ sicherere Schulnachrichten geschrieben."
      : "Early teachers using Draft have already written 70+ safer school messages.";
  const heroProofBarPoints =
    language === "de"
      ? [
          "Sicherere Elternkommunikation",
          "Stunden an Schreiben nach Schulschluss gespart",
          "Speziell fuer Lehrkraefte entwickelt",
        ]
      : [
          "Safer parent communication",
          "Hours of after-school writing saved",
          "Built specifically for teachers",
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
  const recognitionHeading =
    language === "de"
      ? "Fuer Lehrkraefte, die ohne Angst vor der falschen Formulierung schreiben wollen"
      : "For teachers who want to write without worrying they will say the wrong thing";
  const recognitionItems =
    language === "de"
      ? [
          "E-Mails an Eltern dreimal umschreiben, bevor sie abgesendet werden.",
          "befuerchten, dass eine Formulierung zu hart klingt oder eskalieren koennte.",
          "Unterstuetzung wollen, ohne dass KI ihre Stimme uebernimmt.",
        ]
      : [
          "rewrite parent emails three times before sending.",
          "worry a message could sound too harsh or escalate.",
          "want support, not AI taking over their voice.",
        ];
  const comparisonHeading =
    language === "de"
      ? "Warum Draft mehr ist als ein generischer Textgenerator"
      : "Why Draft is more than a generic text generator";
  const comparisonSubheading =
    language === "de"
      ? "Generische KI hilft beim Formulieren. Draft hilft Lehrkraeften, in echten Schulsituationen sicherer zu kommunizieren."
      : "Generic AI helps generate text. Draft helps teachers communicate more safely in real school situations.";
  const comparisonClarifier =
    language === "de"
      ? "Der Unterschied liegt nicht nur im Ton. Draft ist fuer Elternkommunikation, Eskalationsrisiken und saubere Dokumentation im Schulalltag gebaut."
      : "The difference is not just tone. Draft is built for parent communication, escalation risk, and defensible documentation in day-to-day school work.";
  const comparisonProofPoints =
    language === "de"
      ? [
          "Erkennt riskante Sprache, bevor sie gesendet wird.",
          "Hilft, eskalationsanfaellige Formulierungen zu vermeiden.",
          "Unterstuetzt einen Dokumentationsmodus fuer sensible Situationen.",
          "Gebaut fuer echte Elternkommunikation statt generischer Prompt-Tricks.",
        ]
      : [
          "Detects risky language before it is sent.",
          "Helps avoid escalation-prone wording.",
          "Supports a documentation mode for sensitive situations.",
          "Built for real parent communication, not generic prompting.",
        ];
  const comparisonRows =
    language === "de"
      ? [
          {
            feature: t("comparison.rows.training.feature"),
            generic: t("comparison.rows.training.generic"),
            zaza: t("comparison.rows.training.zaza"),
          },
          {
            feature: "Riskante Sprache erkennen",
            generic:
              "Generiert Text, markiert aber nicht verlässlich, wenn Formulierungen unnötig hart, vage oder angreifbar wirken.",
            zaza: "Hebt problematische Formulierungen hervor, bevor eine Nachricht rausgeht.",
          },
          {
            feature: "Eskalation vermeiden",
            generic:
              "Kann glatter schreiben, prueft aber nicht gezielt auf beschwerde- oder eskalationsanfaellige Sprache.",
            zaza: "Hilft Lehrkräften, Formulierungen zu beruhigen und unnötige Reibung mit Familien zu verringern.",
          },
          {
            feature: "Elternkommunikation",
            generic:
              "Hilft bei allgemeinen Prompts, aber nicht speziell bei realen schulischen Elternsituationen.",
            zaza: "Fuer Elternmails, Verhaltenshinweise und sensible Follow-ups im Schulkontext gebaut.",
          },
          {
            feature: "Dokumentationsmodus",
            generic:
              "Unterstuetzt eher glatte Sprache als sachliche, nachvollziehbare Vorfallsdokumentation.",
            zaza: "Kann in eine klarere, dokumentationsfreundliche Schreibweise wechseln, wenn ein sauberer Schriftverlauf wichtig ist.",
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
        ]
      : [
          {
            feature: t("comparison.rows.training.feature"),
            generic: t("comparison.rows.training.generic"),
            zaza: t("comparison.rows.training.zaza"),
          },
          {
            feature: "Risky language detection",
            generic:
              "Generates text, but does not reliably flag wording that feels unnecessarily sharp, vague, or exposed.",
            zaza: "Highlights risky language before a message leaves your draft.",
          },
          {
            feature: "Escalation-aware wording",
            generic:
              "Can sound smoother, but does not actively help you avoid complaint-prone phrasing.",
            zaza: "Helps teachers reduce escalation-prone wording before it reaches families.",
          },
          {
            feature: "Real parent communication",
            generic:
              "Useful for broad prompting, but not specifically built for day-to-day school communication with parents.",
            zaza: "Built for parent emails, behaviour updates, and sensitive follow-up in school context.",
          },
          {
            feature: "Documentation mode",
            generic:
              "More focused on fluent copy than factual, defensible record-keeping.",
            zaza: "Can shift into a clearer documentation style when the paper trail matters.",
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
        ];
  const activeProofSection = heroProofSections[activeProofIndex];

  const showPreviousProof = () => {
    setActiveProofIndex((current) =>
      current === 0 ? heroProofSections.length - 1 : current - 1,
    );
  };

  const showNextProof = () => {
    setActiveProofIndex((current) =>
      current === heroProofSections.length - 1 ? 0 : current + 1,
    );
  };

  const handleProofCarouselKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousProof();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextProof();
    }
  };

  const scrollToDemo = () => {
    track("cta_click_home_see_examples", { language });
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F172A] pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[57%_43%] lg:gap-12">
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
                    href={teacherCheckoutHref}
                    onClick={() =>
                      track("cta_click_home_get_started", { language })
                    }
                  >
                    {heroPrimaryCtaLabel}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-transform transition-shadow duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 group active:scale-[0.98]"
                >
                  <Link
                    href={starterSignupHref}
                    onClick={() =>
                      track("cta_click_home_try_free", { language })
                    }
                  >
                    {heroSecondaryCtaLabel}
                  </Link>
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
                {heroCtaReassuranceLine}
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
              className="w-full pt-4 md:pt-6 lg:pt-8"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.8, delay: 0.3 }
                  : {
                      opacity: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                      x: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                    }
              }
            >
              <div className="relative mx-auto max-w-[500px] xl:max-w-[520px]">
                <div className="absolute inset-x-8 inset-y-8 rounded-[28px] bg-gradient-to-br from-[#A855F7]/28 via-[#1E1B4B]/18 to-[#EC4899]/22 blur-3xl" />
                <div className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_28px_90px_-50px_rgba(168,85,247,0.55)] backdrop-blur-xl sm:p-4">
                  <section
                    className="rounded-[22px] border border-white/10 bg-[#0B1120]/95 p-4 sm:p-5"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={heroProofLabel}
                    aria-describedby="hero-proof-caption"
                    tabIndex={0}
                    onKeyDown={handleProofCarouselKeyDown}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A78BFA]">
                          {heroOutcomeLabel}
                        </p>
                        <h2 className="mt-2 max-w-[420px] text-lg font-semibold text-white sm:text-xl">
                          {heroProofLabel}
                        </h2>
                        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#A78BFA]">
                          {heroProofFrameLine}
                        </p>
                        <p className="mt-2 max-w-[420px] text-sm leading-6 text-[#94A3B8]">
                          {heroProofIntro}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#CBD5E1]">
                          <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                          <span>{heroAfterMeta}</span>
                        </div>
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={showPreviousProof}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white shadow-[0_10px_30px_-18px_rgba(168,85,247,0.55)] transition-colors hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:ring-offset-2 focus:ring-offset-[#0B1120]"
                            aria-label={
                              language === "de"
                                ? "Vorheriges Beispiel anzeigen"
                                : "Show previous example"
                            }
                            aria-controls="hero-proof-slide"
                          >
                            <ArrowRight className="h-4 w-4 rotate-180" />
                          </button>
                          <button
                            type="button"
                            onClick={showNextProof}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white shadow-[0_10px_30px_-18px_rgba(168,85,247,0.55)] transition-colors hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:ring-offset-2 focus:ring-offset-[#0B1120]"
                            aria-label={
                              language === "de"
                                ? "Naechstes Beispiel anzeigen"
                                : "Show next example"
                            }
                            aria-controls="hero-proof-slide"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <section
                      id="hero-proof-slide"
                      className="mt-5 min-h-[34rem] rounded-[22px] border border-white/10 bg-[#0F172A]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:min-h-[31rem] lg:min-h-[24rem]"
                      aria-live="polite"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
                            {activeProofSection.title}
                          </p>
                          <h3 className="mt-2 text-base font-semibold text-white sm:text-lg">
                            {activeProofSection.context}
                          </h3>
                        </div>
                        <p className="text-xs text-[#94A3B8]">
                          {language === "de"
                            ? `Beispiel ${activeProofIndex + 1} von ${heroProofSections.length}`
                            : `Example ${activeProofIndex + 1} of ${heroProofSections.length}`}
                        </p>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <article className="rounded-[18px] border border-white/10 bg-[#111827] p-3.5 sm:p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-100">
                              <span>{heroBeforeLabel}</span>
                            </div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#CBD5E1]">
                              {heroBeforeMeta}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-[#CBD5E1]">
                            {activeProofSection.before}
                          </p>
                        </article>

                        <article className="rounded-[18px] border border-emerald-400/20 bg-[linear-gradient(180deg,rgba(17,24,39,0.98),rgba(15,23,42,0.94))] p-3.5 shadow-[0_24px_70px_-42px_rgba(16,185,129,0.35)] ring-1 ring-white/5 sm:p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
                              <span>{heroAfterLabel}</span>
                            </div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E9D5FF]">
                              {heroAfterMeta}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-white">
                            {activeProofSection.after}
                          </p>
                        </article>
                      </div>
                    </section>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p
                        id="hero-proof-caption"
                        className="text-sm text-[#94A3B8]"
                      >
                        {heroProofCaption}
                      </p>
                      <div
                        className="flex items-center gap-3"
                        aria-label={
                          language === "de"
                            ? "Karussell-Paginierung"
                            : "Carousel pagination"
                        }
                      >
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#CBD5E1]">
                          {heroProofBrowseLabel}
                        </span>
                        {heroProofSections.map((section, index) => (
                          <button
                            key={section.title}
                            type="button"
                            onClick={() => setActiveProofIndex(index)}
                            className={`h-3 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:ring-offset-2 focus:ring-offset-[#0B1120] ${
                              activeProofIndex === index
                                ? "w-8 border-[#C4B5FD] bg-[#A78BFA] shadow-[0_0_18px_rgba(167,139,250,0.45)]"
                                : "w-3 border-white/30 bg-white/20 hover:bg-white/35"
                            }`}
                            aria-label={
                              language === "de"
                                ? `Beispiel ${index + 1} anzeigen`
                                : `Show example ${index + 1}`
                            }
                            aria-current={
                              activeProofIndex === index ? "true" : "false"
                            }
                          />
                        ))}
                      </div>
                    </div>
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
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
      </section>

      <section className="border-t border-white/5 bg-[#0B1220] py-5 md:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.95)] backdrop-blur-sm md:px-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-2xl text-sm font-medium leading-6 text-[#E2E8F0]">
                {heroProofBarHeadline}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:justify-end">
                {heroProofBarPoints.map((point) => (
                  <div
                    key={point}
                    className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-3 py-2 text-sm text-[#CBD5E1]"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-[#0F172A] py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(11,18,32,0.98))] p-8 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.95)] ring-1 ring-white/5 md:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                {recognitionMomentsHeading}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {recognitionMomentsHeading}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#CBD5E1]">
                {recognitionMomentsIntro}
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {recognitionMoments.map((moment) => (
                <article
                  key={moment.title}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A78BFA]">
                    {moment.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#CBD5E1]">
                    {moment.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
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

      <section className="border-t border-white/5 bg-[#08111F] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                <ShieldIcon className="h-4 w-4" />
                <span>{protectionHeading}</span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {protectionHeading}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#CBD5E1]">
                {protectionSubheading}
              </p>
              <div className="mt-8 grid gap-4">
                {protectionFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <article
                      key={feature.title}
                      className="rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.95)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#C4B5FD]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {feature.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">
                            {feature.body}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,41,59,0.9),rgba(15,23,42,0.98))] p-6 shadow-[0_30px_90px_-48px_rgba(15,23,42,0.95)] ring-1 ring-white/5 md:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#A78BFA]">
                    {protectionVisualHeading}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
                    {protectionVisualSubheading}
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#CBD5E1]">
                  {language === "de" ? "Produktansichten" : "Product views"}
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {protectionVisuals.map((visual) => (
                  <article
                    key={visual.title}
                    className="rounded-2xl border border-white/8 bg-[#0B1220]/85 p-4"
                  >
                    <p className="text-sm font-semibold text-white">
                      {visual.title}
                    </p>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#060B16]">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={visual.imageSrc}
                          alt={visual.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                        />
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#CBD5E1]">
                      {visual.body}
                    </p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#0B1220] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                <ShieldIcon className="h-4 w-4" />
                <span>{insightsFeatureBadge}</span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {insightsFeatureHeading}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#CBD5E1]">
                {insightsFeatureBody}
              </p>
              <div className="mt-8 grid gap-3">
                {insightsFeaturePoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-4 text-sm leading-6 text-[#CBD5E1] shadow-[0_18px_50px_-42px_rgba(15,23,42,0.95)]"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,41,59,0.9),rgba(15,23,42,0.98))] p-5 shadow-[0_30px_90px_-48px_rgba(15,23,42,0.95)] ring-1 ring-white/5 md:p-7"
            >
              <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#060B16]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/product/draft-insights-heatmap.png"
                    alt={insightsFeatureAlt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1E293B] py-16 md:py-24">
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] py-16 md:py-24">
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
      <section className="bg-[#0F172A] py-16">
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

      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-20">
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

      <section className="bg-[#0F172A] py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.95)] md:p-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#A78BFA]">
                {recognitionHeading}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
                {language === "de"
                  ? "Zaza Draft ist fuer die Kommunikation gedacht, die zu oft im Entwurf stecken bleibt."
                  : "Zaza Draft is for the communication that too often gets stuck in drafts."}
              </p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {recognitionItems.map((item) => (
                <article
                  key={item}
                  className="rounded-2xl border border-white/8 bg-[#111827]/70 px-4 py-4 text-sm leading-6 text-[#E2E8F0]"
                >
                  {item}
                </article>
              ))}
            </div>
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
      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-20">
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
      <section className="bg-[#0F172A] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {comparisonHeading}
            </h2>
            <p className="text-lg text-[#CBD5E1]">{comparisonSubheading}</p>
            <p className="text-sm text-[#94A3B8] mt-3 max-w-3xl mx-auto">
              {comparisonClarifier}
            </p>
            <div className="mt-6 grid gap-3 text-left md:grid-cols-2">
              {comparisonProofPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[#CBD5E1]"
                >
                  {point}
                </div>
              ))}
            </div>
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
                  {comparisonRows.map((row, index) => (
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
      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-20">
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
      <section className="bg-[#0F172A] py-20">
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
              <Link href={signupHref}>{betaFeedbackCta}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] py-20">
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
