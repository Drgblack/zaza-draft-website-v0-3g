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
    tabs: {
      overview: "Overview",
      setup: "Setup Guide",
      useCases: "Use Cases",
      faq: "FAQ",
    },
    sections: {
      benefits: "Key Benefits",
      howItWorks: "How It Works",
      setupGuide: "Setup Guide",
      setupIntro:
        "Follow these steps to connect {name} with Zaza Draft. Setup takes approximately {time}.",
      startSetup: "Start Setup",
      needHelp: "Need Help?",
      needHelpDesc:
        "Our support team is here to help you get connected. We offer live chat, email support, and video tutorials.",
      contactSupport: "Contact Support",
      useCases: "Use Cases",
      useCasesDesc:
        "Discover how teachers are using the {name} integration to save time and enhance their workflow.",
      ready: "Ready to Get Started?",
      readyDesc:
        "Connect {name} now and start experiencing these benefits in your classroom.",
      faq: "Frequently Asked Questions",
      faqDesc: "Common questions about the {name} integration.",
      stillQuestions: "Still Have Questions?",
      stillQuestionsDesc:
        "Can't find what you're looking for? Our support team is ready to help.",
      viewDocs: "View Documentation",
      quickActions: "Quick Actions",
      connectNow: "Connect Now",
      downloadGuide: "Download Guide",
      viewDocsShort: "View Docs",
      related: "Related Integrations",
      secureTitle: "Secure & Compliant",
      secureDesc:
        "All integrations are FERPA compliant and use industry-standard encryption to protect your data.",
      notFound: "Integration Not Found",
      back: "Back to Integrations",
    },
  },
  de: {
    breadcrumbs: { home: "Startseite", integrations: "Integrationen" },
    hero: { teachers: "Lehrer", setup: "Einrichtung", connect: "Verbinden" },
    tabs: {
      overview: "Übersicht",
      setup: "Anleitung",
      useCases: "Anwendungsfälle",
      faq: "FAQ",
    },
    sections: {
      benefits: "Hauptvorteile",
      howItWorks: "So funktioniert es",
      setupGuide: "Einrichtungsanleitung",
      setupIntro:
        "Befolgen Sie diese Schritte, um {name} mit Zaza Draft zu verbinden. Die Einrichtung dauert ca. {time}.",
      startSetup: "Einrichtung starten",
      needHelp: "Brauchen Sie Hilfe?",
      needHelpDesc:
        "Unser Support-Team hilft Ihnen gerne bei der Verbindung. Wir bieten Live-Chat, E-Mail-Support und Video-Tutorials.",
      contactSupport: "Support kontaktieren",
      useCases: "Anwendungsfälle",
      useCasesDesc:
        "Entdecken Sie, wie Lehrer die {name}-Integration nutzen, um Zeit zu sparen und ihren Arbeitsablauf zu verbessern.",
      ready: "Bereit loszulegen?",
      readyDesc:
        "Verbinden Sie {name} jetzt und nutzen Sie diese Vorteile in Ihrem Klassenzimmer.",
      faq: "Häufig gestellte Fragen",
      faqDesc: "Häufige Fragen zur {name}-Integration.",
      stillQuestions: "Noch Fragen?",
      stillQuestionsDesc:
        "Nicht gefunden, wonach Sie suchen? Unser Support-Team steht bereit.",
      viewDocs: "Dokumentation ansehen",
      quickActions: "Schnellaktionen",
      connectNow: "Jetzt verbinden",
      downloadGuide: "Anleitung herunterladen",
      viewDocsShort: "Doku ansehen",
      related: "Verwandte Integrationen",
      secureTitle: "Sicher & Konform",
      secureDesc:
        "Alle Integrationen sind DSGVO/FERPA-konform und nutzen Industriestandard-Verschlüsselung zum Schutz Ihrer Daten.",
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
      description:
        "Seamlessly sync your Zaza Draft content with Google Classroom. Auto-post assignments, share AI-generated materials, and streamline your workflow.",
      logo: "/google-classroom-logo.jpg",
      users: "45,000+",
      setupTime: "5 minutes",
      benefits: [
        "Auto-sync assignments to Google Classroom",
        "One-click sharing of AI-generated materials",
        "Student roster synchronization",
        "Grade passback integration",
        "Bulk assignment creation",
        "Class-specific content organization",
      ],
      setupSteps: [
        {
          step: 1,
          title: "Connect Your Google Account",
          description:
            'Click "Connect Google Classroom" and authorize Zaza Draft to access your Google Classroom data. We only request the minimum permissions needed.',
        },
        {
          step: 2,
          title: "Select Your Classes",
          description:
            "Choose which Google Classroom classes you want to sync with Zaza Draft. You can sync all classes or select specific ones.",
        },
        {
          step: 3,
          title: "Configure Sync Settings",
          description:
            "Set your preferences for automatic assignment posting, student roster updates, and grade synchronization.",
        },
        {
          step: 4,
          title: "Start Creating & Sharing",
          description:
            "Generate content in Zaza Draft and share directly to your Google Classroom with one click. Assignments, materials, and announcements sync automatically.",
        },
      ],
      useCases: [
        {
          title: "Assignment Distribution",
          description:
            "Create differentiated assignments in Zaza Draft and automatically post them to specific Google Classroom classes or student groups.",
          icon: BookOpen,
        },
        {
          title: "Material Sharing",
          description:
            "Generate lesson materials, worksheets, or study guides and share them instantly to your class stream or materials folder.",
          icon: Zap,
        },
        {
          title: "Grade Synchronization",
          description:
            "Grades from Zaza Draft assessments automatically sync back to Google Classroom gradebook, saving hours of manual entry.",
          icon: CheckCircle2,
        },
      ],
      faqs: [
        {
          question: "What permissions does Zaza Draft need?",
          answer:
            "We only request permissions to view your classes, post assignments, and sync grades. We never access student emails or personal information beyond what's necessary for the integration.",
        },
        {
          question: "Can I disconnect the integration later?",
          answer:
            "Yes, you can disconnect Google Classroom at any time from your Zaza Draft settings. This will stop all syncing but won't delete any existing content.",
        },
        {
          question: "Does this work with Google Workspace for Education?",
          answer:
            "Yes, the integration works seamlessly with both personal Google accounts and Google Workspace for Education accounts.",
        },
        {
          question: "How often does data sync?",
          answer:
            "Student rosters sync every 24 hours automatically. Assignments and materials post immediately when you click share. Grades sync within 5 minutes of completion.",
        },
      ],
      relatedIntegrations: [
        {
          name: "Canvas LMS",
          slug: "canvas-lms",
          category: "Learning Management",
        },
        {
          name: "Google Drive",
          slug: "google-drive",
          category: "Cloud Storage",
        },
        { name: "Gmail", slug: "gmail", category: "Communication" },
      ],
    },
    "canvas-lms": {
      name: "Canvas LMS",
      category: "Learning Management",
      description:
        "Integrate Zaza Draft with Canvas LMS to streamline assignment creation, content sharing, and grade synchronization across your courses.",
      logo: "/canvas-lms-logo.jpg",
      users: "28,000+",
      setupTime: "7 minutes",
      benefits: [
        "Direct assignment publishing to Canvas",
        "Automatic grade passback",
        "Course roster synchronization",
        "Module and page creation",
        "Rubric integration",
        "Announcement posting",
      ],
      setupSteps: [
        {
          step: 1,
          title: "Generate Canvas API Token",
          description:
            "Log into Canvas, go to Account > Settings > Approved Integrations, and generate a new access token for Zaza Draft.",
        },
        {
          step: 2,
          title: "Enter API Credentials",
          description:
            "In Zaza Draft, navigate to Integrations > Canvas and paste your API token and Canvas instance URL.",
        },
        {
          step: 3,
          title: "Select Courses to Sync",
          description:
            "Choose which Canvas courses you want to integrate with Zaza Draft. You can add or remove courses anytime.",
        },
        {
          step: 4,
          title: "Configure Publishing Options",
          description:
            "Set default options for assignment publishing, including due dates, point values, and submission types.",
        },
      ],
      useCases: [
        {
          title: "Assignment Creation",
          description:
            "Generate assignments in Zaza Draft and publish directly to Canvas with rubrics, due dates, and submission settings configured.",
          icon: BookOpen,
        },
        {
          title: "Module Building",
          description:
            "Create entire course modules with AI-generated content and push them to Canvas with proper sequencing and prerequisites.",
          icon: Zap,
        },
        {
          title: "Grade Integration",
          description:
            "Automatically sync grades from Zaza Draft assessments to Canvas gradebook with detailed feedback and rubric scores.",
          icon: CheckCircle2,
        },
      ],
      faqs: [
        {
          question: "Is this compatible with Canvas Free for Teachers?",
          answer:
            "Yes, the integration works with Canvas Free for Teachers as well as institutional Canvas accounts.",
        },
        {
          question: "Can I edit assignments after publishing to Canvas?",
          answer:
            "Yes, you can edit assignments in either Zaza Draft or Canvas. Changes made in Zaza Draft can be re-synced to Canvas with one click.",
        },
        {
          question: "Does this work with Canvas Studio?",
          answer:
            "Currently, the integration focuses on assignments, modules, and grades. Canvas Studio integration is planned for a future update.",
        },
        {
          question: "How secure is my Canvas API token?",
          answer:
            "Your API token is encrypted and stored securely. We use industry-standard encryption and never share your credentials with third parties.",
        },
      ],
      relatedIntegrations: [
        {
          name: "Google Classroom",
          slug: "google-classroom",
          category: "Learning Management",
        },
        {
          name: "Schoology",
          slug: "schoology",
          category: "Learning Management",
        },
        { name: "Turnitin", slug: "turnitin", category: "Assessment" },
      ],
    },
    gmail: {
      name: "Gmail",
      category: "Communication",
      description:
        "Connect Gmail to send AI-generated parent emails, student communications, and professional correspondence directly from Zaza Draft.",
      logo: "/gmail-logo.png",
      users: "52,000+",
      setupTime: "3 minutes",
      benefits: [
        "Send emails directly from Zaza Draft",
        "Email template library integration",
        "Bulk email sending with personalization",
        "Email tracking and analytics",
        "Scheduled email sending",
        "Attachment support",
      ],
      setupSteps: [
        {
          step: 1,
          title: "Connect Gmail Account",
          description:
            'Click "Connect Gmail" and authorize Zaza Draft to send emails on your behalf using OAuth 2.0 secure authentication.',
        },
        {
          step: 2,
          title: "Set Email Preferences",
          description:
            "Configure your default email signature, reply-to address, and sending preferences.",
        },
        {
          step: 3,
          title: "Import Contacts (Optional)",
          description:
            "Import parent and student contacts from your SIS or upload a CSV file for easy email addressing.",
        },
        {
          step: 4,
          title: "Start Sending",
          description:
            "Generate emails with AI in Zaza Draft and send them directly through your Gmail account with full tracking.",
        },
      ],
      useCases: [
        {
          title: "Parent Communication",
          description:
            "Generate personalized parent emails about student progress, behavior, or upcoming events and send them in bulk with individual customization.",
          icon: Users,
        },
        {
          title: "Professional Correspondence",
          description:
            "Draft professional emails to colleagues, administrators, or external partners with AI assistance and send directly from your Gmail.",
          icon: Zap,
        },
        {
          title: "Student Feedback",
          description:
            "Send individualized feedback emails to students with assignment comments, encouragement, and next steps.",
          icon: CheckCircle2,
        },
      ],
      faqs: [
        {
          question: "Will emails show as sent from my Gmail address?",
          answer:
            "Yes, all emails are sent from your Gmail address and appear in your Gmail Sent folder. Recipients see your email address, not Zaza Draft.",
        },
        {
          question: "Are there sending limits?",
          answer:
            "Gmail has daily sending limits (500 emails/day for personal accounts, 2000/day for Workspace). Zaza Draft respects these limits and will queue emails if needed.",
        },
        {
          question: "Can I schedule emails for later?",
          answer:
            "Yes, you can schedule emails to send at a specific date and time. This is perfect for sending parent updates during business hours.",
        },
        {
          question: "Is my Gmail password stored?",
          answer:
            "No, we use OAuth 2.0 authentication, which means we never see or store your Gmail password. You can revoke access anytime from your Google account settings.",
        },
      ],
      relatedIntegrations: [
        {
          name: "Microsoft Outlook",
          slug: "microsoft-outlook",
          category: "Communication",
        },
        {
          name: "Google Classroom",
          slug: "google-classroom",
          category: "Learning Management",
        },
        {
          name: "PowerSchool",
          slug: "powerschool",
          category: "Student Information",
        },
      ],
    },
    powerschool: {
      name: "PowerSchool",
      category: "Student Information",
      description:
        "Sync student rosters, grades, and attendance data between PowerSchool and Zaza Draft for seamless data management.",
      logo: "/powerschool-logo.jpg",
      users: "18,000+",
      setupTime: "10 minutes",
      benefits: [
        "Automatic student roster synchronization",
        "Grade passback to PowerSchool gradebook",
        "Attendance data integration",
        "Parent contact information sync",
        "IEP and 504 plan visibility",
        "Real-time data updates",
      ],
      setupSteps: [
        {
          step: 1,
          title: "Contact Your IT Administrator",
          description:
            "PowerSchool integration requires district-level API access. Contact your IT administrator to request API credentials for Zaza Draft.",
        },
        {
          step: 2,
          title: "Enter API Credentials",
          description:
            "Once you receive your PowerSchool API credentials, enter them in Zaza Draft under Integrations > PowerSchool.",
        },
        {
          step: 3,
          title: "Configure Data Sync",
          description:
            "Select which data points to sync (rosters, grades, attendance) and set your sync frequency (hourly, daily, or real-time).",
        },
        {
          step: 4,
          title: "Map Grade Categories",
          description:
            "Map Zaza Draft assignment categories to PowerSchool grade categories to ensure grades sync to the correct columns.",
        },
      ],
      useCases: [
        {
          title: "Roster Management",
          description:
            "Automatically sync student rosters from PowerSchool to Zaza Draft, including class assignments, schedule changes, and student demographics.",
          icon: Users,
        },
        {
          title: "Grade Synchronization",
          description:
            "Push grades from Zaza Draft assessments directly to PowerSchool gradebook, eliminating double entry and reducing errors.",
          icon: CheckCircle2,
        },
        {
          title: "Parent Communication",
          description:
            "Access up-to-date parent contact information from PowerSchool to send personalized communications through Zaza Draft.",
          icon: Zap,
        },
      ],
      faqs: [
        {
          question: "Do I need district approval for this integration?",
          answer:
            "Yes, PowerSchool integration requires district-level API access. Your IT administrator will need to approve and provide credentials.",
        },
        {
          question: "How often does data sync?",
          answer:
            "You can configure sync frequency from hourly to real-time. Most districts choose daily syncs overnight to minimize system load.",
        },
        {
          question: "Can I sync historical grade data?",
          answer:
            "Yes, you can perform a one-time historical sync when setting up the integration to import past grades and student data.",
        },
        {
          question: "Is student data secure?",
          answer:
            "Yes, all data is encrypted in transit and at rest. We are FERPA compliant and follow strict data security protocols required by educational institutions.",
        },
      ],
      relatedIntegrations: [
        {
          name: "Infinite Campus",
          slug: "infinite-campus",
          category: "Student Information",
        },
        {
          name: "Google Classroom",
          slug: "google-classroom",
          category: "Learning Management",
        },
        {
          name: "Canvas LMS",
          slug: "canvas-lms",
          category: "Learning Management",
        },
      ],
    },
    "google-drive": {
      name: "Google Drive",
      category: "Cloud Storage",
      description:
        "Save and organize all your Zaza Draft content directly to Google Drive with automatic folder organization and version control.",
      logo: "/google-drive-logo.png",
      users: "48,000+",
      setupTime: "2 minutes",
      benefits: [
        "Auto-save content to Google Drive",
        "Organized folder structure",
        "Version history and recovery",
        "Easy sharing with colleagues",
        "Offline access to materials",
        "Unlimited storage (with Workspace)",
      ],
      setupSteps: [
        {
          step: 1,
          title: "Connect Google Drive",
          description:
            'Click "Connect Google Drive" and authorize Zaza Draft to create and manage files in your Drive.',
        },
        {
          step: 2,
          title: "Choose Save Location",
          description:
            'Select where you want Zaza Draft to save files - either in a dedicated "Zaza Draft" folder or your existing folder structure.',
        },
        {
          step: 3,
          title: "Configure Auto-Save",
          description:
            "Enable auto-save to automatically backup all your Zaza Draft content to Google Drive as you work.",
        },
        {
          step: 4,
          title: "Start Creating",
          description:
            "All your Zaza Draft content now automatically saves to Google Drive with organized folders by content type and date.",
        },
      ],
      useCases: [
        {
          title: "Automatic Backup",
          description:
            "Every document, lesson plan, and assignment you create in Zaza Draft automatically saves to Google Drive for safekeeping.",
          icon: Shield,
        },
        {
          title: "Colleague Collaboration",
          description:
            "Share Zaza Draft materials with colleagues by giving them access to your Google Drive folders - no need to export and email.",
          icon: Users,
        },
        {
          title: "Offline Access",
          description:
            "Access your Zaza Draft materials offline through Google Drive when you don't have internet connectivity.",
          icon: Download,
        },
      ],
      faqs: [
        {
          question: "Does this use my Google Drive storage quota?",
          answer:
            "Yes, files saved to Google Drive count toward your storage quota. Google Workspace for Education accounts typically have unlimited storage.",
        },
        {
          question: "Can I organize files into custom folders?",
          answer:
            "Yes, you can customize the folder structure and organization. Zaza Draft will respect your preferences and save files accordingly.",
        },
        {
          question: "What file formats are saved?",
          answer:
            "Content is saved in Google Docs format for text, Google Sheets for data, and PDF for finalized materials. You can configure your preferred formats.",
        },
        {
          question: "Can I disconnect without losing files?",
          answer:
            "Yes, disconnecting the integration won't delete any files from your Google Drive. They'll remain accessible even after disconnecting.",
        },
      ],
      relatedIntegrations: [
        {
          name: "Microsoft OneDrive",
          slug: "microsoft-onedrive",
          category: "Cloud Storage",
        },
        { name: "Dropbox", slug: "dropbox", category: "Cloud Storage" },
        {
          name: "Google Classroom",
          slug: "google-classroom",
          category: "Learning Management",
        },
      ],
    },
  },
  de: {
    "google-classroom": {
      name: "Google Classroom",
      category: "Lernmanagement",
      description:
        "Synchronisieren Sie Ihre Zaza Draft-Inhalte nahtlos mit Google Classroom. Veröffentlichen Sie automatisch Aufgaben, teilen Sie KI-generierte Materialien und optimieren Sie Ihren Arbeitsablauf.",
      logo: "/google-classroom-logo.jpg",
      users: "45.000+",
      setupTime: "5 Minuten",
      benefits: [
        "Aufgaben automatisch mit Google Classroom synchronisieren",
        "KI-generierte Materialien mit einem Klick teilen",
        "Synchronisation der Klassenliste",
        "Notenrückgabe-Integration",
        "Erstellung von Aufgaben in großen Mengen",
        "Klassenspezifische Inhaltsorganisation",
      ],
      setupSteps: [
        {
          step: 1,
          title: "Verbinden Sie Ihr Google-Konto",
          description:
            'Klicken Sie auf "Google Classroom verbinden" und autorisieren Sie Zaza Draft. Wir fordern nur die minimal erforderlichen Berechtigungen an.',
        },
        {
          step: 2,
          title: "Wählen Sie Ihre Klassen aus",
          description:
            "Wählen Sie aus, welche Google Classroom-Klassen Sie mit Zaza Draft synchronisieren möchten.",
        },
        {
          step: 3,
          title: "Synchronisierungseinstellungen",
          description:
            "Legen Sie Ihre Einstellungen für automatische Aufgabenveröffentlichung, Listenaktualisierungen und Notensynchronisierung fest.",
        },
        {
          step: 4,
          title: "Erstellen & Teilen",
          description:
            "Generieren Sie Inhalte in Zaza Draft und teilen Sie sie direkt. Aufgaben, Materialien und Ankündigungen werden automatisch synchronisiert.",
        },
      ],
      useCases: [
        {
          title: "Aufgabenverteilung",
          description:
            "Erstellen Sie differenzierte Aufgaben in Zaza Draft und posten Sie diese automatisch in spezifischen Klassen oder Gruppen.",
          icon: BookOpen,
        },
        {
          title: "Materialfreigabe",
          description:
            "Erstellen Sie Unterrichtsmaterialien oder Arbeitsblätter und teilen Sie diese sofort in Ihrem Kurs-Stream.",
          icon: Zap,
        },
        {
          title: "Notensynchronisierung",
          description:
            "Noten aus Zaza Draft-Bewertungen werden automatisch in das Google Classroom-Notenbuch synchronisiert.",
          icon: CheckCircle2,
        },
      ],
      faqs: [
        {
          question: "Welche Berechtigungen benötigt Zaza Draft?",
          answer:
            "Wir benötigen nur Berechtigungen zum Anzeigen Ihrer Klassen, Posten von Aufgaben und Synchronisieren von Noten. Wir greifen niemals auf persönliche E-Mails zu.",
        },
        {
          question: "Kann ich die Verbindung später trennen?",
          answer:
            "Ja, Sie können Google Classroom jederzeit in Ihren Einstellungen trennen. Bestehende Inhalte bleiben erhalten.",
        },
        {
          question: "Funktioniert dies mit Google Workspace for Education?",
          answer:
            "Ja, die Integration funktioniert nahtlos sowohl mit persönlichen Konten als auch mit Workspace for Education.",
        },
        {
          question: "Wie oft werden Daten synchronisiert?",
          answer:
            "Klassenlisten werden alle 24 Stunden synchronisiert. Aufgaben und Materialien sofort. Noten innerhalb von 5 Minuten.",
        },
      ],
      relatedIntegrations: [
        { name: "Canvas LMS", slug: "canvas-lms", category: "Lernmanagement" },
        {
          name: "Google Drive",
          slug: "google-drive",
          category: "Cloud-Speicher",
        },
        { name: "Gmail", slug: "gmail", category: "Kommunikation" },
      ],
    },
    "canvas-lms": {
      name: "Canvas LMS",
      category: "Lernmanagement",
      description:
        "Integrieren Sie Zaza Draft mit Canvas LMS, um die Aufgabenerstellung, das Teilen von Inhalten und die Notensynchronisierung in Ihren Kursen zu optimieren.",
      logo: "/canvas-lms-logo.jpg",
      users: "28.000+",
      setupTime: "7 Minuten",
      benefits: [
        "Direkte Aufgabenveröffentlichung in Canvas",
        "Automatische Notenrückgabe",
        "Kurslistensynchronisierung",
        "Modul- und Seitenerstellung",
        "Rubrik-Integration",
        "Ankündigungen posten",
      ],
      setupSteps: [
        {
          step: 1,
          title: "Canvas API-Token generieren",
          description:
            "Loggen Sie sich in Canvas ein, gehen Sie zu Konto > Einstellungen > Genehmigte Integrationen und generieren Sie ein neues Token.",
        },
        {
          step: 2,
          title: "API-Anmeldedaten eingeben",
          description:
            "Navigieren Sie in Zaza Draft zu Integrationen > Canvas und fügen Sie Ihr Token sowie die Canvas-URL ein.",
        },
        {
          step: 3,
          title: "Kurse zur Synchronisierung wählen",
          description:
            "Wählen Sie aus, welche Canvas-Kurse Sie integrieren möchten. Sie können Kurse jederzeit hinzufügen oder entfernen.",
        },
        {
          step: 4,
          title: "Veröffentlichungsoptionen konfigurieren",
          description:
            "Legen Sie Standardoptionen fest, einschließlich Fälligkeitsdaten, Punktwerten und Einreichungstypen.",
        },
      ],
      useCases: [
        {
          title: "Aufgabenerstellung",
          description:
            "Erstellen Sie Aufgaben in Zaza Draft und veröffentlichen Sie diese direkt in Canvas mit konfigurierten Rubriken und Einstellungen.",
          icon: BookOpen,
        },
        {
          title: "Modulaufbau",
          description:
            "Erstellen Sie ganze Kursmodule mit KI-Inhalten und übertragen Sie diese mit der richtigen Reihenfolge nach Canvas.",
          icon: Zap,
        },
        {
          title: "Notenintegration",
          description:
            "Synchronisieren Sie Noten automatisch mit detailliertem Feedback und Rubrikbewertungen in das Canvas-Notenbuch.",
          icon: CheckCircle2,
        },
      ],
      faqs: [
        {
          question: "Ist dies mit Canvas Free for Teachers kompatibel?",
          answer:
            "Ja, die Integration funktioniert sowohl mit der kostenlosen Version als auch mit institutionellen Konten.",
        },
        {
          question: "Kann ich Aufgaben nach der Veröffentlichung bearbeiten?",
          answer:
            "Ja, Änderungen in Zaza Draft können mit einem Klick erneut mit Canvas synchronisiert werden.",
        },
        {
          question: "Funktioniert dies mit Canvas Studio?",
          answer:
            "Derzeit konzentriert sich die Integration auf Aufgaben, Module und Noten. Canvas Studio folgt in einem Update.",
        },
        {
          question: "Wie sicher ist mein API-Token?",
          answer:
            "Ihr Token wird verschlüsselt und sicher gespeichert. Wir geben Ihre Anmeldedaten niemals weiter.",
        },
      ],
      relatedIntegrations: [
        {
          name: "Google Classroom",
          slug: "google-classroom",
          category: "Lernmanagement",
        },
        { name: "Schoology", slug: "schoology", category: "Lernmanagement" },
        { name: "Turnitin", slug: "turnitin", category: "Bewertung" },
      ],
    },
    gmail: {
      name: "Gmail",
      category: "Kommunikation",
      description:
        "Verbinden Sie Gmail, um KI-generierte Eltern-E-Mails und Kommunikation direkt aus Zaza Draft zu senden.",
      logo: "/gmail-logo.png",
      users: "52.000+",
      setupTime: "3 Minuten",
      benefits: [
        "E-Mails direkt aus Zaza Draft senden",
        "Vorlagenbibliothek-Integration",
        "Massenversand mit Personalisierung",
        "Tracking und Analysen",
        "Geplanter Versand",
        "Anhang-Unterstützung",
      ],
      setupSteps: [
        {
          step: 1,
          title: "Gmail-Konto verbinden",
          description:
            'Klicken Sie auf "Gmail verbinden" und autorisieren Sie Zaza Draft über OAuth 2.0.',
        },
        {
          step: 2,
          title: "E-Mail-Einstellungen",
          description:
            "Konfigurieren Sie Ihre Standardsignatur, Antwortadresse und Versandeinstellungen.",
        },
        {
          step: 3,
          title: "Kontakte importieren (Optional)",
          description:
            "Importieren Sie Eltern- und Schülerkontakte für eine einfache Adressierung.",
        },
        {
          step: 4,
          title: "Senden starten",
          description:
            "Generieren Sie E-Mails mit KI und senden Sie diese direkt über Ihr Gmail-Konto.",
        },
      ],
      useCases: [
        {
          title: "Elternkommunikation",
          description:
            "Erstellen Sie personalisierte E-Mails über Fortschritte oder Termine und senden Sie diese massenhaft.",
          icon: Users,
        },
        {
          title: "Professionelle Korrespondenz",
          description:
            "Entwerfen Sie professionelle E-Mails an Kollegen oder Administratoren mit KI-Unterstützung.",
          icon: Zap,
        },
        {
          title: "Schüler-Feedback",
          description:
            "Senden Sie individuelles Feedback mit Kommentaren und Ermutigungen direkt an Schüler.",
          icon: CheckCircle2,
        },
      ],
      faqs: [
        {
          question: "Werden E-Mails als von mir gesendet angezeigt?",
          answer:
            "Ja, alle E-Mails erscheinen in Ihrem Gesendet-Ordner und Empfänger sehen Ihre Adresse.",
        },
        {
          question: "Gibt es Versandlimits?",
          answer:
            "Gmail hat Limits (500/Tag privat, 2000/Tag Workspace). Zaza Draft respektiert diese Limits.",
        },
        {
          question: "Kann ich E-Mails planen?",
          answer:
            "Ja, Sie können den Versand für ein bestimmtes Datum und eine Uhrzeit planen.",
        },
        {
          question: "Wird mein Passwort gespeichert?",
          answer: "Nein, wir nutzen OAuth 2.0 und sehen niemals Ihr Passwort.",
        },
      ],
      relatedIntegrations: [
        {
          name: "Microsoft Outlook",
          slug: "microsoft-outlook",
          category: "Kommunikation",
        },
        {
          name: "Google Classroom",
          slug: "google-classroom",
          category: "Lernmanagement",
        },
        {
          name: "PowerSchool",
          slug: "powerschool",
          category: "Schülerinformationen",
        },
      ],
    },
    powerschool: {
      name: "PowerSchool",
      category: "Schülerinformationen",
      description:
        "Synchronisieren Sie Listen, Noten und Anwesenheitsdaten zwischen PowerSchool und Zaza Draft.",
      logo: "/powerschool-logo.jpg",
      users: "18.000+",
      setupTime: "10 Minuten",
      benefits: [
        "Automatische Listensynchronisierung",
        "Notenrückgabe an PowerSchool",
        "Anwesenheitsdaten-Integration",
        "Elternkontakt-Sync",
        "Einsicht in Förderpläne",
        "Echtzeit-Updates",
      ],
      setupSteps: [
        {
          step: 1,
          title: "IT-Administrator kontaktieren",
          description:
            "Die Integration erfordert API-Zugriff auf Bezirksebene. Bitten Sie Ihre IT um Zugangsdaten.",
        },
        {
          step: 2,
          title: "API-Daten eingeben",
          description:
            "Geben Sie die erhaltenen Zugangsdaten in Zaza Draft unter Integrationen > PowerSchool ein.",
        },
        {
          step: 3,
          title: "Datensynchronisierung konfigurieren",
          description:
            "Wählen Sie die zu synchronisierenden Daten (Listen, Noten, Anwesenheit) und die Häufigkeit.",
        },
        {
          step: 4,
          title: "Notenkategorien zuordnen",
          description:
            "Ordnen Sie Zaza Draft-Kategorien den PowerSchool-Notenkategorien zu.",
        },
      ],
      useCases: [
        {
          title: "Listenverwaltung",
          description:
            "Synchronisieren Sie Schülerlisten automatisch, einschließlich Stundenplanänderungen.",
          icon: Users,
        },
        {
          title: "Notensynchronisierung",
          description:
            "Übertragen Sie Noten direkt in das PowerSchool-Notenbuch, um doppelte Eingaben zu vermeiden.",
          icon: CheckCircle2,
        },
        {
          title: "Elternkommunikation",
          description:
            "Greifen Sie auf aktuelle Elternkontaktdaten zu, um personalisierte Nachrichten zu senden.",
          icon: Zap,
        },
      ],
      faqs: [
        {
          question: "Brauche ich eine Genehmigung?",
          answer:
            "Ja, der Zugriff auf Bezirksebene ist erforderlich. Ihr IT-Administrator muss dies genehmigen.",
        },
        {
          question: "Wie oft wird synchronisiert?",
          answer:
            "Sie können die Frequenz konfigurieren. Die meisten wählen tägliche Synchronisierungen über Nacht.",
        },
        {
          question: "Kann ich historische Daten synchronisieren?",
          answer:
            "Ja, ein einmaliger Import historischer Daten ist bei der Einrichtung möglich.",
        },
        {
          question: "Sind die Daten sicher?",
          answer:
            "Ja, alle Daten sind verschlüsselt und wir sind FERPA-konform.",
        },
      ],
      relatedIntegrations: [
        {
          name: "Infinite Campus",
          slug: "infinite-campus",
          category: "Schülerinformationen",
        },
        {
          name: "Google Classroom",
          slug: "google-classroom",
          category: "Lernmanagement",
        },
        { name: "Canvas LMS", slug: "canvas-lms", category: "Lernmanagement" },
      ],
    },
    "google-drive": {
      name: "Google Drive",
      category: "Cloud-Speicher",
      description:
        "Speichern und organisieren Sie alle Ihre Zaza Draft-Inhalte direkt in Google Drive.",
      logo: "/google-drive-logo.png",
      users: "48.000+",
      setupTime: "2 Minuten",
      benefits: [
        "Automatische Speicherung in Drive",
        "Organisierte Ordnerstruktur",
        "Versionsverlauf",
        "Einfaches Teilen mit Kollegen",
        "Offline-Zugriff",
        "Unbegrenzter Speicher (mit Workspace)",
      ],
      setupSteps: [
        {
          step: 1,
          title: "Google Drive verbinden",
          description:
            'Klicken Sie auf "Verbinden" und autorisieren Sie Zaza Draft, Dateien zu erstellen.',
        },
        {
          step: 2,
          title: "Speicherort wählen",
          description: "Wählen Sie einen Ordner für Zaza Draft-Dateien aus.",
        },
        {
          step: 3,
          title: "Auto-Save konfigurieren",
          description:
            "Aktivieren Sie das automatische Speichern, um Backups Ihrer Arbeit zu erstellen.",
        },
        {
          step: 4,
          title: "Erstellen starten",
          description:
            "Alle Inhalte werden nun automatisch organisiert in Google Drive gespeichert.",
        },
      ],
      useCases: [
        {
          title: "Automatisches Backup",
          description:
            "Jedes Dokument und jeder Plan wird sicher in Google Drive gespeichert.",
          icon: Shield,
        },
        {
          title: "Zusammenarbeit",
          description:
            "Teilen Sie Materialien mit Kollegen, indem Sie Drive-Ordner freigeben.",
          icon: Users,
        },
        {
          title: "Offline-Zugriff",
          description:
            "Greifen Sie über Drive offline auf Ihre Materialien zu.",
          icon: Download,
        },
      ],
      faqs: [
        {
          question: "Verbraucht dies meinen Speicherplatz?",
          answer:
            "Ja, Dateien zählen zu Ihrem Kontingent. Workspace-Konten haben oft unbegrenzten Speicher.",
        },
        {
          question: "Kann ich Ordner anpassen?",
          answer:
            "Ja, Sie können die Struktur anpassen. Zaza Draft respektiert Ihre Einstellungen.",
        },
        {
          question: "Welche Formate werden gespeichert?",
          answer:
            "Google Docs für Text, Sheets für Daten und PDF für fertige Materialien.",
        },
        {
          question: "Kann ich die Verbindung trennen?",
          answer:
            "Ja, das Trennen der Verbindung löscht keine Dateien aus Ihrem Drive.",
        },
      ],
      relatedIntegrations: [
        {
          name: "Microsoft OneDrive",
          slug: "microsoft-onedrive",
          category: "Cloud-Speicher",
        },
        { name: "Dropbox", slug: "dropbox", category: "Cloud-Speicher" },
        {
          name: "Google Classroom",
          slug: "google-classroom",
          category: "Lernmanagement",
        },
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

  const [activeTab, setActiveTab] = useState<
    "overview" | "setup" | "use-cases" | "faq"
  >("overview");

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
            <Link
              href={isGerman ? "/de" : "/"}
              className="hover:text-white transition-colors"
            >
              {text.breadcrumbs.home}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={isGerman ? "/de/integrations" : "/integrations"}
              className="hover:text-white transition-colors"
            >
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
              <Badge className="mb-4 bg-[#A78BFA]/20 text-[#A78BFA] border-[#A78BFA]/30">
                {integration.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                {integration.name} Integration
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {integration.description}
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#A78BFA]" />
                  <span className="text-gray-300">
                    {integration.users} {text.hero.teachers}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#A78BFA]" />
                  <span className="text-gray-300">
                    {integration.setupTime} {text.hero.setup}
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                onClick={handleConnectClick}
              >
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
                  <h2 className="text-3xl font-bold mb-6">
                    {text.sections.benefits}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {integration.benefits.map((benefit, index) => (
                      <Card
                        key={index}
                        className="bg-[#1E293B] border-white/10 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    {text.sections.howItWorks}
                  </h2>
                  <div className="space-y-6">
                    {integration.setupSteps.map((step) => (
                      <Card
                        key={step.step}
                        className="bg-[#1E293B] border-white/10 p-6"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-[#A78BFA]/20 flex items-center justify-center">
                              <span className="text-[#A78BFA] font-bold">
                                {step.step}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">
                              {step.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                              {step.description}
                            </p>
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
                  <h2 className="text-3xl font-bold mb-4">
                    {text.sections.setupGuide}
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    {text.sections.setupIntro
                      .replace("{name}", integration.name)
                      .replace("{time}", integration.setupTime)}
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
                              <span className="text-white font-bold text-lg">
                                {step.step}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-4">
                              {step.title}
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                              {step.description}
                            </p>
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
                      <h3 className="text-xl font-semibold mb-2">
                        {text.sections.needHelp}
                      </h3>
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
                  <h2 className="text-3xl font-bold mb-4">
                    {text.sections.useCases}
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    {text.sections.useCasesDesc.replace(
                      "{name}",
                      integration.name,
                    )}
                  </p>
                </div>

                <div className="space-y-6">
                  {integration.useCases.map((useCase, index) => {
                    const Icon = useCase.icon;
                    return (
                      <Card
                        key={index}
                        className="bg-[#1E293B] border-white/10 p-8"
                      >
                        <div className="flex gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 rounded-lg bg-[#A78BFA]/20 flex items-center justify-center">
                              <Icon className="h-7 w-7 text-[#A78BFA]" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-3">
                              {useCase.title}
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                              {useCase.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <Card className="bg-gradient-to-r from-[#8B5CF6]/20 to-[#A78BFA]/20 border-[#A78BFA]/30 p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    {text.sections.ready}
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    {text.sections.readyDesc.replace(
                      "{name}",
                      integration.name,
                    )}
                  </p>
                  <Button
                    size="lg"
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                    onClick={handleConnectClick}
                  >
                    {text.sections.connectNow}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Card>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    {text.sections.faq}
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    {text.sections.faqDesc.replace("{name}", integration.name)}
                  </p>
                </div>

                <div className="space-y-4">
                  {integration.faqs.map((faq, index) => (
                    <Card
                      key={index}
                      className="bg-[#1E293B] border-white/10 p-6"
                    >
                      <h3 className="text-xl font-semibold mb-3 text-[#A78BFA]">
                        {faq.question}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </Card>
                  ))}
                </div>

                <Card className="bg-[#1E293B] border-white/10 p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    {text.sections.stillQuestions}
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    {text.sections.stillQuestionsDesc}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                      {text.sections.contactSupport}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/5 bg-transparent"
                    >
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
              <h3 className="text-xl font-bold mb-4">
                {text.sections.quickActions}
              </h3>
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
              <h3 className="text-xl font-bold mb-4">
                {text.sections.related}
              </h3>
              <div className="space-y-3">
                {integration.relatedIntegrations.map((related) => (
                  <Link
                    key={related.slug}
                    href={
                      isGerman
                        ? `/de/integrations/${related.slug}`
                        : `/integrations/${related.slug}`
                    }
                    className="block p-3 rounded-lg border border-white/10 hover:border-[#A78BFA]/50 hover:bg-white/5 transition-all"
                  >
                    <div className="font-semibold text-white mb-1">
                      {related.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {related.category}
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Support */}
            <Card className="bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/20 border-[#A78BFA]/30 p-6">
              <Shield className="h-8 w-8 text-[#A78BFA] mb-3" />
              <h3 className="text-lg font-bold mb-2">
                {text.sections.secureTitle}
              </h3>
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
