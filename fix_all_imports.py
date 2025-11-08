import os

clients = [
    'app/reduce-stress-parent-messages/reduce-stress-client.tsx',
    'app/roi-calculator/roi-calculator-client.tsx',
    'app/ai-literacy/ai-literacy-client.tsx',
    'app/best-ai-writing-tools-for-teachers-2025/best-ai-writing-client.tsx',
    'app/best-ai-tool-parent-emails/best-ai-tool-client.tsx',
    'app/ai-for-student-reports/ai-student-reports-client.tsx',
    'app/success-stories/success-stories-client.tsx',
]

for filepath in clients:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Check if import line exists
    has_import = any('from "@/lib/i18n/language-context"' in line for line in lines)
    
    if not has_import:
        # Find where to insert (after "use client" and other imports)
        insert_pos = 0
        for i, line in enumerate(lines):
            if line.strip().startswith('import '):
                insert_pos = i + 1
        
        if insert_pos == 0:
            insert_pos = 2  # After "use client" line
        
        # Insert the import
        lines.insert(insert_pos, 'import { useLanguage } from "@/lib/i18n/language-context"\n')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        
        print(f"✅ Added import to {os.path.basename(filepath)}")
    else:
        print(f"✓ {os.path.basename(filepath)} already has import")

print("\n🎉 All imports fixed!")
