import type { AnalysisResult, Suggestion, CategoryScores } from "@shared/schema";

// Common resume sections that ATS systems look for
const REQUIRED_SECTIONS = [
  { names: ['experience', 'work experience', 'employment', 'professional experience'], label: 'Work Experience' },
  { names: ['education', 'academic background'], label: 'Education' },
  { names: ['skills', 'technical skills', 'core competencies'], label: 'Skills' },
  { names: ['contact', 'contact information', 'email', 'phone'], label: 'Contact Information' }
];

const OPTIONAL_SECTIONS = [
  { names: ['summary', 'professional summary', 'objective', 'profile'], label: 'Professional Summary' },
  { names: ['certifications', 'certificates', 'licenses'], label: 'Certifications' },
  { names: ['projects', 'key projects'], label: 'Projects' },
];

// Action verbs that make resumes more impactful
const ACTION_VERBS = [
  'achieved', 'improved', 'trained', 'managed', 'created', 'developed', 'built', 'designed',
  'implemented', 'increased', 'decreased', 'reduced', 'led', 'optimized', 'launched',
  'established', 'generated', 'delivered', 'directed', 'executed', 'spearheaded'
];

// Common ATS-unfriendly formatting issues
const PROBLEMATIC_CHARS = ['•', '→', '★', '●', '◆', '■'];

export function analyzeResume(text: string, fileName: string, fileSize: number): AnalysisResult {
  const suggestions: Suggestion[] = [];
  
  // Analyze each category
  const formattingScore = analyzeFormatting(text, suggestions);
  const keywordsScore = analyzeKeywords(text, suggestions);
  const structureScore = analyzeStructure(text, suggestions);
  const readabilityScore = analyzeReadability(text, suggestions);
  
  // Calculate weighted overall score
  const overallScore = Math.round(
    formattingScore * 0.30 +
    keywordsScore * 0.30 +
    structureScore * 0.25 +
    readabilityScore * 0.15
  );
  
  return {
    overallScore,
    categoryScores: {
      formatting: formattingScore,
      keywords: keywordsScore,
      structure: structureScore,
      readability: readabilityScore,
    },
    suggestions: suggestions.sort((a, b) => {
      const order = { critical: 0, recommended: 1, good: 2 };
      return order[a.category] - order[b.category];
    }),
    parsedText: text,
    fileName,
    fileSize,
  };
}

function analyzeFormatting(text: string, suggestions: Suggestion[]): number {
  let score = 100;
  const issues: string[] = [];
  
  // Check for problematic characters
  const foundProblematicChars = PROBLEMATIC_CHARS.filter(char => text.includes(char));
  const hasProblematicChars = foundProblematicChars.length > 0;
  
  if (hasProblematicChars) {
    score -= 25;
    suggestions.push({
      id: 'fmt-1',
      category: 'critical',
      type: 'formatting',
      title: 'Special Characters Detected',
      description: 'Your resume contains special characters that many ATS systems cannot parse correctly.',
      passed: false,
      currentIssue: `Found ${foundProblematicChars.length} types of problematic characters: ${foundProblematicChars.join(', ')}`,
      whyItMatters: 'ATS systems are designed to parse plain text. Special characters like bullets and symbols can cause parsing errors, leading to your resume being rejected or important information being lost.',
      whatsPresent: `Your resume currently uses these special characters: ${foundProblematicChars.join(', ')}`,
      howToImprove: 'Replace all special characters with simple alternatives: use hyphens (-) or asterisks (*) for bullet points, and avoid decorative symbols entirely.',
      expectedBenefits: 'Improved ATS parsing accuracy, ensuring all your content is properly read and scored by automated systems.',
      impactLevel: 'high',
      quickFix: 'Use Find & Replace to change all special characters to hyphens (-)',
      examples: [
        '❌ • Responsible for team management',
        '✅ - Responsible for team management',
        '❌ ★ Award-winning performance',
        '✅ * Award-winning performance'
      ]
    });
  } else {
    suggestions.push({
      id: 'fmt-1-pass',
      category: 'good',
      type: 'formatting',
      title: 'Clean Character Usage',
      description: 'Your resume uses ATS-friendly characters that can be easily parsed.',
      passed: true,
      whatsPresent: 'No problematic special characters detected. Your resume uses standard text formatting.',
      whyItMatters: 'Clean character usage ensures maximum compatibility with all ATS systems.',
      expectedBenefits: 'Your resume will parse correctly across all major ATS platforms.'
    });
  }
  
  // Check for tables (simplified detection)
  const hasMultipleSpaces = /\s{5,}/.test(text);
  if (hasMultipleSpaces) {
    score -= 15;
    suggestions.push({
      id: 'fmt-2',
      category: 'recommended',
      type: 'formatting',
      title: 'Possible Table Formatting',
      description: 'It appears your resume may use tables or complex spacing. ATS systems often struggle with tables. Consider using simple line breaks and standard formatting.',
      passed: false,
    });
  }
  
  // Check for headers/footers (text at very beginning that looks like header)
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length > 0) {
    const firstLine = lines[0].toLowerCase();
    if (firstLine.includes('page') || firstLine.includes('confidential')) {
      score -= 10;
      suggestions.push({
        id: 'fmt-3',
        category: 'recommended',
        type: 'formatting',
        title: 'Header/Footer Content Detected',
        description: 'Headers and footers may not be parsed correctly by ATS. Place important information in the main body.',
        passed: false,
      });
    }
  }
  
  // Check for consistent formatting
  const hasReasonableLength = text.length > 500 && text.length < 15000;
  if (!hasReasonableLength) {
    score -= 20;
    suggestions.push({
      id: 'fmt-4',
      category: text.length < 500 ? 'critical' : 'recommended',
      type: 'formatting',
      title: text.length < 500 ? 'Resume Too Short' : 'Resume Too Long',
      description: text.length < 500 
        ? 'Your resume appears very short. Ensure all relevant experience and skills are included.'
        : 'Your resume may be too long. ATS systems and recruiters prefer concise resumes (1-2 pages).',
      passed: false,
    });
  } else {
    suggestions.push({
      id: 'fmt-4-pass',
      category: 'good',
      type: 'formatting',
      title: 'Appropriate Length',
      description: 'Your resume length is appropriate for ATS parsing.',
      passed: true,
    });
  }
  
  return Math.max(0, score);
}

function analyzeKeywords(text: string, suggestions: Suggestion[]): number {
  let score = 100;
  const lowerText = text.toLowerCase();
  
  // Check for action verbs
  const actionVerbsFound = ACTION_VERBS.filter(verb => 
    lowerText.includes(verb)
  );
  
  const actionVerbScore = Math.min(100, (actionVerbsFound.length / 8) * 100);
  if (actionVerbScore < 50) {
    score -= 30;
    suggestions.push({
      id: 'kw-1',
      category: 'critical',
      type: 'keywords',
      title: 'Limited Action Verbs',
      description: 'Your resume uses few strong action verbs to describe accomplishments.',
      passed: false,
      currentIssue: `Found only ${actionVerbsFound.length} action verbs out of ${ACTION_VERBS.length} common impactful verbs.`,
      whyItMatters: 'Action verbs make your accomplishments sound more dynamic and impactful. Recruiters and ATS systems look for strong verbs that demonstrate proactivity and achievement.',
      whatsPresent: `Current action verbs found: ${actionVerbsFound.slice(0, 5).join(', ')}${actionVerbsFound.length > 5 ? '...' : ''}`,
      howToImprove: 'Review each bullet point and replace passive language with strong action verbs. Focus on verbs that demonstrate leadership, innovation, and measurable impact.',
      expectedBenefits: 'More compelling resume that stands out to both ATS systems and human recruiters, increasing your chances of getting interviews.',
      impactLevel: 'high',
      quickFix: 'Add 3-5 strong action verbs to your experience section',
      examples: [
        '❌ Was responsible for managing a team',
        '✅ Led a team of 5 developers to deliver projects',
        '❌ Worked on improving processes',
        '✅ Optimized processes resulting in 25% efficiency gain',
        '❌ Helped with customer service',
        '✅ Resolved customer issues achieving 95% satisfaction rate'
      ]
    });
  } else if (actionVerbScore < 75) {
    score -= 15;
    suggestions.push({
      id: 'kw-1',
      category: 'recommended',
      type: 'keywords',
      title: 'Could Use More Action Verbs',
      description: 'Consider adding more action verbs to make your achievements more compelling.',
      passed: false,
      currentIssue: `Found ${actionVerbsFound.length} action verbs, but could benefit from more variety.`,
      whyItMatters: 'Diverse action verbs demonstrate a wider range of skills and accomplishments, making your resume more comprehensive.',
      whatsPresent: `Current action verbs: ${actionVerbsFound.join(', ')}`,
      howToImprove: 'Add 2-3 additional action verbs from different categories (leadership, technical, creative, analytical).',
      expectedBenefits: 'Enhanced resume that showcases diverse skills and accomplishments.',
      impactLevel: 'medium',
      examples: [
        'Add leadership verbs: directed, supervised, coordinated',
        'Add technical verbs: programmed, engineered, architected',
        'Add creative verbs: designed, conceptualized, innovated'
      ]
    });
  } else {
    suggestions.push({
      id: 'kw-1-pass',
      category: 'good',
      type: 'keywords',
      title: 'Strong Action Verbs',
      description: 'Your resume effectively uses action verbs to describe accomplishments.',
      passed: true,
      whatsPresent: `Found ${actionVerbsFound.length} strong action verbs including: ${actionVerbsFound.slice(0, 5).join(', ')}`,
      whyItMatters: 'Strong action verbs make your accomplishments sound dynamic and impactful.',
      expectedBenefits: 'Your resume effectively communicates achievement and proactivity.'
    });
  }
  
  // Check for quantifiable achievements
  const numberPatterns = [
    /\d+%/g, // percentages
    /\$\d+[KkMm]?/g, // money amounts
    /\d+\+? (?:years?|months?)/g, // time periods
    /increased by \d+/gi,
    /decreased by \d+/gi,
    /improved by \d+/gi,
    /reduced by \d+/gi
  ];
  
  const quantifiableMatches: string[] = [];
  numberPatterns.forEach(pattern => {
    const matches = text.match(pattern) || [];
    quantifiableMatches.push(...matches);
  });
  
  const hasNumbers = quantifiableMatches.length > 0;
  if (!hasNumbers) {
    score -= 25;
    suggestions.push({
      id: 'kw-2',
      category: 'critical',
      type: 'keywords',
      title: 'Missing Quantifiable Achievements',
      description: 'Your resume lacks specific numbers and metrics to demonstrate impact.',
      passed: false,
      currentIssue: 'No quantifiable achievements or metrics detected in your resume.',
      whyItMatters: 'Numbers provide concrete evidence of your impact and make your accomplishments more credible. Recruiters and ATS systems prioritize candidates who can demonstrate measurable results.',
      whatsPresent: 'Your resume describes responsibilities but lacks specific metrics to quantify achievements.',
      howToImprove: 'Review each bullet point and add specific numbers: percentages, dollar amounts, time periods, team sizes, or performance metrics. Use the STAR method (Situation, Task, Action, Result) to frame your achievements.',
      expectedBenefits: 'More persuasive resume that clearly demonstrates your value and impact, increasing interview opportunities.',
      impactLevel: 'high',
      quickFix: 'Add 2-3 specific metrics to your most recent role',
      examples: [
        '❌ Managed social media accounts',
        '✅ Grew social media following by 150% in 6 months',
        '❌ Improved customer satisfaction',
        '✅ Increased customer satisfaction scores from 75% to 92%',
        '❌ Reduced operational costs',
        '✅ Reduced operational costs by $50K annually through process optimization'
      ]
    });
  } else {
    suggestions.push({
      id: 'kw-2-pass',
      category: 'good',
      type: 'keywords',
      title: 'Quantifiable Achievements',
      description: 'Your resume includes measurable results and specific metrics.',
      passed: true,
      whatsPresent: `Found ${quantifiableMatches.length} quantifiable achievements including metrics like: ${quantifiableMatches.slice(0, 3).join(', ')}`,
      whyItMatters: 'Quantifiable achievements demonstrate concrete impact and make your accomplishments more credible.',
      expectedBenefits: 'Your resume effectively communicates measurable results that appeal to both ATS and recruiters.'
    });
  }
  
  // Check for generic phrases to avoid
  const genericPhrases = ['responsible for', 'duties included', 'worked on'];
  const hasGenericPhrases = genericPhrases.some(phrase => lowerText.includes(phrase));
  if (hasGenericPhrases) {
    score -= 15;
    suggestions.push({
      id: 'kw-3',
      category: 'recommended',
      type: 'keywords',
      title: 'Generic Phrases Detected',
      description: 'Replace passive phrases like "responsible for" or "duties included" with active achievement statements.',
      passed: false,
    });
  }
  
  return Math.max(0, score);
}

function analyzeStructure(text: string, suggestions: Suggestion[]): number {
  let score = 100;
  const lowerText = text.toLowerCase();
  
  // Check for required sections
  const missingSections: string[] = [];
  REQUIRED_SECTIONS.forEach(section => {
    const hasSection = section.names.some(name => lowerText.includes(name));
    if (!hasSection) {
      missingSections.push(section.label);
      score -= 20;
    }
  });
  
  if (missingSections.length > 0) {
    suggestions.push({
      id: 'str-1',
      category: 'critical',
      type: 'structure',
      title: 'Missing Required Sections',
      description: `Your resume is missing key sections: ${missingSections.join(', ')}. ATS systems specifically look for these sections.`,
      passed: false,
    });
  } else {
    suggestions.push({
      id: 'str-1-pass',
      category: 'good',
      type: 'structure',
      title: 'All Required Sections Present',
      description: 'Your resume includes all essential sections that ATS systems look for.',
      passed: true,
    });
  }
  
  // Check for optional but recommended sections
  const hasOptionalSections = OPTIONAL_SECTIONS.some(section =>
    section.names.some(name => lowerText.includes(name))
  );
  
  if (!hasOptionalSections) {
    score -= 15;
    suggestions.push({
      id: 'str-2',
      category: 'recommended',
      type: 'structure',
      title: 'Missing Optional Sections',
      description: 'Consider adding a Professional Summary, Certifications, or Projects section to strengthen your resume.',
      passed: false,
    });
  } else {
    suggestions.push({
      id: 'str-2-pass',
      category: 'good',
      type: 'structure',
      title: 'Comprehensive Sections',
      description: 'Your resume includes additional sections that provide more context.',
      passed: true,
    });
  }
  
  // Check for chronological order indicators
  const hasYears = /20\d{2}|19\d{2}/.test(text);
  if (!hasYears) {
    score -= 15;
    suggestions.push({
      id: 'str-3',
      category: 'recommended',
      type: 'structure',
      title: 'Missing Date Information',
      description: 'Include dates (years) for your work experience and education. ATS systems use this to verify experience timeline.',
      passed: false,
    });
  } else {
    suggestions.push({
      id: 'str-3-pass',
      category: 'good',
      type: 'structure',
      title: 'Clear Timeline',
      description: 'Your resume includes dates that help establish your career timeline.',
      passed: true,
    });
  }
  
  return Math.max(0, score);
}

function analyzeReadability(text: string, suggestions: Suggestion[]): number {
  let score = 100;
  const lines = text.split('\n').filter(l => l.trim());
  
  // Check for reasonable line length (not too dense)
  const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
  if (avgLineLength > 150) {
    score -= 25;
    suggestions.push({
      id: 'read-1',
      category: 'recommended',
      type: 'readability',
      title: 'Dense Text Format',
      description: 'Your resume has very long lines. Break content into shorter, scannable bullet points for better ATS parsing and human readability.',
      passed: false,
    });
  } else {
    suggestions.push({
      id: 'read-1-pass',
      category: 'good',
      type: 'readability',
      title: 'Scannable Format',
      description: 'Your resume uses appropriate line lengths for easy scanning.',
      passed: true,
    });
  }
  
  // Check for bullet points or list formatting
  const hasBullets = /^[-*]\s/m.test(text) || /^\d+\.\s/m.test(text);
  if (!hasBullets) {
    score -= 20;
    suggestions.push({
      id: 'read-2',
      category: 'recommended',
      type: 'readability',
      title: 'No Bullet Points Detected',
      description: 'Use bullet points to organize your experience and achievements. This improves both ATS parsing and human readability.',
      passed: false,
    });
  } else {
    suggestions.push({
      id: 'read-2-pass',
      category: 'good',
      type: 'readability',
      title: 'Well-Organized Content',
      description: 'Your resume uses bullet points or numbered lists effectively.',
      passed: true,
    });
  }
  
  // Check for ALL CAPS overuse
  const allCapsWords = text.match(/\b[A-Z]{3,}\b/g) || [];
  if (allCapsWords.length > 10) {
    score -= 15;
    suggestions.push({
      id: 'read-3',
      category: 'recommended',
      type: 'readability',
      title: 'Excessive Capitalization',
      description: 'Limit the use of ALL CAPS. Use normal capitalization for better ATS parsing and professional appearance.',
      passed: false,
    });
  }
  
  return Math.max(0, score);
}
