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
    
    # Read with utf-8-sig to handle BOM
    try:
        with open(alt_locale_path, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        print("\nFile structure:")
        print("-"*70)
        print(json.dumps(data, indent=2, ensure_ascii=False))
        
        print("\n" + "="*70)
        print("CHECKING FOR CORRUPTION")
        print("="*70)
        
        # Recursively check all string values for corruption
        def check_corruption(obj, path=""):
            issues = []
            if isinstance(obj, dict):
                for key, value in obj.items():
                    new_path = f"{path}.{key}" if path else key
                    issues.extend(check_corruption(value, new_path))
            elif isinstance(obj, str):
                if 'Ã' in obj or 'Â' in obj:
                    issues.append((path, obj))
            return issues
        
        corrupted = check_corruption(data)
        
        if corrupted:
            print(f"\n⚠️  Found {len(corrupted)} corrupted strings:")
            for path, value in corrupted:
                print(f"\n  Path: {path}")
                print(f"  Value: {value}")
                print(f"  Bytes: {value.encode('utf-8').hex()}")
        else:
            print("\n✓ No corruption found in this file!")
            
    except Exception as e:
        print(f"\n✗ Error reading file: {e}")
else:
    print(f"\n✗ File not found: {alt_locale_path}")

# List all locale JSON files
print("\n" + "="*70)
print("ALL LOCALE FILES IN PROJECT")
print("="*70)

for root, dirs, files in os.walk(base_path):
    # Skip node_modules and .next
    if 'node_modules' in root or '.next' in root or '.git' in root:
        continue
    
    for file in files:
        if file.endswith('.json') and ('locale' in root.lower() or file == 'de.json' or file == 'en.json'):
            filepath = os.path.join(root, file)
            rel_path = os.path.relpath(filepath, base_path)
            
            # Check file size
            size = os.path.getsize(filepath)
            print(f"\n📄 {rel_path} ({size} bytes)")