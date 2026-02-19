Param(
  [string]$Root = "."
)

$exclude = @(
  "\node_modules\",
  "\.next\",
  "\out\",
  "\dist\",
  "\build\",
  "\.git\"
)

$files = Get-ChildItem -Path $Root -Recurse -File -Force -ErrorAction SilentlyContinue | Where-Object {
  $p = $_.FullName
  ($exclude | ForEach-Object { $p -like "*$_*" } | Where-Object { $_ } | Measure-Object).Count -eq 0
}

$bad = @()

foreach ($f in $files) {
  try {
    $raw = Get-Content -LiteralPath $f.FullName -Raw -ErrorAction Stop
    if ($raw -match " - ") {
      $bad += $f.FullName
    }
  } catch {
    # Ignore unreadable files
  }
}

if ($bad.Count -gt 0) {
  Write-Host ""
  Write-Host "Found em dashes in these files:"
  $bad | ForEach-Object { Write-Host " - $_" }
  Write-Host ""
  Write-Host "Tip: replace with a hyphen (-)."
  exit 1
}

Write-Host "OK: no em dashes found."
exit 0

