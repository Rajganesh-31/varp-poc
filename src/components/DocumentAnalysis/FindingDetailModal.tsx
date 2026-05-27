import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Finding } from '../../types'
import AppDialog from '../common/AppDialog'
import SeverityBadge from '../common/SeverityBadge'

interface FindingDetailModalProps {
  finding: Finding
  open: boolean
  onClose: () => void
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography
        variant="overline"
        sx={{ color: 'textHierarchy.tertiary', fontSize: '10px', letterSpacing: '0.06em' }}
      >
        {label}
      </Typography>
      <Box sx={{ mt: 0.5 }}>{children}</Box>
    </Box>
  )
}

/**
 * FindingDetailModal — full finding detail via AppDialog (View Full Details only).
 */
const FindingDetailModal: React.FC<FindingDetailModalProps> = ({ finding, open, onClose }) => (
  <AppDialog open={open} onClose={onClose} title="Finding Details" maxWidth="sm">
    <Box className="flex items-center gap-2" sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{ fontFamily: 'monospace', color: 'textHierarchy.tertiary', fontSize: '11px' }}
      >
        {finding.id}
      </Typography>
      <SeverityBadge severity={finding.severity} size="sm" />
    </Box>

    <Box className="flex flex-col gap-3">
      <DetailField label="Severity">
        <SeverityBadge severity={finding.severity} size="md" />
      </DetailField>

      <DetailField label="Clause">
        <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '13px' }}>
          {finding.clause}
        </Typography>
      </DetailField>

      <Divider sx={{ borderColor: 'border.subtle' }} />

      <DetailField label="Finding">
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '13px' }}>
          {finding.finding}
        </Typography>
      </DetailField>

      <DetailField label="Business Impact">
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '13px' }}>
          {finding.impact}
        </Typography>
      </DetailField>

      <Divider sx={{ borderColor: 'border.subtle' }} />

      <DetailField label="Recommendation">
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            fontSize: '13px',
            pl: 1.5,
            borderLeft: 2,
            borderColor: 'border.default',
          }}
        >
          {finding.recommendation}
        </Typography>
      </DetailField>

      <DetailField label="Days to Remediate">
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '13px' }}>
          {finding.daysToRemediate} days
        </Typography>
      </DetailField>

      <DetailField label="Regulatory Reference">
        <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '13px' }}>
          {finding.clause}
        </Typography>
        <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '10px', mt: 0.25 }}>
          {finding.section}
        </Typography>
      </DetailField>
    </Box>

    <Box className="flex justify-end gap-2" sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'border.subtle' }}>
      <Button
        variant="outlined"
        size="small"
        sx={{
          textTransform: 'none',
          borderColor: 'border.default',
          color: 'text.secondary',
        }}
      >
        Mark for Review
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={onClose}
        sx={{
          textTransform: 'none',
          bgcolor: 'brand.primary',
          '&:hover': { bgcolor: 'brand.hover' },
        }}
      >
        Close
      </Button>
    </Box>
  </AppDialog>
)

export default FindingDetailModal
