"use client";
import Image from "next/image";
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
      : "Built for the moment before send.";
  const heroHeadlineAccent =
    language === "de"
      ? "ohne staendig zu fragen, wie sie aufgefasst werden."
      : "";
  const heroSubheading =
    language === "de"
      ? "Zaza hilft Lehrkraeften, ruhige Eltern-E-Mails, klarere Schulnachrichten und aussagekraeftigere Zeugnisformulierungen fuer Momente zu verfassen, die sich unsicher anfuehlen - bevor Ton, Wortwahl oder Timing eine Situation groesser werden lassen."
      : "The email you're not quite sure about.";
  const heroEntityLine =
    language === "de"
      ? "Zaza Draft ist keine generische Schreibhilfe. Es ist ein lehrkraft-zentrierter Co-Writer fuer professionelle Elternkommunikation und wertvolle Schuldokumentation - gerade dann, wenn Interpretation ebenso viel zaehlt wie Formulierung. Du pruefst, bearbeitest und gibst jede Formulierung selbst frei."
      : "Zaza Draft is the second pair of eyes that catches what you'd catch yourself, if you weren't this tired. For teachers, that means preventing the mistakes you only make at 9:47 pm on a Sunday.";
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
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto flex max-w-3xl flex-col items-center space-y-8"
          >
            <h1 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {language === "de" ? (
                heroHeadline
              ) : (
                <>
                  Built for the moment{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                    before send.
                  </span>
                </>
              )}
            </h1>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-xl text-[#CBD5E1] md:text-2xl"
            >
              {heroSubheading}
            </motion.p>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
              className="max-w-3xl text-base leading-8 text-[#94A3B8] md:text-lg"
            >
              {heroEntityLine}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26, ease: "easeOut" }}
            >
              <Button
                asChild
                size="lg"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-8 py-4 text-lg font-semibold text-white transition-transform transition-shadow duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/30 active:scale-[0.98]"
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
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
      </section>

      <section className="border-t border-white/5 bg-[#111827] py-6">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-3 text-center md:grid-cols-3">
            {[
              "Built by Dr Greg Blackburn, PhD",
              "PhD-level pedagogy",
              "GDPR & privacy-first",
            ].map((signal) => (
              <div
                key={signal}
                className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[#CBD5E1]"
              >
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      {false ? (
        <>
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
                      {language === "de"
                        ? "Vertrauensrahmen"
                        : "Trust framework"}
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
                      goToGuide(
                        guidesHubHref,
                        "home_guides_hub",
                        guidesHubLabel,
                      )
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
        </>
      ) : null}

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
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="bg-[#111827] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {language === "de"
                ? "Draft in der Praxis"
                : "See Draft in Action"}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[#CBD5E1]">
              {language === "de"
                ? "Vier Beispiele dafuer, wie Draft riskante Formulierungen in ruhigere, professionellere Nachrichten verwandelt."
                : "From parent emails to report comments and difficult conversations - four moments where wording matters."}
            </p>
          </motion.div>

          <div className="mt-12 space-y-8">
            {[
              {
                title:
                  language === "de"
                    ? "Die Verhaltensnotiz"
                    : "The behaviour note",
                annotation:
                  language === "de"
                    ? "Was ich am Sonntag um 22 Uhr fast geschrieben haette."
                    : "What I almost wrote at 10 pm on a Sunday.",
                before:
                  "Oliver was very disruptive again today and ignored multiple instructions. This behaviour is becoming unacceptable and needs to improve.",
                after:
                  "I wanted to let you know that Oliver found it challenging to stay focused during today's lesson despite several reminders. We are continuing to support him in developing positive classroom habits and would really appreciate your partnership in reinforcing these expectations at home.",
              },
              {
                title:
                  language === "de"
                    ? "Diese veraergerte Antwort an Eltern"
                    : "That angry parent reply",
                annotation:
                  language === "de"
                    ? "Ganz ehrlich? Das ist es, was ich senden wollte."
                    : "Honestly? This is what I wanted to send.",
                before:
                  "I have read your email and I think you are misunderstanding the situation. Mia was not singled out and the consequence was the same one every other student received. I have been teaching for nine years and I do not appreciate being accused of being unfair when I have done nothing wrong. If you have concerns please book a meeting through the office.",
                after:
                  "Thank you for taking the time to write to me. I can hear how concerned you are about Mia, and I want you to know I take that seriously. I'd welcome the chance to talk this through properly so I can share what happened from my perspective and hear more about Mia's experience. Would a phone call this week work, or would you prefer to come in? Either way, I'd like us to find a way forward together.",
              },
              {
                title:
                  language === "de"
                    ? "Der Zeugniskommentar"
                    : "The report comment",
                annotation:
                  language === "de"
                    ? "Der Satz, den ich viermal geschrieben und wieder geloescht hatte."
                    : "The line I'd written and rewritten four times.",
                before:
                  "Lukas is significantly behind grade level in reading and shows little motivation to improve. He is easily distracted in lessons and rarely completes homework on time. Without major intervention at home, I am concerned he will continue to fall behind.",
                after:
                  "Lukas is currently working below the expected level in reading and would benefit from additional support to build confidence. In class, he engages most strongly when given shorter, structured tasks with clear next steps. I'd like to discuss a small set of strategies we could try together, both in school and at home, to help him develop a more consistent reading routine.",
              },
              {
                title:
                  language === "de"
                    ? "Nein sagen, ohne die Bruecke zu verbrennen"
                    : "Saying no without burning the bridge",
                annotation:
                  language === "de"
                    ? "Was man schreibt, wenn man wirklich am Ende ist."
                    : "What you write when you're at the end of your tether.",
                before:
                  "I am sorry but I cannot meet that deadline. I have over 60 reports to write and three other parents asking for additional information this week. I will get to it when I can but please understand I am not able to drop everything for one student.",
                after:
                  "Thank you for reaching out, and for being clear about what would be most useful for you. I want to give your request the proper attention it deserves rather than a rushed reply. I'll be able to get back to you with a thorough response by next Friday. If anything is time-sensitive in the meantime, please let me know and I'll do my best to prioritize it.",
              },
            ].map((pair, index) => (
              <motion.div
                key={pair.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-[#0F172A] p-6 md:p-8"
              >
                <p className="text-sm italic text-white/65">
                  {pair.annotation}
                </p>
                <h3 className="text-xl font-semibold text-white">
                  {pair.title}
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <article className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-5">
                    <div className="inline-flex items-center rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-100">
                      {language === "de" ? "Vorher" : "Before"}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-rose-50 sm:text-[15px]">
                      {pair.before}
                    </p>
                  </article>
                  <article className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-5 shadow-lg shadow-emerald-500/10">
                    <div className="inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                      {language === "de" ? "Nachher" : "After"}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-emerald-50 sm:text-[15px]">
                      {pair.after}
                    </p>
                  </article>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {false ? (
        <>
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
                    <p className="text-sm text-[#94A3B8] italic">
                      {card.examples}
                    </p>
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
        </>
      ) : null}

      {/* Why Choose Zaza Section */}
      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center text-3xl font-bold text-white md:text-4xl"
          >
            Why Zaza Draft
          </motion.h2>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
            {[
              {
                title: "Teacher-first",
                desc: "Understands parent emails, behaviour notes, report comments, and the emotional register of schools.",
              },
              {
                title: "You stay in control",
                desc: "It's a second pair of eyes, not an auto-sender. You review every word before it leaves your inbox.",
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

      <section className="bg-[#0F172A] py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center md:px-10"
          >
            <h2 className="text-3xl font-semibold text-white">
              A note from the founder
            </h2>
            <div className="mt-6 flex justify-center">
              <div className="h-[100px] w-[100px] overflow-hidden rounded-full ring-2 ring-purple-500/30 md:h-[120px] md:w-[120px]">
                <Image
                  src="/authors/Greg.jpg"
                  alt="Dr Greg Blackburn, founder of Zaza Technologies"
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-6 space-y-5 text-center text-base leading-8 text-[#CBD5E1]">
              <p>
                I built Zaza Draft because I kept hearing the same thing from
                teachers in my circle:{" "}
                <span className="italic">
                  &quot;I'm not worried about writing the email. I'm worried
                  about how it'll be read.&quot;
                </span>
              </p>
              <p>
                Zaza Draft is the second pair of eyes I wished they'd had. Built
                quietly, by someone who's spent twenty years watching brilliant
                educators burn out over wording.
              </p>
            </div>
            <p className="mt-8 text-sm italic leading-7 text-[#A78BFA]">
              Dr Greg Blackburn, PhD Professional Education
            </p>
            <div className="mt-6">
              <Link
                href={founderStoryHref}
                className="text-sm font-semibold text-white underline underline-offset-4 hover:text-[#C4B5FD]"
              >
                Read the full story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {false ? (
        <>
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
                        Lehrkraefte. Sie hilft bei Elternmails,
                        Zeugnisbemerkungen und anderen Schulnachrichten, bei
                        denen Ton und Wirkung genauso wichtig sind wie der
                        Inhalt.
                      </>
                    ) : (
                      <>
                        Zaza Draft is a risk-aware writing support tool for
                        teachers. It helps with parent emails, report comments,
                        and other school messages where tone and interpretation
                        matter as much as the facts.
                      </>
                    ),
                  whoIsItFor:
                    language === "de" ? (
                      <>
                        Fuer Lehrkraefte, Schulen und Teams, die
                        Elternkommunikation und sensible Schultexte ruhig, klar
                        und professionell halten wollen.
                      </>
                    ) : (
                      <>
                        It is for teachers, schools, and educator teams who want
                        parent communication and other sensitive school writing
                        to stay calm, clear, and professional.
                      </>
                    ),
                  problemItSolves:
                    language === "de" ? (
                      <>
                        Es hilft dann, wenn die Fakten klar sind, der Text aber
                        noch zu hart, zu vage, zu defensiv oder zu
                        offensichtlich klingt.
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
                        gewuenschten Ton und pruefst danach die Formulierung,
                        bevor irgendetwas gesendet oder eingereicht wird.
                      </>
                    ) : (
                      <>
                        You paste a draft or notes, choose the tone or outcome
                        you need, then review the wording before anything is
                        sent or submitted.
                      </>
                    ),
                  whatItCosts:
                    language === "de" ? (
                      <>
                        Du kannst kostenlos starten und spaeter auf einen
                        bezahlten Plan wechseln, wenn du regelmaessig
                        Unterstuetzung brauchst.{" "}
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
                        <Link
                          href={startHref}
                          className="font-semibold underline"
                        >
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
                        <Link
                          href={startHref}
                          className="font-semibold underline"
                        >
                          Zaza Draft
                        </Link>
                        .
                      </>
                    ),
                }}
              />
            </div>
          </section>
        </>
      ) : null}

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm italic text-white/70"
          >
            For the messages that matter more than they should.
          </motion.p>
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
