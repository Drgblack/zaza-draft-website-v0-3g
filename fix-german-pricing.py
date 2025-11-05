import re

# Read the file
with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix encoding issues - replace garbled characters
encoding_fixes = {
    'Ã¤': 'ä',
    'Ã¼': 'ü',
    'Ã¶': 'ö',
    'Ã¼': 'ü',
    'Ã¤': 'ä',
    'â€"': '—',
    'â€¢': '•',
    'â€ž': '„',
    'â€œ': '"',
    'â€˜': ''',
    'â€™': ''',
    'Ã': 'ß',
}

# Process each line
fixed_lines = []
skip_next = False

for i, line in enumerate(lines, 1):
    # Skip the comment lines at 1084-1085
    if i in [1084, 1085]:
        continue
    
    # Fix encoding in this line
    fixed_line = line
    for wrong, right in encoding_fixes.items():
        fixed_line = fixed_line.replace(wrong, right)
    
    fixed_lines.append(fixed_line)

# Write back
with open('lib/i18n/language-context.tsx', 'w', encoding='utf-8') as f:
    f.writelines(fixed_lines)

print("✅ Fixed:")
print("  - Removed comment lines (1084-1085)")
print("  - Fixed encoding issues in German text")
print("  - File saved with proper UTF-8 encoding")
