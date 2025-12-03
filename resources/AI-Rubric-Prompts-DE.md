# AI Rubrik-Prompts: Erstellen Sie bessere Rubriken in kürzerer Zeit
## Der vollständige Leitfaden zum Generieren, Verfeinern und Schülerfreundlich-Machen von Bewertungsinstrumenten

**Von Dr. Greg Blackburn**  
*www.zazadraft.com*

*Hören Sie auf, Stunden damit zu verbringen, Rubriken von Grund auf neu zu schreiben. Verwenden Sie diese bewährten Prompts, um klare, spezifische, schülerfreundliche Rubriken in Minuten statt Stunden zu erstellen.*

---

## Warum das wichtig ist

Sie wissen, dass Rubriken für faires Benoten und klare Erwartungen unerlässlich sind. Aber sie zu erstellen? Das sind 2-3 Stunden Ihres Wochenendes, weg. Und selbst nach all dieser Arbeit fragen Schüler immer noch: "Was bedeutet 'kompetent' wirklich?"

Dieser Leitfaden zeigt Ihnen, wie Sie KI verwenden, um:
- **Rubrik-Entwürfe zu generieren** in unter 5 Minuten
- **Lehrersprache zu übersetzen** in schülerfreundliche Sprache
- **Rubriken anzupassen** für verschiedene Lerner
- **Kommentarbanken zu erstellen** direkt aus Ihren Rubriken

> **Für wen das ist:** Jede Lehrkraft, die Aufsätze, Projekte, Präsentationen, Labore oder kreative Arbeiten aufgibt und fair bewerten möchte, ohne im Papierkram zu ertrinken.

---

## Teil 1: Das Rubrik-Generierungs-Framework

### Der 4-Schritte-Prozess

**Schritt 1: Definieren Sie Ihre Aufgabe**  
Bevor Sie prompten, seien Sie kristallklar über:
- Was ist das Endprodukt? (Aufsatz? Poster? Video?)
- Welche Fähigkeiten bewerten Sie? (These-Klarheit? Datenanalyse? Kreativität?)
- Wie sieht Erfolg aus?

**Schritt 2: Verwenden Sie den Prompt**  
Beginnen Sie mit einer Vorlage (siehe Teil 2), füllen Sie Ihre Aufgabendetails ein.

**Schritt 3: Überprüfen & verfeinern**  
KI bringt Sie zu 80% dorthin. Sie fügen die letzten 20% hinzu: Ihre Stimme, Ihre Beispiele, die Erwartungen Ihrer Schule.

**Schritt 4: Schülerfreundlich machen**  
Konvertieren Sie Lehrersprache in "Ich kann..."-Aussagen (siehe Teil 3).

---

## Teil 2: Rubrik-Generierungs-Prompts

### 2.1 Der universelle Rubrik-Generator

**Verwenden, wenn:** Sie von Grund auf bei jeder Aufgabe beginnen.

**Prompt-Vorlage:**
```
Erstelle eine 4-Stufen-Rubrik für diese Aufgabe:

AUFGABE: [Beschreibe die Aufgabe]
KLASSENSTUFE: [z.B. 7. Klasse]
FACH: [z.B. Naturwissenschaften]
HAUPTFÄHIGKEITEN ZUR BEWERTUNG: [Liste 3-5 Fähigkeiten auf]

Einschließen:
- 4 Leistungsstufen (Hervorragend, Kompetent, Entwickelnd, Beginnend)
- 4-6 Kriterien
- Spezifische Deskriptoren für jede Stufe (nicht vage)
- Punktwerte (optional: Gesamtpunkte angeben)

Format: Tabelle mit Kriterien in Zeilen, Stufen in Spalten
```

**Beispiel:**
```
Erstelle eine 4-Stufen-Rubrik für diese Aufgabe:

AUFGABE: Forschungsposter über erneuerbare Energiequellen
KLASSENSTUFE: 8. Klasse
FACH: Naturwissenschaften
HAUPTFÄHIGKEITEN ZUR BEWERTUNG: Forschungsqualität, Datengenauigkeit, visuelle Organisation, Zitierungen, Präsentationsklarheit

Einschließen:
- 4 Leistungsstufen (Hervorragend, Kompetent, Entwickelnd, Beginnend)
- 5 Kriterien
- Spezifische Deskriptoren für jede Stufe
- Punktwerte (gesamt: 100 Punkte)

Format: Tabelle
```

**Beispiel-Ausgabe:**

| Kriterium | Hervorragend (25 Pkt) | Kompetent (20 Pkt) | Entwickelnd (15 Pkt) | Beginnend (10 Pkt) |
|-----------|----------------------|-------------------|--------------------|--------------------|
| **Forschungsqualität** | Verwendet 5+ glaubwürdige Quellen; zitiert wissenschaftlich geprüfte Studien oder Regierungsdaten | Verwendet 4 glaubwürdige Quellen; Mischung aus Typen (Artikel, Websites, Bücher) | Verwendet 2-3 Quellen; einige mangeln an Glaubwürdigkeit oder Aktualität | Verwendet 1 Quelle oder verlässt sich auf unzuverlässige Websites |
| **Datengenauigkeit** | Alle Fakten sind korrekt und zitiert; enthält aktuelle Statistiken (innerhalb 2 Jahre) | Fakten sind meist korrekt mit kleineren Fehlern; meiste Daten sind aktuell | Mehrere sachliche Fehler; veraltete Daten (3+ Jahre alt) | Viele Ungenauigkeiten; keine Datenüberprüfung |
| **Visuelle Organisation** | Layout ist klar, auffallend und leicht zu folgen; effektive Nutzung von Diagrammen/Bildern | Layout ist organisiert und lesbar; enthält relevante Visuals | Layout ist unübersichtlich oder schwer zu folgen; wenige Visuals | Unorganisiert; keine visuellen Hilfen oder schlecht gewählte Bilder |
| **Zitierungen** | Alle Quellen korrekt im APA-Format zitiert; enthält Inline-Zitierungen | Meiste Quellen zitiert; kleinere Formatierungsfehler | Einige Quellen zitiert; inkonsistentes Format | Wenige oder keine Zitierungen; keine Bibliographie |
| **Präsentationsklarheit** | Erklärt Inhalt selbstbewusst; beantwortet Fragen mit Tiefe | Erklärt Inhalt klar; beantwortet die meisten Fragen | Liest vom Poster ab; kämpft mit einigen Fragen | Kann Inhalt nicht erklären; keine Vorbereitung erkennbar |

---

### 2.2 Der Einzelkriterium-Tieftauchgang

**Verwenden, wenn:** Sie eine spezifische Fähigkeit mit Nuancen bewerten möchten (z.B. These-Aussagen in Aufsätzen).

**Prompt-Vorlage:**
```
Erstelle eine detaillierte 5-Stufen-Rubrik zur Bewertung von [SPEZIFISCHE FÄHIGKEIT] in einer [KLASSENSTUFE] [AUFGABENTYP].

Stufen: Fortgeschritten, Kompetent, Angemessen, Entwickelnd, Anfänger

Für jede Stufe, bereitstellen:
- Klarer Deskriptor (wie es aussieht)
- Konkretes Beispiel
- Häufiger Fehler auf dieser Stufe

Zu bewertende Fähigkeit: [z.B. "Qualität der These-Aussage in argumentativen Aufsätzen"]
```

**Beispiel-Ausgabe:**

**Fähigkeit: Qualität der These-Aussage in argumentativen Aufsätzen**

**Fortgeschritten:**  
Deskriptor: These ist spezifisch, diskutierbar und enthält ein "So was?" (Bedeutung). Nimmt eine nuancierte Haltung ein.  
Beispiel: "Während soziale Medien Verbindung bieten, nutzt ihr algorithmisches Design die Teenagerpsychologie aus, was Regulierung essentiell macht, um die psychische Gesundheit zu schützen."  
Gemeinsame Stärke: Geht über offensichtliche Positionen hinaus.

**Kompetent:**  
Deskriptor: These ist klar und diskutierbar, könnte aber an Tiefe oder Nuance fehlen.  
Beispiel: "Soziale Medien schaden der psychischen Gesundheit von Teenagern und sollten reguliert werden."  
Häufiges Problem: Könnte spezifischer sein, wie oder warum.

(Fortsetzen für Angemessen, Entwickelnd, Anfänger...)

---

### 2.3 Die Standardausgerichtete Rubrik

**Verwenden, wenn:** Sie Ihre Rubrik an spezifische Curriculumstandards binden müssen.

**Prompt-Vorlage:**
```
Erstelle eine Rubrik, die an diese Standards ausgerichtet ist:

STANDARDS: [Fügen Sie Ihre Landes-/Nationalstandards ein]
AUFGABE: [Beschreibe Aufgabe]
KLASSENSTUFE: [Stufe]

Einschließen:
- 4 Leistungsstufen
- Kriterien direkt auf jeden Standard abgebildet
- Spezifische Beweise für jede Stufe

Format: Tabelle
```

---

### 2.4 Der "Geliehene" Rubrik-Verbesserer

**Verwenden, wenn:** Sie online eine Rubrik gefunden haben, aber sie ist zu vage oder passt nicht zu Ihren Bedürfnissen.

**Prompt-Vorlage:**
```
Verbessere diese Rubrik, indem du sie spezifischer und umsetzbarer machst:

ORIGINAL-RUBRIK:
[Fügen Sie die gefundene Rubrik ein]

Benötigte Änderungen:
- Deskriptoren spezifischer machen (Beispiele hinzufügen, wie "gut" aussieht)
- Messbare Kriterien hinzufügen, wo möglich (z.B. "enthält 3+ Quellen" nicht "enthält Quellen")
- Für [Klassenstufe] Schüler anpassen
- [Andere Anpassungen]

Behalte das gleiche Format und Struktur.
```

---

## Teil 3: Schülerfreundliche Übersetzungs-Prompts

### 3.1 In "Ich kann..."-Aussagen konvertieren

**Prompt-Vorlage:**
```
Schreibe diese Rubrik mit schülerfreundlichen "Ich kann..."-Aussagen um.

ORIGINAL-RUBRIK:
[Füge deine Rubrik ein]

Für jedes Kriterium und jede Stufe:
- Beginne mit "Ich kann..."
- Verwende einfache, direkte Sprache (Leseniveau: [Klasse])
- Vermeide Fachjargon
- Halte es positiv (was Schüler TUN können, nicht was sie nicht können)

Format: Behalte die gleiche Tabellenstruktur
```

**Beispiel-Ausgabe:**

| Kriterium | Hervorragend | Kompetent | Entwickelnd |
|-----------|--------------|-----------|-------------|
| **Forschung** | Ich kann 5+ vertrauenswürdige Quellen wie Regierungs-Websites oder Forschungsstudien finden und nutzen | Ich kann 4 gute Quellen aus verschiedenen Typen (Artikel, Bücher, Websites) finden und nutzen | Ich kann 2-3 Quellen finden, aber einige sind möglicherweise nicht die zuverlässigsten |

---

### 3.2 Selbstbewertungsfragen hinzufügen

**Prompt-Vorlage:**
```
Für diese Rubrik [Rubrik einfügen], füge eine Selbstbewertungsfrage für jedes Kriterium hinzu.

Format:
- Frage sollte zur Reflexion der Schüler anregen
- Sollte Ja/Nein oder Kurzantwort sein
- Hilft Schüler, ihre Stufe zu identifizieren

Beispiel:
Kriterium: These-Klarheit
Selbstcheck: "Kann jemand, der mit mir nicht übereinstimmt, genau verstehen, wofür ich argumentiere?"
```

---

### 3.3 Eine Schüler-Checkliste erstellen

**Verwenden, wenn:** Sie möchten, dass Schüler sich selbst bewerten, bevor sie einreichen.

**Prompt-Vorlage:**
```
Konvertiere diese Rubrik in eine Einreichungs-Checkliste für Schüler:

RUBRIK: [Rubrik einfügen]

Format:
- Checkbox-Liste
- Jeder Punkt ist spezifisch und umsetzbar
- Organisiert nach der Reihenfolge, in der Schüler prüfen sollten
- Füge am Ende eine "Qualitätsprüfung" hinzu

Leseniveau: [Klassenstufe]
Länge: 8-12 Punkte
```

---

## Teil 4: Differenzierungs- & Scaffolding-Prompts

### 4.1 Gestufte Rubriken erstellen

**Prompt-Vorlage:**
```
Erstelle 3 Versionen dieser Rubrik für unterschiedliche Lernstufen:

ORIGINAL-RUBRIK: [Rubrik einfügen]

VERSION A (Annähernd):
- Vereinfachte Sprache
- Weniger Kriterien (Fokus auf Wesentliches)
- Klare Beispiele auf jeder Stufe

VERSION B (Auf Niveau):
- Standard-Rubrik

VERSION C (Fortgeschritten):
- Komplexitätskriterien hinzufügen (Tiefe, Raffinesse, Synthese)
- Höhere Erwartungen für Beweise/Beispiele

Behalte die gleichen Kernkriterien über alle 3.
```

---

### 4.2 Gestufte Erfolgskriterien hinzufügen

**Prompt-Vorlage:**
```
Für diese Rubrik [Rubrik einfügen], füge gestufte Unterstützungen hinzu:

Für jede "Entwickelnd"- oder "Beginnend"-Stufe, bereitstellen:
- Satzanfänge, um Schülern zu helfen, die nächste Stufe zu erreichen
- Visuelle Beispiele oder Modelle
- Spezifische Überarbeitungsstrategie

Format: Füge eine "Scaffolds"-Spalte zur Rubrik hinzu
```

---

## Teil 5: Feedback & Bewertungseffizienz-Prompts

### 5.1 Eine Kommentarbank aus Ihrer Rubrik generieren

**Prompt-Vorlage:**
```
Basierend auf dieser Rubrik [Rubrik einfügen], erstelle eine Kommentarbank mit 5 Kommentaren für jede Leistungsstufe.

Für jeden Kommentar:
- Beziehe dich auf spezifische Kriterien
- Variiere die Formulierung (keine Wiederholung)
- Füge 1-2 Sätze hinzu
- Für "Entwickelnd" und "Beginnend", füge einen konkreten nächsten Schritt hinzu

Format: Organisiert nach Stufe, dann nach Kriterium
```

**Beispiel-Ausgabe:**

**Kompetent - Forschungsqualität:**
1. "Deine Verwendung von 4 glaubwürdigen Quellen stärkt dein Argument. Erwäge, eine wissenschaftlich geprüfte Studie hinzuzufügen, um hervorragend zu werden."
2. "Ich schätzte die Mischung aus Artikeln und Büchern in deiner Forschung. Zitiere nächstes Mal wenn möglich eine Primärquelle."
3. "Deine Quellen sind zuverlässig und relevant. Um deine Arbeit zu vertiefen, suche nach aktuelleren Daten (innerhalb des letzten Jahres)."

---

### 5.2 Rubrik-zu-Feedback-Formular-Generator

**Prompt-Vorlage:**
```
Erstelle ein Feedback-Formular basierend auf dieser Rubrik:

RUBRIK: [Rubrik einfügen]

Für jedes Kriterium:
- Checkbox für Leistungsstufe
- Raum für 1-2 Satz-Kommentar
- Vorgeschriebene "Stärke"- und "Nächster Schritt"-Optionen zum Ankreuzen

Format: Druckbares Formular oder digitale Checkliste
```

---

### 5.3 Schnellbewertungs-Helfer

**Verwenden, wenn:** Sie einen Stapel Aufgaben bewerten und schnellere Entscheidungsfindung benötigen.

**Prompt-Vorlage:**
```
Erstelle einen "Schnellbewertungs"-Entscheidungsbaum basierend auf dieser Rubrik:

RUBRIK: [Rubrik einfügen]

Format:
- Serie von Ja/Nein-Fragen
- Jede Antwort führt zu einer Leistungsstufe
- Dauert unter 60 Sekunden pro Aufgabe

Beispiel:
"Nimmt die These eine klare, diskutierbare Haltung ein?" 
→ Ja → Zur nächsten Frage übergehen
→ Nein → "Entwickelnd" ankreuzen und Feedback notieren
```

---

## Teil 6: Spezialfälle & Fortgeschrittene Techniken

### 6.1 Kollaborative/Gruppenarbeits-Rubrik

**Prompt-Vorlage:**
```
Erstelle eine Rubrik zur Bewertung individueller Beiträge zur Gruppenarbeit.

PROJEKT: [Beschreiben]
ZU BEWERTENDE KRITERIEN:
- Individueller Beitrag
- Kollaborationsqualität
- Kommunikation
- Verantwortlichkeit

Einschließen sowohl Gruppennote als auch individuelle Teilnahmenote.
Format: Duale Rubrik (Gruppe + individuell)
```

---

### 6.2 Prozessbasierte Rubrik (Nicht nur Produkt)

**Prompt-Vorlage:**
```
Erstelle eine Rubrik, die den Prozess bewertet, nicht nur das Endprodukt:

AUFGABE: [Beschreiben]
ZU BEWERTENDE PROZESS-PHASEN:
- Planung/Brainstorming
- Forschung/Entwurf
- Überarbeitung/Feedback-Einarbeitung
- Letzter Feinschliff

Gewichtung: 60% Prozess, 40% Produkt
```

---

### 6.3 Portfolio- oder kumulative Bewertungsrubrik

**Prompt-Vorlage:**
```
Erstelle eine Rubrik zur Bewertung von Wachstum über Zeit:

PORTFOLIO-INHALTE: [Liste auf, was enthalten ist]
ZEITRAHMEN: [z.B. Semester, Jahr]
FOKUS: Verbesserung zeigen in [Fähigkeit/Fach]

Einschließen:
- Wachstumsindikator (Anfang bis Ende)
- Reflexionsqualität
- Auswahl der Beweise
- Gesamtfortschritt

Format: Holistisch + analytisch
```

---

## Teil 7: Häufige Fallstricke & wie man sie behebt

### Wenn KI-Rubriken zu vage sind

**Problem:** "Schüler demonstriert Verständnis des Themas"  
**Fix-Prompt:**
```
Mache dieses Rubrik-Kriterium spezifischer:
[Vages Kriterium einfügen]

Hinzufügen:
- Beobachtbare Beweise (wie sieht "Verständnis" aus?)
- Messbare Indikatoren (wie viele? wie detailliert?)
- Konkrete Beispiele
```

---

### Wenn Rubriken zu lang sind

**Problem:** 8+ Kriterien, Schüler überfordert  
**Fix-Prompt:**
```
Vereinfache diese Rubrik auf 4-5 wesentliche Kriterien:
[Lange Rubrik einfügen]

Behalte nur die Kriterien, die:
1. Mit Lernzielen übereinstimmen
2. Beobachtbar/messbar sind
3. Schüler kontrollieren können
```

---

### Wenn Stufen sich überschneiden oder unklar sind

**Problem:** "Kompetent" und "Hervorragend" klingen zu ähnlich  
**Fix-Prompt:**
```
Kläre die Unterschiede zwischen Leistungsstufen in dieser Rubrik:
[Rubrik einfügen]

Für jedes Kriterium:
- Mache den Sprung von einer Stufe zur nächsten offensichtlich
- Füge 1-2 konkrete Beispiele hinzu, die den Unterschied zeigen
- Verwende parallele Struktur über Stufen hinweg
```

---

## Teil 8: Integration mit Zaza Draft

Wenn Sie Zaza Draft verwenden, können Sie so Ihren Rubrik-Workflow verbessern:

**Rubriken erstellen:**
1. Verwenden Sie obige Prompts, um einen Entwurf zu generieren
2. In Draft's "Verfeinern"-Modus einfügen
3. Draft passt Ton an und entfernt KI-Füllwörter

**Rubriken zur Bewertung verwenden:**
1. Laden Sie Ihre Rubrik + Schülerarbeit hoch
2. Fragen: "Bewerte diese Arbeit anhand der Rubrik. Gib spezifisches Feedback für jedes Kriterium."
3. Draft stellt sicher, dass Feedback evidenzbasiert ist (keine Halluzinationen)

**In Schülerfreundlich konvertieren:**
1. Fügen Sie Ihre Rubrik ein
2. Prompt: "Schreibe dies in schülerfreundlicher Sprache um, Leseniveau [Klasse]"
3. Überprüfen und anpassen

---

## Ihre nächsten Schritte

### Beginnen Sie hier (10-Minuten-Schnellgewinn):
1. Wählen Sie eine kommende Aufgabe
2. Verwenden Sie den universellen Rubrik-Generator (Abschnitt 2.1)
3. Füllen Sie die Lücken mit Ihren Aufgabendetails aus
4. Überprüfen Sie die Ausgabe und passen Sie 2-3 Deskriptoren an Ihre Stimme an
5. Teilen Sie mit Schülern **bevor** sie mit der Arbeit beginnen

### Bauen Sie Ihre Rubrik-Bibliothek auf:
- Speichern Sie Ihre besten Rubriken in einem gemeinsamen Laufwerk
- Kennzeichnen Sie nach Fach, Klassenstufe und Aufgabentyp
- Laden Sie Kollegen ein beizutragen
- Verfeinern Sie basierend darauf, wonach Schüler am meisten fragen

### Steigern Sie sich:
- Experimentieren Sie mit schülerfreundlichen Versionen (Teil 3)
- Versuchen Sie, Kommentarbanken zu erstellen (Teil 5.1)
- Teilen Sie Ihre Rubriken mit Ihrer Abteilung

---

## FAQ

**F: Kann ich KI vertrauen, meine Standards zu verstehen?**  
Verwenden Sie KI zum Entwerfen, aber überprüfen Sie immer die Ausrichtung. Sie sind der Experte für Ihr Curriculum.

**F: Sollte ich Schülern die Rubrik vor oder nach der Aufgabe zeigen?**  
Vorher. Immer. Rubriken sind Lehrmittel, keine Fallen.

**F: Wie gehe ich mit Grenzfällen um, die nicht zur Rubrik passen?**  
Fügen Sie eine Notiz hinzu: "Siehe mich für Feedback" oder nutzen Sie professionelles Urteil. Rubriken leiten, sie diktieren nicht.

**F: Was, wenn meine Schule ein spezifisches Rubrik-Format erfordert?**  
Fügen Sie das in Ihren Prompt ein: "Verwende unser schulisches 4-Spalten-Format mit Kriterien links..."

---

## Abschließende Gedanken

Großartige Rubriken geht nicht um Perfektion. Sie geht um Klarheit, Fairness und Zeitersparnis. Wenn eine Rubrik 3 Stunden zum Erstellen braucht und Schüler sie immer noch nicht verstehen, ist etwas kaputt.

Beginnen Sie mit KI, die die schwere Arbeit erledigt. Dann fügen Sie Ihre Expertise, Ihre Beispiele und Ihre Stimme hinzu. Bevor Sie es wissen, haben Sie eine Bibliothek von Rubriken, die Sie in Minuten anpassen können.

**Klare Erwartungen = bessere Arbeit. Weniger Bewertungsstress = besseres Unterrichten.**

Sie schaffen das. ðŸŽ¯

---

**Autor:** Dr. Greg Blackburn  
**Website:** www.zazadraft.com

*Â© 2025 Zaza Technologies. Diese Ressource ist kostenlos für Lehrkräfte. Teilen Sie sie mit Ihrem Team, aber bitte behalten Sie die Quellenangabe bei.*

