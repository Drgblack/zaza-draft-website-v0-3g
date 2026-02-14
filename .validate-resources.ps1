# Resource Files Validation Script
# Checks if all 34 required DOCX files are present

$expectedFiles = @(
    "ai-prompt-library-premium-en.docx",
    "ai-prompt-library-premium-de.docx",
    "ai-rubric-prompts-en.docx",
    "ai-rubric-prompts-de.docx",
    "ai-safety-ethics-guide-en.docx",
    "ai-safety-ethics-guide-de.docx",
    "assessment-rubrics-en.docx",
    "assessment-rubrics-de.docx",
    "classroom-management-en.docx",
    "classroom-management-de.docx",
    "differentiation-toolkit-en.docx",
    "differentiation-toolkit-de.docx",
    "end-of-term-comments-en.docx",
    "end-of-term-comments-de.docx",
    "grading-workflow-optimizer-en.docx",
    "grading-workflow-optimizer-de.docx",
    "homework-success-toolkit-en.docx",
    "homework-success-toolkit-de.docx",
    "lesson-planning-templates-en.docx",
    "lesson-planning-templates-de.docx",
    "parent-message-templates-en.docx",
    "parent-message-templates-de.docx",
    "student-feedback-framework-en.docx",
    "student-feedback-framework-de.docx",
    "teacher-time-playbook-en.docx",
    "teacher-time-playbook-de.docx",
    "teacher-wellness-guide-en.docx",
    "teacher-wellness-guide-de.docx",
    "tech-troubleshooting-guide-en.docx",
    "tech-troubleshooting-guide-de.docx",
    "tone-checklist-en.docx",
    "tone-checklist-de.docx",
    "weekly-newsletter-bundle-en.docx",
    "weekly-newsletter-bundle-de.docx"
)

Write-Host "=== Resource Files Validation ===" -ForegroundColor Cyan
Write-Host "Expected: 34 files (17 resources × 2 languages)`n" -ForegroundColor Yellow

$docxPath = "public\resources\docx"
$actualFiles = Get-ChildItem "$docxPath\*.docx" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name

Write-Host "Checking directory: $docxPath" -ForegroundColor Gray
Write-Host "Found: $($actualFiles.Count) files`n" -ForegroundColor Yellow

$missing = @()
$present = @()

foreach ($file in $expectedFiles) {
    if ($actualFiles -contains $file) {
        $present += $file
        Write-Host "✓ $file" -ForegroundColor Green
    } else {
        $missing += $file
        Write-Host "✗ $file" -ForegroundColor Red
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Present: $($present.Count) / 34" -ForegroundColor Green
Write-Host "Missing: $($missing.Count) / 34" -ForegroundColor Red

if ($missing.Count -gt 0) {
    Write-Host "`nMissing files:" -ForegroundColor Yellow
    foreach ($file in $missing) {
        Write-Host "  - $file" -ForegroundColor Red
    }
}

# Check for extra files (not in expected list)
$extraFiles = $actualFiles | Where-Object { $expectedFiles -notcontains $_ }
if ($extraFiles.Count -gt 0) {
    Write-Host "`nExtra/Unexpected files:" -ForegroundColor Yellow
    foreach ($file in $extraFiles) {
        Write-Host "  - $file" -ForegroundColor Magenta
    }
}

if ($missing.Count -eq 0 -and $extraFiles.Count -eq 0) {
    Write-Host "`n✅ All files present and correct!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ Issues found - see above" -ForegroundColor Yellow
}