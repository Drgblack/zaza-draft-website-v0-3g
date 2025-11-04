# RECOVERY SCRIPT - Run this in PowerShell
# Save this as: recovery.ps1

Write-Host "=== Zaza Draft Website Recovery ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if restore/good-site exists and has content
Write-Host "Step 1: Checking restore/good-site branch..." -ForegroundColor Yellow
git checkout restore/good-site

if ($LASTEXITCODE -eq 0) {
    Write-Host "Found restore/good-site branch!" -ForegroundColor Green
    Write-Host "Please check if this looks like your production-ready site." -ForegroundColor Yellow
    Write-Host "Running dev server..." -ForegroundColor Yellow
    
    # You would check localhost manually here
    Write-Host ""
    Write-Host "After checking the site, answer the following:" -ForegroundColor Yellow
    $goodSite = Read-Host "Does restore/good-site look correct? (yes/no)"
    
    if ($goodSite -eq "yes") {
        Write-Host "Great! Restoring from restore/good-site..." -ForegroundColor Green
        git checkout main
        git reset --hard restore/good-site
        git push --force origin main
        Write-Host "DONE! Your site has been restored!" -ForegroundColor Green
        exit 0
    }
}

# Step 2: If restore/good-site doesn't work, try commit 21d2a10
Write-Host ""
Write-Host "Step 2: Trying commit 21d2a10 (Premium visual design)..." -ForegroundColor Yellow
git checkout main
git checkout -b temp-recovery 21d2a10

Write-Host "Please check localhost:3000 to see if this looks correct" -ForegroundColor Yellow
$goodCommit = Read-Host "Does commit 21d2a10 look correct? (yes/no)"

if ($goodCommit -eq "yes") {
    Write-Host "Restoring from 21d2a10..." -ForegroundColor Green
    git checkout main
    git reset --hard 21d2a10
    
    # Restore package.json
    Write-Host "Restoring package.json..." -ForegroundColor Yellow
    git checkout 21d2a10 -- package.json
    git add package.json
    git commit -m "Restore package.json"
    
    # Push
    git push --force origin main
    Write-Host "DONE! Your site has been restored!" -ForegroundColor Green
    exit 0
}

# Step 3: If neither worked, let's go further back
Write-Host ""
Write-Host "Step 3: Let's try an even older commit..." -ForegroundColor Yellow
Write-Host "Checking commit 42e9955 (Premium visual design: gradients, animations)..." -ForegroundColor Yellow
git checkout -b temp-recovery-2 42e9955

Write-Host "Check localhost:3000" -ForegroundColor Yellow
$older = Read-Host "Does this look correct? (yes/no)"

if ($older -eq "yes") {
    git checkout main
    git reset --hard 42e9955
    git checkout 42e9955 -- package.json
    git add package.json
    git commit -m "Restore package.json"
    git push --force origin main
    Write-Host "DONE!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Manual recovery needed. Please review git log and find the last good commit." -ForegroundColor Red
    Write-Host "Then run: git reset --hard COMMIT_HASH" -ForegroundColor Yellow
    Write-Host "And: git push --force origin main" -ForegroundColor Yellow
}