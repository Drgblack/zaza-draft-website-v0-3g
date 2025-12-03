import fs from "node:fs";
import path from "node:path";

function extractPosts(tsText: string){
  const arrMatch = tsText.match(/blogPosts\s*=\s*\[\s*([\s\S]*?)\s*\];?/);
  if(!arrMatch) return [];
  const body = arrMatch[1];
  const chunks = body.split(/},\s*\n\s*{/).map((chunk, i, a) => {
    if(i===0 && !chunk.trim().startsWith("{")) chunk = "{"+chunk;
    if(i===a.length-1 && !chunk.trim().endsWith("}")) chunk = chunk+"}";
    return chunk;
  });
  const posts:any[] = [];
  for(const raw of chunks){
    const slug = raw.match(/slug:\s*"([^"]+)"/)?.[1];
    const title = raw.match(/title:\s*"([^"]+)"/)?.[1] ?? "";
    const id = raw.match(/id:\s*(\d+)/)?.[1] ?? "";
    const content = raw.match(/content:\s*String\.raw`([\s\S]*?)`,/)?.[1] ?? "";
    const contentDe = raw.match(/contentDe:\s*String\.raw`([\s\S]*?)`,/)?.[1] ?? "";
    if(slug){ posts.push({ slug, id, title, content, contentDe }); }
  }
  return posts;
}
function wc(html:string){
  const text = html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  return text ? text.split(" ").length : 0;
}
function replaceField(tsText: string, slug: string, field: "content"|"contentDe", newInner: string){
  const slugIdx = tsText.indexOf(`slug: "${slug}"`); if(slugIdx<0) return tsText;
  const openMarker = field==="content" ? 'content: String.raw`' : 'contentDe: String.raw`';
  const closeMarker = '`,';
  if(tsText.indexOf(openMarker, slugIdx) < 0){
    const broken = field==="content" ? /content:\s*String\.raw,/ : /contentDe:\s*String\.raw,/;
    tsText = tsText.replace(new RegExp(`(slug:\\s*"${slug}".*?)${broken.source}`,"s"), `$1${openMarker}`);
  }
  const o = tsText.indexOf(openMarker, slugIdx); if(o<0) return tsText;
  const s = o + openMarker.length;
  const c = tsText.indexOf(closeMarker, s); if(c<0) return tsText;
  newInner = newInner.replace(/`/g, "'");
  return tsText.slice(0,s) + newInner + tsText.slice(c);
}
function mergeFrom(currentPath: string, sourcePath: string, minGain=150){
  const cur = fs.readFileSync(currentPath, "utf8");
  const src = fs.readFileSync(sourcePath, "utf8");
  const curPosts = extractPosts(cur);
  const srcPosts = extractPosts(src);
  let out = cur, changed = 0; const report:string[] = [];
  for(const cp of curPosts){
    const sp = srcPosts.find(p=>p.slug===cp.slug);
    if(!sp) continue;
    const curENwc = wc(cp.content||""), curDEwc = wc(cp.contentDe||"");
    const srcENwc = wc(sp.content||""), srcDEwc = wc(sp.contentDe||"");
    let did=false;
    if(srcENwc - curENwc >= minGain){ out = replaceField(out, cp.slug, "content", sp.content||""); report.push(`EN: ${cp.slug} ${curENwc}->${srcENwc}`); did=true; }
    if(srcDEwc - curDEwc >= minGain){ out = replaceField(out, cp.slug, "contentDe", sp.contentDe||""); report.push(`DE: ${cp.slug} ${curDEwc}->${srcDEwc}`); did=true; }
    if(did) changed++;
  }
  return { out, changed, report };
}
const args = process.argv.slice(2);
if(args.length===0){ console.error("Usage: tsx scripts/merge-from.ts <source.ts> [minGain=150]"); process.exit(1); }
const source = path.resolve(args[0]); const minGain = args[1]?Number(args[1]):150;
const current = path.resolve("lib/cms/posts-data.ts");
if(!fs.existsSync(source)) { console.error("Source not found:", source); process.exit(1); }
const { out, changed, report } = mergeFrom(current, source, minGain);
fs.writeFileSync(current + ".backup.before-merge.ts", fs.readFileSync(current));
fs.writeFileSync(current, out);
console.log(`Merged from ${path.basename(source)} | posts updated: ${changed}`);
for(const line of report){ console.log(" - " + line) }

