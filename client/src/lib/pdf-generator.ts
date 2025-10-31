import { jsPDF } from 'jspdf';

export async function generateOptimizedPDF(text: string, fileName: string): Promise<void> {
  try {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Optimized Resume', 20, 20);
    
    // Add content
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Split text into lines and add to PDF
    const lines = doc.splitTextToSize(text, 170);
    let yPosition = 35;
    const pageHeight = doc.internal.pageSize.height;
    
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 20, yPosition);
      yPosition += 7;
    });
    
    // Download the PDF
    const timestamp = new Date().getTime();
    doc.save(`${fileName.replace(/\.(pdf|docx)$/i, '')}_optimized_${timestamp}.pdf`);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF file. Please try again.');
  }
}
