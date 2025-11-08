import re

# Fix ai-literacy
with open('app/ai-literacy/ai-literacy-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the old useLanguage destructuring of 't', keep only language
content = re.sub(
    r'const \{ language, setLanguage, t \} = useLanguage\(\)',
    r'const { language, setLanguage } = useLanguage()',
    content
)

with open('app/ai-literacy/ai-literacy-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("✅ Fixed ai-literacy")

# Fix community
with open('app/community/community-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'const \{ language, setLanguage, t \} = useLanguage\(\)',
    r'const { language, setLanguage } = useLanguage()',
    content
)

with open('app/community/community-client.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("✅ Fixed community")

print("\n🎉 Fixed duplicate declarations!")
