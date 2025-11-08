# Read ai-literacy
with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and fix the line
for i, line in enumerate(lines):
    if 'const { t } = useLanguage()' in line:
        lines[i] = line.replace('const { t } = useLanguage()', 'const { language } = useLanguage()')
        print(f"Fixed ai-literacy line {i+1}")

with open('app/ai-literacy/ai-literacy-client.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

# Read community
with open('app/community/community-client.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and fix the line
for i, line in enumerate(lines):
    if 'const { t } = useLanguage()' in line:
        lines[i] = line.replace('const { t } = useLanguage()', 'const { language } = useLanguage()')
        print(f"Fixed community line {i+1}")

with open('app/community/community-client.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("\n✅ Done!")
