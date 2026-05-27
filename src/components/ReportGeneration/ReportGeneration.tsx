import React from 'react'
import Box from '@mui/material/Box'
import { useToastState, ToastContext } from '../../hooks/useToast'
import { useReportGenerationState } from '../../hooks/useReportGenerationState'
import ReportNavigation from './ReportNavigation'
import CallToActionPanel from './CallToActionPanel'
import ExecutiveSummary from './ExecutiveSummary'
import ScoreDashboard from './ScoreDashboard'
import FindingsReview from './FindingsReview'
import RemediationRoadmap from './RemediationRoadmap'
import ComplianceRulesReference from './ComplianceRulesReference'
import ToastHost from '../common/ToastHost'

/**
 * ReportGeneration — three-column orchestrator for the report module.
 */
const ReportGeneration: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    mockReport,
    mockFindings,
    mockRules,
    isLoading,
  } = useReportGenerationState()
  const toastState = useToastState()

  const renderSection = () => {
    switch (activeSection) {
      case 'executive-summary':
        return (
          <ExecutiveSummary report={mockReport} findings={mockFindings} isLoading={isLoading} />
        )
      case 'score-dashboard':
        return <ScoreDashboard report={mockReport} isLoading={isLoading} />
      case 'findings-review':
        return <FindingsReview findings={mockFindings} isLoading={isLoading} />
      case 'remediation-roadmap':
        return <RemediationRoadmap findings={mockFindings} isLoading={isLoading} />
      case 'compliance-rules':
        return <ComplianceRulesReference rules={mockRules} isLoading={isLoading} />
      default:
        return null
    }
  }

  return (
    <ToastContext.Provider value={toastState}>
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
          <ReportNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
        </Box>

        <Box
          component="main"
          aria-label={`Report section: ${activeSection}`}
          sx={{
            flex: 1,
            minWidth: 0,
            overflowY: 'auto',
            bgcolor: 'background.default',
            p: 3,
          }}
        >
          {renderSection()}
        </Box>

        <Box
          sx={{
            width: 208,
            flexShrink: 0,
            overflowY: 'auto',
            bgcolor: 'surface.elevated',
            borderLeft: 1,
            borderColor: 'border.subtle',
          }}
        >
          <CallToActionPanel />
        </Box>
      </Box>

      <ToastHost toasts={toastState.toasts} onDismiss={toastState.dismissToast} />
    </ToastContext.Provider>
  )
}

export default ReportGeneration
