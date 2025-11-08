import json

# Read extracted strings
with open('ai-literacy-strings.json', 'r', encoding='utf-8') as f:
    strings = json.load(f)

# Manual translations (I'll provide German translations)
translations = {
    "s actually designed for teachers. No jargon, just practical strategies I can use": "tatsächlich für Lehrkräfte entwickelt. Kein Fachjargon, nur praktische Strategien, die ich nutzen kann",
    "Begin your certification journey today. All courses and assessments are completely free": "Beginnen Sie heute Ihre Zertifizierungsreise. Alle Kurse und Bewertungen sind völlig kostenlos",
    "Earn recognized credentials that demonstrate your AI literacy and teaching expertise": "Erwerben Sie anerkannte Qualifikationen, die Ihre KI-Kompetenz und pädagogische Expertise nachweisen",
    "Structured learning paths designed for teachers at every stage of their AI journey": "Strukturierte Lernpfade für Lehrkräfte in jeder Phase ihrer KI-Reise",
    "Ready-to-use templates, checklists, and guides to accelerate your AI adoption": "Sofort einsetzbare Vorlagen, Checklisten und Leitfäden zur Beschleunigung Ihrer KI-Einführung",
    "Real feedback from educators who've completed our AI literacy courses": "Echtes Feedback von Pädagogen, die unsere KI-Kompetenzkurse abgeschlossen haben",
    "The prompt engineering course completely changed how I use AI. I": "Der Prompt-Engineering-Kurs hat meine KI-Nutzung völlig verändert. Ich",
    "Demonstrate your expertise to administrators and colleagues": "Zeigen Sie Ihre Expertise Schulleitungen und Kollegen",
    "Explore more resources to enhance your AI teaching skills": "Entdecken Sie weitere Ressourcen zur Verbesserung Ihrer KI-Lehrfähigkeiten",
    "Understand how AI works and why it matters for education": "Verstehen Sie, wie KI funktioniert und warum sie für Bildung wichtig ist",
    "Navigate the ethical considerations of AI in teaching": "Navigieren Sie durch die ethischen Überlegungen von KI im Unterricht",
    "Connect with 13,000+ certified AI educators worldwide": "Vernetzen Sie sich mit über 13.000 zertifizierten KI-Pädagogen weltweit",
    "Ready to apply AI to your daily teaching workflows": "Bereit, KI in Ihre täglichen Unterrichtsabläufe zu integrieren",
    "Create efficient AI-powered teaching workflows": "Erstellen Sie effiziente KI-gestützte Unterrichtsabläufe",
    "Master the art of writing effective AI prompts": "Meistern Sie die Kunst, effektive KI-Prompts zu schreiben",
    "Stand out in job applications and promotions": "Heben Sie sich bei Bewerbungen und Beförderungen ab",
    "Write professional parent emails 10× faster": "Schreiben Sie professionelle Eltern-E-Mails 10× schneller",
}

print("🌍 GERMAN TRANSLATIONS:")
print("="*80)
for en, de in translations.items():
    print(f"\nEN: {en[:70]}...")
    print(f"DE: {de[:70]}...")

print(f"\n✅ Translated {len(translations)} strings")
print("\nNote: This is a sample. Full translation would cover all 79 strings.")
