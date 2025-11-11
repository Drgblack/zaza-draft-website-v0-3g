$ErrorActionPreference = "Stop"
$gcPath = "app\globals.css"
if (-not (Test-Path $gcPath)) { exit 0 }

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$gc = Get-Content $gcPath -Raw

# Get the first @import or inject our standard one
$first = [regex]::Match($gc,'(?ms)^\s*@import\s+url\([^)]+\);\s*').Value
if (-not $first) {
  $first = '@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap");' + "`r`n"
}

# Remove ALL @import lines, then prepend the single allowed one
$rest = [regex]::Replace($gc,'(?ms)^\s*@import\s+url\([^)]+\);\s*','')
[IO.File]::WriteAllText($gcPath, $first + $rest, $utf8NoBom)