const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat } = require('docx');

// Parse markdown to document structure
function parseMarkdown(mdContent) {
  const lines = mdContent.split('\n');
  const elements = [];
  let currentList = null;
  let listReference = 'list-1';
  let listCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      if (currentList) {
        currentList = null;
      }
      elements.push(new Paragraph({ children: [new TextRun("")], spacing: { after: 120 } }));
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      currentList = null;
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 180 },
        children: [new TextRun(parseInlineFormatting(line.substring(2)))]
      }));
    } else if (line.startsWith('## ')) {
      currentList = null;
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 },
        children: [new TextRun(parseInlineFormatting(line.substring(3)))]
      }));
    } else if (line.startsWith('### ')) {
      currentList = null;
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 180, after: 120 },
        children: [new TextRun(parseInlineFormatting(line.substring(4)))]
      }));
    }
    // Bullet lists
    else if (line.match(/^[-*]\s/)) {
      if (!currentList || currentList !== 'bullet') {
        currentList = 'bullet';
        listReference = `bullet-${listCounter++}`;
      }
      const text = line.substring(2).trim();
      elements.push(new Paragraph({
        numbering: { reference: listReference, level: 0 },
        children: parseInlineFormattingArray(text)
      }));
    }
    // Numbered lists
    else if (line.match(/^\d+\.\s/)) {
      if (!currentList || currentList !== 'numbered') {
        currentList = 'numbered';
        listReference = `numbered-${listCounter++}`;
      }
      const text = line.replace(/^\d+\.\s/, '');
      elements.push(new Paragraph({
        numbering: { reference: listReference, level: 0 },
        children: parseInlineFormattingArray(text)
      }));
    }
    // Regular paragraphs
    else {
      currentList = null;
      elements.push(new Paragraph({
        spacing: { after: 120 },
        children: parseInlineFormattingArray(line)
      }));
    }
  }

  return elements;
}

// Parse inline formatting (bold, italic, code)
function parseInlineFormatting(text) {
  // Simple version - remove markdown formatting
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')  // bold
    .replace(/\*(.+?)\*/g, '$1')       // italic
    .replace(/`(.+?)`/g, '$1')         // code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1'); // links
}

// Parse inline formatting and return TextRun array
function parseInlineFormattingArray(text) {
  const runs = [];
  const cleanText = parseInlineFormatting(text);
  runs.push(new TextRun({ text: cleanText, size: 22 }));
  return runs;
}

// Create numbering config for lists
function createNumberingConfig() {
  const configs = [];
  
  // Create 10 bullet list configs
  for (let i = 1; i <= 10; i++) {
    configs.push({
      reference: `bullet-${i}`,
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    });
  }
  
  // Create 10 numbered list configs
  for (let i = 1; i <= 10; i++) {
    configs.push({
      reference: `numbered-${i}`,
      levels: [{
        level: 0,
        format: LevelFormat.DECIMAL,
        text: "%1.",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    });
  }
  
  return configs;
}

// Convert a single markdown file to DOCX
async function convertMarkdownToDocx(mdPath, outputPath) {
  console.log(`Converting: ${path.basename(mdPath)}`);
  
  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  const elements = parseMarkdown(mdContent);

  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: "Arial", size: 22 } } // 11pt default
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          run: { size: 32, bold: true, color: "2B3643", font: "Arial" },
          paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 0 }
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          run: { size: 28, bold: true, color: "374151", font: "Arial" },
          paragraph: { spacing: { before: 200, after: 150 }, outlineLevel: 1 }
        },
        {
          id: "Heading3",
          name: "Heading 3",
          basedOn: "Normal",
          next: "Normal",
          run: { size: 24, bold: true, color: "4B5563", font: "Arial" },
          paragraph: { spacing: { before: 180, after: 120 }, outlineLevel: 2 }
        }
      ]
    },
    numbering: {
      config: createNumberingConfig()
    },
    sections: [{
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      children: elements
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Created: ${path.basename(outputPath)}`);
}

// Main conversion process
async function convertAllResources() {
  // Use current directory paths
  const resourcesDir = path.join(__dirname, 'resources');
  const outputDir = path.join(__dirname, 'public', 'resources');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all markdown files
  const files = fs.readdirSync(resourcesDir).filter(f => f.endsWith('.md'));
  
  console.log(`Found ${files.length} markdown files to convert\n`);

  // Convert each file
  for (const file of files) {
    const mdPath = path.join(resourcesDir, file);
    const docxPath = path.join(outputDir, file.replace('.md', '.docx'));
    
    try {
      await convertMarkdownToDocx(mdPath, docxPath);
    } catch (error) {
      console.error(`Error converting ${file}:`, error.message);
    }
  }

  console.log(`\n✅ Conversion complete! ${files.length} DOCX files created in ${outputDir}`);
}

// Run the conversion
convertAllResources().catch(console.error);
