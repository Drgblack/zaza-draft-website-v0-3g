import re

# Read the component
with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Create mapping of English strings to translation keys
replacements = [
    (r'>Courses<', r'>{t("aiLiteracy.courses")}<'),
    (r'>Educators<', r'>{t("aiLiteracy.educators")}<'),
    (r'>Certified<', r'>{t("aiLiteracy.certified")}<'),
    (r'>Hours Saved<', r'>{t("aiLiteracy.hoursSaved")}<'),
    (r'>Choose Your Learning Path<', r'>{t("aiLiteracy.pathsTitle")}<'),
    (r'>Beginner Path<', r'>{t("aiLiteracy.beginnerTitle")}<'),
    (r'>Intermediate Path<', r'>{t("aiLiteracy.intermediateTitle")}<'),
    (r'>Advanced Path<', r'>{t("aiLiteracy.advancedTitle")}<'),
    (r'>All Courses<', r'>{t("aiLiteracy.coursesTitle")}<'),
    (r'>AI Education Certification<', r'>{t("aiLiteracy.certificationTitle")}<'),
    (r'>Downloadable Resource Library<', r'>{t("aiLiteracy.libraryTitle")}<'),
    (r'>What Teachers Are Saying<', r'>{t("aiLiteracy.testimonialsTitle")}<'),
    (r'>Start Your AI Journey<', r'>{t("aiLiteracy.ctaTitle")}<'),
    (r'>Start Free Course<', r'>{t("aiLiteracy.ctaButton")}<'),
    (r'>Take Guided Tour<', r'>{t("aiLiteracy.ctaSecondary")}<'),
]

# Apply replacements
count = 0
for old, new in replacements:
    if re.search(old, content):
        content = re.sub(old, new, content)
        count += 1
        print(f"✅ Replaced: {old[:40]}")

print(f"\n✅ Made {count} replacements")

# Save
with open('app/ai-literacy/ai-literacy-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("🎉 Component updated!")
