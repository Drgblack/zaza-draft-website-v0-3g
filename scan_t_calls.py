import os
import re
import json

# Find all t() calls in components
t_calls = set()

for root, dirs, files in os.walk('app'):
    # Skip node_modules and .next
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.next']]
    
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Find all t("key") or t('key') calls
                matches = re.findall(r't\(["\']([^"\']+)["\']\)', content)
                t_calls.update(matches)
            except:
                pass

print(f"Found {len(t_calls)} unique translation keys in use:\n")

# Organize by namespace
keys_by_namespace = {}
for key in sorted(t_calls):
    if '.' in key:
        namespace = key.split('.')[0]
    else:
        namespace = 'common'
    
    if namespace not in keys_by_namespace:
        keys_by_namespace[namespace] = []
    keys_by_namespace[namespace].append(key)

for ns, keys in keys_by_namespace.items():
    print(f"\n{ns}: {len(keys)} keys")
    for key in keys[:5]:
        print(f"  - {key}")
    if len(keys) > 5:
        print(f"  ... and {len(keys) - 5} more")

# Save to file for processing
with open('all-translation-keys.json', 'w', encoding='utf-8') as f:
    json.dump(list(t_calls), f, indent=2)

print(f"\n✅ Saved all keys to all-translation-keys.json")
