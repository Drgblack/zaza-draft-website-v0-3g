# State of AI in Education 2025 Report - Complete Integration Guide

## Ã°Å¸"Â¦ Package Contents

You now have everything needed to integrate the report generation into your website:

### Files Provided:

1. **create_ai_education_report.py** - Main report generator (1,377 lines)
2. **generate_report.py** - CLI wrapper with format conversion
3. **requirements.txt** - Python dependencies
4. **report_generator_package.md** - Full integration documentation
5. **State_of_AI_Education_2025.pdf** - Sample generated report

## Ã°Å¸Å¡â‚¬ Quick Start for Claude Code

### Step 1: Set Up Python Environment

```bash
# Create a new directory in your project
mkdir -p report-generator/python
cd report-generator/python

# Copy the files
# (Claude Code: copy the files from /mnt/user-data/outputs/)
# - create_ai_education_report.py
# - generate_report.py
# - requirements.txt

# Install dependencies
pip install -r requirements.txt

# Optional: For DOCX support
pip install pdf2docx

# Optional: For HTML support
pip install pdfplumber jinja2
```

### Step 2: Test Report Generation

```bash
# Test PDF generation
python generate_report.py --format pdf --output test_report.pdf

# Test DOCX generation (if pdf2docx installed)
python generate_report.py --format docx --output test_report.docx

# Test HTML generation (if pdfplumber installed)
python generate_report.py --format html --output test_report.html
```

## Ã°Å¸"Å’ Website Integration Options

### Option 1: Simple Download Link (Easiest)

Pre-generate the PDF and serve it statically:

```javascript
// In your React component
<a
  href="/downloads/State_of_AI_Education_2025.pdf"
  download
  className="download-button"
>
  Download Free Report (PDF)
</a>
```

### Option 2: Dynamic Generation via API (Recommended)

#### Backend Setup (Node.js/Express)

1. Create API endpoint file: `api/reportEndpoint.js`

```javascript
const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs").promises;
const router = express.Router();

router.post("/generate-report", async (req, res) => {
  try {
    const { format = "pdf", email } = req.body;

    // Validate format
    if (!["pdf", "docx", "html"].includes(format)) {
      return res.status(400).json({ error: "Invalid format" });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `State_of_AI_Education_2025_${timestamp}.${format}`;
    const outputPath = path.join(__dirname, "../public/downloads", filename);

    // Path to Python script
    const pythonScript = path.join(
      __dirname,
      "../report-generator/python/generate_report.py",
    );

    // Spawn Python process
    const pythonProcess = spawn("python3", [
      pythonScript,
      "--format",
      format,
      "--output",
      outputPath,
    ]);

    let stdout = "";
    let stderr = "";

    pythonProcess.stdout.on("data", (data) => {
      stdout += data.toString();
      console.log(data.toString());
    });

    pythonProcess.stderr.on("data", (data) => {
      stderr += data.toString();
      console.error(data.toString());
    });

    pythonProcess.on("close", async (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: "Report generation failed",
          details: stderr,
        });
      }

      // Verify file was created
      try {
        await fs.access(outputPath);

        res.json({
          success: true,
          downloadUrl: `/downloads/${filename}`,
          filename: filename,
          format: format,
        });
      } catch (err) {
        res.status(500).json({
          error: "File not created",
          details: err.message,
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

module.exports = router;
```

2. Register the router in your main app:

```javascript
// In your main server file (e.g., server.js or app.js)
const reportRouter = require("./api/reportEndpoint");
app.use("/api", reportRouter);

// Serve static files from downloads directory
app.use("/downloads", express.static("public/downloads"));
```

#### Frontend Setup (React)

Create a download form component:

```jsx
// components/ReportDownloadForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function ReportDownloadForm() {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    format: "pdf",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/generate-report", {
        email: formData.email,
        format: formData.format,
      });

      // Trigger download
      const link = document.createElement("a");
      link.href = response.data.downloadUrl;
      link.download = response.data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Success notification
      alert("Report downloaded successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="your.email@school.edu"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium">
          Your Role
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select your role</option>
          <option value="teacher">Teacher</option>
          <option value="administrator">Administrator</option>
          <option value="coach">Instructional Coach</option>
          <option value="district">District Leader</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="format" className="block text-sm font-medium">
          Download Format
        </label>
        <select
          id="format"
          value={formData.format}
          onChange={(e) => setFormData({ ...formData, format: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="pdf">Ã°Å¸"â€ž PDF (Recommended)</option>
          <option value="docx">Ã°Å¸"Â Word Document (Editable)</option>
          <option value="html">Ã°Å¸Å’Â HTML (Web View)</option>
        </select>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Generating Report..." : "Download Free Report"}
      </button>
    </form>
  );
}
```

### Option 3: Email Delivery Integration

Add email sending to your API endpoint:

```javascript
// Using your existing Brevo integration
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

async function sendReportEmail(email, filePath, filename) {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  // Read file as base64
  const fileContent = await fs.readFile(filePath, "base64");

  const sendSmtpEmail = {
    sender: {
      email: "reports@zazadraft.com",
      name: "Zaza Draft",
    },
    to: [{ email: email }],
    subject: "Ã°Å¸"Å  Your State of AI in Education 2025 Report",
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #8B5CF6; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f8f9fa; }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: #8B5CF6;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ã°Å¸Å½" State of AI in Education 2025</h1>
          </div>
          <div class="content">
            <h2>Thank you for downloading our report!</h2>
            <p>Your comprehensive 26-page report is attached to this email.</p>

            <h3>Ã°Å¸"Å  What's Inside:</h3>
            <ul>
              <li>Key findings from 15,000+ teachers</li>
              <li>Adoption trends across grade levels and subjects</li>
              <li>Real-world use cases and impact data</li>
              <li>Challenges, solutions, and best practices</li>
              <li>Future outlook and strategic recommendations</li>
            </ul>

            <p>We hope this report provides valuable insights for your educational journey.</p>

            <p><strong>Questions or feedback?</strong> Reply to this email - we'd love to hear from you!</p>

            <p>Best regards,<br>The Zaza Draft Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachment: [
      {
        content: fileContent,
        name: filename,
      },
    ],
  };

  return await apiInstance.sendTransacEmail(sendSmtpEmail);
}

// Add to your endpoint after file generation
if (email) {
  await sendReportEmail(email, outputPath, filename);
}
```

## Ã°Å¸"' Security & Performance

### 1. Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");

const reportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per window per IP
  message: "Too many report requests. Please try again later.",
});

router.post("/generate-report", reportLimiter, async (req, res) => {
  // ... your code
});
```

### 2. Input Validation

```javascript
const { body, validationResult } = require("express-validator");

router.post(
  "/generate-report",
  body("email").isEmail().normalizeEmail(),
  body("format").isIn(["pdf", "docx", "html"]),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ... continue
  },
);
```

### 3. Automatic File Cleanup

```javascript
// Cron job to delete old reports
const cron = require("node-cron");

// Run every hour
cron.schedule("0 * * * *", async () => {
  const downloadsDir = path.join(__dirname, "../public/downloads");
  const files = await fs.readdir(downloadsDir);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  for (const file of files) {
    const filePath = path.join(downloadsDir, file);
    const stats = await fs.stat(filePath);

    if (now - stats.mtimeMs > maxAge) {
      await fs.unlink(filePath);
      console.log(`Deleted old report: ${file}`);
    }
  }
});
```

## Ã°Å¸"Å  Analytics Integration

Track report downloads:

```javascript
// Add to your endpoint after successful generation
await trackEvent({
  event: "report_downloaded",
  properties: {
    format: format,
    email: email,
    role: role,
    timestamp: new Date().toISOString(),
  },
});
```

## Ã°Å¸Â§Âª Testing

### Test the Python script directly:

```bash
python generate_report.py --format pdf --output test.pdf
python generate_report.py --format docx --output test.docx
python generate_report.py --format html --output test.html
```

### Test the API endpoint:

```bash
curl -X POST http://localhost:3000/api/generate-report \
  -H "Content-Type: application/json" \
  -d '{"format": "pdf", "email": "test@example.com"}'
```

## Ã°Å¸Ââ€º Troubleshooting

### Python not found

```bash
# Check Python installation
which python3
python3 --version

# If not found, install Python 3.8+
```

### Dependencies not installing

```bash
# Try with --user flag
pip install --user -r requirements.txt

# Or use a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Report generation fails

```bash
# Check Python path in your Node.js code
const pythonProcess = spawn('python3', [...]); // or 'python'

# Check file permissions
chmod +x generate_report.py

# Check output directory exists
mkdir -p public/downloads
chmod 755 public/downloads
```

## Ã°Å¸"Â Environment Variables

Add to your `.env` file:

```env
# Python configuration
PYTHON_PATH=python3
REPORT_SCRIPT_PATH=/path/to/report-generator/python/generate_report.py
DOWNLOADS_DIR=/path/to/public/downloads

# Email configuration (if using)
BREVO_API_KEY=your_brevo_api_key

# Cleanup configuration
MAX_REPORT_AGE_HOURS=24
```

## Ã°Å¸Å¡â‚¬ Deployment

### Ensure these are in production:

1. Python 3.8+ installed on server
2. Required Python packages installed
3. Write permissions for downloads directory
4. Sufficient disk space (each PDF ~500KB)
5. Rate limiting configured
6. Error logging enabled

### Deployment checklist:

```bash
# Install Python dependencies on server
pip install -r requirements.txt

# Test generation on server
python generate_report.py --format pdf --output test.pdf

# Set up cron job for cleanup
crontab -e
# Add: 0 * * * * find /path/to/downloads -name "*.pdf" -mtime +1 -delete

# Check server logs
tail -f /var/log/app.log
```

## Ã°Å¸"- Additional Resources

- ReportLab docs: https://www.reportlab.com/docs/
- Matplotlib docs: https://matplotlib.org/
- Express.js docs: https://expressjs.com/
- Node.js child_process: https://nodejs.org/api/child_process.html

## Ã°Å¸Â¤Â Support

For questions or issues:

1. Check the troubleshooting section
2. Review server logs
3. Test Python script directly
4. Contact your development team

---

**Ready to integrate?** Start with Option 1 (simple download) and upgrade to Option 2 (dynamic generation) when needed!
