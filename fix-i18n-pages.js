const fs = require('fs');
const path = require('path');

console.log('🔧 Starting i18n fix for German pages...\n');

// 1. Add translation keys to language-context.tsx
const lcPath = './lib/i18n/language-context.tsx';
const lcBackup = `./lib/i18n/language-context.backup-${Date.now()}.tsx`;

console.log('📦 Backing up language-context.tsx...');
fs.copyFileSync(lcPath, lcBackup);

let lc = fs.readFileSync(lcPath, 'utf8');

// Define translation keys for all pages
const translations = {
  glossary: {
    en: { title: 'AI Glossary for Teachers', subtitle: '150+ AI terms explained in teacher-friendly language. Search by category or alphabetically to understand AI concepts for education.' },
    de: { title: 'KI-Glossar für Lehrkräfte', subtitle: 'Über 150 KI-Begriffe in leicht verständlicher Sprache erklärt. Nach Kategorie oder alphabetisch suchen, um KI-Konzepte für den Bildungsbereich zu verstehen.' }
  },
  videos: {
    en: { title: 'Video Tutorials & Demos', subtitle: 'Watch step-by-step tutorials and product demos to master AI-powered parent communication.' },
    de: { title: 'Video-Tutorials und Demos', subtitle: 'Schritt-für-Schritt-Anleitungen und Produktdemos für KI-gestützte Elternkommunikation.' }
  },
  integrations: {
    en: { title: 'Connect Your Favorite Tools', subtitle: 'Seamlessly integrate Zaza Draft with your existing stack.' },
    de: { title: 'Verbinden Sie Ihre Lieblingstools', subtitle: 'Integrieren Sie Zaza Draft nahtlos in Ihren vorhandenen Stack.' }
  },
  success: {
    en: { title: 'See how teachers and schools transform communication with Zaza Draft', subtitle: 'Real stories from educators who saved hundreds of hours.' },
    de: { title: 'So transformieren Lehrkräfte und Schulen ihre Kommunikation mit Zaza Draft', subtitle: 'Echte Erfahrungsberichte von Lehrkräften, die Hunderte Stunden gespart haben.' }
  },
  compare: {
    en: { title: 'Compare Zaza Draft with Other AI Tools', subtitle: 'Honest, detailed comparisons to help you choose.' },
    de: { title: 'Zaza Draft mit anderen KI-Tools vergleichen', subtitle: 'Ehrliche, detaillierte Vergleiche zur Entscheidungsfindung.' }
  },
  roi: {
    en: { title: 'Calculate Your Time Savings with Zaza Draft', subtitle: 'See exactly how many hours and money Zaza Draft saves.' },
    de: { title: 'Ihre Zeitersparnis mit Zaza Draft berechnen', subtitle: 'Sehen Sie genau, wie viele Stunden und Kosten Sie sparen.' }
  },
  bestAiWriting: {
    en: { title: '10 Best AI Writing Tools for Teachers in 2025', subtitle: 'Tested by educators. Compare features, pricing, and results.' },
    de: { title: 'Die 10 besten KI-Schreibtools für Lehrkräfte 2025', subtitle: 'Von Lehrkräften getestet. Funktionen, Preise und Ergebnisse vergleichen.' }
  }
};

// Add keys to EN section
Object.entries(translations).forEach(([key, val]) => {
  if (!lc.includes(`"${key}.title"`)) {
    // Find EN object and add before the closing brace
    const enMatch = lc.match(/(const translationsEn[^=]*=\s*\{[\s\S]*?)(\n\s*}\s*const translationsDe)/);
    if (enMatch) {
      const insertion = `\n  // ${key.charAt(0).toUpperCase() + key.slice(1)} page\n  "${key}.title": "${val.en.title}",\n  "${key}.subtitle": "${val.en.subtitle}",`;
      lc = lc.replace(enMatch[0], enMatch[1] + insertion + enMatch[2]);
      console.log(`✅ Added EN keys for ${key}`);
    }
  }
});

// Add keys to DE section
Object.entries(translations).forEach(([key, val]) => {
  if (!lc.includes(`"${key}.title"`) || !lc.match(new RegExp(`const translationsDe[\\s\\S]*"${key}\\.title"`))) {
    // Find DE object and add before the closing brace
    const deMatch = lc.match(/(const translationsDe[^=]*=\s*\{[\s\S]*?)(\n\s*}\s*(?:export|$))/);
    if (deMatch) {
      const insertion = `\n  // ${key.charAt(0).toUpperCase() + key.slice(1)} page\n  "${key}.title": "${val.de.title}",\n  "${key}.subtitle": "${val.de.subtitle}",`;
      lc = lc.replace(deMatch[0], deMatch[1] + insertion + deMatch[2]);
      console.log(`✅ Added DE keys for ${key}`);
    }
  }
});

fs.writeFileSync(lcPath, lc, 'utf8');
console.log('\n✅ Translation keys added to language-context.tsx\n');

// 2. Wire up client components
const componentsToFix = [
  { file: 'app/glossary/glossary-client.tsx', key: 'glossary', oldTitle: 'AI Glossary for Teachers' },
  { file: 'app/videos/videos-client.tsx', key: 'videos', oldTitle: 'Video Tutorials & Demos' },
  { file: 'app/integrations/integrations-client.tsx', key: 'integrations', oldTitle: 'Connect Your Favorite Tools' },
  { file: 'app/success-stories/success-client.tsx', key: 'success', oldTitle: 'See how teachers and schools transform' },
  { file: 'app/compare/compare-client.tsx', key: 'compare', oldTitle: 'Compare Zaza Draft' },
  { file: 'app/roi-calculator/roi-client.tsx', key: 'roi', oldTitle: 'Calculate Your Time Savings' },
];

componentsToFix.forEach(({ file, key, oldTitle }) => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  ${file} not found, skipping`);
    return;
  }

  const backup = file.replace('.tsx', `.backup-${Date.now()}.tsx`);
  fs.copyFileSync(file, backup);

  let content = fs.readFileSync(file, 'utf8');

  // Add import if missing
  if (!content.includes('useI18n')) {
    content = content.replace(
      /^(import.*from\s+["']react["'])/m,
      `$1\nimport { useI18n } from "@/lib/i18n/language-context"`
    );
  }

  // Add hook call in component
  if (!content.includes('const { t }')) {
    content = content.replace(
      /(export default function \w+[^{]*\{)/,
      `$1\n  const { t } = useI18n()`
    );
  }

  // Replace title in h1
  content = content.replace(
    new RegExp(`>${oldTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*</h1>`, 'g'),
    `>{t("${key}.title")}</h1>`
  );

  // Replace subtitle - find p tag after h1
  content = content.replace(
    /(<h1[^>]*>.*?<\/h1>[\s\S]*?<p[^>]*>)([^<]+)(<\/p>)/,
    `$1{t("${key}.subtitle")}$3`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Fixed ${file}`);
});

console.log('\n🎉 All pages wired to i18n!');
console.log('\nNext steps:');
console.log('1. Run: npm run build');
console.log('2. Test /de/glossary, /de/videos, etc.');
console.log('3. If working, commit and deploy!');