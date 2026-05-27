import { useState, useCallback } from 'react'

/**
 * useAnnotationInteraction — mutual exclusion between hover tooltip and expanded inline card.
 */
export function useAnnotationInteraction() {
  const [hoveredFindingId, setHoveredFindingId] = useState<string | null>(null)
  const [expandedFindingId, setExpandedFindingId] = useState<string | null>(null)

  const isTooltipVisible = useCallback(
    (findingId: string) =>
      hoveredFindingId === findingId && expandedFindingId === null,
    [hoveredFindingId, expandedFindingId]
  )

  const handleSpanMouseEnter = useCallback(
    (findingId: string) => {
      if (expandedFindingId === null) {
        setHoveredFindingId(findingId)
      }
    },
    [expandedFindingId]
  )

  const handleSpanMouseLeave = useCallback(() => {
    setHoveredFindingId(null)
  }, [])

  const handleSpanClick = useCallback((findingId: string) => {
    setExpandedFindingId(findingId)
    setHoveredFindingId(null)
  }, [])

  const dismissExpanded = useCallback(() => {
    setExpandedFindingId(null)
  }, [])

  return {
    hoveredFindingId,
    expandedFindingId,
    setExpandedFindingId,
    isTooltipVisible,
    handleSpanMouseEnter,
    handleSpanMouseLeave,
    handleSpanClick,
    dismissExpanded,
  }
}
