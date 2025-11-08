const fs = require("fs"), path = require("path");

const ROOT = process.cwd();
const GLOB_DIRS = ["app"]; // scan UI code
const ALLOW = [
  "Zaza Draft","AI-Ready Teacher","AI-Confident Educator","AI Education Leader",
  "Zaza Teach","Zaza Technologies","Zaza Shield"
];

const NEEDLES = [
  "Browse Courses","Get Certified","What Teachers Are Saying",
  "Downloadable Resource Library","Continue Your AI Journey",
  "Featured Videos","Curated Playlists","All Videos",
  "Trending Discussions","Discussion Categories","Community Guidelines",
  "Create Free Account","Explore","Learn more","Get started"
];

function walk(dir, out=[]) {
  if (!fs.existsSync(dir)) return out;
  for (const d of fs.readdirSync(dir, {withFileTypes:true})) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) walk(p,out);
    else if (/\.(tsx?|mdx)$/.test(p)) out.push(p);
  } return out;
}

function isAllowed(line) { return ALLOW.some(a => line.includes(a)); }

const files = GLOB_DIRS.flatMap(d => walk(path.join(ROOT,d)));
const hits = [];

for (const f of files) {
  const txt = fs.readFileSync(f,"utf8");
  for (const n of NEEDLES) {
    let idx = txt.indexOf(n);
    while (idx !== -1) {
      const before = txt.slice(0, idx);
      const lineNo = before.split(/\r?\n/).length;
      const line = txt.split(/\r?\n/)[lineNo-1].trim();
      if (!isAllowed(line)) hits.push({file:f, line:lineNo, match:n, snippet:line});
      idx = txt.indexOf(n, idx+1);
    }
  }
}

if (hits.length) {
  console.error("Found hard-coded English literals:");
  for (const h of hits) {
    console.error(`- ${h.match} @ ${h.file}:${h.line}`);
    console.error(`  ${h.snippet}`);
  }
  process.exit(1);
} else {
  console.log("No banned English literals found.");
}