from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
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
PURPLE_SOFT = colors.HexColor("#F5F3FF")
TEAL = colors.HexColor("#0F766E")
TEAL_SOFT = colors.HexColor("#ECFEFF")
ROSE = colors.HexColor("#E11D48")
ROSE_SOFT = colors.HexColor("#FFF1F2")
SLATE = colors.HexColor("#0F172A")
SLATE_MID = colors.HexColor("#334155")
SLATE_LIGHT = colors.HexColor("#E2E8F0")
PAPER = colors.HexColor("#F8FAFC")
WHITE = colors.white


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
            current_target = content.intro
        elif (
            line.startswith("## ")
            and ". " in line[3:]
            and line[3:].split(".", 1)[0].isdigit()
        ):
            current_section = ExampleSection(title=line.split(". ", 1)[1].strip())
            content.sections.append(current_section)
            current_target = None
        elif line == "## Closing section":
            current_target = content.closing
        elif line == "## CTA":
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


def lines_to_html(lines: Iterable[str]) -> str:
    parts: list[str] = []
    for line in lines:
        if line == "":
            parts.append("<br/><br/>")
            continue
        safe = (
            line.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
        )
        parts.append(f"{safe} ")
    return "".join(parts).strip()


def paragraph_block(lines: Iterable[str], style: ParagraphStyle) -> list[Paragraph]:
    html = lines_to_html(lines)
    return [Paragraph(chunk.strip(), style) for chunk in html.split("<br/><br/>") if chunk.strip()]


def build_example_tile(
    section: ExampleSection,
    doc: SimpleDocTemplate,
    title_style: ParagraphStyle,
    tile_body_style: ParagraphStyle,
    label_style: ParagraphStyle,
    changes_heading_style: ParagraphStyle,
    changes_body_style: ParagraphStyle,
) -> KeepTogether:
    before_box = Table(
        [
            [Paragraph("Before", label_style)],
            [Paragraph(lines_to_html(section.before), tile_body_style)],
        ],
        colWidths=[doc.width / 2 - 16],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), ROSE_SOFT),
                ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#FDA4AF")),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        ),
    )

    after_header = Table(
        [[Paragraph("After", label_style), Paragraph("Safer version", changes_heading_style)]],
        colWidths=[doc.width / 2 - 120, 96],
        style=TableStyle(
            [
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        ),
    )
    after_box = Table(
        [
            [after_header],
            [Paragraph(lines_to_html(section.after), tile_body_style)],
        ],
        colWidths=[doc.width / 2 - 16],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), TEAL_SOFT),
                ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#5EEAD4")),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        ),
    )

    paired_boxes = Table(
        [[before_box, after_box]],
        colWidths=[doc.width / 2 - 8, doc.width / 2 - 8],
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

    change_items = [
        ListItem(Paragraph(item, changes_body_style), leftIndent=0)
        for item in section.what_changed
    ]
    changes_box = Table(
        [
            [Paragraph("What changed", changes_heading_style)],
            [ListFlowable(change_items, bulletType="bullet", leftIndent=14)],
        ],
        colWidths=[doc.width - 28],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PURPLE_SOFT),
                ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#C4B5FD")),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        ),
    )

    outer = Table(
        [
            [Paragraph(section.title, title_style)],
            [paired_boxes],
            [changes_box],
        ],
        colWidths=[doc.width],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 0.9, SLATE_LIGHT),
                ("ROUNDEDCORNERS", [16, 16, 16, 16]),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 14),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        ),
    )
    return KeepTogether([outer, Spacer(1, 14)])


def build_pdf(source: Path, output: Path, logo_path: Path) -> None:
    content = parse_markdown(source)
    styles = getSampleStyleSheet()
    pdf_title = "Zaza Draft | 7 Parent Emails Teachers Should Never Send As-Is"

    brand_style = ParagraphStyle(
        "Brand",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=16,
        textColor=SLATE,
    )
    eyebrow_style = ParagraphStyle(
        "Eyebrow",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11,
        textColor=PURPLE,
        alignment=TA_CENTER,
        spaceAfter=8,
    )
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=28,
        textColor=SLATE,
        alignment=TA_CENTER,
        spaceAfter=10,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=11.3,
        leading=17,
        textColor=SLATE_MID,
        alignment=TA_CENTER,
        spaceAfter=12,
    )
    support_style = ParagraphStyle(
        "Support",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=14,
        textColor=TEAL,
        alignment=TA_CENTER,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.2,
        leading=15.8,
        textColor=SLATE_MID,
        spaceAfter=6,
    )
    example_title_style = ParagraphStyle(
        "ExampleTitle",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=18,
        textColor=SLATE,
        spaceAfter=10,
    )
    label_style = ParagraphStyle(
        "Label",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=11,
        textColor=SLATE,
        textTransform=None,
    )
    tile_body_style = ParagraphStyle(
        "TileBody",
        parent=body_style,
        fontSize=9.5,
        leading=14.3,
        spaceAfter=0,
    )
    changes_heading_style = ParagraphStyle(
        "ChangesHeading",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=8.6,
        leading=11,
        textColor=TEAL,
    )
    changes_body_style = ParagraphStyle(
        "ChangesBody",
        parent=body_style,
        fontSize=9.3,
        leading=13.4,
        leftIndent=0,
        spaceAfter=0,
    )
    cta_heading_style = ParagraphStyle(
        "CtaHeading",
        parent=styles["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=15,
        textColor=SLATE,
        spaceAfter=6,
    )
    cta_body_style = ParagraphStyle(
        "CtaBody",
        parent=body_style,
        fontName="Helvetica-Bold",
        textColor=SLATE,
        fontSize=10.4,
    )

    doc = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        leftMargin=17 * mm,
        rightMargin=17 * mm,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
        title=pdf_title,
        author="Zaza Draft",
        subject="A practical guide for teachers handling difficult parent emails.",
    )

    story: list = []

    logo = Image(str(logo_path), width=18 * mm, height=18 * mm)
    logo_lockup = Table(
        [[logo, Paragraph("Zaza Draft", brand_style)]],
        colWidths=[22 * mm, doc.width - 22 * mm],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        ),
    )
    story.append(logo_lockup)
    story.append(Spacer(1, 20))
    story.append(Paragraph("Free practical guide", eyebrow_style))
    story.append(Paragraph(content.title, title_style))
    story.append(Paragraph(content.subtitle, subtitle_style))
    story.append(
        Table(
            [[Paragraph(content.cover_support_line, support_style)]],
            colWidths=[doc.width],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PURPLE_SOFT),
                    ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#C4B5FD")),
                    ("ROUNDEDCORNERS", [12, 12, 12, 12]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 16),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                    ("TOPPADDING", (0, 0), (-1, -1), 10),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ]
            ),
        )
    )
    story.append(Spacer(1, 18))
    for paragraph in paragraph_block(content.intro, body_style):
        story.append(paragraph)
    story.append(Spacer(1, 12))
    story.append(HRFlowable(color=colors.HexColor("#DDD6FE"), width="100%"))
    story.append(Spacer(1, 14))

    for section in content.sections:
        story.append(
            build_example_tile(
                section,
                doc,
                example_title_style,
                tile_body_style,
                label_style,
                changes_heading_style,
                changes_body_style,
            )
        )

    story.append(PageBreak())
    story.append(Paragraph("Why this guide matters", example_title_style))
    for paragraph in paragraph_block(content.closing, body_style):
        story.append(paragraph)
    story.append(Spacer(1, 14))
    story.append(
        Table(
            [
                [Paragraph("Start with the draft that is already open", cta_heading_style)],
                [Paragraph(lines_to_html(content.cta), cta_body_style)],
            ],
            colWidths=[doc.width],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#ECFDF5")),
                    ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#34D399")),
                    ("ROUNDEDCORNERS", [14, 14, 14, 14]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 16),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                    ("TOPPADDING", (0, 0), (-1, -1), 14),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
                ]
            ),
        )
    )

    def draw_page(canvas, _doc):
        canvas.saveState()
        canvas.setTitle(pdf_title)
        canvas.setAuthor("Zaza Draft")
        canvas.setSubject("A practical guide for teachers handling difficult parent emails.")
        canvas.setFillColor(PAPER)
        canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
        canvas.setFillColor(PURPLE)
        canvas.rect(0, A4[1] - 11 * mm, A4[0], 11 * mm, fill=1, stroke=0)
        canvas.setStrokeColor(colors.HexColor("#E2E8F0"))
        canvas.line(_doc.leftMargin, 15 * mm, A4[0] - _doc.rightMargin, 15 * mm)
        canvas.setFont("Helvetica-Bold", 8.5)
        canvas.setFillColor(SLATE)
        canvas.drawString(_doc.leftMargin, 10.8 * mm, "Zaza Draft")
        canvas.setFont("Helvetica", 8.5)
        canvas.setFillColor(SLATE_MID)
        canvas.drawString(_doc.leftMargin + 24 * mm, 10.8 * mm, "7 Parent Emails Teachers Should Never Send As-Is")
        canvas.drawRightString(
            A4[0] - _doc.rightMargin,
            10.8 * mm,
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
