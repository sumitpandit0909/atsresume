# ATS Resume Checker

## Overview
A completely free, privacy-first ATS (Applicant Tracking System) resume checker that runs entirely in the browser. No signup, no data upload, no server-side storage—all resume parsing, scoring, and optimization happens client-side using modern JavaScript libraries.

## Purpose & Goals
- Provide instant ATS compatibility analysis for job seekers
- Maintain 100% user privacy with client-side processing
- Offer actionable suggestions for resume improvement
- Generate optimized resume files locally without server uploads

## Current State
**✅ COMPLETE - Ready for Use**

All features implemented and tested:
- ✅ Design system configured with professional blue (#2563EB), success green (#10B981), warning amber (#F59E0B)
- ✅ All TypeScript schemas defined for resume analysis
- ✅ Complete component library built following design guidelines
- ✅ Split-panel responsive layout implemented
- ✅ Upload zone with drag-and-drop functionality for PDF and DOCX files
- ✅ Circular score display with animations
- ✅ Category breakdown with progress bars (Formatting 30%, Keywords 30%, Structure 25%, Readability 15%)
- ✅ Suggestion cards system with categorization (critical/recommended/good)
- ✅ Export controls with PDF and DOCX generation
- ✅ Mobile-responsive design
- ✅ Client-side PDF parsing with pdf.js (worker hosted locally)
- ✅ Client-side DOCX parsing with mammoth.js
- ✅ ATS scoring algorithm with weighted categories
- ✅ Local file generation with jsPDF and docx libraries
- ✅ 100% privacy-focused - zero server-side data transmission
- ✅ End-to-end testing completed successfully

## Project Architecture

### Frontend (React + TypeScript)
**Pages:**
- `/` - Home page with split-panel layout
- `*` - 404 Not Found page

**Components:**
- `upload-zone.tsx` - Drag-drop file upload with validation
- `score-display.tsx` - Animated circular progress score
- `category-breakdown.tsx` - Four category progress bars (formatting, keywords, structure, readability)
- `suggestion-card.tsx` - Individual suggestion with severity indicators
- `suggestions-list.tsx` - Organized suggestions by category (critical, recommended, good)
- `export-controls.tsx` - Format selector and export button with privacy notice
- `empty-state.tsx` - Welcome screen with feature highlights
- `loading-state.tsx` - Processing animation

**Schema (`shared/schema.ts`):**
```typescript
- Suggestion: Individual suggestion with category, type, title, description
- CategoryScores: Four scores (formatting, keywords, structure, readability)
- AnalysisResult: Complete analysis with overall score, category scores, suggestions
```

### Design System
**Colors:**
- Primary: #2563EB (Professional Blue) - CTAs, links, active states
- Success: #10B981 (Green) - High scores, positive feedback
- Warning: #F59E0B (Amber) - Medium priority issues
- Error: #EF4444 (Red) - Critical issues, low scores
- Background: #F8FAFC (Light Grey)
- Foreground: Slate tones for text hierarchy

**Typography:**
- Font: Inter (loaded from Google Fonts)
- Hierarchy: 48px hero scores → 24px section headers → 18px card titles → 16px body → 14px supporting → 12px labels

**Layout:**
- Split-panel: 40% upload zone (left) / 60% results (right)
- Mobile: Stacked single column
- Spacing: Consistent use of 4, 6, 8, 12, 16px units
- Border radius: Small (6px) for cards and inputs

### Backend (Express)
Currently minimal - serves only static files. No data processing or storage on server.

### Client-Side Processing (Implemented)
- **PDF Parsing:** pdf.js library with locally hosted worker (`client/public/pdf.worker.min.mjs`)
- **DOCX Parsing:** mammoth.js library for Word document extraction
- **PDF Generation:** jsPDF library for creating optimized PDF resumes
- **DOCX Generation:** docx library for creating optimized Word resumes
- **ATS Algorithm:** Custom weighted scoring analyzing:
  - Formatting (30% weight): Font consistency, spacing, bullet points, section headers
  - Keywords (30% weight): Industry terms, action verbs, technical skills
  - Structure (25% weight): Contact info, experience, education, skills sections
  - Readability (15% weight): Text density, sentence complexity, white space

## User Preferences
- Privacy is paramount - no analytics, no tracking, no data collection
- Professional, trustworthy design aesthetic
- Instant feedback with helpful, actionable suggestions
- Mobile-friendly interface for on-the-go resume checks

## Recent Changes
- **Oct 26, 2025:** Complete ATS Resume Checker implementation
  - Configured design tokens in index.css and tailwind.config.ts
  - Built all React components with animations and responsive design
  - Implemented split-panel layout following Grammarly/Canva inspiration
  - Added SEO meta tags for better discoverability
  - Integrated pdf.js with locally hosted worker for client-side PDF parsing
  - Integrated mammoth.js for client-side DOCX parsing
  - Implemented weighted ATS scoring algorithm with real-time suggestions
  - Added jsPDF and docx libraries for local file generation
  - Successfully tested all user journeys end-to-end
  - Verified 100% client-side processing with zero server data transmission

## Technical Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Wouter (routing)
- **UI Components:** Shadcn/ui (Radix UI primitives)
- **State:** React hooks (useState)
- **Icons:** Lucide React
- **Build:** Vite
- **Backend:** Express.js (static file serving only)

## Development Notes
- All file processing must remain client-side
- No backend API routes for resume data
- Privacy messaging prominently displayed
- Accessibility: WCAG AA compliance with proper ARIA labels
- Performance: Lazy load libraries only when needed
