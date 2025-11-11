$ErrorActionPreference = "Stop"
function Is-Ignored($p){ return $p -match '\\node_modules\\|\\\.next\\|\.d\.ts$' }
$bad = New-Object System.Collections.Generic.List[string]
Get-ChildItem -Path .\app -Recurse -File -Include *.ts,*.tsx | ForEach-Object {
  $full = $_.FullName
  if (Is-Ignored $full) { return }
  $text = Get-Content -LiteralPath $full -Raw -ErrorAction SilentlyContinue
  if ($null -eq $text) { return }
  $count = ([regex]::Matches($text,'(?m)^\s*export\s+default\b')).Count
  if ($count -gt 1) { $bad.Add("Duplicate default exports ($count): $full") | Out-Null }
}
if ($bad.Count) { Write-Host "❌ Default export check failed:" -ForegroundColor Red; $bad | % { Write-Host " - $_" }; exit 1 }
else { Write-Host "✅ Default export check passed." }