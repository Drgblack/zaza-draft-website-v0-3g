const fs = require('fs');

console.log('🔧 Adding i18n translations...\n');

const lcPath = './lib/i18n/language-context.tsx';
fs.copyFileSync(lcPath, `${lcPath}.backup-${Date.now()}`);

let lc = fs.readFileSync(lcPath, 'utf8');

// Find where translationsDe starts
const deStart = lc.indexOf('\nconst translationsDe: Record<string, string> = {');
if (deStart === -1) {
  console.error('❌ Could not find translationsDe');
  process.exit(1);
}

// Insert EN keys before translationsDe
const enKeys = `
  "glossary.title": "AI Glossary for Teachers",
  "glossary.subtitle": "150+ AI terms explained in teacher-friendly language. Search by category or alphabetically to understand AI concepts for education.",
  "videos.title": "Video Tutorials & Demos",
  "videos.subtitle": "Watch step-by-step tutorials and product demos to master AI-powered parent communication.",
  "integrations.title": "Connect Your Favorite Tools",
  "integrations.subtitle": "Seamlessly integrate Zaza Draft with your existing stack.",
`;

lc = lc.slice(0, deStart) + enKeys + lc.slice(deStart);
console.log('✅ Added EN keys');

// Find where LanguageProvider starts (after translationsDe)
const providerStart = lc.indexOf('\nexport function LanguageProvider');
if (providerStart === -1) {
  console.error('❌ Could not find LanguageProvider');
  process.exit(1);
}

// Find the last closing brace before LanguageProvider
const lastBrace = lc.lastIndexOf('}', providerStart);
if (lastBrace === -1) {
  console.error('❌ Could not find translationsDe end');
  process.exit(1);
}

// Insert DE keys before the closing brace
const deKeys = `
  "glossary.title": "KI-Glossar für Lehrkräfte",
  "glossary.subtitle": "Über 150 KI-Begriffe in leicht verständlicher Sprache erklärt. Nach Kategorie oder alphabetisch suchen, um KI-Konzepte für den Bildungsbereich zu verstehen.",
  "videos.title": "Video-Tutorials und Demos",
  "videos.subtitle": "Schritt-für-Schritt-Anleitungen und Produktdemos für KI-gestützte Elternkommunikation.",
  "integrations.title": "Verbinden Sie Ihre Lieblingstools",
  "integrations.subtitle": "Integrieren Sie Zaza Draft nahtlos in Ihren vorhandenen Stack.",
`;

lc = lc.slice(0, lastBrace) + deKeys + lc.slice(lastBrace);
console.log('✅ Added DE keys');

fs.writeFileSync(lcPath, lc, 'utf8');
console.log('\n✅ Translation keys added!\n');

// Wire up components
const components = [
  { file: 'app/glossary/glossary-client.tsx', key: 'glossary' },
  { file: 'app/integrations/integrations-client.tsx', key: 'integrations' }
];

components.forEach(({ file, key }) => {
  if (!fs.existsSync(file)) return;
  
  fs.copyFileSync(file, `${file}.backup-${Date.now()}`);
  let c = fs.readFileSync(file, 'utf8');
  
  if (!c.includes('useLanguage')) {
    c = c.replace(/(import.*from\s+["']react["'])/, `$1\nimport { useLanguage } from "@/lib/i18n/language-context"`);
  }
  
  if (!c.includes('const { t }')) {
    c = c.replace(/(export default function \w+[^{]*\{)/, `$1\n  const { t } = useLanguage()`);
  }
  
  c = c.replace(/(<h1[^>]*>)[^<{]+(Teachers|Tools)[^<]*(<\/h1>)/, `$1{t("${key}.title")}$3`);
  c = c.replace(/(<h1[\s\S]{0,200}<p[^>]*>)(?!{t\(")[^<{]+(<\/p>)/, `$1{t("${key}.subtitle")}$2`);
  
  fs.writeFileSync(file, c, 'utf8');
  console.log(`✅ Fixed ${file}`);
});

console.log('\n🎉 Done! Run: npm run build');