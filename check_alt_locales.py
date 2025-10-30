import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"

print("="*70)
print("CHECKING ALTERNATE LOCALE LOCATION")
print("="*70)

# The alternate locale file location
alt_locale_path = os.path.join(base_path, "lib", "i18n", "locales", "de", "pricing.json")

if os.path.exists(alt_locale_path):
    print(f"\n✓ Found: {alt_locale_path}")
    
    # Read and check for corruption
    with open(alt_locale_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print("\nChecking for corruption...")
    print("-"*70)
    
    # Check the price field
    if 'price' in data:
        price = data['price']
        print(f"Current price value: {price}")
        print(f"Bytes: {price.encode('utf-8').hex()}")
        
        has_corruption = 'Ã' in price or 'Â' in price
        if has_corruption:
            print("⚠️  CORRUPTION FOUND!")
        else:
            print("✓ No corruption")
    
    # Show full structure
    print("\nFull file structure:")
    print("-"*70)
    print(json.dumps(data, indent=2, ensure_ascii=False)[:500])
else:
    print(f"\n✗ File not found: {alt_locale_path}")
    
    # List what's in lib/i18n/locales/de/
    de_dir = os.path.join(base_path, "lib", "i18n", "locales", "de")
    if os.path.exists(de_dir):
        print(f"\nFiles in {de_dir}:")
        for file in os.listdir(de_dir):
            print(f"  - {file}")

# Also check if there are other locale files we need to fix
print("\n" + "="*70)
print("SEARCHING FOR ALL LOCALE FILES")
print("="*70)

locale_dirs = [
    os.path.join(base_path, "locales"),
    os.path.join(base_path, "lib", "i18n", "locales"),
]

for loc_dir in locale_dirs:
    if os.path.exists(loc_dir):
        print(f"\n📁 {loc_dir}")
        for root, dirs, files in os.walk(loc_dir):
            for file in files:
                if file.endswith('.json'):
                    filepath = os.path.join(root, file)
                    rel_path = os.path.relpath(filepath, base_path)
                    print(f"   - {rel_path}")