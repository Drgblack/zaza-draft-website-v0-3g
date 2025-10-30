import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"
de_json_path = os.path.join(base_path, "locales", "de.json")

print("="*70)
print("VERIFYING CORRUPTION FIXES (FLAT JSON STRUCTURE)")
print("="*70)

with open(de_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Check specific keys that were corrupted
test_cases = [
    ('pricing.free.price', '0 €'),
    ('pricing.comparison.row5.free', '✓'),
    ('pricing.finalCta.trust', None),  # Just check for no corruption
]

print("\nChecking fixed values:")
print("-"*70)

all_good = True

for key, expected in test_cases:
    value = data.get(key, "KEY NOT FOUND")
    
    if expected is None:
        # Just check it doesn't have corruption markers
        has_corruption = any(char in str(value) for char in ['Ã', 'â', ' '])
        status = "✓" if not has_corruption else "✗"
        print(f"{status} {key}")
        print(f"   Value: {value[:100]}...")
        if has_corruption:
            all_good = False
    else:
        status = "✓" if value == expected else "✗"
        print(f"{status} {key}")
        print(f"   Expected: {expected}")
        print(f"   Got:      {value}")
        if value != expected:
            all_good = False
    print()

# Check for ANY remaining corruption in the entire file
print("="*70)
print("SCANNING ENTIRE FILE FOR CORRUPTION")
print("="*70)

corruption_found = []
corruption_markers = ['Ã"Ã', 'Â', 'Ã‡', 'â"œ', 'Ã©Â¼']

for key, value in data.items():
    if isinstance(value, str):
        for marker in corruption_markers:
            if marker in value:
                corruption_found.append((key, value))
                break

if corruption_found:
    print(f"\n✗ Found {len(corruption_found)} strings with remaining corruption:")
    print("-"*70)
    for key, value in corruption_found[:10]:  # Show first 10
        print(f"\nKey: {key}")
        print(f"Value: {value[:80]}...")
    all_good = False
else:
    print("\n✓ No corruption markers found in entire file!")

print("\n" + "="*70)
if all_good:
    print("✓✓✓ ALL CHECKS PASSED ✓✓✓")
    print("\nYour Next.js website should now display correctly!")
    print("\nNext steps:")
    print("  1. Start your dev server: npm run dev")
    print("  2. Open http://localhost:3000/pricing")
    print("  3. Switch to German (DE) language")
    print("  4. Verify pricing page displays correctly")
else:
    print("✗ Some issues detected. See details above.")
print("="*70)