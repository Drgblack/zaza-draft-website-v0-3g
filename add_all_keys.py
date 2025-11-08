with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

marker = '  "integrations.subtitle": "Seamlessly integrate Zaza Draft with your existing stack.",'

if marker not in content:
    print("❌ Marker not found")
    import sys
    sys.exit(1)

en_keys = '''
  "aiLiteracy.title": "Master AI for Education",
  "aiLiteracy.subtitle": "Build your AI expertise with comprehensive courses that help you integrate AI into your classroom.",
  "bestAiWriting.title": "10 Best AI Writing Tools for Teachers in 2025",
  "bestAiWriting.subtitle": "Compare top AI tools for teacher writing, from parent communication to lesson planning.",
  "reduceStress.title": "How to Reduce Stress from Parent Messages (Without Ignoring Them)",
  "reduceStress.subtitle": "Professional strategies for managing parent communication while protecting your wellbeing.",
  "bestAiTool.title": "Best AI Tool for Writing Parent Emails Professionally",
  "bestAiTool.subtitle": "Discover why teachers choose Zaza Draft for professional parent communication.",
  "aiStudentReports.title": "AI for Student Reports & Report Cards: Complete Teacher Guide",
  "aiStudentReports.subtitle": "Save hours on report cards while maintaining personalization and quality.",
  "successStories.title": "See how teachers and schools transform communication with Zaza Draft",
  "successStories.subtitle": "Real results from educators who use AI-powered writing tools.",
  "roiCalculator.title": "Calculate Your Time Savings with Zaza Draft",
  "roiCalculator.subtitle": "See exactly how many hours per week you could save on parent communication.",'''

content = content.replace(marker, marker + en_keys)
print("✅ EN keys added")

de_marker = '  "integrations.subtitle": "Integrieren Sie Zaza Draft nahtlos in Ihren vorhandenen Stack.",'

de_keys = '''
  "aiLiteracy.title": "KI für Bildung meistern",
  "aiLiteracy.subtitle": "Bauen Sie Ihre KI-Expertise mit umfassenden Kursen auf, die Ihnen helfen, KI in Ihren Unterricht zu integrieren.",
  "bestAiWriting.title": "Die 10 besten KI-Schreibwerkzeuge für Lehrkräfte 2025",
  "bestAiWriting.subtitle": "Vergleichen Sie die besten KI-Tools für Lehrkräfte – von Elternkommunikation bis Unterrichtsplanung.",
  "reduceStress.title": "Wie Sie Stress durch Elternnachrichten reduzieren (ohne sie zu ignorieren)",
  "reduceStress.subtitle": "Professionelle Strategien für den Umgang mit Elternkommunikation bei gleichzeitigem Schutz Ihres Wohlbefindens.",
  "bestAiTool.title": "Das beste KI-Tool für professionelle Eltern-E-Mails",
  "bestAiTool.subtitle": "Entdecken Sie, warum Lehrkräfte Zaza Draft für professionelle Elternkommunikation wählen.",
  "aiStudentReports.title": "KI für Schülerberichte und Zeugnisse: Vollständiger Leitfaden für Lehrkräfte",
  "aiStudentReports.subtitle": "Sparen Sie Stunden bei Zeugnissen und bewahren Sie gleichzeitig Personalisierung und Qualität.",
  "successStories.title": "Sehen Sie, wie Lehrkräfte und Schulen die Kommunikation mit Zaza Draft transformieren",
  "successStories.subtitle": "Echte Ergebnisse von Pädagogen, die KI-gestützte Schreibwerkzeuge verwenden.",
  "roiCalculator.title": "Berechnen Sie Ihre Zeitersparnis mit Zaza Draft",
  "roiCalculator.subtitle": "Sehen Sie genau, wie viele Stunden pro Woche Sie bei der Elternkommunikation sparen könnten.",'''

content = content.replace(de_marker, de_marker + de_keys)
print("✅ DE keys added")

with open('lib/i18n/language-context.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("🎉 Done!")
