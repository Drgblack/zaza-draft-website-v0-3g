"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  ChevronRight,
  Shield,
  Zap,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Download,
  Play,
  Calendar,
  MessageSquare,
  Layout,
  FileText
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// --- Types ---
interface IntegrationData {
  name: string;
  category: string;
  description: string;
  logo: string;
  users: string;
  setupTime: string;
  benefits: string[];
  setupSteps: {
    step: number;
    title: string;
    description: string;
    image?: string;
  }[];
  useCases: {
    title: string;
    description: string;
    icon: any;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedIntegrations: {
    name: string;
    slug: string;
    category: string;
  }[];
}

// --- UI Translations ---
const uiContent = {
  en: {
    breadcrumbs: { home: "Home", integrations: "Integrations" },
    hero: { teachers: "teachers", setup: "setup", connect: "Connect" },
    tabs: { overview: "Overview", setup: "Setup Guide", useCases: "Use Cases", faq: "FAQ" },
    sections: {
      benefits: "Key Benefits",
      howItWorks: "How It Works",
      setupGuide: "Setup Guide",
      setupIntro: "Follow these steps to connect {name} with Zaza Draft. Setup takes approximately {time}.",
      startSetup: "Start Setup",
      needHelp: "Need Help?",
      needHelpDesc: "Our support team is here to help you get connected. We offer live chat, email support, and video tutorials.",
      contactSupport: "Contact Support",
      useCases: "Use Cases",
      useCasesDesc: "Discover how teachers are using the {name} integration to save time and enhance their workflow.",
      ready: "Ready to Get Started?",
      readyDesc: "Connect {name} now and start experiencing these benefits in your classroom.",
      faq: "Frequently Asked Questions",
      faqDesc: "Common questions about the {name} integration.",
      stillQuestions: "Still Have Questions?",
      stillQuestionsDesc: "Can't find what you're looking for? Our support team is ready to help.",
      viewDocs: "View Documentation",
      quickActions: "Quick Actions",
      connectNow: "Connect Now",
      downloadGuide: "Download Guide",
      viewDocsShort: "View Docs",
      related: "Related Integrations",
      secureTitle: "Secure & Compliant",
      secureDesc: "All integrations are FERPA compliant and use industry-standard encryption to protect your data.",
      notFound: "Integration Not Found",
      back: "Back to Integrations",
    },
  },
  de: {
    breadcrumbs: { home: "Startseite", integrations: "Integrationen" },
    hero: { teachers: "Lehrer", setup: "Einrichtung", connect: "Verbinden" },
    tabs: { overview: "Übersicht", setup: "Anleitung", useCases: "Anwendungsfälle", faq: "FAQ" },
    sections: {
      benefits: "Hauptvorteile",
      howItWorks: "So funktioniert es",
      setupGuide: "Einrichtungsanleitung",
      setupIntro: "Befolgen Sie diese Schritte, um {name} mit Zaza Draft zu verbinden. Die Einrichtung dauert ca. {time}.",
      startSetup: "Einrichtung starten",
      needHelp: "Brauchen Sie Hilfe?",
      needHelpDesc: "Unser Support-Team hilft Ihnen gerne bei der Verbindung. Wir bieten Live-Chat, E-Mail-Support und Video-Tutorials.",
      contactSupport: "Support kontaktieren",
      useCases: "Anwendungsfälle",
      useCasesDesc: "Entdecken Sie, wie Lehrer die {name}-Integration nutzen, um Zeit zu sparen und ihren Arbeitsablauf zu verbessern.",
      ready: "Bereit loszulegen?",
      readyDesc: "Verbinden Sie {name} jetzt und nutzen Sie diese Vorteile in Ihrem Klassenzimmer.",
      faq: "Häufig gestellte Fragen",
      faqDesc: "Häufige Fragen zur {name}-Integration.",
      stillQuestions: "Noch Fragen?",
      stillQuestionsDesc: "Nicht gefunden, wonach Sie suchen? Unser Support-Team steht bereit.",
      viewDocs: "Dokumentation ansehen",
      quickActions: "Schnellaktionen",
      connectNow: "Jetzt verbinden",
      downloadGuide: "Anleitung herunterladen",
      viewDocsShort: "Doku ansehen",
      related: "Verwandte Integrationen",
      secureTitle: "Sicher & Konform",
      secureDesc: "Alle Integrationen sind DSGVO/FERPA-konform und nutzen Industriestandard-Verschlüsselung zum Schutz Ihrer Daten.",
      notFound: "Integration nicht gefunden",
      back: "Zurück zu Integrationen",
    },
  },
};

// --- Integration Data (EN & DE) ---
const integrationsData: Record<string, Record<string, IntegrationData>> = {
  en: {
    "google-classroom": {
      name: "Google Classroom",
      category: "Learning Management",
      description: "Seamlessly sync your Zaza Draft content with Google Classroom. Auto-post assignments, share AI-generated materials, and streamline your workflow.",
      logo: "/google-classroom-logo.jpg",
      users: "45,000+",
      setupTime: "5 minutes",
      benefits: ["Auto-sync assignments", "One-click sharing", "Student roster sync", "Grade passback", "Bulk creation", "Content organization"],
      setupSteps: [
        { step: 1, title: "Connect Account", description: "Authorize Zaza Draft to access your Google Classroom data." },
        { step: 2, title: "Select Classes", description: "Choose which classes to sync with Zaza Draft." },
        { step: 3, title: "Configure Sync", description: "Set preferences for automatic posting and grade sync." },
        { step: 4, title: "Start Sharing", description: "Generate content and share directly to Classroom." },
      ],
      useCases: [
        { title: "Assignment Distribution", description: "Create and post differentiated assignments instantly.", icon: BookOpen },
        { title: "Material Sharing", description: "Share generated study guides to class streams.", icon: Zap },
        { title: "Grade Sync", description: "Sync grades back to Classroom automatically.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "What permissions are needed?", answer: "We only need access to classes, coursework, and grades." },
        { question: "Can I disconnect later?", answer: "Yes, you can revoke access at any time." },
      ],
      relatedIntegrations: [
        { name: "Canvas", slug: "canvas", category: "Learning Management" },
        { name: "Google Drive", slug: "google-drive", category: "Cloud Storage" },
        { name: "Gmail", slug: "gmail", category: "Communication" },
      ],
    },
    "canvas": {
      name: "Canvas LMS",
      category: "Learning Management",
      description: "Integrate Zaza Draft with Canvas LMS to streamline assignment creation, content sharing, and grade synchronization.",
      logo: "/canvas-lms-logo.jpg",
      users: "28,000+",
      setupTime: "7 minutes",
      benefits: ["Direct publishing", "Grade passback", "Roster sync", "Module creation", "Rubric integration", "Announcements"],
      setupSteps: [
        { step: 1, title: "Generate Token", description: "Create a new API access token in your Canvas settings." },
        { step: 2, title: "Enter Credentials", description: "Paste your token and Canvas URL into Zaza Draft." },
        { step: 3, title: "Select Courses", description: "Choose which courses to integrate." },
        { step: 4, title: "Configure", description: "Set default publishing options." },
      ],
      useCases: [
        { title: "Assignment Creation", description: "Publish AI-generated assignments with rubrics directly to Canvas.", icon: BookOpen },
        { title: "Module Building", description: "Build and push entire course modules.", icon: Zap },
        { title: "Grade Sync", description: "Send assessment grades to the Canvas gradebook.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "Does it work with Free for Teachers?", answer: "Yes, it supports both free and institutional accounts." },
        { question: "Is my token secure?", answer: "Yes, tokens are encrypted and stored securely." },
      ],
      relatedIntegrations: [
        { name: "Google Classroom", slug: "google-classroom", category: "Learning Management" },
        { name: "Schoology", slug: "schoology", category: "Learning Management" },
        { name: "Turnitin", slug: "turnitin", category: "Assessment" },
      ],
    },
    "schoology": {
      name: "Schoology",
      category: "Learning Management",
      description: "Connect your Schoology courses to Zaza Draft for seamless content distribution and grade synchronization.",
      logo: "/schoology-symbol.png",
      users: "15,000+",
      setupTime: "8 minutes",
      benefits: ["Course content sync", "Grade passback", "Assignment creation", "Resource folder organization", "Update posting", "Roster sync"],
      setupSteps: [
        { step: 1, title: "Get API Key", description: "Obtain your consumer key and secret from Schoology settings." },
        { step: 2, title: "Connect Zaza Draft", description: "Enter your credentials in the Zaza Draft integration panel." },
        { step: 3, title: "Map Courses", description: "Select the Schoology courses you wish to manage." },
        { step: 4, title: "Start Syncing", description: "Begin pushing assignments and materials to Schoology." },
      ],
      useCases: [
        { title: "Daily Updates", description: "Post daily summaries and updates to course feeds.", icon: MessageSquare },
        { title: "Material Distribution", description: "Organize AI-generated resources into Schoology folders.", icon: Layout },
        { title: "Grading", description: "Sync assessment scores back to the Schoology gradebook.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "Do I need admin access?", answer: "Instructor access is sufficient for most features." },
        { question: "Does it sync attendance?", answer: "Currently, we sync assignments and grades, not attendance." },
      ],
      relatedIntegrations: [
        { name: "Canvas", slug: "canvas", category: "Learning Management" },
        { name: "PowerSchool", slug: "powerschool", category: "Student Information" },
        { name: "Google Drive", slug: "google-drive", category: "Cloud Storage" },
      ],
    },
    "microsoft-teams": {
      name: "Microsoft Teams",
      category: "Communication",
      description: "Share assignments, announcements, and files directly to your Microsoft Teams for Education class channels.",
      logo: "/Microsoft-Teams-Logo.png",
      users: "32,000+",
      setupTime: "4 minutes",
      benefits: ["Post to channels", "Share files", "Assignment notifications", "Direct messaging", "Meeting notes", "Calendar sync"],
      setupSteps: [
        { step: 1, title: "Sign in with Microsoft", description: "Use your Office 365 Education account to sign in." },
        { step: 2, title: "Grant Permissions", description: "Allow Zaza Draft to post messages and files to Teams." },
        { step: 3, title: "Select Teams", description: "Choose the Class Teams you want to connect." },
        { step: 4, title: "Post Content", description: "Send updates directly from the Zaza Draft editor." },
      ],
      useCases: [
        { title: "Class Announcements", description: "Broadcast important updates to the General channel.", icon: MessageSquare },
        { title: "Resource Sharing", description: "Upload generated PDFs directly to the Files tab.", icon: Download },
        { title: "Assignment Alerts", description: "Notify students of new assignments via Teams.", icon: Zap },
      ],
      faqs: [
        { question: "Does it work with personal Teams?", answer: "It is optimized for Teams for Education accounts." },
        { question: "Can students reply?", answer: "Yes, posts appear as standard Teams messages." },
      ],
      relatedIntegrations: [
        { name: "Outlook", slug: "outlook", category: "Communication" },
        { name: "OneNote", slug: "onenote", category: "Productivity" },
        { name: "Canvas", slug: "canvas", category: "Learning Management" },
      ],
    },
    "infinite-campus": {
      name: "Infinite Campus",
      category: "Student Information",
      description: "Sync student rosters and grades between Infinite Campus and Zaza Draft.",
      logo: "/InfiniteCampusLogo.png",
      users: "12,000+",
      setupTime: "12 minutes",
      benefits: ["Roster sync", "Grade passback", "Attendance data", "Demographics import", "Parent contact sync", "Secure data transfer"],
      setupSteps: [
        { step: 1, title: "Request API Access", description: "Contact your district IT for OneRoster API credentials." },
        { step: 2, title: "Configure Connection", description: "Input your district's API URL and keys." },
        { step: 3, title: "Map Fields", description: "Match Zaza Draft fields to Infinite Campus data fields." },
        { step: 4, title: "Run Initial Sync", description: "Import your student rosters and data." },
      ],
      useCases: [
        { title: "Roster Updates", description: "Keep class lists automatically updated as students move.", icon: Users },
        { title: "Report Cards", description: "Pull student data to generate personalized comments.", icon: FileText },
        { title: "Grading", description: "Push assignment grades directly to the gradebook.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "Is it FERPA compliant?", answer: "Yes, all data transfer is encrypted and compliant." },
        { question: "How often does it sync?", answer: "Syncs typically occur nightly or on demand." },
      ],
      relatedIntegrations: [
        { name: "PowerSchool", slug: "powerschool", category: "Student Information" },
        { name: "Skyward", slug: "skyward", category: "Student Information" },
        { name: "Google Classroom", slug: "google-classroom", category: "Learning Management" },
      ],
    },
    "skyward": {
      name: "Skyward",
      category: "Student Information",
      description: "Connect Skyward Qmlativ or SMS 2.0 to streamline student data and grade management.",
      logo: "/Skyward-Logo-2021.webp",
      users: "10,000+",
      setupTime: "10 minutes",
      benefits: ["Student data sync", "Gradebook integration", "Attendance access", "Family access sync", "Discipline records", "Schedule sync"],
      setupSteps: [
        { step: 1, title: "IT Authorization", description: "Obtain authorization keys from your Skyward admin." },
        { step: 2, title: "Connect API", description: "Enter your Skyward API credentials in Zaza Draft." },
        { step: 3, title: "Select Terms", description: "Choose the current grading period/term." },
        { step: 4, title: "Sync", description: "Synchronize rosters and gradebooks." },
      ],
      useCases: [
        { title: "Data Import", description: "Quickly import student emails for communication.", icon: Download },
        { title: "Grade Entry", description: "Eliminate double-entry of grades.", icon: CheckCircle2 },
        { title: "Progress Reports", description: "Generate reports using real-time Skyward data.", icon: FileText },
      ],
      faqs: [
        { question: "Which version is supported?", answer: "We support both SMS 2.0 and Qmlativ." },
        { question: "Can I sync attendance?", answer: "Read access for attendance is available." },
      ],
      relatedIntegrations: [
        { name: "Infinite Campus", slug: "infinite-campus", category: "Student Information" },
        { name: "PowerSchool", slug: "powerschool", category: "Student Information" },
        { name: "Canvas", slug: "canvas", category: "Learning Management" },
      ],
    },
    "remind": {
      name: "Remind",
      category: "Communication",
      description: "Send AI-drafted announcements and messages to students and parents via Remind.",
      logo: "/Remind-Symbol.png",
      users: "40,000+",
      setupTime: "3 minutes",
      benefits: ["Draft in Zaza", "Send via Remind", "Class announcements", "Direct messages", "Schedule sends", "Translation support"],
      setupSteps: [
        { step: 1, title: "Link Account", description: "Log in to Remind through the Zaza Draft portal." },
        { step: 2, title: "Authorize", description: "Grant permission to send messages." },
        { step: 3, title: "Select Classes", description: "Choose which Remind classes to access." },
        { step: 4, title: "Send", description: "Draft messages and push them to Remind." },
      ],
      useCases: [
        { title: "Quick Updates", description: "Send short, AI-refined reminders about homework.", icon: MessageSquare },
        { title: "Parent Outreach", description: "Draft empathetic messages for parents.", icon: Users },
        { title: "Event Reminders", description: "Schedule reminders for upcoming tests.", icon: Calendar },
      ],
      faqs: [
        { question: "Is there a character limit?", answer: "Remind limits apply (usually 140 chars for SMS)." },
        { question: "Can I attach files?", answer: "Yes, via links or direct attachments." },
      ],
      relatedIntegrations: [
        { name: "ClassDojo", slug: "classdojo", category: "Communication" },
        { name: "Gmail", slug: "gmail", category: "Communication" },
        { name: "Google Classroom", slug: "google-classroom", category: "Learning Management" },
      ],
    },
    "classdojo": {
      name: "ClassDojo",
      category: "Communication",
      description: "Share positive moments and updates with families by posting to ClassDojo stories directly.",
      logo: "/ClassDojo-Emblem.png",
      users: "35,000+",
      setupTime: "3 minutes",
      benefits: ["Story posting", "Message parents", "Behavior notes", "Photo sharing", "Event updates", "Class broadcasts"],
      setupSteps: [
        { step: 1, title: "Login", description: "Authenticate with your ClassDojo credentials." },
        { step: 2, title: "Connect Class", description: "Select the active class for integration." },
        { step: 3, title: "Configure", description: "Set preferences for sharing stories." },
        { step: 4, title: "Post", description: "Share updates directly from Zaza Draft." },
      ],
      useCases: [
        { title: "Class Story", description: "Post weekly newsletters generated by AI.", icon: BookOpen },
        { title: "Behavior Updates", description: "Draft constructive feedback messages.", icon: MessageSquare },
        { title: "Announcements", description: "Share upcoming events with all parents.", icon: Zap },
      ],
      faqs: [
        { question: "Can I give points?", answer: "Currently, we support messaging and stories." },
        { question: "Is it private?", answer: "Yes, messages are secure and private." },
      ],
      relatedIntegrations: [
        { name: "Remind", slug: "remind", category: "Communication" },
        { name: "Seesaw", slug: "seesaw", category: "Communication" },
        { name: "Google Classroom", slug: "google-classroom", category: "Learning Management" },
      ],
    },
    "seesaw": {
      name: "Seesaw",
      category: "Communication",
      description: "Post activities, announcements, and student feedback to Seesaw journals.",
      logo: "/Seesaw.png",
      users: "25,000+",
      setupTime: "5 minutes",
      benefits: ["Aktivitäten", "Kommentare", "Ankündigungen", "Portfolio", "Entwürfe", "Medien"],
      setupSteps: [
        { step: 1, title: "Connect Account", description: "Sign in to Seesaw via Zaza Draft." },
        { step: 2, title: "Select Classes", description: "Choose classes to manage." },
        { step: 3, title: "Draft Content", description: "Create activities or comments." },
        { step: 4, title: "Publish", description: "Push content to student journals." },
      ],
      useCases: [
        { title: "Activity Library", description: "Generate lesson activities and save to library.", icon: BookOpen },
        { title: "Feedback", description: "Write personalized comments on student work.", icon: MessageSquare },
        { title: "Newsletters", description: "Send class updates to families.", icon: Users },
      ],
      faqs: [
        { question: "Does it work with Seesaw for Schools?", answer: "Yes, both free and paid plans work." },
        { question: "Can I upload images?", answer: "Yes, image and document uploads are supported." },
      ],
      relatedIntegrations: [
        { name: "ClassDojo", slug: "classdojo", category: "Communication" },
        { name: "Google Classroom", slug: "google-classroom", category: "Learning Management" },
        { name: "Canvas", slug: "canvas", category: "Learning Management" },
      ],
    },
    "outlook": {
      name: "Outlook",
      category: "Communication",
      description: "Integrate your Microsoft Outlook email to draft, schedule, and send professional communications.",
      logo: "/Outlook-icon.png",
      users: "42,000+",
      setupTime: "3 minutes",
      benefits: ["Send emails", "Calendar sync", "Contact import", "Template management", "Schedule send", "Signature sync"],
      setupSteps: [
        { step: 1, title: "Sign in with Microsoft", description: "Authenticate your Outlook account." },
        { step: 2, title: "Permissions", description: "Grant sending permissions." },
        { step: 3, title: "Preferences", description: "Set signature and default folders." },
        { step: 4, title: "Send", description: "Draft and send emails directly." },
      ],
      useCases: [
        { title: "Parent Emails", description: "Send formal updates to guardians.", icon: Users },
        { title: "Admin Communication", description: "Draft professional proposals.", icon: FileText },
        { title: "Meeting Requests", description: "Send calendar invites easily.", icon: Calendar },
      ],
      faqs: [
        { question: "Does it work with Office 365?", answer: "Yes, fully compatible with O365." },
        { question: "Are emails saved?", answer: "Yes, in your Sent Items folder." },
      ],
      relatedIntegrations: [
        { name: "Gmail", slug: "gmail", category: "Communication" },
        { name: "Microsoft Teams", slug: "microsoft-teams", category: "Communication" },
        { name: "OneNote", slug: "onenote", category: "Productivity" },
      ],
    },
    "google-calendar": {
      name: "Google Calendar",
      category: "Productivity",
      description: "Schedule parent-teacher conferences, lesson deadlines, and reminders automatically.",
      logo: "/Google-Calendar.png",
      users: "38,000+",
      setupTime: "2 minutes",
      benefits: ["Event creation", "Meeting scheduling", "Reminder setup", "Class schedule sync", "Availability sharing", "Video links"],
      setupSteps: [
        { step: 1, title: "Connect Google", description: "Authorize Calendar access." },
        { step: 2, title: "Select Calendars", description: "Choose which calendars to manage." },
        { step: 3, title: "Configure Defaults", description: "Set default meeting durations." },
        { step: 4, title: "Schedule", description: "Create events from Zaza Draft." },
      ],
      useCases: [
        { title: "Conference Scheduling", description: "Organize parent slots easily.", icon: Users },
        { title: "Lesson Planning", description: "Block out time for specific units.", icon: Calendar },
        { title: "Reminders", description: "Set alerts for grading deadlines.", icon: Clock },
      ],
      faqs: [
        { question: "Does it add Meet links?", answer: "Yes, optionally adds Google Meet." },
        { question: "Is it private?", answer: "We only access calendars you select." },
      ],
      relatedIntegrations: [
        { name: "Outlook", slug: "outlook", category: "Communication" },
        { name: "Google Classroom", slug: "google-classroom", category: "Learning Management" },
        { name: "Gmail", slug: "gmail", category: "Communication" },
      ],
    },
    "notion": {
      name: "Notion",
      category: "Productivity",
      description: "Export lesson plans, resource lists, and student notes directly to your Notion workspace.",
      logo: "/Notion_app_logo.png",
      users: "18,000+",
      setupTime: "4 minutes",
      benefits: ["Page creation", "Database items", "Template sync", "Resource organizing", "Lesson planning", "Collaboration"],
      setupSteps: [
        { step: 1, title: "Authorize Notion", description: "Connect your workspace." },
        { step: 2, title: "Select Pages", description: "Grant access to specific parent pages." },
        { step: 3, title: "Map Databases", description: "Choose databases for lesson plans." },
        { step: 4, title: "Export", description: "Send content to Notion." },
      ],
      useCases: [
        { title: "Curriculum Mapping", description: "Build visual curriculum maps.", icon: Layout },
        { title: "Resource Wiki", description: "Organize teaching resources.", icon: BookOpen },
        { title: "Student Notes", description: "Track anecdotal observations.", icon: FileText },
      ],
      faqs: [
        { question: "Does it support databases?", answer: "Yes, we can add items to databases." },
        { question: "Is formatting preserved?", answer: "Yes, Markdown formatting is kept." },
      ],
      relatedIntegrations: [
        { name: "Trello", slug: "trello", category: "Productivity" },
        { name: "Google Drive", slug: "google-drive", category: "Cloud Storage" },
        { name: "Evernote", slug: "evernote", category: "Productivity" },
      ],
    },
    "trello": {
      name: "Trello",
      category: "Productivity",
      description: "Turn lesson ideas and to-do lists into Trello cards to manage your teaching tasks.",
      logo: "/Trello-Logo.png",
      users: "14,000+",
      setupTime: "3 minutes",
      benefits: ["Card creation", "List management", "Checklist sync", "Due dates", "Attachments", "Labeling"],
      setupSteps: [
        { step: 1, title: "Connect Trello", description: "Log in and authorize." },
        { step: 2, title: "Select Board", description: "Choose your class board." },
        { step: 3, title: "Choose List", description: "Set default list for new items." },
        { step: 4, title: "Create", description: "Push tasks to Trello." },
      ],
      useCases: [
        { title: "Task Management", description: "Track grading and planning to-dos.", icon: CheckCircle2 },
        { title: "Kanban Planning", description: "Move lessons from Idea to Done.", icon: Layout },
        { title: "Project Tracking", description: "Manage long-term class projects.", icon: Clock },
      ],
      faqs: [
        { question: "Can I assign members?", answer: "Yes, if they are on the board." },
        { question: "Does it support checklists?", answer: "Yes, convert lists to checklists." },
      ],
      relatedIntegrations: [
        { name: "Notion", slug: "notion", category: "Productivity" },
        { name: "Google Calendar", slug: "google-calendar", category: "Productivity" },
        { name: "Microsoft Teams", slug: "microsoft-teams", category: "Communication" },
      ],
    },
    "gmail": {
      name: "Gmail",
      category: "Communication",
      description: "Connect Gmail to send AI-generated parent emails, student communications, and professional correspondence directly from Zaza Draft.",
      logo: "/gmail-logo.png",
      users: "52,000+",
      setupTime: "3 minutes",
      benefits: ["Send emails directly", "Template library", "Bulk sending", "Tracking", "Scheduled send", "Attachments"],
      setupSteps: [
        { step: 1, title: "Connect Gmail", description: "Authorize via OAuth 2.0." },
        { step: 2, title: "Preferences", description: "Set signature and defaults." },
        { step: 3, title: "Import Contacts", description: "Upload CSV or sync from SIS." },
        { step: 4, title: "Send", description: "Generate and send." },
      ],
      useCases: [
        { title: "Parent Emails", description: "Send personalized updates.", icon: Users },
        { title: "Professional", description: "Draft emails to colleagues.", icon: Zap },
        { title: "Feedback", description: "Send student feedback.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "Does it show my address?", answer: "Yes, sent from your Gmail." },
        { question: "Is it secure?", answer: "Yes, OAuth 2.0." },
      ],
      relatedIntegrations: [
        { name: "Outlook", slug: "outlook", category: "Communication" },
        { name: "Google Classroom", slug: "google-classroom", category: "Learning Management" },
        { name: "PowerSchool", slug: "powerschool", category: "Student Information" },
      ],
    },
    "powerschool": {
      name: "PowerSchool",
      category: "Student Information",
      description: "Sync student rosters, grades, and attendance data between PowerSchool and Zaza Draft.",
      logo: "/powerschool-logo.jpg",
      users: "18,000+",
      setupTime: "10 minutes",
      benefits: ["Roster sync", "Grade passback", "Attendance sync", "Parent contact sync", "IEP visibility", "Real-time updates"],
      setupSteps: [
        { step: 1, title: "Admin Contact", description: "Request API credentials from IT." },
        { step: 2, title: "Enter Credentials", description: "Input API keys in Zaza Draft." },
        { step: 3, title: "Configure Sync", description: "Select data points and frequency." },
        { step: 4, title: "Map Grades", description: "Map grade categories." },
      ],
      useCases: [
        { title: "Roster Mgmt", description: "Auto-update class lists.", icon: Users },
        { title: "Grade Sync", description: "Push grades to gradebook.", icon: CheckCircle2 },
        { title: "Communication", description: "Access parent emails.", icon: Zap },
      ],
      faqs: [
        { question: "Need approval?", answer: "Yes, district API access is required." },
        { question: "How often?", answer: "Configurable, usually daily." },
      ],
      relatedIntegrations: [
        { name: "Infinite Campus", slug: "infinite-campus", category: "Student Information" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
        { name: "Canvas", slug: "canvas", category: "Lernmanagement" },
      ],
    },
    "google-drive": {
      name: "Google Drive",
      category: "Cloud-Speicher",
      description: "Speichern Sie Zaza Draft Inhalte in Google Drive.",
      logo: "/google-drive-logo.png",
      users: "48.000+",
      setupTime: "2 Minuten",
      benefits: ["Auto-Save", "Ordner", "Versionen", "Teilen", "Offline", "Speicher"],
      setupSteps: [
        { step: 1, title: "Verbinden", description: "Autorisieren." },
        { step: 2, title: "Ort", description: "Ordner wählen." },
        { step: 3, title: "Auto-Save", description: "Aktivieren." },
        { step: 4, title: "Start", description: "Arbeiten." },
      ],
      useCases: [
        { title: "Backup", description: "Sicher speichern.", icon: Shield },
        { title: "Team", description: "Ordner teilen.", icon: Users },
        { title: "Offline", description: "Überall Zugriff.", icon: Download },
      ],
      faqs: [
        { question: "Speicherplatz?", answer: "Ja, zählt zum Quota." },
        { question: "Formate?", answer: "Docs, Sheets, PDF." },
      ],
      relatedIntegrations: [
        { name: "OneDrive", slug: "microsoft-onedrive", category: "Cloud-Speicher" },
        { name: "Dropbox", slug: "dropbox", category: "Cloud-Speicher" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
      ],
    },
  },
  de: {
    "google-classroom": {
      name: "Google Classroom",
      category: "Lernmanagement",
      description: "Synchronisieren Sie Inhalte nahtlos mit Google Classroom. Aufgaben posten, Materialien teilen und Workflow optimieren.",
      logo: "/google-classroom-logo.jpg",
      users: "45.000+",
      setupTime: "5 Minuten",
      benefits: ["Auto-Sync von Aufgaben", "One-Click Teilen", "Listen-Sync", "Notenrückgabe", "Massen-Erstellung", "Organisation"],
      setupSteps: [
        { step: 1, title: "Konto verbinden", description: "Autorisieren Sie den Zugriff auf Classroom." },
        { step: 2, title: "Klassen wählen", description: "Wählen Sie die zu synchronisierenden Klassen." },
        { step: 3, title: "Konfiguration", description: "Einstellungen für Posts und Noten." },
        { step: 4, title: "Teilen", description: "Inhalte direkt teilen." },
      ],
      useCases: [
        { title: "Aufgaben", description: "Differenzierte Aufgaben erstellen.", icon: BookOpen },
        { title: "Materialien", description: "Arbeitsblätter teilen.", icon: Zap },
        { title: "Noten", description: "Noten automatisch synchronisieren.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "Welche Rechte?", answer: "Nur Zugriff auf Klassen und Aufgaben." },
        { question: "Trennen?", answer: "Ja, jederzeit widerrufbar." },
      ],
      relatedIntegrations: [
        { name: "Canvas", slug: "canvas", category: "Lernmanagement" },
        { name: "Google Drive", slug: "google-drive", category: "Cloud-Speicher" },
        { name: "Gmail", slug: "gmail", category: "Kommunikation" },
      ],
    },
    "canvas": {
      name: "Canvas LMS",
      category: "Lernmanagement",
      description: "Integrieren Sie Zaza Draft mit Canvas für optimierte Aufgabenerstellung und Notensynchronisation.",
      logo: "/canvas-lms-logo.jpg",
      users: "28.000+",
      setupTime: "7 Minuten",
      benefits: ["Direkt-Publishing", "Notenrückgabe", "Listen-Sync", "Module", "Rubriken", "Ankündigungen"],
      setupSteps: [
        { step: 1, title: "Token generieren", description: "Erstellen Sie ein API-Token in Canvas." },
        { step: 2, title: "Eingeben", description: "Token in Zaza Draft einfügen." },
        { step: 3, title: "Kurse", description: "Kurse auswählen." },
        { step: 4, title: "Konfig", description: "Optionen einstellen." },
      ],
      useCases: [
        { title: "Aufgaben", description: "Direkt in Canvas veröffentlichen.", icon: BookOpen },
        { title: "Module", description: "Kursmodule erstellen.", icon: Zap },
        { title: "Noten", description: "Noten ins Notenbuch senden.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "Kostenlos?", answer: "Ja, auch für Free-Accounts." },
        { question: "Sicher?", answer: "Ja, Token sind verschlüsselt." },
      ],
      relatedIntegrations: [
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
        { name: "Schoology", slug: "schoology", category: "Lernmanagement" },
        { name: "Turnitin", slug: "turnitin", category: "Bewertung" },
      ],
    },
    "schoology": {
      name: "Schoology",
      category: "Lernmanagement",
      description: "Verbinden Sie Schoology-Kurse für nahtlose Inhaltsverteilung und Notensynchronisation.",
      logo: "/schoology-symbol.png",
      users: "15.000+",
      setupTime: "8 Minuten",
      benefits: ["Inhaltssync", "Notenrückgabe", "Aufgabenerstellung", "Ressourcenordner", "Updates", "Listen-Sync"],
      setupSteps: [
        { step: 1, title: "API Key", description: "Consumer Key und Secret besorgen." },
        { step: 2, title: "Verbinden", description: "Daten in Zaza Draft eingeben." },
        { step: 3, title: "Kurse", description: "Kurse zuordnen." },
        { step: 4, title: "Starten", description: "Synchronisierung beginnen." },
      ],
      useCases: [
        { title: "Updates", description: "Tägliche Zusammenfassungen posten.", icon: MessageSquare },
        { title: "Materialien", description: "Ressourcen organisieren.", icon: Layout },
        { title: "Bewertung", description: "Noten synchronisieren.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "Admin-Rechte?", answer: "Lehrer-Rechte reichen meist." },
        { question: "Anwesenheit?", answer: "Nein, nur Noten und Aufgaben." },
      ],
      relatedIntegrations: [
        { name: "Canvas", slug: "canvas", category: "Lernmanagement" },
        { name: "PowerSchool", slug: "powerschool", category: "Schülerinformationen" },
        { name: "Google Drive", slug: "google-drive", category: "Cloud-Speicher" },
      ],
    },
    "microsoft-teams": {
      name: "Microsoft Teams",
      category: "Kommunikation",
      description: "Teilen Sie Aufgaben und Dateien direkt in Ihren Teams-Klassenkanälen.",
      logo: "/Microsoft-Teams-Logo.png",
      users: "32.000+",
      setupTime: "4 Minuten",
      benefits: ["Kanal-Posts", "Dateien teilen", "Benachrichtigungen", "Direktnachrichten", "Notizen", "Kalender"],
      setupSteps: [
        { step: 1, title: "Anmelden", description: "Mit Office 365 Education anmelden." },
        { step: 2, title: "Berechtigung", description: "Zugriff gewähren." },
        { step: 3, title: "Teams wählen", description: "Klassen auswählen." },
        { step: 4, title: "Posten", description: "Updates senden." },
      ],
      useCases: [
        { title: "Ankündigungen", description: "Wichtige Updates posten.", icon: MessageSquare },
        { title: "Ressourcen", description: "PDFs in Dateien hochladen.", icon: Download },
        { title: "Alarme", description: "Schüler benachrichtigen.", icon: Zap },
      ],
      faqs: [
        { question: "Privat-Teams?", answer: "Optimiert für Education." },
        { question: "Antworten?", answer: "Ja, normale Teams-Nachrichten." },
      ],
      relatedIntegrations: [
        { name: "Outlook", slug: "outlook", category: "Kommunikation" },
        { name: "OneNote", slug: "onenote", category: "Produktivität" },
        { name: "Canvas", slug: "canvas", category: "Lernmanagement" },
      ],
    },
    "infinite-campus": {
      name: "Infinite Campus",
      category: "Schülerinformationen",
      description: "Synchronisieren Sie Listen und Noten zwischen Infinite Campus und Zaza Draft.",
      logo: "/InfiniteCampusLogo.png",
      users: "12.000+",
      setupTime: "12 Minuten",
      benefits: ["Listen-Sync", "Notenrückgabe", "Anwesenheit", "Demografie", "Elternkontakte", "Sicher"],
      setupSteps: [
        { step: 1, title: "API anfordern", description: "IT nach OneRoster-Zugang fragen." },
        { step: 2, title: "Konfigurieren", description: "URL und Keys eingeben." },
        { step: 3, title: "Mapping", description: "Felder zuordnen." },
        { step: 4, title: "Sync", description: "Daten importieren." },
      ],
      useCases: [
        { title: "Updates", description: "Listen aktuell halten.", icon: Users },
        { title: "Zeugnisse", description: "Daten für Kommentare nutzen.", icon: FileText },
        { title: "Noten", description: "Noten direkt übertragen.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "Konform?", answer: "Ja, FERPA-konform." },
        { question: "Wie oft?", answer: "Meist nachts." },
      ],
      relatedIntegrations: [
        { name: "PowerSchool", slug: "powerschool", category: "Schülerinformationen" },
        { name: "Skyward", slug: "skyward", category: "Schülerinformationen" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
      ],
    },
    "skyward": {
      name: "Skyward",
      category: "Schülerinformationen",
      description: "Verbinden Sie Skyward für optimiertes Daten- und Notenmanagement.",
      logo: "/Skyward-Logo-2021.webp",
      users: "10.000+",
      setupTime: "10 Minuten",
      benefits: ["Datensync", "Notenbuch", "Anwesenheit", "Familienzugang", "Disziplin", "Stundenplan"],
      setupSteps: [
        { step: 1, title: "Autorisierung", description: "Keys vom Admin erhalten." },
        { step: 2, title: "Verbinden", description: "Daten eingeben." },
        { step: 3, title: "Term wählen", description: "Zeitraum festlegen." },
        { step: 4, title: "Sync", description: "Starten." },
      ],
      useCases: [
        { title: "Import", description: "E-Mails importieren.", icon: Download },
        { title: "Noten", description: "Keine doppelte Eingabe.", icon: CheckCircle2 },
        { title: "Berichte", description: "Echtzeitdaten nutzen.", icon: FileText },
      ],
      faqs: [
        { question: "Version?", answer: "SMS 2.0 und Qmlativ." },
        { question: "Anwesenheit?", answer: "Lesezugriff möglich." },
      ],
      relatedIntegrations: [
        { name: "Infinite Campus", slug: "infinite-campus", category: "Schülerinformationen" },
        { name: "PowerSchool", slug: "powerschool", category: "Schülerinformationen" },
        { name: "Canvas", slug: "canvas", category: "Lernmanagement" },
      ],
    },
    "remind": {
      name: "Remind",
      category: "Kommunikation",
      description: "Senden Sie KI-entworfene Ankündigungen an Schüler und Eltern via Remind.",
      logo: "/Remind-Symbol.png",
      users: "40.000+",
      setupTime: "3 Minuten",
      benefits: ["In Zaza entwerfen", "Via Remind senden", "Ankündigungen", "Direktnachrichten", "Planen", "Übersetzung"],
      setupSteps: [
        { step: 1, title: "Verknüpfen", description: "Bei Remind anmelden." },
        { step: 2, title: "Autorisieren", description: "Zugriff gewähren." },
        { step: 3, title: "Klassen", description: "Klassen wählen." },
        { step: 4, title: "Senden", description: "Nachrichten pushen." },
      ],
      useCases: [
        { title: "Updates", description: "Kurze Erinnerungen.", icon: MessageSquare },
        { title: "Eltern", description: "Empathische Nachrichten.", icon: Users },
        { title: "Erinnerungen", description: "Tests ankündigen.", icon: Calendar },
      ],
      faqs: [
        { question: "Limit?", answer: "Ja, meist 140 Zeichen." },
        { question: "Dateien?", answer: "Ja, als Links/Anhang." },
      ],
      relatedIntegrations: [
        { name: "ClassDojo", slug: "classdojo", category: "Kommunikation" },
        { name: "Gmail", slug: "gmail", category: "Kommunikation" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
      ],
    },
    "classdojo": {
      name: "ClassDojo",
      category: "Kommunikation",
      description: "Teilen Sie Updates und positive Momente via ClassDojo Stories.",
      logo: "/ClassDojo-Emblem.png",
      users: "35.000+",
      setupTime: "3 Minuten",
      benefits: ["Storys posten", "Elternnachrichten", "Verhalten", "Fotos", "Events", "Broadcasts"],
      setupSteps: [
        { step: 1, title: "Login", description: "Anmelden." },
        { step: 2, title: "Klasse", description: "Klasse wählen." },
        { step: 3, title: "Konfig", description: "Präferenzen." },
        { step: 4, title: "Posten", description: "Teilen." },
      ],
      useCases: [
        { title: "Class Story", description: "Wochenbriefe.", icon: BookOpen },
        { title: "Verhalten", description: "Feedback senden.", icon: MessageSquare },
        { title: "Ankündigungen", description: "Events teilen.", icon: Zap },
      ],
      faqs: [
        { question: "Punkte?", answer: "Nur Nachrichten/Storys." },
        { question: "Privat?", answer: "Ja, sicher." },
      ],
      relatedIntegrations: [
        { name: "Remind", slug: "remind", category: "Kommunikation" },
        { name: "Seesaw", slug: "seesaw", category: "Kommunikation" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
      ],
    },
    "seesaw": {
      name: "Seesaw",
      category: "Kommunikation",
      description: "Posten Sie Aktivitäten und Feedback in Seesaw-Journale.",
      logo: "/Seesaw.png",
      users: "25.000+",
      setupTime: "5 Minuten",
      benefits: ["Aktivitäten", "Kommentare", "Ankündigungen", "Portfolio", "Entwürfe", "Medien"],
      setupSteps: [
        { step: 1, title: "Verbinden", description: "Anmelden." },
        { step: 2, title: "Klassen", description: "Wählen." },
        { step: 3, title: "Entwerfen", description: "Erstellen." },
        { step: 4, title: "Veröffentlichen", description: "Pushen." },
      ],
      useCases: [
        { title: "Bibliothek", description: "Aktivitäten speichern.", icon: BookOpen },
        { title: "Feedback", description: "Kommentare schreiben.", icon: MessageSquare },
        { title: "Newsletter", description: "Updates senden.", icon: Users },
      ],
      faqs: [
        { question: "Schulen?", answer: "Ja, für alle Pläne." },
        { question: "Bilder?", answer: "Ja, Upload möglich." },
      ],
      relatedIntegrations: [
        { name: "ClassDojo", slug: "classdojo", category: "Kommunikation" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
        { name: "Canvas", slug: "canvas", category: "Lernmanagement" },
      ],
    },
    "outlook": {
      name: "Outlook",
      category: "Kommunikation",
      description: "Integrieren Sie Outlook, um E-Mails zu entwerfen und zu senden.",
      logo: "/Outlook-icon.png",
      users: "42.000+",
      setupTime: "3 Minuten",
      benefits: ["Senden", "Kalender", "Kontakte", "Vorlagen", "Planen", "Signatur"],
      setupSteps: [
        { step: 1, title: "Anmelden", description: "Microsoft-Login." },
        { step: 2, title: "Rechte", description: "Gewähren." },
        { step: 3, title: "Einstellungen", description: "Signatur setzen." },
        { step: 4, title: "Senden", description: "Entwerfen und senden." },
      ],
      useCases: [
        { title: "Eltern", description: "Updates senden.", icon: Users },
        { title: "Admin", description: "Professionelle E-Mails.", icon: FileText },
        { title: "Termine", description: "Einladungen senden.", icon: Calendar },
      ],
      faqs: [
        { question: "O365?", answer: "Ja, kompatibel." },
        { question: "Gespeichert?", answer: "Ja, in Gesendet." },
      ],
      relatedIntegrations: [
        { name: "Gmail", slug: "gmail", category: "Kommunikation" },
        { name: "Microsoft Teams", slug: "microsoft-teams", category: "Kommunikation" },
        { name: "OneNote", slug: "onenote", category: "Produktivität" },
      ],
    },
    "google-calendar": {
      name: "Google Calendar",
      category: "Produktivität",
      description: "Planen Sie Elternsprechtage und Fristen automatisch.",
      logo: "/Google-Calendar.png",
      users: "38.000+",
      setupTime: "2 Minuten",
      benefits: ["Events", "Planung", "Erinnerungen", "Stundenplan", "Verfügbarkeit", "Video-Links"],
      setupSteps: [
        { step: 1, title: "Verbinden", description: "Autorisieren." },
        { step: 2, title: "Kalender", description: "Auswählen." },
        { step: 3, title: "Konfig", description: "Dauer setzen." },
        { step: 4, title: "Planen", description: "Erstellen." },
      ],
      useCases: [
        { title: "Sprechtage", description: "Termine organisieren.", icon: Users },
        { title: "Planung", description: "Einheiten blocken.", icon: Calendar },
        { title: "Alarme", description: "Fristen setzen.", icon: Clock },
      ],
      faqs: [
        { question: "Meet Links?", answer: "Ja, optional." },
        { question: "Privat?", answer: "Nur gewählte Kalender." },
      ],
      relatedIntegrations: [
        { name: "Outlook", slug: "outlook", category: "Kommunikation" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
        { name: "Gmail", slug: "gmail", category: "Kommunikation" },
      ],
    },
    "notion": {
      name: "Notion",
      category: "Produktivität",
      description: "Exportieren Sie Pläne und Ressourcen direkt in Ihren Notion-Workspace.",
      logo: "/Notion_app_logo.png",
      users: "18.000+",
      setupTime: "4 Minuten",
      benefits: ["Seiten", "Datenbanken", "Vorlagen", "Ressourcen", "Planung", "Kollaboration"],
      setupSteps: [
        { step: 1, title: "Autorisieren", description: "Verbinden." },
        { step: 2, title: "Seiten", description: "Zugriff geben." },
        { step: 3, title: "Datenbanken", description: "Zuordnen." },
        { step: 4, title: "Export", description: "Senden." },
      ],
      useCases: [
        { title: "Curriculum", description: "Visuelle Pläne.", icon: Layout },
        { title: "Wiki", description: "Ressourcen ordnen.", icon: BookOpen },
        { title: "Notizen", description: "Beobachtungen.", icon: FileText },
      ],
      faqs: [
        { question: "Datenbanken?", answer: "Ja, Items hinzufügen." },
        { question: "Formatierung?", answer: "Ja, Markdown bleibt." },
      ],
      relatedIntegrations: [
        { name: "Trello", slug: "trello", category: "Produktivität" },
        { name: "Google Drive", slug: "google-drive", category: "Cloud-Speicher" },
        { name: "Evernote", slug: "evernote", category: "Produktivität" },
      ],
    },
    "trello": {
      name: "Trello",
      category: "Produktivität",
      description: "Verwandeln Sie Ideen in Trello-Karten für Ihr Aufgabenmanagement.",
      logo: "/Trello-Logo.png",
      users: "14.000+",
      setupTime: "3 Minuten",
      benefits: ["Karten", "Listen", "Checklisten", "Fristen", "Anhänge", "Labels"],
      setupSteps: [
        { step: 1, title: "Verbinden", description: "Anmelden." },
        { step: 2, title: "Board", description: "Wählen." },
        { step: 3, title: "Liste", description: "Standard setzen." },
        { step: 4, title: "Erstellen", description: "Pushen." },
      ],
      useCases: [
        { title: "Aufgaben", description: "To-Dos tracken.", icon: CheckCircle2 },
        { title: "Kanban", description: "Fortschritt planen.", icon: Layout },
        { title: "Projekte", description: "Langzeitprojekte.", icon: Clock },
      ],
      faqs: [
        { question: "Mitglieder?", answer: "Ja, zuweisen möglich." },
        { question: "Checklisten?", answer: "Ja, Listen konvertieren." },
      ],
      relatedIntegrations: [
        { name: "Notion", slug: "notion", category: "Produktivität" },
        { name: "Google Calendar", slug: "google-calendar", category: "Produktivität" },
        { name: "Microsoft Teams", slug: "microsoft-teams", category: "Kommunikation" },
      ],
    },
    "gmail": {
      name: "Gmail",
      category: "Kommunikation",
      description: "Verbinden Sie Gmail, um KI-generierte Eltern-E-Mails direkt zu senden.",
      logo: "/gmail-logo.png",
      users: "52.000+",
      setupTime: "3 Minuten",
      benefits: ["Direkt senden", "Vorlagen", "Massenversand", "Tracking", "Planen", "Anhänge"],
      setupSteps: [
        { step: 1, title: "Verbinden", description: "OAuth 2.0." },
        { step: 2, title: "Einstellungen", description: "Signatur." },
        { step: 3, title: "Import", description: "Kontakte laden." },
        { step: 4, title: "Senden", description: "Generieren." },
      ],
      useCases: [
        { title: "Eltern", description: "Updates senden.", icon: Users },
        { title: "Profi", description: "Kollegen mailen.", icon: Zap },
        { title: "Feedback", description: "Schülerfeedback.", icon: CheckCircle2 },
      ],
      faqs: [
        { question: "Absender?", answer: "Ihre Gmail-Adresse." },
        { question: "Sicher?", answer: "Ja, OAuth 2.0." },
      ],
      relatedIntegrations: [
        { name: "Outlook", slug: "outlook", category: "Kommunikation" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
        { name: "PowerSchool", slug: "powerschool", category: "Schülerinformationen" },
      ],
    },
    "powerschool": {
      name: "PowerSchool",
      category: "Schülerinformationen",
      description: "Sync für Listen, Noten und Anwesenheit.",
      logo: "/powerschool-logo.jpg",
      users: "18.000+",
      setupTime: "10 Minuten",
      benefits: ["Listen-Sync", "Notenrückgabe", "Anwesenheit", "Elternkontakte", "IEP", "Echtzeit"],
      setupSteps: [
        { step: 1, title: "Admin", description: "API anfragen." },
        { step: 2, title: "Eingeben", description: "Keys eingeben." },
        { step: 3, title: "Konfig", description: "Daten wählen." },
        { step: 4, title: "Mapping", description: "Kategorien." },
      ],
      useCases: [
        { title: "Listen", description: "Auto-Update.", icon: Users },
        { title: "Noten", description: "Übertragen.", icon: CheckCircle2 },
        { title: "Kontakt", description: "Eltern-Emails.", icon: Zap },
      ],
      faqs: [
        { question: "Genehmigung?", answer: "Ja, Bezirksebene." },
        { question: "Häufigkeit?", answer: "Konfigurierbar." },
      ],
      relatedIntegrations: [
        { name: "Infinite Campus", slug: "infinite-campus", category: "Schülerinformationen" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
        { name: "Canvas", slug: "canvas", category: "Lernmanagement" },
      ],
    },
    "google-drive": {
      name: "Google Drive",
      category: "Cloud-Speicher",
      description: "Speichern Sie Zaza Draft Inhalte in Google Drive.",
      logo: "/google-drive-logo.png",
      users: "48.000+",
      setupTime: "2 Minuten",
      benefits: ["Auto-Save", "Ordner", "Versionen", "Teilen", "Offline", "Speicher"],
      setupSteps: [
        { step: 1, title: "Verbinden", description: "Autorisieren." },
        { step: 2, title: "Ort", description: "Ordner wählen." },
        { step: 3, title: "Auto-Save", description: "Aktivieren." },
        { step: 4, title: "Start", description: "Arbeiten." },
      ],
      useCases: [
        { title: "Backup", description: "Sicher speichern.", icon: Shield },
        { title: "Team", description: "Ordner teilen.", icon: Users },
        { title: "Offline", description: "Überall Zugriff.", icon: Download },
      ],
      faqs: [
        { question: "Speicherplatz?", answer: "Ja, zählt zum Quota." },
        { question: "Formate?", answer: "Docs, Sheets, PDF." },
      ],
      relatedIntegrations: [
        { name: "OneDrive", slug: "microsoft-onedrive", category: "Cloud-Speicher" },
        { name: "Dropbox", slug: "dropbox", category: "Cloud-Speicher" },
        { name: "Google Classroom", slug: "google-classroom", category: "Lernmanagement" },
      ],
    },
  },
};

export default function IntegrationClient({ slug }: { slug: string }) {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith("/de") ?? false;
  const langKey = isGerman ? "de" : "en";
  
  const text = uiContent[langKey];
  const integration = integrationsData[langKey][slug];

  const [activeTab, setActiveTab] = useState<"overview" | "setup" | "use-cases" | "faq">("overview");

  useEffect(() => {
    if (integration) {
      trackEvent("integration_page_view", {
        integration_name: integration.name,
        integration_category: integration.category,
        locale: langKey,
      });
    }
  }, [integration, langKey]);

  if (!integration) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{text.sections.notFound}</h1>
          <Link href={isGerman ? "/de/integrations" : "/integrations"}>
            <Button>{text.sections.back}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleConnectClick = () => {
    trackEvent("integration_connect_click", {
      integration_name: integration.name,
      integration_category: integration.category,
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as any);
    trackEvent("integration_tab_view", {
      integration_name: integration.name,
      tab_name: tab,
    });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Breadcrumbs */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href={isGerman ? "/de" : "/"} className="hover:text-white transition-colors">
              {text.breadcrumbs.home}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={isGerman ? "/de/integrations" : "/integrations"} className="hover:text-white transition-colors">
              {text.breadcrumbs.integrations}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{integration.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="border-b border-white/10 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#A78BFA]/20 text-[#A78BFA] border-[#A78BFA]/30">{integration.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{integration.name} Integration</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{integration.description}</p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#A78BFA]" />
                  <span className="text-gray-300">{integration.users} {text.hero.teachers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#A78BFA]" />
                  <span className="text-gray-300">{integration.setupTime} {text.hero.setup}</span>
                </div>
              </div>
              <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white" onClick={handleConnectClick}>
                {text.hero.connect} {integration.name}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src={integration.logo || "/placeholder.svg"}
                alt={`${integration.name} logo`}
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10 sticky top-0 bg-[#0F172A] z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: "overview", label: text.tabs.overview },
              { id: "setup", label: text.tabs.setup },
              { id: "use-cases", label: text.tabs.useCases },
              { id: "faq", label: text.tabs.faq },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#A78BFA] text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">{text.sections.benefits}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {integration.benefits.map((benefit, index) => (
                      <Card key={index} className="bg-[#1E293B] border-white/10 p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-6">{text.sections.howItWorks}</h2>
                  <div className="space-y-6">
                    {integration.setupSteps.map((step) => (
                      <Card key={step.step} className="bg-[#1E293B] border-white/10 p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-[#A78BFA]/20 flex items-center justify-center">
                              <span className="text-[#A78BFA] font-bold">{step.step}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-300 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "setup" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{text.sections.setupGuide}</h2>
                  <p className="text-gray-300 text-lg mb-8">
                    {text.sections.setupIntro.replace("{name}", integration.name).replace("{time}", integration.setupTime)}
                  </p>
                </div>

                <div className="space-y-8">
                  {integration.setupSteps.map((step) => (
                    <div key={step.step} className="relative">
                      {step.step < integration.setupSteps.length && (
                        <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-white/10" />
                      )}
                      <Card className="bg-[#1E293B] border-white/10 p-8 relative">
                        <div className="flex gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{step.step}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">{step.description}</p>
                            {step.step === 1 && (
                              <Button
                                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                                onClick={handleConnectClick}
                              >
                                {text.sections.startSetup}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-[#8B5CF6]/20 to-[#A78BFA]/20 border-[#A78BFA]/30 p-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="h-6 w-6 text-[#A78BFA] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{text.sections.needHelp}</h3>
                      <p className="text-gray-300 mb-4">
                        {text.sections.needHelpDesc}
                      </p>
                      <Button
                        variant="outline"
                        className="border-[#A78BFA] text-[#A78BFA] hover:bg-[#A78BFA]/10 bg-transparent"
                      >
                        {text.sections.contactSupport}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "use-cases" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{text.sections.useCases}</h2>
                  <p className="text-gray-300 text-lg mb-8">
                    {text.sections.useCasesDesc.replace("{name}", integration.name)}
                  </p>
                </div>

                <div className="space-y-6">
                  {integration.useCases.map((useCase, index) => {
                    const Icon = useCase.icon
                    return (
                      <Card key={index} className="bg-[#1E293B] border-white/10 p-8">
                        <div className="flex gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 rounded-lg bg-[#A78BFA]/20 flex items-center justify-center">
                              <Icon className="h-7 w-7 text-[#A78BFA]" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">{useCase.description}</p>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>

                <Card className="bg-gradient-to-r from-[#8B5CF6]/20 to-[#A78BFA]/20 border-[#A78BFA]/30 p-8">
                  <h3 className="text-2xl font-bold mb-4">{text.sections.ready}</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    {text.sections.readyDesc.replace("{name}", integration.name)}
                  </p>
                  <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white" onClick={handleConnectClick}>
                    {text.sections.connectNow}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Card>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{text.sections.faq}</h2>
                  <p className="text-gray-300 text-lg mb-8">
                    {text.sections.faqDesc.replace("{name}", integration.name)}
                  </p>
                </div>

                <div className="space-y-4">
                  {integration.faqs.map((faq, index) => (
                    <Card key={index} className="bg-[#1E293B] border-white/10 p-6">
                      <h3 className="text-xl font-semibold mb-3 text-[#A78BFA]">{faq.question}</h3>
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </Card>
                  ))}
                </div>

                <Card className="bg-[#1E293B] border-white/10 p-8">
                  <h3 className="text-2xl font-bold mb-4">{text.sections.stillQuestions}</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    {text.sections.stillQuestionsDesc}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">{text.sections.contactSupport}</Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 bg-transparent">
                      {text.sections.viewDocs}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-[#1E293B] border-white/10 p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">{text.sections.quickActions}</h3>
              <div className="space-y-3">
                <Button
                  className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white justify-start"
                  onClick={handleConnectClick}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {text.sections.connectNow}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/5 justify-start bg-transparent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {text.sections.downloadGuide}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/5 justify-start bg-transparent"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {text.sections.viewDocsShort}
                </Button>
              </div>
            </Card>

            {/* Related Integrations */}
            <Card className="bg-[#1E293B] border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">{text.sections.related}</h3>
              <div className="space-y-3">
                {integration.relatedIntegrations.map((related) => (
                  <Link
                    key={related.slug}
                    href={isGerman ? `/de/integrations/${related.slug}` : `/integrations/${related.slug}`}
                    className="block p-3 rounded-lg border border-white/10 hover:border-[#A78BFA]/50 hover:bg-white/5 transition-all"
                  >
                    <div className="font-semibold text-white mb-1">{related.name}</div>
                    <div className="text-sm text-gray-400">{related.category}</div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Support */}
            <Card className="bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/20 border-[#A78BFA]/30 p-6">
              <Shield className="h-8 w-8 text-[#A78BFA] mb-3" />
              <h3 className="text-lg font-bold mb-2">{text.sections.secureTitle}</h3>
              <p className="text-sm text-gray-300">
                {text.sections.secureDesc}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
