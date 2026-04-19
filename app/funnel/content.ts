export type FunnelLocale = "en" | "de";

export type FunnelCopy = {
  freeCtaLabel: string;
  proCtaLabel: (price: string) => string;
  hero: {
    preheadline: string;
    headingLines: [string, string, string];
    subheadingTop: string;
    subheadingBottom: string;
    reassurance: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    supportLine?: string;
    secondaryLinkLabel?: string;
    secondaryLinkSupport?: string;
    secondaryLinkHref?: string;
    footer: string;
    showLogo?: boolean;
    imageSrc?: string;
    imageAlt: string;
    bubble: string;
  };
  pain: {
    heading: string;
    headingAccent: string;
    subheading: string;
    cards: Array<{
      title: string;
      body: string;
    }>;
    quote: string;
    note: string;
    imageSrc?: string;
    imageAlt: string;
  };
  solution: {
    heading: string;
    headingAccent: string;
    subheading: string;
    generatedHeading: string;
    generatedBody: string;
    generatedMeta: string;
    generatedVoiceNote: string;
    points: Array<{
      title: string;
      body: string;
    }>;
    imageAlt: string;
    imageSrc?: string;
    quote: string;
    note: string;
    proofLine?: string;
    ctaBlock?: {
      body: string;
      primaryLabel: string;
      primaryHref: string;
      secondaryLabel: string;
      secondaryHref: string;
    };
  };
  howItWorks: {
    heading: string;
    headingAccent: string;
    subheading: string;
    steps: Array<{
      number: string;
      title: string;
      body: string;
      preview: string;
    }>;
    badge: string;
    proofHeading: string;
    beforeLabel: string;
    beforeValue: string;
    afterLabel: string;
    afterValue: string;
    proofBody: string;
    proofMicrocopy?: string;
    proofBullets: [string, string, string];
    imageSrc?: string;
    imageAlt: string;
  };
  comparison: {
    heading: string;
    subheading: string;
    items: Array<{
      title: string;
      body: string;
    }>;
  };
  pricing: {
    heading: string;
    headingAccent: string;
    subheading: (price: string) => string;
    currencyLabel: string;
    billingLabel: string;
    monthlyLabel: string;
    annualLabel: string;
    annualRecommendedLabel: string;
    annualSavings: (amount: string) => string;
    annualAnchor: string;
    annualAnchorSupport: string;
    supportLine: (currency: string) => string;
    mostPopularBadge: string;
    freeCtaLabel: string;
    freeTitle: string;
    freeDescription: string;
    freeFeatures: string[];
    freeNote: string;
    proTitle: string;
    proDescription: string;
    proFeatures: string[];
    annualRiskReversal: string;
    proNote: string;
    whyTitle: string;
    whyItems: Array<{
      title: string;
      body: string;
    }>;
    unavailableNote: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  finalCta: {
    headingLines: [string, string];
    subheading: string;
    reassurance: string;
    bridgeLine?: string;
    quote: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
    footerItems: [string, string, string, string];
  };
  header: {
    primaryCta: string;
    fallbackCta: string;
  };
};

export const funnelCopy: Record<FunnelLocale, FunnelCopy> = {
  en: {
    freeCtaLabel: "Start free",
    proCtaLabel: (price) => `Start Pro - ${price}`,
    hero: {
      preheadline: "Teacher-first support for the writing you hesitate over",
      headingLines: [
        "For the draft that still",
        "does not sound right",
        "after the third rewrite",
      ],
      subheadingTop:
        "Paste an email, report comment, behaviour update, or rough notes into Zaza",
      subheadingBottom:
        "and get a calmer, more professional, more useful version to work from in seconds.",
      reassurance:
        "Professional does not have to mean stiff. Start with the wording you are least sure about.",
      primaryCtaLabel: "Check a real draft",
      primaryCtaHref: "/parent-email-risk-checker",
      supportLine:
        "Start with the line that feels too harsh, too vague, or too obvious. Zaza helps you shape it before you send or submit it.",
      secondaryLinkLabel: "Read the tone guide",
      secondaryLinkHref: "/teacher-email-tone-guide",
      footer:
        "Built for parent emails, difficult follow-ups, behaviour notes, report comments, and school documentation where judgement matters.",
      imageAlt:
        "Teacher reviewing a sensitive school message on a laptop late in the evening",
      bubble: "Built with teachers and refined for real school workflows.",
    },
    pain: {
      heading: "It is 9:47 PM.",
      headingAccent: "The writing still does not feel safe.",
      subheading:
        "You know what you need to say. The problem is making it sound professional, human, and useful before tomorrow gets harder.",
      cards: [
        {
          title: "You are not sure if the email sounds too harsh",
          body: "You are trying to be clear, but after a long day one blunt line can read as defensive, abrupt, or colder than you meant.",
        },
        {
          title: "You want it to be professional but still human",
          body: "Professional is not the same as cold, but it can be hard to find that balance when a parent email or behaviour update feels high-stakes.",
        },
        {
          title: "The report comment still says nothing useful",
          body: "Parents usually already know the obvious. The pressure is writing something that actually informs, not just fills the box.",
        },
      ],
      quote:
        "The hard part is rarely having something to say. The hard part is judging tone, clarity, and value well enough to stand behind what you send.",
      note: "Zaza is built for the moments where small wording choices change how a message is received.",
      imageAlt:
        "Teacher reading a difficult parent email and weighing the safest reply",
    },
    solution: {
      heading: "What if difficult writing felt",
      headingAccent: "easier to stand behind?",
      subheading:
        "Zaza Draft helps teachers write calm, professional parent emails, more meaningful report comments, and school documentation that keeps the point clear without sounding cold, generic, or reactive.",
      generatedHeading: "Safer draft for a parent email:",
      generatedBody:
        "\"I wanted to share a quick update about Oliver's day. He found it harder than usual to stay focused during independent work, and I needed to give several reminders. We're continuing to support him with clear expectations and short check-ins. If helpful, I'd be glad to share the strategies that are working in class so we can stay consistent together.\"",
      generatedMeta: "Drafted in seconds. Fully editable before sending.",
      generatedVoiceNote: "Clear, calm, and still recognisably yours",
      points: [
        {
          title: "Professional without sounding stiff",
          body: "Draft helps you keep the tone calm, human, and school-appropriate without flattening the message into template language.",
        },
        {
          title: "Report comments with more value",
          body: "It helps move comments beyond obvious observations so parents learn something useful about strengths, habits, or next steps.",
        },
        {
          title: "Tone-risk support before send",
          body: "It catches wording that may read as too sharp, vague, defensive, or easy to misread when emotions are already high.",
        },
        {
          title: "Built for school communication, not generic AI prompting",
          body: "Parent emails, report comments, behaviour updates, and documentation come first, with teacher judgement kept in the loop at every step.",
        },
      ],
      imageAlt:
        "Teacher calmly refining a parent email draft on a laptop at a desk",
      quote:
        "Built with teachers, then refined around the drafts that can unravel if the tone is even slightly off or the comment says nothing new.",
      note: "The goal is simple: protect the meaning, improve the value, and keep the teacher in control.",
      proofLine:
        "Built for parent emails, sensitive updates, report comments, and the drafts teachers most often rewrite three times.",
      ctaBlock: {
        body: "If you already have a draft sitting in your notes, inbox, or head, start there.\n\nZaza gives you a calmer, clearer, more professional version to work from - without weakening the message or draining the judgement out of it.",
        primaryLabel: "Make this safer",
        primaryHref: "/parent-email-risk-checker",
        secondaryLabel: "See how to write better report comments",
        secondaryHref: "/how-to-write-better-report-comments",
      },
    },
    howItWorks: {
      heading: "Three steps to",
      headingAccent: "clearer, safer writing",
      subheading:
        "Works on any device. Start from a rough email, a half-written comment, a few notes, or the message you almost sent.",
      steps: [
        {
          number: "1",
          title: "Paste the draft or rough notes",
          body: "Start from a parent email, a behaviour update, a report comment, or bullet points you have not shaped yet.",
          preview: '"Parent follow-up after a difficult behaviour update"',
        },
        {
          number: "2",
          title: "Choose the tone or outcome you need",
          body: "Professional, supportive, concise, or more insightful - with wording shaped for school context and parent interpretation.",
          preview: "Professional - calm - school-appropriate",
        },
        {
          number: "3",
          title: "Review before it goes anywhere",
          body: "You stay in control of every word before anything is sent or submitted.",
          preview: "Ready to review, send, or submit",
        },
      ],
      badge: "Why it helps",
      proofHeading:
        "Less second-guessing. Clearer wording. Better value in what you write.",
      beforeLabel: "Before",
      beforeValue: "Spiral of rewriting",
      afterLabel: "After",
      afterValue: "Calm next draft",
      proofBody:
        "Draft helps teachers move from stressed first draft to calmer, more professional wording without the usual spiral of rewriting.",
      proofMicrocopy:
        "Especially useful when one sentence could change the temperature of the whole exchange or the quality of the final comment.",
      proofBullets: [
        "Tone-aware drafts",
        "Useful comment support",
        "Always editable",
      ],
      imageAlt:
        "Teacher checking a sensitive message draft on a laptop before sending",
    },
    comparison: {
      heading: "Why teachers use Zaza Draft instead of ChatGPT",
      subheading:
        "Generic AI can produce text. Zaza Draft is built to help teachers send calmer, safer school communication without having to invent the right prompt from scratch.",
      items: [
        {
          title: "Built for teacher communication, not general use",
          body: "It starts from the kinds of messages teachers actually hesitate over, not a blank chat box.",
        },
        {
          title:
            "Understands parent emails, behaviour notes, and sensitive school follow-ups",
          body: "The wording is shaped for school context where a message may be forwarded, screenshotted, or revisited later.",
        },
        {
          title:
            "Designed to reduce tone risk and escalation, not just generate text",
          body: "It helps you get to calmer, more professional wording faster when the temperature of the exchange matters.",
        },
        {
          title: "Keeps the teacher in control of every final word",
          body: "You review, edit, and decide what gets sent. Zaza supports judgement rather than replacing it.",
        },
      ],
    },
    pricing: {
      heading: "Start free now.",
      headingAccent: "Upgrade only when you need more.",
      subheading: (price) =>
        `Start free with 5 drafts each month, then upgrade for unlimited support when calmer parent communication and better report comments become part of your weekly workflow.`,
      currencyLabel: "Currency",
      billingLabel: "Billing",
      monthlyLabel: "Monthly",
      annualLabel: "Annual",
      annualRecommendedLabel: "Best value for the school year",
      annualSavings: (amount) => `Save ${amount}/year vs monthly`,
      annualAnchor: "About the cost of one coffee a week",
      annualAnchorSupport: "for calmer school communication all year",
      supportLine: (currency) =>
        "Best for teachers who regularly write parent emails, behaviour updates, reports, and other sensitive school messages.",
      mostPopularBadge: "Most popular",
      freeCtaLabel: "Start free",
      freeTitle: "Free Forever",
      freeDescription: "5 drafts every month. No card required.",
      freeFeatures: [
        "5 drafts per month",
        "Parent emails and school messages",
        "Fully editable drafts",
        "Works on any device",
      ],
      freeNote: "Opens the free signup form. No credit card required.",
      proTitle: "Pro",
      proDescription:
        "Unlimited support for teachers who want more confidence in the writing they send and submit",
      proFeatures: [
        "Unlimited drafts",
        "Parent email support",
        "Behaviour and follow-up drafts",
        "More meaningful report comments",
        "Always editable before sending",
      ],
      annualRiskReversal: "Try it risk-free. Cancel anytime.",
      proNote:
        "Secure Stripe checkout. Cancel anytime. Taxes may be calculated at checkout.",
      whyTitle: "Why teachers choose Zaza Draft:",
      whyItems: [
        {
          title: "Peace of mind",
          body: "Better judgement support for difficult parent communication",
        },
        { title: "More useful writing", body: "Not just more words" },
        { title: "Always editable", body: "You stay in control" },
      ],
      unavailableNote:
        "USD prices are shown while USD checkout is being finalized. Switch to EUR to subscribe today.",
    },
    faq: {
      title: "Frequently asked questions",
      subtitle:
        "Clear answers for teachers who want the calmest way to write under pressure.",
      items: [
        {
          question: "What is Zaza Draft?",
          answer:
            "Zaza Draft is a teacher-first communication safety layer for parent emails, sensitive replies, report comments, and other high-stakes school writing. It helps teachers reduce tone risk, stay professional, and keep control of every word before sending or submitting.",
        },
        {
          question: "Who is this for?",
          answer:
            "It is built for teachers who are under pressure and want support writing clear, calm, professional messages and more meaningful comments they will not regret sending later.",
        },
        {
          question: "Does it replace my judgement?",
          answer:
            "No. Zaza Draft is designed as a co-writer, not a replacement. It helps you reduce risk, improve tone, and communicate more safely.",
        },
        {
          question: "Will it sound like AI?",
          answer:
            "Zaza Draft is designed to write in a teacher-appropriate tone that you can edit before sending. You stay in control of the final wording.",
        },
        {
          question: "Can I use it for parent communication?",
          answer:
            "Yes. That is one of its main use cases. It is especially helpful when emotions are high, stakes are high, or wording needs to be careful and professionally defensible.",
        },
        {
          question: "Can I use it for report comments as well?",
          answer:
            "Yes. Zaza can help you move beyond comments parents already know, so the final wording says something more specific and genuinely useful about the pupil.",
        },
      ],
    },
    finalCta: {
      headingLines: [
        "Start with the piece of writing you are unsure about",
        "Check a real draft first",
      ],
      subheading:
        "The fastest way to understand Zaza Draft is to check a real draft.\n\nYou will see a calmer, more professional version immediately - one that keeps your point clear while reducing the chance of escalation or empty wording.",
      reassurance:
        "Start with the line you are least sure about, then carry on in Zaza Draft if you want the full workflow.",
      bridgeLine:
        "If ChatGPT gives you text, Zaza Draft is the tool that helps you send or submit the version you will not regret tomorrow.",
      quote:
        "Start with the version you are worried about, then decide whether you want the full drafting workflow.",
      primaryCtaLabel: "Check your draft",
      primaryCtaHref: "/parent-email-risk-checker",
      secondaryCtaLabel: "Read the report comment guide",
      secondaryCtaHref: "/how-to-write-better-report-comments",
      footerItems: [
        "Built with teachers, for teachers",
        "FERPA-ready workflows",
        "Cancel anytime",
        "Support: help@zazatechnologies.com",
      ],
    },
    header: {
      primaryCta: "Start Pro",
      fallbackCta: "See plans",
    },
  },
  de: {
    freeCtaLabel: "Kostenlos starten",
    proCtaLabel: (price) => `Pro starten - ${price}`,
    hero: {
      preheadline: "Lehrerfreundliche Entlastung fuer Zeugnistexte",
      headingLines: [
        "Dir fehlen noch 23 Kommentare.",
        "22:41 Uhr",
        "Und du bist erledigt.",
      ],
      subheadingTop: "Zaza schreibt sie fuer dich",
      subheadingBottom: "in deinem Ton, in Sekunden.",
      reassurance: "Keine Kreditkarte. Keine Bindung. Voll bearbeitbar.",
      secondaryLinkLabel: "Du willst erst eine E-Mail pruefen?",
      secondaryLinkSupport:
        "Teste den kostenlosen Risiko-Check fuer Elternmails.",
      footer: "Entwickelt fuer Lehrkraefte, die unter Druck schreiben.",
      imageAlt:
        "Lehrkraft sitzt spaet am Schreibtisch mit Unterlagen und Laptop und wirkt erschoepft, aber hoffnungsvoll",
      bubble:
        "Mit Lehrkraeften entwickelt und fuer echte Schulablaeufe verfeinert.",
    },
    pain: {
      heading: "Es ist wieder Sonntagabend.",
      headingAccent: "",
      subheading:
        "Die Zeugnisse muessen morgen raus, und du versinkst in Kommentaren, die alle gleich klingen.",
      cards: [
        {
          title: "Sonntagabend-Gefuehl",
          body: '"Es ist 21 Uhr und ich habe immer noch 25 Kommentare vor mir. Meine Familie schlaeft, und ich starre auf einen leeren Bildschirm."',
        },
        {
          title: "Immer gleich, immer flach",
          body: "\"Ich schreibe dauernd dieselben Formulierungen. 'Tolle Arbeit' und 'Weiter so' - aber meine Schueler verdienen etwas Besseres.\"",
        },
        {
          title: "Wochenend-Dieb",
          body: '"Zeugnisse fressen mein ganzes Wochenende. Zeit, die ich lieber mit meinen eigenen Kindern oder einfach zum Durchatmen haette."',
        },
      ],
      quote:
        "Jede Lehrkraft kennt dieses Gefuehl. Der leere Bildschirm. Der Druck. Das schlechte Gewissen, dass die Kommentare nicht gut genug sind.",
      note: "Entwickelt, um das Risiko in jeder Nachricht zu senken.",
      imageAlt:
        "Lehrkraft arbeitet spaet am Schreibtisch und wirkt gestresst beim Schreiben von Schuelerkommentaren",
    },
    solution: {
      heading: "Was waere, wenn sich Kommentare schreiben...",
      headingAccent: "leicht anfuehlen wuerde?",
      subheading:
        "Zaza Draft schreibt einfuelsame, persoenliche Kommentare, die klingen wie von dir. Kein Prompt-Gebastel, keine generischen Antworten, kein Zusatzstress.",
      generatedHeading: "Generierter Kommentar fuer Emma:",
      generatedBody:
        '"Emma hat in diesem Quartal grosse Fortschritte im Leseverstehen gezeigt. Mir faellt auf, wie gruendlich sie ueber Motive und Figuren nachdenkt, besonders in unseren Gespraechen ueber Charlotte\'s Web. Ihre Fragen zeigen, dass sie sich wirklich tief mit den Geschichten auseinandersetzt. Als naechsten Schritt wuensche ich mir, dass sie diese Gedanken noch selbstbewusster in Gruppengespraechen einbringt. Ihre Perspektive waere fuer die Klasse sehr wertvoll."',
      generatedMeta: "In 3 Sekunden erstellt. Voll bearbeitbar.",
      generatedVoiceNote: "Klingt nach dir, nicht nach einem Roboter",
      points: [
        {
          title: "Emotional stimmig",
          body: "Erkennt Staerken und Entwicklungsfelder jedes Kindes mit Waerme, Klarheit und Substanz.",
        },
        {
          title: "Dein Ton, verstaerkt",
          body: "Lernt deinen Stil und deine Sprache, damit Kommentare wirklich nach dir klingen.",
        },
        {
          title: "Immer bearbeitbar",
          body: "Jeder Entwurf ist dein Ausgangspunkt. Anpassen, personalisieren, fertig - in Sekunden.",
        },
        {
          title: "Kein Prompt Engineering",
          body: "Waehle einfach dein Kind aus, und Zaza uebernimmt den Rest. Keine komplizierten Eingaben, keine Technik-Kopfschmerzen.",
        },
      ],
      imageAlt:
        "Zufriedene Lehrkraft arbeitet effizient am Laptop in einem aufgeraeumten Klassenraum",
      quote:
        "Mit Lehrkraeften entwickelt und durch echtes Feedback aus dem Schulalltag weitergeschaerft.",
      note: "Das Ziel ist einfach: schneller schreiben, ohne Sorgfalt, Nuance oder Kontrolle zu verlieren.",
    },
    howItWorks: {
      heading: "Drei Schritte, um",
      headingAccent: "deine Abende zurueckzubekommen",
      subheading:
        "Funktioniert auf jedem Geraet. Chromebook, Handy, Tablet. Wo auch immer du bist, wenn du es brauchst.",
      steps: [
        {
          number: "1",
          title: "Schueler auswaehlen",
          body: "Waehle Schueler und Fach. Zaza merkt sich Fortschritte und deinen Unterrichtsstil.",
          preview: '"Emma - Leseverstehen"',
        },
        {
          number: "2",
          title: "Generieren",
          body: "Ein Klick, und Zaza erstellt einen durchdachten, konkreten Kommentar in deinem Ton.",
          preview: "Durchdachter Kommentar wird erstellt...",
        },
        {
          number: "3",
          title: "Anpassen und fertig",
          body: "So uebernehmen oder kurz verfeinern. Kopieren, einfuegen, erledigt.",
          preview: "Bereit zum Kopieren",
        },
      ],
      badge: "Spuerbar Zeit gespart",
      proofHeading: "Von 3 Stunden auf 30 Minuten",
      beforeLabel: "Vorher",
      beforeValue: "3 Stunden",
      afterLabel: "Nachher",
      afterValue: "30 Minuten",
      proofBody:
        "Was frueher deinen ganzen Sonntagabend gekostet hat, passt jetzt in eine Kaffeepause.",
      proofBullets: [
        "Sekunden pro Kommentar",
        "Jedes Geraet",
        "Immer bearbeitbar",
      ],
      imageAlt:
        "Nahaufnahme von Haenden einer Lehrkraft, die effizient Schuelerkommentare am Laptop tippt",
    },
    comparison: {
      heading: "Warum Lehrkraefte Zaza Draft statt ChatGPT nutzen",
      subheading:
        "Generische KI kann Text erzeugen. Zaza Draft ist dafuer gebaut, Lehrkraeften zu helfen, ruhigere und sicherere Schulkommunikation zu senden, ohne erst den richtigen Prompt erfinden zu muessen.",
      items: [
        {
          title:
            "Fuer Lehrkraft-Kommunikation gebaut, nicht fuer allgemeine Nutzung",
          body: "Es startet bei den Nachrichten, bei denen Lehrkraefte wirklich zoegern, nicht bei einem leeren Chatfenster.",
        },
        {
          title:
            "Versteht Eltern-E-Mails, Verhaltensnotizen und sensible Follow-ups",
          body: "Die Formulierungen sind fuer Schulkontexte gedacht, in denen Nachrichten weitergeleitet, gescreenshottet oder spaeter noch einmal gelesen werden koennen.",
        },
        {
          title:
            "Darauf ausgelegt, Tonrisiko und Eskalation zu senken, nicht nur Text zu erzeugen",
          body: "Es hilft dir schneller zu ruhigeren und professionelleren Formulierungen zu kommen, wenn die Temperatur eines Austauschs zaehlt.",
        },
        {
          title: "Die Lehrkraft behaelt jedes letzte Wort in der Hand",
          body: "Du pruefst, bearbeitest und entscheidest, was gesendet wird. Zaza unterstuetzt Urteilsvermoegen, statt es zu ersetzen.",
        },
      ],
    },
    pricing: {
      heading: "Starte kostenlos.",
      headingAccent: "Upgrade erst, wenn du mehr brauchst.",
      subheading: (price) =>
        `Du bekommst 5 Entwuerfe pro Monat kostenlos. Danach wechselst du zu Zaza Draft Pro mit unbegrenzter Schreibhilfe fuer ${price}.`,
      currencyLabel: "Waehrung",
      billingLabel: "Abrechnung",
      monthlyLabel: "Monatlich",
      annualLabel: "Jaehrlich",
      annualRecommendedLabel: "Beste Wahl fuers Schuljahr",
      annualSavings: (amount) =>
        `${amount} pro Jahr gegenueber monatlich sparen`,
      annualAnchor: "Etwa so viel wie ein Kaffee pro Woche",
      annualAnchorSupport: "fuer deine Abende zurueck",
      supportLine: (currency) =>
        `Preise werden aktuell in ${currency} angezeigt. Steuern koennen im Checkout berechnet werden. Kostenlos starten ohne Kreditkarte.`,
      mostPopularBadge: "Am beliebtesten",
      freeCtaLabel: "Kostenlos starten",
      freeTitle: "Dauerhaft kostenlos",
      freeDescription: "5 Entwuerfe pro Monat. Keine Karte noetig.",
      freeFeatures: [
        "5 Entwuerfe pro Monat",
        "Alle Faecher unterstuetzt",
        "Voll bearbeitbare Kommentare",
        "Funktioniert auf jedem Geraet",
      ],
      freeNote:
        "Oeffnet das kostenlose Anmeldeformular. Keine Kreditkarte erforderlich.",
      proTitle: "Pro",
      proDescription: "Unbegrenzte Entwuerfe fuer einzelne Lehrkraefte",
      proFeatures: [
        "Unbegrenzte Entwuerfe",
        "Priorisierter Support",
        "Staerkere Personalisierung",
        "Vorlagen fuer Elternkommunikation",
        "Anpassungen fuer IEP und 504",
      ],
      annualRiskReversal: "Risikofrei testen. Jederzeit kuendbar.",
      proNote:
        "Sicherer Stripe-Checkout. Jederzeit kuendbar. Steuern koennen im Checkout berechnet werden.",
      whyTitle: "Warum Lehrkraefte Zaza Draft waehlen:",
      whyItems: [
        { title: "Sekunden", body: "Pro erzeugtem Kommentar" },
        { title: "Dein Ton", body: "Nicht der eines Roboters" },
        { title: "Immer bearbeitbar", body: "Du behaeltst die Kontrolle" },
      ],
      unavailableNote:
        "USD-Preise werden angezeigt, waehrend der USD-Checkout finalisiert wird. Bitte auf EUR umschalten, um heute zu abonnieren.",
    },
    faq: {
      title: "Haeufige Fragen",
      subtitle:
        "Klare Antworten fuer Lehrkraefte, die unter Druck ruhiger schreiben wollen.",
      items: [
        {
          question: "Was ist Zaza Draft?",
          answer:
            "Zaza Draft ist ein KI-Schreibassistent fuer Lehrkraefte. Er hilft bei heikler Schulkommunikation wie Elternmails, sensiblen Antworten und Zeugnistexten.",
        },
        {
          question: "Fuer wen ist das gedacht?",
          answer:
            "Fuer Lehrkraefte, die unter Druck stehen und Unterstuetzung fuer klare, ruhige und professionelle Formulierungen wollen, die sie spaeter nicht bereuen.",
        },
        {
          question: "Ersetzt es mein Urteilsvermoegen?",
          answer:
            "Nein. Zaza Draft ist als Mitschreiber gedacht, nicht als Ersatz. Es hilft dir, Risiko zu senken, den Ton zu verbessern und sicherer zu kommunizieren.",
        },
        {
          question: "Klingt das dann nach KI?",
          answer:
            "Zaza ist darauf ausgelegt, in einem lehrkraftgerechten Ton zu schreiben, den du vor dem Senden anpassen kannst. Die endgueltige Formulierung bleibt in deiner Hand.",
        },
        {
          question: "Kann ich es fuer Elternkommunikation nutzen?",
          answer:
            "Ja. Das ist einer der wichtigsten Einsatzbereiche. Besonders dann, wenn Emotionen hochgehen, viel auf dem Spiel steht oder Formulierungen sensibel sein muessen.",
        },
        {
          question: "Ist das nur fuer ausgebrannte Lehrkraefte?",
          answer:
            "Nein. Aber es ist besonders hilfreich fuer Lehrkraefte, die sich gestreckt, muede oder unsicher fuehlen, die falschen Worte zu waehlen.",
        },
      ],
    },
    finalCta: {
      headingLines: [
        "Es ist Sonntag, 22:47 Uhr.",
        "Was waere, wenn du schon fertig waerst?",
      ],
      subheading:
        "Kein Starren mehr auf leere Seiten. Kein Copy-Paste mehr. Nur durchdachte Texte, die nach dir klingen und in Sekunden bereit sind.",
      reassurance: "Keine Kreditkarte. Keine Bindung. Voll bearbeitbar.",
      bridgeLine:
        "Wenn ChatGPT dir Text gibt, hilft Zaza Draft dir dabei, die Version zu senden, die du morgen nicht bereust.",
      quote: "Kein Sonntagabend-Stress mehr.",
      footerItems: [
        "Mit Lehrkraeften fuer Lehrkraefte gebaut",
        "FERPA-orientierte Workflows",
        "Jederzeit kuendbar",
        "Support: help@zazatechnologies.com",
      ],
    },
    header: {
      primaryCta: "Pro starten",
      fallbackCta: "Preise ansehen",
    },
  },
};
