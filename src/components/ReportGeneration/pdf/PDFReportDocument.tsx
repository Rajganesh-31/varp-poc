import { Document } from '@react-pdf/renderer'
import { Report, Finding, ComplianceRule } from '../../../types'
import { PDFCoverPage } from './PDFCoverPage'
import { PDFExecutiveSummary } from './PDFExecutiveSummary'
import { PDFScoreDashboard } from './PDFScoreDashboard'
import { PDFFindingsReview } from './PDFFindingsReview'
import { PDFRemediationRoadmap } from './PDFRemediationRoadmap'
import { PDFComplianceRulesReference } from './PDFComplianceRulesReference'

interface Props {
  report: Report
  findings: Finding[]
  rules: ComplianceRule[]
}

export function PDFReportDocument({ report, findings, rules }: Props) {
  return (
    <Document
      title={`${report.company} — ${report.standard} Audit Report`}
      author={report.auditor ?? 'Vegas Audit Platform'}
      creator="Vegas Audit Platform"
    >
      <PDFCoverPage report={report} />
      <PDFExecutiveSummary report={report} findings={findings} />
      <PDFScoreDashboard report={report} />
      <PDFFindingsReview findings={findings} />
      <PDFRemediationRoadmap findings={findings} />
      <PDFComplianceRulesReference rules={rules} />
    </Document>
  )
}
