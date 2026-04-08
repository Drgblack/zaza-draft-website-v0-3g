import type { LucideIcon } from "lucide-react";
import { Clock3, MessageSquareWarning, ShieldCheck, Users } from "lucide-react";

export type SchoolsLocale = "en" | "de";

export interface SchoolsContent {
  locale: SchoolsLocale;
  path: string;
  demoHref: string;
  heroImage: string;
  rolloutImage: string;
  heroImageAlt: string;
  rolloutImageAlt: string;
  brandLabel: string;
  hero: {
    badge: string;
    title: string;
    description: string;
    support: string;
    imageOverlayLabel: string;
    imageOverlayText: string;
    stats: Array<{ label: string; value: string }>;
  };
  cta: {
    primary: string;
    secondary: string;
    pricingSecondary: string;
    microcopy: readonly string[];
    finalSupport: string;
    finalMicrocopy: readonly string[];
  };
  problemStrip: ReadonlyArray<{
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
  proof: {
    eyebrow: string;
    title: string;
    description: string;
    beforeLabel: string;
    beforeText: string;
    afterLabel: string;
    afterText: string;
    note: string;
  };
  leadershipPain: {
    eyebrow: string;
    title: string;
    description: string;
    cards: ReadonlyArray<{ title: string; body: string }>;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ReadonlyArray<{ step: string; title: string; body: string }>;
    tag: string;
  };
  inclusions: {
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    heading: string;
    items: readonly string[];
  };
  scenarios: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly string[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    description: string;
    genericLabel: string;
    zazaLabel: string;
    rows: ReadonlyArray<{ generic: string; zaza: string }>;
  };
  commercial: {
    eyebrow: string;
    title: string;
    description: string;
    supportBox: string;
    tiers: ReadonlyArray<{
      name: string;
      summary: string;
      details: readonly string[];
    }>;
    scopeLabel: string;
    ctaLabel: string;
    ctaTitle: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: ReadonlyArray<{ question: string; answer: string }>;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

const problemStrip = {
  en: [
    {
      title: "Reduce escalation risk",
      description:
        "Give staff support before one badly judged phrase turns into a complaint, a forwarded thread, or a leadership issue.",
      icon: ShieldCheck,
    },
    {
      title: "Support staff in difficult moments",
      description:
        "Help people respond calmly when the message in front of them is emotionally charged, sensitive, or hard to word well.",
      icon: Users,
    },
    {
      title: "Create calmer consistency",
      description:
        "Make professional, parent-facing communication feel steadier across the school without flattening staff judgement.",
      icon: MessageSquareWarning,
    },
    {
      title: "Protect time and energy",
      description:
        "Reduce the after-hours rewriting, second-guessing, and colleague checking that difficult emails tend to create.",
      icon: Clock3,
    },
  ],
  de: [
    {
      title: "Eskalationsrisiko senken",
      description:
        "Geben Sie Mitarbeitenden Unterstützung, bevor eine unglücklich formulierte Passage zu einer Beschwerde, Weiterleitung oder Führungsfrage wird.",
      icon: ShieldCheck,
    },
    {
      title: "Mitarbeitende in schwierigen Momenten unterstützen",
      description:
        "Helfen Sie Menschen, ruhig zu formulieren, wenn die Nachricht emotional aufgeladen, sensibel oder schwer gut zu schreiben ist.",
      icon: Users,
    },
    {
      title: "Ruhigere Konsistenz schaffen",
      description:
        "Sorgen Sie für verlässlichere Elternkommunikation in der Schule, ohne professionelles Ermessen zu glätten.",
      icon: MessageSquareWarning,
    },
    {
      title: "Zeit und Energie schützen",
      description:
        "Reduzieren Sie das Umschreiben am Abend, das Grübeln und das Gegenlesen durch Kolleginnen und Kollegen, das schwierige E-Mails oft auslösen.",
      icon: Clock3,
    },
  ],
} as const;

export const schoolsEnContent: SchoolsContent = {
  locale: "en",
  path: "/schools",
  demoHref: "/contact/schools?plan=enterprise&source=schools_page",
  heroImage: "/teacher-writing-parent-email-on-laptop.jpg",
  rolloutImage: "/school-district-meeting-teachers.jpg",
  heroImageAlt:
    "Teacher reviewing a difficult parent email on a laptop in a calm school office",
  rolloutImageAlt:
    "School leadership team discussing communication support in a modern school setting",
  brandLabel: "Zaza for Schools",
  hero: {
    badge: "Zaza for Schools",
    title: "A safer way for schools to handle high-stakes parent communication",
    description:
      "Zaza helps staff shape calmer, clearer, more professional messages before they are sent. For schools, that means less after-hours rewriting, fewer avoidable escalations, and a stronger support layer around difficult communication.",
    support:
      "This is the moment where a member of staff pauses before sending and wonders whether the message will calm the situation or make it worse.",
    imageOverlayLabel: "Communication support layer",
    imageOverlayText:
      "Support staff before a difficult reply becomes tomorrow morning's leadership issue.",
    stats: [
      {
        label: "Designed for",
        value: "leaders, principals, trusts, and school teams",
      },
      {
        label: "Supports",
        value: "workload, wellbeing, and communication quality",
      },
      {
        label: "Best fit",
        value: "the messages staff hesitate over most",
      },
    ],
  },
  cta: {
    primary: "Book a school demo",
    secondary: "See how it works for schools",
    pricingSecondary: "View the commercial model",
    microcopy: [
      "15 minutes. Real scenarios. No pressure.",
      "See how it works with real school communication examples.",
      "A practical walkthrough for school leaders.",
    ],
    finalSupport:
      "Built for emotionally sensitive school communication where tone, judgement, and professionalism matter as much as the wording itself.",
    finalMicrocopy: [
      "15 minutes. Real scenarios. No pressure.",
      "A practical walkthrough for school leaders.",
    ],
  },
  problemStrip: problemStrip.en,
  proof: {
    eyebrow: "A simple example",
    title: "How the message changes before it escalates",
    description:
      "Zaza helps staff shape difficult messages before they are sent. The goal is not to remove the point. It is to make the wording calmer, clearer, and easier to stand behind professionally.",
    beforeLabel: "Before",
    beforeText:
      "Hi Mrs Carter, I need to be honest, Oliver's behaviour today was not acceptable. He ignored several instructions, argued back when challenged, and upset the rest of the class. I have already spoken to him more than once about this and I do not want this happening again. Please speak to him at home because this is becoming a pattern.",
    afterLabel: "After with Zaza",
    afterText:
      "Hi Mrs Carter, I wanted to let you know about a difficulty in class today involving Oliver. He found it hard to follow instructions and there were a couple of moments where his responses disrupted the lesson. I have spoken with him about it in school and we will continue to support him here. I wanted to keep you informed and would appreciate your support in reinforcing expectations at home so we can help him have a better day tomorrow.",
    note: "The message still addresses the issue clearly. It simply lands in a way that is calmer, more professional, and less likely to trigger avoidable escalation.",
  },
  leadershipPain: {
    eyebrow: "What schools are actually dealing with",
    title: "The organisational problem is bigger than one difficult email",
    description:
      "Staff already do a lot to stay professional. They rewrite, pause, ask colleagues, use templates, and try generic AI tools because difficult parent communication carries consequences. The issue at school level is the emotional load, the time lost, and the fallout when support arrives too late.",
    cards: [
      {
        title: "Parent emails that do not close with one reply",
        body: "A message that should take ten minutes can linger for days, absorbing staff attention and leadership time long after the first exchange.",
      },
      {
        title: "Too much rewriting under pressure",
        body: "Staff already rewrite difficult messages several times, delay sending, or ask colleagues for a second opinion because the tone has to hold up.",
      },
      {
        title: "Fear that one phrase could trigger a complaint",
        body: "When communication feels emotionally loaded, the risk is rarely factual error. It is wording, tone, defensibility, and how the message lands.",
      },
      {
        title: "Support arriving after tension is already high",
        body: "By the time a line manager is pulled in, the emotional energy has usually already been spent and the relationship may already be strained.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How Zaza for Schools works",
    title: "A practical communication system, not generic AI text generation",
    description:
      "Zaza for Schools gives staff a structured way to work through the messages they are most worried about sending. It supports judgement rather than replacing it, and helps schools create steadier parent communication before problems grow.",
    tag: "Human-led",
    steps: [
      {
        step: "01",
        title: "Staff bring the message they are hesitating over",
        body: "A difficult draft, a fresh reply, or a message still forming in notes can be brought into Zaza before it is sent.",
      },
      {
        step: "02",
        title: "Zaza reshapes it into a calmer working draft",
        body: "The system helps produce wording that is clearer, steadier, and easier to stand behind professionally without removing the core point.",
      },
      {
        step: "03",
        title: "The staff member stays in control",
        body: "Judgement remains with the staff member or leader. Zaza supports professional communication, not automated sending or generic AI output.",
      },
      {
        step: "04",
        title: "The school gains a support layer before escalation",
        body: "Leaders get a practical way to reduce avoidable communication fallout while keeping responses human, credible, and appropriate to the person sending them.",
      },
    ],
  },
  inclusions: {
    eyebrow: "What is included",
    title:
      "A premium rollout designed for real school use, not a lightweight self-serve tool",
    description:
      "Zaza for Schools combines access, guidance, implementation support, and practical communication scaffolding. The aim is not only adoption. It is better outcomes in difficult messages and less avoidable communication strain across the school.",
    badge: "Institutional package",
    heading:
      "Zaza Draft for individual teachers. Zaza for Schools for team rollout.",
    items: [
      "Zaza Draft access for staff who handle parent communication",
      "Communication templates for common high-stakes scenarios",
      "Onboarding for your team and implementation guidance",
      "Practical guidance for emotionally sensitive situations",
      "Priority support for rollout and adoption questions",
      "Optional implementation support for school-wide or trust-wide deployment",
    ],
  },
  scenarios: {
    eyebrow: "Designed for high-stakes school communication",
    title: "Built for the messages staff hesitate over",
    description:
      "This is for the communication that gets rewritten several times, sits open in drafts, or risks becoming more difficult once it reaches a parent inbox.",
    items: [
      "Behaviour incidents that need to stay calm and factual",
      "Parent complaints and challenging follow-up replies",
      "Sensitive wellbeing updates where tone matters as much as content",
      "Attendance and safeguarding-adjacent communication requiring care and clarity",
      "Grade, assessment, or progress tension that can easily escalate",
      "Messages after a difficult meeting when professionalism has to hold under pressure",
    ],
  },
  comparison: {
    eyebrow: "Why schools do not stop at generic AI",
    title:
      "Generic AI can generate text. Zaza is designed for the message that has consequences if it lands badly.",
    description:
      "Schools are right to notice that staff are already experimenting with AI. The question is whether a generic tool is enough for sensitive school-parent communication. Zaza is designed around trust, tone, and professional defensibility in school contexts.",
    genericLabel: "Generic AI",
    zazaLabel: "Zaza for Schools",
    rows: [
      {
        generic: "Useful for generating text quickly",
        zaza: "Designed specifically around school-parent communication where tone, judgement, and defensibility matter",
      },
      {
        generic:
          "Requires staff to invent the right prompt and evaluate the output alone",
        zaza: "Built as a communication support layer for the messages that already carry emotional and professional consequences",
      },
      {
        generic: "Often sounds polished but not always school-authentic",
        zaza: "Aims for calmer, clearer wording that still sounds human and appropriate for real parent-facing use",
      },
      {
        generic: "Best when the task is broad and open-ended",
        zaza: "Best when the school needs support with the message staff are worried about sending tomorrow morning",
      },
    ],
  },
  commercial: {
    eyebrow: "Commercial model",
    title:
      "Structured for pilots, school-wide rollout, and trust-level adoption",
    description:
      "Zaza for Schools is positioned as a premium support layer for staff communication. Commercial scope is shaped around staff numbers, rollout depth, implementation needs, and the level of support your team wants.",
    supportBox:
      "Typical conversations sit in the range of a premium monthly school support tool, not low-cost self-serve software.",
    scopeLabel: "Tailored commercial scope",
    ctaLabel: "Next step",
    ctaTitle:
      "Book a leadership conversation and we will scope the right rollout model with you.",
    tiers: [
      {
        name: "Pilot rollout",
        summary:
          "A focused starting point for one school, team, or high-need staff group.",
        details: [
          "Scoped onboarding and setup",
          "Defined use cases and rollout support",
          "Best for proving value quickly in real communication pressure points",
        ],
      },
      {
        name: "School-wide rollout",
        summary:
          "A full school implementation for leaders who want a consistent staff communication support layer.",
        details: [
          "Access shaped around staff communication needs",
          "Onboarding, guidance, and support for implementation",
          "Suitable for schools treating workload, professionalism, and escalation risk as one issue",
        ],
      },
      {
        name: "Multi-school or trust rollout",
        summary:
          "A broader deployment model for groups that want consistency across schools while keeping local judgement intact.",
        details: [
          "Multi-site planning and implementation support",
          "Shared communication principles with practical flexibility",
          "Commercial scope tailored to staff numbers and rollout depth",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Short FAQ",
    title: "Questions school leaders usually ask first",
    description:
      "A clearer commercial conversation usually starts with a few practical questions about control, judgement, and rollout.",
    items: [
      {
        question: "Do teachers still control the final message?",
        answer:
          "Yes. Zaza supports the draft, but the teacher remains in control of what is sent.",
      },
      {
        question: "Is this replacing teacher judgement?",
        answer:
          "No. It is designed to support professional judgement in emotionally sensitive communication, not replace it.",
      },
      {
        question: "How is this different from generic AI tools?",
        answer:
          "Zaza is designed specifically for teacher-parent communication where tone, trust, and professional consequences matter.",
      },
      {
        question: "What does rollout look like for a school?",
        answer:
          "Most schools start with a pilot or limited rollout, then expand based on staff needs and feedback.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Final step",
    title:
      "Support your staff before difficult emails turn into bigger problems",
    description:
      "Give your school a calmer, more consistent communication layer for the messages that carry emotional weight, professional risk, and after-hours load. Zaza for Schools is designed to help staff respond clearly, calmly, and credibly before issues escalate.",
  },
};

export const schoolsDeContent: SchoolsContent = {
  locale: "de",
  path: "/de/schools",
  demoHref: "/de/contact/schools?plan=enterprise&source=schools_page_de",
  heroImage: "/teacher-writing-parent-email-on-laptop.jpg",
  rolloutImage: "/school-district-meeting-teachers.jpg",
  heroImageAlt:
    "Lehrkraft prüft eine schwierige Elternmail an einem Laptop in einem ruhigen Schulbüro",
  rolloutImageAlt:
    "Schulleitung bespricht Kommunikationsunterstützung in einer modernen Schulumgebung",
  brandLabel: "Zaza für Schulen",
  hero: {
    badge: "Zaza für Schulen",
    title:
      "Ein sicherer Weg für Schulen mit anspruchsvoller Elternkommunikation umzugehen",
    description:
      "Zaza hilft Mitarbeitenden, ruhigere, klarere und professionellere Nachrichten zu formulieren, bevor sie gesendet werden. Für Schulen bedeutet das weniger Umschreiben am Abend, weniger vermeidbare Eskalationen und eine stärkere Unterstützung rund um schwierige Kommunikation.",
    support:
      "Genau in diesem Moment hält eine Lehrkraft oder Führungskraft kurz inne und fragt sich, ob die Nachricht die Situation beruhigt oder verschärft.",
    imageOverlayLabel: "Unterstützung für Kommunikation",
    imageOverlayText:
      "Unterstützen Sie Mitarbeitende, bevor eine schwierige Antwort morgen früh zur Leitungsfrage wird.",
    stats: [
      {
        label: "Geeignet für",
        value: "Schulleitungen, Schulen, Träger und Teams",
      },
      {
        label: "Unterstützt",
        value: "Arbeitsbelastung, Wohlbefinden und Kommunikationsqualität",
      },
      {
        label: "Am stärksten bei",
        value: "den Nachrichten, bei denen Mitarbeitende zögern",
      },
    ],
  },
  cta: {
    primary: "Schul-Demo buchen",
    secondary: "So funktioniert es für Schulen",
    pricingSecondary: "Rollout-Modelle ansehen",
    microcopy: [
      "15 Minuten. Reale Szenarien. Kein Druck.",
      "Sehen Sie echte Beispiele aus schulischer Kommunikation.",
      "Ein praktischer Walkthrough für Schulleitungen.",
    ],
    finalSupport:
      "Entwickelt für emotional sensible Schulkommunikation, bei der Ton, Ermessen und Professionalität genauso wichtig sind wie der Inhalt.",
    finalMicrocopy: [
      "15 Minuten. Reale Szenarien. Kein Druck.",
      "Ein praktischer Walkthrough für Schulleitungen.",
    ],
  },
  problemStrip: problemStrip.de,
  proof: {
    eyebrow: "Ein einfaches Beispiel",
    title: "Wie sich eine Nachricht verändert, bevor sie eskaliert",
    description:
      "Zaza hilft Mitarbeitenden, schwierige Nachrichten zu formen, bevor sie gesendet werden. Es geht nicht darum, den Kern abzuschwächen. Es geht darum, ruhiger, klarer und professionell belastbarer zu formulieren.",
    beforeLabel: "Vorher",
    beforeText:
      "Guten Tag Frau Carter, ich muss ehrlich sagen, dass Olivers Verhalten heute nicht akzeptabel war. Er hat mehrere Anweisungen ignoriert, widersprochen und den restlichen Unterricht gestört. Ich habe bereits mehr als einmal mit ihm darüber gesprochen und möchte nicht, dass das noch einmal passiert. Bitte sprechen Sie zu Hause mit ihm, weil sich das inzwischen häuft.",
    afterLabel: "Nachher mit Zaza",
    afterText:
      "Guten Tag Frau Carter, ich möchte Sie über eine Schwierigkeit informieren, die es heute im Unterricht mit Oliver gab. Es fiel ihm schwer, Anweisungen zu folgen, und es gab ein paar Momente, in denen seine Reaktionen den Unterricht beeinträchtigt haben. Ich habe dies in der Schule bereits mit ihm besprochen und wir werden ihn weiter unterstützen. Ich wollte Sie informieren und würde Ihre Unterstützung zu Hause schätzen, damit wir ihm gemeinsam helfen können, morgen besser durch den Tag zu kommen.",
    note: "Die Nachricht spricht das Thema weiterhin klar an. Sie kommt nur ruhiger, professioneller und mit geringerer Wahrscheinlichkeit für vermeidbare Eskalation an.",
  },
  leadershipPain: {
    eyebrow: "Womit Schulen tatsächlich umgehen",
    title:
      "Das organisatorische Problem ist grösser als eine einzelne schwierige E-Mail",
    description:
      "Mitarbeitende tun bereits viel, um professionell zu bleiben. Sie schreiben um, pausieren, fragen Kolleginnen und Kollegen, nutzen Vorlagen und probieren generische KI-Tools aus, weil schwierige Elternkommunikation Folgen hat. Auf Schulebene geht es um emotionale Belastung, verlorene Zeit und um die Folgekosten, wenn Unterstützung zu spät kommt.",
    cards: [
      {
        title: "Elternmails, die nicht mit einer Antwort enden",
        body: "Eine Nachricht, die zehn Minuten dauern sollte, kann sich über Tage ziehen und weit über den ersten Austausch hinaus Zeit von Mitarbeitenden und Leitung binden.",
      },
      {
        title: "Zu viel Umschreiben unter Druck",
        body: "Mitarbeitende formulieren schwierige Nachrichten bereits mehrfach um, verschieben das Senden oder holen eine zweite Meinung ein, weil der Ton standhalten muss.",
      },
      {
        title:
          "Die Sorge, dass eine Formulierung eine Beschwerde auslösen könnte",
        body: "Wenn Kommunikation emotional aufgeladen ist, liegt das Risiko selten in einem Faktenfehler. Es liegt in Wortwahl, Ton, Belastbarkeit und darin, wie die Nachricht ankommt.",
      },
      {
        title: "Unterstützung erst, wenn die Spannung bereits hoch ist",
        body: "Wenn eine Führungskraft einbezogen wird, ist die emotionale Energie oft schon verbraucht und die Beziehung möglicherweise bereits belastet.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Wie Zaza für Schulen funktioniert",
    title:
      "Ein praktisches Kommunikationssystem, keine generische KI-Textproduktion",
    description:
      "Zaza für Schulen gibt Mitarbeitenden einen strukturierten Weg, an den Nachrichten zu arbeiten, bei denen sie am meisten zögern. Es unterstützt Ermessen statt es zu ersetzen und hilft Schulen, Elternkommunikation ruhiger zu gestalten, bevor Probleme grösser werden.",
    tag: "Menschlich geführt",
    steps: [
      {
        step: "01",
        title: "Mitarbeitende bringen die Nachricht ein, bei der sie zögern",
        body: "Ein schwieriger Entwurf, eine frische Antwort oder eine Nachricht, die noch in Notizen steckt, kann in Zaza gebracht werden, bevor sie gesendet wird.",
      },
      {
        step: "02",
        title: "Zaza formt daraus eine ruhigere Arbeitsversion",
        body: "Das System hilft, Formulierungen zu erzeugen, die klarer, ruhiger und professionell belastbarer sind, ohne den eigentlichen Punkt zu entfernen.",
      },
      {
        step: "03",
        title: "Die Verantwortung bleibt bei der sendenden Person",
        body: "Das professionelle Ermessen bleibt bei Mitarbeitenden oder Leitung. Zaza unterstützt Kommunikation, nicht automatisches Senden oder generische KI-Ausgabe.",
      },
      {
        step: "04",
        title:
          "Die Schule gewinnt eine Unterstützungsschicht vor der Eskalation",
        body: "Leitungen erhalten einen praktischen Weg, vermeidbare Kommunikationsfolgen zu reduzieren und Antworten dennoch menschlich, glaubwürdig und passend zur sendenden Person zu halten.",
      },
    ],
  },
  inclusions: {
    eyebrow: "Was enthalten ist",
    title:
      "Ein hochwertiger Rollout für den echten Schuleinsatz, nicht ein leichtgewichtiges Self-Serve-Tool",
    description:
      "Zaza für Schulen verbindet Zugang, Guidance, Implementierungsunterstützung und praktische Kommunikationsbausteine. Es geht nicht nur um Nutzung. Es geht um bessere Ergebnisse in schwierigen Nachrichten und weniger vermeidbare Kommunikationsbelastung in der Schule.",
    badge: "Institutionelles Paket",
    heading:
      "Zaza Draft für einzelne Lehrkräfte. Zaza für Schulen für den Team-Rollout.",
    items: [
      "Zaza-Draft-Zugang für Mitarbeitende mit Elternkommunikation",
      "Kommunikationsvorlagen für häufige anspruchsvolle Szenarien",
      "Onboarding für Ihr Team und Unterstützung bei der Einführung",
      "Praktische Guidance für emotional sensible Situationen",
      "Priorisierter Support bei Rollout- und Nutzungsfragen",
      "Optionale Implementierungsunterstützung für schulweite oder trägerweite Einführung",
    ],
  },
  scenarios: {
    eyebrow: "Entwickelt für anspruchsvolle Schulkommunikation",
    title: "Gemacht für die Nachrichten, bei denen Mitarbeitende zögern",
    description:
      "Das ist für Kommunikation gedacht, die mehrfach umgeschrieben wird, als Entwurf offen bleibt oder schwieriger wird, sobald sie im Posteingang von Eltern landet.",
    items: [
      "Verhaltensvorfälle, die ruhig und sachlich formuliert werden müssen",
      "Elternbeschwerden und anspruchsvolle Anschlussantworten",
      "Sensible Informationen zum Wohlbefinden, bei denen der Ton ebenso wichtig ist wie der Inhalt",
      "Kommunikation zu Anwesenheit und angrenzenden Schutzthemen, die Sorgfalt und Klarheit verlangt",
      "Spannungen rund um Noten, Leistungsstand oder Bewertung",
      "Nachrichten nach einem schwierigen Gespräch, bei denen Professionalität unter Druck standhalten muss",
    ],
  },
  comparison: {
    eyebrow: "Warum Schulen nicht bei generischer KI stehen bleiben",
    title:
      "Generische KI kann Text erzeugen. Zaza ist für die Nachricht gemacht, die Folgen hat, wenn sie schlecht ankommt.",
    description:
      "Schulen beobachten zu Recht, dass Mitarbeitende bereits mit KI experimentieren. Die Frage ist, ob ein generisches Tool für sensible Schul-Eltern-Kommunikation ausreicht. Zaza ist rund um Vertrauen, Ton und professionelle Belastbarkeit im Schulkontext entwickelt.",
    genericLabel: "Generische KI",
    zazaLabel: "Zaza für Schulen",
    rows: [
      {
        generic: "Nützlich, um schnell Text zu erzeugen",
        zaza: "Speziell für Schul-Eltern-Kommunikation entwickelt, in der Ton, Ermessen und Belastbarkeit entscheidend sind",
      },
      {
        generic:
          "Verlangt von Mitarbeitenden, den richtigen Prompt selbst zu finden und das Ergebnis allein zu bewerten",
        zaza: "Gebaut als Unterstützungsschicht für Nachrichten mit emotionalen und professionellen Folgen",
      },
      {
        generic: "Klingt oft glatt, aber nicht immer schulisch glaubwürdig",
        zaza: "Zielt auf ruhigere, klarere Formulierungen, die menschlich bleiben und für echte Elternkommunikation geeignet sind",
      },
      {
        generic: "Am besten bei offenen, breit angelegten Aufgaben",
        zaza: "Am stärksten bei genau der Nachricht, die Mitarbeitende morgen früh nur ungern senden würden",
      },
    ],
  },
  commercial: {
    eyebrow: "Kommerzielles Modell",
    title:
      "Strukturiert für Pilot, schulweiten Rollout und trägerweite Einführung",
    description:
      "Zaza für Schulen ist als hochwertige Unterstützungsschicht für Mitarbeiterkommunikation positioniert. Der kommerzielle Rahmen richtet sich nach Anzahl der Mitarbeitenden, Tiefe des Rollouts, Implementierungsbedarf und gewünschtem Unterstützungsniveau.",
    supportBox:
      "Typische Gespräche liegen im Bereich eines hochwertigen monatlichen Schulsupport-Tools, nicht bei günstiger Self-Serve-Software.",
    scopeLabel: "Individuell zugeschnittener Leistungsumfang",
    ctaLabel: "Nächster Schritt",
    ctaTitle:
      "Buchen Sie ein Gespräch mit der Leitungsebene und wir stecken gemeinsam das passende Rollout-Modell ab.",
    tiers: [
      {
        name: "Pilot-Rollout",
        summary:
          "Ein fokussierter Startpunkt für eine Schule, ein Team oder eine Gruppe mit hohem Bedarf.",
        details: [
          "Abgestimmtes Onboarding und Setup",
          "Definierte Use Cases und Rollout-Unterstützung",
          "Geeignet, um Wert in realen Kommunikationssituationen schnell nachzuweisen",
        ],
      },
      {
        name: "Schulweiter Rollout",
        summary:
          "Eine vollständige Einführung für Leitungen, die eine konsistente Unterstützungsschicht für Mitarbeiterkommunikation möchten.",
        details: [
          "Zugang passend zu den Kommunikationsanforderungen der Mitarbeitenden",
          "Onboarding, Guidance und Unterstützung bei der Einführung",
          "Geeignet für Schulen, die Arbeitsbelastung, Professionalität und Eskalationsrisiko als zusammenhängendes Thema behandeln",
        ],
      },
      {
        name: "Mehrschul- oder Träger-Rollout",
        summary:
          "Ein breiteres Einführungsmodell für Gruppen, die Konsistenz über mehrere Schulen hinweg wollen und lokales Ermessen erhalten möchten.",
        details: [
          "Planung und Implementierungsunterstützung über mehrere Standorte",
          "Gemeinsame Kommunikationsprinzipien mit praktischer Flexibilität",
          "Kommerzieller Umfang passend zu Mitarbeitendenzahl und Rollout-Tiefe",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Kurze FAQ",
    title: "Fragen, die Schulleitungen meist zuerst stellen",
    description:
      "Ein klareres kommerzielles Gespräch beginnt oft mit einigen praktischen Fragen zu Kontrolle, Ermessen und Einführung.",
    items: [
      {
        question:
          "Behalten Lehrkräfte die Kontrolle über die endgültige Nachricht?",
        answer:
          "Ja. Zaza unterstützt den Entwurf, aber die Lehrkraft entscheidet weiterhin, was tatsächlich gesendet wird.",
      },
      {
        question: "Ersetzt das professionelles Ermessen?",
        answer:
          "Nein. Es ist dafür entwickelt, professionelles Ermessen in emotional sensibler Kommunikation zu unterstützen, nicht zu ersetzen.",
      },
      {
        question: "Worin unterscheidet sich das von generischen KI-Tools?",
        answer:
          "Zaza ist speziell für Schul-Eltern-Kommunikation entwickelt, bei der Ton, Vertrauen und professionelle Folgen zählen.",
      },
      {
        question: "Wie sieht ein Rollout für eine Schule aus?",
        answer:
          "Viele Schulen starten mit einem Pilot oder begrenzten Rollout und erweitern danach anhand von Bedarf und Rückmeldung.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Letzter Schritt",
    title:
      "Unterstützen Sie Ihr Team, bevor schwierige E-Mails zu grösseren Problemen werden",
    description:
      "Geben Sie Ihrer Schule eine ruhigere und konsistentere Unterstützungsschicht für Nachrichten mit emotionalem Gewicht, professionellem Risiko und Belastung am Feierabend. Zaza für Schulen hilft Mitarbeitenden, klar, ruhig und glaubwürdig zu antworten, bevor Situationen eskalieren.",
  },
};
