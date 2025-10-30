import re

# Read the file
file_path = r"C:\Users\User\zaza-draft-website-v0-3g\lib\i18n\language-context.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Sample some strings that should be fixed
test_strings = [
    ('pricing.comparison.row5.free', 'Should be: ✓'),
    ('pricing.comparison.row6.premium', 'Should be: ✓'),
    ('about.nav.founder', 'Should contain: Gründer'),
    ('about.nav.title', 'Should contain: Über'),
    ('pricing.premium.guarantee', 'Should contain: 30-Tage Geld-zurück-Garantie'),
]

print("\n" + "="*80)
print("VERIFICATION RESULTS")
print("="*80 + "\n")

all_good = True
pattern = r'"([^"]+)":\s*"([^"]*)"'
matches = dict(re.findall(pattern, content))

for key, expected in test_strings:
    if key in matches:
        value = matches[key]
        # Check if it contains any corruption markers
        has_corruption = any(bad in value for bad in ['â"œ', 'Ã"', 'Ã±', 'Ã‚', 'Â£'])
        
        if has_corruption:
            print(f"❌ STILL CORRUPTED: {key}")
            print(f"   Current: {repr(value)}")
            print(f"   {expected}\n")
            all_good = False
        else:
            print(f"✓ FIXED: {key}")
            print(f"   Current: {value}")
            print(f"   {expected}\n")

if all_good:
    print("="*80)
    print("✓ ALL SAMPLES LOOK GOOD! Encoding appears to be fixed.")
    print("="*80)
else:
    print("="*80)
    print("❌ Some strings still have corruption. May need additional fixes.")
    print("="*80)