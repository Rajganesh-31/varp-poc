export type Severity = 'critical' | 'high' | 'medium' | 'low'

export type SectionId =
  | 'executive-summary'
  | 'score-dashboard'
  | 'findings-review'
  | 'remediation-roadmap'
  | 'compliance-rules'

export interface Finding {
  id: string
  document: string
  finding: string
  severity: Severity
  clause: string
  impact: string
  recommendation: string
  section?: string
  daysToRemediate?: number
  /** Substring to underline in parent document content */
  highlightPhrase?: string
}

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
  status: 'Complete' | 'In Progress' | 'Draft'
  auditor?: string
  auditPeriod?: { start: string; end: string }
}

export interface ComplianceRule {
  id: string
  clause: string
  title: string
  description: string
  category: string
  importance: Severity
}

// Legacy type aliases for backward compatibility with DocumentAnalysis components
export type SeverityLevel = Severity

export interface ComplianceRequirement {
  id: string
  name: string
  description: string
  status: 'pass' | 'fail' | 'pending'
  severity: Severity
}

export interface Document {
  id: string
  // Fields used by DocumentAnalysis module
  name?: string
  type?: string
  content?: string
  lastUpdated?: string
  title?: string
  version?: string
  author?: string
  updatedAt?: string
  sections?: DocumentSection[]
}

export interface DocumentSection {
  id: string
  title: string
  severity?: Severity
}

export interface ReportRoadmapItem {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high'
  effort: string
  owner?: string
}
