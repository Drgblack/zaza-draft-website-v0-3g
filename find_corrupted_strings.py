import re
import sys

# Read the file
file_path = r"C:\Users\User\zaza-draft-website-v0-3g\lib\i18n\language-context.tsx"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
except:
    print("Error reading file. Make sure the path is correct.")
    sys.exit(1)

# Find all key-value pairs with non-ASCII characters
pattern = r'"([^"]+)":\s*"([^"]*)"'
matches = re.findall(pattern, content)

corrupted = {}
for key, value in matches:
    # Check if value contains non-ASCII characters (likely corruption)
    if any(ord(char) > 127 for char in value):
        corrupted[key] = value

print(f"\n{'='*80}")
print(f"Found {len(corrupted)} corrupted strings")
print(f"{'='*80}\n")

# Common corruptions and their fixes
replacements = {
    'Ã"Ã‡ö': '✓',  # or could be a checkmark
    'Ã"Ã‡Ã¦': '-',  # dash/hyphen
    'â"œâ•': 'ü',
    'â"œÃ±': 'ä', 
    'â"œÂ£': 'Ü',
    'kâ"œâ•ndbar': 'kündbar',
    'Lehrkrâ"œÃ±fte': 'Lehrkräfte',
    'fâ"œâ•r': 'für',
    'Jâ"œÃ±hrlich': 'Jährlich',
    'WhatÃ"Ã‡Ös': "What's",
    'HallucinationÃ"Ã‡Ã¦safe': 'Hallucination-safe',
    'RealÃ"Ã‡Ã¦world': 'Real-world',
}

for i, (key, value) in enumerate(sorted(corrupted.items()), 1):
    print(f"{i}. Key: {key}")
    print(f"   Current: {repr(value)}")
    
    # Try to suggest a fix
    suggested = value
    for corrupt, fix in replacements.items():
        if corrupt in value:
            suggested = value.replace(corrupt, fix)
            break
    
    if suggested != value:
        print(f"   Suggested: {suggested}")
    else:
        print(f"   Suggested: [NEEDS MANUAL FIX]")
    
    print()

print(f"\n{'='*80}")
print(f"Total corrupted entries: {len(corrupted)}")
print(f"{'='*80}\n")

# Generate a find/replace list for VS Code
print("\nFor VS Code Find & Replace (use these exact strings):")
print("="*80)
for corrupt, fix in replacements.items():
    count = sum(1 for v in corrupted.values() if corrupt in v)
    if count > 0:
        print(f"\nFind:    {repr(corrupt)}")
        print(f"Replace: {repr(fix)}")
        print(f"(Found in {count} entries)")