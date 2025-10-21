"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "de" | "es" | "fr" | "it"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translationsEn: Record<string, string> = {
  // Pricing Page (EN)
  "pricing.hero.preheadline": "PRICING",
  "pricing.hero.headline": "Simple plans built for teachers",
  "pricing.hero.subheadline": "Start free, upgrade anytime. Cancel anytime.",
  "pricing.trust.teachers": "Trusted by 500+ teachers",
  "pricing.trust.ferpa": "FERPA-compliant",
  "pricing.trust.cancel": "Cancel anytime",
  "pricing.trust.noCard": "No credit card required",
  "pricing.toggle.monthly": "Monthly",
  "pricing.toggle.annual": "Annual",
  "pricing.toggle.save": "Save 2 months",

  // Pricing - Free
  "pricing.free.badge": "FREE",
  "pricing.free.title": "Starter",
  "pricing.free.description": "Everything you need to try Draft and save time today.",
  "pricing.free.price": "$0",
  "pricing.free.period": "/ forever",
  "pricing.free.cta": "Start Free",
  "pricing.free.upgradeText": "Upgrade anytime for more power",
  "pricing.free.featuresTitle": "What’s included",
  "pricing.free.feature1": "AI writing for emails, reports, feedback",
  "pricing.free.feature2": "5 refinements per day",
  "pricing.free.feature3": "4 tone options (supportive, formal, concise, neutral)",
  "pricing.free.feature4": "Translate to 20+ languages",
  "pricing.free.feature5": "Copy, download, and share",
  "pricing.free.feature6": "Basic templates",
  "pricing.free.limitation": "Best for trying Draft and light usage",

  // Pricing - Premium
  "pricing.premium.badge": "MOST POPULAR",
  "pricing.premium.title": "Premium",
  "pricing.premium.description": "Unlimited, hallucination-safe writing with pro tools for teachers.",
  "pricing.premium.priceMonthly": "$12/mo",
  "pricing.premium.priceAnnual": "$120/yr",
  "pricing.premium.period": "Cancel anytime",
  "pricing.premium.annualTotal": "Billed annually",
  "pricing.premium.savings": "Save 2 months",
  "pricing.premium.cta": "Start 7‑day Free Trial",
  "pricing.premium.trial": "No credit card required",
  "pricing.premium.guarantee": "30‑day money‑back guarantee",
  "pricing.premium.timeSaving": "Save 10+ hours every week",
  "pricing.premium.featuresTitle": "Everything in Free, plus",
  "pricing.premium.feature1": "Unlimited drafts and refinements",
  "pricing.premium.feature2": "Advanced tone and style controls",
  "pricing.premium.feature3": "Custom templates and comment banks",
  "pricing.premium.feature4": "Reusable snippets and favorites",
  "pricing.premium.feature5": "Hallucination‑safe outputs by design",
  "pricing.premium.feature6": "PDF/DOCX export and version history",
  "pricing.premium.feature7": "Priority email support",
  "pricing.premium.roiTitle": "Real‑world time savings",
  "pricing.premium.roiText": "Teachers report saving 10+ hours per week on writing tasks.",

  // Pricing - Team
  "pricing.team.badge": "FOR SCHOOLS",
  "pricing.team.title": "Team & Schools",
  "pricing.team.description": "Collaboration, administration, and support for departments and districts.",
  "pricing.team.price": "Custom",
  "pricing.team.period": "Per school or district",
  "pricing.team.starting": "Volume pricing available",
  "pricing.team.cta": "Contact Sales",
  "pricing.team.featuresTitle": "Includes everything in Premium, plus",
  "pricing.team.feature1": "Admin dashboard and seat management",
  "pricing.team.feature2": "Shared templates and libraries",
  "pricing.team.feature3": "Team tone presets and consistency",
  "pricing.team.feature4": "Usage analytics and reporting",
  "pricing.team.feature5": "SSO and role permissions",
  "pricing.team.feature6": "Priority support and onboarding",
  "pricing.team.feature7": "Volume pricing",
  "pricing.team.roi": "Raise consistency and save staff hours across teams",

  // Pricing - Bundle highlight
  "pricing.bundle.badge": "BEST VALUE",
  "pricing.bundle.title": "Draft + Teach + GradeFlow",
  "pricing.bundle.description": "Everything you need for writing, planning, and grading.",
  "pricing.bundle.price": "$199/yr",
  "pricing.bundle.originalPrice": "$276/yr",
  "pricing.bundle.savings": "Save $77 when bundled",
  "pricing.bundle.cta": "Get the Bundle",

  // Pricing - Comparison
  "pricing.comparison.title": "Compare plans",
  "pricing.comparison.features": "Features",
  "pricing.comparison.free": "Free",
  "pricing.comparison.premium": "Premium",
  "pricing.comparison.popular": "Most popular",
  "pricing.comparison.team": "Team",
  "pricing.comparison.row1.feature": "Drafts per month",
  "pricing.comparison.row1.free": "Limited",
  "pricing.comparison.row1.premium": "Unlimited",
  "pricing.comparison.row1.team": "Unlimited",
  "pricing.comparison.row2.feature": "Tone options",
  "pricing.comparison.row2.free": "4",
  "pricing.comparison.row2.premium": "Advanced",
  "pricing.comparison.row2.team": "Advanced",
  "pricing.comparison.row3.feature": "Templates",
  "pricing.comparison.row3.free": "Basic",
  "pricing.comparison.row3.premium": "Custom",
  "pricing.comparison.row3.team": "Shared + Custom",
  "pricing.comparison.row4.feature": "Exports",
  "pricing.comparison.row4.free": "Copy",
  "pricing.comparison.row4.premium": "PDF/DOCX",
  "pricing.comparison.row4.team": "PDF/DOCX",
  "pricing.comparison.row5.feature": "Comment banks",
  "pricing.comparison.row5.free": "—",
  "pricing.comparison.row5.premium": "Personal",
  "pricing.comparison.row5.team": "Team shared",
  "pricing.comparison.row6.feature": "Admin tools",
  "pricing.comparison.row6.free": "—",
  "pricing.comparison.row6.premium": "—",
  "pricing.comparison.row6.team": "Seats, SSO, roles",
  "pricing.comparison.row7.feature": "Support",
  "pricing.comparison.row7.free": "Community",
  "pricing.comparison.row7.premium": "Priority email",
  "pricing.comparison.row7.team": "Priority + onboarding",
  "pricing.comparison.row8.feature": "Pricing",
  "pricing.comparison.row8.free": "$0",
  "pricing.comparison.row8.premium": "$12/mo",
  "pricing.comparison.row8.team": "Custom",
  "pricing.comparison.ctaFree": "Get Free",
  "pricing.comparison.ctaPremium": "Start Free Trial",
  "pricing.comparison.ctaTeam": "Contact Sales",

  // Pricing - FAQ
  "pricing.faq.title": "Pricing & billing FAQs",
  "pricing.faq.q1": "Is there a free plan?",
  "pricing.faq.a1": "Yes. The Free plan is great for trying Draft and light usage.",
  "pricing.faq.q2": "Can I cancel anytime?",
  "pricing.faq.a2": "Absolutely. You can cancel from your account settings at any time.",
  "pricing.faq.q3": "Do you offer a trial?",
  "pricing.faq.a3": "Premium includes a 7‑day free trial with no credit card required.",
  "pricing.faq.q4": "What’s included in Premium?",
  "pricing.faq.a4": "Unlimited drafting, advanced tone controls, templates, exports, and priority support.",
  "pricing.faq.q5": "Do you have team pricing?",
  "pricing.faq.a5": "Yes. Contact us for school and district pricing with admin tools.",
  "pricing.faq.q6": "Is Zaza Draft FERPA‑compliant?",
  "pricing.faq.a6": "Yes. Zaza Draft is designed to protect student privacy and data.",
  "pricing.faq.q7": "Can I use Draft in other languages?",
  "pricing.faq.a7": "Yes. Translate to 20+ languages while keeping the right tone.",
  "pricing.faq.q8": "Do you offer refunds?",
  "pricing.faq.a8": "We offer a 30‑day money‑back guarantee on Premium.",

  // Pricing - Testimonials
  "pricing.testimonials.title": "What teachers say about pricing",
  "pricing.testimonials.author1": "Elena M., Primary Teacher",
  "pricing.testimonials.quote1": "Premium pays for itself in the first week I use it.",
  "pricing.testimonials.author2": "David R., High School",
  "pricing.testimonials.quote2": "The time savings make the annual plan a no‑brainer.",
  "pricing.testimonials.author3": "Julia K., Middle School",
  "pricing.testimonials.quote3": "Our department bundle streamlined planning and grading.",

  // Pricing - Final CTA
  "pricing.finalCta.title": "Ready to save hours every week?",
  "pricing.finalCta.subtitle": "Start free today or talk to our team.",
  "pricing.finalCta.primary": "Start Free",
  "pricing.finalCta.secondary": "Book a Demo",
  "pricing.finalCta.trust": "Hallucination‑safe • FERPA‑compliant • Built for teachers",

  // Pricing - Decision Tool section
  "pricing.decision.title": "Not Sure Which Plan to Choose?",
  "pricing.decision.subtitle": "Take our quick quiz to get a personalized recommendation",
  // Navigation
  "nav.home": "Home",
  "nav.pricing": "Pricing",
  "nav.products": "Products",
  "nav.products.teach": "Zaza Teach",
  "nav.products.draft": "Zaza Draft",
  "nav.products.gradeflow": "GradeFlow",
  "nav.products.shield": "Zaza Shield",
  "nav.learningCentre": "Learning Centre",
  "nav.resources": "Resources",
  "nav.faq": "FAQ",
  "nav.about": "About",
  "nav.getStarted": "Get Started",

  "about.nav.title": "About",
  "about.nav.company": "Company",
  "about.nav.founder": "Founder",
  "about.nav.press": "Press Kit",
  "about.nav.careers": "Careers",

  // Hero Section
  "hero.eyebrow": "FOR TEACHERS",
  "hero.badge": "Hallucination-safe AI for teachers",
  "hero.headline": "Write like you",
  "hero.headlineAccent": "just faster.",
  "hero.subheading":
    "AI writing assistant that helps teachers craft parent emails, student reports, and grading comments in minutes, not hours.",
  "hero.ctaPrimary": "Start Writing Free",
  "hero.ctaSecondary": "See Examples",
  "hero.trustIndicators.hallucinationSafe": "Hallucination-safe",
  "hero.trustIndicators.ferpaCompliant": "FERPA compliant",
  "hero.trustIndicators.teachers": "500+ teachers",

  // Hallucination-Safe Tooltip
  "hallucinationSafe.tooltip.heading": "What does hallucination-safe mean?",
  "hallucinationSafe.tooltip.body":
    "Unlike generic AI tools, Zaza Draft is specifically trained to avoid making up student information, fabricating parent interactions, or inventing details about your class. Every output is grounded in what you actually provide - no invented facts, no fictional scenarios.",

  // Problem Section
  "problem.heading": "Teachers spend 10+ hours per week on writing tasks",
  "problem.body":
    "The challenge isn't what to say - it's finding the time and right words to say it professionally while maintaining your authentic voice.",
  "problem.stats.parentEmails.value": "2-3 hrs/week",
  "problem.stats.parentEmails.label": "Parent Emails",
  "problem.stats.reportCards.value": "4-6 hrs/term",
  "problem.stats.reportCards.label": "Report Cards",
  "problem.stats.gradingFeedback.value": "1-2 hrs/week",
  "problem.stats.gradingFeedback.label": "Grading Feedback",

  // Solution/Mission Section
  "solution.heading": "The first AI suite built specifically for teacher communications",
  "solution.bodyPrimary":
    "Zaza is the world's first teacher-first AI suite - built on real pedagogy, powered by a trusted assistant, and designed not just to save time but to help teachers thrive.",
  "solution.bodySecondary":
    "Trained on real pedagogy and teacher language - not business writing. Every output maintains your authentic voice while saving hours on parent emails, report cards, and feedback comments.",

  // Stats Section
  "stats.documentsRefined.number": "150k+",
  "stats.documentsRefined.label": "Documents Refined",
  "stats.teachers.number": "500+",
  "stats.teachers.label": "Teachers",
  "stats.timeSaved.number": "10+ hrs",
  "stats.timeSaved.label": "Saved Weekly",
  "stats.subtitle": "Trusted by 500+ teachers using Zaza Draft to save 10+ hours every week.",

  // How It Works Section
  "howItWorks.heading": "How it works",
  "howItWorks.diagram.step1.title": "Your Input",
  "howItWorks.diagram.step1.description": "Rough notes or bullet points",
  "howItWorks.diagram.step1.example": "Sam is not paying attention in class.",
  "howItWorks.diagram.step2.title": "Tone Selection",
  "howItWorks.diagram.step2.description": "Choose your voice",
  "howItWorks.diagram.step2.example": "Supportive, Formal, Concise, or Neutral",
  "howItWorks.diagram.step3.title": "Polished Output",
  "howItWorks.diagram.step3.description": "Teacher-ready communication",
  "howItWorks.diagram.step3.example": "I wanted to reach out regarding Sam's recent focus challenges...",
  "howItWorks.steps.step1.number": "1",
  "howItWorks.steps.step1.title": "Paste your draft or describe what you need",
  "howItWorks.steps.step1.description": "Start with rough notes, bullet points, or a full draft",
  "howItWorks.steps.step2.number": "2",
  "howItWorks.steps.step2.title": "Choose your tone and watch Draft refine it",
  "howItWorks.steps.step2.description": "Supportive, formal, concise, or neutral - always editable",
  "howItWorks.steps.step3.number": "3",
  "howItWorks.steps.step3.title": "Export & share",
  "howItWorks.steps.step3.description": "Copy, download, or share to your school tools with one click",

  // Demo Section
  "demo.heading": "See Draft in Action",
  "demo.tabs.parentEmail": "Parent Email",
  "demo.tabs.reportCard": "Report Card",
  "demo.tabs.gradingComment": "Grading Comment",
  "demo.before.label": "BEFORE (YOUR DRAFT)",
  "demo.toneSelector": "Tone: Supportive",
  "demo.ctaButton": "Rewrite",
  "demo.after.label": "AFTER (DRAFT'S VERSION)",
  "demo.tryItYourself": "Try It Yourself",
  "demo.testimonial.quote": "I got my Sunday back. Draft turns hours into minutes.",
  "demo.testimonial.name": "Sarah Mitchell",
  "demo.testimonial.author": "Year 5 Teacher, UK",
  "demo.email.before": "Sam is not paying attention in class.",
  "demo.email.after":
    "I wanted to reach out regarding Sam's recent focus challenges in class. I've noticed they're working hard but facing some difficulties staying engaged during lessons. I'd love to schedule a brief conversation to discuss strategies we can use both at school and at home to support their learning. Would you be available for a quick call this week?",
  "demo.report.before": "Good student, tries hard, needs to participate more.",
  "demo.report.after":
    "Sam demonstrates consistent effort and a positive attitude toward learning. They show strong understanding of core concepts and complete assignments thoughtfully. To further develop their skills, I encourage Sam to share their ideas more frequently during class discussions, as their insights would greatly benefit our learning community.",
  "demo.grading.before": "Essay is okay but needs work on thesis and evidence.",
  "demo.grading.after":
    "Your essay shows good understanding of the topic and includes relevant examples. To strengthen your argument, consider developing a more specific thesis statement in your introduction. Additionally, try incorporating direct quotes from the text to support your analysis. I'd like to see you expand on your ideas in the third paragraph. Great start!",

  // Use Cases Section
  "useCases.heading": "Built for your everyday writing tasks",
  "useCases.cards.parentMessages.title": "Parent Messages",
  "useCases.cards.parentMessages.description": "Rewrite sensitive emails with the right tone",
  "useCases.cards.parentMessages.examples": "Behavior concerns, progress updates, attendance issues",
  "useCases.cards.reportCards.title": "Report Cards",
  "useCases.cards.reportCards.description": "Transform bullet points into meaningful narratives",
  "useCases.cards.reportCards.examples": "Term reports, progress summaries, intervention plans",
  "useCases.cards.gradingComments.title": "Grading Comments",
  "useCases.cards.gradingComments.description": "Generate constructive feedback faster",
  "useCases.cards.gradingComments.examples": "Criterion-based comments, rubric feedback",
  "useCases.cards.schoolCommunications.title": "School Communications",
  "useCases.cards.schoolCommunications.description": "Draft newsletters and announcements professionally",
  "useCases.cards.schoolCommunications.examples": "Updates, event notices, policy communications",
  "useCases.cards.referenceLetters.title": "Reference Letters",
  "useCases.cards.referenceLetters.description": "Write compelling recommendations confidently",
  "useCases.cards.referenceLetters.examples": "College references, job recommendations",
  "useCases.cards.documentation.title": "Documentation",
  "useCases.cards.documentation.description": "Create clear records and meeting notes",
  "useCases.cards.documentation.examples": "IEP documentation, parent conferences",

  // Comparison Section
  "comparison.heading": "Why Teachers Trust Zaza Over Generic AI",
  "comparison.subheading": "Built specifically for education, not adapted from business tools",
  "comparison.tableHeaders.feature": "Feature",
  "comparison.tableHeaders.genericAI": "Generic AI Tools (ChatGPT, etc.)",
  "comparison.tableHeaders.zazaDraft": "Zaza Draft",
  "comparison.rows.training.feature": "Training",
  "comparison.rows.training.generic": "General knowledge, business-focused",
  "comparison.rows.training.zaza": "Trained on real teacher communications & pedagogy",
  "comparison.rows.safety.feature": "Safety",
  "comparison.rows.safety.generic": "May invent student details or scenarios",
  "comparison.rows.safety.zaza": "Hallucination-safe - never fabricates information",
  "comparison.rows.toneControl.feature": "Tone Control",
  "comparison.rows.toneControl.generic": "Limited or inconsistent",
  "comparison.rows.toneControl.zaza": "4+ education-specific tones",
  "comparison.rows.compliance.feature": "Compliance",
  "comparison.rows.compliance.generic": "Not FERPA-designed",
  "comparison.rows.compliance.zaza": "FERPA-compliant by design",
  "comparison.rows.useCases.feature": "Use Cases",
  "comparison.rows.useCases.generic": "Generic writing tasks",
  "comparison.rows.useCases.zaza": "6 specialized teacher workflows",
  "comparison.rows.outputQuality.feature": "Output Quality",
  "comparison.rows.outputQuality.generic": "Requires heavy editing",
  "comparison.rows.outputQuality.zaza": "Teacher-ready in minutes",
  "comparison.rows.learningCurve.feature": "Learning Curve",
  "comparison.rows.learningCurve.generic": "Complex prompting needed",
  "comparison.rows.learningCurve.zaza": "Paste, select tone, done",
  "comparison.rows.community.feature": "Community",
  "comparison.rows.community.generic": "No teacher support",
  "comparison.rows.community.zaza": "500+ educators sharing best practices",

  // Why Choose Section
  "whyChoose.heading": "Why teachers choose Zaza",
  "whyChoose.benefits.beatWritersBlock.title": "Beat writer's block",
  "whyChoose.benefits.beatWritersBlock.description": "Start with AI, finish with your authentic voice",
  "whyChoose.benefits.writeWithConfidence.title": "Write with confidence",
  "whyChoose.benefits.writeWithConfidence.description": "Professional quality across all communications",
  "whyChoose.benefits.saveTime.title": "Save hours every week",
  "whyChoose.benefits.saveTime.description": "2-hour tasks done in 5 minutes",
  "whyChoose.benefits.breakBarriers.title": "Break language barriers",
  "whyChoose.benefits.breakBarriers.description": "Translate to 20+ languages instantly",

  // Testimonials Section
  "testimonials.heading": "What teachers say",
  "testimonials.quote1.text": "I got my Sunday back. Draft turns hours into minutes.",
  "testimonials.quote1.name": "Sarah Mitchell",
  "testimonials.quote1.author": "Year 5 Teacher, UK",
  "testimonials.quote2.text": "Comments are consistent and kind.",
  "testimonials.quote2.name": "Marcus Johnson",
  "testimonials.quote2.author": "Middle School Teacher, US",
  "testimonials.quote3.text": "GradeFlow helps our team agree on standards.",
  "testimonials.quote3.name": "Dr. Anna Weber",
  "testimonials.quote3.author": "Department Lead, DE",

  // Final CTA Section
  "finalCTA.heading": "Get your time back",
  "finalCTA.subheading": "Join 500+ teachers using Zaza Draft to save 10+ hours every week.",
  "finalCTA.button": "Start Writing Free",

  // Footer
  "footer.social.tiktok": "Follow us on TikTok @zazatechnologies",
  "footer.social.twitter": "Follow us on X (Twitter) @zazateachapp",
  "footer.social.linkedin": "Connect with us on LinkedIn",
  "footer.productEcosystem": "Product & Ecosystem",
  "footer.learningResources": "Learning & Resources",
  "footer.company": "Company",
  "footer.features": "Features",
  "footer.pricing": "Pricing",
  "footer.teacherStories": "Teacher Stories",
  "footer.zazaTeach": "Zaza Teach",
  "footer.zazaDraft": "Zaza Draft",
  "footer.gradeflow": "GradeFlow",
  "footer.zazaShield": "Zaza Shield",
  "footer.zazaTech": "Zaza Technologies",
  "footer.blog": "Blog",
  "footer.teacherResources": "Teacher Resources",
  "footer.support": "Support",
  "footer.faq": "FAQ",
  "footer.about": "About",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "footer.contact": "Contact",

  // Products - Teach
  "products.teach.hero.eyebrow": "LESSON PLANNING MADE EASY",
  "products.teach.hero.title": "Plan Better Lessons in Less Time",
  "products.teach.hero.subtitle":
    "AI-powered lesson planning that adapts to your curriculum, saves hours of prep time, and helps you create engaging, standards-aligned lessons.",
  "products.teach.hero.cta.primary": "Start Planning Free",
  "products.teach.hero.cta.secondary": "See Demo",

  "products.teach.turn.pain1": "Spending hours every week creating lesson plans from scratch",
  "products.teach.turn.pain2": "Struggling to differentiate for diverse learners",
  "products.teach.turn.pain3": "Losing time to administrative tasks instead of teaching",

  "products.teach.features.title": "Everything You Need to Plan Great Lessons",
  "products.teach.features.autoplanner.title": "Auto-Planner",
  "products.teach.features.autoplanner.desc":
    "Generate complete lesson plans aligned to your curriculum standards in minutes",
  "products.teach.features.curriculum.title": "Curriculum-Aligned",
  "products.teach.features.curriculum.desc":
    "Built-in support for Common Core, state standards, and international curricula",
  "products.teach.features.gamified.title": "Gamified Activities",
  "products.teach.features.gamified.desc": "Create engaging, interactive activities that keep students motivated",

  "products.teach.howItWorks.title": "How It Works",
  "products.teach.howItWorks.step1.title": "Set Your Goals",
  "products.teach.howItWorks.step1.desc": "Tell us your subject, grade level, and learning objectives",
  "products.teach.howItWorks.step2.title": "AI Generates Plan",
  "products.teach.howItWorks.step2.desc": "Get a complete, standards-aligned lesson plan in seconds",
  "products.teach.howItWorks.step3.title": "Customize & Teach",
  "products.teach.howItWorks.step3.desc": "Edit, save, and share your lessons with your team",

  "products.teach.whoItsFor.title": "Perfect For",
  "products.teach.whoItsFor.item1": "Teachers who want to save time on lesson planning",
  "products.teach.whoItsFor.item2": "Educators looking to differentiate instruction more effectively",
  "products.teach.whoItsFor.item3": "Schools seeking consistent, standards-aligned curriculum",

  "products.teach.change.title": "Transform Your Planning Process",
  "products.teach.change.step1": "Reduce planning time from hours to minutes",
  "products.teach.change.step2": "Create more engaging, differentiated lessons",
  "products.teach.change.step3": "Ensure alignment with curriculum standards",
  "products.teach.change.step4": "Share and collaborate with your teaching team",

  "products.teach.social.title": "What Teachers Say",
  "products.teach.social.quote1": "Teach has cut my planning time in half. I can focus on what matters - my students.",
  "products.teach.social.author1": "Emma Thompson, 4th Grade Teacher",
  "products.teach.social.quote2": "The curriculum alignment feature is a game-changer for our department.",
  "products.teach.social.author2": "Michael Chen, Department Head",

  "products.teach.cta.title": "Ready to Transform Your Planning?",
  "products.teach.cta.subtitle": "Join hundreds of teachers saving 10+ hours per week",
  "products.teach.cta.primary": "Start Free Trial",
  "products.teach.cta.secondary": "Schedule Demo",

  // Products - Draft
  "products.draft.hero.eyebrow": "AI WRITING ASSISTANT FOR TEACHERS",
  "products.draft.hero.title": "Write Better, Faster",
  "products.draft.hero.subtitle":
    "Transform rough notes into polished parent emails, report cards, and feedback in minutes. Maintain your voice while saving hours every week.",
  "products.draft.hero.cta.primary": "Start Writing Free",
  "products.draft.hero.cta.secondary": "See Examples",

  "products.draft.turn.pain1": "Spending 2-3 hours per week writing parent emails",
  "products.draft.turn.pain2": "Struggling to find the right tone for sensitive communications",
  "products.draft.turn.pain3": "Writing the same feedback comments over and over",

  "products.draft.features.title": "Built for Teacher Communications",
  "products.draft.features.toneGuardrails.title": "Tone Guardrails",
  "products.draft.features.toneGuardrails.desc":
    "Choose from supportive, formal, concise, or neutral tones - always professional",
  "products.draft.features.translationChecks.title": "Translation Checks",
  "products.draft.features.translationChecks.desc": "Communicate with families in 20+ languages with confidence",
  "products.draft.features.reviewSteps.title": "Review Steps",
  "products.draft.features.reviewSteps.desc": "Built-in review process ensures accuracy before sending",

  "products.draft.howItWorks.title": "How It Works",
  "products.draft.howItWorks.step1.title": "Paste Your Notes",
  "products.draft.howItWorks.step1.desc": "Start with bullet points or a rough draft",
  "products.draft.howItWorks.step2.title": "Choose Your Tone",
  "products.draft.howItWorks.step2.desc": "Select the right voice for your message",
  "products.draft.howItWorks.step3.title": "Review & Send",
  "products.draft.howItWorks.step3.desc": "Edit if needed, then copy or export",

  "products.draft.whoItsFor.title": "Perfect For",
  "products.draft.whoItsFor.item1": "Teachers writing parent communications",
  "products.draft.whoItsFor.item2": "Educators creating report card comments",
  "products.draft.whoItsFor.item3": "Schools needing consistent, professional messaging",

  "products.draft.change.title": "What Changes With Draft",
  "products.draft.change.step1": "2-hour tasks done in 5 minutes",
  "products.draft.change.step2": "Consistent, professional tone across all communications",
  "products.draft.change.step3": "Confidence in sensitive conversations",
  "products.draft.change.step4": "More time for teaching, less time writing",

  "products.draft.techNote.title": "Hallucination-Safe:",
  "products.draft.techNote.body":
    "Unlike generic AI, Draft never invents student information or fabricates details. Every output is grounded in what you provide.",

  "products.draft.social.title": "What Teachers Say",
  "products.draft.social.quote1": "I got my Sunday back. Draft turns hours into minutes.",
  "products.draft.social.author1": "Sarah Mitchell, Year 5 Teacher",
  "products.draft.social.quote2": "The tone options help me communicate with confidence, even in difficult situations.",
  "products.draft.social.author2": "James Rodriguez, Middle School Teacher",

  "products.draft.cta.title": "Get Your Time Back",
  "products.draft.cta.subtitle": "Join 500+ teachers saving 10+ hours every week",
  "products.draft.cta.primary": "Start Free Trial",
  "products.draft.cta.secondary": "See Examples",

  // Products - GradeFlow
  "products.gradeflow.hero.title": "Grade Faster, Grade Fairer",
  "products.gradeflow.hero.subtitle":
    "AI-powered grading assistant that helps you provide consistent, constructive feedback in half the time.",
  "products.gradeflow.hero.cta": "Start Grading Free",

  "products.gradeflow.turn.pain1": "Spending 4-6 hours per week grading assignments",
  "products.gradeflow.turn.pain2": "Inconsistent feedback across similar student work",
  "products.gradeflow.turn.pain3": "Difficulty providing detailed, constructive comments",

  "products.gradeflow.change.title": "Transform Your Grading Process",
  "products.gradeflow.change.step1": "Upload assignment and rubric",
  "products.gradeflow.change.step2": "AI analyzes student work against criteria",
  "products.gradeflow.change.step3": "Review and adjust suggested grades and feedback",
  "products.gradeflow.change.step4": "Export to your gradebook with one click",

  "products.gradeflow.features.title": "Grading Made Simple",
  "products.gradeflow.features.faster.title": "3x Faster Grading",
  "products.gradeflow.features.faster.desc": "Reduce grading time from hours to minutes while maintaining quality",
  "products.gradeflow.features.fair.title": "Consistent Feedback",
  "products.gradeflow.features.fair.desc": "Ensure fair, standards-aligned grading across all students",
  "products.gradeflow.features.audit.title": "Audit Trail",
  "products.gradeflow.features.audit.desc": "Track all grading decisions with complete transparency",

  "products.gradeflow.social.title": "What Teachers Say",
  "products.gradeflow.social.quote1": "GradeFlow cut my grading time in half without sacrificing quality.",
  "products.gradeflow.social.author1": "Lisa Park, High School English",
  "products.gradeflow.social.quote2": "My feedback is more consistent and helpful now.",
  "products.gradeflow.social.author2": "David Kim, Middle School Math",

  "products.gradeflow.cta.title": "Ready to Grade Smarter?",
  "products.gradeflow.cta.button": "Start Free Trial",

  // Products - Shield
  "shield.hero.eyebrow": "AI GOVERNANCE FOR SCHOOLS",
  "shield.hero.title": "Safe, Compliant AI for Your School",
  "shield.hero.subtitle":
    "Enterprise-grade AI governance platform that ensures safe, ethical, and compliant AI use across your entire school or district.",
  "shield.hero.cta.primary": "Learn More",
  "shield.hero.cta.secondary": "Contact Sales",

  "shield.trust.gdpr": "GDPR Compliant",
  "shield.trust.ferpa": "FERPA Compliant",
  "shield.trust.schoolReady": "School-Ready",

  "shield.problem.title": "The AI Governance Challenge",
  "shield.problem.card1.title": "Data Privacy Risks",
  "shield.problem.card1.description": "Teachers using consumer AI tools may inadvertently expose student data",
  "shield.problem.card2.title": "Compliance Concerns",
  "shield.problem.card2.description": "Schools struggle to ensure AI use meets FERPA, GDPR, and local regulations",
  "shield.problem.card3.title": "Lack of Oversight",
  "shield.problem.card3.description": "No visibility into how AI is being used across classrooms and departments",

  "shield.solution.title": "Complete AI Governance in One Platform",
  "shield.solution.subtitle": "Monitor, control, and audit all AI use across your school",
  "shield.solution.card1.title": "Centralized Control",
  "shield.solution.card1.description": "Set school-wide policies for AI use with granular permissions",
  "shield.solution.card2.title": "Audit Trail",
  "shield.solution.card2.description": "Complete visibility into all AI interactions and data flows",
  "shield.solution.card3.title": "Data Protection",
  "shield.solution.card3.description": "Automatic PII detection and redaction before AI processing",
  "shield.solution.card4.title": "Policy Enforcement",
  "shield.solution.card4.description": "Automated compliance checks against your school's policies",
  "shield.solution.cta": "Explore All Features",

  "shield.howItWorks.title": "How Shield Works",
  "shield.howItWorks.step1.title": "Connect Your Tools",
  "shield.howItWorks.step1.description": "Integrate Shield with your existing AI tools and platforms",
  "shield.howItWorks.step2.title": "Set Policies",
  "shield.howItWorks.step2.description": "Define rules for AI use, data handling, and compliance",
  "shield.howItWorks.step3.title": "Monitor & Audit",
  "shield.howItWorks.step3.description": "Track usage, review logs, and ensure compliance",
  "shield.howItWorks.cta": "Get Started",

  "shield.socialProof.title": "Trusted by Schools Worldwide",
  "shield.socialProof.quote":
    "Shield gives us the confidence to embrace AI while protecting our students' privacy. It's essential infrastructure for modern schools.",
  "shield.socialProof.attribution": "Dr. Jennifer Martinez",
  "shield.socialProof.role": "Director of Technology, Springfield School District",

  "shield.useCases.title": "Built for Education",
  "shield.useCases.card1.title": "Teacher AI Tools",
  "shield.useCases.card1.description": "Govern AI writing assistants, lesson planners, and grading tools",
  "shield.useCases.card2.title": "Student AI Use",
  "shield.useCases.card2.description": "Monitor and guide appropriate AI use in student work",
  "shield.useCases.card3.title": "Administrative AI",
  "shield.useCases.card3.description": "Secure AI use for scheduling, communications, and operations",

  "shield.comparison.title": "Shield vs. Manual Governance",
  "shield.comparison.feature": "Feature",
  "shield.comparison.shield": "With Shield",
  "shield.comparison.manual": "Manual Process",
  "shield.comparison.row1.feature": "Policy Enforcement",
  "shield.comparison.row1.shield": "Automated",
  "shield.comparison.row1.manual": "Manual checks",
  "shield.comparison.row2.feature": "Audit Trail",
  "shield.comparison.row2.shield": "Complete logs",
  "shield.comparison.row2.manual": "Incomplete records",
  "shield.comparison.row3.feature": "PII Protection",
  "shield.comparison.row3.shield": "Automatic",
  "shield.comparison.row3.manual": "Manual review",

  "shield.pricing.title": "Enterprise Pricing",
  "shield.pricing.description": "Custom pricing based on your school size and needs. Contact us for a quote.",
  "shield.pricing.cta": "Get Pricing",

  "shield.finalCta.title": "Ready to Secure Your School's AI?",
  "shield.finalCta.subtitle": "Join forward-thinking schools using Shield to embrace AI safely",
  "shield.finalCta.primary": "Schedule Demo",
  "shield.finalCta.secondary": "Contact Sales",
  "shield.finalCta.note": "Enterprise support and onboarding included",

  // FAQ Page
  "faq.hero.eyebrow": "FREQUENTLY ASKED QUESTIONS",
  "faq.hero.title": "How can we help you?",
  "faq.hero.subtitle": "Find answers to common questions about Zaza Draft and our AI tools for teachers.",

  // FAQ Categories
  "faq.category.about.title": "About Zaza Draft",
  "faq.category.safety.title": "Safety & Privacy",
  "faq.category.features.title": "Features & Functionality",
  "faq.category.pricing.title": "Pricing & Plans",
  "faq.category.languages.title": "Languages & Translation",
  "faq.category.schools.title": "For Schools & Districts",

  // About Questions
  "faq.about.q1": "What is Zaza Draft?",
  "faq.about.a1":
    "Zaza Draft is an AI-powered writing assistant specifically designed for teachers. It helps you transform rough notes into polished parent emails, report cards, grading comments, and other educational communications in minutes while maintaining your authentic voice.",

  "faq.about.q2": "How is Zaza Draft different from ChatGPT or other AI tools?",
  "faq.about.a2":
    "Unlike generic AI tools, Zaza Draft is trained specifically on educational communications and pedagogy. It's hallucination-safe (never invents student information), offers education-specific tone options, is FERPA-compliant by design, and provides specialized workflows for common teacher writing tasks.",

  "faq.about.q3": "Who is Zaza Draft for?",
  "faq.about.a3":
    "Zaza Draft is designed for K-12 teachers, educators, school administrators, and anyone involved in educational communications. Whether you're writing parent emails, report cards, feedback comments, or school announcements, Draft helps you save time while maintaining professional quality.",

  "faq.about.q4": "Do I need technical skills to use Zaza Draft?",
  "faq.about.a4":
    "No technical skills required! Zaza Draft is designed to be incredibly simple: paste your notes, choose your tone, and get polished output. If you can use email, you can use Draft.",

  "faq.about.q5": "Can I try Zaza Draft before committing?",
  "faq.about.a5":
    "Yes! We offer a free trial so you can experience how Draft saves you time and improves your communications. No credit card required to start.",

  "faq.about.q6": "What types of writing can Zaza Draft help with?",
  "faq.about.a6":
    "Draft specializes in six key areas: parent messages, report cards, grading comments, school communications, reference letters, and documentation. It's built for the everyday writing tasks teachers face.",

  "faq.about.q7": "How much time can I save with Zaza Draft?",
  "faq.about.a7":
    "Teachers using Draft report saving 10+ hours per week on writing tasks. Tasks that typically take 2 hours can be completed in 5 minutes with Draft's assistance.",

  "faq.about.q8": "Can I customize the output?",
  "faq.about.a8":
    "Draft provides a starting point that you can edit and refine. You maintain full control over the final message - Draft just helps you get there faster.",

  "faq.about.q9": "Does Zaza Draft work in my country?",
  "faq.about.a9":
    "Yes! Zaza Draft is available worldwide and supports communications in 20+ languages. Whether you're in the US, UK, Canada, Australia, or anywhere else, Draft can help you communicate effectively.",

  "faq.about.q10": "What is the Zaza product ecosystem?",
  "faq.about.a10":
    "Zaza offers a suite of AI tools for education: Draft (writing assistant), Teach (lesson planning), GradeFlow (grading assistant), and Shield (AI governance). Each tool is designed to solve specific challenges teachers face.",

  "faq.about.q11": "How do I get started?",
  "faq.about.a11":
    "Simply sign up for a free account, paste your first draft or notes, choose your desired tone, and watch Draft transform your writing. You'll be saving time within minutes of starting.",

  // Safety Questions
  "faq.safety.q1": "Is my data safe with Zaza Draft?",
  "faq.safety.a1":
    "Yes. We take data security seriously. All data is encrypted in transit and at rest, we're FERPA-compliant, and we never use your data to train our models or share it with third parties. Your communications remain private and secure.",

  "faq.safety.q2": "What does 'hallucination-safe' mean?",
  "faq.safety.a2":
    "Hallucination-safe means Draft never invents student information, fabricates parent interactions, or creates fictional details about your class. Every output is grounded in what you actually provide - no made-up facts or scenarios.",

  "faq.safety.q3": "Is Zaza Draft FERPA compliant?",
  "faq.safety.a3":
    "Yes. Zaza Draft is designed with FERPA compliance in mind. We implement appropriate safeguards to protect student privacy and educational records, and we never share or sell student data.",

  "faq.safety.q4": "Can I include student names in my drafts?",
  "faq.safety.a4":
    "Yes, you can include student names and relevant details. Draft processes this information securely and never stores or uses it beyond generating your specific output. All student information remains confidential.",

  "faq.safety.q5": "What happens to my data after I use Draft?",
  "faq.safety.a5":
    "Your drafts and outputs are stored securely in your account for your convenience, but we never use them to train our AI models. You can delete your data at any time from your account settings.",

  "faq.safety.q6": "Is Zaza Draft GDPR compliant?",
  "faq.safety.a6":
    "Yes. We comply with GDPR requirements for data protection and privacy. Users have full control over their data, including the right to access, correct, and delete their information.",

  // Features Questions
  "faq.features.q1": "What tone options are available?",
  "faq.features.a1":
    "Draft offers four education-specific tones: Supportive (warm and encouraging), Formal (professional and structured), Concise (brief and direct), and Neutral (balanced and objective). Each tone is calibrated for educational communications.",

  "faq.features.q2": "Can Draft translate my messages?",
  "faq.features.a2":
    "Yes! Draft can translate your communications into 20+ languages, making it easy to connect with families who speak different languages. Translations maintain the appropriate tone and educational context.",

  "faq.features.q3": "Does Draft work with my school's systems?",
  "faq.features.a3":
    "Draft generates text that you can easily copy and paste into any system - email, learning management systems, gradebooks, or word processors. No special integrations required.",

  "faq.features.q4": "Can I save templates or frequently used phrases?",
  "faq.features.a4":
    "Yes! You can save your favorite outputs as templates for future use, making it even faster to create similar communications in the future.",

  "faq.features.q5": "Does Draft work on mobile devices?",
  "faq.features.a5":
    "Yes! Zaza Draft is fully responsive and works on smartphones, tablets, and computers. Write and refine communications wherever you are.",

  "faq.features.q6": "Can multiple teachers share templates?",
  "faq.features.a6":
    "With our school plans, teams can share templates and best practices, ensuring consistent communication across your department or school.",

  // Pricing Questions
  "faq.pricing.q1": "How much does Zaza Draft cost?",
  "faq.pricing.a1":
    "We offer flexible pricing plans for individual teachers and schools. Visit our pricing page for current rates and plan details. We also offer a free trial so you can experience Draft before committing.",

  "faq.pricing.q2": "Is there a free version?",
  "faq.pricing.a2":
    "We offer a free trial period so you can experience the full power of Draft. After the trial, you can choose a plan that fits your needs and budget.",

  "faq.pricing.q3": "Do you offer school or district pricing?",
  "faq.pricing.a3":
    "Yes! We offer special pricing for schools and districts, including volume discounts, centralized billing, and additional features like team collaboration and admin controls. Contact our sales team for a custom quote.",

  "faq.pricing.q4": "Can I cancel anytime?",
  "faq.pricing.a4":
    "Yes. There are no long-term contracts for individual plans. You can cancel your subscription at any time, and you'll retain access until the end of your billing period.",

  // Languages Questions
  "faq.languages.q1": "What languages does Draft support?",
  "faq.languages.a1":
    "Draft supports communications in 20+ languages including Spanish, French, German, Mandarin, Arabic, Portuguese, and many more. You can write in English and translate to any supported language, or write directly in your preferred language.",

  "faq.languages.q2": "How accurate are the translations?",
  "faq.languages.a2":
    "Our translations are specifically calibrated for educational contexts and maintain appropriate tone and formality. While we recommend having translations reviewed by native speakers for critical communications, our translations are highly accurate and contextually appropriate.",

  "faq.languages.q3": "Can Draft help me communicate with multilingual families?",
  "faq.languages.a3":
    "Draft makes it easy to send the same message in multiple languages, ensuring all families receive communications in their preferred language. This helps build stronger school-home connections.",

  // Schools Questions
  "faq.schools.q1": "How does Zaza Draft work for entire schools or districts?",
  "faq.schools.a1":
    "Our school and district plans include centralized administration, team collaboration features, shared templates, usage analytics, priority support, and volume pricing. Administrators can manage licenses, monitor usage, and ensure consistent communication standards across the organization.",

  "faq.schools.q2": "Do you provide training and support for schools?",
  "faq.schools.a2":
    "Yes! School and district plans include onboarding support, training materials, and ongoing professional development resources. We help ensure your entire team can effectively use Draft to save time and improve communications.",

  // FAQ CTA
  "faq.cta.title": "Still have questions?",
  "faq.cta.subtitle": "Our support team is here to help. Reach out and we'll get back to you within 24 hours.",
  "faq.cta.button": "Contact Support",

  // About Overview Page
  "about.overview.hero.eyebrow": "ABOUT ZAZA",
  "about.overview.hero.title": "Building the Future of Teacher Technology",
  "about.overview.hero.subtitle":
    "We're on a mission to give teachers their time back by building AI tools that actually understand education.",

  "about.overview.mission.title": "Our Mission",
  "about.overview.mission.body":
    "Every teacher deserves tools that respect their expertise, protect their students, and give them time to do what they do best: teach. We're building AI that serves teachers, not the other way around.",

  "about.overview.values.title": "Our Values",
  "about.overview.values.teacherFirst.title": "Teacher-First Design",
  "about.overview.values.teacherFirst.body":
    "Every feature is designed with real teachers, tested in real classrooms, and refined based on real feedback.",
  "about.overview.values.safety.title": "Safety by Design",
  "about.overview.values.safety.body":
    "We build hallucination-safe AI that never invents student information or fabricates details about your class.",
  "about.overview.values.privacy.title": "Privacy First",
  "about.overview.values.privacy.body":
    "FERPA-compliant from day one. Your data is yours, and we never use it to train our models.",
  "about.overview.values.evidence.title": "Evidence-Based",
  "about.overview.values.evidence.body":
    "Built on real pedagogy and educational research, not generic business writing patterns.",

  "about.overview.timeline.title": "Our Journey",
  "about.overview.timeline.2023.title": "Founded",
  "about.overview.timeline.2023.body":
    "Started with a simple question: Why do teachers spend so much time writing when AI could help?",
  "about.overview.timeline.2024.title": "Launch",
  "about.overview.timeline.2024.body":
    "Released Zaza Draft to 100+ beta teachers. Saved over 50,000 hours of writing time.",
  "about.overview.timeline.2025.title": "Growth",
  "about.overview.timeline.2025.body":
    "Expanded to 500+ teachers across 15 countries. Launched Teach, GradeFlow, and Shield.",

  "about.overview.cta.title": "Want to Learn More?",
  "about.overview.cta.body": "Get in touch with our team to discuss how Zaza can help your school or district.",
  "about.overview.cta.button": "Contact Us",

  // About Company Page
  "about.company.hero.eyebrow": "OUR COMPANY",
  "about.company.hero.title": "Zaza Technologies",
  "about.company.hero.subtitle":
    "We're a team of educators, engineers, and designers building the future of teacher technology.",

  "about.company.body.p1":
    "Zaza Technologies was founded in 2023 by teachers who were frustrated with generic AI tools that didn't understand education. We saw teachers spending hours on administrative writing tasks that could be automated, but existing AI tools were either unsafe for student data or produced output that sounded nothing like a teacher.",

  "about.company.body.p2":
    "So we built something different: AI tools trained specifically on educational communications and pedagogy. Tools that understand the nuances of parent-teacher communication, the importance of constructive feedback, and the need to maintain your authentic voice. Tools that are hallucination-safe, FERPA-compliant, and designed from the ground up for education.",

  "about.company.body.p3":
    "Today, Zaza serves over 500 teachers across 15 countries, saving them 10+ hours per week on writing tasks. But we're just getting started. Our vision is to build a complete suite of AI tools that help teachers reclaim their time and focus on what matters most: their students.",

  "about.company.stats.teachers.label": "Teachers Using Zaza",
  "about.company.stats.teachers.value": "500+",
  "about.company.stats.countries.label": "Countries",
  "about.company.stats.countries.value": "15",
  "about.company.stats.timeSaved.label": "Hours Saved Weekly",
  "about.company.stats.timeSaved.value": "10+",

  // Founder Hero Section
  "founder.hero.headline": "Meet the Founder Building AI That Serves Teachers",
  "founder.hero.subheading":
    "Dr. Greg Blackburn spent 15 years in classrooms before building Zaza - AI tools that understand what teachers actually need.",
  "founder.hero.label": "FOUNDER & CEO",
  "founder.hero.name": "Dr. Greg Blackburn",
  "founder.hero.tagline": "Former Teacher, EdTech Builder, AI Advocate",

  // Founder Journey Section
  "founder.journey.title": "The Journey",
  "founder.journey.quote":
    "I built Zaza because I was tired of watching teachers drown in administrative work when technology should be setting them free.",
  "founder.journey.p1":
    "I started my career as a high school English teacher in 2008. Like most teachers, I loved working with students but struggled with the endless administrative tasks - parent emails, report cards, grading feedback. I'd spend my evenings and weekends writing when I should have been planning great lessons or spending time with my family.",
  "founder.journey.p2":
    "After earning my PhD in Educational Technology, I worked with schools implementing AI tools. But I kept seeing the same problem: generic AI tools weren't built for education. They'd invent student information, produce output that sounded nothing like a teacher, and create more work than they saved. Teachers needed something different.",
  "founder.journey.p3":
    "So in 2023, I founded Zaza Technologies with a simple mission: build AI tools that actually understand education. Tools trained on real pedagogy, not business writing. Tools that are hallucination-safe, FERPA-compliant, and designed from the ground up for teachers. Tools that respect teachers' expertise and give them their time back.",
  "founder.journey.p4":
    "Today, Zaza serves over 500 teachers across 15 countries, saving them 10+ hours per week. But we're just getting started. My vision is to build a complete suite of AI tools that help every teacher reclaim their time and focus on what matters most: their students.",

  // Founder Mission Callout
  "founder.mission.quote":
    "Every teacher deserves tools that respect their expertise, protect their students, and give them time to do what they do best: teach.",
  "founder.mission.attribution": "Dr. Greg Blackburn, Founder & CEO",

  // Founder Why Zaza Section
  "founder.whyZaza.title": "Why I Built Zaza",
  "founder.whyZaza.subtitle": "Three principles that guide everything we do",
  "founder.whyZaza.card1.title": "For Teachers, By Teachers",
  "founder.whyZaza.card1.body":
    "I've lived the teacher experience - the late nights, the endless emails, the report card marathons. Zaza is built by someone who understands because I've been there.",
  "founder.whyZaza.card2.title": "Boutique, Not Big Tech",
  "founder.whyZaza.card2.body":
    "We're not a massive corporation trying to sell to everyone. We're a focused team building specialized tools for one audience: teachers. Your needs come first, always.",
  "founder.whyZaza.card3.title": "Building a Legacy",
  "founder.whyZaza.card3.body":
    "This isn't about quick profits. It's about building something that genuinely helps teachers thrive and transforms education for the better. That's the legacy I want to leave.",

  // Founder Personal Message Section
  "founder.personal.title": "A Personal Note",
  "founder.personal.message1":
    "If you're reading this, you're probably a teacher who's curious about AI but skeptical about whether it can really help. I get it. I was skeptical too. Most AI tools feel like they were built by people who've never set foot in a classroom.",
  "founder.personal.message2":
    "That's why I built Zaza differently. Every feature is designed with real teachers, tested in real classrooms, and refined based on real feedback. We don't just build software - we build partnerships with educators who help us create tools that actually work.",
  "founder.personal.message3":
    "I'd love to hear from you. Whether you have questions, feedback, or just want to chat about education and technology, my door is always open. Let's build the future of teacher technology together.",
  "founder.personal.name": "Dr. Greg Blackburn",
  "founder.personal.title2": "Founder & CEO",
  "founder.personal.company": "Zaza Technologies",
  "founder.personal.cta": "Get in Touch",
}

const translationsDe: Record<string, string> = {
  // Pricing Page (DE)
  "pricing.hero.preheadline": "PREISE",
  "pricing.hero.headline": "Einfache Pläne für Lehrkräfte",
  "pricing.hero.subheadline": "Kostenlos starten, jederzeit upgraden. Jederzeit kündbar.",
  "pricing.trust.teachers": "Vertrauen von 500+ Lehrkräften",
  "pricing.trust.ferpa": "FERPA-konform",
  "pricing.trust.cancel": "Jederzeit kündbar",
  "pricing.trust.noCard": "Keine Kreditkarte erforderlich",
  "pricing.toggle.monthly": "Monatlich",
  "pricing.toggle.annual": "Jährlich",
  "pricing.toggle.save": "2 Monate sparen",

  // Preise – Free
  "pricing.free.badge": "KOSTENLOS",
  "pricing.free.title": "Starter",
  "pricing.free.description": "Alles, um Draft auszuprobieren und heute Zeit zu sparen.",
  "pricing.free.price": "0 €",
  "pricing.free.period": "/ dauerhaft",
  "pricing.free.cta": "Kostenlos starten",
  "pricing.free.upgradeText": "Jederzeit für mehr Funktionen upgraden",
  "pricing.free.featuresTitle": "Enthalten",
  "pricing.free.feature1": "KI‑Schreiben für E‑Mails, Zeugnisse, Feedback",
  "pricing.free.feature2": "5 Verfeinerungen pro Tag",
  "pricing.free.feature3": "4 Tonoptionen (unterstützend, formal, kurz, neutral)",
  "pricing.free.feature4": "Übersetzung in 20+ Sprachen",
  "pricing.free.feature5": "Kopieren, herunterladen und teilen",
  "pricing.free.feature6": "Basis‑Vorlagen",
  "pricing.free.limitation": "Ideal zum Testen und für leichte Nutzung",

  // Preise – Premium
  "pricing.premium.badge": "AM BELIEBTESTEN",
  "pricing.premium.title": "Premium",
  "pricing.premium.description": "Unbegrenztes, halluzinationssicheres Schreiben mit Pro‑Werkzeugen.",
  "pricing.premium.priceMonthly": "12 €/Monat",
  "pricing.premium.priceAnnual": "120 €/Jahr",
  "pricing.premium.period": "Jederzeit kündbar",
  "pricing.premium.annualTotal": "Jährliche Abrechnung",
  "pricing.premium.savings": "2 Monate sparen",
  "pricing.premium.cta": "7‑Tage‑Test starten",
  "pricing.premium.trial": "Keine Kreditkarte erforderlich",
  "pricing.premium.guarantee": "30‑Tage Geld‑zurück‑Garantie",
  "pricing.premium.timeSaving": "Spart 10+ Stunden pro Woche",
  "pricing.premium.featuresTitle": "Alles von Free, plus",
  "pricing.premium.feature1": "Unbegrenzte Entwürfe und Verfeinerungen",
  "pricing.premium.feature2": "Erweiterte Ton‑ und Stilsteuerung",
  "pricing.premium.feature3": "Eigene Vorlagen und Kommentarbänke",
  "pricing.premium.feature4": "Wiederverwendbare Textbausteine und Favoriten",
  "pricing.premium.feature5": "Halluzinationssichere Ausgaben by Design",
  "pricing.premium.feature6": "PDF/DOCX‑Export und Versionsverlauf",
  "pricing.premium.feature7": "Priorisierter E‑Mail‑Support",
  "pricing.premium.roiTitle": "Echte Zeitersparnis",
  "pricing.premium.roiText": "Lehrkräfte berichten von 10+ Stunden Ersparnis pro Woche.",

  // Preise – Team
  "pricing.team.badge": "FÜR SCHULEN",
  "pricing.team.title": "Team & Schulen",
  "pricing.team.description": "Zusammenarbeit, Verwaltung und Support für Fachbereiche und Bezirke.",
  "pricing.team.price": "Individuell",
  "pricing.team.period": "Pro Schule oder Bezirk",
  "pricing.team.starting": "Mengenrabatte verfügbar",
  "pricing.team.cta": "Vertrieb kontaktieren",
  "pricing.team.featuresTitle": "Alles aus Premium, plus",
  "pricing.team.feature1": "Admin‑Konsole und Sitzplatzverwaltung",
  "pricing.team.feature2": "Geteilte Vorlagen und Bibliotheken",
  "pricing.team.feature3": "Team‑Töne und Konsistenz",
  "pricing.team.feature4": "Nutzungsanalysen und Berichte",
  "pricing.team.feature5": "SSO und Rollenrechte",
  "pricing.team.feature6": "Priorisierter Support & Onboarding",
  "pricing.team.feature7": "Mengenpreise",
  "pricing.team.roi": "Mehr Konsistenz und Zeitgewinn im Team",

  // Preise – Bundle
  "pricing.bundle.badge": "BESTER WERT",
  "pricing.bundle.title": "Draft + Teach + GradeFlow",
  "pricing.bundle.description": "Alles für Schreiben, Planung und Bewertung.",
  "pricing.bundle.price": "199 €/Jahr",
  "pricing.bundle.originalPrice": "276 €/Jahr",
  "pricing.bundle.savings": "Sparen Sie 77 € im Bundle",
  "pricing.bundle.cta": "Bundle wählen",

  // Preise – Vergleich
  "pricing.comparison.title": "Pläne vergleichen",
  "pricing.comparison.features": "Funktionen",
  "pricing.comparison.free": "Free",
  "pricing.comparison.premium": "Premium",
  "pricing.comparison.popular": "Am beliebtesten",
  "pricing.comparison.team": "Team",
  "pricing.comparison.row1.feature": "Entwürfe pro Monat",
  "pricing.comparison.row1.free": "Begrenzt",
  "pricing.comparison.row1.premium": "Unbegrenzt",
  "pricing.comparison.row1.team": "Unbegrenzt",
  "pricing.comparison.row2.feature": "Tonoptionen",
  "pricing.comparison.row2.free": "4",
  "pricing.comparison.row2.premium": "Erweitert",
  "pricing.comparison.row2.team": "Erweitert",
  "pricing.comparison.row3.feature": "Vorlagen",
  "pricing.comparison.row3.free": "Basis",
  "pricing.comparison.row3.premium": "Individuell",
  "pricing.comparison.row3.team": "Geteilt + individuell",
  "pricing.comparison.row4.feature": "Exporte",
  "pricing.comparison.row4.free": "Kopieren",
  "pricing.comparison.row4.premium": "PDF/DOCX",
  "pricing.comparison.row4.team": "PDF/DOCX",
  "pricing.comparison.row5.feature": "Kommentarbänke",
  "pricing.comparison.row5.free": "—",
  "pricing.comparison.row5.premium": "Persönlich",
  "pricing.comparison.row5.team": "Team‑geteilt",
  "pricing.comparison.row6.feature": "Admin‑Tools",
  "pricing.comparison.row6.free": "—",
  "pricing.comparison.row6.premium": "—",
  "pricing.comparison.row6.team": "Sitze, SSO, Rollen",
  "pricing.comparison.row7.feature": "Support",
  "pricing.comparison.row7.free": "Community",
  "pricing.comparison.row7.premium": "Priorisierter E‑Mail",
  "pricing.comparison.row7.team": "Priorisiert + Onboarding",
  "pricing.comparison.row8.feature": "Preis",
  "pricing.comparison.row8.free": "0 €",
  "pricing.comparison.row8.premium": "12 €/Monat",
  "pricing.comparison.row8.team": "Individuell",
  "pricing.comparison.ctaFree": "Kostenlos starten",
  "pricing.comparison.ctaPremium": "Gratis testen",
  "pricing.comparison.ctaTeam": "Vertrieb kontaktieren",

  // Preise – FAQ
  "pricing.faq.title": "FAQ zu Preisen & Abrechnung",
  "pricing.faq.q1": "Gibt es einen kostenlosen Plan?",
  "pricing.faq.a1": "Ja. Free ist ideal zum Testen und für leichte Nutzung.",
  "pricing.faq.q2": "Kann ich jederzeit kündigen?",
  "pricing.faq.a2": "Ja. Kündigung jederzeit in den Kontoeinstellungen möglich.",
  "pricing.faq.q3": "Gibt es eine Testphase?",
  "pricing.faq.a3": "Premium enthält eine 7‑Tage‑Testphase ohne Kreditkarte.",
  "pricing.faq.q4": "Was umfasst Premium?",
  "pricing.faq.a4": "Unbegrenzte Entwürfe, erweiterte Töne, Vorlagen, Exporte und Priority‑Support.",
  "pricing.faq.q5": "Gibt es Team‑Preise?",
  "pricing.faq.a5": "Ja. Kontaktieren Sie uns für Schul‑/Bezirkslizenzen mit Admin‑Tools.",
  "pricing.faq.q6": "Ist Zaza Draft FERPA‑konform?",
  "pricing.faq.a6": "Ja. Zaza Draft schützt Schülerdaten und Privatsphäre.",
  "pricing.faq.q7": "Kann ich Draft in anderen Sprachen nutzen?",
  "pricing.faq.a7": "Ja. Übersetzung in 20+ Sprachen mit passendem Ton.",
  "pricing.faq.q8": "Gibt es Rückerstattungen?",
  "pricing.faq.a8": "Wir bieten 30‑Tage Geld‑zurück für Premium.",

  // Preise – Testimonials
  "pricing.testimonials.title": "Was Lehrkräfte zu den Preisen sagen",
  "pricing.testimonials.author1": "Elena M., Grundschule",
  "pricing.testimonials.quote1": "Premium rechnet sich schon in der ersten Woche.",
  "pricing.testimonials.author2": "David R., Gymnasium",
  "pricing.testimonials.quote2": "Die Zeitersparnis macht das Jahresabo zur klaren Wahl.",
  "pricing.testimonials.author3": "Julia K., Sekundarstufe",
  "pricing.testimonials.quote3": "Unser Abteilungs‑Bundle vereinfacht Planung und Bewertung.",

  // Preise – Abschluss‑CTA
  "pricing.finalCta.title": "Bereit, jede Woche Stunden zu sparen?",
  "pricing.finalCta.subtitle": "Starten Sie kostenlos oder sprechen Sie mit unserem Team.",
  "pricing.finalCta.primary": "Kostenlos starten",
  "pricing.finalCta.secondary": "Demo buchen",
  "pricing.finalCta.trust": "Halluzinationssicher • FERPA‑konform • Für Lehrkräfte gebaut",

  // Preise – Entscheidungs‑Tool
  "pricing.decision.title": "Unsicher, welcher Plan passt?",
  "pricing.decision.subtitle": "Machen Sie unser kurzes Quiz für eine persönliche Empfehlung",
  // Navigation
  "nav.home": "Startseite",
  "nav.pricing": "Preise",
  "nav.products": "Produkte",
  "nav.products.teach": "Zaza Teach",
  "nav.products.draft": "Zaza Draft",
  "nav.products.gradeflow": "GradeFlow",
  "nav.products.shield": "Zaza Shield",
  "nav.learningCentre": "Lernzentrum",
  "nav.resources": "Ressourcen",
  "nav.faq": "FAQ",
  "nav.about": "Über uns",
  "nav.getStarted": "Jetzt starten",

  "about.nav.title": "Über uns",
  "about.nav.company": "Unternehmen",
  "about.nav.founder": "Gründer",
  "about.nav.press": "Presse-Kit",
  "about.nav.careers": "Karriere",

  // Hero Section
  "hero.eyebrow": "FÜR LEHRKRÄFTE",
  "hero.badge": "Halluzinationssichere KI für Lehrkräfte",
  "hero.headline": "Schreiben Sie wie Sie",
  "hero.headlineAccent": "nur schneller.",
  "hero.subheading":
    "KI-gestützter Schreibassistent, der Lehrkräften hilft, Eltern-E-Mails, Schülerberichte und Bewertungskommentare in Minuten statt Stunden zu erstellen.",
  "hero.ctaPrimary": "Kostenlos starten",
  "hero.ctaSecondary": "Beispiele ansehen",
  "hero.trustIndicators.hallucinationSafe": "Halluzinationssicher",
  "hero.trustIndicators.ferpaCompliant": "FERPA-konform",
  "hero.trustIndicators.teachers": "500+ Lehrkräfte",

  // Hallucination-Safe Tooltip
  "hallucinationSafe.tooltip.heading": "Was bedeutet halluzinationssicher?",
  "hallucinationSafe.tooltip.body":
    "Im Gegensatz zu generischen KI-Tools ist Zaza Draft speziell darauf trainiert, keine Schülerinformationen zu erfinden, keine Elterngespräche zu fabrizieren oder Details über Ihre Klasse zu konstruieren. Jede Ausgabe basiert ausschließlich auf Ihren tatsächlichen Angaben - keine erfundenen Fakten, keine fiktiven Szenarien.",

  // Problem Section
  "problem.heading": "Lehrkräfte verbringen über 10 Stunden pro Woche mit Schreibaufgaben",
  "problem.body":
    "Die Herausforderung besteht nicht darin, was zu sagen ist - sondern die Zeit und die richtigen Worte zu finden, um es professionell zu formulieren und dabei Ihre authentische Stimme zu bewahren.",
  "problem.stats.parentEmails.value": "2-3 Std./Woche",
  "problem.stats.parentEmails.label": "Eltern-E-Mails",
  "problem.stats.reportCards.value": "4-6 Std./Semester",
  "problem.stats.reportCards.label": "Zeugnisberichte",
  "problem.stats.gradingFeedback.value": "1-2 Std./Woche",
  "problem.stats.gradingFeedback.label": "Bewertungsfeedback",

  // Solution Section
  "solution.heading": "Die erste KI-Suite speziell für Lehrerkommunikation",
  "solution.bodyPrimary":
    "Zaza ist die weltweit erste KI-Suite speziell für Lehrkräfte - basierend auf echter Pädagogik, gestützt auf einen vertrauenswürdigen Assistenten und entwickelt, um nicht nur Zeit zu sparen, sondern Lehrkräften zu helfen, aufzublühen.",
  "solution.bodySecondary":
    "Trainiert mit echter Pädagogik und Lehrersprache - nicht mit Business-Texten. Jede Ausgabe bewahrt Ihre authentische Stimme und spart gleichzeitig Stunden bei Eltern-E-Mails, Zeugnisberichten und Feedback-Kommentaren.",

  // Stats Section
  "stats.documentsRefined.number": "150k+",
  "stats.documentsRefined.label": "Dokumente verfeinert",
  "stats.teachers.number": "500+",
  "stats.teachers.label": "Lehrkräfte",
  "stats.timeSaved.number": "10+ Std.",
  "stats.timeSaved.label": "Wöchentlich gespart",
  "stats.subtitle": "Vertraut von 500+ Lehrkräften, die mit Zaza Draft jede Woche 10+ Stunden sparen.",

  // How It Works Section
  "howItWorks.heading": "So funktioniert es",
  "howItWorks.diagram.step1.title": "Ihre Eingabe",
  "howItWorks.diagram.step1.description": "Grobe Notizen oder Stichpunkte",
  "howItWorks.diagram.step1.example": "Sam passt im Unterricht nicht auf.",
  "howItWorks.diagram.step2.title": "Tonauswahl",
  "howItWorks.diagram.step2.description": "Wählen Sie Ihren Ton",
  "howItWorks.diagram.step2.example": "Unterstützend, Formal, Prägnant oder Neutral",
  "howItWorks.diagram.step3.title": "Ausgefeilte Ausgabe",
  "howItWorks.diagram.step3.description": "Unterrichtsfertige Kommunikation",
  "howItWorks.diagram.step3.example": "Ich möchte Sie bezüglich Sams jüngster Aufmerksamkeitsschwierigkeiten...",
  "howItWorks.steps.step1.number": "1",
  "howItWorks.steps.step1.title": "Fügen Sie Ihren Entwurf ein oder beschreiben Sie, was Sie benötigen",
  "howItWorks.steps.step1.description":
    "Beginnen Sie mit groben Notizen, Stichpunkten oder einem vollständigen Entwurf",
  "howItWorks.steps.step2.number": "2",
  "howItWorks.steps.step2.title": "Wählen Sie Ihren Ton und beobachten Sie, wie Draft verfeinert",
  "howItWorks.steps.step2.description": "Unterstützend, formal, prägnant oder neutral - immer bearbeitbar",
  "howItWorks.steps.step3.number": "3",
  "howItWorks.steps.step3.title": "Exportieren & teilen",
  "howItWorks.steps.step3.description": "Kopieren, herunterladen oder mit einem Klick in Ihre Schultools teilen",

  // Demo Section
  "demo.heading": "Draft in Aktion",
  "demo.tabs.parentEmail": "Eltern-E-Mail",
  "demo.tabs.reportCard": "Zeugnis",
  "demo.tabs.gradingComment": "Bewertungskommentar",
  "demo.before.label": "VORHER (IHR ENTWURF)",
  "demo.toneSelector": "Ton: Unterstützend",
  "demo.ctaButton": "Umformulieren",
  "demo.after.label": "NACHHER (DRAFT'S VERSION)",
  "demo.tryItYourself": "Selbst ausprobieren",
  "demo.testimonial.quote": "Ich habe meinen Sonntag zurückbekommen. Draft verwandelt Stunden in Minuten.",
  "demo.testimonial.name": "Sarah Mitchell",
  "demo.testimonial.author": "Grundschullehrerin, UK",

  // Use Cases Section
  "useCases.heading": "Für Ihre alltäglichen Schreibaufgaben entwickelt",
  "useCases.cards.parentMessages.title": "Eltern-Nachrichten",
  "useCases.cards.parentMessages.description": "Formulieren Sie sensible E-Mails im richtigen Ton um",
  "useCases.cards.parentMessages.examples": "Verhaltensbedenken, Fortschrittsaktualisierungen, Anwesenheitsprobleme",
  "useCases.cards.reportCards.title": "Zeugnisberichte",
  "useCases.cards.reportCards.description": "Verwandeln Sie Stichpunkte in aussagekräftige Erzählungen",
  "useCases.cards.reportCards.examples": "Semesterberichte, Fortschrittszusammenfassungen, Förderpläne",
  "useCases.cards.gradingComments.title": "Bewertungskommentare",
  "useCases.cards.gradingComments.description": "Generieren Sie konstruktives Feedback schneller",
  "useCases.cards.gradingComments.examples": "Kriterienbasierte Kommentare, Rubrik-Feedback",
  "useCases.cards.schoolCommunications.title": "Schulkommunikation",
  "useCases.cards.schoolCommunications.description": "Erstellen Sie Newsletter und Ankündigungen professionell",
  "useCases.cards.schoolCommunications.examples": "Updates, Veranstaltungshinweise, Mitteilungen",
  "useCases.cards.referenceLetters.title": "Empfehlungsschreiben",
  "useCases.cards.referenceLetters.description": "Verfassen Sie überzeugende Empfehlungen selbstbewusst",
  "useCases.cards.referenceLetters.examples": "Hochschulempfehlungen, Jobempfehlungen",
  "useCases.cards.documentation.title": "Dokumentation",
  "useCases.cards.documentation.description": "Erstellen Sie klare Aufzeichnungen und Besprechungsnotizen",
  "useCases.cards.documentation.examples": "Förderplandokumentation, Elterngespräche",

  // Comparison Section
  "comparison.heading": "Warum Lehrkräfte Zaza gegenüber generischen KI-Tools vertrauen",
  "comparison.subheading": "Speziell für Bildung entwickelt, nicht von Business-Tools adaptiert",
  "comparison.tableHeaders.feature": "Funktion",
  "comparison.tableHeaders.genericAI": "Generische KI-Tools (ChatGPT, etc.)",
  "comparison.tableHeaders.zazaDraft": "Zaza Draft",
  "comparison.rows.training.feature": "Training",
  "comparison.rows.training.generic": "Allgemeines Wissen, geschäftsorientiert",
  "comparison.rows.training.zaza": "Trainiert mit echter Lehrerkommunikation & Pädagogik",
  "comparison.rows.safety.feature": "Sicherheit",
  "comparison.rows.safety.generic": "Kann Schülerdetails oder Szenarien erfinden",
  "comparison.rows.safety.zaza": "Halluzinationssicher - erfindet niemals Informationen",
  "comparison.rows.toneControl.feature": "Tonkontrolle",
  "comparison.rows.toneControl.generic": "Begrenzt oder inkonsistent",
  "comparison.rows.toneControl.zaza": "4+ bildungsspezifische Töne",
  "comparison.rows.compliance.feature": "Compliance",
  "comparison.rows.compliance.generic": "Nicht FERPA-konform entwickelt",
  "comparison.rows.compliance.zaza": "Von Grund auf FERPA-konform",
  "comparison.rows.useCases.feature": "Anwendungsfälle",
  "comparison.rows.useCases.generic": "Generische Schreibaufgaben",
  "comparison.rows.useCases.zaza": "6 spezialisierte Lehrer-Workflows",
  "comparison.rows.outputQuality.feature": "Ausgabequalität",
  "comparison.rows.outputQuality.generic": "Erfordert starke Bearbeitung",
  "comparison.rows.outputQuality.zaza": "Unterrichtsfertig in Minuten",
  "comparison.rows.learningCurve.feature": "Lernkurve",
  "comparison.rows.learningCurve.generic": "Komplexe Prompts erforderlich",
  "comparison.rows.learningCurve.zaza": "Einfügen, Ton wählen, fertig",
  "comparison.rows.community.feature": "Community",
  "comparison.rows.community.generic": "Keine Lehrer-Unterstützung",
  "comparison.rows.community.zaza": "500+ Pädagogen teilen Best Practices",

  // Why Choose Section
  "whyChoose.heading": "Warum Lehrkräfte Zaza wählen",
  "whyChoose.benefits.beatWritersBlock.title": "Schreibblockade überwinden",
  "whyChoose.benefits.beatWritersBlock.description": "Beginnen Sie mit KI, beenden Sie mit Ihrer authentischen Stimme",
  "whyChoose.benefits.writeWithConfidence.title": "Mit Selbstvertrauen schreiben",
  "whyChoose.benefits.writeWithConfidence.description": "Professionelle Qualität in allen Kommunikationen",
  "whyChoose.benefits.saveTime.title": "Sparen Sie jede Woche Stunden",
  "whyChoose.benefits.saveTime.description": "2-Stunden-Aufgaben in 5 Minuten erledigt",
  "whyChoose.benefits.breakBarriers.title": "Sprachbarrieren überwinden",
  "whyChoose.benefits.breakBarriers.description": "Sofort in über 20 Sprachen übersetzen",

  // Testimonials Section
  "testimonials.heading": "Was Lehrkräfte sagen",
  "testimonials.quote1.text": "Ich habe meinen Sonntag zurückbekommen. Draft verwandelt Stunden in Minuten.",
  "testimonials.quote1.name": "Sarah Mitchell",
  "testimonials.quote1.author": "Grundschullehrerin, UK",
  "testimonials.quote2.text": "Kommentare sind konsistent und freundlich.",
  "testimonials.quote2.name": "Marcus Johnson",
  "testimonials.quote2.author": "Mittelschullehrerin, US",
  "testimonials.quote3.text": "GradeFlow hilft unserem Team, sich auf Standards zu einigen.",
  "testimonials.quote3.name": "Dr. Anna Weber",
  "testimonials.quote3.author": "Fachbereichsleitung, DE",

  // Final CTA Section
  "finalCTA.heading": "Holen Sie sich Ihre Zeit zurück",
  "finalCTA.subheading": "Schließen Sie sich 500+ Lehrkräften an, die mit Zaza Draft jede Woche 10+ Stunden sparen.",
  "finalCTA.button": "Kostenlos starten",

  // Footer
  "footer.social.tiktok": "Folgen Sie uns auf TikTok @zazatechnologies",
  "footer.social.twitter": "Folgen Sie uns auf X (Twitter) @zazateachapp",
  "footer.social.linkedin": "Verbinden Sie sich mit uns auf LinkedIn",
  "footer.productEcosystem": "Produkt & Ökosystem",
  "footer.learningResources": "Lernen & Ressourcen",
  "footer.company": "Unternehmen",
  "footer.features": "Funktionen",
  "footer.pricing": "Preise",
  "footer.teacherStories": "Lehrergeschichten",
  "footer.zazaTeach": "Zaza Teach",
  "footer.zazaDraft": "Zaza Draft",
  "footer.gradeflow": "GradeFlow",
  "footer.zazaShield": "Zaza Shield",
  "footer.zazaTech": "Zaza Technologies",
  "footer.blog": "Blog",
  "footer.teacherResources": "Lehrerressourcen",
  "footer.support": "Support",
  "footer.faq": "FAQ",
  "footer.about": "Über uns",
  "footer.privacy": "Datenschutz",
  "footer.terms": "Nutzungsbedingungen",
  "footer.contact": "Kontakt",

  // Products - Teach (German)
  "products.teach.hero.eyebrow": "UNTERRICHTSPLANUNG LEICHT GEMACHT",
  "products.teach.hero.title": "Bessere Unterrichtsstunden in kürzerer Zeit planen",
  "products.teach.hero.subtitle":
    "KI-gestützte Unterrichtsplanung, die sich an Ihren Lehrplan anpasst, Stunden an Vorbereitungszeit spart und Ihnen hilft, ansprechende, standardkonforme Unterrichtsstunden zu erstellen.",
  "products.teach.hero.cta.primary": "Kostenlos starten",
  "products.teach.hero.cta.secondary": "Demo ansehen",

  "products.teach.turn.pain1": "Jede Woche Stunden damit verbringen, Unterrichtspläne von Grund auf zu erstellen",
  "products.teach.turn.pain2": "Schwierigkeiten bei der Differenzierung für verschiedene Lernende",
  "products.teach.turn.pain3": "Zeit für administrative Aufgaben statt für das Unterrichten verlieren",

  "products.teach.features.title": "Alles, was Sie für großartige Unterrichtsstunden brauchen",
  "products.teach.features.autoplanner.title": "Auto-Planer",
  "products.teach.features.autoplanner.desc":
    "Erstellen Sie in Minuten vollständige, an Ihre Lehrplanstandards angepasste Unterrichtspläne",
  "products.teach.features.curriculum.title": "Lehrplankonform",
  "products.teach.features.curriculum.desc":
    "Integrierte Unterstützung für Common Core, Landesstandards und internationale Lehrpläne",
  "products.teach.features.gamified.title": "Spielerische Aktivitäten",
  "products.teach.features.gamified.desc":
    "Erstellen Sie ansprechende, interaktive Aktivitäten, die Schüler motiviert halten",

  "products.teach.howItWorks.title": "So funktioniert es",
  "products.teach.howItWorks.step1.title": "Ziele festlegen",
  "products.teach.howItWorks.step1.desc": "Teilen Sie uns Ihr Fach, Ihre Klassenstufe und Lernziele mit",
  "products.teach.howItWorks.step2.title": "KI erstellt Plan",
  "products.teach.howItWorks.step2.desc":
    "Erhalten Sie in Sekunden einen vollständigen, standardkonformen Unterrichtsplan",
  "products.teach.howItWorks.step3.title": "Anpassen & Unterrichten",
  "products.teach.howItWorks.step3.desc": "Bearbeiten, speichern und teilen Sie Ihre Unterrichtsstunden mit Ihrem Team",

  "products.teach.whoItsFor.title": "Perfekt für",
  "products.teach.whoItsFor.item1": "Lehrkräfte, die Zeit bei der Unterrichtsplanung sparen möchten",
  "products.teach.whoItsFor.item2": "Pädagogen, die den Unterricht effektiver differenzieren möchten",
  "products.teach.whoItsFor.item3": "Schulen, die einen konsistenten, standardkonformen Lehrplan suchen",

  "products.teach.change.title": "Transformieren Sie Ihren Planungsprozess",
  "products.teach.change.step1": "Reduzieren Sie die Planungszeit von Stunden auf Minuten",
  "products.teach.change.step2": "Erstellen Sie ansprechendere, differenzierte Unterrichtsstunden",
  "products.teach.change.step3": "Stellen Sie die Übereinstimmung mit Lehrplanstandards sicher",
  "products.teach.change.step4": "Teilen und arbeiten Sie mit Ihrem Lehrerteam zusammen",

  "products.teach.social.title": "Was Lehrkräfte sagen",
  "products.teach.social.quote1":
    "Teach hat meine Planungszeit halbiert. Ich kann mich auf das Wesentliche konzentrieren - meine Schüler.",
  "products.teach.social.author1": "Emma Thompson, Grundschullehrerin",
  "products.teach.social.quote2": "Die Lehrplan-Ausrichtungsfunktion ist ein Game-Changer für unsere Abteilung.",
  "products.teach.social.author2": "Michael Chen, Fachbereichsleiter",

  "products.teach.cta.title": "Bereit, Ihre Planung zu transformieren?",
  "products.teach.cta.subtitle": "Schließen Sie sich Hunderten von Lehrkräften an, die 10+ Stunden pro Woche sparen",
  "products.teach.cta.primary": "Kostenlose Testversion starten",
  "products.teach.cta.secondary": "Demo planen",

  // Products - Draft (German)
  "products.draft.hero.eyebrow": "KI-SCHREIBASSISTENT FÜR LEHRKRÄFTE",
  "products.draft.hero.title": "Besser, schneller schreiben",
  "products.draft.hero.subtitle":
    "Verwandeln Sie grobe Notizen in ausgefeilte Eltern-E-Mails, Zeugnisse und Feedback in Minuten. Bewahren Sie Ihre Stimme und sparen Sie jede Woche Stunden.",
  "products.draft.hero.cta.primary": "Kostenlos starten",
  "products.draft.hero.cta.secondary": "Beispiele ansehen",

  "products.draft.turn.pain1": "2-3 Stunden pro Woche mit dem Schreiben von Eltern-E-Mails verbringen",
  "products.draft.turn.pain2": "Schwierigkeiten, den richtigen Ton für sensible Kommunikation zu finden",
  "products.draft.turn.pain3": "Immer wieder die gleichen Feedback-Kommentare schreiben",

  "products.draft.features.title": "Für Lehrerkommunikation entwickelt",
  "products.draft.features.toneGuardrails.title": "Ton-Leitplanken",
  "products.draft.features.toneGuardrails.desc":
    "Wählen Sie aus unterstützenden, formellen, prägnanten oder neutralen Tönen - immer professionell",
  "products.draft.features.translationChecks.title": "Übersetzungsprüfungen",
  "products.draft.features.translationChecks.desc": "Kommunizieren Sie selbstbewusst mit Familien in über 20 Sprachen",
  "products.draft.features.reviewSteps.title": "Überprüfungsschritte",
  "products.draft.features.reviewSteps.desc":
    "Integrierter Überprüfungsprozess gewährleistet Genauigkeit vor dem Senden",

  "products.draft.howItWorks.title": "So funktioniert es",
  "products.draft.howItWorks.step1.title": "Notizen einfügen",
  "products.draft.howItWorks.step1.desc": "Beginnen Sie mit Stichpunkten oder einem groben Entwurf",
  "products.draft.howItWorks.step2.title": "Ton wählen",
  "products.draft.howItWorks.step2.desc": "Wählen Sie die richtige Stimme für Ihre Nachricht",
  "products.draft.howItWorks.step3.title": "Überprüfen & Senden",
  "products.draft.howItWorks.step3.desc": "Bei Bedarf bearbeiten, dann kopieren oder exportieren",

  "products.draft.whoItsFor.title": "Perfekt für",
  "products.draft.whoItsFor.item1": "Lehrkräfte, die Elternkommunikation schreiben",
  "products.draft.whoItsFor.item2": "Pädagogen, die Zeugniskommentare erstellen",
  "products.draft.whoItsFor.item3": "Schulen, die konsistente, professionelle Kommunikation benötigen",

  "products.draft.change.title": "Was sich mit Draft ändert",
  "products.draft.change.step1": "2-Stunden-Aufgaben in 5 Minuten erledigt",
  "products.draft.change.step2": "Konsistenter, professioneller Ton in allen Kommunikationen",
  "products.draft.change.step3": "Selbstvertrauen in sensiblen Gesprächen",
  "products.draft.change.step4": "Mehr Zeit zum Unterrichten, weniger Zeit zum Schreiben",

  "products.draft.techNote.title": "Halluzinationssicher:",
  "products.draft.techNote.body":
    "Im Gegensatz zu generischer KI erfindet Draft niemals Schülerinformationen oder fabriziert Details. Jede Ausgabe basiert auf dem, was Sie bereitstellen.",

  "products.draft.social.title": "Was Lehrkräfte sagen",
  "products.draft.social.quote1": "Ich habe meinen Sonntag zurückbekommen. Draft verwandelt Stunden in Minuten.",
  "products.draft.social.author1": "Sarah Mitchell, Grundschullehrerin",
  "products.draft.social.quote2":
    "Die Tonoptionen helfen mir, selbstbewusst zu kommunizieren, auch in schwierigen Situationen.",
  "products.draft.social.author2": "James Rodriguez, Mittelschullehrer",

  "products.draft.cta.title": "Holen Sie sich Ihre Zeit zurück",
  "products.draft.cta.subtitle": "Schließen Sie sich 500+ Lehrkräften an, die jede Woche 10+ Stunden sparen",
  "products.draft.cta.primary": "Kostenlose Testversion starten",
  "products.draft.cta.secondary": "Beispiele ansehen",

  // Products - GradeFlow (German)
  "products.gradeflow.hero.title": "Schneller, fairer bewerten",
  "products.gradeflow.hero.subtitle":
    "KI-gestützter Bewertungsassistent, der Ihnen hilft, in der Hälfte der Zeit konsistentes, konstruktives Feedback zu geben.",
  "products.gradeflow.hero.cta": "Kostenlos starten",

  "products.gradeflow.turn.pain1": "4-6 Stunden pro Woche mit der Bewertung von Aufgaben verbringen",
  "products.gradeflow.turn.pain2": "Inkonsistentes Feedback bei ähnlichen Schülerarbeiten",
  "products.gradeflow.turn.pain3": "Schwierigkeiten, detaillierte, konstruktive Kommentare zu geben",

  "products.gradeflow.change.title": "Transformieren Sie Ihren Bewertungsprozess",
  "products.gradeflow.change.step1": "Aufgabe und Bewertungsraster hochladen",
  "products.gradeflow.change.step2": "KI analysiert Schülerarbeit anhand von Kriterien",
  "products.gradeflow.change.step3": "Vorgeschlagene Noten und Feedback überprüfen und anpassen",
  "products.gradeflow.change.step4": "Mit einem Klick in Ihr Notenbuch exportieren",

  "products.gradeflow.features.title": "Bewertung leicht gemacht",
  "products.gradeflow.features.faster.title": "3x schnellere Bewertung",
  "products.gradeflow.features.faster.desc":
    "Reduzieren Sie die Bewertungszeit von Stunden auf Minuten bei gleichbleibender Qualität",
  "products.gradeflow.features.fair.title": "Konsistentes Feedback",
  "products.gradeflow.features.fair.desc": "Stellen Sie faire, standardkonforme Bewertung für alle Schüler sicher",
  "products.gradeflow.features.audit.title": "Prüfpfad",
  "products.gradeflow.features.audit.desc": "Verfolgen Sie alle Bewertungsentscheidungen mit vollständiger Transparenz",

  "products.gradeflow.social.title": "Was Lehrkräfte sagen",
  "products.gradeflow.social.quote1":
    "GradeFlow hat meine Bewertungszeit halbiert, ohne die Qualität zu beeinträchtigen.",
  "products.gradeflow.social.author1": "Lisa Park, Gymnasiallehrerin Englisch",
  "products.gradeflow.social.quote2": "Mein Feedback ist jetzt konsistenter und hilfreicher.",
  "products.gradeflow.social.author2": "David Kim, Mittelschullehrer Mathematik",

  "products.gradeflow.cta.title": "Bereit, intelligenter zu bewerten?",
  "products.gradeflow.cta.button": "Kostenlose Testversion starten",

  // Products - Shield (German)
  "shield.hero.eyebrow": "KI-GOVERNANCE FÜR SCHULEN",
  "shield.hero.title": "Sichere, konforme KI für Ihre Schule",
  "shield.hero.subtitle":
    "Enterprise-Grade KI-Governance-Plattform, die sichere, ethische und konforme KI-Nutzung in Ihrer gesamten Schule oder Ihrem Bezirk gewährleistet.",
  "shield.hero.cta.primary": "Mehr erfahren",
  "shield.hero.cta.secondary": "Vertrieb kontaktieren",

  "shield.trust.gdpr": "DSGVO-konform",
  "shield.trust.ferpa": "FERPA-konform",
  "shield.trust.schoolReady": "Schulbereit",

  "shield.problem.title": "Die KI-Governance-Herausforderung",
  "shield.problem.card1.title": "Datenschutzrisiken",
  "shield.problem.card1.description":
    "Lehrkräfte, die Verbraucher-KI-Tools verwenden, können versehentlich Schülerdaten offenlegen",
  "shield.problem.card2.title": "Compliance-Bedenken",
  "shield.problem.card2.description":
    "Schulen haben Schwierigkeiten sicherzustellen, dass die KI-Nutzung FERPA, DSGVO und lokale Vorschriften erfüllt",
  "shield.problem.card3.title": "Mangelnde Aufsicht",
  "shield.problem.card3.description": "Keine Sichtbarkeit, wie KI in Klassenzimmern und Abteilungen verwendet wird",

  "shield.solution.title": "Vollständige KI-Governance in einer Plattform",
  "shield.solution.subtitle": "Überwachen, kontrollieren und prüfen Sie die gesamte KI-Nutzung in Ihrer Schule",
  "shield.solution.card1.title": "Zentralisierte Kontrolle",
  "shield.solution.card1.description":
    "Legen Sie schulweite Richtlinien für die KI-Nutzung mit granularen Berechtigungen fest",
  "shield.solution.card2.title": "Prüfpfad",
  "shield.solution.card2.description": "Vollständige Sichtbarkeit aller KI-Interaktionen und Datenflüsse",
  "shield.solution.card3.title": "Datenschutz",
  "shield.solution.card3.description": "Automatische PII-Erkennung und -Schwärzung vor der KI-Verarbeitung",
  "shield.solution.card4.title": "Richtliniendurchsetzung",
  "shield.solution.card4.description": "Automatisierte Compliance-Prüfungen gegen die Richtlinien Ihrer Schule",
  "shield.solution.cta": "Alle Funktionen erkunden",

  "shield.howItWorks.title": "So funktioniert Shield",
  "shield.howItWorks.step1.title": "Tools verbinden",
  "shield.howItWorks.step1.description": "Integrieren Sie Shield mit Ihren vorhandenen KI-Tools und Plattformen",
  "shield.howItWorks.step2.title": "Richtlinien festlegen",
  "shield.howItWorks.step2.description": "Definieren Sie Regeln für KI-Nutzung, Datenverarbeitung und Compliance",
  "shield.howItWorks.step3.title": "Überwachen & Prüfen",
  "shield.howItWorks.step3.description":
    "Verfolgen Sie die Nutzung, überprüfen Sie Protokolle und stellen Sie Compliance sicher",
  "shield.howItWorks.cta": "Loslegen",

  "shield.socialProof.title": "Vertraut von Schulen weltweit",
  "shield.socialProof.quote":
    "Shield gibt uns das Vertrauen, KI zu nutzen und gleichzeitig die Privatsphäre unserer Schüler zu schützen. Es ist wesentliche Infrastruktur für moderne Schulen.",
  "shield.socialProof.attribution": "Dr. Jennifer Martinez",
  "shield.socialProof.role": "Technologiedirektorin, Springfield School District",

  "shield.useCases.title": "Für Bildung entwickelt",
  "shield.useCases.card1.title": "Lehrer-KI-Tools",
  "shield.useCases.card1.description": "Verwalten Sie KI-Schreibassistenten, Unterrichtsplaner und Bewertungstools",
  "shield.useCases.card2.title": "Schüler-KI-Nutzung",
  "shield.useCases.card2.description": "Überwachen und leiten Sie angemessene KI-Nutzung in Schülerarbeiten",
  "shield.useCases.card3.title": "Administrative KI",
  "shield.useCases.card3.description": "Sichere KI-Nutzung für Planung, Kommunikation und Betrieb",

  "shield.comparison.title": "Shield vs. Manuelle Governance",
  "shield.comparison.feature": "Funktion",
  "shield.comparison.shield": "Mit Shield",
  "shield.comparison.manual": "Manueller Prozess",
  "shield.comparison.row1.feature": "Richtliniendurchsetzung",
  "shield.comparison.row1.shield": "Automatisiert",
  "shield.comparison.row1.manual": "Manuelle Prüfungen",
  "shield.comparison.row2.feature": "Prüfpfad",
  "shield.comparison.row2.shield": "Vollständige Protokolle",
  "shield.comparison.row2.manual": "Unvollständige Aufzeichnungen",
  "shield.comparison.row3.feature": "PII-Schutz",
  "shield.comparison.row3.shield": "Automatisch",
  "shield.comparison.row3.manual": "Manuelle Überprüfung",

  "shield.pricing.title": "Enterprise-Preise",
  "shield.pricing.description":
    "Individuelle Preisgestaltung basierend auf Ihrer Schulgröße und Ihren Anforderungen. Kontaktieren Sie uns für ein Angebot.",
  "shield.pricing.cta": "Preise erhalten",

  "shield.finalCta.title": "Bereit, die KI Ihrer Schule zu sichern?",
  "shield.finalCta.subtitle":
    "Schließen Sie sich zukunftsorientierten Schulen an, die Shield nutzen, um KI sicher einzusetzen",
  "shield.finalCta.primary": "Demo planen",
  "shield.finalCta.secondary": "Vertrieb kontaktieren",
  "shield.finalCta.note": "Enterprise-Support und Onboarding inklusive",

  // FAQ Page (German)
  "faq.hero.eyebrow": "HÄUFIG GESTELLTE FRAGEN",
  "faq.hero.title": "Wie können wir Ihnen helfen?",
  "faq.hero.subtitle": "Finden Sie Antworten auf häufige Fragen zu Zaza Draft und unseren KI-Tools für Lehrkräfte.",

  // FAQ Categories (German)
  "faq.category.about.title": "Über Zaza Draft",
  "faq.category.safety.title": "Sicherheit & Datenschutz",
  "faq.category.features.title": "Funktionen & Möglichkeiten",
  "faq.category.pricing.title": "Preise & Pläne",
  "faq.category.languages.title": "Sprachen & Übersetzung",
  "faq.category.schools.title": "Für Schulen & Bezirke",

  // About Questions (German)
  "faq.about.q1": "Was ist Zaza Draft?",
  "faq.about.a1":
    "Zaza Draft ist ein KI-gestützter Schreibassistent, der speziell für Lehrkräfte entwickelt wurde. Er hilft Ihnen, grobe Notizen in ausgefeilte Eltern-E-Mails, Zeugnisse, Bewertungskommentare und andere pädagogische Kommunikation in Minuten zu verwandeln, während Sie Ihre authentische Stimme bewahren.",

  "faq.about.q2": "Wie unterscheidet sich Zaza Draft von ChatGPT oder anderen KI-Tools?",
  "faq.about.a2":
    "Im Gegensatz zu generischen KI-Tools ist Zaza Draft speziell auf pädagogische Kommunikation und Pädagogik trainiert. Es ist halluzinationssicher (erfindet niemals Schülerinformationen), bietet bildungsspezifische Tonoptionen, ist von Grund auf FERPA-konform und bietet spezialisierte Workflows für gängige Schreibaufgaben von Lehrkräften.",

  "faq.about.q3": "Für wen ist Zaza Draft gedacht?",
  "faq.about.a3":
    "Zaza Draft ist für K-12-Lehrkräfte, Pädagogen, Schuladministratoren und alle, die an pädagogischer Kommunikation beteiligt sind, konzipiert. Egal, ob Sie Eltern-E-Mails, Zeugnisse, Feedback-Kommentare oder Schulankündigungen schreiben, Draft hilft Ihnen, Zeit zu sparen und gleichzeitig professionelle Qualität zu wahren.",

  "faq.about.q4": "Benötige ich technische Kenntnisse, um Zaza Draft zu verwenden?",
  "faq.about.a4":
    "Keine technischen Kenntnisse erforderlich! Zaza Draft ist unglaublich einfach zu bedienen: Notizen einfügen, Ton wählen und ausgefeilte Ausgabe erhalten. Wenn Sie E-Mails verwenden können, können Sie Draft verwenden.",

  "faq.about.q5": "Kann ich Zaza Draft vor einer Verpflichtung ausprobieren?",
  "faq.about.a5":
    "Ja! Wir bieten eine kostenlose Testversion an, damit Sie erleben können, wie Draft Ihnen Zeit spart und Ihre Kommunikation verbessert. Keine Kreditkarte zum Starten erforderlich.",

  "faq.about.q6": "Bei welchen Arten von Texten kann Zaza Draft helfen?",
  "faq.about.a6":
    "Draft spezialisiert sich auf sechs Schlüsselbereiche: Elternnachrichten, Zeugnisse, Bewertungskommentare, Schulkommunikation, Empfehlungsschreiben und Dokumentation. Es ist für die alltäglichen Schreibaufgaben von Lehrkräften entwickelt.",

  "faq.about.q7": "Wie viel Zeit kann ich mit Zaza Draft sparen?",
  "faq.about.a7":
    "Lehrkräfte, die Draft verwenden, berichten, dass sie über 10 Stunden pro Woche bei Schreibaufgaben sparen. Aufgaben, die normalerweise 2 Stunden dauern, können mit Drafts Hilfe in 5 Minuten erledigt werden.",

  "faq.about.q8": "Kann ich die Ausgabe anpassen?",
  "faq.about.a8":
    "Absolut! Draft bietet einen Ausgangspunkt, den Sie bearbeiten und verfeinern können. Sie behalten die volle Kontrolle über die endgültige Nachricht - Draft hilft Ihnen nur, schneller dorthin zu gelangen.",

  "faq.about.q9": "Funktioniert Zaza Draft in meinem Land?",
  "faq.about.a9":
    "Ja! Zaza Draft ist weltweit verfügbar und unterstützt Kommunikation in über 20 Sprachen. Egal, ob Sie in den USA, Großbritannien, Kanada, Australien oder anderswo sind, Draft kann Ihnen helfen, effektiv zu kommunizieren.",

  "faq.about.q10": "Was ist das Zaza-Produktökosystem?",
  "faq.about.a10":
    "Zaza bietet eine Suite von KI-Tools für Bildung: Draft (Schreibassistent), Teach (Unterrichtsplanung), GradeFlow (Bewertungsassistent) und Shield (KI-Governance). Jedes Tool ist darauf ausgelegt, spezifische Herausforderungen von Lehrkräften zu lösen.",

  "faq.about.q11": "Wie fange ich an?",
  "faq.about.a11":
    "Melden Sie sich einfach für ein kostenloses Konto an, fügen Sie Ihren ersten Entwurf oder Notizen ein, wählen Sie Ihren gewünschten Ton und beobachten Sie, wie Draft Ihr Schreiben transformiert. Sie werden innerhalb von Minuten nach dem Start Zeit sparen.",

  // Safety Questions (German)
  "faq.safety.q1": "Sind meine Daten bei Zaza Draft sicher?",
  "faq.safety.a1":
    "Ja. Wir nehmen Datensicherheit ernst. Alle Daten sind während der Übertragung und im Ruhezustand verschlüsselt, wir sind FERPA-konform und wir verwenden Ihre Daten niemals zum Trainieren unserer Modelle oder teilen sie mit Dritten. Ihre Kommunikation bleibt privat und sicher.",

  "faq.safety.q2": "Was bedeutet 'halluzinationssicher'?",
  "faq.safety.a2":
    "Halluzinationssicher bedeutet, dass Draft niemals Schülerinformationen erfindet, Elterngespräche fabriziert oder fiktive Details über Ihre Klasse erstellt. Jede Ausgabe basiert auf dem, was Sie tatsächlich bereitstellen - keine erfundenen Fakten oder Szenarien.",

  "faq.safety.q3": "Ist Zaza Draft FERPA-konform?",
  "faq.safety.a3":
    "Ja. Zaza Draft ist mit Blick auf FERPA-Konformität entwickelt. Wir implementieren angemessene Schutzmaßnahmen zum Schutz der Privatsphäre von Schülern und Bildungsunterlagen, und wir teilen oder verkaufen niemals Schülerdaten.",

  "faq.safety.q4": "Kann ich Schülernamen in meinen Entwürfen verwenden?",
  "faq.safety.a4":
    "Ja, Sie können Schülernamen und relevante Details einbeziehen. Draft verarbeitet diese Informationen sicher und speichert oder verwendet sie niemals über die Generierung Ihrer spezifischen Ausgabe hinaus. Alle Schülerinformationen bleiben vertraulich.",

  "faq.safety.q5": "Was passiert mit meinen Daten, nachdem ich Draft verwendet habe?",
  "faq.safety.a5":
    "Ihre Entwürfe und Ausgaben werden sicher in Ihrem Konto gespeichert, aber wir verwenden sie niemals zum Trainieren unserer KI-Modelle. Sie können Ihre Daten jederzeit aus Ihren Kontoeinstellungen löschen.",

  "faq.safety.q6": "Ist Zaza Draft DSGVO-konform?",
  "faq.safety.a6":
    "Ja. Wir erfüllen die DSGVO-Anforderungen für Datenschutz und Privatsphäre. Benutzer haben volle Kontrolle über ihre Daten, einschließlich des Rechts auf Zugriff, Korrektur und Löschung ihrer Informationen.",

  // Features Questions (German)
  "faq.features.q1": "Welche Tonoptionen sind verfügbar?",
  "faq.features.a1":
    "Draft bietet vier bildungsspezifische Töne: Unterstützend (warm und ermutigend), Formal (professionell und strukturiert), Prägnant (kurz und direkt) und Neutral (ausgewogen und objektiv). Jeder Ton ist für pädagogische Kommunikation kalibriert.",

  "faq.features.q2": "Kann Draft meine Nachrichten übersetzen?",
  "faq.features.a2":
    "Ja! Draft kann Ihre Kommunikation in über 20 Sprachen übersetzen, was es einfach macht, mit Familien zu kommunizieren, die verschiedene Sprachen sprechen. Übersetzungen bewahren den angemessenen Ton und pädagogischen Kontext.",

  "faq.features.q3": "Funktioniert Draft mit den Systemen meiner Schule?",
  "faq.features.a3":
    "Draft generiert Text, den Sie einfach in jedes System kopieren und einfügen können - E-Mail, Lernmanagementsysteme, Notenbücher oder Textverarbeitungsprogramme. Keine speziellen Integrationen erforderlich.",

  "faq.features.q4": "Kann ich Vorlagen oder häufig verwendete Phrasen speichern?",
  "faq.features.a4":
    "Ja! Sie können Ihre Lieblingsausgaben als Vorlagen für die zukünftige Verwendung speichern, was es noch schneller macht, ähnliche Kommunikation in der Zukunft zu erstellen.",

  "faq.features.q5": "Funktioniert Draft auf mobilen Geräten?",
  "faq.features.a5":
    "Ja! Zaza Draft ist vollständig responsiv und funktioniert auf Smartphones, Tablets und Computern. Schreiben und verfeinern Sie Kommunikation, wo immer Sie sind.",

  "faq.features.q6": "Können mehrere Lehrkräfte Vorlagen teilen?",
  "faq.features.a6":
    "Mit unseren Schulplänen können Teams Vorlagen und Best Practices teilen und so eine konsistente Kommunikation in Ihrer Abteilung oder Schule gewährleisten.",

  // Pricing Questions (German)
  "faq.pricing.q1": "Wie viel kostet Zaza Draft?",
  "faq.pricing.a1":
    "Wir bieten flexible Preispläne für einzelne Lehrkräfte und Schulen. Besuchen Sie unsere Preisseite für aktuelle Tarife und Plandetails. Wir bieten auch eine kostenlose Testversion an, damit Sie Draft vor einer Verpflichtung erleben können.",

  "faq.pricing.q2": "Gibt es eine kostenlose Version?",
  "faq.pricing.a2":
    "Wir bieten eine kostenlose Testphase an, damit Sie die volle Leistung von Draft erleben können. Nach der Testphase können Sie einen Plan wählen, der Ihren Bedürfnissen und Ihrem Budget entspricht.",

  "faq.pricing.q3": "Bieten Sie Schul- oder Bezirkspreise an?",
  "faq.pricing.a3":
    "Ja! Wir bieten spezielle Preise für Schulen und Bezirke an, einschließlich Mengenrabatten, zentralisierter Abrechnung und zusätzlicher Funktionen wie Teamzusammenarbeit und Admin-Kontrollen. Kontaktieren Sie unser Vertriebsteam für ein individuelles Angebot.",

  "faq.pricing.q4": "Kann ich jederzeit kündigen?",
  "faq.pricing.a4":
    "Ja. Es gibt keine langfristigen Verträge für individuelle Pläne. Sie können Ihr Abonnement jederzeit kündigen und behalten den Zugriff bis zum Ende Ihres Abrechnungszeitraums.",

  // Languages Questions (German)
  "faq.languages.q1": "Welche Sprachen unterstützt Draft?",
  "faq.languages.a1":
    "Draft unterstützt Kommunikation in über 20 Sprachen, darunter Spanisch, Französisch, Deutsch, Mandarin, Arabisch, Portugiesisch und viele mehr. Sie können auf Englisch schreiben und in jede unterstützte Sprache übersetzen oder direkt in Ihrer bevorzugten Sprache schreiben.",

  "faq.languages.q2": "Wie genau sind die Übersetzungen?",
  "faq.languages.a2":
    "Unsere Übersetzungen sind speziell für pädagogische Kontexte kalibriert und bewahren angemessenen Ton und Formalität. Während wir empfehlen, Übersetzungen für kritische Kommunikation von Muttersprachlern überprüfen zu lassen, sind unsere Übersetzungen sehr genau und kontextuell angemessen.",

  "faq.languages.q3": "Kann Draft mir helfen, mit mehrsprachigen Familien zu kommunizieren?",
  "faq.languages.a3":
    "Absolut! Draft macht es einfach, dieselbe Nachricht in mehreren Sprachen zu senden und sicherzustellen, dass alle Familien Kommunikation in ihrer bevorzugten Sprache erhalten. Dies hilft, stärkere Schule-Heim-Verbindungen aufzubauen.",

  // Schools Questions (German)
  "faq.schools.q1": "Wie funktioniert Zaza Draft für ganze Schulen oder Bezirke?",
  "faq.schools.a1":
    "Unsere Schul- und Bezirkspläne umfassen zentralisierte Verwaltung, Teamzusammenarbeitsfunktionen, gemeinsame Vorlagen, Nutzungsanalysen, vorrangigen Support und Mengenpreise. Administratoren können Lizenzen verwalten, die Nutzung überwachen und konsistente Kommunikationsstandards in der gesamten Organisation sicherstellen.",

  "faq.schools.q2": "Bieten Sie Schulungen und Support für Schulen an?",
  "faq.schools.a2":
    "Ja! Schul- und Bezirkspläne umfassen Onboarding-Support, Schulungsmaterialien und fortlaufende Ressourcen für die berufliche Weiterentwicklung. Wir helfen sicherzustellen, dass Ihr gesamtes Team Draft effektiv nutzen kann, um Zeit zu sparen und die Kommunikation zu verbessern.",

  // FAQ CTA (German)
  "faq.cta.title": "Haben Sie noch Fragen?",
  "faq.cta.subtitle":
    "Unser Support-Team ist hier, um zu helfen. Kontaktieren Sie uns und wir melden uns innerhalb von 24 Stunden bei Ihnen.",
  "faq.cta.button": "Support kontaktieren",

  // About Overview Page (German)
  "about.overview.hero.eyebrow": "ÜBER ZAZA",
  "about.overview.hero.title": "Die Zukunft der Lehrertechnologie gestalten",
  "about.overview.hero.subtitle":
    "Unsere Mission ist es, Lehrkräften ihre Zeit zurückzugeben, indem wir KI-Tools entwickeln, die Bildung wirklich verstehen.",

  "about.overview.mission.title": "Unsere Mission",
  "about.overview.mission.body":
    "Jede Lehrkraft verdient Tools, die ihre Expertise respektieren, ihre Schüler schützen und ihnen Zeit geben, das zu tun, was sie am besten können: unterrichten. Wir entwickeln KI, die Lehrkräften dient, nicht umgekehrt.",

  "about.overview.values.title": "Unsere Werte",
  "about.overview.values.teacherFirst.title": "Lehrkraft-zentriertes Design",
  "about.overview.values.teacherFirst.body":
    "Jede Funktion wird mit echten Lehrkräften entwickelt, in echten Klassenzimmern getestet und basierend auf echtem Feedback verfeinert.",
  "about.overview.values.safety.title": "Sicherheit durch Design",
  "about.overview.values.safety.body":
    "Wir entwickeln halluzinationssichere KI, die niemals Schülerinformationen erfindet oder Details über Ihre Klasse fabriziert.",
  "about.overview.values.privacy.title": "Datenschutz zuerst",
  "about.overview.values.privacy.body":
    "Von Anfang an FERPA-konform. Ihre Daten gehören Ihnen, und wir verwenden sie niemals zum Trainieren unserer Modelle.",
  "about.overview.values.evidence.title": "Evidenzbasiert",
  "about.overview.values.evidence.body":
    "Basierend auf echter Pädagogik und Bildungsforschung, nicht auf generischen Business-Schreibmustern.",

  "about.overview.timeline.title": "Unsere Reise",
  "about.overview.timeline.2023.title": "Gründung",
  "about.overview.timeline.2023.body":
    "Begonnen mit einer einfachen Frage: Warum verbringen Lehrkräfte so viel Zeit mit Schreiben, wenn KI helfen könnte?",
  "about.overview.timeline.2024.title": "Start",
  "about.overview.timeline.2024.body":
    "Veröffentlichung von Zaza Draft für über 100 Beta-Lehrkräfte. Über 50.000 Stunden Schreibzeit gespart.",
  "about.overview.timeline.2025.title": "Wachstum",
  "about.overview.timeline.2025.body":
    "Expansion auf über 500 Lehrkräfte in 15 Ländern. Start von Teach, GradeFlow und Shield.",

  "about.overview.cta.title": "Möchten Sie mehr erfahren?",
  "about.overview.cta.body":
    "Kontaktieren Sie unser Team, um zu besprechen, wie Zaza Ihrer Schule oder Ihrem Bezirk helfen kann.",
  "about.overview.cta.button": "Kontaktieren Sie uns",

  // About Company Page (German)
  "about.company.hero.eyebrow": "UNSER UNTERNEHMEN",
  "about.company.hero.title": "Zaza Technologies",
  "about.company.hero.subtitle":
    "Wir sind ein Team aus Pädagogen, Ingenieuren und Designern, die die Zukunft der Lehrertechnologie gestalten.",

  "about.company.body.p1":
    "Zaza Technologies wurde 2023 von Lehrkräften gegründet, die von generischen KI-Tools frustriert waren, die Bildung nicht verstanden. Wir sahen Lehrkräfte, die Stunden mit administrativen Schreibaufgaben verbrachten, die automatisiert werden könnten, aber bestehende KI-Tools waren entweder unsicher für Schülerdaten oder produzierten Ausgaben, die überhaupt nicht wie eine Lehrkraft klangen.",

  "about.company.body.p2":
    "Also haben wir etwas anderes entwickelt: KI-Tools, die speziell auf pädagogische Kommunikation und Pädagogik trainiert sind. Tools, die die Nuancen der Eltern-Lehrer-Kommunikation verstehen, die Bedeutung konstruktiven Feedbacks und die Notwendigkeit, Ihre authentische Stimme zu bewahren. Tools, die halluzinationssicher, FERPA-konform und von Grund auf für Bildung entwickelt sind.",

  "about.company.body.p3":
    "Heute dient Zaza über 500 Lehrkräften in 15 Ländern und spart ihnen über 10 Stunden pro Woche bei Schreibaufgaben. Aber wir fangen gerade erst an. Unsere Vision ist es, eine vollständige Suite von KI-Tools zu entwickeln, die Lehrkräften helfen, ihre Zeit zurückzugewinnen und sich auf das Wichtigste zu konzentrieren: ihre Schüler.",

  "about.company.stats.teachers.label": "Lehrkräfte nutzen Zaza",
  "about.company.stats.teachers.value": "500+",
  "about.company.stats.countries.label": "Länder",
  "about.company.stats.countries.value": "15",
  "about.company.stats.timeSaved.label": "Wöchentlich gesparte Stunden",
  "about.company.stats.timeSaved.value": "10+",

  // Founder Hero Section (German)
  "founder.hero.headline": "Lernen Sie den Gründer kennen, der KI für Lehrkräfte entwickelt",
  "founder.hero.subheading":
    "Dr. Greg Blackburn verbrachte 15 Jahre in Klassenzimmern, bevor er Zaza entwickelte - KI-Tools, die verstehen, was Lehrkräfte wirklich brauchen.",
  "founder.hero.label": "GRÜNDER & CEO",
  "founder.hero.name": "Dr. Greg Blackburn",
  "founder.hero.tagline": "Ehemaliger Lehrer, EdTech-Entwickler, KI-Befürworter",

  // Founder Journey Section (German)
  "founder.journey.title": "Die Reise",
  "founder.journey.quote":
    "Ich habe Zaza entwickelt, weil ich es satt hatte, Lehrkräfte in administrativer Arbeit ertrinken zu sehen, wenn Technologie sie befreien sollte.",
  "founder.journey.p1":
    "Ich begann meine Karriere 2008 als Gymnasiallehrer für Englisch. Wie die meisten Lehrkräfte liebte ich die Arbeit mit Schülern, kämpfte aber mit den endlosen administrativen Aufgaben - Eltern-E-Mails, Zeugnisse, Bewertungsfeedback. Ich verbrachte meine Abende und Wochenenden mit Schreiben, wenn ich großartige Unterrichtsstunden hätte planen oder Zeit mit meiner Familie verbringen sollen.",
  "founder.journey.p2":
    "Nach meiner Promotion in Bildungstechnologie arbeitete ich mit Schulen an der Implementierung von KI-Tools. Aber ich sah immer wieder dasselbe Problem: Generische KI-Tools waren nicht für Bildung entwickelt. Sie erfanden Schülerinformationen, produzierten Ausgaben, die überhaupt nicht wie eine Lehrkraft klangen, und schufen mehr Arbeit als sie sparten. Lehrkräfte brauchten etwas anderes.",
  "founder.journey.p3":
    "Also gründete ich 2023 Zaza Technologies mit einer einfachen Mission: KI-Tools entwickeln, die Bildung wirklich verstehen. Tools, die auf echter Pädagogik trainiert sind, nicht auf Business-Texten. Tools, die halluzinationssicher, FERPA-konform und von Grund auf für Lehrkräfte entwickelt sind. Tools, die die Expertise von Lehrkräften respektieren und ihnen ihre Zeit zurückgeben.",
  "founder.journey.p4":
    "Heute dient Zaza über 500 Lehrkräften in 15 Ländern und spart ihnen über 10 Stunden pro Woche. Aber wir fangen gerade erst an. Meine Vision ist es, eine vollständige Suite von KI-Tools zu entwickeln, die jeder Lehrkraft hilft, ihre Zeit zurückzugewinnen und sich auf das Wichtigste zu konzentrieren: ihre Schüler.",

  // Founder Mission Callout (German)
  "founder.mission.quote":
    "Jede Lehrkraft verdient Tools, die ihre Expertise respektieren, ihre Schüler schützen und ihnen Zeit geben, das zu tun, was sie am besten können: unterrichten.",
  "founder.mission.attribution": "Dr. Greg Blackburn, Gründer & CEO",

  // Founder Why Zaza Section (German)
  "founder.whyZaza.title": "Warum ich Zaza entwickelt habe",
  "founder.whyZaza.subtitle": "Drei Prinzipien, die alles leiten, was wir tun",
  "founder.whyZaza.card1.title": "Für Lehrkräfte, von Lehrkräften",
  "founder.whyZaza.card1.body":
    "Ich habe die Lehrererfahrung gelebt - die späten Nächte, die endlosen E-Mails, die Zeugnismarathons. Zaza wird von jemandem entwickelt, der es versteht, weil ich dort war.",
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
  "founder.personal.name": "Dr. Greg Blackburn",
  "founder.personal.title2": "Gründer & CEO",
  "founder.personal.company": "Zaza Technologies",
  "founder.personal.cta": "Kontakt aufnehmen",
}

const translationsEs: Record<string, string> = {}

const translationsFr: Record<string, string> = {}

const translationsIt: Record<string, string> = {}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    const translations = {
      en: translationsEn,
      de: translationsDe,
      es: translationsEs,
      fr: translationsFr,
      it: translationsIt,
    }

    return translations[language][key] || translationsEn[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
