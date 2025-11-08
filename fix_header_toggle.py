import re

with open('components/header.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add useRouter and usePathname imports
if 'useRouter' not in content:
    content = content.replace(
        'import { useState } from "react"',
        'import { useState } from "react"\nimport { useRouter, usePathname } from "next/navigation"'
    )
    print("✅ Added router imports")

# Add router hooks in the component
if 'const router = useRouter()' not in content:
    content = content.replace(
        'const { language, setLanguage, t } = useLanguage()',
        'const router = useRouter()\n  const pathname = usePathname()\n  const { language, setLanguage, t } = useLanguage()'
    )
    print("✅ Added router hooks")

# Replace the language toggle buttons to navigate instead
old_en_button = 'onClick={() => setLanguage("en")}'
new_en_button = '''onClick={() => {
                  const newPath = pathname.startsWith('/de/') ? pathname.replace('/de/', '/') : pathname.startsWith('/de') ? pathname.replace('/de', '') : pathname
                  router.push(newPath || '/')
                }}'''

old_de_button = 'onClick={() => setLanguage("de")}'
new_de_button = '''onClick={() => {
                  const newPath = pathname.startsWith('/de') ? pathname : '/de' + pathname
                  router.push(newPath)
                }}'''

content = content.replace(old_en_button, new_en_button)
content = content.replace(old_de_button, new_de_button)
print("✅ Fixed language toggle buttons")

with open('components/header.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("🎉 Header fixed!")
