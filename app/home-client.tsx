"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { SignupModal } from "@/components/signup-modal";
import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { track, trackCtaClick } from "@/lib/analytics";
import { DraftDemo } from "@/components/draft-demo";
import { CaseStudyCarousel } from "@/components/case-study-carousel";
import { SocialProofBadges } from "@/components/social-proof-badges";
import { getPopularGuideLinks } from "@/lib/guides";

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
  const [heroProofIndex, setHeroProofIndex] = useState(0);
  const [showHallucinationTooltip, setShowHallucinationTooltip] =
    useState(false);
  const prefersReducedMotion = useReducedMotion();
  const startHref = language === "de" ? "/de/start" : "/start";
  const angryParentGuideHref =
    language === "de"
      ? "/de/parent-email-risk-checker"
      : "/how-to-respond-to-an-angry-parent-email";
  const founderStoryHref =
    language === "de" ? "/de/about/founder" : "/about/founder";
  const heroEyebrow = language === "de" ? "FUER LEHRKRAEFTE" : "FOR TEACHERS";
  const heroBadge =
    language === "de"
      ? "Sensible Schulkommunikation mit integrierter Sicherheitsebene"
      : "High-stakes school messages with a built-in safety layer";
  const heroHeadline =
    language === "de"
      ? "Schreibe Eltern-E-Mails und Schulnachrichten"
      : "Write parent emails and school messages";
  const heroHeadlineAccent =
    language === "de"
      ? "ohne staendig zu fragen, wie sie aufgefasst werden."
      : "without second-guessing how they will be interpreted.";
  const heroSubheading =
    language === "de"
      ? "Zaza hilft Lehrkraeften, ruhige Eltern-E-Mails, klarere Schulnachrichten und aussagekraeftigere Zeugnisformulierungen fuer Momente zu verfassen, die sich unsicher anfuehlen - bevor Ton, Wortwahl oder Timing eine Situation groesser werden lassen."
      : "Zaza helps teachers draft calm parent emails, clearer school messages, and more meaningful report comments before tone, wording, or timing turn a situation into something bigger.";
  const heroEntityLine =
    language === "de"
      ? "Zaza Draft ist keine generische Schreibhilfe. Es ist ein lehrkraft-zentrierter Co-Writer fuer professionelle Elternkommunikation und wertvolle Schuldokumentation - gerade dann, wenn Interpretation ebenso viel zaehlt wie Formulierung. Du pruefst, bearbeitest und gibst jede Formulierung selbst frei."
      : "Zaza Draft is not generic AI writing help. It is a teacher-first co-writer for professional parent communication and meaningful school documentation, built for the moments where interpretation matters as much as wording. You review, edit, and approve every word before it is used.";
  const heroOutcomeLabel =
    language === "de" ? "Vorher und nachher" : "Before and after";
  const heroProofHeading =
    language === "de"
      ? "Von riskant zu professionell in Sekunden"
      : "From risky to professional in seconds";
  const heroProofLabel =
    language === "de"
      ? "Das ist die Art von Nachricht, bei der Lehrkraefte zoegern."
      : "This is the kind of message teachers hesitate over.";
  const heroProofIntro =
    language === "de"
      ? "Sieh, wie Draft eine Nachricht vor dem Senden formt, bevor Ton, Timing oder Wortwahl sie schwerer machen."
      : "See how Draft helps shape a message before tone, wording, or timing make it harder to send.";
  const heroProofFrameLine =
    language === "de"
      ? "Wie sensible Nachrichten ruhiger und verteidigbarer werden."
      : "How Draft turns risky wording into calm, professional school communication.";
  const heroBeforeLabel = language === "de" ? "Vorher" : "Before";
  const heroAfterLabel = language === "de" ? "Nachher" : "After";
  const heroBeforeMeta =
    language === "de"
      ? "Zu hart oder eskalationsanfaellig"
      : "Too sharp or escalation-prone";
  const heroAfterMeta =
    language === "de"
      ? "Ruhig, klar und professionell"
      : "Calm, clear, and professional";
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
            context: "Behaviour update to a parent",
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
  const activeHeroProof =
    heroProofSections[heroProofIndex] ?? heroProofSections[0];
  const heroProofCaption =
    language === "de"
      ? "Eine klare Tonverbesserung, ohne die eigentliche Botschaft zu verlieren."
      : "A clearer tone shift without losing the core message.";
  const heroMentalLoadLine =
    language === "de"
      ? "Weniger Zweifeln in dem Moment vor dem Senden."
      : "Less second-guessing in the moment before send.";
  const heroPrevLabel = language === "de" ? "Zurueck" : "Previous";
  const heroNextLabel = language === "de" ? "Weiter" : "Next";
  const heroTrustBarIntro =
    language === "de"
      ? "Fuer Lehrkraefte, die Kommunikation ruhig, klar und belastbar halten muessen."
      : "Built for teachers who need communication to stay calm, clear, and defensible.";
  const heroTrustBarDifferentiator =
    language === "de"
      ? "Besonders dann, wenn du nicht sicher bist, wie eine Nachricht aufgenommen wird."
      : "Especially when you are not sure how a message will land.";
  const heroCtaMicrocopy =
    language === "de"
      ? "Die Nachricht, die am laengsten dauert, ist meistens die, die am meisten Gewicht hat."
      : "The message that takes the longest is usually the one that matters most.";
  const heroCheckerLabel =
    language === "de"
      ? "Kostenlosen Risiko-Check fuer Elternmails testen"
      : "Try the free Parent Email Risk Checker";
  const heroCheckerSupport =
    language === "de"
      ? "Pruefe, ob eine Elternmail zu direkt, defensiv oder leicht missverstaendlich wirken koennte, und erhalte vor dem Senden eine ruhigere Version."
      : "Check whether a parent email may sound too blunt, defensive, or easy to misread, and get a safer version before you send it.";
  const primaryStartLabel =
    language === "de" ? "Zaza Draft testen" : "Try Zaza Draft";
  const heroTeacherUsageLine =
    language === "de"
      ? "Entwickelt fuer professionelle Eltern-E-Mails, schwierige Follow-ups, Verhaltens-Notizen, aussagekraeftigere Zeugnisbemerkungen und andere sensible Schulkommunikation."
      : "Built for professional parent emails, difficult follow-ups, behaviour notes, more meaningful report comments, and other high-stakes school communication.";
  const pricingHref = language === "de" ? "/de/pricing" : "/pricing";
  const heroTrustBarPoints =
    language === "de"
      ? [
          "Fuer Lehrkraefte entwickelt",
          "Reduziert Ton- und Eskalationsrisiko",
          "Du pruefst jede Nachricht vor dem Senden",
        ]
      : [
          "Built for teachers",
          "Reduces tone and escalation risk",
          "You review every message before sending",
        ];
  const betaFeedbackHeading =
    language === "de"
      ? "Zaza Draft ist live fuer sensible Schulkommunikation"
      : "Zaza Draft is live for high-stakes school communication";
  const betaFeedbackBody =
    language === "de"
      ? "Starte mit Zaza Draft, wenn du Eltern-E-Mails, schwierige Antworten, Zeugnisbemerkungen und Dokumentation mit mehr Sicherheit formulieren willst - besonders die Texte, die du sonst dreimal umschreibst."
      : "Start with Zaza Draft if you want calmer parent emails, more useful report comments, and clearer documentation - especially the pieces of writing you almost rewrite one more time.";
  const betaFeedbackCta =
    language === "de" ? "Zaza Draft testen" : "Try Zaza Draft";
  const summaryTitle =
    language === "de"
      ? "Die kurze Antwort fuer Lehrkraefte"
      : "The short answer for teachers";
  const summaryIntro =
    language === "de"
      ? "Wenn du schnell einordnen willst, was Zaza Draft macht und ob es fuer deinen Alltag passt, steht hier die knappe Version."
      : "If you want the fast version before you click again, this is what Zaza Draft does, who it is for, and what to do next.";
  const trustPanelHeading =
    language === "de"
      ? "Lehrkraft-zentrierte Unterstuetzung fuer sensible Schulkommunikation"
      : "Teacher-first support for high-stakes school communication";
  const trustPanelSubtext =
    language === "de"
      ? "Wenn eine Nachricht schwer zu senden ist oder eine Zeugnisbemerkung noch zu oberflaechlich klingt, braucht es oft mehr als bessere Formulierungen. Draft ist als zweite Instanz vor dem Senden oder Einreichen gedacht - fuer Momente, in denen Ton, Klarheit, Professionalitaet und Aussagekraft besonders viel Gewicht tragen."
      : "When a message feels difficult to send or a report comment still feels too obvious to submit, it usually needs more than better wording. Draft is designed as a second pair of eyes before sending or submitting, for the moments when tone, clarity, professionalism, and value carry the most weight.";
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
            body: "Built for parent emails, complaint replies, documentation, and school messages that may be forwarded, challenged, or reviewed later.",
            icon: DocumentIcon,
          },
          {
            title: "Safer wording guardrails",
            body: "Helps reduce tone risk, avoid escalation, and keep wording calm, clear, and appropriate.",
            icon: CheckCircleIcon,
          },
          {
            title: "Privacy-first design",
            body: "Designed for careful school workflows where professional judgement and data handling both matter.",
            icon: ShieldIcon,
          },
        ];
  const situationsHeading =
    language === "de"
      ? "Wenn die Formulierung mehr Gewicht hat als sonst"
      : "When the wording matters more than usual";
  const situationsBody =
    language === "de"
      ? "Zaza Draft ist fuer die Nachrichten gebaut, bei denen Lehrkraefte zoegern - fuer Formulierungen, die falsch gelesen, weitergeleitet oder groesser werden koennen, wenn der Ton nicht sauber sitzt."
      : "Zaza Draft is built for the messages teachers hesitate over - the ones that can be misread, forwarded, or turn into something bigger if the tone lands badly.";
  const situationsItems =
    language === "de"
      ? [
          "Veraergerte Eltern-E-Mails",
          "Beschwerdeantworten",
          "Verhaltens-Updates",
          "Schwierige Follow-up-E-Mails",
          "Dokumentation nach einem Gespraech",
          "Zeugnisbemerkungen",
        ]
      : [
          "Angry parent emails",
          "Complaint responses",
          "Behaviour updates",
          "Difficult follow-up emails",
          "Documentation after a meeting",
          "Report comments",
        ];
  const guidesHeading =
    language === "de"
      ? "Praktische Leitfaeden fuer schwierige Schulkommunikation"
      : "Practical guides for difficult school communication";
  const guidesIntro =
    language === "de"
      ? "Wenn du noch kein Tool ausprobieren willst, starte mit einem dieser lehrkraft-zentrierten Leitfaeden zu Ton, Professionalitaet und aussagekraeftigeren Kommentaren."
      : "If you are not ready to try a tool yet, start with one of these teacher-first guides on tone, professionalism, and more meaningful comments.";
  const guidesHubHref = "/guides";
  const guidesHubLabel =
    language === "de" ? "Alle Leitfaeden ansehen" : "Browse all guides";
  const guidesHubSupport =
    language === "de"
      ? "Gehe zur Guide-Uebersicht fuer alle Leitfaeden zu Elternkommunikation, Deeskalation und professionelleren Bemerkungen."
      : "Go to the guide hub for the full set of teacher communication guides on parent emails, de-escalation, and report comments.";
  const guideLinks = getPopularGuideLinks()
    .slice(0, 4)
    .map((guide) => ({
      href: guide.href,
      title: guide.label,
      description: guide.description,
    }));
  const finalGuideLabel =
    language === "de"
      ? "Risiko-Check fuer Elternmails ansehen"
      : "Read a guide for difficult parent emails";
  const finalHeading =
    language === "de"
      ? "Die Nachricht, die du morgen nicht bereust"
      : "The message you won’t regret tomorrow";
  const finalSubheading =
    language === "de"
      ? "Gerade die Nachricht, die du fast anders geschickt haettest. Nur ein ruhigerer Entwurf, den du pruefen, vertreten und senden kannst."
      : "Especially the one you almost sent differently. Just a calmer draft you can review, trust, and send.";
  const useCasesHeading =
    language === "de"
      ? "Wofuer Lehrkraefte Zaza Draft am ehesten brauchen"
      : "Where teachers most need wording support";
  const useCasesIntro =
    language === "de"
      ? "Lehrkraefte brauchen nicht nur Hilfe beim schnelleren Schreiben. Sie brauchen besseres Urteilsvermoegen fuer Elternkommunikation, Zeugnisbemerkungen und Dokumentation, die spaeter genau gelesen werden koennte."
      : "Teachers do not just need faster writing. They need better judgement for parent communication, report comments, and documentation that may be read closely later.";
  const comparisonHeading =
    language === "de"
      ? "Warum Lehrkraefte Zaza Draft statt ChatGPT nutzen"
      : "Why teachers use Zaza Draft instead of ChatGPT";
  const comparisonSubheading =
    language === "de"
      ? "Generische KI kann Text erzeugen. Zaza Draft ist dafuer gebaut, Lehrkraeften zu helfen, ruhigere und sicherere Schulkommunikation zu senden, ohne erst den richtigen Prompt erfinden zu muessen."
      : "Generic AI can produce text. Zaza Draft is built to help teachers send calmer, safer school communication without having to invent the right prompt from scratch.";
  const comparisonClarifier =
    language === "de"
      ? "Wenn eine Nachricht weitergeleitet, gescreenshottet oder spaeter noch einmal gelesen werden koennte, braucht es mehr als fluechtigen Text."
      : "When a message might be forwarded, screenshotted, or read again later, teachers usually need more than fluent text.";
  const skepticalBlockHeading =
    language === "de"
      ? "Warum nicht einfach ChatGPT?"
      : "Why not just use ChatGPT?";
  const skepticalBlockBody =
    language === "de"
      ? "Du kannst generische KI nutzen, um Text zu entwerfen. Aber Lehrkraefte brauchen oft mehr als ein leeres Chatfenster. Zaza Draft ist auf die Texte ausgerichtet, bei denen kleine Formulierungsentscheidungen grosse Wirkung haben: Eltern-E-Mails, Verhaltensfragen, Follow-ups, Zeugnisbemerkungen und Dokumentation, die spaeter weitergeleitet, gescreenshottet oder erneut gelesen werden koennte. Es hilft dir dabei, schneller zu ruhigeren, professionelleren und wertvolleren Formulierungen zu kommen, ohne dein eigenes Urteilsvermoegen zu verlieren."
      : "You can use generic AI to draft text. But teachers often need more than a blank chat box. Zaza Draft is built around the pieces of writing where small wording choices can have outsized consequences: parent emails, behaviour concerns, follow-ups, report comments, and documentation that may be forwarded, screenshotted, or revisited later. It is designed to help teachers get to calmer, more professional, more useful wording without losing their own judgement.";
  const communicationCalloutEyebrow =
    language === "de"
      ? "Wie gute Kommunikation gelesen wird"
      : "How good communication is received";
  const communicationCalloutHeading =
    language === "de"
      ? "Gute Kommunikation haengt nicht nur davon ab, was du sagst. Sondern auch davon, was Eltern daraus hoeren."
      : "Good communication is not just about what you say. It is also about what parents hear.";
  const communicationCalloutIntro =
    language === "de"
      ? "Lehrkraefte brauchen nicht einfach mehr Text. Sie brauchen mehr Sicherheit darin, dass Ton, Klarheit und Aussagekraft wirklich zusammenpassen."
      : "Teachers do not just need more text. They need more confidence that tone, clarity, and value are working together.";
  const communicationCalloutCards =
    language === "de"
      ? [
          {
            title: "Professionell ist nicht gleich kalt",
            weakerLabel: "Klingt kalt",
            weaker:
              "Ich habe Ihre Nachricht erhalten. Oliver muss sein Verhalten verbessern.",
            strongerLabel: "Klingt professionell",
            stronger:
              "Danke fuer Ihre Nachricht. Ich wollte kurz teilen, was heute passiert ist und wie wir Oliver dabei unterstuetzen, positive Verhaltensmuster aufzubauen.",
            href: "/de/features",
            linkLabel: "Mehr zu Ton und Formulierung mit Draft",
          },
          {
            title:
              "Gute Zeugnisbemerkungen gehen ueber das Offensichtliche hinaus",
            weakerLabel: "Zu offensichtlich",
            weaker: "Amelia ist freundlich und arbeitet hart.",
            strongerLabel: "Hilfreicher",
            stronger:
              "Amelia arbeitet ruhig und zuverlaessig. Besonders stark ist ihre Faehigkeit, schwierige Aufgaben geduldig durchzudenken und Feedback schnell umzusetzen.",
            href: "/de/products/draft",
            linkLabel: "Mehr zu aussagekraeftigeren Berichtskommentaren",
          },
          {
            title: "Kleine Formulierungsentscheidungen veraendern die Wirkung",
            weakerLabel: "Vage oder riskant",
            weaker: "Es gab in letzter Zeit ein paar Probleme.",
            strongerLabel: "Klarer und ruhiger",
            stronger:
              "Ich wollte Ihnen kurz zwei Momente aus dieser Woche schildern, in denen Noah waehrend der Gruppenarbeit Erinnerungen brauchte, damit Sie ein klares Bild davon haben, woran wir in der Schule gerade arbeiten.",
            href: "/de/start",
            linkLabel: "Mehr zu professioneller Elternkommunikation",
          },
        ]
      : [
          {
            title: "Professional is not the same as cold",
            weakerLabel: "Reads colder",
            weaker:
              "I have received your email. Oliver needs to improve his behaviour.",
            strongerLabel: "Reads more professional",
            stronger:
              "Thank you for your email. I wanted to briefly share what happened today and how we are supporting Oliver to build more positive classroom habits.",
            href: "/teacher-email-tone-guide",
            linkLabel: "Learn more about teacher email tone",
          },
          {
            title: "Good report comments go beyond the obvious",
            weakerLabel: "Too obvious",
            weaker: "Amelia is kind and works hard.",
            strongerLabel: "More informative",
            stronger:
              "Amelia approaches her work with quiet consistency. She is especially strong at thinking carefully through difficult tasks and responding thoughtfully to feedback.",
            href: "/what-parents-already-know-report-comments",
            linkLabel: "Learn more about meaningful report comments",
          },
          {
            title: "Small wording choices change the impact",
            weakerLabel: "Vague or riskier",
            weaker: "There have been a few issues lately.",
            strongerLabel: "Clearer and calmer",
            stronger:
              "I wanted to share a brief update about two moments this week where Noah needed reminders during group work, so you have a clear picture of what we are addressing in school.",
            href: "/professional-parent-emails-for-teachers",
            linkLabel: "Learn more about professional parent emails",
          },
        ];
  const finalCtaBridgeLine =
    language === "de"
      ? "Wenn ChatGPT dir Text gibt, hilft Zaza Draft dir dabei, die Version zu senden, die du morgen nicht bereust."
      : "If ChatGPT gives you text, Zaza Draft is the tool that helps you send the version you will not regret tomorrow.";

  const goToGuide = (href: string, location: string, label: string) => {
    trackCtaClick({
      ctaText: label,
      ctaLocation: location,
    });
    track("seo_guide_link_clicked", {
      source: location,
      language,
      href,
    });
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
                    href={startHref}
                    onClick={() => {
                      trackCtaClick({
                        ctaText: primaryStartLabel,
                        ctaLocation: "hero",
                      });
                      track("cta_click_home_get_started", { language });
                    }}
                  >
                    {primaryStartLabel}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-transform transition-shadow duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 group active:scale-[0.98]"
                >
                  <Link
                    href={angryParentGuideHref}
                    onClick={() =>
                      goToGuide(
                        angryParentGuideHref,
                        "home_hero_secondary",
                        finalGuideLabel,
                      )
                    }
                  >
                    {finalGuideLabel}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: "easeOut" }}
                className="max-w-[680px] mx-auto lg:mx-0"
              >
                <Link
                  href={
                    language === "de"
                      ? "/de/parent-email-risk-checker"
                      : "/parent-email-risk-checker"
                  }
                  onClick={() => {
                    trackCtaClick({
                      ctaText: heroCheckerLabel,
                      ctaLocation: "home_hero_checker",
                    });
                    track("checker_link_clicked", {
                      source: "home_hero",
                      language,
                    });
                  }}
                  className="block rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left transition-colors hover:bg-white/[0.07]"
                >
                  <p className="text-base font-semibold text-white">
                    {heroCheckerLabel}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#CBD5E1]">
                    {heroCheckerSupport}
                  </p>
                </Link>
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
                          {heroProofHeading}
                        </h2>
                        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#C4B5FD]">
                          {heroProofLabel}
                        </p>
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

                    <div className="mt-5 rounded-[22px] border border-white/10 bg-[#0F172A]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-white sm:text-base">
                            {activeHeroProof.title}
                          </h3>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#64748B]">
                            {activeHeroProof.context}
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
                            {activeHeroProof.before}
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
                            {activeHeroProof.after}
                          </p>
                        </article>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {heroProofSections.map((section, index) => {
                            const isActive = index === heroProofIndex;
                            return (
                              <button
                                key={section.title}
                                type="button"
                                onClick={() => setHeroProofIndex(index)}
                                aria-label={`${section.title} ${section.context}`}
                                className={`h-2.5 rounded-full transition-all duration-150 ${
                                  isActive
                                    ? "w-8 bg-[#8B5CF6]"
                                    : "w-2.5 bg-[#334155] hover:bg-[#64748B]"
                                }`}
                              />
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setHeroProofIndex(
                                (heroProofIndex -
                                  1 +
                                  heroProofSections.length) %
                                  heroProofSections.length,
                              )
                            }
                            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                          >
                            {heroPrevLabel}
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() =>
                              setHeroProofIndex(
                                (heroProofIndex + 1) % heroProofSections.length,
                              )
                            }
                            className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white hover:opacity-95"
                          >
                            {heroNextLabel}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-[#94A3B8]">
                      {heroProofCaption}
                    </p>
                    <p className="mt-2 text-sm text-[#CBD5E1]">
                      {heroMentalLoadLine}
                    </p>
                    <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
                        {situationsHeading}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#CBD5E1]">
                        {situationsBody}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {situationsItems.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/8 bg-[#111827]/70 px-3 py-2 text-xs text-[#E2E8F0]"
                          >
                            {item}
                          </span>
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

      <section className="bg-[#0F172A] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#334155] bg-[#111827] p-8 md:p-10"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
              {skepticalBlockHeading}
            </h2>
            <p className="max-w-4xl text-base leading-8 text-[#CBD5E1]">
              {skepticalBlockBody}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#111827] py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[28px] border border-[#374151] bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(17,24,39,0.98))] p-8 md:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
              {communicationCalloutEyebrow}
            </p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {communicationCalloutHeading}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#CBD5E1]">
              {communicationCalloutIntro}
            </p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {communicationCalloutCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-[#374151] bg-[#0B1220] p-6"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl border border-rose-400/15 bg-rose-400/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-200">
                        {card.weakerLabel}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#F3F4F6]">
                        {card.weaker}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                        {card.strongerLabel}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white">
                        {card.stronger}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={card.href}
                    onClick={() =>
                      goToGuide(
                        card.href,
                        "home_message_judgement_block",
                        card.linkLabel,
                      )
                    }
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#C4B5FD] hover:text-[#DDD6FE]"
                  >
                    <span>{card.linkLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </motion.div>
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

      <section className="bg-[#111827] py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {guidesHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#CBD5E1]">
              {guidesIntro}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#94A3B8]">
              {guidesHubSupport}
            </p>
            <div className="mt-6">
              <Link
                href={guidesHubHref}
                onClick={() =>
                  goToGuide(guidesHubHref, "home_guides_hub", guidesHubLabel)
                }
                className="inline-flex items-center rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]/20"
              >
                {guidesHubLabel}
              </Link>
            </div>
          </motion.div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {guideLinks.map((guide, index) => (
              <motion.div
                key={guide.href}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-[#334155] bg-[#0F172A] p-6"
              >
                <Link
                  href={guide.href}
                  onClick={() =>
                    goToGuide(guide.href, "home_guides_block", guide.title)
                  }
                  className="inline-flex items-start gap-2 text-xl font-semibold text-white hover:text-[#C4B5FD]"
                >
                  <span>{guide.title}</span>
                  <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0" />
                </Link>
                <p className="mt-3 text-base leading-7 text-[#94A3B8]">
                  {guide.description}
                </p>
              </motion.div>
            ))}
          </div>
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
            trackCtaClick({
              ctaText: language === "de" ? "Jetzt starten" : "Get started",
              ctaLocation: "demo",
            });
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
            {useCasesHeading}
          </motion.h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-8 text-[#CBD5E1]">
            {useCasesIntro}
          </p>

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
              {comparisonHeading}
            </h2>
            <p className="text-lg text-[#CBD5E1]">{comparisonSubheading}</p>
            <p className="text-sm text-[#94A3B8] mt-3 max-w-3xl mx-auto">
              {comparisonClarifier}
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
              <Link href={startHref}>{betaFeedbackCta}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0F172A] pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AgentReadableSummary
            locale={language === "de" ? "de" : "en"}
            theme="dark"
            title={summaryTitle}
            intro={summaryIntro}
            answers={{
              whatIsIt:
                language === "de" ? (
                  <>
                    Zaza Draft ist eine risikobewusste Schreibhilfe fuer
                    Lehrkraefte. Sie hilft bei Elternmails, Zeugnisbemerkungen
                    und anderen Schulnachrichten, bei denen Ton und Wirkung
                    genauso wichtig sind wie der Inhalt.
                  </>
                ) : (
                  <>
                    Zaza Draft is a risk-aware writing support tool for
                    teachers. It helps with parent emails, report comments, and
                    other school messages where tone and interpretation matter
                    as much as the facts.
                  </>
                ),
              whoIsItFor:
                language === "de" ? (
                  <>
                    Fuer Lehrkraefte, Schulen und Teams, die Elternkommunikation
                    und sensible Schultexte ruhig, klar und professionell halten
                    wollen.
                  </>
                ) : (
                  <>
                    It is for teachers, schools, and educator teams who want
                    parent communication and other sensitive school writing to
                    stay calm, clear, and professional.
                  </>
                ),
              problemItSolves:
                language === "de" ? (
                  <>
                    Es hilft dann, wenn die Fakten klar sind, der Text aber noch
                    zu hart, zu vage, zu defensiv oder zu offensichtlich klingt.
                  </>
                ) : (
                  <>
                    It helps when the facts are clear but the wording still
                    feels too blunt, too vague, too reactive, or not useful
                    enough to send.
                  </>
                ),
              howItWorks:
                language === "de" ? (
                  <>
                    Du fuegst einen Entwurf oder Notizen ein, waehlst den
                    gewuenschten Ton und pruefst danach die Formulierung, bevor
                    irgendetwas gesendet oder eingereicht wird.
                  </>
                ) : (
                  <>
                    You paste a draft or notes, choose the tone or outcome you
                    need, then review the wording before anything is sent or
                    submitted.
                  </>
                ),
              whatItCosts:
                language === "de" ? (
                  <>
                    Du kannst kostenlos starten und spaeter auf einen bezahlten
                    Plan wechseln, wenn du regelmaessig Unterstuetzung brauchst.{" "}
                    <Link
                      href={pricingHref}
                      className="font-semibold underline"
                    >
                      Die aktuellen Preise stehen auf der Pricing-Seite.
                    </Link>
                  </>
                ) : (
                  <>
                    You can start free, then move to a paid plan if you need
                    regular support.{" "}
                    <Link
                      href={pricingHref}
                      className="font-semibold underline"
                    >
                      The current plans live on the pricing page.
                    </Link>
                  </>
                ),
              nextStep:
                language === "de" ? (
                  <>
                    Pruefe zuerst eine echte Nachricht im{" "}
                    <Link
                      href={angryParentGuideHref}
                      className="font-semibold underline"
                    >
                      kostenlosen Risiko-Check fuer Elternmails
                    </Link>{" "}
                    oder gehe direkt zu{" "}
                    <Link href={startHref} className="font-semibold underline">
                      Zaza Draft
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Start with a real message in the{" "}
                    <Link
                      href={angryParentGuideHref}
                      className="font-semibold underline"
                    >
                      free Parent Email Risk Checker
                    </Link>{" "}
                    or go straight to{" "}
                    <Link href={startHref} className="font-semibold underline">
                      Zaza Draft
                    </Link>
                    .
                  </>
                ),
            }}
          />
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
            {finalHeading}
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-white/95 mb-10 max-w-2xl mx-auto"
          >
            {finalSubheading}
          </motion.p>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mb-6 max-w-3xl text-sm font-medium text-white/90"
          >
            {finalCtaBridgeLine}
          </motion.p>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/15"
            >
              <Link
                href={angryParentGuideHref}
                onClick={() =>
                  goToGuide(
                    angryParentGuideHref,
                    "home_final_secondary",
                    finalGuideLabel,
                  )
                }
              >
                {finalGuideLabel}
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-[#8B5CF6] hover:bg-gray-50 font-semibold px-12 py-5 text-xl rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105"
              style={{ minHeight: "44px" }}
            >
              <Link
                href={startHref}
                onClick={() => {
                  trackCtaClick({
                    ctaText: primaryStartLabel,
                    ctaLocation: "final_cta",
                  });
                  track("cta_click_home_final", { language });
                }}
              >
                {primaryStartLabel}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Signup Modal */}
      <SignupModal
        open={signupOpen}
        onOpenChange={setSignupOpen}
        source="homepage_modal"
      />
    </>
  );
}
