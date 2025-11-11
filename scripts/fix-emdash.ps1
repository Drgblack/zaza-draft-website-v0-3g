$ErrorActionPreference = "Stop"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$roots = @(".\app", ".\content", ".\lib", ".\src")
$exts  = @("*.ts","*.tsx","*.md","*.mdx","*.css","*.json")
$emdash = [char]0x2014
$endash = [char]0x2013
$fixed = 0
foreach ($root in $roots) {
  if (-not (Test-Path $root)) { continue }
  foreach ($ext in $exts) {
    Get-ChildItem -Path $root -Recurse -File -Include $ext |
      Where-Object { $_.FullName -notmatch '(\\|/)(node_modules|\.next|__backup.*|backups|\.github|public)(\\|/)?' } |
      ForEach-Object {
        $p = $_.FullName
        $t = Get-Content -LiteralPath $p -Raw -ErrorAction SilentlyContinue
        if ($null -eq $t) { return }
        $n = $t.Replace($emdash,'-').Replace($endash,'-')
        if ($n -ne $t) { [IO.File]::WriteAllText($p, $n, $utf8NoBom); $fixed++; Write-Host "Fixed: $p" }
      }
  }
}
Write-Host "✅ Done. Files updated: $fixed"
