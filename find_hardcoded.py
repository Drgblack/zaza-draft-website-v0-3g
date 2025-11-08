import os
import re

# Common English UI phrases that should be translated
patterns = [
    r'>\s*(Get Started|Sign Up|Learn More|Contact Us|Try Free|Start Free Trial)\s*<',
    r'>\s*(Home|About|Products|Pricing|Resources|FAQ|Blog|Contact)\s*<',
    r'placeholder="[^"]*"',
    r'alt="[^"]*"',
    r'title="[^"]*"',
    r'aria-label="[^"]*"',
]

hardcoded_strings = []

# Search in app directory
for root, dirs, files in os.walk('app'):
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.next']]
    
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    
                for line_num, line in enumerate(lines, 1):
                    # Skip if line already has t( call
                    if 't(' in line or 't"' in line:
                        continue
                    
                    for pattern in patterns:
                        matches = re.findall(pattern, line)
                        if matches:
                            for match in matches:
                                hardcoded_strings.append({
                                    'file': filepath,
                                    'line': line_num,
                                    'text': match,
                                    'context': line.strip()[:100]
                                })
            except:
                pass

print(f"Found {len(hardcoded_strings)} potential hardcoded strings:\n")

# Show first 30
for i, item in enumerate(hardcoded_strings[:30], 1):
    print(f"{i}. {item['file']}:{item['line']}")
    print(f"   {item['text']}")
    print()

# Save for review
import json
with open('hardcoded-strings.json', 'w', encoding='utf-8') as f:
    json.dump(hardcoded_strings, f, indent=2)

print(f"✅ Saved all {len(hardcoded_strings)} findings to hardcoded-strings.json")
