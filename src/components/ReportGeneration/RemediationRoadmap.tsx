import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { Finding } from '../../types'
import SeverityBadge from '../common/SeverityBadge'
import SkeletonBlock from '../common/SkeletonBlock'

interface Props {
  findings: Finding[]
  isLoading: boolean
}

interface TimelineGroup {
  id: string
  label: string
  range: string
  severityColor: 'critical' | 'high' | 'medium'
  findings: Finding[]
}

/**
 * RemediationRoadmap — findings grouped by remediation timeline bands.
 */
const RemediationRoadmap: React.FC<Props> = ({ findings, isLoading }) => {
  if (isLoading) {
    return (
      <Box className="flex flex-col gap-6">
        {[1, 2, 3].map((i) => (
          <Box key={i} className="flex flex-col gap-2">
            <SkeletonBlock height={24} width="50%" className="mx-auto" />
            <SkeletonBlock height={128} />
          </Box>
        ))}
      </Box>
    )
  }

  const groups = (
    [
      {
        id: 'immediate',
        label: 'IMMEDIATE',
        range: '1–7 days',
        severityColor: 'critical' as const,
        findings: findings.filter((f) => (f.daysToRemediate ?? 999) <= 7),
      },
      {
        id: 'short-term',
        label: 'SHORT TERM',
        range: '8–14 days',
        severityColor: 'high' as const,
        findings: findings.filter((f) => {
          const d = f.daysToRemediate ?? 999
          return d > 7 && d <= 14
        }),
      },
      {
        id: 'medium-term',
        label: 'MEDIUM TERM',
        range: '15+ days',
        severityColor: 'medium' as const,
        findings: findings.filter((f) => (f.daysToRemediate ?? 999) > 14),
      },
    ] satisfies TimelineGroup[]
  ).filter((g) => g.findings.length > 0)

  const totalDays = findings.reduce((sum, f) => sum + (f.daysToRemediate ?? 0), 0)

  return (
    <Box>
      <Paper
        variant="outlined"
        elevation={0}
        className="mb-6 flex items-center gap-6"
        sx={{ p: 2, bgcolor: 'background.paper', borderColor: 'border.default', borderRadius: 3 }}
      >
        {[
          { label: 'Total Effort', value: `${totalDays} days` },
          { label: 'Total Findings', value: `${findings.length}` },
          { label: 'Status', value: 'Not Started' },
        ].map(({ label, value }) => (
          <Box key={label}>
            <Typography
              variant="overline"
              sx={{ color: 'textHierarchy.tertiary', fontSize: '10px', letterSpacing: '0.06em' }}
            >
              {label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mt: 0.25, fontSize: '13px' }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Paper>

      {groups.map((group) => (
        <Box key={group.id} sx={{ mb: 3 }}>
          <Box className="mb-3 flex items-center gap-3">
            <Box sx={{ flex: 1, height: 1, bgcolor: 'border.subtle' }} aria-hidden />
            <Chip
              label={`${group.label} · ${group.range}`}
              size="small"
              sx={{
                height: 24,
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                bgcolor: 'surface.raised',
                color: `severity.${group.severityColor}.fg`,
                border: 1,
                borderColor: 'border.default',
              }}
            />
            <Box sx={{ flex: 1, height: 1, bgcolor: 'border.subtle' }} aria-hidden />
          </Box>

          <TableContainer
            component={Paper}
            variant="outlined"
            elevation={0}
            sx={{ bgcolor: 'background.paper', borderColor: 'border.default', borderRadius: 3, overflow: 'hidden' }}
          >
            <Table aria-label={`${group.label} tasks`}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'surface.raised' }}>
                  {['ID', 'Finding', 'Severity', 'Days', 'Status'].map((col, i) => (
                    <TableCell
                      key={col}
                      align={i >= 3 ? 'right' : 'left'}
                      sx={{
                        py: 1.25,
                        fontSize: '10px',
                        fontWeight: 600,
                        color: 'textHierarchy.tertiary',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        borderBottom: 1,
                        borderColor: 'border.default',
                        width: i === 0 ? 96 : i === 2 ? 96 : i === 3 ? 64 : i === 4 ? 112 : undefined,
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {group.findings.map((finding) => (
                  <TableRow
                    key={finding.id}
                    hover
                    sx={{
                      '&:hover': { bgcolor: 'surface.raised' },
                      borderBottom: 1,
                      borderColor: 'border.subtle',
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography
                        variant="caption"
                        sx={{ fontFamily: 'monospace', color: 'textHierarchy.tertiary', fontSize: '11px' }}
                      >
                        {finding.id}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5, maxWidth: 320 }}>
                      <Typography
                        variant="body2"
                        className="line-clamp-2"
                        sx={{ color: 'text.secondary', fontSize: '13px', lineHeight: 1.4 }}
                      >
                        {finding.finding}
                      </Typography>
                      {finding.section && (
                        <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '11px' }}>
                          {finding.section}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <SeverityBadge severity={finding.severity} size="sm" />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: `severity.${group.severityColor}.fg`, fontSize: '13px' }}
                      >
                        {finding.daysToRemediate ?? '—'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>
                      <Chip
                        label="Not Started"
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '11px',
                          bgcolor: 'surface.raised',
                          color: 'textHierarchy.tertiary',
                          border: 1,
                          borderColor: 'border.default',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  )
}

export default RemediationRoadmap
