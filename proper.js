const fs = require('fs');
let lc = fs.readFileSync('./lib/i18n/language-context.tsx', 'utf8');

// Find translationsDe object
const deStart = lc.indexOf('const translationsDe: Record<string, string> = {');
const provStart = lc.indexOf('export function LanguageProvider');

// Between deStart and provStart, find the closing brace
const section = lc.substring(deStart, provStart);
const lastBrace = section.lastIndexOf('\n}');
const absoluteBracePos = deStart + lastBrace;

// Find the last comma before that brace
const beforeBrace = lc.substring(deStart, absoluteBracePos);
const lastComma = beforeBrace.lastIndexOf(',');
const absoluteCommaPos = deStart + lastComma;

const deInsert = `
  "glossary.title": "KI-Glossar für Lehrkräfte",
  "glossary.subtitle": "Über 150 KI-Begriffe in leicht verständlicher Sprache erklärt. Nach Kategorie oder alphabetisch suchen, um KI-Konzepte für den Bildungsbereich zu verstehen.",
  "integrations.title": "Verbinden Sie Ihre Lieblingstools",
  "integrations.subtitle": "Integrieren Sie Zaza Draft nahtlos in Ihren vorhandenen Stack.",`;

lc = lc.slice(0, absoluteCommaPos + 1) + deInsert + lc.slice(absoluteCommaPos + 1);
console.log('✅ DE added');

// Now do EN (before translationsDe)
const enEnd = lc.indexOf('\nconst translationsDe');
const enSection = lc.substring(0, enEnd);
const enLastComma = enSection.lastIndexOf(',');

const enInsert = `
  "glossary.title": "AI Glossary for Teachers",
  "glossary.subtitle": "150+ AI terms explained in teacher-friendly language. Search by category or alphabetically to understand AI concepts for education.",
  "integrations.title": "Connect Your Favorite Tools",
  "integrations.subtitle": "Seamlessly integrate Zaza Draft with your existing stack.",`;

lc = lc.slice(0, enLastComma + 1) + enInsert + lc.slice(enLastComma + 1);
console.log('✅ EN added');

fs.writeFileSync('./lib/i18n/language-context.tsx', lc, 'utf8');

['app/glossary/glossary-client.tsx', 'app/integrations/integrations-client.tsx'].forEach((f, i) => {
  if (!fs.existsSync(f)) return;
  const k = i === 0 ? 'glossary' : 'integrations';
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('useLanguage')) c = c.replace(/(import.*from ["']react["'])/, `$1\nimport { useLanguage } from "@/lib/i18n/language-context"`);
  if (!c.includes('const { t }')) c = c.replace(/(export default function \w+[^{]*\{)/, `$1\n  const { t } = useLanguage()`);
  c = c.replace(/(<h1[^>]*>)[^<{]+(Teachers|Tools)[^<]*(<\/h1>)/, `$1{t("${k}.title")}$3`);
  c = c.replace(/(<h1[\s\S]{0,300}<p[^>]*>)(?!{t\()[^<{]+(<\/p>)/, `$1{t("${k}.subtitle")}$2`);
  fs.writeFileSync(f, c, 'utf8');
  console.log(`✅ ${f}`);
});
console.log('🎉 Done!');