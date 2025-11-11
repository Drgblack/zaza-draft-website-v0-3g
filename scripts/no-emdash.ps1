param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]] $Files
)

$bad = @()
foreach ($f in $Files) {
  if (-not (Test-Path -LiteralPath $f)) { continue }
  $text = [IO.File]::ReadAllText($f)
  if ($text.IndexOf([char]0x2014) -ge 0) { $bad += $f }
}

if ($bad.Count -gt 0) {
  Write-Error ("❌ Em dash (—) found in:`n" + ($bad -join "`n"))
  Write-Host "Tip: replace with a hyphen (-)."
  exit 1
}

exit 0