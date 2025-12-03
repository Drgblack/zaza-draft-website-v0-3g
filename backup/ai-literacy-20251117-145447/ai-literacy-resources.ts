// AI Literacy Resources Data
// Save this as: lib/data/ai-literacy-resources.ts

export interface AILiteracyResource {
  slug: string;
  title: string;
  titleDe: string;
  description: string;
  descriptionDe: string;
  category: "templates" | "guides";
  downloads: string;
  downloadUrl?: string;
  fileType?: "pdf" | "docx" | "xlsx";
  preview?: string;
  features?: string[];
  featuresDe?: string[];
}

export const aiLiteracyResources: AILiteracyResource[] = [
  // TEMPLATES
  {
    slug: "parent-email-templates",
    title: "Parent Email Templates",
    titleDe: "Eltern-E-Mail-Vorlagen",
    description:
      "Ready-to-use email templates for communicating with parents about AI in the classroom",
    descriptionDe:
      "Sofort einsatzbereite E-Mail-Vorlagen fÃ¼r die Kommunikation mit Eltern Ã¼ber KI im Klassenzimmer",
    category: "templates",
    downloads: "15,230",
    downloadUrl: "/downloads/parent-email-templates.docx",

    fileType: "pdf",
    features: [
      "Introduction to AI letter",
      "Progress update templates",
      "Parent-teacher conference guides",
      "AI policy explanation",
      "Opt-in/opt-out forms",
    ],
    featuresDe: [
      "EinfÃ¼hrungsbrief zu KI",
      "Fortschrittsupdate-Vorlagen",
      "Elternsprechtag-LeitfÃ¤den",
      "KI-RichtlinienerklÃ¤rung",
      "Einwilligungs-/Ablehnungsformulare",
    ],
  },
  {
    slug: "lesson-plan-templates",
    title: "Lesson Plan Templates",
    titleDe: "Unterrichtsplan-Vorlagen",
    description:
      "AI-enhanced lesson planning templates for all grade levels and subjects",
    descriptionDe:
      "KI-erweiterte Unterrichtsplanungsvorlagen fÃ¼r alle Klassenstufen und FÃ¤cher",
    category: "templates",
    downloads: "12,450",
    downloadUrl: "/downloads/lesson-plan-templates.docx",
    fileType: "docx",
    features: [
      "Differentiated instruction templates",
      "Project-based learning plans",
      "Assessment integration",
      "AI tool recommendations",
      "Learning objective alignments",
    ],
    featuresDe: [
      "Differenzierte Unterrichtsvorlagen",
      "Projektbasierte LernplÃ¤ne",
      "Bewertungsintegration",
      "KI-Tool-Empfehlungen",
      "Lernziel-Ausrichtungen",
    ],
  },
  {
    slug: "report-card-comment-bank",
    title: "Report Card Comment Bank",
    titleDe: "Zeugniskommentar-Bank",
    description:
      "Comprehensive library of personalized report card comments generated with AI assistance",
    descriptionDe:
      "Umfassende Bibliothek personalisierter Zeugniskommentare, erstellt mit KI-UnterstÃ¼tzung",
    category: "templates",
    downloads: "18,920",
    downloadUrl: "/downloads/report-card-comments.xlsx",
    fileType: "xlsx",
    features: [
      "500+ comment templates",
      "Organized by subject and skill",
      "Positive and constructive options",
      "Grade-level appropriate language",
      "Customization guidance",
    ],
    featuresDe: [
      "500+ Kommentarvorlagen",
      "Nach Fach und Kompetenz organisiert",
      "Positive und konstruktive Optionen",
      "Altersgerechte Sprache",
      "Anpassungsanleitungen",
    ],
  },
  {
    slug: "iep-goal-templates",
    title: "IEP Goal Templates",
    titleDe: "IEP-Ziel-Vorlagen",
    description:
      "SMART goal templates for individualized education programs with AI support suggestions",
    descriptionDe:
      "SMART-Zielvorlagen fÃ¼r individuelle FÃ¶rderplÃ¤ne mit KI-UnterstÃ¼tzungsvorschlÃ¤gen",
    category: "templates",
    downloads: "9,340",
    downloadUrl: "/downloads/iep-goal-templates.docx",
    fileType: "docx",
    features: [
      "SMART goal framework",
      "Measurable objectives",
      "Accommodation suggestions",
      "Progress monitoring tools",
      "AI implementation ideas",
    ],
    featuresDe: [
      "SMART-Ziel-Framework",
      "Messbare Ziele",
      "AnpassungsvorschlÃ¤ge",
      "Fortschrittskontrolltools",
      "KI-Implementierungsideen",
    ],
  },

  // GUIDES
  {
    slug: "getting-started-with-ai-guide",
    title: "Getting Started with AI Guide",
    titleDe: "Erste Schritte mit KI-Leitfaden",
    description:
      "Comprehensive beginner's guide to implementing AI tools in your classroom",
    descriptionDe:
      "Umfassender Einsteigerleitfaden zur Implementierung von KI-Tools in Ihrem Klassenzimmer",
    category: "guides",
    downloads: "14,560",
    downloadUrl: "/downloads/getting-started-ai.pdf",
    fileType: "pdf",
    features: [
      "AI basics for educators",
      "Tool selection criteria",
      "Implementation timeline",
      "Common pitfalls to avoid",
      "Quick win strategies",
    ],
    featuresDe: [
      "KI-Grundlagen fÃ¼r LehrkrÃ¤fte",
      "Tool-Auswahlkriterien",
      "Implementierungszeitplan",
      "HÃ¤ufige Fehler vermeiden",
      "Schnelle Erfolgsstrategien",
    ],
  },
  {
    slug: "ai-tool-evaluation-checklist",
    title: "AI Tool Evaluation Checklist",
    titleDe: "KI-Tool-Bewertungscheckliste",
    description:
      "Systematic checklist for evaluating AI tools for educational use",
    descriptionDe:
      "Systematische Checkliste zur Bewertung von KI-Tools fÃ¼r den Bildungsbereich",
    category: "guides",
    downloads: "8,760",
    downloadUrl: "/downloads/ai-tool-evaluation.pdf",
    fileType: "pdf",
    features: [
      "Privacy and security criteria",
      "Pedagogical effectiveness",
      "Ease of implementation",
      "Cost-benefit analysis",
      "Student engagement factors",
    ],
    featuresDe: [
      "Datenschutz- und Sicherheitskriterien",
      "PÃ¤dagogische Wirksamkeit",
      "Einfache Implementierung",
      "Kosten-Nutzen-Analyse",
      "SchÃ¼lerengagement-Faktoren",
    ],
  },
  {
    slug: "ai-ethics-framework",
    title: "AI Ethics Framework",
    titleDe: "KI-Ethik-Rahmenwerk",
    description: "Ethical guidelines for responsible AI use in education",
    descriptionDe:
      "Ethische Richtlinien fÃ¼r verantwortungsvollen KI-Einsatz in der Bildung",
    category: "guides",
    downloads: "6,920",
    downloadUrl: "/downloads/ai-ethics-framework.pdf",
    fileType: "pdf",
    features: [
      "Ethical principles",
      "Bias identification",
      "Student privacy protection",
      "Transparency guidelines",
      "Decision-making frameworks",
    ],
    featuresDe: [
      "Ethische Prinzipien",
      "Bias-Identifizierung",
      "SchÃ¼lerdatenschutz",
      "Transparenzrichtlinien",
      "Entscheidungsfindungs-Frameworks",
    ],
  },
];

// Helper function to get resource by slug
export function getResourceBySlug(
  slug: string,
): AILiteracyResource | undefined {
  return aiLiteracyResources.find((r) => r.slug === slug);
}

// Helper function to get all resources by category
export function getResourcesByCategory(
  category: "templates" | "guides",
): AILiteracyResource[] {
  return aiLiteracyResources.filter((r) => r.category === category);
}

// Helper function to get all resource slugs (for static generation)
export function getAllResourceSlugs(): string[] {
  return aiLiteracyResources.map((r) => r.slug);
}

