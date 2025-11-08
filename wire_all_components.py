import re, os

clients = [
    ('app/ai-literacy/ai-literacy-client.tsx', 'aiLiteracy'),
    ('app/best-ai-writing-tools-for-teachers-2025/best-ai-writing-client.tsx', 'bestAiWriting'),
    ('app/reduce-stress-parent-messages/reduce-stress-client.tsx', 'reduceStress'),
    ('app/best-ai-tool-parent-emails/best-ai-tool-client.tsx', 'bestAiTool'),
    ('app/ai-for-student-reports/ai-student-reports-client.tsx', 'aiStudentReports'),
    ('app/success-stories/success-stories-client.tsx', 'successStories'),
    ('app/roi-calculator/roi-calculator-client.tsx', 'roiCalculator'),
]

for filepath, key in clients:
    if not os.path.exists(filepath):
        print(f"⚠️  Missing: {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add import if missing
    if 'useLanguage' not in content:
        content = re.sub(
            r'(import.*from\s+["\']react["\'])',
            r'\1\nimport { useLanguage } from "@/lib/i18n/language-context"',
            content
        )
    
    # Add hook call if missing
    if 'const { t }' not in content:
        content = re.sub(
            r'(export default function \w+[^{]*\{)',
            r'\1\n  const { t } = useLanguage()',
            content
        )
    
    # Replace h1 titles
    content = re.sub(
        r'(<h1[^>]*>)[^<{]+(<\/h1>)',
        rf'\1{{t("{key}.title")}}\2',
        content,
        count=1
    )
    
    # Replace first p after h1 (subtitle)
    content = re.sub(
        r'(<h1[\s\S]{0,500}<p[^>]*>)(?!{t\()[^<{]+(<\/p>)',
        rf'\1{{t("{key}.subtitle")}}\2',
        content,
        count=1
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {os.path.basename(filepath)}")

print("\n🎉 All components wired!")
