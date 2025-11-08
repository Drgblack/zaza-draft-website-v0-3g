lines = open('components/header.tsx', 'r', encoding='utf-8').readlines()

# Find and replace the EN button onClick (around line 257)
for i in range(len(lines)):
    if 'const newPath = pathname.startsWith' in lines[i] and i > 250 and i < 260:
        # Replace next 3 lines (the EN button logic)
        lines[i] = "                  window.location.href = pathname.startsWith('/de/') ? pathname.replace('/de/', '/') : pathname.startsWith('/de') ? pathname.replace('/de', '') : pathname\n"
        lines[i+1] = ""  # Remove router.push line
        print(f"✅ Fixed EN button at line {i+1}")
        break

# Find and replace the DE button onClick (around line 268)  
for i in range(len(lines)):
    if 'const newPath = pathname.startsWith' in lines[i] and i > 265 and i < 275:
        lines[i] = "                  window.location.href = pathname.startsWith('/de') ? pathname : '/de' + pathname\n"
        lines[i+1] = ""  # Remove router.push line
        print(f"✅ Fixed DE button at line {i+1}")
        break

open('components/header.tsx', 'w', encoding='utf-8').writelines(lines)
print("🎉 Done!")
