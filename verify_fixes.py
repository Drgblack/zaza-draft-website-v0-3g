import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"
de_json_path = os.path.join(base_path, "locales", "de.json")

print("="*70)
print("VERIFYING CORRUPTION FIXES")
print("="*70)

with open(de_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Check the specific keys we fixed
test_cases = [
    ('pricing.free.price', '0 €'),
    ('pricing.premium.price', '12 €/Monat'),
    ('pricing.comparison.row5.free', '✓'),
    ('pricing.finalCta.trust', None),  # Will check this one separately
]

print("\nChecking fixed values:")
print("-"*70)

all_good = True

for key, expected in test_cases:
    keys = key.split('.')
    value = data
    for k in keys:
        value = value.get(k, {})
    
    if expected is None:
        # Just check it doesn't have corruption markers
        has_corruption = any(char in str(value) for char in ['Ã', 'â', ' '])
        status = "✓" if not has_corruption else "✗"
        print(f"{status} {key}")
        print(f"   Value: {value}")
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

print("="*70)
if all_good:
    print("✓ ALL CHECKS PASSED - No corruption detected!")
    print("\nYou can now run your development server:")
    print("  npm run dev")
else:
    print("✗ Some issues remain. Please share the output.")
print("="*70)