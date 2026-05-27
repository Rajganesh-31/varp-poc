import { useState } from 'react'
import { SectionId } from '../types'
import { useMockData } from './useMockData'

/**
 * useReportGenerationState — report module section routing and mock data.
 */
export function useReportGenerationState() {
  const [activeSection, setActiveSection] = useState<SectionId>('executive-summary')
  const { mockReport, mockFindings, mockRules, isLoading } = useMockData()

  return {
    activeSection,
    setActiveSection,
    mockReport,
    mockFindings,
    mockRules,
    isLoading,
  }
}
