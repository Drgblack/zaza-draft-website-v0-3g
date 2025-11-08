import json
import os

# Load all translations
with open('existing-en-translations.json', 'r', encoding='utf-8') as f:
    en_all = json.load(f)

with open('existing-de-translations.json', 'r', encoding='utf-8') as f:
    de_all = json.load(f)

# Load remaining namespaces
with open('remaining-namespaces.json', 'r') as f:
    remaining_ns = json.load(f)

# Group by namespace
en_by_namespace = {}
de_by_namespace = {}

for key, value in en_all.items():
    ns = key.split('.')[0] if '.' in key else 'common'
    if ns not in en_by_namespace:
        en_by_namespace[ns] = {}
    en_by_namespace[ns][key] = value

for key, value in de_all.items():
    ns = key.split('.')[0] if '.' in key else 'common'
    if ns not in de_by_namespace:
        de_by_namespace[ns] = {}
    de_by_namespace[ns][key] = value

def dict_to_nested_safe(flat_dict, namespace):
    nested = {}
    sorted_items = sorted(flat_dict.items(), key=lambda x: x[0].count('.'))
    
    for key, value in sorted_items:
        if key.startswith(namespace + '.'):
            key = key[len(namespace)+1:]
        
        parts = key.split('.')
        current = nested
        
        for i, part in enumerate(parts[:-1]):
            if part not in current:
                current[part] = {}
            elif not isinstance(current[part], dict):
                break
            current = current[part]
        else:
            if parts[-1] in current and isinstance(current[parts[-1]], dict):
                pass
            else:
                current[parts[-1]] = value
    
    return nested

def nested_to_ts(obj, indent=0):
    if isinstance(obj, str):
        obj = obj.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        return f'"{obj}"'
    
    lines = ['{']
    items = list(obj.items())
    for i, (k, v) in enumerate(items):
        comma = ',' if i < len(items) - 1 else ''
        val_str = nested_to_ts(v, indent + 2)
        lines.append(f'  "{k}": {val_str}{comma}')
    lines.append('}')
    return '\n'.join(lines)

# Create files for remaining namespaces
created = 0
for ns in remaining_ns:
    if ns in en_by_namespace:
        # EN
        nested_en = dict_to_nested_safe(en_by_namespace[ns], ns)
        ts_content = f"export default {nested_to_ts(nested_en)}\n"
        
        os.makedirs('locales/en', exist_ok=True)
        with open(f'locales/en/{ns}.ts', 'w', encoding='utf-8') as f:
            f.write(ts_content)
        
        # DE
        if ns in de_by_namespace:
            nested_de = dict_to_nested_safe(de_by_namespace[ns], ns)
            ts_content = f"export default {nested_to_ts(nested_de)}\n"
            
            os.makedirs('locales/de', exist_ok=True)
            with open(f'locales/de/{ns}.ts', 'w', encoding='utf-8') as f:
                f.write(ts_content)
        
        created += 1
        print(f"✅ {ns}")

print(f"\n🎉 Created {created} additional namespace files")
print("Total locale files now available for import")
