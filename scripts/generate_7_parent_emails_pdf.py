from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (
    HRFlowable,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


PURPLE = colors.HexColor("#7C3AED")
TEAL = colors.HexColor("#0F766E")
SLATE = colors.HexColor("#0F172A")
SLATE_SOFT = colors.HexColor("#334155")
ROSE_SOFT = colors.HexColor("#FFF1F2")
TEAL_SOFT = colors.HexColor("#ECFEFF")
LILAC_SOFT = colors.HexColor("#F5F3FF")
WHITE = colors.HexColor("#FFFFFF")


@dataclass
class ExampleSection:
    title: str
    before: list[str] = field(default_factory=list)
    after: list[str] = field(default_factory=list)
    what_changed: list[str] = field(default_factory=list)


@dataclass
class GuideContent:
    title: str = ""
    subtitle: str = ""
    cover_support_line: str = ""
    intro: list[str] = field(default_factory=list)
    sections: list[ExampleSection] = field(default_factory=list)
    closing: list[str] = field(default_factory=list)
    cta: list[str] = field(default_factory=list)


def parse_markdown(path: Path) -> GuideContent:
    lines = path.read_text(encoding="utf-8").splitlines()
    content = GuideContent()
    current_section: ExampleSection | None = None
    current_target: list[str] | None = None
    active_block: str | None = None

    def push_line(target: list[str], line: str) -> None:
        stripped = line.rstrip()
        if stripped:
            target.append(stripped)
        elif target and target[-1] != "":
            target.append("")

    i = 0
    while i < len(lines):
        raw = lines[i]
        line = raw.strip()

        if line.startswith("# "):
            content.title = line[2:].strip()
        elif line == "## Subtitle":
            i += 1
            while i < len(lines) and not lines[i].strip():
                i += 1
            content.subtitle = lines[i].strip()
        elif line == "## Cover support line":
            i += 1
            while i < len(lines) and not lines[i].strip():
                i += 1
            content.cover_support_line = lines[i].strip()
        elif line == "## Intro":
            active_block = "intro"
            current_target = content.intro
        elif line.startswith("## ") and line[3:5].isdigit():
            current_section = ExampleSection(title=line[6:].strip())
            content.sections.append(current_section)
            active_block = None
            current_target = None
        elif line == "## Closing section":
            active_block = "closing"
            current_target = content.closing
        elif line == "## CTA":
            active_block = "cta"
            current_target = content.cta
        elif line == "### BEFORE" and current_section is not None:
            current_target = current_section.before
        elif line == "### AFTER" and current_section is not None:
            current_target = current_section.after
        elif line == "### What changed" and current_section is not None:
            current_target = current_section.what_changed
        elif line.startswith("- ") and current_target is not None:
            current_target.append(line[2:].strip())
        elif current_target is not None:
            push_line(current_target, raw)
        i += 1

    for bucket in [content.intro, content.closing, content.cta]:
        while bucket and bucket[-1] == "":
            bucket.pop()
    for section in content.sections:
        for bucket in [section.before, section.after]:
            while bucket and bucket[-1] == "":
                bucket.pop()

    return content


def para_text(lines: Iterable[str]) -> str:
    parts: list[str] = []
    for line in lines:
        if line == "":
            parts.append("<br/><br/>")
        else:
            safe = (
                line.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
            )
            parts.append(safe)
    return "".join(
        part if part == "<br/><br/>" else (part + " ")
        for part in parts
    ).strip()


def build_pdf(source: Path, output: Path, logo_path: Path) -> None:
    content = parse_markdown(source)
    styles = getSampleStyleSheet()
    pdf_title = "Zaza Draft | 7 Parent Emails Teachers Should Never Send As-Is"

    title_style = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=23,
        leading=29,
        alignment=TA_CENTER,
        textColor=SLATE,
        spaceAfter=12,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=12,
        leading=18,
        alignment=TA_CENTER,
        textColor=SLATE_SOFT,
        spaceAfter=14,
    )
    support_style = ParagraphStyle(
        "Support",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        alignment=TA_CENTER,
        textColor=TEAL,
        spaceAfter=18,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.3,
        leading=15.2,
        textColor=SLATE_SOFT,
        spaceAfter=6,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=16,
        leading=21,
        textColor=PURPLE,
        spaceBefore=12,
        spaceAfter=8,
    )
    box_label_style = ParagraphStyle(
        "BoxLabel",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9.2,
        leading=12,
        textColor=SLATE,
        spaceAfter=6,
    )
    box_body_style = ParagraphStyle(
        "BoxBody",
        parent=body_style,
        fontSize=9.7,
        leading=14.2,
        spaceAfter=0,
    )
    changes_label_style = ParagraphStyle(
        "ChangesLabel",
        parent=box_label_style,
        textColor=TEAL,
    )
    cta_style = ParagraphStyle(
        "CTA",
        parent=body_style,
        fontName="Helvetica-Bold",
        textColor=SLATE,
    )

    story = []
    doc = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        leftMargin=17 * mm,
        rightMargin=17 * mm,
        topMargin=16 * mm,
        bottomMargin=18 * mm,
        title=pdf_title,
        author="Zaza Draft",
        subject="A practical guide for teachers handling difficult parent emails.",
    )

    story.append(Spacer(1, 6))
    story.append(Image(str(logo_path), width=72 * mm, height=48 * mm))
    story.append(Spacer(1, 14))
    story.append(Paragraph(content.title, title_style))
    story.append(Paragraph(content.subtitle, subtitle_style))
    story.append(
        Table(
            [[Paragraph(content.cover_support_line, support_style)]],
            colWidths=[doc.width],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), LILAC_SOFT),
                    ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#C4B5FD")),
                    ("ROUNDEDCORNERS", [10, 10, 10, 10]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 14),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ]
            ),
        )
    )
    story.append(Spacer(1, 16))
    for paragraph in para_text(content.intro).split("<br/><br/>"):
        story.append(Paragraph(paragraph.strip(), body_style))
    story.append(Spacer(1, 10))

    for index, section in enumerate(content.sections):
        if index == 0:
            story.append(HRFlowable(color=colors.HexColor("#DDD6FE"), width="100%"))
        story.append(Spacer(1, 10))
        story.append(Paragraph(section.title, section_style))

        before_box = Table(
            [
                [Paragraph("BEFORE", box_label_style)],
                [Paragraph(para_text(section.before), box_body_style)],
            ],
            colWidths=[doc.width / 2 - 6],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), ROSE_SOFT),
                    ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#FDA4AF")),
                    ("LEFTPADDING", (0, 0), (-1, -1), 12),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                    ("TOPPADDING", (0, 0), (-1, -1), 10),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            ),
        )

        after_label = [
            Paragraph("AFTER", box_label_style),
        ]
        after_box = Table(
            [
                [Paragraph("AFTER", box_label_style)],
                [Paragraph(para_text(section.after), box_body_style)],
            ],
            colWidths=[doc.width / 2 - 6],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), TEAL_SOFT),
                    ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#5EEAD4")),
                    ("LEFTPADDING", (0, 0), (-1, -1), 12),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                    ("TOPPADDING", (0, 0), (-1, -1), 10),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            ),
        )

        story.append(
            Table(
                [[before_box, after_box]],
                colWidths=[doc.width / 2 - 4, doc.width / 2 - 4],
                style=TableStyle(
                    [
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 0),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                        ("TOPPADDING", (0, 0), (-1, -1), 0),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                    ]
                ),
            )
        )
        story.append(Spacer(1, 8))

        change_items = [
            ListItem(Paragraph(item, body_style), leftIndent=0)
            for item in section.what_changed
        ]
        changes_box = Table(
            [
                [Paragraph("What changed", changes_label_style)],
                [ListFlowable(change_items, bulletType="bullet", leftIndent=16)],
            ],
            colWidths=[doc.width],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), LILAC_SOFT),
                    ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#C4B5FD")),
                    ("LEFTPADDING", (0, 0), (-1, -1), 12),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                    ("TOPPADDING", (0, 0), (-1, -1), 10),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ]
            ),
        )
        story.append(changes_box)

    story.append(PageBreak())
    story.append(Paragraph("Closing section", section_style))
    for paragraph in para_text(content.closing).split("<br/><br/>"):
        story.append(Paragraph(paragraph.strip(), body_style))
    story.append(Spacer(1, 14))
    story.append(
        Table(
            [
                [Paragraph("Start with the draft that is already open.", changes_label_style)],
                [Paragraph(para_text(content.cta), cta_style)],
            ],
            colWidths=[doc.width],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#ECFDF5")),
                    ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#34D399")),
                    ("LEFTPADDING", (0, 0), (-1, -1), 14),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                    ("TOPPADDING", (0, 0), (-1, -1), 12),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
                ]
            ),
        )
    )

    logo_reader = ImageReader(str(logo_path))

    def draw_page(canvas, doc):
        canvas.saveState()
        canvas.setTitle(pdf_title)
        canvas.setAuthor("Zaza Draft")
        canvas.setSubject(
            "A practical guide for teachers handling difficult parent emails."
        )
        canvas.setFillColor(colors.HexColor("#F8FAFC"))
        canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
        canvas.setFillColor(PURPLE)
        canvas.rect(0, A4[1] - 12 * mm, A4[0], 12 * mm, fill=1, stroke=0)
        canvas.drawImage(
            logo_reader,
            doc.leftMargin,
            doc.bottomMargin - 8 * mm,
            width=18 * mm,
            height=12 * mm,
            mask="auto",
            preserveAspectRatio=True,
        )
        canvas.setFont("Helvetica", 8.5)
        canvas.setFillColor(SLATE_SOFT)
        canvas.drawString(
            doc.leftMargin + 22 * mm,
            doc.bottomMargin - 3 * mm,
            "Zaza Draft  |  7 Parent Emails Teachers Should Never Send As-Is",
        )
        canvas.drawRightString(
            A4[0] - doc.rightMargin,
            doc.bottomMargin - 3 * mm,
            f"Page {canvas.getPageNumber()}",
        )
        canvas.restoreState()

    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)


if __name__ == "__main__":
    repo = Path(__file__).resolve().parents[1]
    build_pdf(
        source=repo / "docs" / "guides" / "7-parent-emails-teachers-should-never-send-as-is.md",
        output=repo / "public" / "guides" / "7-parent-emails-teachers-should-never-send-as-is.pdf",
        logo_path=repo / "public" / "z-logo.png",
    )
