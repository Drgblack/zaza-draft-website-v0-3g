$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel) 2>$null
if (-not $repoRoot) { throw "Not a git repo (git rev-parse failed)." }
Set-Location $repoRoot

# Only check tracked files, and only text-ish extensions.
# This prevents scanning binaries (jpg/pdf), backups, and generated artefacts.
$allowedExt = @(
  ".ts",".tsx",".js",".jsx",".mjs",".cjs",
  ".json",".md",".mdx",".txt",".html",".css",
  ".yml",".yaml",".ps1",".py",".toml",".ini"
)

$files = git ls-files
if (-not $files) { Write-Host "No tracked files found."; exit 0 }

$offenders = @()

foreach ($f in $files) {
  $ext = [System.IO.Path]::GetExtension($f).ToLowerInvariant()
  if ($allowedExt -notcontains $ext) { continue }

  $raw = $null
  try { $raw = Get-Content -LiteralPath $f -Raw -ErrorAction Stop } catch { continue }
  if ($null -eq $raw) { continue }

  if ($raw.Contains("-")) {
    $offenders += (Join-Path $repoRoot $f)
  }
}

if ($offenders.Count -gt 0) {
  Write-Host ""
  Write-Host "Found em dashes in these tracked text files:"
  $offenders | Sort-Object | ForEach-Object { Write-Host " - $_" }
  Write-Host ""
  Write-Host "Tip: replace with a hyphen (-)."
  exit 1
}

Write-Host "OK: no em dashes found in tracked text files."
exit 0

