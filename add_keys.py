import sys

with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

en_keys = '''  "glossary.title": "AI Glossary for Teachers",
  "glossary.subtitle": "150+ AI terms explained in teacher-friendly language. Search by category or alphabetically to understand AI concepts for education.",
  "integrations.title": "Connect Your Favorite Tools",
  "integrations.subtitle": "Seamlessly integrate Zaza Draft with your existing stack.",
'''

de_keys = '''  "glossary.title": "KI-Glossar für Lehrkräfte",
  "glossary.subtitle": "Über 150 KI-Begriffe in leicht verständlicher Sprache erklärt. Nach Kategorie oder alphabetisch suchen, um KI-Konzepte für den Bildungsbereich zu verstehen.",
  "integrations.title": "Verbinden Sie Ihre Lieblingstools",
  "integrations.subtitle": "Integrieren Sie Zaza Draft nahtlos in Ihren vorhandenen Stack.",
'''

contact_support_line = '  "contact.help.support": "→ Support Center",'
if contact_support_line in content:
    content = content.replace(contact_support_line, contact_support_line + '\n' + en_keys)
    print("✅ EN keys added")
else:
    print("❌ EN marker not found")
    sys.exit(1)

de_contact_line = '  "contact.help.support": "→ Support-Center",'
if de_contact_line in content:
    content = content.replace(de_contact_line, de_contact_line + '\n' + de_keys)
    print("✅ DE keys added")
else:
    print("❌ DE marker not found")
    sys.exit(1)

with open('lib/i18n/language-context.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("🎉 Done!")
