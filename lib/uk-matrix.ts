import type { MetadataRoute } from "next";

export const ukPhases = [
  "primary",
  "ks1",
  "ks2",
  "secondary",
  "ks3",
  "ks4",
  "fe",
] as const;

export const ukSubjects = [
  "english",
  "maths",
  "science",
  "all-subjects",
] as const;

export const ukYearGroups = [
  "year-1",
  "year-2",
  "year-3",
  "year-4",
  "year-5",
  "year-6",
  "year-7",
  "year-8",
  "year-9",
  "year-10",
  "year-11",
  "post-16",
] as const;

export const ukNeeds = [
  "autism",
  "adhd",
  "dyslexia",
  "speech-and-language",
  "semh",
  "anxiety",
  "cognition-and-learning",
  "eal",
] as const;

export type UkPhase = (typeof ukPhases)[number];
export type UkSubject = (typeof ukSubjects)[number];
export type UkYearGroup = (typeof ukYearGroups)[number];
export type UkNeed = (typeof ukNeeds)[number];

export type UkFaqItem = {
  question: string;
  answer: string;
};

export type UkHowToStep = {
  name: string;
  text: string;
};

export type UkSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type UkExample = {
  title: string;
  intro: string;
  body: string;
  note: string;
};

export type UkTrustItem = {
  title: string;
  body: string;
};

export type UkRelatedLink = {
  href: string;
  label: string;
  description: string;
};

export type UkRouteKind =
  | "parents-evening-email-templates"
  | "ofsted-friendly-report-comments"
  | "behaviour-letter-home"
  | "sen-report-comments";

export type UkClusterPageData = {
  path: string;
  title: string;
  h1: string;
  metaDescription: string;
  keyword: string;
  routeKind: UkRouteKind;
  eyebrow: string;
  hero: string[];
  quickAnswer: string;
  highlights: string[];
  introTitle: string;
  intro: string[];
  steps: UkHowToStep[];
  sections: UkSection[];
  examples: UkExample[];
  faq: UkFaqItem[];
  relatedLinks: UkRelatedLink[];
  trustItems: UkTrustItem[];
  ctaTitle: string;
  ctaBody: string;
  breadcrumbs: Record<string, string>;
};

type TopicMeta = {
  label: string;
  titleLabel: string;
  trustLabel: string;
  snippet: string;
};

const phaseMeta: Record<UkPhase, TopicMeta> = {
  primary: {
    label: "primary",
    titleLabel: "Primary",
    trustLabel: "primary school",
    snippet: "for primary teachers and school staff",
  },
  ks1: {
    label: "KS1",
    titleLabel: "KS1",
    trustLabel: "Key Stage 1",
    snippet: "for Key Stage 1 classrooms",
  },
  ks2: {
    label: "KS2",
    titleLabel: "KS2",
    trustLabel: "Key Stage 2",
    snippet: "for Key Stage 2 classrooms",
  },
  secondary: {
    label: "secondary",
    titleLabel: "Secondary",
    trustLabel: "secondary school",
    snippet: "for secondary teachers and pastoral teams",
  },
  ks3: {
    label: "KS3",
    titleLabel: "KS3",
    trustLabel: "Key Stage 3",
    snippet: "for Key Stage 3 classes",
  },
  ks4: {
    label: "KS4",
    titleLabel: "KS4",
    trustLabel: "Key Stage 4",
    snippet: "for Key Stage 4 classes",
  },
  fe: {
    label: "FE",
    titleLabel: "FE",
    trustLabel: "further education",
    snippet: "for further education teams",
  },
};

const subjectMeta: Record<UkSubject, TopicMeta> = {
  english: {
    label: "English",
    titleLabel: "English",
    trustLabel: "English reports",
    snippet: "for English report comments and written feedback",
  },
  maths: {
    label: "maths",
    titleLabel: "Maths",
    trustLabel: "maths reports",
    snippet: "for maths report comments and parent-facing wording",
  },
  science: {
    label: "science",
    titleLabel: "Science",
    trustLabel: "science reports",
    snippet: "for science report comments and evidence-based wording",
  },
  "all-subjects": {
    label: "all subjects",
    titleLabel: "All Subjects",
    trustLabel: "cross-curricular reports",
    snippet: "for whole-school report writing across subjects",
  },
};

const needMeta: Record<UkNeed, TopicMeta> = {
  autism: {
    label: "autism",
    titleLabel: "Autism",
    trustLabel: "autism-aware report writing",
    snippet: "for autism-aware report comments",
  },
  adhd: {
    label: "ADHD",
    titleLabel: "ADHD",
    trustLabel: "ADHD-aware report writing",
    snippet: "for ADHD-aware report comments",
  },
  dyslexia: {
    label: "dyslexia",
    titleLabel: "Dyslexia",
    trustLabel: "dyslexia-aware report writing",
    snippet: "for dyslexia-aware report comments",
  },
  "speech-and-language": {
    label: "speech and language needs",
    titleLabel: "Speech and Language Needs",
    trustLabel: "speech and language support",
    snippet: "for speech and language support wording",
  },
  semh: {
    label: "SEMH",
    titleLabel: "SEMH",
    trustLabel: "social, emotional and mental health needs",
    snippet: "for SEMH-sensitive report comments",
  },
  anxiety: {
    label: "anxiety",
    titleLabel: "Anxiety",
    trustLabel: "anxiety-sensitive report writing",
    snippet: "for anxiety-sensitive report comments",
  },
  "cognition-and-learning": {
    label: "cognition and learning needs",
    titleLabel: "Cognition and Learning Needs",
    trustLabel: "cognition and learning support",
    snippet: "for cognition and learning support wording",
  },
  eal: {
    label: "EAL",
    titleLabel: "EAL",
    trustLabel: "EAL-aware report writing",
    snippet: "for EAL-sensitive report comments",
  },
};

function yearGroupLabel(yearGroup: UkYearGroup) {
  if (yearGroup === "post-16") {
    return "Post-16";
  }

  return yearGroup
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function yearGroupStage(yearGroup: UkYearGroup) {
  if (yearGroup === "post-16") {
    return "further education";
  }

  const year = Number(yearGroup.replace("year-", ""));

  if (year <= 2) {
    return "infant and lower-primary";
  }

  if (year <= 6) {
    return "primary";
  }

  if (year <= 9) {
    return "lower-secondary";
  }

  return "exam-year secondary";
}

function yearGroupPhaseLink(yearGroup: UkYearGroup): UkPhase {
  if (yearGroup === "post-16") {
    return "fe";
  }

  const year = Number(yearGroup.replace("year-", ""));

  if (year <= 2) {
    return "ks1";
  }

  if (year <= 6) {
    return "ks2";
  }

  if (year <= 9) {
    return "ks3";
  }

  return "ks4";
}

function titleCase(input: string) {
  return input.replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildTrustItems(): UkTrustItem[] {
  return [
    {
      title: "Built for British schools",
      body: "The copy keeps to British spelling, parents' evening language, UK school expectations, and calmer professional wording that suits teachers and school staff.",
    },
    {
      title: "GDPR-aware drafting",
      body: "Use the examples as a starting point, keep only relevant pupil detail, and review every line before sending or publishing it in a school system.",
    },
    {
      title: "Teacher stays in control",
      body: "Zaza Draft is a co-writer, not a replacement. You keep the judgement, the context, and the final approval.",
    },
  ];
}

function buildBreadcrumbs(
  kind: UkRouteKind,
  path: string,
  finalLabel: string,
): Record<string, string> {
  const baseLabelMap: Record<UkRouteKind, string> = {
    "parents-evening-email-templates": "Parents' Evening Email Templates",
    "ofsted-friendly-report-comments": "Ofsted-Friendly Report Comments",
    "behaviour-letter-home": "Behaviour Letter Home",
    "sen-report-comments": "SEN Report Comments",
  };

  return {
    "/uk": "UK",
    [`/uk/${kind}`]: baseLabelMap[kind],
    [path]: finalLabel,
  };
}

function buildRelatedLinks(kind: UkRouteKind, value: string): UkRelatedLink[] {
  const coreLinks: UkRelatedLink[] = [
    {
      href: "/uk/teacher-communication-resources",
      label: "UK Teacher Communication Resources",
      description:
        "Browse the wider UK cluster for parents' evening emails, report comments, behaviour letters, and safer AI support.",
    },
    {
      href: "/diagnosis",
      label: "Parent Communication Diagnosis",
      description:
        "Describe the issue and get calm next-page recommendations for parent communication and report writing.",
    },
    {
      href: "/products/draft",
      label: "Zaza Draft for Teachers",
      description:
        "See how the teacher-first co-writer helps you draft carefully without losing professional control.",
    },
  ];

  switch (kind) {
    case "parents-evening-email-templates":
      return [
        ...coreLinks,
        {
          href: "/uk/ofsted-friendly-report-comments/all-subjects",
          label: "Ofsted-Friendly Report Comments",
          description:
            "Pair parents' evening follow-up with report comment wording that stays evidence-based and measured.",
        },
        {
          href: "/uk/behaviour-letter-home/year-5",
          label: "Behaviour Letter Home Examples",
          description:
            "Useful when a parents' evening conversation also needs a careful written record for home.",
        },
      ];

    case "ofsted-friendly-report-comments":
      return [
        ...coreLinks,
        {
          href: "/uk/sen-report-comments/autism",
          label: "SEN Report Comments",
          description:
            "See UK report comment guidance that stays person-centred and avoids overclaiming.",
        },
        {
          href: "/uk/parents-evening-email-templates/secondary",
          label: "Parents' Evening Email Templates",
          description:
            "Helpful when report comments need to line up with your parent communication.",
        },
      ];

    case "behaviour-letter-home":
      return [
        ...coreLinks,
        {
          href: `/uk/parents-evening-email-templates/${yearGroupPhaseLink(
            value as UkYearGroup,
          )}`,
          label: "Parents' Evening Follow-Up",
          description:
            "Useful if the behaviour letter home needs a calm invitation to talk things through.",
        },
        {
          href: "/how-to-reply-to-an-angry-parent-email",
          label: "Reply to an Angry Parent Email",
          description:
            "Support for the next step if the written behaviour concern prompts a difficult reply from home.",
        },
      ];

    case "sen-report-comments":
      return [
        ...coreLinks,
        {
          href: "/uk/ofsted-friendly-report-comments/all-subjects",
          label: "Ofsted-Friendly Report Comments",
          description:
            "See how to keep report writing clear, proportionate, and evidence-based across the wider class context.",
        },
        {
          href: "/uk/parents-evening-email-templates/primary",
          label: "Parents' Evening Email Templates",
          description:
            "Useful when SEN report comments lead into a careful conversation with home.",
        },
      ];
  }
}

function buildParentsEveningPageData(phase: UkPhase): UkClusterPageData {
  const phaseInfo = phaseMeta[phase];
  const path = `/uk/parents-evening-email-templates/${phase}`;
  const keyword = `parents' evening email templates ${phaseInfo.label}`;
  const title = `Parents' Evening Email Templates for ${phaseInfo.titleLabel} | Zaza Draft`;
  const h1 = `Parents' Evening Email Templates for ${phaseInfo.titleLabel}`;

  return {
    path,
    title,
    h1,
    metaDescription: `${keyword} with calm UK wording, professional follow-up examples, GDPR-aware reminders, and teacher-first drafting help from Zaza Draft.`,
    keyword,
    routeKind: "parents-evening-email-templates",
    eyebrow: "UK parent communication templates",
    hero: [
      `Parents' evening email templates ${phaseInfo.label} teachers can trust should sound organised, calm, and clear before a family even opens the message. In ${phaseInfo.trustLabel}, the right email lowers uncertainty, confirms the purpose of the meeting, and avoids the blunt wording that can create unnecessary worry.`,
      `This page gives you parents' evening email templates ${phaseInfo.snippet}. The examples are written in UK English, keep GDPR in mind, and are designed for real school communication where tone matters.`,
      `Zaza Draft is not a generic AI writer. It is a teacher-first co-writer for communication that still needs judgement, sensitivity, and final approval from the teacher.`,
    ],
    quickAnswer:
      "A strong parents' evening email should confirm the purpose of the meeting, share only the essentials, keep the tone measured, and end with one practical next step. In UK schools, that usually means staying polite, specific, and easy for families to act on.",
    highlights: [
      "Invitation, follow-up, and missed-appointment wording",
      "British-school tone for parents' evening communication",
      "Clear next steps without sounding cold or overly formal",
    ],
    introTitle: "Why these templates help in a British-school context",
    intro: [
      `Parents' evening often creates more writing than the diary suggests. Teachers need invitations, reminders, follow-up messages, and sometimes more delicate notes when concerns need to be shared carefully. In ${phaseInfo.trustLabel}, that writing has to feel professional without sounding defensive or robotic.`,
      "The safest approach is usually simple: be clear about the purpose, avoid overloading the email with detail, and keep the tone grounded in support. Families do not need a marketing-style message. They need calm, accurate communication that tells them what to expect.",
    ],
    steps: [
      {
        name: "State the practical purpose early",
        text: "Open with the meeting purpose and the key logistical detail. Families should know within the first lines whether this is an invitation, a reminder, or a follow-up.",
      },
      {
        name: "Keep the wording proportionate",
        text: "If there is a concern to discuss, name it in broad terms without trying to resolve the full issue by email. That keeps the message professional and lowers the chance of misunderstanding.",
      },
      {
        name: "Use one clear action",
        text: "End with one practical next step such as confirming a slot, replying with availability, or contacting the school office if a change is needed.",
      },
      {
        name: "Review for tone before sending",
        text: "Read the email once as a parent. Remove anything that sounds abrupt, overloaded, or too vague to be useful.",
      },
    ],
    sections: [
      {
        title: "What good parents' evening wording sounds like",
        paragraphs: [
          "Good parents' evening emails are calm rather than clever. They respect the parent's time, make the purpose clear, and avoid unnecessary tension. That matters even more when the conversation could include attendance, progress, behaviour, SEN support, or wellbeing.",
          `For ${phaseInfo.trustLabel}, the message should match the school's tone and the age of the pupil. Younger phases often need warmth and reassurance. Older phases usually benefit from clearer structure and a stronger sense of next steps.`,
        ],
        bullets: [
          "Lead with the practical reason for writing",
          "Avoid over-explaining before the meeting takes place",
          "Keep the wording easy to scan on a phone",
          "Save detailed pupil discussion for the conversation itself",
        ],
      },
      {
        title: "Pitfalls that make parents' evening emails feel risky",
        paragraphs: [
          "Many difficult exchanges start with wording that is technically correct but emotionally clumsy. A short sentence can sound cold. A long paragraph can sound evasive. A heavy list of concerns can make the parent feel ambushed before the meeting has even happened.",
          "Another common mistake is blending administration with judgement. A reminder email should stay a reminder email. If you also need to flag a concern, do it carefully and only where it genuinely helps the meeting happen well.",
        ],
        bullets: [
          "Do not imply blame in the invitation email",
          "Do not include more personal information than the message needs",
          "Do not promise outcomes before the discussion happens",
          "Do not mirror a parent's anxious or defensive tone",
        ],
      },
    ],
    examples: [
      {
        title: "Simple invitation email",
        intro:
          "Use this when you need a calm invitation that is easy to reply to.",
        body: `Subject: Parents' Evening Appointment\n\nDear Parent or Carer,\n\nI am writing to invite you to parents' evening for [Pupil Name]. This will be an opportunity to discuss progress, classroom learning, and any useful next steps for the term.\n\nPlease reply with your preferred time from the available slots below. If none of these are suitable, the school office can help arrange an alternative.\n\nKind regards,\n[Teacher Name]`,
        note: "This keeps the tone clear and welcoming without overloading the message.",
      },
      {
        title: "Reminder before the meeting",
        intro:
          "Useful when appointments are already booked and families need a short reminder.",
        body: `Subject: Parents' Evening Reminder\n\nDear Parent or Carer,\n\nThis is a quick reminder that your parents' evening appointment for [Pupil Name] is scheduled for [time] on [date].\n\nIf you need to rearrange, please let us know as soon as possible so that we can support another family with the slot if needed.\n\nKind regards,\n[Teacher Name]`,
        note: "The wording is brief, professional, and easy to scan on a phone.",
      },
      {
        title: "Invitation where there is a concern to discuss",
        intro:
          "Use this when you want the meeting to feel constructive rather than alarming.",
        body: `Subject: Parents' Evening Meeting for [Pupil Name]\n\nDear Parent or Carer,\n\nI would value the chance to speak with you at parents' evening about [Pupil Name]'s recent progress and how we can best support them over the coming weeks.\n\nPlease reply with your preferred appointment time. We can then talk through strengths, current priorities, and agreed next steps together.\n\nKind regards,\n[Teacher Name]`,
        note: "This signals importance without sounding dramatic or overly vague.",
      },
      {
        title: "Follow-up after a missed appointment",
        intro:
          "Helpful when the first meeting did not happen and you need a calm reset.",
        body: `Subject: Follow-Up After Parents' Evening\n\nDear Parent or Carer,\n\nI am sorry we were not able to meet at parents' evening regarding [Pupil Name]. I would still welcome the chance to speak with you so that we can share a brief update and discuss any useful next steps.\n\nPlease reply with your availability, or contact the school office if that is easier.\n\nKind regards,\n[Teacher Name]`,
        note: "The phrasing keeps the door open without sounding frustrated.",
      },
    ],
    faq: [
      {
        question: `How formal should parents' evening email templates be for ${phaseInfo.titleLabel}?`,
        answer:
          "Formal enough to sound professional, but not stiff. Parents should understand the purpose quickly and feel that the teacher is approachable.",
      },
      {
        question: "Should I mention concerns before the meeting?",
        answer:
          "Only in broad, proportionate terms if that helps the family understand the purpose of the appointment. Detailed discussion usually works better during the meeting itself.",
      },
      {
        question: "Can I send the same template to every family?",
        answer:
          "You can start with a shared structure, but it is worth adjusting the wording when the context is sensitive or when a family needs a more personal message.",
      },
      {
        question: "What should I avoid in a parents' evening email?",
        answer:
          "Avoid blame, long paragraphs, unexplained school jargon, or too much pupil detail in the email itself.",
      },
      {
        question: "How does Zaza Draft help with parents' evening emails?",
        answer:
          "It gives you a calmer first draft for teacher communication, but you still review, edit, and approve every word before it is used.",
      },
      {
        question: "Is this suitable for UK schools?",
        answer:
          "Yes. The wording uses British spelling, parents' evening conventions, and a professional tone that suits UK school communication.",
      },
    ],
    relatedLinks: buildRelatedLinks("parents-evening-email-templates", phase),
    trustItems: buildTrustItems(),
    ctaTitle: "Want a calmer draft before parents' evening?",
    ctaBody:
      "Zaza Draft helps teachers shape parent emails quickly and carefully, without losing judgement or professional control.",
    breadcrumbs: buildBreadcrumbs(
      "parents-evening-email-templates",
      path,
      phaseInfo.titleLabel,
    ),
  };
}

function buildOfstedPageData(subject: UkSubject): UkClusterPageData {
  const subjectInfo = subjectMeta[subject];
  const path = `/uk/ofsted-friendly-report-comments/${subject}`;
  const keyword = `ofsted-friendly report comments ${subjectInfo.label}`;
  const title = `Ofsted-Friendly Report Comments for ${subjectInfo.titleLabel} | Zaza Draft`;
  const h1 = `Ofsted-Friendly Report Comments for ${subjectInfo.titleLabel}`;

  return {
    path,
    title,
    h1,
    metaDescription: `${keyword} with evidence-based UK wording, professional examples, and calmer teacher-first drafting support for report writing.`,
    keyword,
    routeKind: "ofsted-friendly-report-comments",
    eyebrow: "UK report writing support",
    hero: [
      `Ofsted-friendly report comments ${subjectInfo.label} teachers use should be clear, measured, and rooted in what the pupil is actually showing. In practice, that means report wording that sounds professional, avoids inflated claims, and reflects real classroom evidence.`,
      `"Ofsted-friendly" does not mean Ofsted-approved. It usually means writing that is proportionate, specific, and useful to families, leaders, and the wider school record. That is especially important in ${subjectInfo.trustLabel}, where overstatement or vague praise can weaken the quality of the comment.`,
      `This page gives you UK-specific examples ${subjectInfo.snippet}, alongside safer phrasing and a trust-first workflow. Teachers still stay in full control of what is said about a pupil.`,
    ],
    quickAnswer:
      "Ofsted-friendly report comments are usually clear, evidence-based, and proportionate. They describe attainment, effort, or next steps in plain professional language without overclaiming, vague filler, or invented detail.",
    highlights: [
      "Evidence-based report comment examples",
      "UK wording that avoids overclaiming",
      "A safer definition of what teachers often mean by Ofsted-friendly",
    ],
    introTitle: "What teachers usually mean by Ofsted-friendly",
    intro: [
      "Most teachers do not mean a secret formula. They mean writing that would stand up well if a leader, parent, or colleague read it closely. The comment should be sensible, accurate, and aligned with the evidence in books, assessments, and day-to-day classroom work.",
      `In ${subjectInfo.trustLabel}, that often means naming strengths carefully, being honest about current gaps, and setting out next steps without drifting into generic praise. The goal is professional communication, not performance language.`,
    ],
    steps: [
      {
        name: "Start from evidence, not from the blank page",
        text: "Use classwork, assessment notes, and recent observations as the anchor. That keeps the comment grounded and reduces the risk of vague wording.",
      },
      {
        name: "Name the current picture clearly",
        text: "State what the pupil is doing well and where support or development is still needed. Keep the balance honest and readable.",
      },
      {
        name: "Choose one or two useful next steps",
        text: "Parents should leave with a sense of direction rather than a wall of description. A concise next step is usually stronger than a long explanation.",
      },
      {
        name: "Review for proportion and tone",
        text: "Remove phrases that sound inflated, clinical without need, or too vague to help anyone.",
      },
    ],
    sections: [
      {
        title: "Why tone matters in report comments",
        paragraphs: [
          "Report comments live in a strange space. They are school writing, but they are also family-facing. They may be read by leaders, discussed at parents' evening, and remembered far longer than the teacher expects. That is why measured tone matters so much.",
          `For ${subjectInfo.trustLabel}, strong wording is usually specific enough to feel credible and calm enough to feel professional. It should not sound like a stock phrase machine, but it also should not sound over-personal or speculative.`,
        ],
        bullets: [
          "Use plain professional language",
          "Stay close to what the pupil is actually demonstrating",
          "Avoid sweeping claims about potential or attitude",
          "Keep next steps practical and readable",
        ],
      },
      {
        title: "How to avoid risky report wording",
        paragraphs: [
          "A common problem in report season is trying to sound positive at all costs. That can lead to vague praise that means very little, or to coded criticism that parents can see through instantly. Neither helps.",
          "Another risk is using labels too loosely. If there is SEN context, wellbeing context, or pastoral information, write with care and school policy in mind. The report should stay accurate, person-centred, and appropriate for the audience.",
        ],
        bullets: [
          "Do not imply a diagnosis where one is not confirmed",
          "Do not use filler such as 'always tries hard' if the evidence is mixed",
          "Do not overcomplicate the language to sound more official",
          "Do not detach the comment from subject-specific evidence",
        ],
      },
    ],
    examples: [
      {
        title: "Balanced positive comment",
        intro:
          "Useful when progress is secure and you want calm, credible praise.",
        body: `[Pupil Name] approaches ${subjectInfo.label} with a positive attitude and has shown secure progress this term. They contribute thoughtfully in lessons and are becoming more confident when applying key skills independently. Continued attention to accuracy and detail will help them build on this progress further.`,
        note: "This sounds professional because the praise is measured and the next step is clear.",
      },
      {
        title: "Honest but supportive comment",
        intro:
          "Use this when attainment is uneven and you need balanced wording.",
        body: `[Pupil Name] is beginning to show a more secure understanding in ${subjectInfo.label}, particularly when tasks are carefully structured. They would benefit from greater consistency in completing independent work and checking their understanding so that class progress translates into stronger outcomes over time.`,
        note: "The phrasing avoids blame while staying clear about what still needs support.",
      },
      {
        title: "Strong effort with a clear next step",
        intro:
          "Helpful when effort is better than outcomes and you need proportionate wording.",
        body: `[Pupil Name] works positively in ${subjectInfo.label} lessons and is willing to engage with feedback. The next important step is to apply that feedback more independently so that improvement is seen more consistently in completed work.`,
        note: "This keeps effort and attainment connected rather than treating them as interchangeable.",
      },
      {
        title: "Cross-curricular report example",
        intro: "Useful for form tutors or broad whole-school reporting.",
        body: `[Pupil Name] participates appropriately in lessons and responds well to clear routines and expectations. With continued support to organise work carefully and act on feedback, they are well placed to make steadier progress across the curriculum.`,
        note: "This is especially useful for all-subject reporting where you need a professional summary.",
      },
    ],
    faq: [
      {
        question: "What does Ofsted-friendly actually mean in report writing?",
        answer:
          "Usually that the wording is clear, proportionate, evidence-based, and professional. It should not be treated as a claim of official approval.",
      },
      {
        question: "Should report comments sound formal?",
        answer:
          "They should sound professional and measured, but still readable for families. Dense official language is rarely the safest option.",
      },
      {
        question: "Can I use these examples in UK schools?",
        answer:
          "Yes, but they should always be adapted to the pupil, the evidence available, and the school's own policy or reporting style.",
      },
      {
        question: "How do I stay positive without sounding vague?",
        answer:
          "Anchor praise to something observable, then add one realistic next step. That keeps the tone balanced and useful.",
      },
      {
        question: "How does Zaza Draft help with report comments?",
        answer:
          "It helps you turn notes into calmer first drafts for report writing, while keeping teachers in control of the final wording and factual accuracy.",
      },
      {
        question: "Should SEN context go into every report comment?",
        answer:
          "Only when it is appropriate, useful, and aligned with the school's approach. The comment should stay person-centred and proportionate.",
      },
    ],
    relatedLinks: buildRelatedLinks("ofsted-friendly-report-comments", subject),
    trustItems: buildTrustItems(),
    ctaTitle: "Need report comments that sound calm and defensible?",
    ctaBody:
      "Zaza Draft helps teachers shape report wording that is clear, professional, and easier to review before it goes to families.",
    breadcrumbs: buildBreadcrumbs(
      "ofsted-friendly-report-comments",
      path,
      subjectInfo.titleLabel,
    ),
  };
}

function buildBehaviourLetterPageData(
  yearGroup: UkYearGroup,
): UkClusterPageData {
  const stage = yearGroupStage(yearGroup);
  const yearLabel = yearGroupLabel(yearGroup);
  const path = `/uk/behaviour-letter-home/${yearGroup}`;
  const keyword = `behaviour letter home ${yearLabel.toLowerCase()}`;
  const title = `Behaviour Letter Home for ${yearLabel} | Zaza Draft`;
  const h1 = `Behaviour Letter Home for ${yearLabel}`;

  return {
    path,
    title,
    h1,
    metaDescription: `${keyword} with calm UK wording, factual examples, parent-friendly follow-up language, and safer teacher-first drafting support.`,
    keyword,
    routeKind: "behaviour-letter-home",
    eyebrow: "UK behaviour communication",
    hero: [
      `A behaviour letter home ${yearLabel.toLowerCase()} families receive should be factual, proportionate, and calm. In ${stage} settings, the wrong tone can turn a manageable issue into a defensive exchange that takes even more teacher time later.`,
      `This page gives you behaviour letter home ${yearLabel.toLowerCase()} examples written for UK schools. The focus is on clear facts, measured wording, and next steps that support home-school communication rather than inflaming it.`,
      "The safest letters are rarely the longest. They explain what happened, what the school has already done, and what happens next, while leaving out loaded language and unnecessary emotion.",
    ],
    quickAnswer:
      "A strong behaviour letter home states the verified concern, keeps the tone professional, explains the school's response, and ends with a practical next step for home and school. It should not read like a punishment speech or an emotional reaction.",
    highlights: [
      `${yearLabel} examples that stay factual and calm`,
      "Professional behaviour wording for UK parent communication",
      "Next-step language that protects relationships with home",
    ],
    introTitle: "Why behaviour letters home need careful wording",
    intro: [
      "Behaviour communication often lands after a difficult day, which is exactly why the wording needs to be steadier than the moment itself. A strong letter protects the teacher, supports the school record, and still gives parents a workable route into the conversation.",
      `For ${yearLabel}, the detail and tone should match the pupil's stage. Younger year groups often need shorter, simpler wording. Older pupils may need clearer language about responsibility, routines, or agreed follow-up.`,
    ],
    steps: [
      {
        name: "Write only what you can verify",
        text: "Start from the observed behaviour, the timing, and the school's response. Avoid adding assumptions about motives or character.",
      },
      {
        name: "Keep the tone measured",
        text: "Parents need enough information to understand the concern, but not a letter that sounds punitive or emotionally charged.",
      },
      {
        name: "Show the next step",
        text: "Include what the school is doing and, where appropriate, what support from home would be helpful.",
      },
      {
        name: "Review for proportion",
        text: "Check whether the letter sounds aligned with the actual incident. Remove anything that feels overstated or unnecessarily personal.",
      },
    ],
    sections: [
      {
        title: "What makes a behaviour letter feel professional",
        paragraphs: [
          "Professional behaviour letters separate fact from frustration. They show that the school has noticed the issue, responded appropriately, and is communicating in a way that supports improvement rather than escalation.",
          `In ${stage} contexts, that usually means short paragraphs, plain language, and a clear distinction between the incident itself and the next step. Families should not have to decode the school's position.`,
        ],
        bullets: [
          "State the concern without labelling the pupil",
          "Mention the school's response briefly and clearly",
          "Invite partnership without sounding passive",
          "Keep the record suitable for SLT review if needed",
        ],
      },
      {
        title: "Common mistakes to avoid",
        paragraphs: [
          "A letter becomes risky when it tries to do too much at once. Listing every previous issue, using loaded adjectives, or implying intent where none has been established can all make the communication harder to defend.",
          "It also helps to be careful with copied language. A standard template may save time, but behaviour communication often needs enough tailoring to reflect the seriousness and context of the incident.",
        ],
        bullets: [
          "Do not describe the pupil as rude, lazy, or disrespectful without factual evidence",
          "Do not add unrelated past incidents unless school policy requires that context",
          "Do not sound like the outcome has been decided before parents respond",
          "Do not include sensitive information that is unnecessary for the letter's purpose",
        ],
      },
    ],
    examples: [
      {
        title: "First behaviour concern letter",
        intro: "Use this when you need a measured first written record home.",
        body: `Dear Parent or Carer,\n\nI am writing to let you know about a behaviour concern involving [Pupil Name] in class today. During the lesson, [brief factual description]. This disrupted learning and required staff intervention.\n\nI have spoken with [Pupil Name] about the incident and reminded them of the expected classroom standard. I would appreciate your support in reinforcing this message at home.\n\nKind regards,\n[Teacher Name]`,
        note: "This keeps the record factual and invites partnership without escalating the tone.",
      },
      {
        title: "Repeated low-level disruption",
        intro:
          "Helpful when the issue is becoming a pattern and needs clearer follow-up.",
        body: `Dear Parent or Carer,\n\nI am writing to follow up on a pattern of low-level disruption from [Pupil Name] during recent lessons. This has included [brief examples], which has affected focus and progress.\n\nWe have addressed this in school and made expectations clear. Please speak with [Pupil Name] at home so that we can work together on a more positive start next lesson.\n\nKind regards,\n[Teacher Name]`,
        note: "The wording is firm, but it avoids sounding personal or accusatory.",
      },
      {
        title: "Detention or sanction follow-up",
        intro:
          "Use when a sanction has already been applied and parents need a written summary.",
        body: `Dear Parent or Carer,\n\nI am writing to confirm that [Pupil Name] received [sanction] today following [brief factual description]. This response has been explained clearly in school and linked to our published expectations.\n\nOur aim is to support [Pupil Name] in making a stronger choice next time. Thank you for any reinforcement you can provide at home.\n\nKind regards,\n[Teacher Name]`,
        note: "This explains the sanction without sounding like a reprimand letter.",
      },
      {
        title: "Letter that keeps the door open for a conversation",
        intro: "Useful when you want partnership and calm de-escalation.",
        body: `Dear Parent or Carer,\n\nI wanted to make you aware of a concern regarding [Pupil Name]'s behaviour today. The issue involved [brief factual description], and we have addressed it in school.\n\nIf you would like to discuss this further, please reply and we can arrange a suitable time. We want to work together to support [Pupil Name] positively.\n\nKind regards,\n[Teacher Name]`,
        note: "This often works well when the relationship with home needs protecting.",
      },
    ],
    faq: [
      {
        question: `How long should a behaviour letter home for ${yearLabel} be?`,
        answer:
          "Usually short. Parents need the concern, the school's response, and the next step. Long letters often create more heat without adding clarity.",
      },
      {
        question: "Should I include previous incidents?",
        answer:
          "Only when that context is genuinely relevant and aligned with school policy. Many letters work better when they stay tightly focused on the current concern.",
      },
      {
        question: "How do I avoid sounding accusatory?",
        answer:
          "Describe observed behaviour rather than motives or character. Measured factual language is usually safer and more professional.",
      },
      {
        question: "Can I invite parents to reply?",
        answer:
          "Yes, if that suits the context. A brief invitation can help maintain partnership, especially where the matter may need further discussion.",
      },
      {
        question: "How does Zaza Draft help with behaviour letters home?",
        answer:
          "It helps teachers shape calmer first drafts for difficult school writing, while keeping the final wording, facts, and professional judgement under teacher control.",
      },
      {
        question: "Is this wording suitable for UK schools?",
        answer:
          "Yes. The tone is written for British schools, with UK spelling and a focus on proportionate behaviour communication.",
      },
    ],
    relatedLinks: buildRelatedLinks("behaviour-letter-home", yearGroup),
    trustItems: buildTrustItems(),
    ctaTitle:
      "Need a behaviour letter that is clear without escalating things?",
    ctaBody:
      "Zaza Draft helps you turn the facts into a calmer first draft for home-school communication, while you keep full control of the final message.",
    breadcrumbs: buildBreadcrumbs("behaviour-letter-home", path, yearLabel),
  };
}

function buildSenPageData(need: UkNeed): UkClusterPageData {
  const needInfo = needMeta[need];
  const path = `/uk/sen-report-comments/${need}`;
  const keyword = `sen report comments ${needInfo.label.toLowerCase()}`;
  const title = `SEN Report Comments for ${needInfo.titleLabel} | Zaza Draft`;
  const h1 = `SEN Report Comments for ${needInfo.titleLabel}`;

  return {
    path,
    title,
    h1,
    metaDescription: `${keyword} with UK-specific, person-centred wording, careful examples, and teacher-first drafting support for report writing.`,
    keyword,
    routeKind: "sen-report-comments",
    eyebrow: "UK SEN report writing",
    hero: [
      `SEN report comments ${needInfo.label.toLowerCase()} contexts require should be clear, respectful, and genuinely useful to families. The wording needs to recognise support needs without reducing the pupil to a label or sounding overly clinical.`,
      `This page gives you SEN report comments ${needInfo.snippet}, written in UK English and shaped for school reporting where tone, accuracy, and professional care all matter.`,
      "The safest approach is person-centred and evidence-based. It reflects what the pupil is showing in school, how support is helping, and what next steps may be useful, while still leaving teachers in control of every line.",
    ],
    quickAnswer:
      "Strong SEN report comments are person-centred, specific, and proportionate. They describe how the pupil is learning, what support is helping, and what next steps matter, without overclaiming or using unnecessary clinical language.",
    highlights: [
      "Person-centred SEN report wording",
      "Examples that stay specific without sounding clinical",
      "UK school tone for reports and parent-facing writing",
    ],
    introTitle: "What makes SEN report comments feel safe and useful",
    intro: [
      "Families often notice immediately whether a report comment sounds as though the teacher knows the pupil well. Generic phrases can feel distancing. Overly technical wording can feel cold. The strongest comments stay specific, respectful, and rooted in classroom evidence.",
      `For ${needInfo.trustLabel}, it also helps to be disciplined about what you are actually describing. Reports are usually strongest when they cover learning, engagement, support, and next steps rather than drifting into language that sounds diagnostic or absolute.`,
    ],
    steps: [
      {
        name: "Start with the pupil, not the label",
        text: "Lead with what the pupil is doing, showing, or responding to in class. That keeps the comment person-centred from the outset.",
      },
      {
        name: "Describe support in practical terms",
        text: "Name the kind of support that is helping without turning the report into an intervention log.",
      },
      {
        name: "Keep next steps realistic",
        text: "The best next steps are useful and proportionate. They should sound workable for school and understandable for home.",
      },
      {
        name: "Check language for accuracy and care",
        text: "Remove anything that sounds speculative, sweeping, or more medical than the report actually needs.",
      },
    ],
    sections: [
      {
        title: "How to keep SEN comments person-centred",
        paragraphs: [
          "Person-centred report writing recognises the pupil as more than a category. It focuses on strengths, engagement, support, and progress in a way that still feels accurate. Families tend to trust comments more when they sound like the pupil is genuinely known in school.",
          `In ${needInfo.trustLabel}, this often means explaining what helps the pupil access learning, how they respond to routines or scaffolds, and which next step would make the most difference now.`,
        ],
        bullets: [
          "Lead with observed learning and participation",
          "Name support strategies only where useful",
          "Avoid absolute statements such as 'cannot' or 'always'",
          "Keep language respectful and readable for families",
        ],
      },
      {
        title: "What to avoid in SEN report comments",
        paragraphs: [
          "It is worth being careful with wording that sounds diagnostic, fixed, or impersonal. Even when the need is well understood, the report comment should still describe the pupil's current experience of learning rather than reducing everything to a label.",
          "Another common problem is writing comments that are so gentle they stop being useful. Families usually appreciate honesty when it is paired with respect, clarity, and a realistic next step.",
        ],
        bullets: [
          "Do not imply clinical certainty beyond your role",
          "Do not repeat the same generic phrase across multiple pupils",
          "Do not turn the report into a list of barriers only",
          "Do not hide next steps behind vague praise",
        ],
      },
    ],
    examples: [
      {
        title: "Strengths-first SEN report comment",
        intro: "Use this when you want a balanced, person-centred opening.",
        body: `[Pupil Name] contributes positively to class and responds well to familiar routines and clear structure. With appropriate support in place, they are able to engage more confidently with learning and are showing growing independence in several areas.`,
        note: "This keeps the pupil at the centre while still reflecting the support context.",
      },
      {
        title: "Comment with clear support language",
        intro:
          "Helpful when support strategies are an important part of the picture.",
        body: `[Pupil Name] benefits from carefully scaffolded tasks and regular check-ins, which help them remain engaged and make steady progress. Continuing to build confidence in applying strategies more independently will support further development over time.`,
        note: "The phrasing shows what helps without sounding clinical or overly technical.",
      },
      {
        title: "Honest next-step comment",
        intro:
          "Use this when the report needs supportive honesty rather than soft generalities.",
        body: `[Pupil Name] is making progress within a structured environment and responds well to patient guidance. The next important step is to increase confidence when starting tasks and sustaining focus so that gains are seen more consistently across lessons.`,
        note: "This stays kind, but it still gives a meaningful next step.",
      },
      {
        title: "Communication-focused report example",
        intro:
          "Useful where language, confidence, or interaction is part of the learning picture.",
        body: `[Pupil Name] engages best when expectations are clear and language is carefully supported. They are increasingly willing to participate and share ideas when given time to process and respond, and this is helping them take a more active role in lessons.`,
        note: "This is often a safer way to write about communication needs in a report context.",
      },
    ],
    faq: [
      {
        question:
          "How do I write SEN report comments without sounding clinical?",
        answer:
          "Focus on observed learning, classroom support, and next steps. Use plain professional language and avoid unnecessary medical or diagnostic phrasing.",
      },
      {
        question: "Should I mention the pupil's need directly?",
        answer:
          "Only where it is appropriate and consistent with school practice. Many report comments work best when they focus on the pupil's learning profile and support rather than the label alone.",
      },
      {
        question: "How can I stay honest without sounding negative?",
        answer:
          "Be specific about current strengths and current barriers, then add one realistic next step. Clarity and respect usually work better than vague reassurance.",
      },
      {
        question: "Can these examples be used for UK reports?",
        answer:
          "Yes. They are written in UK English for school report contexts, but they should still be adapted to the individual pupil and local policy.",
      },
      {
        question: "How does Zaza Draft help with SEN report comments?",
        answer:
          "It helps teachers draft more carefully in tone-sensitive situations, while keeping all final decisions, factual checks, and edits with the teacher.",
      },
      {
        question: "What should I avoid in SEN report writing?",
        answer:
          "Avoid generic stock phrases, overclaiming, speculative statements, or wording that reduces the pupil to a need rather than describing their learning.",
      },
    ],
    relatedLinks: buildRelatedLinks("sen-report-comments", need),
    trustItems: buildTrustItems(),
    ctaTitle: "Need SEN report comments that sound careful and human?",
    ctaBody:
      "Zaza Draft helps you shape respectful, clearer report wording faster, while you keep control of tone, accuracy, and final approval.",
    breadcrumbs: buildBreadcrumbs(
      "sen-report-comments",
      path,
      needInfo.titleLabel,
    ),
  };
}

export function getUkParentsEveningParams() {
  return ukPhases.map((phase) => ({ phase }));
}

export function getUkOfstedParams() {
  return ukSubjects.map((subject) => ({ subject }));
}

export function getUkBehaviourLetterParams() {
  return ukYearGroups.map((yearGroup) => ({ yearGroup }));
}

export function getUkSenParams() {
  return ukNeeds.map((need) => ({ need }));
}

export function buildUkParentsEveningPageData(phase: UkPhase) {
  if (!ukPhases.includes(phase)) {
    return null;
  }

  return buildParentsEveningPageData(phase);
}

export function buildUkOfstedPageData(subject: UkSubject) {
  if (!ukSubjects.includes(subject)) {
    return null;
  }

  return buildOfstedPageData(subject);
}

export function buildUkBehaviourLetterPageData(yearGroup: UkYearGroup) {
  if (!ukYearGroups.includes(yearGroup)) {
    return null;
  }

  return buildBehaviourLetterPageData(yearGroup);
}

export function buildUkSenPageData(need: UkNeed) {
  if (!ukNeeds.includes(need)) {
    return null;
  }

  return buildSenPageData(need);
}

export function getUkClusterSitemapEntries(
  lastModified = new Date(),
): MetadataRoute.Sitemap {
  return [
    ...ukPhases.map((phase) => ({
      url: `https://zazadraft.com/uk/parents-evening-email-templates/${phase}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
    ...ukSubjects.map((subject) => ({
      url: `https://zazadraft.com/uk/ofsted-friendly-report-comments/${subject}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.84,
    })),
    ...ukYearGroups.map((yearGroup) => ({
      url: `https://zazadraft.com/uk/behaviour-letter-home/${yearGroup}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...ukNeeds.map((need) => ({
      url: `https://zazadraft.com/uk/sen-report-comments/${need}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.84,
    })),
  ];
}

export const first20UkClusterPages = [
  ...ukPhases.map((phase) => buildParentsEveningPageData(phase)),
  ...ukSubjects.map((subject) => buildOfstedPageData(subject)),
  ...ukYearGroups.map((yearGroup) => buildBehaviourLetterPageData(yearGroup)),
  ...ukNeeds.map((need) => buildSenPageData(need)),
]
  .slice(0, 20)
  .map((page) => `${page.path.replace(/^\//, "")} - ${page.title}`);

export function describeUkMirrorStrategy() {
  return titleCase(
    "mirror the route families and keep shared content logic in lib/uk-matrix.ts so a future /de/ version can reuse the same structure with translated dictionaries and region-specific compliance notes",
  );
}
