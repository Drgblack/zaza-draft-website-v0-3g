import re

files = ['app/videos/page.tsx', 'app/webinars/page.tsx']

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the second metadata block (static one at the end)
    content = re.sub(r'import type \{ Metadata \} from "next"\s*\nexport const metadata: Metadata = \{[\s\S]*?\n\}', '', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Fixed: {filepath}')
