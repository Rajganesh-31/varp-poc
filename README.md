# Vegas Audit POC — UI Screen (Static UI Design)

A UI proof-of-concept for the Vegas Audit system. The app renders two primary modules (via a top-bar tab): **Document Analysis** and **Report Generation**. All screens are powered by `useMockData()` (single source of truth for mock inputs) to simulate real API responses.

---

## Section 1 — PoC Description

### Features implemented

#### Module: Document Analysis

**Mock inputs used**
- **`mockDocuments`**: document list and per-document content/sections
- **`mockFindings`**: compliance findings used for inline highlights, lists, tables, and heatmap
- **`mockRules`**: compliance rule metadata used for the compliance table view

**Components and their inputs → output achieved**
- **Document Navigator**
  - **Inputs**: `mockDocuments`, `mockFindings` (+ local UI state: active document/section)
  - **Output achieved**: left navigation to switch documents/sections, with severity indicators driven by findings
- **View Toggle Tabs**
  - **Inputs**: module view state (no mock inputs)
  - **Output achieved**: switches center panel between Inline Viewer, Compliance Table, and Heatmap views
- **Document Viewer (Inline)**
  - **Inputs**: active document from `mockDocuments`, document-scoped findings from `mockFindings`
  - **Output achieved**: renders document content with inline finding highlighting + hover/expand interactions and “view full details” entrypoint
- **Compliance Table View**
  - **Inputs**: `mockFindings`, `mockDocuments`, `mockRules`
  - **Output achieved**: tabular mapping of findings ↔ documents ↔ rules, with drill-in to full finding details
- **Heatmap View**
  - **Inputs**: `mockFindings`
  - **Output achieved**: severity heatmap visualization across compliance areas with selectable findings
- **Findings Panel**
  - **Inputs**: `mockFindings` (+ active document selection)
  - **Output achieved**: right panel listing/grouping findings by severity with selection/highlight behavior
- **Finding Detail Modal**
  - **Inputs**: selected finding derived from `mockFindings`
  - **Output achieved**: full-detail modal view for a finding (context, severity, evidence, recommended actions)

#### Module: Report Generation

**Mock inputs used**
- **`mockReport`**: report metadata and score inputs for summary + dashboards
- **`mockFindings`**: findings used across review and remediation sections
- **`mockRules`**: compliance rules reference content

**Components and their inputs → output achieved**
- **Report Navigation**
  - **Inputs**: module section state (no mock inputs)
  - **Output achieved**: left navigation across report sections
- **Executive Summary**
  - **Inputs**: `mockReport`, `mockFindings`
  - **Output achieved**: high-level audit summary with key outcomes derived from report + findings
- **Score Dashboard**
  - **Inputs**: `mockReport`
  - **Output achieved**: score visualization/dashboard view for the audit results
- **Findings Review**
  - **Inputs**: `mockFindings`
  - **Output achieved**: structured review of findings for stakeholders (filtering/grouping/scanability)
- **Remediation Roadmap**
  - **Inputs**: `mockFindings`
  - **Output achieved**: remediation plan/roadmap derived from findings (prioritized actions)
- **Compliance Rules Reference**
  - **Inputs**: `mockRules`
  - **Output achieved**: reference section for compliance requirements/rules
- **Call To Action Panel**
  - **Inputs**: module UI state (no mock inputs)
  - **Output achieved**: right-side panel for next steps/actions
- **Toast Notifications (host + context)**
  - **Inputs**: user actions (no mock inputs)
  - **Output achieved**: consistent in-module notifications (max 3, auto-dismiss)

---

## Section 2 — Project Notes

### Features implemented

- **Mock data driven UI**: `useMockData()` simulates asynchronous loading and provides consistent mock inputs across both modules.
- **Two-module app shell**: top-level routing between Document Analysis and Report Generation in a shared layout.
- **Three-panel layouts**: both modules follow a left-nav / center-content / right-panel pattern for fast scanning and drill-down.

### Project Structure (high level)

```
src/
  components/
    DocumentAnalysis/
    ReportGeneration/
    common/
  hooks/
  context/
  types/
  mock/
  utils/
  styles/
  App.tsx
```

### Getting Started

**Prerequisites**
- Node.js 18+
- npm

**Install**

```bash
npm install
cp .env.example .env
```

**Run**

```bash
npm run dev
```

Open `http://localhost:3000`.

**Quality checks**

```bash
npm run type-check
npm run lint
```

### Technologies Used (high level)

- **React + TypeScript**
- **Vite**
- **Material UI + Tailwind (layout utilities only)**

### Claude features used in this project

- **UI scaffolding & iteration**: generating and refining module layouts and component structure.
- **TypeScript strict-mode assistance**: keeping props and state typed and consistent across modules.
- **Refactoring support**: helping centralize mock inputs via `useMockData()` and keep component interfaces predictable.
- **Lint-driven fixes**: resolving issues surfaced by ESLint/type-check loops during development.

### Contributing

See `CLAUDE.md` for repo-specific conventions and implementation constraints.

### License

All rights reserved. 2026 Vegas Audit.
