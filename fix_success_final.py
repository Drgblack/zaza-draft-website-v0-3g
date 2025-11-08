import re

filepath = 'app/success-stories/success-stories-client.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Look for export function (not default)
pattern = r'(export function SuccessStoriesClient\(\)\s*{)'
match = re.search(pattern, content)

if match:
    # Add hook call right after opening brace
    insert_point = match.end()
    hook_call = '\n  const { t } = useLanguage()'
    content = content[:insert_point] + hook_call + content[insert_point:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Added hook call to SuccessStoriesClient")
else:
    print("❌ Could not find function")

# Check result
print("\nFunction start after fix:")
with open(filepath, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if 'export function SuccessStoriesClient' in line:
            for j in range(5):
                print(f.readline().rstrip())
            break
