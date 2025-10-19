import { blogPosts } from "../lib/cms/posts-data";

function wordCount(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

type Row = { id: number; slug: string; wcEN: number; wcDE: number; hasResEN: boolean; hasResDE: boolean };

const rows: Row[] = blogPosts.map((p: any) => ({
  id: p.id,
  slug: p.slug,
  wcEN: wordCount(p.content),
  wcDE: wordCount(p.contentDe),
  hasResEN: /<h2[^>]*>\s*Resources/i.test(p.content) || /<h3[^>]*>\s*Resources/i.test(p.content),
  hasResDE: /<h2[^>]*>\s*Ressourcen/i.test(p.contentDe) || /<h3[^>]*>\s*Ressourcen/i.test(p.contentDe),
}));

const TOO_SHORT = 1200; // set to 1500 if desired
const offenders = rows.filter(r => r.wcEN < TOO_SHORT || r.wcDE < TOO_SHORT || !r.hasResEN || !r.hasResDE);

console.log(`Checked ${rows.length} posts.`);
if (offenders.length === 0) {
  console.log("All posts meet word-count and resources requirements.");
  process.exit(0);
}

console.log("\nNeeds attention:");
for (const r of offenders) {
  const msgs = [];
  if (r.wcEN < TOO_SHORT) msgs.push(`EN ${r.wcEN} words`);
  if (r.wcDE < TOO_SHORT) msgs.push(`DE ${r.wcDE} words`);
  if (!r.hasResEN) msgs.push("missing EN Resources");
  if (!r.hasResDE) msgs.push("missing DE Ressourcen");
  console.log(`- ${r.id} ${r.slug}: ${msgs.join("; ")}`);
}
process.exit(0);

