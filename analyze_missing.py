import json
import os

# Load all keys found in components
with open('all-translation-keys.json', 'r', encoding='utf-8') as f:
    all_keys = json.load(f)

# Check what exists in current locale files
existing_keys = set()

# Check EN locales
for file in os.listdir('locales/en'):
    if file.endswith('.ts'):
        with open(f'locales/en/{file}', 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract keys from the TS object
            import re
            keys = re.findall(r'"([^"]+)":', content)
            existing_keys.update(keys)

print(f"Total keys used in components: {len(all_keys)}")
print(f"Keys that exist in locale files: {len(existing_keys)}")
print(f"Missing keys: {len(set(all_keys) - existing_keys)}")

# Group missing keys by namespace
missing = set(all_keys) - existing_keys
namespaces = {}
for key in missing:
    ns = key.split('.')[0] if '.' in key else 'common'
    if ns not in namespaces:
        namespaces[ns] = []
    namespaces[ns].append(key)

print(f"\nMissing keys by namespace:")
for ns, keys in sorted(namespaces.items()):
    print(f"  {ns}: {len(keys)} missing")

# Save missing keys
with open('missing-keys.json', 'w', encoding='utf-8') as f:
    json.dump(list(missing), f, indent=2)

print(f"\n✅ Saved missing keys to missing-keys.json")
