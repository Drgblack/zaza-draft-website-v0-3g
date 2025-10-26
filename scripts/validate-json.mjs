import fs from "node:fs";
import path from "node:path";

function walk(dir, acc=[]) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.isFile() && p.endsWith(".json")) acc.push(p);
  }
  return acc;
}

const jsonFiles = walk(process.cwd());
let bad = [];

for (const p of jsonFiles) {
  const buf = fs.readFileSync(p);
  if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
    bad.push(`${p}: has UTF-8 BOM`);
    continue;
  }
  const txt = buf.toString("utf8");
  try {
    JSON.parse(txt);
  } catch (e) {
    bad.push(`${p}: invalid JSON -> ${e.message}`);
  }
}

if (bad.length) {
  console.error("JSON validation failed:\n" + bad.map(s => "- " + s).join("\n"));
  process.exit(1);
}
console.log(`Validated ${jsonFiles.length} JSON file(s).`);
