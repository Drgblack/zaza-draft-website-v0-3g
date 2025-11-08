# Fix ai-literacy - remove t from useLanguage
with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'useLanguage()' in line and ', t }' in line:
        # Remove , t from the destructuring
        line = line.replace(', t }', ' }')
    new_lines.append(line)

with open('app/ai-literacy/ai-literacy-client.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print("✅ Fixed ai-literacy")

# Fix community
with open('app/community/community-client.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'useLanguage()' in line and ', t }' in line:
        line = line.replace(', t }', ' }')
    new_lines.append(line)

with open('app/community/community-client.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print("✅ Fixed community")
