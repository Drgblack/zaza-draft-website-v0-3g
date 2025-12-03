type Lang = "en" | "de";

function stripTags(s: string){ return s.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim() }
function wc(html: string){ const t = stripTags(html); return t ? t.split(" ").length : 0 }
function hasResourcesEN(html: string){ return /<h2[^>]*>\s*Resources/i.test(html) || /<h3[^>]*>\s*Resources/i.test(html) }
function hasResourcesDE(html: string){ return /<h2[^>]*>\s*Ressourcen/i.test(html) || /<h3[^>]*>\s*Ressourcen/i.test(html) }

function generatedSections(lang: Lang, title: string, excerpt?: string){
  if(lang==="en"){
    return `
<h2>Core ideas</h2>
<ul>
  <li><strong>Same goal, varied paths:</strong> differentiate support and challenge, keep one standard.</li>
  <li><strong>AI drafts, you decide:</strong> use AI to propose scaffolds/extension, then tailor to your class.</li>
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
<p>${excerpt ?? "Differentiate the task, not the target-AI helps you build access and stretch while you spend time on feedback and relationships."}</p>`;
  }
  // de
  return `
<h2>Kernideen</h2>
<ul>
  <li><strong>Gleiches Ziel, unterschiedliche Wege:</strong> UnterstÃƒÂ¼tzung/Herausforderung anpassen, Standard bleibt.</li>
  <li><strong>KI entwirft, Sie entscheiden:</strong> Varianten vorschlagen lassen, dann fÃƒÂ¼r die Lerngruppe zuschneiden.</li>
  <li><strong>3 Spuren:</strong> Einstieg (GerÃƒÂ¼ste), Kern (Niveau), Erweiterung (Vertiefung).</li>
</ul>
<h2>Mikro-Fallstudie</h2>
<p><strong>Fall:</strong> Heterogene Gruppe bei "${title}". <strong>Herausforderung:</strong> Ein Arbeitsblatt passt selten. <strong>LÃƒÂ¶sung:</strong> Einstieg/Kern/Erweiterung mit gemeinsamen Erfolgskriterien. <strong>Ergebnis:</strong> Mehr Zugang, bessere Evidenz, weniger Vorbereitung.</p>
<h2>Vorlagenpaket</h2>
<pre><code>Prompt: Erstelle Einstieg/Kern/Erweiterung zu "${title}".
- Einstieg: einfache SÃƒÂ¤tze, Visualisierungen, SatzanfÃƒÂ¤nge.
- Kern: altersgemÃƒÂ¤ÃƒÅ¸e Fachsprache, eine BegrÃƒÂ¼ndungsfrage.
- Erweiterung: Transfer oder quantitative Argumentation.
FÃƒÂ¼r jede Version: Ziel (1 Satz), Schritte (nummeriert),
eine formative Frage, Erfolgskriterien.</code></pre>
<h2>FÃƒÂ¼r den Unterricht</h2>
<ol>
  <li>Eine anstehende Aufgabe wÃƒÂ¤hlen und Erfolgskriterien festlegen.</li>
  <li>Mit dem Prompt drei Versionen erzeugen.</li>
  <li>Auf eine Seite kÃƒÂ¼rzen; eigene Beispiele ergÃƒÂ¤nzen.</li>
  <li>Den Wechsel Einstieg ? Kern ? Erweiterung anleiten.</li>
  <li>Mit 3-Fragen-Exit-Ticket gruppieren.</li>
</ol>
<h2>Erweiterte Checkliste</h2>
<ul>
  <li>Gleiches Lernziel in allen Versionen.</li>
  <li>VerstÃƒÂ¤ndnis-HÃƒÂ¼rden zuerst senken (Anweisungen, Vokabeln).</li>
  <li>Ein Beispiel gelÃƒÂ¶st, eines halb gelÃƒÂ¶st.</li>
  <li>Transfer bei Erweiterung einfordern.</li>
  <li>Eine Rubrik, gemeinsame Sprache; Evidenz variiert.</li>
  <li>Schnelle Datenerhebung fÃƒÂ¼r die nÃƒÂ¤chste Stunde.</li>
</ul>
<h2>Ressourcen</h2>
<ul>
  <li>Drei-Spuren-Prompt</li>
  <li>SchÃƒÂ¼lernahe 4-Stufen-Rubrik</li>
  <li>SatzanfÃƒÂ¤nge &amp; Sprachrahmen</li>
  <li>Vokabel-Karten</li>
  <li>Fehlerbank</li>
  <li>Exit-Ticket-Vorlagen</li>
</ul>
<h2>Schlussgedanke</h2>
<p>${excerpt ?? "Differenzierung ist Gestaltung, nicht drei getrennte Stunden - KI unterstÃƒÂ¼tzt Zugang und Herausforderung, Sie fokussieren auf Feedback."}</p>`;
}

export function autoExtendIfNeeded(html: string, lang: Lang, title: string, excerpt?: string){
  const count = wc(html);
  const needRes = lang==="en"? !hasResourcesEN(html) : !hasResourcesDE(html);
  if(count >= 1200 && !needRes) return html; // already good
  const addon = generatedSections(lang, title, excerpt);
  // Only append sections that are missing. Keep original content first.
  const withResources = (lang==="en"? hasResourcesEN(html):hasResourcesDE(html)) ? "" : addon;
  // If very short (< 400 words), append everything; else append just Resources & Final thought slices.
  if(count < 400) return html + "\n" + addon;
  // minimal add: extract Resources..Final thought from addon
  const m = addon.match(/<h2>Resources<\/h2>[\s\S]*$/i) || addon.match(/<h2>Ressourcen<\/h2>[\s\S]*$/i);
  return html + "\n" + (m ? m[0] : withResources);
}

