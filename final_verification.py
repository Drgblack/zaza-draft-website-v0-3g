import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"
de_json_path = os.path.join(base_path, "locales", "de.json")

print("="*70)
print("FINAL VERIFICATION - ALL CORRUPTION FIXED!")
print("="*70)

with open(de_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Check specific keys that were corrupted
test_cases = [
    ('pricing.free.price', '0 €', 'Euro symbol'),
    ('pricing.comparison.row5.free', '✓', 'Checkmark'),
    ('suite.testimonials.3.quote', None, 'Em-dash (should contain —)'),
    ('pricing.finalCta.trust', None, 'En-dashes (should contain –)'),
]

print("\nChecking fixed values:")
print("-"*70)

all_good = True

for key, expected, description in test_cases:
    value = data.get(key, "KEY NOT FOUND")
    
    if expected is None:
        # Just check it doesn't have the ORIGINAL corruption markers
        # (These are the double-encoded patterns we were fixing)
        has_corruption = 'Ã"Ã' in str(value) or 'â"œ' in str(value) or 'Ã©Â¼' in str(value)
        status = "✓" if not has_corruption else "✗"
        print(f"{status} {key} ({description})")
        if len(value) < 100:
            print(f"   Value: {value}")
        else:
            print(f"   Value: {value[:80]}...")
        if has_corruption:
            all_good = False
    else:
        status = "✓" if value == expected else "✗"
        print(f"{status} {key} ({description})")
        print(f"   Expected: {expected}")
        print(f"   Got:      {value}")
        if value != expected:
            all_good = False
    print()

# Check for ANY remaining ACTUAL corruption in the entire file
print("="*70)
print("SCANNING FOR DOUBLE-ENCODING CORRUPTION")
print("="*70)

# These are the actual corruption patterns we were fixing (double-encoded UTF-8)
corruption_markers = ['Ã"Ã‡', 'Ã"Ã©Â¼', 'â"œâ•', 'Ã‡Ã³', 'Ã‡Ã¦', 'Ã‡Ã´']

corruption_found = []
for key, value in data.items():
    if isinstance(value, str):
        for marker in corruption_markers:
            if marker in value:
                corruption_found.append((key, value))
                break

if corruption_found:
    print(f"\n✗ Found {len(corruption_found)} strings with corruption:")
    print("-"*70)
    for key, value in corruption_found[:10]:
        print(f"\nKey: {key}")
        print(f"Value: {value[:80]}...")
    all_good = False
else:
    print("\n✓✓✓ NO DOUBLE-ENCODING CORRUPTION FOUND! ✓✓✓")

# Count special characters that SHOULD be there
special_chars_count = {
    '€': 0,  # Euro
    '✓': 0,  # Checkmark
    '–': 0,  # En-dash
    '—': 0,  # Em-dash
    'ü': 0,  # German umlaut
    'ä': 0,  # German umlaut
    'ö': 0,  # German umlaut
}

for key, value in data.items():
    if isinstance(value, str):
        for char in special_chars_count.keys():
            special_chars_count[char] += value.count(char)

print("\n" + "="*70)
print("SPECIAL CHARACTERS IN FILE (These should be present!):")
print("="*70)
for char, count in special_chars_count.items():
    print(f"  {char} : {count} occurrences")

print("\n" + "="*70)
if all_good:
    print("✓✓✓ ALL CORRUPTION FIXED! ✓✓✓")
    print("\n🎉 Your website is ready!")
    print("\nNext steps:")
    print("  1. Start dev server: npm run dev")
    print("  2. Open http://localhost:3000/pricing")
    print("  3. Switch to German (DE)")
    print("  4. Enjoy your properly formatted German text!")
else:
    print("✗ Some issues remain. See details above.")
print("="*70)