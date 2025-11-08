import re, os, sys

# All pages that need i18n wiring
pages_to_fix = [
    ('app/ai-literacy/page.tsx', 'aiLiteracy'),
    ('app/best-ai-writing-tools-for-teachers-2025/page.tsx', 'bestAiWriting'),
    ('app/reduce-stress-parent-messages/page.tsx', 'reduceStress'),
    ('app/best-ai-tool-parent-emails/page.tsx', 'bestAiParentEmails'),
    ('app/ai-for-student-reports/page.tsx', 'aiStudentReports'),
    ('app/success-stories/page.tsx', 'successStories'),
    ('app/compare/page.tsx', 'compare'),
    ('app/roi-calculator/page.tsx', 'roiCalculator'),
]

# Check which exist
for filepath, key in pages_to_fix:
    if os.path.exists(filepath):
        print(f"✅ Found: {filepath}")
    else:
        print(f"⚠️  Missing: {filepath}")

print("\nDo you want to proceed with wiring these up? (y/n)")
