import re

with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the current useState with pathname detection
old_detection = '''const [language, setLanguage] = useState<Language>(() => {
    // Check URL pathname first
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.startsWith('/de')) return 'de'
      if (path.startsWith('/en')) return 'en'
    }
    return 'en'
  })'''

# Replace with cookie detection
new_detection = '''const [language, setLanguage] = useState<Language>(() => {
    // Read from cookie set by middleware
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';')
      const langCookie = cookies.find(c => c.trim().startsWith('lang='))
      if (langCookie) {
        const lang = langCookie.split('=')[1].trim()
        if (lang === 'de' || lang === 'en') return lang as Language
      }
    }
    return 'en'
  })
  
  // Update language when cookie changes (e.g., user navigates to /de/ page)
  useEffect(() => {
    const checkCookie = () => {
      if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';')
        const langCookie = cookies.find(c => c.trim().startsWith('lang='))
        if (langCookie) {
          const lang = langCookie.split('=')[1].trim()
          if ((lang === 'de' || lang === 'en') && lang !== language) {
            setLanguage(lang as Language)
          }
        }
      }
    }
    
    // Check immediately and on navigation
    checkCookie()
    window.addEventListener('popstate', checkCookie)
    
    return () => window.removeEventListener('popstate', checkCookie)
  }, [language])'''

if old_detection in content:
    content = content.replace(old_detection, new_detection)
    print("✅ Fixed language detection to use cookie")
else:
    print("❌ Could not find language detection code")
    import sys
    sys.exit(1)

# Add useEffect import if missing
if 'useEffect' not in content:
    content = re.sub(
        r'(import.*useState.*from ["\']react["\'])',
        r'\1\nimport { useEffect } from "react"',
        content
    )
    print("✅ Added useEffect import")

with open('lib/i18n/language-context.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("🎉 Language detection fixed!")
