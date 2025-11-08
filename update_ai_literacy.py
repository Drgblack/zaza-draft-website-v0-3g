import re

# Read the component
with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import at the top (after other imports)
import_statement = "import { useTranslations } from '@/lib/i18n/useTranslations'"

# Check if import already exists
if import_statement not in content:
    # Find the last import and add after it
    last_import = content.rfind('import ')
    next_newline = content.find('\n', last_import)
    content = content[:next_newline+1] + import_statement + '\n' + content[next_newline+1:]

# Add the hook call at the start of the component
if 'const { t } = useTranslations' not in content:
    # Find the component function start
    component_start = content.find('export default function')
    # Find the opening brace
    brace_pos = content.find('{', component_start)
    # Insert hook call after the brace
    content = content[:brace_pos+1] + '\n  const { t } = useTranslations("aiLiteracy")' + content[brace_pos+1:]

# Replace hardcoded strings with t() calls
replacements = [
    (r'>Master AI for Education<', r'>{t("title")}<'),
    (r'>Courses<', r'>{t("stat.courses")}<'),
    (r'>Educators<', r'>{t("stat.teachers")}<'),
    (r'>Certified<', r'>{t("stat.certificates")}<'),
    (r'>Hours Saved<', r'>{t("stat.hours")}<'),
    (r'>Choose Your Learning Path<', r'>{t("choosePath")}<'),
    (r'>Beginner Path<', r'>{t("path.beginner.title")}<'),
    (r'>Intermediate Path<', r'>{t("path.intermediate.title")}<'),
    (r'>Advanced Path<', r'>{t("path.advanced.title")}<'),
    (r'>Start Now<', r'>{t("path.beginner.cta")}<'),
    (r'>View Courses<', r'>{t("path.intermediate.cta")}<'),
    (r'>Get Started<', r'>{t("path.advanced.cta")}<'),
    (r'>Browse Courses<', r'>{t("ctaBrowse")}<'),
    (r'>Get Certified<', r'>{t("ctaCert")}<'),
    (r'>What Teachers Are Saying<', r'>{t("whatTeachersSay")}<'),
    (r'>Downloadable Resource Library<', r'>{t("resources.title")}<'),
    (r'>AI Education Certification<', r'>{t("cert.title")}<'),
    (r'>Continue Your AI Journey<', r'>{t("continue.title")}<'),
    (r'>Live Webinars<', r'>{t("continue.webinars")}<'),
    (r'>Teacher Community<', r'>{t("continue.community")}<'),
    (r'>Tool Integrations<', r'>{t("continue.integrations")}<'),
]

count = 0
for old, new in replacements:
    matches = len(re.findall(old, content))
    if matches > 0:
        content = re.sub(old, new, content)
        count += matches
        print(f"✅ Replaced {matches}x: {old[:40]}")

print(f"\n✅ Total replacements: {count}")

# Save
with open('app/ai-literacy/ai-literacy-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("🎉 Component updated!")
