import { useState, useMemo, useCallback } from 'react'
import { Finding } from '../types'
import { useMockData } from './useMockData'
import { useAnnotationInteraction } from './useAnnotationInteraction'
import type { ViewType } from '../components/DocumentAnalysis/ViewToggleTabs'

/**
 * useDocumentAnalysisState — document analysis module state and derived data.
 */
export function useDocumentAnalysisState() {
  const { mockFindings, mockRules, mockDocuments, isLoading } = useMockData()
  const annotation = useAnnotationInteraction()

  const [activeView, setActiveView] = useState<ViewType>('inline')
  const [activeDocumentId, setActiveDocumentId] = useState<string>('')
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null)
  const [highlightedFindingId, setHighlightedFindingId] = useState<string | null>(null)

  const documents = mockDocuments
  const findings = mockFindings
  const rules = mockRules

  const effectiveDocumentId =
    activeDocumentId || (documents.length > 0 ? documents[0].id : '')

  const activeDocument = useMemo(
    () => documents.find((d) => d.id === effectiveDocumentId) ?? null,
    [documents, effectiveDocumentId]
  )

  const documentFindings = useMemo(
    () => findings.filter((f) => f.document === effectiveDocumentId),
    [findings, effectiveDocumentId]
  )

  const handleDocumentSelect = useCallback((id: string) => {
    setActiveDocumentId(id)
    setActiveSectionId(null)
    setHighlightedFindingId(null)
    annotation.dismissExpanded()
  }, [annotation])

  const handleFindingSelect = useCallback(
    (findingId: string) => {
      setHighlightedFindingId(findingId)
      setActiveView('inline')
      annotation.setExpandedFindingId(findingId)
      annotation.handleSpanMouseLeave()
    },
    [annotation]
  )

  const handleViewFullDetails = useCallback((finding: Finding) => {
    setSelectedFinding(finding)
  }, [])

  const closeFindingModal = useCallback(() => {
    setSelectedFinding(null)
  }, [])

  return {
    isLoading,
    documents,
    findings,
    rules,
    activeView,
    setActiveView,
    activeDocumentId: effectiveDocumentId,
    activeSectionId,
    setActiveSectionId,
    activeDocument,
    documentFindings,
    selectedFinding,
    highlightedFindingId,
    handleDocumentSelect,
    handleSectionSelect: setActiveSectionId,
    handleFindingSelect,
    handleViewFullDetails,
    closeFindingModal,
    annotation,
  }
}
