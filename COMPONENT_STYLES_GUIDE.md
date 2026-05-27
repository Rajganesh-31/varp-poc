# Vegas Audit PoC - Component Styles & Design Guide

## Table of Contents
1. [Design System Overview](#design-system-overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Styling Details](#component-styling-details)
6. [Interactive States](#interactive-states)
7. [Responsive Design](#responsive-design)

---

## Design System Overview

### Design Philosophy
- **Minimalist & Professional**: Clean, corporate aesthetic suitable for compliance auditing
- **Accessibility-First**: Semantic HTML, ARIA labels, keyboard navigation
- **Data-Driven**: Visual hierarchy emphasizes information clarity
- **Severity-Based Coding**: Color indicates risk/urgency levels
- **Tailwind-First**: No external UI libraries; pure Tailwind CSS + HTML

### Core Principles
1. **Color Consistency**: Same severity colors across all components
2. **Spacing Scale**: Consistent gap sizes (2, 3, 4, 6 units)
3. **Typography Hierarchy**: Clear visual distinction between heading levels
4. **Responsive Mobile-First**: Flexible grid-based layouts
5. **Accessibility**: Focus states, keyboard support, color-blind friendly

---

## Color Palette

### Severity Levels (Main Color System)

| Severity | Hex | Tailwind Class | Usage |
|----------|-----|----------------|-------|
| **Critical** | `#DC2626` | `bg-red-600` `text-red-600` | Highest priority, blocking issues |
| **High** | `#F97316` | `bg-orange-500` `text-orange-500` | Major concerns, needs quick action |
| **Medium** | `#FBBF24` | `bg-yellow-500` `text-yellow-500` | Moderate issues, should address soon |
| **Low** | `#16A34A` | `bg-green-600` `text-green-600` | Minor issues, lower priority |

### Neutral Colors

| Element | Hex | Tailwind Class | Usage |
|---------|-----|----------------|-------|
| **Primary Blue** | `#2563EB` | `bg-blue-600` `text-blue-600` | Links, buttons, focus states |
| **Gray 50** | `#F9FAFB` | `bg-gray-50` | Backgrounds, hover states |
| **Gray 100** | `#F3F4F6` | `bg-gray-100` | Section dividers, table headers |
| **Gray 200** | `#E5E7EB` | `bg-gray-200` | Borders |
| **Gray 600** | `#4B5563` | `text-gray-600` | Secondary text |
| **Gray 800** | `#1F2937` | `text-gray-800` | Primary text |

### Severity-Based Backgrounds

```tailwind
/* Critical severity card background */
bg-red-50 border-l-4 border-red-600

/* High severity card background */
bg-orange-50 border-l-4 border-orange-500

/* Medium severity card background */
bg-yellow-50 border-l-4 border-yellow-500

/* Low severity card background */
bg-green-50 border-l-4 border-green-600
```

---

## Typography

### Font Stack
- **Font Family**: System default (Tailwind default)
- **Weights Used**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Line Height**: 1.5 (default), 1.25 (headings)

### Text Sizes & Hierarchy

| Element | Size | Weight | Tailwind | Usage |
|---------|------|--------|----------|-------|
| **Page Title** | 32px | 600 | `text-4xl font-semibold` | Main page headers (h1) |
| **Section Header** | 24px | 600 | `text-2xl font-semibold` | Major sections |
| **Subsection** | 18px | 600 | `text-lg font-semibold` | Subsections (h2/h3) |
| **Card Title** | 16px | 600 | `text-base font-semibold` | Card headers |
| **Body Text** | 14px | 400 | `text-sm` | Main content |
| **Secondary Text** | 12px | 400 | `text-xs` | Labels, hints, metadata |
| **Small Labels** | 11px | 500 | `text-xs font-medium` | Table headers, badges |

### Text Color Combinations

```tailwind
/* Primary heading */
text-gray-900 font-semibold

/* Secondary heading */
text-gray-800 font-medium

/* Body text */
text-gray-700

/* Muted text */
text-gray-600

/* Disabled text */
text-gray-400

/* Interactive text */
text-blue-600 hover:text-blue-800
```

---

## Spacing & Layout

### Spacing Scale

All spacing follows Tailwind's scale (px = pixels, 1 unit = 4px):

| Value | Pixels | Tailwind | Usage |
|-------|--------|----------|-------|
| 2 | 8px | `p-2 gap-2` | Tight spacing, small gaps |
| 3 | 12px | `p-3 gap-3` | Button padding, narrow gaps |
| 4 | 16px | `p-4 gap-4` | Default spacing, card padding |
| 6 | 24px | `p-6 gap-6` | Larger sections |
| 8 | 32px | `p-8 gap-8` | Major section spacing |

### Layout Patterns

#### Full-Width Container with Padding
```tailwind
<div className="p-4 md:p-6 lg:p-8">
  {/* Full width with responsive padding */}
</div>
```

#### Responsive Grid (Documents, Cards)
```tailwind
{/* 1 column on mobile, 2 on tablet, 3 on desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {items.map(...)}
</div>
```

#### Side-by-Side Layout
```tailwind
{/* Left sidebar + right content */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-1">{/* Sidebar */}</div>
  <div className="lg:col-span-2">{/* Main */}</div>
</div>
```

#### Flex Row with Space Between
```tailwind
<div className="flex items-center justify-between gap-4">
  {/* Left content on left, right content on right */}
</div>
```

---

## Component Styling Details

### 1. Badge Component (`src/components/common/Badge.tsx`)

**Purpose**: Display severity levels, importance, and status tags

**Styling by Variant**:

```tailwind
/* Critical */
bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold

/* High */
bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold

/* Medium */
bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold

/* Low */
bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold

/* Info (default) */
bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold
```

**Key Features**:
- Pill-shaped (`rounded-full`) for visual distinction
- Padding: `px-3 py-1` (12px horizontal, 4px vertical)
- Font: `text-xs font-semibold` (11px bold)
- Inline-block display

---

### 2. Card Component (`src/components/common/Card.tsx`)

**Purpose**: Container for grouped content, visual separation

**Styling**:

```tailwind
{/* Base card */}
<div className="card">
  {/* Title (if provided) */}
  <h3 className="card-title">{title}</h3>
  {/* Children content */}
  {children}
</div>

{/* CSS classes from globals.css */}
.card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 1rem;
}
```

**Key Features**:
- White background with subtle border
- Light shadow for depth
- 1.5rem (24px) padding
- 0.5rem (8px) border radius

**Responsive**: Not responsive (consistent width)

---

### 3. Button Component (`src/components/common/Button.tsx`)

**Purpose**: Primary and secondary actions

**Styling by Variant**:

#### Primary Button
```tailwind
{/* Default state */}
bg-blue-600 text-white px-4 py-2 rounded font-medium
hover:bg-blue-700 active:bg-blue-800
focus:outline-none focus:ring-2 focus:ring-blue-400

{/* States */}
- Default: bg-blue-600
- Hover: bg-blue-700 (darker)
- Active: bg-blue-800 (darkest)
- Focus: ring-blue-400 (visible outline)
- Disabled: opacity-50 cursor-not-allowed
```

#### Secondary Button
```tailwind
{/* Default state */}
bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium
hover:bg-gray-300 active:bg-gray-400
focus:outline-none focus:ring-2 focus:ring-gray-300
```

**Key Features**:
- Padding: `px-4 py-2` (16px horizontal, 8px vertical)
- Rounded corners: `rounded` (4px)
- Bold text: `font-medium`
- Visible focus state with ring

---

### 4. Modal Component (`src/components/common/Modal.tsx`)

**Purpose**: Overlay for detailed information display

**Styling Structure**:

```tailwind
{/* Overlay (backdrop) */}
<div className="fixed inset-0 bg-black bg-opacity-50 z-40">
  {/* Modal container - centered */}
  <div className="fixed inset-0 flex items-center justify-center">
    {/* Modal content */}
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ×
        </button>
      </div>
      
      {/* Body */}
      <div className="px-6 py-4 max-h-96 overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
</div>
```

**Key Features**:
- Dark overlay: `bg-black bg-opacity-50`
- Centered positioning: `fixed inset-0 flex items-center justify-center`
- Responsive width: `max-w-lg w-full mx-4`
- Scrollable content: `max-h-96 overflow-y-auto`
- Keyboard accessible: Escape to close, focus trap

---

### 5. Table Component (`src/components/common/Table.tsx`)

**Purpose**: Display structured data in rows/columns

**Styling**:

```tailwind
{/* Table wrapper */}
<div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
  <table className="w-full border-collapse text-sm bg-white">
    {/* Header */}
    <thead>
      <tr className="bg-gray-100 border-b border-gray-200">
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {header}
        </th>
      </tr>
    </thead>
    
    {/* Body */}
    <tbody>
      {rows.map(row => (
        <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
          <td className="px-4 py-3 text-gray-800">
            {cell}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

**Key Features**:
- Responsive scrolling: `overflow-x-auto` on mobile
- Header styling: Gray background, uppercase labels
- Row hover: Light blue background fade
- Consistent padding: `px-4 py-3` (16px horizontal, 12px vertical)

---

### 6. DocumentUpload Component (`src/components/DocumentAnalysis/DocumentUpload.tsx`)

**Purpose**: Display available documents in grid layout

**Grid Layout**:

```tailwind
{/* Responsive 3-column grid */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {documents.map(doc => (
    <Card key={doc.id} title={doc.name}>
      {/* Content */}
    </Card>
  ))}
</div>

{/* Breakpoints */}
- grid-cols-1: 1 column (mobile, <768px)
- md:grid-cols-2: 2 columns (tablet, 768px+)
- xl:grid-cols-3: 3 columns (desktop, 1280px+)
- Gap: gap-4 (16px between items)
```

**Document Card Interior**:

```tailwind
{/* Type icon */}
<div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 
                flex items-center justify-center font-bold text-base">
  {icon} {/* P, C, W, I, T */}
</div>

{/* Metadata grid */}
<div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-gray-100">
  <div>
    <div className="text-xs font-medium text-gray-500 uppercase">Author</div>
    <div className="text-sm font-medium text-gray-800">{author}</div>
  </div>
  {/* Similar structure for Version, Last Updated */}
</div>

{/* Content preview */}
<p className="text-sm text-gray-700 line-clamp-4">{content}</p>
```

**Key Features**:
- Square icon with rounded corners: `w-12 h-12 rounded-lg`
- Metadata grid: `grid-cols-2` for 2-column layout
- Bordered sections: `border-t border-b border-gray-100`
- Line clamping: `line-clamp-4` (max 4 lines)

---

### 7. InlineView Component (`src/components/DocumentAnalysis/InlineView.tsx`)

**Purpose**: Two-panel view (documents + findings)

**Layout**:

```tailwind
{/* 3-column layout: 1 for nav, 2 for content */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Left: document navigator */}
  <div className="lg:col-span-1">
    <h3 className="text-base font-semibold text-gray-700 mb-3 
                   uppercase tracking-wide text-xs">
      Documents ({documents.length})
    </h3>
    <div className="space-y-2">
      {documents.map(doc => (
        <button 
          className={`w-full p-3 text-left rounded-lg border-2 transition
            ${isSelected 
              ? 'border-blue-600 bg-blue-50 shadow-sm' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
        >
          {/* Document summary */}
        </button>
      ))}
    </div>
  </div>
  
  {/* Right: content + findings */}
  <div className="lg:col-span-2 space-y-6">
    {/* Document card and findings list */}
  </div>
</div>
```

**Key Features**:
- Responsive: Stacks on mobile, 3-column on desktop
- Document buttons: Full width with hover states
- Selection state: Border and background color change
- Gap spacing: `gap-6` and `space-y-6` for breathing room

**Finding Items Styling**:

```tailwind
{/* Severity-based styling */}
<button className={`w-full p-4 rounded-lg border-l-4 text-left 
  ${finding.severity === 'critical'
    ? 'border-red-600 bg-red-50 hover:bg-red-100'
    : finding.severity === 'high'
    ? 'border-orange-500 bg-orange-50 hover:bg-orange-100'
    : finding.severity === 'medium'
    ? 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100'
    : 'border-green-600 bg-green-50 hover:bg-green-100'
  }`}
>
  {/* Finding content */}
</button>
```

---

### 8. ComplianceTable Component (`src/components/DocumentAnalysis/ComplianceTable.tsx`)

**Purpose**: Tabular view of findings with sorting

**Styling**:

```tailwind
{/* Header with controls */}
<div className="mb-4 flex items-center gap-3 text-sm text-gray-600">
  <span className="font-medium">{findings.length} findings</span>
  <span>&mdash; click column to sort</span>
</div>

{/* Sortable column header */}
<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 
              uppercase tracking-wide cursor-pointer select-none 
              hover:bg-gray-200 transition-colors">
  Severity <span className="ml-1 text-blue-600">↑</span>
</th>

{/* Row styling */}
<tr className="border-b border-gray-100 hover:bg-blue-50 
              cursor-pointer transition-colors">
  <td className="px-4 py-3 font-mono text-xs text-gray-700">{id}</td>
  <td className="px-4 py-3 text-gray-700">{finding}</td>
  <td className="px-4 py-3"><Badge variant={severity} /></td>
  <td className="px-4 py-3 text-center font-bold">{days}</td>
</tr>
```

**Key Features**:
- Clickable headers for sorting
- Sort indicators: `↑` (ascending) / `↓` (descending)
- Row hover state: Light blue background
- Monospace IDs: `font-mono` for better readability

---

### 9. HeatmapView Component (`src/components/DocumentAnalysis/HeatmapView.tsx`)

**Purpose**: Risk visualization by section

**Section Card Styling**:

```tailwind
{/* Dynamic border colors based on highest severity */}
<div className={`p-4 rounded-lg ${riskColor} border-l-4 ${
  counts.critical > 0 ? 'border-red-600' :
  counts.high > 0 ? 'border-orange-500' :
  counts.medium > 0 ? 'border-yellow-500' :
  'border-green-600'
}`}>
  <div className="font-semibold">{section}</div>
  
  {/* Severity count grid */}
  <div className="grid grid-cols-4 gap-2 mt-3">
    <div className="bg-red-600 text-white p-2 rounded text-center">
      <div className="text-2xl font-bold">{critical}</div>
      <div className="text-xs">Critical</div>
    </div>
    {/* Similar for High, Medium, Low */}
  </div>
</div>

{/* Risk color map */}
const riskColor = 
  counts.critical > 0 ? 'bg-red-100' :
  counts.high > 0 ? 'bg-orange-100' :
  counts.medium > 0 ? 'bg-yellow-100' :
  'bg-green-100'
```

**Key Features**:
- Dynamic border color based on severity
- Count boxes with matching colors
- Clear visual hierarchy
- Responsive: Stacks on narrow screens

---

### 10. ScoreDashboard Component (`src/components/ReportGeneration/ScoreDashboard.tsx`)

**Purpose**: Display compliance scores and metrics

**Overall Score Display**:

```tailwind
{/* Score circle */}
<div className={`p-6 rounded-lg border-2 text-center ${getScoreBgColor(score)}`}>
  <div className={`text-5xl font-bold ${getScoreTextColor(score)} mb-2`}>
    {score}
  </div>
  <div className="text-gray-600">/ 100</div>
  <div className="mt-2 text-sm text-gray-600">
    {score >= 80 ? 'Strong Compliance' : 'Weak Compliance'}
  </div>
</div>

{/* Color mapping */}
const getScoreBgColor = (score) => {
  if (score >= 80) return 'bg-green-50 border-green-200';
  if (score >= 60) return 'bg-yellow-50 border-yellow-200';
  if (score >= 40) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
};

const getScoreTextColor = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
};
```

**Progress Bar Styling**:

```tailwind
{/* Dimensional score progress bar */}
<div className="relative w-full bg-gray-200 rounded-full h-2 mb-2">
  <div className={`h-2 rounded-full transition-all ${getScoreColor(score)}`}
       style={{ width: `${score}%` }} />
</div>
<div className={`text-2xl font-bold ${getScoreColor(score)}`}>
  {score}%
</div>

{/* Background gray with colored fill on top */}
```

**Key Features**:
- Large percentage display: `text-5xl font-bold`
- Responsive progress bar with colored fill
- Dynamic color based on threshold values
- Labeled dimension cards in grid layout

---

### 11. FindingsList Component (`src/components/ReportGeneration/FindingsList.tsx`)

**Purpose**: Filtered list of audit findings

**Severity Filter Buttons**:

```tailwind
{/* Filter button grid */}
<div className="grid grid-cols-4 gap-4">
  <button className={`p-3 rounded text-center cursor-pointer transition ${
    filterSeverity === null 
      ? 'bg-blue-100 border-2 border-blue-600' 
      : 'bg-gray-100 border-2 border-gray-200 hover:border-gray-300'
  }`}>
    <div className="font-bold text-lg">{count}</div>
    <div className="text-sm">Total</div>
  </button>
  
  {/* Critical button */}
  <button className={`p-3 rounded text-center bg-red-50 border-2 ${
    filterSeverity === 'critical' ? 'border-red-600' : 'border-red-200'
  }`}>
    <div className="font-bold text-lg text-red-600">{count}</div>
    <div className="text-sm">Critical</div>
  </button>
  
  {/* Similar for High, Medium buttons */}
</div>
```

**Finding Item Card**:

```tailwind
{/* Clickable finding row */}
<button className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 
                   hover:bg-blue-50 text-left transition w-full">
  <div className="flex items-start gap-4">
    {/* Severity badge */}
    <Badge variant={finding.severity} text={finding.severity.toUpperCase()} />
    
    <div className="flex-1 min-w-0">
      <div className="font-semibold text-sm text-gray-900">{id}</div>
      <div className="text-sm text-gray-700 mt-1 line-clamp-2">{finding}</div>
      <div className="text-xs text-gray-600 mt-2">
        <span className="font-medium">Clause:</span> {clause} • 
        <span className="font-medium">Section:</span> {section}
      </div>
    </div>
  </div>
</button>
```

**Key Features**:
- Severity filter buttons with active state
- Clickable findings with hover effect
- Compact information display
- Metadata (clause, section) on secondary row

---

### 12. RoadmapTable Component (`src/components/ReportGeneration/RoadmapTable.tsx`)

**Purpose**: Remediation timeline organized by urgency

**Timeline Section Styling**:

```tailwind
{/* Timeline group container */}
<Card title={`🔴 Immediate (0-14 days)`}>
  {/* Header with finding count */}
  <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded mb-4">
    <span className="text-sm font-semibold">
      {findings.length} finding{findings.length !== 1 ? 's' : ''}
    </span>
    <span className="text-xs text-gray-600 ml-2">
      &mdash; total {totalDays} days
    </span>
  </div>
  
  {/* Table with findings */}
  <table className="w-full text-sm bg-white">
    {/* ... table content ... */}
  </table>
</Card>

{/* Timeline colors */}
const colors = {
  immediate: { border: 'border-red-600', bg: 'bg-red-50' },
  shortTerm: { border: 'border-orange-500', bg: 'bg-orange-50' },
  mediumTerm: { border: 'border-yellow-500', bg: 'bg-yellow-50' },
  longTerm: { border: 'border-green-600', bg: 'bg-green-50' }
};
```

**Table Row (Clickable)**:

```tailwind
<tr className="border-b border-gray-100 hover:bg-blue-50 
              cursor-pointer transition-colors"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {...} }}
    role="button"
    aria-label={`View details for ${finding.id}`}>
  <td className="px-3 py-3 font-mono text-xs text-gray-700">{id}</td>
  <td className="px-3 py-3 text-gray-700 max-w-xs">
    <div className="line-clamp-2 text-xs">{finding}</div>
    <div className="text-xs text-gray-400 mt-0.5">{section}</div>
  </td>
  <td className="px-3 py-3">
    <Badge variant={finding.severity} text={finding.severity.toUpperCase()} />
  </td>
  <td className="px-3 py-3 text-center font-bold text-gray-800">
    {finding.daysToRemediate}
  </td>
</tr>
```

**Key Features**:
- Timeline emoji indicators (🔴 🟠 🟡 🟢)
- Total effort calculation in header
- Keyboard accessible rows
- Severity badges in table

---

### 13. Header Component (App.tsx)

**Purpose**: Navigation and branding

**Styling**:

```tailwind
{/* Main header */}
<header className="app-header sticky top-0 z-50 bg-gradient-to-r 
                    from-blue-600 to-blue-700 text-white shadow-lg">
  <div className="max-w-7xl mx-auto px-4 py-4">
    {/* Brand section */}
    <div className="flex items-center gap-4 mb-2">
      <div className="w-10 h-10 rounded-lg bg-white text-blue-600 
                      flex items-center justify-center font-bold">
        VA
      </div>
      <h1 className="text-2xl font-bold">Vegas Audit POC</h1>
    </div>
    <p className="text-blue-100 text-sm">Compliance Analysis & Audit Reporting</p>
    
    {/* Navigation tabs */}
    <nav className="app-nav flex gap-6 mt-4">
      <button className={`nav-btn ${currentPage === 'analysis' ? 'active' : ''}`}>
        Document Analysis
      </button>
      <button className={`nav-btn ${currentPage === 'report' ? 'active' : ''}`}>
        Report Generation
      </button>
    </nav>
  </div>
</header>

{/* CSS for nav states */}
.nav-btn {
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;
}

.nav-btn.active {
  color: white;
  border-bottom-color: white;
}

.nav-btn:hover {
  color: white;
}
```

**Key Features**:
- Gradient background: `bg-gradient-to-r from-blue-600 to-blue-700`
- Sticky positioning: `sticky top-0 z-50`
- Brand logo: White square with blue text
- Active navigation indicator: Bottom border

---

## Interactive States

### Button States

```tailwind
/* Normal state */
bg-blue-600 text-white

/* Hover state */
hover:bg-blue-700 hover:shadow-md

/* Active/Pressed state */
active:bg-blue-800

/* Focus state (keyboard) */
focus:outline-none focus:ring-2 focus:ring-blue-400

/* Disabled state */
disabled:opacity-50 disabled:cursor-not-allowed
```

### Link States

```tailwind
/* Normal */
text-blue-600

/* Hover */
hover:text-blue-800

/* Active */
text-blue-900

/* Focus */
focus:outline-none focus:underline
```

### Form Input States

```tailwind
/* Normal */
border border-gray-200 focus:border-blue-600

/* Focus */
focus:outline-none focus:ring-2 focus:ring-blue-400

/* Error */
border-red-600 focus:ring-red-400

/* Disabled */
disabled:bg-gray-50 disabled:cursor-not-allowed
```

### Row Hover States

```tailwind
/* Table row */
hover:bg-blue-50 transition-colors

/* Button/Card row */
hover:shadow-md hover:border-blue-400 transition-all
```

---

## Responsive Design

### Breakpoints (Tailwind Standard)

| Breakpoint | Width | Usage |
|------------|-------|-------|
| None (mobile) | < 640px | Default, base styles |
| `sm:` | 640px+ | Small tablets, landscape phones |
| `md:` | 768px+ | Tablets, small laptops |
| `lg:` | 1024px+ | Laptops, monitors |
| `xl:` | 1280px+ | Large monitors |

### Responsive Patterns

#### Responsive Padding
```tailwind
<div className="p-4 md:p-6 lg:p-8">
  /* 16px on mobile, 24px on tablet, 32px on desktop */
</div>
```

#### Responsive Grid
```tailwind
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  /* 1 column mobile, 2 on tablet, 3 on desktop */
</div>
```

#### Responsive Layout
```tailwind
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-1">
    {/* Sidebar: full width mobile, 1/3 width on desktop */}
  </div>
  <div className="lg:col-span-2">
    {/* Main: full width mobile, 2/3 width on desktop */}
  </div>
</div>
```

#### Responsive Text
```tailwind
<h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
  {/* 24px on mobile, 30px on tablet, 36px on desktop */}
</h1>
```

#### Responsive Visibility
```tailwind
<button className="md:hidden">
  {/* Visible only on mobile */}
</button>

<button className="hidden md:block">
  {/* Hidden on mobile, visible on tablet+ */}
</button>
```

### Mobile-First Approach

- **Default (mobile)**: Full-width, single column, compact spacing
- **Tablet (md:)**: Multi-column layouts, increased spacing
- **Desktop (lg:)**: Complex layouts, extensive spacing, sidebars
- **Large Screens (xl:)**: Maximum width constraints, premium layouts

---

## Design Consistency Rules

### Color Usage Rules

1. **Severity colors are absolute**
   - Critical = Always red-600
   - High = Always orange-500
   - Medium = Always yellow-500
   - Low = Always green-600

2. **Text on colored backgrounds**
   - Red/Orange/Green backgrounds: white text
   - Yellow backgrounds: black text (contrast)
   - Light backgrounds: dark text (gray-800/900)

3. **Hover states**
   - Always one shade darker
   - Never change color family (blue stays blue)

### Spacing Rules

1. **Use scale multiples** (not random values)
   - 2, 3, 4, 6, 8 units only
   - Never use `p-5` or `gap-5`

2. **Consistent gaps within components**
   - Cards: `gap-4`
   - Sections: `gap-6`
   - Major sections: `gap-8`

3. **Padding vs Gap**
   - Use `gap` for space between items
   - Use `p-x` for internal padding

### Typography Rules

1. **Header hierarchy is strict**
   - Page title: `text-4xl font-semibold`
   - Section: `text-lg font-semibold`
   - Body: `text-sm` (14px)
   - Labels: `text-xs` (12px)

2. **Line length guidance**
   - Aim for 50-75 characters wide
   - Use `max-w-lg` on prose-heavy sections

3. **Color hierarchy**
   - Headers: gray-900
   - Body: gray-800
   - Secondary: gray-600
   - Muted: gray-400

---

## CSS Class Organization

### Commonly Used Class Combinations

```tailwind
/* Card-like containers */
p-4 rounded-lg border border-gray-200 bg-white

/* Clickable elements */
cursor-pointer transition-colors hover:bg-blue-50

/* Form inputs */
border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400

/* Grid layouts */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4

/* Flex row with space */
flex items-center justify-between gap-4

/* Full-width button */
w-full px-4 py-2 bg-blue-600 text-white rounded font-medium

/* Severity badge */
inline-block px-3 py-1 rounded-full text-xs font-semibold

/* Section header */
text-lg font-semibold text-gray-800 uppercase tracking-wide
```

---

## Performance Considerations

### CSS Optimization

1. **Use Tailwind utilities** (compiled to minimal CSS)
2. **Avoid inline styles** (use classes instead)
3. **Leverage CSS cascading** (use parent classes)
4. **No custom CSS** (pure Tailwind only, except globals)

### Rendering Optimization

1. **Memoize complex grids** with `useMemo`
2. **Use CSS transitions** instead of JS animations
3. **Lazy load heavy components** (modal content)
4. **Avoid unnecessary re-renders** with React.memo

---

## Accessibility Considerations

### Color
- ✅ Never rely on color alone (use icons, text)
- ✅ Maintain color contrast ratio 4.5:1 minimum
- ✅ Severity colors are distinguishable for color-blind users

### Focus States
- ✅ All interactive elements have `focus:ring-2`
- ✅ Focus states are visible and obvious
- ✅ Tab order follows visual layout

### ARIA Labels
- ✅ Buttons have descriptive labels
- ✅ Tables have header associations
- ✅ Modals have `role="dialog" aria-modal="true"`

### Keyboard Navigation
- ✅ All functionality accessible via keyboard
- ✅ Escape key closes modals
- ✅ Enter/Space triggers buttons

---

## Summary

The Vegas Audit PoC uses a **clean, severity-based color system** with **Tailwind CSS utilities** for styling. All components follow a consistent **spacing scale**, **typography hierarchy**, and **responsive mobile-first approach**. The design prioritizes **clarity**, **accessibility**, and **professional appearance** suitable for compliance audit reporting.

Key Design Assets:
- **4 Severity Colors**: Red, Orange, Yellow, Green
- **3-Column Grid**: Responsive from 1 to 3 columns
- **2-Panel Layout**: Sidebar + Content pattern
- **Card-Based**: Modular, reusable containers
- **Interactive States**: Clear hover, focus, and active states
- **Keyboard Accessible**: Full keyboard navigation support
