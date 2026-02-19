$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel) 2>$null
if (-not $repoRoot) { throw "Not a git repo (git rev-parse failed)." }
Set-Location $repoRoot

function ContainsForbiddenDash {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Text
  )

  # Detect only em dash (U+2014). Do not flag normal hyphen-minus (-).
  return $Text.IndexOf([char]0x2014) -ge 0
}

function Invoke-SelfTest {
  $tests = @(
    @{ Name = "hyphen-minus"; Text = "alpha-beta"; Expected = $false },
    @{ Name = "em-dash"; Text = ("alpha" + [char]0x2014 + "beta"); Expected = $true }
  )

  foreach ($t in $tests) {
    $actual = ContainsForbiddenDash -Text $t.Text
    if ($actual -ne $t.Expected) {
      throw "Self-test failed: $($t.Name) expected $($t.Expected) but got $actual"
    }
  }
}

Invoke-SelfTest

# Only check tracked files, and only text-ish extensions.
# This prevents scanning binaries (jpg/pdf), backups, and generated artefacts.
$allowedExt = @(
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".json", ".md", ".mdx", ".txt", ".html", ".css",
  ".yml", ".yaml", ".ps1", ".py", ".toml", ".ini"
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

  if (ContainsForbiddenDash -Text $raw) {
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
