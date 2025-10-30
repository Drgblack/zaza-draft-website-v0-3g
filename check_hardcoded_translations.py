import os

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"
lang_context = os.path.join(base_path, "lib", "i18n", "language-context.tsx")

print("="*70)
print("CHECKING FOR HARDCODED TRANSLATIONS")
print("="*70)

if os.path.exists(lang_context):
    with open(lang_context, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if there are inline translations
    if 'pricing.free.price' in content:
        print("\n⚠️  Found hardcoded translations in language-context.tsx!")
        print("\nThis file has embedded translation objects.")
        print("We need to fix the corruption in THIS file, not just the JSON files!")
        
        # Show the relevant section
        lines = content.split('\n')
        in_translations = False
        start_line = 0
        
        for i, line in enumerate(lines):
            if 'translationsEn' in line or 'translationsDe' in line:
                in_translations = True
                start_line = i
            
            if in_translations and i < start_line + 200:
                if 'pricing.free.price' in line or 'pricing.comparison' in line:
                    print(f"\nLine {i+1}: {line}")
        
        # Check for corruption in this file
        print("\n" + "="*70)
        print("CHECKING FOR CORRUPTION IN LANGUAGE-CONTEXT.TSX")
        print("="*70)
        
        corruption_markers = ['Ã"Ã', 'â"œ', 'Ã©Â¼', 'Â']
        found_corruption = []
        
        for i, line in enumerate(lines, 1):
            for marker in corruption_markers:
                if marker in line:
                    found_corruption.append((i, line.strip()[:100]))
                    break
        
        if found_corruption:
            print(f"\n⚠️  Found {len(found_corruption)} lines with corruption:")
            for line_num, line_text in found_corruption[:10]:
                print(f"\n  Line {line_num}:")
                print(f"  {line_text}")
        else:
            print("\n✓ No corruption found in language-context.tsx")
    else:
        print("\n✓ No hardcoded translations found")
        print("   Translations are loaded from JSON files only")
else:
    print(f"\n✗ File not found: {lang_context}")

print("\n" + "="*70)
print("RECOMMENDATION")
print("="*70)
print("""
If language-context.tsx has hardcoded translations with corruption,
we need to fix THAT file instead of (or in addition to) the JSON files.

The app might be using these hardcoded fallback translations.
""")