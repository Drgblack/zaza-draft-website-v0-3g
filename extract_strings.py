import re, json

# Read the ai-literacy client
with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all hardcoded strings (between quotes, or text in JSX)
strings = []

# Pattern 1: Text between quotes (but not imports, not className, not keys)
quote_pattern = r'(?<!import\s)(?<!from\s)(?<!className[=:]\s?)(?<!key[=:]\s?)["\']([^"\']{10,})["\']'
for match in re.finditer(quote_pattern, content):
    text = match.group(1)
    # Skip if it's a className, URL, or code
    if not any(skip in text.lower() for skip in ['class', 'http', 'src=', 'href=', 'import', 'const', 'function']):
        strings.append(text)

# Pattern 2: JSX text nodes (text between > and <)
jsx_pattern = r'>\s*([A-Z][^<>{]+(?:\s+[^<>{]+)*)\s*<'
for match in re.finditer(jsx_pattern, content):
    text = match.group(1).strip()
    if len(text) > 5 and not text.startswith('{'):  # Ignore short text and template expressions
        strings.append(text)

# Remove duplicates and sort by length
unique_strings = sorted(set(strings), key=len, reverse=True)

print(f"📊 Found {len(unique_strings)} unique strings to translate\n")
print("="*80)
print("\n🔤 STRINGS TO TRANSLATE:\n")

for i, s in enumerate(unique_strings[:20], 1):  # Show first 20
    preview = s[:80] + "..." if len(s) > 80 else s
    print(f"{i:2}. {preview}")

if len(unique_strings) > 20:
    print(f"\n... and {len(unique_strings) - 20} more strings")

print("\n" + "="*80)
print("\n💾 Saving to file for translation...")

# Save to JSON for processing
with open('ai-literacy-strings-to-translate.json', 'w', encoding='utf-8') as f:
    json.dump(unique_strings, f, indent=2, ensure_ascii=False)

print("✅ Saved to: ai-literacy-strings-to-translate.json")
print("\nNext: I'll use Claude API to translate these!")
