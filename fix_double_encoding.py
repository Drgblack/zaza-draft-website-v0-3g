import os
import json
import re

# The exact corruption patterns we found
CORRUPTION_PATTERNS = {
    # Euro sign corruption
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xc2\xa9\xc3\x82\xc2\xbc': '€',
    
    # Checkmark corruption
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\xb6': '✓',
    
    # En-dash corruption (–)
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\x83\xc2\xb3': '–',
    
    # Another dash variant
    b'\xc3\x83\xe2\x80\x9d\xc3\x83\xe2\x80\xa1\xc3\x83\xc2\xa6': '–',
    
    # ü corruption (für)
    b'\xc3\xa2\xe2\x80\x9d\xc5\x93\xc3\xa2\xe2\x80\xa2': 'ü',
    
    # ä corruption
    b'\xc3\xa2\xe2\x80\x9d\xc5\x93\xc3\xa4': 'ä',
}

def fix_file_encoding(filepath):
    """Fix double-encoding corruption in a JSON file"""
    print(f"\nProcessing: {filepath}")
    
    try:
        # Read the file as bytes
        with open(filepath, 'rb') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all corruption fixes
        for corrupted_bytes, correct_char in CORRUPTION_PATTERNS.items():
            if corrupted_bytes in content:
                correct_bytes = correct_char.encode('utf-8')
                content = content.replace(corrupted_bytes, correct_bytes)
                print(f"  ✓ Fixed: {corrupted_bytes.hex()} -> {correct_char}")
        
        # If content changed, save it
        if content != original_content:
            # Verify it's valid JSON before saving
            try:
                data = json.loads(content.decode('utf-8'))
                
                # Save with pretty printing
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                
                print(f"  ✓ File saved successfully")
                return True
            except json.JSONDecodeError as e:
                print(f"  ✗ JSON validation failed: {e}")
                return False
        else:
            print(f"  • No corruption found")
            return False
            
    except Exception as e:
        print(f"  ✗ Error processing file: {e}")
        return False

def main():
    base_path = r"C:\Users\User\zaza-draft-website-v0-3g"
    
    print("="*70)
    print("FIXING DOUBLE-ENCODING CORRUPTION")
    print("="*70)
    
    files_to_fix = [
        os.path.join(base_path, "locales", "de.json"),
    ]
    
    fixed_count = 0
    
    for filepath in files_to_fix:
        if os.path.exists(filepath):
            if fix_file_encoding(filepath):
                fixed_count += 1
        else:
            print(f"\n✗ File not found: {filepath}")
    
    print("\n" + "="*70)
    print(f"✓ Fixed {fixed_count} file(s)")
    print("="*70)

if __name__ == "__main__":
    main()