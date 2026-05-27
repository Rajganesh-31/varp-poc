import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { Finding, Severity } from '../../types'
import { formatSeverity } from '../../utils/formatters'

interface HeatmapViewProps {
  findings: Finding[]
  onFindingSelect: (findingId: string) => void
}

const SEVERITY_LEVELS: Severity[] = ['critical', 'high', 'medium', 'low']

/**
 * HeatmapView — section risk grid with per-severity finding counts.
 */
const HeatmapView: React.FC<HeatmapViewProps> = ({ findings, onFindingSelect }) => {
  const sections = useMemo<string[]>(() => {
    const seen = new Set<string>()
    const result: string[] = []
    findings.forEach((f) => {
      if (f.section && !seen.has(f.section)) {
        seen.add(f.section)
        result.push(f.section)
      }
    })
    return result
  }, [findings])

  const grouped = useMemo(() => {
    const map = new Map<string, Record<Severity, Finding[]>>()
    sections.forEach((section) => {
      const counts: Record<Severity, Finding[]> = {
        critical: [],
        high: [],
        medium: [],
        low: [],
      }
      findings
        .filter((f) => f.section === section)
        .forEach((f) => counts[f.severity].push(f))
      map.set(section, counts)
    })
    return map
  }, [findings, sections])

  return (
    <Box
      id="view-panel-heatmap"
      role="tabpanel"
      aria-label="Heatmap View"
      sx={{ flex: 1, minHeight: 0, overflowY: 'auto', bgcolor: 'background.default', p: 3 }}
    >
      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        {sections.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary' }}>
              No sections found for this document
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table size="small" aria-label="Heatmap table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '52%' }}>Section</TableCell>
                  <TableCell align="center" sx={{ width: '12%' }}>
                    {formatSeverity('critical')}
                  </TableCell>
                  <TableCell align="center" sx={{ width: '12%' }}>
                    {formatSeverity('high')}
                  </TableCell>
                  <TableCell align="center" sx={{ width: '12%' }}>
                    {formatSeverity('medium')}
                  </TableCell>
                  <TableCell align="center" sx={{ width: '12%' }}>
                    {formatSeverity('low')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sections.map((section) => {
                  const counts =
                    grouped.get(section) ?? ({
                      critical: [],
                      high: [],
                      medium: [],
                      low: [],
                    } satisfies Record<Severity, Finding[]>)

                  const totalFindings = SEVERITY_LEVELS.reduce((sum, s) => sum + counts[s].length, 0)

                  return (
                    <TableRow key={section}>
                      <TableCell>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, color: 'text.primary', fontSize: '14px' }}
                          >
                            {section}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '11px' }}>
                            {totalFindings} finding{totalFindings !== 1 ? 's' : ''}
                          </Typography>
                        </Box>
                      </TableCell>

                      {SEVERITY_LEVELS.map((severity) => {
                        const items = counts[severity]
                        const cellEmpty = items.length === 0

                        if (cellEmpty) {
                          return (
                            <TableCell key={`${section}-${severity}`} align="center">
                              <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary', fontSize: '13px' }}>
                                —
                              </Typography>
                            </TableCell>
                          )
                        }

                        return (
                          <TableCell key={`${section}-${severity}`} align="center">
                            <Button
                              variant="outlined"
                              onClick={() => onFindingSelect(items[0]!.id)}
                              aria-label={`${items.length} ${severity} findings in ${section}`}
                              sx={{
                                minWidth: 0,
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                bgcolor: `severity.${severity}.bg`,
                                borderColor: `severity.${severity}.border`,
                                color: `severity.${severity}.fg`,
                                '&:hover': { bgcolor: `severity.${severity}.bg` },
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{ fontWeight: 800, lineHeight: 1, fontSize: '18px', color: `severity.${severity}.fg` }}
                              >
                                {items.length}
                              </Typography>
                            </Button>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  )
}

export default HeatmapView
