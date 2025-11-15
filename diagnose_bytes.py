# Read a small sample of the corrupted text
with open('lib/i18n/language-context.tsx', 'rb') as f:
    content = f.read()

# Find and show the actual bytes around "für"
import re
matches = re.finditer(b'.{0,10}f.r.{0,10}', content)
for i, match in enumerate(matches):
    if i < 5:  # Show first 5 matches
        snippet = match.group()
        print(f'Match {i+1}:')
        print(f'  Bytes: {snippet}')
        print(f'  Hex: {snippet.hex()}')
        print(f'  Text attempt: {snippet.decode("utf-8", errors="replace")}')
        print()
