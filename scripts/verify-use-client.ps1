$ErrorActionPreference = "Stop"

function Is-Ignored($p){ return $p -match '\\node_modules\\|\\\.next\\|\.d\.ts$' }

$bad = New-Object System.Collections.Generic.List[string]

# 1) Duplicate or misplaced "use client"
Get-ChildItem -Path .\app -Recurse -File -Include *.ts,*.tsx | ForEach-Object {
  $full = $_.FullName
  if (Is-Ignored $full) { return }
  if (-not (Test-Path -LiteralPath $full)) { return }

  $text = Get-Content -LiteralPath $full -Raw -ErrorAction SilentlyContinue
  if ($null -eq $text) { return }

  $lines    = $text -split "\r?\n"
  $nonEmpty = $lines | Where-Object { $_.Trim() -ne "" }

  $count = ([regex]::Matches($text,'(?m)^\s*["'']use client["'']\s*;?\s*$')).Count
  if ($count -gt 1) { $bad.Add("DUPLICATE use client: $full") | Out-Null }
  if ($count -gt 0) {
    if ($nonEmpty.Count -eq 0 -or $nonEmpty[0] -notmatch '^\s*["'']use client["'']') {
      $bad.Add("NOT_FIRST use client: $full") | Out-Null
    }
  }
}

# 2) Any file that calls useLanguage() must be a client file (directive first)
Get-ChildItem -Path .\app -Recurse -File -Include *.ts,*.tsx | ForEach-Object {
  $full = $_.FullName
  if (Is-Ignored $full) { return }
  if (-not (Test-Path -LiteralPath $full)) { return }

  $text = Get-Content -LiteralPath $full -Raw -ErrorAction SilentlyContinue
  if ($null -eq $text) { return }

  if ($text -match 'useLanguage\(') {
    $firstNonEmpty = (($text -split "\r?\n") | Where-Object { $_.Trim() -ne "" } | Select-Object -First 1)
    if ($firstNonEmpty -notmatch '^\s*["'']use client["'']') {
      $bad.Add("useLanguage() without client-first: $full") | Out-Null
    }
  }
}

# 3) ROI client sanity: only one named export
$roiPath = "app\roi-calculator\roi-calculator-client.tsx"
if (Test-Path -LiteralPath $roiPath) {
  $roi = Get-Content -LiteralPath $roiPath -Raw -ErrorAction SilentlyContinue
  if ($roi) {
    $decls = ([regex]::Matches($roi,'(?m)^\s*export\s+function\s+ROICalculatorClient\b')).Count
    if ($decls -gt 1) { $bad.Add("ROI client has duplicate export declarations: $roiPath") | Out-Null }
  }
}

if ($bad.Count) {
  Write-Host "❌ Prebuild checks failed:" -ForegroundColor Red
  $bad | ForEach-Object { Write-Host " - $_" }
  exit 1
} else {
  Write-Host "✅ Prebuild checks passed."
}