content = '''const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SCAN_ROOTS = (process.env.LITERAL_PATHS || "app/de").split(",").map(s => s.trim());
const ALLOW = new RegExp(process.env.LITERAL_ALLOW || [
  "Zaza(?:\\\\s+Draft|\\\\s+Teach|\\\\s+Technologies)?",
  "AI(?:\\\\b|-)", "LLM\\\\b", "GPT\\\\b", "FERPA\\\\b", "PII\\\\b",
  "AI-Ready Teacher", "AI-Confident Educator", "AI Education Leader"
].join("|"));

const NEEDLES = [
  "Browse Courses", "Get Certified", "What Teachers Are Saying", "Downloadable Resource Library",
  "Continue Your AI Journey", "Featured Videos", "Curated Playlists", "All Videos",
  "Trending Discussions", "Discussion Categories", "Community Guidelines",
  "Create Free Account", "Explore", "Learn more", "Get started",
  "Master AI for Education"
];

const exts = /\\.(tsx?|mdx)$/i;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (exts.test(p)) out.push(p);
  }
  return out;
}

const files = SCAN_ROOTS.flatMap(r => walk(path.join(ROOT, r)));

const hits = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const needle of NEEDLES) {
    if (ALLOW.test(needle)) continue;
    if (text.includes(needle)) {
      const line = text.slice(0, text.indexOf(needle)).split(/\\r?\\n/).length;
      hits.push({ file: path.relative(ROOT, file), line, match: needle });
    }
  }
}

if (hits.length) {
  console.error("\\n❌ Hard-coded English literals detected:\\n");
  for (const h of hits) {
    console.error(` - ${h.file}:${h.line}  →  "${h.match}"`);
  }
  console.error("\\nFix: move these strings into locales and use t(\\'...\\').");
  process.exit(1);
} else {
  console.log("✅ No disallowed English literals found.");
}
'''

with open('scripts/check-literals.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("✅ Written without BOM")
