# ATS Resume Checker - Design Guidelines

## Design Approach

**Reference-Based Design**: Drawing inspiration from Grammarly's clean analysis interface and Canva's intuitive resume builder, this design prioritizes clarity, actionable feedback, and a professional aesthetic that builds user trust. The interface uses a split-panel layout pattern common in document editors, with real-time analysis feedback.

**Key Principles**:
- Immediate clarity: Users should instantly understand their ATS score and what to fix
- Progressive disclosure: Show overview first, then drill into detailed suggestions
- Trust through design: Professional appearance that conveys accuracy and reliability
- Zero-friction workflow: No accounts, no uploads, instant results

---

## Color System

**Primary Palette**:
- Primary Blue: #2563EB (CTAs, links, active states, score indicators)
- Success Green: #10B981 (positive feedback, completed items, high scores)
- Warning Amber: #F59E0B (medium-priority issues, alerts)
- Error Red: #EF4444 (critical issues, low scores)
- Accent Purple: #8B5CF6 (premium features, highlights)

**Neutral Palette**:
- Background: #F8FAFC (main background)
- Surface: #FFFFFF (cards, panels)
- Text Primary: #1E293B (headings, important text)
- Text Secondary: #64748B (body text, descriptions)
- Border: #E2E8F0 (dividers, card borders)

---

## Typography

**Font Stack**: Inter for all text (fallback to system-ui, -apple-system, sans-serif)

**Type Scale**:
- Hero/Score Display: 48px, font-weight 700, tracking tight
- Section Headers: 24px, font-weight 600
- Card Titles: 18px, font-weight 600
- Body Text: 16px, font-weight 400, line-height 1.6
- Supporting Text: 14px, font-weight 400, line-height 1.5
- Labels/Badges: 12px, font-weight 500, uppercase tracking wide

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16 (e.g., p-4, gap-8, mb-12)

**Core Layout Structure**:

1. **Header Bar** (h-16, fixed top):
   - Logo/brand left, "Privacy-First ATS Checker" tagline
   - Optional "How it Works" link right
   - Thin bottom border for definition

2. **Split-Panel Layout** (below header):
   - **Left Panel** (w-full lg:w-2/5, min-h-screen, bg-surface):
     - Upload zone with drag-and-drop area
     - Large dashed border when empty (border-dashed, border-2)
     - File icon and instructional text
     - "Choose File" button (primary blue)
     - Supported formats note below
     - Once uploaded: Show filename, file size, "Analyze" button, "Upload Different" link
   
   - **Right Panel** (w-full lg:w-3/5, min-h-screen, bg-background):
     - Empty state: Welcoming illustration/icon with "Upload resume to start analysis"
     - Analysis state: Scrollable results with sections

**Container Max-Width**: max-w-7xl for content, full-width panels with inner padding (px-6 to px-8)

**Responsive Breakpoints**:
- Mobile (base): Stacked single column
- Tablet (md): Stacked with wider cards
- Desktop (lg+): Side-by-side split panels

---

## Component Library

### Score Display Card (Hero of Right Panel)
- Large circular progress indicator (200px diameter)
- Animated fill based on percentage (0-100)
- Score number inside circle (48px, bold)
- Color-coded: 0-40% red, 41-70% amber, 71-100% green
- "ATS Compatibility Score" label above
- Brief interpretation below ("Excellent" / "Needs Work" / "Good")
- Positioned at top of right panel with generous padding (p-8 to p-12)

### Category Score Breakdown
- 4 horizontal bars showing category scores:
  - Formatting (30%)
  - Keywords (30%)
  - Structure (25%)
  - Readability (15%)
- Each bar: Category name left, percentage right, colored progress bar
- Full-width bars with rounded ends
- Stack vertically with gap-4

### Suggestion Cards
- White background cards with subtle shadow
- Left border (4px) color-coded by severity (green=good, amber=warning, red=critical)
- Card padding: p-6
- Icon + Title (18px, semibold) in header row
- Description text (16px, secondary color)
- "Fix this" action button or checkmark if passed
- Organized under category headers: "Critical Issues", "Recommended Improvements", "Doing Well"
- Grid: grid-cols-1 gap-4

### Upload Zone
- Dashed border (border-dashed, border-2, border-gray-300)
- Rounded corners (rounded-lg)
- Large padding (p-12 to p-16)
- Hover state: border color shifts to primary blue
- File drop active state: background tint (#F0F7FF)
- Center-aligned content: Upload icon (64px), heading, button, format text

### Progress Indicators
- Linear progress bar during parsing (h-1, rounded-full, animated)
- Positioned at very top of right panel when processing
- Indeterminate animation or percentage-based
- Primary blue color

### Badge System
- Small rounded pills (rounded-full, px-3, py-1, text-xs)
- Status badges: "Passed" (green), "Warning" (amber), "Failed" (red)
- Tag badges: "ATS-Friendly", "Missing Section", etc.
- Use liberally in suggestion cards

### Export Controls
- Sticky footer bar or card at bottom of right panel
- "Export Optimized Resume" primary button
- Format selector: PDF / DOCX radio buttons or dropdown
- Privacy reminder: "Generated locally - no data uploaded"

---

## Interactive States

- **Buttons**: Solid fills with slight darken on hover, subtle scale on active (scale-95)
- **Cards**: Lift slightly on hover (shadow increase) for clickable items
- **Upload Zone**: Border color change on hover, background tint on drag-over
- **Links**: Underline on hover, primary blue color
- **Disabled States**: Opacity 50%, cursor-not-allowed

---

## Visual Rhythm & Spacing

- Section spacing: mb-8 to mb-12 between major sections
- Card spacing: gap-4 to gap-6 in grids
- Internal card padding: p-6 to p-8
- Panel padding: px-6 lg:px-8, py-8 lg:py-12
- Consistent use of gap utilities in flex/grid layouts

---

## Accessibility

- Maintain WCAG AA contrast ratios (4.5:1 for body text)
- Focus indicators: 2px solid ring in primary blue (ring-2, ring-primary)
- Keyboard navigation for all interactive elements
- ARIA labels for icon-only buttons
- Screen reader announcements for score changes

---

## Additional Design Elements

**Illustrations**: Use simple, professional line-art illustrations for empty states (upload prompt, no analysis yet). Style: Single-color (#2563EB), minimal, friendly.

**Icons**: Use Heroicons (outline style) via CDN for consistency. Key icons: DocumentArrowUpIcon (upload), CheckCircleIcon (success), ExclamationTriangleIcon (warning), XCircleIcon (error), SparklesIcon (optimization).

**Shadows**: Use sparingly - cards have subtle shadow (shadow-sm), elevated elements use shadow-md, modals use shadow-lg.

**Borders**: Prefer subtle borders (border-gray-200) over heavy dividers. Use 1px default, 2px for emphasis.