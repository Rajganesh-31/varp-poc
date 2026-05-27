import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { Report, Finding, Severity } from '../../types'
import SeverityBadge from '../common/SeverityBadge'
import SkeletonBlock from '../common/SkeletonBlock'
import { getScoreColor, getScoreStatusChip } from '../../utils/scoreTheme'

interface Props {
  report: Report
  findings: Finding[]
  isLoading: boolean
}

const SEVERITY_WEIGHT: Record<Severity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

const NEXT_STEPS = [
  'Review all critical and high findings in the Findings Review section',
  'Create remediation tasks with assigned owners and target dates',
  'Schedule follow-up audit for items marked as In Progress',
  'Share this report with compliance stakeholders for visibility',
  'Track implementation progress in the Remediation Roadmap',
]

/**
 * ExecutiveSummary — hero score ring, critical alert, top issues, and next steps.
 */
const ExecutiveSummary: React.FC<Props> = ({ report, findings, isLoading }) => {
  const theme = useTheme()

  if (isLoading) {
    return (
      <Box className="flex flex-col gap-4">
        <SkeletonBlock height={144} />
        <SkeletonBlock height={32} width="40%" />
        <SkeletonBlock height={96} />
        <SkeletonBlock height={128} />
      </Box>
    )
  }

  const score = report.assessmentScore.overall
  const scoreColor = getScoreColor(score, theme)
  const chip = getScoreStatusChip(score, theme)

  const sortedFindings = [...findings].sort(
    (a, b) => (SEVERITY_WEIGHT[b.severity] ?? 0) - (SEVERITY_WEIGHT[a.severity] ?? 0)
  )
  const topFive = sortedFindings.slice(0, 5)
  const criticalCount = findings.filter((f) => f.severity === 'critical').length

  return (
    <Box>
      <Paper
        variant="outlined"
        elevation={0}
        sx={{ p: 3, mb: 2, bgcolor: 'background.paper', borderColor: 'border.default', borderRadius: 3 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Box
            sx={{
              position: 'relative',
              width: 112,
              height: 112,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={`Compliance score: ${score} out of 100`}
          >
            {/* Track ring (light mode-friendly) */}
            <CircularProgress
              variant="determinate"
              value={100}
              size={112}
              thickness={4}
              sx={{ position: 'absolute', top: 0, left: 0, color: 'border.subtle' }}
            />
            {/* Value ring */}
            <CircularProgress
              variant="determinate"
              value={score}
              size={112}
              thickness={4}
              sx={{ position: 'absolute', top: 0, left: 0, color: scoreColor }}
            />
            {/* Center label */}
            <Box
              sx={{
                position: 'absolute',
                inset: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                bgcolor: 'background.paper',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1 }}>
                {score}
              </Typography>
              <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '11px' }}>
                / 100
              </Typography>
            </Box>
          </Box>

          <Box className="min-w-0 flex-1">
            <Chip
              label={chip.label}
              size="small"
              sx={{
                height: 22,
                fontSize: '11px',
                fontWeight: 600,
                mb: 1.5,
                bgcolor: chip.bgcolor,
                color: chip.color,
                border: 1,
                borderColor: chip.borderColor,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '20px' }} className="truncate">
              {report.company}
            </Typography>
            <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary', mt: 0.5, fontSize: '13px' }}>
              {report.standard} Assessment
            </Typography>

            <Box className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {[
                { key: 'Auditor', value: report.auditor ?? '—' },
                { key: 'Standard', value: report.standard },
                { key: 'Period Start', value: report.auditPeriod?.start ?? '—' },
                { key: 'Period End', value: report.auditPeriod?.end ?? '—' },
              ].map(({ key, value }) => (
                <Box key={key}>
                  <Typography
                    variant="overline"
                    sx={{ color: 'textHierarchy.tertiary', fontSize: '10px', letterSpacing: '0.06em' }}
                  >
                    {key}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '12px', mt: 0.25 }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      {criticalCount > 0 && (
        <Paper
          variant="outlined"
          role="alert"
          sx={{
            mb: 2,
            px: 2,
            py: 1.5,
            bgcolor: 'severity.critical.bg',
            borderColor: 'severity.critical.border',
            borderLeft: 4,
            borderLeftColor: 'severity.critical.badge',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'severity.critical.fg', fontSize: '13px' }}>
            {criticalCount} Critical Finding{criticalCount !== 1 ? 's' : ''} Require Immediate Attention
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: '12px' }}>
            These issues pose the highest risk to {report.standard} certification and must be addressed before
            reassessment.
          </Typography>
        </Paper>
      )}

      <Paper
        variant="outlined"
        elevation={0}
        sx={{ p: 2, mb: 2, bgcolor: 'background.paper', borderColor: 'border.default', borderRadius: 3 }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1.5, fontSize: '14px' }}>
          Top Priority Issues
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {topFive.map((finding) => (
            <Box
              component="li"
              key={finding.id}
              className="flex items-start gap-3"
              sx={{ py: 1.25, borderBottom: 1, borderColor: 'border.subtle', '&:last-child': { borderBottom: 0 } }}
            >
              <SeverityBadge severity={finding.severity} size="sm" />
              <Typography
                variant="body2"
                className="line-clamp-2 flex-1"
                sx={{ color: 'text.secondary', fontSize: '13px', lineHeight: 1.4 }}
              >
                {finding.finding}
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontFamily: 'monospace', color: 'textHierarchy.tertiary', flexShrink: 0, fontSize: '11px' }}
              >
                {finding.clause}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      <Paper
        variant="outlined"
        elevation={0}
        sx={{ p: 2, bgcolor: 'background.paper', borderColor: 'border.default', borderRadius: 3 }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1.5, fontSize: '14px' }}>
          Recommended Next Steps
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {NEXT_STEPS.map((text, i) => (
            <Box component="li" key={i} className="flex items-start gap-2" sx={{ py: 0.75 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '13px' }}>
              • {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}

export default ExecutiveSummary
