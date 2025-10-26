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
  "nav.products.suite": "Zaza Suite",
  "nav.products.teach": "Zaza Teach",
  "nav.products.draft": "Zaza Draft",
  "nav.products.gradeflow": "GradeFlow",
  "nav.products.shield": "Zaza Shield",
  "nav.learningCentre": "Learning Centre",
  "nav.resources": "Resources",
  "nav.faq": "FAQ",
  "nav.about": "About",
  "nav.getStarted": "Get Started",

  // Suite Page Hero (EN)
  "suite.hero.title": "Zaza is a family of safe, teacher-first AI apps that work together to reduce workload and strengthen teacher efficiency and well-being.",
  "suite.hero.subhead": "Every app is powered by the Zaza KnowledgeCore platform for trusted, explainable AI and consistent, school-ready safeguards.",

  // Suite - Teacher First
  "suite.teacherFirst.title": "Built for teachers",
  "suite.teacherFirst.body": "Zaza gives time back and lets educators focus on teaching. Everything is designed with privacy, safeguarding and pedagogy at the core so schools can trust what they deploy.",

  // Suite - Core Apps
  "suite.coreApps.title": "The four core apps",
  "suite.teach.body": "AI lesson planning that adapts to your curriculum, saves hours of prep time, and keeps lessons engaging and standards-aligned.",
  "suite.teach.li1": "Auto-planner: complete lesson structure in minutes",
  // Features page (EN) - How it works and CTA
  "features.how.title": "How it works",
  "features.how.subtitle": "Three simple steps to better parent messages",
  "features.how.step1.title": "Enter your message",
  "features.how.step1.desc": "Type or paste your draft comment about the student",
  "features.how.step2.title": "Get instant feedback",
  "features.how.step2.desc": "Draft analyzes tone, clarity, and appropriateness",
  "features.how.step3.title": "Copy and send",
  "features.how.step3.desc": "Export your polished message in seconds",
  "features.cta.title": "Start writing better messages today",
  "features.cta.subtitle": "Try Draft free with 5 comments",
  "features.cta.primary": "Get started",

  // Resources page (EN)
  "resources.title": "Free Resources for Teachers",
  "resources.subtitle": "Time-savers you can use today. Download as PDF or DOCX.",
  "resources.download": "Download",
  "resources.comingSoon": "Coming Soon",
  "resources.published": "Published",
  "suite.teach.li2": "Curriculum-aware: Common Core + international frameworks",
  "suite.teach.li3": "Differentiation helpers and creative activity ideas",
  "suite.teach.cta": "Learn more about Teach",

  "suite.draft.body": "Comment and report writing without burnout - clear, kind communication grounded in teacher wellbeing research.",
  "suite.draft.li1": "Report and comment templates you can personalize",
  "suite.draft.li2": "Tone guidance and bias checks for fair, supportive feedback",
  "suite.draft.li3": "Private by default; designed for professional, parent-ready copy",
  "suite.draft.cta": "Learn more about Draft",

  "suite.gradeflow.body": "An explainable grading copilot with OCR, rubrics and evidence-based feedback - faster marking with fairness and consistency.",
  "suite.gradeflow.li1": "Rubric-aligned, audit-ready feedback with cited evidence",
  "suite.gradeflow.li2": "Consistency across classes and assessors",
  "suite.gradeflow.li3": "Exportable marksheets and moderation support",
  "suite.gradeflow.cta": "Learn more about GradeFlow",

  "suite.shield.body": "Communication management that protects teacher wellbeing - drafts difficult emails and helps maintain healthy boundaries.",
  "suite.shield.li1": "Draft assistant for sensitive parent and admin messages",
  "suite.shield.li2": "Boundary prompts and escalation guidance",
  "suite.shield.li3": "Professional, consistent communication patterns",
  "suite.shield.cta": "Learn more about Shield",

  // Suite - Platform
  "suite.platform.title": "Zaza KnowledgeCore (Platform)",
  "suite.platform.body": "KnowledgeCore is the secure, intelligent platform that powers every Zaza app. It organizes teacher documents, enforces privacy and compliance, and provides explainable, audit-ready AI across the suite. It's not sold as a separate product - it's how the Zaza apps stay consistent, safe and connected.",
  "suite.platform.li1": "Privacy and safeguarding by design",
  "suite.platform.li2": "Shared context across apps (no re-uploading)",
  "suite.platform.li3": "Explainable outputs, rubric alignment and audit trails",

  // Suite - Why Schools
  "suite.why.title": "Why schools choose Zaza",
  "suite.why.timeSaved": "Time saved: Teachers recover hours each week.",
  "suite.why.retention": "Retention supported: Lower stress and fairer workload.",
  "suite.why.safety": "Safe and compliant: Data privacy and safeguarding, by default.",
  "suite.why.evidence": "Evidence-based: Pedagogy and auditability, not just speed.",

  // Suite - Roadmap
  "suite.roadmap.title": "Roadmap-ready",
  "suite.roadmap.body": "Coming extensions include smarter parent communication, formative assessment synthesis, and differentiation support - all delivered via KnowledgeCore so teachers benefit everywhere, not in one tool only.",

  // Suite - CTA
  "suite.cta.title": "Start exploring today",
  "suite.cta.body": "Whether you're a teacher seeking relief or a school looking for scalable support, Zaza helps your staff thrive.",
  "suite.cta.primary": "Explore our solutions",
  "suite.cta.secondary": "Talk to our team",

  // Suite - Trust Bar (EN)
  "suite.trust.hallucinationSafe": "Hallucination-safe",
  "suite.trust.ferpa": "FERPA compliant",
  "suite.trust.teachers": "500+ teachers",

  // Suite - How It Works (EN)
  "suite.hiw.title": "How the suite works",
  "suite.hiw.step1.title": "Pick the right app",
  "suite.hiw.step1.desc": "Teach for planning, Draft for writing, GradeFlow for grading, Shield for boundaries.",
  "suite.hiw.step2.title": "Add your context",
  "suite.hiw.step2.desc": "Curriculum, class details, rubrics and tone feed KnowledgeCore once, used everywhere.",
  "suite.hiw.step3.title": "Get school-ready outputs",
  "suite.hiw.step3.desc": "Trusted, explainable results with consistent safeguards across every workflow.",

  // Suite - Testimonials (EN)
  "suite.testimonials.title": "What teachers say",
  "suite.testimonials.1.quote": "I get my Sunday back. Planning and parent comms now take minutes, not hours.",
  "suite.testimonials.1.author": "Sarah Mitchell",
  "suite.testimonials.1.role": "Primary Teacher, UK",
  "suite.testimonials.2.quote": "Consistent grading with clear evidence trails. GradeFlow raised quality across classes.",
  "suite.testimonials.2.author": "Michael Brown",
  "suite.testimonials.2.role": "High School Teacher, US",
  "suite.testimonials.3.quote": "Draft protects tone and wellbeing. I communicate more, with less stress.",
  "suite.testimonials.3.author": "Emma Rodriguez",
  "suite.testimonials.3.role": "Middle School Teacher, CA",

  // Suite - Logos (EN)
  "suite.logos.title": "Trusted by educators at",
  "suite.logos.item1": "Oakridge High",
  "suite.logos.item2": "Riverstone Elementary",
  "suite.logos.item3": "Northfield Academy",
  "suite.logos.item4": "St. Mary's College",
  "suite.logos.item5": "Greenwood School",

  // Suite - Screenshots (EN)
  "suite.screens.title": "Real product screenshots",
  "suite.screens.caption": "A quick peek at planning, writing, and grading flows.",

  // Videos (EN)
  "videos.hero.title": "Video Tutorials and Demos",
  "videos.search.placeholder": "Search videos...",
  "videos.categories.all": "All Videos",
  "videos.categories.getting-started": "Getting Started",
  "videos.categories.advanced": "Advanced Features",
  "videos.categories.use-cases": "Use Cases",
  "videos.categories.best-practices": "Best Practices",
  "videos.categories.tips-tricks": "Tips & Tricks",
  "videos.section.all": "All Videos",

  // Webinars (EN)
  "webinars.hero.title": "Professional Development Webinars",
  "webinars.hero.subtitle": "Join live sessions or watch on-demand. Earn professional development certificates and learn from experts.",
  "webinars.hero.badge": "50+ Professional Development Sessions",
  "webinars.search.placeholder": "Search webinars...",
  "webinars.categories.all": "All Webinars",
  "webinars.sections.upcoming": "Upcoming Live Webinars",
  "webinars.sections.ondemand": "On-Demand Library",
  "webinars.labels.popular": "Popular",
