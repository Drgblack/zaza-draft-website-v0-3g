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
    footer: string;
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
    quote: string;
    note: string;
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
    proofBullets: [string, string, string];
    imageAlt: string;
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
    quote: string;
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
      preheadline: "Teacher-first relief for report writing",
      headingLines: [
        "You've got 23 comments left.",
        "10:41 PM",
        "You're exhausted.",
      ],
      subheadingTop: "Zaza writes them for you",
      subheadingBottom: "in your own voice, in seconds.",
      reassurance: "No credit card. No lock-in. Fully editable.",
      footer: "Built for teachers who write under pressure.",
      imageAlt:
        "Teacher working late at desk with papers and laptop, looking tired but hopeful",
      bubble: "Built with teachers and refined for real school workflows.",
    },
    pain: {
      heading: "It's Sunday night.",
      headingAccent: "Again.",
      subheading:
        "Report cards are due tomorrow, and you're drowning in comments that all sound the same.",
      cards: [
        {
          title: "Sunday Night Dread",
          body: "\"It's 9 PM and I still have 25 more comments to write. My family's asleep and I'm staring at a blank screen.\"",
        },
        {
          title: "Repetitive and Robotic",
          body: "\"I keep writing the same things over and over. 'Great job' and 'Keep up the good work' - but my students deserve better.\"",
        },
        {
          title: "Time Thief",
          body: '"Report cards steal my entire weekend. That\'s time I could spend with my own kids, or just breathing."',
        },
      ],
      quote:
        "Every teacher knows this feeling. The blank screen. The pressure. The guilt that your comments are not good enough.",
      note: "Designed to reduce the risk in every message you send.",
      imageAlt:
        "Teacher working late at desk looking stressed while writing student comments",
    },
    solution: {
      heading: "What if writing comments felt...",
      headingAccent: "easy?",
      subheading:
        "Zaza Draft writes emotionally aware, personalized comments that sound like you. No prompt engineering, no generic responses, no stress.",
      generatedHeading: "Generated comment for Emma:",
      generatedBody:
        "\"Emma has shown remarkable growth in her reading comprehension this quarter. I've noticed how she takes her time to really think about character motivations, especially during our discussions about Charlotte's Web. Her thoughtful questions show she's connecting deeply with the stories we read. Moving forward, I'd love to see her share those insights more confidently during group discussions. Her classmates would benefit from her perspective.\"",
      generatedMeta: "Generated in 3 seconds. Fully editable.",
      generatedVoiceNote: "Sounds like your voice, not a robot",
      points: [
        {
          title: "Emotionally Intelligent",
          body: "Recognizes each student's unique strengths and growth areas with warmth and specificity.",
        },
        {
          title: "Your Voice, Amplified",
          body: "Learns your teaching style and tone, so comments sound authentically like you wrote them.",
        },
        {
          title: "Always Editable",
          body: "Every comment is your starting point. Tweak, personalize, and make it perfect in seconds.",
        },
        {
          title: "No Prompt Engineering",
          body: "Just choose your student, and Zaza handles the rest. No complex prompts or tech headaches.",
        },
      ],
      imageAlt:
        "Happy teacher working efficiently on laptop in organized classroom",
      quote:
        "Built with teachers, then refined through real classroom feedback.",
      note: "The goal is simple: help teachers write faster without losing care, nuance, or control.",
    },
    howItWorks: {
      heading: "Three steps to",
      headingAccent: "reclaim your evenings",
      subheading:
        "Works on any device. Your Chromebook, phone, tablet. Wherever you are, whenever you need it.",
      steps: [
        {
          number: "1",
          title: "Choose Student",
          body: "Select your student and subject. Zaza remembers their progress and your teaching style.",
          preview: '"Emma - Reading Comprehension"',
        },
        {
          number: "2",
          title: "Generate",
          body: "Click generate and watch as Zaza creates a thoughtful, specific comment in your voice.",
          preview: "Generating thoughtful comment...",
        },
        {
          number: "3",
          title: "Tweak and Done",
          body: "Perfect as-is, or add your personal touch. Copy, paste, and you're done.",
          preview: "Ready to copy",
        },
      ],
      badge: "Real time saved",
      proofHeading: "From 3 hours to 30 minutes",
      beforeLabel: "Before",
      beforeValue: "3 hours",
      afterLabel: "After",
      afterValue: "30 minutes",
      proofBody:
        "What used to take your entire Sunday evening now fits into a coffee break.",
      proofBullets: ["Seconds per comment", "Any device", "Always editable"],
      imageAlt:
        "Close-up of teacher's hands typing efficient student comments on laptop",
    },
    pricing: {
      heading: "Start free now.",
      headingAccent: "Upgrade only when you need more.",
      subheading: (price) =>
        `Get 5 drafts a month for free, then move to Zaza Draft Pro for unlimited writing support at ${price}.`,
      currencyLabel: "Currency",
      billingLabel: "Billing",
      monthlyLabel: "Monthly",
      annualLabel: "Annual",
      annualRecommendedLabel: "Best value for the school year",
      annualSavings: (amount) => `Save ${amount}/year vs monthly`,
      annualAnchor: "About the cost of one coffee a week",
      annualAnchorSupport: "to get your evenings back",
      supportLine: (currency) =>
        `Prices are currently shown in ${currency}. Taxes may be calculated at checkout. Free starts with no credit card.`,
      mostPopularBadge: "Most popular",
      freeCtaLabel: "Start free",
      freeTitle: "Free Forever",
      freeDescription: "5 drafts every month. No card required.",
      freeFeatures: [
        "5 drafts per month",
        "All subjects supported",
        "Fully editable comments",
        "Works on any device",
      ],
      freeNote: "Opens the free signup form. No credit card required.",
      proTitle: "Pro",
      proDescription: "Unlimited drafts for individual teachers",
      proFeatures: [
        "Unlimited drafts",
        "Priority support",
        "Advanced personalization",
        "Parent communication templates",
        "IEP and 504 adaptations",
      ],
      annualRiskReversal: "Try it risk-free. Cancel anytime.",
      proNote:
        "Secure Stripe checkout. Cancel anytime. Taxes may be calculated at checkout.",
      whyTitle: "Why teachers choose Zaza Draft:",
      whyItems: [
        { title: "Seconds", body: "Per comment generated" },
        { title: "Your voice", body: "Not a robot's" },
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
            "Zaza Draft is a teacher-first AI writing assistant designed to help with high-stakes school communication like parent emails, sensitive replies, and report comments.",
        },
        {
          question: "Who is this for?",
          answer:
            "It is built for teachers who are under pressure and want support writing clear, calm, professional messages they will not regret sending later.",
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
            "Yes. That is one of its main use cases. It is especially helpful when emotions are high, stakes are high, or wording needs to be careful.",
        },
        {
          question: "Is this only for burnt-out teachers?",
          answer:
            "No. But it is especially relevant for teachers who feel stretched, tired, or anxious about getting the wording wrong in difficult situations.",
        },
      ],
    },
    finalCta: {
      headingLines: [
        "It's 10:47 PM on a Sunday.",
        "What if you were already done?",
      ],
      subheading:
        "No more staring at blank screens. No more copy-paste comments. Just thoughtful writing that sounds like you, delivered in seconds.",
      reassurance: "No credit card. No lock-in. Fully editable.",
      quote: "No more Sunday night anxiety.",
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
