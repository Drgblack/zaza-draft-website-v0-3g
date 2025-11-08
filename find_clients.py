import os, glob

# Find all -client.tsx files in app directory
client_files = glob.glob('app/**/*-client.tsx', recursive=True)

print("📦 CLIENT COMPONENTS FOUND:\n")
for f in sorted(client_files):
    print(f"  {f}")

print(f"\n✅ Total: {len(client_files)} client components")

# Also check for any page.tsx that imports a client component
print("\n🔍 Checking which pages use client components...")

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

for page in pages:
    if os.path.exists(page):
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Look for imports of client components
        if 'Client' in content or '-client' in content:
            print(f"\n✅ {page}")
            # Extract the import
            import_match = re.search(r'import.*from.*["\']\.\/.*client.*["\']', content)
            if import_match:
                print(f"   Imports: {import_match.group()}")
