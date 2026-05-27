import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useMockData } from './useMockData'
import { PDFReportDocument } from '../components/ReportGeneration/pdf/PDFReportDocument'

export function usePDFExport() {
  const { mockReport, mockFindings, mockRules, isLoading } = useMockData()
  const [isExporting, setIsExporting] = useState(false)

  const exportPDF = async () => {
    if (isLoading) return
    setIsExporting(true)
    try {
      const blob = await pdf(
        <PDFReportDocument report={mockReport} findings={mockFindings} rules={mockRules} />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Vegas_Audit_Report.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } finally {
      setIsExporting(false)
    }
  }

  return { exportPDF, isExporting, isDataLoading: isLoading }
}
