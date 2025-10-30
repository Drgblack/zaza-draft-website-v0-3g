import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"
de_json_path = os.path.join(base_path, "locales", "de.json")

print("="*70)
print("EXPLORING DE.JSON STRUCTURE")
print("="*70)

with open(de_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Show top-level keys
print("\nTop-level keys:")
print("-"*70)
for key in data.keys():
    print(f"  - {key}")

# Check if 'pricing' exists
if 'pricing' in data:
    print("\n'pricing' structure:")
    print("-"*70)
    pricing = data['pricing']
    
    # Show all keys in pricing
    def show_structure(obj, indent=0):
        if isinstance(obj, dict):
            for key, value in obj.items():
                if isinstance(value, dict):
                    print("  " * indent + f"- {key}:")
                    show_structure(value, indent + 1)
                else:
                    # Truncate long values
                    val_str = str(value)
                    if len(val_str) > 50:
                        val_str = val_str[:47] + "..."
                    print("  " * indent + f"- {key}: {val_str}")
    
    show_structure(pricing, indent=1)

# Search for any strings containing €, ✓, ü, ä
print("\n" + "="*70)
print("SEARCHING FOR SPECIAL CHARACTERS")
print("="*70)

special_chars = ['€', '✓', '–', 'ü', 'ä']

def search_values(obj, path=""):
    results = []
    if isinstance(obj, dict):
        for key, value in obj.items():
            new_path = f"{path}.{key}" if path else key
            results.extend(search_values(value, new_path))
    elif isinstance(obj, str):
        for char in special_chars:
            if char in obj:
                results.append((path, obj, char))
    return results

results = search_values(data)

if results:
    print(f"\nFound {len(results)} strings with special characters:")
    print("-"*70)
    for path, value, char in results[:20]:  # Show first 20
        print(f"\nPath: {path}")
        print(f"Contains: {char}")
        print(f"Value: {value[:100]}...")
else:
    print("\n✗ No special characters found - they might have been lost!")