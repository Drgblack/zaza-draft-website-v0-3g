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
  "pricing.free.featuresTitle": "WhatÃ”Ã‡Ã–s included",
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
  "pricing.premium.cta": "Start 7Ã”Ã‡Ã¦day Free Trial",
  "pricing.premium.trial": "No credit card required",
  "pricing.premium.guarantee": "30Ã”Ã‡Ã¦day moneyÃ”Ã‡Ã¦back guarantee",
  "pricing.premium.timeSaving": "Save 10+ hours every week",
  "pricing.premium.featuresTitle": "Everything in Free, plus",
  "pricing.premium.feature1": "Unlimited drafts and refinements",
  "pricing.premium.feature2": "Advanced tone and style controls",
  "pricing.premium.feature3": "Custom templates and comment banks",
  "pricing.premium.feature4": "Reusable snippets and favorites",
  "pricing.premium.feature5": "HallucinationÃ”Ã‡Ã¦safe outputs by design",
  "pricing.premium.feature6": "PDF/DOCX export and version history",
  "pricing.premium.feature7": "Priority email support",
  "pricing.premium.roiTitle": "RealÃ”Ã‡Ã¦world time savings",
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
  "pricing.comparison.row5.free": "Ã”Ã‡Ã¶",
  "pricing.comparison.row5.premium": "Personal",
  "pricing.comparison.row5.team": "Team shared",
  "pricing.comparison.row6.feature": "Admin tools",
  "pricing.comparison.row6.free": "Ã”Ã‡Ã¶",
  "pricing.comparison.row6.premium": "Ã”Ã‡Ã¶",
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
  "pricing.faq.a3": "Premium includes a 7Ã”Ã‡Ã¦day free trial with no credit card required.",
  "pricing.faq.q4": "WhatÃ”Ã‡Ã–s included in Premium?",
  "pricing.faq.a4": "Unlimited drafting, advanced tone controls, templates, exports, and priority support.",
  "pricing.faq.q5": "Do you have team pricing?",
  "pricing.faq.a5": "Yes. Contact us for school and district pricing with admin tools.",
  "pricing.faq.q6": "Is Zaza Draft FERPAÃ”Ã‡Ã¦compliant?",
  "pricing.faq.a6": "Yes. Zaza Draft is designed to protect student privacy and data.",
  "pricing.faq.q7": "Can I use Draft in other languages?",
  "pricing.faq.a7": "Yes. Translate to 20+ languages while keeping the right tone.",
  "pricing.faq.q8": "Do you offer refunds?",
  "pricing.faq.a8": "We offer a 30Ã”Ã‡Ã¦day moneyÃ”Ã‡Ã¦back guarantee on Premium.",

  // Pricing - Testimonials
  "pricing.testimonials.title": "What teachers say about pricing",
  "pricing.testimonials.author1": "Elena M., Primary Teacher",
  "pricing.testimonials.quote1": "Premium pays for itself in the first week I use it.",
  "pricing.testimonials.author2": "David R., High School",
  "pricing.testimonials.quote2": "The time savings make the annual plan a noÃ”Ã‡Ã¦brainer.",
  "pricing.testimonials.author3": "Julia K., Middle School",
  "pricing.testimonials.quote3": "Our department bundle streamlined planning and grading.",

  // Pricing - Final CTA
  "pricing.finalCta.title": "Ready to save hours every week?",
  "pricing.finalCta.subtitle": "Start free today or talk to our team.",
  "pricing.finalCta.primary": "Start Free",
  "pricing.finalCta.secondary": "Book a Demo",
  "pricing.finalCta.trust": "HallucinationÃ”Ã‡Ã¦safe Ã”Ã‡Ã³ FERPAÃ”Ã‡Ã¦compliant Ã”Ã‡Ã³ Built for teachers",

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
  "webinars.labels.featured": "Featured",
  "webinars.labels.certificateIncluded": "Certificate included",
  "webinars.labels.whatYouWillLearn": "What you'll learn",
  "webinars.labels.views": "views",
  "webinars.stats.teachers": "Teachers trained",
  "webinars.stats.rating": "Avg rating",
  "webinars.buttons.registerNow": "Register Now",
  "webinars.buttons.waitlistFull": "Waitlist Full",
  "webinars.empty": "No webinars found matching your search.",
  "webinars.related.title": "Deepen your learning",
  "webinars.related.desc": "Complement your webinar learning with these resources",
  "webinars.related.courses.title": "AI Literacy Courses",
  "webinars.related.courses.desc": "Self-paced courses with certification programs",
  "webinars.related.glossary.title": "AI Glossary",
  "webinars.related.glossary.desc": "150+ AI terms explained for teachers",
  "webinars.related.community.title": "Community Forum",
  "webinars.related.community.desc": "Discuss webinar topics with fellow teachers",
  "webinars.benefits.title": "Why attend our webinars?",
  "webinars.benefits.pd.title": "PD certificates",
  "webinars.benefits.pd.body": "Earn professional development certificates for every webinar you complete.",
  "webinars.benefits.experts.title": "Expert presenters",
  "webinars.benefits.experts.body": "Learn from experienced educators and AI specialists who understand your challenges.",
  "webinars.benefits.resources.title": "Downloadable resources",
  "webinars.benefits.resources.body": "Get templates, guides, and materials you can use immediately in your classroom.",
  "webinars.benefits.access.title": "Lifetime access",
  "webinars.benefits.access.body": "Watch recordings anytime. Revisit content whenever you need a refresher.",
  "webinars.cta.title": "Ready to level up?",
  "webinars.cta.body": "Join thousands of teachers transforming their practice with AI. Register for your first webinar today.",
  "webinars.cta.browseUpcoming": "Browse Upcoming Webinars",
  "webinars.cta.exploreCourses": "Explore courses",

  // Common (EN)
  "common.learnMore": "Learn more",

  // AI Literacy (EN)
  "aiLiteracy.hero.badge": "AI Literacy Center",
  "aiLiteracy.hero.title": "AI Literacy for Teachers",
  "aiLiteracy.hero.subtitle": "Free courses, certification, and resources to help teachers use AI confidently and safely.",
  "aiLiteracy.paths.title": "Choose your path",
  "aiLiteracy.filters.all": "all",
  "aiLiteracy.filters.beginner": "beginner",
  "aiLiteracy.filters.intermediate": "intermediate",
  "aiLiteracy.filters.advanced": "advanced",
  "aiLiteracy.courses.title": "Featured courses",
  "aiLiteracy.resources.title": "Downloadable resource library",
  "aiLiteracy.cert.title": "AI education certification",
  "aiLiteracy.cert.certifiedTeachers": "certified teachers",
  "aiLiteracy.related.title": "Continue your AI journey",
  "aiLiteracy.related.description": "Explore more resources to enhance your AI teaching skills",
  "aiLiteracy.related.webinars.title": "Live webinars",
  "aiLiteracy.related.webinars.desc": "Join expert-led sessions and earn PD certificates",
  "aiLiteracy.related.community.title": "Teacher community",
  "aiLiteracy.related.community.desc": "Connect with educators using AI",
  "aiLiteracy.related.integrations.title": "Tool integrations",
  "aiLiteracy.related.integrations.desc": "Connect Zaza Draft with your favourite tools",
  "aiLiteracy.cta.title": "Start your AI learning journey",
  "aiLiteracy.cta.body": "Join teachers who are confidently using AI to enhance their teaching",
  "aiLiteracy.cta.browseCourses": "Browse courses",
  "aiLiteracy.cta.tryDraft": "Try Zaza Draft free",

  // Community (EN)
  "community.hero.badge": "25,000+ Active Teachers",
  "community.hero.titlePrefix": "Join the",
  "community.hero.titleHighlight": "Teacher Community",
  "community.hero.subtitle": "Connect with educators worldwide. Share strategies, ask questions, and learn from teachers successfully using AI in their classrooms.",
  "community.search.placeholder": "Search discussions...",
  "community.stats.members": "Members",
  "community.stats.discussions": "Discussions",
  "community.stats.posts": "Posts",
  "community.stats.active": "Active",
  // Categories
  "community.categories.getting-started.name": "Getting Started with AI",
  "community.categories.getting-started.desc": "New to AI? Start here for beginner-friendly discussions and tips.",
  "community.categories.prompt-engineering.name": "Prompt Engineering",
  "community.categories.prompt-engineering.desc": "Share and discuss effective prompts for different teaching scenarios.",
  "community.categories.lesson-planning.name": "Lesson Planning",
  "community.categories.lesson-planning.desc": "Collaborate on AI-assisted lesson plans and unit designs.",
  "community.categories.parent-communication.name": "Parent Communication",
  "community.categories.parent-communication.desc": "Tips for using AI to improve parent-teacher communication.",
  "community.categories.assessment-feedback.name": "Assessment & Feedback",
  "community.categories.assessment-feedback.desc": "Discuss AI tools for grading, feedback, and formative assessment.",
  "community.categories.differentiation.name": "Differentiation & IEPs",
  "community.categories.differentiation.desc": "Using AI to support diverse learners and create accommodations.",
  "community.categories.ethics-policy.name": "Ethics & Policy",
  "community.categories.ethics-policy.desc": "Discuss ethical considerations, policies, and best practices.",
  "community.categories.tool-reviews.name": "Tool Reviews & Comparisons",
  "community.categories.tool-reviews.desc": "Share experiences with different AI tools and platforms.",
  "community.categories.success-stories.name": "Success Stories",
  "community.categories.success-stories.desc": "Celebrate wins and share what's working in your classroom.",
  "community.categories.troubleshooting.name": "Troubleshooting",
  "community.categories.troubleshooting.desc": "Get help when things don't work as expected.",
  "community.categories.subject-specific.name": "Subject-Specific",
  "community.categories.subject-specific.desc": "Discussions organized by subject area (Math, ELA, Science, etc.).",
  "community.categories.off-topic.name": "Off-Topic Lounge",
  "community.categories.off-topic.desc": "Connect with fellow educators on non-AI topics.",
  // Badges
  "community.badges.firstPost.name": "First Post",
  "community.badges.firstPost.desc": "Made your first post",
  "community.badges.helpful.name": "Helpful",
  "community.badges.helpful.desc": "Received 50+ likes",
  "community.badges.expert.name": "Expert",
  "community.badges.expert.desc": "Reached Expert level",
  "community.badges.ambassador.name": "Ambassador",
  "community.badges.ambassador.desc": "Official Zaza Ambassador",
  // Guidelines
  "community.guidelines.title": "Community Guidelines",
  "community.guidelines.li1": "Be respectful and supportive",
  "community.guidelines.li2": "Share practical, actionable advice",
  "community.guidelines.li3": "Protect student privacy",
  "community.guidelines.li4": "Give credit where due",
  "community.guidelines.read": "Read full guidelines",
  // Related
  "community.related.title": "Expand Your Knowledge",
  "community.related.desc": "Enhance your community experience with these learning resources",
  "community.related.aiLiteracy.title": "AI Literacy Courses",
  "community.related.aiLiteracy.desc": "Learn the fundamentals discussed in the community",
  "community.related.webinars.title": "Expert Webinars",
  "community.related.webinars.desc": "Live sessions on trending community topics",
  "community.related.glossary.title": "AI Glossary",
  "community.related.glossary.desc": "Understand the terminology used in discussions",
  // CTA
  "community.cta.titlePrefix": "Ready to",
  "community.cta.titleHighlight": "Join the Conversation?",
  "community.cta.body": "Create your free account and start connecting with thousands of teachers using AI in their classrooms.",
  "community.cta.primary": "Create Free Account",
  "community.cta.secondary": "Browse as Guest",

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
  "about.company.stats.countries.label": "Countries Represented",
  "about.company.stats.countries.value": "15",
  "about.company.stats.timeSaved.label": "Average Hours Saved Per Week",
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

  // Webinars (EN) â€” additions
  "webinars.hero.badge": "50+ Professional Development Sessions",
  "webinars.labels.featured": "Featured",
  "webinars.labels.certificateIncluded": "Certificate included",
  "webinars.labels.whatYouWillLearn": "What you'll learn",
  "webinars.stats.teachers": "Teachers trained",
  "webinars.stats.rating": "Avg rating",
  "webinars.related.title": "Deepen your learning",
  "webinars.related.desc": "Complement your webinar learning with these resources",
  "webinars.related.courses.title": "AI Literacy Courses",
  "webinars.related.courses.desc": "Self-paced courses with certification programs",
  "webinars.related.glossary.title": "AI Glossary",
  "webinars.related.glossary.desc": "150+ AI terms explained for teachers",
  "webinars.related.community.title": "Community Forum",
  "webinars.related.community.desc": "Discuss webinar topics with fellow teachers",
  "webinars.benefits.title": "Why attend our webinars?",
  "webinars.benefits.pd.title": "PD certificates",
  "webinars.benefits.pd.body": "Earn professional development certificates for every webinar you complete.",
  "webinars.benefits.experts.title": "Expert presenters",
  "webinars.benefits.experts.body": "Learn from experienced educators and AI specialists who understand your challenges.",
  "webinars.benefits.resources.title": "Downloadable resources",
  "webinars.benefits.resources.body": "Get templates, guides, and materials you can use immediately in your classroom.",
  "webinars.benefits.access.title": "Lifetime access",
  "webinars.benefits.access.body": "Watch recordings anytime. Revisit content whenever you need a refresher.",
  "webinars.cta.title": "Ready to level up?",
  "webinars.cta.exploreCourses": "Explore courses",

  // Common (EN)
  "common.learnMore": "Learn more",

  // AI Literacy (EN)
  "aiLiteracy.hero.badge": "AI Literacy Center",
  "aiLiteracy.hero.title": "AI Literacy for Teachers",
  "aiLiteracy.hero.subtitle": "Free courses, certification, and resources to help teachers use AI confidently and safely.",
  "aiLiteracy.paths.title": "Choose your path",
  "aiLiteracy.filters.all": "all",
  "aiLiteracy.filters.beginner": "beginner",
  "aiLiteracy.filters.intermediate": "intermediate",
  "aiLiteracy.filters.advanced": "advanced",
  "aiLiteracy.courses.title": "Featured courses",
  "aiLiteracy.resources.title": "Downloadable resource library",
  "aiLiteracy.cert.title": "AI education certification",
  "aiLiteracy.cert.certifiedTeachers": "certified teachers",
  "aiLiteracy.related.title": "Continue your AI journey",
  "aiLiteracy.related.description": "Explore more resources to enhance your AI teaching skills",
  "aiLiteracy.related.webinars.title": "Live webinars",
  "aiLiteracy.related.webinars.desc": "Join expert-led sessions and earn PD certificates",
  "aiLiteracy.related.community.title": "Teacher community",
  "aiLiteracy.related.community.desc": "Connect with educators using AI",
  "aiLiteracy.related.integrations.title": "Tool integrations",
  "aiLiteracy.related.integrations.desc": "Connect Zaza Draft with your favourite tools",
  "aiLiteracy.cta.title": "Start your AI learning journey",
  "aiLiteracy.cta.body": "Join teachers who are confidently using AI to enhance their teaching",
  "aiLiteracy.cta.browseCourses": "Browse courses",
  "aiLiteracy.cta.tryDraft": "Try Zaza Draft free",
  // About - Company Page (EN)
  "about.company.hero.eyebrow": "ABOUT",
  "about.company.hero.title": "About Zaza Technologies",
  "about.company.hero.subtitle": "You didn't become a teacher to write emails.",
  "about.company.body.p1": "You became a teacher to inspire minds, not to drown in grading, documentation, and endless emails. Yet here we are, with burnout rates climbing and passionate educators leaving the profession because the bureaucratic weight has become unsustainable.",
  "about.company.body.p2": "Zaza exists to change that.",
  "about.company.body.p3": "We're building a trusted ecosystem of AI tools that restore the time, energy, and joy teaching should bring. Every app in the Zaza family removes repetitive tasks like lesson planning, grading, and parent emails while embedding empathy, safety, and real pedagogy into every feature.",
  "about.company.body.p4": "We're not here to replace teachers. We're here to give you back what brought you to the classroom in the first place: the ability to actually teach.",
  "about.company.body.p5": "Founded in 2025 by Dr. Greg Blackburn, a learning scientist with 20 years in L&D and a PhD in Professional Education, who watched too many teacher friends burn out from administrative overload. After teaching thousands of adults and leading major learning initiatives, he built Zaza to solve the problems that steal teachers' time.",
  "about.company.body.founderLink": "Learn more about Greg's journey",
  "about.company.body.vision": "We see a future where teaching is less about admin and stress, and more about creativity, connection, and impact.",
  "about.company.body.trustHeading": "Why Teachers Trust Zaza",
  "about.company.body.trustP1": "We're not another tech company discovering education. Zaza is grounded in two decades of learning science and workplace education, with over 2,400 teachers from 43 countries shaping our tools through real-world feedback.",
  "about.company.body.trustP2": "Every product is co-designed with educators and rooted in research, because shortcuts that compromise pedagogy are not shortcuts at all.",
  "about.company.body.trustP3": "That's why we built the KnowledgeCore, a trust layer that makes every Zaza app explainable, privacy-first, and classroom-ready.",
  "about.company.body.trustP4": "No black boxes. No hallucinations. No undermining your professional judgment.",
  "about.company.body.trustP5": "When Zaza Draft suggests a parent email or Zaza Teach builds a lesson plan, you can trust it reflects actual learning science, not generic AI fluff that damages your credibility.",
  "about.company.body.testimonial1": "I was skeptical about AI writing parent emails. But Zaza Draft doesn't just save me time. It makes me sound more professional and empathetic than when I'm rushing at 10 PM.",
  "about.company.body.testimonial1Author": "Sarah M., 6th Grade ELA Teacher",
  "about.company.body.dayHeading": "A Day With Zaza",
  "about.company.body.dayIntro": "It's 9 PM on a Tuesday. You still need to email parents about the field trip, finish grading essays, and prep tomorrow's lesson on persuasive writing.",
  "about.company.body.dayChange": "With Zaza, that changes.",
  "about.company.body.dayDraftQ": "Need a parent update that's warm, clear, and professional?",
  "about.company.body.dayDraftA": "Zaza Draft writes it in seconds. You just review and send.",
  "about.company.body.dayTeachQ": "Want a complete lesson plan with activities and differentiation strategies?",
  "about.company.body.dayTeachA": "Zaza Teach builds it while you make dinner.",
  "about.company.body.dayGradeQ": "30 essays left?",
  "about.company.body.dayGradeA": "GradeFlow gives every student meaningful feedback, without stealing your weekend.",
  "about.company.body.dayShieldQ": "Anxious about responding to a difficult parent email at 11 PM?",
  "about.company.body.dayShieldA": "Shield helps you reply with professionalism and protects your boundaries by reminding you it can wait until morning.",
  "about.company.body.daySummary": "Whether you're using Draft for parent communications, Teach for lesson planning, GradeFlow for assessments, or Shield as your buffer for stressful messages, the principles are the same:",
  "about.company.body.dayPrinciples": "Respect for your craft. Protection of your credibility. Tools that actually reduce stress.",
  "about.company.body.dayZara": "And because every app includes Zara, your consistent in-app assistant—you'll always have support from a voice you already know and trust.",
  "about.company.body.testimonial2": "Zaza gave me back my evenings. I'm a better teacher now because I'm not exhausted.",
  "about.company.body.testimonial2Author": "Michael R., High School History Teacher",
  "about.company.body.dayCTA": "Join 2,400+ teachers saving 10+ hours per week",
  "about.company.body.dayCtaLink": "Start your free 14-day trial",
  "about.company.body.promiseHeading": "Our Promise",
  "about.company.body.promiseP1": "We're not here with big tech promises. We're here with clarity, usefulness, and trust.",
  "about.company.body.promiseP2": "Every teacher deserves tools that respect their craft, protect their credibility, and help them thrive.",
  "about.company.body.promiseP3": "Try Zaza Draft free for 14 days. If it doesn't save you at least 2 hours in your first week, we'll refund you immediately, no questions asked.",
  "about.company.body.footer": "Built by educators, for educators.",
  "about.company.stats.teachers.label": "Teachers Using Zaza",
  "about.company.stats.teachers.value": "2,400+",
  "about.company.stats.countries.label": "Countries Represented",
  "about.company.stats.countries.value": "43",
  "about.company.stats.timeSaved.label": "Average Hours Saved Per Week",
  "about.company.stats.timeSaved.value": "2+",
  // About - Founder Page (EN)
  "about.founder.hero.title": "Meet the Founder Building AI that Serves Teachers",
  "about.founder.hero.intro1": "Zaza helps teachers thrive. Dr. Greg Blackburn spent two decades in Learning and Development before founding Zaza in 2025 to build teacher-first AI. A learning scientist, educator, and builder, Greg has dedicated his career to helping people learn and giving teachers their time back.",
  "about.founder.hero.intro2": "After teaching thousands of adults in real classrooms and leading major learning initiatives, he is now building AI so teachers everywhere can thrive.",
  "about.founder.hero.title.name": "Dr. Greg Blackburn",
  "about.founder.hero.title.role": "PhD in Professional Education · Educator · Founder of Zaza Technologies",
  "about.founder.journey.heading": "The Journey",
  "about.founder.journey.subtitle": "From paint brushes in Tasmania to building AI for education.",
  "about.founder.journey.p1": "I began my working life in Hobart as a painter and decorator while I figured out what came next. My dad owned a local paint factory, so brushes, colour charts, and hard work were part of daily life.",
  "about.founder.journey.p2": "That early experience taught me resilience, the value of hard work, and the clarity that I was desperate to study. After completing a trade, I set off on round-the-world travel. For me, this was a journey of discovery, meeting people, seeing countries, learning cultures. Somewhere along the way I realised that education was my ticket to a greater purpose." So I slugged through and completed my apprenticeship. That experience taught me resilience, the value of hard work, and the clarity that I was desperate to study.",
  "about.founder.journey.p3": "I studied Administration, Information Systems, and German at the University of Tasmania, earning First Class Honours in Information Systems at City University of Queensland. My research pulled me deeper into learning science, critical thinking, and problem-solving in student-centred e-learning, and I later earned a PhD by publication from City, University of London.",
  "about.founder.journey.p4": "Through two decades in Learning and Development, I have taught thousands of adults in real classrooms, from onboarding new hires to upskilling teams, to navigating change. That experience showed me what helps people learn, what gets in the way, and why educators need tools that respect their expertise.",
  "about.founder.journey.p5": "I also stayed close to teachers in my own family and community, my sister, cousins, and colleagues, listening to their stories about workload: parent emails, report writing, grading, documentation. All necessary, but so consuming that it steals the time and energy teachers need most.",
  "about.founder.journey.p6": "That is when the idea of Zaza took root.",
  "about.founder.journey.p7": "In 2025, I founded Zaza Technologies with a simple mission: build AI that respects teacher expertise, is safe and explainable, and gives educators their time back. Zaza is hallucination-aware, privacy-first, and co-designed with teachers in classrooms around the world. Our tools reduce repetitive admin and help teachers focus on what really matters: their students.",
  "about.founder.journey.p8": "Every principle guiding Zaza comes from listening to educators.",
  "about.founder.journey.quote": "Every teacher deserves tools that respect their craft and give them time to do what they do best: teach.",
  "about.founder.why.heading": "Why I Built Zaza",
  "about.founder.why.subtitle": "Together with over 2,400 teachers in 43 countries, we are building the future of teaching, one that puts educators back at the centre.",
  "about.founder.why.principle1.title": "For Teachers, With Teachers",
  "about.founder.why.principle1.description": "Co-designed with educators, validated in real workflows, refined by real feedback.",
  "about.founder.why.principle2.title": "Boutique, Not Big Tech",
  "about.founder.why.principle2.description": "We serve one audience with care: teachers. Quality over scale, usefulness over hype.",
  "about.founder.why.principle3.title": "Safety and Trust",
  "about.founder.why.principle3.description": "Privacy-first, school-ready safeguards, and explainable AI so teachers can trust the output.",
  "about.founder.note.heading": "A Personal Note",
  "about.founder.note.p1": "If you are a teacher, you have probably tried tools that promised hours back but delivered another chore. I understand that skepticism. Zaza is different. We are building alongside you, not around you. We will keep listening, keep improving, and keep clarity and usefulness over noise.",
  "about.founder.note.p2": "My door is open. If you have feedback or want to help shape what teachers need next, please reach out.",
  "about.founder.note.signature.name": "Greg",
  "about.founder.note.signature.role": "Founder & Educator · Zaza Technologies",
}

const translationsDe: Record<string, string> = {
  // Pricing Page (DE)
  "pricing.hero.preheadline": "PREISE",
  "pricing.hero.headline": "Einfache Plâ”œÃ±ne fâ”œâ•r Lehrkrâ”œÃ±fte",
  "pricing.hero.subheadline": "Kostenlos starten, jederzeit upgraden. Jederzeit kâ”œâ•ndbar.",
  "pricing.trust.teachers": "Vertrauen von 500+ Lehrkrâ”œÃ±ften",
  "pricing.trust.ferpa": "FERPA-konform",
  "pricing.trust.cancel": "Jederzeit kâ”œâ•ndbar",
  "pricing.trust.noCard": "Keine Kreditkarte erforderlich",
  "pricing.toggle.monthly": "Monatlich",
  "pricing.toggle.annual": "Jâ”œÃ±hrlich",
  "pricing.toggle.save": "2 Monate sparen",

  // Preise Ã”Ã‡Ã´ Free
  "pricing.free.badge": "KOSTENLOS",
  "pricing.free.title": "Starter",
  "pricing.free.description": "Alles, um Draft auszuprobieren und heute Zeit zu sparen.",
  "pricing.free.price": "0 Ã”Ã©Â¼",
  "pricing.free.period": "/ dauerhaft",
  "pricing.free.cta": "Kostenlos starten",
  "pricing.free.upgradeText": "Jederzeit fâ”œâ•r mehr Funktionen upgraden",
  "pricing.free.featuresTitle": "Enthalten",
  "pricing.free.feature1": "KIÃ”Ã‡Ã¦Schreiben fâ”œâ•r EÃ”Ã‡Ã¦Mails, Zeugnisse, Feedback",
  "pricing.free.feature2": "5 Verfeinerungen pro Tag",
  "pricing.free.feature3": "4 Tonoptionen (unterstâ”œâ•tzend, formal, kurz, neutral)",
  "pricing.free.feature4": "â”œÂ£bersetzung in 20+ Sprachen",
  "pricing.free.feature5": "Kopieren, herunterladen und teilen",
  "pricing.free.feature6": "BasisÃ”Ã‡Ã¦Vorlagen",
  "pricing.free.limitation": "Ideal zum Testen und fâ”œâ•r leichte Nutzung",

  // Preise Ã”Ã‡Ã´ Premium
  "pricing.premium.badge": "AM BELIEBTESTEN",
  "pricing.premium.title": "Premium",
  "pricing.premium.description": "Unbegrenztes, halluzinationssicheres Schreiben mit ProÃ”Ã‡Ã¦Werkzeugen.",
  "pricing.premium.priceMonthly": "12 Ã”Ã©Â¼/Monat",
  "pricing.premium.priceAnnual": "120 Ã”Ã©Â¼/Jahr",
  "pricing.premium.period": "Jederzeit kâ”œâ•ndbar",
  "pricing.premium.annualTotal": "Jâ”œÃ±hrliche Abrechnung",
  "pricing.premium.savings": "2 Monate sparen",
  "pricing.premium.cta": "7Ã”Ã‡Ã¦TageÃ”Ã‡Ã¦Test starten",
  "pricing.premium.trial": "Keine Kreditkarte erforderlich",
  "pricing.premium.guarantee": "30Ã”Ã‡Ã¦Tage GeldÃ”Ã‡Ã¦zurâ”œâ•ckÃ”Ã‡Ã¦Garantie",
  "pricing.premium.timeSaving": "Spart 10+ Stunden pro Woche",
  "pricing.premium.featuresTitle": "Alles von Free, plus",
  "pricing.premium.feature1": "Unbegrenzte Entwâ”œâ•rfe und Verfeinerungen",
  "pricing.premium.feature2": "Erweiterte TonÃ”Ã‡Ã¦ und Stilsteuerung",
  "pricing.premium.feature3": "Eigene Vorlagen und Kommentarbâ”œÃ±nke",
  "pricing.premium.feature4": "Wiederverwendbare Textbausteine und Favoriten",
  "pricing.premium.feature5": "Halluzinationssichere Ausgaben by Design",
  "pricing.premium.feature6": "PDF/DOCXÃ”Ã‡Ã¦Export und Versionsverlauf",
  "pricing.premium.feature7": "Priorisierter EÃ”Ã‡Ã¦MailÃ”Ã‡Ã¦Support",
  "pricing.premium.roiTitle": "Echte Zeitersparnis",
  "pricing.premium.roiText": "Lehrkrâ”œÃ±fte berichten von 10+ Stunden Ersparnis pro Woche.",

  // Preise Ã”Ã‡Ã´ Team
  "pricing.team.badge": "Fâ”œÂ£R SCHULEN",
  "pricing.team.title": "Team & Schulen",
  "pricing.team.description": "Zusammenarbeit, Verwaltung und Support fâ”œâ•r Fachbereiche und Bezirke.",
  "pricing.team.price": "Individuell",
  "pricing.team.period": "Pro Schule oder Bezirk",
  "pricing.team.starting": "Mengenrabatte verfâ”œâ•gbar",
  "pricing.team.cta": "Vertrieb kontaktieren",
  "pricing.team.featuresTitle": "Alles aus Premium, plus",
  "pricing.team.feature1": "AdminÃ”Ã‡Ã¦Konsole und Sitzplatzverwaltung",
  "pricing.team.feature2": "Geteilte Vorlagen und Bibliotheken",
  "pricing.team.feature3": "TeamÃ”Ã‡Ã¦Tâ”œÃ‚ne und Konsistenz",
  "pricing.team.feature4": "Nutzungsanalysen und Berichte",
  "pricing.team.feature5": "SSO und Rollenrechte",
  "pricing.team.feature6": "Priorisierter Support & Onboarding",
  "pricing.team.feature7": "Mengenpreise",
  "pricing.team.roi": "Mehr Konsistenz und Zeitgewinn im Team",

  // Preise Ã”Ã‡Ã´ Bundle
  "pricing.bundle.badge": "BESTER WERT",
  "pricing.bundle.title": "Draft + Teach + GradeFlow",
  "pricing.bundle.description": "Alles fâ”œâ•r Schreiben, Planung und Bewertung.",
  "pricing.bundle.price": "199 Ã”Ã©Â¼/Jahr",
  "pricing.bundle.originalPrice": "276 Ã”Ã©Â¼/Jahr",
  "pricing.bundle.savings": "Sparen Sie 77 Ã”Ã©Â¼ im Bundle",
  "pricing.bundle.cta": "Bundle wâ”œÃ±hlen",

  // Preise Ã”Ã‡Ã´ Vergleich
  "pricing.comparison.title": "Plâ”œÃ±ne vergleichen",
  "pricing.comparison.features": "Funktionen",
  "pricing.comparison.free": "Free",
  "pricing.comparison.premium": "Premium",
  "pricing.comparison.popular": "Am beliebtesten",
  "pricing.comparison.team": "Team",
  "pricing.comparison.row1.feature": "Entwâ”œâ•rfe pro Monat",
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
  "pricing.comparison.row5.feature": "Kommentarbâ”œÃ±nke",
  "pricing.comparison.row5.free": "Ã”Ã‡Ã¶",
  "pricing.comparison.row5.premium": "Persâ”œÃ‚nlich",
  "pricing.comparison.row5.team": "TeamÃ”Ã‡Ã¦geteilt",
  "pricing.comparison.row6.feature": "AdminÃ”Ã‡Ã¦Tools",
  "pricing.comparison.row6.free": "Ã”Ã‡Ã¶",
  "pricing.comparison.row6.premium": "Ã”Ã‡Ã¶",
  "pricing.comparison.row6.team": "Sitze, SSO, Rollen",
  "pricing.comparison.row7.feature": "Support",
  "pricing.comparison.row7.free": "Community",
  "pricing.comparison.row7.premium": "Priorisierter EÃ”Ã‡Ã¦Mail",
  "pricing.comparison.row7.team": "Priorisiert + Onboarding",
  "pricing.comparison.row8.feature": "Preis",
  "pricing.comparison.row8.free": "0 Ã”Ã©Â¼",
  "pricing.comparison.row8.premium": "12 Ã”Ã©Â¼/Monat",
  "pricing.comparison.row8.team": "Individuell",
  "pricing.comparison.ctaFree": "Kostenlos starten",
  "pricing.comparison.ctaPremium": "Gratis testen",
  "pricing.comparison.ctaTeam": "Vertrieb kontaktieren",

  // Preise Ã”Ã‡Ã´ FAQ
  "pricing.faq.title": "FAQ zu Preisen & Abrechnung",
  "pricing.faq.q1": "Gibt es einen kostenlosen Plan?",
  "pricing.faq.a1": "Ja. Free ist ideal zum Testen und fâ”œâ•r leichte Nutzung.",
  "pricing.faq.q2": "Kann ich jederzeit kâ”œâ•ndigen?",
  "pricing.faq.a2": "Ja. Kâ”œâ•ndigung jederzeit in den Kontoeinstellungen mâ”œÃ‚glich.",
  "pricing.faq.q3": "Gibt es eine Testphase?",
  "pricing.faq.a3": "Premium enthâ”œÃ±lt eine 7Ã”Ã‡Ã¦TageÃ”Ã‡Ã¦Testphase ohne Kreditkarte.",
  "pricing.faq.q4": "Was umfasst Premium?",
  "pricing.faq.a4": "Unbegrenzte Entwâ”œâ•rfe, erweiterte Tâ”œÃ‚ne, Vorlagen, Exporte und PriorityÃ”Ã‡Ã¦Support.",
  "pricing.faq.q5": "Gibt es TeamÃ”Ã‡Ã¦Preise?",
  "pricing.faq.a5": "Ja. Kontaktieren Sie uns fâ”œâ•r SchulÃ”Ã‡Ã¦/Bezirkslizenzen mit AdminÃ”Ã‡Ã¦Tools.",
  "pricing.faq.q6": "Ist Zaza Draft FERPAÃ”Ã‡Ã¦konform?",
  "pricing.faq.a6": "Ja. Zaza Draft schâ”œâ•tzt Schâ”œâ•lerdaten und Privatsphâ”œÃ±re.",
  "pricing.faq.q7": "Kann ich Draft in anderen Sprachen nutzen?",
  "pricing.faq.a7": "Ja. â”œÂ£bersetzung in 20+ Sprachen mit passendem Ton.",
  "pricing.faq.q8": "Gibt es Râ”œâ•ckerstattungen?",
  "pricing.faq.a8": "Wir bieten 30Ã”Ã‡Ã¦Tage GeldÃ”Ã‡Ã¦zurâ”œâ•ck fâ”œâ•r Premium.",

  // Preise Ã”Ã‡Ã´ Testimonials
  "pricing.testimonials.title": "Was Lehrkrâ”œÃ±fte zu den Preisen sagen",
  "pricing.testimonials.author1": "Elena M., Grundschule",
  "pricing.testimonials.quote1": "Premium rechnet sich schon in der ersten Woche.",
  "pricing.testimonials.author2": "David R., Gymnasium",
  "pricing.testimonials.quote2": "Die Zeitersparnis macht das Jahresabo zur klaren Wahl.",
  "pricing.testimonials.author3": "Julia K., Sekundarstufe",
  "pricing.testimonials.quote3": "Unser AbteilungsÃ”Ã‡Ã¦Bundle vereinfacht Planung und Bewertung.",

  // Preise Ã”Ã‡Ã´ AbschlussÃ”Ã‡Ã¦CTA
  "pricing.finalCta.title": "Bereit, jede Woche Stunden zu sparen?",
  "pricing.finalCta.subtitle": "Starten Sie kostenlos oder sprechen Sie mit unserem Team.",
  "pricing.finalCta.primary": "Kostenlos starten",
  "pricing.finalCta.secondary": "Demo buchen",
  "pricing.finalCta.trust": "Halluzinationssicher Ã”Ã‡Ã³ FERPAÃ”Ã‡Ã¦konform Ã”Ã‡Ã³ Fâ”œâ•r Lehrkrâ”œÃ±fte gebaut",

  // Preise Ã”Ã‡Ã´ EntscheidungsÃ”Ã‡Ã¦Tool
  "pricing.decision.title": "Unsicher, welcher Plan passt?",
  "pricing.decision.subtitle": "Machen Sie unser kurzes Quiz fâ”œâ•r eine persâ”œÃ‚nliche Empfehlung",
  // Navigation
  "nav.home": "Startseite",
  "nav.pricing": "Preise",
  "nav.products": "Produkte",
  "nav.products.suite": "Zaza Suite",
  "nav.products.teach": "Zaza Teach",
  "nav.products.draft": "Zaza Draft",
  "nav.products.gradeflow": "GradeFlow",
  "nav.products.shield": "Zaza Shield",
  "nav.learningCentre": "Lernzentrum",
  "nav.resources": "Ressourcen",
  "nav.faq": "FAQ",
  "nav.about": "â”œÂ£ber uns",
  "nav.getStarted": "Jetzt starten",

  // Suite Page Hero (DE)
  "suite.hero.title": "Zaza ist eine Familie sicherer, lehrerzentrierter KI-Apps, die zusammenarbeiten, um den Arbeitsaufwand zu reduzieren und die Effizienz sowie das Wohlbefinden von Lehrkrâ”œÃ±ften zu stâ”œÃ±rken.",
  "suite.hero.subhead": "Jede App wird von der Zaza KnowledgeCore Plattform betrieben und bietet vertrauenswâ”œâ•rdige, erklâ”œÃ±rbare KI sowie konsistente, schulbereite Schutzmechanismen.",

  // Suite - Teacher First (DE)
  "suite.teacherFirst.title": "Fâ”œâ•r Lehrkrâ”œÃ±fte entwickelt",
  "suite.teacherFirst.body": "Zaza gibt Zeit zurâ”œâ•ck und lâ”œÃ±sst Pâ”œÃ±dagoginnen und Pâ”œÃ±dagogen sich aufs Unterrichten konzentrieren. Alles ist mit Datenschutz, Schutzkonzepten und Pâ”œÃ±dagogik im Kern gestaltet, sodass Schulen dem Einsatz vertrauen kâ”œÃ‚nnen.",

  // Suite - Core Apps (DE)
  "suite.coreApps.title": "Die vier Kern-Apps",
  "suite.teach.body": "KI-gestâ”œâ•tzte Unterrichtsplanung, die sich an Ihren Lehrplan anpasst, Stunden Vorbereitungszeit spart und den Unterricht spannend sowie standardkonform hâ”œÃ±lt.",
  "suite.teach.li1": "Auto-Planer: vollstâ”œÃ±ndige Unterrichtsstruktur in Minuten",
  // Features page (DE) - How it works and CTA
  "features.how.title": "So funktioniert es",
  "features.how.subtitle": "Drei einfache Schritte zu besseren Elternnachrichten",
  "features.how.step1.title": "Nachricht eingeben",
  "features.how.step1.desc": "Tippen oder fâ”œâ•gen Sie Ihren Entwurf zum Schâ”œâ•ler ein",
  "features.how.step2.title": "Sofortiges Feedback erhalten",
  "features.how.step2.desc": "Draft analysiert Ton, Klarheit und Angemessenheit",
  "features.how.step3.title": "Kopieren und senden",
  "features.how.step3.desc": "Exportieren Sie Ihre â”œâ•berarbeitete Nachricht in Sekunden",
  "features.cta.title": "Heute bessere Nachrichten schreiben",
  "features.cta.subtitle": "Testen Sie Draft kostenlos mit 5 Kommentaren",
  "features.cta.primary": "Jetzt starten",

  // Resources page (DE)
  "resources.title": "Kostenlose Ressourcen fâ”œâ•r Lehrkrâ”œÃ±fte",
  "resources.subtitle": "Zeitspartools fâ”œâ•r den sofortigen Einsatz. Als PDF oder DOCX herunterladen.",
  "resources.download": "Herunterladen",
  "resources.comingSoon": "Demnâ”œÃ±chst",
  "resources.published": "Verâ”œÃ‚ffentlicht",
  "suite.teach.li2": "Lehrplanbewusst: Common Core + internationale Rahmenplâ”œÃ±ne",
  "suite.teach.li3": "Hilfen zur Differenzierung und kreative Aktivitâ”œÃ±tsideen",
  "suite.teach.cta": "Mehr â”œâ•ber Teach erfahren",

  "suite.draft.body": "Kommentare und Berichte ohne Burnout - klare, wertschâ”œÃ±tzende Kommunikation, fundiert in Forschung zum Wohlbefinden von Lehrkrâ”œÃ±ften.",
  "suite.draft.li1": "Vorlagen fâ”œâ•r Berichte und Kommentare, die Sie anpassen kâ”œÃ‚nnen",
  "suite.draft.li2": "Tonleitfâ”œÃ±den und Bias-Prâ”œâ•fungen fâ”œâ•r faires, unterstâ”œâ•tzendes Feedback",
  "suite.draft.li3": "Standardmâ”œÃ±â”œÆ’ig privat; fâ”œâ•r professionelle, elternreife Texte entwickelt",
  "suite.draft.cta": "Mehr â”œâ•ber Draft erfahren",

  "suite.gradeflow.body": "Ein erklâ”œÃ±rbarer Bewertungs-Copilot mit OCR, Rubriken und evidenzbasiertem Feedback - schneller korrigieren mit Fairness und Konsistenz.",
  "suite.gradeflow.li1": "Rubrik-konformes, prâ”œâ•ffâ”œÃ±higes Feedback mit Nachweisen",
  "suite.gradeflow.li2": "Konsistenz â”œâ•ber Klassen und Beurteilende hinweg",
  "suite.gradeflow.li3": "Exportierbare Notenlisten und Moderationshilfe",
  "suite.gradeflow.cta": "Mehr â”œâ•ber GradeFlow erfahren",

  "suite.shield.body": "Kommunikationsmanagement, das das Wohlbefinden von Lehrkrâ”œÃ±ften schâ”œâ•tzt - entwirft schwierige E-Mails und hilft, gesunde Grenzen zu wahren.",
  "suite.shield.li1": "Entwurfs-Assistent fâ”œâ•r sensible Eltern- und Verwaltungsnachrichten",
  "suite.shield.li2": "Grenz-Hinweise und Eskalationsleitfâ”œÃ±den",
  "suite.shield.li3": "Professionelle, konsistente Kommunikationsmuster",
  "suite.shield.cta": "Mehr â”œâ•ber Shield erfahren",

  // Suite - Platform (DE)
  "suite.platform.title": "Zaza KnowledgeCore (Plattform)",
  "suite.platform.body": "KnowledgeCore ist die sichere, intelligente Plattform hinter jeder Zaza-App. Sie organisiert Lehrkraft-Dokumente, erzwingt Datenschutz und Compliance und stellt erklâ”œÃ±rbare, prâ”œâ•ffâ”œÃ±hige KI in der gesamten Suite bereit. Es ist kein separates Produkt - so bleiben die Zaza-Apps konsistent, sicher und verbunden.",
  "suite.platform.li1": "Datenschutz und Schutzkonzepte von Anfang an",
  "suite.platform.li2": "Geteilter Kontext â”œâ•ber alle Apps (kein erneutes Hochladen)",
  "suite.platform.li3": "Erklâ”œÃ±rbare Ausgaben, Rubrik-Ausrichtung und Prâ”œâ•fpfade",

  // Suite - Why Schools (DE)
  "suite.why.title": "Warum Schulen Zaza wâ”œÃ±hlen",
  "suite.why.timeSaved": "Zeitersparnis: Lehrkrâ”œÃ±fte gewinnen jede Woche Stunden zurâ”œâ•ck.",
  "suite.why.retention": "Bindung unterstâ”œâ•tzt: Weniger Stress und gerechtere Arbeitslast.",
  "suite.why.safety": "Sicher und konform: Datenschutz und Schutz standardmâ”œÃ±â”œÆ’ig.",
  "suite.why.evidence": "Evidenzbasiert: Pâ”œÃ±dagogik und Nachvollziehbarkeit, nicht nur Tempo.",

  // Suite - Roadmap (DE)
  "suite.roadmap.title": "Bereit fâ”œâ•r die Roadmap",
  "suite.roadmap.body": "Geplante Erweiterungen umfassen intelligentere Elternkommunikation, Synthese formativer Bewertungen und Unterstâ”œâ•tzung bei Differenzierung - alles â”œâ•ber KnowledgeCore bereitgestellt, damit der Nutzen â”œâ•berall ankommt, nicht nur in einem einzelnen Tool.",

  // Suite - CTA (DE)
  "suite.cta.title": "Jetzt entdecken",
  "suite.cta.body": "Ob Sie als Lehrkraft Entlastung suchen oder als Schule skalierbare Unterstâ”œâ•tzung: Zaza hilft Ihrem Team zu gedeihen.",
  "suite.cta.primary": "Lâ”œÃ‚sungen ansehen",
  "suite.cta.secondary": "Mit unserem Team sprechen",

  // Suite - Trust Bar (DE)
  "suite.trust.hallucinationSafe": "Halluzinationssicher",
  "suite.trust.ferpa": "FERPA-konform",
  "suite.trust.teachers": "500+ Lehrkrâ”œÃ±fte",

  // Suite - How It Works (DE)
  "suite.hiw.title": "So funktioniert die Suite",
  "suite.hiw.step1.title": "Passende App wâ”œÃ±hlen",
  "suite.hiw.step1.desc": "Teach fâ”œâ•rs Planen, Draft fâ”œâ•rs Schreiben, GradeFlow fâ”œâ•rs Bewerten, Shield fâ”œâ•r Grenzen.",
  "suite.hiw.step2.title": "Eigenen Kontext hinzufâ”œâ•gen",
  "suite.hiw.step2.desc": "Lehrplan, Klassendetails, Rubriken und Ton flieâ”œÆ’en einmal in KnowledgeCore ein und gelten â”œâ•berall.",
  "suite.hiw.step3.title": "Schulreife Ergebnisse erhalten",
  "suite.hiw.step3.desc": "Vertrauenswâ”œâ•rdige, erklâ”œÃ±rbare Resultate mit konsistenten Schutzmechanismen in jedem Workflow.",

  // Suite - Testimonials (DE)
  "suite.testimonials.title": "Stimmen aus der Praxis",
  "suite.testimonials.1.quote": "Ich bekomme meinen Sonntag zurâ”œâ•ck. Planung und Elternkommunikation dauern jetzt Minuten statt Stunden.",
  "suite.testimonials.1.author": "Sarah Mitchell",
  "suite.testimonials.1.role": "Grundschullehrerin, UK",
  "suite.testimonials.2.quote": "Konsistente Bewertung mit klaren Nachweisen. GradeFlow hat die Qualitâ”œÃ±t klassenâ”œâ•bergreifend erhâ”œÃ‚ht.",
  "suite.testimonials.2.author": "Michael Brown",
  "suite.testimonials.2.role": "Oberstufenlehrer, USA",
  "suite.testimonials.3.quote": "Draft schâ”œâ•tzt Ton und Wohlbefinden. Ich kommuniziere mehr Ã”Ã‡Ã´ mit weniger Stress.",
  "suite.testimonials.3.author": "Emma Rodriguez",
  "suite.testimonials.3.role": "Lehrerin Sek I, CA",

  // Suite - Logos (DE)
  "suite.logos.title": "Vertrauenswâ”œâ•rdig bei Lehrkrâ”œÃ±ften an",
  "suite.logos.item1": "Oakridge High",
  "suite.logos.item2": "Riverstone Grundschule",
  "suite.logos.item3": "Northfield Akademie",
  "suite.logos.item4": "St. Mary's College",
  "suite.logos.item5": "Greenwood Schule",

  // Suite - Screenshots (DE)
  "suite.screens.title": "Echte Produkt-Screenshots",
  "suite.screens.caption": "Ein schneller Blick auf Planungs-, Schreib- und Bewertungsablâ”œÃ±ufe.",

  // Videos (DE)
  "videos.hero.title": "Video-Tutorials und Demos",
  "videos.search.placeholder": "Videos durchsuchen...",
  "videos.categories.all": "Alle Videos",
  "videos.categories.getting-started": "Erste Schritte",
  "videos.categories.advanced": "Erweiterte Funktionen",
  "videos.categories.use-cases": "Anwendungsfâ”œÃ±lle",
  "videos.categories.best-practices": "Bewâ”œÃ±hrte Methoden",
  "videos.categories.tips-tricks": "Tipps & Tricks",
  "videos.section.all": "Alle Videos",

  // Webinars (DE)
  "webinars.hero.title": "Fortbildungs-Webinare",
  "webinars.hero.subtitle": "Nehmen Sie an Live-Sessions teil oder sehen Sie Aufzeichnungen. Sammeln Sie Fortbildungszertifikate und lernen Sie von Experten.",
  "webinars.search.placeholder": "Webinare durchsuchen...",
  "webinars.categories.all": "Alle Webinare",
  "webinars.sections.upcoming": "Bevorstehende Live-Webinare",
  "webinars.sections.ondemand": "Mediathek (On-Demand)",
  "webinars.labels.popular": "Beliebt",
  "webinars.labels.views": "Aufrufe",
  "webinars.buttons.registerNow": "Jetzt registrieren",
  "webinars.buttons.waitlistFull": "Warteliste voll",
  "webinars.empty": "Keine Webinare passend zu Ihrer Suche gefunden.",
  "webinars.cta.body": "Schlieâ”œÆ’en Sie sich Tausenden Lehrkrâ”œÃ±ften an, die ihre Praxis mit KI transformieren. Melden Sie sich noch heute fâ”œâ•r Ihr erstes Webinar an.",
  "webinars.cta.browseUpcoming": "Bevorstehende Webinare ansehen",

  // Community (DE)
  "community.hero.badge": "25.000+ aktive Lehrkrâ”œÃ±fte",
  "community.hero.titlePrefix": "Treten Sie der",
  "community.hero.titleHighlight": "Lehrercommunity bei",
  "community.hero.subtitle": "Vernetzen Sie sich weltweit mit Lehrkrâ”œÃ±ften. Teilen Sie Strategien, stellen Sie Fragen und lernen Sie von erfolgreichen Praxisbeispielen zum Einsatz von KI im Unterricht.",
  "community.search.placeholder": "Diskussionen durchsuchen...",
  "community.stats.members": "Mitglieder",
  "community.stats.discussions": "Diskussionen",
  "community.stats.posts": "Beitrâ”œÃ±ge",
  "community.stats.active": "Aktiv",
  // Kategorien
  "community.categories.getting-started.name": "Erste Schritte mit KI",
  "community.categories.getting-started.desc": "Neu bei KI? Starten Sie hier mit einsteigerfreundlichen Tipps und Diskussionen.",
  "community.categories.prompt-engineering.name": "Prompt-Engineering",
  "community.categories.prompt-engineering.desc": "Teilen und diskutieren Sie wirksame Prompts fâ”œâ•r unterschiedliche Unterrichtsszenarien.",
  "community.categories.lesson-planning.name": "Unterrichtsplanung",
  "community.categories.lesson-planning.desc": "Gemeinsam KI-gestâ”œâ•tzte Unterrichts- und Einheitenplanung erarbeiten.",
  "community.categories.parent-communication.name": "Elternkommunikation",
  "community.categories.parent-communication.desc": "Tipps fâ”œâ•r den KIÃ”Ã‡Ã¦Einsatz zur Verbesserung der Eltern-Lehrer-Kommunikation.",
  "community.categories.assessment-feedback.name": "Bewertung & Feedback",
  "community.categories.assessment-feedback.desc": "KI-Tools fâ”œâ•r Korrektur, Feedback und formative Beurteilung diskutieren.",
  "community.categories.differentiation.name": "Differenzierung & Fâ”œÃ‚rderplâ”œÃ±ne",
  "community.categories.differentiation.desc": "Mit KI vielfâ”œÃ±ltige Lernende unterstâ”œâ•tzen und Nachteilsausgleiche erstellen.",
  "community.categories.ethics-policy.name": "Ethik & Richtlinien",
  "community.categories.ethics-policy.desc": "Ethische Aspekte, Policies und Best Practices diskutieren.",
  "community.categories.tool-reviews.name": "Tool-Reviews & Vergleiche",
  "community.categories.tool-reviews.desc": "Erfahrungen mit verschiedenen KI-Tools und Plattformen teilen.",
  "community.categories.success-stories.name": "Erfolgsgeschichten",
  "community.categories.success-stories.desc": "Erfolge feiern und funktionierende Praxis im Unterricht teilen.",
  "community.categories.troubleshooting.name": "Fehlerbehebung",
  "community.categories.troubleshooting.desc": "Hilfe bekommen, wenn etwas nicht wie erwartet funktioniert.",
  "community.categories.subject-specific.name": "Fachspezifisch",
  "community.categories.subject-specific.desc": "Diskussionen nach Fach (Mathematik, Deutsch, Naturwissenschaften usw.).",
  "community.categories.off-topic.name": "Off-Topic-Lounge",
  "community.categories.off-topic.desc": "Austausch zu Themen auâ”œÆ’erhalb von KI.",
  // Abzeichen
  "community.badges.firstPost.name": "Erster Beitrag",
  "community.badges.firstPost.desc": "Ihren ersten Beitrag verfasst",
  "community.badges.helpful.name": "Hilfreich",
  "community.badges.helpful.desc": "â”œÂ£ber 50 Likes erhalten",
  "community.badges.expert.name": "Experte",
  "community.badges.expert.desc": "Expertenlevel erreicht",
  "community.badges.ambassador.name": "Botschafter",
  "community.badges.ambassador.desc": "Offizieller ZazaÃ”Ã‡Ã¦Botschafter",
  // Richtlinien
  "community.guidelines.title": "Community-Richtlinien",
  "community.guidelines.li1": "Respektvoll und unterstâ”œâ•tzend sein",
  "community.guidelines.li2": "Praktische, umsetzbare Tipps teilen",
  "community.guidelines.li3": "Schâ”œâ•lerdatenschutz wahren",
  "community.guidelines.li4": "Urheberschaft anerkennen",
  "community.guidelines.read": "Vollstâ”œÃ±ndige Richtlinien lesen",
  // Verwandte Inhalte
  "community.related.title": "Wissen erweitern",
  "community.related.desc": "Vertiefen Sie Ihr CommunityÃ”Ã‡Ã¦Erlebnis mit diesen Lernressourcen",
  "community.related.aiLiteracy.title": "KIÃ”Ã‡Ã¦Kompetenzkurse",
  "community.related.aiLiteracy.desc": "Grundlagen lernen, die in der Community diskutiert werden",
  "community.related.webinars.title": "ExpertenÃ”Ã‡Ã¦Webinare",
  "community.related.webinars.desc": "LiveÃ”Ã‡Ã¦Sessions zu aktuellen CommunityÃ”Ã‡Ã¦Themen",
  "community.related.glossary.title": "KIÃ”Ã‡Ã¦Glossar",
  "community.related.glossary.desc": "Begriffe aus den Diskussionen verstehen",
  // CTA
  "community.cta.titlePrefix": "Bereit,",
  "community.cta.titleHighlight": "an der Diskussion teilzunehmen?",
  "community.cta.body": "Erstellen Sie kostenlos ein Konto und vernetzen Sie sich mit Tausenden Lehrkrâ”œÃ±ften, die KI im Unterricht einsetzen.",
  "community.cta.primary": "Kostenloses Konto erstellen",
  "community.cta.secondary": "Als Gast stâ”œÃ‚bern",

  "about.nav.title": "â”œÂ£ber uns",
  "about.nav.company": "Unternehmen",
  "about.nav.founder": "Grâ”œâ•nder",
  "about.nav.press": "Presse-Kit",
  "about.nav.careers": "Karriere",

  // Hero Section
  "hero.eyebrow": "Fâ”œÂ£R LEHRKRâ”œÃ¤FTE",
  "hero.badge": "Halluzinationssichere KI fâ”œâ•r Lehrkrâ”œÃ±fte",
  "hero.headline": "Schreiben Sie wie Sie",
  "hero.headlineAccent": "nur schneller.",
  "hero.subheading":
    "KI-gestâ”œâ•tzter Schreibassistent, der Lehrkrâ”œÃ±ften hilft, Eltern-E-Mails, Schâ”œâ•lerberichte und Bewertungskommentare in Minuten statt Stunden zu erstellen.",
  "hero.ctaPrimary": "Kostenlos starten",
  "hero.ctaSecondary": "Beispiele ansehen",
  "hero.trustIndicators.hallucinationSafe": "Halluzinationssicher",
  "hero.trustIndicators.ferpaCompliant": "FERPA-konform",
  "hero.trustIndicators.teachers": "500+ Lehrkrâ”œÃ±fte",

  // Hallucination-Safe Tooltip
  "hallucinationSafe.tooltip.heading": "Was bedeutet halluzinationssicher?",
  "hallucinationSafe.tooltip.body":
    "Im Gegensatz zu generischen KI-Tools ist Zaza Draft speziell darauf trainiert, keine Schâ”œâ•lerinformationen zu erfinden, keine Elterngesprâ”œÃ±che zu fabrizieren oder Details â”œâ•ber Ihre Klasse zu konstruieren. Jede Ausgabe basiert ausschlieâ”œÆ’lich auf Ihren tatsâ”œÃ±chlichen Angaben - keine erfundenen Fakten, keine fiktiven Szenarien.",

  // Problem Section
  "problem.heading": "Lehrkrâ”œÃ±fte verbringen â”œâ•ber 10 Stunden pro Woche mit Schreibaufgaben",
  "problem.body":
    "Die Herausforderung besteht nicht darin, was zu sagen ist - sondern die Zeit und die richtigen Worte zu finden, um es professionell zu formulieren und dabei Ihre authentische Stimme zu bewahren.",
  "problem.stats.parentEmails.value": "2-3 Std./Woche",
  "problem.stats.parentEmails.label": "Eltern-E-Mails",
  "problem.stats.reportCards.value": "4-6 Std./Semester",
  "problem.stats.reportCards.label": "Zeugnisberichte",
  "problem.stats.gradingFeedback.value": "1-2 Std./Woche",
  "problem.stats.gradingFeedback.label": "Bewertungsfeedback",

  // Solution Section
  "solution.heading": "Die erste KI-Suite speziell fâ”œâ•r Lehrerkommunikation",
  "solution.bodyPrimary":
    "Zaza ist die weltweit erste KI-Suite speziell fâ”œâ•r Lehrkrâ”œÃ±fte - basierend auf echter Pâ”œÃ±dagogik, gestâ”œâ•tzt auf einen vertrauenswâ”œâ•rdigen Assistenten und entwickelt, um nicht nur Zeit zu sparen, sondern Lehrkrâ”œÃ±ften zu helfen, aufzublâ”œâ•hen.",
  "solution.bodySecondary":
    "Trainiert mit echter Pâ”œÃ±dagogik und Lehrersprache - nicht mit Business-Texten. Jede Ausgabe bewahrt Ihre authentische Stimme und spart gleichzeitig Stunden bei Eltern-E-Mails, Zeugnisberichten und Feedback-Kommentaren.",

  // Stats Section
  "stats.documentsRefined.number": "150k+",
  "stats.documentsRefined.label": "Dokumente verfeinert",
  "stats.teachers.number": "500+",
  "stats.teachers.label": "Lehrkrâ”œÃ±fte",
  "stats.timeSaved.number": "10+ Std.",
  "stats.timeSaved.label": "Wâ”œÃ‚chentlich gespart",
  "stats.subtitle": "Vertraut von 500+ Lehrkrâ”œÃ±ften, die mit Zaza Draft jede Woche 10+ Stunden sparen.",

  // How It Works Section
  "howItWorks.heading": "So funktioniert es",
  "howItWorks.diagram.step1.title": "Ihre Eingabe",
  "howItWorks.diagram.step1.description": "Grobe Notizen oder Stichpunkte",
  "howItWorks.diagram.step1.example": "Sam passt im Unterricht nicht auf.",
  "howItWorks.diagram.step2.title": "Tonauswahl",
  "howItWorks.diagram.step2.description": "Wâ”œÃ±hlen Sie Ihren Ton",
  "howItWorks.diagram.step2.example": "Unterstâ”œâ•tzend, Formal, Prâ”œÃ±gnant oder Neutral",
  "howItWorks.diagram.step3.title": "Ausgefeilte Ausgabe",
  "howItWorks.diagram.step3.description": "Unterrichtsfertige Kommunikation",
  "howItWorks.diagram.step3.example": "Ich mâ”œÃ‚chte Sie bezâ”œâ•glich Sams jâ”œâ•ngster Aufmerksamkeitsschwierigkeiten...",
  "howItWorks.steps.step1.number": "1",
  "howItWorks.steps.step1.title": "Fâ”œâ•gen Sie Ihren Entwurf ein oder beschreiben Sie, was Sie benâ”œÃ‚tigen",
  "howItWorks.steps.step1.description":
    "Beginnen Sie mit groben Notizen, Stichpunkten oder einem vollstâ”œÃ±ndigen Entwurf",
  "howItWorks.steps.step2.number": "2",
  "howItWorks.steps.step2.title": "Wâ”œÃ±hlen Sie Ihren Ton und beobachten Sie, wie Draft verfeinert",
  "howItWorks.steps.step2.description": "Unterstâ”œâ•tzend, formal, prâ”œÃ±gnant oder neutral - immer bearbeitbar",
  "howItWorks.steps.step3.number": "3",
  "howItWorks.steps.step3.title": "Exportieren & teilen",
  "howItWorks.steps.step3.description": "Kopieren, herunterladen oder mit einem Klick in Ihre Schultools teilen",

  // Demo Section
  "demo.heading": "Draft in Aktion",
  "demo.tabs.parentEmail": "Eltern-E-Mail",
  "demo.tabs.reportCard": "Zeugnis",
  "demo.tabs.gradingComment": "Bewertungskommentar",
  "demo.before.label": "VORHER (IHR ENTWURF)",
  "demo.toneSelector": "Ton: Unterstâ”œâ•tzend",
  "demo.ctaButton": "Umformulieren",
  "demo.after.label": "NACHHER (DRAFT'S VERSION)",
  "demo.tryItYourself": "Selbst ausprobieren",
  "demo.testimonial.quote": "Ich habe meinen Sonntag zurâ”œâ•ckbekommen. Draft verwandelt Stunden in Minuten.",
  "demo.testimonial.name": "Sarah Mitchell",
  "demo.testimonial.author": "Grundschullehrerin, UK",

  // Use Cases Section
  "useCases.heading": "Fâ”œâ•r Ihre alltâ”œÃ±glichen Schreibaufgaben entwickelt",
  "useCases.cards.parentMessages.title": "Eltern-Nachrichten",
  "useCases.cards.parentMessages.description": "Formulieren Sie sensible E-Mails im richtigen Ton um",
  "useCases.cards.parentMessages.examples": "Verhaltensbedenken, Fortschrittsaktualisierungen, Anwesenheitsprobleme",
  "useCases.cards.reportCards.title": "Zeugnisberichte",
  "useCases.cards.reportCards.description": "Verwandeln Sie Stichpunkte in aussagekrâ”œÃ±ftige Erzâ”œÃ±hlungen",
  "useCases.cards.reportCards.examples": "Semesterberichte, Fortschrittszusammenfassungen, Fâ”œÃ‚rderplâ”œÃ±ne",
  "useCases.cards.gradingComments.title": "Bewertungskommentare",
  "useCases.cards.gradingComments.description": "Generieren Sie konstruktives Feedback schneller",
  "useCases.cards.gradingComments.examples": "Kriterienbasierte Kommentare, Rubrik-Feedback",
  "useCases.cards.schoolCommunications.title": "Schulkommunikation",
  "useCases.cards.schoolCommunications.description": "Erstellen Sie Newsletter und Ankâ”œâ•ndigungen professionell",
  "useCases.cards.schoolCommunications.examples": "Updates, Veranstaltungshinweise, Mitteilungen",
  "useCases.cards.referenceLetters.title": "Empfehlungsschreiben",
  "useCases.cards.referenceLetters.description": "Verfassen Sie â”œâ•berzeugende Empfehlungen selbstbewusst",
  "useCases.cards.referenceLetters.examples": "Hochschulempfehlungen, Jobempfehlungen",
  "useCases.cards.documentation.title": "Dokumentation",
  "useCases.cards.documentation.description": "Erstellen Sie klare Aufzeichnungen und Besprechungsnotizen",
  "useCases.cards.documentation.examples": "Fâ”œÃ‚rderplandokumentation, Elterngesprâ”œÃ±che",

  // Comparison Section
  "comparison.heading": "Warum Lehrkrâ”œÃ±fte Zaza gegenâ”œâ•ber generischen KI-Tools vertrauen",
  "comparison.subheading": "Speziell fâ”œâ•r Bildung entwickelt, nicht von Business-Tools adaptiert",
  "comparison.tableHeaders.feature": "Funktion",
  "comparison.tableHeaders.genericAI": "Generische KI-Tools (ChatGPT, etc.)",
  "comparison.tableHeaders.zazaDraft": "Zaza Draft",
  "comparison.rows.training.feature": "Training",
  "comparison.rows.training.generic": "Allgemeines Wissen, geschâ”œÃ±ftsorientiert",
  "comparison.rows.training.zaza": "Trainiert mit echter Lehrerkommunikation & Pâ”œÃ±dagogik",
  "comparison.rows.safety.feature": "Sicherheit",
  "comparison.rows.safety.generic": "Kann Schâ”œâ•lerdetails oder Szenarien erfinden",
  "comparison.rows.safety.zaza": "Halluzinationssicher - erfindet niemals Informationen",
  "comparison.rows.toneControl.feature": "Tonkontrolle",
  "comparison.rows.toneControl.generic": "Begrenzt oder inkonsistent",
  "comparison.rows.toneControl.zaza": "4+ bildungsspezifische Tâ”œÃ‚ne",
  "comparison.rows.compliance.feature": "Compliance",
  "comparison.rows.compliance.generic": "Nicht FERPA-konform entwickelt",
  "comparison.rows.compliance.zaza": "Von Grund auf FERPA-konform",
  "comparison.rows.useCases.feature": "Anwendungsfâ”œÃ±lle",
  "comparison.rows.useCases.generic": "Generische Schreibaufgaben",
  "comparison.rows.useCases.zaza": "6 spezialisierte Lehrer-Workflows",
  "comparison.rows.outputQuality.feature": "Ausgabequalitâ”œÃ±t",
  "comparison.rows.outputQuality.generic": "Erfordert starke Bearbeitung",
  "comparison.rows.outputQuality.zaza": "Unterrichtsfertig in Minuten",
  "comparison.rows.learningCurve.feature": "Lernkurve",
  "comparison.rows.learningCurve.generic": "Komplexe Prompts erforderlich",
  "comparison.rows.learningCurve.zaza": "Einfâ”œâ•gen, Ton wâ”œÃ±hlen, fertig",
  "comparison.rows.community.feature": "Community",
  "comparison.rows.community.generic": "Keine Lehrer-Unterstâ”œâ•tzung",
  "comparison.rows.community.zaza": "500+ Pâ”œÃ±dagogen teilen Best Practices",

  // Why Choose Section
  "whyChoose.heading": "Warum Lehrkrâ”œÃ±fte Zaza wâ”œÃ±hlen",
  "whyChoose.benefits.beatWritersBlock.title": "Schreibblockade â”œâ•berwinden",
  "whyChoose.benefits.beatWritersBlock.description": "Beginnen Sie mit KI, beenden Sie mit Ihrer authentischen Stimme",
  "whyChoose.benefits.writeWithConfidence.title": "Mit Selbstvertrauen schreiben",
  "whyChoose.benefits.writeWithConfidence.description": "Professionelle Qualitâ”œÃ±t in allen Kommunikationen",
  "whyChoose.benefits.saveTime.title": "Sparen Sie jede Woche Stunden",
  "whyChoose.benefits.saveTime.description": "2-Stunden-Aufgaben in 5 Minuten erledigt",
  "whyChoose.benefits.breakBarriers.title": "Sprachbarrieren â”œâ•berwinden",
  "whyChoose.benefits.breakBarriers.description": "Sofort in â”œâ•ber 20 Sprachen â”œâ•bersetzen",

  // Testimonials Section
  "testimonials.heading": "Was Lehrkrâ”œÃ±fte sagen",
  "testimonials.quote1.text": "Ich habe meinen Sonntag zurâ”œâ•ckbekommen. Draft verwandelt Stunden in Minuten.",
  "testimonials.quote1.name": "Sarah Mitchell",
  "testimonials.quote1.author": "Grundschullehrerin, UK",
  "testimonials.quote2.text": "Kommentare sind konsistent und freundlich.",
  "testimonials.quote2.name": "Marcus Johnson",
  "testimonials.quote2.author": "Mittelschullehrerin, US",
  "testimonials.quote3.text": "GradeFlow hilft unserem Team, sich auf Standards zu einigen.",
  "testimonials.quote3.name": "Dr. Anna Weber",
  "testimonials.quote3.author": "Fachbereichsleitung, DE",

  // Final CTA Section
  "finalCTA.heading": "Holen Sie sich Ihre Zeit zurâ”œâ•ck",
  "finalCTA.subheading": "Schlieâ”œÆ’en Sie sich 500+ Lehrkrâ”œÃ±ften an, die mit Zaza Draft jede Woche 10+ Stunden sparen.",
  "finalCTA.button": "Kostenlos starten",

  // Footer
  "footer.social.tiktok": "Folgen Sie uns auf TikTok @zazatechnologies",
  "footer.social.twitter": "Folgen Sie uns auf X (Twitter) @zazateachapp",
  "footer.social.linkedin": "Verbinden Sie sich mit uns auf LinkedIn",
  "footer.productEcosystem": "Produkt & â”œÃ»kosystem",
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
  "footer.about": "â”œÂ£ber uns",
  "footer.privacy": "Datenschutz",
  "footer.terms": "Nutzungsbedingungen",
  "footer.contact": "Kontakt",

  // Products - Teach (German)
  "products.teach.hero.eyebrow": "UNTERRICHTSPLANUNG LEICHT GEMACHT",
  "products.teach.hero.title": "Bessere Unterrichtsstunden in kâ”œâ•rzerer Zeit planen",
  "products.teach.hero.subtitle":
    "KI-gestâ”œâ•tzte Unterrichtsplanung, die sich an Ihren Lehrplan anpasst, Stunden an Vorbereitungszeit spart und Ihnen hilft, ansprechende, standardkonforme Unterrichtsstunden zu erstellen.",
  "products.teach.hero.cta.primary": "Kostenlos starten",
  "products.teach.hero.cta.secondary": "Demo ansehen",

  "products.teach.turn.pain1": "Jede Woche Stunden damit verbringen, Unterrichtsplâ”œÃ±ne von Grund auf zu erstellen",
  "products.teach.turn.pain2": "Schwierigkeiten bei der Differenzierung fâ”œâ•r verschiedene Lernende",
  "products.teach.turn.pain3": "Zeit fâ”œâ•r administrative Aufgaben statt fâ”œâ•r das Unterrichten verlieren",

  "products.teach.features.title": "Alles, was Sie fâ”œâ•r groâ”œÆ’artige Unterrichtsstunden brauchen",
  "products.teach.features.autoplanner.title": "Auto-Planer",
  "products.teach.features.autoplanner.desc":
    "Erstellen Sie in Minuten vollstâ”œÃ±ndige, an Ihre Lehrplanstandards angepasste Unterrichtsplâ”œÃ±ne",
  "products.teach.features.curriculum.title": "Lehrplankonform",
  "products.teach.features.curriculum.desc":
    "Integrierte Unterstâ”œâ•tzung fâ”œâ•r Common Core, Landesstandards und internationale Lehrplâ”œÃ±ne",
  "products.teach.features.gamified.title": "Spielerische Aktivitâ”œÃ±ten",
  "products.teach.features.gamified.desc":
    "Erstellen Sie ansprechende, interaktive Aktivitâ”œÃ±ten, die Schâ”œâ•ler motiviert halten",

  "products.teach.howItWorks.title": "So funktioniert es",
  "products.teach.howItWorks.step1.title": "Ziele festlegen",
  "products.teach.howItWorks.step1.desc": "Teilen Sie uns Ihr Fach, Ihre Klassenstufe und Lernziele mit",
  "products.teach.howItWorks.step2.title": "KI erstellt Plan",
  "products.teach.howItWorks.step2.desc":
    "Erhalten Sie in Sekunden einen vollstâ”œÃ±ndigen, standardkonformen Unterrichtsplan",
  "products.teach.howItWorks.step3.title": "Anpassen & Unterrichten",
  "products.teach.howItWorks.step3.desc": "Bearbeiten, speichern und teilen Sie Ihre Unterrichtsstunden mit Ihrem Team",

  "products.teach.whoItsFor.title": "Perfekt fâ”œâ•r",
  "products.teach.whoItsFor.item1": "Lehrkrâ”œÃ±fte, die Zeit bei der Unterrichtsplanung sparen mâ”œÃ‚chten",
  "products.teach.whoItsFor.item2": "Pâ”œÃ±dagogen, die den Unterricht effektiver differenzieren mâ”œÃ‚chten",
  "products.teach.whoItsFor.item3": "Schulen, die einen konsistenten, standardkonformen Lehrplan suchen",

  "products.teach.change.title": "Transformieren Sie Ihren Planungsprozess",
  "products.teach.change.step1": "Reduzieren Sie die Planungszeit von Stunden auf Minuten",
  "products.teach.change.step2": "Erstellen Sie ansprechendere, differenzierte Unterrichtsstunden",
  "products.teach.change.step3": "Stellen Sie die â”œÂ£bereinstimmung mit Lehrplanstandards sicher",
  "products.teach.change.step4": "Teilen und arbeiten Sie mit Ihrem Lehrerteam zusammen",

  "products.teach.social.title": "Was Lehrkrâ”œÃ±fte sagen",
  "products.teach.social.quote1":
    "Teach hat meine Planungszeit halbiert. Ich kann mich auf das Wesentliche konzentrieren - meine Schâ”œâ•ler.",
  "products.teach.social.author1": "Emma Thompson, Grundschullehrerin",
  "products.teach.social.quote2": "Die Lehrplan-Ausrichtungsfunktion ist ein Game-Changer fâ”œâ•r unsere Abteilung.",
  "products.teach.social.author2": "Michael Chen, Fachbereichsleiter",

  "products.teach.cta.title": "Bereit, Ihre Planung zu transformieren?",
  "products.teach.cta.subtitle": "Schlieâ”œÆ’en Sie sich Hunderten von Lehrkrâ”œÃ±ften an, die 10+ Stunden pro Woche sparen",
  "products.teach.cta.primary": "Kostenlose Testversion starten",
  "products.teach.cta.secondary": "Demo planen",

  // Products - Draft (German)
  "products.draft.hero.eyebrow": "KI-SCHREIBASSISTENT Fâ”œÂ£R LEHRKRâ”œÃ¤FTE",
  "products.draft.hero.title": "Besser, schneller schreiben",
  "products.draft.hero.subtitle":
    "Verwandeln Sie grobe Notizen in ausgefeilte Eltern-E-Mails, Zeugnisse und Feedback in Minuten. Bewahren Sie Ihre Stimme und sparen Sie jede Woche Stunden.",
  "products.draft.hero.cta.primary": "Kostenlos starten",
  "products.draft.hero.cta.secondary": "Beispiele ansehen",

  "products.draft.turn.pain1": "2-3 Stunden pro Woche mit dem Schreiben von Eltern-E-Mails verbringen",
  "products.draft.turn.pain2": "Schwierigkeiten, den richtigen Ton fâ”œâ•r sensible Kommunikation zu finden",
  "products.draft.turn.pain3": "Immer wieder die gleichen Feedback-Kommentare schreiben",

  "products.draft.features.title": "Fâ”œâ•r Lehrerkommunikation entwickelt",
  "products.draft.features.toneGuardrails.title": "Ton-Leitplanken",
  "products.draft.features.toneGuardrails.desc":
    "Wâ”œÃ±hlen Sie aus unterstâ”œâ•tzenden, formellen, prâ”œÃ±gnanten oder neutralen Tâ”œÃ‚nen - immer professionell",
  "products.draft.features.translationChecks.title": "â”œÂ£bersetzungsprâ”œâ•fungen",
  "products.draft.features.translationChecks.desc": "Kommunizieren Sie selbstbewusst mit Familien in â”œâ•ber 20 Sprachen",
  "products.draft.features.reviewSteps.title": "â”œÂ£berprâ”œâ•fungsschritte",
  "products.draft.features.reviewSteps.desc":
    "Integrierter â”œÂ£berprâ”œâ•fungsprozess gewâ”œÃ±hrleistet Genauigkeit vor dem Senden",

  "products.draft.howItWorks.title": "So funktioniert es",
  "products.draft.howItWorks.step1.title": "Notizen einfâ”œâ•gen",
  "products.draft.howItWorks.step1.desc": "Beginnen Sie mit Stichpunkten oder einem groben Entwurf",
  "products.draft.howItWorks.step2.title": "Ton wâ”œÃ±hlen",
  "products.draft.howItWorks.step2.desc": "Wâ”œÃ±hlen Sie die richtige Stimme fâ”œâ•r Ihre Nachricht",
  "products.draft.howItWorks.step3.title": "â”œÂ£berprâ”œâ•fen & Senden",
  "products.draft.howItWorks.step3.desc": "Bei Bedarf bearbeiten, dann kopieren oder exportieren",

  "products.draft.whoItsFor.title": "Perfekt fâ”œâ•r",
  "products.draft.whoItsFor.item1": "Lehrkrâ”œÃ±fte, die Elternkommunikation schreiben",
  "products.draft.whoItsFor.item2": "Pâ”œÃ±dagogen, die Zeugniskommentare erstellen",
  "products.draft.whoItsFor.item3": "Schulen, die konsistente, professionelle Kommunikation benâ”œÃ‚tigen",

  "products.draft.change.title": "Was sich mit Draft â”œÃ±ndert",
  "products.draft.change.step1": "2-Stunden-Aufgaben in 5 Minuten erledigt",
  "products.draft.change.step2": "Konsistenter, professioneller Ton in allen Kommunikationen",
  "products.draft.change.step3": "Selbstvertrauen in sensiblen Gesprâ”œÃ±chen",
  "products.draft.change.step4": "Mehr Zeit zum Unterrichten, weniger Zeit zum Schreiben",

  "products.draft.techNote.title": "Halluzinationssicher:",
  "products.draft.techNote.body":
    "Im Gegensatz zu generischer KI erfindet Draft niemals Schâ”œâ•lerinformationen oder fabriziert Details. Jede Ausgabe basiert auf dem, was Sie bereitstellen.",

  "products.draft.social.title": "Was Lehrkrâ”œÃ±fte sagen",
  "products.draft.social.quote1": "Ich habe meinen Sonntag zurâ”œâ•ckbekommen. Draft verwandelt Stunden in Minuten.",
  "products.draft.social.author1": "Sarah Mitchell, Grundschullehrerin",
  "products.draft.social.quote2":
    "Die Tonoptionen helfen mir, selbstbewusst zu kommunizieren, auch in schwierigen Situationen.",
  "products.draft.social.author2": "James Rodriguez, Mittelschullehrer",

  "products.draft.cta.title": "Holen Sie sich Ihre Zeit zurâ”œâ•ck",
  "products.draft.cta.subtitle": "Schlieâ”œÆ’en Sie sich 500+ Lehrkrâ”œÃ±ften an, die jede Woche 10+ Stunden sparen",
  "products.draft.cta.primary": "Kostenlose Testversion starten",
  "products.draft.cta.secondary": "Beispiele ansehen",

  // Products - GradeFlow (German)
  "products.gradeflow.hero.title": "Schneller, fairer bewerten",
  "products.gradeflow.hero.subtitle":
    "KI-gestâ”œâ•tzter Bewertungsassistent, der Ihnen hilft, in der Hâ”œÃ±lfte der Zeit konsistentes, konstruktives Feedback zu geben.",
  "products.gradeflow.hero.cta": "Kostenlos starten",

  "products.gradeflow.turn.pain1": "4-6 Stunden pro Woche mit der Bewertung von Aufgaben verbringen",
  "products.gradeflow.turn.pain2": "Inkonsistentes Feedback bei â”œÃ±hnlichen Schâ”œâ•lerarbeiten",
  "products.gradeflow.turn.pain3": "Schwierigkeiten, detaillierte, konstruktive Kommentare zu geben",

  "products.gradeflow.change.title": "Transformieren Sie Ihren Bewertungsprozess",
  "products.gradeflow.change.step1": "Aufgabe und Bewertungsraster hochladen",
  "products.gradeflow.change.step2": "KI analysiert Schâ”œâ•lerarbeit anhand von Kriterien",
  "products.gradeflow.change.step3": "Vorgeschlagene Noten und Feedback â”œâ•berprâ”œâ•fen und anpassen",
  "products.gradeflow.change.step4": "Mit einem Klick in Ihr Notenbuch exportieren",

  "products.gradeflow.features.title": "Bewertung leicht gemacht",
  "products.gradeflow.features.faster.title": "3x schnellere Bewertung",
  "products.gradeflow.features.faster.desc":
    "Reduzieren Sie die Bewertungszeit von Stunden auf Minuten bei gleichbleibender Qualitâ”œÃ±t",
  "products.gradeflow.features.fair.title": "Konsistentes Feedback",
  "products.gradeflow.features.fair.desc": "Stellen Sie faire, standardkonforme Bewertung fâ”œâ•r alle Schâ”œâ•ler sicher",
  "products.gradeflow.features.audit.title": "Prâ”œâ•fpfad",
  "products.gradeflow.features.audit.desc": "Verfolgen Sie alle Bewertungsentscheidungen mit vollstâ”œÃ±ndiger Transparenz",

  "products.gradeflow.social.title": "Was Lehrkrâ”œÃ±fte sagen",
  "products.gradeflow.social.quote1":
    "GradeFlow hat meine Bewertungszeit halbiert, ohne die Qualitâ”œÃ±t zu beeintrâ”œÃ±chtigen.",
  "products.gradeflow.social.author1": "Lisa Park, Gymnasiallehrerin Englisch",
  "products.gradeflow.social.quote2": "Mein Feedback ist jetzt konsistenter und hilfreicher.",
  "products.gradeflow.social.author2": "David Kim, Mittelschullehrer Mathematik",

  "products.gradeflow.cta.title": "Bereit, intelligenter zu bewerten?",
  "products.gradeflow.cta.button": "Kostenlose Testversion starten",

  // Products - Shield (German)
  "shield.hero.eyebrow": "KI-GOVERNANCE Fâ”œÂ£R SCHULEN",
  "shield.hero.title": "Sichere, konforme KI fâ”œâ•r Ihre Schule",
  "shield.hero.subtitle":
    "Enterprise-Grade KI-Governance-Plattform, die sichere, ethische und konforme KI-Nutzung in Ihrer gesamten Schule oder Ihrem Bezirk gewâ”œÃ±hrleistet.",
  "shield.hero.cta.primary": "Mehr erfahren",
  "shield.hero.cta.secondary": "Vertrieb kontaktieren",

  "shield.trust.gdpr": "DSGVO-konform",
  "shield.trust.ferpa": "FERPA-konform",
  "shield.trust.schoolReady": "Schulbereit",

  "shield.problem.title": "Die KI-Governance-Herausforderung",
  "shield.problem.card1.title": "Datenschutzrisiken",
  "shield.problem.card1.description":
    "Lehrkrâ”œÃ±fte, die Verbraucher-KI-Tools verwenden, kâ”œÃ‚nnen versehentlich Schâ”œâ•lerdaten offenlegen",
  "shield.problem.card2.title": "Compliance-Bedenken",
  "shield.problem.card2.description":
    "Schulen haben Schwierigkeiten sicherzustellen, dass die KI-Nutzung FERPA, DSGVO und lokale Vorschriften erfâ”œâ•llt",
  "shield.problem.card3.title": "Mangelnde Aufsicht",
  "shield.problem.card3.description": "Keine Sichtbarkeit, wie KI in Klassenzimmern und Abteilungen verwendet wird",

  "shield.solution.title": "Vollstâ”œÃ±ndige KI-Governance in einer Plattform",
  "shield.solution.subtitle": "â”œÂ£berwachen, kontrollieren und prâ”œâ•fen Sie die gesamte KI-Nutzung in Ihrer Schule",
  "shield.solution.card1.title": "Zentralisierte Kontrolle",
  "shield.solution.card1.description":
    "Legen Sie schulweite Richtlinien fâ”œâ•r die KI-Nutzung mit granularen Berechtigungen fest",
  "shield.solution.card2.title": "Prâ”œâ•fpfad",
  "shield.solution.card2.description": "Vollstâ”œÃ±ndige Sichtbarkeit aller KI-Interaktionen und Datenflâ”œâ•sse",
  "shield.solution.card3.title": "Datenschutz",
  "shield.solution.card3.description": "Automatische PII-Erkennung und -Schwâ”œÃ±rzung vor der KI-Verarbeitung",
  "shield.solution.card4.title": "Richtliniendurchsetzung",
  "shield.solution.card4.description": "Automatisierte Compliance-Prâ”œâ•fungen gegen die Richtlinien Ihrer Schule",
  "shield.solution.cta": "Alle Funktionen erkunden",

  "shield.howItWorks.title": "So funktioniert Shield",
  "shield.howItWorks.step1.title": "Tools verbinden",
  "shield.howItWorks.step1.description": "Integrieren Sie Shield mit Ihren vorhandenen KI-Tools und Plattformen",
  "shield.howItWorks.step2.title": "Richtlinien festlegen",
  "shield.howItWorks.step2.description": "Definieren Sie Regeln fâ”œâ•r KI-Nutzung, Datenverarbeitung und Compliance",
  "shield.howItWorks.step3.title": "â”œÂ£berwachen & Prâ”œâ•fen",
  "shield.howItWorks.step3.description":
    "Verfolgen Sie die Nutzung, â”œâ•berprâ”œâ•fen Sie Protokolle und stellen Sie Compliance sicher",
  "shield.howItWorks.cta": "Loslegen",

  "shield.socialProof.title": "Vertraut von Schulen weltweit",
  "shield.socialProof.quote":
    "Shield gibt uns das Vertrauen, KI zu nutzen und gleichzeitig die Privatsphâ”œÃ±re unserer Schâ”œâ•ler zu schâ”œâ•tzen. Es ist wesentliche Infrastruktur fâ”œâ•r moderne Schulen.",
  "shield.socialProof.attribution": "Dr. Jennifer Martinez",
  "shield.socialProof.role": "Technologiedirektorin, Springfield School District",

  "shield.useCases.title": "Fâ”œâ•r Bildung entwickelt",
  "shield.useCases.card1.title": "Lehrer-KI-Tools",
  "shield.useCases.card1.description": "Verwalten Sie KI-Schreibassistenten, Unterrichtsplaner und Bewertungstools",
  "shield.useCases.card2.title": "Schâ”œâ•ler-KI-Nutzung",
  "shield.useCases.card2.description": "â”œÂ£berwachen und leiten Sie angemessene KI-Nutzung in Schâ”œâ•lerarbeiten",
  "shield.useCases.card3.title": "Administrative KI",
  "shield.useCases.card3.description": "Sichere KI-Nutzung fâ”œâ•r Planung, Kommunikation und Betrieb",

  "shield.comparison.title": "Shield vs. Manuelle Governance",
  "shield.comparison.feature": "Funktion",
  "shield.comparison.shield": "Mit Shield",
  "shield.comparison.manual": "Manueller Prozess",
  "shield.comparison.row1.feature": "Richtliniendurchsetzung",
  "shield.comparison.row1.shield": "Automatisiert",
  "shield.comparison.row1.manual": "Manuelle Prâ”œâ•fungen",
  "shield.comparison.row2.feature": "Prâ”œâ•fpfad",
  "shield.comparison.row2.shield": "Vollstâ”œÃ±ndige Protokolle",
  "shield.comparison.row2.manual": "Unvollstâ”œÃ±ndige Aufzeichnungen",
  "shield.comparison.row3.feature": "PII-Schutz",
  "shield.comparison.row3.shield": "Automatisch",
  "shield.comparison.row3.manual": "Manuelle â”œÂ£berprâ”œâ•fung",

  "shield.pricing.title": "Enterprise-Preise",
  "shield.pricing.description":
    "Individuelle Preisgestaltung basierend auf Ihrer Schulgrâ”œÃ‚â”œÆ’e und Ihren Anforderungen. Kontaktieren Sie uns fâ”œâ•r ein Angebot.",
  "shield.pricing.cta": "Preise erhalten",

  "shield.finalCta.title": "Bereit, die KI Ihrer Schule zu sichern?",
  "shield.finalCta.subtitle":
    "Schlieâ”œÆ’en Sie sich zukunftsorientierten Schulen an, die Shield nutzen, um KI sicher einzusetzen",
  "shield.finalCta.primary": "Demo planen",
  "shield.finalCta.secondary": "Vertrieb kontaktieren",
  "shield.finalCta.note": "Enterprise-Support und Onboarding inklusive",

  // FAQ Page (German)
  "faq.hero.eyebrow": "Hâ”œÃ¤UFIG GESTELLTE FRAGEN",
  "faq.hero.title": "Wie kâ”œÃ‚nnen wir Ihnen helfen?",
  "faq.hero.subtitle": "Finden Sie Antworten auf hâ”œÃ±ufige Fragen zu Zaza Draft und unseren KI-Tools fâ”œâ•r Lehrkrâ”œÃ±fte.",

  // FAQ Categories (German)
  "faq.category.about.title": "â”œÂ£ber Zaza Draft",
  "faq.category.safety.title": "Sicherheit & Datenschutz",
  "faq.category.features.title": "Funktionen & Mâ”œÃ‚glichkeiten",
  "faq.category.pricing.title": "Preise & Plâ”œÃ±ne",
  "faq.category.languages.title": "Sprachen & â”œÂ£bersetzung",
  "faq.category.schools.title": "Fâ”œâ•r Schulen & Bezirke",

  // About Questions (German)
  "faq.about.q1": "Was ist Zaza Draft?",
  "faq.about.a1":
    "Zaza Draft ist ein KI-gestâ”œâ•tzter Schreibassistent, der speziell fâ”œâ•r Lehrkrâ”œÃ±fte entwickelt wurde. Er hilft Ihnen, grobe Notizen in ausgefeilte Eltern-E-Mails, Zeugnisse, Bewertungskommentare und andere pâ”œÃ±dagogische Kommunikation in Minuten zu verwandeln, wâ”œÃ±hrend Sie Ihre authentische Stimme bewahren.",

  "faq.about.q2": "Wie unterscheidet sich Zaza Draft von ChatGPT oder anderen KI-Tools?",
  "faq.about.a2":
    "Im Gegensatz zu generischen KI-Tools ist Zaza Draft speziell auf pâ”œÃ±dagogische Kommunikation und Pâ”œÃ±dagogik trainiert. Es ist halluzinationssicher (erfindet niemals Schâ”œâ•lerinformationen), bietet bildungsspezifische Tonoptionen, ist von Grund auf FERPA-konform und bietet spezialisierte Workflows fâ”œâ•r gâ”œÃ±ngige Schreibaufgaben von Lehrkrâ”œÃ±ften.",

  "faq.about.q3": "Fâ”œâ•r wen ist Zaza Draft gedacht?",
  "faq.about.a3":
    "Zaza Draft ist fâ”œâ•r K-12-Lehrkrâ”œÃ±fte, Pâ”œÃ±dagogen, Schuladministratoren und alle, die an pâ”œÃ±dagogischer Kommunikation beteiligt sind, konzipiert. Egal, ob Sie Eltern-E-Mails, Zeugnisse, Feedback-Kommentare oder Schulankâ”œâ•ndigungen schreiben, Draft hilft Ihnen, Zeit zu sparen und gleichzeitig professionelle Qualitâ”œÃ±t zu wahren.",

  "faq.about.q4": "Benâ”œÃ‚tige ich technische Kenntnisse, um Zaza Draft zu verwenden?",
  "faq.about.a4":
    "Keine technischen Kenntnisse erforderlich! Zaza Draft ist unglaublich einfach zu bedienen: Notizen einfâ”œâ•gen, Ton wâ”œÃ±hlen und ausgefeilte Ausgabe erhalten. Wenn Sie E-Mails verwenden kâ”œÃ‚nnen, kâ”œÃ‚nnen Sie Draft verwenden.",

  "faq.about.q5": "Kann ich Zaza Draft vor einer Verpflichtung ausprobieren?",
  "faq.about.a5":
    "Ja! Wir bieten eine kostenlose Testversion an, damit Sie erleben kâ”œÃ‚nnen, wie Draft Ihnen Zeit spart und Ihre Kommunikation verbessert. Keine Kreditkarte zum Starten erforderlich.",

  "faq.about.q6": "Bei welchen Arten von Texten kann Zaza Draft helfen?",
  "faq.about.a6":
    "Draft spezialisiert sich auf sechs Schlâ”œâ•sselbereiche: Elternnachrichten, Zeugnisse, Bewertungskommentare, Schulkommunikation, Empfehlungsschreiben und Dokumentation. Es ist fâ”œâ•r die alltâ”œÃ±glichen Schreibaufgaben von Lehrkrâ”œÃ±ften entwickelt.",

  "faq.about.q7": "Wie viel Zeit kann ich mit Zaza Draft sparen?",
  "faq.about.a7":
    "Lehrkrâ”œÃ±fte, die Draft verwenden, berichten, dass sie â”œâ•ber 10 Stunden pro Woche bei Schreibaufgaben sparen. Aufgaben, die normalerweise 2 Stunden dauern, kâ”œÃ‚nnen mit Drafts Hilfe in 5 Minuten erledigt werden.",

  "faq.about.q8": "Kann ich die Ausgabe anpassen?",
  "faq.about.a8":
    "Absolut! Draft bietet einen Ausgangspunkt, den Sie bearbeiten und verfeinern kâ”œÃ‚nnen. Sie behalten die volle Kontrolle â”œâ•ber die endgâ”œâ•ltige Nachricht - Draft hilft Ihnen nur, schneller dorthin zu gelangen.",

  "faq.about.q9": "Funktioniert Zaza Draft in meinem Land?",
  "faq.about.a9":
    "Ja! Zaza Draft ist weltweit verfâ”œâ•gbar und unterstâ”œâ•tzt Kommunikation in â”œâ•ber 20 Sprachen. Egal, ob Sie in den USA, Groâ”œÆ’britannien, Kanada, Australien oder anderswo sind, Draft kann Ihnen helfen, effektiv zu kommunizieren.",

  "faq.about.q10": "Was ist das Zaza-Produktâ”œÃ‚kosystem?",
  "faq.about.a10":
    "Zaza bietet eine Suite von KI-Tools fâ”œâ•r Bildung: Draft (Schreibassistent), Teach (Unterrichtsplanung), GradeFlow (Bewertungsassistent) und Shield (KI-Governance). Jedes Tool ist darauf ausgelegt, spezifische Herausforderungen von Lehrkrâ”œÃ±ften zu lâ”œÃ‚sen.",

  "faq.about.q11": "Wie fange ich an?",
  "faq.about.a11":
    "Melden Sie sich einfach fâ”œâ•r ein kostenloses Konto an, fâ”œâ•gen Sie Ihren ersten Entwurf oder Notizen ein, wâ”œÃ±hlen Sie Ihren gewâ”œâ•nschten Ton und beobachten Sie, wie Draft Ihr Schreiben transformiert. Sie werden innerhalb von Minuten nach dem Start Zeit sparen.",

  // Safety Questions (German)
  "faq.safety.q1": "Sind meine Daten bei Zaza Draft sicher?",
  "faq.safety.a1":
    "Ja. Wir nehmen Datensicherheit ernst. Alle Daten sind wâ”œÃ±hrend der â”œÂ£bertragung und im Ruhezustand verschlâ”œâ•sselt, wir sind FERPA-konform und wir verwenden Ihre Daten niemals zum Trainieren unserer Modelle oder teilen sie mit Dritten. Ihre Kommunikation bleibt privat und sicher.",

  "faq.safety.q2": "Was bedeutet 'halluzinationssicher'?",
  "faq.safety.a2":
    "Halluzinationssicher bedeutet, dass Draft niemals Schâ”œâ•lerinformationen erfindet, Elterngesprâ”œÃ±che fabriziert oder fiktive Details â”œâ•ber Ihre Klasse erstellt. Jede Ausgabe basiert auf dem, was Sie tatsâ”œÃ±chlich bereitstellen - keine erfundenen Fakten oder Szenarien.",

  "faq.safety.q3": "Ist Zaza Draft FERPA-konform?",
  "faq.safety.a3":
    "Ja. Zaza Draft ist mit Blick auf FERPA-Konformitâ”œÃ±t entwickelt. Wir implementieren angemessene Schutzmaâ”œÆ’nahmen zum Schutz der Privatsphâ”œÃ±re von Schâ”œâ•lern und Bildungsunterlagen, und wir teilen oder verkaufen niemals Schâ”œâ•lerdaten.",

  "faq.safety.q4": "Kann ich Schâ”œâ•lernamen in meinen Entwâ”œâ•rfen verwenden?",
  "faq.safety.a4":
    "Ja, Sie kâ”œÃ‚nnen Schâ”œâ•lernamen und relevante Details einbeziehen. Draft verarbeitet diese Informationen sicher und speichert oder verwendet sie niemals â”œâ•ber die Generierung Ihrer spezifischen Ausgabe hinaus. Alle Schâ”œâ•lerinformationen bleiben vertraulich.",

  "faq.safety.q5": "Was passiert mit meinen Daten, nachdem ich Draft verwendet habe?",
  "faq.safety.a5":
    "Ihre Entwâ”œâ•rfe und Ausgaben werden sicher in Ihrem Konto gespeichert, aber wir verwenden sie niemals zum Trainieren unserer KI-Modelle. Sie kâ”œÃ‚nnen Ihre Daten jederzeit aus Ihren Kontoeinstellungen lâ”œÃ‚schen.",

  "faq.safety.q6": "Ist Zaza Draft DSGVO-konform?",
  "faq.safety.a6":
    "Ja. Wir erfâ”œâ•llen die DSGVO-Anforderungen fâ”œâ•r Datenschutz und Privatsphâ”œÃ±re. Benutzer haben volle Kontrolle â”œâ•ber ihre Daten, einschlieâ”œÆ’lich des Rechts auf Zugriff, Korrektur und Lâ”œÃ‚schung ihrer Informationen.",

  // Features Questions (German)
  "faq.features.q1": "Welche Tonoptionen sind verfâ”œâ•gbar?",
  "faq.features.a1":
    "Draft bietet vier bildungsspezifische Tâ”œÃ‚ne: Unterstâ”œâ•tzend (warm und ermutigend), Formal (professionell und strukturiert), Prâ”œÃ±gnant (kurz und direkt) und Neutral (ausgewogen und objektiv). Jeder Ton ist fâ”œâ•r pâ”œÃ±dagogische Kommunikation kalibriert.",

  "faq.features.q2": "Kann Draft meine Nachrichten â”œâ•bersetzen?",
  "faq.features.a2":
    "Ja! Draft kann Ihre Kommunikation in â”œâ•ber 20 Sprachen â”œâ•bersetzen, was es einfach macht, mit Familien zu kommunizieren, die verschiedene Sprachen sprechen. â”œÂ£bersetzungen bewahren den angemessenen Ton und pâ”œÃ±dagogischen Kontext.",

  "faq.features.q3": "Funktioniert Draft mit den Systemen meiner Schule?",
  "faq.features.a3":
    "Draft generiert Text, den Sie einfach in jedes System kopieren und einfâ”œâ•gen kâ”œÃ‚nnen - E-Mail, Lernmanagementsysteme, Notenbâ”œâ•cher oder Textverarbeitungsprogramme. Keine speziellen Integrationen erforderlich.",

  "faq.features.q4": "Kann ich Vorlagen oder hâ”œÃ±ufig verwendete Phrasen speichern?",
  "faq.features.a4":
    "Ja! Sie kâ”œÃ‚nnen Ihre Lieblingsausgaben als Vorlagen fâ”œâ•r die zukâ”œâ•nftige Verwendung speichern, was es noch schneller macht, â”œÃ±hnliche Kommunikation in der Zukunft zu erstellen.",

  "faq.features.q5": "Funktioniert Draft auf mobilen Gerâ”œÃ±ten?",
  "faq.features.a5":
    "Ja! Zaza Draft ist vollstâ”œÃ±ndig responsiv und funktioniert auf Smartphones, Tablets und Computern. Schreiben und verfeinern Sie Kommunikation, wo immer Sie sind.",

  "faq.features.q6": "Kâ”œÃ‚nnen mehrere Lehrkrâ”œÃ±fte Vorlagen teilen?",
  "faq.features.a6":
    "Mit unseren Schulplâ”œÃ±nen kâ”œÃ‚nnen Teams Vorlagen und Best Practices teilen und so eine konsistente Kommunikation in Ihrer Abteilung oder Schule gewâ”œÃ±hrleisten.",

  // Pricing Questions (German)
  "faq.pricing.q1": "Wie viel kostet Zaza Draft?",
  "faq.pricing.a1":
    "Wir bieten flexible Preisplâ”œÃ±ne fâ”œâ•r einzelne Lehrkrâ”œÃ±fte und Schulen. Besuchen Sie unsere Preisseite fâ”œâ•r aktuelle Tarife und Plandetails. Wir bieten auch eine kostenlose Testversion an, damit Sie Draft vor einer Verpflichtung erleben kâ”œÃ‚nnen.",

  "faq.pricing.q2": "Gibt es eine kostenlose Version?",
  "faq.pricing.a2":
    "Wir bieten eine kostenlose Testphase an, damit Sie die volle Leistung von Draft erleben kâ”œÃ‚nnen. Nach der Testphase kâ”œÃ‚nnen Sie einen Plan wâ”œÃ±hlen, der Ihren Bedâ”œâ•rfnissen und Ihrem Budget entspricht.",

  "faq.pricing.q3": "Bieten Sie Schul- oder Bezirkspreise an?",
  "faq.pricing.a3":
    "Ja! Wir bieten spezielle Preise fâ”œâ•r Schulen und Bezirke an, einschlieâ”œÆ’lich Mengenrabatten, zentralisierter Abrechnung und zusâ”œÃ±tzlicher Funktionen wie Teamzusammenarbeit und Admin-Kontrollen. Kontaktieren Sie unser Vertriebsteam fâ”œâ•r ein individuelles Angebot.",

  "faq.pricing.q4": "Kann ich jederzeit kâ”œâ•ndigen?",
  "faq.pricing.a4":
    "Ja. Es gibt keine langfristigen Vertrâ”œÃ±ge fâ”œâ•r individuelle Plâ”œÃ±ne. Sie kâ”œÃ‚nnen Ihr Abonnement jederzeit kâ”œâ•ndigen und behalten den Zugriff bis zum Ende Ihres Abrechnungszeitraums.",

  // Languages Questions (German)
  "faq.languages.q1": "Welche Sprachen unterstâ”œâ•tzt Draft?",
  "faq.languages.a1":
    "Draft unterstâ”œâ•tzt Kommunikation in â”œâ•ber 20 Sprachen, darunter Spanisch, Franzâ”œÃ‚sisch, Deutsch, Mandarin, Arabisch, Portugiesisch und viele mehr. Sie kâ”œÃ‚nnen auf Englisch schreiben und in jede unterstâ”œâ•tzte Sprache â”œâ•bersetzen oder direkt in Ihrer bevorzugten Sprache schreiben.",

  "faq.languages.q2": "Wie genau sind die â”œÂ£bersetzungen?",
  "faq.languages.a2":
    "Unsere â”œÂ£bersetzungen sind speziell fâ”œâ•r pâ”œÃ±dagogische Kontexte kalibriert und bewahren angemessenen Ton und Formalitâ”œÃ±t. Wâ”œÃ±hrend wir empfehlen, â”œÂ£bersetzungen fâ”œâ•r kritische Kommunikation von Muttersprachlern â”œâ•berprâ”œâ•fen zu lassen, sind unsere â”œÂ£bersetzungen sehr genau und kontextuell angemessen.",

  "faq.languages.q3": "Kann Draft mir helfen, mit mehrsprachigen Familien zu kommunizieren?",
  "faq.languages.a3":
    "Absolut! Draft macht es einfach, dieselbe Nachricht in mehreren Sprachen zu senden und sicherzustellen, dass alle Familien Kommunikation in ihrer bevorzugten Sprache erhalten. Dies hilft, stâ”œÃ±rkere Schule-Heim-Verbindungen aufzubauen.",

  // Schools Questions (German)
  "faq.schools.q1": "Wie funktioniert Zaza Draft fâ”œâ•r ganze Schulen oder Bezirke?",
  "faq.schools.a1":
    "Unsere Schul- und Bezirksplâ”œÃ±ne umfassen zentralisierte Verwaltung, Teamzusammenarbeitsfunktionen, gemeinsame Vorlagen, Nutzungsanalysen, vorrangigen Support und Mengenpreise. Administratoren kâ”œÃ‚nnen Lizenzen verwalten, die Nutzung â”œâ•berwachen und konsistente Kommunikationsstandards in der gesamten Organisation sicherstellen.",

  "faq.schools.q2": "Bieten Sie Schulungen und Support fâ”œâ•r Schulen an?",
  "faq.schools.a2":
    "Ja! Schul- und Bezirksplâ”œÃ±ne umfassen Onboarding-Support, Schulungsmaterialien und fortlaufende Ressourcen fâ”œâ•r die berufliche Weiterentwicklung. Wir helfen sicherzustellen, dass Ihr gesamtes Team Draft effektiv nutzen kann, um Zeit zu sparen und die Kommunikation zu verbessern.",

  // FAQ CTA (German)
  "faq.cta.title": "Haben Sie noch Fragen?",
  "faq.cta.subtitle":
    "Unser Support-Team ist hier, um zu helfen. Kontaktieren Sie uns und wir melden uns innerhalb von 24 Stunden bei Ihnen.",
  "faq.cta.button": "Support kontaktieren",

  // About Overview Page (German)
  "about.overview.hero.eyebrow": "â”œÂ£BER ZAZA",
  "about.overview.hero.title": "Die Zukunft der Lehrertechnologie gestalten",
  "about.overview.hero.subtitle":
    "Unsere Mission ist es, Lehrkrâ”œÃ±ften ihre Zeit zurâ”œâ•ckzugeben, indem wir KI-Tools entwickeln, die Bildung wirklich verstehen.",

  "about.overview.mission.title": "Unsere Mission",
  "about.overview.mission.body":
    "Jede Lehrkraft verdient Tools, die ihre Expertise respektieren, ihre Schâ”œâ•ler schâ”œâ•tzen und ihnen Zeit geben, das zu tun, was sie am besten kâ”œÃ‚nnen: unterrichten. Wir entwickeln KI, die Lehrkrâ”œÃ±ften dient, nicht umgekehrt.",

  "about.overview.values.title": "Unsere Werte",
  "about.overview.values.teacherFirst.title": "Lehrkraft-zentriertes Design",
  "about.overview.values.teacherFirst.body":
    "Jede Funktion wird mit echten Lehrkrâ”œÃ±ften entwickelt, in echten Klassenzimmern getestet und basierend auf echtem Feedback verfeinert.",
  "about.overview.values.safety.title": "Sicherheit durch Design",
  "about.overview.values.safety.body":
    "Wir entwickeln halluzinationssichere KI, die niemals Schâ”œâ•lerinformationen erfindet oder Details â”œâ•ber Ihre Klasse fabriziert.",
  "about.overview.values.privacy.title": "Datenschutz zuerst",
  "about.overview.values.privacy.body":
    "Von Anfang an FERPA-konform. Ihre Daten gehâ”œÃ‚ren Ihnen, und wir verwenden sie niemals zum Trainieren unserer Modelle.",
  "about.overview.values.evidence.title": "Evidenzbasiert",
  "about.overview.values.evidence.body":
    "Basierend auf echter Pâ”œÃ±dagogik und Bildungsforschung, nicht auf generischen Business-Schreibmustern.",

  "about.overview.timeline.title": "Unsere Reise",
  "about.overview.timeline.2023.title": "Grâ”œâ•ndung",
  "about.overview.timeline.2023.body":
    "Begonnen mit einer einfachen Frage: Warum verbringen Lehrkrâ”œÃ±fte so viel Zeit mit Schreiben, wenn KI helfen kâ”œÃ‚nnte?",
  "about.overview.timeline.2024.title": "Start",
  "about.overview.timeline.2024.body":
    "Verâ”œÃ‚ffentlichung von Zaza Draft fâ”œâ•r â”œâ•ber 100 Beta-Lehrkrâ”œÃ±fte. â”œÂ£ber 50.000 Stunden Schreibzeit gespart.",
  "about.overview.timeline.2025.title": "Wachstum",
  "about.overview.timeline.2025.body":
    "Expansion auf â”œâ•ber 500 Lehrkrâ”œÃ±fte in 15 Lâ”œÃ±ndern. Start von Teach, GradeFlow und Shield.",

  "about.overview.cta.title": "Mâ”œÃ‚chten Sie mehr erfahren?",
  "about.overview.cta.body":
    "Kontaktieren Sie unser Team, um zu besprechen, wie Zaza Ihrer Schule oder Ihrem Bezirk helfen kann.",
  "about.overview.cta.button": "Kontaktieren Sie uns",

  // About Company Page (German)
  "about.company.hero.eyebrow": "UNSER UNTERNEHMEN",
  "about.company.hero.title": "Zaza Technologies",
  "about.company.hero.subtitle":
    "Wir sind ein Team aus Pâ”œÃ±dagogen, Ingenieuren und Designern, die die Zukunft der Lehrertechnologie gestalten.",

  "about.company.body.p1":
    "Zaza Technologies wurde 2023 von Lehrkrâ”œÃ±ften gegrâ”œâ•ndet, die von generischen KI-Tools frustriert waren, die Bildung nicht verstanden. Wir sahen Lehrkrâ”œÃ±fte, die Stunden mit administrativen Schreibaufgaben verbrachten, die automatisiert werden kâ”œÃ‚nnten, aber bestehende KI-Tools waren entweder unsicher fâ”œâ•r Schâ”œâ•lerdaten oder produzierten Ausgaben, die â”œâ•berhaupt nicht wie eine Lehrkraft klangen.",

  "about.company.body.p2":
    "Also haben wir etwas anderes entwickelt: KI-Tools, die speziell auf pâ”œÃ±dagogische Kommunikation und Pâ”œÃ±dagogik trainiert sind. Tools, die die Nuancen der Eltern-Lehrer-Kommunikation verstehen, die Bedeutung konstruktiven Feedbacks und die Notwendigkeit, Ihre authentische Stimme zu bewahren. Tools, die halluzinationssicher, FERPA-konform und von Grund auf fâ”œâ•r Bildung entwickelt sind.",

  "about.company.body.p3":
    "Heute dient Zaza â”œâ•ber 500 Lehrkrâ”œÃ±ften in 15 Lâ”œÃ±ndern und spart ihnen â”œâ•ber 10 Stunden pro Woche bei Schreibaufgaben. Aber wir fangen gerade erst an. Unsere Vision ist es, eine vollstâ”œÃ±ndige Suite von KI-Tools zu entwickeln, die Lehrkrâ”œÃ±ften helfen, ihre Zeit zurâ”œâ•ckzugewinnen und sich auf das Wichtigste zu konzentrieren: ihre Schâ”œâ•ler.",

  "about.company.stats.teachers.label": "Lehrkrâ”œÃ±fte nutzen Zaza",
  "about.company.stats.teachers.value": "500+",
  "about.company.stats.countries.label": "Lâ”œÃ±nder",
  "about.company.stats.countries.value": "15",
  "about.company.stats.timeSaved.label": "Wâ”œÃ‚chentlich gesparte Stunden",
  "about.company.stats.timeSaved.value": "10+",

  // Founder Hero Section (German)
  "founder.hero.headline": "Lernen Sie den Grâ”œâ•nder kennen, der KI fâ”œâ•r Lehrkrâ”œÃ±fte entwickelt",
  "founder.hero.subheading":
    "Dr. Greg Blackburn verbrachte 15 Jahre in Klassenzimmern, bevor er Zaza entwickelte - KI-Tools, die verstehen, was Lehrkrâ”œÃ±fte wirklich brauchen.",
  "founder.hero.label": "GRâ”œÂ£NDER & CEO",
  "founder.hero.name": "Dr. Greg Blackburn",
  "founder.hero.tagline": "Ehemaliger Lehrer, EdTech-Entwickler, KI-Befâ”œâ•rworter",

  // Founder Journey Section (German)
  "founder.journey.title": "Die Reise",
  "founder.journey.quote":
    "Ich habe Zaza entwickelt, weil ich es satt hatte, Lehrkrâ”œÃ±fte in administrativer Arbeit ertrinken zu sehen, wenn Technologie sie befreien sollte.",
  "founder.journey.p1":
    "Ich begann meine Karriere 2008 als Gymnasiallehrer fâ”œâ•r Englisch. Wie die meisten Lehrkrâ”œÃ±fte liebte ich die Arbeit mit Schâ”œâ•lern, kâ”œÃ±mpfte aber mit den endlosen administrativen Aufgaben - Eltern-E-Mails, Zeugnisse, Bewertungsfeedback. Ich verbrachte meine Abende und Wochenenden mit Schreiben, wenn ich groâ”œÆ’artige Unterrichtsstunden hâ”œÃ±tte planen oder Zeit mit meiner Familie verbringen sollen.",
  "founder.journey.p2":
    "Nach meiner Promotion in Bildungstechnologie arbeitete ich mit Schulen an der Implementierung von KI-Tools. Aber ich sah immer wieder dasselbe Problem: Generische KI-Tools waren nicht fâ”œâ•r Bildung entwickelt. Sie erfanden Schâ”œâ•lerinformationen, produzierten Ausgaben, die â”œâ•berhaupt nicht wie eine Lehrkraft klangen, und schufen mehr Arbeit als sie sparten. Lehrkrâ”œÃ±fte brauchten etwas anderes.",
  "founder.journey.p3":
    "Also grâ”œâ•ndete ich 2023 Zaza Technologies mit einer einfachen Mission: KI-Tools entwickeln, die Bildung wirklich verstehen. Tools, die auf echter Pâ”œÃ±dagogik trainiert sind, nicht auf Business-Texten. Tools, die halluzinationssicher, FERPA-konform und von Grund auf fâ”œâ•r Lehrkrâ”œÃ±fte entwickelt sind. Tools, die die Expertise von Lehrkrâ”œÃ±ften respektieren und ihnen ihre Zeit zurâ”œâ•ckgeben.",
  "founder.journey.p4":
    "Heute dient Zaza â”œâ•ber 500 Lehrkrâ”œÃ±ften in 15 Lâ”œÃ±ndern und spart ihnen â”œâ•ber 10 Stunden pro Woche. Aber wir fangen gerade erst an. Meine Vision ist es, eine vollstâ”œÃ±ndige Suite von KI-Tools zu entwickeln, die jeder Lehrkraft hilft, ihre Zeit zurâ”œâ•ckzugewinnen und sich auf das Wichtigste zu konzentrieren: ihre Schâ”œâ•ler.",

  // Founder Mission Callout (German)
  "founder.mission.quote":
    "Jede Lehrkraft verdient Tools, die ihre Expertise respektieren, ihre Schâ”œâ•ler schâ”œâ•tzen und ihnen Zeit geben, das zu tun, was sie am besten kâ”œÃ‚nnen: unterrichten.",
  "founder.mission.attribution": "Dr. Greg Blackburn, Grâ”œâ•nder & CEO",

  // Founder Why Zaza Section (German)
  "founder.whyZaza.title": "Warum ich Zaza entwickelt habe",
  "founder.whyZaza.subtitle": "Drei Prinzipien, die alles leiten, was wir tun",
  "founder.whyZaza.card1.title": "Fâ”œâ•r Lehrkrâ”œÃ±fte, von Lehrkrâ”œÃ±ften",
  "founder.whyZaza.card1.body":
    "Ich habe die Lehrererfahrung gelebt - die spâ”œÃ±ten Nâ”œÃ±chte, die endlosen E-Mails, die Zeugnismarathons. Zaza wird von jemandem entwickelt, der es versteht, weil ich dort war.",
  "founder.whyZaza.card2.title": "Boutique, nicht Big Tech",
  "founder.whyZaza.card2.body":
    "Wir sind kein riesiges Unternehmen, das an jeden verkaufen will. Wir sind ein fokussiertes Team, das spezialisierte Tools fâ”œâ•r ein Publikum entwickelt: Lehrkrâ”œÃ±fte. Ihre Bedâ”œâ•rfnisse stehen immer an erster Stelle.",
  "founder.whyZaza.card3.title": "Ein Vermâ”œÃ±chtnis aufbauen",
  "founder.whyZaza.card3.body":
    "Es geht nicht um schnelle Gewinne. Es geht darum, etwas zu schaffen, das Lehrkrâ”œÃ±ften wirklich hilft zu gedeihen und Bildung zum Besseren verâ”œÃ±ndert. Das ist das Vermâ”œÃ±chtnis, das ich hinterlassen mâ”œÃ‚chte.",

  // Founder Personal Message Section (German)
  "founder.personal.title": "Eine persâ”œÃ‚nliche Notiz",
  "founder.personal.message1":
    "Wenn Sie dies lesen, sind Sie wahrscheinlich eine Lehrkraft, die neugierig auf KI ist, aber skeptisch, ob sie wirklich helfen kann. Ich verstehe das. Ich war auch skeptisch. Die meisten KI-Tools fâ”œâ•hlen sich an, als wâ”œÃ±ren sie von Menschen entwickelt worden, die nie einen Fuâ”œÆ’ in ein Klassenzimmer gesetzt haben.",
  "founder.personal.message2":
    "Deshalb habe ich Zaza anders entwickelt. Jede Funktion wird mit echten Lehrkrâ”œÃ±ften entwickelt, in echten Klassenzimmern getestet und basierend auf echtem Feedback verfeinert. Wir entwickeln nicht nur Software - wir bauen Partnerschaften mit Pâ”œÃ±dagogen auf, die uns helfen, Tools zu erstellen, die wirklich funktionieren.",
  "founder.personal.message3":
    "Ich wâ”œâ•rde gerne von Ihnen hâ”œÃ‚ren. Ob Sie Fragen, Feedback haben oder einfach nur â”œâ•ber Bildung und Technologie sprechen mâ”œÃ‚chten, meine Tâ”œâ•r steht immer offen. Lassen Sie uns gemeinsam die Zukunft der Lehrertechnologie gestalten.",
  "founder.personal.name": "Dr. Greg Blackburn",
  "founder.personal.title2": "Grâ”œâ•nder & CEO",
  "founder.personal.company": "Zaza Technologies",
  "founder.personal.cta": "Kontakt aufnehmen",

  // Webinars (DE) â€” additions
  "webinars.hero.badge": "50+ Fortbildungssitzungen",
  "webinars.labels.featured": "Hervorgehoben",
  "webinars.labels.certificateIncluded": "Zertifikat inklusive",
  "webinars.labels.whatYouWillLearn": "Das lernen Sie",
  "webinars.stats.teachers": "Geschulte LehrkrÃ¤fte",
  "webinars.stats.rating": "Durchschn. Bewertung",
  "webinars.related.title": "Lernen vertiefen",
  "webinars.related.desc": "ErgÃ¤nzen Sie Ihr Webinar-Lernen mit diesen Ressourcen",
  "webinars.related.courses.title": "KI-Kurse fÃ¼r LehrkrÃ¤fte",
  "webinars.related.courses.desc": "Selbstlernkurse mit Zertifikatsprogrammen",
  "webinars.related.glossary.title": "KI-Glossar",
  "webinars.related.glossary.desc": "150+ KI-Begriffe fÃ¼r LehrkrÃ¤fte erklÃ¤rt",
  "webinars.related.community.title": "Community-Forum",
  "webinars.related.community.desc": "Diskutieren Sie Webinar-Themen mit Kolleginnen und Kollegen",
  "webinars.benefits.title": "Warum an unseren Webinaren teilnehmen?",
  "webinars.benefits.pd.title": "Fortbildungszertifikate",
  "webinars.benefits.pd.body": "Erhalten Sie fÃ¼r jedes absolvierte Webinar ein Zertifikat.",
  "webinars.benefits.experts.title": "Expertinnen und Experten",
  "webinars.benefits.experts.body": "Lernen Sie von erfahrenen PÃ¤dagoginnen, PÃ¤dagogen und KI-Spezialistinnen, -Spezialisten.",
  "webinars.benefits.resources.title": "Download-Ressourcen",
  "webinars.benefits.resources.body": "Vorlagen, LeitfÃ¤den und Materialien fÃ¼r den sofortigen Einsatz.",
  "webinars.benefits.access.title": "Lebenslanger Zugriff",
  "webinars.benefits.access.body": "Aufzeichnungen jederzeit ansehen und Inhalte bei Bedarf auffrischen.",
  "webinars.cta.title": "Bereit fÃ¼r den nÃ¤chsten Schritt?",
  "webinars.cta.exploreCourses": "Kurse entdecken",

  // Common (DE)
  "common.learnMore": "Mehr erfahren",

  // AI Literacy (DE)
  "aiLiteracy.hero.badge": "KI-Kompetenz-Zentrum",
  "aiLiteracy.hero.title": "KI-Kompetenz fÃ¼r LehrkrÃ¤fte",
  "aiLiteracy.hero.subtitle": "Kostenlose Kurse, Zertifikate und Ressourcen fÃ¼r einen sicheren, souverÃ¤nen KI-Einsatz.",
  "aiLiteracy.paths.title": "WÃ¤hlen Sie Ihren Pfad",
  "aiLiteracy.filters.all": "alle",
  "aiLiteracy.filters.beginner": "anfÃ¤nger",
  "aiLiteracy.filters.intermediate": "fortgeschritten",
  "aiLiteracy.filters.advanced": "experte",
  "aiLiteracy.courses.title": "Empfohlene Kurse",
  "aiLiteracy.resources.title": "Download-Bibliothek",
  "aiLiteracy.cert.title": "KI-Zertifizierungen",
  "aiLiteracy.cert.certifiedTeachers": "zertifizierte LehrkrÃ¤fte",
  "aiLiteracy.related.title": "Ihre KI-Reise fortsetzen",
  "aiLiteracy.related.description": "Weitere Ressourcen fÃ¼r den KI-Einsatz im Unterricht",
  "aiLiteracy.related.webinars.title": "Live-Webinare",
  "aiLiteracy.related.webinars.desc": "Experten-Sessions mit Zertifikat",
  "aiLiteracy.related.community.title": "LehrkrÃ¤fte-Community",
  "aiLiteracy.related.community.desc": "Vernetzen Sie sich mit LehrkrÃ¤ften, die KI einsetzen",
  "aiLiteracy.related.integrations.title": "Tool-Integrationen",
  "aiLiteracy.related.integrations.desc": "Zaza Draft mit Ihren bevorzugten Tools verbinden",
  "aiLiteracy.cta.title": "Starten Sie Ihre KI-Lernreise",
  "aiLiteracy.cta.body": "LehrkrÃ¤fte setzen KI selbstbewusst ein und verbessern so ihren Unterricht.",
  "aiLiteracy.cta.browseCourses": "Kurse durchsuchen",
  "aiLiteracy.cta.tryDraft": "Zaza Draft gratis testen",
  // About - Company Page (DE)
  "about.company.hero.eyebrow": "ÜBER UNS",
  "about.company.hero.title": "Über Zaza Technologies",
  "about.company.hero.subtitle": "Sie sind nicht Lehrer geworden, um E-Mails zu schreiben.",
  "about.company.body.p1": "Sie sind Lehrer geworden, um junge Menschen zu inspirieren, nicht um in Benotung, Dokumentation und endlosen E-Mails zu ertrinken. Und doch sind wir hier: Die Burnout-Raten steigen, und engagierte Pädagogen verlassen den Beruf, weil die bürokratische Last nicht mehr tragbar ist.",
  "about.company.body.p2": "Zaza existiert, um das zu ändern.",
  "about.company.body.p3": "Wir entwickeln ein vertrauenswürdiges Ökosystem von KI-Tools, die Lehrkräften die Zeit, Energie und Freude zurückgeben, die der Beruf bringen sollte. Jede App der Zaza-Familie beseitigt wiederkehrende Aufgaben wie Unterrichtsplanung, Benotung und Eltern-E-Mails und integriert dabei Empathie, Sicherheit und echte Pädagogik in jede Funktion.",
  "about.company.body.p4": "Wir sind nicht hier, um Lehrkräfte zu ersetzen. Wir sind hier, um Ihnen zurückzugeben, was Sie ins Klassenzimmer gebracht hat: die Fähigkeit, tatsächlich zu unterrichten.",
  "about.company.body.p5": "Gegründet 2025 von Dr. Greg Blackburn, einem Lernwissenschaftler mit 20 Jahren Erfahrung in L&D und einem Doktortitel in beruflicher Bildung, der zu viele Lehrerfreunde durch administrative Überlastung ausbrennen sah. Nach dem Unterrichten Tausender Erwachsener und der Leitung großer Lerninitiativen entwickelte er Zaza, um die Probleme zu lösen, die Lehrkräften ihre Zeit stehlen.",
  "about.company.body.founderLink": "Mehr über Gregs Geschichte erfahren",
  "about.company.body.vision": "Wir sehen eine Zukunft, in der es beim Unterrichten weniger um Verwaltung und Stress geht und mehr um Kreativität, Verbindung und Wirkung.",
  "about.company.body.trustHeading": "Warum Lehrkräfte Zaza vertrauen",
  "about.company.body.trustP1": "Wir sind nicht einfach ein weiteres Tech-Unternehmen, das Bildung entdeckt. Zaza basiert auf zwei Jahrzehnten Lernwissenschaft und betrieblicher Bildung, wobei über 2.400 Lehrkräfte aus 43 Ländern unsere Tools durch praktisches Feedback mitgestalten.",
  "about.company.body.trustP2": "Jedes Produkt wird gemeinsam mit Pädagogen entwickelt und ist in der Forschung verankert, denn Abkürzungen, die die Pädagogik kompromittieren, sind überhaupt keine Abkürzungen.",
  "about.company.body.trustP3": "Deshalb haben wir den KnowledgeCore entwickelt—eine Vertrauensebene, die jede Zaza-App erklärbar, datenschutzorientiert und klassenraumtauglich macht.",
  "about.company.body.trustP4": "Keine Black Boxes. Keine Halluzinationen. Keine Untergrabung Ihres professionellen Urteils.",
  "about.company.body.trustP5": "Wenn Zaza Draft eine Eltern-E-Mail vorschlägt oder Zaza Teach einen Unterrichtsplan erstellt, können Sie darauf vertrauen, dass es echte Lernwissenschaft widerspiegelt, nicht generisches KI-Geschwätz, das Ihre Glaubwürdigkeit beschädigt.",
  "about.company.body.testimonial1": "Ich war skeptisch gegenüber KI, die Eltern-E-Mails schreibt. Aber Zaza Draft spart mir nicht nur Zeit. Es lässt mich professioneller und einfühlsamer klingen, als wenn ich um 22 Uhr hetze.",
  "about.company.body.testimonial1Author": "Sarah M., Deutschlehrerin 6. Klasse",
  "about.company.body.dayHeading": "Ein Tag mit Zaza",
  "about.company.body.dayIntro": "Es ist 21 Uhr an einem Dienstag. Sie müssen noch Eltern über den Ausflug informieren, Aufsätze fertig benoten und die morgige Unterrichtsstunde zu argumentativen Texten vorbereiten.",
  "about.company.body.dayChange": "Mit Zaza ändert sich das.",
  "about.company.body.dayDraftQ": "Brauchen Sie eine Eltern-Nachricht, die warm, klar und professionell ist?",
  "about.company.body.dayDraftA": "Zaza Draft schreibt sie in Sekunden. Sie prüfen nur und senden ab.",
  "about.company.body.dayTeachQ": "Möchten Sie einen vollständigen Unterrichtsplan mit Aktivitäten und Differenzierungsstrategien?",
  "about.company.body.dayTeachA": "Zaza Teach erstellt ihn, während Sie das Abendessen machen.",
  "about.company.body.dayGradeQ": "Noch 30 Aufsätze zu korrigieren?",
  "about.company.body.dayGradeA": "GradeFlow gibt jedem Schüler aussagekräftiges Feedback, ohne Ihr Wochenende zu stehlen.",
  "about.company.body.dayShieldQ": "Ängstlich wegen einer schwierigen Eltern-E-Mail um 23 Uhr?",
  "about.company.body.dayShieldA": "Shield hilft Ihnen, professionell zu antworten und schützt Ihre Grenzen, indem es Sie daran erinnert, dass es bis morgen warten kann.",
  "about.company.body.daySummary": "Ob Sie Draft für Elternkommunikation, Teach für Unterrichtsplanung, GradeFlow für Bewertungen oder Shield als Puffer für stressige Nachrichten nutzen—die Prinzipien sind dieselben:",
  "about.company.body.dayPrinciples": "Respekt für Ihr Handwerk. Schutz Ihrer Glaubwürdigkeit. Tools, die tatsächlich Stress reduzieren.",
  "about.company.body.dayZara": "Und weil jede App Zara enthält—Ihre durchgängige In-App-Assistentin—haben Sie immer Unterstützung von einer Stimme, die Sie bereits kennen und der Sie vertrauen.",
  "about.company.body.testimonial2": "Zaza gab mir meine Abende zurück. Ich bin jetzt eine bessere Lehrerin, weil ich nicht erschöpft bin.",
  "about.company.body.testimonial2Author": "Michael R., Geschichtslehrer Gymnasium",
  "about.company.body.dayCTA": "Schließen Sie sich 2.400+ Lehrkräften an, die 10+ Stunden pro Woche sparen",
  "about.company.body.dayCtaLink": "Starten Sie Ihre kostenlose 14-Tage-Testversion",
  "about.company.body.promiseHeading": "Unser Versprechen",
  "about.company.body.promiseP1": "Wir sind nicht hier mit großen Tech-Versprechen. Wir sind hier mit Klarheit, Nützlichkeit und Vertrauen.",
  "about.company.body.promiseP2": "Jede Lehrkraft verdient Tools, die ihr Handwerk respektieren, ihre Glaubwürdigkeit schützen und ihr helfen zu gedeihen.",
  "about.company.body.promiseP3": "Testen Sie Zaza Draft 14 Tage kostenlos. Wenn es Ihnen in der ersten Woche nicht mindestens 2 Stunden spart, erstatten wir Ihnen sofort den Betrag zurück, ohne Fragen.",
  "about.company.body.footer": "Von Pädagogen entwickelt, für Pädagogen.",
  "about.company.stats.teachers.label": "Lehrkräfte nutzen Zaza",
  "about.company.stats.teachers.value": "2.400+",
  "about.company.stats.countries.label": "Länder vertreten",
  "about.company.stats.countries.value": "43",
  "about.company.stats.timeSaved.label": "Durchschnittlich gesparte Stunden pro Woche",
  "about.company.stats.timeSaved.value": "2+",
  // About - Founder Page (DE)
  "about.founder.hero.title": "Lernen Sie den Gründer kennen, der KI entwickelt, die Lehrkräften dient",
  "about.founder.hero.intro1": "Zaza helps teachers thrive. Dr. Greg Blackburn spent two decades in Learning and Development before founding Zaza in 2025 to build teacher-first AI. A learning scientist, educator, and builder, Greg has dedicated his career to helping people learn and giving teachers their time back.",
  "about.founder.hero.intro2": "After teaching thousands of adults in real classrooms and leading major learning initiatives, he is now building AI so teachers everywhere can thrive.",
  "about.founder.hero.title.name": "Dr. Greg Blackburn",
  "about.founder.hero.title.role": "PhD in Professional Education · Educator · Founder of Zaza Technologies",
  "about.founder.journey.heading": "Die Reise",
  "about.founder.journey.subtitle": "From paint brushes in Tasmania to building AI for education.",
  "about.founder.journey.p1": "I began my working life in Hobart as a painter and decorator while I figured out what came next. My dad owned a local paint factory, so brushes, colour charts, and hard work were part of daily life.",
  "about.founder.journey.p2": "That early experience taught me resilience, the value of hard work, and the clarity that I was desperate to study. After completing a trade, I set off on round-the-world travel. For me, this was a journey of discovery, meeting people, seeing countries, learning cultures. Somewhere along the way I realised that education was my ticket to a greater purpose."Junge, hol einfach deine Papiere und dann kannst du alles machen, was du willst.\" Also kämpfte ich mich durch und schloss meine Ausbildung ab. Diese Erfahrung lehrte mich Belastbarkeit, den Wert harter Arbeit und die Klarheit, dass ich unbedingt studieren wollte.",
  "about.founder.journey.p3": "I studied Administration, Information Systems, and German at the University of Tasmania, earning First Class Honours in Information Systems at City University of Queensland. My research pulled me deeper into learning science, critical thinking, and problem-solving in student-centred e-learning, and I later earned a PhD by publication from City, University of London.",
  "about.founder.journey.p4": "Through two decades in Learning and Development, I have taught thousands of adults in real classrooms, from onboarding new hires to upskilling teams, to navigating change. That experience showed me what helps people learn, what gets in the way, and why educators need tools that respect their expertise.",
  "about.founder.journey.p5": "I also stayed close to teachers in my own family and community, my sister, cousins, and colleagues, listening to their stories about workload: parent emails, report writing, grading, documentation. All necessary, but so consuming that it steals the time and energy teachers need most.",
  "about.founder.journey.p6": "That is when the idea of Zaza took root.",
  "about.founder.journey.p7": "In 2025, I founded Zaza Technologies with a simple mission: build AI that respects teacher expertise, is safe and explainable, and gives educators their time back. Zaza is hallucination-aware, privacy-first, and co-designed with teachers in classrooms around the world. Our tools reduce repetitive admin and help teachers focus on what really matters: their students.",
  "about.founder.journey.p8": "Every principle guiding Zaza comes from listening to educators.",
  "about.founder.journey.quote": "Jede Lehrkraft verdient Tools, die ihr Handwerk respektieren und ihr Zeit geben, das zu tun, was sie am besten kann: unterrichten.",
  "about.founder.why.heading": "Warum ich Zaza entwickelt habe",
  "about.founder.why.subtitle": "Together with over 2,400 teachers in 43 countries, we are building the future of teaching, one that puts educators back at the centre.",
  "about.founder.why.principle1.title": "Für Lehrkräfte, mit Lehrkräften",
  "about.founder.why.principle1.description": "Mit Pädagogen co-designt, in realen Arbeitsabläufen validiert, durch echtes Feedback verfeinert.",
  "about.founder.why.principle2.title": "Boutique, nicht Big Tech",
  "about.founder.why.principle2.description": "Wir dienen einer Zielgruppe mit Sorgfalt: Lehrkräften. Qualität vor Skalierung, Nützlichkeit vor Hype.",
  "about.founder.why.principle3.title": "Sicherheit und Vertrauen",
  "about.founder.why.principle3.description": "Datenschutzorientiert, schulreife Schutzmaßnahmen und erklärbare KI, damit Lehrkräfte der Ausgabe vertrauen können.",
  "about.founder.note.heading": "Eine persönliche Notiz",
  "about.founder.note.p1": "If you are a teacher, you have probably tried tools that promised hours back but delivered another chore. I understand that skepticism. Zaza is different. We are building alongside you, not around you. We will keep listening, keep improving, and keep clarity and usefulness over noise.",
  "about.founder.note.p2": "Meine Tür steht offen. Wenn Sie Feedback haben oder mithelfen möchten zu gestalten, was Lehrkräfte als nächstes brauchen, melden Sie sich bitte.",
  "about.founder.note.signature.name": "Greg",
  "about.founder.note.signature.role": "Founder & Educator · Zaza Technologies",
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









