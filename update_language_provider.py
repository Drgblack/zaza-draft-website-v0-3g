import re

# Read the language-context file
with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the LanguageProvider component and add initialLanguage prop
# Look for the component definition
if 'interface LanguageProviderProps' not in content:
    # Add interface before the component
    insert_pos = content.find('export function LanguageProvider')
    interface_code = '''interface LanguageProviderProps {
  children: React.ReactNode
  initialLanguage?: "en" | "de"
}

'''
    content = content[:insert_pos] + interface_code + content[insert_pos:]
    print("✅ Added LanguageProviderProps interface")

# Update the component to use props
content = content.replace(
    'export function LanguageProvider({ children }: { children: React.ReactNode })',
    'export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps)'
)

# Update the useState to use initialLanguage if provided
content = content.replace(
    "const [language, setLanguage] = useState<Language>('en')",
    "const [language, setLanguage] = useState<Language>(initialLanguage || 'en')"
)

with open('lib/i18n/language-context.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated LanguageProvider to accept initialLanguage prop")
