import re, os

files = [
    ('app/glossary/glossary-client.tsx', 'glossary'),
    ('app/integrations/integrations-client.tsx', 'integrations'),
]

for filepath, key in files:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'useLanguage' not in content:
        content = re.sub(r'(import.*from\s+["\']react["\'])', r'\1\nimport { useLanguage } from "@/lib/i18n/language-context"', content)
    
    if 'const { t }' not in content:
        content = re.sub(r'(export default function \w+[^{]*\{)', r'\1\n  const { t } = useLanguage()', content)
    
    content = re.sub(r'(<h1[^>]*>)[^<{]+(Teachers|Tools)[^<]*(<\/h1>)', rf'\1{{t("{key}.title")}}\3', content)
    content = re.sub(r'(<h1[\s\S]{0,300}<p[^>]*>)(?!{t\()[^<{]+(<\/p>)', rf'\1{{t("{key}.subtitle")}}\2', content, count=1)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {os.path.basename(filepath)}")

print("🎉 Done!")
