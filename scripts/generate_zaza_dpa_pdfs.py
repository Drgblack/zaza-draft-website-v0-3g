from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    ListFlowable,
    ListItem,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "legal"
OUTPUT_DIR = ROOT / "public" / "legal"


@dataclass
class DocumentSpec:
    source: Path
    output: Path
    title: str


def build_styles():
    stylesheet = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "DpaTitle",
            parent=stylesheet["Title"],
            fontName="Helvetica-Bold",
            fontSize=19,
            leading=24,
            textColor=colors.HexColor("#0F172A"),
            alignment=TA_CENTER,
            spaceAfter=10,
        ),
        "body": ParagraphStyle(
            "DpaBody",
            parent=stylesheet["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=colors.HexColor("#111827"),
            spaceAfter=5,
        ),
        "h2": ParagraphStyle(
            "DpaH2",
            parent=stylesheet["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.5,
            leading=16,
            textColor=colors.HexColor("#111827"),
            spaceBefore=8,
            spaceAfter=4,
        ),
        "h3": ParagraphStyle(
            "DpaH3",
            parent=stylesheet["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=13,
            textColor=colors.HexColor("#1F2937"),
            spaceBefore=5,
            spaceAfter=2,
        ),
        "meta": ParagraphStyle(
            "DpaMeta",
            parent=stylesheet["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=colors.HexColor("#475569"),
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "bullet": ParagraphStyle(
            "DpaBullet",
            parent=stylesheet["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            leftIndent=0,
            firstLineIndent=0,
            textColor=colors.HexColor("#111827"),
        ),
    }


def escape_text(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(escape_text(text), style)


def parse_markdown_lines(lines: Iterable[str], styles: dict[str, ParagraphStyle]):
    story = []
    bullet_buffer: list[str] = []

    def flush_bullets():
        nonlocal bullet_buffer, story
        if not bullet_buffer:
            return
        items = [
            ListItem(paragraph(item, styles["bullet"]), leftIndent=0)
            for item in bullet_buffer
        ]
        story.append(
            ListFlowable(
                items,
                bulletType="bullet",
                bulletFontName="Helvetica",
                bulletFontSize=9,
                bulletOffsetY=2,
                leftIndent=14,
            )
        )
        story.append(Spacer(1, 4))
        bullet_buffer = []

    for raw_line in lines:
        line = raw_line.rstrip()
        stripped = line.strip()

        if not stripped:
            flush_bullets()
            story.append(Spacer(1, 3))
            continue

        if stripped.startswith("- "):
            bullet_buffer.append(stripped[2:].strip())
            continue

        flush_bullets()

        if stripped.startswith("# "):
            story.append(paragraph(stripped[2:].strip(), styles["title"]))
        elif stripped.startswith("## "):
            story.append(paragraph(stripped[3:].strip(), styles["h2"]))
        elif stripped.startswith("### "):
            story.append(paragraph(stripped[4:].strip(), styles["h3"]))
        else:
            story.append(paragraph(stripped, styles["body"]))

    flush_bullets()
    return story


def add_page_decorations(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#CBD5E1"))
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, A4[1] - 18 * mm, A4[0] - doc.rightMargin, A4[1] - 18 * mm)
    canvas.line(doc.leftMargin, 16 * mm, A4[0] - doc.rightMargin, 16 * mm)

    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#475569"))
    canvas.drawString(doc.leftMargin, 10 * mm, "Zaza Draft Data Processing Agreement")
    canvas.drawRightString(A4[0] - doc.rightMargin, 10 * mm, f"Page {canvas.getPageNumber()}")
    canvas.restoreState()


def build_pdf(spec: DocumentSpec):
    styles = build_styles()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(spec.output),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=24 * mm,
        bottomMargin=22 * mm,
        title=spec.title,
        author="Zaza Technologies UG (haftungsbeschraenkt)",
    )

    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    template = PageTemplate(id="main", frames=[frame], onPage=add_page_decorations)
    doc.addPageTemplates([template])

    source_text = spec.source.read_text(encoding="utf-8")
    lines = source_text.splitlines()
    story = [
        paragraph("Version 1.0", styles["meta"]),
        paragraph("Prepared for Zaza Draft", styles["meta"]),
        Spacer(1, 8),
    ]
    story.extend(parse_markdown_lines(lines, styles))
    doc.build(story)


def main():
    documents = [
        DocumentSpec(
            source=SOURCE_DIR / "zaza-draft-dpa-en.md",
            output=OUTPUT_DIR / "zaza-draft-dpa-en.pdf",
            title="Zaza Draft Data Processing Agreement",
        ),
        DocumentSpec(
            source=SOURCE_DIR / "zaza-draft-dpa-de.md",
            output=OUTPUT_DIR / "zaza-draft-dpa-de.pdf",
            title="Zaza Draft Auftragsverarbeitungsvertrag",
        ),
    ]
    for spec in documents:
        build_pdf(spec)
        print(f"Generated {spec.output}")


if __name__ == "__main__":
    main()
