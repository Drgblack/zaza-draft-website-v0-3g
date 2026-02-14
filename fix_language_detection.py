import re

with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the useState line
old_state = 'const [language, setLanguage] = useState<Language>("en")'

# Replace with proper detection
new_state = '''const [language, setLanguage] = useState<Language>(() => {
    // Check URL pathname first
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.startsWith('/de')) return 'de'
      if (path.startsWith('/en')) return 'en'
    }
    return 'en'
  })'''

if old_state in content:
    content = content.replace(old_state, new_state)
    print("✅ Fixed language detection")
else:
    print("❌ Could not find useState line")
    import sys
    sys.exit(1)

with open('lib/i18n/language-context.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("🎉 Language detection fixed!")
