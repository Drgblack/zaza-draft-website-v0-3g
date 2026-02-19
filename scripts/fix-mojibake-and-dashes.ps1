param(
  [string]$Root = "."
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function New-Seq {
  param([int[]]$Codes)
  return (-join ($Codes | ForEach-Object { [char]$_ }))
}

$scanRoot = (Resolve-Path -LiteralPath $Root).Path
$excludedDirPattern = [regex]::new(
  [regex]::Escape([IO.Path]::DirectorySeparatorChar) + "(\.git|\.next|node_modules|\.vercel)(" +
  [regex]::Escape([IO.Path]::DirectorySeparatorChar) + "|$)",
  [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
)

$allowedExtensions = @(
  ".ts",
  ".tsx",
  ".js",
  ".json",
  ".md",
  ".html",
  ".txt"
)

$replacements = [ordered]@{
  (New-Seq 0x00C2,0x00A9) = (New-Seq 0x00A9)
  (New-Seq 0x00C3,0x00BC) = (New-Seq 0x00FC)
  (New-Seq 0x00C3,0x009C) = (New-Seq 0x00DC)
  (New-Seq 0x00C3,0x00B6) = (New-Seq 0x00F6)
  (New-Seq 0x00C3,0x0096) = (New-Seq 0x00D6)
  (New-Seq 0x00C3,0x00A4) = (New-Seq 0x00E4)
  (New-Seq 0x00C3,0x0084) = (New-Seq 0x00C4)
  (New-Seq 0x00C3,0x009F) = (New-Seq 0x00DF)
  (New-Seq 0x00E2,0x20AC,0x0153) = '"'
  (New-Seq 0x00E2,0x20AC,0x009D) = '"'
  (New-Seq 0x00E2,0x20AC,0x2122) = "'"
  (New-Seq 0x00E2,0x20AC,0x00A6) = "..."
  (New-Seq 0x00E2,0x20AC,0x201C) = "-"
  (New-Seq 0x00E2,0x20AC,0x201D) = "-"
  (New-Seq 0x00C3,0x201D,0x00C3,0x2021,0x00F6) = "-"
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$check = [char]0x2714

Get-ChildItem -LiteralPath $scanRoot -Recurse -File | ForEach-Object {
  $file = $_
  $fullPath = $file.FullName

  if ($excludedDirPattern.IsMatch($fullPath + [IO.Path]::DirectorySeparatorChar)) {
    return
  }

  $ext = if ($null -ne $file.Extension) {
    $file.Extension.ToLowerInvariant()
  } else {
    ""
  }

  if ($allowedExtensions -notcontains $ext) {
    return
  }

  $original = Get-Content -LiteralPath $fullPath -Raw
  if ($null -eq $original) {
    $original = ""
  }
  $updated = $original

  foreach ($bad in $replacements.Keys) {
    $updated = $updated.Replace($bad, $replacements[$bad])
  }

  if ($updated -ne $original) {
    [System.IO.File]::WriteAllText($fullPath, $updated, $utf8NoBom)
    $relative = [IO.Path]::GetRelativePath($scanRoot, $fullPath)
    Write-Host "$check $relative"
  }
}
