import re, os

# All client components that might need fixing
clients = [
    'app/roi-calculator/roi-calculator-client.tsx',
    'app/ai-literacy/ai-literacy-client.tsx',
    'app/best-ai-writing-tools-for-teachers-2025/best-ai-writing-client.tsx',
    'app/best-ai-tool-parent-emails/best-ai-tool-client.tsx',
    'app/ai-for-student-reports/ai-student-reports-client.tsx',
]

for filepath in clients:
    if not os.path.exists(filepath):
        print(f"⚠️  Missing: {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if hook is already called
    if 'const { t } = useLanguage()' in content:
        print(f"✓ {os.path.basename(filepath)} - hook already exists")
        continue
    
    # Try multiple patterns for function declarations
    patterns = [
        r'(export default function \w+\([^)]*\)\s*{)',
        r'(export function \w+\([^)]*\)\s*{)',
        r'(function \w+\([^)]*\)\s*{)',
    ]
    
    fixed = False
    for pattern in patterns:
        match = re.search(pattern, content)
        if match:
            insert_point = match.end()
            hook_call = '\n  const { t } = useLanguage()'
            content = content[:insert_point] + hook_call + content[insert_point:]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ {os.path.basename(filepath)} - added hook")
            fixed = True
            break
    
    if not fixed:
        print(f"❌ {os.path.basename(filepath)} - could not find function")

print("\n🎉 Batch fix complete!")
