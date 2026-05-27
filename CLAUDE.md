# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vegas Audit POC is a React/TypeScript/Vite UI for document compliance analysis and audit reporting. Two modules share the screen via a top-bar tab: **Document Analysis** and **Report Generation**.

## Commands

```bash
npm run dev          # Vite dev server → http://localhost:3000
npm run build        # tsc + Vite bundle → dist/
npm run type-check   # TypeScript strict check, no emit
npm run lint         # ESLint on all .ts/.tsx
npm run preview      # Preview production build
```

TypeScript strict mode is on. Fix all type errors; avoid `any`.

## Architecture

### App Shell

`src/App.tsx` owns top-level page state (`activePage: 'analysis' | 'report'`) and composes all three Context providers. The top bar is 48px (`h-12`); the content area fills the remaining viewport height with `overflow-hidden`. Both modules are conditionally rendered inside the content area.

### Three-Panel Layouts

Both major modules share the same three-panel pattern:

**DocumentAnalysis** (`src/components/DocumentAnalysis/DocumentAnalysis.tsx`):
- Left (`w-56`): `DocumentNavigator` — document list + section list with severity dots
- Center (`flex-1`): `DocumentViewer` | `ComplianceTableView` | `HeatmapView`, selected by `ViewToggleTabs` (bottom bar, `h-12`)
- Right (`w-72`): `FindingsPanel` — findings grouped by severity
- Modal: `FindingDetailModal` — shown on "View Full Details"

State (active document, active view, selected finding, highlighted finding) lives in `DocumentAnalysis` and is passed down max two levels. No Context is used inside this module.

**ReportGeneration** (`src/components/ReportGeneration/ReportGeneration.tsx`):
- Left (`w-56`): `ReportNavigation` — section links
- Center (`flex-1`): rendered section (`ExecutiveSummary` | `ScoreDashboard` | `FindingsReview` | `RemediationRoadmap` | `ComplianceRulesReference`)
- Right (`w-52`): `CallToActionPanel`

`ReportGeneration` owns `ToastContext.Provider` — children call `useToast()` to trigger notifications.

### State Management

Three Context providers in `src/context/` compose in `App.tsx`:

- **AuditContext** — `findings: Finding[]`, `addFinding`, `clearFindings`
- **DocumentContext** — `document: Document | null`, `setDocument`, `clearDocument`
- **ReportContext** — `report: Report | null`, `setReport`, `clearReport`

Neither module currently reads from these contexts; they exist for future API integration. Both modules load all data via `useMockData()`.

### Data Layer

**`useMockData`** (`src/hooks/useMockData.ts`) is the single source of truth for all mock data. Returns `{ mockReport, mockFindings, mockRules, isLoading }` after a simulated 1200ms delay. Components must not import mock JSON directly.

**`useToast`** / **`useToastState`** (`src/hooks/useToast.ts`): `useToastState()` creates the toast state at provider level (called once in `ReportGeneration`); `useToast()` consumes it in children. Max 3 toasts, auto-dismiss at 3s.

### Types

**`src/types/index.ts`** is the canonical export for all types. Key types:
- `Severity` — `'critical' | 'high' | 'medium' | 'low'`
- `SectionId` — union of report section string literals
- `Finding`, `Report`, `ComplianceRule`, `Document`, `AssessmentScore`

The individual files (`document.ts`, `finding.ts`, `report.ts`, `compliance.ts`) still exist but `index.ts` re-exports everything. Always import from `'../types'` (resolves to `index.ts`).

### Design Token System

**`src/styles/tokens.css`** is the single source of truth for all design tokens. It defines:
- **Surface stack**: `--surface-base` → `--surface-float` (dark-first depth hierarchy)
- **Border system**: `--border-subtle` / `--border-default` / `--border-strong` / `--border-focus`
- **Brand colors**: `--brand-primary` (#4F6EF7) and variants
- **Severity colors**: four tokens per level (`-fg`, `-bg`, `-border`, `-badge`) for critical/high/medium/low
- **Text hierarchy**: `--text-primary` → `--text-disabled`
- **Typography scale**: `--text-size-*` / `--text-lh-*` pairs (10px–48px)
- **Spacing**: `--space-1` (4px) through `--space-16` (64px) — base unit is 4px
- **Radius**: `--radius-sm` (4px) through `--radius-full`
- **Shadows**: `--shadow-sm` through `--shadow-xl`
- **Z-index**: `--z-base` (0) through `--z-tooltip` (400)

`src/styles/variables.css` and `src/styles/globals.css` also exist; `tokens.css` is the newer, authoritative file.

**Important constraint**: `SeverityBadge` (`src/components/common/SeverityBadge.tsx`) uses inline styles (not Tailwind dynamic classes) to prevent Tailwind from purging severity color classes. Follow the same pattern for any component using dynamic severity colors.

### Utilities

- **`formatters.ts`** — `formatSeverity()`, `formatScore()`, `formatDate()`, `formatPercentage()`
- **`calculations.ts`** — `calculateAuditScore()`, `calculateHeatmapValues()`, `groupFindingsBySeverity()`
- **`validators.ts`** — `validateFinding()`, `validateDocument()`, `validateEmail()`, `validateScore()`
- **`documentValidator.ts`** — field-level document validation (`validateDocument`, `validateDocuments`, `generateValidationReport`); separate from `validators.ts`

## Environment Variables

See `.env.example`:
- `VITE_API_URL` — backend endpoint (unused)
- `VITE_ENABLE_MOCK_DATA` — toggle mock vs real API (default: true)

---

## UI IMPLEMENTATION LAYER (MATERIAL UI + TAILWIND HYBRID)

The Vegas Audit UI supports BOTH:
- Material UI (MUI) for structured, scalable component architecture
- Tailwind CSS for rapid layout and spacing

However, this is NOT a free-for-all. Strict rules apply.

---

### PRIMARY RULE

Material UI MUST be the **primary component framework**.

Tailwind is allowed ONLY for:
- Layout scaffolding (flex, grid, spacing)
- Quick structural alignment
- Minor utility adjustments

---

### WHEN TO USE MATERIAL UI (MANDATORY)

Use MUI components for ALL:

#### Core UI Elements
- Cards → `Paper`
- Layout containers → `Box`, `Stack`, `Grid`
- Text → `Typography`
- Navigation → `Tabs`, `Drawer`
- Inputs → `TextField`, `Select`
- Overlays → `Modal`, `Tooltip`, `Popover`
- Feedback → `Snackbar`, `Alert`
- Badges → `Chip` (custom styled)

#### Complex Components
- Tables
- Modals
- Panels
- Sidebars
- Form elements

---

### WHEN TAILWIND IS ALLOWED

✅ Allowed:
- `flex`, `grid`, `gap-*`
- `w-*`, `h-*`
- `overflow-*`
- `max-w-*`, `mx-auto`
- Quick positioning

❌ NOT allowed:
- Colors (no `bg-*`, `text-*`, `border-*`)
- Typography
- Shadows
- Border radius
- State styles (hover, active, focus)

👉 ALL visual styling must still come from design tokens or MUI theme.

---

### THEME SYSTEM (CRITICAL)

You MUST create a Material UI theme that maps the design tokens:

#### Palette Mapping
- surface-base → `background.default`
- surface-overlay → `background.paper`
- brand → `primary.main`

#### Extend Palette with:
- severity: { critical, high, medium, low }
- border levels
- text hierarchy

#### Enforce:
- No default MUI blue/purple colors
- No raw hex values in components
- No inline color usage outside theme

---

### STYLING RULES

Preferred priority:

1. MUI `sx` prop ✅
2. MUI `styled()` ✅
3. Tailwind (layout only) ✅
4. Inline styles ❌ (except dynamic width/height)

---

### EXAMPLE USAGE

✅ Correct:

```tsx
<Box className="flex items-center gap-2" sx={{ px: 2, py: 1, bgcolor: 'background.paper' }}>
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    Section Title
  </Typography>
</Box>
``