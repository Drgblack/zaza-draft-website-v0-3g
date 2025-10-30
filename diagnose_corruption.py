import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"

# Check de.json for corruption
de_json_path = os.path.join(base_path, "locales", "de.json")

print("="*70)
print("ANALYZING ACTUAL CORRUPTION PATTERNS")
print("="*70)

with open(de_json_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Look for specific strings we know are corrupted from screenshots
test_keys = [
    '"pricing.free.price"',
    '"pricing.premium.price"',
    '"pricing.comparison.row5.free"',
    '"pricing.finalCta.trust"',
]

print("\nSearching for corrupted strings in de.json:")
print("-"*70)

for key in test_keys:
    if key in content:
        # Find the value for this key
        start = content.find(key)
        if start != -1:
            # Find the value (everything between the next " and the closing ")
            value_start = content.find('"', start + len(key) + 1) + 1
            value_end = content.find('"', value_start)
            value = content[value_start:value_end]
            
            # Show the value and its bytes
            print(f"\nKey: {key}")
            print(f"Value: {value}")
            print(f"Bytes: {value.encode('utf-8')}")
            
            # Check if it has non-ASCII
            has_non_ascii = any(ord(c) > 127 for c in value)
            if has_non_ascii:
                print("  ⚠️  Contains non-ASCII characters")
                # Show which characters are problematic
                for i, c in enumerate(value):
                    if ord(c) > 127:
                        print(f"     Position {i}: '{c}' (U+{ord(c):04X})")

print("\n" + "="*70)
print("Now let's check what should be there:")
print("="*70)

# Show what we expect vs what we have
expected = {
    'pricing.free.price': '0 €',
    'pricing.premium.price': '12 €/month',
    'pricing.comparison.row5.free': '✓',
}

print("\nExpected values:")
for key, val in expected.items():
    print(f"  {key}: {val}")