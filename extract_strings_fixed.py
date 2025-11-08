import re, json

# Read the ai-literacy client
with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

strings = []

# Find strings in JSX text nodes: >text
jsx_pattern = r'>([^<>{}]+)<'
for match in re.finditer(jsx_pattern, content):
    text = match.group(1).strip()
    # Must be actual text (not empty, not just whitespace, starts with letter)
    if len(text) > 8 and text[0].isalpha():
        strings.append(text)

# Find strings in quotes (simple approach)
quote_pattern = r'["\']([^"\']{15,})["\']'
for match in re.finditer(quote_pattern, content):
    text = match.group(1)
    # Skip technical strings
    if not any(x in text for x in ['className', 'http', '/', 'px-', 'py-', 'bg-', 'text-', 'import', 'const', 'function', 'return', '.tsx', '.ts', '.js']):
        if text[0].isalpha():  # Starts with letter
            strings.append(text)

# Remove duplicates and sort
unique_strings = sorted(set(strings), key=len, reverse=True)

print(f"📊 Found {len(unique_strings)} unique strings\n")
print("="*80)
print("\n🔤 TOP 20 STRINGS TO TRANSLATE:\n")

for i, s in enumerate(unique_strings[:20], 1):
    preview = s[:80] + "..." if len(s) > 80 else s
    print(f"{i:2}. {preview}")

if len(unique_strings) > 20:
    print(f"\n... and {len(unique_strings) - 20} more")

print("\n" + "="*80)

# Save all strings
with open('ai-literacy-strings.json', 'w', encoding='utf-8') as f:
    json.dump(unique_strings, f, indent=2, ensure_ascii=False)

print("\n✅ Saved to: ai-literacy-strings.json")
print(f"📝 Total strings: {len(unique_strings)}")
