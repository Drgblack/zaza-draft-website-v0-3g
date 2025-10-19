param(
  [string]$Root = "public/resources",
  [string]$Reference = "design/reference.docx"  # optional Word style
)

function Have($cmd){ Get-Command $cmd -ErrorAction SilentlyContinue | ForEach-Object { $_ } }

$hasPandoc = Have "pandoc"
if (-not $hasPandoc){ Write-Error "Pandoc not found. Install with: winget install JGM.Pandoc"; exit 1 }

$pdfEngine = $null
if (Have "wkhtmltopdf") { $pdfEngine = "--pdf-engine=wkhtmltopdf" }

Get-ChildItem $Root -Directory | ForEach-Object {
  $dir = $_.FullName
  $build = Join-Path $dir "build"
  if (-not (Test-Path $build)) { New-Item -ItemType Directory -Force -Path $build | Out-Null }

  foreach ($lang in "en","de") {
    $md = Join-Path $dir "$lang.md"
    if (-not (Test-Path $md)) { continue }

    $docx = Join-Path $build "$lang.docx"
    $pdf  = Join-Path $build "$lang.pdf"

    $refFlag = (Test-Path $Reference) ? "--reference-doc=`"$Reference`"" : ""

    Write-Host "→ $md -> $docx"
    pandoc "`"$md`"" --from=gfm --to=docx $refFlag -o "`"$docx`""

    if ($pdfEngine) {
      Write-Host "→ $md -> $pdf"
      pandoc "`"$md`"" --from=gfm $pdfEngine -o "`"$pdf`""
    } else {
      Write-Host "   (Skipping PDF: no pdf engine installed)"
    }
  }
}
