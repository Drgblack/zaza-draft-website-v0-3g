import type { TeacherWritingPage } from "@/lib/seo/teacher-writing-pages";

const ukTrustBlockTitle =
  "Trusted by UK teachers - GDPR compliant, built for British schools";
const ukResourcesHref = "/uk/teacher-communication-resources";

export type RegionalTeacherWritingRegion = "uk" | "england";

export const regionalTeacherWritingPages = {
  uk: {
    "how-to-reply-to-angry-parent-email": {
      slug: "how-to-reply-to-angry-parent-email",
      shortTitle: "UK Angry Parent Reply",
      keyword: "how to reply to angry parent email uk teacher",
      intent: "How-to/problem intent",
      title: "How to Reply to an Angry Parent Email in the UK | Zaza Draft",
      metaDescription:
        "How to reply to an angry parent email in the UK with calm, professional wording that protects the relationship and still works for school records.",
      h1: "How to Reply to an Angry Parent Email in the UK",
      description:
        "UK-focused guidance for teachers who need calmer wording for difficult parent emails.",
      ogImage: "/difficult-conversation.jpg",
      heroEyebrow: "UK how-to",
      heroDescription: [
        "How to reply to an angry parent email in the UK becomes a real search the moment you open what should have been a quick reply and find a long message full of accusations instead. You still need to sound professional, but now you also need wording that will hold up with your head of year, parents' evening follow-up, or school contact log.",
        "This page gives UK teachers a calmer reply structure that lowers the temperature, keeps boundaries clear, and still leaves the teacher in control of every final word.",
      ],
      heroBullets: [
        "Use calmer wording for difficult parent emails",
        "Keep the tone suitable for school records",
        "Stay factual without sounding defensive",
      ],
      featuredSnippet:
        "To reply to an angry parent email in the UK, pause before answering, acknowledge the concern briefly, stick to the clearest facts, avoid defensive wording, and end with a proportionate next step such as a call, meeting, or follow-up through school channels.",
      sections: [
        {
          id: "uk-context",
          title: "Why this feels high-risk in UK schools",
          body: [
            "In many UK schools, a difficult parent email does not stay inside the inbox. It can feed into parents' evening conversations, contact logs, pastoral follow-up, and senior-leader awareness. That makes the wording matter more than teachers want it to at the end of a long day.",
            "The real goal is not to win the exchange. It is to keep the relationship workable, show professional judgement, and avoid creating a message you regret when it gets read again tomorrow.",
          ],
        },
        {
          id: "uk-structure",
          title:
            "How to reply to an angry parent email in the UK without escalating",
          body: [
            "A steadier structure is simple. Acknowledge the concern. Clarify the key fact or point of process. Offer the next step. Stop there. You do not need to rebut every sentence in a heated email to sound competent.",
            "This is especially useful in English school contexts where a written reply may later sit alongside pastoral records, tutor communication, or line-management follow-up.",
          ],
          exampleLabel: "UK-style reply example",
          exampleBody:
            "Thank you for your email. I can see you are concerned about what happened. To clarify, the matter was addressed in school today and I am happy to discuss the next steps further if helpful. Please let me know if you would prefer a call.",
        },
        {
          id: "when-to-escalate",
          title: "When to move the issue beyond email",
          body: [
            "If the parent is repeating accusations, challenging policy rather than seeking clarity, or the situation is becoming too emotionally loaded, email may no longer be the best channel. At that point a call, head of year involvement, pastoral lead, or agreed meeting may be more proportionate.",
            "The email can still do one useful job: confirm that the next step will happen through the right school channel rather than continuing the argument in writing.",
          ],
        },
        {
          id: "record-ready",
          title: "Why calm wording also helps with school records",
          body: [
            "A reply written for a UK school context should be readable by the parent and defensible if later reviewed by line managers or added to a contact record. That means factual tone, proportionate language, and no sarcasm or speculation.",
            "Teachers often save time later when the first reply is cleaner, because they do not have to explain or soften it in follow-up notes.",
          ],
        },
      ],
      trustBlock: {
        title: ukTrustBlockTitle,
        items: [
          {
            title: "UK school context",
            body: "Useful when the reply may feed into parents' evening, contact logs, or senior-leader follow-up.",
          },
          {
            title: "Lower-risk wording",
            body: "Designed to stay calm, factual, and professionally appropriate when the parent is not calm.",
          },
          {
            title: "Teacher control",
            body: "You still decide the facts, the emphasis, and the final version that gets sent.",
          },
        ],
      },
      faq: [
        {
          question: "Should I reply straight away to an angry parent email?",
          answer:
            "Usually not. A short pause can help you avoid reactive wording and make a calmer, more professional reply easier to send.",
        },
        {
          question: "Should I copy in a head of year immediately?",
          answer:
            "Not always. If the issue is still manageable, a calm reply may be enough. If the tone or content is escalating, involving the right colleague can be sensible.",
        },
        {
          question: "How do I keep the email suitable for school records?",
          answer:
            "Stick to facts, avoid emotionally loaded phrasing, and end with a clear next step you would still be comfortable seeing quoted later.",
        },
        {
          question: "Can this help after parents' evening too?",
          answer:
            "Yes. Many difficult parent emails in UK schools come after meetings, report conversations, or behaviour follow-up.",
        },
        {
          question: "Can Zaza Draft help me phrase this more calmly?",
          answer:
            "Yes. Zaza Draft is built to help teachers draft calmer, school-ready wording for parent communication while keeping the teacher fully in control.",
        },
      ],
      internalLinks: [
        {
          href: "/teacher-parent-communication-hub",
          label: "Teacher Parent Communication Hub",
          description:
            "Use the hub if this email is part of a wider parent-communication problem rather than a one-off reply.",
        },
        {
          href: "/how-to-reply-to-an-angry-parent-email",
          label: "How to Reply to an Angry Parent Email",
          description:
            "Read the non-regional version for the broader parent-email framework.",
        },
        {
          href: "/how-to-document-parent-contact-without-losing-your-mind",
          label: "How to Document Parent Contact Without Losing Your Mind",
          description:
            "Go here if the email also needs to feed into a cleaner school record.",
        },
        {
          href: "/uk/parents-evening-email-templates",
          label: "UK Parents' Evening Email Template",
          description:
            "Use this if the issue sits closer to parents' evening wording or follow-up.",
        },
      ],
      relatedSlugs: [
        "how-to-reply-to-an-angry-parent-email",
        "how-to-respond-to-an-angry-parent-email",
        "how-to-respond-to-parent-complaint-about-grades",
        "teacher-parent-communication-hub",
        "parents-evening-follow-up-email-template",
        "how-to-document-parent-contact-without-losing-your-mind",
      ],
      structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
      testimonials: [
        {
          quotePrompt:
            "Placeholder testimonial about using the UK page for calmer angry-parent replies.",
          attributionPrompt:
            "Replace with a verified quote from a UK classroom teacher or head of year.",
        },
        {
          quotePrompt:
            "Placeholder testimonial about sounding more measured in a difficult parent exchange.",
          attributionPrompt:
            "Replace with a verified quote from a UK teacher or pastoral lead.",
        },
      ],
      cta: {
        title: "Draft your next difficult reply more calmly",
        body: "Try Zaza Draft if you want a teacher-first co-writer for angry parent replies, contact-log follow-up, and other high-pressure school writing tasks.",
        primaryLabel: "Try Zaza Draft",
        primaryHref: "/early-access",
        secondaryLabel: "See how it works",
        secondaryHref: "/products/draft",
      },
    },
    "parents-evening-email-templates": {
      slug: "parents-evening-email-templates",
      shortTitle: "UK Parents' Evening Template",
      keyword: "parents evening email template uk teachers",
      intent: "Template intent",
      title: "Parents' Evening Email Templates for UK Teachers | Zaza Draft",
      metaDescription:
        "Parents' evening email templates for UK teachers with calm wording for invitations, reminders, follow-up, and difficult post-meeting emails.",
      h1: "Parents' Evening Email Templates for UK Teachers",
      description:
        "UK-focused parents' evening email help for invitations, reminders, and follow-up after difficult meetings.",
      ogImage: "/parent-teacher-communication-templates.jpg",
      heroEyebrow: "UK template",
      heroDescription: [
        "Parents' evening email template for UK teachers is the sort of search that happens when it is 10pm, the meeting slots are nearly ready, and you still have invitations, reminders, or one difficult follow-up to write. You do not need generic event copy. You need wording that sounds calm, clear, and school-appropriate.",
        "This page gives UK teachers a steadier structure for parents' evening emails, including what to say before the meeting and what to send after a conversation that felt awkward or tense.",
      ],
      heroBullets: [
        "Write invitations, reminders, and follow-up emails",
        "Use a clear UK school tone",
        "Keep wording measured even after difficult meetings",
      ],
      featuredSnippet:
        "A useful parents' evening email for UK teachers should confirm the purpose of the meeting, keep practical details brief, use calm professional language, and make any follow-up action clear without turning the email into a transcript.",
      sections: [
        {
          id: "why-these-emails-drag",
          title: "Why parents' evening emails take longer than they look",
          body: [
            "Teachers often think the invitation will be simple, but the difficulty is usually in the tone. You need to sound organised and welcoming while also leaving room for more delicate conversations where needed.",
            "That gets harder when parents' evening prep is happening late, alongside reports, planning, and all the normal after-school admin.",
          ],
        },
        {
          id: "template-types",
          title: "Parents' evening email template for UK teachers by situation",
          body: [
            "The three most useful templates are usually the invitation, the reminder, and the follow-up. Each one does a slightly different job, and trying to use the same wording for all three usually creates more editing than it saves.",
            "Keeping each email brief and specific usually works better than trying to sound overly polished or overly warm.",
          ],
          bullets: [
            "Invitation with date, format, and purpose",
            "Reminder with practical details only",
            "Follow-up that confirms the next step after the meeting",
          ],
          exampleLabel: "Parents' evening invitation example",
          exampleBody:
            "Dear [Parent/Carer],\n\nI am writing to invite you to our parents' evening on [date]. This will be an opportunity to discuss [student]'s progress and any next steps for the term ahead. Please let us know your preferred time from the available options.\n\nKind regards,\n[Name]",
        },
        {
          id: "after-difficult-meeting",
          title: "What to say after a difficult parents' evening conversation",
          body: [
            "If the discussion felt awkward, it is usually better to keep the follow-up measured and short. Thank them for meeting, confirm the main point discussed, and set out the next step. That is enough.",
            "Teachers often create extra work by trying to rewrite the whole conversation. A more proportionate summary is easier to stand behind and easier for parents to read clearly.",
          ],
        },
        {
          id: "uk-school-tone",
          title:
            "How to keep the tone professional and recognisably school-ready",
          body: [
            "In UK school contexts, the safest wording tends to be clear, courteous, and proportionate. It should feel respectful without becoming woolly and professional without sounding cold.",
            "That matters because these emails can quickly become part of a wider chain of parent communication and follow-up.",
          ],
        },
      ],
      trustBlock: {
        title: ukTrustBlockTitle,
        items: [
          {
            title: "UK school context",
            body: "Useful for British school language, practical meeting details, and follow-up that feels familiar rather than generic.",
          },
          {
            title: "Calmer follow-up",
            body: "Designed to help when the wording matters as much as the logistics.",
          },
          {
            title: "Teacher control",
            body: "You adapt every template to the student, family, and meeting outcome before anything goes out.",
          },
        ],
      },
      faq: [
        {
          question: "Should parents' evening emails be formal or warm?",
          answer:
            "Usually a mixture of both. The tone should be courteous and clear, but still feel human enough to support a workable relationship.",
        },
        {
          question: "Do I need a follow-up email after every meeting?",
          answer:
            "Not every time. They are most useful when the conversation was difficult, where actions were agreed, or where you want a clearer written summary.",
        },
        {
          question: "How much detail should I include in the follow-up?",
          answer:
            "Usually less than you think. A brief summary and the next step are often enough.",
        },
        {
          question: "Can I use the same template across a whole class?",
          answer:
            "You can reuse the structure, but the final wording should still be tailored to the family and situation.",
        },
        {
          question:
            "Can Zaza Draft help me turn rough notes into a more professional email?",
          answer:
            "Yes. Zaza Draft is built to help teachers turn rough parents' evening notes into calmer, more school-ready wording while they keep the final say.",
        },
      ],
      internalLinks: [
        {
          href: "/parents-evening-follow-up-email-template",
          label: "Parents' Evening Follow-Up Email Template",
          description:
            "Use the broader page if you want the follow-up framework without the UK-specific angle.",
        },
        {
          href: "/difficult-conversation-with-parents-script-email",
          label: "Difficult Conversation With Parents Script Email",
          description:
            "Go here if you need help before the meeting as well as after it.",
        },
        {
          href: "/teacher-guide-to-sensitive-parent-emails",
          label: "Teacher Guide to Sensitive Parent Emails",
          description:
            "Use this when the real issue is the emotional weight of the message rather than the event itself.",
        },
      ],
      relatedSlugs: [
        "parents-evening-follow-up-email-template",
        "difficult-conversation-with-parents-script-email",
        "parent-email-template-for-teachers",
        "teacher-guide-to-sensitive-parent-emails",
        "pastoral-email-to-parents-template",
        "teacher-parent-communication-hub",
      ],
      structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
      testimonials: [
        {
          quotePrompt:
            "Placeholder testimonial about using the UK parents' evening templates for invitations and follow-up.",
          attributionPrompt:
            "Replace with a verified quote from a UK class teacher.",
        },
        {
          quotePrompt:
            "Placeholder testimonial about sounding calmer after a difficult parents' evening conversation.",
          attributionPrompt:
            "Replace with a verified quote from a UK head of year or subject teacher.",
        },
      ],
      cta: {
        title: "Turn your next parents' evening email into a calmer draft",
        body: "Try Zaza Draft if you want teacher-first help with parents' evening invitations, reminders, and follow-up that still sounds like you.",
        primaryLabel: "Try Zaza Draft",
        primaryHref: "/early-access",
        secondaryLabel: "See how it works",
        secondaryHref: "/products/draft",
      },
    },
    "ofsted-friendly-report-comments": {
      slug: "ofsted-friendly-report-comments",
      shortTitle: "Ofsted-Friendly Comments",
      keyword: "ofsted friendly report comments",
      intent: "Template intent",
      title: "Ofsted-Friendly Report Comments for UK Teachers | Zaza Draft",
      metaDescription:
        "Ofsted-friendly report comments for UK teachers with balanced, evidence-based wording for progress, attainment, behaviour, confidence, and next steps.",
      h1: "Ofsted-Friendly Report Comments for UK Teachers",
      description:
        "UK-focused report-comment guidance for teachers who want clearer, more evidence-based school wording.",
      ogImage: "/report-card-grades.jpg",
      heroEyebrow: "UK template",
      heroDescription: [
        "Ofsted friendly report comments is a very teacher-shaped search. Usually what teachers mean is not writing for inspection itself. They mean comments that sound clear, evidence-based, proportionate, and school-ready enough that they can be defended later without sounding harsh.",
        "This page helps UK teachers find that balance for report season, especially when they are tired, under pressure, and trying to avoid vague or flimsy wording.",
      ],
      heroBullets: [
        "Use clearer, more evidence-based wording",
        "Avoid vague praise and blunt judgement",
        "Keep comments balanced and professionally defensible",
      ],
      featuredSnippet:
        "Ofsted-friendly report comments are usually clear, specific, and proportionate. They describe current attainment, progress, effort, or behaviour in evidence-based language and make the next step visible without overstating either concern or praise.",
      sections: [
        {
          id: "what-teachers-mean",
          title:
            "What teachers usually mean by Ofsted-friendly report comments",
          body: [
            "Most teachers are not asking for inspection jargon. They are usually looking for wording that sounds robust, measured, and rooted in what is actually happening in school.",
            "That means comments that are specific enough to be useful and careful enough to still feel fair when parents or leaders read them closely.",
          ],
        },
        {
          id: "better-language",
          title:
            "Ofsted-friendly report comments for UK teachers should sound evidence-based",
          body: [
            "The clearest comments usually describe what the pupil is doing now, the pattern or support context around that, and the next step. They avoid inflated praise, fixed labels, and overconfident claims.",
            "That is particularly useful for pupils whose progress is mixed or whose effort and confidence vary across the term.",
          ],
          exampleLabel: "Balanced UK report example",
          exampleBody:
            "[Student] has made steady progress in this subject and is beginning to apply taught strategies with greater consistency. At times, [student] still benefits from additional guidance when tasks are unfamiliar, and the next step is to build confidence in working more independently.",
        },
        {
          id: "where-teachers-slip",
          title: "What weakens a comment",
          body: [
            "Comments become less useful when they rely on broad praise, repeated stock phrases, or language that sounds more certain than the evidence behind it. They also become risky when the tone turns too blunt or overly negative.",
            "Measured wording is often easier to stand behind later, whether the follow-up is with parents, line managers, or another teacher.",
          ],
        },
        {
          id: "why-zaza-helps",
          title:
            "How Zaza helps with the wording without replacing your judgement",
          body: [
            "Zaza Draft is useful when you know the pupil and the evidence but want help shaping the comment so it sounds clearer and more professionally judged. It is there to support the draft, not to take over the evaluation.",
            "That can be especially helpful when report season collides with everything else and the comments that matter most are also the ones that take longest.",
          ],
        },
      ],
      trustBlock: {
        title: ukTrustBlockTitle,
        items: [
          {
            title: "Evidence-based tone",
            body: "Designed for report comments that sound measured and school-ready rather than over-polished or vague.",
          },
          {
            title: "Balanced examples",
            body: "Useful for effort, attainment, confidence, behaviour, and next steps where nuance matters.",
          },
          {
            title: "Teacher judgement preserved",
            body: "You still choose the evidence and the final wording before any report comment is used.",
          },
        ],
      },
      faq: [
        {
          question: "Do Ofsted-friendly comments need inspection language?",
          answer:
            "Not usually. Teachers usually mean clear, evidence-based wording that feels professionally sound rather than comments that mimic inspection language.",
        },
        {
          question: "How do I sound evidence-based without sounding cold?",
          answer:
            "Describe what the pupil is doing now, note the support or pattern where relevant, and make the next step clear. That is often enough.",
        },
        {
          question:
            "Can this help with pupils who are below expected standard?",
          answer:
            "Yes. In those cases careful wording matters even more, because the comment needs to stay honest, specific, and proportionate.",
        },
        {
          question: "Why do these comments matter beyond report season?",
          answer:
            "Because report wording often shapes later parent conversations, internal follow-up, and expectations for the next term or teacher.",
        },
        {
          question:
            "Can Zaza Draft help me produce more balanced UK report comments?",
          answer:
            "Yes. Zaza Draft is built to help teachers shape calmer, clearer report wording while keeping the final professional judgement with the teacher.",
        },
      ],
      internalLinks: [
        {
          href: "/report-comment-generator-for-teachers",
          label: "Report Comment Generator for Teachers",
          description:
            "Use the main report-generator page if you want the broader workflow behind these examples.",
        },
        {
          href: "/year-6-report-comments-examples",
          label: "Year 6 Report Comments Examples",
          description:
            "Go here for a Year 6-specific version of balanced UK report wording.",
        },
        {
          href: "/sen-report-comments-examples",
          label: "SEN Report Comments Examples",
          description:
            "Use this when the challenge is finding more respectful language around support and progress.",
        },
      ],
      relatedSlugs: [
        "report-comment-generator-for-teachers",
        "positive-but-honest-report-card-comments-for-struggling-students",
        "report-comments-for-struggling-students",
        "year-6-report-comments-examples",
        "sen-report-comments-examples",
        "teacher-parent-communication-hub",
      ],
      structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
      testimonials: [
        {
          quotePrompt:
            "Placeholder testimonial about using this page for more evidence-based UK report wording.",
          attributionPrompt:
            "Replace with a verified quote from a UK teacher or assistant head.",
        },
        {
          quotePrompt:
            "Placeholder testimonial about avoiding vague report comments during a busy term.",
          attributionPrompt:
            "Replace with a verified quote from a UK primary or secondary teacher.",
        },
      ],
      cta: {
        title: "Draft clearer, more defensible report comments",
        body: "Try Zaza Draft if you want teacher-first help with balanced, school-ready report wording that still stays under your control.",
        primaryLabel: "Try Zaza Draft",
        primaryHref: "/early-access",
        secondaryLabel: "See report-writing support",
        secondaryHref: "/ai-for-student-reports",
      },
    },
    "behaviour-letter-home-primary-school": {
      slug: "behaviour-letter-home-primary-school",
      shortTitle: "Primary Behaviour Letter Home",
      keyword: "behaviour letter home primary school uk",
      intent: "Template intent",
      title: "Behaviour Letter Home for UK Primary Schools | Zaza Draft",
      metaDescription:
        "Behaviour letter home for UK primary schools with calm wording for teachers who need to explain behaviour concerns clearly, professionally, and without escalation.",
      h1: "Behaviour Letter Home for UK Primary Schools",
      description:
        "UK-focused help for primary teachers writing behaviour letters home with a calmer tone and clearer next steps.",
      ogImage: "/positive-behavior.jpg",
      heroEyebrow: "UK primary template",
      heroDescription: [
        "Behaviour letter home primary school is the kind of search teachers make when the issue is already emotionally loaded and the wording still has to be right. In a UK primary setting, the message needs to sound calm, proportionate, and clear enough for parents, SLT, and any behaviour record that may follow.",
        "This page helps teachers write behaviour letters home that explain the concern, keep the pupil at the centre, and make the next step visible without turning the letter into a reprimand. Zaza Draft supports the wording, but the teacher still edits and approves every line.",
      ],
      heroBullets: [
        "Use clear, school-ready behaviour wording",
        "Keep the tone appropriate for primary parents and carers",
        "Make the next step visible without sounding harsh",
      ],
      featuredSnippet:
        "A useful behaviour letter home for a UK primary school should describe the behaviour factually, explain its impact on learning or routines, note what was already addressed in school, and set out a clear next step for support.",
      sections: [
        {
          id: "why-primary-tone-matters",
          title: "Why tone matters so much in primary behaviour letters",
          body: [
            "Primary school behaviour communication often carries more relational weight because the home-school link is so immediate. One overly sharp phrase can make a parent defensive before the actual issue has even been understood.",
            "That is why the strongest behaviour letters home are calm, factual, and centred on support and next steps rather than adult frustration.",
          ],
        },
        {
          id: "what-to-include",
          title: "What to include in a behaviour letter home",
          body: [
            "The most useful letter usually covers the behaviour concern, the impact in school, what staff did at the time, and what needs to happen next. It should be brief enough to read clearly and formal enough to stand behind later.",
            "This is especially helpful for repeated low-level disruption, unkind behaviour, and patterns that need parent awareness before they become more serious.",
          ],
          bullets: [
            "Observable behaviour rather than labels",
            "Impact on learning, safety, or class routines",
            "A proportionate next step involving home and school",
          ],
        },
        {
          id: "what-to-avoid",
          title: "What weakens a primary behaviour letter",
          body: [
            "Sweeping claims, blame-heavy wording, or emotional detail usually make the message harder to receive. Behaviour letters are strongest when they stay specific and proportionate.",
            "That matters when the same wording may later be referenced by SLT, the SENCO, or pastoral staff.",
          ],
        },
        {
          id: "how-zaza-helps",
          title: "How Zaza Draft helps with behaviour wording",
          body: [
            "Zaza Draft can help turn rough notes into a calmer, more school-ready behaviour letter home. It is useful when you know what happened but do not want tired wording to make the situation worse.",
            "Teachers still decide the facts, the seriousness, and the final message. Zaza simply helps shape the draft into language that feels more professional and easier to send.",
          ],
        },
      ],
      trustBlock: {
        title: ukTrustBlockTitle,
        items: [
          {
            title: "Built for British school tone",
            body: "Useful for primary behaviour communication that may also be read by SLT or kept on school records.",
          },
          {
            title: "Safer wording",
            body: "Designed to keep the language proportionate, factual, and less likely to escalate the home-school relationship.",
          },
          {
            title: "Teacher control",
            body: "You still review, edit, and approve the final letter before anything is sent home.",
          },
        ],
      },
      faq: [
        {
          question:
            "Should a behaviour letter home sound formal in primary school?",
          answer:
            "It should sound professional and calm, but not cold. A clear school tone usually lands better than stiff or overly legal language.",
        },
        {
          question:
            "What if the behaviour issue is repeated but still low-level?",
          answer:
            "That is often the right time to communicate early. A measured letter home can help before the pattern becomes harder to shift.",
        },
        {
          question: "Should I mention what happened in class that day?",
          answer:
            "Yes, briefly. Keep it factual and proportionate rather than retelling the whole incident in detail.",
        },
        {
          question: "Can this wording also work for a record seen by SLT?",
          answer:
            "Yes. Short factual language is usually easier to stand behind if the letter is later reviewed by senior staff.",
        },
        {
          question: "Can Zaza Draft help me phrase the letter more calmly?",
          answer:
            "Yes. Zaza Draft is built for teacher writing where tone matters, including behaviour letters home and sensitive parent communication.",
        },
      ],
      internalLinks: [
        {
          href: ukResourcesHref,
          label: "UK Teacher Communication Resources",
          description:
            "Use the UK hub to explore related pages on parent communication, Ofsted-friendly wording, and report comments.",
        },
        {
          href: "/how-to-write-a-behaviour-email-to-parents",
          label: "How to Write a Behaviour Email to Parents",
          description:
            "Go here for the broader behaviour-email framework outside the UK-primary angle.",
        },
        {
          href: "/parent-email-about-student-behaviour",
          label: "Parent Email About Student Behaviour",
          description:
            "Use this when the issue is less about a letter home and more about a quick parent update.",
        },
      ],
      relatedSlugs: [
        "how-to-write-a-behaviour-email-to-parents",
        "parent-email-about-student-behaviour",
        "parent-wont-respond-to-behaviour-email",
        "how-to-document-parent-contact-without-losing-your-mind",
        "teacher-guide-to-sensitive-parent-emails",
        "teacher-parent-communication-hub",
      ],
      structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
      testimonials: [
        {
          quotePrompt:
            "Placeholder testimonial about turning a rough primary behaviour note into a calmer letter home.",
          attributionPrompt:
            "Replace with a verified quote from a UK primary teacher or phase lead.",
        },
        {
          quotePrompt:
            "Placeholder testimonial about writing behaviour letters that feel clearer and less inflammatory.",
          attributionPrompt:
            "Replace with a verified quote from a UK primary pastoral or SLT colleague.",
        },
      ],
      cta: {
        title: "Draft your next behaviour letter home more calmly",
        body: "Try Zaza Draft if you want teacher-first help with behaviour letters, parent emails, and school writing where wording matters.",
        primaryLabel: "Try Zaza Draft",
        primaryHref: "/early-access",
        secondaryLabel: "See how it works",
        secondaryHref: "/products/draft",
      },
    },
    "gdpr-safe-ai-for-teachers": {
      slug: "gdpr-safe-ai-for-teachers",
      shortTitle: "GDPR-Safe AI for Teachers",
      keyword: "GDPR safe AI for teachers UK",
      intent: "Tool intent",
      title: "GDPR-Safe AI for Teachers in the UK | Zaza Draft",
      metaDescription:
        "GDPR-safe AI for teachers in the UK with calmer guidance on parent emails, report comments, and school writing where data sensitivity matters.",
      h1: "GDPR-Safe AI for Teachers in the UK",
      description:
        "UK-focused guidance on safer AI writing workflows for teachers who need professional caution as well as time savings.",
      ogImage: "/teacher-working-efficiently.jpg",
      heroEyebrow: "UK tool intent",
      heroDescription: [
        "Teachers searching for GDPR safe AI for teachers in the UK are usually trying to answer a practical question rather than a technical one: how do we use AI to save time without creating new data or professionalism risks? That matters most in parent communication, report comments, behaviour follow-up, and anything that touches pupil records.",
        "This page explains what safer AI use should look like in British schools. Zaza Draft is built as a teacher-first co-writer for those writing tasks. It helps with calmer wording, but teachers still decide what data is appropriate, review the draft, and approve every final word.",
      ],
      heroBullets: [
        "Support cautious school writing workflows",
        "Keep drafting help focused on teacher communication",
        "Protect review and approval by the teacher",
      ],
      featuredSnippet:
        "GDPR-safe AI for teachers in the UK should support minimal-data drafting, calmer professional wording, and full teacher review before anything is used in school communication.",
      sections: [
        {
          id: "why-uk-schools-ask-this",
          title: "Why UK schools ask the GDPR question first",
          body: [
            "School writing often involves sensitive context, pupil progress, and parent communication that can quickly move into records, follow-up, or leadership oversight. That is why AI cannot be treated like a generic consumer writing tool.",
            "Teachers need clear workflows that reduce workload without encouraging careless handling of school information or unreviewed output.",
          ],
        },
        {
          id: "what-safer-ai-looks-like",
          title: "What safer AI use should look like in British schools",
          body: [
            "The safest setup keeps the input minimal, uses AI for wording support rather than decision-making, and makes teacher review non-negotiable. That is especially important for report comments, parent emails, and behaviour communication.",
            "A calmer workflow is not about handing over judgement. It is about reducing the friction of drafting while keeping responsibility with the teacher and the school.",
          ],
          bullets: [
            "Minimal input rather than unnecessary detail",
            "Output reviewed and edited by the teacher",
            "Focused use cases where professional tone matters",
          ],
        },
        {
          id: "why-specialist-tools-help",
          title: "Why a specialist tool can feel safer than a broad AI writer",
          body: [
            "Generic AI is broader. Zaza Draft is more focused. That matters in schools because the highest-value use cases are not marketing copy or brainstorming. They are parent communication, report wording, and other sensitive writing where tone and restraint matter.",
            "A focused product is easier to evaluate against school expectations than a tool trying to do everything at once.",
          ],
        },
      ],
      trustBlock: {
        title: ukTrustBlockTitle,
        items: [
          {
            title: "Built for British schools",
            body: "Designed around parent communication, report comments, and school writing where cautious workflow matters.",
          },
          {
            title: "Lower-risk drafting support",
            body: "Useful when the goal is calmer wording and less repetition, not autonomous decision-making.",
          },
          {
            title: "Teacher-approved output",
            body: "Every draft remains reviewable, editable, and under teacher control before it is used.",
          },
        ],
      },
      faq: [
        {
          question: "What does GDPR-safe AI mean for teachers in practice?",
          answer:
            "In practice it means cautious workflows, minimal data use, focused drafting support, and full teacher review before any wording is used.",
        },
        {
          question:
            "Why is this especially important for parent emails and reports?",
          answer:
            "Because those messages can involve pupil information, professional records, and wording that may later be revisited by parents or leaders.",
        },
        {
          question: "Is Zaza Draft a generic AI writer?",
          answer:
            "No. It is a specialised teacher-first co-writer built for parent communication, report comments, and other school writing tasks where tone matters.",
        },
        {
          question: "Do teachers still have to review everything?",
          answer:
            "Yes. Teachers stay in control, edit the draft, and approve every final word before anything is used.",
        },
        {
          question:
            "Can this be useful for SLT conversations about AI policy too?",
          answer:
            "Yes. Focused teacher-writing use cases are often easier for schools to assess than broad open-ended AI usage.",
        },
      ],
      internalLinks: [
        {
          href: ukResourcesHref,
          label: "UK Teacher Communication Resources",
          description:
            "Use the UK hub to explore safer AI pages, parent communication templates, and report-writing support.",
        },
        {
          href: "/gdpr-compliant-ai-report-writer-uk-teachers",
          label: "GDPR Compliant AI Report Writer for UK Teachers",
          description:
            "Go here for the more report-specific version of the same trust and workflow question.",
        },
        {
          href: "/hallucination-safe-ai-for-teachers",
          label: "Hallucination Safe AI for Teachers",
          description:
            "Use this broader page when the main concern is invented details or overconfident output.",
        },
      ],
      relatedSlugs: [
        "hallucination-safe-ai-for-teachers",
        "gdpr-compliant-ai-report-writer-uk-teachers",
        "ai-parent-email-generator-for-teachers",
        "report-comment-generator-for-teachers",
        "teacher-guide-safe-use-of-ai",
        "teacher-parent-communication-hub",
      ],
      structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
      testimonials: [
        {
          quotePrompt:
            "Placeholder testimonial about using Zaza Draft because it felt more focused and safer than a generic AI writer.",
          attributionPrompt:
            "Replace with a verified quote from a UK teacher or school leader.",
        },
        {
          quotePrompt:
            "Placeholder testimonial about calmer AI adoption conversations in a British school context.",
          attributionPrompt:
            "Replace with a verified quote from a UK SLT or digital lead.",
        },
      ],
      cta: {
        title: "Try a calmer AI writing workflow for British schools",
        body: "Try Zaza Draft if you want teacher-first drafting help for parent emails, report comments, and school writing where caution matters.",
        primaryLabel: "Try Zaza Draft",
        primaryHref: "/early-access",
        secondaryLabel: "See how it works",
        secondaryHref: "/products/draft",
      },
    },
    "ofsted-friendly-parent-email-examples": {
      slug: "ofsted-friendly-parent-email-examples",
      shortTitle: "Ofsted-Friendly Parent Emails",
      keyword: "Ofsted friendly parent email examples UK",
      intent: "Template intent",
      title:
        "Ofsted-Friendly Parent Email Examples for UK Teachers | Zaza Draft",
      metaDescription:
        "Ofsted-friendly parent email examples for UK teachers with calm wording for attendance, behaviour, support updates, and parents' evening follow-up.",
      h1: "Ofsted-Friendly Parent Email Examples for UK Teachers",
      description:
        "UK-focused parent email examples for teachers who want wording that feels warm, clear, and professionally defensible.",
      ogImage: "/parent-teacher-communication.jpg",
      heroEyebrow: "UK template",
      heroDescription: [
        "Teachers searching for Ofsted-friendly parent email examples in the UK are usually trying to find the middle ground between sounding human and sounding professionally solid. They want wording that is clear enough for parents, measured enough for SLT, and appropriate for behaviour, attendance, support, or parents' evening follow-up.",
        "This page gives British-school examples that keep the focus on the pupil, avoid emotionally loaded phrasing, and help teachers communicate in a way that still feels calm under pressure. Zaza Draft helps shape the wording, but teachers stay in full control of what is sent.",
      ],
      heroBullets: [
        "Use calmer wording for attendance, behaviour, and support",
        "Keep parent emails clear enough for SLT and school records",
        "Draft messages that still sound human, not robotic",
      ],
      featuredSnippet:
        "Ofsted-friendly parent email examples for UK teachers use calm factual language, keep the focus on the pupil and next step, and avoid emotional overstatement that could weaken the message later.",
      sections: [
        {
          id: "what-teachers-mean-by-ofsted-friendly",
          title: "What teachers usually mean by Ofsted-friendly emails",
          body: [
            "Most teachers are not asking for inspection phrases. They are looking for emails that feel professionally sound if later reviewed by SLT, saved in a contact record, or revisited after a difficult conversation.",
            "That usually means language that is specific, proportionate, and clear about next steps without drifting into defensiveness or vague reassurance.",
          ],
        },
        {
          id: "best-scenarios",
          title: "Where these examples are most useful",
          body: [
            "Ofsted-friendly wording matters most where parent communication may later need to stand up as part of a wider professional trail. Attendance concerns, behaviour updates, parents' evening follow-up, and support summaries are common examples.",
            "The same underlying structure works in all of those cases: reason for writing, key fact, current support or action, next step.",
          ],
          bullets: [
            "Attendance or punctuality follow-up",
            "Behaviour concerns and home-school support",
            "Parents' evening summary or next-step email",
          ],
        },
        {
          id: "why-zaza-helps",
          title: "Why specialist wording support helps here",
          body: [
            "These emails are rarely hard because teachers do not know what to say. They are hard because the tone has to do several jobs at once: parent-facing, professionally safe, and emotionally measured.",
            "Zaza Draft helps reduce that drafting strain without taking over the decision-making. The teacher still decides what is accurate and what belongs in the message.",
          ],
        },
      ],
      trustBlock: {
        title: ukTrustBlockTitle,
        items: [
          {
            title: "British school language",
            body: "Useful for parents' evening follow-up, attendance, behaviour, and support communication in UK school settings.",
          },
          {
            title: "Professionally defensible tone",
            body: "Designed to keep wording measured enough for parent reading, SLT review, and later reference if needed.",
          },
          {
            title: "Teacher review built in",
            body: "Teachers stay in control of the facts, the emphasis, and the final email that goes out.",
          },
        ],
      },
      faq: [
        {
          question: "What makes an email feel Ofsted-friendly?",
          answer:
            "Usually clear factual language, a constructive focus on the pupil, and wording that would still read well if revisited later by colleagues or parents.",
        },
        {
          question: "Does Ofsted-friendly mean formal or stiff?",
          answer:
            "No. It means proportionate and professionally clear, not robotic.",
        },
        {
          question: "Can this help with parents' evening follow-up too?",
          answer:
            "Yes. Those follow-up emails often need exactly the same combination of warmth, clarity, and professional caution.",
        },
        {
          question: "Should I include every detail of the issue?",
          answer:
            "Usually not. Most parent emails are stronger when they focus on the key point and the next step rather than every part of the backstory.",
        },
        {
          question: "Can Zaza Draft help me get the tone right faster?",
          answer:
            "Yes. Zaza Draft is built for teacher writing where tone matters, including parent emails that need to stay calm and professionally appropriate.",
        },
      ],
      internalLinks: [
        {
          href: ukResourcesHref,
          label: "UK Teacher Communication Resources",
          description:
            "Use the UK hub to see the full cluster of pages on Ofsted-friendly wording, parents' evening, and parent communication.",
        },
        {
          href: "/ofsted-friendly-parent-email-examples",
          label: "Ofsted-Friendly Parent Email Examples",
          description:
            "Read the broader non-regional version if you want the main framework without the UK angle.",
        },
        {
          href: "/teacher-guide-to-sensitive-parent-emails",
          label: "Teacher Guide to Sensitive Parent Emails",
          description:
            "Use this when the emotional weight of the message is the bigger problem than the exact scenario.",
        },
      ],
      relatedSlugs: [
        "teacher-guide-to-sensitive-parent-emails",
        "how-to-reply-to-an-angry-parent-email",
        "parents-evening-follow-up-email-template",
        "parent-email-template-for-teachers",
        "how-to-write-a-behaviour-email-to-parents",
        "teacher-parent-communication-hub",
      ],
      structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
      testimonials: [
        {
          quotePrompt:
            "Placeholder testimonial about finding parent email examples that felt calm and defensible in a UK school context.",
          attributionPrompt:
            "Replace with a verified quote from a UK classroom teacher or tutor.",
        },
        {
          quotePrompt:
            "Placeholder testimonial about getting a better tone for attendance or behaviour follow-up emails.",
          attributionPrompt:
            "Replace with a verified quote from a UK head of year or SLT colleague.",
        },
      ],
      cta: {
        title: "Use calmer parent email wording in British schools",
        body: "Try Zaza Draft if you want teacher-first help with parent emails, follow-up after parents' evening, and other school writing where professional tone matters.",
        primaryLabel: "Try Zaza Draft",
        primaryHref: "/early-access",
        secondaryLabel: "See how it works",
        secondaryHref: "/products/draft",
      },
    },
    "how-to-document-parent-contact-for-slt": {
      slug: "how-to-document-parent-contact-for-slt",
      shortTitle: "Document Parent Contact for SLT",
      keyword: "how to document parent contact for SLT UK",
      intent: "How-to/problem intent",
      title: "How to Document Parent Contact for SLT in the UK | Zaza Draft",
      metaDescription:
        "How to document parent contact for SLT in the UK with clear, factual notes that support behaviour records, safeguarding follow-up, and professional school communication.",
      h1: "How to Document Parent Contact for SLT in the UK",
      description:
        "UK-focused guidance for teachers who need cleaner parent-contact notes for SLT without adding another hour of admin.",
      ogImage: "/teacher-working-at-desk-with-laptop.jpg",
      heroEyebrow: "UK how-to",
      heroDescription: [
        "How to document parent contact for SLT in the UK becomes urgent when the original phone call or email is already done and someone now needs a clean record for a behaviour file, pastoral follow-up, or senior-leader awareness. Teachers are rarely short of information. They are short of time and patience for rewriting the same thing yet again.",
        "This page gives UK teachers a steadier way to turn rough communication into concise school-ready notes. The goal is not to write more. It is to write once in language that is factual, brief, and easier for SLT to use later.",
      ],
      heroBullets: [
        "Write concise notes for SLT and pastoral follow-up",
        "Keep parent-contact records factual and proportionate",
        "Reduce repeated admin after difficult communication",
      ],
      featuredSnippet:
        "To document parent contact for SLT in the UK, record the date, contact method, reason for communication, parent response, and next step in short factual language that can be read quickly by leaders or pastoral staff.",
      sections: [
        {
          id: "why-this-multiplies",
          title: "Why parent-contact documentation keeps multiplying",
          body: [
            "One parent email can turn into a phone note, a behaviour log, a pastoral update, and a short summary for SLT. The workload usually comes from duplication rather than complexity.",
            "That is why a simple structure matters. It makes it easier to record the essentials once and adapt the note where needed.",
          ],
        },
        {
          id: "best-note-structure",
          title: "A cleaner structure for parent-contact notes",
          body: [
            "The most useful record usually includes the date, contact method, issue, response, and next step. That is enough for most SLT use without turning the note into a full narrative.",
            "The note becomes safer when it stays neutral and separates fact from frustration.",
          ],
          bullets: [
            "Date and method of contact",
            "Short statement of the issue discussed",
            "Parent response and what happens next",
          ],
        },
        {
          id: "how-zaza-helps",
          title: "How Zaza helps with SLT-facing wording",
          body: [
            "Zaza Draft can help turn a rough parent email, call summary, or after-school note into something cleaner and more concise for leadership review. That is useful when the communication itself was tiring and the admin is what finishes the day off.",
            "The teacher still decides what belongs in the record. Zaza simply helps shape the wording so it is easier to scan and easier to stand behind later.",
          ],
        },
      ],
      trustBlock: {
        title: ukTrustBlockTitle,
        items: [
          {
            title: "SLT-ready structure",
            body: "Useful for notes that need to be scanned quickly by senior leaders, heads of year, or pastoral staff.",
          },
          {
            title: "Calm and factual wording",
            body: "Designed to reduce emotional language and keep records proportionate.",
          },
          {
            title: "Teacher-controlled drafting",
            body: "You still decide the facts, the level of detail, and the final wording saved in the system.",
          },
        ],
      },
      faq: [
        {
          question: "What should always be included in a note for SLT?",
          answer:
            "Usually the date, contact method, issue discussed, response from home, and the next step. That gives SLT enough to understand the situation quickly.",
        },
        {
          question: "Should I paste the whole email into the log?",
          answer:
            "Usually not. A concise factual summary is often easier to use, as long as the original communication is still accessible if needed.",
        },
        {
          question: "Can this help after parents' evening too?",
          answer:
            "Yes. Parents' evening follow-up often needs the same short summary structure for next steps and leadership awareness.",
        },
        {
          question: "How do I keep the note neutral when I am already fed up?",
          answer:
            "Use short factual sentences and stick to what happened, what was said, and what happens next. That usually prevents the note from carrying your frustration into the record.",
        },
        {
          question:
            "Can Zaza Draft help with the note as well as the parent email?",
          answer:
            "Yes. Zaza Draft is designed to help teachers shape calmer wording for parent emails, follow-up summaries, and concise school-ready notes.",
        },
      ],
      internalLinks: [
        {
          href: ukResourcesHref,
          label: "UK Teacher Communication Resources",
          description:
            "Use the UK hub to explore related pages on parent contact, SLT-facing notes, and safer school communication.",
        },
        {
          href: "/how-to-document-parent-contact-without-losing-your-mind",
          label: "How to Document Parent Contact Without Losing Your Mind",
          description:
            "Read the broader page for the general framework without the UK SLT emphasis.",
        },
        {
          href: "/parent-wont-respond-to-behaviour-email",
          label: "Parent Won't Respond to Behaviour Email",
          description:
            "Use this when the record is part of a longer follow-up chain after no reply from home.",
        },
      ],
      relatedSlugs: [
        "how-to-document-parent-contact-without-losing-your-mind",
        "parent-wont-respond-to-behaviour-email",
        "how-to-write-a-behaviour-email-to-parents",
        "teacher-guide-to-sensitive-parent-emails",
        "parents-evening-follow-up-email-template",
        "teacher-parent-communication-hub",
      ],
      structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
      testimonials: [
        {
          quotePrompt:
            "Placeholder testimonial about turning scattered parent-contact notes into something cleaner for SLT.",
          attributionPrompt:
            "Replace with a verified quote from a UK tutor, head of year, or pastoral lead.",
        },
        {
          quotePrompt:
            "Placeholder testimonial about reducing repeated admin after parent communication.",
          attributionPrompt:
            "Replace with a verified quote from a UK teacher or middle leader.",
        },
      ],
      cta: {
        title: "Turn rough parent-contact notes into cleaner SLT-ready records",
        body: "Try Zaza Draft if you want calmer help with school records, parent follow-up, and leadership-facing communication after a long day.",
        primaryLabel: "Try Zaza Draft",
        primaryHref: "/early-access",
        secondaryLabel: "See how it works",
        secondaryHref: "/products/draft",
      },
    },
    "positive-honest-sen-report-comments": {
      slug: "positive-honest-sen-report-comments",
      shortTitle: "SEN Report Comments",
      keyword: "positive honest SEN report comments UK",
      intent: "Template intent",
      title: "Positive Honest SEN Report Comments for UK Teachers | Zaza Draft",
      metaDescription:
        "Positive honest SEN report comments for UK teachers with respectful wording for progress, support, confidence, and next steps that still feels school-ready.",
      h1: "Positive Honest SEN Report Comments for UK Teachers",
      description:
        "UK-focused SEN report wording for teachers who want comments that are respectful, clear, and professionally balanced.",
      ogImage: "/progress-report.jpg",
      heroEyebrow: "UK report template",
      heroDescription: [
        "Positive honest SEN report comments in the UK can take longer than they should because teachers are trying to balance clarity, care, and respect all at once. The wording needs to acknowledge real progress and support needs without sounding vague, reductive, or harsher than intended.",
        "This page helps British-school teachers draft SEN report comments that feel more balanced and useful to families. Zaza Draft supports the first draft, but teachers still choose the evidence, the emphasis, and the final version that goes on the report.",
      ],
      heroBullets: [
        "Use more respectful SEN report wording",
        "Keep comments balanced, clear, and parent-facing",
        "Support UK report-writing expectations without sounding generic",
      ],
      featuredSnippet:
        "Positive honest SEN report comments should describe real progress, support needs, and next steps in respectful language that stays specific, balanced, and professionally clear.",
      sections: [
        {
          id: "why-these-comments-take-time",
          title: "Why SEN report comments are harder to get right",
          body: [
            "Teachers are often trying to communicate progress and support needs accurately while also protecting the dignity of the pupil and the trust of the family. That is why rushed wording can feel especially risky here.",
            "The strongest comments are specific enough to be useful and careful enough not to reduce the pupil to one difficulty or one support label.",
          ],
        },
        {
          id: "what-balanced-sen-comments-do",
          title: "What balanced SEN report comments usually include",
          body: [
            "Useful SEN report comments usually describe current strengths, how support is helping, and what the next step is. They avoid broad labels, overclaiming, and language that sounds more fixed than the actual evidence.",
            "That kind of measured wording is easier to stand behind later in parents' evening conversations or further support planning.",
          ],
          bullets: [
            "Current strength or area of progress",
            "Support, structure, or approach that is helping",
            "A realistic next step for continued development",
          ],
        },
        {
          id: "why-zaza-helps",
          title: "How Zaza helps with respectful report wording",
          body: [
            "Zaza Draft can help teachers shape a rough SEN report note into wording that feels calmer, clearer, and less repetitive. That is especially useful during report season when you know the pupil well but the sentence is still refusing to land properly.",
            "The teacher stays responsible for accuracy, evidence, and tone. Zaza simply helps produce a steadier first draft.",
          ],
        },
      ],
      trustBlock: {
        title: ukTrustBlockTitle,
        items: [
          {
            title: "Respectful wording support",
            body: "Useful when SEN report comments need to stay specific, balanced, and parent-facing.",
          },
          {
            title: "School-ready tone",
            body: "Designed for UK report language that feels measured rather than vague or over-polished.",
          },
          {
            title: "Teacher judgement preserved",
            body: "You still decide the evidence, the support context, and the final comment used in the report.",
          },
        ],
      },
      faq: [
        {
          question:
            "How do I keep SEN report comments positive without hiding the need?",
          answer:
            "Name real progress or response to support, then describe the next area for development clearly and proportionately.",
        },
        {
          question: "Should SEN report comments mention support strategies?",
          answer:
            "Usually yes, where that helps explain current progress and next steps in a respectful, useful way.",
        },
        {
          question: "How do I avoid language that sounds reductive?",
          answer:
            "Keep the comment anchored in current learning, support, and progress rather than broad labels or fixed statements about the pupil.",
        },
        {
          question:
            "Can this wording still work for parents' evening follow-up?",
          answer:
            "Yes. Balanced report comments are usually easier to stand behind later in conversations with families and support staff.",
        },
        {
          question:
            "Can Zaza Draft help me make the wording calmer and clearer?",
          answer:
            "Yes. Zaza Draft is built for teacher writing where tone matters, including respectful report comments and parent-facing school communication.",
        },
      ],
      internalLinks: [
        {
          href: ukResourcesHref,
          label: "UK Teacher Communication Resources",
          description:
            "Use the UK hub to explore related pages on reports, parent communication, and school-safe wording.",
        },
        {
          href: "/sen-report-comments-examples",
          label: "SEN Report Comments Examples",
          description:
            "Read the broader page for the general SEN report-comment framework without the UK cluster angle.",
        },
        {
          href: "/positive-but-honest-report-card-comments-for-struggling-students",
          label:
            "Positive but Honest Report Card Comments for Struggling Students",
          description:
            "Use this when the issue is wider than SEN-specific wording and you want the broader balanced-report framework.",
        },
      ],
      relatedSlugs: [
        "sen-report-comments-examples",
        "positive-but-honest-report-card-comments-for-struggling-students",
        "report-comments-for-struggling-students",
        "report-comment-generator-for-teachers",
        "teacher-parent-communication-hub",
        "ai-for-student-reports",
      ],
      structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
      testimonials: [
        {
          quotePrompt:
            "Placeholder testimonial about finding more respectful SEN report wording during report season.",
          attributionPrompt:
            "Replace with a verified quote from a UK classroom teacher or SENCO.",
        },
        {
          quotePrompt:
            "Placeholder testimonial about keeping SEN report comments balanced and clear.",
          attributionPrompt:
            "Replace with a verified quote from a UK primary or secondary teacher.",
        },
      ],
      cta: {
        title: "Shape calmer, more respectful SEN report comments",
        body: "Try Zaza Draft if you want teacher-first help with SEN report wording, parent-facing comments, and school writing where nuance matters.",
        primaryLabel: "Try Zaza Draft",
        primaryHref: "/early-access",
        secondaryLabel: "See report-writing support",
        secondaryHref: "/ai-for-student-reports",
      },
    },
  },
  england: {
    "how-to-document-parent-contact-for-ofsted": {
      slug: "how-to-document-parent-contact-for-ofsted",
      shortTitle: "Document Parent Contact for Ofsted",
      keyword: "how to document parent contact school uk",
      intent: "How-to/problem intent",
      title:
        "How to Document Parent Contact for Ofsted in England | Zaza Draft",
      metaDescription:
        "How to document parent contact for Ofsted in England with clear, factual notes that support school records without creating more workload.",
      h1: "How to Document Parent Contact for Ofsted in England",
      description:
        "England-focused guidance for teachers who need cleaner parent-contact records without writing the same thing four times.",
      ogImage: "/teacher-working-at-desk-with-laptop.jpg",
      heroEyebrow: "England how-to",
      heroDescription: [
        "How to document parent contact for Ofsted in England becomes a real search when the original email was already tiring and someone now wants proof of contact, next steps, and a note that makes sense in the school system. The problem is rarely not knowing what happened. The problem is turning scraps of communication into something clean and usable.",
        "This page gives teachers in England a calmer way to record parent contact so the notes are concise, factual, and easier to stand behind later.",
      ],
      heroBullets: [
        "Keep notes factual and proportionate",
        "Create cleaner records from rough communication",
        "Reduce duplication across email, logs, and follow-up",
      ],
      featuredSnippet:
        "To document parent contact clearly in England, record the date, method of contact, the concern discussed, any response from home, and the agreed next step in factual language that avoids emotion, speculation, or unnecessary detail.",
      sections: [
        {
          id: "why-this-feels-so-wasteful",
          title: "Why parent-contact documentation drains so much time",
          body: [
            "Teachers often already have the evidence: the email, the call note, the meeting summary, or the message sent home. The draining part is rewriting the same event into whatever format the school system or line manager needs next.",
            "That is why a simple documentation structure matters. It reduces friction without making the note sound blunt or incomplete.",
          ],
        },
        {
          id: "best-structure",
          title:
            "How to document parent contact for Ofsted in England without overcomplicating it",
          body: [
            "A useful note usually needs five things: date, method, issue, response, next step. That is enough for most school records and much easier to write consistently when you are tired.",
            "The aim is not to create a perfect narrative. It is to leave a concise, factual record another colleague can understand later.",
          ],
          exampleLabel: "Parent-contact log example",
          exampleBody:
            "Date: 12 March 2026\nMethod: Email\nIssue: Follow-up regarding repeated disruption in lesson time\nResponse from home: Parent acknowledged the email and requested a call later in the week\nNext step: Head of year to arrange follow-up call and review behaviour targets",
        },
        {
          id: "what-to-avoid",
          title: "What weakens a parent-contact record",
          body: [
            "Notes become less useful when they include frustration, assumptions about motive, or long explanations that belong in a wider report rather than a contact log. They also become hard to scan when key details are buried in a paragraph.",
            "Shorter, structured entries are usually easier for teachers, pastoral teams, and leaders to use later.",
          ],
        },
        {
          id: "how-zaza-helps",
          title: "How Zaza Draft helps without taking over the record",
          body: [
            "Zaza Draft can help turn rough notes or a sent email into a cleaner, more concise school-ready record. That is useful when the admin burden is not the issue itself but the number of times you have to write it down.",
            "The teacher still decides what happened and what matters. Zaza simply helps with the wording and structure.",
          ],
        },
      ],
      trustBlock: {
        title:
          "Built for teachers who need proof as well as professional wording",
        items: [
          {
            title: "Clear record structure",
            body: "Useful for parent-contact notes that need to be quickly understood by colleagues and leaders.",
          },
          {
            title: "Lower-friction admin",
            body: "Designed to reduce rewriting when one contact has to appear in several places.",
          },
          {
            title: "Teacher judgement remains central",
            body: "You still decide the facts, next step, and final wording before any note is saved.",
          },
        ],
      },
      faq: [
        {
          question: "How much detail should I put in a parent-contact log?",
          answer:
            "Usually enough to show what happened, what response was received, and what the next step is. Extra narrative often makes the note harder to scan.",
        },
        {
          question: "Should I copy the whole email into the log?",
          answer:
            "Usually not. A concise summary is often more useful, as long as the original communication is still accessible elsewhere if needed.",
        },
        {
          question: "Can these notes be used after a difficult phone call too?",
          answer:
            "Yes. The same structure works well for calls, meetings, and email follow-up.",
        },
        {
          question: "Why does this matter so much in English schools?",
          answer:
            "Because communication records often need to support pastoral follow-up, leadership oversight, and a clear audit trail for later review.",
        },
        {
          question:
            "Can Zaza Draft help turn rough notes into a cleaner record?",
          answer:
            "Yes. Zaza Draft is designed to help teachers shape concise, school-ready notes and follow-up wording while staying fully in control.",
        },
      ],
      internalLinks: [
        {
          href: "/how-to-document-parent-contact-without-losing-your-mind",
          label: "How to Document Parent Contact Without Losing Your Mind",
          description:
            "Use the broader page for the main documentation workflow without the England-specific angle.",
        },
        {
          href: "/parent-wont-respond-to-behaviour-email",
          label: "Parent Won't Respond to Behaviour Email",
          description:
            "Go here if the record is tied to follow-up after no response from home.",
        },
        {
          href: "/teacher-parent-communication-hub",
          label: "Teacher Parent Communication Hub",
          description:
            "Use the hub if this is part of a wider parent-communication problem in school.",
        },
      ],
      relatedSlugs: [
        "how-to-document-parent-contact-without-losing-your-mind",
        "parent-wont-respond-to-behaviour-email",
        "how-to-write-a-behaviour-email-to-parents",
        "teacher-parent-communication-hub",
        "how-to-reply-to-an-angry-parent-email",
        "parents-evening-follow-up-email-template",
      ],
      structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
      testimonials: [
        {
          quotePrompt:
            "Placeholder testimonial about turning rough parent-contact notes into cleaner records.",
          attributionPrompt:
            "Replace with a verified quote from a teacher or pastoral lead in England.",
        },
        {
          quotePrompt:
            "Placeholder testimonial about reducing repeated admin writing around parent contact.",
          attributionPrompt:
            "Replace with a verified quote from a head of year or safeguarding lead in England.",
        },
      ],
      cta: {
        title: "Turn rough parent-contact notes into clearer records",
        body: "Try Zaza Draft if you want calmer help with parent-contact logs, follow-up summaries, and other school records that keep multiplying after the original message.",
        primaryLabel: "Try Zaza Draft",
        primaryHref: "/early-access",
        secondaryLabel: "See how it works",
        secondaryHref: "/products/draft",
      },
    },
  },
} satisfies Record<
  RegionalTeacherWritingRegion,
  Record<string, TeacherWritingPage>
>;

export function getRegionalTeacherWritingPage(
  region: RegionalTeacherWritingRegion,
  slug: string,
) {
  return regionalTeacherWritingPages[region][
    slug as keyof (typeof regionalTeacherWritingPages)[typeof region]
  ];
}

export function getRegionalTeacherWritingSlugs(
  region: RegionalTeacherWritingRegion,
) {
  return Object.keys(regionalTeacherWritingPages[region]);
}

export function getRegionalTeacherWritingEntries(
  region: RegionalTeacherWritingRegion,
) {
  return Object.values(regionalTeacherWritingPages[region]);
}
