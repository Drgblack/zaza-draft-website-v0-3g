import json

# Read package.json
with open('package.json', 'r', encoding='utf-8') as f:
    pkg = json.load(f)

# Add the script
if 'scripts' not in pkg:
    pkg['scripts'] = {}

pkg['scripts']['ci:check-literals'] = 'node scripts/check-literals.js'

# Write back
with open('package.json', 'w', encoding='utf-8') as f:
    json.dump(pkg, f, indent=2, ensure_ascii=False)

print("✅ Added ci:check-literals script")
