import React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

export type ViewType = 'inline' | 'compliance' | 'heatmap'

interface ViewToggleTabsProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
}

const TABS: { id: ViewType; label: string }[] = [
  { id: 'inline', label: 'Inline View' },
  { id: 'compliance', label: 'Compliance Table' },
  { id: 'heatmap', label: 'Heatmap' },
]

/**
 * ViewToggleTabs — top bar switching document analysis center views.
 */
const ViewToggleTabs: React.FC<ViewToggleTabsProps> = ({ activeView, onViewChange }) => {
  const tabIndex = TABS.findIndex((t) => t.id === activeView)

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    onViewChange(TABS[newIndex].id)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        bgcolor: 'surface.elevated',
        borderBottom: 1,
        borderColor: 'border.subtle',
        px: 2,
      }}
      role="tablist"
      aria-label="Analysis view selector"
    >
      <Tabs
        value={tabIndex < 0 ? 0 : tabIndex}
        onChange={handleChange}
        centered
        sx={{ minHeight: 32, height: 32 }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            id={`view-tab-${tab.id}`}
            aria-controls={`view-panel-${tab.id}`}
            sx={{ minHeight: 32, fontSize: '13px', textTransform: 'none', py: 0 }}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default ViewToggleTabs
