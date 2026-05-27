import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useDocumentAnalysisState } from '../../hooks/useDocumentAnalysisState'
import DocumentNavigator from './DocumentNavigator'
import DocumentViewer from './DocumentViewer'
import FindingsPanel from './FindingsPanel'
import ViewToggleTabs from './ViewToggleTabs'
import ComplianceTableView from './ComplianceTableView'
import HeatmapView from './HeatmapView'
import FindingDetailModal from './FindingDetailModal'

/**
 * DocumentAnalysis — three-panel compliance analysis orchestrator.
 */
const DocumentAnalysis: React.FC = () => {
  const state = useDocumentAnalysisState()

  if (state.isLoading) {
    return (
      <Box
        className="flex h-full items-center justify-center"
        sx={{ bgcolor: 'background.default' }}
      >
        <Box className="flex flex-col items-center gap-2">
          <CircularProgress size={32} sx={{ color: 'brand.primary' }} />
          <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary' }}>
            Loading documents
          </Typography>
        </Box>
      </Box>
    )
  }

  const annotationProps = {
    expandedFindingId: state.annotation.expandedFindingId,
    highlightedFindingId: state.highlightedFindingId,
    isTooltipVisible: state.annotation.isTooltipVisible,
    onSpanMouseEnter: state.annotation.handleSpanMouseEnter,
    onSpanMouseLeave: state.annotation.handleSpanMouseLeave,
    onSpanClick: state.annotation.handleSpanClick,
    onDismissExpanded: state.annotation.dismissExpanded,
    onViewFull: state.handleViewFullDetails,
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: 224,
          flexShrink: 0,
          overflowY: 'auto',
          bgcolor: 'surface.elevated',
          borderRight: 1,
          borderColor: 'border.subtle',
        }}
      >
        <DocumentNavigator
          documents={state.documents}
          findings={state.findings}
          activeDocumentId={state.activeDocumentId}
          activeSectionId={state.activeSectionId}
          onDocumentSelect={state.handleDocumentSelect}
          onSectionSelect={state.handleSectionSelect}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        <ViewToggleTabs activeView={state.activeView} onViewChange={state.setActiveView} />

        {state.activeView === 'inline' && (
          <Box sx={{ flex: 1, overflowY: 'auto', p: 4 }}>
            <DocumentViewer
              document={state.activeDocument}
              findings={state.documentFindings}
              annotation={annotationProps}
            />
          </Box>
        )}

        {state.activeView === 'compliance' && (
          <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <ComplianceTableView
              findings={state.findings}
              documents={state.documents}
              rules={state.rules}
              onViewDetails={state.handleViewFullDetails}
            />
          </Box>
        )}

        {state.activeView === 'heatmap' && (
          <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <HeatmapView
              findings={state.findings}
              onFindingSelect={(findingId) => {
                const finding = state.findings.find((f) => f.id === findingId)
                if (finding) state.handleViewFullDetails(finding)
              }}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          width: 288,
          flexShrink: 0,
          overflowY: 'auto',
          bgcolor: 'surface.elevated',
          borderLeft: 1,
          borderColor: 'border.subtle',
        }}
      >
        <FindingsPanel
          findings={state.findings}
          documentId={state.activeDocumentId}
          onFindingSelect={state.handleFindingSelect}
          selectedFindingId={state.highlightedFindingId}
        />
      </Box>

      {state.selectedFinding && (
        <FindingDetailModal
          finding={state.selectedFinding}
          open
          onClose={state.closeFindingModal}
        />
      )}
    </Box>
  )
}

export default DocumentAnalysis
