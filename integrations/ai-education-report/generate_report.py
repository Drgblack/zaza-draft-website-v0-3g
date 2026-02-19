#!/usr/bin/env python3
"""
Enhanced State of AI in Education 2025 Report Generator
Supports multiple output formats: PDF, DOCX, HTML

Usage:
    python generate_report.py --format pdf --output report.pdf
    python generate_report.py --format docx --output report.docx
    python generate_report.py --format html --output report.html
"""

import argparse
import sys
from pathlib import Path

# Import the main report generator
# Note: Make sure create_ai_education_report.py is in the same directory
try:
    from create_ai_education_report import ReportGenerator
except ImportError:
    print("Error: create_ai_education_report.py not found!")
    print("Please ensure both files are in the same directory.")
    sys.exit(1)

def convert_pdf_to_docx(pdf_path, docx_path):
    """Convert PDF to DOCX format using pdf2docx"""
    try:
        from pdf2docx import Converter
        print(f"Converting {pdf_path} to DOCX...")
        cv = Converter(pdf_path)
        cv.convert(docx_path)
        cv.close()
        print(f"âœ“ DOCX conversion complete: {docx_path}")
        return True
    except ImportError:
        print("Error: pdf2docx not installed.")
        print("Install with: pip install pdf2docx")
        return False
    except Exception as e:
        print(f"Error converting to DOCX: {e}")
        return False

def convert_pdf_to_html(pdf_path, html_path):
    """Convert PDF to HTML format with styling"""
    try:
        import pdfplumber
        
        print(f"Converting {pdf_path} to HTML...")
        
        # HTML template with modern styling
        html_parts = ["""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>State of AI in Education 2025</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #475569;
            background: #f8fafc;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        h1 {
            color: #8B5CF6;
            font-size: 2.5em;
            margin-bottom: 0.5em;
            border-bottom: 3px solid #8B5CF6;
            padding-bottom: 0.3em;
        }
        h2 {
            color: #1E293B;
            font-size: 2em;
            margin-top: 2em;
            margin-bottom: 0.5em;
        }
        h3 {
            color: #475569;
            font-size: 1.5em;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        p {
            margin-bottom: 1em;
            text-align: justify;
        }
        .stat-box {
            background: #F8FAFC;
            border: 2px solid #8B5CF6;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
        }
        .stat-number {
            font-size: 3.5em;
            color: #8B5CF6;
            font-weight: bold;
            display: block;
            margin-bottom: 0.2em;
        }
        .stat-label {
            font-size: 1.2em;
            font-weight: 600;
            color: #1E293B;
            display: block;
            margin-bottom: 0.5em;
        }
        .stat-desc {
            color: #64748b;
            font-size: 0.95em;
        }
        .quote {
            border-left: 4px solid #8B5CF6;
            padding-left: 20px;
            margin: 30px 0;
            font-style: italic;
            color: #8B5CF6;
            background: #F8FAFC;
            padding: 20px;
            border-radius: 8px;
        }
        .callout {
            background: #F0FDF4;
            border: 2px solid #10B981;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .callout-title {
            font-weight: bold;
            color: #10B981;
            margin-bottom: 10px;
            font-size: 1.1em;
        }
        .page-break {
            page-break-after: always;
            margin: 40px 0;
            border-bottom: 2px dashed #e2e8f0;
            padding-bottom: 40px;
        }
        ul {
            margin-left: 20px;
            margin-bottom: 1em;
        }
        li {
            margin-bottom: 0.5em;
        }
    </style>
</head>
<body>
    <div class="container">
"""]
        
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                text = page.extract_text()
                if text:
                    # Split into lines for processing
                    lines = text.split('\n')
                    current_para = []
                    
                    for line in lines:
                        line = line.strip()
                        if not line:
                            if current_para:
                                para_text = ' '.join(current_para)
                                # Detect headings (all caps or ending with colon)
                                if para_text.isupper() and len(para_text.split()) < 10:
                                    html_parts.append(f"<h2>{para_text}</h2>\n")
                                elif para_text.endswith(':') and len(para_text.split()) < 15:
                                    html_parts.append(f"<h3>{para_text}</h3>\n")
                                else:
                                    html_parts.append(f"<p>{para_text}</p>\n")
                                current_para = []
                        else:
                            current_para.append(line)
                    
                    # Add remaining paragraph
                    if current_para:
                        para_text = ' '.join(current_para)
                        html_parts.append(f"<p>{para_text}</p>\n")
                    
                    # Add page break except for last page
                    if page_num < len(pdf.pages) - 1:
                        html_parts.append('<div class="page-break"></div>\n')
        
        html_parts.append("""
    </div>
</body>
</html>
""")
        
        # Write HTML file
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(''.join(html_parts))
        
        print(f"âœ“ HTML conversion complete: {html_path}")
        return True
        
    except ImportError:
        print("Error: pdfplumber not installed.")
        print("Install with: pip install pdfplumber")
        return False
    except Exception as e:
        print(f"Error converting to HTML: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    parser = argparse.ArgumentParser(
        description='Generate State of AI in Education 2025 Report',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  Generate PDF:  python generate_report.py --format pdf --output report.pdf
  Generate DOCX: python generate_report.py --format docx --output report.docx
  Generate HTML: python generate_report.py --format html --output report.html
        """
    )
    parser.add_argument(
        '--format', 
        choices=['pdf', 'docx', 'html'], 
        default='pdf',
        help='Output format (default: pdf)'
    )
    parser.add_argument(
        '--output', 
        type=str, 
        required=True,
        help='Output file path'
    )
    
    args = parser.parse_args()
    
    # Setup paths
    output_path = Path(args.output)
    output_dir = output_path.parent
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Determine PDF path (always generate PDF first)
    if args.format == 'pdf':
        pdf_path = output_path
    else:
        pdf_path = output_dir / 'temp_report.pdf'
    
    # Generate the PDF report
    print("=" * 60)
    print("State of AI in Education 2025 - Report Generator")
    print("=" * 60)
    print(f"\nðŸ“„ Generating PDF report...")
    
    try:
        generator = ReportGenerator()
        generator.generate_report(str(pdf_path))
        print(f"âœ“ PDF generated successfully: {pdf_path}")
    except Exception as e:
        print(f"âœ- Error generating PDF: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    # Convert to requested format if needed
    if args.format == 'docx':
        print(f"\nðŸ“ Converting to Microsoft Word format...")
        if convert_pdf_to_docx(str(pdf_path), str(output_path)):
            # Clean up temp PDF
            if pdf_path != output_path:
                pdf_path.unlink()
        else:
            print("âœ- DOCX conversion failed")
            return 1
    
    elif args.format == 'html':
        print(f"\nðŸŒ Converting to HTML format...")
        if convert_pdf_to_html(str(pdf_path), str(output_path)):
            # Clean up temp PDF
            if pdf_path != output_path:
                pdf_path.unlink()
        else:
            print("âœ- HTML conversion failed")
            return 1
    
    print("\n" + "=" * 60)
    print("âœ“ Report generation complete!")
    print("=" * 60)
    print(f"\nðŸ“ Output file: {output_path.absolute()}")
    print(f"ðŸ“Š Format: {args.format.upper()}")
    print()
    
    return 0

if __name__ == "__main__":
    sys.exit(main())

