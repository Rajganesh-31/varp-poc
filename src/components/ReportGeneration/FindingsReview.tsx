import React, { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Finding, Severity } from '../../types'
import FilterChipRow from '../common/FilterChipRow'
import SeverityBadge from '../common/SeverityBadge'
import SkeletonBlock from '../common/SkeletonBlock'
import { formatSeverity } from '../../utils/formatters'

interface Props {
  findings: Finding[]
  isLoading: boolean
}

type FilterOption = Severity | 'all'

const SEVERITY_WEIGHT: Record<Severity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

/**
 * FindingsReview — filterable findings list with inline expand rows for detail preview.
 */
const FindingsReview: React.FC<Props> = ({ findings, isLoading }) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const sortedFindings = useMemo(
    () =>
      [...findings].sort(
        (a, b) => (SEVERITY_WEIGHT[b.severity] ?? 0) - (SEVERITY_WEIGHT[a.severity] ?? 0)
      ),
    [findings]
  )

  const filteredFindings = useMemo(
    () =>
      activeFilter === 'all'
        ? sortedFindings
        : sortedFindings.filter((f) => f.severity === activeFilter),
    [sortedFindings, activeFilter]
  )

  const filterOptions = useMemo(
    () =>
      (['all', 'critical', 'high', 'medium', 'low'] as FilterOption[]).map((value) => ({
        value,
        label: value === 'all' ? 'All' : formatSeverity(value),
      })),
    []
  )

  if (isLoading) {
    return (
      <Box className="flex flex-col gap-3">
        <Box className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonBlock key={i} height={32} width={80} />
          ))}
        </Box>
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBlock key={i} height={80} />
        ))}
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <FilterChipRow
          options={filterOptions}
          value={activeFilter}
          onChange={setActiveFilter}
          ariaLabel="Filter findings by severity"
        />
      </Box>

      {filteredFindings.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary', fontSize: '13px' }}>
            No {activeFilter === 'all' ? 'findings' : formatSeverity(activeFilter)} found
          </Typography>
        </Box>
      ) : (
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {filteredFindings.map((finding) => {
            const isExpanded = expandedId === finding.id
            return (
              <Box component="li" key={finding.id} sx={{ mb: 1 }}>
                <Paper
                  variant="outlined"
                  elevation={0}
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedId(isExpanded ? null : finding.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setExpandedId(isExpanded ? null : finding.id)
                    }
                  }}
                  aria-expanded={isExpanded}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    bgcolor: 'background.paper',
                    borderColor: isExpanded ? 'border.default' : 'border.subtle',
                    borderLeft: 2,
                    borderLeftColor: `severity.${finding.severity}.badge`,
                    borderRadius: 2,
                    transition: 'border-color 100ms, background-color 100ms',
                    '&:hover': { bgcolor: 'surface.raised', borderColor: 'border.default' },
                  }}
                >
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
                      sx={{
                        fontFamily: 'monospace',
                        color: 'textHierarchy.tertiary',
                        fontSize: '11px',
                        px: 1,
                        py: 0.25,
                        bgcolor: 'surface.raised',
                        border: 1,
                        borderColor: 'border.default',
                        borderRadius: 1,
                      }}
                    >
                      {finding.clause}
                    </Typography>
                    {finding.daysToRemediate !== undefined && (
                      <Typography
                        variant="caption"
                        sx={{ ml: 'auto', color: 'textHierarchy.tertiary', fontSize: '11px' }}
                      >
                        {finding.daysToRemediate}d
                      </Typography>
                    )}
                    <Typography component="span" sx={{ color: 'textHierarchy.tertiary', fontSize: '11px' }} aria-hidden>
                      {isExpanded ? '▲' : '▼'}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    className="line-clamp-2"
                    sx={{ color: 'text.secondary', mt: 1, fontSize: '13px', lineHeight: 1.4 }}
                  >
                    {finding.finding}
                  </Typography>

                  <Collapse in={isExpanded}>
                    <Box sx={{ mt: 1.5, pt: 1.5, borderTop: 1, borderColor: 'border.subtle' }}>
                      <Typography
                        variant="overline"
                        sx={{ color: 'textHierarchy.tertiary', fontSize: '10px', letterSpacing: '0.06em' }}
                      >
                        Recommendation
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mt: 0.75,
                          pl: 1.5,
                          borderLeft: 2,
                          borderColor: 'border.default',
                          fontSize: '13px',
                          lineHeight: 1.5,
                        }}
                      >
                        {finding.recommendation}
                      </Typography>
                      {finding.impact && (
                        <>
                          <Typography
                            variant="overline"
                            sx={{
                              display: 'block',
                              color: 'textHierarchy.tertiary',
                              fontSize: '10px',
                              letterSpacing: '0.06em',
                              mt: 1.5,
                            }}
                          >
                            Impact
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              mt: 0.75,
                              pl: 1.5,
                              borderLeft: 2,
                              borderColor: 'border.default',
                              fontSize: '13px',
                              lineHeight: 1.5,
                            }}
                          >
                            {finding.impact}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Collapse>
                </Paper>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default FindingsReview
