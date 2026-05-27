import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Finding } from '../../types'
import SeverityBadge from '../common/SeverityBadge'

interface Props {
  finding: Finding
}

/**
 * AnnotationTooltipContent — compact tooltip body for annotated spans.
 */
const AnnotationTooltipContent: React.FC<Props> = ({ finding }) => (
  <Box sx={{ maxWidth: 280, p: 0.5 }}>
    <Box className="flex items-center gap-2" sx={{ mb: 1 }}>
      <Typography
        variant="caption"
        sx={{ fontFamily: 'monospace', color: 'textHierarchy.tertiary', fontSize: '10px' }}
      >
        {finding.id}
      </Typography>
      <SeverityBadge severity={finding.severity} size="sm" />
    </Box>
    <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '12px', lineHeight: 1.4 }}>
      {finding.finding.length > 120 ? `${finding.finding.slice(0, 120)}…` : finding.finding}
    </Typography>
    <Typography
      variant="caption"
      sx={{ display: 'block', mt: 0.75, color: 'textHierarchy.tertiary', fontFamily: 'monospace' }}
    >
      {finding.clause}
    </Typography>
  </Box>
)

export default AnnotationTooltipContent
