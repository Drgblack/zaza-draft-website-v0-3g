import re

# Get all files with metadata exports
import os
files = []
for root, dirs, filenames in os.walk('app'):
    for filename in filenames:
        if filename.endswith('.tsx'):
            files.append(os.path.join(root, filename))

fixed_count = 0
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count how many metadata exports exist
    matches = list(re.finditer(r'export const metadata(?:: Metadata)? = \{', content))
    
    if len(matches) > 1:
        # Has duplicate - remove the second one (the alternates one)
        # Find second metadata export and remove it
        start = matches[1].start()
        # Find the closing brace for this export
        brace_count = 0
        i = content.index('{', start)
        end = i
        for j in range(i, len(content)):
            if content[j] == '{':
                brace_count += 1
            elif content[j] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end = j + 1
                    break
        
        # Remove from start of 'export' to end of closing brace (including newline)
        content = content[:start] + content[end+1:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'Fixed duplicate in: {filepath}')
        fixed_count += 1

print(f'\nFixed {fixed_count} files')
