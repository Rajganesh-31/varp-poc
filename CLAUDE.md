# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vegas Audit POC is a React/TypeScript/Vite UI for document compliance analysis and audit reporting. Two modules share the screen via a top-bar tab: **Document Analysis** and **Report Generation**.

## Commands

```bash
npm run dev          # Vite dev server → http://localhost:3000
npm run build        # tsc && vite build → dist/
npm run type-check   # TypeScript strict check, no emit
npm run lint         # ESLint on all .ts/.tsx
npm run preview      # Preview production build
```

TypeScript strict mode is on. Fix all type errors; avoid `any`.

## Architecture

### App Shell

`src/App.tsx` owns top-level page state (`activePage: 'analysis' | 'report'`) and composes all three Context providers. `AppShell` (`src/components/layout/AppShell.tsx`) wraps `TopBar` (48px, `h-12`) and the content area (remaining viewport height, `overflow-hidden`). Both modules are conditionally rendered inside the content area.

### Three-Panel Layouts

Both major modules share the same three-panel pattern:

**DocumentAnalysis** (`src/components/DocumentAnalysis/DocumentAnalysis.tsx`):
- Left (`w-56`): `DocumentNavigator` — document list + section list with severity dots
- Center (`flex-1`): `DocumentViewer` | `ComplianceTableView` | `HeatmapView`, selected by `ViewToggleTabs` (bottom bar, `h-12`)
- Right (`w-72`): `FindingsPanel` — findings grouped by severity
- Modal: `FindingDetailModal` — shown on "View Full Details"

All state for this module is managed by `useDocumentAnalysisState` (see Hooks). No Context is used inside this module.

**ReportGeneration** (`src/components/ReportGeneration/ReportGeneration.tsx`):
- Left (`w-56`): `ReportNavigation` — section links
- Center (`flex-1`): rendered section (`ExecutiveSummary` | `ScoreDashboard` | `FindingsReview` | `RemediationRoadmap` | `ComplianceRulesReference`)
- Right (`w-52`): `CallToActionPanel`

`ReportGeneration` owns `ToastContext.Provider` — children call `useToast()` to trigger notifications.

### Hooks

- **`useDocumentAnalysisState`** — all state + derived data for the DocumentAnalysis module. Composes `useMockData` + `useAnnotationInteraction`. Returns `activeView`, `activeDocument`, `documentFindings`, `selectedFinding`, `highlightedFindingId`, `annotation`, and all handlers.
- **`useReportGenerationState`** — analogous state for ReportGeneration.
- **`useDocumentAnalysis`** / **`useReportGeneration`** — thin wrappers that compose the state hooks with additional side-effects or business logic if needed.
- **`useAnnotationInteraction`** — mutual exclusion between hover tooltip and expanded inline card. Tooltip visible only when no card is expanded; clicking a span expands it and hides the tooltip.
- **`useMockData`** — single source of truth for all mock data. Returns `{ mockReport, mockFindings, mockRules, mockDocuments, isLoading }` after a simulated 1200ms delay. Components must not import mock JSON directly.
- **`useToast`** / **`useToastState`** — `useToastState()` creates the toast state at provider level (called once in `ReportGeneration`); `useToast()` consumes it in children. Max 3 toasts, auto-dismiss at 3s.
- **`useLocalStorage`** — generic hook for persisting state to localStorage.

### Annotation Pipeline

`DocumentViewer` renders inline compliance annotations via:
1. **`annotationParser.ts`** (`parseAnnotatedContent`) — splits document text into `ContentSegment[]` of `{ type: 'text' }` or `{ type: 'annotation', finding }` by matching `finding.highlightPhrase` in order.
2. **`AnnotatedDocumentBody`** — renders segments; uses `useAnnotationInteraction` for hover/click state.
3. **`AnnotationTooltipContent`** — MUI `Tooltip` content shown on hover (suppressed when a card is expanded).
4. **`AnnotationExpandCard`** — inline expanded card shown on click; dismisses on outside click.

### Common Components (`src/components/common/`)

- **`SeverityBadge`** — uses inline styles (not Tailwind dynamic classes) to prevent Tailwind from purging severity color classes. Follow this same pattern for any component using dynamic severity colors.
- **`AppDialog`** — wraps MUI `Dialog` with project-standard sizing and backdrop blur.
- **`FilterChipRow`** — horizontal chip filter bar, used for severity filtering.
- **`SkeletonBlock`** — loading skeleton using MUI `Skeleton`.
- **`ToastHost`** — renders the toast stack via `useToast()`.

### State Management

Three Context providers in `src/context/` compose in `App.tsx`:

- **AuditContext** — `findings: Finding[]`, `addFinding`, `clearFindings`
- **DocumentContext** — `document: Document | null`, `setDocument`, `clearDocument`
- **ReportContext** — `report: Report | null`, `setReport`, `clearReport`

Neither module currently reads from these contexts; they exist for future API integration. Both modules load all data via `useMockData()`.

### Types

**`src/types/index.ts`** is the canonical export for all types. Always import from `'../types'`. Key types:
- `Severity` — `'critical' | 'high' | 'medium' | 'low'`
- `SectionId` — union of report section string literals
- `Finding`, `Report`, `ComplianceRule`, `Document`, `AssessmentScore`

### Design Token System

Two layers must be kept in sync:

**`src/styles/tokens.css`** — CSS custom properties consumed by the browser. Source of truth for the CSS layer.

**`src/theme/tokenMap.ts`** — JS hex constant map consumed by the MUI theme (`src/theme/theme.ts`). Must mirror `tokens.css` values. Never put raw hex values in components; always reference `theme.palette.*`.

`src/theme/muiAugmentations.d.ts` extends the MUI `Palette` interface to include custom keys (`surface`, `border`, `severity`, `brand`, `textHierarchy`), enabling TypeScript-safe access via `theme.palette.severity.critical.fg` etc.

`src/theme/index.ts` re-exports the theme for use in `main.tsx` (`ThemeProvider`).

Token namespaces:
- **Surface stack**: `base` → `elevated` → `overlay` → `raised` → `float`
- **Border**: `subtle` / `default` / `strong` / `focus`
- **Brand**: `primary` (#4F6EF7) / `hover` / `muted` / `subtle`
- **Severity**: four tokens per level (`fg`, `bg`, `border`, `badge`) for `critical` / `high` / `medium` / `low`
- **Text**: `primary` → `secondary` → `tertiary` → `disabled` → `inverse`

`src/styles/variables.css` and `src/styles/globals.css` also exist; `tokens.css` is the newer, authoritative CSS file.

### Utilities

- **`formatters.ts`** — `formatSeverity()`, `formatScore()`, `formatDate()`, `formatPercentage()`
- **`calculations.ts`** — `calculateAuditScore()`, `calculateHeatmapValues()`, `groupFindingsBySeverity()`
- **`scoreTheme.ts`** — `getScoreColor(score, theme)` and `getScoreStatusChip(score, theme)` — derive MUI theme colors from a numeric score.
- **`validators.ts`** — `validateFinding()`, `validateDocument()`, `validateEmail()`, `validateScore()`
- **`documentValidator.ts`** — field-level document validation (`validateDocument`, `validateDocuments`, `generateValidationReport`); separate from `validators.ts`
- **`annotationParser.ts`** — see Annotation Pipeline above.
- **`constants.ts`** — `SEVERITY_LEVELS`, `FINDING_STATUSES`, `BADGE_VARIANTS`, etc. Note: uses raw hex values; prefer `theme.palette.severity.*` in components instead.

## Environment Variables

See `.env.example`:
- `VITE_API_URL` — backend endpoint (unused)
- `VITE_ENABLE_MOCK_DATA` — toggle mock vs real API (default: true)

---

## UI Implementation: MUI + Tailwind Hybrid

Material UI is the **primary component framework**. Tailwind is structural scaffolding only.

### MUI component map

| Need | Use |
|---|---|
| Cards / containers | `Paper`, `Box`, `Stack`, `Grid` |
| Text | `Typography` |
| Navigation | `Tabs`, `Drawer` |
| Inputs | `TextField`, `Select` |
| Overlays | `Modal`, `Tooltip`, `Popover` |
| Feedback | `Snackbar`, `Alert` |
| Badges | `Chip` (custom styled) |
| Tables, Modals, Panels, Sidebars, Forms | MUI equivalents |

### Tailwind: allowed vs. forbidden

✅ Allowed: `flex`, `grid`, `gap-*`, `w-*`, `h-*`, `overflow-*`, `max-w-*`, `mx-auto`, positioning utilities.

❌ Not allowed: `bg-*`, `text-*`, `border-*`, `shadow-*`, `rounded-*`, `hover:*`, `focus:*` — all visual styling comes from the MUI theme or design tokens.

### Styling priority

1. MUI `sx` prop
2. MUI `styled()`
3. Tailwind (layout only)
4. Inline styles (only for dynamic `width`/`height`)

### Correct usage example

```tsx
<Box className="flex items-center gap-2" sx={{ px: 2, py: 1, bgcolor: 'background.paper' }}>
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    Section Title
  </Typography>
</Box>
```
