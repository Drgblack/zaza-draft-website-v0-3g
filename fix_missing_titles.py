import re

# Fix ai-literacy
with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find h1 and replace with t()
content = re.sub(
    r'(<h1[^>]*>)([^<{]+)(</h1>)',
    r'\1{t("aiLiteracy.title")}\3',
    content,
    count=1
)

with open('app/ai-literacy/ai-literacy-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("✅ Fixed ai-literacy title")

# Fix integrations  
with open('app/integrations/integrations-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'(<h1[^>]*>)([^<{]+)(</h1>)',
    r'\1{t("integrations.title")}\3',
    content,
    count=1
)

with open('app/integrations/integrations-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("✅ Fixed integrations title")

print("\n🎉 Titles fixed!")
