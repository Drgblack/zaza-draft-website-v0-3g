import json
import re

# Read language-context.tsx
with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the EN translations section
en_match = re.search(r'const translationsEn.*?=\s*{(.*?)}(?=\s*const translationsDe)', content, re.DOTALL)
de_match = re.search(r'const translationsDe.*?=\s*{(.*?)}(?=\s*export)', content, re.DOTALL)

if en_match and de_match:
    print("✅ Found existing translations in language-context.tsx")
    en_section = en_match.group(1)
    de_section = de_match.group(1)
    
    # Extract keys (simple pattern matching)
    en_keys = re.findall(r'"([^"]+)":\s*"([^"]*)"', en_section)
    de_keys = re.findall(r'"([^"]+)":\s*"([^"]*)"', de_section)
    
    print(f"EN keys found: {len(en_keys)}")
    print(f"DE keys found: {len(de_keys)}")
    
    # Save for processing
    with open('existing-en-translations.json', 'w', encoding='utf-8') as f:
        json.dump(dict(en_keys), f, indent=2, ensure_ascii=False)
    
    with open('existing-de-translations.json', 'w', encoding='utf-8') as f:
        json.dump(dict(de_keys), f, indent=2, ensure_ascii=False)
    
    print("✅ Extracted existing translations")
else:
    print("❌ Could not find translation sections")
