import re

filepath = 'app/reduce-stress-parent-messages/reduce-stress-client.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if useLanguage import exists
if 'useLanguage' not in content:
    print("❌ Missing useLanguage import")
    
    # Add it after react import
    content = re.sub(
        r'(import.*from ["\']react["\'])',
        r'\1\nimport { useLanguage } from "@/lib/i18n/language-context"',
        content
    )
    print("✅ Added useLanguage import")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
else:
    print("✅ useLanguage import already exists")

# Show first 15 lines
print("\nFirst 15 lines:")
with open(filepath, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if i < 15:
            print(line.rstrip())
        else:
            break
