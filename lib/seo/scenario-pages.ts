import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export type ScenarioFaqItem = {
  question: string;
  answer: string;
};

export type ScenarioInternalLink = {
  href: string;
  label: string;
  description: string;
};

export type ScenarioPage = {
  slug: string;
  shortTitle: string;
  title: string;
  metaDescription: string;
  h1: string;
  problemFraming: string[];
  commonMistake: {
    title: string;
    body: string[];
  };
  saferWordingPrinciples: string[];
  beforeAfter: {
    label: string;
    before: string;
    after: string;
    whySafer: string[];
  };
  faq: ScenarioFaqItem[];
  internalLinks: ScenarioInternalLink[];
};

const commonCheckerLink: ScenarioInternalLink = {
  href: "/parent-email-risk-checker",
  label: "Use the free parent email risk checker",
  description:
    "Paste a real draft in and check whether the tone may sound sharper, colder, or more escalatory than you mean.",
};

export const scenarioPages = {
  "how-to-respond-to-an-angry-parent-email": {
    slug: "how-to-respond-to-an-angry-parent-email",
    shortTitle: "Angry Parent Email",
    title:
      "How to Respond to an Angry Parent Email | Calm Teacher Wording | Zaza Draft",
    metaDescription:
      "How to respond to an angry parent email in calm, professional UK English. See the common mistake, safer wording principles, and a before-and-after example.",
    h1: "How to respond to an angry parent email",
    problemFraming: [
      "An angry parent email usually feels urgent even when you know replying too quickly may make the tone worse.",
      "Teachers often are not struggling with the facts. They are struggling with how to reply without sounding defensive, dismissive, or equally angry.",
      "That is why these emails take so long. You are not just writing back. You are trying to stop the next message from getting even worse.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The usual mistake is trying to correct the parent too early. A rushed reply often explains, defends, and pushes back before the conversation has been steadied.",
        "That can feel satisfying for thirty seconds, but it usually gives the parent more tone to react to and less calm structure to work with.",
      ],
    },
    saferWordingPrinciples: [
      "Acknowledge the concern before you clarify the facts.",
      "Keep to what happened rather than what you think the parent is doing.",
      "Offer one next step instead of trying to solve the entire disagreement in one email.",
    ],
    beforeAfter: {
      label: "First reply",
      before:
        "I do not think your email reflects what actually happened, and I stand by the decision that was made.",
      after:
        "Thank you for getting in touch. I can see this has been frustrating, so I wanted to respond carefully and clarify what happened from my side.",
      whySafer: [
        "The calmer version lowers the temperature before it adds detail.",
        "It removes the confrontational opening that invites the parent to argue with your tone rather than your explanation.",
      ],
    },
    faq: [
      {
        question: "Should I reply straight away to an angry parent email?",
        answer:
          "Not always. If you need ten minutes to remove the heat from your first draft, that is usually time well spent. A calmer reply is often more useful than a faster one.",
      },
      {
        question: "Do I need to answer every accusation in the first reply?",
        answer:
          "Usually no. The safer first reply acknowledges the concern, gives only the clearest factual context, and sets the next step without turning into a full defence.",
      },
      {
        question: "What if the parent email feels unfair?",
        answer:
          "That is often when teachers become too corrective too early. Keep the reply factual and measured first, then decide what really needs clarifying.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-respond-to-a-rude-parent-email",
        label: "How to respond to a rude parent email",
        description:
          "Use this when the message feels more personally sharp than simply upset.",
      },
      {
        href: "/how-to-say-no-to-a-parent-politely",
        label: "How to say no to a parent politely",
        description:
          "Helpful if the angry message also contains an unrealistic request or demand.",
      },
      {
        href: "/teacher-email-tone-guide",
        label: "Teacher email tone guide",
        description:
          "A broader guide to checking whether your wording sounds defensive, abrupt, or too cold.",
      },
      commonCheckerLink,
    ],
  },
  "how-to-tell-a-parent-their-child-is-disruptive": {
    slug: "how-to-tell-a-parent-their-child-is-disruptive",
    shortTitle: "Disruptive Behaviour",
    title:
      "How to Tell a Parent Their Child Is Disruptive | Calm UK Teacher Wording | Zaza Draft",
    metaDescription:
      "How to tell a parent their child is disruptive without sounding accusatory. Includes problem framing, common mistake, safer wording principles, and example wording.",
    h1: "How to tell a parent their child is disruptive",
    problemFraming: [
      "This is difficult because the parent may hear the message as a judgement on the child or on their parenting, even when the teacher is only trying to describe what is happening in class.",
      "Teachers often sit on these emails too long because they do not want to sound harsh, but they also do not want to understate the disruption.",
      "The safest wording is specific, calm, and focused on impact rather than blame.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The usual mistake is using broad labels instead of describing what the behaviour looks like in class.",
        "Words such as disruptive, difficult, or constantly can make the message feel heavier and more personal than the facts require.",
      ],
    },
    saferWordingPrinciples: [
      "Describe the behaviour, not the child's character.",
      "Explain the impact on learning or routines without sounding dramatic.",
      "Invite support from home rather than issuing a verdict.",
    ],
    beforeAfter: {
      label: "Behaviour concern",
      before:
        "Your child has been very disruptive in lessons and it is affecting everyone else.",
      after:
        "I wanted to let you know that during lessons this week, your child has found it difficult to stay focused, which has made it harder for the class to settle and continue with the task.",
      whySafer: [
        "The calmer version replaces a loaded label with something more factual and easier for a parent to hear.",
        "It still makes the impact clear without sounding as though the child has been written off.",
      ],
    },
    faq: [
      {
        question: "Should I use the word disruptive in the email?",
        answer:
          "Usually it is safer to describe the behaviour itself. Parents often respond better to specifics than to labels.",
      },
      {
        question: "How direct should I be?",
        answer:
          "Direct enough that the parent understands the concern, but not so blunt that the tone creates a separate problem.",
      },
      {
        question: "What if this is part of a pattern, not one incident?",
        answer:
          "You can say that clearly, but keep the wording grounded in repeated classroom observations rather than broad frustration.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "How to write a behaviour email to parents",
        description:
          "A broader page for behaviour emails where you need a full structure rather than one specific phrasing problem.",
      },
      {
        href: "/how-to-write-a-calm-parent-email-after-an-incident",
        label: "How to write a calm parent email after an incident",
        description:
          "Useful when the disruption is tied to a specific classroom incident.",
      },
      {
        href: "/how-to-tell-parents-their-child-is-struggling",
        label: "How to tell parents their child is struggling",
        description:
          "Better fit if the concern is broader than behaviour alone.",
      },
      commonCheckerLink,
    ],
  },
  "how-to-reply-to-a-parent-complaint-about-grades": {
    slug: "how-to-reply-to-a-parent-complaint-about-grades",
    shortTitle: "Complaint About Grades",
    title:
      "How to Reply to a Parent Complaint About Grades | Calm UK Teacher Reply | Zaza Draft",
    metaDescription:
      "How to reply to a parent complaint about grades without sounding defensive. UK teacher wording, safer principles, and a before-and-after example.",
    h1: "How to reply to a parent complaint about grades",
    problemFraming: [
      "Grade complaints are difficult because teachers often feel pulled towards self-defence. You know the judgement was professional, but the reply still has to sound calm.",
      "Parents rarely only read the facts in these emails. They also read how open, fair, and confident the teacher sounds.",
      "A strong reply explains just enough, avoids arguing, and keeps the next step clear.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The most common mistake is writing a reply that sounds like you are proving the parent wrong rather than helping them understand the grading decision.",
        "Long explanations and phrases such as I stand by my judgement can make the tone feel more defensive than professional.",
      ],
    },
    saferWordingPrinciples: [
      "Acknowledge the concern without sounding apologetic for the grade itself.",
      "Keep the explanation factual and linked to the assessment criteria.",
      "Offer a next step that sounds open rather than combative.",
    ],
    beforeAfter: {
      label: "Reply to a grade complaint",
      before:
        "I have marked the work fairly and in line with the criteria, so I do not agree with your complaint.",
      after:
        "Thank you for getting in touch. I appreciate why you would want clarification, so I wanted to explain how the work was assessed against the criteria used for the task.",
      whySafer: [
        "The safer version removes the defensive disagreement and replaces it with calm explanation.",
        "It shows openness without undermining the teacher's professional judgement.",
      ],
    },
    faq: [
      {
        question: "Should I apologise in a grades complaint reply?",
        answer:
          "You do not need to apologise for a professional grading decision if it was made properly. It is usually enough to acknowledge the concern and explain the process calmly.",
      },
      {
        question: "How much detail should I include?",
        answer:
          "Include enough detail to make the grading basis clear, but avoid turning the email into a point-by-point argument.",
      },
      {
        question: "What is the tone risk in these emails?",
        answer:
          "The main risk is sounding defensive or dismissive, especially if the teacher feels personally challenged by the complaint.",
      },
    ],
    internalLinks: [
      {
        href: "/teacher-response-to-a-parent-complaint",
        label: "How to respond to a parent complaint professionally",
        description:
          "A broader page for complaint replies when the issue goes beyond grading.",
      },
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to respond to an angry parent email",
        description:
          "Useful when the grades complaint is emotionally loaded as well as critical.",
      },
      {
        href: "/parent-accusing-teacher-of-unfair-grading-email-reply",
        label: "Parent accusing teacher of unfair grading email reply",
        description:
          "Related wording help when the complaint is specifically about fairness.",
      },
      commonCheckerLink,
    ],
  },
  "how-to-say-no-to-a-parent-politely": {
    slug: "how-to-say-no-to-a-parent-politely",
    shortTitle: "Say No Politely",
    title:
      "How to Say No to a Parent Politely | School Email Wording in UK English | Zaza Draft",
    metaDescription:
      "How teachers can say no to a parent politely without sounding weak, abrupt, or defensive. Includes safer wording principles and example wording.",
    h1: "How to say no to a parent politely",
    problemFraming: [
      "Saying no to a parent is hard because teachers often worry the email will sound either too soft or too blunt.",
      "You need to hold a boundary, but you also need the relationship to stay workable after the email is sent.",
      "That usually means sounding clear, respectful, and calm without writing a long justification.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The usual mistake is either over-explaining the no or making it sound like a flat rejection with no context.",
        "Both approaches can backfire. One sounds defensive. The other sounds dismissive.",
      ],
    },
    saferWordingPrinciples: [
      "State the boundary clearly without sounding irritated.",
      "Give brief context, not a full defence.",
      "If possible, offer the next best option or an alternative route.",
    ],
    beforeAfter: {
      label: "Holding a boundary",
      before: "I cannot do that, and I do not think it would be appropriate.",
      after:
        "I am not able to agree to that request, but I wanted to explain the position clearly and outline the most helpful next option from here.",
      whySafer: [
        "The rewrite still says no, but it sounds more respectful and less abrupt.",
        "It keeps authority without sounding irritated or closed off.",
      ],
    },
    faq: [
      {
        question: "Can a polite no still sound firm?",
        answer:
          "Yes. A polite no is not a vague no. It is a clear boundary expressed in calmer language.",
      },
      {
        question: "Do I need to give a long explanation?",
        answer:
          "Usually not. A short explanation plus a next step is often more effective than a long defence.",
      },
      {
        question: "What if the parent keeps pushing?",
        answer:
          "That is usually a sign you need consistent wording and a calm repeat of the same boundary rather than a fresh emotional reply each time.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-respond-to-a-rude-parent-email",
        label: "How to respond to a rude parent email",
        description:
          "Relevant when the parent is not only requesting too much but doing so in a sharp tone.",
      },
      {
        href: "/how-to-respond-to-late-night-parent-emails",
        label: "How to respond to late-night parent emails",
        description:
          "Useful if the boundary you need to set is around timing and availability.",
      },
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to respond to an angry parent email",
        description:
          "Helpful if the no needs to be written into a more emotionally difficult exchange.",
      },
      commonCheckerLink,
    ],
  },
  "how-to-write-a-behaviour-email-to-parents": {
    slug: "how-to-write-a-behaviour-email-to-parents",
    shortTitle: "Behaviour Email",
    title:
      "How to Write a Behaviour Email to Parents | Calm UK Teacher Wording | Zaza Draft",
    metaDescription:
      "How to write a behaviour email to parents in calm, professional UK English. See the common mistake, safer wording principles, and a before-and-after example.",
    h1: "How to write a behaviour email to parents",
    problemFraming: [
      "Behaviour emails are difficult because teachers need to be honest about what happened without making the parent feel judged before the conversation has started.",
      "The pressure often sits in the first few lines. If they sound frustrated or accusatory, the parent may respond to the tone before they respond to the issue.",
      "A good behaviour email is factual, proportionate, and clear about the next step.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The usual mistake is writing from frustration instead of from observation. That often leads to loaded adjectives, broad claims, or language that sounds like blame.",
        "The email then creates two problems: the original behaviour issue and a tone issue on top of it.",
      ],
    },
    saferWordingPrinciples: [
      "Describe what happened rather than labelling the child.",
      "Keep the tone measured even if the behaviour felt repetitive or draining.",
      "End with support, next steps, or partnership rather than a threat.",
    ],
    beforeAfter: {
      label: "Behaviour update",
      before:
        "Your child was disruptive again today and it is becoming unacceptable.",
      after:
        "I wanted to let you know that your child found it difficult to follow instructions today, and this affected the flow of the lesson.",
      whySafer: [
        "The rewrite sounds more factual and less like a judgement.",
        "It gives the parent something clearer to respond to without lowering the seriousness of the issue.",
      ],
    },
    faq: [
      {
        question: "Should behaviour emails mention the impact on the class?",
        answer:
          "Yes, when it helps explain why the issue matters. Just keep the wording proportionate and factual rather than dramatic.",
      },
      {
        question: "Is it better to keep the email short?",
        answer:
          "Usually yes. Most behaviour emails work best when the facts are clear, the tone is calm, and the next step is easy to understand.",
      },
      {
        question: "What if this is not the first behaviour email home?",
        answer:
          "You can say that clearly, but it is still worth checking that repeated frustration has not crept into the wording.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-tell-a-parent-their-child-is-disruptive",
        label: "How to tell a parent their child is disruptive",
        description:
          "Useful if the difficulty is wording the concern without making it sound like a label.",
      },
      {
        href: "/how-to-write-a-calm-parent-email-after-an-incident",
        label: "How to write a calm parent email after an incident",
        description:
          "Better fit when the behaviour email is tied to one specific event.",
      },
      {
        href: "/how-to-explain-missing-homework-to-parents",
        label: "How to explain missing homework to parents",
        description:
          "Relevant when the classroom concern is more about repeated routines than direct behaviour.",
      },
      commonCheckerLink,
    ],
  },
  "how-to-write-a-report-comment-without-sounding-harsh": {
    slug: "how-to-write-a-report-comment-without-sounding-harsh",
    shortTitle: "Calmer Report Comment",
    title:
      "How to Write a Report Comment Without Sounding Harsh | UK Teacher Guide | Zaza Draft",
    metaDescription:
      "How to write a report comment without sounding harsh. UK teacher wording, common mistake, safer principles, and a before-and-after example.",
    h1: "How to write a report comment without sounding harsh",
    problemFraming: [
      "Report comments become hard when the teacher needs to be honest but does not want the final sentence to feel discouraging at home.",
      "The wording often goes wrong when tired teachers push for precision and end up sounding colder than they intended.",
      "A good report comment can be direct and still sound fair, balanced, and professionally kind.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The usual mistake is overcorrecting away from vague praise and landing in language that feels too blunt.",
        "Teachers often cut too much warmth and context from the sentence, which makes the comment sound harder on the page than it would in conversation.",
      ],
    },
    saferWordingPrinciples: [
      "Lead with observed learning patterns rather than a verdict on the pupil.",
      "Pair the concern with a clear next step or area for growth.",
      "Use language that sounds measured, not euphemistic and not sharp.",
    ],
    beforeAfter: {
      label: "Report wording",
      before:
        "He is capable but often careless and does not put enough effort into his work.",
      after:
        "He has shown that he is capable of strong work, and he will make better progress when he takes more time to check his work carefully and sustain his effort more consistently.",
      whySafer: [
        "The calmer version still names the issue, but it sounds more developmental and less harsh.",
        "It gives the family a clearer sense of what improvement looks like.",
      ],
    },
    faq: [
      {
        question: "Can a report comment be honest without sounding harsh?",
        answer:
          "Yes. The key is to describe the learning pattern clearly and pair it with constructive direction rather than writing the sentence as a verdict.",
      },
      {
        question: "Should I soften every concern in a report comment?",
        answer:
          "No. The aim is not vagueness. It is balanced wording that still sounds fair and professionally grounded.",
      },
      {
        question: "Why is this page linking to the free checker?",
        answer:
          "Many teachers are writing the matching parent email as well. The checker is useful when the same concern also needs calm parent-facing wording.",
      },
    ],
    internalLinks: [
      {
        href: "/report-comment-builder",
        label: "Report comment builder",
        description:
          "Use this when you want a broader report-writing workflow rather than one scenario page.",
      },
      {
        href: "/positive-but-honest-report-card-comments-for-struggling-students",
        label: "Positive but honest report card comments",
        description:
          "Helpful if you need more examples of honest report wording that still feels balanced.",
      },
      {
        href: "/how-to-tell-parents-their-child-is-struggling",
        label: "How to tell parents their child is struggling",
        description:
          "Relevant when the report comment wording may also need to turn into parent communication.",
      },
      commonCheckerLink,
    ],
  },
  "how-to-respond-to-a-rude-parent-email": {
    slug: "how-to-respond-to-a-rude-parent-email",
    shortTitle: "Rude Parent Email",
    title:
      "How to Respond to a Rude Parent Email | Calm UK Teacher Wording | Zaza Draft",
    metaDescription:
      "How to respond to a rude parent email without sounding rattled, cold, or equally rude. UK teacher wording, safer principles, and example wording.",
    h1: "How to respond to a rude parent email",
    problemFraming: [
      "Rude parent emails feel different from angry ones because the tone can feel personally sharp, dismissive, or needlessly cutting.",
      "That often makes teachers want to correct the tone or answer it line for line. The problem is that this usually creates a worse written record, not a better one.",
      "The safer move is to reply to the issue, not to the rudeness itself.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The common mistake is letting the parent's tone set the shape of the reply.",
        "That can sound clipped, wounded, or quietly sarcastic even when the teacher is trying to stay professional.",
      ],
    },
    saferWordingPrinciples: [
      "Do not mirror the parent's tone.",
      "Keep the reply focused on the concern or next step rather than on how the email felt to read.",
      "Write something you would still be comfortable seeing forwarded later.",
    ],
    beforeAfter: {
      label: "Replying to rudeness",
      before:
        "I would appreciate a more respectful tone if you would like me to continue this conversation.",
      after:
        "Thank you for your email. I wanted to reply clearly so that the concern itself can be addressed in a calm and useful way.",
      whySafer: [
        "The calmer version avoids turning the email into a dispute about tone.",
        "It protects the teacher's professionalism while keeping the focus on the actual issue.",
      ],
    },
    faq: [
      {
        question: "Should I address the rude tone directly?",
        answer:
          "Usually not in the first reply. It is often safer to respond calmly to the substance and keep the written record measured.",
      },
      {
        question: "How do I avoid sounding passive?",
        answer:
          "Calm wording is not passive wording. You can still be clear about facts, boundaries, and next steps without matching the parent's tone.",
      },
      {
        question: "What is the main risk in these emails?",
        answer:
          "The main risk is writing something that feels understandable in the moment but looks combative or brittle when read back later.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to respond to an angry parent email",
        description:
          "Better fit when the message is more upset or escalatory than rude.",
      },
      {
        href: "/how-to-say-no-to-a-parent-politely",
        label: "How to say no to a parent politely",
        description:
          "Useful if the rude email also contains a demand you need to refuse.",
      },
      {
        href: "/teacher-guide-to-sensitive-parent-emails",
        label: "Teacher guide to sensitive parent emails",
        description:
          "Broader help for parent emails where tone and professionalism matter more than speed.",
      },
      commonCheckerLink,
    ],
  },
  "how-to-write-a-calm-parent-email-after-an-incident": {
    slug: "how-to-write-a-calm-parent-email-after-an-incident",
    shortTitle: "After an Incident",
    title:
      "How to Write a Calm Parent Email After an Incident | UK Teacher Guide | Zaza Draft",
    metaDescription:
      "How to write a calm parent email after an incident. UK teacher wording, safer principles, and a before-and-after example for incident follow-up emails.",
    h1: "How to write a calm parent email after an incident",
    problemFraming: [
      "Emails after an incident are hard because the teacher is often writing while the event still feels live.",
      "That is when the first draft can carry more stress, more certainty, or more sharpness than the teacher wants attached to the record later.",
      "A calm incident email needs to explain enough, stay measured, and leave space for next steps without sounding evasive.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The common mistake is writing as though the email has to do everything at once: explain the event, show frustration, protect the teacher, and settle the issue immediately.",
        "That usually leads to wording that sounds hotter than the teacher intended.",
      ],
    },
    saferWordingPrinciples: [
      "Stick to what happened and what was done in response.",
      "Avoid writing the emotional version of the event.",
      "Keep the close focused on support or next steps rather than blame.",
    ],
    beforeAfter: {
      label: "Incident follow-up",
      before:
        "I need to let you know about a serious incident today because your child behaved completely inappropriately.",
      after:
        "I wanted to let you know about an incident that took place today and explain briefly what happened and how it was managed in school.",
      whySafer: [
        "The safer version sounds more measured and gives the parent context without starting from judgement.",
        "It is easier to stand behind later if the message becomes part of a wider record.",
      ],
    },
    faq: [
      {
        question: "Should incident emails be sent the same day?",
        answer:
          "Often yes, but it is still worth taking a moment to check the tone before sending so the wording stays calm and accurate.",
      },
      {
        question: "How much detail should I include?",
        answer:
          "Usually just enough to explain what happened, what action was taken, and what the next step is. The email does not need to carry every detail at once.",
      },
      {
        question: "Why does calm tone matter so much after an incident?",
        answer:
          "Because a message written too close to the stress of the event can easily sound more heated or more certain than the professional record should.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "How to write a behaviour email to parents",
        description:
          "Use this for the broader pattern of behaviour emails beyond one specific incident.",
      },
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to respond to an angry parent email",
        description:
          "Relevant when the incident email is likely to trigger a difficult response.",
      },
      {
        href: "/how-to-tell-a-parent-their-child-is-disruptive",
        label: "How to tell a parent their child is disruptive",
        description:
          "Helpful when the incident sits inside a wider behaviour pattern you also need to communicate.",
      },
      commonCheckerLink,
    ],
  },
  "how-to-explain-missing-homework-to-parents": {
    slug: "how-to-explain-missing-homework-to-parents",
    shortTitle: "Missing Homework",
    title:
      "How to Explain Missing Homework to Parents | Calm UK Teacher Wording | Zaza Draft",
    metaDescription:
      "How to explain missing homework to parents without sounding petty, frustrated, or accusatory. Includes safer wording principles and example wording.",
    h1: "How to explain missing homework to parents",
    problemFraming: [
      "Missing homework emails often feel smaller than they are. The issue may be routine, but repeated reminders can make the teacher sound more frustrated than the message deserves.",
      "Parents can also read these emails as criticism if the wording sounds fed up rather than informative.",
      "The safest approach is usually calm, specific, and collaborative.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The usual mistake is letting repetition show up in the wording. After the third or fourth reminder, even a short email can sound worn out.",
        "That turns a routine communication into a tone problem.",
      ],
    },
    saferWordingPrinciples: [
      "Be specific about what is missing and since when.",
      "Avoid phrases that sound like blame or exasperation.",
      "Keep the email focused on getting back on track rather than on scoring the point.",
    ],
    beforeAfter: {
      label: "Homework follow-up",
      before:
        "I have reminded your child several times and the homework is still missing.",
      after:
        "I wanted to let you know that the homework set for this week has still not been handed in, despite a few reminders in school.",
      whySafer: [
        "The calmer version still shows that reminders have happened, but it sounds less irritated.",
        "It keeps the message practical and easier for the parent to act on.",
      ],
    },
    faq: [
      {
        question: "How direct should a missing homework email be?",
        answer:
          "Direct enough that the parent understands the pattern, but calm enough that the tone does not become the main issue.",
      },
      {
        question: "Should I mention repeated reminders?",
        answer:
          "Yes, if it matters to the context, but it is best phrased neutrally rather than as evidence of frustration.",
      },
      {
        question: "What if homework has been missing more than once?",
        answer:
          "You can say that clearly and still keep the wording measured. The key is not to let repetition harden the tone unnecessarily.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "How to write a behaviour email to parents",
        description:
          "Helpful when the homework issue sits alongside wider classroom behaviour or routines.",
      },
      {
        href: "/how-to-tell-parents-their-child-is-struggling",
        label: "How to tell parents their child is struggling",
        description:
          "Relevant if missing homework is part of a bigger pattern around progress or engagement.",
      },
      {
        href: "/teacher-email-template-for-parent-concerns",
        label: "Teacher email template for parent concerns",
        description:
          "Use this for broader structure when the issue is not only homework.",
      },
      commonCheckerLink,
    ],
  },
  "how-to-tell-parents-their-child-is-struggling": {
    slug: "how-to-tell-parents-their-child-is-struggling",
    shortTitle: "Child Is Struggling",
    title:
      "How to Tell Parents Their Child Is Struggling | Calm UK Teacher Wording | Zaza Draft",
    metaDescription:
      "How to tell parents their child is struggling without sounding alarmist or harsh. Includes safer wording principles and example wording in UK English.",
    h1: "How to tell parents their child is struggling",
    problemFraming: [
      "This is difficult because the teacher is trying to be honest early enough to help, but not so heavy-handed that the email feels discouraging or alarming.",
      "Many teachers delay these messages because they want to get the tone exactly right. They do not want to sound as if they are giving up on the child.",
      "The safest wording is clear about the concern, grounded in observation, and still open to support and progress.",
    ],
    commonMistake: {
      title: "The common mistake",
      body: [
        "The common mistake is writing as though the teacher needs to summarise the entire concern in one line.",
        "That often produces wording that feels broad, stark, or heavier than the situation really requires.",
      ],
    },
    saferWordingPrinciples: [
      "Be specific about the area of difficulty.",
      "Use current observations rather than fixed labels.",
      "Pair the concern with support, next steps, or what will help improvement.",
    ],
    beforeAfter: {
      label: "Progress concern",
      before:
        "I am concerned that your child is struggling and not keeping up.",
      after:
        "I wanted to share that your child is currently finding parts of this topic difficult, particularly when working independently, and I thought it would be helpful to update you now so we can support progress early.",
      whySafer: [
        "The calmer version sounds more specific and less final.",
        "It frames the issue as something being supported, not as a verdict on the child.",
      ],
    },
    faq: [
      {
        question: "How early should I tell parents a child is struggling?",
        answer:
          "Usually earlier than feels comfortable. Early, calm communication is often easier for families to hear than a later message written after frustration has built up.",
      },
      {
        question: "How do I avoid sounding alarmist?",
        answer:
          "Stay close to the specific area of difficulty, avoid broad labels, and explain what support is already happening or what will happen next.",
      },
      {
        question: "Should the email sound hopeful as well as honest?",
        answer:
          "Yes. Honest does not have to mean bleak. Most parents respond better when the message includes both a clear concern and a constructive path forward.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-write-a-report-comment-without-sounding-harsh",
        label: "How to write a report comment without sounding harsh",
        description:
          "Useful when the same concern also needs to be written up in report language.",
      },
      {
        href: "/how-to-explain-missing-homework-to-parents",
        label: "How to explain missing homework to parents",
        description:
          "Relevant when the struggle is showing up in routines and incomplete work.",
      },
      {
        href: "/how-to-tell-a-parent-their-child-is-disruptive",
        label: "How to tell a parent their child is disruptive",
        description:
          "Useful if the challenge is more behavioural than academic.",
      },
      commonCheckerLink,
    ],
  },
} satisfies Record<string, ScenarioPage>;

export type ScenarioPageSlug = keyof typeof scenarioPages;

export const scenarioPageSlugs = Object.keys(
  scenarioPages,
) as ScenarioPageSlug[];

export function getScenarioPage(slug: string) {
  return scenarioPages[slug as ScenarioPageSlug];
}

export function getScenarioPageOrThrow(slug: string) {
  const page = getScenarioPage(slug);

  if (!page) {
    throw new Error(`Unknown scenario page: ${slug}`);
  }

  return page;
}

export function buildScenarioPageMetadata(page: ScenarioPage): Metadata {
  return buildPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/${page.slug}`,
    type: "article",
    keywords: [
      page.h1,
      "teacher parent communication",
      "parent email checker",
      "teacher email tone",
      "Zaza Draft",
    ],
  });
}
