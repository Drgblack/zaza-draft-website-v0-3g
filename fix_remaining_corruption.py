import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"
de_json_path = os.path.join(base_path, "locales", "de.json")

print("="*70)
print("ANALYZING REMAINING CORRUPTION")
print("="*70)

with open(de_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Find the corrupted key
key = "suite.testimonials.3.quote"
value = data.get(key, "")

print(f"\nCorrupted string:")
print(f"Key: {key}")
print(f"Value: {value}")
print(f"\nBytes: {value.encode('utf-8')}")

# Find the corruption pattern
corrupted_part = "Ã\"Ã‡Ã´"
if corrupted_part in value:
    idx = value.index(corrupted_part)
    print(f"\nContext around corruption:")
    print(f"Before: ...{value[max(0, idx-20):idx]}")
    print(f"Corrupted: {corrupted_part}")
    print(f"After: {value[idx+len(corrupted_part):min(len(value), idx+len(corrupted_part)+20)]}")
    
    # Get the exact bytes
    corrupted_bytes = corrupted_part.encode('utf-8')
    print(f"\nCorrupted bytes (hex): {corrupted_bytes.hex()}")

# Looking at context "kommuniziere mehr [?] mit weniger Stress"
# This is likely an em-dash (—) or another dash variant
print("\n" + "="*70)
print("LIKELY MEANINGS:")
print("="*70)
print("Given context: 'kommuniziere mehr [?] mit weniger Stress'")
print("This is likely: — (em-dash, U+2014)")
print("Or possibly: – (en-dash, U+2013)")
print("Or simply: - (hyphen-minus)")

# Now let's fix it
print("\n" + "="*70)
print("APPLYING FIX")
print("="*70)

# The new corruption pattern to fix
NEW_CORRUPTION = {
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\x83\xc2\xb4': '—',  # em-dash
}

with open(de_json_path, 'rb') as f:
    content = f.read()

original_content = content
fixed = False

for corrupted_bytes, correct_char in NEW_CORRUPTION.items():
    if corrupted_bytes in content:
        correct_bytes = correct_char.encode('utf-8')
        content = content.replace(corrupted_bytes, correct_bytes)
        print(f"✓ Fixed: {corrupted_bytes.hex()} -> {correct_char}")
        fixed = True

if fixed:
    # Verify it's valid JSON
    try:
        data = json.loads(content.decode('utf-8'))
        
        # Save with pretty printing
        with open(de_json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print("✓ File saved successfully")
        
        # Verify the fix
        print("\n" + "="*70)
        print("VERIFYING FIX")
        print("="*70)
        value = data.get("suite.testimonials.3.quote", "")
        print(f"New value: {value[:100]}...")
        
        has_corruption = any(marker in value for marker in ['Ã"Ã', 'Â', 'Ã‡', 'â"œ'])
        if has_corruption:
            print("✗ Still has corruption!")
        else:
            print("✓ Corruption removed!")
            
    except json.JSONDecodeError as e:
        print(f"✗ JSON validation failed: {e}")
else:
    print("✗ Pattern not found in file")