import React from 'react'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import { SectionId } from '../../types'

interface Props {
  activeSection: SectionId
  onSectionChange: (id: SectionId) => void
}

const NAV_ITEMS: { id: SectionId; icon: string; label: string }[] = [
  { id: 'executive-summary', icon: '📊', label: 'Executive Summary' },
  { id: 'score-dashboard', icon: '📈', label: 'Score Dashboard' },
  { id: 'findings-review', icon: '🔍', label: 'Findings Review' },
  { id: 'remediation-roadmap', icon: '🛣️', label: 'Remediation Roadmap' },
  { id: 'compliance-rules', icon: '📋', label: 'Compliance Rules' },
]

/**
 * ReportNavigation — left sidebar section links with active state styling.
 */
const ReportNavigation: React.FC<Props> = ({ activeSection, onSectionChange }) => (
  <Box component="nav" aria-label="Report sections" sx={{ p: 1.5 }}>
    <Typography
      variant="overline"
      sx={{
        display: 'block',
        px: 1.5,
        pt: 2,
        pb: 1,
        color: 'textHierarchy.tertiary',
        fontSize: '10px',
        letterSpacing: '0.08em',
      }}
    >
      Report Sections
    </Typography>

    {NAV_ITEMS.map(({ id, icon, label }) => {
      const isActive = activeSection === id
      return (
        <ListItemButton
          key={id}
          selected={isActive}
          onClick={() => onSectionChange(id)}
          aria-current={isActive ? 'page' : undefined}
          className="flex items-center gap-3"
          sx={{
            borderRadius: 1.5,
            py: 1.25,
            mb: 0.25,
            fontSize: '13px',
            fontWeight: 500,
            color: isActive ? 'text.primary' : 'text.secondary',
            bgcolor: isActive ? 'brand.subtle' : 'transparent',
            borderLeft: isActive ? 2 : 0,
            borderColor: isActive ? 'brand.primary' : 'transparent',
            pl: isActive ? 1.25 : 1.5,
            '&:hover': { bgcolor: isActive ? 'brand.subtle' : 'surface.raised', color: 'text.primary' },
          }}
        >
          <Typography component="span" aria-hidden sx={{ flexShrink: 0 }}>
            {icon}
          </Typography>
          <Typography component="span" variant="body2" sx={{ flex: 1, fontSize: '13px' }}>
            {label}
          </Typography>
          {isActive && (
            <Box
              component="span"
              sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'brand.primary', flexShrink: 0 }}
              aria-hidden
            />
          )}
        </ListItemButton>
      )
    })}
  </Box>
)

export default ReportNavigation
