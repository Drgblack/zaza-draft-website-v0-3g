import re

filepath = 'app/success-stories/success-stories-client.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if const { t } = useLanguage() exists
if 'const { t } = useLanguage()' not in content:
    print("❌ Missing hook call")
    
    # Find the export default function line
    match = re.search(r'(export default function \w+\([^)]*\)\s*{)', content)
    if match:
        insert_point = match.end()
        content = content[:insert_point] + '\n  const { t } = useLanguage()' + content[insert_point:]
        print("✅ Added hook call")
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
    else:
        print("❌ Could not find function declaration")
else:
    print("✅ Hook call exists")

# Show first 20 lines
print("\nFirst 20 lines after fix:")
with open(filepath, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if i < 20:
            print(line.rstrip())
        else:
            break
