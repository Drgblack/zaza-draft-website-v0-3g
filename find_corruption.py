with open('lib/i18n/language-context.tsx', 'rb') as f:
    content = f.read()

# Search for the corruption marker "Ãƒ" in bytes
import re

# Find instances of the corruption pattern
matches = re.finditer(b'.{0,15}\xc3\x83.{0,15}', content)

print('First 5 corruption instances:')
for i, match in enumerate(matches):
    if i < 5:
        snippet = match.group()
        print(f'\nMatch {i+1}:')
        print(f'  Hex: {snippet.hex()}')
        print(f'  Text: {snippet.decode("utf-8", errors="replace")}')

# Count total
count = content.count(b'\xc3\x83')
print(f'\n\nTotal corruption markers (\\xc3\\x83): {count}')
