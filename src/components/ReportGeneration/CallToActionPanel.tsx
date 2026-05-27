import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useToast } from '../../hooks/useToast'
import { usePDFExport } from '../../hooks/usePDFExport'

interface SecondaryAction {
  label: string
  message: string
  type: 'success' | 'info' | 'warning'
}

const OTHER_ACTIONS: SecondaryAction[] = [
  { label: 'Share', message: 'Link copied to clipboard', type: 'info' },
  { label: 'Schedule review', message: 'Review scheduled…', type: 'success' },
  { label: 'Download Summary', message: 'Summary download started', type: 'success' },
]

const CallToActionPanel: React.FC = () => {
  const { showToast } = useToast()
  const { exportPDF, isExporting, isDataLoading } = usePDFExport()

  return (
    <Box component="aside" aria-label="Report actions" className="flex flex-col gap-2" sx={{ p: 2 }}>
      <Typography
        variant="overline"
        sx={{ color: 'textHierarchy.tertiary', fontSize: '10px', letterSpacing: '0.08em', pt: 1, pb: 0.5 }}
      >
        Take Action
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={() => showToast('Remediation plan initiated', 'success')}
        sx={{
          textTransform: 'none',
          fontSize: '13px',
          fontWeight: 500,
          py: 1.25,
          bgcolor: 'brand.primary',
          '&:hover': { bgcolor: 'brand.hover' },
        }}
      >
        Start Remediation
      </Button>

      <Divider sx={{ borderColor: 'border.subtle', my: 0.5 }} />

      <Button
        fullWidth
        variant="outlined"
        onClick={exportPDF}
        disabled={isExporting || isDataLoading}
        startIcon={isExporting ? <CircularProgress size={13} color="inherit" /> : undefined}
        sx={{
          textTransform: 'none',
          fontSize: '13px',
          fontWeight: 500,
          justifyContent: 'flex-start',
          py: 1.25,
          borderColor: 'border.default',
          color: 'text.secondary',
          '&:hover': { borderColor: 'border.strong', bgcolor: 'surface.raised', color: 'text.primary' },
          '&.Mui-disabled': { opacity: 0.6 },
        }}
      >
        {isExporting ? 'Generating PDF…' : 'Export PDF'}
      </Button>

      {OTHER_ACTIONS.map((action) => (
        <Button
          key={action.label}
          fullWidth
          variant="outlined"
          onClick={() => showToast(action.message, action.type)}
          sx={{
            textTransform: 'none',
            fontSize: '13px',
            fontWeight: 500,
            justifyContent: 'flex-start',
            py: 1.25,
            borderColor: 'border.default',
            color: 'text.secondary',
            '&:hover': { borderColor: 'border.strong', bgcolor: 'surface.raised', color: 'text.primary' },
          }}
        >
          {action.label}
        </Button>
      ))}

      <Divider sx={{ borderColor: 'border.subtle', my: 0.5 }} />

      <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px', lineHeight: 1.5 }}>
        Report generated {new Date().toLocaleDateString()}
      </Typography>
    </Box>
  )
}

export default CallToActionPanel
