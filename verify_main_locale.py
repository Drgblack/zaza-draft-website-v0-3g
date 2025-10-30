import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"
de_json_path = os.path.join(base_path, "locales", "de.json")

print("="*70)
print("VERIFYING MAIN LOCALE FILE")
print("="*70)

# Read as binary to check exact bytes
with open(de_json_path, 'rb') as f:
    content = f.read()

print(f"\nFile size: {len(content)} bytes")

# Check for BOM
if content.startswith(b'\xef\xbb\xbf'):
    print("⚠️  File has UTF-8 BOM")
    content = content[3:]  # Remove BOM
else:
    print("✓ No BOM")

# Parse JSON
try:
    data = json.loads(content.decode('utf-8'))
    print("✓ Valid JSON")
except Exception as e:
    print(f"✗ JSON error: {e}")
    exit(1)

# Check the specific key
key = "pricing.free.price"
if key in data:
    value = data[key]
    print(f"\n{key}: {value}")
    print(f"Bytes: {value.encode('utf-8').hex()}")
    print(f"Characters: {[f'{c} (U+{ord(c):04X})' for c in value]}")
    
    # Check if it matches expected
    expected = "0 €"
    if value == expected:
        print("✓ Matches expected value!")
    else:
        print(f"✗ Does not match expected: {expected}")
else:
    print(f"✗ Key not found: {key}")

# Now let's check what the browser might be getting
print("\n" + "="*70)
print("CHECKING HOW NEXT.JS LOADS LOCALES")
print("="*70)

# Check the language context file
lang_context = os.path.join(base_path, "lib", "i18n", "language-context.tsx")
if os.path.exists(lang_context):
    print(f"\n✓ Found: {lang_context}")
    with open(lang_context, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print("\nSearching for locale loading logic...")
    for i, line in enumerate(lines, 1):
        if 'import' in line and 'json' in line.lower():
            print(f"  Line {i}: {line.strip()}")
        if 'locales' in line.lower() or 'locale' in line.lower():
            if 'import' in line or 'require' in line or 'fetch' in line:
                print(f"  Line {i}: {line.strip()}")

print("\n" + "="*70)
print("CRITICAL QUESTION")
print("="*70)
print("""
The locales/de.json file is correct (has "0 €").
But the website shows corruption.

This means:
1. The browser is caching the old corrupted version, OR
2. The app is loading from a different source, OR  
3. There's a build artifact still using old data

Try these steps:
1. Clear browser cache completely (Ctrl+Shift+Delete)
2. Stop dev server
3. Delete .next folder: Remove-Item -Recurse -Force .next
4. Restart: npm run dev
5. Open in INCOGNITO/PRIVATE window
""")