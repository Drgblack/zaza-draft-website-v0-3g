const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2];
const REPORT = process.argv[3];

function walk(dir, files=[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

function readUtf8(p) { return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : ""; }

function flatten(obj, prefix="", out=[]) {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
      else out.push(key);
    }
  }
  return out;
}

function loadJson(p) {
  try { return JSON.parse(readUtf8(p) || "{}"); } catch { return {}; }
}

function writeCsv(p, rows, headers) {
  const esc = v => `"${String(v).replace(/"/g,'""')}"`;
  const lines = [headers.join(",")].concat(rows.map(r => headers.map(h => esc(r[h] ?? "")).join(",")));
  fs.writeFileSync(p, lines.join("\n"), "utf8");
}

// 1) Locale key diff (EN vs DE)
const enDir = path.join(ROOT, "locales", "en");
const deDir = path.join(ROOT, "locales", "de");
const enFiles = fs.existsSync(enDir) ? walk(enDir).filter(f => f.endsWith(".json")) : [];
const deFiles = fs.existsSync(deDir) ? walk(deDir).filter(f => f.endsWith(".json")) : [];

const enMap = new Map(), deMap = new Map();
for (const f of enFiles) {
  const ns = path.basename(f, ".json");
  enMap.set(ns, Array.from(new Set(flatten(loadJson(f)).sort())));
}
for (const f of deFiles) {
  const ns = path.basename(f, ".json");
  deMap.set(ns, Array.from(new Set(flatten(loadJson(f)).sort())));
}

const nsSet = new Set([...enMap.keys(), ...deMap.keys()]);
const keyDiff = [];
for (const ns of nsSet) {
  const en = enMap.get(ns) || [];
  const de = deMap.get(ns) || [];
  const enSet = new Set(en), deSet = new Set(de);
  for (const k of en) if (!deSet.has(k)) keyDiff.push({ Namespace: ns, Key: k, Status: "MISSING_IN_DE" });
  for (const k of de) if (!enSet.has(k)) keyDiff.push({ Namespace: ns, Key: k, Status: "EXTRA_IN_DE" });
}

// 2) Keys used in code (t("...")) but missing in locales
const appFiles = walk(path.join(ROOT, "app")).filter(f => /\.(tsx?|mdx)$/.test(f));
const usedKeys = new Set();
const tRegex = /t\(\s*['"]([^'"]+)['"]\s*\)/g;
for (const f of appFiles) {
  const text = readUtf8(f);
  let m; while ((m = tRegex.exec(text))) usedKeys.add(m[1]);
}
const allLocaleKeys = new Set();
for (const arr of enMap.values()) arr.forEach(k => allLocaleKeys.add(k));
for (const arr of deMap.values()) arr.forEach(k => allLocaleKeys.add(k));
for (const k of usedKeys) if (!allLocaleKeys.has(k)) keyDiff.push({ Namespace: "(unknown)", Key: k, Status: "USED_IN_CODE_BUT_MISSING" });

// 3) Hunt obvious English literals on marketing pages
const needles = [
  "Browse Courses","Get Certified","What Teachers Are Saying","Downloadable Resource Library",
  "Continue Your AI Journey","Featured Videos","Curated Playlists","All Videos",
  "Trending Discussions","Discussion Categories","Community Guidelines",
  "Create Free Account","Explore","Learn more","Get started"
];
const literalHits = [];
for (const f of appFiles) {
  const txt = readUtf8(f);
  for (const n of needles) {
    const idx = txt.indexOf(n);
    if (idx !== -1) {
      const line = txt.slice(0, idx).split(/\r?\n/).length;
      literalHits.push({ File: path.relative(ROOT, f), Line: line, Match: n });
    }
  }
}

// 4) Check /de/ route layouts for lang and provider hints
const deDirApp = path.join(ROOT, "app", "de");
const deLayouts = fs.existsSync(deDirApp) ? walk(deDirApp).filter(f => /layout\.(t|j)sx?$/.test(f)) : [];
const langRows = [];
for (const f of deLayouts) {
  const t = readUtf8(f);
  langRows.push({
    File: path.relative(ROOT, f),
    LangDe: /lang\s*=\s*["']de["']/.test(t) ? "yes" : "no",
    LangEn: /lang\s*=\s*["']en["']/.test(t) ? "yes" : "no",
    HasLanguageProvider: /(LanguageProvider|set-language|SetLanguage)/.test(t) ? "yes" : "no"
  });
}

// 5) Write reports + console summary
const diffCsv = path.join(REPORT, "locale-key-diff.csv");
writeCsv(diffCsv, keyDiff, ["Namespace","Key","Status"]);
const litCsv = path.join(REPORT, "english-literals.csv");
writeCsv(litCsv, literalHits, ["File","Line","Match"]);
const langCsv = path.join(REPORT, "de-route-lang-check.csv");
writeCsv(langCsv, langRows, ["File","LangDe","LangEn","HasLanguageProvider"]);

console.log("=== i18n Audit Summary ===");
console.log("Report folder:", REPORT);
console.log("Missing DE keys:", keyDiff.filter(r => r.Status === "MISSING_IN_DE").length);
console.log("Extra DE keys:  ", keyDiff.filter(r => r.Status === "EXTRA_IN_DE").length);
console.log("Used-but-missing keys:", keyDiff.filter(r => r.Status === "USED_IN_CODE_BUT_MISSING").length);
console.log("English literals found:", literalHits.length);
console.log("DE route layouts checked:", langRows.length);