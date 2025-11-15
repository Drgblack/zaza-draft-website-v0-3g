import re

# Read file
with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Count before
before = content.count('Ãƒ')
print(f'Found {before} corruption patterns')

# Fix patterns using bytes
content_bytes = content.encode('utf-8')
content_bytes = content_bytes.replace(b'\xc3\x83\xc2\xbc', b'\xc3\xbc')  # ü
content_bytes = content_bytes.replace(b'\xc3\x83\xc2\xa4', b'\xc3\xa4')  # ä
content_bytes = content_bytes.replace(b'\xc3\x83\xc2\xb6', b'\xc3\xb6')  # ö
content_bytes = content_bytes.replace(b'\xc3\x83\xc5\xb8', b'\xc3\x9f')  # ß
content_bytes = content_bytes.replace(b'\xc3\x83\xc2\x84', b'\xc3\x84')  # Ä
content_bytes = content_bytes.replace(b'\xc3\x83\xc2\x96', b'\xc3\x96')  # Ö
content_bytes = content_bytes.replace(b'\xc3\x83\xc5\x93', b'\xc3\x9c')  # Ü

content_fixed = content_bytes.decode('utf-8')

# Count after
after = content_fixed.count('Ãƒ')
print(f'Remaining: {after}')
print(f'Fixed: {before - after}')

# Save
with open('lib/i18n/language-context.tsx', 'w', encoding='utf-8') as f:
    f.write(content_fixed)

print('✅ Done!')
