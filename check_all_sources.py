import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"

print("="*70)
print("CHECKING ALL LOCALE FILES FOR CORRUPTION")
print("="*70)

# Check both locale files
locale_files = [
    os.path.join(base_path, "locales", "de.json"),
    os.path.join(base_path, "locales", "en.json"),
]

for filepath in locale_files:
    print(f"\n{'='*70}")
    print(f"FILE: {os.path.basename(filepath)}")
    print('='*70)
    
    if not os.path.exists(filepath):
        print("✗ File not found!")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Check the specific pricing.free.price key
    price_key = "pricing.free.price"
    if price_key in data:
        value = data[price_key]
        print(f"\n{price_key}: {value}")
        print(f"Bytes: {value.encode('utf-8').hex()}")
        
        # Check for corruption
        has_corruption = 'Ã' in value or 'Â' in value
        if has_corruption:
            print("⚠️  CORRUPTION DETECTED!")
        else:
            print("✓ Clean")
    else:
        print(f"✗ Key '{price_key}' not found!")

# Also check if there's a cached or compiled version
print("\n" + "="*70)
print("CHECKING FOR CACHED/COMPILED FILES")
print("="*70)

possible_cache_locations = [
    os.path.join(base_path, ".next"),
    os.path.join(base_path, "node_modules", ".cache"),
    os.path.join(base_path, "public", "locales"),
]

for cache_dir in possible_cache_locations:
    if os.path.exists(cache_dir):
        print(f"\n✓ Found: {cache_dir}")
    else:
        print(f"\n✗ Not found: {cache_dir}")

print("\n" + "="*70)
print("RECOMMENDATION")
print("="*70)
print("""
If the de.json file is clean but the website still shows corruption,
the issue might be:

1. Browser cache - Try hard refresh (Ctrl+Shift+R)
2. Next.js cache - Delete .next folder and restart
3. The locale file being read is different from the one we fixed

Try these commands:
  1. Stop the dev server (Ctrl+C)
  2. Remove the Next.js cache: rmdir /s .next
  3. Restart: npm run dev
  4. Hard refresh browser: Ctrl+Shift+R
""")