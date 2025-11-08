import re, os

# Components to wire up (excluding already done: glossary, integrations)
clients = [
    ('app/ai-literacy/ai-literacy-client.tsx', 'aiLiteracy'),
    ('app/best-ai-writing-tools-for-teachers-2025/best-ai-writing-client.tsx', 'bestAiWriting'),
    ('app/reduce-stress-parent-messages/reduce-stress-client.tsx', 'reduceStress'),
    ('app/best-ai-tool-parent-emails/best-ai-tool-client.tsx', 'bestAiTool'),
    ('app/ai-for-student-reports/ai-student-reports-client.tsx', 'aiStudentReports'),
    ('app/success-stories/success-stories-client.tsx', 'successStories'),
    ('app/roi-calculator/roi-calculator-client.tsx', 'roiCalculator'),
]

print("🔍 Extracting titles from client components...\n")

titles = {}
for filepath, key in clients:
    if not os.path.exists(filepath):
        print(f"⚠️  Missing: {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find h1 tags (might have className, might span multiple lines)
    h1_pattern = r'<h1[^>]*>\s*([^<]+?)\s*</h1>'
    matches = re.findall(h1_pattern, content, re.DOTALL | re.IGNORECASE)
    
    if matches:
        title = matches[0].strip()
        # Clean up any newlines/extra spaces
        title = ' '.join(title.split())
        titles[key] = title[:100]  # First 100 chars
        print(f"✅ {key}: {title}")
    else:
        print(f"⚠️  {key}: No H1 found")
        titles[key] = None

print("\n" + "="*80)
print("NEXT: I'll create German translations for these titles")
print("="*80)
