# Prompt: Create Mock Data Generator Skill for Vegas Audit PoC

## Skill Name
**Mock Data Generator for API Q1 Audit Findings**
---

## Objective
Create a reusable Claude Code skill that generates realistic, production-quality mock JSON data for a compliance audit management system. The skill should produce sample findings, documents, reports, and compliance rules that align with API Q1 standards.

---

## Data Structures to Generate

### 1. Findings Data (src/mock/findings.json)

**Purpose:** Generate realistic API Q1 compliance findings with varying severity levels

**Required Schema:**

```typescript
interface Finding {
  id: string                    // Unique identifier (F001, F002, etc.)
  document: string              // Source document type
  finding: string               // Detailed finding description (50-150 chars)
  severity: "Low" | "Medium" | "High" | "Critical"
  clause: string                // API Q1 reference (format: "API Q1 §X.X")
  impact: string                // Business/audit impact (30-80 chars)
  recommendation: string        // Remediation action (50-150 chars)
  section?: string              // Optional: Document section
  daysToRemediate?: number      // Recommended timeline in days
}
```

**Generation Requirements:**

- **Count:** 8-12 realistic findings
- **Severity Distribution:**
  - 1-2 Critical findings
  - 2-3 High findings
  - 3-4 Medium findings
  - 2-3 Low findings

- **Document Types:** "Quality Manual", "Procedure", "Work Instruction", "Test Report", "Calibration Record"

- **API Q1 Clauses:** Use real clauses like:
  - §5.3 Risk Management Process
  - §5.1 Management Responsibility
  - §8.2 Calibration Requirements
  - §7.1 Personnel Competency
  - §6.2 Document Control
  - §4.1 Quality Policy
  - §3.2 Roles and Responsibilities

- **Realistic Content:** Findings should sound like actual audit observations:
  - ✅ "Missing documented risk assessment process for manufacturing processes"
  - ❌ "Bad thing needs fixing"

**Output Format:**

```json
{
  "findings": [
    {
      "id": "F001",
      "document": "Quality Manual",
      "finding": "Risk assessment process is not formally documented for manufacturing operations",
      "severity": "High",
      "clause": "API Q1 §5.3",
      "impact": "Audit failure risk due to lack of structured risk management and compliance demonstration",
      "recommendation": "Implement formal risk assessment register and document monthly reviews",
      "section": "Risk Management",
      "daysToRemediate": 7
    },
    // ... 7-11 more findings
  ]
}
```

---

### 2. Documents Data (src/mock/documents.json)

**Purpose:** Generate sample audit documents that will be "analyzed"

**Required Schema:**

```typescript
interface Document {
  id: string                    // Unique ID (D001, D002, etc.)
  type: "Quality Manual" | "Procedure" | "Work Instruction" | "Test Report" | "Record"
  name: string                  // Document title
  content: string               // Mock document content (200-400 chars)
  lastUpdated: string           // ISO date string
  version: string               // Version number (e.g., "2.1")
  author?: string               // Optional: Document author
}
```

**Generation Requirements:**

- **Count:** 5-6 sample documents
- **Types:** Mix of Quality Manual, Procedures, Work Instructions, Test Reports
- **Content:** Should be realistic audit document text:
  - Quality Manual: Company policies, scope, organizational structure
  - Procedures: Step-by-step processes, responsibilities, controls
  - Work Instructions: Detailed operational tasks
  - Test Reports: Calibration records, test results

**Example Output:**

```json
{
  "documents": [
    {
      "id": "D001",
      "type": "Quality Manual",
      "name": "ABC Valve Manufacturing - Quality Management System Manual",
      "content": "This manual defines the Quality Management System for ABC Valve Manufacturing LLC. It covers company policies, organizational structure, management responsibility, resource management, and process control requirements. The QMS is designed to ensure compliance with API Q1 standards and customer requirements.",
      "lastUpdated": "2024-01-15",
      "version": "2.3",
      "author": "Quality Manager"
    },
    {
      "id": "D002",
      "type": "Procedure",
      "name": "Document Control Procedure",
      "content": "This procedure defines how documents are created, reviewed, approved, and controlled within the organization. All documents must be reviewed by the Quality Manager before approval. Changes are tracked in a master document register. Obsolete documents are retained for seven years.",
      "lastUpdated": "2023-11-20",
      "version": "1.8",
      "author": "Quality Manager"
    }
    // ... 3-4 more documents
  ]
}
```

---

### 3. Report Data (src/mock/report.json)

**Purpose:** Generate a sample audit report output structure

**Required Schema:**

```typescript
interface AssessmentScore {
  overall: number              // 0-100 score
  dimensions: {
    Documentation: number      // 0-100
    Implementation: number     // 0-100
    Personnel: number          // 0-100
    Calibration: number        // 0-100
  }
}

interface Report {
  company: string
  standard: string             // "API Q1"
  assessmentScore: AssessmentScore
  findings: Finding[]
  generatedAt: string          // ISO timestamp
  status: "Complete" | "In Progress" | "Draft"
  auditor?: string
  auditPeriod?: {
    start: string             // ISO date
    end: string               // ISO date
  }
}
```

**Generation Requirements:**

- **Company:** "ABC Valve Manufacturing LLC"
- **Standard:** "API Q1"
- **Overall Score:** 45-75 (showing moderate gaps that justify the findings)
- **Dimension Scores:**
  - Should vary realistically based on severity of findings
  - If many High/Critical findings in Documentation → Documentation score low (40-50)
  - If Implementation findings fewer → Implementation score higher (60-70)
- **Findings:** Should be subset of generated findings (5-8 most critical ones)
- **Auditor:** Common name (e.g., "John Smith", "Sarah Johnson")
- **Audit Period:** Last 3 months from today

**Example Output:**

```json
{
  "company": "ABC Valve Manufacturing LLC",
  "standard": "API Q1",
  "assessmentScore": {
    "overall": 62,
    "dimensions": {
      "Documentation": 55,
      "Implementation": 68,
      "Personnel": 60,
      "Calibration": 65
    }
  },
  "findings": [
    // 5-8 most critical findings from the findings.json
  ],
  "generatedAt": "2024-01-20T14:30:00Z",
  "status": "Complete",
  "auditor": "Michael Chen",
  "auditPeriod": {
    "start": "2023-10-20",
    "end": "2024-01-20"
  }
}
```

---

### 4. Compliance Rules Data (src/mock/compliance-rules.json)

**Purpose:** Define API Q1 clauses and requirements for reference

**Required Schema:**

```typescript
interface ComplianceRule {
  id: string                    // Clause ID (e.g., "5.3")
  clause: string                // Full clause reference (e.g., "API Q1 §5.3")
  title: string                 // Clause title
  description: string           // What the clause requires (100-200 chars)
  category: string              // Category (Management, Documentation, Operations, Personnel, etc.)
  importance: "Critical" | "High" | "Medium" | "Low"
}
```

**Generation Requirements:**

- **Count:** 15-20 API Q1 clauses
- **Categories:** Mix of Management, Documentation, Operations, Personnel, Calibration
- **Real API Q1 Structure:**
  - Section 4: Management Responsibility
  - Section 5: Process Management & Risk
  - Section 6: Documentation & Records
  - Section 7: Personnel
  - Section 8: Calibration & Inspection

**Example Output:**

```json
{
  "rules": [
    {
      "id": "4.1",
      "clause": "API Q1 §4.1",
      "title": "Quality Policy",
      "description": "Organization must establish and communicate a documented quality policy that includes commitment to meeting customer and regulatory requirements",
      "category": "Management Responsibility",
      "importance": "Critical"
    },
    {
      "id": "5.3",
      "clause": "API Q1 §5.3",
      "title": "Risk Management Process",
      "description": "Organization must implement a formal process to identify, assess, and control risks related to product quality and compliance",
      "category": "Process Management",
      "importance": "Critical"
    },
    {
      "id": "8.2",
      "clause": "API Q1 §8.2",
      "title": "Calibration Requirements",
      "description": "All measuring and test equipment must be calibrated at defined intervals using traceable standards",
      "category": "Calibration",
      "importance": "High"
    }
    // ... 12-17 more rules
  ]
}
```

---

## Generation Constraints

### Quality Standards

1. **Realism:** All generated text should sound like actual audit findings
   - Use domain-appropriate terminology
   - Reference real manufacturing/quality processes
   - Make recommendations actionable and specific

2. **Variety:** Avoid repetition
   - Different findings for different documents
   - Varied severity distribution
   - Different recommendations for different issues

3. **Consistency:** Data relationships should make sense
   - Finding document types should match realistic document sources
   - Impact statements should reflect severity level
   - Remediation timelines should align with severity
   - Report findings should be top-priority findings from the findings list

4. **Data Integrity:**
   - All IDs should be unique
   - Dates should be realistic (within last 6 months)
   - Severity should be one of: Low, Medium, High, Critical
   - Clause format must be: "API Q1 §X.X"
   - Scores should be 0-100 integers

### Formatting Standards

- **JSON:** Valid, properly formatted, no comments
- **Strings:** 
  - No markdown formatting
  - No special characters beyond basic punctuation
  - No excessive whitespace
- **Dates:** ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)

---

## Skill Input Parameters

When invoked, the skill should accept:

```
--output-type: "all" | "findings" | "documents" | "report" | "rules"
              (default: "all" - generates all four files)

--count: integer from 5 to 20
        (applies to findings and documents count)
        (default: varies by type: findings=10, documents=5, rules=18)

--severity-distribution: "realistic" | "mixed" | "critical-heavy"
                         (controls finding severity distribution)
                         (default: "realistic")

--company-name: string (default: "ABC Valve Manufacturing LLC")

--standard: string (default: "API Q1")

--output-format: "json" | "ts" (TypeScript interfaces + JSON)
                (default: "json")

--include-descriptions: boolean (add detailed field explanations)
                       (default: false)

--save-location: filepath (default: "src/mock/")
```

**Example Invocation:**

```bash
claude-code /skill mock-data-generator \
  --output-type "all" \
  --count 12 \
  --severity-distribution "realistic" \
  --company-name "ABC Valve Manufacturing LLC" \
  --save-location "src/mock/" \
  --output-format "json"

# Output:
# ✓ Generated src/mock/findings.json (12 findings)
# ✓ Generated src/mock/documents.json (5 documents)
# ✓ Generated src/mock/report.json (1 report)
# ✓ Generated src/mock/compliance-rules.json (18 rules)
```

---

## Expected Outputs

### File 1: src/mock/findings.json
- **Size:** ~5-8 KB
- **Content:** 8-12 realistic audit findings with all required fields
- **Integrity:** All IDs unique, all clauses valid API Q1 references

### File 2: src/mock/documents.json
- **Size:** ~2-3 KB
- **Content:** 5-6 sample audit documents
- **Integrity:** Document types match real scenarios

### File 3: src/mock/report.json
- **Size:** ~3-5 KB
- **Content:** Single report containing top-priority findings
- **Integrity:** Scores calculate reasonably from findings, dates make sense

### File 4: src/mock/compliance-rules.json
- **Size:** ~4-6 KB
- **Content:** 15-20 API Q1 clauses with descriptions
- **Integrity:** All clauses realistic and relevant

---

## Success Criteria

The skill successfully generates mock data if:

1. ✅ All JSON files are valid and properly formatted
2. ✅ Finding severity distribution matches "realistic" setting
3. ✅ All findings reference valid API Q1 clauses
4. ✅ Report findings are subset of generated findings
5. ✅ No duplicate IDs across any documents
6. ✅ All dates are valid and recent
7. ✅ Text sounds like real audit content (not generic)
8. ✅ Recommendations are actionable and specific
9. ✅ Scores in report make sense given the findings
10. ✅ Document types and findings align logically

---

## Use Cases

### Use Case 1: Initial PoC Setup
**User Goal:** Quickly bootstrap the Vegas Audit PoC with realistic sample data

**Invocation:**
```bash
claude-code /skill mock-data-generator \
  --output-type "all" \
  --save-location "src/mock/"
```

**Expected Result:** All 4 JSON files generated in src/mock/ directory

---

### Use Case 2: Generate Only Findings
**User Goal:** Create more findings for testing document analysis component

**Invocation:**
```bash
claude-code /skill mock-data-generator \
  --output-type "findings" \
  --count 15 \
  --severity-distribution "critical-heavy"
```

**Expected Result:** src/mock/findings.json with 15 findings, more critical/high severity

---

### Use Case 3: TypeScript Interfaces + Data
**User Goal:** Generate both data and TypeScript type definitions

**Invocation:**
```bash
claude-code /skill mock-data-generator \
  --output-type "all" \
  --output-format "ts" \
  --include-descriptions true
```

**Expected Result:**
- src/mock/findings.json (data)
- src/mock/findings.types.ts (TypeScript interfaces)
- Similar for other file types

---

### Use Case 4: Different Company / Standard
**User Goal:** Adapt skill for different organization

**Invocation:**
```bash
claude-code /skill mock-data-generator \
  --company-name "Acme Manufacturing Corp" \
  --standard "API 650" \
  --output-type "all"
```

**Expected Result:** Mock data customized for specified company and standard

---

## Integration with Vegas Audit PoC

### How This Skill Fits In

```
┌─────────────────────────────────────┐
│  /skill mock-data-generator         │
│  (Generates realistic sample data)  │
└──────────────┬──────────────────────┘
               │
               ├─→ src/mock/findings.json
               │   (used by useDocumentAnalysis hook)
               │
               ├─→ src/mock/documents.json
               │   (used by mock upload simulation)
               │
               ├─→ src/mock/report.json
               │   (used by useReportGeneration hook)
               │
               └─→ src/mock/compliance-rules.json
                   (used by ComplianceTable component)

               All used by hooks:
               - useMockData() loads all JSON files
               - useDocumentAnalysis() simulates findings
               - useReportGeneration() creates mock reports
```

---

## Technical Implementation Notes for Claude Code

### Architecture Pattern
The skill should follow this pattern:

1. **Parse Parameters** → Validate input options
2. **Load Templates** → Internal templates for each data type
3. **Generate Content** → Use Claude to generate realistic text
4. **Validate Output** → Ensure all JSON is valid, constraints met
5. **Format & Save** → Create files with proper formatting
6. **Report Results** → Show user what was generated

### Data Generation Strategy

For realistic findings, use this approach:
1. Start with real API Q1 clause
2. Generate 2-3 realistic ways it might be violated
3. For each violation:
   - Create finding description
   - Calculate appropriate severity
   - Generate impactful impact statement
   - Create actionable recommendation
   - Estimate remediation timeline

### Validation Checklist

```javascript
{
  "findings": {
    "allHaveUniqueIds": true,
    "allHaveSeverityEnum": true,
    "clauseFormatValid": /^API Q1 §\d+\.\d+$/,
    "descriptionLength": [50, 150],
    "recommendationLength": [50, 150],
    "severityDistributionRealistic": true
  },
  "report": {
    "scoresInRange": [0, 100],
    "findingsAreSubset": true,
    "datesAreRecent": true
  }
}
```

---

## Prompting Strategy for Claude

When asking Claude to generate this skill, emphasize:

1. **Realism over randomness** – Findings should sound like actual audit observations
2. **Business relevance** – Recommendations should be actionable in a real company
3. **Consistency** – Data relationships should make logical sense
4. **Completeness** – All four file types should work together seamlessly
5. **Flexibility** – User should be able to customize company, standard, count, severity distribution

---

## Sample Prompt to Pass to Claude Code

```
You are creating a Mock Data Generator skill for a Vegas Audit Platform PoC. 
This skill generates realistic JSON mock data for compliance audits.

Generate the following files when invoked:

1. src/mock/findings.json - 10 realistic API Q1 audit findings with:
   - Mixed severity (1-2 Critical, 2-3 High, 3-4 Medium, 2-3 Low)
   - Valid API Q1 clause references (§X.X format)
   - Realistic finding descriptions (50-150 chars)
   - Specific, actionable recommendations
   - Business impact statements

2. src/mock/documents.json - 5 sample audit documents:
   - Types: Quality Manual, Procedure, Work Instruction, Test Report
   - Realistic content for each type
   - Recent version dates

3. src/mock/report.json - Single audit report containing:
   - Company: "ABC Valve Manufacturing LLC"
   - Overall score: 45-75 based on findings
   - Top 5-8 findings from generated findings.json
   - Assessment dimensions with realistic scores

4. src/mock/compliance-rules.json - 18 API Q1 compliance requirements:
   - Clauses from sections 4-8
   - Clear descriptions of each requirement
   - Category and importance level

All content should:
- Use domain-specific terminology
- Sound like actual audit observations
- Have logical relationships (report findings match generated findings)
- Be valid JSON with no errors
```

---

## Files to Include in Prompt

1. This document (full specification)
2. PoC document describing Vegas Audit project context
3. TypeScript type definitions (provided below)

---

## TypeScript Type Definitions for Reference

```typescript
// src/types/finding.ts
export interface Finding {
  id: string
  document: string
  finding: string
  severity: "Low" | "Medium" | "High" | "Critical"
  clause: string
  impact: string
  recommendation: string
  section?: string
  daysToRemediate?: number
}

// src/types/document.ts
export interface Document {
  id: string
  type: "Quality Manual" | "Procedure" | "Work Instruction" | "Test Report" | "Record"
  name: string
  content: string
  lastUpdated: string
  version: string
  author?: string
}

// src/types/report.ts
export interface AssessmentScore {
  overall: number
  dimensions: {
    Documentation: number
    Implementation: number
    Personnel: number
    Calibration: number
  }
}

export interface Report {
  company: string
  standard: string
  assessmentScore: AssessmentScore
  findings: Finding[]
  generatedAt: string
  status: "Complete" | "In Progress" | "Draft"
  auditor?: string
  auditPeriod?: {
    start: string
    end: string
  }
}

// src/types/compliance.ts
export interface ComplianceRule {
  id: string
  clause: string
  title: string
  description: string
  category: string
  importance: "Critical" | "High" | "Medium" | "Low"
}
```

---

## Final Notes for Claude Code Skill Creation

### What Makes This Skill Valuable
1. **Saves 60+ minutes** of manual mock data creation
2. **Generates realistic content** that looks like actual audits
3. **Flexible parameters** allow customization for different scenarios
4. **Reusable** across projects with similar audit requirements
5. **Integrates seamlessly** with Vegas Audit PoC architecture

### Skill Maturity Level
- **Entry Level:** Generates all four file types automatically ✅
- **Intermediate:** Accepts parameters for customization ✅
- **Advanced:** Validates data integrity, provides warnings ✅

### Expected Development Time
- **Time to Build:** 2-3 hours
- **Time to Test:** 1-2 hours
- **Time Saved When Used:** 60+ hours per project

---

**End of Mock Data Generator Skill Prompt**

---

## How to Use This Prompt

### Option 1: Ask Claude to Create the Skill
```bash
# Copy this entire document and paste into Claude Code interface

"Please create a Mock Data Generator skill based on the specification in [this document].
The skill should generate realistic, production-quality JSON mock data for a compliance 
audit management system using the Vegas Audit PoC as the use case."
```

### Option 2: Use as Reference During Development
Keep this document open while building the skill to:
- Reference exact data structures
- Check generation constraints
- Validate success criteria
- Test with provided use cases

### Option 3: Pass to Another Claude Code Instance
```bash
claude-code /create-skill \
  --spec "mock-data-generator-spec.md" \
  --name "Mock Data Generator" \
  --framework "claude-code"
```

---

**Remember:** The more detailed and specific your prompt, the better the Claude Code skill output!