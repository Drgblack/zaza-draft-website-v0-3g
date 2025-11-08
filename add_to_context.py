import json

# Read translations
with open('ai-literacy-full-translations.json', 'r', encoding='utf-8') as f:
    translations = json.load(f)

# Read current language-context
with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find where to insert EN keys (after aiLiteracy.subtitle)
en_marker = '  "aiLiteracy.subtitle":'
en_insert_pos = content.find(en_marker)
if en_insert_pos == -1:
    print("❌ Could not find EN aiLiteracy.subtitle")
    exit(1)

# Find end of that line
en_line_end = content.find('\n', en_insert_pos)

# Build EN insertion
en_keys = []
for key, value in translations['en'].items():
    # Skip title and subtitle as they already exist
    if key not in ['aiLiteracy.title', 'aiLiteracy.subtitle']:
        en_keys.append(f'  "{key}": "{value}",')

en_insertion = '\n' + '\n'.join(en_keys)

# Insert EN keys
content = content[:en_line_end+1] + en_insertion + content[en_line_end+1:]

print(f"✅ Added {len(en_keys)} EN keys")

# Now do the same for DE
de_marker = '  "aiLiteracy.subtitle": "Bauen Sie Ihre KI-Expertise'
de_insert_pos = content.find(de_marker)
if de_insert_pos == -1:
    print("❌ Could not find DE aiLiteracy.subtitle")
    exit(1)

de_line_end = content.find('\n', de_insert_pos)

# Build DE insertion
de_keys = []
for key, value in translations['de'].items():
    if key not in ['aiLiteracy.title', 'aiLiteracy.subtitle']:
        de_keys.append(f'  "{key}": "{value}",')

de_insertion = '\n' + '\n'.join(de_keys)

# Insert DE keys
content = content[:de_line_end+1] + de_insertion + content[de_line_end+1:]

print(f"✅ Added {len(de_keys)} DE keys")

# Save
with open('lib/i18n/language-context.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n🎉 Translations added to language-context.tsx!")
print(f"Total new keys: {len(en_keys)} EN + {len(de_keys)} DE = {len(en_keys) + len(de_keys)}")
