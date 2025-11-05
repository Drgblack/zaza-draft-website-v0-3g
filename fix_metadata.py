import re
import sys

files = [
    'app/about/company/page.tsx',
    'app/about/founder/page.tsx',
    'app/about/page.tsx',
    'app/contact/page.tsx',
    'app/legal/privacy/page.tsx',
    'app/legal/terms/page.tsx',
    'app/support/page.tsx',
    'app/teacher-stories/page.tsx'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove metadata import
    content = re.sub(r'import type \{ Metadata \} from ["\']next["\']\n', '', content)
    
    # Remove metadata export (multi-line, nested)
    content = re.sub(r'export const metadata: Metadata = \{[\s\S]*?\n\}\n', '', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Fixed: {filepath}')
