import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Finding } from '../../types'
import SeverityBadge from '../common/SeverityBadge'

interface Props {
  finding: Finding
  onViewFull: (finding: Finding) => void
  onDismiss: () => void
}

/**
 * AnnotationExpandCard — inline detail card shown below an annotated span on click.
 */
const AnnotationExpandCard: React.FC<Props> = ({ finding, onViewFull, onDismiss }) => (
  <Paper
    variant="outlined"
    elevation={0}
    sx={{
      mt: 1.5,
      p: 2,
      bgcolor: 'surface.overlay',
      borderColor: 'border.default',
      borderRadius: 2,
    }}
  >
    <Box className="flex items-start justify-between gap-2">
      <Box className="flex items-center gap-2 flex-wrap">
        <Typography
          variant="caption"
          sx={{ fontFamily: 'monospace', color: 'textHierarchy.tertiary', fontSize: '11px' }}
        >
          {finding.id}
        </Typography>
        <SeverityBadge severity={finding.severity} size="sm" />
        <Typography
          variant="caption"
          sx={{ fontFamily: 'monospace', color: 'textHierarchy.tertiary', fontSize: '11px' }}
        >
          {finding.clause}
        </Typography>
      </Box>
      <IconButton
        size="small"
        onClick={onDismiss}
        aria-label="Dismiss annotation card"
        sx={{ color: 'textHierarchy.tertiary', mt: -0.5, mr: -0.5 }}
      >
        ×
      </IconButton>
    </Box>

    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5, lineHeight: 1.5 }}>
      {finding.finding}
    </Typography>

    <Box className="flex gap-2" sx={{ mt: 2 }}>
      <Button
        variant="contained"
        size="small"
        onClick={() => onViewFull(finding)}
        sx={{
          textTransform: 'none',
          fontSize: '12px',
          bgcolor: 'brand.primary',
          '&:hover': { bgcolor: 'brand.hover' },
        }}
      >
        View Full Details
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={onDismiss}
        sx={{
          textTransform: 'none',
          fontSize: '12px',
          borderColor: 'border.default',
          color: 'text.secondary',
          '&:hover': { borderColor: 'border.strong', bgcolor: 'surface.raised' },
        }}
      >
        Dismiss
      </Button>
    </Box>
  </Paper>
)

export default AnnotationExpandCard
