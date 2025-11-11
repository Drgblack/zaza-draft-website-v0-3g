$ErrorActionPreference = "Stop"
$roots = @(".\app", ".\content", ".\lib", ".\src")
$bad = New-Object System.Collections.Generic.List[string]
$pattern = [char]0x2014
foreach ($root in $roots) {
  if (-not (Test-Path $root)) { continue }
  Get-ChildItem -Path $root -Recurse -File -Include *.ts,*.tsx,*.md,*.mdx,*.css,*.json |
    Where-Object { $_.FullName -notmatch '(\\|/)(node_modules|\.next|__backup.*|backups|\.github|public)(\\|/)?' } |
    ForEach-Object {
      $full = $_.FullName
      $text = Get-Content -LiteralPath $full -Raw -ErrorAction SilentlyContinue
      if ($null -ne $text -and $text.Contains($pattern)) { $bad.Add("Em dash found in: $full") | Out-Null }
    }
}
if ($bad.Count) { Write-Host "❌ No-em-dash check failed:" -ForegroundColor Red; $bad | % { Write-Host " - $_" }; exit 1 }
else { Write-Host "✅ No-em-dash check passed." }
