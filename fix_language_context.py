import os

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"
lang_context = os.path.join(base_path, "lib", "i18n", "language-context.tsx")

print("="*70)
print("FIXING CORRUPTION IN LANGUAGE-CONTEXT.TSX")
print("="*70)

# All corruption patterns
CORRUPTION_PATTERNS = {
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xc2\xa9\xc3\x82\xc2\xbc': '€',      # Euro
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\xb6': '–',          # En-dash (was showing as checkmark)
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\x83\xc2\xb3': '–',  # En-dash
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\x83\xc2\xa6': '–',  # En-dash variant
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\x83\xc2\xb4': '—',  # Em-dash
    b'\xc3\xa2\xe2\x80\x9d\xc5\x93\xc3\xa2\xe2\x80\xa2': 'ü',          # ü
    b'\xc3\xa2\xe2\x80\x9d\xc5\x93\xc3\xa4': 'ä',                      # ä
    b'\xc3\xa2\xe2\x80\x9d\xc5\x93\xc3\xb6': 'ö',                      # ö
}

# Read the file as bytes
with open(lang_context, 'rb') as f:
    content = f.read()

original_content = content
fixes = []

# Apply all fixes
for corrupted_bytes, correct_char in CORRUPTION_PATTERNS.items():
    count = content.count(corrupted_bytes)
    if count > 0:
        correct_bytes = correct_char.encode('utf-8')
        content = content.replace(corrupted_bytes, correct_bytes)
        fixes.append((correct_char, count))
        print(f"✓ Fixed {count}x occurrences of '{correct_char}'")

if content != original_content:
    # Save the fixed file
    with open(lang_context, 'wb') as f:
        f.write(content)
    
    print(f"\n✓ File saved successfully!")
    print(f"✓ Total fix types applied: {len(fixes)}")
else:
    print("\n• No corruption found in file")

# Verify the fixes
print("\n" + "="*70)
print("VERIFICATION")
print("="*70)

with open(lang_context, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Check specific lines that were corrupted
test_lines = [
    (1293, '0 €'),
    (1393, '0 €'),
    (1394, '12 €'),
]

print("\nChecking fixed lines:")
all_good = True
for line_num, expected_substr in test_lines:
    if line_num <= len(lines):
        line = lines[line_num - 1]
        if expected_substr in line:
            print(f"✓ Line {line_num}: Contains '{expected_substr}'")
        else:
            print(f"✗ Line {line_num}: Missing '{expected_substr}'")
            print(f"  Actual: {line.strip()[:80]}")
            all_good = False

# Check for any remaining corruption
corruption_markers = ['Ã"Ã', 'â"œ', 'Ã©Â¼']
remaining = []
for i, line in enumerate(lines, 1):
    for marker in corruption_markers:
        if marker in line:
            remaining.append(i)
            break

if remaining:
    print(f"\n⚠️  Still found corruption on lines: {remaining[:10]}")
    all_good = False
else:
    print("\n✓ No corruption markers found!")

print("\n" + "="*70)
if all_good:
    print("✓✓✓ LANGUAGE-CONTEXT.TSX FIXED! ✓✓✓")
    print("\nNEXT STEPS:")
    print("  1. Remove-Item -Recurse -Force .next")
    print("  2. npm run dev")
    print("  3. Test in Opera private window")
    print("  4. It WILL work this time! 🎉")
else:
    print("⚠️  Some issues may remain")
print("="*70)