import re

# Read the component
with open('app/videos/videos-client.tsx', 'r', encoding='utf-8') as f:
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
    content = content[:brace_pos+1] + '\n  const { t } = useTranslations("videos")' + content[brace_pos+1:]

# Replace strings
replacements = [
    (r'>Video Tutorials and Demos<', r'>{t("title")}<'),
    (r'>Featured Videos<', r'>{t("featured")}<'),
    (r'>Curated Playlists<', r'>{t("playlists")}<'),
    (r'>All Videos<', r'>{t("allVideos")}<'),
    (r'All Videos</button>', r'{t("filter.all")}</button>'),
    (r'Getting Started</button>', r'{t("filter.basics")}</button>'),
    (r'Advanced Features</button>', r'{t("filter.advanced")}</button>'),
    (r'placeholder="Search videos', r'placeholder={t("search.placeholder")}'),
]

count = 0
for old, new in replacements:
    matches = len(re.findall(old, content))
    if matches > 0:
        content = re.sub(old, new, content)
        count += matches
        print(f"✅ Replaced {matches}x: {old[:40]}")

print(f"\n✅ Total replacements: {count}")

with open('app/videos/videos-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("🎉 Videos component updated!")
