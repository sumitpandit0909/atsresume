import { Document, Paragraph, TextRun, Packer, HeadingLevel } from 'docx';

export async function generateOptimizedDOCX(text: string, fileName: string): Promise<void> {
  try {
    // Parse text into sections and create formatted document
    const lines = text.split('\n').filter(line => line.trim());
    
    const children: Paragraph[] = [];
    
    // Add title
    children.push(
      new Paragraph({
        text: 'Optimized Resume',
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 },
      })
    );
    
    // Add content paragraphs
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Detect if line might be a heading (all caps or short)
      const isHeading = trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length < 50;
      
      if (isHeading) {
        children.push(
          new Paragraph({
            text: trimmedLine,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          })
        );
      } else {
        children.push(
          new Paragraph({
            children: [new TextRun(trimmedLine)],
            spacing: { after: 100 },
          })
        );
      }
    });
    
    const doc = new Document({
      sections: [{
        properties: {},
        children,
      }],
    });
    
    // Generate and download
    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.href = url;
    link.download = `${fileName.replace(/\.(pdf|docx)$/i, '')}_optimized_${timestamp}.docx`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('DOCX generation error:', error);
    throw new Error('Failed to generate DOCX file. Please try again.');
  }
}
