# Fix ai-literacy hero and visible sections
with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hero title
content = content.replace(
    'Master AI for <span className="gradient-text">Education</span>',
    '{t("title").split(" ").slice(0, 2).join(" ")} <span className="gradient-text">{t("title").split(" ").slice(2).join(" ")}</span>'
)

# Actually, simpler approach - just wrap the whole thing
content = content.replace(
    '              Master AI for <span className="gradient-text">Education</span>',
    '              {t("title")}'
)

# Check if subtitle already uses t() - if not, add it
if 'Build your AI expertise' in content and 't("subtitle")' not in content:
    content = content.replace(
        'Build your AI expertise with actionable courses that save you time and improve your teaching.',
        '{t("subtitle")}'
    )

with open('app/ai-literacy/ai-literacy-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed ai-literacy hero section")
