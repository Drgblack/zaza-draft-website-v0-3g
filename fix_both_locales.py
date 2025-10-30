import os
import json

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"

# Both locale files
files_to_fix = {
    'en': os.path.join(base_path, "locales", "en.json"),
    'de': os.path.join(base_path, "locales", "de.json"),
}

# The corruption patterns we found earlier
CORRUPTION_PATTERNS = {
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xc2\xa9\xc3\x82\xc2\xbc': '€',      # Euro
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\xb6': '✓',          # Checkmark
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\x83\xc2\xb3': '–',  # En-dash
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\x83\xc2\xa6': '–',  # En-dash variant
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\x83\xc2\xb4': '—',  # Em-dash
    b'\xc3\xa2\xe2\x80\x9d\xc5\x93\xc3\xa2\xe2\x80\xa2': 'ü',          # ü
    b'\xc3\xa2\xe2\x80\x9d\xc5\x93\xc3\xa4': 'ä',                      # ä
}

print("="*70)
print("FIXING BOTH ENGLISH AND GERMAN LOCALE FILES")
print("="*70)

total_fixed = 0

for lang, filepath in files_to_fix.items():
    print(f"\n{'='*70}")
    print(f"Processing: {lang.upper()} - {os.path.basename(filepath)}")
    print('='*70)
    
    try:
        # Read as bytes
        with open(filepath, 'rb') as f:
            content = f.read()
        
        original_content = content
        fixes_applied = []
        
        # Apply all corruption fixes
        for corrupted_bytes, correct_char in CORRUPTION_PATTERNS.items():
            count = content.count(corrupted_bytes)
            if count > 0:
                correct_bytes = correct_char.encode('utf-8')
                content = content.replace(corrupted_bytes, correct_bytes)
                fixes_applied.append((correct_char, count))
                print(f"  ✓ Fixed {count}x: '{correct_char}'")
        
        if content != original_content:
            # Verify it's valid JSON
            try:
                data = json.loads(content.decode('utf-8'))
                
                # Save with proper formatting
                with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                
                print(f"  ✓ Saved successfully")
                print(f"  ✓ Applied {len(fixes_applied)} fix types")
                total_fixed += 1
            except json.JSONDecodeError as e:
                print(f"  ✗ JSON validation failed: {e}")
        else:
            print(f"  • No corruption found")
    
    except Exception as e:
        print(f"  ✗ Error: {e}")

print("\n" + "="*70)
print("VERIFICATION")
print("="*70)

# Verify both files
for lang, filepath in files_to_fix.items():
    print(f"\nChecking {lang.upper()}:")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Check some key values
    test_keys = [
        "pricing.free.price",
        "pricing.comparison.row5.free",
        "pricing.finalCta.trust",
    ]
    
    has_corruption = False
    for key in test_keys:
        if key in data:
            value = data[key]
            # Check for corruption markers
            if any(marker in str(value) for marker in ['Ã"Ã', 'â"œ', 'Ã©Â¼']):
                print(f"  ✗ {key}: Still corrupted")
                print(f"    Value: {value}")
                has_corruption = True
    
    if not has_corruption:
        print(f"  ✓ No corruption detected!")

print("\n" + "="*70)
if total_fixed > 0:
    print(f"✓ Fixed {total_fixed} file(s)")
    print("\nNEXT STEPS:")
    print("  1. Remove-Item -Recurse -Force .next")
    print("  2. npm run dev")
    print("  3. Hard refresh browser (Ctrl+Shift+R)")
    print("  4. Test BOTH English and German pages")
else:
    print("No fixes needed or files already clean")
print("="*70)