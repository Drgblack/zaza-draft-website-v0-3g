const fs = require('fs');
console.log('🔧 Adding translations...\n');
const lcPath = './lib/i18n/language-context.tsx';
fs.copyFileSync(lcPath, `${lcPath}.backup-${Date.now()}`);
let lc = fs.readFileSync(lcPath, 'utf8');

const enEndPattern = '\n}\nconst translationsDe: Record<string, string> = {';
const enEndIndex = lc.indexOf(enEndPattern);
if (enEndIndex === -1) { console.error('❌ Failed'); process.exit(1); }

const enKeys = `,
  "glossary.title": "AI Glossary for Teachers",
  "glossary.subtitle": "150+ AI terms explained in teacher-friendly language. Search by category or alphabetically to understand AI concepts for education.",
  "integrations.title": "Connect Your Favorite Tools",
  "integrations.subtitle": "Seamlessly integrate Zaza Draft with your existing stack."`;

lc = lc.slice(0, enEndIndex) + enKeys + lc.slice(enEndIndex);
console.log('✅ EN added');

const deEnd = lc.lastIndexOf('\n}\nexport function LanguageProvider');
const deKeys = `,
  "glossary.title": "KI-Glossar für Lehrkräfte",
  "glossary.subtitle": "Über 150 KI-Begriffe in leicht verständlicher Sprache erklärt. Nach Kategorie oder alphabetisch suchen, um KI-Konzepte für den Bildungsbereich zu verstehen.",
  "integrations.title": "Verbinden Sie Ihre Lieblingstools",
  "integrations.subtitle": "Integrieren Sie Zaza Draft nahtlos in Ihren vorhandenen Stack."`;

lc = lc.slice(0, deEnd) + deKeys + lc.slice(deEnd);
console.log('✅ DE added');
fs.writeFileSync(lcPath, lc, 'utf8');

['app/glossary/glossary-client.tsx', 'app/integrations/integrations-client.tsx'].forEach((f, i) => {
  if (!fs.existsSync(f)) return;
  const k = i === 0 ? 'glossary' : 'integrations';
  fs.copyFileSync(f, `${f}.backup-${Date.now()}`);
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('useLanguage')) c = c.replace(/(import.*from\s+["']react["'])/, `$1\nimport { useLanguage } from "@/lib/i18n/language-context"`);
  if (!c.includes('const { t }')) c = c.replace(/(export default function \w+[^{]*\{)/, `$1\n  const { t } = useLanguage()`);
  c = c.replace(/(<h1[^>]*>)[^<{]+(Teachers|Tools)[^<]*(<\/h1>)/, `$1{t("${k}.title")}$3`);
  c = c.replace(/(<h1[\s\S]{0,200}<p[^>]*>)(?!{t\(")[^<{]+(<\/p>)/, `$1{t("${k}.subtitle")}$2`);
  fs.writeFileSync(f, c, 'utf8');
  console.log(`✅ ${f}`);
});
console.log('\n🎉 Done!');