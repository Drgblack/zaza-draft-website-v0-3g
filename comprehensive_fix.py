import json
import os

def fix_encoding(text):
    """Apply all known encoding fixes using hex escapes"""
    
    # Use hex codes to avoid encoding issues in the script itself
    replacements = [
        # Complex sequences
        ('Ã"Ã‡Ã¦', '-'),
        ('Ã"Ã‡ö', '✓'),
        ('Ã"Ã‡Ã³', '·'),
        ('Ã"Ã‡Ã´', '—'),
        ('Ã"Ã©Â¼', '€'),
        
        # German umlauts - encoded as bytes
        ('\xe2\x94\x9c\xc3\xb1', 'ä'),  # â"œÃ±
        ('\xe2\x94\x9c\xe2\x95', 'ü'),  # â"œâ•
        ('\xe2\x94\x9c\xc3\x82', 'ö'),  # â"œÃ‚
        ('\xe2\x94\x9c\xc2\xa3', 'Ü'),  # â"œÂ£
        ('\xe2\x94\x9c\xc3\x86', 'Ö'),  # â"œÃ†
        ('\xe2\x94\x9c\xc3\xa4', 'Ä'),  # â"œä
        
        # Simpler patterns
        ('Ã±', 'ä'),
        ('Ã‚', 'ö'),
        ('Â£', 'Ü'),
        
        # Control characters
        ('\x9d', ''),
        ('\x9c', ''),
    ]
    
    for old, new in replacements:
        text = text.replace(old, new)
    
    return text

def fix_json_file(filepath):
    """Fix encoding in a JSON file"""
    print(f"\nProcessing: {filepath}")
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        original_content = content
        fixed_content = fix_encoding(content)
        
        # Validate JSON
        try:
            json.loads(fixed_content)
        except json.JSONDecodeError as e:
            print(f"  ⚠️  Warning: Not valid JSON after fix: {e}")
            return False
        
        if fixed_content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            
            changes = len([1 for o, n in zip(original_content, fixed_content) if o != n])
            print(f"  ✓ Fixed {changes} characters")
            return True
        else:
            print(f"  • No changes needed")
            return False
            
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def fix_tsx_file(filepath):
    """Fix encoding in a TypeScript file"""
    print(f"\nProcessing: {filepath}")
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        original_content = content
        fixed_content = fix_encoding(content)
        
        if fixed_content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            
            changes = len([1 for o, n in zip(original_content, fixed_content) if o != n])
            print(f"  ✓ Fixed {changes} characters")
            return True
        else:
            print(f"  • No changes needed")
            return False
            
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

# Main
print("="*70)
print("COMPREHENSIVE ENCODING FIX")
print("="*70)

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"

files = [
    os.path.join(base_path, "locales", "de.json"),
    os.path.join(base_path, "locales", "en.json"),
    os.path.join(base_path, "lib", "i18n", "language-context.tsx"),
]

fixed_count = 0
for filepath in files:
    if filepath.endswith('.json'):
        if fix_json_file(filepath):
            fixed_count += 1
    elif filepath.endswith('.tsx'):
        if fix_tsx_file(filepath):
            fixed_count += 1

print("\n" + "="*70)
print(f"✓ Fixed {fixed_count} file(s)")
print("="*70)

if fixed_count > 0:
    print("\nNext steps:")
    print("1. git add locales/de.json locales/en.json lib/i18n/language-context.tsx")
    print("2. git commit -m 'fix: comprehensive encoding fix'")
    print("3. git push origin update-company-pages")