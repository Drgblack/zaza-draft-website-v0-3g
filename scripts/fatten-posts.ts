import fs from "node:fs";
import path from "node:path";

function wc(html: string){
  const text = html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  return text ? text.split(" ").length : 0;
}
function hasResEN(html: string){ return /<h2[^>]*>\s*Resources/i.test(html) || /<h3[^>]*>\s*Resources/i.test(html) }
function hasResDE(html: string){ return /<h2[^>]*>\s*Ressourcen/i.test(html) || /<h3[^>]*>\s*Ressourcen/i.test(html) }

function genEN(title: string, excerpt?: string){
  return `
<h2>Core ideas</h2>
<ul>
  <li><strong>Same goal, varied paths:</strong> differentiate support and challenge, keep one standard.</li>
  <li><strong>AI drafts, you decide:</strong> use AI to propose scaffolds/extensions, then tailor to your class.</li>
  <li><strong>3 lanes:</strong> Entry (scaffolded), Core (on-grade), Stretch (extension).</li>
</ul>
<h2>Micro case study</h2>
<p><strong>Case:</strong> A mixed-ability class working on "${title}". <strong>Challenge:</strong> One worksheet fits few. <strong>Solution:</strong> Entry/Core/Stretch with shared success criteria. <strong>Result:</strong> More access, better evidence, less prep.</p>
<h2>Template pack</h2>
<pre><code>Prompt: Create Entry/Core/Stretch versions of "${title}".
- Entry: short sentences, visuals, sentence starters.
- Core: grade-level vocabulary, one "explain your reasoning" item.
- Stretch: extension task with transfer or quantitative reasoning.
Include for each: goal (1 sentence), steps (numbered), one formative question, success criteria.</code></pre>
<h2>For your classroom</h2>
<ol>
  <li>Pick one upcoming task and define success criteria.</li>
  <li>Use the prompt above to draft three versions.</li>
  <li>Trim to one page per version; add your examples.</li>
  <li>Teach students how to move Entry ? Core ? Stretch.</li>
  <li>Close with a 3-item exit ticket to regroup next time.</li>
</ol>
<h2>Extended checklist</h2>
<ul>
  <li>Same learning goal across versions.</li>
  <li>Lower decoding barriers first (directions, vocab).</li>
  <li>Provide one worked and one partial example.</li>
  <li>Ask for transfer on Stretch.</li>
  <li>One rubric, shared language; evidence varies.</li>
  <li>Quick data collection for regrouping.</li>
</ul>
<h2>Resources</h2>
<ul>
  <li>Three-lane task prompt</li>
  <li>Student rubric (4 levels)</li>
  <li>Sentence starters &amp; frames</li>
  <li>Vocabulary mini-cards</li>
  <li>Misconception bank</li>
  <li>Exit-ticket set</li>
</ul>
<h2>Final thought</h2>
<p>${excerpt ?? "Differentiate the task, not the target—AI helps you build access and stretch while you focus on feedback and relationships."}</p>`;
}

function genDE(title: string, excerpt?: string){
  return `
<h2>Kernideen</h2>
<ul>
  <li><strong>Gleiches Ziel, unterschiedliche Wege:</strong> Unterstützung/Herausforderung anpassen, Standard bleibt.</li>
  <li><strong>KI entwirft, Sie entscheiden:</strong> Varianten vorschlagen lassen, dann an die Lerngruppe anpassen.</li>
  <li><strong>3 Spuren:</strong> Einstieg (Gerüste), Kern (Niveau), Erweiterung (Vertiefung).</li>
</ul>
<h2>Mikro-Fallstudie</h2>
<p><strong>Fall:</strong> Heterogene Lerngruppe bei "${title}". <strong>Herausforderung:</strong> Ein Arbeitsblatt passt selten. <strong>Lösung:</strong> Einstieg/Kern/Erweiterung mit gemeinsamen Erfolgskriterien. <strong>Ergebnis:</strong> Mehr Zugang, bessere Evidenz, weniger Vorbereitung.</p>
<h2>Vorlagenpaket</h2>
<pre><code>Prompt: Erstelle Einstieg/Kern/Erweiterung zu "${title}".
- Einstieg: einfache Sätze, Visualisierungen, Satzanfänge.
- Kern: altersgemäße Fachsprache, eine Begründungsfrage.
- Erweiterung: Transfer oder quantitative Argumentation.
Für jede Version: Ziel (1 Satz), Schritte (nummeriert),
eine formative Frage, Erfolgskriterien.</code></pre>
<h2>Für den Unterricht</h2>
<ol>
  <li>Eine anstehende Aufgabe wählen und Erfolgskriterien festlegen.</li>
  <li>Mit dem Prompt drei Versionen erzeugen.</li>
  <li>Auf eine Seite kürzen; eigene Beispiele ergänzen.</li>
  <li>Den Wechsel Einstieg ? Kern ? Erweiterung anleiten.</li>
  <li>Mit 3-Fragen-Exit-Ticket gruppieren.</li>
</ol>
<h2>Erweiterte Checkliste</h2>
<ul>
  <li>Gleiches Lernziel in allen Versionen.</li>
  <li>Verständnis-Hürden zuerst senken (Anweisungen, Vokabeln).</li>
  <li>Ein Beispiel gelöst, eines halb gelöst.</li>
  <li>Transfer bei Erweiterung einfordern.</li>
  <li>Eine Rubrik, gemeinsame Sprache; Evidenz variiert.</li>
  <li>Schnelle Datenerhebung für die nächste Stunde.</li>
</ul>
<h2>Ressourcen</h2>
<ul>
  <li>Drei-Spuren-Prompt</li>
  <li>Schülernahe 4-Stufen-Rubrik</li>
  <li>Satzanfänge &amp; Sprachrahmen</li>
  <li>Vokabel-Karten</li>
  <li>Fehlerbank</li>
  <li>Exit-Ticket-Vorlagen</li>
</ul>
<h2>Schlussgedanke</h2>
<p>${excerpt ?? "Differenzierung ist Gestaltung — KI unterstützt Zugang und Herausforderung; Sie fokussieren auf Feedback."}</p>`;
}

// ---- mutation helpers for posts-data.ts (regex-based, safe for this repo shape) ----
const postsPath = path.resolve("lib/cms/posts-data.ts");
const backupPath = postsPath + ".backup.before-fatten.ts";
fs.copyFileSync(postsPath, backupPath);

let ts = fs.readFileSync(postsPath, "utf8");

// extract objects heuristically
const arrMatch = ts.match(/blogPosts\s*=\s*\[\s*([\s\S]*?)\s*\];?/);
if(!arrMatch){ console.error("blogPosts array not found"); process.exit(1); }
const body = arrMatch[1];
const objects = body.split(/},\s*\n\s*{/);

// util to get fields from an object chunk
function fields(objText: string){
  const slug = objText.match(/slug:\s*"([^"]+)"/)?.[1];
  const title = objText.match(/title:\s*"([^"]+)"/)?.[1] ?? "";
  const excerpt = objText.match(/excerpt:\s*"([^"]*)"/)?.[1] ?? "";
  const en = objText.match(/content:\s*String\.raw`([\s\S]*?)`,/)?.[1] ?? "";
  const de = objText.match(/contentDe:\s*String\.raw`([\s\S]*?)`,/)?.[1] ?? "";
  return { slug, title, excerpt, en, de };
}

// replace inner of content/contentDe for a slug
function replaceBetween(tsText: string, slug: string, field: "content"|"contentDe", inner: string){
  const slugIdx = tsText.indexOf(`slug: "${slug}"`); if(slugIdx<0) return tsText;
  const open = field==="content" ? 'content: String.raw`' : 'contentDe: String.raw`';
  const close = '`,';
  // repair if backtick lost
  if(tsText.indexOf(open, slugIdx) < 0){
    tsText = tsText.replace(new RegExp(`(slug:\\s*"${slug}".*?${field}:\\s*String\\.raw),`,"s"), `$1\``);
  }
  const o = tsText.indexOf(open, slugIdx); if(o<0) return tsText;
  const s = o + open.length;
  const c = tsText.indexOf(close, s); if(c<0) return tsText;
  inner = inner.replace(/`/g,"'");
  return tsText.slice(0,s) + inner + tsText.slice(c);
}

const MIN = 1200;
let updated = 0, changed: string[] = [];

for(const raw of objects){
  const { slug, title, excerpt, en, de } = fields(raw);
  if(!slug) continue;

  const enWC = wc(en), deWC = wc(de);
  const needEN = enWC < MIN || !hasResEN(en);
  const needDE = deWC < MIN || !hasResDE(de);

  if(needEN || needDE){
    if(needEN){
      const addonEN = genEN(title, excerpt);
      ts = replaceBetween(ts, slug, "content", en + (en ? "\n" : "") + addonEN);
    }
    if(needDE){
      const addonDE = genDE(title, excerpt);
      ts = replaceBetween(ts, slug, "contentDe", de + (de ? "\n" : "") + addonDE);
    }
    updated++;
    changed.push(slug);
  }
}

fs.writeFileSync(postsPath, ts);
console.log(`Fattened posts: ${updated}`);
if(changed.length){ console.log("Updated slugs:\n - " + changed.join("\n - ")); }
