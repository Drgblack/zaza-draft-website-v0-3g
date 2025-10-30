import os
import re

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"

print("="*70)
print("SEARCHING FOR TEXT TRANSFORMATION FUNCTIONS")
print("="*70)

# Files to check
files_to_check = []

# Find all TypeScript/JavaScript files related to i18n or pricing
for root, dirs, files in os.walk(base_path):
    # Skip node_modules and .next
    if 'node_modules' in root or '.next' in root or '.git' in root:
        continue
    
    for file in files:
        if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
            filepath = os.path.join(root, file)
            # Check if it's related to i18n or contains pricing
            if 'i18n' in filepath.lower() or 'language' in filepath.lower() or 'locale' in filepath.lower():
                files_to_check.append(filepath)

print(f"\nFound {len(files_to_check)} i18n-related files")

# Search patterns that might corrupt text
suspicious_patterns = [
    r'\.replace\(',
    r'\.normalize\(',
    r'\.encode\(',
    r'\.decode\(',
    r'Buffer\.',
    r'btoa\(',
    r'atob\(',
    r'TextEncoder',
    r'TextDecoder',
    r'latin1',
    r'iso-8859',
    r'windows-1252',
]

findings = []

for filepath in files_to_check:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            lines = content.split('\n')
        
        rel_path = os.path.relpath(filepath, base_path)
        
        for pattern in suspicious_patterns:
            if re.search(pattern, content, re.IGNORECASE):
                # Find which lines
                matching_lines = []
                for i, line in enumerate(lines, 1):
                    if re.search(pattern, line, re.IGNORECASE):
                        matching_lines.append((i, line.strip()))
                
                if matching_lines:
                    findings.append({
                        'file': rel_path,
                        'pattern': pattern,
                        'lines': matching_lines[:3]  # First 3 matches
                    })
    except:
        pass

if findings:
    print("\n⚠️  Found potential text transformation code:")
    print("-"*70)
    for finding in findings:
        print(f"\n📄 {finding['file']}")
        print(f"   Pattern: {finding['pattern']}")
        for line_num, line in finding['lines']:
            print(f"   Line {line_num}: {line[:80]}")
else:
    print("\n✓ No suspicious text transformation functions found")

# Now check the specific PricingClient.tsx file
print("\n" + "="*70)
print("CHECKING PRICINGCLIENT.TSX")
print("="*70)

pricing_client = os.path.join(base_path, "app", "pricing", "PricingClient.tsx")
if os.path.exists(pricing_client):
    with open(pricing_client, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find where pricing.free.price is used
    lines = content.split('\n')
    for i, line in enumerate(lines, 1):
        if 'pricing.free.price' in line:
            # Show surrounding lines for context
            start = max(0, i-5)
            end = min(len(lines), i+5)
            print(f"\nContext around line {i}:")
            print("-"*70)
            for j in range(start, end):
                marker = ">>>" if j == i-1 else "   "
                print(f"{marker} {j+1:4d}: {lines[j]}")

# Check the language context
print("\n" + "="*70)
print("CHECKING LANGUAGE CONTEXT")
print("="*70)

lang_context = os.path.join(base_path, "lib", "i18n", "language-context.tsx")
if os.path.exists(lang_context):
    with open(lang_context, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print("\nShowing file structure:")
    for i, line in enumerate(lines[:100], 1):  # First 100 lines
        if 'translation' in line.lower() or 't(' in line or 'useTranslation' in line:
            print(f"  {i:3d}: {line.rstrip()}")