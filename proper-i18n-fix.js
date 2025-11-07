const fs = require('fs');

console.log('🔧 Adding i18n translations properly...\n');

// 1. ADD TRANSLATION KEYS
const lcPath = './lib/i18n/language-context.tsx';
fs.copyFileSync(lcPath, `${lcPath}.backup-${Date.now()}`);

let lc = fs.readFileSync(lcPath, 'utf8');

// Define all page translations
const pages = {
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
  }
};

// Add to EN section (find last comma before "} as const")
const enEnd = lc.lastIndexOf(',\n} as const\n\nconst translationsDe');
if (enEnd > -1) {
  let enKeys = '';
  Object.entries(pages).forEach(([key, val]) => {
    enKeys += `,\n  "${key}.title": "${val.en.title}",\n  "${key}.subtitle": "${val.en.subtitle}"`;
  });
  lc = lc.slice(0, enEnd + 1) + enKeys + lc.slice(enEnd + 1);
  console.log('✅ Added EN translation keys');
} else {
  console.error('❌ Could not find EN insertion point');
  process.exit(1);
}

// Add to DE section
const deEnd = lc.lastIndexOf(',\n} as const\n\nexport function LanguageProvider');
if (deEnd > -1) {
  let deKeys = '';
  Object.entries(pages).forEach(([key, val]) => {
    deKeys += `,\n  "${key}.title": "${val.de.title}",\n  "${key}.subtitle": "${val.de.subtitle}"`;
  });
  lc = lc.slice(0, deEnd + 1) + deKeys + lc.slice(deEnd + 1);
  console.log('✅ Added DE translation keys');
} else {
  console.error('❌ Could not find DE insertion point');
  process.exit(1);
}

fs.writeFileSync(lcPath, lc, 'utf8');
console.log('\n✅ Translation keys added to language-context.tsx\n');

// 2. WIRE UP CLIENT COMPONENTS
const components = [
  { file: 'app/glossary/glossary-client.tsx', key: 'glossary' },
  { file: 'app/integrations/integrations-client.tsx', key: 'integrations' }
];

components.forEach(({ file, key }) => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  ${file} not found`);
    return;
  }

  fs.copyFileSync(file, `${file}.backup-${Date.now()}`);
  let content = fs.readFileSync(file, 'utf8');

  // Add import
  if (!content.includes('useLanguage')) {
    content = content.replace(
      /(import.*from\s+["']react["'])/,
      `$1\nimport { useLanguage } from "@/lib/i18n/language-context"`
    );
  }

  // Add hook call
  if (!content.includes('const { t }')) {
    content = content.replace(
      /(export default function \w+[^{]*\{)/,
      `$1\n  const { t } = useLanguage()`
    );
  }

  // Replace hardcoded h1 title
  content = content.replace(
    /(<h1[^>]*>)[^<{]+(Teachers|Tools)[^<]*(<\/h1>)/,
    `$1{t("${key}.title")}$3`
  );

  // Replace hardcoded subtitle in first <p> after h1
  content = content.replace(
    /(<h1[\s\S]{0,200}<p[^>]*>)(?!{t\(")[^<{]+(<\/p>)/,
    `$1{t("${key}.subtitle")}$2`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Wired up ${file}`);
});

console.log('\n🎉 All done! Test with: npm run build');