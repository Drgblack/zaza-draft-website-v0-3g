import re

# Read the component
with open('app/community/community-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
import_statement = "import { useTranslations } from '@/lib/i18n/useTranslations'"
if import_statement not in content:
    last_import = content.rfind('import ')
    next_newline = content.find('\n', last_import)
    content = content[:next_newline+1] + import_statement + '\n' + content[next_newline+1:]

# Add hook
if 'const { t } = useTranslations' not in content:
    component_start = content.find('export default function')
    brace_pos = content.find('{', component_start)
    content = content[:brace_pos+1] + '\n  const { t } = useTranslations("community")' + content[brace_pos+1:]

# Replace strings
replacements = [
    (r'>Join the Teacher Community<', r'>{t("hero.title")}<'),
    (r'>Trending Discussions<', r'>{t("trending")}<'),
    (r'>Discussion Categories<', r'>{t("categories")}<'),
    (r'>Community Guidelines<', r'>{t("rules.title")}<'),
    (r'>Create Free Account<', r'>{t("cta.join")}<'),
    (r'>Browse as Guest<', r'>{t("cta.guest")}<'),
    (r'placeholder="Search discussions', r'placeholder={t("search.placeholder")}'),
]

count = 0
for old, new in replacements:
    matches = len(re.findall(old, content))
    if matches > 0:
        content = re.sub(old, new, content)
        count += matches
        print(f"✅ Replaced {matches}x: {old[:40]}")

print(f"\n✅ Total replacements: {count}")

with open('app/community/community-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("🎉 Community component updated!")
