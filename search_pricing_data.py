import os
import re

base_path = r"C:\Users\User\zaza-draft-website-v0-3g"

print("="*70)
print("SEARCHING FOR PRICING DATA IN CODEBASE")
print("="*70)

# Search patterns
search_patterns = [
    b'pricing.free.price',  # The key
    b'0 \xe2\x82\xac',      # "0 €" in UTF-8
    b'0 \xc3\x83',          # Start of corruption pattern
    b'\$0',                  # English version
]

# File extensions to search
extensions = ['.tsx', '.ts', '.jsx', '.js', '.json']

# Directories to skip
skip_dirs = ['node_modules', '.git', '.next', 'dist', 'build']

def should_skip(path):
    for skip_dir in skip_dirs:
        if skip_dir in path:
            return True
    return False

findings = []

print("\nSearching for pricing.free.price references...")
print("-"*70)

for root, dirs, files in os.walk(base_path):
    # Skip certain directories
    dirs[:] = [d for d in dirs if d not in skip_dirs]
    
    for file in files:
        if any(file.endswith(ext) for ext in extensions):
            filepath = os.path.join(root, file)
            
            try:
                with open(filepath, 'rb') as f:
                    content = f.read()
                
                for pattern in search_patterns:
                    if pattern in content:
                        # Get relative path
                        rel_path = os.path.relpath(filepath, base_path)
                        
                        # Find context
                        idx = content.find(pattern)
                        start = max(0, idx - 50)
                        end = min(len(content), idx + 50)
                        context = content[start:end]
                        
                        findings.append({
                            'file': rel_path,
                            'pattern': pattern.decode('utf-8', errors='replace'),
                            'context': context.decode('utf-8', errors='replace')
                        })
                        break  # Don't report same file multiple times
            except:
                pass

if findings:
    for finding in findings:
        print(f"\n📄 File: {finding['file']}")
        print(f"   Pattern: {finding['pattern']}")
        print(f"   Context: ...{finding['context']}...")
else:
    print("\n✗ No findings - this is unexpected!")

print("\n" + "="*70)
print("CHECKING SPECIFIC PRICING COMPONENT")
print("="*70)

# Look for pricing page component
pricing_components = [
    os.path.join(base_path, "app", "pricing", "page.tsx"),
    os.path.join(base_path, "pages", "pricing.tsx"),
    os.path.join(base_path, "components", "pricing", "PricingCard.tsx"),
    os.path.join(base_path, "components", "PricingCard.tsx"),
]

for comp in pricing_components:
    if os.path.exists(comp):
        print(f"\n✓ Found: {os.path.relpath(comp, base_path)}")
        print("   First 50 lines:")
        with open(comp, 'r', encoding='utf-8') as f:
            lines = f.readlines()[:50]
            for i, line in enumerate(lines, 1):
                if 'price' in line.lower() or 'pricing' in line.lower():
                    print(f"   {i:3d}: {line.rstrip()}")
    else:
        print(f"\n✗ Not found: {os.path.relpath(comp, base_path)}")

print("\n" + "="*70)
print("RECOMMENDATIONS")
print("="*70)
print("""
1. Check if the pricing data is hardcoded in a component
2. Check if there's a database or API returning this data
3. Verify the correct locale file is being loaded
4. Check browser's Network tab to see what data is being fetched
""")