# Comprehensive UTF-8 Encoding Fix Script
$filePath = "lib\i18n\language-context.tsx"

Write-Host "=== COMPREHENSIVE UTF-8 ENCODING FIX ===" -ForegroundColor Cyan
Write-Host ""

# Backup
Write-Host "Creating backup..." -ForegroundColor Yellow
Copy-Item $filePath "$filePath.backup-before-utf8-fix" -Force

# Read file content
Write-Host "Reading file..." -ForegroundColor Yellow
$content = Get-Content $filePath -Raw -Encoding UTF8

# Count issues before
$issuesBefore = ([regex]::Matches($content, 'Ã[ƒ‚Æ']')).Count
Write-Host "Found ~$issuesBefore encoding issues" -ForegroundColor Yellow

# Apply systematic fixes for German characters (from most complex to simple)
Write-Host "Applying fixes..." -ForegroundColor Yellow

# Triple-encoded patterns (ÃƒÂ)
$content = $content -replace 'ÃƒÂ¼', 'ü'
$content = $content -replace 'ÃƒÂ¤', 'ä'
$content = $content -replace 'ÃƒÂ¶', 'ö'
$content = $content -replace 'ÃƒÅ¸', 'ß'
$content = $content -replace 'ÃƒÂ„', 'Ä'
$content = $content -replace 'ÃƒÂ-', 'Ö'
$content = $content -replace 'ÃƒÅ"', 'Ü'

# Double-encoded patterns (Ã)
$content = $content -replace 'Ã¼', 'ü'
$content = $content -replace 'Ã¤', 'ä'
$content = $content -replace 'Ã¶', 'ö'
$content = $content -replace 'ÃŸ', 'ß'
$content = $content -replace 'Ã„', 'Ä'
$content = $content -replace 'Ã-', 'Ö'
$content = $content -replace 'Ãœ', 'Ü'

# Additional corruption patterns
$content = $content -replace 'â€ž', '„'
$content = $content -replace 'â€œ', '"'
$content = $content -replace 'â€™', '''
$content = $content -replace 'â€"', '-'
$content = $content -replace 'â€"', ' - '

# Save with proper UTF-8 encoding
Write-Host "Saving fixed file..." -ForegroundColor Yellow
$content | Set-Content $filePath -Encoding UTF8 -NoNewline

# Count issues after
$contentAfter = Get-Content $filePath -Raw -Encoding UTF8
$issuesAfter = ([regex]::Matches($contentAfter, 'Ã[ƒ‚Æ']')).Count

Write-Host ""
Write-Host "=== RESULTS ===" -ForegroundColor Green
Write-Host "Issues before: $issuesBefore" -ForegroundColor White
Write-Host "Issues after: $issuesAfter" -ForegroundColor White
Write-Host "Fixed: " -NoNewline -ForegroundColor White
Write-Host "($issuesBefore - $issuesAfter)" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Comprehensive UTF-8 fix complete!" -ForegroundColor Green
Write-Host "Backup saved as: $filePath.backup-before-utf8-fix" -ForegroundColor Gray

