from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from pathlib import Path

OUT = Path("public/press-kit/zaza-brand-guidelines.pdf")
LOGO = Path("public/press-kit/brand/zaza-z-icon-1024.png")

w, h = A4
c = canvas.Canvas(str(OUT), pagesize=A4)

# Title
c.setFont("Helvetica-Bold", 22)
c.drawString(25*mm, h-25*mm, "Zaza Draft - Brand Guidelines (Press)")

c.setFont("Helvetica", 11)
c.drawString(25*mm, h-33*mm, "Last updated: 2025-12-12")

# Logo
if LOGO.exists():
    img = ImageReader(str(LOGO))
    c.drawImage(img, 25*mm, h-85*mm, width=35*mm, height=35*mm, mask='auto')

# Usage
y = h-95*mm
c.setFont("Helvetica-Bold", 14)
c.drawString(25*mm, y, "Logo usage")
y -= 8*mm

c.setFont("Helvetica", 11)
bullets = [
  "Use the official Z icon (colour) as provided in the press kit.",
  "Keep clear space around the logo - do not crowd it with other elements.",
  "Do not stretch, rotate, recolour, add shadows, or apply filters.",
  "Do not recreate or invent wordmarks - use plain text “Zaza Draft” if needed."
]
for b in bullets:
    c.drawString(28*mm, y, f"- {b}")
    y -= 6*mm

# Colours / typography (simple)
y -= 4*mm
c.setFont("Helvetica-Bold", 14)
c.drawString(25*mm, y, "Typography and styling")
y -= 8*mm
c.setFont("Helvetica", 11)
sty = [
  "Use the site typography and styling from the official website.",
  "If you need to write the name, use: Zaza Draft (capital Z, capital D)."
]
for s in sty:
    c.drawString(28*mm, y, f"- {s}")
    y -= 6*mm

# Company details
y -= 6*mm
c.setFont("Helvetica-Bold", 14)
c.drawString(25*mm, y, "Company details")
y -= 8*mm
c.setFont("Helvetica", 11)
details = [
  "Registered office:",
  "Gumbertstraße 150",
  "40229 Düsseldorf",
  "Deutschland",
  "",
  "Press contact: press@zazatechnologies.com",
  "Website: https://zazadraft.com"
]
for line in details:
    c.drawString(25*mm, y, line)
    y -= 6*mm

c.showPage()
c.save()
print(f"Wrote {OUT}")
