"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "de" | "es" | "fr" | "it";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translationsEn: Record<string, string> = {
  // Add these to the English translations object (around line 16-200)
  // Replace/add to the existing pricing.* keys

  // Pricing Page (EN) - Boutique Version
  "pricing.hero.preheadline": "TRANSPARENT PRICING",
  "pricing.hero.headline": "Pricing that respects teachers' time and wellbeing",
  "pricing.hero.subheadline":
    "Save hours every week, reduce after-hours stress, and write with confidence – with pricing that's simple and fair.",
  "pricing.trust.teachers": "Trusted by caring teachers",
  "pricing.trust.ferpa": "FERPA-minded",
  "pricing.trust.cancel": "Cancel anytime",

  // Identity Strip
  "pricing.identity.title": "This is for teachers who...",
  "pricing.identity.point1":
    "want to spend less time writing and more time teaching",
  "pricing.identity.point2":
    "need trusted language support without losing their voice",
  "pricing.identity.point3":
    "care about boundaries, confidence, and calm in their week",

  // Currency & Billing Toggle
  "pricing.toggle.monthly": "Monthly",
  "pricing.toggle.annual": "Annual",
  "pricing.toggle.save": "Save 2 months",

  // Outcome Proof
  "pricing.outcome.text":
    "Most teachers spend 3–5 hours/week on messages and comments. Draft cuts that by 50–70% while preserving your tone and intent.",

  // Free Plan
  "pricing.free.badge": "FREE",
  "pricing.free.title": "Starter",
  "pricing.free.description":
    "Everything you need to try Draft and save your first hours.",
  "pricing.free.cta": "Start Free",
  "pricing.free.feature1": "5 drafts/month",
  "pricing.free.feature2": "Basic templates",
  "pricing.free.feature3": "Save & copy",
  "pricing.free.feature4": "Community support",

  // Teacher (Premium) Plan
  "pricing.teacher.badge": "MOST POPULAR",
  "pricing.teacher.title": "Teacher",
  "pricing.teacher.description":
    "Unlimited, hallucination-safe writing with no lock-ins.",
  "pricing.teacher.period": "Cancel anytime",
  "pricing.teacher.savingsAnnual": "Save 2 months free",
  "pricing.teacher.cta": "Start 7-day free trial",
  "pricing.teacher.trial": "No credit card required",
  "pricing.teacher.guarantee": "30-day money-back guarantee",
  "pricing.teacher.feature1": "Unlimited drafts & revisions",
  "pricing.teacher.feature2": "Tone Tutor, translations, context memory",
  "pricing.teacher.feature3": "Custom templates & comment banks",
  "pricing.teacher.feature4": "Saved history & export",
  "pricing.teacher.feature5": "Zara's gentle wellbeing nudges",
  "pricing.teacher.feature6": "Priority email support",
  "pricing.teacher.timeSaved": "Typical time saved: 4–7 hours/week",

  // Department Plan
  "pricing.department.badge": "TEAMS",
  "pricing.department.title": "Department",
  "pricing.department.description":
    "Collaborative writing with shared quality and consistency.",
  "pricing.department.perTeacher": "/teacher",
  "pricing.department.billing": "Billed annually • 5–50 seats",
  "pricing.department.cta": "Talk to Sales",
  "pricing.department.includes": "Everything in Teacher, plus:",
  "pricing.department.feature1": "Team libraries, shared templates",
  "pricing.department.feature2": "Role-based access",
  "pricing.department.feature3": "Review & approval",
  "pricing.department.feature4": "Priority onboarding & success",

  // Schools & Districts
  "pricing.enterprise.badge": "ENTERPRISE",
  "pricing.enterprise.title": "Schools & Districts",
  "pricing.enterprise.description": "Everything for large-scale deployments.",
  "pricing.enterprise.price": "Custom",
  "pricing.enterprise.cta": "Contact Sales",
  "pricing.enterprise.includes": "Everything in Department, plus:",
  "pricing.enterprise.feature1": "SSO/SAML, DPA/SCCs",
  "pricing.enterprise.feature2": "SLA & dedicated success",
  "pricing.enterprise.feature3": "Centralized billing & provisioning",

  // Bundle
  "pricing.bundle.badge": "BUNDLE & SAVE",
  "pricing.bundle.title": "Draft + Teach",
  "pricing.bundle.description":
    "One place to plan, write, and communicate – with teacher-first wellbeing at the centre.",
  "pricing.bundle.perMonth": "/month",
  "pricing.bundle.perYear": "/year",
  "pricing.bundle.savings": "Save vs buying separately",
  "pricing.bundle.cta": "Get the Bundle",

  // Testimonials
  "pricing.testimonials.title": "What teachers say about pricing",
  "pricing.testimonials.1.name": "Sarah L.",
  "pricing.testimonials.1.role": "Middle School Teacher",
  "pricing.testimonials.1.quote":
    "Draft gave me back my evenings. I now leave school on time – and parents say my messages feel warmer.",
  "pricing.testimonials.2.name": "Mark R.",
  "pricing.testimonials.2.role": "Department Head",
  "pricing.testimonials.2.quote":
    "Our department aligned tone and sped up feedback. Marking time dropped by a third.",
  "pricing.testimonials.3.name": "Emma K.",
  "pricing.testimonials.3.role": "Primary Teacher",
  "pricing.testimonials.3.quote":
    "The pricing is transparent and fair. No hidden fees, no lock-ins. Just works.",

  // Wellbeing Metric
  "pricing.metric.text":
    "Across 90 days, teachers report 38% fewer after-hours messages and +24% confidence in parent communication.",

  // FAQs
  "pricing.faq.title": "Pricing & Billing FAQs",
  "pricing.faq.q1": "Is there a free plan?",
  "pricing.faq.a1":
    "Yes – start with 5 drafts/month to feel the difference. No credit card required.",
  "pricing.faq.q2": "What happens to my voice?",
  "pricing.faq.a2":
    "Draft preserves your tone and language; you're always in control. Our Tone Tutor learns your style.",
  "pricing.faq.q3": "Are my messages private?",
  "pricing.faq.a3":
    "Yes. We don't use your content to train public models. See our Privacy page for details.",
  "pricing.faq.q4": "Can I cancel anytime?",
  "pricing.faq.a4":
    "Absolutely – no lock-ins. Cancel from your account settings with one click.",
  "pricing.faq.q5": "Do you support schools?",
  "pricing.faq.a5":
    "Yes – we have team and district plans. Contact sales for details.",

  // Footer CTA
  "pricing.cta.headline": "Ready to reclaim your time?",
  "pricing.cta.subheadline": "Join teachers saving 4–7 hours per week",
  "pricing.cta.button": "Start your 7-day free trial",

  // Footer Features
  "footer.tagline":
    "The writing partner for teachers. Beat the blank page, save hours, and stay in control for parent emails, student reports, and staff notes.",
  "footer.products.title": "Product & Ecosystem",
  "footer.products.features": "Features",
  "footer.products.pricing": "Pricing",
  "footer.products.teacherStories": "Teacher Stories",
  "footer.products.zazaTeach": "Zaza Teach",
  "footer.products.zazaDraft": "Zaza Draft",
  "footer.products.gradeFlow": "GradeFlow",
  "footer.products.zazaShield": "Zaza Shield",
  "footer.products.zazaTechnologies": "Zaza Technologies",
  "footer.learning.title": "Learning & Resources",
  "footer.learning.aiLiteracy": "AI Literacy",
  "footer.learning.glossary": "Glossary",
  "footer.learning.webinars": "Webinars",
  "footer.learning.videoTutorials": "Video Tutorials",
  "footer.learning.bestAiToolForParentEmails": "Best AI Tool for Parent Emails",
  "footer.learning.reduceStressWritingParentMessages":
    "Reduce Stress Writing Parent Messages",
  "footer.learning.bestAiWritingToolsForTeachers2025":
    "Best AI Writing Tools for Teachers 2025",
  "footer.learning.aiForStudentReports": "AI for Student Reports",
  "footer.company.title": "Company",
  "footer.company.blog": "Blog",
  "footer.company.integrations": "Integrations",
  "footer.company.community": "Community",
  "footer.company.successStories": "Success Stories",
  "footer.company.ambassadorProgram": "Ambassador Program",
  "footer.company.stateOfAIReport": "State of AI Report",
  "footer.company.teacherResources": "Teacher Resources",
  "footer.company.support": "Support",
  "footer.company.faq": "FAQ",
  "footer.company.about": "About us",
  "footer.company.privacy": "Privacy Policy",
  "footer.company.terms": "Terms of Service",
  "footer.company.contact": "Contact",
  "footer.builtBy": "Built by educators, for educators.",
  "footer.copyright": "2025 Zaza Technologies. All rights reserved.",
  "footer.languages.en": "EN",
  "footer.languages.de": "DE",
  "footer.languages.es": "ES",
  "footer.languages.fr": "FR",
  "footer.languages.it": "IT",

  // Navigation
  "nav.pricing": "Pricing",
  "nav.products": "Products",
  "nav.learningCentre": "Learning Centre",
  "nav.resources": "Resources",
  "nav.about": "About",
  "nav.aboutUs": "About us",
  "nav.getStarted": "Get Started",

  // Founder Hero Section (English)
  "founder.hero.headline": "Meet the founder building AI for teachers",
  "founder.hero.subheading":
    "I have worked in learning and education for over twenty years - in universities, corporate education, and edtech. One thing has always been true: teaching is human work.",
  "founder.hero.label": "FOUNDER & CEO",
  "founder.hero.name": "Dr Greg Blackburn",
  "founder.hero.tagline": "Founder & CEO, Learning Scientist, Teacher Advocate",

  // Founder Journey Section (English)
  "founder.journey.title": "My journey in education",
  "founder.journey.p1":
    "During my PhD in Professional Education, I focused on how learners develop critical thinking and problem-solving skills in real-world environments. I saw how technology could support learning when used well. But I also saw how easily it could create stress, waste time, or work against what educators are trying to achieve.",
  "founder.journey.p2":
    "As Chief Learning Officer at Communardo, I lead work in AI-powered learning design, digital content development, LMS innovation, and teacher training. I have written and spoken widely on learning science, e-learning strategy, and the role of AI in education.",
  "founder.journey.p3":
    "But here is the truth: most edtech tools are not built for teachers. They are built for sales decks.",
  "founder.journey.p4":
    "I have watched technology sold as 'revolutionary' only to become another system teachers have to manage. I have seen AI products that generate content that looks impressive at first glance - but collapses the moment a teacher tries to use it with real students.",
  "founder.journey.p5": "That is why I built Zaza.",

  // Founder Principle Section (English)
  "founder.principle.title": "The principle behind everything we build",
  "founder.principle.question": "Does this give teachers back meaningful time?",
  "founder.principle.not1": "Not 'Is this clever?'",
  "founder.principle.not2": "Not 'Does this demo well?'",
  "founder.principle.not3": "Not 'Does this look good on a roadmap?'",
  "founder.principle.answer": "Time.",
  "founder.principle.rule":
    "If a tool cannot reduce workload in a real school environment, it does not belong in Zaza.",

  // Founder Commitments Section (English)
  "founder.commitments.title": "My commitments to teachers",
  "founder.commitments.item1.title": "No hallucinations.",
  "founder.commitments.item1.body":
    "When AI outputs are not trustworthy, teachers end up doing more work checking and fixing. That is why we engineer for accuracy, clarity, and classroom reality.",
  "founder.commitments.item2.title": "Reduce workload, not shift it.",
  "founder.commitments.item2.body":
    "A tool that requires training, manuals, and complex workflows is not support. It is rebadged work.",
  "founder.commitments.item3.title": "Respect professional expertise.",
  "founder.commitments.item3.body":
    "You do not need technology that replaces your judgement. You need technology that amplifies it.",
  "founder.commitments.closing":
    "Teaching is incredibly complex, intellectually demanding work. It is also emotionally taxing work. Good tools should lighten that burden.",

  // Founder Why Zaza Section (English)
  "founder.whyZaza.title": "Why Zaza exists",
  "founder.whyZaza.p1":
    "Zaza is not trying to 'disrupt education.' Teachers do not need disruption. They need support. They need time. They need tools that recognise the value of their experience - rather than trying to standardise it or replace it.",
  "founder.whyZaza.p2":
    "The work teachers do matters. And the best thing technology can do is help protect the time, energy, and care required to do that work well.",
  "founder.whyZaza.p3":
    "If that is the kind of future for education you believe in, you are in the right place.",

  // Founder Closing (English)
  "founder.closing.name": "Greg",
  "founder.closing.title": "Dr Greg Blackburn",
  "founder.closing.role": "Founder & CEO, Zaza Technologies",
  "founder.personal.cta": "Get in touch",

  // Additional Founder Keys (English - for page compatibility)
  "founder.journey.quote":
    "I built Zaza because I was tired of watching teachers drown in administrative work when technology should be setting them free.",
  "founder.mission.quote":
    "Every teacher deserves tools that respect their expertise, protect their students, and give them time to do what they do best: teach.",
  "founder.mission.attribution": "Dr Greg Blackburn, Founder & CEO",
  "founder.whyZaza.subtitle": "Three principles that guide everything we do",
  "founder.whyZaza.card1.title": "For teachers, with teachers",
  "founder.whyZaza.card1.body":
    "I have spent my career working alongside teachers and learning designers - refining tools directly with educators who understand the reality of classrooms. Every feature in Zaza is shaped by real feedback and real practice, not theory.",
  "founder.whyZaza.card2.title": "Boutique, not Big Tech",
  "founder.whyZaza.card2.body":
    "We are not a huge company trying to sell to everyone. We are a focused team building specialised tools for one audience: teachers. Your needs come first, always.",
  "founder.whyZaza.card3.title": "Building a legacy",
  "founder.whyZaza.card3.body":
    "This is not about quick profits. It is about creating something that genuinely helps teachers thrive and changes education for the better. That is the legacy I want to leave.",
  // Founder Personal Message Section (English)
  "founder.personal.title": "A personal note",
  "founder.personal.message1":
    "If you are reading this, you are probably a teacher who is curious about AI but sceptical about whether it can really help. I get it. I was sceptical too. Most AI tools feel like they were built by people who have never set foot in a classroom.",
  "founder.personal.message2":
    "That is why I built Zaza differently. Every feature is designed with real teachers, tested in real classrooms, and refined based on real feedback. We are not just building software - we are building partnerships with educators who help us create tools that actually work.",
  "founder.personal.message3":
    "I would love to hear from you. Whether you have questions, feedback, or just want to talk about education and technology, my door is always open. Let us shape the future of teacher technology together.",
  "founder.personal.name": "",
  "founder.personal.title2": "Dr Greg Blackburn",
  "founder.personal.company": "Zaza Technologies",

  // Company Page (English) - NEW CREDIBILITY-PROTECTED VERSION
  "company.hero.label": "OUR COMPANY",
  "company.hero.headline": "Zaza Technologies",
  "company.hero.subheading":
    "We are a small, specialised team of learning designers, engineers, and educational researchers building technology that helps teachers thrive.",

  "company.origin.p1":
    "Zaza Technologies was founded in 2023 with a clear belief: education deserves AI tools built with real pedagogical understanding, not repurposed corporate AI models. Throughout our careers in learning and education, we saw the same pattern again and again - technology that promised to reduce workload often ended up creating more of it.",
  "company.origin.p2": "So we chose a different approach.",
  "company.origin.p3":
    "We design tools that are trained on real pedagogy, developed with educators, and refined through classroom use. Tools that understand the nuance of teacher judgement, the emotional weight of communication, and the importance of constructive feedback. Tools that are accurate, reliable, and safe for educational settings.",
  "company.origin.p4":
    "Our goal is simple: give teachers meaningful time back.",

  "company.philosophy.title": "Our Philosophy",
  "company.philosophy.intro":
    'We do not believe in "AI that replaces teachers." We believe in AI that supports teachers.',
  "company.philosophy.principle1": "Tools must respect teacher expertise.",
  "company.philosophy.principle2": "Tools must reduce workload, not shift it.",
  "company.philosophy.principle3":
    "Tools must protect students and their learning environment.",
  "company.philosophy.principle4": "Tools must be trustworthy and transparent.",
  "company.philosophy.closing":
    "If technology cannot help teachers do what they do best - teach - then it does not belong in the classroom.",

  "company.boutique.title": "A Boutique Approach",
  "company.boutique.intro":
    "We are intentionally not a large technology company. We are a focused team building for one audience only - teachers.",
  "company.boutique.means": "This means:",
  "company.boutique.point1":
    "We work closely with educators across multiple regions and contexts.",
  "company.boutique.point2": "We test features directly in real classrooms.",
  "company.boutique.point3":
    "We prioritise clarity, safety, and ease of use over novelty.",
  "company.boutique.closing":
    "We do not optimise for rapid scale. We optimise for what works.",

  "company.today.title": "Where We Are Today",
  "company.today.p1":
    "Zaza now supports over 500 teachers in more than 15 countries. On average, teachers save over 10 hours per week on writing and communication tasks by using Zaza's tools. And we are just getting started.",
  "company.today.p2":
    "Our long-term vision is to build a complete suite of AI tools that help teachers reclaim their time, protect their wellbeing, and stay connected to the heart of their work - their students.",

  "company.stats.teachers.number": "500+",
  "company.stats.teachers.label": "Teachers using Zaza",
  "company.stats.countries.number": "15",
  "company.stats.countries.label": "Countries",
  "company.stats.hours.number": "10+",
  "company.stats.hours.label": "Hours saved weekly",

  // Contact Page (English)
  "contact.title": "Get in touch",
  "contact.subtitle":
    "Have questions? Want to learn more? We'd love to hear from you.",
  "contact.form.name": "Your Name",
  "contact.form.email": "Your Email",
  "contact.form.message": "Your Message",
  "contact.form.placeholder": "Tell us how we can help...",
  "contact.form.submit": "Send Message",
  "contact.form.dataNote":
    "We respect your privacy. Your information will never be shared.",
  "contact.direct.title": "Direct Contact",
  "contact.direct.email": "Email us",
  "contact.direct.response": "We typically respond within 24 hours",
  "contact.help.title": "Need Help?",
  "contact.help.description": "Check out our helpful resources",
  "contact.help.faq": "→ Frequently Asked Questions",
  "contact.help.support": "→ Support Centre",

  // About Company Page (English)
  "about.company.hero.label": "OUR COMPANY",
  "about.company.hero.headline": "Zaza Technologies",
  "about.company.hero.subheading":
    "We're a team of educators, engineers, and designers building the future of teacher technology.",
  "about.company.origin.title": "How We Started",
  "about.company.origin.p1":
    "Zaza Technologies was founded in 2023 by teachers who were frustrated with generic AI tools that didn't understand education. We saw teachers spending hours on administrative writing tasks that could be automated, but existing AI tools were either unsafe for student data or produced output that sounded nothing like a teacher.",
  "about.company.origin.p2":
    "So we built something different: AI tools trained specifically on educational communications and pedagogy. Tools that understand the nuances of parent-teacher communication, the importance of constructive feedback, and the need to maintain your authentic voice. Tools that are hallucination-safe, FERPA-compliant, and designed from the ground up for education.",
  "about.company.vision.title": "Our Vision",
  "about.company.vision.p1":
    "Today, Zaza serves over 500 teachers across 15 countries, saving them 10+ hours per week on writing tasks. But we're just getting started. Our vision is to build a complete suite of AI tools that help teachers reclaim their time and focus on what matters most: their students.",
  "about.company.values.title": "Our Values",
  "about.company.values.teacherFirst.title": "Teachers First",
  "about.company.values.teacherFirst.description":
    "Every decision we make starts with one question: does this help teachers?",
  "about.company.values.trustSafety.title": "Trust & Safety",
  "about.company.values.trustSafety.description":
    "Student data protection and output accuracy are non-negotiable.",
  "about.company.values.authentic.title": "Authentic Voice",
  "about.company.values.authentic.description":
    "Our AI preserves your unique communication style and professional judgement.",
  "about.company.team.title": "Our Team",
  "about.company.team.description":
    "We're a small team of educators, learning scientists, and engineers who believe technology should serve teachers, not the other way around.",
  "about.company.stats.teachers.label": "Teachers using Zaza",
  "about.company.stats.teachers.value": "500+",
  "about.company.stats.countries.label": "Countries",
  "about.company.stats.countries.value": "15",
  "about.company.stats.timeSaved.label": "Hours saved weekly",
  "about.company.stats.timeSaved.value": "10+",
};

const translationsDe: Record<string, string> = {
  // Pricing Page (DE) - Boutique Version
  "pricing.hero.preheadline": "TRANSPARENTE PREISE",
  "pricing.hero.headline":
    "Preise, die die Zeit und das Wohlbefinden von Lehrkräften respektieren",
  "pricing.hero.subheadline":
    "Sparen Sie jede Woche Stunden, reduzieren Sie Stress nach Feierabend und schreiben Sie selbstbewusst - mit einfachen und fairen Preisen.",
  "pricing.trust.teachers": "Von fürsorglichen Lehrkräften vertraut",
  "pricing.trust.ferpa": "FERPA-bewusst",
  "pricing.trust.cancel": "Jederzeit kündbar",

  // Identity Strip
  "pricing.identity.title": "Dies ist für Lehrkräfte, die...",
  "pricing.identity.point1":
    "weniger Zeit mit Schreiben und mehr Zeit mit Unterrichten verbringen möchten",
  "pricing.identity.point2":
    "vertrauenswürdige Sprachunterstützung benötigen, ohne ihre Stimme zu verlieren",
  "pricing.identity.point3":
    "sich um Grenzen, Selbstvertrauen und Ruhe in ihrer Woche kümmern",

  // Currency & Billing Toggle
  "pricing.toggle.monthly": "Monatlich",
  "pricing.toggle.annual": "Jährlich",
  "pricing.toggle.save": "2 Monate sparen",

  // Outcome Proof
  "pricing.outcome.text":
    "Die meisten Lehrkräfte verbringen 3-5 Stunden/Woche mit Nachrichten und Kommentaren. Draft reduziert dies um 50-70%, während Ihr Ton und Ihre Absicht erhalten bleiben.",

  // Free Plan
  "pricing.free.badge": "KOSTENLOS",
  "pricing.free.title": "Starter",
  "pricing.free.description":
    "Alles, was Sie brauchen, um Draft auszuprobieren und Ihre ersten Stunden zu sparen.",
  "pricing.free.cta": "Kostenlos starten",
  "pricing.free.feature1": "5 Entwürfe/Monat",
  "pricing.free.feature2": "Basisvorlagen",
  "pricing.free.feature3": "Speichern & kopieren",
  "pricing.free.feature4": "Community-Support",

  // Teacher (Premium) Plan
  "pricing.teacher.badge": "AM BELIEBTESTEN",
  "pricing.teacher.title": "Lehrkraft",
  "pricing.teacher.description":
    "Unbegrenztes, halluzinationsfreies Schreiben ohne Vertragsbindung.",
  "pricing.teacher.period": "Jederzeit kündbar",
  "pricing.teacher.savingsAnnual": "2 Monate kostenlos sparen",
  "pricing.teacher.cta": "7-tägige kostenlose Testversion starten",
  "pricing.teacher.trial": "Keine Kreditkarte erforderlich",
  "pricing.teacher.guarantee": "30-tägige Geld-zurück-Garantie",
  "pricing.teacher.feature1": "Unbegrenzte Entwürfe & Überarbeitungen",
  "pricing.teacher.feature2": "Ton-Tutor, Übersetzungen, Kontextgedächtnis",
  "pricing.teacher.feature3": "Individuelle Vorlagen & Kommentarbanken",
  "pricing.teacher.feature4": "Gespeicherter Verlauf & Export",
  "pricing.teacher.feature5": "Zaras sanfte Wohlbefindens-Hinweise",
  "pricing.teacher.feature6": "Prioritäts-E-Mail-Support",
  "pricing.teacher.timeSaved": "Typische eingesparte Zeit: 4-7 Stunden/Woche",

  // Department Plan
  "pricing.department.badge": "TEAMS",
  "pricing.department.title": "Abteilung",
  "pricing.department.description":
    "Kollaboratives Schreiben mit gemeinsamer Qualität und Konsistenz.",
  "pricing.department.perTeacher": "/Lehrkraft",
  "pricing.department.billing": "Jährlich abgerechnet • 5-50 Plätze",
  "pricing.department.cta": "Vertrieb kontaktieren",
  "pricing.department.includes": "Alles in Lehrkraft, plus:",
  "pricing.department.feature1": "Team-Bibliotheken, gemeinsame Vorlagen",
  "pricing.department.feature2": "Rollenbasierter Zugriff",
  "pricing.department.feature3": "Überprüfung & Genehmigung",
  "pricing.department.feature4": "Prioritäts-Onboarding & Erfolg",

  // Schools & Districts
  "pricing.enterprise.badge": "ENTERPRISE",
  "pricing.enterprise.title": "Schulen & Bezirke",
  "pricing.enterprise.description": "Alles für großflächige Implementierungen.",
  "pricing.enterprise.price": "Individuell",
  "pricing.enterprise.cta": "Vertrieb kontaktieren",
  "pricing.enterprise.includes": "Alles in Abteilung, plus:",
  "pricing.enterprise.feature1": "SSO/SAML, DPA/SCCs",
  "pricing.enterprise.feature2": "SLA & dedizierter Erfolg",
  "pricing.enterprise.feature3": "Zentralisierte Abrechnung & Bereitstellung",

  // Bundle
  "pricing.bundle.badge": "BÜNDELN & SPAREN",
  "pricing.bundle.title": "Draft + Teach",
  "pricing.bundle.description":
    "Ein Ort zum Planen, Schreiben und Kommunizieren - mit lehrkraftzentriertem Wohlbefinden im Mittelpunkt.",
  "pricing.bundle.perMonth": "/Monat",
  "pricing.bundle.perYear": "/Jahr",
  "pricing.bundle.savings": "Sparen Sie gegenüber separatem Kauf",
  "pricing.bundle.cta": "Bundle erhalten",

  // Testimonials
  "pricing.testimonials.title": "Was Lehrkräfte über die Preise sagen",
  "pricing.testimonials.1.name": "Sarah L.",
  "pricing.testimonials.1.role": "Mittelschullehrerin",
  "pricing.testimonials.1.quote":
    "Draft gab mir meine Abende zurück. Ich verlasse jetzt pünktlich die Schule - und Eltern sagen, meine Nachrichten fühlen sich wärmer an.",
  "pricing.testimonials.2.name": "Mark R.",
  "pricing.testimonials.2.role": "Abteilungsleiter",
  "pricing.testimonials.2.quote":
    "Unsere Abteilung hat den Ton abgestimmt und Feedback beschleunigt. Die Korrekturzeit sank um ein Drittel.",
  "pricing.testimonials.3.name": "Emma K.",
  "pricing.testimonials.3.role": "Grundschullehrerin",
  "pricing.testimonials.3.quote":
    "Die Preisgestaltung ist transparent und fair. Keine versteckten Gebühren, keine Vertragsbindung. Funktioniert einfach.",

  // Wellbeing Metric
  "pricing.metric.text":
    "Über 90 Tage berichten Lehrkräfte von 38% weniger Nachrichten nach Feierabend und +24% Vertrauen in die Elternkommunikation.",

  // FAQs
  "pricing.faq.title": "Preis- & Abrechnungs-FAQs",
  "pricing.faq.q1": "Gibt es einen kostenlosen Plan?",
  "pricing.faq.a1":
    "Ja - starten Sie mit 5 Entwürfen/Monat, um den Unterschied zu spüren. Keine Kreditkarte erforderlich.",
  "pricing.faq.q2": "Was passiert mit meiner Stimme?",
  "pricing.faq.a2":
    "Draft bewahrt Ihren Ton und Ihre Sprache; Sie haben immer die Kontrolle. Unser Ton-Tutor lernt Ihren Stil.",
  "pricing.faq.q3": "Sind meine Nachrichten privat?",
  "pricing.faq.a3":
    "Ja. Wir verwenden Ihre Inhalte nicht zum Trainieren öffentlicher Modelle. Siehe unsere Datenschutzseite für Details.",
  "pricing.faq.q4": "Kann ich jederzeit kündigen?",
  "pricing.faq.a4":
    "Absolut - keine Vertragsbindung. Kündigen Sie mit einem Klick in Ihren Kontoeinstellungen.",
  "pricing.faq.q5": "Unterstützen Sie Schulen?",
  "pricing.faq.a5":
    "Ja - wir haben Team- und Bezirkspläne. Kontaktieren Sie den Vertrieb für Details.",

  // Footer CTA
  "pricing.cta.headline": "Bereit, Ihre Zeit zurückzugewinnen?",
  "pricing.cta.subheadline":
    "Schließen Sie sich Lehrkräften an, die 4-7 Stunden pro Woche sparen",
  "pricing.cta.button": "Starten Sie Ihre 7-tägige kostenlose Testversion",

  // Footer Features
  "footer.tagline":
    "Der Schreibpartner für Lehrkräfte. Überwinden Sie das leere Blatt, sparen Sie Stunden und behalten Sie die Kontrolle bei Eltern-E-Mails, Schülerberichten und Mitarbeiternotizen.",
  "footer.products.title": "Produkt & Ökosystem",
  "footer.products.features": "Funktionen",
  "footer.products.pricing": "Preise",
  "footer.products.teacherStories": "Lehrergeschichten",
  "footer.products.zazaTeach": "Zaza Teach",
  "footer.products.zazaDraft": "Zaza Draft",
  "footer.products.gradeFlow": "GradeFlow",
  "footer.products.zazaShield": "Zaza Shield",
  "footer.products.zazaTechnologies": "Zaza Technologies",
  "footer.learning.title": "Lernen & Ressourcen",
  "footer.learning.aiLiteracy": "KI-Kompetenz",
  "footer.learning.glossary": "Glossar",
  "footer.learning.webinars": "Webinare",
  "footer.learning.videoTutorials": "Video-Tutorials",
  "footer.learning.bestAiToolForParentEmails":
    "Bestes KI-Tool für Eltern-E-Mails",
  "footer.learning.reduceStressWritingParentMessages":
    "Reduzieren Sie Stress beim Schreiben von Elternnachrichten",
  "footer.learning.bestAiWritingToolsForTeachers2025":
    "Beste KI-Schreibtools für Lehrkräfte 2025",
  "footer.learning.aiForStudentReports": "KI für Schülerberichte",
  "footer.company.title": "Unternehmen",
  "footer.company.blog": "Blog",
  "footer.company.integrations": "Integrationen",
  "footer.company.community": "Community",
  "footer.company.successStories": "Erfolgsgeschichten",
  "footer.company.ambassadorProgram": "Botschafter-Programm",
  "footer.company.stateOfAIReport": "State of AI Bericht",
  "footer.company.teacherResources": "Lehrerressourcen",
  "footer.company.support": "Support",
  "footer.company.faq": "FAQ",
  "footer.company.about": "Über uns",
  "footer.company.privacy": "Datenschutz",
  "footer.company.terms": "Nutzungsbedingungen",
  "footer.company.contact": "Kontakt",
  "footer.builtBy": "Gebaut von Pädagogen, für Pädagogen.",
  "footer.copyright": "2025 Zaza Technologies. Alle Rechte vorbehalten.",
  "footer.languages.en": "EN",
  "footer.languages.de": "DE",
  "footer.languages.es": "ES",
  "footer.languages.fr": "FR",
  "footer.languages.it": "IT",

  // Navigation
  "nav.pricing": "Preise",
  "nav.products": "Produkte",
  "nav.learningCentre": "Learning Centre",
  "nav.resources": "Ressourcen",
  "nav.about": "Über uns",
  "nav.aboutUs": "Über uns",
  "nav.getStarted": "Jetzt starten",

  // About Company Page (German)
  "about.company.hero.label": "UNSER UNTERNEHMEN",
  "about.company.hero.headline": "Zaza Technologies",
  "about.company.hero.subheading":
    "Wir sind ein Team aus Pädagogen, Ingenieuren und Designern, die die Zukunft der Lehrertechnologie gestalten.",
  "about.company.origin.title": "Wie wir angefangen haben",
  "about.company.origin.p1":
    "Zaza Technologies wurde 2023 von Lehrkräften gegründet, die von generischen KI-Tools frustriert waren, die Bildung nicht verstanden. Wir sahen Lehrkräfte, die Stunden mit administrativen Schreibaufgaben verbrachten, die automatisiert werden könnten, aber bestehende KI-Tools waren entweder unsicher für Schülerdaten oder produzierten Ausgaben, die überhaupt nicht wie eine Lehrkraft klangen.",
  "about.company.origin.p2":
    "Also haben wir etwas anderes entwickelt: KI-Tools, die speziell auf pädagogische Kommunikation und Pädagogik trainiert sind. Tools, die die Nuancen der Eltern-Lehrer-Kommunikation, die Bedeutung konstruktiven Feedbacks und die Notwendigkeit verstehen, Ihre authentische Stimme zu bewahren. Tools, die halluzinationsfrei, FERPA-konform und von Grund auf für Bildung konzipiert sind.",
  "about.company.vision.title": "Unsere Vision",
  "about.company.vision.p1":
    "Heute dient Zaza über 500 Lehrkräften in 15 Ländern und spart ihnen über 10 Stunden pro Woche bei Schreibaufgaben. Aber wir fangen gerade erst an. Unsere Vision ist es, eine vollständige Suite von KI-Tools zu entwickeln, die Lehrkräften helfen, ihre Zeit zurückzugewinnen und sich auf das zu konzentrieren, was am wichtigsten ist: ihre Schüler.",
  "about.company.values.title": "Unsere Werte",
  "about.company.values.teacherFirst.title": "Lehrkräfte zuerst",
  "about.company.values.teacherFirst.description":
    "Jede Entscheidung, die wir treffen, beginnt mit einer Frage: Hilft dies Lehrkräften?",
  "about.company.values.trustSafety.title": "Vertrauen & Sicherheit",
  "about.company.values.trustSafety.description":
    "Schülerdatenschutz und Ausgabegenauigkeit sind nicht verhandelbar.",
  "about.company.values.authentic.title": "Authentische Stimme",
  "about.company.values.authentic.description":
    "Unsere KI bewahrt Ihren einzigartigen Kommunikationsstil und Ihr professionelles Urteilsvermögen.",
  "about.company.team.title": "Unser Team",
  "about.company.team.description":
    "Wir sind ein kleines Team aus Pädagogen, Lernwissenschaftlern und Ingenieuren, die glauben, dass Technologie Lehrkräften dienen sollte, nicht umgekehrt.",

  "about.company.stats.teachers.label": "Lehrkräfte nutzen Zaza",
  "about.company.stats.teachers.value": "500+",
  "about.company.stats.countries.label": "Länder",
  "about.company.stats.countries.value": "15",
  "about.company.stats.timeSaved.label": "Wöchentlich gesparte Stunden",
  "about.company.stats.timeSaved.value": "10+",

  // Founder Hero Section (German)
  "founder.hero.headline":
    "Lernen Sie den Gründer kennen, der KI für Lehrkräfte entwickelt",
  "founder.hero.subheading":
    "Ich habe über zwanzig Jahre im Bereich Lernen und Bildung gearbeitet - an Universitäten, in der Unternehmensbildung und im EdTech-Bereich. Eines war immer wahr: Unterrichten ist menschliche Arbeit.",
  "founder.hero.label": "GRÜNDER & CEO",
  "founder.hero.name": "Dr. Greg Blackburn",
  "founder.hero.tagline":
    "Gründer & CEO, Lernwissenschaftler, Lehrer-Befürworter",

  // Founder Journey Section (German)
  "founder.journey.title": "Meine Reise in der Bildung",
  "founder.journey.p1":
    "Während meiner Promotion in Berufspädagogik habe ich mich darauf konzentriert, wie Lernende kritisches Denken und Problemlösung in realen Umgebungen entwickeln. Ich habe gesehen, wie Technologie das Lernen unterstützen kann, wenn sie richtig eingesetzt wird. Ich habe aber auch gesehen, wie leicht sie Stress verursachen, Zeit verschwenden oder gegen das arbeiten kann, was Pädagogen erreichen wollen.",
  "founder.journey.p2":
    "Als Chief Learning Officer bei Communardo leite ich Arbeiten im Bereich KI-gestütztes Lerndesign, digitale Inhaltsentwicklung, LMS-Innovation und Lehrerfortbildung. Ich habe viel über Lernwissenschaft, eLearning-Strategie und die Rolle von KI in der Bildung geschrieben und gesprochen.",
  "founder.journey.p3":
    "Aber hier ist die Wahrheit: Die meisten EdTech-Tools sind nicht für Lehrkräfte gebaut. Sie sind für Verkaufsgespräche gebaut.",
  "founder.journey.p4":
    "Ich habe beobachtet, wie Technologie als 'revolutionär' verkauft wurde, nur um zu einem weiteren System zu werden, das Lehrkräfte verwalten müssen. Ich habe KI-Produkte gesehen, die Inhalte generieren, die auf den ersten Blick beeindruckend aussehen – aber zusammenbrechen, sobald eine Lehrkraft versucht, sie mit echten Schülern zu verwenden.",
  "founder.journey.p5": "Deshalb habe ich Zaza gebaut.",

  // Founder Principle Section (German)
  "founder.principle.title": "Das Prinzip hinter allem, was wir entwickeln",
  "founder.principle.question": "Gibt dies Lehrkräften wertvolle Zeit zurück?",
  "founder.principle.not1": "Nicht 'Ist das clever?'",
  "founder.principle.not2": "Nicht 'Lässt sich das gut demonstrieren?'",
  "founder.principle.not3": "Nicht 'Sieht das gut in einer Roadmap aus?'",
  "founder.principle.answer": "Zeit.",
  "founder.principle.rule":
    "Wenn ein Tool die Arbeitsbelastung in einer echten Schulumgebung nicht reduzieren kann, gehört es nicht in Zaza.",

  // Founder Commitments Section (German)
  "founder.commitments.title": "Meine Verpflichtungen gegenüber Lehrkräften",
  "founder.commitments.item1.title": "Keine Halluzinationen.",
  "founder.commitments.item1.body":
    "Wenn KI-Ausgaben nicht vertrauenswürdig sind, leisten Lehrkräfte am Ende mehr Arbeit bei der Überprüfung und Korrektur. Deshalb entwickeln wir für Genauigkeit, Klarheit und Klassenzimmerrealität.",
  "founder.commitments.item2.title":
    "Arbeitsbelastung reduzieren, nicht verlagern.",
  "founder.commitments.item2.body":
    "Ein Tool, das Schulungen, Handbücher und komplexe Arbeitsabläufe erfordert, ist keine Unterstützung. Es ist umbenannte Arbeit.",
  "founder.commitments.item3.title": "Professionelle Expertise respektieren.",
  "founder.commitments.item3.body":
    "Sie brauchen keine Technologie, die Ihr Urteilsvermögen ersetzt. Sie brauchen Technologie, die es verstärkt.",
  "founder.commitments.closing":
    "Unterrichten ist unglaublich komplexe, intellektuell anspruchsvolle Arbeit. Es ist auch emotional belastende Arbeit. Gute Tools sollten diese Last erleichtern.",

  // Founder Why Zaza Section (German)
  "founder.whyZaza.title": "Warum es Zaza gibt",
  "founder.whyZaza.p1":
    "Zaza versucht nicht, 'Bildung zu disruptieren.' Lehrkräfte brauchen keine Disruption. Sie brauchen Unterstützung. Sie brauchen Zeit. Sie brauchen Tools, die den Wert ihrer Erfahrung anerkennen – anstatt zu versuchen, sie zu standardisieren oder zu ersetzen.",
  "founder.whyZaza.p2":
    "Die Arbeit, die Lehrkräfte leisten, ist wichtig. Und das Beste, was Technologie tun kann, ist zu helfen, die Zeit, Energie und Fürsorge zu schützen, die erforderlich sind, um diese Arbeit gut zu machen.",
  "founder.whyZaza.p3":
    "Wenn das die Art von Zukunft für Bildung ist, an die Sie glauben, sind Sie hier richtig.",

  // Founder Closing (German)
  "founder.closing.name": "Greg",
  "founder.closing.title": "Dr. Greg Blackburn",
  "founder.closing.role": "Gründer & CEO, Zaza Technologies",
  "founder.personal.cta": "Kontakt aufnehmen",

  // Additional Founder Keys (German - for page compatibility)
  "founder.journey.quote":
    "Ich habe Zaza entwickelt, weil ich es satt hatte, Lehrkräfte in administrativer Arbeit ertrinken zu sehen, wenn Technologie sie befreien sollte.",
  "founder.mission.quote":
    "Jede Lehrkraft verdient Tools, die ihre Expertise respektieren, ihre Schüler schützen und ihnen Zeit geben, das zu tun, was sie am besten können: unterrichten.",
  "founder.mission.attribution": "Dr. Greg Blackburn, Gründer & CEO",
  "founder.whyZaza.subtitle": "Drei Prinzipien, die alles leiten, was wir tun",
  "founder.whyZaza.card1.title": "Für Lehrkräfte, mit Lehrkräften",
  "founder.whyZaza.card1.body":
    "Ich habe meine Karriere damit verbracht, mit Lehrkräften und Lerndesignern zusammenzuarbeiten - Tools direkt mit Pädagogen zu verfeinern, die die Realität von Klassenzimmern verstehen. Jede Funktion in Zaza wird durch echtes Feedback und echte Praxis geformt, nicht durch Theorie.",
  "founder.whyZaza.card2.title": "Boutique, nicht Big Tech",
  "founder.whyZaza.card2.body":
    "Wir sind kein riesiges Unternehmen, das an jeden verkaufen will. Wir sind ein fokussiertes Team, das spezialisierte Tools für ein Publikum entwickelt: Lehrkräfte. Ihre Bedürfnisse stehen immer an erster Stelle.",
  "founder.whyZaza.card3.title": "Ein Vermächtnis aufbauen",
  "founder.whyZaza.card3.body":
    "Es geht nicht um schnelle Gewinne. Es geht darum, etwas zu schaffen, das Lehrkräften wirklich hilft zu gedeihen und Bildung zum Besseren verändert. Das ist das Vermächtnis, das ich hinterlassen möchte.",
  // Founder Personal Message Section (German)
  "founder.personal.title": "Eine persönliche Notiz",
  "founder.personal.message1":
    "Wenn Sie dies lesen, sind Sie wahrscheinlich eine Lehrkraft, die neugierig auf KI ist, aber skeptisch, ob sie wirklich helfen kann. Ich verstehe das. Ich war auch skeptisch. Die meisten KI-Tools fühlen sich an, als wären sie von Menschen entwickelt worden, die nie einen Fuß in ein Klassenzimmer gesetzt haben.",
  "founder.personal.message2":
    "Deshalb habe ich Zaza anders entwickelt. Jede Funktion wird mit echten Lehrkräften entwickelt, in echten Klassenzimmern getestet und basierend auf echtem Feedback verfeinert. Wir entwickeln nicht nur Software - wir bauen Partnerschaften mit Pädagogen auf, die uns helfen, Tools zu erstellen, die wirklich funktionieren.",
  "founder.personal.message3":
    "Ich würde gerne von Ihnen hören. Ob Sie Fragen, Feedback haben oder einfach nur über Bildung und Technologie sprechen möchten, meine Tür steht immer offen. Lassen Sie uns gemeinsam die Zukunft der Lehrertechnologie gestalten.",
  "founder.personal.name": "",
  "founder.personal.title2": "Dr. Greg Blackburn",
  "founder.personal.company": "Zaza Technologies",

  // Company Page (German) - NEW CREDIBILITY-PROTECTED VERSION
  "company.hero.label": "UNSER UNTERNEHMEN",
  "company.hero.headline": "Zaza Technologies",
  "company.hero.subheading":
    "Wir sind ein kleines, spezialisiertes Team aus Lerndesignern, Ingenieuren und Bildungsforschern, die Technologie entwickeln, die Lehrkräften hilft, erfolgreich zu sein.",

  "company.origin.p1":
    "Zaza Technologies wurde 2023 mit einer klaren Überzeugung gegründet: Bildung verdient KI-Tools, die auf echtem pädagogischem Verständnis basieren, nicht auf umfunktionierten Unternehmens-KI-Modellen. Im Laufe unserer Karrieren im Bereich Lernen und Bildung haben wir immer wieder dasselbe Muster gesehen - Technologie, die versprach, die Arbeitsbelastung zu reduzieren, führte oft zu noch mehr Arbeit.",
  "company.origin.p2": "Also haben wir einen anderen Ansatz gewählt.",
  "company.origin.p3":
    "Wir entwickeln Tools, die auf echter Pädagogik trainiert, mit Lehrkräften entwickelt und durch den Einsatz im Klassenzimmer verfeinert werden. Tools, die die Nuancen des Lehrerurteils, das emotionale Gewicht der Kommunikation und die Bedeutung konstruktiven Feedbacks verstehen. Tools, die genau, zuverlässig und sicher für Bildungseinrichtungen sind.",
  "company.origin.p4":
    "Unser Ziel ist einfach: Lehrkräften bedeutsame Zeit zurückgeben.",

  "company.philosophy.title": "Unsere Philosophie",
  "company.philosophy.intro":
    'Wir glauben nicht an "KI, die Lehrkräfte ersetzt." Wir glauben an KI, die Lehrkräfte unterstützt.',
  "company.philosophy.principle1":
    "Tools müssen die Expertise von Lehrkräften respektieren.",
  "company.philosophy.principle2":
    "Tools müssen die Arbeitsbelastung reduzieren, nicht verlagern.",
  "company.philosophy.principle3":
    "Tools müssen Schüler und deren Lernumgebung schützen.",
  "company.philosophy.principle4":
    "Tools müssen vertrauenswürdig und transparent sein.",
  "company.philosophy.closing":
    "Wenn Technologie Lehrkräften nicht dabei hilft, das zu tun, was sie am besten können - unterrichten - dann gehört sie nicht ins Klassenzimmer.",

  "company.boutique.title": "Ein Boutique-Ansatz",
  "company.boutique.intro":
    "Wir sind bewusst kein großes Technologieunternehmen. Wir sind ein fokussiertes Team, das ausschließlich für ein Publikum entwickelt - Lehrkräfte.",
  "company.boutique.means": "Das bedeutet:",
  "company.boutique.point1":
    "Wir arbeiten eng mit Lehrkräften in verschiedenen Regionen und Kontexten zusammen.",
  "company.boutique.point2":
    "Wir testen Funktionen direkt in echten Klassenzimmern.",
  "company.boutique.point3":
    "Wir priorisieren Klarheit, Sicherheit und Benutzerfreundlichkeit über Neuheit.",
  "company.boutique.closing":
    "Wir optimieren nicht für schnelles Wachstum. Wir optimieren dafür, was funktioniert.",

  "company.today.title": "Wo wir heute stehen",
  "company.today.p1":
    "Zaza unterstützt mittlerweile über 500 Lehrkräfte in mehr als 15 Ländern. Im Durchschnitt sparen Lehrkräfte über 10 Stunden pro Woche bei Schreib- und Kommunikationsaufgaben durch die Nutzung von Zaza-Tools. Und wir fangen gerade erst an.",
  "company.today.p2":
    "Unsere langfristige Vision ist es, eine vollständige Suite von KI-Tools zu entwickeln, die Lehrkräften helfen, ihre Zeit zurückzugewinnen, ihr Wohlbefinden zu schützen und mit dem Kern ihrer Arbeit verbunden zu bleiben - ihren Schülern.",

  "company.stats.teachers.number": "500+",
  "company.stats.teachers.label": "Lehrkräfte nutzen Zaza",
  "company.stats.countries.number": "15",
  "company.stats.countries.label": "Länder",
  "company.stats.hours.number": "10+",
  "company.stats.hours.label": "Wöchentlich gesparte Stunden",

  // Contact Page (German)
  "contact.title": "Kontakt aufnehmen",
  "contact.subtitle":
    "Haben Sie Fragen? Möchten Sie mehr erfahren? Wir freuen uns, von Ihnen zu hören.",
  "contact.form.name": "Ihr Name",
  "contact.form.email": "Ihre E-Mail",
  "contact.form.message": "Ihre Nachricht",
  "contact.form.placeholder": "Sagen Sie uns, wie wir helfen können...",
  "contact.form.submit": "Nachricht senden",
  "contact.form.dataNote":
    "Wir respektieren Ihre Privatsphäre. Ihre Informationen werden niemals weitergegeben.",
  "contact.direct.title": "Direkter Kontakt",
  "contact.direct.email": "E-Mail an uns",
  "contact.direct.response":
    "Wir antworten normalerweise innerhalb von 24 Stunden",
  "contact.help.title": "Brauchen Sie Hilfe?",
  "contact.help.description":
    "Schauen Sie sich unsere hilfreichen Ressourcen an",
  "contact.help.faq": "→ Häufig gestellte Fragen",
  "contact.help.support": "→ Support-Center",
};

const translationsEs: Record<string, string> = {};

const translationsFr: Record<string, string> = {};

const translationsIt: Record<string, string> = {};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translations = {
      en: translationsEn,
      de: translationsDe,
      es: translationsEs,
      fr: translationsFr,
      it: translationsIt,
    };

    return translations[language][key] || translationsEn[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
