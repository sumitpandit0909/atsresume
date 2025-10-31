import html2canvas from 'html2canvas';

export interface DownloadOptions {
  format: 'png' | 'html' | 'pdf';
  fileName?: string;
}

export async function downloadAnalysis(element: HTMLElement, options: DownloadOptions) {
  const { format, fileName = 'ai-analysis-results' } = options;

  try {
    if (format === 'png') {
      await downloadAsPNG(element, fileName);
    } else if (format === 'html') {
      await downloadAsHTML(element, fileName);
    } else if (format === 'pdf') {
      await downloadAsPDF(element, fileName);
    }
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    console.error('Error details:', error);
    throw new Error(`Failed to download analysis as ${format.toUpperCase()}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function downloadAsPNG(element: HTMLElement, fileName: string) {
  console.log('Starting PNG download...');
  
  // Hide elements that shouldn't be in the screenshot
  const elementsToHide = element.querySelectorAll('[data-no-screenshot]');
  const originalStyles: string[] = [];
  
  elementsToHide.forEach(el => {
    originalStyles.push((el as HTMLElement).style.display);
    (el as HTMLElement).style.display = 'none';
  });

  try {
    // Simple HTML2Canvas configuration
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: true, // Enable logging to debug
      removeContainer: true,
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    console.log('Canvas created successfully');

    // Restore hidden elements
    elementsToHide.forEach((el, index) => {
      (el as HTMLElement).style.display = originalStyles[index];
    });

    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('PNG download triggered');
  } catch (error) {
    // Restore hidden elements even if there's an error
    elementsToHide.forEach((el, index) => {
      (el as HTMLElement).style.display = originalStyles[index];
    });
    console.error('PNG download error:', error);
    throw error;
  }
}

async function downloadAsHTML(element: HTMLElement, fileName: string) {
  // Create a clean HTML structure for the analysis
  const analysisContent = element.cloneNode(true) as HTMLElement;
  
  // Remove interactive elements and buttons
  const elementsToRemove = analysisContent.querySelectorAll('button, [data-no-screenshot]');
  elementsToRemove.forEach(el => el.remove());

  // Create HTML document
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Resume Analysis - ${fileName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .header h1 {
            font-size: 2.5rem;
            color: #1f2937;
            margin-bottom: 10px;
        }
        
        .header .subtitle {
            font-size: 1.1rem;
            color: #6b7280;
        }
        
        .section {
            margin-bottom: 40px;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: #f9fafb;
        }
        
        .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .section-header h2 {
            font-size: 1.5rem;
            color: #1f2937;
            font-weight: 600;
        }
        
        .score-badge {
            display: inline-block;
            padding: 8px 16px;
            background: #10b981;
            color: white;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .score-low { background: #ef4444; }
        .score-medium { background: #f59e0b; }
        .score-high { background: #10b981; }
        
        .list {
            list-style: none;
        }
        
        .list-item {
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .list-item:last-child {
            border-bottom: none;
        }
        
        .strength-item {
            color: #059669;
        }
        
        .weakness-item {
            color: #dc2626;
        }
        
        .industry-tag {
            display: inline-block;
            padding: 6px 12px;
            background: #e0e7ff;
            color: #3730a3;
            border-radius: 16px;
            margin: 4px;
            font-size: 0.9rem;
        }
        
        .improvement-item {
            background: #fef3c7;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 12px;
            border-left: 4px solid #f59e0b;
        }
        
        .improvement-number {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: #f59e0b;
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 24px;
            font-size: 0.8rem;
            margin-right: 12px;
        }
        
        .summary-box {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 12px;
            padding: 24px;
            margin-top: 20px;
        }
        
        .summary-box h3 {
            color: #0369a1;
            margin-bottom: 12px;
        }
        
        @media print {
            body {
                padding: 0;
            }
            
            .section {
                break-inside: avoid;
                margin-bottom: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>AI Resume Analysis Report</h1>
        <p class="subtitle">Generated by ATS Resume Checker</p>
        <p class="subtitle">Date: ${new Date().toLocaleDateString()}</p>
    </div>
    
    ${analysisContent.innerHTML}
</body>
</html>
  `;

  // Create and trigger download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const link = document.createElement('a');
  link.download = `${fileName}.html`;
  link.href = URL.createObjectURL(blob);
  link.click();
  
  // Clean up
  setTimeout(() => URL.revokeObjectURL(link.href), 100);
}

async function downloadAsPDF(element: HTMLElement, fileName: string) {
  console.log('Starting PDF download...');
  
  // Hide elements that shouldn't be in the screenshot
  const elementsToHide = element.querySelectorAll('[data-no-screenshot]');
  const originalStyles: string[] = [];
  
  elementsToHide.forEach(el => {
    originalStyles.push((el as HTMLElement).style.display);
    (el as HTMLElement).style.display = 'none';
  });

  try {
    // Use the same reliable HTML2Canvas configuration
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: true,
      removeContainer: true,
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    console.log('Canvas created for PDF');

    // Restore hidden elements
    elementsToHide.forEach((el, index) => {
      (el as HTMLElement).style.display = originalStyles[index];
    });

    // Convert canvas to PDF using jsPDF
    const { jsPDF } = await import('jspdf');
    
    // Use standard A4 format instead of canvas dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Calculate dimensions to fit A4 page
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
    
    console.log('PDF download completed');
  } catch (error) {
    // Restore hidden elements even if there's an error
    elementsToHide.forEach((el, index) => {
      (el as HTMLElement).style.display = originalStyles[index];
    });
    console.error('PDF download error:', error);
    throw error;
  }
}
