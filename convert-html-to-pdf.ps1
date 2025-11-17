# ============================================================================
# HTML to PDF Converter for Zaza Draft Resources
# Automatically converts all HTML files to PDF
# ============================================================================

Write-Host "======================================================================"
Write-Host "  ZAZA DRAFT - HTML TO PDF CONVERTER" -ForegroundColor Cyan
Write-Host "======================================================================"
Write-Host ""

# Navigate to downloads folder
$downloadsPath = "public\downloads"
Set-Location $downloadsPath

# List of HTML files to convert
$htmlFiles = @(
    "getting-started-ai.html",
    "ki-einstieg.html",
    "ai-tool-evaluation.html",
    "ki-tool-bewertung.html",
    "ai-ethics-framework.html",
    "ki-ethik-rahmen.html",
    "parent-email-templates.html",
    "eltern-email-vorlagen.html"
)

Write-Host "Found $($htmlFiles.Count) HTML files to convert" -ForegroundColor Green
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host "  For each file that opens in your browser:" -ForegroundColor White
Write-Host "    1. Press Ctrl + P (or Cmd + P on Mac)" -ForegroundColor White
Write-Host "    2. Select 'Save as PDF' or 'Microsoft Print to PDF'" -ForegroundColor White
Write-Host "    3. The filename will be pre-filled correctly" -ForegroundColor White
Write-Host "    4. Click 'Save' and choose 'Replace' if asked" -ForegroundColor White
Write-Host "    5. Close the browser window when done" -ForegroundColor White
Write-Host ""
Write-Host "Press ENTER to start opening files one by one..." -ForegroundColor Cyan
Read-Host

$converted = 0
$total = $htmlFiles.Count

foreach ($htmlFile in $htmlFiles) {
    $converted++
    $pdfFile = $htmlFile -replace '\.html$', '.pdf'
    
    Write-Host "[$converted/$total] Converting: $htmlFile" -ForegroundColor Cyan
    Write-Host "            Save as: $pdfFile" -ForegroundColor Green
    
    # Check if HTML file exists
    if (Test-Path $htmlFile) {
        # Get the full path for the PDF
        $fullPath = Join-Path (Get-Location) $pdfFile
        
        # Open the HTML file in default browser
        Start-Process $htmlFile
        
        Write-Host ""
        Write-Host "  Browser window opened!" -ForegroundColor Green
        Write-Host "  Now:" -ForegroundColor Yellow
        Write-Host "    1. Press Ctrl + P in the browser" -ForegroundColor White
        Write-Host "    2. Choose 'Save as PDF'" -ForegroundColor White
        Write-Host "    3. Save as: $pdfFile" -ForegroundColor Cyan
        Write-Host "    4. Close browser window when saved" -ForegroundColor White
        Write-Host ""
        Write-Host "  Press ENTER when you've saved this PDF to continue to next file..." -ForegroundColor Yellow
        Read-Host
        
        # Check if PDF was created
        if (Test-Path $pdfFile) {
            $fileSize = (Get-Item $pdfFile).Length
            if ($fileSize -gt 1000) {
                $sizeKB = [math]::Round($fileSize/1024, 1)
                Write-Host "  [OK] PDF created successfully! ($sizeKB KB)" -ForegroundColor Green
            } else {
                Write-Host "  [WARNING] PDF file seems too small. Please verify it was saved correctly." -ForegroundColor Yellow
            }
        } else {
            Write-Host "  [WARNING] PDF not found. Make sure you saved it as: $pdfFile" -ForegroundColor Red
        }
    } else {
        Write-Host "  [WARNING] HTML file not found: $htmlFile" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "----------------------------------------------------------------------"
    Write-Host ""
}

Write-Host ""
Write-Host "======================================================================"
Write-Host "  CONVERSION SUMMARY" -ForegroundColor Cyan
Write-Host "======================================================================"
Write-Host ""

# Check which PDFs were created successfully
$successfulPDFs = @()
$missingPDFs = @()

foreach ($htmlFile in $htmlFiles) {
    $pdfFile = $htmlFile -replace '\.html$', '.pdf'
    if (Test-Path $pdfFile) {
        $fileSize = (Get-Item $pdfFile).Length
        if ($fileSize -gt 1000) {
            $successfulPDFs += $pdfFile
            $sizeKB = [math]::Round($fileSize/1024, 1)
            Write-Host "  [OK] $pdfFile ($sizeKB KB)" -ForegroundColor Green
        } else {
            $missingPDFs += $pdfFile
            Write-Host "  [WARNING] $pdfFile (file too small - may need to reconvert)" -ForegroundColor Yellow
        }
    } else {
        $missingPDFs += $pdfFile
        Write-Host "  [MISSING] $pdfFile (not found)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Successfully converted: $($successfulPDFs.Count) / $total" -ForegroundColor Green

if ($missingPDFs.Count -gt 0) {
    Write-Host "Need attention: $($missingPDFs.Count)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To reconvert missing files, run this script again." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "======================================================================"

# If all converted successfully, offer to clean up HTML files and show next steps
if ($successfulPDFs.Count -eq $total) {
    Write-Host ""
    Write-Host "[SUCCESS] All HTML files converted to PDF successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "OPTIONAL CLEANUP:" -ForegroundColor Yellow
    Write-Host "  Would you like to delete the HTML files now that you have PDFs?" -ForegroundColor White
    Write-Host "  (You only need the PDFs on your website)" -ForegroundColor Gray
    Write-Host ""
    $cleanup = Read-Host "Delete HTML files? (y/n)"
    
    if ($cleanup -eq 'y' -or $cleanup -eq 'Y') {
        foreach ($htmlFile in $htmlFiles) {
            Remove-Item $htmlFile -Force
            Write-Host "  Deleted: $htmlFile" -ForegroundColor Gray
        }
        Write-Host ""
        Write-Host "[OK] HTML files cleaned up!" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "======================================================================"
    Write-Host "  NEXT STEPS" -ForegroundColor Cyan
    Write-Host "======================================================================"
    Write-Host ""
    Write-Host "  All 14 resources are ready! Now deploy to Vercel:" -ForegroundColor White
    Write-Host ""
    Write-Host "  cd ..\.." -ForegroundColor Cyan
    Write-Host "  npm run build" -ForegroundColor Cyan
    Write-Host "  git add ." -ForegroundColor Cyan
    Write-Host '  git commit -m "feat: add all 14 AI literacy resources (EN + DE)"' -ForegroundColor Cyan
    Write-Host "  git push --no-verify" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Your resources will be live on both EN and DE sites!" -ForegroundColor Green
    Write-Host ""
}

Write-Host ""
Write-Host "Press ENTER to exit..." -ForegroundColor Gray
Read-Host

# Return to project root
Set-Location ..\..
