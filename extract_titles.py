import os, re

pages = [
    'app/ai-literacy/page.tsx',
    'app/best-ai-writing-tools-for-teachers-2025/page.tsx',
    'app/reduce-stress-parent-messages/page.tsx',
    'app/best-ai-tool-parent-emails/page.tsx',
    'app/ai-for-student-reports/page.tsx',
    'app/success-stories/page.tsx',
    'app/compare/page.tsx',
    'app/roi-calculator/page.tsx',
]

print("🔍 EXTRACTING TITLES FROM PAGES\n")

for page in pages:
    if os.path.exists(page):
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find h1 tags
        h1_matches = re.findall(r'<h1[^>]*>([^<]+)</h1>', content, re.IGNORECASE)
        
        print(f"\n📄 {page}")
        if h1_matches:
            for i, match in enumerate(h1_matches[:2]):  # First 2 h1s
                print(f"  H1: {match.strip()[:80]}")
        else:
            print("  ⚠️  No H1 found")

print("\n" + "="*80)
print("Please review these titles. I'll create German translations for each.")
print("="*80)
