import { useState, useEffect } from 'react'
import { Report, Finding, ComplianceRule, Document } from '../types'
import reportData from '../mock/report.json'
import findingsData from '../mock/findings.json'
import rulesData from '../mock/compliance-rules.json'
import documentsData from '../mock/documents.json'

interface MockData {
  mockReport: Report
  mockFindings: Finding[]
  mockRules: ComplianceRule[]
  mockDocuments: Document[]
  isLoading: boolean
}

/**
 * useMockData — single source of truth for all mock data in the application.
 * Simulates a 1200ms async load. Components must not import mock JSON directly.
 */
export function useMockData(): MockData {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return {
    mockReport: reportData as unknown as Report,
    mockFindings: findingsData as unknown as Finding[],
    mockRules: rulesData as unknown as ComplianceRule[],
    mockDocuments: documentsData as unknown as Document[],
    isLoading,
  }
}
