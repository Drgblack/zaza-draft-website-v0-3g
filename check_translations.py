import os

pages = [
    ('app/ai-literacy/ai-literacy-client.tsx', 'aiLiteracy'),
    ('app/glossary/glossary-client.tsx', 'glossary'),
    ('app/integrations/integrations-client.tsx', 'integrations'),
]

for filepath, key in pages:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count t() calls
    t_calls = content.count('t("')
    
    # Check if title/subtitle are using t()
    has_title = f't("{key}.title")' in content
    has_subtitle = f't("{key}.subtitle")' in content
    
    print(f"\n📄 {os.path.basename(filepath)}:")
    print(f"   Title translated: {'✅' if has_title else '❌'}")
    print(f"   Subtitle translated: {'✅' if has_subtitle else '❌'}")
    print(f"   Total t() calls: {t_calls}")
