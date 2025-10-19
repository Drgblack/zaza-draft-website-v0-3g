New-Item -ItemType Directory -Force -Path data/resources | Out-Null
$indexPath = "data/resources/resources.index.json"
$items = @()
Get-ChildItem -Path "public/resources" -Directory | ForEach-Object {
  $meta = Join-Path $_.FullName "meta.json"
  if (Test-Path $meta) {
    $items += (Get-Content $meta -Raw | ConvertFrom-Json)
  }
}
$items | ConvertTo-Json -Depth 10 | Set-Content $indexPath -Encoding UTF8
Write-Host "✅ Rebuilt $indexPath with $($items.Count) item(s)."
