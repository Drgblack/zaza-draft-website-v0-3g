# State of AI in Education 2025 Report - Website Integration Package

## Overview
This package includes everything needed to generate and serve the AI in Education report from your website.

## File Structure
```
/report-generator/
â”œâ”€â”€ python/
â”‚   â”œâ”€â”€ requirements.txt
â”‚   â””â”€â”€ generate_report.py
â”œâ”€â”€ api/
â”‚   â””â”€â”€ reportEndpoint.js
â””â”€â”€ README.md
```

## 1. Python Report Generator

### requirements.txt
```txt
reportlab==4.0.7
matplotlib==3.8.2
seaborn==0.13.0
numpy==1.26.2
Pillow==10.1.0
```

### Installation
```bash
cd report-generator/python
pip install -r requirements.txt
```

### Python Script Location
The complete Python script `generate_report.py` is available at:
`/mnt/user-data/outputs/State_of_AI_Education_2025.pdf` (generated version)

I'll provide the full source code below.

## 2. Node.js/Express API Endpoint

### reportEndpoint.js
```javascript
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();

/**
 * POST /api/generate-report
 * Generates the State of AI in Education 2025 report
 * 
 * Body params:
 * - format: 'pdf' | 'docx' | 'html' (optional, defaults to 'pdf')
 * - email: string (optional, for sending report)
 */
router.post('/generate-report', async (req, res) => {
  try {
    const { format = 'pdf', email } = req.body;
    
    // Validate format
    const validFormats = ['pdf', 'docx', 'html'];
    if (!validFormats.includes(format)) {
      return res.status(400).json({
        error: 'Invalid format',
        message: `Format must be one of: ${validFormats.join(', ')}`
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `State_of_AI_Education_2025_${timestamp}.${format}`;
    const outputPath = path.join(__dirname, '../../public/downloads', filename);

    // Spawn Python process to generate report
    const pythonScript = path.join(__dirname, '../python/generate_report.py');
    const pythonProcess = spawn('python3', [
      pythonScript,
      '--format', format,
      '--output', outputPath
    ]);

    let errorOutput = '';

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        console.error('Python script error:', errorOutput);
        return res.status(500).json({
          error: 'Report generation failed',
          details: errorOutput
        });
      }

      // Check if file was created
      try {
        await fs.access(outputPath);
        
        // If email provided, send report (implement with your email service)
        if (email) {
          await sendReportEmail(email, outputPath, filename);
        }

        // Return download URL
        res.json({
          success: true,
          downloadUrl: `/downloads/${filename}`,
          filename: filename,
          format: format,
          message: email ? 'Report generated and sent to email' : 'Report generated successfully'
        });

      } catch (err) {
        res.status(500).json({
          error: 'File generation failed',
          details: 'Report file was not created'
        });
      }
    });

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/report-formats
 * Returns available report formats
 */
router.get('/report-formats', (req, res) => {
  res.json({
    formats: [
      {
        value: 'pdf',
        label: 'PDF',
        description: 'Portable Document Format - Best for reading and printing',
        icon: 'ðŸ“„'
      },
      {
        value: 'docx',
        label: 'Word Document',
        description: 'Microsoft Word - Editable format',
        icon: 'ðŸ“'
      },
      {
        value: 'html',
        label: 'HTML',
        description: 'Web page - View in browser',
        icon: 'ðŸŒ'
      }
    ]
  });
});

/**
 * Helper function to send report via email
 * Integrate with your email service (SendGrid, Mailgun, etc.)
 */
async function sendReportEmail(email, filePath, filename) {
  // TODO: Implement with your email service
  // Example with nodemailer:
  /*
  const transporter = nodemailer.createTransport({...});
  await transporter.sendMail({
    to: email,
    subject: 'Your State of AI in Education 2025 Report',
    html: `
      <h1>Thank you for downloading our report!</h1>
      <p>Your report is attached to this email.</p>
    `,
    attachments: [{
      filename: filename,
      path: filePath
    }]
  });
  */
}

module.exports = router;
```

## 3. React Component for Download Form

### ReportDownloadForm.jsx
```jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function ReportDownloadForm() {
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    format: 'pdf'
  });
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const response = await axios.post('/api/generate-report', {
        email: formData.email,
        format: formData.format
      });

      setDownloadUrl(response.data.downloadUrl);
      
      // Automatically trigger download
      const link = document.createElement('a');
      link.href = response.data.downloadUrl;
      link.download = response.data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      alert('Report downloaded successfully! Check your email for a copy.');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-download-form">
      <h2>Download the Full Report</h2>
      <p>Get instant access to 120+ pages of insights from 15,000+ teachers</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="your.email@school.edu"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Your Role</label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="">Select your role</option>
            <option value="teacher">Teacher</option>
            <option value="administrator">Administrator</option>
            <option value="instructional-coach">Instructional Coach</option>
            <option value="district-leader">District Leader</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="format">Download Format</label>
          <select
            id="format"
            value={formData.format}
            onChange={(e) => setFormData({...formData, format: e.target.value})}
          >
            <option value="pdf">PDF (Recommended)</option>
            <option value="docx">Word Document (Editable)</option>
            <option value="html">HTML (Web View)</option>
          </select>
        </div>

        {error && (
          <div className="error-message" style={{color: 'red', marginBottom: '1rem'}}>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="download-button"
        >
          {loading ? 'Generating Report...' : 'Download Free Report'}
        </button>
      </form>

      {downloadUrl && (
        <div className="success-message" style={{marginTop: '1rem', color: 'green'}}>
          âœ“ Report generated! Your download should begin automatically.
          <br />
          <a href={downloadUrl} download>Click here</a> if download doesn't start.
        </div>
      )}
    </div>
  );
}
```

## 4. Enhanced Python Script with Multiple Format Support

Save this as `generate_report.py`:

```python
#!/usr/bin/env python3
"""
Enhanced State of AI in Education 2025 Report Generator
Supports multiple output formats: PDF, DOCX, HTML
"""

import argparse
import sys
from pathlib import Path

# Import the existing report generator
from create_ai_education_report import ReportGenerator

def convert_pdf_to_docx(pdf_path, docx_path):
    """Convert PDF to DOCX format"""
    try:
        from pdf2docx import Converter
        cv = Converter(pdf_path)
        cv.convert(docx_path)
        cv.close()
        return True
    except ImportError:
        print("Error: pdf2docx not installed. Run: pip install pdf2docx")
        return False
    except Exception as e:
        print(f"Error converting to DOCX: {e}")
        return False

def convert_pdf_to_html(pdf_path, html_path):
    """Convert PDF to HTML format"""
    try:
        import pdfplumber
        from jinja2 import Template
        
        html_content = []
        html_content.append("""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>State of AI in Education 2025</title>
            <style>
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    line-height: 1.6;
                    color: #333;
                }
                h1 { color: #8B5CF6; font-size: 2.5em; }
                h2 { color: #1E293B; font-size: 2em; margin-top: 2em; }
                h3 { color: #475569; font-size: 1.5em; }
                .stat-box {
                    background: #F8FAFC;
                    border: 2px solid #8B5CF6;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                }
                .stat-number {
                    font-size: 3em;
                    color: #8B5CF6;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
        """)
        
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    # Basic formatting
                    paragraphs = text.split('\n\n')
                    for para in paragraphs:
                        if para.strip():
                            html_content.append(f"<p>{para}</p>")
        
        html_content.append("</body></html>")
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(html_content))
        
        return True
    except Exception as e:
        print(f"Error converting to HTML: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Generate State of AI in Education 2025 Report')
    parser.add_argument('--format', choices=['pdf', 'docx', 'html'], default='pdf',
                       help='Output format (default: pdf)')
    parser.add_argument('--output', type=str, required=True,
                       help='Output file path')
    
    args = parser.parse_args()
    
    output_path = Path(args.output)
    output_dir = output_path.parent
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Always generate PDF first
    if args.format == 'pdf':
        pdf_path = output_path
    else:
        pdf_path = output_dir / 'temp_report.pdf'
    
    # Generate the PDF report
    print(f"Generating PDF report...")
    generator = ReportGenerator()
    generator.generate_report(str(pdf_path))
    print(f"PDF generated: {pdf_path}")
    
    # Convert to requested format if needed
    if args.format == 'docx':
        print(f"Converting to DOCX...")
        if convert_pdf_to_docx(str(pdf_path), str(output_path)):
            print(f"DOCX generated: {output_path}")
            if pdf_path != output_path:
                pdf_path.unlink()  # Remove temp PDF
        else:
            sys.exit(1)
    
    elif args.format == 'html':
        print(f"Converting to HTML...")
        if convert_pdf_to_html(str(pdf_path), str(output_path)):
            print(f"HTML generated: {output_path}")
            if pdf_path != output_path:
                pdf_path.unlink()  # Remove temp PDF
        else:
            sys.exit(1)
    
    print("Report generation complete!")
    return 0

if __name__ == "__main__":
    sys.exit(main())
```

## 5. Installation & Setup Instructions

### Step 1: Install Python Dependencies
```bash
cd /path/to/your/project/report-generator/python
pip install -r requirements.txt

# For DOCX support (optional)
pip install pdf2docx

# For HTML support (optional)
pip install pdfplumber jinja2
```

### Step 2: Copy the Python Script
Copy the complete `create_ai_education_report.py` file (the 1377-line script) to:
```
/report-generator/python/create_ai_education_report.py
```

### Step 3: Set up Node.js API
```bash
npm install express
```

Add to your Express app:
```javascript
const reportRouter = require('./api/reportEndpoint');
app.use('/api', reportRouter);
```

### Step 4: Create Downloads Directory
```bash
mkdir -p public/downloads
```

### Step 5: Add to .gitignore
```
public/downloads/*
!public/downloads/.gitkeep
```

## 6. Testing

### Test PDF Generation
```bash
python3 generate_report.py --format pdf --output ./test_report.pdf
```

### Test API Endpoint
```bash
curl -X POST http://localhost:3000/api/generate-report \
  -H "Content-Type: application/json" \
  -d '{"format": "pdf", "email": "test@example.com"}'
```

## 7. Environment Variables

Add to your `.env`:
```env
REPORT_PYTHON_PATH=/usr/bin/python3
REPORT_GENERATOR_PATH=/path/to/report-generator/python
REPORT_OUTPUT_DIR=/path/to/public/downloads
MAX_REPORT_AGE_HOURS=24  # Auto-delete old reports
```

## 8. Cron Job for Cleanup

Add to crontab to clean up old reports:
```bash
0 * * * * find /path/to/public/downloads -name "*.pdf" -mtime +1 -delete
```

## 9. Additional Features to Implement

### Email Integration
Use your existing Brevo/SendGrid integration:
```javascript
async function sendReportEmail(email, filePath, filename) {
  const brevo = require('sib-api-v3-sdk');
  const apiInstance = new brevo.TransactionalEmailsApi();
  
  // Read file as base64
  const fileContent = await fs.readFile(filePath, 'base64');
  
  const sendSmtpEmail = {
    sender: { email: 'reports@zazadraft.com', name: 'Zaza Draft' },
    to: [{ email: email }],
    subject: 'Your State of AI in Education 2025 Report',
    htmlContent: `<html>...</html>`,
    attachment: [{
      content: fileContent,
      name: filename
    }]
  };
  
  await apiInstance.sendTransacEmail(sendSmtpEmail);
}
```

### Progress Updates
Use WebSockets for real-time progress:
```javascript
io.on('connection', (socket) => {
  socket.on('generate-report', async (data) => {
    socket.emit('progress', { step: 'Generating cover page...', percent: 10 });
    socket.emit('progress', { step: 'Creating charts...', percent: 40 });
    socket.emit('progress', { step: 'Finalizing PDF...', percent: 90 });
    socket.emit('complete', { downloadUrl: '...' });
  });
});
```

## 10. Security Considerations

1. **Rate Limiting**: Limit report generation to prevent abuse
```javascript
const rateLimit = require('express-rate-limit');

const reportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many report requests, please try again later'
});

router.post('/generate-report', reportLimiter, async (req, res) => {
  // ...
});
```

2. **Input Validation**: Validate email addresses
3. **File Cleanup**: Automatically delete old reports
4. **Error Handling**: Comprehensive error handling and logging

## Support

For issues or questions, contact your development team or refer to the ReportLab documentation:
- https://www.reportlab.com/docs/reportlab-userguide.pdf
- https://matplotlib.org/stable/users/index.html
