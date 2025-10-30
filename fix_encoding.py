import re
import sys

# Read the file
file_path = r"C:\Users\User\zaza-draft-website-v0-3g\lib\i18n\language-context.tsx"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
except:
    print("Error reading file.")
    sys.exit(1)

# Comprehensive mapping of corrupted characters to correct ones
replacements = {
    # Common German characters
    'â"œÃ±': 'ä',
    'â"œâ•': 'ü',
    'â"œÃ‚': 'ö',
    'â"œÂ£': 'Ü',
    'â"œÃ†': 'Ö',
    'â"œ\x84': 'Ä',
    
    # Special punctuation
    'Ã"Ã‡ö': '✓',
    'Ã"Ã‡Ã¦': '-',
    'Ã"Ã‡Ã³': '·',
    'Ã"Ã‡Ã´': '—',
    'Ã"Ã©Â¼': '€',
    
    # Additional patterns
    'â"œÃ‡': 'ß',
    'Ã"ÂÂ': '"',
    '\x9d': '',
    '\x9c': '',
}

# Apply all replacements
fixed_content = content
for corrupt, correct in replacements.items():
    fixed_content = fixed_content.replace(corrupt, correct)

# Write the fixed content back
try:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    print(f"✓ Successfully fixed encoding in {file_path}")
    print(f"✓ Applied {len(replacements)} character replacements")
except Exception as e:
    print(f"Error writing file: {e}")
    sys.exit(1)