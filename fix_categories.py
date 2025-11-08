# Fix EN community.ts - add title field
with open('locales/en/community.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add title before categories
content = content.replace(
    '"categories": {',
    '"categoriesTitle": "Discussion Categories",\n  "categories": {'
)

with open('locales/en/community.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed EN community.ts")

# Fix DE community.ts
with open('locales/de/community.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '"categories": {',
    '"categoriesTitle": "Diskussionskategorien",\n  "categories": {'
)

with open('locales/de/community.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed DE community.ts")

# Now fix the component to use categoriesTitle
with open('app/community/community-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '{t("categories")}',
    '{t("categoriesTitle")}'
)

with open('app/community/community-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed community component")
