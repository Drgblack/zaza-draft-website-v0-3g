import re

with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hardcoded title with translation call
old = 'Master AI for <span className="gradient-text">Education</span>'
new = '{t("aiLiteracy.title").split(" ").slice(0, -1).join(" ")} <span className="gradient-text">{t("aiLiteracy.title").split(" ").slice(-1)}</span>'

if old in content:
    content = content.replace(old, new)
    print("✅ Replaced hardcoded title with t() call")
else:
    print("⚠️ Pattern not found")

with open('app/ai-literacy/ai-literacy-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
