const fs = require("fs");

console.log("🔧 Fixing language-context.tsx properly...\n");

let lc = fs.readFileSync("./lib/i18n/language-context.tsx", "utf8");

// Find the END of translationsEn (before "}")
const enEnd = lc.indexOf("\n} as const\n\nconst translationsDe");
if (enEnd === -1) {
  console.error("❌ Could not find translationsEn end");
  process.exit(1);
}

const enKeys = `
  // Page translations
  "glossary.title": "AI Glossary for Teachers",
  "glossary.subtitle": "150+ AI terms explained in teacher-friendly language. Search by category or alphabetically to understand AI concepts for education.",
  "videos.title": "Video Tutorials & Demos",
  "videos.subtitle": "Watch step-by-step tutorials and product demos to master AI-powered parent communication.",
  "integrations.title": "Connect Your Favorite Tools",
  "integrations.subtitle": "Seamlessly integrate Zaza Draft with your existing stack.",
  "success.title": "See how teachers and schools transform communication with Zaza Draft",
  "success.subtitle": "Real stories from educators who saved hundreds of hours.",
  "compare.title": "Compare Zaza Draft with Other AI Tools",
  "compare.subtitle": "Honest, detailed comparisons to help you choose.",
  "roi.title": "Calculate Your Time Savings with Zaza Draft",
  "roi.subtitle": "See exactly how many hours and money Zaza Draft saves.",
  "bestAiWriting.title": "10 Best AI Writing Tools for Teachers in 2025",
  "bestAiWriting.subtitle": "Just launched in early access - feedback from real teachers is already coming in. Join 7 teachers shaping it right now.",
`;

// Insert before closing brace
lc = lc.slice(0, enEnd) + enKeys + lc.slice(enEnd);
console.log("✅ Added EN translations");

// Find the END of translationsDe
const deEnd = lc.indexOf("\n} as const\n\nexport function LanguageProvider");
if (deEnd === -1) {
  console.error("❌ Could not find translationsDe end");
  process.exit(1);
}

const deKeys = `
  // Page translations
  "glossary.title": "KI-Glossar für Lehrkräfte",
  "glossary.subtitle": "Über 150 KI-Begriffe in leicht verständlicher Sprache erklärt. Nach Kategorie oder alphabetisch suchen, um KI-Konzepte für den Bildungsbereich zu verstehen.",
  "videos.title": "Video-Tutorials und Demos",
  "videos.subtitle": "Schritt-für-Schritt-Anleitungen und Produktdemos für KI-gestützte Elternkommunikation.",
  "integrations.title": "Verbinden Sie Ihre Lieblingstools",
  "integrations.subtitle": "Integrieren Sie Zaza Draft nahtlos in Ihren vorhandenen Stack.",
  "success.title": "So transformieren Lehrkräfte und Schulen ihre Kommunikation mit Zaza Draft",
  "success.subtitle": "Echte Erfahrungsberichte von Lehrkräften, die Hunderte Stunden gespart haben.",
  "compare.title": "Zaza Draft mit anderen KI-Tools vergleichen",
  "compare.subtitle": "Ehrliche, detaillierte Vergleiche zur Entscheidungsfindung.",
  "roi.title": "Ihre Zeitersparnis mit Zaza Draft berechnen",
  "roi.subtitle": "Sehen Sie genau, wie viele Stunden und Kosten Sie sparen.",
  "bestAiWriting.title": "Die 10 besten KI-Schreibtools für Lehrkräfte 2025",
  "bestAiWriting.subtitle": "Gerade im Early Access gestartet - echtes Feedback von Lehrkräften kommt bereits rein. Machen Sie mit: 7 Lehrkräfte gestalten es gerade mit.",
`;

// Insert before closing brace
lc = lc.slice(0, deEnd) + deKeys + lc.slice(deEnd);
console.log("✅ Added DE translations");

fs.writeFileSync("./lib/i18n/language-context.tsx", lc, "utf8");
console.log("\n🎉 Translation keys added successfully!");
