"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { detectLocaleFromPath, toLocalePath } from "@/lib/i18n/locale-routing";

type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translationsEn: Record<string, string> = {
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
  "pricing.free.cta": "Join Early Access",
  "pricing.free.feature1": "5 drafts/month",
  "pricing.free.feature2": "Basic templates",
  "pricing.free.feature3": "Save & copy",
  "pricing.free.feature4": "Community support",

  // Teacher (Premium) Plan
  "pricing.teacher.badge": "MOST POPULAR",
  "pricing.teacher.title": "Teacher",
  "pricing.teacher.description":
    "Unlimited writing support with no invented student facts and no lock-ins.",
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
  "pricing.department.perTeacher": " per teacher",
  "pricing.department.billing": "Billed annually • 5-50 seats",
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
  "pricing.checkout.buyNow": "Upgrade now",
  "pricing.compare.title": "Compare: Zaza vs ChatGPT",
  "pricing.compare.caption":
    "ChatGPT is brilliant – but it wasn’t built for your classroom. Zaza Draft is.",
  "pricing.compare.column.generic": "Generic AI (e.g. ChatGPT)",
  "pricing.compare.column.zaza": "Zaza Draft",
  "pricing.compare.footer":
    "ChatGPT is brilliant – but it wasn’t built for your classroom. Zaza Draft is.",
  "pricing.compare.rows.purpose.feature": "Purpose",
  "pricing.compare.rows.purpose.generic":
    "General-purpose chatbot – not built for schools.",
  "pricing.compare.rows.purpose.zaza":
    "Purpose-built for teacher communication and report comments.",
  "pricing.compare.rows.tone.feature": "Tone & guardrails",
  "pricing.compare.rows.tone.generic":
    "No built-in school tone guardrails – you must prompt carefully.",
  "pricing.compare.rows.tone.zaza":
    "Tone presets for parents, reports, grading – with safety rails.",
  "pricing.compare.rows.privacy.feature": "Student privacy",
  "pricing.compare.rows.privacy.generic":
    "Risk of entering identifiable student data into generic systems.",
  "pricing.compare.rows.privacy.zaza":
    "Designed for privacy – no student names required, GDPR-focused policy.",
  "pricing.compare.rows.templates.feature": "Teacher-specific templates",
  "pricing.compare.rows.templates.generic":
    "No native report/parent templates; everything is manual.",
  "pricing.compare.rows.templates.zaza":
    "Templates for behaviour, praise, homework, attendance, reports, more.",
  "pricing.compare.rows.workload.feature": "Workload reduction",
  "pricing.compare.rows.workload.generic":
    "Helpful but inconsistent; you still spend time rewriting.",
  "pricing.compare.rows.workload.zaza":
    "Optimised for fast, classroom-ready drafts you can tweak in seconds.",
  "pricing.compare.rows.cost.feature": "Cost for teachers",
  "pricing.compare.rows.cost.generic":
    "Generic pricing – not optimised for teacher budgets.",
  "pricing.compare.rows.cost.zaza":
    "Transparent teacher plans, free tier plus affordable monthly options.",

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
    "Start free today • No credit card required • Cancel anytime",
  "pricing.cta.primary": "Join Early Access",
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

  // Forms & modal
  "form.name": "Name",
  "form.email": "Email",
  "form.consent": "I agree to the privacy policy.",
  "form.privacyLink": "Privacy policy",
  "form.submit": "Get started free",
  "form.success": "Check your inbox",
  "form.error": "Something went wrong. Please try again.",
  "form.consentRequired": "Please accept the privacy policy to continue.",
  "form.trialCopy": "Try 5 comments for free",
  "form.placeholder.name": "Your name",
  "form.placeholder.email": "you@example.com",
  "form.submitting": "Submitting...",
  "form.close": "Close",
  "form.successNote":
    "We’ve sent your resource. If it doesn’t arrive, check your spam or write us.",

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
  "resources.subtitle": "Time-savers you can use today. Download as PDF.",
  "resources.search.placeholder": "Search resources...",
  "resources.download": "Download",
  "resources.downloadCta": "Download Free Resource",
  "resources.comingSoon": "Coming Soon",
  "resources.published": "Published",
  "resources.leadMagnet.title": "Get future free resources in your inbox",
  "resources.leadMagnet.description":
    "Leave your email and we'll send new templates, guides, and bonus packs for calmer parent communication - no spam.",
  "resources.leadMagnet.resourceName": "Parent Email Starter Pack",
  "resources.languageNote":
    "Resources are currently available in English. German versions are coming.",
  "resources.categories.all": "All",
  "resources.categories.communication": "Communication",
  "resources.categories.reporting": "Reporting",
  "resources.categories.classroom": "Classroom",
  "resources.categories.planning": "Planning",
  "resources.categories.assessment": "Assessment",
  "resources.sort.label": "Sort resources",
  "resources.sort.popular": "Popular",
  "resources.sort.newest": "Newest",
  "resources.sort.alpha": "A-Z",
  "resources.badge.multilingual": "EN / DE",
  "resources.badge.en": "EN",
  "resources.badge.de": "DE",
  "resources.englishOnlyNote": "Content currently available in English.",
  "resources.featured.title": "Featured resources",
  "resources.featured.subtitle": "Curated for quick wins",
  "resources.empty.title": "No resources match your filters.",
  "resources.empty.body": "Try a different keyword or select another category.",
  "resources.downloadLabel.pdf": "Download PDF",
  "resources.downloadLabel.docx": "Download DOCX",
  "resources.released": "Released",
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
  "suite.trust.hallucinationSafe": "No invented student facts",
  "suite.trust.ferpa": "FERPA-ready",
  "suite.trust.teachers": "Built with teachers at every step",

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
  "suite.screens.title": "Built for real teachers, in real classrooms",
  "suite.screens.caption":
    "Calm, responsible AI designed around the realities of teaching – not generic software workflows.",

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
  "hero.eyebrow": "Zaza - Just Teach.",
  "hero.badge": "Zaza helps teachers thrive",
  "hero.headline": "Write emails that are",
  "hero.headlineAccent": "safe to send.",
  "hero.subheading":
    "Draft helps teachers produce clear, measured wording for parent and admin communication—written as though it could be forwarded, screenshot, or read out of context. Defensible wording, a clean paper trail, and a professional co-writer—not a replacement. Less rewriting. Less exposure. More headspace.",
  "hero.ctaPrimary": "Join Early Access",
  "hero.ctaSecondary": "See Examples",
  "hero.trustIndicators.hallucinationSafe": "No invented student facts",
  "hero.trustIndicators.ferpaCompliant": "FERPA-ready",
  "hero.trustIndicators.teachers": "Built with teachers",
  "hero.trustClarifier":
    "Draft rewrites teacher-provided text. Schools remain the data controller; Draft is built for privacy-first handling of communication drafts.",
  "situations.title": "Situations you'll recognise",
  "situations.items.gradeDispute": "A grade dispute with admin CC'd.",
  "situations.items.accidentalCC": 'An "accidental" CC/BCC or wrong recipient.',
  "situations.items.escalation":
    "A parent threatens to escalate to the principal or board.",
  "situations.items.behaviorIncident":
    "Behavior incident documentation that could be read out of context.",
  "situations.items.toneAccusation":
    'Your tone is questioned — "unprofessional" with a screenshot.',
  "situations.items.sensitiveReport":
    "A sensitive report comment that needs a clean paper trail.",

  // Early Access Page
  "earlyAccess.hero.title": "Join the Zaza Draft Early-Access Programme",
  "earlyAccess.hero.subtitle":
    "Help us build the calm, teacher-first AI writing assistant you deserve.",
  "earlyAccess.hero.cta": "Join Early Access",
  "earlyAccess.overview.heading": "Why we run the private beta",
  "earlyAccess.overview.body":
    "We invite teachers who juggle parent emails, report comments, and feedback to shape the guardrails and priorities we launch with.",
  "earlyAccess.benefits.title": "Beta perks",
  "earlyAccess.benefits.heading": "What you unlock as a beta partner",
  "earlyAccess.benefits.shaping.title": "Shape the product",
  "earlyAccess.benefits.shaping.body":
    "Share what matters—tone guardrails, mode toggles, and insights that reflect your classroom.",
  "earlyAccess.benefits.saving.title": "Save hours each week",
  "earlyAccess.benefits.saving.body":
    "Experience calm, confident drafts while seeing how much time you reclaim from admin.",
  "earlyAccess.benefits.perks.title": "Enjoy exclusive perks",
  "earlyAccess.benefits.perks.body":
    "Get first access to post-launch resources, private webinars, and a teachers-only community.",
  "earlyAccess.steps.title": "How the early-access programme works",
  "earlyAccess.steps.step1.title": "Share your story",
  "earlyAccess.steps.step1.body":
    "Tell us about your teaching context, communication challenges, and why you want to help.",
  "earlyAccess.steps.step2.title": "Receive confirmation",
  "earlyAccess.steps.step2.body":
    "Watch for an email that outlines next steps, platform expectations, and when access opens.",
  "earlyAccess.steps.step3.title": "Access for 30 days",
  "earlyAccess.steps.step3.body":
    "Test guided drafts, tone selectors, and progress insights during a limited trial window.",
  "earlyAccess.steps.step4.title": "Provide feedback",
  "earlyAccess.steps.step4.body":
    "Share insights through brief surveys or optional calls so we build with your voice.",
  "earlyAccess.note.limited":
    "Seats are limited and we close applications as soon as the classroom slots fill.",
  "earlyAccess.faq.title": "FAQ",
  "earlyAccess.faq.eligibility.question": "Who can join?",
  "earlyAccess.faq.eligibility.answer":
    "Primary, secondary, and administrative educators who handle parent communication are welcome to apply.",
  "earlyAccess.faq.privacy.question": "Is my writing private?",
  "earlyAccess.faq.privacy.answer":
    "Yes. Everything stays private, encrypted, and covered by our GDPR-ready policies—no public posting and no data sharing without consent.",
  "earlyAccess.faq.afterBeta.question": "What happens after the beta?",
  "earlyAccess.faq.afterBeta.answer":
    "You can stay in the community, get early notice for the launch, and keep shaping Zaza Draft before general availability.",

  // Hallucination-Safe Tooltip
  "hallucinationSafe.tooltip.heading":
    "What does 'No invented student facts' mean?",
  "hallucinationSafe.tooltip.body":
    "Unlike generic AI tools, Zaza Draft is specifically trained to avoid making up student information, fabricating parent interactions, or inventing details about your class. Every output is grounded in what you actually provide - no invented facts, no fictional scenarios.",

  // Problem Section
  "philosophy.topParagraph":
    "Zaza helps teachers thrive. Draft is professional writing support that reduces cognitive load, protects tone, and lowers the hidden stress of school communication.",
  "problem.heading": "Restore focus to teaching, not late-night writing",
  "problem.body":
    "Parent emails, grading comments, and reports still need care and precision. Draft helps you finish them with less mental strain so your energy stays with students.",
  "problem.stats.parentEmails.value": "Weekly",
  "problem.stats.parentEmails.label": "Parent Emails",
  "problem.stats.reportCards.value": "Each term",
  "problem.stats.reportCards.label": "Report Cards",
  "problem.stats.gradingFeedback.value": "Ongoing",
  "problem.stats.gradingFeedback.label": "Grading Feedback",

  // Solution/Mission Section
  "solution.heading":
    "Calm writing support for high-stakes school communication",
  "solution.bodyPrimary":
    "Draft turns rough notes into clear, parent-ready communication for messages, feedback, and reports. It is built to reduce cognitive load and support professional safety, not replace teacher judgment.",
  "solution.bodySecondary":
    "Tone guardrails and de-escalation guidance help you stay calm, clear, and consistent in difficult moments. You review every draft, keep your voice, and send with confidence.",

  // Stats Section
  "stats.documentsRefined.number": "150k+",
  "stats.documentsRefined.label": "Documents Refined",
  "stats.teachers.number": "Teacher-first",
  "stats.teachers.label": "Design partners shaping Draft",
  "stats.timeSaved.number": "Time back",
  "stats.timeSaved.label": "for teaching",
  "stats.subtitle":
    "Built by teachers to relieve Sunday night stress - join our early access programme and help shape calm, professional communication with AI.",
  "socialProof.badges.teacherFounded":
    "Teacher-founded, PhD in Professional Education",
  "socialProof.badges.gdprReady": "Built in Germany – GDPR-ready",
  "socialProof.badges.teacherFeedback": "Designed with real teacher feedback",
  "socialProof.badges.hallucinationSafe": "No invented student facts",

  // How It Works Section
  "howItWorks.heading": "How Draft restores clarity",
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
    "I got my Sunday back. Draft keeps my messages calm and clear.",
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
  "useCases.heading": "Built for the writing that pulls you away from teaching",
  "useCases.cards.parentMessages.title": "Parent Messages",
  "useCases.cards.parentMessages.description":
    "Draft calm, clear replies that de-escalate",
  "useCases.cards.parentMessages.examples":
    "Behavior concerns, progress updates, attendance issues",
  "useCases.cards.reportCards.title": "Report Cards",
  "useCases.cards.reportCards.description":
    "Turn quick notes into human report comments",
  "useCases.cards.reportCards.examples":
    "Term reports, progress summaries, intervention plans",
  "useCases.cards.gradingComments.title": "Grading Comments",
  "useCases.cards.gradingComments.description":
    "Faster, kinder feedback with your voice intact",
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
  "comparison.heading": "Why Zaza Draft feels different from generic AI",
  "comparison.subheading":
    "Defensible wording matters more than fluent wording. Draft is built for paper-trail communication and written as if it could be forwarded, screenshot, or read out of context.",
  "comparison.clarifier":
    "No student names required. Draft is not trained on your inputs and focuses on phrasing and tone only.",
  "comparison.tableHeaders.feature": "Feature",
  "comparison.tableHeaders.genericAI": "Generic AI Tools (ChatGPT, etc.)",
  "comparison.tableHeaders.zazaDraft": "Zaza Draft",
  "comparison.rows.training.feature": "Training",
  "comparison.rows.training.generic": "General knowledge, business-focused",
  "comparison.rows.training.zaza":
    "Built with teacher design partners and education-specific workflows",
  "comparison.rows.safety.feature": "Safety",
  "comparison.rows.safety.generic": "May invent student details or scenarios",
  "comparison.rows.safety.zaza":
    "Does not invent student-specific claims - rewrites only what you provide",
  "comparison.rows.toneControl.feature": "Tone Control",
  "comparison.rows.toneControl.generic": "Limited or inconsistent",
  "comparison.rows.toneControl.zaza": "4+ education-specific tones",
  "comparison.rows.compliance.feature": "Compliance",
  "comparison.rows.compliance.generic": "Not FERPA-designed",
  "comparison.rows.compliance.zaza": "FERPA-ready by design",
  "comparison.rows.useCases.feature": "Use Cases",
  "comparison.rows.useCases.generic": "Generic writing tasks",
  "comparison.rows.useCases.zaza": "6 specialized teacher workflows",
  "comparison.rows.outputQuality.feature": "Output Quality",
  "comparison.rows.outputQuality.generic": "Requires heavy editing",
  "comparison.rows.outputQuality.zaza": "Defensible, teacher-ready wording",
  "comparison.rows.learningCurve.feature": "Learning Curve",
  "comparison.rows.learningCurve.generic": "Complex prompting needed",
  "comparison.rows.learningCurve.zaza": "Paste, select tone, done",
  "comparison.rows.community.feature": "Community",
  "comparison.rows.community.generic": "No teacher support",
  "comparison.rows.community.zaza": "Educators shaping our private beta",
  "caseStudies.eyebrow": "Before / After",
  "caseStudies.heading": "Before / After from real teachers",
  "caseStudies.subheading":
    "Quick snapshots of how Draft rewrites tricky messages into calm, specific notes.",
  "caseStudies.beforeLabel": "Before",
  "caseStudies.afterLabel": "After with Draft",
  "caseStudies.afterTag": "Draft rewrite",
  "caseStudies.prev": "Previous",
  "caseStudies.next": "Next",

  // Why Choose Section
  "whyChoose.heading":
    "Why teachers choose Draft for calm, confident communication",
  "whyChoose.benefits.beatWritersBlock.title": "Restore focus quickly",
  "whyChoose.benefits.beatWritersBlock.description":
    "Turn rough notes into clear drafts without mental overload",
  "whyChoose.benefits.writeWithConfidence.title":
    "Protect professional confidence",
  "whyChoose.benefits.writeWithConfidence.description":
    "Stay clear, calm, and school-appropriate in every message",
  "whyChoose.benefits.saveTime.title": "Reduce cognitive load daily",
  "whyChoose.benefits.saveTime.description":
    "Less rewriting and second-guessing in sensitive moments",
  "whyChoose.benefits.breakBarriers.title":
    "Communicate clearly across languages",
  "whyChoose.benefits.breakBarriers.description":
    "Translate family communication while keeping professional tone",

  // Testimonials Section
  "testimonials.heading": "What teachers say",
  "testimonials.quote1.text":
    "I got my Sunday back. Draft keeps my messages calm and clear.",
  "testimonials.quote1.name": "Sarah Mitchell",
  "testimonials.quote1.author": "Year 5 Teacher, UK",
  "testimonials.quote2.text": "Comments are consistent and kind.",
  "testimonials.quote2.name": "Marcus Johnson",
  "testimonials.quote2.author": "Middle School Teacher, US",
  "testimonials.quote3.text": "GradeFlow helps our team agree on standards.",
  "testimonials.quote3.name": "Dr. Anna Weber",
  "testimonials.quote3.author": "Department Lead, DE",

  // Final CTA Section
  "finalCTA.heading": "Zaza - Just Teach.",
  "finalCTA.subheading":
    "Zaza helps teachers thrive. Join our private beta and use Draft as calm, professional writing support that gives teaching time back.",
  "finalCTA.button": "Join Early Access",

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
    "AI-powered lesson planning that adapts to your curriculum, saves hours of prep time, and keeps lessons engaging and standards-aligned.",
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
    "Join hundreds of teachers seeing hours saved each week",
  "products.teach.cta.primary": "Join Early Access",
  "products.teach.cta.secondary": "Schedule Demo",

  // Products - Draft
  "products.draft.hero.eyebrow": "AI WRITING ASSISTANT FOR TEACHERS",
  "products.draft.hero.title": "Parent emails without the Sunday dread",
  "products.draft.hero.subtitle":
    "Draft turns rough notes into calm, professional parent messages, report comments, and grading feedback. Tone guardrails and de-escalation support keep you confident and save time.",
  "products.draft.hero.cta.primary": "Join Early Access",
  "products.draft.hero.cta.secondary": "See Examples",

  "products.draft.turn.pain1":
    "Late-night parent emails that need calm, de-escalating tone",
  "products.draft.turn.pain2":
    "Report comments that take hours to make sound human",
  "products.draft.turn.pain3":
    "Rewriting grading feedback to be clear, kind, and fast",

  "products.draft.features.title": "Built for the tough conversations",
  "products.draft.features.toneGuardrails.title": "Tone Guardrails",
  "products.draft.features.toneGuardrails.desc":
    "Keep messages calm, kind, and de-escalating when emotions run high",
  "products.draft.features.translationChecks.title": "Translation Checks",
  "products.draft.features.translationChecks.desc":
    "Make sure tone and intent stay respectful across languages",
  "products.draft.features.reviewSteps.title": "Review Steps",
  "products.draft.features.reviewSteps.desc":
    "You stay in control: review, edit, and approve every draft",

  "products.draft.howItWorks.title": "How it calms your writing",
  "products.draft.howItWorks.step1.title": "Drop in your notes",
  "products.draft.howItWorks.step1.desc":
    "Start with bullet points or a rough draft - no perfect wording needed",
  "products.draft.howItWorks.step2.title": "Pick the tone",
  "products.draft.howItWorks.step2.desc":
    "Supportive, formal, concise - with safety guardrails by default",
  "products.draft.howItWorks.step3.title": "Review & send",
  "products.draft.howItWorks.step3.desc":
    "Edit quickly, copy, and share when it feels right",
  "products.draft.insights.heading": "Insights & Progress",
  "products.draft.insights.body":
    "Draft tracks time saved, drafts created, streaks, and a quality score so you can celebrate the growth you deliver while helping shape our teacher-first beta.",
  "products.draft.interface.heading": "Guided Drafting Interface",
  "products.draft.interface.body":
    "Tone guardrails, channel-aware modes, and language settings live together in an intuitive workspace so every draft sounds calm and confident while you help steer the early access programme.",
  "products.draft.insights.imageAlt": "Zaza Draft insights dashboard",
  "products.draft.interface.imageAlt": "Zaza Draft guided drafting interface",

  "products.draft.whoItsFor.title": "Perfect for",
  "products.draft.whoItsFor.item1":
    "Teachers juggling parent communications after hours",
  "products.draft.whoItsFor.item2":
    "Educators turning quick notes into human report comments",
  "products.draft.whoItsFor.item3":
    "School staff who need respectful, concise messages without stress",

  "products.draft.change.title": "What changes with Draft",
  "products.draft.change.step1":
    "Two-hour email marathons become 5-minute reviews",
  "products.draft.change.step2":
    "Parent communication that stays calm, clear, and professional",
  "products.draft.change.step3": "Confidence in stressful conversations",
  "products.draft.change.step4": "More time to teach, less time rewriting",

  "products.draft.techNote.title": "Hallucination-Safe:",
  "products.draft.techNote.body":
    "Draft never invents student details or parent interactions. Guardrails keep every message grounded in what you provide.",

  "products.draft.social.title": "What teachers say",
  "products.draft.social.quote1":
    "Draft saves me 2-3 hours every Sunday on parent emails and behavior updates. It keeps my tone calm even when I'm stressed.",
  "products.draft.social.author1": "Sarah Mitchell, Year 5 Teacher",
  "products.draft.social.quote2":
    "Tone guardrails help me communicate with confidence, especially in tough conversations. It feels like emotional support for my inbox.",
  "products.draft.social.author2": "James Rodriguez, Middle School Teacher",

  "products.draft.cta.title": "Get your time back",
  "products.draft.cta.subtitle":
    "Join our private beta and help shape teacher-first AI writing support.",
  "products.draft.cta.primary": "Join Early Access",
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
  "products.gradeflow.cta.button": "Join Early Access",

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
  "comparison.row1.shield": "Automated",
  "comparison.row1.manual": "Manual checks",
  "comparison.row2.feature": "Audit Trail",
  "comparison.row2.shield": "Complete logs",
  "comparison.row2.manual": "Incomplete records",
  "comparison.row3.feature": "PII Protection",
  "comparison.row3.shield": "Automatic",
  "comparison.row3.manual": "Manual review",

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
    "Unlike generic AI tools, Zaza Draft is built with teacher design partners and education-specific workflows. It does not invent student-specific claims - rewrites only what you provide, offers education-specific tone options, is FERPA-ready by design, and provides specialized workflows for common teacher writing tasks.",

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
    "Teachers using Draft report hours saved each week on writing tasks. Tasks that typically take 2 hours can be completed in 5 minutes with Draft's assistance.",

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
    "Yes. We take data security seriously. All data is encrypted in transit and at rest, we're FERPA-ready, and we never use your data to train our models or share it with third parties. Your communications remain private and secure.",

  "faq.safety.q2": "What does 'No invented student facts' mean?",
  "faq.safety.a2":
    "Draft does not invent student-specific claims - rewrites only what you provide. Every output is grounded in what you actually provide.",

  "faq.safety.q3": "Is Zaza Draft FERPA-ready?",
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
  "faq.safety.q7": "Will Zaza Draft make things up?",
  "faq.safety.a7":
    "No. Zaza Draft avoids unsupported claims and works only with the information you provide. It focuses on clear, professional wording instead of inventing details, and we recommend a final read-through before you send anything.",
  "faq.safety.q8": "Is student information safe?",
  "faq.safety.a8":
    "Yes. Draft is built with privacy in mind. You do not need to enter student names for most drafts, and you should avoid unnecessary personal details. Data is handled securely and only used to create your draft. See our Privacy Policy for more detail.",
  "faq.safety.q9": "Is Zaza Draft GDPR compliant?",
  "faq.safety.a9":
    "Yes. Draft follows GDPR principles such as data minimisation and secure processing, and you can request deletion of your data at any time.",

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

  "faq.features.q7": "How does Zaza Draft help me write faster?",
  "faq.features.a7":
    "Zaza Draft cuts writing time by handling structure, tone, and phrasing so you do not start from a blank page. Most teachers finish messages in minutes rather than rewriting emails from scratch.",
  "faq.features.q8": "Can Zaza Draft match my tone and school style?",
  "faq.features.a8":
    "Yes. Draft adapts to calm, firm, supportive, or neutral tones. You remain in control and can adjust wording to match your school’s expectations or your own style before sending anything.",
  "faq.features.q9": "Can Zaza Draft help with sensitive topics?",
  "faq.features.a9":
    "Absolutely. In sensitive or emotional situations, Draft shifts your language toward respectful, de-escalating phrasing while keeping the message clear. You decide what to send and when.",
  "faq.features.q10": "Why not just use ChatGPT?",
  "faq.features.a10":
    "ChatGPT is a general-purpose tool. Zaza Draft is built for teachers and school communication, with guardrails around tone, clarity, and professionalism. That focus gives you faster drafts that are appropriate in school contexts.",

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
  "about.overview.hero.title": "Building technology to help teachers thrive",
  "about.overview.hero.subtitle":
    "Zaza exists to give teachers their time, confidence, and wellbeing back – by building calm, safe AI tools that respect professional judgement and the realities of teaching.",
  "about.overview.hero.context":
    "Dr. Greg Blackburn is a learning science and professional education expert who leads professional learning work while staying close to teachers through family and friends, so he hears the lived experience and pain points educators face every day.",

  "about.overview.mission.title": "Our Mission",
  "about.overview.mission.body":
    "Every teacher deserves tools that respect their expertise, protect their students, and reduce unnecessary stress. Zaza builds evidence-based, safety-first AI that supports teachers in their daily work – so they can focus on what matters most and thrive in their profession. Ultimately, Zaza exists to help teachers thrive – not just cope.",

  "about.overview.values.title": "Our Values",
  "about.overview.values.teacherFirst.title": "Teacher-First Design",
  "about.overview.values.teacherFirst.body":
    "Designed with and for teachers as professionals.",
  "about.overview.values.safety.title": "Safety by Design",
  "about.overview.values.safety.body":
    "Calm AI with no invented student facts.",
  "about.overview.values.privacy.title": "Privacy First",
  "about.overview.values.privacy.body":
    "FERPA-ready from day one. Your data is yours, and we never use it to train our models.",
  "about.overview.values.evidence.title": "Evidence-Based",
  "about.overview.values.evidence.body":
    "Grounded in learning science and professional education research.",

  "about.overview.timeline.title": "Our Journey",
  "about.overview.timeline.2019.title":
    "Learning science and professional education",
  "about.overview.timeline.2019.body":
    "Completion of doctoral research focused on professional learning, critical thinking, and how people learn and perform in real, high-pressure work environments.",
  "about.overview.timeline.2024.title":
    "The pattern becomes impossible to ignore",
  "about.overview.timeline.2024.body":
    "Through years of work in learning and development – combined with close personal connections to teachers through family and friends – a recurring problem became clear: written communication and reporting were consuming time, energy, and emotional bandwidth.",
  "about.overview.timeline.2025.title": "Zaza Draft is founded",
  "about.overview.timeline.2025.body":
    "Zaza Draft is created to bring calm, safe, evidence-based AI into teachers’ daily work – reducing stress while respecting professional judgement.",
  "about.overview.timeline.today.title": "Helping teachers thrive",
  "about.overview.timeline.today.body":
    "Zaza Draft is being built deliberately and carefully, prioritising trust, wellbeing, and usefulness over speed or hype.",

  "about.overview.cta.title": "Help teachers thrive with calm, responsible AI",
  "about.overview.cta.body":
    "Learn how Zaza Draft supports professional judgement, reduces stress, and protects what matters in teaching.",
  "about.overview.cta.button": "Contact us",

  // About Company Page - NEW CONTENT
  "about.company.hero.eyebrow": "OUR COMPANY",
  "about.company.hero.title": "Zaza Technologies",
  "about.company.hero.subtitle":
    "We are a small, specialised team of learning designers, engineers, and educational researchers building technology that helps teachers thrive.",
  "company.origin.title": "OUR COMPANY",
  "company.origin.body.p1":
    "Zaza Technologies was founded in 2025 with a clear belief: education deserves AI tools built with real pedagogical understanding, not repurposed corporate AI models. We build technology that protects teacher wellbeing.",
  "company.origin.body.p2": "So we chose a different approach.",
  "company.origin.body.p3":
    "We design tools that are trained on real pedagogy, developed with educators, and refined through classroom use. Tools that understand the nuance of teacher judgement, the emotional weight of parent interaction, and the importance of constructive feedback. Tools that are accurate, reliable, and safe for educational settings.",
  "company.origin.body.p4":
    "Built with teacher design partners and education-specific workflows.",
  "company.origin.body.p5":
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
    "We are intentionally not a large technology company. We are a focused team building for one audience only – teachers.",
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
    "We're inviting a small group of teachers and schools into a private beta so every workflow is refined with real classroom feedback before launch.",
  "company.today.p2":
    "Our long-term vision is to build a complete suite of AI tools that help teachers reclaim their time, protect their wellbeing, and stay connected to the heart of their work – their students.",
  "company.today.close": "Because when teachers thrive, students thrive.",

  "company.stats.teachers.number": "Teacher-built",
  "company.stats.teachers.label": "Design & beta partners",
  "company.stats.countries.number": "Private beta",
  "company.stats.countries.label": "Early access programme",
  "company.stats.hours.number": "10+",
  "company.stats.hours.label": "Hours saved weekly",

  // Founder Hero Section
  "founder.hero.headline": "Meet your fellow educator",
  "founder.hero.subheading":
    "Dr Greg Blackburn is a learning scientist and founder of Zaza Technologies, building teacher-first AI tools that give educators their time back.",
  "founder.hero.label": "FOUNDER & CEO",
  "founder.hero.name": "Dr. Greg Blackburn",
  "founder.hero.tagline":
    "Learning scientist, EdTech founder, and advocate for teacher-first AI.",

  // Founder Journey Section
  "founder.journey.title": "The Journey",
  "founder.journey.quote":
    "I built Zaza because I was tired of watching teachers drown in administrative work when technology should be setting them free.",
  "founder.journey.p1":
    "My working life began in Hobart, Tasmania, holding a paintbrush as an apprentice painter and decorator while my father co-owned a small paint factory. After a pre-vocational course at TAFE and a four year apprenticeship at the Cascade Brewery, I realised I wanted more from both my work and my education.",
  "founder.journey.p2":
    "Travel opened my eyes to how big the world really is and how far education can take you. I lived abroad, studied German, and eventually returned to Tasmania to study Administration, Information Systems and German at the University of Tasmania. Graduating with First Class Honours proved I could succeed academically despite early doubts and family tensions.",
  "founder.journey.p3":
    "My career then took me to Brisbane, where I spent six years at Telstra and completed an MBA at the University of Queensland. That MBA opened doors into management roles at the University of Queensland, where I became a Business Manager and began publishing research into how people learn, solve problems and think critically in their work.",
  "founder.journey.p4":
    "Along the way my two daughters, Viola and Solara, were born, and I later completed a PhD in Professional Education at City, University of London. My research focused on critical thinking and problem solving in student-centred e-learning. Listening to teachers and learning professionals describe late-night marking, report writing and endless admin made something very clear: we needed humane, teacher-first AI tools that give people their time back. In 2025 that realisation became Zaza Technologies.",
  "founder.mission.quote":
    "Every teacher deserves tools that respect their expertise, protect their students, and give them time to do what they do best: teach.",
  "founder.mission.attribution": "Dr. Greg Blackburn, Founder & CEO",
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
  "founder.personal.title": "A personal note from Greg",
  "founder.personal.message1":
    "If you are reading this, you are probably a teacher who is curious about AI but understandably cautious. You care deeply about your students and your professionalism, and you do not want a tool that treats teaching as a set of prompts and templates. I share that view. Technology should serve your judgement, not replace it.",
  "founder.personal.message2":
    "That is why Zaza is built differently. Every feature is shaped with real teachers, tested in real classrooms or real professional contexts, and refined based on honest feedback. I draw on my background in learning and development, critical thinking research and system design, but the goal is always the same: calm, trustworthy support that fits the messy reality of teaching.",
  "founder.personal.message3":
    "I would love to hear from you – whether you have questions, feedback, or simply want to share what is happening in your classroom. My hope is that Zaza helps you reclaim time, reduce stress and feel more confident in your work. Let us build the future of teacher technology together.",
  "founder.personal.name": "Greg",
  "founder.personal.title2": "Founder & CEO",
  "founder.personal.company": "Zaza Technologies",
  "founder.personal.cta": "Get in Touch",
  "founder.personal.fullStoryIntro":
    "Want to read the full journey behind Zaza?",
  "founder.personal.fullStoryLink": "Read Greg's full founder story",

  // Support Page (EN)
  "support.title": "Support",
  "support.intro":
    "We’re here to help when Draft raises questions or something feels off. Reach out—real humans reply quickly.",
  "support.email.title": "Email support",
  "support.email.description":
    "Tell us what you need or share feedback. Every message is read by our team.",
  "support.email.response": "Typical response time: within 24 hours.",
  "support.faq.title": "FAQs",
  "support.faq.description":
    "Browse answers about Draft, accounts, and billing.",
  "support.resources.title": "Guides & resources",
  "support.resources.description":
    "Short how-tos and checklists you can use right away.",
  "support.troubleshooting.title": "Quick fixes",
  "support.troubleshooting.login.title": "Can’t log in",
  "support.troubleshooting.login.description":
    "Reset your password or confirm your email is correct.",
  "support.troubleshooting.email.title": "Not getting emails",
  "support.troubleshooting.email.description":
    "Check spam and add help@zazatechnologies.com to your contacts.",
  "support.troubleshooting.subscription.title": "Plan or payment issues",
  "support.troubleshooting.subscription.description":
    "Check your billing details or message us if something looks wrong.",
  "support.troubleshooting.browser.title": "Page looks off or won’t load",
  "support.troubleshooting.browser.description":
    "Refresh, try another browser, or clear your cache.",
  "support.troubleshooting.bugs.title": "Something’s behaving oddly",
  "support.troubleshooting.bugs.description":
    "Send a quick note with a screenshot—we’ll take a look.",

  // Terms Page (EN)
  "terms.back": "Back to home",
  "terms.title": "Terms of Service",
  "terms.company":
    "Zaza Technologies — creators of Zaza Draft, Zaza Teach, and GradeFlow",
  "terms.lastUpdated": "Last updated: 12 October 2025",
  "terms.intro":
    "These terms govern your use of Zaza Draft, Zaza Teach, and GradeFlow. By using the services, you agree to them.",
  "terms.s1.title": "1. Accounts & eligibility",
  "terms.s1.content":
    "You’re responsible for accurate account information, safeguarding your login, and following any school or district policies. If you act for an organisation, you confirm you’re authorised to do so.",
  "terms.s2.title": "2. Subscriptions & billing",
  "terms.s2.content":
    "Paid plans bill in advance. Subscriptions renew automatically until cancelled. Prices may change; we’ll notify you before adjustments take effect.",
  "terms.s3.title": "3. Acceptable use",
  "terms.s3.item1":
    "Do not use the services for illegal, harmful, or misleading purposes.",
  "terms.s3.item2":
    "Do not upload content that infringes rights or breaches privacy laws.",
  "terms.s3.item3":
    "Do not attempt to disrupt, probe, or bypass the services (e.g., scraping, reverse engineering, automated attacks).",
  "terms.s4.title": "4. Privacy & security",
  "terms.s4.content":
    "Our processing of personal data is described in the Privacy Policy. We apply safeguards but cannot guarantee absolute security.",
  "terms.s5.title": "5. Intellectual property",
  "terms.s5.content":
    "The services, brands, and content remain Zaza’s property. Use them as intended and do not create derivative works without permission.",
  "terms.s6.title": "6. Liability & termination",
  "terms.s6.content":
    "Services are provided “as is.” To the extent allowed by law, we’re not liable for indirect or consequential losses. We may suspend or terminate accounts that violate these terms.",
  "terms.contact.text": "Questions about these terms? Email us at",
  // Not Found / Error
  "notFound.title": "Page not found",
  "notFound.subtitle":
    "We couldn’t find this page. Head back to the homepage, try Zaza Draft, or explore recent posts.",
  "notFound.home": "Back to homepage",
  "notFound.draft": "Go to Zaza Draft",
  "notFound.blog": "Visit the blog",
  "error.title": "Something went wrong",
  "error.subtitle":
    "The page had a hiccup. Please retry, or head back while we keep things running for teachers.",
  "error.home": "Return home",
  "error.contact": "Contact support",
};

const translationsDe: Record<string, string> = {
  // Pricing Page (DE) - Boutique Version
  "pricing.hero.preheadline": "TRANSPARENTE PREISE",
  "pricing.hero.headline":
    "Preise, die die Zeit und das Wohlbefinden von Lehrkräften respektieren",
  "pricing.hero.subheadline":
    "Sparen Sie jede Woche Stunden, reduzieren Sie Stress nach Feierabend und schreiben Sie mit Zuversicht - mit Preisen, die einfach und fair sind.",
  "pricing.trust.teachers": "Vertraut von fürsorglichen Lehrkräften",
  "pricing.trust.ferpa": "FERPA-orientiert",
  "pricing.trust.cancel": "Jederzeit kündbar",

  // Identity Strip
  "pricing.identity.title": "Dies ist für Lehrkräfte, die...",
  "pricing.identity.point1":
    "weniger Zeit mit Schreiben und mehr Zeit mit Unterrichten verbringen möchten",
  "pricing.identity.point2":
    "vertrauenswürdige Sprachunterstützung benötigen, ohne ihre Stimme zu verlieren",
  "pricing.identity.point3":
    "sich um Grenzen, Zuversicht und Ruhe in ihrer Woche kümmern",

  // Currency & Billing Toggle
  "pricing.toggle.monthly": "Monatlich",
  "pricing.toggle.annual": "Jährlich",
  "pricing.toggle.save": "2 Monate sparen",

  // Outcome Proof
  "pricing.outcome.text":
    "Die meisten Lehrkräfte verbringen 3-5 Stunden pro Woche mit Nachrichten und Kommentaren. Draft reduziert dies um 50-70 %, während Ihr Ton und Ihre Absicht erhalten bleiben.",

  // Free Plan
  "pricing.free.badge": "KOSTENLOS",
  "pricing.free.title": "Starter",
  "pricing.free.description":
    "Alles, was Sie brauchen, um Draft auszuprobieren und Ihre ersten Stunden zu sparen.",
  "pricing.free.cta": "Early Access beitreten",
  "pricing.free.feature1": "5 Entwürfe pro Monat",
  "pricing.free.feature2": "Basisvorlagen",
  "pricing.free.feature3": "Speichern & Kopieren",
  "pricing.free.feature4": "Community-Support",

  // Teacher (Premium) Plan
  "pricing.teacher.badge": "AM BELIEBTESTEN",
  "pricing.teacher.title": "Teacher",
  "pricing.teacher.description":
    "Unbegrenzte Schreibunterstuetzung ohne erfundene Schuelerinformationen und ohne Lock-ins.",
  "pricing.teacher.period": "Jederzeit kündbar",
  "pricing.teacher.savingsAnnual": "2 Monate kostenlos sparen",
  "pricing.teacher.cta": "7-Tage-Testversion starten",
  "pricing.teacher.trial": "Keine Kreditkarte erforderlich",
  "pricing.teacher.guarantee": "30-Tage-Geld-zurück-Garantie",
  "pricing.teacher.feature1": "Unbegrenzte Entwürfe & Überarbeitungen",
  "pricing.teacher.feature2": "Ton-Tutor, Übersetzungen, Kontext-Gedächtnis",
  "pricing.teacher.feature3": "Eigene Vorlagen & Kommentarbanken",
  "pricing.teacher.feature4": "Gespeicherter Verlauf & Export",
  "pricing.teacher.feature5": "Zaras sanfte Wohlbefinden-Hinweise",
  "pricing.teacher.feature6": "Priorisierter E-Mail-Support",
  "pricing.teacher.timeSaved": "Typischerweise gespart: 4-7 Stunden pro Woche",

  // Department Plan
  "pricing.department.badge": "TEAMS",
  "pricing.department.title": "Department",
  "pricing.department.description":
    "Kollaboratives Schreiben mit gemeinsamer Qualität und Konsistenz.",
  "pricing.department.perTeacher": " pro Lehrkraft",
  "pricing.department.billing": "Jährliche Abrechnung • 5-50 Plätze",
  "pricing.department.cta": "Mit Vertrieb sprechen",
  "pricing.department.includes": "Alles in Teacher, plus:",
  "pricing.department.feature1": "Team-Bibliotheken, gemeinsame Vorlagen",
  "pricing.department.feature2": "Rollenbasierter Zugriff",
  "pricing.department.feature3": "Überprüfung & Freigabe",
  "pricing.department.feature4": "Priorisiertes Onboarding & Erfolg",

  // Schools & Districts
  "pricing.enterprise.badge": "ENTERPRISE",
  "pricing.enterprise.title": "Schulen & Bezirke",
  "pricing.enterprise.description": "Alles für großflächige Bereitstellungen.",
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
  "pricing.bundle.savings": "Sparen Sie gegenüber dem separaten Kauf",
  "pricing.bundle.cta": "Bundle holen",

  // Testimonials
  "pricing.testimonials.title": "Was Lehrkräfte über Preise sagen",
  "pricing.testimonials.1.name": "Sarah L.",
  "pricing.testimonials.1.role": "Mittelschullehrerin",
  "pricing.testimonials.1.quote":
    "Draft gab mir meine Abende zurück. Ich verlasse jetzt die Schule pünktlich - und Eltern sagen, meine Nachrichten fühlen sich wärmer an.",
  "pricing.testimonials.2.name": "Mark R.",
  "pricing.testimonials.2.role": "Abteilungsleiter",
  "pricing.testimonials.2.quote":
    "Unsere Abteilung hat Ton abgestimmt und Feedback beschleunigt. Die Benotungszeit sank um ein Drittel.",
  "pricing.testimonials.3.name": "Emma K.",
  "pricing.testimonials.3.role": "Grundschullehrerin",
  "pricing.testimonials.3.quote":
    "Die Preisgestaltung ist transparent und fair. Keine versteckten Gebühren, keine Lock-ins. Funktioniert einfach.",

  // Wellbeing Metric
  "pricing.metric.text":
    "Über 90 Tage berichten Lehrkräfte von 38 % weniger Nachrichten nach Feierabend und +24 % Zuversicht in der Elternkommunikation.",

  "pricing.checkout.buyNow": "Jetzt abonnieren",
  "pricing.compare.title": "Vergleich: Zaza vs. ChatGPT",
  "pricing.compare.caption":
    "ChatGPT ist stark - aber nicht für dein Klassenzimmer gebaut. Zaza Draft schon.",
  "pricing.compare.column.generic": "Generische KI (z. B. ChatGPT)",
  "pricing.compare.column.zaza": "Zaza Draft",
  "pricing.compare.footer":
    "ChatGPT ist stark - aber nicht für dein Klassenzimmer gebaut. Zaza Draft schon.",
  "pricing.compare.rows.purpose.feature": "Einsatz",
  "pricing.compare.rows.purpose.generic":
    "Allgemeiner Chatbot, nicht für Schulen entwickelt.",
  "pricing.compare.rows.purpose.zaza":
    "Speziell für Lehrkräftenkommunikation und Zeugnis-Kommentare gebaut.",
  "pricing.compare.rows.tone.feature": "Ton & Leitplanken",
  "pricing.compare.rows.tone.generic":
    "Keine eingebauten Schul-Tonleitplanken - du musst viel prompten.",
  "pricing.compare.rows.tone.zaza":
    "Ton-Presets für Eltern, Zeugnisse, Feedback - mit Sicherungsrails.",
  "pricing.compare.rows.privacy.feature": "Schüler:innenschutz",
  "pricing.compare.rows.privacy.generic":
    "Risiko, identifizierende Daten in generische Systeme einzugeben.",
  "pricing.compare.rows.privacy.zaza":
    "Auf Datenschutz ausgelegt - keine Namen nötig, DSGVO-fokussierte Policy.",
  "pricing.compare.rows.templates.feature": "Lehrer-Vorlagen",
  "pricing.compare.rows.templates.generic":
    "Keine nativen Eltern-/Zeugnisvorlagen; alles manuell.",
  "pricing.compare.rows.templates.zaza":
    "Vorlagen für Verhalten, Lob, Hausaufgaben, Anwesenheit, Berichte u. mehr.",
  "pricing.compare.rows.workload.feature": "Arbeitslast",
  "pricing.compare.rows.workload.generic":
    "Hilfreich, aber inkonsistent - viel Umschreiben nötig.",
  "pricing.compare.rows.workload.zaza":
    "Optimiert für schnelle, versandfertige Entwürfe, die du nur noch feinjustierst.",
  "pricing.compare.rows.cost.feature": "Kosten für Lehrkräften",
  "pricing.compare.rows.cost.generic":
    "Generische Preise - nicht auf Lehrkräftenbudgets ausgelegt.",
  "pricing.compare.rows.cost.zaza":
    "Transparente Pläne, Gratisstufe plus bezahlbare Monatsoptionen.",
  // FAQs
  "pricing.faq.title": "Preis- und Abrechnungs-FAQs",
  "pricing.faq.q1": "Gibt es einen kostenlosen Plan?",
  "pricing.faq.a1":
    "Ja - beginnen Sie mit 5 Entwürfen pro Monat, um den Unterschied zu spüren. Keine Kreditkarte erforderlich.",
  "pricing.faq.q2": "Was passiert mit meiner Stimme?",
  "pricing.faq.a2":
    "Draft bewahrt Ihren Ton und Ihre Sprache; Sie haben immer die Kontrolle. Unser Ton-Tutor lernt Ihren Stil.",
  "pricing.faq.q3": "Sind meine Nachrichten privat?",
  "pricing.faq.a3":
    "Ja. Wir verwenden Ihre Inhalte nicht, um öffentliche Modelle zu trainieren. Weitere Details finden Sie auf unserer Datenschutzseite.",
  "pricing.faq.q4": "Kann ich jederzeit kündigen?",
  "pricing.faq.a4":
    "Absolut - keine Lock-ins. Kündigen Sie mit einem Klick in Ihren Kontoeinstellungen.",
  "pricing.faq.q5": "Unterstützen Sie Schulen?",
  "pricing.faq.a5":
    "Ja - Mengenpreise, SSO, DPA/SCCs und SLAs für Bezirke. Kontakt: sales@zazadraft.com",
  "pricing.faq.q6": "Bieten Sie Rückerstattungen an?",
  "pricing.faq.a6":
    "Ja - 30-Tage-Geld-zurück-Garantie auf alle kostenpflichtigen Pläne. Keine Fragen gestellt.",

  // CTA Section
  "pricing.cta.title": "Bereit, jede Woche Stunden zu sparen?",
  "pricing.cta.subtitle":
    "Heute kostenlos starten • Keine Kreditkarte erforderlich • Jederzeit kündbar",
  "pricing.cta.primary": "Early Access beitreten",
  "pricing.cta.secondary": "Mit Vertrieb sprechen",

  // Pricing - Decision Tool section
  "pricing.decision.title": "Nicht sicher, welchen Plan Sie wählen sollen?",
  "pricing.decision.subtitle":
    "Machen Sie unser kurzes Quiz, um eine personalisierte Empfehlung zu erhalten",

  // Navigation
  "nav.home": "Startseite",
  "nav.pricing": "Preise",
  "nav.products": "Produkte",
  "nav.products.suite": "Zaza Suite",
  "nav.products.teach": "Zaza Teach",
  "nav.products.draft": "Zaza Draft",
  "nav.products.gradeflow": "Zaza GradeFlow",
  "nav.products.shield": "Zaza Shield",
  "nav.learningCentre": "Lernzentrum",
  "nav.resources": "Ressourcen",
  "nav.faq": "FAQ",
  "nav.about": "Über uns",
  "nav.getStarted": "Jetzt starten",

  // Forms & modal
  "form.name": "Name",
  "form.email": "E-Mail",
  "form.consent": "Ich stimme der Datenschutzerklärung zu.",
  "form.privacyLink": "Datenschutzerklärung",
  "form.submit": "Jetzt kostenlos starten",
  "form.success": "Bitte Posteingang prüfen",
  "form.error": "Etwas ist schiefgelaufen. Bitte versuche es noch einmal.",
  "form.consentRequired":
    "Bitte stimme der Datenschutzerklärung zu, um fortzufahren.",
  "form.trialCopy": "Teste 5 Kommentare kostenlos",
  "form.placeholder.name": "Dein Name",
  "form.placeholder.email": "du@example.com",
  "form.submitting": "Wird gesendet...",
  "form.close": "Schließen",
  "form.successNote":
    "Wir haben dir das Material geschickt. Schau ggf. auch im Spam nach oder schreibe uns.",

  // Suite Page Hero (DE)
  "suite.hero.title":
    "Zaza ist eine Familie sicherer, lehrerzentrierter KI-Apps, die zusammenarbeiten, um den Arbeitsaufwand zu reduzieren und die Effizienz sowie das Wohlbefinden von Lehrkräften zu stärken.",
  "suite.hero.subhead":
    "Jede App wird von der Zaza KnowledgeCore Plattform betrieben und bietet vertrauenswürdige, erklärbare KI sowie konsistente, schulbereite Schutzmechanismen.",

  // Suite - Teacher First (DE)
  "suite.teacherFirst.title": "Für Lehrkräfte entwickelt",
  "suite.teacherFirst.body":
    "Zaza gibt Zeit zurück und lässt Pädagoginnen und Pädagogen sich aufs Unterrichten konzentrieren. Alles ist mit Datenschutz, Schutzkonzepten und Pädagogik im Kern gestaltet, sodass Schulen dem Einsatz vertrauen können.",

  // Suite - Core Apps (DE)
  "suite.coreApps.title": "Die vier Kern-Apps",
  "suite.teach.body":
    "KI-gestützte Unterrichtsplanung, die sich an Ihren Lehrplan anpasst, Stunden Vorbereitungszeit spart und den Unterricht spannend sowie standardkonform hält.",
  "suite.teach.li1": "Auto-Planer: vollständige Unterrichtsstruktur in Minuten",
  // Features page (DE) - How it works and CTA
  "features.how.title": "So funktioniert es",
  "features.how.subtitle":
    "Drei einfache Schritte zu besseren Elternnachrichten",
  "features.how.step1.title": "Nachricht eingeben",
  "features.how.step1.desc":
    "Tippen oder fügen Sie Ihren Entwurf zum Schüler ein",
  "features.how.step2.title": "Sofortiges Feedback erhalten",
  "features.how.step2.desc":
    "Draft analysiert Ton, Klarheit und Angemessenheit",
  "features.how.step3.title": "Kopieren und senden",
  "features.how.step3.desc":
    "Exportieren Sie Ihre überarbeitete Nachricht in Sekunden",
  "features.cta.title": "Heute bessere Nachrichten schreiben",
  "features.cta.subtitle": "Testen Sie Draft kostenlos mit 5 Kommentaren",
  "features.cta.primary": "Jetzt starten",

  // Resources page (DE)
  "resources.title": "Kostenlose Ressourcen für Lehrkräfte",
  "resources.subtitle":
    "Zeitsparer, die du sofort nutzen kannst. Download als PDF.",
  "resources.search.placeholder": "Ressourcen durchsuchen...",
  "resources.download": "Herunterladen",
  "resources.downloadCta": "Ressource herunterladen",
  "resources.comingSoon": "Demnächst",
  "resources.published": "Veröffentlicht",
  "resources.leadMagnet.title":
    "Neue Gratis-Materialien direkt in dein Postfach",
  "resources.leadMagnet.description":
    "Trage deine E-Mail ein und wir schicken dir neue Vorlagen, Leitfäden und Bonus-Pakete - ohne Spam.",
  "resources.leadMagnet.resourceName": "Eltern-E-Mail Starter-Pack",
  "resources.languageNote":
    "Ressourcen sind derzeit auf Englisch verfügbar. Deutsche Versionen folgen.",
  "resources.categories.all": "Alle",
  "resources.categories.communication": "Kommunikation",
  "resources.categories.reporting": "Berichte",
  "resources.categories.classroom": "Klassenraum",
  "resources.categories.planning": "Planung",
  "resources.categories.assessment": "Bewertung",
  "resources.sort.label": "Ressourcen sortieren",
  "resources.sort.popular": "Beliebt",
  "resources.sort.newest": "Neueste",
  "resources.sort.alpha": "A-Z",
  "resources.badge.multilingual": "EN / DE",
  "resources.badge.en": "EN",
  "resources.badge.de": "DE",
  "resources.englishOnlyNote": "Inhalt derzeit nur auf Englisch verfügbar.",
  "resources.featured.title": "Empfohlene Ressourcen",
  "resources.featured.subtitle": "Handverlesene Downloads für schnelle Erfolge",
  "resources.empty.title": "Keine Ressourcen passen zu deinen Filtern.",
  "resources.empty.body":
    "Probiere ein anderes Stichwort oder wähle eine andere Kategorie.",
  "resources.downloadLabel.pdf": "PDF herunterladen",
  "resources.downloadLabel.docx": "DOCX herunterladen",
  "resources.released": "Veröffentlicht",
  "suite.teach.li2":
    "Lehrplanbewusst: Common Core + internationale Rahmenpläne",
  "suite.teach.li3": "Hilfen zur Differenzierung und kreative Aktivitätsideen",
  "suite.teach.cta": "Mehr über Teach erfahren",

  "suite.draft.body":
    "Kommentare und Berichte ohne Burnout - klare, wertschätzende Kommunikation, fundiert in Forschung zum Wohlbefinden von Lehrkräften.",
  "suite.draft.li1":
    "Vorlagen für Berichte und Kommentare, die Sie anpassen können",
  "suite.draft.li2":
    "Tonleitfäden und Bias-Prüfungen für faires, unterstützendes Feedback",
  "suite.draft.li3":
    "Standardmäßig privat; für professionelle, elternreife Texte entwickelt",
  "suite.draft.cta": "Mehr über Draft erfahren",

  "suite.gradeflow.body":
    "An erklärbarer Bewertungs-Copilot mit OCR, Rubriken und evidenzbasiertem Feedback - schnelleres Korrigieren mit Fairness und Konsistenz.",
  "suite.gradeflow.li1":
    "Rubrik-konformes, prüffähiges Feedback mit Nachweisen",
  "suite.gradeflow.li2": "Konsistenz über Klassen und Beurteilende hinweg",
  "suite.gradeflow.li3": "Exportierbare Notenlisten und Moderationshilfe",
  "suite.gradeflow.cta": "Mehr über GradeFlow erfahren",

  "suite.shield.body":
    "Kommunikationsmanagement, das das Wohlbefinden von Lehrkräften schützt - entwirft schwierige E-Mails und hilft, gesunde Grenzen zu wahren.",
  "suite.shield.li1":
    "Entwurfs-Assistent für sensible Eltern- und Verwaltungsnachrichten",
  "suite.shield.li2": "Grenz-Hinweise und Eskalationsleitfäden",
  "suite.shield.li3": "Professionelle, konsistente Kommunikationsmuster",
  "suite.shield.cta": "Mehr über Shield erfahren",

  // Suite - Platform (DE)
  "suite.platform.title": "Zaza KnowledgeCore (Plattform)",
  "suite.platform.body":
    "KnowledgeCore ist die sichere, intelligente Plattform hinter jeder Zaza-App. Sie organisiert Lehrkraft-Dokumente, erzwingt Datenschutz und Compliance und stellt erklärbare, prüffähige KI in der gesamten Suite bereit. Es ist kein separates Produkt - so bleiben die Zaza-Apps konsistent, sicher und verbunden.",
  "suite.platform.li1": "Datenschutz und Schutzkonzepte von Anfang an",
  "suite.platform.li2":
    "Geteilter Kontext über alle Apps (kein erneutes Hochladen)",
  "suite.platform.li3": "Erklärbare Ausgaben, Rubrik-Ausrichtung und Prüfpfade",

  // Suite - Why Schools (DE)
  "suite.why.title": "Warum Schulen Zaza wählen",
  "suite.why.timeSaved":
    "Zeitersparnis: Lehrkräfte gewinnen jede Woche Stunden zurück.",
  "suite.why.retention":
    "Bindung unterstützt: Weniger Stress und gerechtere Arbeitslast.",
  "suite.why.safety":
    "Sicher und konform: Datenschutz und Schutz standardmäßig.",
  "suite.why.evidence":
    "Evidenzbasiert: Pädagogik und Nachvollziehbarkeit, nicht nur Tempo.",

  // Suite - Roadmap (DE)
  "suite.roadmap.title": "Bereit für die Roadmap",
  "suite.roadmap.body":
    "Geplante Erweiterungen umfassen intelligentere Elternkommunikation, formative Bewertungssynthese, und Unterstützung bei Differenzierung - alles über KnowledgeCore bereitgestellt, damit der Nutzen überall ankommt, nicht nur in einem einzelnen Tool.",

  // Suite - CTA (DE)
  "suite.cta.title": "Jetzt entdecken",
  "suite.cta.body":
    "Ob Sie als Lehrkraft Entlastung suchen oder als Schule skalierbare Unterstützung: Zaza hilft Ihrem Team zu gedeihen.",
  "suite.cta.primary": "Lösungen ansehen",
  "suite.cta.secondary": "Mit unserem Team sprechen",

  // Suite - Trust Bar (DE)
  "suite.trust.hallucinationSafe": "Keine erfundenen Schuelerinformationen",
  "suite.trust.ferpa": "FERPA-ready",
  "suite.trust.teachers": "Mit Lehrkräften an jedem Schritt entwickelt",

  // Suite - How It Works (DE)
  "suite.hiw.title": "So funktioniert die Suite",
  "suite.hiw.step1.title": "Passende App wählen",
  "suite.hiw.step1.desc":
    "Teach fürs Planen, Draft fürs Schreiben, GradeFlow fürs Bewerten, Shield für Grenzen.",
  "suite.hiw.step2.title": "Eigenen Kontext hinzufügen",
  "suite.hiw.step2.desc":
    "Lehrplan, Klassendetails, Rubriken und Ton fließen einmal in KnowledgeCore ein und gelten überall.",
  "suite.hiw.step3.title": "Schulreife Ergebnisse erhalten",
  "suite.hiw.step3.desc":
    "Vertrauenswürdige, erklärbare Resultate mit konsistenten Schutzmechanismen in jedem Workflow.",

  // Suite - Testimonials (DE)
  "suite.testimonials.title": "Stimmen aus der Praxis",
  "suite.testimonials.1.quote":
    "Ich bekomme meinen Sonntag zurück. Planung und Elternkommunikation dauern jetzt Minuten statt Stunden.",
  "suite.testimonials.1.author": "Sarah Mitchell",
  "suite.testimonials.1.role": "Grundschullehrerin, UK",
  "suite.testimonials.2.quote":
    "Konsistente Bewertung mit klaren Nachweisen. GradeFlow hat die Qualität klassenübergreifend erhöht.",
  "suite.testimonials.2.author": "Michael Brown",
  "suite.testimonials.2.role": "Oberstufenlehrer, USA",
  "suite.testimonials.3.quote":
    "Draft schützt Ton und Wohlbefinden. Ich kommuniziere mehr - mit weniger Stress.",
  "suite.testimonials.3.author": "Emma Rodriguez",
  "suite.testimonials.3.role": "Lehrerin Sek I, CA",

  // Suite - Logos (DE)
  "suite.logos.title": "Vertrauenswürdig bei Lehrkräften an",
  "suite.logos.item1": "Oakridge High",
  "suite.logos.item2": "Riverstone Grundschule",
  "suite.logos.item3": "Northfield Akademie",
  "suite.logos.item4": "St. Mary's College",
  "suite.logos.item5": "Greenwood Schule",

  // Suite - Screenshots (DE)
  "suite.screens.title": "Für echte Lehrkräfte in echten Klassenzimmern gebaut",
  "suite.screens.caption":
    "Ruhige, verantwortliche KI, die sich an die Realität des Unterrichtens anpasst – nicht an generische Software-Workflows.",

  // Videos (DE)
  "videos.hero.title": "Video-Tutorials und Demos",
  "videos.search.placeholder": "Videos durchsuchen...",
  "videos.categories.all": "Alle Videos",
  "videos.categories.getting-started": "Erste Schritte",
  "videos.categories.advanced": "Erweiterte Funktionen",
  "videos.categories.use-cases": "Anwendungsfälle",
  "videos.categories.best-practices": "Bewährte Methoden",
  "videos.categories.tips-tricks": "Tipps & Tricks",
  "videos.section.all": "Alle Videos",

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
    "Schließen Sie sich Tausenden von Lehrkräften an, die ihre Praxis mit KI transformieren. Registrieren Sie sich noch heute für Ihr erstes Webinar.",
  "webinars.cta.browseUpcoming": "Bevorstehende Webinare ansehen",

  // Community (DE)
  "community.hero.badge": "25.000+ aktive Lehrkräfte",
  "community.hero.titlePrefix": "Treten Sie der",
  "community.hero.titleHighlight": "Lehrkräfte-Community",
  "community.hero.subtitle":
    "Vernetzen Sie sich mit Pädagogen weltweit. Teilen Sie Strategien, stellen Sie Fragen und lernen Sie von Lehrkräften, die KI erfolgreich in ihrem Unterricht einsetzen.",
  "community.search.placeholder": "Diskussionen durchsuchen...",
  "community.stats.members": "Mitglieder",
  "community.stats.discussions": "Diskussionen",
  "community.stats.posts": "Beiträge",
  "community.stats.active": "Aktiv",
  // Categories
  "community.categories.getting-started.name": "Erste Schritte mit KI",
  "community.categories.getting-started.desc":
    "Neu bei KI? Beginnen Sie hier mit anfängerfreundlichen Diskussionen und Tipps.",
  "community.categories.prompt-engineering.name": "Prompt Engineering",
  "community.categories.prompt-engineering.desc":
    "Teilen und diskutieren Sie effektive Prompts für verschiedene Unterrichtsszenarien.",
  "community.categories.lesson-planning.name": "Unterrichtsplanung",
  "community.categories.lesson-planning.desc":
    "Kollaborieren Sie an KI-gestützten Unterrichtsplänen und Unit-Designs.",
  "community.categories.parent-communication.name": "Elternkommunikation",
  "community.categories.parent-communication.desc":
    "Tipps zum Einsatz von KI zur Verbesserung der Kommunikation zwischen Eltern und Lehrkräften.",
  "community.categories.assessment-feedback.name": "Bewertung & Feedback",
  "community.categories.assessment-feedback.desc":
    "Diskutieren Sie KI-Tools für Benotung, Feedback und formative Bewertung.",
  "community.categories.differentiation.name": "Differenzierung & IEPs",
  "community.categories.differentiation.desc":
    "Einsatz von KI zur Unterstützung unterschiedlicher Lernender und Erstellung von Anpassungen.",
  "community.categories.ethics-policy.name": "Ethik & Richtlinien",
  "community.categories.ethics-policy.desc":
    "Diskutieren Sie ethische Überlegungen, Richtlinien und bewährte Verfahren.",
  "community.categories.tool-reviews.name": "Tool-Bewertungen & Vergleiche",
  "community.categories.tool-reviews.desc":
    "Teilen Sie Erfahrungen mit verschiedenen KI-Tools und Plattformen.",
  "community.categories.success-stories.name": "Erfolgsgeschichten",
  "community.categories.success-stories.desc":
    "Feiern Sie Erfolge und teilen Sie, was in Ihrem Klassenzimmer funktioniert.",
  "community.categories.troubleshooting.name": "Fehlerbehebung",
  "community.categories.troubleshooting.desc":
    "Holen Sie sich Hilfe, wenn etwas nicht wie erwartet funktioniert.",
  "community.categories.subject-specific.name": "Fachspezifisch",
  "community.categories.subject-specific.desc":
    "Diskussionen nach Fachgebieten (Mathematik, ELA, Naturwissenschaften usw.) organisiert.",
  "community.categories.off-topic.name": "Off-Topic Lounge",
  "community.categories.off-topic.desc":
    "Vernetzen Sie sich mit anderen Pädagogen zu Nicht-KI-Themen.",
  // Badges
  "community.badges.firstPost.name": "Erster Beitrag",
  "community.badges.firstPost.desc": "Ersten Beitrag erstellt",
  "community.badges.helpful.name": "Hilfreich",
  "community.badges.helpful.desc": "50+ Likes erhalten",
  "community.badges.expert.name": "Experte",
  "community.badges.expert.desc": "Experten-Level erreicht",
  "community.badges.ambassador.name": "Botschafter",
  "community.badges.ambassador.desc": "Offizieller Zaza-Botschafter",
  // Guidelines
  "community.guidelines.title": "Community-Richtlinien",
  "community.guidelines.li1": "Seien Sie respektvoll und unterstützend",
  "community.guidelines.li2": "Teilen Sie praktische, umsetzbare Ratschläge",
  "community.guidelines.li3": "Schützen Sie die Privatsphäre der Schüler",
  "community.guidelines.li4": "Geben Sie Anerkennung, wo sie gebührt",
  "community.guidelines.read": "Vollständige Richtlinien lesen",
  // Related
  "community.related.title": "Erweitern Sie Ihr Wissen",
  "community.related.desc":
    "Erweitern Sie Ihre Community-Erfahrung mit diesen Lernressourcen",
  "community.related.aiLiteracy.title": "KI-Alphabetisierungskurse",
  "community.related.aiLiteracy.desc":
    "Lernen Sie die in der Community diskutierten Grundlagen",
  "community.related.webinars.title": "Experten-Webinare",
  "community.related.webinars.desc":
    "Live-Sitzungen zu trendigen Community-Themen",
  "community.related.glossary.title": "KI-Glossar",
  "community.related.glossary.desc":
    "Verstehen Sie die in Diskussionen verwendete Terminologie",
  // CTA
  "community.cta.titlePrefix": "Bereit zum",
  "community.cta.titleHighlight": "Beitritt zur Konversation?",
  "community.cta.body":
    "Erstelle dein kostenloses Konto und vernetze dich mit Tausenden Lehrkräften, die KI im Alltag einsetzen.",
  "community.cta.primary": "Kostenloses Konto erstellen",
  "community.cta.secondary": "Als Gast stöbern",

  "about.nav.title": "Über",
  "about.nav.company": "Unternehmen",
  "about.nav.founder": "Gründer",
  "about.nav.press": "Presse-Kit",
  "about.nav.careers": "Karriere",

  // Hero Section
  "hero.eyebrow": "Zaza - Just Teach.",
  "hero.badge": "Zaza hilft Lehrkräften, erfolgreich zu bleiben",
  "hero.headline": "Schreibe E-Mails, die",
  "hero.headlineAccent": "sicher zu senden sind.",
  "hero.subheading":
    "Draft hilft dir, klare, sachliche Formulierungen für Eltern- und Schulleitungskommunikation zu erstellen – so geschrieben, als könnten sie weitergeleitet, gescreenshotet oder später geprüft werden. Abgesicherte Formulierungen, eine saubere Dokumentationsspur und ein professioneller Co-Writer – kein Ersatz. Weniger Umschreiben. Weniger Risiko. Mehr Kopf frei.",
  "hero.ctaPrimary": "Early Access beitreten",
  "hero.ctaSecondary": "Beispiele ansehen",
  "hero.trustIndicators.hallucinationSafe":
    "Keine erfundenen Schülerinformationen",
  "hero.trustIndicators.ferpaCompliant": "FERPA-ready",
  "hero.trustIndicators.teachers": "Mit Lehrkräften entwickelt",
  "hero.trustClarifier":
    "Draft überarbeitet von Lehrkräften bereitgestellten Text. Schulen bleiben Datenverantwortliche; Draft ist für den datenschutzorientierten Umgang mit Kommunikationsentwürfen entwickelt.",
  "situations.title": "Situationen, die du kennen wirst",
  "situations.items.gradeDispute": "Notenstreit mit Schulleitung im CC.",
  "situations.items.accidentalCC":
    '"Aus Versehen" CC/BCC oder falscher Empfänger.',
  "situations.items.escalation":
    "Eltern drohen mit Eskalation zur Schulleitung oder zum Schulträger.",
  "situations.items.behaviorIncident":
    "Dokumentation eines Vorfalls, der aus dem Kontext gelesen werden könnte.",
  "situations.items.toneAccusation":
    "Der Ton wird angegriffen – Screenshot als Beleg.",
  "situations.items.sensitiveReport":
    "Sensibler Berichtskommentar mit Bedarf an sauberer Dokumentationsspur.",

  // Early Access Page
  "earlyAccess.hero.title": "Tritt dem Zaza Draft Early-Access-Programm bei",
  "earlyAccess.hero.subtitle":
    "Hilf uns, die ruhige, lehrerzentrierte KI-Schreibassistenz zu bauen, die du verdienst.",
  "earlyAccess.hero.cta": "Early Access beitreten",
  "earlyAccess.overview.heading": "Warum wir die private Beta starten",
  "earlyAccess.overview.body":
    "Wir laden Lehrkräfte ein, die Elternmails, Zeugnisnoten und Feedback jonglieren, um Workflows, Leitplanken und Prioritäten mitzugestalten.",
  "earlyAccess.benefits.title": "Beta-Vorteile",
  "earlyAccess.benefits.heading": "Was du als Beta-Partner erhältst",
  "earlyAccess.benefits.shaping.title": "Produkt gestalten",
  "earlyAccess.benefits.shaping.body":
    "Teile, was wichtig ist – Tonleitplanken, Modus-Umschalter und Insights, die deinen Unterricht widerspiegeln.",
  "earlyAccess.benefits.saving.title": "Wöchentlich Stunden gewinnen",
  "earlyAccess.benefits.saving.body":
    "Erlebe ruhige, sichere Entwürfe und sieh, wie viel Zeit du zurückgewinnst.",
  "earlyAccess.benefits.perks.title": "Exklusive Vorteile genießen",
  "earlyAccess.benefits.perks.body":
    "Erhalte Vorabzugang zu Post-Launch-Inhalten, privaten Webinaren und einer Lehrer:innen-Community.",
  "earlyAccess.steps.title": "So funktioniert das Early-Access-Programm",
  "earlyAccess.steps.step1.title": "Erzähl uns, wer du bist",
  "earlyAccess.steps.step1.body":
    "Fülle ein kurzes Formular mit deiner Rolle, deinem Schulkontext und deinen Kommunikationsaufgaben aus.",
  "earlyAccess.steps.step2.title": "Bestätigung erhalten",
  "earlyAccess.steps.step2.body":
    "Du bekommst eine E-Mail mit den nächsten Schritten, Erwartungen und dem Startzeitraum.",
  "earlyAccess.steps.step3.title": "30 Tage Zugang",
  "earlyAccess.steps.step3.body":
    "Teste geführte Entwürfe, Tonoptionen und Fortschrittsmetriken für einen begrenzten Zeitraum.",
  "earlyAccess.steps.step4.title": "Feedback geben",
  "earlyAccess.steps.step4.body":
    "Teile Eindrücke über kurze Umfragen oder optionale Gespräche, damit wir mit deiner Stimme bauen.",
  "earlyAccess.note.limited":
    "Plätze sind begrenzt und wir schließen Bewerbungen, sobald alle Slots vergeben sind.",
  "earlyAccess.faq.title": "FAQ",
  "earlyAccess.faq.eligibility.question": "Wer darf mitmachen?",
  "earlyAccess.faq.eligibility.answer":
    "Lehrkräfte, Schulleitungen und pädagogische Teams, die Elternkommunikation verantworten, dürfen sich bewerben.",
  "earlyAccess.faq.privacy.question": "Sind meine Texte privat?",
  "earlyAccess.faq.privacy.answer":
    "Ja. Alles bleibt privat, verschlüsselt und unterliegt unseren GDPR-ready Richtlinien – keine öffentliche Veröffentlichung und kein Teilen ohne deine Zustimmung.",
  "earlyAccess.faq.afterBeta.question": "Was passiert nach der Beta?",
  "earlyAccess.faq.afterBeta.answer":
    "Du kannst Teil der Community bleiben, bekommst Launch-Infos und bleibst weiter im Gespräch, während wir Zaza Draft vor dem allgemeinen Release verbessern.",

  // Hallucination-Safe Tooltip
  "hallucinationSafe.tooltip.heading":
    "Was bedeutet 'Keine erfundenen Schuelerinformationen'?",
  "hallucinationSafe.tooltip.body":
    "Im Gegensatz zu generischen KI-Tools ist Zaza Draft speziell darauf trainiert, das Erfinden von Schülerinformationen, die Erfindung von Elterninteraktionen oder das Erfinden von Details über Ihre Klasse zu vermeiden. Jede Ausgabe basiert auf dem, was Sie tatsächlich bereitstellen – keine erfundenen Fakten, keine fiktiven Szenarien.",

  // Problem Section
  "philosophy.topParagraph":
    "Zaza hilft Lehrkräften, erfolgreich zu bleiben. Draft ist professionelle Schreibunterstützung, die kognitive Last reduziert, Ton schützt und den unsichtbaren Stress schulischer Kommunikation senkt.",
  "problem.heading":
    "Mehr Fokus auf Unterricht, weniger Nachtarbeit beim Schreiben",
  "problem.body":
    "Elternmails, Feedback und Berichte brauchen weiterhin Sorgfalt und Präzision. Draft hilft dir, sie mit weniger mentaler Belastung zu erledigen, damit mehr Energie für Schülerinnen und Schüler bleibt.",
  "problem.stats.parentEmails.value": "Wöchentlich",
  "problem.stats.parentEmails.label": "Eltern-E-Mails",
  "problem.stats.reportCards.value": "Je Quartal",
  "problem.stats.reportCards.label": "Zeugnisse",
  "problem.stats.gradingFeedback.value": "Laufend",
  "problem.stats.gradingFeedback.label": "Bewertungs-Feedback",

  // Solution/Mission Section
  "solution.heading":
    "Ruhige Schreibunterstützung für professionelle Schulkommunikation",
  "solution.bodyPrimary":
    "Draft macht aus Rohnotizen klare, versandfertige Kommunikation für Nachrichten, Feedback und Berichte. Entwickelt, um kognitive Last zu senken und professionelle Sicherheit zu stärken, nicht um pädagogisches Urteil zu ersetzen.",
  "solution.bodySecondary":
    "Ton-Leitplanken und Deeskalations-Hilfe unterstützen dich dabei, in schwierigen Situationen ruhig, klar und konsistent zu bleiben. Du prüfst jeden Entwurf, behältst deine Stimme und sendest mit Sicherheit.",

  // Stats Section
  "stats.documentsRefined.number": "150k+",
  "stats.documentsRefined.label": "Dokumente verfeinert",
  "stats.teachers.number": "Lehrerzentriert",
  "stats.teachers.label": "Designpartner",
  "stats.timeSaved.number": "Zeit zurück",
  "stats.timeSaved.label": "für den Unterricht",
  "stats.subtitle":
    "Von Lehrkräften gebaut, um Sonntagnacht-Stress zu reduzieren - werde Teil unseres Early-Access-Programms und gestalte ruhige, professionelle Kommunikation mit KI mit.",
  "socialProof.badges.teacherFounded":
    "Von Lehrkräften gegründet – mit Doktortitel in Bildungswissenschaft",
  "socialProof.badges.gdprReady": "In Deutschland entwickelt – DSGVO-konform",
  "socialProof.badges.teacherFeedback":
    "Mit echtem Lehrkräfte-Feedback entwickelt",
  "socialProof.badges.hallucinationSafe":
    "Keine erfundenen Schuelerinformationen",

  // How It Works Section
  "howItWorks.heading": "Wie Draft Klarheit zurückbringt",
  "howItWorks.diagram.step1.title": "Ihre Eingabe",
  "howItWorks.diagram.step1.description": "Grobe Notizen oder Stichpunkte",
  "howItWorks.diagram.step1.example": "Sam passt im Unterricht nicht auf.",
  "howItWorks.diagram.step2.title": "Tonauswahl",
  "howItWorks.diagram.step2.description": "Wählen Sie Ihre Stimme",
  "howItWorks.diagram.step2.example":
    "Unterstützend, Formell, Prägnant oder Neutral",
  "howItWorks.diagram.step3.title": "Überarbeitete Ausgabe",
  "howItWorks.diagram.step3.description": "Lehrerbereite Kommunikation",
  "howItWorks.diagram.step3.example":
    "Ich wollte mich wegen Sams jüngsten Konzentrationsschwierigkeiten melden...",
  "howItWorks.steps.step1.number": "1",
  "howItWorks.steps.step1.title":
    "Fügen Sie Ihren Entwurf ein oder beschreiben Sie, was Sie benötigen",
  "howItWorks.steps.step1.description":
    "Beginnen Sie mit groben Notizen, Stichpunkten oder einem vollständigen Entwurf",
  "howItWorks.steps.step2.number": "2",
  "howItWorks.steps.step2.title":
    "Wählen Sie Ihren Ton und sehen Sie zu, wie Draft ihn verfeinert",
  "howItWorks.steps.step2.description":
    "Unterstützend, formell, prägnant oder neutral – immer bearbeitbar",
  "howItWorks.steps.step3.number": "3",
  "howItWorks.steps.step3.title": "Exportieren & teilen",
  "howItWorks.steps.step3.description":
    "Kopieren, herunterladen oder mit einem Klick in Ihre Schul-Tools teilen",

  // Demo Section
  "demo.heading": "Draft in Aktion erleben",
  "demo.tabs.parentEmail": "Eltern-E-Mail",
  "demo.tabs.reportCard": "Zeugnis",
  "demo.tabs.gradingComment": "Bewertungs-Kommentar",
  "demo.before.label": "VORHER (IHR ENTWURF)",
  "demo.toneSelector": "Ton: Unterstützend",
  "demo.ctaButton": "Neu schreiben",
  "demo.after.label": "NACHHER (DRAFTS VERSION)",
  "demo.tryItYourself": "Selbst ausprobieren",
  "demo.testimonial.quote":
    "Ich habe meinen Sonntag zurück. Draft hält meine Nachrichten ruhig und klar.",
  "demo.testimonial.name": "Sarah Mitchell",
  "demo.testimonial.author": "Grundschullehrerin, UK",
  "demo.email.before": "Sam passt im Unterricht nicht auf.",
  "demo.email.after":
    "Ich wollte mich wegen Sams jüngsten Konzentrationsschwierigkeiten im Unterricht melden. Mir ist aufgefallen, dass er hart arbeitet, aber einige Schwierigkeiten hat, während des Unterrichts engagiert zu bleiben. Ich würde gerne ein kurzes Gespräch vereinbaren, um Strategien zu besprechen, die wir sowohl in der Schule als auch zu Hause anwenden können, um sein Lernen zu unterstützen. Hätten Sie diese Woche Zeit für einen kurzen Anruf?",
  "demo.report.before":
    "Guter Schüler, bemüht sich sehr, muss sich mehr beteiligen.",
  "demo.report.after":
    "Sam zeigt durchweg große Anstrengung und eine positive Einstellung zum Lernen. Er zeigt ein starkes Verständnis für Kernkonzepte und bearbeitet Aufgaben sorgfältig. Um seine Fähigkeiten weiterzuentwickeln, ermutige ich Sam, seine Ideen häufiger in Klassendiskussionen zu teilen, da seine Einsichten unserer Lerngemeinschaft sehr zugute kommen würden.",
  "demo.grading.before":
    "Aufsatz ist in Ordnung, braucht aber Arbeit an der These und den Beweisen.",
  "demo.grading.after":
    "Ihr Aufsatz zeigt ein gutes Verständnis für das Thema und enthält relevante Beispiele. Um Ihr Argument zu stärken, sollten Sie in Ihrer Einleitung eine spezifischere These entwickeln. Versuchen Sie außerdem, direkte Zitate aus dem Text einzubauen, um Ihre Analyse zu untermauern. Ich würde gerne sehen, wie Sie Ihre Ideen im dritten Absatz erweitern. Großartiger Anfang!",

  // Use Cases Section
  "useCases.heading": "Für Schreiben, das dich vom Unterrichten abhält",
  "useCases.cards.parentMessages.title": "Elternnachrichten",
  "useCases.cards.parentMessages.description":
    "Ruhige, klare Antworten, die deeskalieren",
  "useCases.cards.parentMessages.examples":
    "Verhaltensbedenken, Fortschritts-Updates, Anwesenheitsprobleme",
  "useCases.cards.reportCards.title": "Zeugnisse",
  "useCases.cards.reportCards.description":
    "Aus Stichpunkten werden menschliche Berichtskommentare",
  "useCases.cards.reportCards.examples":
    "Quartalsberichte, Fortschritts-Zusammenfassungen, Interventionspläne",
  "useCases.cards.gradingComments.title": "Bewertungs-Kommentare",
  "useCases.cards.gradingComments.description":
    "Schnelleres, wärmeres Feedback in deiner Stimme",
  "useCases.cards.gradingComments.examples":
    "Kriteriumsbasierte Kommentare, Rubrik-Feedback",
  "useCases.cards.schoolCommunications.title": "Schulkommunikation",
  "useCases.cards.schoolCommunications.description":
    "Newsletter und Ankündigungen professionell entwerfen",
  "useCases.cards.schoolCommunications.examples":
    "Updates, Veranstaltungsankündigungen, Richtlinien-Kommunikation",
  "useCases.cards.referenceLetters.title": "Empfehlungsschreiben",
  "useCases.cards.referenceLetters.description":
    "Überzeugende Empfehlungen selbstbewusst schreiben",
  "useCases.cards.referenceLetters.examples":
    "Hochschulempfehlungen, Arbeitszeugnisse",
  "useCases.cards.documentation.title": "Dokumentation",
  "useCases.cards.documentation.description":
    "Klare Aufzeichnungen und Besprechungsnotizen erstellen",
  "useCases.cards.documentation.examples":
    "IEP-Dokumentation, Elternkonferenzen",

  // Comparison Section
  "comparison.heading":
    "Warum Zaza Draft sich anders anfühlt als generische KI",
  "comparison.subheading":
    "Abgesicherte Formulierungen sind wichtiger als flüssiger Text. Draft ist für schriftliche Nachvollziehbarkeit gebaut und so formuliert, als könnte es weitergeleitet, gescreenshotet oder aus dem Kontext gelesen werden.",
  "comparison.clarifier":
    "Keine Schülervornamen erforderlich. Draft wird nicht mit deinen Eingaben trainiert und fokussiert sich nur auf Formulierung und Ton.",
  "comparison.tableHeaders.feature": "Funktion",
  "comparison.tableHeaders.genericAI": "Generische KI-Tools (ChatGPT, usw.)",
  "comparison.tableHeaders.zazaDraft": "Zaza Draft",
  "comparison.rows.training.feature": "Training",
  "comparison.rows.training.generic": "Allgemeinwissen, geschäftsorientiert",
  "comparison.rows.training.zaza":
    "Mit Lehrkräfte-Designpartnern und bildungsspezifischen Workflows entwickelt",
  "comparison.rows.safety.feature": "Sicherheit",
  "comparison.rows.safety.generic":
    "Kann Schülerdetails oder Szenarien erfinden",
  "comparison.rows.safety.zaza":
    "Erfindet keine schülerbezogenen Aussagen – überarbeitet nur das, was du vorgibst",
  "comparison.rows.toneControl.feature": "Tonkontrolle",
  "comparison.rows.toneControl.generic": "Begrenzt oder inkonsistent",
  "comparison.rows.toneControl.zaza": "4+ bildungsspezifische Töne",
  "comparison.rows.compliance.feature": "Compliance",
  "comparison.rows.compliance.generic": "Nicht FERPA-konzipiert",
  "comparison.rows.compliance.zaza": "FERPA-ready von Grund auf",
  "comparison.rows.useCases.feature": "Anwendungsfälle",
  "comparison.rows.useCases.generic": "Generische Schreibaufgaben",
  "comparison.rows.useCases.zaza": "6 spezialisierte Lehrer-Workflows",
  "comparison.rows.outputQuality.feature": "Ausgabequalität",
  "comparison.rows.outputQuality.generic": "Erfordert starke Bearbeitung",
  "comparison.rows.outputQuality.zaza":
    "Abgesicherte, lehrerbereite Formulierungen",
  "comparison.rows.learningCurve.feature": "Lernkurve",
  "comparison.rows.learningCurve.generic": "Komplexe Prompts erforderlich",
  "comparison.rows.learningCurve.zaza": "Einfügen, Ton wählen, fertig",
  "comparison.rows.community.feature": "Community",
  "comparison.rows.community.generic": "Kein Lehrkräfte-Support",
  "comparison.rows.community.zaza":
    "Lehrkräfte gestalten unsere private Beta mit",
  "caseStudies.eyebrow": "Vorher / Nachher",
  "caseStudies.heading": "Vorher / Nachher aus echten Klassenzimmern",
  "caseStudies.subheading":
    "Kurze Einblicke, wie Draft heikle Texte in klare, ruhige Nachrichten verwandelt.",
  "caseStudies.beforeLabel": "Vorher",
  "caseStudies.afterLabel": "Nachher mit Draft",
  "caseStudies.afterTag": "Draft-Version",
  "caseStudies.prev": "Zurück",
  "caseStudies.next": "Weiter",

  // Why Choose Section
  "whyChoose.heading":
    "Warum Lehrkräfte Draft für ruhige, sichere Kommunikation wählen",
  "whyChoose.benefits.beatWritersBlock.title": "Fokus schnell zurückgewinnen",
  "whyChoose.benefits.beatWritersBlock.description":
    "Aus Rohnotizen werden klare Entwürfe ohne mentale Überlastung",
  "whyChoose.benefits.writeWithConfidence.title":
    "Professionelle Sicherheit stärken",
  "whyChoose.benefits.writeWithConfidence.description":
    "Klar, ruhig und schulgeeignet in jeder Nachricht",
  "whyChoose.benefits.saveTime.title": "Kognitive Last täglich senken",
  "whyChoose.benefits.saveTime.description":
    "Weniger Umschreiben und Grübeln in sensiblen Momenten",
  "whyChoose.benefits.breakBarriers.title":
    "Über Sprachgrenzen klar kommunizieren",
  "whyChoose.benefits.breakBarriers.description":
    "Familienkommunikation übersetzen und professionellen Ton behalten",

  // Testimonials Section
  "testimonials.heading": "Was Lehrkräfte sagen",
  "testimonials.quote1.text":
    "Ich habe meinen Sonntag zurück. Draft hält meine Nachrichten ruhig und klar.",
  "testimonials.quote1.name": "Sarah Mitchell",
  "testimonials.quote1.author": "Grundschullehrerin, UK",
  "testimonials.quote2.text": "Kommentare sind konsistent und wertschätzend.",
  "testimonials.quote2.name": "Marcus Johnson",
  "testimonials.quote2.author": "Mittelschullehrer, USA",
  "testimonials.quote3.text":
    "GradeFlow hilft unserem Team, sich auf Standards zu einigen.",
  "testimonials.quote3.name": "Dr. Anna Weber",
  "testimonials.quote3.author": "Abteilungsleiterin, DE",

  // Final CTA Section
  "finalCTA.heading": "Zaza - Just Teach.",
  "finalCTA.subheading":
    "Zaza hilft Lehrkräften, erfolgreich zu bleiben. Trete der privaten Beta bei und nutze Draft als ruhige, professionelle Schreibunterstützung, die Unterrichtszeit zurückgibt.",
  "finalCTA.button": "Early Access beitreten",

  // Footer
  "footer.social.tiktok": "Folgen Sie uns auf TikTok @zazatechnologies",
  "footer.social.twitter": "Folgen Sie uns auf X (Twitter) @zazateachapp",
  "footer.social.linkedin": "Vernetzen Sie sich mit uns auf LinkedIn",
  "footer.productEcosystem": "Produkt & Ökosystem",
  "footer.learningResources": "Lernen & Ressourcen",
  "footer.company": "Unternehmen",
  "footer.features": "Funktionen",
  "footer.pricing": "Preise",
  "footer.teacherStories": "Erfolgsgeschichten",
  "footer.zazaTeach": "Zaza Teach",
  "footer.zazaDraft": "Zaza Draft",
  "footer.gradeflow": "GradeFlow",
  "footer.zazaShield": "Zaza Shield",
  "footer.zazaTech": "Zaza Technologies",
  "footer.blog": "Blog",
  "footer.teacherResources": "Ressourcen für Lehrkräfte",
  "footer.support": "Support",
  "footer.faq": "FAQ",
  "footer.about": "Über uns",
  "footer.privacy": "Datenschutzrichtlinie",
  "footer.terms": "Nutzungsbedingungen",
  "footer.contact": "Kontakt",

  // Products - Teach
  "products.teach.hero.eyebrow": "UNTERRICHTSPLANUNG LEICHT GEMACHT",
  "products.teach.hero.title": "Bessere Lektionen in kürzerer Zeit planen",
  "products.teach.hero.subtitle":
    "KI-gestützte Unterrichtsplanung, die sich an Ihren Lehrplan anpasst, Stunden Vorbereitungszeit spart und Ihnen hilft, spannende, standardkonforme Lektionen zu erstellen.",
  "products.teach.hero.cta.primary": "Kostenlos mit der Planung beginnen",
  "products.teach.hero.cta.secondary": "Demo ansehen",

  "products.teach.turn.pain1":
    "Jede Woche Stunden damit verbringen, Unterrichtspläne von Grund auf neu zu erstellen",
  "products.teach.turn.pain2":
    "Schwierigkeiten haben, für unterschiedliche Lernende zu differenzieren",
  "products.teach.turn.pain3":
    "Zeit durch administrative Aufgaben verlieren, anstatt zu unterrichten",

  "products.teach.features.title":
    "Alles, was Sie zum Planen großartiger Lektionen benötigen",
  "products.teach.features.autoplanner.title": "Auto-Planer",
  "products.teach.features.autoplanner.desc":
    "Generieren Sie vollständige, auf Ihre Lehrplanstandards abgestimmte Unterrichtspläne in Minuten",
  "products.teach.features.curriculum.title": "Lehrplan-Konform",
  "products.teach.features.curriculum.desc":
    "Integrierte Unterstützung für Common Core, staatliche Standards und internationale Lehrpläne",
  "products.teach.features.gamified.title": "Gamifizierte Aktivitäten",
  "products.teach.features.gamified.desc":
    "Erstellen Sie spannende, interaktive Aktivitäten, die Schüler motiviert halten",

  "products.teach.howItWorks.title": "So funktioniert es",
  "products.teach.howItWorks.step1.title": "Ziele festlegen",
  "products.teach.howItWorks.step1.desc":
    "Teilen Sie uns Ihr Fach, Ihre Klassenstufe und Ihre Lernziele mit",
  "products.teach.howItWorks.step2.title": "KI generiert Plan",
  "products.teach.howItWorks.step2.desc":
    "Erhalten Sie in Sekundenschnelle einen vollständigen, standardkonformen Unterrichtsplan",
  "products.teach.howItWorks.step3.title": "Anpassen & Unterrichten",
  "products.teach.howItWorks.step3.desc":
    "Bearbeiten, speichern und teilen Sie Ihre Lektionen mit Ihrem Team",

  "products.teach.whoItsFor.title": "Perfekt für",
  "products.teach.whoItsFor.item1":
    "Lehrkräfte, die Zeit bei der Unterrichtsplanung sparen möchten",
  "products.teach.whoItsFor.item2":
    "Pädagogen, die effektiver differenzierten Unterricht gestalten möchten",
  "products.teach.whoItsFor.item3":
    "Schulen, die konsistente, standardkonforme Lehrpläne suchen",

  "products.teach.change.title": "Transformieren Sie Ihren Planungsprozess",
  "products.teach.change.step1":
    "Planungszeit von Stunden auf Minuten reduzieren",
  "products.teach.change.step2":
    "Spannendere, differenziertere Lektionen erstellen",
  "products.teach.change.step3":
    "Einhaltung der Lehrplanstandards sicherstellen",
  "products.teach.change.step4":
    "Teilen und kollaborieren Sie mit Ihrem Lehrerteam",

  "products.teach.social.title": "Was Lehrkräfte sagen",
  "products.teach.social.quote1":
    "Teach hat meine Planungszeit halbiert. Ich kann mich auf das konzentrieren, was zählt – meine Schüler.",
  "products.teach.social.author1": "Emma Thompson, Lehrerin 4. Klasse",
  "products.teach.social.quote2":
    "Die Lehrplan-Konformitätsfunktion ist ein Game-Changer für unsere Abteilung.",
  "products.teach.social.author2": "Michael Chen, Abteilungsleiter",

  "products.teach.cta.title": "Bereit, Ihre Planung zu transformieren?",
  "products.teach.cta.subtitle":
    "Schliessen Sie sich Hunderten von Lehrkraeften an, die eingesparte Stunden pro Woche sehen",
  "products.teach.cta.primary": "Early Access beitreten",
  "products.teach.cta.secondary": "Demo planen",

  // Products - Draft
  "products.draft.hero.eyebrow": "KI-SCHREIBASSISTENT FÜR LEHRKRÄFTE",
  "products.draft.hero.title": "Elternmails ohne Sonntagsdruck",
  "products.draft.hero.subtitle":
    "Draft macht aus Stichpunkten ruhige, professionelle Elternnachrichten, Berichtskommentare und Bewertungs-Feedback. Ton-Leitplanken und Deeskalation geben dir Sicherheit und Zeit zurück.",
  "products.draft.hero.cta.primary": "Early Access beitreten",
  "products.draft.hero.cta.secondary": "Beispiele ansehen",

  "products.draft.turn.pain1":
    "Elternmails spätabends, die ruhig und deeskalierend sein müssen",
  "products.draft.turn.pain2":
    "Berichtskommentare, die ewig dauern, um menschlich zu klingen",
  "products.draft.turn.pain3":
    "Feedback immer neu formulieren, damit es klar, freundlich und schnell ist",

  "products.draft.features.title": "Für die schwierigen Gespräche gebaut",
  "products.draft.features.toneGuardrails.title": "Ton-Leitplanken",
  "products.draft.features.toneGuardrails.desc":
    "Hält Nachrichten ruhig, wertschätzend und deeskalierend, wenn es brennt",
  "products.draft.features.translationChecks.title": "Übersetzungsprüfungen",
  "products.draft.features.translationChecks.desc":
    "Sicherstellen, dass Ton und Absicht in jeder Sprache respektvoll bleiben",
  "products.draft.features.reviewSteps.title": "Überprüfungsschritte",
  "products.draft.features.reviewSteps.desc":
    "Du behältst die Kontrolle: prüfen, anpassen, freigeben",

  "products.draft.howItWorks.title": "So beruhigt es dein Schreiben",
  "products.draft.howItWorks.step1.title": "Notizen reinkopieren",
  "products.draft.howItWorks.step1.desc":
    "Starte mit Stichpunkten oder einem groben Entwurf – kein Feinschliff nötig",
  "products.draft.howItWorks.step2.title": "Ton wählen",
  "products.draft.howItWorks.step2.desc":
    "Unterstützend, formell, prägnant – mit Sicherheitsleitplanken als Standard",
  "products.draft.howItWorks.step3.title": "Prüfen & senden",
  "products.draft.howItWorks.step3.desc":
    "Kurz bearbeiten, kopieren und teilen, wenn es sich richtig anfühlt",
  "products.draft.insights.heading": "Insights & Fortschritt",
  "products.draft.insights.body":
    "Draft zeichnet Zeitersparnis, erstellte Entwürfe, Streaks und eine Qualitätsbewertung auf, damit du das Wachstum feiern kannst, das du mit jedem durchdachten Elternbrief bewirkst, und gleichzeitig unsere lehrerzentrierte Beta mitgestaltest.",
  "products.draft.interface.heading": "Geführte Entwurfsoberfläche",
  "products.draft.interface.body":
    "Tonleitplanken, kanalbezogene Modi und Spracheinstellungen vereinen sich in einem intuitiven Workspace, damit jeder Entwurf ruhig und professionell klingt, während du das Early-Access-Programm weiterentwickelst.",
  "products.draft.insights.imageAlt": "Zaza Draft Insights-Dashboard",
  "products.draft.interface.imageAlt": "Zaza Draft geführte Schreiboberfläche",

  "products.draft.whoItsFor.title": "Perfekt für",
  "products.draft.whoItsFor.item1":
    "Lehrkräfte, die Elternkommunikation nach Feierabend jonglieren",
  "products.draft.whoItsFor.item2":
    "Pädagog:innen, die aus Stichpunkten menschliche Berichtskommentare machen",
  "products.draft.whoItsFor.item3":
    "Schulteams, die respektvolle, prägnante Nachrichten ohne Stress brauchen",

  "products.draft.change.title": "Was sich mit Draft ändert",
  "products.draft.change.step1":
    "Zwei-Stunden-Mail-Marathons werden 5-Minuten-Reviews",
  "products.draft.change.step2":
    "Elternkommunikation bleibt ruhig, klar und professionell",
  "products.draft.change.step3": "Zuversicht in stressigen Gesprächen",
  "products.draft.change.step4":
    "Mehr Zeit zum Unterrichten, weniger Zeit fürs Umschreiben",

  "products.draft.techNote.title": "Keine erfundenen Schuelerinformationen:",
  "products.draft.techNote.body":
    "Draft erfindet keine Schülerdetails oder Elterninteraktionen. Leitplanken halten jede Nachricht bei dem, was du vorgibst.",

  "products.draft.social.title": "Was Lehrkräfte sagen",
  "products.draft.social.quote1":
    "Ich habe meinen Sonntag zurück. Draft macht aus Stunden Minuten – und hält meinen Ton ruhig, wenn ich gestresst bin.",
  "products.draft.social.author1": "Sarah Mitchell, Lehrerin 5. Klasse",
  "products.draft.social.quote2":
    "Die Tonleitplanken geben mir Sicherheit, besonders in schwierigen Gesprächen. Es fühlt sich wie emotionale Unterstützung für mein Postfach an.",
  "products.draft.social.author2": "James Rodriguez, Mittelschullehrer",

  "products.draft.cta.title": "Hol dir deine Zeit zurück",
  "products.draft.cta.subtitle":
    "Tritt unserer privaten Beta bei und gestalte lehrerzentrierte Kommunikation mit KI mit.",
  "products.draft.cta.primary": "Early Access beitreten",
  "products.draft.cta.secondary": "Beispiele ansehen",

  // Products - GradeFlow
  "products.gradeflow.hero.title": "Grade Faster, Grade Fairer",
  "products.gradeflow.hero.subtitle":
    "KI-gestützter Bewertungsassistent, der Ihnen hilft, konsistentes, konstruktives Feedback in der Hälfte der Zeit zu geben.",
  "products.gradeflow.hero.cta": "Kostenlos mit der Bewertung beginnen",

  "products.gradeflow.turn.pain1":
    "4-6 Stunden pro Woche mit der Bewertung von Aufgaben verbringen",
  "products.gradeflow.turn.pain2":
    "Inkonsistentes Feedback bei ähnlichen Schülerarbeiten",
  "products.gradeflow.turn.pain3":
    "Schwierigkeiten, detaillierte, konstruktive Kommentare zu geben",

  "products.gradeflow.change.title":
    "Transformieren Sie Ihren Bewertungsprozess",
  "products.gradeflow.change.step1": "Aufgabe und Rubrik hochladen",
  "products.gradeflow.change.step2":
    "KI analysiert Schülerarbeit anhand von Kriterien",
  "products.gradeflow.change.step3":
    "Vorgeschlagene Noten und Feedback überprüfen und anpassen",
  "products.gradeflow.change.step4":
    "Mit einem Klick in Ihr Notenbuch exportieren",

  "products.gradeflow.features.title": "Bewerten leicht gemacht",
  "products.gradeflow.features.faster.title": "3x schneller bewerten",
  "products.gradeflow.features.faster.desc":
    "Reduzieren Sie die Bewertungszeit von Stunden auf Minuten bei gleichbleibender Qualität",
  "products.gradeflow.features.fair.title": "Konsistentes Feedback",
  "products.gradeflow.features.fair.desc":
    "Sorgen Sie für eine faire, standardkonforme Bewertung aller Schüler",
  "products.gradeflow.features.audit.title": "Prüfpfad",
  "products.gradeflow.features.audit.desc":
    "Verfolgen Sie alle Bewertungsentscheidungen mit vollständiger Transparenz",

  "products.gradeflow.social.title": "Was Lehrkräfte sagen",
  "products.gradeflow.social.quote1":
    "GradeFlow hat meine Bewertungszeit halbiert, ohne die Qualität zu opfern.",
  "products.gradeflow.social.author1": "Lisa Park, High School Englisch",
  "products.gradeflow.social.quote2":
    "Mein Feedback ist jetzt konsistenter und hilfreicher.",
  "products.gradeflow.social.author2": "David Kim, Mittelschule Mathematik",

  "products.gradeflow.cta.title": "Bereit, smarter zu bewerten?",
  "products.gradeflow.cta.button": "Early Access beitreten",

  // Products - Shield
  "shield.hero.eyebrow": "KI-GOVERNANCE FÜR SCHULEN",
  "shield.hero.title": "Sichere, konforme KI für Ihre Schule",
  "shield.hero.subtitle":
    "Enterprise-fähige KI-Governance-Plattform, die eine sichere, ethische und konforme KI-Nutzung in Ihrer gesamten Schule oder Ihrem Bezirk gewährleistet.",
  "shield.hero.cta.primary": "Mehr erfahren",
  "shield.hero.cta.secondary": "Vertrieb kontaktieren",

  "shield.trust.gdpr": "GDPR-konform",
  "shield.trust.ferpa": "FERPA-ready",
  "shield.trust.schoolReady": "Schulbereit",

  "shield.problem.title": "Die Herausforderung der KI-Governance",
  "shield.problem.card1.title": "Datenschutzrisiken",
  "shield.problem.card1.description":
    "Lehrkräfte, die Verbraucher-KI-Tools verwenden, können unbeabsichtigt Schülerdaten preisgeben",
  "shield.problem.card2.title": "Compliance-Bedenken",
  "shield.problem.card2.description":
    "Schulen kämpfen darum, sicherzustellen, dass die KI-Nutzung FERPA, GDPR und lokale Vorschriften erfüllt",
  "shield.problem.card3.title": "Mangelnde Aufsicht",
  "shield.problem.card3.description":
    "Keine Transparenz darüber, wie KI in Klassenzimmern und Abteilungen verwendet wird",

  "shield.solution.title": "Vollständige KI-Governance in einer Plattform",
  "shield.solution.subtitle":
    "Überwachen, steuern und prüfen Sie die gesamte KI-Nutzung in Ihrer Schule",
  "shield.solution.card1.title": "Zentrale Steuerung",
  "shield.solution.card1.description":
    "Legen Sie schulweite Richtlinien für die KI-Nutzung mit granularer Berechtigung fest",
  "shield.solution.card2.title": "Prüfpfad",
  "shield.solution.card2.description":
    "Vollständige Transparenz aller KI-Interaktionen und Datenflüsse",
  "shield.solution.card3.title": "Datenschutz",
  "shield.solution.card3.description":
    "Automatische PII-Erkennung und -Redaktion vor der KI-Verarbeitung",
  "shield.solution.card4.title": "Richtlinien-Durchsetzung",
  "shield.solution.card4.description":
    "Automatisierte Compliance-Prüfungen gegen die Richtlinien Ihrer Schule",
  "shield.solution.cta": "Alle Funktionen entdecken",

  "shield.howItWorks.title": "So funktioniert Shield",
  "shield.howItWorks.step1.title": "Ihre Tools verbinden",
  "shield.howItWorks.step1.description":
    "Integrieren Sie Shield mit Ihren bestehenden KI-Tools und Plattformen",
  "shield.howItWorks.step2.title": "Richtlinien festlegen",
  "shield.howItWorks.step2.description":
    "Definieren Sie Regeln für die KI-Nutzung, Datenverarbeitung und Compliance",
  "shield.howItWorks.step3.title": "Überwachen & Prüfen",
  "shield.howItWorks.step3.description":
    "Nutzung verfolgen, Protokolle überprüfen und Compliance sicherstellen",
  "shield.howItWorks.cta": "Jetzt starten",

  "shield.socialProof.title": "Weltweit von Schulen vertraut",
  "shield.socialProof.quote":
    "Shield gibt uns die Zuversicht, KI zu nutzen und gleichzeitig die Privatsphäre unserer Schüler zu schützen. Es ist eine unverzichtbare Infrastruktur für moderne Schulen.",
  "shield.socialProof.attribution": "Dr. Jennifer Martinez",
  "shield.socialProof.role":
    "Technologie-Direktorin, Springfield School District",

  "shield.useCases.title": "Für Bildung entwickelt",
  "shield.useCases.card1.title": "KI-Tools für Lehrkräfte",
  "shield.useCases.card1.description":
    "KI-Schreibassistenten, Unterrichtsplaner und Bewertungstools steuern",
  "shield.useCases.card2.title": "KI-Nutzung durch Schüler",
  "shield.useCases.card2.description":
    "Angemessene KI-Nutzung in Schülerarbeiten überwachen und anleiten",
  "shield.useCases.card3.title": "Administrative KI",
  "shield.useCases.card3.description":
    "Sichere KI-Nutzung für Terminplanung, Kommunikation und Betrieb",

  "shield.comparison.title": "Shield vs. manuelle Governance",
  "shield.comparison.feature": "Funktion",
  "shield.comparison.shield": "Mit Shield",
  "shield.comparison.manual": "Manuelle Prozesse",
  "shield.comparison.row1.feature": "Richtlinien-Durchsetzung",
  "comparison.row1.shield": "Automatisiert",
  "comparison.row1.manual": "Manuelle Prüfungen",
  "comparison.row2.feature": "Prüfpfad",
  "comparison.row2.shield": "Vollständige Protokolle",
  "comparison.row2.manual": "Unvollständige Aufzeichnungen",
  "comparison.row3.feature": "PII-Schutz",
  "comparison.row3.shield": "Automatisch",
  "comparison.row3.manual": "Manuelle Überprüfung",

  "shield.pricing.title": "Enterprise-Preise",
  "shield.pricing.description":
    "Individuelle Preise basierend auf Ihrer Schulgröße und Ihren Bedürfnissen. Kontaktieren Sie uns für ein Angebot.",
  "shield.pricing.cta": "Preise erhalten",

  "shield.finalCta.title": "Bereit, die KI Ihrer Schule zu sichern?",
  "shield.finalCta.subtitle":
    "Schließen Sie sich zukunftsorientierten Schulen an, die Shield nutzen, um KI sicher einzusetzen",
  "shield.finalCta.primary": "Demo planen",
  "shield.finalCta.secondary": "Vertrieb kontaktieren",
  "shield.finalCta.note": "Enterprise-Support und Onboarding inbegriffen",

  // FAQ Page
  "faq.hero.eyebrow": "HÄUFIG GESTELLTE FRAGEN",
  "faq.hero.title": "Wie können wir Ihnen helfen?",
  "faq.hero.subtitle":
    "Finden Sie Antworten auf häufige Fragen zu Zaza Draft und unseren KI-Tools für Lehrkräfte.",

  // FAQ Categories
  "faq.category.about.title": "Über Zaza Draft",
  "faq.category.safety.title": "Sicherheit & Datenschutz",
  "faq.category.features.title": "Funktionen & Merkmale",
  "faq.category.pricing.title": "Preise & Pläne",
  "faq.category.languages.title": "Sprachen & Übersetzung",
  "faq.category.schools.title": "Für Schulen & Bezirke",

  // About Questions
  "faq.about.q1": "Was ist Zaza Draft?",
  "faq.about.a1":
    "Zaza Draft ist ein KI-gestützter Schreibassistent, der speziell für Lehrkräfte entwickelt wurde. Er hilft Ihnen, grobe Notizen in Minuten in überarbeitete Eltern-E-Mails, Zeugnisse, Bewertungs-Kommentare und andere pädagogische Kommunikationen umzuwandeln, während Ihre authentische Stimme erhalten bleibt.",

  "faq.about.q2":
    "Wie unterscheidet sich Zaza Draft von ChatGPT oder anderen KI-Tools?",
  "faq.about.a2":
    "Im Gegensatz zu generischen KI-Tools ist Zaza Draft mit Lehrkraefte-Designpartnern und bildungsspezifischen Workflows entwickelt. Es erfindet keine schuelerbezogenen Aussagen und ueberarbeitet nur das, was du vorgibst, bietet bildungsspezifische Tonoptionen und ist FERPA-ready von Grund auf.",

  "faq.about.q3": "Für wen ist Zaza Draft gedacht?",
  "faq.about.a3":
    "Zaza Draft ist für K-12-Lehrkräfte, Pädagogen, Schuladministratoren und alle, die in die pädagogische Kommunikation involviert sind, konzipiert. Egal, ob Sie Eltern-E-Mails, Zeugnisse, Feedback-Kommentare oder Schulankündigungen verfassen, Draft hilft Ihnen, Zeit zu sparen und gleichzeitig professionelle Qualität zu gewährleisten.",

  "faq.about.q4":
    "Benötige ich technische Kenntnisse, um Zaza Draft zu verwenden?",
  "faq.about.a4":
    "Keine technischen Kenntnisse erforderlich! Zaza Draft ist unglaublich einfach konzipiert: Fügen Sie Ihre Notizen ein, wählen Sie Ihren Ton und erhalten Sie eine überarbeitete Ausgabe. Wenn Sie E-Mails verwenden können, können Sie auch Draft verwenden.",

  "faq.about.q5": "Kann ich Zaza Draft ausprobieren, bevor ich mich festlege?",
  "faq.about.a5":
    "Ja – wir bieten eine kostenlose Testversion an, damit Sie selbst erleben können, wie Draft Ihnen Zeit spart und Ihre Kommunikation verbessert. Zum Start ist keine Kreditkarte erforderlich.",

  "faq.about.q6":
    "Bei welchen Arten von Schreibaufgaben kann Zaza Draft helfen?",
  "faq.about.a6":
    "Draft ist auf sechs Schlüsselbereiche spezialisiert: Elternnachrichten, Zeugnisse, Bewertungs-Kommentare, Schulkommunikation, Empfehlungsschreiben und Dokumentation. Es ist für die täglichen Schreibaufgaben von Lehrkräften entwickelt worden.",

  "faq.about.q7": "Wie viel Zeit kann ich mit Zaza Draft sparen?",
  "faq.about.a7":
    "Lehrkraefte, die Draft nutzen, berichten von eingesparten Stunden pro Woche bei Schreibaufgaben. Aufgaben, die typischerweise 2 Stunden dauern, koennen mit Drafts Unterstuetzung in 5 Minuten erledigt werden.",

  "faq.about.q8": "Kann ich die Ausgabe anpassen?",
  "faq.about.a8":
    "Draft bietet einen Ausgangspunkt, den Sie bearbeiten und verfeinern können. Sie behalten die volle Kontrolle über die endgültige Nachricht – Draft hilft Ihnen nur, schneller dorthin zu gelangen.",

  "faq.about.q9": "Funktioniert Zaza Draft in meinem Land?",
  "faq.about.a9":
    "Ja! Zaza Draft ist weltweit verfügbar und unterstützt Kommunikation in 20+ Sprachen. Egal ob Sie in den USA, Großbritannien, Kanada, Australien oder anderswo sind, Draft kann Ihnen helfen, effektiv zu kommunizieren.",

  "faq.about.q10": "Was ist das Zaza-Produktökosystem?",
  "faq.about.a10":
    "Zaza bietet eine Suite von KI-Tools für Bildung an: Draft (Schreibassistent), Teach (Unterrichtsplanung), GradeFlow (Bewertungsassistent) und Shield (KI-Governance). Jedes Tool wurde entwickelt, um spezifische Herausforderungen zu lösen, denen Lehrkräfte gegenüberstehen.",

  "faq.about.q11": "Wie fange ich an?",
  "faq.about.a11":
    "Melden Sie sich einfach für ein kostenloses Konto an, fügen Sie Ihren ersten Entwurf oder Notizen ein, wählen Sie Ihren gewünschten Ton und sehen Sie zu, wie Draft Ihr Schreiben transformiert. Sie werden innerhalb von Minuten Zeit sparen.",

  // Safety Questions
  "faq.safety.q1": "Sind meine Daten bei Zaza Draft sicher?",
  "faq.safety.a1":
    "Ja. Wir nehmen die Datensicherheit sehr ernst. Alle Daten werden verschluesselt uebertragen und gespeichert, wir sind FERPA-ready und verwenden Ihre Daten niemals, um unsere Modelle zu trainieren oder mit Dritten zu teilen. Ihre Kommunikation bleibt privat und sicher.",

  "faq.safety.q2": "Was bedeutet 'Keine erfundenen Schuelerinformationen'?",
  "faq.safety.a2":
    "Draft erfindet keine schuelerbezogenen Aussagen und ueberarbeitet nur das, was du vorgibst. Jede Ausgabe basiert auf dem, was Sie tatsaechlich bereitstellen.",

  "faq.safety.q3": "Ist Zaza Draft FERPA-ready?",
  "faq.safety.a3":
    "Ja. Zaza Draft ist auf FERPA-Compliance ausgelegt. Wir implementieren angemessene Schutzmaßnahmen, um die Privatsphäre der Schüler und Bildungsunterlagen zu schützen, und wir teilen oder verkaufen niemals Schülerdaten.",

  "faq.safety.q4": "Kann ich Schülernamen in meinen Entwürfen nennen?",
  "faq.safety.a4":
    "Ja, Sie können Schülernamen und relevante Details nennen. Draft verarbeitet diese Informationen sicher und speichert oder verwendet sie nur zur Generierung Ihrer spezifischen Ausgabe. Alle Schülerinformationen bleiben vertraulich.",

  "faq.safety.q5":
    "Was passiert mit meinen Daten, nachdem ich Draft verwendet habe?",
  "faq.safety.a5":
    "Ihre Entwürfe und Ausgaben werden zu Ihrer Bequemlichkeit sicher in Ihrem Konto gespeichert, aber wir verwenden sie niemals, um unsere KI-Modelle zu trainieren. Sie können Ihre Daten jederzeit über Ihre Kontoeinstellungen löschen.",

  "faq.safety.q6": "Ist Zaza Draft GDPR-konform?",
  "faq.safety.a6":
    "Ja. Wir halten die GDPR-Anforderungen für Datenschutz und Privatsphäre ein. Benutzer haben die volle Kontrolle über ihre Daten, einschließlich des Rechts auf Zugang, Korrektur und Löschung ihrer Informationen.",
  "faq.safety.q7": "Erfindet Zaza Draft manchmal Dinge?",
  "faq.safety.a7":
    "Nein. Zaza Draft ist so aufgebaut, dass es keine unbelegten Details hinzufügt. Es arbeitet nur mit den Informationen, die du eingibst, und konzentriert sich darauf, daraus eine professionelle Nachricht zu formulieren. Lies vor dem Senden trotzdem kurz gegen.",
  "faq.safety.q8": "Sind Schülerdaten sicher?",
  "faq.safety.a8":
    "Ja. Draft ist datensparsam gestaltet. Für die meisten Entwürfe brauchst du keine Klarnamen, und du solltest keine unnötigen persönlichen Details eingeben. Deine Angaben werden sicher verarbeitet und nur für die Entwurfserstellung genutzt. Lies mehr in unserer Datenschutzerklärung.",
  "faq.safety.q9": "Ist Zaza Draft DSGVO-konform?",
  "faq.safety.a9":
    "Ja. Draft berücksichtigt zentrale DSGVO-Prinzipien wie Datensparsamkeit und sichere Verarbeitung. Du kannst jederzeit eine Löschung deiner Daten anfordern.",

  // Features Questions
  "faq.features.q1": "Welche Tonoptionen sind verfügbar?",
  "faq.features.a1":
    "Draft bietet vier bildungsspezifische Töne: Unterstützend (warm und ermutigend), Formell (professionell und strukturiert), Prägnant (kurz und direkt) und Neutral (ausgewogen und objektiv). Jeder Ton ist für pädagogische Kommunikation kalibriert.",

  "faq.features.q2": "Kann Draft meine Nachrichten übersetzen?",
  "faq.features.a2":
    "Ja! Draft kann Ihre Kommunikation in 20+ Sprachen übersetzen, was die Verbindung mit Familien, die unterschiedliche Sprachen sprechen, erleichtert. Übersetzungen behalten den angemessenen Ton und den pädagogischen Kontext bei.",

  "faq.features.q3": "Funktioniert Draft mit den Systemen meiner Schule?",
  "faq.features.a3":
    "Draft generiert Text, den Sie einfach kopieren und in jedes System einfügen können – E-Mail, Lernmanagementsysteme, Notenbücher oder Textverarbeitungsprogramme. Keine speziellen Integrationen erforderlich.",

  "faq.features.q4":
    "Kann ich Vorlagen oder häufig verwendete Phrasen speichern?",
  "faq.features.a4":
    "Ja! Sie können Ihre bevorzugten Ausgaben als Vorlagen für die zukünftige Verwendung speichern, wodurch die Erstellung ähnlicher Kommunikationen noch schneller wird.",

  "faq.features.q5": "Funktioniert Draft auf mobilen Geräten?",
  "faq.features.a5":
    "Ja! Zaza Draft ist vollständig responsiv und funktioniert auf Smartphones, Tablets und Computern. Verfassen und verfeinern Sie Kommunikationen, wo immer Sie sind.",

  "faq.features.q6": "Können mehrere Lehrkräfte Vorlagen teilen?",
  "faq.features.a6":
    "Mit unseren Schulplänen können Teams Vorlagen und Best Practices teilen, um eine konsistente Kommunikation in Ihrer Abteilung oder Schule zu gewährleisten.",

  // Pricing Questions
  "faq.pricing.q1": "Wie viel kostet Zaza Draft?",
  "faq.pricing.a1":
    "Wir bieten flexible Preispläne für einzelne Lehrkräfte und Schulen. Besuchen Sie unsere Preisseite für aktuelle Tarife und Plandetails. Wir bieten auch eine kostenlose Testversion an, damit Sie Draft ausprobieren können, bevor Sie sich festlegen.",

  "faq.pricing.q2": "Gibt es eine kostenlose Version?",
  "faq.pricing.a2":
    "Wir bieten eine kostenlose Testphase an, damit Sie die volle Leistung von Draft erleben können. Nach der Testphase können Sie einen Plan wählen, der Ihren Bedürfnissen und Ihrem Budget entspricht.",

  "faq.pricing.q3": "Bieten Sie Preise für Schulen oder Bezirke an?",
  "faq.pricing.a3":
    "Ja! Wir bieten spezielle Preise für Schulen und Bezirke an, einschließlich Mengenrabatten, zentraler Abrechnung und zusätzlichen Funktionen wie Team-Kollaboration und Admin-Steuerung. Kontaktieren Sie unser Vertriebsteam für ein individuelles Angebot.",

  "faq.pricing.q4": "Kann ich jederzeit kündigen?",
  "faq.pricing.a4":
    "Ja. Es gibt keine langfristigen Verträge für Einzelpläne. Sie können Ihr Abonnement jederzeit kündigen und behalten den Zugang bis zum Ende Ihres Abrechnungszeitraums.",

  // Languages Questions
  "faq.languages.q1": "Welche Sprachen unterstützt Draft?",
  "faq.languages.a1":
    "Draft unterstützt Kommunikation in 20+ Sprachen, darunter Spanisch, Französisch, Deutsch, Mandarin, Arabisch, Portugiesisch und viele mehr. Sie können auf Englisch schreiben und in jede unterstützte Sprache übersetzen oder direkt in Ihrer bevorzugten Sprache schreiben.",

  "faq.languages.q2": "Wie genau sind die Übersetzungen?",
  "faq.languages.a2":
    "Unsere Übersetzungen sind speziell auf pädagogische Kontexte kalibriert und behalten den angemessenen Ton und die Formalität bei. Obwohl wir für kritische Kommunikationen empfehlen, die Übersetzungen von Muttersprachlern überprüfen zu lassen, sind unsere Übersetzungen sehr genau und kontextuell angemessen.",

  "faq.languages.q3":
    "Kann Draft mir bei der Kommunikation mit mehrsprachigen Familien helfen?",
  "faq.languages.a3":
    "Draft macht es einfach, dieselbe Nachricht in mehreren Sprachen zu senden, um sicherzustellen, dass alle Familien Kommunikation in ihrer bevorzugten Sprache erhalten. Dies hilft, stärkere Schul-zu-Hause-Beziehungen aufzubauen.",

  // Schools Questions
  "faq.schools.q1":
    "Wie funktioniert Zaza Draft für ganze Schulen oder Bezirke?",
  "faq.schools.a1":
    "Unsere Schul- und Bezirkspläne umfassen zentrale Verwaltung, Team-Kollaborationsfunktionen, gemeinsame Vorlagen, Nutzungsanalysen, priorisierten Support und Mengenpreise. Administratoren können Lizenzen verwalten, die Nutzung überwachen und konsistente Kommunikationsstandards in der gesamten Organisation sicherstellen.",

  "faq.schools.q2": "Bieten Sie Schulungen und Support für Schulen an?",
  "faq.schools.a2":
    "Ja! Schul- und Bezirkspläne umfassen Onboarding-Support, Schulungsmaterialien und fortlaufende professionelle Entwicklungsressourcen. Wir helfen dabei, dass Ihr gesamtes Team Draft effektiv nutzen kann, um Zeit zu sparen und die Kommunikation zu verbessern.",
  "faq.schools.q3": "Ist es „Schummeln“, Zaza Draft zu verwenden?",
  "faq.schools.a3":
    "Nein. Zaza Draft ist ein Schreib-Assistent, kein Ersatz für deine professionelle Einschätzung. Du gibst den Inhalt und den Kontext vor, Draft hilft dir beim Formulieren, und du trägst die Verantwortung für die finale Nachricht.",
  "faq.schools.q4": "Passt Zaza Draft zu Schulregeln und Vorgaben?",
  "faq.schools.a4":
    "Ja. Draft unterstützt dich dabei, professionell und regelkonform zu kommunizieren. Es wird nichts automatisch versendet – du prüfst alles vorher. Orientiere dich an den Kommunikationsrichtlinien deiner Schule.",

  // FAQ CTA
  "faq.cta.title": "Haben Sie noch Fragen?",
  "faq.cta.subtitle":
    "Unser Support-Team ist für Sie da. Melden Sie sich und wir melden uns innerhalb von 24 Stunden bei Ihnen.",
  "faq.cta.button": "Support kontaktieren",

  // About Overview Page
  "about.overview.hero.eyebrow": "ÜBER ZAZA",
  "about.overview.hero.title":
    "Wir bauen Technologie, die Lehrkräfte erfolgreich unterstützt",
  "about.overview.hero.subtitle":
    "Zaza existiert, um Lehrkräften ihre Zeit, ihr Vertrauen und ihr Wohlbefinden zurückzugeben – durch ruhige, sichere KI-Tools, die professionelles Urteilsvermögen respektieren und die Realität des Unterrichts anerkennen.",
  "about.overview.hero.context":
    "Dr. Greg Blackburn ist Experte für Lernwissenschaft und berufliche Bildung, verantwortet Professional-Learning-Initiativen und bleibt durch Familie und Freunde nah an Lehrkräften dran, sodass er deren gelebte Erfahrung und Herausforderungen hört.",

  "about.overview.mission.title": "Unsere Mission",
  "about.overview.mission.body":
    "Jede Lehrkraft verdient Tools, die ihre Expertise respektieren, ihre Schüler schützen und unnötigen Stress reduzieren. Zaza entwickelt evidenzbasierte, sicherheitsorientierte KI, die Lehrkräfte im Alltag unterstützt – damit sie sich auf das konzentrieren können, was wirklich zählt, und in ihrem Beruf aufblühen. Letztlich existiert Zaza, um Lehrkräfte erfolgreich zu machen – nicht nur um ihnen zu helfen, durchzuhalten.",

  "about.overview.values.title": "Unsere Werte",
  "about.overview.values.teacherFirst.title": "Lehrerzentriertes Design",
  "about.overview.values.teacherFirst.body":
    "Mit Lehrkräften als Profis entworfen.",
  "about.overview.values.safety.title": "Sicherheit von Grund auf",
  "about.overview.values.safety.body":
    "Ruhige KI ohne erfundene Schuelerinformationen.",
  "about.overview.values.privacy.title": "Datenschutz an erster Stelle",
  "about.overview.values.privacy.body":
    "FERPA-ready vom ersten Tag an. Ihre Daten gehoeren Ihnen, und wir verwenden sie niemals, um unsere Modelle zu trainieren.",
  "about.overview.values.evidence.title": "Evidenzbasiert",
  "about.overview.values.evidence.body":
    "Auf Lernwissenschaft und berufspädagogische Forschung gestützt.",

  "about.overview.timeline.title": "Unsere Reise",
  "about.overview.timeline.2019.title": "Lernen und professionelle Bildung",
  "about.overview.timeline.2019.body":
    "Abschluss der Promotion mit Schwerpunkt auf professionellem Lernen, kritischem Denken und Lernen in anspruchsvollen beruflichen Kontexten.",
  "about.overview.timeline.2024.title": "Ein Muster wird deutlich",
  "about.overview.timeline.2024.body":
    "Durch jahrelange Arbeit im Bereich Learning & Development – sowie durch enge persönliche Beziehungen zu Lehrkräften im Freundes- und Familienkreis – wurde ein zentrales Problem immer klarer: Schriftliche Kommunikation und Berichte kosten Zeit, Energie und emotionale Kraft.",
  "about.overview.timeline.2025.title": "Gründung von Zaza Draft",
  "about.overview.timeline.2025.body":
    "Zaza Draft entsteht, um ruhige, sichere und evidenzbasierte KI in den Lehreralltag zu bringen – mit Respekt vor professioneller Urteilsfähigkeit.",
  "about.overview.timeline.today.title":
    "Lehrkräfte dabei unterstützen, erfolgreich zu bleiben",
  "about.overview.timeline.today.body":
    "Zaza Draft wird bewusst und sorgfältig entwickelt – mit Fokus auf Vertrauen, Wohlbefinden und tatsächlichem Nutzen.",

  "about.overview.cta.title":
    "Lehrkräfte dabei unterstützen, erfolgreich zu bleiben",
  "about.overview.cta.body":
    "Erfahre, wie Zaza Draft professionelles Handeln stärkt, Stress reduziert und Vertrauen bewahrt.",
  "about.overview.cta.button": "Kontakt aufnehmen",

  // About Company Page - NEW CONTENT
  "about.company.hero.eyebrow": "UNSER UNTERNEHMEN",
  "about.company.hero.title": "Zaza Technologies",
  "about.company.hero.subtitle":
    "Wir sind ein kleines, spezialisiertes Team aus Lerndesigner, Ingenieuren und Bildungsforschern, das Technologie entwickelt, die Lehrkräften hilft, aufzublühen.",
  "company.origin.title": "UNSER UNTERNEHMEN",
  "company.origin.body.p1":
    "Zaza Technologies wurde 2025 mit einer klaren Überzeugung gegründet: Bildung verdient KI-Tools, die mit echtem pädagogischem Verständnis entwickelt werden, nicht neu aufbereitete Unternehmens-KI-Modelle. Wir bauen Technologie, die das Wohlbefinden von Lehrkräften schützt.",
  "company.origin.body.p2": "Daher haben wir einen anderen Ansatz gewählt.",
  "company.origin.body.p3":
    "Wir entwickeln Tools, die auf echter Pädagogik trainiert, mit Pädagogen entwickelt und durch den Einsatz im Klassenzimmer verfeinert werden. Tools, die die Nuance des Lehrerurteils, das emotionale Gewicht der Elterninteraktion und die Bedeutung von konstruktivem Feedback verstehen. Tools, die genau, zuverlässig und sicher für Bildungseinrichtungen sind.",
  "company.origin.body.p4":
    "Unsere Modelle werden auf echtem Lehrer-Feedback und sprachlichen Mustern im Klassenzimmer trainiert, durch iterative Tests mit Pädagogen verfeinert und so konzipiert, dass die Ausgabe wie von einer Lehrkraft klingt – und nicht wie von einer Maschine.",
  "company.origin.body.p5":
    "Unser Ziel ist einfach: Lehrkräften wertvolle Zeit zurückgeben.",

  "company.philosophy.title": "Unsere Philosophie",
  "company.philosophy.intro":
    "Wir glauben nicht an „KI, die Lehrkräfte ersetzt“. Wir glauben an KI, die Lehrkräfte unterstützt.",
  "company.philosophy.principle1":
    "Tools müssen die Expertise der Lehrkräfte respektieren.",
  "company.philosophy.principle2":
    "Tools müssen die Arbeitslast reduzieren, nicht verlagern.",
  "company.philosophy.principle3":
    "Tools müssen Schüler und deren Lernumgebung schützen.",
  "company.philosophy.principle4":
    "Tools müssen vertrauenswürdig und transparent sein.",
  "company.philosophy.closing":
    "Wenn Technologie Lehrkräften nicht helfen kann, das zu tun, was sie am besten können – unterrichten – dann gehört sie nicht in den Klassenraum.",

  "company.boutique.title": "Ein Boutique-Ansatz",
  "company.boutique.intro":
    "Wir sind bewusst kein großes Technologieunternehmen. Wir sind ein fokussiertes Team, das nur für eine Zielgruppe entwickelt – Lehrkräfte.",
  "company.boutique.means": "Das bedeutet:",
  "company.boutique.point1":
    "Wir arbeiten eng mit Pädagogen aus verschiedenen Regionen und Kontexten zusammen.",
  "company.boutique.point2":
    "Wir testen Funktionen direkt in echten Klassenzimmern.",
  "company.boutique.point3":
    "Wir priorisieren Klarheit, Sicherheit und Benutzerfreundlichkeit über Neuheit.",
  "company.boutique.closing":
    "Wir optimieren nicht für schnelles Wachstum. Wir optimieren für das, was funktioniert.",
  "company.boutique.impact": "Skalierung ist nicht das Ziel. Wirkung ist es.",

  "company.today.title": "Wo wir heute stehen",
  "company.today.p1":
    "Wir arbeiten mit einer kleinen Gruppe von Lehrkräften und Schulen in einer privaten Beta, um jedes Feature mit echtem Klassenzimmer-Feedback vor dem Launch zu verfeinern.",
  "company.today.p2":
    "Unsere langfristige Vision ist es, eine komplette Suite von KI-Tools zu bauen, die Lehrkräften helfen, ihre Zeit zurückzugewinnen, ihr Wohlbefinden zu schützen und mit dem Kern ihrer Arbeit – ihren Schülern – verbunden zu bleiben.",
  "company.today.close":
    "Denn wenn Lehrkräfte gedeihen, gedeihen auch Schüler.",

  "company.stats.teachers.number": "Lehrergebaut",
  "company.stats.teachers.label": "Design- & Beta-Partner",
  "company.stats.countries.number": "Private Beta",
  "company.stats.countries.label": "Early Access-Programm",
  "company.stats.hours.number": "10+",
  "company.stats.hours.label": "Wöchentlich gesparte Stunden",

  // Founder Hero Section
  "founder.hero.headline":
    "Lerne den Gründer kennen, der KI für Lehrkräfte entwickelt",
  "founder.hero.subheading":
    "Dr. Greg Blackburn arbeitet seit über 20 Jahren in Learning & Development und gründete Zaza – eine Suite von KI-Tools, die Lehrkräften Zeit und Kopfkapazität zurückgeben, ohne ihre professionelle Urteilsfähigkeit zu ersetzen.",
  "founder.hero.label": "GRÜNDER & CEO",
  "founder.hero.name": "Dr. Greg Blackburn",
  "founder.hero.tagline":
    "Lernforscher, EdTech-Gründer und Vater, der KI-Werkzeuge speziell für Lehrkräfte baut.",

  // Founder Journey Section
  "founder.journey.title": "Die Reise",
  "founder.journey.quote":
    "Ich habe Zaza gebaut, weil ich nicht länger zusehen wollte, wie Lehrkräfte in Verwaltung versinken, obwohl Technologie sie entlasten sollte.",
  "founder.journey.p1":
    "Mein Berufsleben begann in Hobart, Tasmanien, mit einem Pinsel in der Hand. Ich habe eine berufsvorbereitende Ausbildung an der TAFE und eine vierjährige Lehre in der Cascade-Brauerei abgeschlossen – harte Arbeit in einem rauen Umfeld. Diese Jahre haben mir Durchhaltevermögen beigebracht, aber auch gezeigt, dass ich mehr aus meinem Berufsleben machen wollte.",
  "founder.journey.p2":
    "Reisen haben mir die Augen geöffnet. Ich habe im Ausland gelebt, Deutsch studiert und gesehen, wie Bildung neue Wege eröffnen kann. Zurück in Tasmanien habe ich Administration, Informationssysteme und Deutsch an der University of Tasmania studiert und mit First Class Honours abgeschlossen – ein Beweis dafür, dass ich trotz früher Zweifel und familiärer Spannungen akademisch erfolgreich sein und mir eine neue Laufbahn aufbauen konnte.",
  "founder.journey.p3":
    "Der nächste Schritt führte mich nach Brisbane zu Telstra, wo ich sechs Jahre gearbeitet habe, während ich parallel ein MBA-Studium an der University of Queensland absolvierte. Das MBA öffnete mir die Tür ins Management an der UQ, wo ich als Business Manager gearbeitet habe. Dort begann ich, Forschung darüber zu veröffentlichen, wie Menschen lernen, Probleme lösen und in komplexen Organisationen denken.",
  "founder.journey.p4":
    "Später habe ich eine Promotion in Professional Education an der City, University of London, abgeschlossen – auf Basis von Publikationen – und bin schließlich Chief Learning Officer bei Communardo geworden. Parallel dazu habe ich Lehrkräften und Learning-Professionals zugehört: Berichte, Korrekturen, Elternkommunikation bis spät in die Nacht. Viele KI-Tools fühlten sich generisch an, ignorierten Kontext und erzeugten zusätzliche Kontrollarbeit. Aus dieser Lücke heraus ist Zaza entstanden: KI-Tools, die speziell für Lehrkräfte entwickelt wurden, ihre Urteilsfähigkeit respektieren und ihnen Zeit zurückgeben.",
  "founder.mission.quote":
    "Jede Lehrkraft verdient Werkzeuge, die ihre Expertise respektieren, ihre Schülerinnen und Schüler schützen und Zeit fürs Unterrichten schaffen.",
  "founder.mission.attribution": "Dr. Greg Blackburn, Gründer & CEO",
  "founder.whyZaza.title": "Warum ich Zaza gegründet habe",
  "founder.whyZaza.subtitle": "Drei Prinzipien, die alles leiten, was wir tun",
  "founder.whyZaza.card1.title": "Für Lehrkräfte, von Lehrkräften",
  "founder.whyZaza.card1.body":
    "Ich kenne den Lehreralltag: späte Abende, endlose Mails, Zeugnis-Marathons. Zaza wird von jemandem gebaut, der das erlebt hat.",
  "founder.whyZaza.card2.title": "Boutique, nicht Big Tech",
  "founder.whyZaza.card2.body":
    "Wir sind kein Riesenkonzern für alle. Wir sind ein fokussiertes Team, das spezialisierte Tools für eine Zielgruppe baut: Lehrkräfte. Eure Bedürfnisse stehen immer zuerst.",
  "founder.whyZaza.card3.title": "Ein Vermächtnis aufbauen",
  "founder.whyZaza.card3.body":
    "Es geht nicht um schnellen Gewinn. Es geht darum, etwas zu bauen, das Lehrkräften wirklich hilft und Bildung verbessert. Das Vermächtnis, das ich hinterlassen möchte.",
  "founder.personal.title": "Eine persönliche Anmerkung",
  "founder.personal.message1":
    "Wenn du das liest, bist du vermutlich neugierig auf KI, aber skeptisch, ob sie wirklich hilft. Das verstehe ich – ich war es auch. Viele KI-Tools wirken, als wären sie ohne Einblick in Klassenzimmer gebaut.",
  "founder.personal.message2":
    "Deshalb habe ich Zaza anders gebaut. Jede Funktion entsteht mit echten Lehrkräften, wird in echten Klassen getestet und nach realem Feedback verbessert. Wir bauen nicht nur Software, sondern Partnerschaften mit Pädagog:innen.",
  "founder.personal.message3":
    "Ich freue mich, von dir zu hören. Ob Fragen, Feedback oder ein Austausch über Bildung und Technologie – meine Tür steht offen. Gestalten wir die Zukunft der Lehrer-Tools gemeinsam.",
  "founder.personal.name": "Dr. Greg Blackburn",
  "founder.personal.title2": "Gründer & CEO",
  "founder.personal.company": "Zaza Technologies",
  "founder.personal.cta": "Kontakt aufnehmen",

  // Support Page (DE)
  "support.title": "Support",
  "support.intro":
    "Wir sind für dich da, wenn bei Draft Fragen auftauchen oder etwas hakt. Melde dich – echte Menschen antworten schnell.",
  "support.email.title": "E-Mail-Support",
  "support.email.description":
    "Schreib uns, was du brauchst oder gib Feedback. Jede Nachricht lesen wir persönlich.",
  "support.email.response": "Antwort in der Regel innerhalb von 24 Stunden.",
  "support.faq.title": "Häufige Fragen",
  "support.faq.description":
    "Stöbere durch Antworten zu Draft, Konto und Abrechnung.",
  "support.resources.title": "Ressourcen & Leitfäden",
  "support.resources.description":
    "Kurze Anleitungen und Checklisten, die sofort helfen.",
  "support.troubleshooting.title": "Schnelle Lösungen",
  "support.troubleshooting.login.title": "Anmeldung klappt nicht",
  "support.troubleshooting.login.description":
    "Passwort zurücksetzen oder E-Mail-Adresse prüfen.",
  "support.troubleshooting.email.title": "Keine E-Mails bekommen",
  "support.troubleshooting.email.description":
    "Spam-Ordner prüfen und help@zazatechnologies.com zu den Kontakten hinzufügen.",
  "support.troubleshooting.subscription.title": "Abo oder Zahlung",
  "support.troubleshooting.subscription.description":
    "Rechnungsdaten prüfen oder uns kurz schreiben, falls etwas nicht passt.",
  "support.troubleshooting.browser.title": "Seite lädt oder sieht falsch aus",
  "support.troubleshooting.browser.description":
    "Aktualisieren, anderen Browser probieren oder Cache löschen.",
  "support.troubleshooting.bugs.title": "Etwas verhält sich komisch",
  "support.troubleshooting.bugs.description":
    "Schick uns einen Screenshot und eine kurze Beschreibung – wir kümmern uns darum.",

  // Terms Page (DE)
  "terms.back": "Zurück zur Startseite",
  "terms.title": "Nutzungsbedingungen",
  "terms.company":
    "Zaza Technologies – Anbieter von Zaza Draft, Zaza Teach und GradeFlow",
  "terms.lastUpdated": "Zuletzt aktualisiert: 12. Oktober 2025",
  "terms.intro":
    "Diese Bedingungen regeln deine Nutzung von Zaza Draft, Zaza Teach und GradeFlow. Mit der Nutzung stimmst du ihnen zu.",
  "terms.s1.title": "1. Konten & Berechtigung",
  "terms.s1.content":
    "Du bist für korrekte Kontodaten, den Schutz deiner Zugangsdaten und die Einhaltung von Schul- oder Bezirksrichtlinien verantwortlich. Wenn du für eine Organisation handelst, bist du dazu berechtigt.",
  "terms.s2.title": "2. Abonnements & Zahlungen",
  "terms.s2.content":
    "Kostenpflichtige Pläne werden im Voraus berechnet. Abos verlängern sich automatisch, bis du kündigst. Preisänderungen kündigen wir vorab an.",
  "terms.s3.title": "3. Zulässige Nutzung",
  "terms.s3.item1":
    "Keine rechtswidrigen, schädlichen oder irreführenden Zwecke.",
  "terms.s3.item2":
    "Keine Inhalte hochladen, die Rechte Dritter verletzen oder Datenschutzgesetze brechen.",
  "terms.s3.item3":
    "Die Dienste nicht stören, testen oder umgehen (z. B. Scraping, Reverse Engineering, automatisierte Angriffe).",
  "terms.s4.title": "4. Datenschutz & Sicherheit",
  "terms.s4.content":
    "Die Verarbeitung personenbezogener Daten richtet sich nach der Datenschutzrichtlinie. Wir setzen Schutzmaßnahmen ein, können aber keine absolute Sicherheit garantieren.",
  "terms.s5.title": "5. Geistiges Eigentum",
  "terms.s5.content":
    "Dienste, Marken und Inhalte bleiben Eigentum von Zaza. Nutze sie wie vorgesehen und erstelle ohne Zustimmung keine abgeleiteten Werke.",
  "terms.s6.title": "6. Haftung & Beendigung",
  "terms.s6.content":
    'Die Dienste werden "wie besehen" bereitgestellt. Soweit gesetzlich zulässig, haften wir nicht für indirekte oder Folgeschäden. Wir können Konten sperren oder beenden, wenn Bedingungen verletzt werden.',
  "terms.contact.text": "Fragen zu den Bedingungen? Schreibe uns jederzeit an",
  // Not Found / Error
  "notFound.title": "Seite nicht gefunden",
  "notFound.subtitle":
    "Diese Seite gibt es nicht. Zurück zur Startseite, zu Zaza Draft oder schau dir unsere aktuellen Beiträge an.",
  "notFound.home": "Zur Startseite",
  "notFound.draft": "Zu Zaza Draft",
  "notFound.blog": "Zum Blog",
  "error.title": "Etwas ist schiefgelaufen",
  "error.subtitle":
    "Die Seite hatte ein Problem. Versuche es erneut oder gehe zurück, während wir alles für Lehrkräfte stabil halten.",
  "error.home": "Zurück zur Startseite",
  "error.contact": "Support kontaktieren",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const resolvedPathname = useMemo(() => {
    if (pathname) return pathname;
    if (typeof window !== "undefined" && window.location?.pathname) {
      return window.location.pathname;
    }
    return "/";
  }, [pathname]);

  const language = useMemo<Language>(
    () => detectLocaleFromPath(resolvedPathname),
    [resolvedPathname],
  );

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      const nextPath = toLocalePath(resolvedPathname, nextLanguage);
      if (nextPath !== resolvedPathname) {
        router.push(nextPath);
      }
    },
    [resolvedPathname, router],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  const t = (key: string) => {
    const translations = language === "en" ? translationsEn : translationsDe;
    return translations[key] ?? `[Missing ${language} key: ${key}]`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
