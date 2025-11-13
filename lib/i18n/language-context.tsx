"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

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
    "Save hours every week, reduce after-hours stress, and write with confidence - with pricing that's simple and fair.",
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
    "Most teachers spend 3-5 hours/week on messages and comments. Draft cuts that by 50-70% while preserving your tone and intent.",

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
  "pricing.teacher.timeSaved": "Typical time saved: 4-7 hours/week",

  // Department Plan
  "pricing.department.badge": "TEAMS",
  "pricing.department.title": "Department",
  "pricing.department.description":
    "Collaborative writing with shared quality and consistency.",
  "pricing.department.perTeacher": "/teacher",
  "pricing.department.billing": "Billed annually â€¢ 5-50 seats",
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
    "One place to plan, write, and communicate - with teacher-first wellbeing at the centre.",
  "pricing.bundle.perMonth": "/month",
  "pricing.bundle.perYear": "/year",
  "pricing.bundle.savings": "Save vs buying separately",
  "pricing.bundle.cta": "Get the Bundle",

  // Testimonials
  "pricing.testimonials.title": "What teachers say about pricing",
  "pricing.testimonials.1.name": "Sarah L.",
  "pricing.testimonials.1.role": "Middle School Teacher",
  "pricing.testimonials.1.quote":
    "Draft gave me back my evenings. I now leave school on time - and parents say my messages feel warmer.",
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
    "Yes - start with 5 drafts/month to feel the difference. No credit card required.",
  "pricing.faq.q2": "What happens to my voice?",
  "pricing.faq.a2":
    "Draft preserves your tone and language; you're always in control. Our Tone Tutor learns your style.",
  "pricing.faq.q3": "Are my messages private?",
  "pricing.faq.a3":
    "Yes. We don't use your content to train public models. See our Privacy page for details.",
  "pricing.faq.q4": "Can I cancel anytime?",
  "pricing.faq.a4":
    "Absolutely - no lock-ins. Cancel from your account settings with one click.",
  "pricing.faq.q5": "Do you support schools?",
  "pricing.faq.a5":
    "Yes - volume pricing, SSO, DPA/SCCs, and SLAs for districts. Contact sales@zazadraft.com",
  "pricing.faq.q6": "Do you offer refunds?",
  "pricing.faq.a6":
    "Yes - 30-day money-back guarantee on all paid plans. No questions asked.",

  // CTA Section
  "pricing.cta.title": "Ready to save hours every week?",
  "pricing.cta.subtitle":
    "Start free today  â€¢ No credit card required  â€¢ Cancel anytime",
  "pricing.cta.primary": "Start Free Trial",
  "pricing.cta.secondary": "Talk to Sales",

  // Pricing - Decision Tool section
  "pricing.decision.title": "Not Sure Which Plan to Choose?",
  "pricing.decision.subtitle":
    "Take our quick quiz to get a personalized recommendation",

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
  "suite.hero.title":
    "Zaza is a family of safe, teacher-first AI apps that work together to reduce workload and strengthen teacher efficiency and well-being.",
  "suite.hero.subhead":
    "Every app is powered by the Zaza KnowledgeCore platform for trusted, explainable AI and consistent, school-ready safeguards.",

  // Suite - Teacher First
  "suite.teacherFirst.title": "Built for teachers",
  "suite.teacherFirst.body":
    "Zaza gives time back and lets educators focus on teaching. Everything is designed with privacy, safeguarding and pedagogy at the core so schools can trust what they deploy.",

  // Suite - Core Apps
  "suite.coreApps.title": "The four core apps",
  "suite.teach.body":
    "AI lesson planning that adapts to your curriculum, saves hours of prep time, and keeps lessons engaging and standards-aligned.",
  "suite.teach.li1": "Auto-planner: complete lesson structure in minutes",
  // Features page (EN) - How it works and CTA
  "features.how.title": "How it works",
  "features.how.subtitle": "Three simple steps to better parent messages",
  "features.how.step1.title": "Enter your message",
  "features.how.step1.desc":
    "Type or paste your draft comment about the student",
  "features.how.step2.title": "Get instant feedback",
  "features.how.step2.desc":
    "Draft analyzes tone, clarity, and appropriateness",
  "features.how.step3.title": "Copy and send",
  "features.how.step3.desc": "Export your polished message in seconds",
  "features.cta.title": "Start writing better messages today",
  "features.cta.subtitle": "Try Draft free with 5 comments",
  "features.cta.primary": "Get started",

  // Resources page (EN)
  "resources.title": "Free Resources for Teachers",
  "resources.subtitle": "Time-savers you can use today. Download as DOCX.",
  "resources.download": "Download",
  "resources.comingSoon": "Coming Soon",
  "resources.published": "Published",
  "suite.teach.li2": "Curriculum-aware: Common Core + international frameworks",
  "suite.teach.li3": "Differentiation helpers and creative activity ideas",
  "suite.teach.cta": "Learn more about Teach",

  "suite.draft.body":
    "Comment and report writing without burnout - clear, kind communication grounded in teacher wellbeing research.",
  "suite.draft.li1": "Report and comment templates you can personalize",
  "suite.draft.li2":
    "Tone guidance and bias checks for fair, supportive feedback",
  "suite.draft.li3":
    "Private by default; designed for professional, parent-ready copy",
  "suite.draft.cta": "Learn more about Draft",

  "suite.gradeflow.body":
    "An explainable grading copilot with OCR, rubrics and evidence-based feedback - faster marking with fairness and consistency.",
  "suite.gradeflow.li1":
    "Rubric-aligned, audit-ready feedback with cited evidence",
  "suite.gradeflow.li2": "Consistency across classes and assessors",
  "suite.gradeflow.li3": "Exportable marksheets and moderation support",
  "suite.gradeflow.cta": "Learn more about GradeFlow",

  "suite.shield.body":
    "Communication management that protects teacher wellbeing - drafts difficult emails and helps maintain healthy boundaries.",
  "suite.shield.li1": "Draft assistant for sensitive parent and admin messages",
  "suite.shield.li2": "Boundary prompts and escalation guidance",
  "suite.shield.li3": "Professional, consistent communication patterns",
  "suite.shield.cta": "Learn more about Shield",

  // Suite - Platform
  "suite.platform.title": "Zaza KnowledgeCore (Platform)",
  "suite.platform.body":
    "KnowledgeCore is the secure, intelligent platform that powers every Zaza app. It organizes teacher documents, enforces privacy and compliance, and provides explainable, audit-ready AI across the suite. It's not sold as a separate product - it's how the Zaza apps stay consistent, safe and connected.",
  "suite.platform.li1": "Privacy and safeguarding by design",
  "suite.platform.li2": "Shared context across apps (no re-uploading)",
  "suite.platform.li3":
    "Explainable outputs, rubric alignment and audit trails",

  // Suite - Why Schools
  "suite.why.title": "Why schools choose Zaza",
  "suite.why.timeSaved": "Time saved: Teachers recover hours each week.",
  "suite.why.retention":
    "Retention supported: Lower stress and fairer workload.",
  "suite.why.safety":
    "Safe and compliant: Data privacy and safeguarding, by default.",
  "suite.why.evidence":
    "Evidence-based: Pedagogy and auditability, not just speed.",

  // Suite - Roadmap
  "suite.roadmap.title": "Roadmap-ready",
  "suite.roadmap.body":
    "Coming extensions include smarter parent communication, formative assessment synthesis, and differentiation support - all delivered via KnowledgeCore so teachers benefit everywhere, not in one tool only.",

  // Suite - CTA
  "suite.cta.title": "Start exploring today",
  "suite.cta.body":
    "Whether you're a teacher seeking relief or a school looking for scalable support, Zaza helps your staff thrive.",
  "suite.cta.primary": "Explore our solutions",
  "suite.cta.secondary": "Talk to our team",

  // Suite - Trust Bar (EN)
  "suite.trust.hallucinationSafe": "Hallucination-safe",
  "suite.trust.ferpa": "FERPA compliant",
  "suite.trust.teachers": "500+ teachers",

  // Suite - How It Works (EN)
  "suite.hiw.title": "How the suite works",
  "suite.hiw.step1.title": "Pick the right app",
  "suite.hiw.step1.desc":
    "Teach for planning, Draft for writing, GradeFlow for grading, Shield for boundaries.",
  "suite.hiw.step2.title": "Add your context",
  "suite.hiw.step2.desc":
    "Curriculum, class details, rubrics and tone feed KnowledgeCore once, used everywhere.",
  "suite.hiw.step3.title": "Get school-ready outputs",
  "suite.hiw.step3.desc":
    "Trusted, explainable results with consistent safeguards across every workflow.",

  // Suite - Testimonials (EN)
  "suite.testimonials.title": "What teachers say",
  "suite.testimonials.1.quote":
    "I get my Sunday back. Planning and parent comms now take minutes, not hours.",
  "suite.testimonials.1.author": "Sarah Mitchell",
  "suite.testimonials.1.role": "Primary Teacher, UK",
  "suite.testimonials.2.quote":
    "Consistent grading with clear evidence trails. GradeFlow raised quality across classes.",
  "suite.testimonials.2.author": "Michael Brown",
  "suite.testimonials.2.role": "High School Teacher, US",
  "suite.testimonials.3.quote":
    "Draft protects tone and wellbeing. I communicate more, with less stress.",
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
  "suite.screens.caption":
    "A quick peek at planning, writing, and grading flows.",

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
  "videos.curated": "Curated Playlists",

  // Webinars (EN)
  "webinars.hero.title": "Professional Development Webinars",
  "webinars.hero.subtitle":
    "Join live sessions or watch on-demand. Earn professional development certificates and learn from experts.",
  "webinars.search.placeholder": "Search webinars...",
  "webinars.categories.all": "All Webinars",
  "webinars.sections.upcoming": "Upcoming Live Webinars",
  "webinars.sections.ondemand": "On-Demand Library",
  "webinars.labels.popular": "Popular",
  "webinars.labels.views": "views",
  "webinars.buttons.registerNow": "Register Now",
  "webinars.buttons.waitlistFull": "Waitlist Full",
  "webinars.empty": "No webinars found matching your search.",
  "webinars.cta.body":
    "Join thousands of teachers transforming their practice with AI. Register for your first webinar today.",
  "webinars.cta.browseUpcoming": "Browse Upcoming Webinars",

  // Community (EN)
  "community.hero.badge": "25,000+ Active Teachers",
  "community.hero.titlePrefix": "Join the",
  "community.hero.titleHighlight": "Teacher Community",
  "community.hero.subtitle":
    "Connect with educators worldwide. Share strategies, ask questions, and learn from teachers successfully using AI in their classrooms.",
  "community.search.placeholder": "Search discussions...",
  "community.stats.members": "Members",
  "community.stats.discussions": "Discussions",
  "community.stats.posts": "Posts",
  "community.stats.active": "Active",
  // Categories
  "community.categories.getting-started.name": "Getting Started with AI",
  "community.categories.getting-started.desc":
    "New to AI? Start here for beginner-friendly discussions and tips.",
  "community.categories.prompt-engineering.name": "Prompt Engineering",
  "community.categories.prompt-engineering.desc":
    "Share and discuss effective prompts for different teaching scenarios.",
  "community.categories.lesson-planning.name": "Lesson Planning",
  "community.categories.lesson-planning.desc":
    "Collaborate on AI-assisted lesson plans and unit designs.",
  "community.categories.parent-communication.name": "Parent Communication",
  "community.categories.parent-communication.desc":
    "Tips for using AI to improve parent-teacher communication.",
  "community.categories.assessment-feedback.name": "Assessment & Feedback",
  "community.categories.assessment-feedback.desc":
    "Discuss AI tools for grading, feedback, and formative assessment.",
  "community.categories.differentiation.name": "Differentiation & IEPs",
  "community.categories.differentiation.desc":
    "Using AI to support diverse learners and create accommodations.",
  "community.categories.ethics-policy.name": "Ethics & Policy",
  "community.categories.ethics-policy.desc":
    "Discuss ethical considerations, policies, and best practices.",
  "community.categories.tool-reviews.name": "Tool Reviews & Comparisons",
  "community.categories.tool-reviews.desc":
    "Share experiences with different AI tools and platforms.",
  "community.categories.success-stories.name": "Success Stories",
  "community.categories.success-stories.desc":
    "Celebrate wins and share what's working in your classroom.",
  "community.categories.troubleshooting.name": "Troubleshooting",
  "community.categories.troubleshooting.desc":
    "Get help when things don't work as expected.",
  "community.categories.subject-specific.name": "Subject-Specific",
  "community.categories.subject-specific.desc":
    "Discussions organized by subject area (Math, ELA, Science, etc.).",
  "community.categories.off-topic.name": "Off-Topic Lounge",
  "community.categories.off-topic.desc":
    "Connect with fellow educators on non-AI topics.",
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
  "community.related.desc":
    "Enhance your community experience with these learning resources",
  "community.related.aiLiteracy.title": "AI Literacy Courses",
  "community.related.aiLiteracy.desc":
    "Learn the fundamentals discussed in the community",
  "community.related.webinars.title": "Expert Webinars",
  "community.related.webinars.desc":
    "Live sessions on trending community topics",
  "community.related.glossary.title": "AI Glossary",
  "community.related.glossary.desc":
    "Understand the terminology used in discussions",
  // CTA
  "community.cta.titlePrefix": "Ready to",
  "community.cta.titleHighlight": "Join the Conversation?",
  "community.cta.body":
    "Create your free account and start connecting with thousands of teachers using AI in their classrooms.",
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
  "solution.heading":
    "The first AI suite built specifically for teacher communications",
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
  "stats.subtitle":
    "Trusted by 500+ teachers using Zaza Draft to save 10+ hours every week.",

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
  "howItWorks.diagram.step3.example":
    "I wanted to reach out regarding Sam's recent focus challenges...",
  "howItWorks.steps.step1.number": "1",
  "howItWorks.steps.step1.title": "Paste your draft or describe what you need",
  "howItWorks.steps.step1.description":
    "Start with rough notes, bullet points, or a full draft",
  "howItWorks.steps.step2.number": "2",
  "howItWorks.steps.step2.title": "Choose your tone and watch Draft refine it",
  "howItWorks.steps.step2.description":
    "Supportive, formal, concise, or neutral - always editable",
  "howItWorks.steps.step3.number": "3",
  "howItWorks.steps.step3.title": "Export & share",
  "howItWorks.steps.step3.description":
    "Copy, download, or share to your school tools with one click",

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
  "demo.testimonial.quote":
    "I got my Sunday back. Draft turns hours into minutes.",
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
  "useCases.cards.parentMessages.description":
    "Rewrite sensitive emails with the right tone",
  "useCases.cards.parentMessages.examples":
    "Behavior concerns, progress updates, attendance issues",
  "useCases.cards.reportCards.title": "Report Cards",
  "useCases.cards.reportCards.description":
    "Transform bullet points into meaningful narratives",
  "useCases.cards.reportCards.examples":
    "Term reports, progress summaries, intervention plans",
  "useCases.cards.gradingComments.title": "Grading Comments",
  "useCases.cards.gradingComments.description":
    "Generate constructive feedback faster",
  "useCases.cards.gradingComments.examples":
    "Criterion-based comments, rubric feedback",
  "useCases.cards.schoolCommunications.title": "School Communications",
  "useCases.cards.schoolCommunications.description":
    "Draft newsletters and announcements professionally",
  "useCases.cards.schoolCommunications.examples":
    "Updates, event notices, policy communications",
  "useCases.cards.referenceLetters.title": "Reference Letters",
  "useCases.cards.referenceLetters.description":
    "Write compelling recommendations confidently",
  "useCases.cards.referenceLetters.examples":
    "College references, job recommendations",
  "useCases.cards.documentation.title": "Documentation",
  "useCases.cards.documentation.description":
    "Create clear records and meeting notes",
  "useCases.cards.documentation.examples":
    "IEP documentation, parent conferences",

  // Comparison Section
  "comparison.heading": "Why Teachers Trust Zaza Over Generic AI",
  "comparison.subheading":
    "Built specifically for education, not adapted from business tools",
  "comparison.tableHeaders.feature": "Feature",
  "comparison.tableHeaders.genericAI": "Generic AI Tools (ChatGPT, etc.)",
  "comparison.tableHeaders.zazaDraft": "Zaza Draft",
  "comparison.rows.training.feature": "Training",
  "comparison.rows.training.generic": "General knowledge, business-focused",
  "comparison.rows.training.zaza":
    "Trained on real teacher communications & pedagogy",
  "comparison.rows.safety.feature": "Safety",
  "comparison.rows.safety.generic": "May invent student details or scenarios",
  "comparison.rows.safety.zaza":
    "Hallucination-safe - never fabricates information",
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
  "whyChoose.benefits.beatWritersBlock.description":
    "Start with AI, finish with your authentic voice",
  "whyChoose.benefits.writeWithConfidence.title": "Write with confidence",
  "whyChoose.benefits.writeWithConfidence.description":
    "Professional quality across all communications",
  "whyChoose.benefits.saveTime.title": "Save hours every week",
  "whyChoose.benefits.saveTime.description": "2-hour tasks done in 5 minutes",
  "whyChoose.benefits.breakBarriers.title": "Break language barriers",
  "whyChoose.benefits.breakBarriers.description":
    "Translate to 20+ languages instantly",

  // Testimonials Section
  "testimonials.heading": "What teachers say",
  "testimonials.quote1.text":
    "I got my Sunday back. Draft turns hours into minutes.",
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
  "finalCTA.subheading":
    "Join 500+ teachers using Zaza Draft to save 10+ hours every week.",
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

  "products.teach.turn.pain1":
    "Spending hours every week creating lesson plans from scratch",
  "products.teach.turn.pain2":
    "Struggling to differentiate for diverse learners",
  "products.teach.turn.pain3":
    "Losing time to administrative tasks instead of teaching",

  "products.teach.features.title": "Everything You Need to Plan Great Lessons",
  "products.teach.features.autoplanner.title": "Auto-Planner",
  "products.teach.features.autoplanner.desc":
    "Generate complete lesson plans aligned to your curriculum standards in minutes",
  "products.teach.features.curriculum.title": "Curriculum-Aligned",
  "products.teach.features.curriculum.desc":
    "Built-in support for Common Core, state standards, and international curricula",
  "products.teach.features.gamified.title": "Gamified Activities",
  "products.teach.features.gamified.desc":
    "Create engaging, interactive activities that keep students motivated",

  "products.teach.howItWorks.title": "How It Works",
  "products.teach.howItWorks.step1.title": "Set Your Goals",
  "products.teach.howItWorks.step1.desc":
    "Tell us your subject, grade level, and learning objectives",
  "products.teach.howItWorks.step2.title": "AI Generates Plan",
  "products.teach.howItWorks.step2.desc":
    "Get a complete, standards-aligned lesson plan in seconds",
  "products.teach.howItWorks.step3.title": "Customize & Teach",
  "products.teach.howItWorks.step3.desc":
    "Edit, save, and share your lessons with your team",

  "products.teach.whoItsFor.title": "Perfect For",
  "products.teach.whoItsFor.item1":
    "Teachers who want to save time on lesson planning",
  "products.teach.whoItsFor.item2":
    "Educators looking to differentiate instruction more effectively",
  "products.teach.whoItsFor.item3":
    "Schools seeking consistent, standards-aligned curriculum",

  "products.teach.change.title": "Transform Your Planning Process",
  "products.teach.change.step1": "Reduce planning time from hours to minutes",
  "products.teach.change.step2": "Create more engaging, differentiated lessons",
  "products.teach.change.step3": "Ensure alignment with curriculum standards",
  "products.teach.change.step4":
    "Share and collaborate with your teaching team",

  "products.teach.social.title": "What Teachers Say",
  "products.teach.social.quote1":
    "Teach has cut my planning time in half. I can focus on what matters - my students.",
  "products.teach.social.author1": "Emma Thompson, 4th Grade Teacher",
  "products.teach.social.quote2":
    "The curriculum alignment feature is a game-changer for our department.",
  "products.teach.social.author2": "Michael Chen, Department Head",

  "products.teach.cta.title": "Ready to Transform Your Planning?",
  "products.teach.cta.subtitle":
    "Join hundreds of teachers saving 10+ hours per week",
  "products.teach.cta.primary": "Start Free Trial",
  "products.teach.cta.secondary": "Schedule Demo",

  // Products - Draft
  "products.draft.hero.eyebrow": "AI WRITING ASSISTANT FOR TEACHERS",
  "products.draft.hero.title": "Write Better, Faster",
  "products.draft.hero.subtitle":
    "Transform rough notes into polished parent emails, report cards, and feedback in minutes. Maintain your voice while saving hours every week.",
  "products.draft.hero.cta.primary": "Start Writing Free",
  "products.draft.hero.cta.secondary": "See Examples",

  "products.draft.turn.pain1":
    "Spending 2-3 hours per week writing parent emails",
  "products.draft.turn.pain2":
    "Struggling to find the right tone for sensitive communications",
  "products.draft.turn.pain3":
    "Writing the same feedback comments over and over",

  "products.draft.features.title": "Built for Teacher Communications",
  "products.draft.features.toneGuardrails.title": "Tone Guardrails",
  "products.draft.features.toneGuardrails.desc":
    "Choose from supportive, formal, concise, or neutral tones - always professional",
  "products.draft.features.translationChecks.title": "Translation Checks",
  "products.draft.features.translationChecks.desc":
    "Communicate with families in 20+ languages with confidence",
  "products.draft.features.reviewSteps.title": "Review Steps",
  "products.draft.features.reviewSteps.desc":
    "Built-in review process ensures accuracy before sending",

  "products.draft.howItWorks.title": "How It Works",
  "products.draft.howItWorks.step1.title": "Paste Your Notes",
  "products.draft.howItWorks.step1.desc":
    "Start with bullet points or a rough draft",
  "products.draft.howItWorks.step2.title": "Choose Your Tone",
  "products.draft.howItWorks.step2.desc":
    "Select the right voice for your message",
  "products.draft.howItWorks.step3.title": "Review & Send",
  "products.draft.howItWorks.step3.desc": "Edit if needed, then copy or export",

  "products.draft.whoItsFor.title": "Perfect For",
  "products.draft.whoItsFor.item1": "Teachers writing parent communications",
  "products.draft.whoItsFor.item2": "Educators creating report card comments",
  "products.draft.whoItsFor.item3":
    "Schools needing consistent, professional messaging",

  "products.draft.change.title": "What Changes With Draft",
  "products.draft.change.step1": "2-hour tasks done in 5 minutes",
  "products.draft.change.step2":
    "Consistent, professional tone across all communications",
  "products.draft.change.step3": "Confidence in sensitive conversations",
  "products.draft.change.step4": "More time for teaching, less time writing",

  "products.draft.techNote.title": "Hallucination-Safe:",
  "products.draft.techNote.body":
    "Unlike generic AI, Draft never invents student information or fabricates details. Every output is grounded in what you provide.",

  "products.draft.social.title": "What Teachers Say",
  "products.draft.social.quote1":
    "I got my Sunday back. Draft turns hours into minutes.",
  "products.draft.social.author1": "Sarah Mitchell, Year 5 Teacher",
  "products.draft.social.quote2":
    "The tone options help me communicate with confidence, even in difficult situations.",
  "products.draft.social.author2": "James Rodriguez, Middle School Teacher",

  "products.draft.cta.title": "Get Your Time Back",
  "products.draft.cta.subtitle":
    "Join 500+ teachers saving 10+ hours every week",
  "products.draft.cta.primary": "Start Free Trial",
  "products.draft.cta.secondary": "See Examples",

  // Products - GradeFlow
  "products.gradeflow.hero.title": "Grade Faster, Grade Fairer",
  "products.gradeflow.hero.subtitle":
    "AI-powered grading assistant that helps you provide consistent, constructive feedback in half the time.",
  "products.gradeflow.hero.cta": "Start Grading Free",

  "products.gradeflow.turn.pain1":
    "Spending 4-6 hours per week grading assignments",
  "products.gradeflow.turn.pain2":
    "Inconsistent feedback across similar student work",
  "products.gradeflow.turn.pain3":
    "Difficulty providing detailed, constructive comments",

  "products.gradeflow.change.title": "Transform Your Grading Process",
  "products.gradeflow.change.step1": "Upload assignment and rubric",
  "products.gradeflow.change.step2":
    "AI analyzes student work against criteria",
  "products.gradeflow.change.step3":
    "Review and adjust suggested grades and feedback",
  "products.gradeflow.change.step4": "Export to your gradebook with one click",

  "products.gradeflow.features.title": "Grading Made Simple",
  "products.gradeflow.features.faster.title": "3x Faster Grading",
  "products.gradeflow.features.faster.desc":
    "Reduce grading time from hours to minutes while maintaining quality",
  "products.gradeflow.features.fair.title": "Consistent Feedback",
  "products.gradeflow.features.fair.desc":
    "Ensure fair, standards-aligned grading across all students",
  "products.gradeflow.features.audit.title": "Audit Trail",
  "products.gradeflow.features.audit.desc":
    "Track all grading decisions with complete transparency",

  "products.gradeflow.social.title": "What Teachers Say",
  "products.gradeflow.social.quote1":
    "GradeFlow cut my grading time in half without sacrificing quality.",
  "products.gradeflow.social.author1": "Lisa Park, High School English",
  "products.gradeflow.social.quote2":
    "My feedback is more consistent and helpful now.",
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
  "shield.problem.card1.description":
    "Teachers using consumer AI tools may inadvertently expose student data",
  "shield.problem.card2.title": "Compliance Concerns",
  "shield.problem.card2.description":
    "Schools struggle to ensure AI use meets FERPA, GDPR, and local regulations",
  "shield.problem.card3.title": "Lack of Oversight",
  "shield.problem.card3.description":
    "No visibility into how AI is being used across classrooms and departments",

  "shield.solution.title": "Complete AI Governance in One Platform",
  "shield.solution.subtitle":
    "Monitor, control, and audit all AI use across your school",
  "shield.solution.card1.title": "Centralized Control",
  "shield.solution.card1.description":
    "Set school-wide policies for AI use with granular permissions",
  "shield.solution.card2.title": "Audit Trail",
  "shield.solution.card2.description":
    "Complete visibility into all AI interactions and data flows",
  "shield.solution.card3.title": "Data Protection",
  "shield.solution.card3.description":
    "Automatic PII detection and redaction before AI processing",
  "shield.solution.card4.title": "Policy Enforcement",
  "shield.solution.card4.description":
    "Automated compliance checks against your school's policies",
  "shield.solution.cta": "Explore All Features",

  "shield.howItWorks.title": "How Shield Works",
  "shield.howItWorks.step1.title": "Connect Your Tools",
  "shield.howItWorks.step1.description":
    "Integrate Shield with your existing AI tools and platforms",
  "shield.howItWorks.step2.title": "Set Policies",
  "shield.howItWorks.step2.description":
    "Define rules for AI use, data handling, and compliance",
  "shield.howItWorks.step3.title": "Monitor & Audit",
  "shield.howItWorks.step3.description":
    "Track usage, review logs, and ensure compliance",
  "shield.howItWorks.cta": "Get Started",

  "shield.socialProof.title": "Trusted by Schools Worldwide",
  "shield.socialProof.quote":
    "Shield gives us the confidence to embrace AI while protecting our students' privacy. It's essential infrastructure for modern schools.",
  "shield.socialProof.attribution": "Dr. Jennifer Martinez",
  "shield.socialProof.role":
    "Director of Technology, Springfield School District",

  "shield.useCases.title": "Built for Education",
  "shield.useCases.card1.title": "Teacher AI Tools",
  "shield.useCases.card1.description":
    "Govern AI writing assistants, lesson planners, and grading tools",
  "shield.useCases.card2.title": "Student AI Use",
  "shield.useCases.card2.description":
    "Monitor and guide appropriate AI use in student work",
  "shield.useCases.card3.title": "Administrative AI",
  "shield.useCases.card3.description":
    "Secure AI use for scheduling, communications, and operations",

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
  "shield.pricing.description":
    "Custom pricing based on your school size and needs. Contact us for a quote.",
  "shield.pricing.cta": "Get Pricing",

  "shield.finalCta.title": "Ready to Secure Your School's AI?",
  "shield.finalCta.subtitle":
    "Join forward-thinking schools using Shield to embrace AI safely",
  "shield.finalCta.primary": "Schedule Demo",
  "shield.finalCta.secondary": "Contact Sales",
  "shield.finalCta.note": "Enterprise support and onboarding included",

  // FAQ Page
  "faq.hero.eyebrow": "FREQUENTLY ASKED QUESTIONS",
  "faq.hero.title": "How can we help you?",
  "faq.hero.subtitle":
    "Find answers to common questions about Zaza Draft and our AI tools for teachers.",

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

  "faq.languages.q3":
    "Can Draft help me communicate with multilingual families?",
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
  "faq.cta.subtitle":
    "Our support team is here to help. Reach out and we'll get back to you within 24 hours.",
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
  "about.overview.cta.body":
    "Get in touch with our team to discuss how Zaza can help your school or district.",
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
  "founder.hero.headline":
    "Meet the Founder Building AI That Helps Teachers Thrive",
  "founder.hero.subheading":
    "I've spent over twenty years working in learning and professional education-across classrooms, universities, and corporate training. One thing has always been true: teaching is human work.",
  "founder.hero.label": "FOUNDER & CEO",
  "founder.hero.name": "Dr. Greg Blackburn",
  "founder.hero.tagline": "Founder & CEO, Learning Scientist, Teacher Advocate",

  // Founder Journey Section
  "founder.journey.title": "My Journey in Education",
  "founder.journey.p1":
    "Throughout my PhD research in professional education, I focused on how learners develop critical thinking and problem solving in real-world environments. I have seen how technology can support learning when it is used well. I have also seen how easily it can add stress, waste time, or work against what educators are trying to achieve.",
  "founder.journey.p2":
    "As Chief Learning Officer at Communardo, I lead work in AI-powered learning design, digital content development, LMS innovation, and teacher training. I've written and spoken widely on learning science, eLearning strategy, and the role of AI in education.",
  "founder.journey.p3":
    "But here's the truth: Most edtech tools aren't built for teachers. They're built for sales meetings.",
  "founder.journey.p4":
    "I've watched technology sold as 'revolutionary' only to become another system teachers must manage. I've seen AI products that generate content that looks impressive at first glance-but collapses the moment a teacher tries to use it with real students.",
  "founder.journey.p5": "That's why I built Zaza.",

  // Founder Principle Section
  "founder.principle.title": "The Principle Behind Everything We Build",
  "founder.principle.question": "Does this give teachers back meaningful time?",
  "founder.principle.not1": "Not 'Is this clever?'",
  "founder.principle.not2": "Not 'Will this demo well?'",
  "founder.principle.not3": "Not 'Does this look good on a roadmap?'",
  "founder.principle.answer": "Time.",
  "founder.principle.rule":
    "If a tool can't reduce workload in a real school environment, it doesn't belong in Zaza.",

  // Founder Commitments Section
  "founder.commitments.title": "My Commitments to Teachers",
  "founder.commitments.item1.title": "No hallucinations.",
  "founder.commitments.item1.body":
    "If AI output can't be trusted, teachers end up doing more work reviewing and correcting it. So we design for accuracy, clarity, and classroom reality.",
  "founder.commitments.item2.title": "Reduce workload, don't shift it.",
  "founder.commitments.item2.body":
    "A tool that requires training, manuals, and complex workflows isn't support. It's rebranded labour.",
  "founder.commitments.item3.title": "Respect professional expertise.",
  "founder.commitments.item3.body":
    "You don't need technology to replace your judgment. You need technology that amplifies it.",
  "founder.commitments.closing":
    "Teaching is incredibly complex, intellectually demanding work. It's also emotionally heavy work. Good tools should lighten that burden.",

  // Founder Why Zaza Section
  "founder.whyZaza.title": "Why Zaza Exists",
  "founder.whyZaza.p1":
    "Zaza isn't trying to 'disrupt education.' Teachers don't need disruption. They need support. They need time. They need tools that recognize the value of their experience-rather than trying to standardize or replace it.",
  "founder.whyZaza.p2":
    "The work teachers do matters. And the best thing technology can do is help protect the time, energy, and care required to do that work well.",
  "founder.whyZaza.p3":
    "If that's the kind of future for education you believe in, you're in the right place.",

  // Founder Closing
  "founder.closing.name": "Greg",
  "founder.closing.title": "Dr. Greg Blackburn",
  "founder.closing.role": "Founder & CEO, Zaza Technologies",
  "founder.personal.cta": "Get in Touch",
  "founder.personal.title": "A Personal Note",
  "founder.personal.message1":
    "If you're reading this, you're probably a teacher who's curious about AI but skeptical about whether it can really help. I get it. I was skeptical too. Most AI tools feel like they were built by people who've never set foot in a classroom.",
  "founder.personal.message2":
    "That's why I built Zaza differently. Every feature is designed with real teachers, tested in real classrooms, and refined based on real feedback. We don't just build software - we build partnerships with educators who help us create tools that actually work.",
  "founder.personal.message3":
    "I'd love to hear from you. Whether you have questions, feedback, or just want to chat about education and technology, my door is always open. Let's build the future of teacher technology together.",
  "founder.personal.name": "",
  "founder.personal.title2": "Dr. Greg Blackburn",
  "founder.personal.company": "Zaza Technologies",

  // Additional Founder Keys (for page compatibility)
  "founder.journey.quote":
    "I built Zaza because I was tired of watching teachers drown in administrative work when technology should be setting them free.",
  "founder.mission.quote":
    "Every teacher deserves tools that respect their expertise, protect their students, and give them time to do what they do best: teach.",
  "founder.mission.attribution": "Dr. Greg Blackburn, Founder & CEO",
  "founder.whyZaza.subtitle": "Three principles that guide everything we do",
  "founder.whyZaza.card1.title": "For Teachers, With Teachers",
  "founder.whyZaza.card1.body":
    "I have spent my career working alongside teachers and learning designers - refining tools directly with educators who understand the reality of classrooms. Every feature in Zaza is shaped through real feedback and real practice, not theory.",
  "founder.whyZaza.card2.title": "Boutique, Not Big Tech",
  "founder.whyZaza.card2.body":
    "We're not a massive corporation trying to sell to everyone. We're a focused team building specialized tools for one audience: teachers. Your needs come first, always.",
  "founder.whyZaza.card3.title": "Building a Legacy",
  "founder.whyZaza.card3.body":
    "This isn't about quick profits. It's about building something that genuinely helps teachers thrive and transforms education for the better. That's the legacy I want to leave.",
  // Contact Page
  "contact.title": "Get in Touch",
  "contact.subtitle":
    "Have questions? Want to learn more? We'd love to hear from you.",
  "contact.form.name": "Your Name",
  "contact.form.email": "Your Email",
  "contact.form.message": "Your Message",
  "contact.form.placeholder": "Tell us how we can help...",
  "contact.form.submit": "Send Message",
  // Company page
  "company.hero.label": "OUR COMPANY",
  "company.hero.headline": "Zaza Technologies",
  "company.hero.subheading":
    "We are a small, specialised team of learning designers, engineers, and educational researchers building technology that helps teachers thrive.",
  "company.origin.p1":
    "Zaza Technologies was founded in 2025 with a clear belief: education deserves AI tools built with real pedagogical understanding, not repurposed corporate AI models. We build technology that protects teacher wellbeing.",
  "company.origin.p2": "So we chose a different approach.",
  "company.origin.p3":
    "We design tools that are trained on real pedagogy, developed with educators, and refined through classroom use. Tools that understand the nuance of teacher judgement, the emotional weight of parent interaction, and the importance of constructive feedback. Tools that are accurate, reliable, and safe for educational settings.",
  "company.origin.aiDifferentiator":
    "Our models are trained on real teacher feedback and classroom language patterns, refined through iterative testing with educators, and designed to produce output that sounds like a teacher - not a machine.",
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
  "company.boutique.impact": "Scale is not the goal. Impact is.",
  "company.today.title": "Where We Are Today",
  "company.today.p1":
    "Zaza now supports over 500 teachers in more than 15 countries. On average, teachers save over 10 hours per week on writing and communication tasks by using Zaza's tools. And we are just getting started.",
  "company.today.p2":
    "Our long-term vision is to build a complete suite of AI tools that help teachers reclaim their time, protect their wellbeing, and stay connected to the heart of their work - their students.",
  "company.today.close": "Because when teachers thrive, students thrive.",
  "company.stats.teachers.number": "150k+",
  "company.stats.teachers.label": "Teachers using Zaza",
  "company.stats.countries.number": "15",
  "company.stats.countries.label": "Countries",
  "company.stats.hours.number": "10+",
  "company.stats.hours.label": "Hours saved weekly",
  "contact.form.dataNote":
    "We respect your privacy. Your information is never shared.",
  "contact.direct.title": "Direct Contact",
  "contact.direct.email": "Email Us",
  "contact.direct.response": "We typically respond within 24 hours",
  "contact.help.title": "Need Help?",
  "contact.help.description": "Check out our helpful resources",
  "contact.help.faq": "â†’ Frequently Asked Questions",
  "contact.help.support": "â†’ Support Center",
  "glossary.title": "AI Glossary for Teachers",
  "glossary.subtitle":
    "150+ AI terms explained in teacher-friendly language. Search by category or alphabetically to understand AI concepts for education.",
  "integrations.title": "Connect Your Favorite Tools",
  "integrations.subtitle":
    "Seamlessly integrate Zaza Draft with your existing stack.",
  "aiLiteracy.title": "Master AI for Education",
  "aiLiteracy.subtitle":
    "Build your AI expertise with comprehensive courses that help you integrate AI into your classroom.",

  "aiLiteracy.courses": "Courses",
  "aiLiteracy.educators": "Educators",
  "aiLiteracy.certified": "Certified",
  "aiLiteracy.hoursSaved": "Hours Saved",
  "aiLiteracy.pathsTitle": "Choose Your Learning Path",
  "aiLiteracy.pathsSubtitle":
    "Structured learning paths designed for teachers at every stage of their AI journey",
  "aiLiteracy.beginnerTitle": "Beginner Path",
  "aiLiteracy.beginnerDesc": "Perfect for teachers new to AI",
  "aiLiteracy.intermediateTitle": "Intermediate Path",
  "aiLiteracy.intermediateDesc": "For teachers with basic AI knowledge",
  "aiLiteracy.advancedTitle": "Advanced Path",
  "aiLiteracy.advancedDesc": "Deep dive into advanced AI concepts",
  "aiLiteracy.coursesTitle": "All Courses",
  "aiLiteracy.coursesSubtitle":
    "From foundational understanding to mastery-structured learning paths for every type of teacher",
  "aiLiteracy.certificationTitle": "AI Education Certification",
  "aiLiteracy.certificationSubtitle":
    "Earn recognized credentials that demonstrate your AI literacy and teaching expertise",
  "aiLiteracy.benefit1": "Demonstrate your expertise to administrators",
  "aiLiteracy.benefit2": "Stand out in job applications and promotions",
  "aiLiteracy.benefit3":
    "Connect with 13,000+ certified AI educators worldwide",
  "aiLiteracy.libraryTitle": "Downloadable Resource Library",
  "aiLiteracy.librarySubtitle":
    "Ready-to-use templates, checklists, and guides to accelerate your AI adoption",
  "aiLiteracy.testimonialsTitle": "What Teachers Are Saying",
  "aiLiteracy.testimonialsSubtitle":
    "Real feedback from educators who've completed our AI literacy courses",
  "aiLiteracy.ctaTitle": "Start Your AI Journey",
  "aiLiteracy.ctaSubtitle":
    "Begin your certification journey today. All courses and assessments are completely free",
  "aiLiteracy.ctaButton": "Start Free Course",
  "aiLiteracy.ctaSecondary": "Take Guided Tour",
  "aiLiteracy.courses": "Courses",
  "aiLiteracy.educators": "Educators",
  "aiLiteracy.certified": "Certified",
  "aiLiteracy.hoursSaved": "Hours Saved",
  "aiLiteracy.pathsTitle": "Choose Your Learning Path",
  "aiLiteracy.pathsSubtitle":
    "Structured learning paths designed for teachers at every stage of their AI journey",
  "aiLiteracy.beginnerTitle": "Beginner Path",
  "aiLiteracy.beginnerDesc": "Perfect for teachers new to AI",
  "aiLiteracy.intermediateTitle": "Intermediate Path",
  "aiLiteracy.intermediateDesc": "For teachers with basic AI knowledge",
  "aiLiteracy.advancedTitle": "Advanced Path",
  "aiLiteracy.advancedDesc": "Deep dive into advanced AI concepts",
  "aiLiteracy.coursesTitle": "All Courses",
  "aiLiteracy.coursesSubtitle":
    "From foundational understanding to mastery-structured learning paths for every type of teacher",
  "aiLiteracy.certificationTitle": "AI Education Certification",
  "aiLiteracy.certificationSubtitle":
    "Earn recognized credentials that demonstrate your AI literacy and teaching expertise",
  "aiLiteracy.benefit1": "Demonstrate your expertise to administrators",
  "aiLiteracy.benefit2": "Stand out in job applications and promotions",
  "aiLiteracy.benefit3":
    "Connect with 13,000+ certified AI educators worldwide",
  "aiLiteracy.libraryTitle": "Downloadable Resource Library",
  "aiLiteracy.librarySubtitle":
    "Ready-to-use templates, checklists, and guides to accelerate your AI adoption",
  "aiLiteracy.testimonialsTitle": "What Teachers Are Saying",
  "aiLiteracy.testimonialsSubtitle":
    "Real feedback from educators who've completed our AI literacy courses",
  "aiLiteracy.ctaTitle": "Start Your AI Journey",
  "aiLiteracy.ctaSubtitle":
    "Begin your certification journey today. All courses and assessments are completely free",
  "aiLiteracy.ctaButton": "Start Free Course",
  "aiLiteracy.ctaSecondary": "Take Guided Tour",
  "bestAiWriting.title": "10 Best AI Writing Tools for Teachers in 2025",
  "bestAiWriting.subtitle":
    "Compare top AI tools for teacher writing, from parent communication to lesson planning.",
  "reduceStress.title":
    "How to Reduce Stress from Parent Messages (Without Ignoring Them)",
  "reduceStress.subtitle":
    "Professional strategies for managing parent communication while protecting your wellbeing.",
  "bestAiTool.title": "Best AI Tool for Writing Parent Emails Professionally",
  "bestAiTool.subtitle":
    "Discover why teachers choose Zaza Draft for professional parent communication.",
  "aiStudentReports.title":
    "AI for Student Reports & Report Cards: Complete Teacher Guide",
  "aiStudentReports.subtitle":
    "Save hours on report cards while maintaining personalization and quality.",
  "successStories.title":
    "See how teachers and schools transform communication with Zaza Draft",
  "successStories.subtitle":
    "Real results from educators who use AI-powered writing tools.",
  "roiCalculator.title": "Calculate Your Time Savings with Zaza Draft",
  "roiCalculator.subtitle":
    "See exactly how many hours per week you could save on parent communication.",
};

const translationsDe: Record<string, string> = {
  "pricing.hero.preheadline": "TRANSPARENTE PREISE",
  "pricing.hero.headline":
    "Preise, die die Zeit und das Wohlbefinden von LehrkrÃ¤ften respektieren",
  "pricing.hero.subheadline":
    "Sparen Sie jede Woche Stunden, reduzieren Sie Stress nach Feierabend und schreiben Sie mit Zuversicht - mit Preisen, die einfach und fair sind.",
  "pricing.trust.teachers": "Vertraut von fÃ¼rsorglichen LehrkrÃ¤ften",
  "pricing.trust.ferpa": "FERPA-orientiert",
  "pricing.trust.cancel": "Jederzeit kÃ¼ndbar",

  // Identity Strip
  "pricing.identity.title": "Dies ist fÃ¼r LehrkrÃ¤fte, die...",
  "pricing.identity.point1":
    "weniger Zeit mit Schreiben und mehr Zeit mit Unterrichten verbringen mÃ¶chten",
  "pricing.identity.point2":
    "vertrauenswÃ¼rdige SprachunterstÃ¼tzung benÃ¶tigen, ohne ihre Stimme zu verlieren",
  "pricing.identity.point3":
    "sich um Grenzen, Zuversicht und Ruhe in ihrer Woche kÃ¼mmern",

  // Currency & Billing Toggle
  "pricing.toggle.monthly": "Monatlich",
  "pricing.toggle.annual": "JÃ¤hrlich",
  "pricing.toggle.save": "2 Monate sparen",

  // Outcome Proof
  "pricing.outcome.text":
    "Die meisten LehrkrÃ¤fte verbringen 3-5 Stunden pro Woche mit Nachrichten und Kommentaren. Draft reduziert dies um 50-70 %, wÃ¤hrend Ihr Ton und Ihre Absicht erhalten bleiben.",

  // Free Plan
  "pricing.free.badge": "KOSTENLOS",
  "pricing.free.title": "Starter",
  "pricing.free.description":
    "Alles, was Sie brauchen, um Draft auszuprobieren und Ihre ersten Stunden zu sparen.",
  "pricing.free.cta": "Kostenlos starten",
  "pricing.free.feature1": "5 EntwÃ¼rfe pro Monat",
  "pricing.free.feature2": "Basisvorlagen",
  "pricing.free.feature3": "Speichern & Kopieren",
  "pricing.free.feature4": "Community-Support",

  // Teacher (Premium) Plan
  "pricing.teacher.badge": "AM BELIEBTESTEN",
  "pricing.teacher.title": "Teacher",
  "pricing.teacher.description":
    "Unbegrenztes, halluzinationssicheres Schreiben ohne Lock-ins.",
  "pricing.teacher.period": "Jederzeit kÃ¼ndbar",
  "pricing.teacher.savingsAnnual": "2 Monate kostenlos sparen",
  "pricing.teacher.cta": "7-Tage-Testversion starten",
  "pricing.teacher.trial": "Keine Kreditkarte erforderlich",
  "pricing.teacher.guarantee": "30-Tage-Geld-zurÃ¼ck-Garantie",
  "pricing.teacher.feature1": "Unbegrenzte EntwÃ¼rfe & Ãœberarbeitungen",
  "pricing.teacher.feature2": "Ton-Tutor, Ãœbersetzungen, Kontext-GedÃ¤chtnis",
  "pricing.teacher.feature3": "Eigene Vorlagen & Kommentarbanken",
  "pricing.teacher.feature4": "Gespeicherter Verlauf & Export",
  "pricing.teacher.feature5": "Zaras sanfte Wohlbefinden-Hinweise",
  "pricing.teacher.feature6": "Priorisierter E-Mail-Support",
  "pricing.teacher.timeSaved": "Typischerweise gespart: 4-7 Stunden pro Woche",

  // Department Plan
  "pricing.department.badge": "TEAMS",
  "pricing.department.title": "Department",
  "pricing.department.description":
    "Kollaboratives Schreiben mit gemeinsamer QualitÃ¤t und Konsistenz.",
  "pricing.department.perTeacher": "/Lehrkraft",
  "pricing.department.billing": "JÃ¤hrliche Abrechnung  â€¢ 5-50 PlÃ¤tze",
  "pricing.department.cta": "Mit Vertrieb sprechen",
  "pricing.department.includes": "Alles in Teacher, plus:",
  "pricing.department.feature1": "Team-Bibliotheken, gemeinsame Vorlagen",
  "pricing.department.feature2": "Rollenbasierter Zugriff",
  "pricing.department.feature3": "ÃœberprÃ¼fung & Freigabe",
  "pricing.department.feature4": "Priorisiertes Onboarding & Erfolg",

  // Schools & Districts
  "pricing.enterprise.badge": "ENTERPRISE",
  "pricing.enterprise.title": "Schulen & Bezirke",
  "pricing.enterprise.description": "Alles fÃ¼r groÃŸflÃ¤chige Bereitstellungen.",
  "pricing.enterprise.price": "Individuell",
  "pricing.enterprise.cta": "Vertrieb kontaktieren",
  "pricing.enterprise.includes": "Alles in Department, plus:",
  "pricing.enterprise.feature1": "SSO/SAML, DPA/SCCs",
  "pricing.enterprise.feature2": "SLA & dedizierter Erfolg",
  "pricing.enterprise.feature3": "Zentrale Abrechnung & Bereitstellung",

  // Bundle
  "pricing.bundle.badge": "BUNDLE & SPAREN",
  "pricing.bundle.title": "Draft + Teach",
  "pricing.bundle.description":
    "Ein Ort zum Planen, Schreiben und Kommunizieren - mit lehrerorientierten Wohlbefinden im Mittelpunkt.",
  "pricing.bundle.perMonth": "/Monat",
  "pricing.bundle.perYear": "/Jahr",
  "pricing.bundle.savings": "Sparen Sie gegenÃ¼ber dem separaten Kauf",
  "pricing.bundle.cta": "Bundle holen",

  // Testimonials
  "pricing.testimonials.title": "Was LehrkrÃ¤fte Ã¼ber Preise sagen",
  "pricing.testimonials.1.name": "Sarah L.",
  "pricing.testimonials.1.role": "Mittelschullehrerin",
  "pricing.testimonials.1.quote":
    "Draft gab mir meine Abende zurÃ¼ck. Ich verlasse jetzt die Schule pÃ¼nktlich - und Eltern sagen, meine Nachrichten fÃ¼hlen sich wÃ¤rmer an.",
  "pricing.testimonials.2.name": "Mark R.",
  "pricing.testimonials.2.role": "Abteilungsleiter",
  "pricing.testimonials.2.quote":
    "Unsere Abteilung hat Ton abgestimmt und Feedback beschleunigt. Die Benotungszeit sank um ein Drittel.",
  "pricing.testimonials.3.name": "Emma K.",
  "pricing.testimonials.3.role": "Grundschullehrerin",
  "pricing.testimonials.3.quote":
    "Die Preisgestaltung ist transparent und fair. Keine versteckten GebÃ¼hren, keine Lock-ins. Funktioniert einfach.",

  // Wellbeing Metric
  "pricing.metric.text":
    "Ãœber 90 Tage berichten LehrkrÃ¤fte von 38 % weniger Nachrichten nach Feierabend und +24 % Zuversicht in der Elternkommunikation.",

  // FAQs
  "pricing.faq.title": "Preis- und Abrechnungs-FAQs",
  "pricing.faq.q1": "Gibt es einen kostenlosen Plan?",
  "pricing.faq.a1":
    "Ja - beginnen Sie mit 5 EntwÃ¼rfen pro Monat, um den Unterschied zu spÃ¼ren. Keine Kreditkarte erforderlich.",
  "pricing.faq.q2": "Was passiert mit meiner Stimme?",
  "pricing.faq.a2":
    "Draft bewahrt Ihren Ton und Ihre Sprache; Sie haben immer die Kontrolle. Unser Ton-Tutor lernt Ihren Stil.",
  "pricing.faq.q3": "Sind meine Nachrichten privat?",
  "pricing.faq.a3":
    "Ja. Wir verwenden Ihre Inhalte nicht, um Ã¶ffentliche Modelle zu trainieren. Weitere Details finden Sie auf unserer Datenschutzseite.",
  "pricing.faq.q4": "Kann ich jederzeit kÃ¼ndigen?",
  "pricing.faq.a4":
    "Absolut - keine Lock-ins. KÃ¼ndigen Sie mit einem Klick in Ihren Kontoeinstellungen.",
  "pricing.faq.q5": "UnterstÃ¼tzen Sie Schulen?",
  "pricing.faq.a5":
    "Ja - Mengenpreise, SSO, DPA/SCCs und SLAs fÃ¼r Bezirke. Kontakt: sales@zazadraft.com",
  "pricing.faq.q6": "Bieten Sie RÃ¼ckerstattungen an?",
  "pricing.faq.a6":
    "Ja - 30-Tage-Geld-zurÃ¼ck-Garantie auf alle kostenpflichtigen PlÃ¤ne. Keine Fragen gestellt.",

  // CTA Section
  "pricing.cta.title": "Bereit, jede Woche Stunden zu sparen?",
  "pricing.cta.subtitle":
    "Heute kostenlos starten  â€¢ Keine Kreditkarte erforderlich  â€¢ Jederzeit kÃ¼ndbar",
  "pricing.cta.primary": "Kostenlose Testversion starten",
  "pricing.cta.secondary": "Mit Vertrieb sprechen",

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
  "nav.about": "Ãœber uns",
  "nav.getStarted": "Jetzt starten",

  // Suite Page Hero (DE)
  "suite.hero.title":
    "Zaza ist eine Familie sicherer, lehrerzentrierter KI-Apps, die zusammenarbeiten, um den Arbeitsaufwand zu reduzieren und die Effizienz sowie das Wohlbefinden von LehrkrÃ¤ften zu stÃ¤rken.",
  "suite.hero.subhead":
    "Jede App wird von der Zaza KnowledgeCore Plattform betrieben und bietet vertrauenswÃ¼rdige, erklÃ¤rbare KI sowie konsistente, schulbereite Schutzmechanismen.",

  // Suite - Teacher First (DE)
  "suite.teacherFirst.title": "FÃ¼r LehrkrÃ¤fte entwickelt",
  "suite.teacherFirst.body":
    "Zaza gibt Zeit zurÃ¼ck und lÃ¤sst PÃ¤dagoginnen und PÃ¤dagogen sich aufs Unterrichten konzentrieren. Alles ist mit Datenschutz, Schutzkonzepten und PÃ¤dagogik im Kern gestaltet, sodass Schulen dem Einsatz vertrauen kÃ¶nnen.",

  // Suite - Core Apps (DE)
  "suite.coreApps.title": "Die vier Kern-Apps",
  "suite.teach.body":
    "KI-gestÃ¼tzte Unterrichtsplanung, die sich an Ihren Lehrplan anpasst, Stunden Vorbereitungszeit spart und den Unterricht spannend sowie standardkonform hÃ¤lt.",
  "suite.teach.li1": "Auto-Planer: vollstÃ¤ndige Unterrichtsstruktur in Minuten",
  // Features page (DE) - How it works and CTA
  "features.how.title": "So funktioniert es",
  "features.how.subtitle":
    "Drei einfache Schritte zu besseren Elternnachrichten",
  "features.how.step1.title": "Nachricht eingeben",
  "features.how.step1.desc":
    "Tippen oder fÃ¼gen Sie Ihren Entwurf zum SchÃ¼ler ein",
  "features.how.step2.title": "Sofortiges Feedback erhalten",
  "features.how.step2.desc":
    "Draft analysiert Ton, Klarheit und Angemessenheit",
  "features.how.step3.title": "Kopieren und senden",
  "features.how.step3.desc":
    "Exportieren Sie Ihre Ã¼berarbeitete Nachricht in Sekunden",
  "features.cta.title": "Heute bessere Nachrichten schreiben",
  "features.cta.subtitle": "Testen Sie Draft kostenlos mit 5 Kommentaren",
  "features.cta.primary": "Jetzt starten",

  // Resources page (DE)
  "resources.title": "Kostenlose Ressourcen fÃ¼r LehrkrÃ¤fte",
  "resources.subtitle":
    "Zeitspartools fÃ¼r den sofortigen Einsatz. Als PDF oder DOCX herunterladen.",
  "resources.download": "Herunterladen",
  "resources.comingSoon": "DemnÃ¤chst",
  "resources.published": "VerÃ¶ffentlicht",
  "suite.teach.li2":
    "Lehrplanbewusst: Common Core + internationale RahmenplÃ¤ne",
  "suite.teach.li3": "Hilfen zur Differenzierung und kreative AktivitÃ¤tsideen",
  "suite.teach.cta": "Mehr Ã¼ber Teach erfahren",

  "suite.draft.body":
    "Kommentare und Berichte ohne Burnout - klare, wertschÃ¤tzende Kommunikation, fundiert in Forschung zum Wohlbefinden von LehrkrÃ¤ften.",
  "suite.draft.li1":
    "Vorlagen fÃ¼r Berichte und Kommentare, die Sie anpassen kÃ¶nnen",
  "suite.draft.li2":
    "TonleitfÃ¤den und Bias-PrÃ¼fungen fÃ¼r faires, unterstÃ¼tzendes Feedback",
  "suite.draft.li3":
    "StandardmÃ¤ÃŸig privat; fÃ¼r professionelle, elternreife Texte entwickelt",
  "suite.draft.cta": "Mehr Ã¼ber Draft erfahren",

  "suite.gradeflow.body":
    "Ein erklÃ¤rbarer Bewertungs-Copilot mit OCR, Rubriken und evidenzbasiertem Feedback - schneller korrigieren mit Fairness und Konsistenz.",
  "suite.gradeflow.li1":
    "Rubrik-konformes, prÃ¼ffÃ¤higes Feedback mit Nachweisen",
  "suite.gradeflow.li2": "Konsistenz Ã¼ber Klassen und Beurteilende hinweg",
  "suite.gradeflow.li3": "Exportierbare Notenlisten und Moderationshilfe",
  "suite.gradeflow.cta": "Mehr Ã¼ber GradeFlow erfahren",

  "suite.shield.body":
    "Kommunikationsmanagement, das das Wohlbefinden von LehrkrÃ¤ften schÃ¼tzt - entwirft schwierige E-Mails und hilft, gesunde Grenzen zu wahren.",
  "suite.shield.li1":
    "Entwurfs-Assistent fÃ¼r sensible Eltern- und Verwaltungsnachrichten",
  "suite.shield.li2": "Grenz-Hinweise und EskalationsleitfÃ¤den",
  "suite.shield.li3": "Professionelle, konsistente Kommunikationsmuster",
  "suite.shield.cta": "Mehr Ã¼ber Shield erfahren",

  // Suite - Platform (DE)
  "suite.platform.title": "Zaza KnowledgeCore (Plattform)",
  "suite.platform.body":
    "KnowledgeCore ist die sichere, intelligente Plattform hinter jeder Zaza-App. Sie organisiert Lehrkraft-Dokumente, erzwingt Datenschutz und Compliance und stellt erklÃ¤rbare, prÃ¼ffÃ¤hige KI in der gesamten Suite bereit. Es ist kein separates Produkt - so bleiben die Zaza-Apps konsistent, sicher und verbunden.",
  "suite.platform.li1": "Datenschutz und Schutzkonzepte von Anfang an",
  "suite.platform.li2":
    "Geteilter Kontext Ã¼ber alle Apps (kein erneutes Hochladen)",
  "suite.platform.li3": "ErklÃ¤rbare Ausgaben, Rubrik-Ausrichtung und PrÃ¼fpfade",

  // Suite - Why Schools (DE)
  "suite.why.title": "Warum Schulen Zaza wÃ¤hlen",
  "suite.why.timeSaved":
    "Zeitersparnis: LehrkrÃ¤fte gewinnen jede Woche Stunden zurÃ¼ck.",
  "suite.why.retention":
    "Bindung unterstÃ¼tzt: Weniger Stress und gerechtere Arbeitslast.",
  "suite.why.safety":
    "Sicher und konform: Datenschutz und Schutz standardmÃ¤ÃŸig.",
  "suite.why.evidence":
    "Evidenzbasiert: PÃ¤dagogik und Nachvollziehbarkeit, nicht nur Tempo.",

  // Suite - Roadmap (DE)
  "suite.roadmap.title": "Bereit fÃ¼r die Roadmap",
  "suite.roadmap.body":
    "Geplante Erweiterungen umfassen intelligentere Elternkommunikation, Synthese formativer Bewertungen und UnterstÃ¼tzung bei Differenzierung - alles Ã¼ber KnowledgeCore bereitgestellt, damit der Nutzen Ã¼berall ankommt, nicht nur in einem einzelnen Tool.",

  // Suite - CTA (DE)
  "suite.cta.title": "Jetzt entdecken",
  "suite.cta.body":
    "Ob Sie als Lehrkraft Entlastung suchen oder als Schule skalierbare UnterstÃ¼tzung: Zaza hilft Ihrem Team zu gedeihen.",
  "suite.cta.primary": "LÃ¶sungen ansehen",
  "suite.cta.secondary": "Mit unserem Team sprechen",

  // Suite - Trust Bar (DE)
  "suite.trust.hallucinationSafe": "Halluzinationssicher",
  "suite.trust.ferpa": "FERPA-konform",
  "suite.trust.teachers": "500+ LehrkrÃ¤fte",

  // Suite - How It Works (DE)
  "suite.hiw.title": "So funktioniert die Suite",
  "suite.hiw.step1.title": "Passende App wÃ¤hlen",
  "suite.hiw.step1.desc":
    "Teach fÃ¼rs Planen, Draft fÃ¼rs Schreiben, GradeFlow fÃ¼rs Bewerten, Shield fÃ¼r Grenzen.",
  "suite.hiw.step2.title": "Eigenen Kontext hinzufÃ¼gen",
  "suite.hiw.step2.desc":
    "Lehrplan, Klassendetails, Rubriken und Ton flieÃŸen einmal in KnowledgeCore ein und gelten Ã¼berall.",
  "suite.hiw.step3.title": "Schulreife Ergebnisse erhalten",
  "suite.hiw.step3.desc":
    "VertrauenswÃ¼rdige, erklÃ¤rbare Resultate mit konsistenten Schutzmechanismen in jedem Workflow.",

  // Suite - Testimonials (DE)
  "suite.testimonials.title": "Stimmen aus der Praxis",
  "suite.testimonials.1.quote":
    "Ich bekomme meinen Sonntag zurÃ¼ck. Planung und Elternkommunikation dauern jetzt Minuten statt Stunden.",
  "suite.testimonials.1.author": "Sarah Mitchell",
  "suite.testimonials.1.role": "Grundschullehrerin, UK",
  "suite.testimonials.2.quote":
    "Konsistente Bewertung mit klaren Nachweisen. GradeFlow hat die QualitÃ¤t klassenÃ¼bergreifend erhÃ¶ht.",
  "suite.testimonials.2.author": "Michael Brown",
  "suite.testimonials.2.role": "Oberstufenlehrer, USA",
  "suite.testimonials.3.quote":
    "Draft schÃ¼tzt Ton und Wohlbefinden. Ich kommuniziere mehr - mit weniger Stress.",
  "suite.testimonials.3.author": "Emma Rodriguez",
  "suite.testimonials.3.role": "Lehrerin Sek I, CA",

  // Suite - Logos (DE)
  "suite.logos.title": "VertrauenswÃ¼rdig bei LehrkrÃ¤ften an",
  "suite.logos.item1": "Oakridge High",
  "suite.logos.item2": "Riverstone Grundschule",
  "suite.logos.item3": "Northfield Akademie",
  "suite.logos.item4": "St. Mary's College",
  "suite.logos.item5": "Greenwood Schule",

  // Suite - Screenshots (DE)
  "suite.screens.title": "Echte Produkt-Screenshots",
  "suite.screens.caption":
    "Ein schneller Blick auf Planungs-, Schreib- und BewertungsablÃ¤ufe.",

  // Videos (DE)
  "videos.hero.title": "Video-Tutorials und Demos",
  "videos.search.placeholder": "Videos durchsuchen...",
  "videos.categories.all": "Alle Videos",
  "videos.categories.getting-started": "Erste Schritte",
  "videos.categories.advanced": "Erweiterte Funktionen",
  "videos.categories.use-cases": "AnwendungsfÃ¤lle",
  "videos.categories.best-practices": "BewÃ¤hrte Methoden",
  "videos.categories.tips-tricks": "Tipps & Tricks",
  "videos.section.all": "Alle Videos",
  "videos.featured": "Ausgewählte Videos",
  "videos.curated": "Kuratierte Playlists",

  // Webinars (DE)
  "webinars.hero.title": "Fortbildungs-Webinare",
  "webinars.hero.subtitle":
    "Nehmen Sie an Live-Sessions teil oder sehen Sie Aufzeichnungen. Sammeln Sie Fortbildungszertifikate und lernen Sie von Experten.",
  "webinars.search.placeholder": "Webinare durchsuchen...",
  "webinars.categories.all": "Alle Webinare",
  "webinars.sections.upcoming": "Bevorstehende Live-Webinare",
  "webinars.sections.ondemand": "Mediathek (On-Demand)",
  "webinars.labels.popular": "Beliebt",
  "webinars.labels.views": "Aufrufe",
  "webinars.buttons.registerNow": "Jetzt registrieren",
  "webinars.buttons.waitlistFull": "Warteliste voll",
  "webinars.empty": "Keine Webinare passend zu Ihrer Suche gefunden.",
  "webinars.cta.body":
    "SchlieÃŸen Sie sich Tausenden LehrkrÃ¤ften an, die ihre Praxis mit KI transformieren. Melden Sie sich noch heute fÃ¼r Ihr erstes Webinar an.",
  "webinars.cta.browseUpcoming": "Bevorstehende Webinare ansehen",

  // Community (DE)
  "community.hero.badge": "25.000+ aktive LehrkrÃ¤fte",
  "community.hero.titlePrefix": "Treten Sie der",
  "community.hero.titleHighlight": "Lehrercommunity bei",
  "community.hero.subtitle":
    "Vernetzen Sie sich weltweit mit LehrkrÃ¤ften. Teilen Sie Strategien, stellen Sie Fragen und lernen Sie von erfolgreichen Praxisbeispielen zum Einsatz von KI im Unterricht.",
  "community.search.placeholder": "Diskussionen durchsuchen...",
  "community.stats.members": "Mitglieder",
  "community.stats.discussions": "Diskussionen",
  "community.stats.posts": "BeitrÃ¤ge",
  "community.stats.active": "Aktiv",
  // Kategorien
  "community.categories.getting-started.name": "Erste Schritte mit KI",
  "community.categories.getting-started.desc":
    "Neu bei KI? Starten Sie hier mit einsteigerfreundlichen Tipps und Diskussionen.",
  "community.categories.prompt-engineering.name": "Prompt-Engineering",
  "community.categories.prompt-engineering.desc":
    "Teilen und diskutieren Sie wirksame Prompts fÃ¼r unterschiedliche Unterrichtsszenarien.",
  "community.categories.lesson-planning.name": "Unterrichtsplanung",
  "community.categories.lesson-planning.desc":
    "Gemeinsam KI-gestÃ¼tzte Unterrichts- und Einheitenplanung erarbeiten.",
  "community.categories.parent-communication.name": "Elternkommunikation",
  "community.categories.parent-communication.desc":
    "Tipps fÃ¼r den KI-Einsatz zur Verbesserung der Eltern-Lehrer-Kommunikation.",
  "community.categories.assessment-feedback.name": "Bewertung & Feedback",
  "community.categories.assessment-feedback.desc":
    "KI-Tools fÃ¼r Korrektur, Feedback und formative Beurteilung diskutieren.",
  "community.categories.differentiation.name": "Differenzierung & FÃ¶rderplÃ¤ne",
  "community.categories.differentiation.desc":
    "Mit KI vielfÃ¤ltige Lernende unterstÃ¼tzen und Nachteilsausgleiche erstellen.",
  "community.categories.ethics-policy.name": "Ethik & Richtlinien",
  "community.categories.ethics-policy.desc":
    "Ethische Aspekte, Policies und Best Practices diskutieren.",
  "community.categories.tool-reviews.name": "Tool-Reviews & Vergleiche",
  "community.categories.tool-reviews.desc":
    "Erfahrungen mit verschiedenen KI-Tools und Plattformen teilen.",
  "community.categories.success-stories.name": "Erfolgsgeschichten",
  "community.categories.success-stories.desc":
    "Erfolge feiern und funktionierende Praxis im Unterricht teilen.",
  "community.categories.troubleshooting.name": "Fehlerbehebung",
  "community.categories.troubleshooting.desc":
    "Hilfe bekommen, wenn etwas nicht wie erwartet funktioniert.",
  "community.categories.subject-specific.name": "Fachspezifisch",
  "community.categories.subject-specific.desc":
    "Diskussionen nach Fach (Mathematik, Deutsch, Naturwissenschaften usw.).",
  "community.categories.off-topic.name": "Off-Topic-Lounge",
  "community.categories.off-topic.desc":
    "Austausch zu Themen auÃŸerhalb von KI.",
  // Abzeichen
  "community.badges.firstPost.name": "Erster Beitrag",
  "community.badges.firstPost.desc": "Ihren ersten Beitrag verfasst",
  "community.badges.helpful.name": "Hilfreich",
  "community.badges.helpful.desc": "Ãœber 50 Likes erhalten",
  "community.badges.expert.name": "Experte",
  "community.badges.expert.desc": "Expertenlevel erreicht",
  "community.badges.ambassador.name": "Botschafter",
  "community.badges.ambassador.desc": "Offizieller Zaza-Botschafter",
  // Richtlinien
  "community.guidelines.title": "Community-Richtlinien",
  "community.guidelines.li1": "Respektvoll und unterstÃ¼tzend sein",
  "community.guidelines.li2": "Praktische, umsetzbare Tipps teilen",
  "community.guidelines.li3": "SchÃ¼lerdatenschutz wahren",
  "community.guidelines.li4": "Urheberschaft anerkennen",
  "community.guidelines.read": "VollstÃ¤ndige Richtlinien lesen",
  // Verwandte Inhalte
  "community.related.title": "Wissen erweitern",
  "community.related.desc":
    "Vertiefen Sie Ihr Community-Erlebnis mit diesen Lernressourcen",
  "community.related.aiLiteracy.title": "KI-Kompetenzkurse",
  "community.related.aiLiteracy.desc":
    "Grundlagen lernen, die in der Community diskutiert werden",
  "community.related.webinars.title": "Experten-Webinare",
  "community.related.webinars.desc":
    "Live-Sessions zu aktuellen Community-Themen",
  "community.related.glossary.title": "KI-Glossar",
  "community.related.glossary.desc": "Begriffe aus den Diskussionen verstehen",
  // CTA
  "community.cta.titlePrefix": "Bereit,",
  "community.cta.titleHighlight": "an der Diskussion teilzunehmen?",
  "community.cta.body":
    "Erstellen Sie kostenlos ein Konto und vernetzen Sie sich mit Tausenden LehrkrÃ¤ften, die KI im Unterricht einsetzen.",
  "community.cta.primary": "Kostenloses Konto erstellen",
  "community.cta.secondary": "Als Gast stÃ¶bern",

  "about.nav.title": "Ãœber uns",
  "about.nav.company": "Unternehmen",
  "about.nav.founder": "GrÃ¼nder",
  "about.nav.press": "Presse-Kit",
  "about.nav.careers": "Karriere",

  // Hero Section
  "hero.eyebrow": "FÃœR LEHRKRÃ„FTE",
  "hero.badge": "Halluzinationssichere KI fÃ¼r LehrkrÃ¤fte",
  "hero.headline": "Schreiben Sie wie Sie",
  "hero.headlineAccent": "nur schneller.",
  "hero.subheading":
    "KI-gestÃ¼tzter Schreibassistent, der LehrkrÃ¤ften hilft, Eltern-E-Mails, SchÃ¼lerberichte und Bewertungskommentare in Minuten statt Stunden zu erstellen.",
  "hero.ctaPrimary": "Kostenlos starten",
  "hero.ctaSecondary": "Beispiele ansehen",
  "hero.trustIndicators.hallucinationSafe": "Halluzinationssicher",
  "hero.trustIndicators.ferpaCompliant": "FERPA-konform",
  "hero.trustIndicators.teachers": "500+ LehrkrÃ¤fte",

  // Hallucination-Safe Tooltip
  "hallucinationSafe.tooltip.heading": "Was bedeutet halluzinationssicher?",
  "hallucinationSafe.tooltip.body":
    "Im Gegensatz zu generischen KI-Tools ist Zaza Draft speziell darauf trainiert, keine SchÃ¼lerinformationen zu erfinden, keine ElterngesprÃ¤che zu fabrizieren oder Details Ã¼ber Ihre Klasse zu konstruieren. Jede Ausgabe basiert ausschlieÃŸlich auf Ihren tatsÃ¤chlichen Angaben - keine erfundenen Fakten, keine fiktiven Szenarien.",

  // Problem Section
  "problem.heading":
    "LehrkrÃ¤fte verbringen Ã¼ber 10 Stunden pro Woche mit Schreibaufgaben",
  "problem.body":
    "Die Herausforderung besteht nicht darin, was zu sagen ist - sondern die Zeit und die richtigen Worte zu finden, um es professionell zu formulieren und dabei Ihre authentische Stimme zu bewahren.",
  "problem.stats.parentEmails.value": "2-3 Std./Woche",
  "problem.stats.parentEmails.label": "Eltern-E-Mails",
  "problem.stats.reportCards.value": "4-6 Std./Semester",
  "problem.stats.reportCards.label": "Zeugnisberichte",
  "problem.stats.gradingFeedback.value": "1-2 Std./Woche",
  "problem.stats.gradingFeedback.label": "Bewertungsfeedback",

  // Solution Section
  "solution.heading": "Die erste KI-Suite speziell fÃ¼r Lehrerkommunikation",
  "solution.bodyPrimary":
    "Zaza ist die weltweit erste KI-Suite speziell fÃ¼r LehrkrÃ¤fte - basierend auf echter PÃ¤dagogik, gestÃ¼tzt auf einen vertrauenswÃ¼rdigen Assistenten und entwickelt, um nicht nur Zeit zu sparen, sondern LehrkrÃ¤ften zu helfen, aufzublÃ¼hen.",
  "solution.bodySecondary":
    "Trainiert mit echter PÃ¤dagogik und Lehrersprache - nicht mit Business-Texten. Jede Ausgabe bewahrt Ihre authentische Stimme und spart gleichzeitig Stunden bei Eltern-E-Mails, Zeugnisberichten und Feedback-Kommentaren.",

  // Stats Section
  "stats.documentsRefined.number": "150k+",
  "stats.documentsRefined.label": "Dokumente verfeinert",
  "stats.teachers.number": "500+",
  "stats.teachers.label": "LehrkrÃ¤fte",
  "stats.timeSaved.number": "10+ Std.",
  "stats.timeSaved.label": "WÃ¶chentlich gespart",
  "stats.subtitle":
    "Vertraut von 500+ LehrkrÃ¤ften, die mit Zaza Draft jede Woche 10+ Stunden sparen.",

  // How It Works Section
  "howItWorks.heading": "So funktioniert es",
  "howItWorks.diagram.step1.title": "Ihre Eingabe",
  "howItWorks.diagram.step1.description": "Grobe Notizen oder Stichpunkte",
  "howItWorks.diagram.step1.example": "Sam passt im Unterricht nicht auf.",
  "howItWorks.diagram.step2.title": "Tonauswahl",
  "howItWorks.diagram.step2.description": "WÃ¤hlen Sie Ihren Ton",
  "howItWorks.diagram.step2.example":
    "UnterstÃ¼tzend, Formal, PrÃ¤gnant oder Neutral",
  "howItWorks.diagram.step3.title": "Ausgefeilte Ausgabe",
  "howItWorks.diagram.step3.description": "Unterrichtsfertige Kommunikation",
  "howItWorks.diagram.step3.example":
    "Ich mÃ¶chte Sie bezÃ¼glich Sams jÃ¼ngster Aufmerksamkeitsschwierigkeiten...",
  "howItWorks.steps.step1.number": "1",
  "howItWorks.steps.step1.title":
    "FÃ¼gen Sie Ihren Entwurf ein oder beschreiben Sie, was Sie benÃ¶tigen",
  "howItWorks.steps.step1.description":
    "Beginnen Sie mit groben Notizen, Stichpunkten oder einem vollstÃ¤ndigen Entwurf",
  "howItWorks.steps.step2.number": "2",
  "howItWorks.steps.step2.title":
    "WÃ¤hlen Sie Ihren Ton und beobachten Sie, wie Draft verfeinert",
  "howItWorks.steps.step2.description":
    "UnterstÃ¼tzend, formal, prÃ¤gnant oder neutral - immer bearbeitbar",
  "howItWorks.steps.step3.number": "3",
  "howItWorks.steps.step3.title": "Exportieren & teilen",
  "howItWorks.steps.step3.description":
    "Kopieren, herunterladen oder mit einem Klick in Ihre Schultools teilen",

  // Demo Section
  "demo.heading": "Draft in Aktion",
  "demo.tabs.parentEmail": "Eltern-E-Mail",
  "demo.tabs.reportCard": "Zeugnis",
  "demo.tabs.gradingComment": "Bewertungskommentar",
  "demo.before.label": "VORHER (IHR ENTWURF)",
  "demo.toneSelector": "Ton: UnterstÃ¼tzend",
  "demo.ctaButton": "Umformulieren",
  "demo.after.label": "NACHHER (DRAFT'S VERSION)",
  "demo.tryItYourself": "Selbst ausprobieren",
  "demo.testimonial.quote":
    "Ich habe meinen Sonntag zurÃ¼ckbekommen. Draft verwandelt Stunden in Minuten.",
  "demo.testimonial.name": "Sarah Mitchell",
  "demo.testimonial.author": "Grundschullehrerin, UK",

  // Use Cases Section
  "useCases.heading": "FÃ¼r Ihre alltÃ¤glichen Schreibaufgaben entwickelt",
  "useCases.cards.parentMessages.title": "Eltern-Nachrichten",
  "useCases.cards.parentMessages.description":
    "Formulieren Sie sensible E-Mails im richtigen Ton um",
  "useCases.cards.parentMessages.examples":
    "Verhaltensbedenken, Fortschrittsaktualisierungen, Anwesenheitsprobleme",
  "useCases.cards.reportCards.title": "Zeugnisberichte",
  "useCases.cards.reportCards.description":
    "Verwandeln Sie Stichpunkte in aussagekrÃ¤ftige ErzÃ¤hlungen",
  "useCases.cards.reportCards.examples":
    "Semesterberichte, Fortschrittszusammenfassungen, FÃ¶rderplÃ¤ne",
  "useCases.cards.gradingComments.title": "Bewertungskommentare",
  "useCases.cards.gradingComments.description":
    "Generieren Sie konstruktives Feedback schneller",
  "useCases.cards.gradingComments.examples":
    "Kriterienbasierte Kommentare, Rubrik-Feedback",
  "useCases.cards.schoolCommunications.title": "Schulkommunikation",
  "useCases.cards.schoolCommunications.description":
    "Erstellen Sie Newsletter und AnkÃ¼ndigungen professionell",
  "useCases.cards.schoolCommunications.examples":
    "Updates, Veranstaltungshinweise, Mitteilungen",
  "useCases.cards.referenceLetters.title": "Empfehlungsschreiben",
  "useCases.cards.referenceLetters.description":
    "Verfassen Sie Ã¼berzeugende Empfehlungen selbstbewusst",
  "useCases.cards.referenceLetters.examples":
    "Hochschulempfehlungen, Jobempfehlungen",
  "useCases.cards.documentation.title": "Dokumentation",
  "useCases.cards.documentation.description":
    "Erstellen Sie klare Aufzeichnungen und Besprechungsnotizen",
  "useCases.cards.documentation.examples":
    "FÃ¶rderplandokumentation, ElterngesprÃ¤che",

  // Comparison Section
  "comparison.heading":
    "Warum LehrkrÃ¤fte Zaza gegenÃ¼ber generischen KI-Tools vertrauen",
  "comparison.subheading":
    "Speziell fÃ¼r Bildung entwickelt, nicht von Business-Tools adaptiert",
  "comparison.tableHeaders.feature": "Funktion",
  "comparison.tableHeaders.genericAI": "Generische KI-Tools (ChatGPT, etc.)",
  "comparison.tableHeaders.zazaDraft": "Zaza Draft",
  "comparison.rows.training.feature": "Training",
  "comparison.rows.training.generic": "Allgemeines Wissen, geschÃ¤ftsorientiert",
  "comparison.rows.training.zaza":
    "Trainiert mit echter Lehrerkommunikation & PÃ¤dagogik",
  "comparison.rows.safety.feature": "Sicherheit",
  "comparison.rows.safety.generic":
    "Kann SchÃ¼lerdetails oder Szenarien erfinden",
  "comparison.rows.safety.zaza":
    "Halluzinationssicher - erfindet niemals Informationen",
  "comparison.rows.toneControl.feature": "Tonkontrolle",
  "comparison.rows.toneControl.generic": "Begrenzt oder inkonsistent",
  "comparison.rows.toneControl.zaza": "4+ bildungsspezifische TÃ¶ne",
  "comparison.rows.compliance.feature": "Compliance",
  "comparison.rows.compliance.generic": "Nicht FERPA-konform entwickelt",
  "comparison.rows.compliance.zaza": "Von Grund auf FERPA-konform",
  "comparison.rows.useCases.feature": "AnwendungsfÃ¤lle",
  "comparison.rows.useCases.generic": "Generische Schreibaufgaben",
  "comparison.rows.useCases.zaza": "6 spezialisierte Lehrer-Workflows",
  "comparison.rows.outputQuality.feature": "AusgabequalitÃ¤t",
  "comparison.rows.outputQuality.generic": "Erfordert starke Bearbeitung",
  "comparison.rows.outputQuality.zaza": "Unterrichtsfertig in Minuten",
  "comparison.rows.learningCurve.feature": "Lernkurve",
  "comparison.rows.learningCurve.generic": "Komplexe Prompts erforderlich",
  "comparison.rows.learningCurve.zaza": "EinfÃ¼gen, Ton wÃ¤hlen, fertig",
  "comparison.rows.community.feature": "Community",
  "comparison.rows.community.generic": "Keine Lehrer-UnterstÃ¼tzung",
  "comparison.rows.community.zaza": "500+ PÃ¤dagogen teilen Best Practices",

  // Why Choose Section
  "whyChoose.heading": "Warum LehrkrÃ¤fte Zaza wÃ¤hlen",
  "whyChoose.benefits.beatWritersBlock.title": "Schreibblockade Ã¼berwinden",
  "whyChoose.benefits.beatWritersBlock.description":
    "Beginnen Sie mit KI, beenden Sie mit Ihrer authentischen Stimme",
  "whyChoose.benefits.writeWithConfidence.title":
    "Mit Selbstvertrauen schreiben",
  "whyChoose.benefits.writeWithConfidence.description":
    "Professionelle QualitÃ¤t in allen Kommunikationen",
  "whyChoose.benefits.saveTime.title": "Sparen Sie jede Woche Stunden",
  "whyChoose.benefits.saveTime.description":
    "2-Stunden-Aufgaben in 5 Minuten erledigt",
  "whyChoose.benefits.breakBarriers.title": "Sprachbarrieren Ã¼berwinden",
  "whyChoose.benefits.breakBarriers.description":
    "Sofort in Ã¼ber 20 Sprachen Ã¼bersetzen",

  // Testimonials Section
  "testimonials.heading": "Was LehrkrÃ¤fte sagen",
  "testimonials.quote1.text":
    "Ich habe meinen Sonntag zurÃ¼ckbekommen. Draft verwandelt Stunden in Minuten.",
  "testimonials.quote1.name": "Sarah Mitchell",
  "testimonials.quote1.author": "Grundschullehrerin, UK",
  "testimonials.quote2.text": "Kommentare sind konsistent und freundlich.",
  "testimonials.quote2.name": "Marcus Johnson",
  "testimonials.quote2.author": "Mittelschullehrerin, US",
  "testimonials.quote3.text":
    "GradeFlow hilft unserem Team, sich auf Standards zu einigen.",
  "testimonials.quote3.name": "Dr. Anna Weber",
  "testimonials.quote3.author": "Fachbereichsleitung, DE",

  // Final CTA Section
  "finalCTA.heading": "Holen Sie sich Ihre Zeit zurÃ¼ck",
  "finalCTA.subheading":
    "SchlieÃŸen Sie sich 500+ LehrkrÃ¤ften an, die mit Zaza Draft jede Woche 10+ Stunden sparen.",
  "finalCTA.button": "Kostenlos starten",

  // Footer
  "footer.social.tiktok": "Folgen Sie uns auf TikTok @zazatechnologies",
  "footer.social.twitter": "Folgen Sie uns auf X (Twitter) @zazateachapp",
  "footer.social.linkedin": "Verbinden Sie sich mit uns auf LinkedIn",
  "footer.productEcosystem": "Produkt & Ã–kosystem",
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
  "footer.about": "Ãœber uns",
  "footer.privacy": "Datenschutz",
  "footer.terms": "Nutzungsbedingungen",
  "footer.contact": "Kontakt",

  // Products - Teach (German)
  "products.teach.hero.eyebrow": "UNTERRICHTSPLANUNG LEICHT GEMACHT",
  "products.teach.hero.title":
    "Bessere Unterrichtsstunden in kÃ¼rzerer Zeit planen",
  "products.teach.hero.subtitle":
    "KI-gestÃ¼tzte Unterrichtsplanung, die sich an Ihren Lehrplan anpasst, Stunden an Vorbereitungszeit spart und Ihnen hilft, ansprechende, standardkonforme Unterrichtsstunden zu erstellen.",
  "products.teach.hero.cta.primary": "Kostenlos starten",
  "products.teach.hero.cta.secondary": "Demo ansehen",

  "products.teach.turn.pain1":
    "Jede Woche Stunden damit verbringen, UnterrichtsplÃ¤ne von Grund auf zu erstellen",
  "products.teach.turn.pain2":
    "Schwierigkeiten bei der Differenzierung fÃ¼r verschiedene Lernende",
  "products.teach.turn.pain3":
    "Zeit fÃ¼r administrative Aufgaben statt fÃ¼r das Unterrichten verlieren",

  "products.teach.features.title":
    "Alles, was Sie fÃ¼r groÃŸartige Unterrichtsstunden brauchen",
  "products.teach.features.autoplanner.title": "Auto-Planer",
  "products.teach.features.autoplanner.desc":
    "Erstellen Sie in Minuten vollstÃ¤ndige, an Ihre Lehrplanstandards angepasste UnterrichtsplÃ¤ne",
  "products.teach.features.curriculum.title": "Lehrplankonform",
  "products.teach.features.curriculum.desc":
    "Integrierte UnterstÃ¼tzung fÃ¼r Common Core, Landesstandards und internationale LehrplÃ¤ne",
  "products.teach.features.gamified.title": "Spielerische AktivitÃ¤ten",
  "products.teach.features.gamified.desc":
    "Erstellen Sie ansprechende, interaktive AktivitÃ¤ten, die SchÃ¼ler motiviert halten",

  "products.teach.howItWorks.title": "So funktioniert es",
  "products.teach.howItWorks.step1.title": "Ziele festlegen",
  "products.teach.howItWorks.step1.desc":
    "Teilen Sie uns Ihr Fach, Ihre Klassenstufe und Lernziele mit",
  "products.teach.howItWorks.step2.title": "KI erstellt Plan",
  "products.teach.howItWorks.step2.desc":
    "Erhalten Sie in Sekunden einen vollstÃ¤ndigen, standardkonformen Unterrichtsplan",
  "products.teach.howItWorks.step3.title": "Anpassen & Unterrichten",
  "products.teach.howItWorks.step3.desc":
    "Bearbeiten, speichern und teilen Sie Ihre Unterrichtsstunden mit Ihrem Team",

  "products.teach.whoItsFor.title": "Perfekt fÃ¼r",
  "products.teach.whoItsFor.item1":
    "LehrkrÃ¤fte, die Zeit bei der Unterrichtsplanung sparen mÃ¶chten",
  "products.teach.whoItsFor.item2":
    "PÃ¤dagogen, die den Unterricht effektiver differenzieren mÃ¶chten",
  "products.teach.whoItsFor.item3":
    "Schulen, die einen konsistenten, standardkonformen Lehrplan suchen",

  "products.teach.change.title": "Transformieren Sie Ihren Planungsprozess",
  "products.teach.change.step1":
    "Reduzieren Sie die Planungszeit von Stunden auf Minuten",
  "products.teach.change.step2":
    "Erstellen Sie ansprechendere, differenzierte Unterrichtsstunden",
  "products.teach.change.step3":
    "Stellen Sie die Ãœbereinstimmung mit Lehrplanstandards sicher",
  "products.teach.change.step4":
    "Teilen und arbeiten Sie mit Ihrem Lehrerteam zusammen",

  "products.teach.social.title": "Was LehrkrÃ¤fte sagen",
  "products.teach.social.quote1":
    "Teach hat meine Planungszeit halbiert. Ich kann mich auf das Wesentliche konzentrieren - meine SchÃ¼ler.",
  "products.teach.social.author1": "Emma Thompson, Grundschullehrerin",
  "products.teach.social.quote2":
    "Die Lehrplan-Ausrichtungsfunktion ist ein Game-Changer fÃ¼r unsere Abteilung.",
  "products.teach.social.author2": "Michael Chen, Fachbereichsleiter",

  "products.teach.cta.title": "Bereit, Ihre Planung zu transformieren?",
  "products.teach.cta.subtitle":
    "SchlieÃŸen Sie sich Hunderten von LehrkrÃ¤ften an, die 10+ Stunden pro Woche sparen",
  "products.teach.cta.primary": "Kostenlose Testversion starten",
  "products.teach.cta.secondary": "Demo planen",

  // Products - Draft (German)
  "products.draft.hero.eyebrow": "KI-SCHREIBASSISTENT FÃœR LEHRKRÃ„FTE",
  "products.draft.hero.title": "Besser, schneller schreiben",
  "products.draft.hero.subtitle":
    "Verwandeln Sie grobe Notizen in ausgefeilte Eltern-E-Mails, Zeugnisse und Feedback in Minuten. Bewahren Sie Ihre Stimme und sparen Sie jede Woche Stunden.",
  "products.draft.hero.cta.primary": "Kostenlos starten",
  "products.draft.hero.cta.secondary": "Beispiele ansehen",

  "products.draft.turn.pain1":
    "2-3 Stunden pro Woche mit dem Schreiben von Eltern-E-Mails verbringen",
  "products.draft.turn.pain2":
    "Schwierigkeiten, den richtigen Ton fÃ¼r sensible Kommunikation zu finden",
  "products.draft.turn.pain3":
    "Immer wieder die gleichen Feedback-Kommentare schreiben",

  "products.draft.features.title": "FÃ¼r Lehrerkommunikation entwickelt",
  "products.draft.features.toneGuardrails.title": "Ton-Leitplanken",
  "products.draft.features.toneGuardrails.desc":
    "WÃ¤hlen Sie aus unterstÃ¼tzenden, formellen, prÃ¤gnanten oder neutralen TÃ¶nen - immer professionell",
  "products.draft.features.translationChecks.title": "ÃœbersetzungsprÃ¼fungen",
  "products.draft.features.translationChecks.desc":
    "Kommunizieren Sie selbstbewusst mit Familien in Ã¼ber 20 Sprachen",
  "products.draft.features.reviewSteps.title": "ÃœberprÃ¼fungsschritte",
  "products.draft.features.reviewSteps.desc":
    "Integrierter ÃœberprÃ¼fungsprozess gewÃ¤hrleistet Genauigkeit vor dem Senden",

  "products.draft.howItWorks.title": "So funktioniert es",
  "products.draft.howItWorks.step1.title": "Notizen einfÃ¼gen",
  "products.draft.howItWorks.step1.desc":
    "Beginnen Sie mit Stichpunkten oder einem groben Entwurf",
  "products.draft.howItWorks.step2.title": "Ton wÃ¤hlen",
  "products.draft.howItWorks.step2.desc":
    "WÃ¤hlen Sie die richtige Stimme fÃ¼r Ihre Nachricht",
  "products.draft.howItWorks.step3.title": "ÃœberprÃ¼fen & Senden",
  "products.draft.howItWorks.step3.desc":
    "Bei Bedarf bearbeiten, dann kopieren oder exportieren",

  "products.draft.whoItsFor.title": "Perfekt fÃ¼r",
  "products.draft.whoItsFor.item1":
    "LehrkrÃ¤fte, die Elternkommunikation schreiben",
  "products.draft.whoItsFor.item2":
    "PÃ¤dagogen, die Zeugniskommentare erstellen",
  "products.draft.whoItsFor.item3":
    "Schulen, die konsistente, professionelle Kommunikation benÃ¶tigen",

  "products.draft.change.title": "Was sich mit Draft Ã¤ndert",
  "products.draft.change.step1": "2-Stunden-Aufgaben in 5 Minuten erledigt",
  "products.draft.change.step2":
    "Konsistenter, professioneller Ton in allen Kommunikationen",
  "products.draft.change.step3": "Selbstvertrauen in sensiblen GesprÃ¤chen",
  "products.draft.change.step4":
    "Mehr Zeit zum Unterrichten, weniger Zeit zum Schreiben",

  "products.draft.techNote.title": "Halluzinationssicher:",
  "products.draft.techNote.body":
    "Im Gegensatz zu generischer KI erfindet Draft niemals SchÃ¼lerinformationen oder fabriziert Details. Jede Ausgabe basiert auf dem, was Sie bereitstellen.",

  "products.draft.social.title": "Was LehrkrÃ¤fte sagen",
  "products.draft.social.quote1":
    "Ich habe meinen Sonntag zurÃ¼ckbekommen. Draft verwandelt Stunden in Minuten.",
  "products.draft.social.author1": "Sarah Mitchell, Grundschullehrerin",
  "products.draft.social.quote2":
    "Die Tonoptionen helfen mir, selbstbewusst zu kommunizieren, auch in schwierigen Situationen.",
  "products.draft.social.author2": "James Rodriguez, Mittelschullehrer",

  "products.draft.cta.title": "Holen Sie sich Ihre Zeit zurÃ¼ck",
  "products.draft.cta.subtitle":
    "SchlieÃŸen Sie sich 500+ LehrkrÃ¤ften an, die jede Woche 10+ Stunden sparen",
  "products.draft.cta.primary": "Kostenlose Testversion starten",
  "products.draft.cta.secondary": "Beispiele ansehen",

  // Products - GradeFlow (German)
  "products.gradeflow.hero.title": "Schneller, fairer bewerten",
  "products.gradeflow.hero.subtitle":
    "KI-gestÃ¼tzter Bewertungsassistent, der Ihnen hilft, in der HÃ¤lfte der Zeit konsistentes, konstruktives Feedback zu geben.",
  "products.gradeflow.hero.cta": "Kostenlos starten",

  "products.gradeflow.turn.pain1":
    "4-6 Stunden pro Woche mit der Bewertung von Aufgaben verbringen",
  "products.gradeflow.turn.pain2":
    "Inkonsistentes Feedback bei Ã¤hnlichen SchÃ¼lerarbeiten",
  "products.gradeflow.turn.pain3":
    "Schwierigkeiten, detaillierte, konstruktive Kommentare zu geben",

  "products.gradeflow.change.title":
    "Transformieren Sie Ihren Bewertungsprozess",
  "products.gradeflow.change.step1": "Aufgabe und Bewertungsraster hochladen",
  "products.gradeflow.change.step2":
    "KI analysiert SchÃ¼lerarbeit anhand von Kriterien",
  "products.gradeflow.change.step3":
    "Vorgeschlagene Noten und Feedback Ã¼berprÃ¼fen und anpassen",
  "products.gradeflow.change.step4":
    "Mit einem Klick in Ihr Notenbuch exportieren",

  "products.gradeflow.features.title": "Bewertung leicht gemacht",
  "products.gradeflow.features.faster.title": "3x schnellere Bewertung",
  "products.gradeflow.features.faster.desc":
    "Reduzieren Sie die Bewertungszeit von Stunden auf Minuten bei gleichbleibender QualitÃ¤t",
  "products.gradeflow.features.fair.title": "Konsistentes Feedback",
  "products.gradeflow.features.fair.desc":
    "Stellen Sie faire, standardkonforme Bewertung fÃ¼r alle SchÃ¼ler sicher",
  "products.gradeflow.features.audit.title": "PrÃ¼fpfad",
  "products.gradeflow.features.audit.desc":
    "Verfolgen Sie alle Bewertungsentscheidungen mit vollstÃ¤ndiger Transparenz",

  "products.gradeflow.social.title": "Was LehrkrÃ¤fte sagen",
  "products.gradeflow.social.quote1":
    "GradeFlow hat meine Bewertungszeit halbiert, ohne die QualitÃ¤t zu beeintrÃ¤chtigen.",
  "products.gradeflow.social.author1": "Lisa Park, Gymnasiallehrerin Englisch",
  "products.gradeflow.social.quote2":
    "Mein Feedback ist jetzt konsistenter und hilfreicher.",
  "products.gradeflow.social.author2":
    "David Kim, Mittelschullehrer Mathematik",

  "products.gradeflow.cta.title": "Bereit, intelligenter zu bewerten?",
  "products.gradeflow.cta.button": "Kostenlose Testversion starten",

  // Products - Shield (German)
  "shield.hero.eyebrow": "KI-GOVERNANCE FÃœR SCHULEN",
  "shield.hero.title": "Sichere, konforme KI fÃ¼r Ihre Schule",
  "shield.hero.subtitle":
    "Enterprise-Grade KI-Governance-Plattform, die sichere, ethische und konforme KI-Nutzung in Ihrer gesamten Schule oder Ihrem Bezirk gewÃ¤hrleistet.",
  "shield.hero.cta.primary": "Mehr erfahren",
  "shield.hero.cta.secondary": "Vertrieb kontaktieren",

  "shield.trust.gdpr": "DSGVO-konform",
  "shield.trust.ferpa": "FERPA-konform",
  "shield.trust.schoolReady": "Schulbereit",

  "shield.problem.title": "Die KI-Governance-Herausforderung",
  "shield.problem.card1.title": "Datenschutzrisiken",
  "shield.problem.card1.description":
    "LehrkrÃ¤fte, die Verbraucher-KI-Tools verwenden, kÃ¶nnen versehentlich SchÃ¼lerdaten offenlegen",
  "shield.problem.card2.title": "Compliance-Bedenken",
  "shield.problem.card2.description":
    "Schulen haben Schwierigkeiten sicherzustellen, dass die KI-Nutzung FERPA, DSGVO und lokale Vorschriften erfÃ¼llt",
  "shield.problem.card3.title": "Mangelnde Aufsicht",
  "shield.problem.card3.description":
    "Keine Sichtbarkeit, wie KI in Klassenzimmern und Abteilungen verwendet wird",

  "shield.solution.title": "VollstÃ¤ndige KI-Governance in einer Plattform",
  "shield.solution.subtitle":
    "Ãœberwachen, kontrollieren und prÃ¼fen Sie die gesamte KI-Nutzung in Ihrer Schule",
  "shield.solution.card1.title": "Zentralisierte Kontrolle",
  "shield.solution.card1.description":
    "Legen Sie schulweite Richtlinien fÃ¼r die KI-Nutzung mit granularen Berechtigungen fest",
  "shield.solution.card2.title": "PrÃ¼fpfad",
  "shield.solution.card2.description":
    "VollstÃ¤ndige Sichtbarkeit aller KI-Interaktionen und DatenflÃ¼sse",
  "shield.solution.card3.title": "Datenschutz",
  "shield.solution.card3.description":
    "Automatische PII-Erkennung und -SchwÃ¤rzung vor der KI-Verarbeitung",
  "shield.solution.card4.title": "Richtliniendurchsetzung",
  "shield.solution.card4.description":
    "Automatisierte Compliance-PrÃ¼fungen gegen die Richtlinien Ihrer Schule",
  "shield.solution.cta": "Alle Funktionen erkunden",

  "shield.howItWorks.title": "So funktioniert Shield",
  "shield.howItWorks.step1.title": "Tools verbinden",
  "shield.howItWorks.step1.description":
    "Integrieren Sie Shield mit Ihren vorhandenen KI-Tools und Plattformen",
  "shield.howItWorks.step2.title": "Richtlinien festlegen",
  "shield.howItWorks.step2.description":
    "Definieren Sie Regeln fÃ¼r KI-Nutzung, Datenverarbeitung und Compliance",
  "shield.howItWorks.step3.title": "Ãœberwachen & PrÃ¼fen",
  "shield.howItWorks.step3.description":
    "Verfolgen Sie die Nutzung, Ã¼berprÃ¼fen Sie Protokolle und stellen Sie Compliance sicher",
  "shield.howItWorks.cta": "Loslegen",

  "shield.socialProof.title": "Vertraut von Schulen weltweit",
  "shield.socialProof.quote":
    "Shield gibt uns das Vertrauen, KI zu nutzen und gleichzeitig die PrivatsphÃ¤re unserer SchÃ¼ler zu schÃ¼tzen. Es ist wesentliche Infrastruktur fÃ¼r moderne Schulen.",
  "shield.socialProof.attribution": "Dr. Jennifer Martinez",
  "shield.socialProof.role":
    "Technologiedirektorin, Springfield School District",

  "shield.useCases.title": "FÃ¼r Bildung entwickelt",
  "shield.useCases.card1.title": "Lehrer-KI-Tools",
  "shield.useCases.card1.description":
    "Verwalten Sie KI-Schreibassistenten, Unterrichtsplaner und Bewertungstools",
  "shield.useCases.card2.title": "SchÃ¼ler-KI-Nutzung",
  "shield.useCases.card2.description":
    "Ãœberwachen und leiten Sie angemessene KI-Nutzung in SchÃ¼lerarbeiten",
  "shield.useCases.card3.title": "Administrative KI",
  "shield.useCases.card3.description":
    "Sichere KI-Nutzung fÃ¼r Planung, Kommunikation und Betrieb",

  "shield.comparison.title": "Shield vs. Manuelle Governance",
  "shield.comparison.feature": "Funktion",
  "shield.comparison.shield": "Mit Shield",
  "shield.comparison.manual": "Manueller Prozess",
  "shield.comparison.row1.feature": "Richtliniendurchsetzung",
  "shield.comparison.row1.shield": "Automatisiert",
  "shield.comparison.row1.manual": "Manuelle PrÃ¼fungen",
  "shield.comparison.row2.feature": "PrÃ¼fpfad",
  "shield.comparison.row2.shield": "VollstÃ¤ndige Protokolle",
  "shield.comparison.row2.manual": "UnvollstÃ¤ndige Aufzeichnungen",
  "shield.comparison.row3.feature": "PII-Schutz",
  "shield.comparison.row3.shield": "Automatisch",
  "shield.comparison.row3.manual": "Manuelle ÃœberprÃ¼fung",

  "shield.pricing.title": "Enterprise-Preise",
  "shield.pricing.description":
    "Individuelle Preisgestaltung basierend auf Ihrer SchulgrÃ¶ÃŸe und Ihren Anforderungen. Kontaktieren Sie uns fÃ¼r ein Angebot.",
  "shield.pricing.cta": "Preise erhalten",

  "shield.finalCta.title": "Bereit, die KI Ihrer Schule zu sichern?",
  "shield.finalCta.subtitle":
    "SchlieÃŸen Sie sich zukunftsorientierten Schulen an, die Shield nutzen, um KI sicher einzusetzen",
  "shield.finalCta.primary": "Demo planen",
  "shield.finalCta.secondary": "Vertrieb kontaktieren",
  "shield.finalCta.note": "Enterprise-Support und Onboarding inklusive",

  // FAQ Page (German)
  "faq.hero.eyebrow": "HÃ„UFIG GESTELLTE FRAGEN",
  "faq.hero.title": "Wie kÃ¶nnen wir Ihnen helfen?",
  "faq.hero.subtitle":
    "Finden Sie Antworten auf hÃ¤ufige Fragen zu Zaza Draft und unseren KI-Tools fÃ¼r LehrkrÃ¤fte.",

  // FAQ Categories (German)
  "faq.category.about.title": "Ãœber Zaza Draft",
  "faq.category.safety.title": "Sicherheit & Datenschutz",
  "faq.category.features.title": "Funktionen & MÃ¶glichkeiten",
  "faq.category.pricing.title": "Preise & PlÃ¤ne",
  "faq.category.languages.title": "Sprachen & Ãœbersetzung",
  "faq.category.schools.title": "FÃ¼r Schulen & Bezirke",

  // About Questions (German)
  "faq.about.q1": "Was ist Zaza Draft?",
  "faq.about.a1":
    "Zaza Draft ist ein KI-gestÃ¼tzter Schreibassistent, der speziell fÃ¼r LehrkrÃ¤fte entwickelt wurde. Er hilft Ihnen, grobe Notizen in ausgefeilte Eltern-E-Mails, Zeugnisse, Bewertungskommentare und andere pÃ¤dagogische Kommunikation in Minuten zu verwandeln, wÃ¤hrend Sie Ihre authentische Stimme bewahren.",

  "faq.about.q2":
    "Wie unterscheidet sich Zaza Draft von ChatGPT oder anderen KI-Tools?",
  "faq.about.a2":
    "Im Gegensatz zu generischen KI-Tools ist Zaza Draft speziell auf pÃ¤dagogische Kommunikation und PÃ¤dagogik trainiert. Es ist halluzinationssicher (erfindet niemals SchÃ¼lerinformationen), bietet bildungsspezifische Tonoptionen, ist von Grund auf FERPA-konform und bietet spezialisierte Workflows fÃ¼r gÃ¤ngige Schreibaufgaben von LehrkrÃ¤ften.",

  "faq.about.q3": "FÃ¼r wen ist Zaza Draft gedacht?",
  "faq.about.a3":
    "Zaza Draft ist fÃ¼r K-12-LehrkrÃ¤fte, PÃ¤dagogen, Schuladministratoren und alle, die an pÃ¤dagogischer Kommunikation beteiligt sind, konzipiert. Egal, ob Sie Eltern-E-Mails, Zeugnisse, Feedback-Kommentare oder SchulankÃ¼ndigungen schreiben, Draft hilft Ihnen, Zeit zu sparen und gleichzeitig professionelle QualitÃ¤t zu wahren.",

  "faq.about.q4":
    "BenÃ¶tige ich technische Kenntnisse, um Zaza Draft zu verwenden?",
  "faq.about.a4":
    "Keine technischen Kenntnisse erforderlich! Zaza Draft ist unglaublich einfach zu bedienen: Notizen einfÃ¼gen, Ton wÃ¤hlen und ausgefeilte Ausgabe erhalten. Wenn Sie E-Mails verwenden kÃ¶nnen, kÃ¶nnen Sie Draft verwenden.",

  "faq.about.q5": "Kann ich Zaza Draft vor einer Verpflichtung ausprobieren?",
  "faq.about.a5":
    "Ja! Wir bieten eine kostenlose Testversion an, damit Sie erleben kÃ¶nnen, wie Draft Ihnen Zeit spart und Ihre Kommunikation verbessert. Keine Kreditkarte zum Starten erforderlich.",

  "faq.about.q6": "Bei welchen Arten von Texten kann Zaza Draft helfen?",
  "faq.about.a6":
    "Draft spezialisiert sich auf sechs SchlÃ¼sselbereiche: Elternnachrichten, Zeugnisse, Bewertungskommentare, Schulkommunikation, Empfehlungsschreiben und Dokumentation. Es ist fÃ¼r die alltÃ¤glichen Schreibaufgaben von LehrkrÃ¤ften entwickelt.",

  "faq.about.q7": "Wie viel Zeit kann ich mit Zaza Draft sparen?",
  "faq.about.a7":
    "LehrkrÃ¤fte, die Draft verwenden, berichten, dass sie Ã¼ber 10 Stunden pro Woche bei Schreibaufgaben sparen. Aufgaben, die normalerweise 2 Stunden dauern, kÃ¶nnen mit Drafts Hilfe in 5 Minuten erledigt werden.",

  "faq.about.q8": "Kann ich die Ausgabe anpassen?",
  "faq.about.a8":
    "Absolut! Draft bietet einen Ausgangspunkt, den Sie bearbeiten und verfeinern kÃ¶nnen. Sie behalten die volle Kontrolle Ã¼ber die endgÃ¼ltige Nachricht - Draft hilft Ihnen nur, schneller dorthin zu gelangen.",

  "faq.about.q9": "Funktioniert Zaza Draft in meinem Land?",
  "faq.about.a9":
    "Ja! Zaza Draft ist weltweit verfÃ¼gbar und unterstÃ¼tzt Kommunikation in Ã¼ber 20 Sprachen. Egal, ob Sie in den USA, GroÃŸbritannien, Kanada, Australien oder anderswo sind, Draft kann Ihnen helfen, effektiv zu kommunizieren.",

  "faq.about.q10": "Was ist das Zaza-ProduktÃ¶kosystem?",
  "faq.about.a10":
    "Zaza bietet eine Suite von KI-Tools fÃ¼r Bildung: Draft (Schreibassistent), Teach (Unterrichtsplanung), GradeFlow (Bewertungsassistent) und Shield (KI-Governance). Jedes Tool ist darauf ausgelegt, spezifische Herausforderungen von LehrkrÃ¤ften zu lÃ¶sen.",

  "faq.about.q11": "Wie fange ich an?",
  "faq.about.a11":
    "Melden Sie sich einfach fÃ¼r ein kostenloses Konto an, fÃ¼gen Sie Ihren ersten Entwurf oder Notizen ein, wÃ¤hlen Sie Ihren gewÃ¼nschten Ton und beobachten Sie, wie Draft Ihr Schreiben transformiert. Sie werden innerhalb von Minuten nach dem Start Zeit sparen.",

  // Safety Questions (German)
  "faq.safety.q1": "Sind meine Daten bei Zaza Draft sicher?",
  "faq.safety.a1":
    "Ja. Wir nehmen Datensicherheit ernst. Alle Daten sind wÃ¤hrend der Ãœbertragung und im Ruhezustand verschlÃ¼sselt, wir sind FERPA-konform und wir verwenden Ihre Daten niemals zum Trainieren unserer Modelle oder teilen sie mit Dritten. Ihre Kommunikation bleibt privat und sicher.",

  "faq.safety.q2": "Was bedeutet 'halluzinationssicher'?",
  "faq.safety.a2":
    "Halluzinationssicher bedeutet, dass Draft niemals SchÃ¼lerinformationen erfindet, ElterngesprÃ¤che fabriziert oder fiktive Details Ã¼ber Ihre Klasse erstellt. Jede Ausgabe basiert auf dem, was Sie tatsÃ¤chlich bereitstellen - keine erfundenen Fakten oder Szenarien.",

  "faq.safety.q3": "Ist Zaza Draft FERPA-konform?",
  "faq.safety.a3":
    "Ja. Zaza Draft ist mit Blick auf FERPA-KonformitÃ¤t entwickelt. Wir implementieren angemessene SchutzmaÃŸnahmen zum Schutz der PrivatsphÃ¤re von SchÃ¼lern und Bildungsunterlagen, und wir teilen oder verkaufen niemals SchÃ¼lerdaten.",

  "faq.safety.q4": "Kann ich SchÃ¼lernamen in meinen EntwÃ¼rfen verwenden?",
  "faq.safety.a4":
    "Ja, Sie kÃ¶nnen SchÃ¼lernamen und relevante Details einbeziehen. Draft verarbeitet diese Informationen sicher und speichert oder verwendet sie niemals Ã¼ber die Generierung Ihrer spezifischen Ausgabe hinaus. Alle SchÃ¼lerinformationen bleiben vertraulich.",

  "faq.safety.q5":
    "Was passiert mit meinen Daten, nachdem ich Draft verwendet habe?",
  "faq.safety.a5":
    "Ihre EntwÃ¼rfe und Ausgaben werden sicher in Ihrem Konto gespeichert, aber wir verwenden sie niemals zum Trainieren unserer KI-Modelle. Sie kÃ¶nnen Ihre Daten jederzeit aus Ihren Kontoeinstellungen lÃ¶schen.",

  "faq.safety.q6": "Ist Zaza Draft DSGVO-konform?",
  "faq.safety.a6":
    "Ja. Wir erfÃ¼llen die DSGVO-Anforderungen fÃ¼r Datenschutz und PrivatsphÃ¤re. Benutzer haben volle Kontrolle Ã¼ber ihre Daten, einschlieÃŸlich des Rechts auf Zugriff, Korrektur und LÃ¶schung ihrer Informationen.",

  // Features Questions (German)
  "faq.features.q1": "Welche Tonoptionen sind verfÃ¼gbar?",
  "faq.features.a1":
    "Draft bietet vier bildungsspezifische TÃ¶ne: UnterstÃ¼tzend (warm und ermutigend), Formal (professionell und strukturiert), PrÃ¤gnant (kurz und direkt) und Neutral (ausgewogen und objektiv). Jeder Ton ist fÃ¼r pÃ¤dagogische Kommunikation kalibriert.",

  "faq.features.q2": "Kann Draft meine Nachrichten Ã¼bersetzen?",
  "faq.features.a2":
    "Ja! Draft kann Ihre Kommunikation in Ã¼ber 20 Sprachen Ã¼bersetzen, was es einfach macht, mit Familien zu kommunizieren, die verschiedene Sprachen sprechen. Ãœbersetzungen bewahren den angemessenen Ton und pÃ¤dagogischen Kontext.",

  "faq.features.q3": "Funktioniert Draft mit den Systemen meiner Schule?",
  "faq.features.a3":
    "Draft generiert Text, den Sie einfach in jedes System kopieren und einfÃ¼gen kÃ¶nnen - E-Mail, Lernmanagementsysteme, NotenbÃ¼cher oder Textverarbeitungsprogramme. Keine speziellen Integrationen erforderlich.",

  "faq.features.q4":
    "Kann ich Vorlagen oder hÃ¤ufig verwendete Phrasen speichern?",
  "faq.features.a4":
    "Ja! Sie kÃ¶nnen Ihre Lieblingsausgaben als Vorlagen fÃ¼r die zukÃ¼nftige Verwendung speichern, was es noch schneller macht, Ã¤hnliche Kommunikation in der Zukunft zu erstellen.",

  "faq.features.q5": "Funktioniert Draft auf mobilen GerÃ¤ten?",
  "faq.features.a5":
    "Ja! Zaza Draft ist vollstÃ¤ndig responsiv und funktioniert auf Smartphones, Tablets und Computern. Schreiben und verfeinern Sie Kommunikation, wo immer Sie sind.",

  "faq.features.q6": "KÃ¶nnen mehrere LehrkrÃ¤fte Vorlagen teilen?",
  "faq.features.a6":
    "Mit unseren SchulplÃ¤nen kÃ¶nnen Teams Vorlagen und Best Practices teilen und so eine konsistente Kommunikation in Ihrer Abteilung oder Schule gewÃ¤hrleisten.",

  // Pricing Questions (German)
  "faq.pricing.q1": "Wie viel kostet Zaza Draft?",
  "faq.pricing.a1":
    "Wir bieten flexible PreisplÃ¤ne fÃ¼r einzelne LehrkrÃ¤fte und Schulen. Besuchen Sie unsere Preisseite fÃ¼r aktuelle Tarife und Plandetails. Wir bieten auch eine kostenlose Testversion an, damit Sie Draft vor einer Verpflichtung erleben kÃ¶nnen.",

  "faq.pricing.q2": "Gibt es eine kostenlose Version?",
  "faq.pricing.a2":
    "Wir bieten eine kostenlose Testphase an, damit Sie die volle Leistung von Draft erleben kÃ¶nnen. Nach der Testphase kÃ¶nnen Sie einen Plan wÃ¤hlen, der Ihren BedÃ¼rfnissen und Ihrem Budget entspricht.",

  "faq.pricing.q3": "Bieten Sie Schul- oder Bezirkspreise an?",
  "faq.pricing.a3":
    "Ja! Wir bieten spezielle Preise fÃ¼r Schulen und Bezirke an, einschlieÃŸlich Mengenrabatten, zentralisierter Abrechnung und zusÃ¤tzlicher Funktionen wie Teamzusammenarbeit und Admin-Kontrollen. Kontaktieren Sie unser Vertriebsteam fÃ¼r ein individuelles Angebot.",

  "faq.pricing.q4": "Kann ich jederzeit kÃ¼ndigen?",
  "faq.pricing.a4":
    "Ja. Es gibt keine langfristigen VertrÃ¤ge fÃ¼r individuelle PlÃ¤ne. Sie kÃ¶nnen Ihr Abonnement jederzeit kÃ¼ndigen und behalten den Zugriff bis zum Ende Ihres Abrechnungszeitraums.",

  // Languages Questions (German)
  "faq.languages.q1": "Welche Sprachen unterstÃ¼tzt Draft?",
  "faq.languages.a1":
    "Draft unterstÃ¼tzt Kommunikation in Ã¼ber 20 Sprachen, darunter Spanisch, FranzÃ¶sisch, Deutsch, Mandarin, Arabisch, Portugiesisch und viele mehr. Sie kÃ¶nnen auf Englisch schreiben und in jede unterstÃ¼tzte Sprache Ã¼bersetzen oder direkt in Ihrer bevorzugten Sprache schreiben.",

  "faq.languages.q2": "Wie genau sind die Ãœbersetzungen?",
  "faq.languages.a2":
    "Unsere Ãœbersetzungen sind speziell fÃ¼r pÃ¤dagogische Kontexte kalibriert und bewahren angemessenen Ton und FormalitÃ¤t. WÃ¤hrend wir empfehlen, Ãœbersetzungen fÃ¼r kritische Kommunikation von Muttersprachlern Ã¼berprÃ¼fen zu lassen, sind unsere Ãœbersetzungen sehr genau und kontextuell angemessen.",

  "faq.languages.q3":
    "Kann Draft mir helfen, mit mehrsprachigen Familien zu kommunizieren?",
  "faq.languages.a3":
    "Absolut! Draft macht es einfach, dieselbe Nachricht in mehreren Sprachen zu senden und sicherzustellen, dass alle Familien Kommunikation in ihrer bevorzugten Sprache erhalten. Dies hilft, stÃ¤rkere Schule-Heim-Verbindungen aufzubauen.",

  // Schools Questions (German)
  "faq.schools.q1":
    "Wie funktioniert Zaza Draft fÃ¼r ganze Schulen oder Bezirke?",
  "faq.schools.a1":
    "Unsere Schul- und BezirksplÃ¤ne umfassen zentralisierte Verwaltung, Teamzusammenarbeitsfunktionen, gemeinsame Vorlagen, Nutzungsanalysen, vorrangigen Support und Mengenpreise. Administratoren kÃ¶nnen Lizenzen verwalten, die Nutzung Ã¼berwachen und konsistente Kommunikationsstandards in der gesamten Organisation sicherstellen.",

  "faq.schools.q2": "Bieten Sie Schulungen und Support fÃ¼r Schulen an?",
  "faq.schools.a2":
    "Ja! Schul- und BezirksplÃ¤ne umfassen Onboarding-Support, Schulungsmaterialien und fortlaufende Ressourcen fÃ¼r die berufliche Weiterentwicklung. Wir helfen sicherzustellen, dass Ihr gesamtes Team Draft effektiv nutzen kann, um Zeit zu sparen und die Kommunikation zu verbessern.",

  // FAQ CTA (German)
  "faq.cta.title": "Haben Sie noch Fragen?",
  "faq.cta.subtitle":
    "Unser Support-Team ist hier, um zu helfen. Kontaktieren Sie uns und wir melden uns innerhalb von 24 Stunden bei Ihnen.",
  "faq.cta.button": "Support kontaktieren",

  // About Overview Page (German)
  "about.overview.hero.eyebrow": "ÃœBER ZAZA",
  "about.overview.hero.title": "Die Zukunft der Lehrertechnologie gestalten",
  "about.overview.hero.subtitle":
    "Unsere Mission ist es, LehrkrÃ¤ften ihre Zeit zurÃ¼ckzugeben, indem wir KI-Tools entwickeln, die Bildung wirklich verstehen.",

  "about.overview.mission.title": "Unsere Mission",
  "about.overview.mission.body":
    "Jede Lehrkraft verdient Tools, die ihre Expertise respektieren, ihre SchÃ¼ler schÃ¼tzen und ihnen Zeit geben, das zu tun, was sie am besten kÃ¶nnen: unterrichten. Wir entwickeln KI, die LehrkrÃ¤ften dient, nicht umgekehrt.",

  "about.overview.values.title": "Unsere Werte",
  "about.overview.values.teacherFirst.title": "Lehrkraft-zentriertes Design",
  "about.overview.values.teacherFirst.body":
    "Jede Funktion wird mit echten LehrkrÃ¤ften entwickelt, in echten Klassenzimmern getestet und basierend auf echtem Feedback verfeinert.",
  "about.overview.values.safety.title": "Sicherheit durch Design",
  "about.overview.values.safety.body":
    "Wir entwickeln halluzinationssichere KI, die niemals SchÃ¼lerinformationen erfindet oder Details Ã¼ber Ihre Klasse fabriziert.",
  "about.overview.values.privacy.title": "Datenschutz zuerst",
  "about.overview.values.privacy.body":
    "Von Anfang an FERPA-konform. Ihre Daten gehÃ¶ren Ihnen, und wir verwenden sie niemals zum Trainieren unserer Modelle.",
  "about.overview.values.evidence.title": "Evidenzbasiert",
  "about.overview.values.evidence.body":
    "Basierend auf echter PÃ¤dagogik und Bildungsforschung, nicht auf generischen Business-Schreibmustern.",

  "about.overview.timeline.title": "Unsere Reise",
  "about.overview.timeline.2023.title": "GrÃ¼ndung",
  "about.overview.timeline.2023.body":
    "Begonnen mit einer einfachen Frage: Warum verbringen LehrkrÃ¤fte so viel Zeit mit Schreiben, wenn KI helfen kÃ¶nnte?",
  "about.overview.timeline.2024.title": "Start",
  "about.overview.timeline.2024.body":
    "VerÃ¶ffentlichung von Zaza Draft fÃ¼r Ã¼ber 100 Beta-LehrkrÃ¤fte. Ãœber 50.000 Stunden Schreibzeit gespart.",
  "about.overview.timeline.2025.title": "Wachstum",
  "about.overview.timeline.2025.body":
    "Expansion auf Ã¼ber 500 LehrkrÃ¤fte in 15 LÃ¤ndern. Start von Teach, GradeFlow und Shield.",

  "about.overview.cta.title": "MÃ¶chten Sie mehr erfahren?",
  "about.overview.cta.body":
    "Kontaktieren Sie unser Team, um zu besprechen, wie Zaza Ihrer Schule oder Ihrem Bezirk helfen kann.",
  "about.overview.cta.button": "Kontaktieren Sie uns",

  // About Company Page (German)
  "about.company.hero.eyebrow": "UNSER UNTERNEHMEN",
  "about.company.hero.title": "Zaza Technologies",
  "about.company.hero.subtitle":
    "Wir sind ein Team aus PÃ¤dagogen, Ingenieuren und Designern, die die Zukunft der Lehrertechnologie gestalten.",

  "about.company.body.p1":
    "Zaza Technologies wurde 2023 von LehrkrÃ¤ften gegrÃ¼ndet, die von generischen KI-Tools frustriert waren, die Bildung nicht verstanden. Wir sahen LehrkrÃ¤fte, die Stunden mit administrativen Schreibaufgaben verbrachten, die automatisiert werden kÃ¶nnten, aber bestehende KI-Tools waren entweder unsicher fÃ¼r SchÃ¼lerdaten oder produzierten Ausgaben, die Ã¼berhaupt nicht wie eine Lehrkraft klangen.",

  "about.company.body.p2":
    "Also haben wir etwas anderes entwickelt: KI-Tools, die speziell auf pÃ¤dagogische Kommunikation und PÃ¤dagogik trainiert sind. Tools, die die Nuancen der Eltern-Lehrer-Kommunikation verstehen, die Bedeutung konstruktiven Feedbacks und die Notwendigkeit, Ihre authentische Stimme zu bewahren. Tools, die halluzinationssicher, FERPA-konform und von Grund auf fÃ¼r Bildung entwickelt sind.",

  "about.company.body.p3":
    "Heute dient Zaza Ã¼ber 500 LehrkrÃ¤ften in 15 LÃ¤ndern und spart ihnen Ã¼ber 10 Stunden pro Woche bei Schreibaufgaben. Aber wir fangen gerade erst an. Unsere Vision ist es, eine vollstÃ¤ndige Suite von KI-Tools zu entwickeln, die LehrkrÃ¤ften helfen, ihre Zeit zurÃ¼ckzugewinnen und sich auf das Wichtigste zu konzentrieren: ihre SchÃ¼ler.",

  "about.company.stats.teachers.label": "LehrkrÃ¤fte nutzen Zaza",
  "about.company.stats.teachers.value": "500+",
  "about.company.stats.countries.label": "LÃ¤nder",
  "about.company.stats.countries.value": "15",
  "about.company.stats.timeSaved.label": "WÃ¶chentlich gesparte Stunden",
  "about.company.stats.timeSaved.value": "10+",

  // Founder Hero Section (German)
  "founder.hero.headline":
    "Lernen Sie den GrÃ¼nder kennen, der KI fÃ¼r LehrkrÃ¤fte entwickelt",
  "founder.hero.subheading":
    "Ich habe Ã¼ber zwanzig Jahre im Bereich Lernen und Bildung gearbeitet - an UniversitÃ¤ten, in der Unternehmensbildung und im EdTech-Bereich. Eines war immer wahr: Unterrichten ist menschliche Arbeit.",
  "founder.hero.label": "GRÃœNDER & CEO",
  "founder.hero.name": "Dr. Greg Blackburn",
  "founder.hero.tagline":
    "GrÃ¼nder & CEO, Lernwissenschaftler, Lehrer-BefÃ¼rworter",

  // Founder Journey Section (German)
  "founder.journey.title": "Meine Reise in der Bildung",
  "founder.journey.p1":
    "WÃ¤hrend meiner Promotion in BerufspÃ¤dagogik habe ich mich darauf konzentriert, wie Lernende kritisches Denken und ProblemlÃ¶sung in realen Umgebungen entwickeln. Ich habe gesehen, wie Technologie das Lernen unterstÃ¼tzen kann, wenn sie richtig eingesetzt wird. Ich habe aber auch gesehen, wie leicht sie Stress verursachen, Zeit verschwenden oder gegen das arbeiten kann, was PÃ¤dagogen erreichen wollen.",
  "founder.journey.p2":
    "Als Chief Learning Officer bei Communardo leite ich Arbeiten im Bereich KI-gestÃ¼tztes Lerndesign, digitale Inhaltsentwicklung, LMS-Innovation und Lehrerfortbildung. Ich habe viel Ã¼ber Lernwissenschaft, eLearning-Strategie und die Rolle von KI in der Bildung geschrieben und gesprochen.",
  "founder.journey.p3":
    "Aber hier ist die Wahrheit: Die meisten EdTech-Tools sind nicht fÃ¼r LehrkrÃ¤fte gebaut. Sie sind fÃ¼r VerkaufsgesprÃ¤che gebaut.",
  "founder.journey.p4":
    "Ich habe beobachtet, wie Technologie als 'revolutionÃ¤r' verkauft wurde, nur um zu einem weiteren System zu werden, das LehrkrÃ¤fte verwalten mÃ¼ssen. Ich habe KI-Produkte gesehen, die Inhalte generieren, die auf den ersten Blick beeindruckend aussehen - aber zusammenbrechen, sobald eine Lehrkraft versucht, sie mit echten SchÃ¼lern zu verwenden.",
  "founder.journey.p5": "Deshalb habe ich Zaza gebaut.",

  // Founder Principle Section (German)
  "founder.principle.title": "Das Prinzip hinter allem, was wir entwickeln",
  "founder.principle.question": "Gibt dies LehrkrÃ¤ften wertvolle Zeit zurÃ¼ck?",
  "founder.principle.not1": "Nicht 'Ist das clever?'",
  "founder.principle.not2": "Nicht 'LÃ¤sst sich das gut demonstrieren?'",
  "founder.principle.not3": "Nicht 'Sieht das gut in einer Roadmap aus?'",
  "founder.principle.answer": "Zeit.",
  "founder.principle.rule":
    "Wenn ein Tool die Arbeitsbelastung in einer echten Schulumgebung nicht reduzieren kann, gehÃ¶rt es nicht in Zaza.",

  // Founder Commitments Section (German)
  "founder.commitments.title": "Meine Verpflichtungen gegenÃ¼ber LehrkrÃ¤ften",
  "founder.commitments.item1.title": "Keine Halluzinationen.",
  "founder.commitments.item1.body":
    "Wenn KI-Ausgaben nicht vertrauenswÃ¼rdig sind, leisten LehrkrÃ¤fte am Ende mehr Arbeit bei der ÃœberprÃ¼fung und Korrektur. Deshalb entwickeln wir fÃ¼r Genauigkeit, Klarheit und KlassenzimmerrealitÃ¤t.",
  "founder.commitments.item2.title":
    "Arbeitsbelastung reduzieren, nicht verlagern.",
  "founder.commitments.item2.body":
    "Ein Tool, das Schulungen, HandbÃ¼cher und komplexe ArbeitsablÃ¤ufe erfordert, ist keine UnterstÃ¼tzung. Es ist umbenannte Arbeit.",
  "founder.commitments.item3.title": "Professionelle Expertise respektieren.",
  "founder.commitments.item3.body":
    "Sie brauchen keine Technologie, die Ihr UrteilsvermÃ¶gen ersetzt. Sie brauchen Technologie, die es verstÃ¤rkt.",
  "founder.commitments.closing":
    "Unterrichten ist unglaublich komplexe, intellektuell anspruchsvolle Arbeit. Es ist auch emotional belastende Arbeit. Gute Tools sollten diese Last erleichtern.",

  // Founder Why Zaza Section (German)
  "founder.whyZaza.title": "Warum es Zaza gibt",
  "founder.whyZaza.p1":
    "Zaza versucht nicht, 'Bildung zu disruptieren.' LehrkrÃ¤fte brauchen keine Disruption. Sie brauchen UnterstÃ¼tzung. Sie brauchen Zeit. Sie brauchen Tools, die den Wert ihrer Erfahrung anerkennen - anstatt zu versuchen, sie zu standardisieren oder zu ersetzen.",
  "founder.whyZaza.p2":
    "Die Arbeit, die LehrkrÃ¤fte leisten, ist wichtig. Und das Beste, was Technologie tun kann, ist zu helfen, die Zeit, Energie und FÃ¼rsorge zu schÃ¼tzen, die erforderlich sind, um diese Arbeit gut zu machen.",
  "founder.whyZaza.p3":
    "Wenn das die Art von Zukunft fÃ¼r Bildung ist, an die Sie glauben, sind Sie hier richtig.",

  // Founder Closing (German)
  "founder.closing.name": "Greg",
  "founder.closing.title": "Dr. Greg Blackburn",
  "founder.closing.role": "GrÃ¼nder & CEO, Zaza Technologies",
  "founder.personal.cta": "Kontakt aufnehmen",

  // Additional Founder Keys (German - for page compatibility)
  "founder.journey.quote":
    "Ich habe Zaza entwickelt, weil ich es satt hatte, LehrkrÃ¤fte in administrativer Arbeit ertrinken zu sehen, wenn Technologie sie befreien sollte.",
  "founder.mission.quote":
    "Jede Lehrkraft verdient Tools, die ihre Expertise respektieren, ihre SchÃ¼ler schÃ¼tzen und ihnen Zeit geben, das zu tun, was sie am besten kÃ¶nnen: unterrichten.",
  "founder.mission.attribution": "Dr. Greg Blackburn, GrÃ¼nder & CEO",
  "founder.whyZaza.subtitle": "Drei Prinzipien, die alles leiten, was wir tun",
  "founder.whyZaza.card1.title": "FÃ¼r LehrkrÃ¤fte, mit LehrkrÃ¤ften",
  "founder.whyZaza.card1.body":
    "Ich habe meine Karriere damit verbracht, mit LehrkrÃ¤ften und Lerndesignern zusammenzuarbeiten - Tools direkt mit PÃ¤dagogen zu verfeinern, die die RealitÃ¤t von Klassenzimmern verstehen. Jede Funktion in Zaza wird durch echtes Feedback und echte Praxis geformt, nicht durch Theorie.",
  "founder.whyZaza.card2.title": "Boutique, nicht Big Tech",
  "founder.whyZaza.card2.body":
    "Wir sind kein riesiges Unternehmen, das an jeden verkaufen will. Wir sind ein fokussiertes Team, das spezialisierte Tools fÃ¼r ein Publikum entwickelt: LehrkrÃ¤fte. Ihre BedÃ¼rfnisse stehen immer an erster Stelle.",
  "founder.whyZaza.card3.title": "Ein VermÃ¤chtnis aufbauen",
  "founder.whyZaza.card3.body":
    "Es geht nicht um schnelle Gewinne. Es geht darum, etwas zu schaffen, das LehrkrÃ¤ften wirklich hilft zu gedeihen und Bildung zum Besseren verÃ¤ndert. Das ist das VermÃ¤chtnis, das ich hinterlassen mÃ¶chte.",
  // Founder Personal Message Section (German)
  "founder.personal.title": "Eine persÃ¶nliche Notiz",
  "founder.personal.message1":
    "Wenn Sie dies lesen, sind Sie wahrscheinlich eine Lehrkraft, die neugierig auf KI ist, aber skeptisch, ob sie wirklich helfen kann. Ich verstehe das. Ich war auch skeptisch. Die meisten KI-Tools fÃ¼hlen sich an, als wÃ¤ren sie von Menschen entwickelt worden, die nie einen FuÃŸ in ein Klassenzimmer gesetzt haben.",
  "founder.personal.message2":
    "Deshalb habe ich Zaza anders entwickelt. Jede Funktion wird mit echten LehrkrÃ¤ften entwickelt, in echten Klassenzimmern getestet und basierend auf echtem Feedback verfeinert. Wir entwickeln nicht nur Software - wir bauen Partnerschaften mit PÃ¤dagogen auf, die uns helfen, Tools zu erstellen, die wirklich funktionieren.",
  "founder.personal.message3":
    "Ich wÃ¼rde gerne von Ihnen hÃ¶ren. Ob Sie Fragen, Feedback haben oder einfach nur Ã¼ber Bildung und Technologie sprechen mÃ¶chten, meine TÃ¼r steht immer offen. Lassen Sie uns gemeinsam die Zukunft der Lehrertechnologie gestalten.",
  "founder.personal.name": "",
  "founder.personal.title2": "Dr. Greg Blackburn",
  "founder.personal.company": "Zaza Technologies",
  // Contact Page (German)
  "contact.title": "Kontakt aufnehmen",
  "contact.subtitle":
    "Haben Sie Fragen? MÃ¶chten Sie mehr erfahren? Wir freuen uns, von Ihnen zu hÃ¶ren.",
  "contact.form.name": "Ihr Name",
  "contact.form.email": "Ihre E-Mail",
  "contact.form.message": "Ihre Nachricht",
  "contact.form.placeholder": "Sagen Sie uns, wie wir helfen kÃ¶nnen...",
  "contact.form.submit": "Nachricht senden",
  "contact.form.dataNote":
    "Wir respektieren Ihre PrivatsphÃ¤re. Ihre Informationen werden niemals weitergegeben.",
  "contact.direct.title": "Direkter Kontakt",
  "contact.direct.email": "E-Mail an uns",
  "contact.direct.response":
    "Wir antworten normalerweise innerhalb von 24 Stunden",
  "contact.help.title": "Brauchen Sie Hilfe?",
  "contact.help.description":
    "Schauen Sie sich unsere hilfreichen Ressourcen an",
  "contact.help.faq": "â†’ HÃ¤ufig gestellte Fragen",
  "contact.help.support": "â†’ Support-Center",
  "glossary.title": "KI-Glossar fÃ¼r LehrkrÃ¤fte",
  "glossary.subtitle":
    "Ãœber 150 KI-Begriffe in leicht verstÃ¤ndlicher Sprache erklÃ¤rt. Nach Kategorie oder alphabetisch suchen, um KI-Konzepte fÃ¼r den Bildungsbereich zu verstehen.",
  "integrations.title": "Verbinden Sie Ihre Lieblingstools",
  "integrations.subtitle":
    "Integrieren Sie Zaza Draft nahtlos in Ihren vorhandenen Stack.",
  "aiLiteracy.title": "KI fÃ¼r Bildung meistern",
  "aiLiteracy.subtitle":
    "Bauen Sie Ihre KI-Expertise mit umfassenden Kursen auf, die Ihnen helfen, KI in Ihren Unterricht zu integrieren.",

  "aiLiteracy.courses": "Kurse",
  "aiLiteracy.educators": "PÃ¤dagogen",
  "aiLiteracy.certified": "Zertifiziert",
  "aiLiteracy.hoursSaved": "Gesparte Stunden",
  "aiLiteracy.pathsTitle": "WÃ¤hlen Sie Ihren Lernpfad",
  "aiLiteracy.pathsSubtitle":
    "Strukturierte Lernpfade fÃ¼r LehrkrÃ¤fte in jeder Phase ihrer KI-Reise",
  "aiLiteracy.beginnerTitle": "Einsteiger-Pfad",
  "aiLiteracy.beginnerDesc": "Perfekt fÃ¼r LehrkrÃ¤fte, die neu in der KI sind",
  "aiLiteracy.intermediateTitle": "Fortgeschrittenen-Pfad",
  "aiLiteracy.intermediateDesc":
    "FÃ¼r LehrkrÃ¤fte mit grundlegenden KI-Kenntnissen",
  "aiLiteracy.advancedTitle": "Experten-Pfad",
  "aiLiteracy.advancedDesc":
    "Tiefes Eintauchen in fortgeschrittene KI-Konzepte",
  "aiLiteracy.coursesTitle": "Alle Kurse",
  "aiLiteracy.coursesSubtitle":
    "Vom GrundverstÃ¤ndnis bis zur Meisterschaft - strukturierte Lernpfade fÃ¼r jeden Lehrertyp",
  "aiLiteracy.certificationTitle": "KI-Bildungszertifizierung",
  "aiLiteracy.certificationSubtitle":
    "Erwerben Sie anerkannte Qualifikationen, die Ihre KI-Kompetenz und pÃ¤dagogische Expertise nachweisen",
  "aiLiteracy.benefit1": "Zeigen Sie Ihre Expertise Schulleitungen",
  "aiLiteracy.benefit2": "Heben Sie sich bei Bewerbungen und BefÃ¶rderungen ab",
  "aiLiteracy.benefit3":
    "Vernetzen Sie sich mit Ã¼ber 13.000 zertifizierten KI-PÃ¤dagogen weltweit",
  "aiLiteracy.libraryTitle": "Herunterladbare Ressourcenbibliothek",
  "aiLiteracy.librarySubtitle":
    "Sofort einsetzbare Vorlagen, Checklisten und LeitfÃ¤den zur Beschleunigung Ihrer KI-EinfÃ¼hrung",
  "aiLiteracy.testimonialsTitle": "Was LehrkrÃ¤fte sagen",
  "aiLiteracy.testimonialsSubtitle":
    "Echtes Feedback von PÃ¤dagogen, die unsere KI-Kompetenzkurse abgeschlossen haben",
  "aiLiteracy.ctaTitle": "Beginnen Sie Ihre KI-Reise",
  "aiLiteracy.ctaSubtitle":
    "Beginnen Sie noch heute Ihre Zertifizierungsreise. Alle Kurse und Bewertungen sind vÃ¶llig kostenlos",
  "aiLiteracy.ctaButton": "Kostenlosen Kurs beginnen",
  "aiLiteracy.ctaSecondary": "GefÃ¼hrte Tour",
  "aiLiteracy.courses": "Kurse",
  "aiLiteracy.educators": "PÃ¤dagogen",
  "aiLiteracy.certified": "Zertifiziert",
  "aiLiteracy.hoursSaved": "Gesparte Stunden",
  "aiLiteracy.pathsTitle": "WÃ¤hlen Sie Ihren Lernpfad",
  "aiLiteracy.pathsSubtitle":
    "Strukturierte Lernpfade fÃ¼r LehrkrÃ¤fte in jeder Phase ihrer KI-Reise",
  "aiLiteracy.beginnerTitle": "Einsteiger-Pfad",
  "aiLiteracy.beginnerDesc": "Perfekt fÃ¼r LehrkrÃ¤fte, die neu in der KI sind",
  "aiLiteracy.intermediateTitle": "Fortgeschrittenen-Pfad",
  "aiLiteracy.intermediateDesc":
    "FÃ¼r LehrkrÃ¤fte mit grundlegenden KI-Kenntnissen",
  "aiLiteracy.advancedTitle": "Experten-Pfad",
  "aiLiteracy.advancedDesc":
    "Tiefes Eintauchen in fortgeschrittene KI-Konzepte",
  "aiLiteracy.coursesTitle": "Alle Kurse",
  "aiLiteracy.coursesSubtitle":
    "Vom GrundverstÃ¤ndnis bis zur Meisterschaft - strukturierte Lernpfade fÃ¼r jeden Lehrertyp",
  "aiLiteracy.certificationTitle": "KI-Bildungszertifizierung",
  "aiLiteracy.certificationSubtitle":
    "Erwerben Sie anerkannte Qualifikationen, die Ihre KI-Kompetenz und pÃ¤dagogische Expertise nachweisen",
  "aiLiteracy.benefit1": "Zeigen Sie Ihre Expertise Schulleitungen",
  "aiLiteracy.benefit2": "Heben Sie sich bei Bewerbungen und BefÃ¶rderungen ab",
  "aiLiteracy.benefit3":
    "Vernetzen Sie sich mit Ã¼ber 13.000 zertifizierten KI-PÃ¤dagogen weltweit",
  "aiLiteracy.libraryTitle": "Herunterladbare Ressourcenbibliothek",
  "aiLiteracy.librarySubtitle":
    "Sofort einsetzbare Vorlagen, Checklisten und LeitfÃ¤den zur Beschleunigung Ihrer KI-EinfÃ¼hrung",
  "aiLiteracy.testimonialsTitle": "Was LehrkrÃ¤fte sagen",
  "aiLiteracy.testimonialsSubtitle":
    "Echtes Feedback von PÃ¤dagogen, die unsere KI-Kompetenzkurse abgeschlossen haben",
  "aiLiteracy.ctaTitle": "Beginnen Sie Ihre KI-Reise",
  "aiLiteracy.ctaSubtitle":
    "Beginnen Sie noch heute Ihre Zertifizierungsreise. Alle Kurse und Bewertungen sind vÃ¶llig kostenlos",
  "aiLiteracy.ctaButton": "Kostenlosen Kurs beginnen",
  "aiLiteracy.ctaSecondary": "GefÃ¼hrte Tour",
  "bestAiWriting.title":
    "Die 10 besten KI-Schreibwerkzeuge fÃ¼r LehrkrÃ¤fte 2025",
  "bestAiWriting.subtitle":
    "Vergleichen Sie die besten KI-Tools fÃ¼r LehrkrÃ¤fte - von Elternkommunikation bis Unterrichtsplanung.",
  "reduceStress.title":
    "Wie Sie Stress durch Elternnachrichten reduzieren (ohne sie zu ignorieren)",
  "reduceStress.subtitle":
    "Professionelle Strategien fÃ¼r den Umgang mit Elternkommunikation bei gleichzeitigem Schutz Ihres Wohlbefindens.",
  "bestAiTool.title": "Das beste KI-Tool fÃ¼r professionelle Eltern-E-Mails",
  "bestAiTool.subtitle":
    "Entdecken Sie, warum LehrkrÃ¤fte Zaza Draft fÃ¼r professionelle Elternkommunikation wÃ¤hlen.",
  "aiStudentReports.title":
    "KI fÃ¼r SchÃ¼lerberichte und Zeugnisse: VollstÃ¤ndiger Leitfaden fÃ¼r LehrkrÃ¤fte",
  "aiStudentReports.subtitle":
    "Sparen Sie Stunden bei Zeugnissen und bewahren Sie gleichzeitig Personalisierung und QualitÃ¤t.",
  "successStories.title":
    "Sehen Sie, wie LehrkrÃ¤fte und Schulen die Kommunikation mit Zaza Draft transformieren",
  "successStories.subtitle":
    "Echte Ergebnisse von PÃ¤dagogen, die KI-gestÃ¼tzte Schreibwerkzeuge verwenden.",
  "roiCalculator.title": "Berechnen Sie Ihre Zeitersparnis mit Zaza Draft",
  "roiCalculator.subtitle":
    "Sehen Sie genau, wie viele Stunden pro Woche Sie bei der Elternkommunikation sparen kÃ¶nnten.",

  // Company page
  "company.hero.label": "UNSER UNTERNEHMEN",
  "company.hero.headline": "Zaza Technologies",
  "company.hero.subheading":
    "Wir sind ein kleines, spezialisiertes Team aus Lerndesignern, Ingenieuren und Bildungsforschern, die Technologie entwickeln, die LehrkrÃ¤ften hilft, erfolgreich zu sein.",
  "company.origin.p1":
    "Zaza Technologies wurde 2025 mit einer klaren Ãœberzeugung gegrÃ¼ndet: Bildung verdient KI-Tools, die mit echtem pÃ¤dagogischem VerstÃ¤ndnis entwickelt wurden, nicht umfunktionierte Unternehmens-KI-Modelle. Wir entwickeln Technologie, die das Wohlbefinden von LehrkrÃ¤ften schÃ¼tzt.",
  "company.origin.p2": "Deshalb haben wir einen anderen Ansatz gewÃ¤hlt.",
  "company.origin.p3":
    "Wir entwickeln Tools, die auf echter PÃ¤dagogik trainiert, mit PÃ¤dagogen entwickelt und durch Klassenzimmereinsatz verfeinert werden. Tools, die die Nuancen des Lehrerurteils, das emotionale Gewicht der Elterninteraktion und die Bedeutung konstruktiven Feedbacks verstehen. Tools, die fÃ¼r Bildungsumgebungen prÃ¤zise, zuverlÃ¤ssig und sicher sind.",
  "company.origin.aiDifferentiator":
    "Unsere Modelle werden anhand echten Lehrer-Feedbacks und Klassenzimmer-Sprachmustern trainiert, durch iterative Tests mit PÃ¤dagogen verfeinert und so konzipiert, dass die Ausgabe wie eine Lehrkraft klingt - nicht wie eine Maschine.",
  "company.origin.p4":
    "Unser Ziel ist einfach: LehrkrÃ¤ften bedeutungsvolle Zeit zurÃ¼ckgeben.",
  "company.philosophy.title": "Unsere Philosophie",
  "company.philosophy.intro":
    'Wir glauben nicht an "KI, die LehrkrÃ¤fte ersetzt". Wir glauben an KI, die LehrkrÃ¤fte unterstÃ¼tzt.',
  "company.philosophy.principle1":
    "Tools mÃ¼ssen die Expertise von LehrkrÃ¤ften respektieren.",
  "company.philosophy.principle2":
    "Tools mÃ¼ssen Arbeitsbelastung reduzieren, nicht verschieben.",
  "company.philosophy.principle3":
    "Tools mÃ¼ssen SchÃ¼ler und ihre Lernumgebung schÃ¼tzen.",
  "company.philosophy.principle4":
    "Tools mÃ¼ssen vertrauenswÃ¼rdig und transparent sein.",
  "company.philosophy.closing":
    "Wenn Technologie LehrkrÃ¤ften nicht dabei helfen kann, das zu tun, was sie am besten kÃ¶nnen - unterrichten - dann gehÃ¶rt sie nicht ins Klassenzimmer.",
  "company.boutique.title": "Ein Boutique-Ansatz",
  "company.boutique.intro":
    "Wir sind absichtlich kein groÃŸes Technologieunternehmen. Wir sind ein fokussiertes Team, das nur fÃ¼r ein Publikum entwickelt - LehrkrÃ¤fte.",
  "company.boutique.means": "Das bedeutet:",
  "company.boutique.point1":
    "Wir arbeiten eng mit PÃ¤dagogen aus mehreren Regionen und Kontexten zusammen.",
  "company.boutique.point2":
    "Wir testen Funktionen direkt in echten Klassenzimmern.",
  "company.boutique.point3":
    "Wir priorisieren Klarheit, Sicherheit und Benutzerfreundlichkeit Ã¼ber Neuheit.",
  "company.boutique.closing":
    "Wir optimieren nicht fÃ¼r schnelles Wachstum. Wir optimieren fÃ¼r das, was funktioniert.",
  "company.boutique.impact": "Wachstum ist nicht das Ziel. Wirkung ist es.",
  "company.today.title": "Wo wir heute stehen",
  "company.today.p1":
    "Zaza unterstÃ¼tzt jetzt Ã¼ber 500 LehrkrÃ¤fte in mehr als 15 LÃ¤ndern. Im Durchschnitt sparen LehrkrÃ¤fte Ã¼ber 10 Stunden pro Woche bei Schreib- und Kommunikationsaufgaben durch die Nutzung der Tools von Zaza. Und wir fangen gerade erst an.",
  "company.today.p2":
    "Unsere langfristige Vision ist es, eine vollstÃ¤ndige Suite von KI-Tools zu entwickeln, die LehrkrÃ¤ften helfen, ihre Zeit zurÃ¼ckzugewinnen, ihr Wohlbefinden zu schÃ¼tzen und mit dem Kern ihrer Arbeit verbunden zu bleiben - ihren SchÃ¼lern.",
  "company.today.close": "Denn wenn LehrkrÃ¤fte gedeihen, gedeihen SchÃ¼ler.",
  "company.stats.teachers.number": "150k+",
  "company.stats.teachers.label": "LehrkrÃ¤fte nutzen Zaza",
  "company.stats.countries.number": "15",
  "company.stats.countries.label": "LÃ¤nder",
  "company.stats.hours.number": "10+",
  "company.stats.hours.label": "WÃ¶chentlich gesparte Stunden",

  // Company page
  "company.hero.label": "UNSER UNTERNEHMEN",
  "company.hero.headline": "Zaza Technologies",
  "company.hero.subheading":
    "Wir sind ein kleines, spezialisiertes Team aus Lerndesignern, Ingenieuren und Bildungsforschern, die Technologie entwickeln, die LehrkrÃ¤ften hilft, erfolgreich zu sein.",
  "company.origin.p1":
    "Zaza Technologies wurde 2025 mit einer klaren Ãœberzeugung gegrÃ¼ndet: Bildung verdient KI-Tools, die mit echtem pÃ¤dagogischem VerstÃ¤ndnis entwickelt wurden, nicht umfunktionierte Unternehmens-KI-Modelle. Wir entwickeln Technologie, die das Wohlbefinden von LehrkrÃ¤ften schÃ¼tzt.",
  "company.origin.p2": "Deshalb haben wir einen anderen Ansatz gewÃ¤hlt.",
  "company.origin.p3":
    "Wir entwickeln Tools, die auf echter PÃ¤dagogik trainiert, mit PÃ¤dagogen entwickelt und durch Klassenzimmereinsatz verfeinert werden. Tools, die die Nuancen des Lehrerurteils, das emotionale Gewicht der Elterninteraktion und die Bedeutung konstruktiven Feedbacks verstehen. Tools, die fÃ¼r Bildungsumgebungen prÃ¤zise, zuverlÃ¤ssig und sicher sind.",
  "company.origin.aiDifferentiator":
    "Unsere Modelle werden anhand echten Lehrer-Feedbacks und Klassenzimmer-Sprachmustern trainiert, durch iterative Tests mit PÃ¤dagogen verfeinert und so konzipiert, dass die Ausgabe wie eine Lehrkraft klingt - nicht wie eine Maschine.",
  "company.origin.p4":
    "Unser Ziel ist einfach: LehrkrÃ¤ften bedeutungsvolle Zeit zurÃ¼ckgeben.",
  "company.philosophy.title": "Unsere Philosophie",
  "company.philosophy.intro":
    'Wir glauben nicht an "KI, die LehrkrÃ¤fte ersetzt". Wir glauben an KI, die LehrkrÃ¤fte unterstÃ¼tzt.',
  "company.philosophy.principle1":
    "Tools mÃ¼ssen die Expertise von LehrkrÃ¤ften respektieren.",
  "company.philosophy.principle2":
    "Tools mÃ¼ssen Arbeitsbelastung reduzieren, nicht verschieben.",
  "company.philosophy.principle3":
    "Tools mÃ¼ssen SchÃ¼ler und ihre Lernumgebung schÃ¼tzen.",
  "company.philosophy.principle4":
    "Tools mÃ¼ssen vertrauenswÃ¼rdig und transparent sein.",
  "company.philosophy.closing":
    "Wenn Technologie LehrkrÃ¤ften nicht dabei helfen kann, das zu tun, was sie am besten kÃ¶nnen - unterrichten - dann gehÃ¶rt sie nicht ins Klassenzimmer.",
  "company.boutique.title": "Ein Boutique-Ansatz",
  "company.boutique.intro":
    "Wir sind absichtlich kein groÃŸes Technologieunternehmen. Wir sind ein fokussiertes Team, das nur fÃ¼r ein Publikum entwickelt - LehrkrÃ¤fte.",
  "company.boutique.means": "Das bedeutet:",
  "company.boutique.point1":
    "Wir arbeiten eng mit PÃ¤dagogen aus mehreren Regionen und Kontexten zusammen.",
  "company.boutique.point2":
    "Wir testen Funktionen direkt in echten Klassenzimmern.",
  "company.boutique.point3":
    "Wir priorisieren Klarheit, Sicherheit und Benutzerfreundlichkeit Ã¼ber Neuheit.",
  "company.boutique.closing":
    "Wir optimieren nicht fÃ¼r schnelles Wachstum. Wir optimieren fÃ¼r das, was funktioniert.",
  "company.boutique.impact": "Wachstum ist nicht das Ziel. Wirkung ist es.",
  "company.today.title": "Wo wir heute stehen",
  "company.today.p1":
    "Zaza unterstÃ¼tzt jetzt Ã¼ber 500 LehrkrÃ¤fte in mehr als 15 LÃ¤ndern. Im Durchschnitt sparen LehrkrÃ¤fte Ã¼ber 10 Stunden pro Woche bei Schreib- und Kommunikationsaufgaben durch die Nutzung der Tools von Zaza. Und wir fangen gerade erst an.",
  "company.today.p2":
    "Unsere langfristige Vision ist es, eine vollstÃ¤ndige Suite von KI-Tools zu entwickeln, die LehrkrÃ¤ften helfen, ihre Zeit zurÃ¼ckzugewinnen, ihr Wohlbefinden zu schÃ¼tzen und mit dem Kern ihrer Arbeit verbunden zu bleiben - ihren SchÃ¼lern.",
  "company.today.close": "Denn wenn LehrkrÃ¤fte gedeihen, gedeihen SchÃ¼ler.",
  "company.stats.teachers.number": "150k+",
  "company.stats.teachers.label": "LehrkrÃ¤fte nutzen Zaza",
  "company.stats.countries.number": "15",
  "company.stats.countries.label": "LÃ¤nder",
  "company.stats.hours.number": "10+",
  "company.stats.hours.label": "WÃ¶chentlich gesparte Stunden",

  // AI Literacy Page
  "aiLiteracy.hero.badge": "25.000+ aktive Lernende",
  "aiLiteracy.hero.title": "Meistern Sie KI fÃ¼r die Bildung",
  "aiLiteracy.hero.subtitle":
    "Bauen Sie Ihre KI-Expertise mit umsetzbaren Kursen auf, die Ihnen Zeit sparen und Ihren Unterricht verbessern.",
  "aiLiteracy.hero.ctaBrowse": "Kurse durchsuchen",
  "aiLiteracy.hero.ctaCert": "Zertifizieren lassen",
  "aiLiteracy.stats.courses": "Kostenlose Kurse",
  "aiLiteracy.stats.teachers": "LehrkrÃ¤fte eingeschrieben",
  "aiLiteracy.stats.certified": "Zertifizierte PÃ¤dagogen",
  "aiLiteracy.stats.hours": "Gesparte Stunden",
  "aiLiteracy.paths.title": "WÃ¤hlen Sie Ihren Lernpfad",
  "aiLiteracy.paths.subtitle":
    "Strukturierte Lernpfade fÃ¼r LehrkrÃ¤fte auf jeder Stufe ihrer KI-Reise",
  "aiLiteracy.testimonials.title": "Was LehrkrÃ¤fte sagen",
  "aiLiteracy.library.title": "Herunterladbare Ressourcenbibliothek",
  "aiLiteracy.certification.title": "KI-Bildungszertifizierung",
  "aiLiteracy.continue.title": "Setzen Sie Ihre KI-Reise fort",
  "videos.hero.title": "Video-Tutorials und Demos",
  "videos.hero.subtitle":
    "Sehen Sie sich Schritt-fÃ¼r-Schritt-Tutorials und Produktdemos an, um KI-gestÃ¼tzte Elternkommunikation zu meistern.",
  "videos.search.placeholder": "Videos durchsuchen...",
  "videos.featured.title": "Empfohlene Videos",
  "videos.playlists.title": "Kuratierte Playlists",
  "videos.all.title": "Alle Videos",
  "glossary.hero.title": "KI-Glossar fÃ¼r LehrkrÃ¤fte",
  "glossary.hero.subtitle": "Ãœber 150+ KI-Begriffe in einfacher Sprache.",
  "glossary.search.placeholder": "Begriffe durchsuchen...",
  "community.hero.badge": "15.000+ aktive Mitglieder",
  "community.hero.titlePrefix": "Treten Sie der",
  "community.hero.titleHighlight": "LehrkrÃ¤fte-Community",
  "community.hero.subtitle": "Vernetzen Sie sich mit LehrkrÃ¤ften weltweit.",
  "community.categoriesTitle": "Diskussionskategorien",
  "cta.learnMore": "Mehr erfahren",
  "cta.getStarted": "Jetzt starten",
  ctaBrowse: "Kurse durchsuchen",
  ctaCert: "Zertifizieren lassen",
  trending: "Aktuelle Diskussionen",
  // AI Literacy page - missing keys
  "aiLiteracy.badge": "Kostenlose KI-Bildung fÃ¼r LehrkrÃ¤fte",
  "aiLiteracy.allCourses": "Alle Kurse",
  "aiLiteracy.allCoursesSubtitle":
    "Von grundlegendem VerstÃ¤ndnis bis zur Meisterschaft",

  // Videos
  "videos.featured": "Empfohlene Videos",
  "videos.playlists": "Kuratierte Playlists",
  "videos.all": "Alle Videos",

  // Glossary
  "glossary.ctaExploreCourses": "KI-Kurse erkunden",

  // Common CTAs
  "common.learnMore": "Mehr erfahren",
  "common.exploreMore": "Mehr erkunden",
};

const translationsEs: Record<string, string> = {};

const translationsFr: Record<string, string> = {};

const translationsIt: Record<string, string> = {};

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: "en" | "de";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with 'en' for both server and client (prevents hydration mismatch)
  const [language, setLanguage] = useState<Language>("en");

  // Update from cookie after hydration
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const langCookie = cookies.find((c) => c.trim().startsWith("lang="));
    if (langCookie) {
      const lang = langCookie.split("=")[1].trim();
      if (
        lang === "de" ||
        lang === "en" ||
        lang === "es" ||
        lang === "fr" ||
        lang === "it"
      ) {
        setLanguage(lang as Language);
      }
    }
  }, []);

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
