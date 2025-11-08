import re

with open('lib/i18n/language-context.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the import to include useEffect
old_import = 'import { createContext, useContext, useState, type ReactNode } from "react"'
new_import = 'import { createContext, useContext, useState, useEffect, type ReactNode } from "react"'

if old_import in content:
    content = content.replace(old_import, new_import)
    print("✅ Fixed import to include useEffect")
else:
    print("❌ Import line not found - checking current state...")
    # Show current import line
    import_line = re.search(r'import.*from ["\']react["\']', content)
    if import_line:
        print(f"Current import: {import_line.group()}")

with open('lib/i18n/language-context.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Done")
