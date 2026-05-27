import React, { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import { Finding, Severity } from '../../types'
import FilterChipRow from '../common/FilterChipRow'
import { formatSeverity } from '../../utils/formatters'
import { groupFindingsBySeverity } from '../../utils/calculations'

interface FindingsPanelProps {
  findings: Finding[]
  documentId: string
  onFindingSelect: (findingId: string) => void
  selectedFindingId: string | null
}

type FilterOption = 'all' | Severity

const SEVERITY_ORDER: Severity[] = ['critical', 'high', 'medium', 'low']

/**
 * FindingsPanel — right sidebar with severity filter chips and grouped findings.
 */
const FindingsPanel: React.FC<FindingsPanelProps> = ({
  findings,
  documentId,
  onFindingSelect,
  selectedFindingId,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all')

  const docFindings = useMemo(
    () => findings.filter((f) => f.document === documentId),
    [findings, documentId]
  )

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? docFindings
        : docFindings.filter((f) => f.severity === activeFilter),
    [docFindings, activeFilter]
  )

  const grouped = useMemo(() => {
    const map = groupFindingsBySeverity(filtered) as Record<Severity, Finding[]>
    const ordered = new Map<Severity, Finding[]>()
    SEVERITY_ORDER.forEach((s) => ordered.set(s, map[s] ?? []))
    return ordered
  }, [filtered])

  const filterOptions = useMemo(
    () =>
      (['all', 'critical', 'high', 'medium', 'low'] as FilterOption[]).map((value) => ({
        value,
        label: value === 'all' ? 'All' : formatSeverity(value),
      })),
    []
  )

  return (
    <Box
      component="aside"
      aria-label="Findings panel"
      sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
    >
      <Box
        className="flex flex-shrink-0 items-center justify-between"
        sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'border.subtle' }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '13px' }}>
          Findings ({docFindings.length})
        </Typography>
      </Box>

      <Box sx={{ flexShrink: 0, borderBottom: 1, borderColor: 'border.subtle', px: 2, py: 1.25 }}>
        <FilterChipRow
          options={filterOptions}
          value={activeFilter}
          onChange={setActiveFilter}
          ariaLabel="Filter findings by severity"
        />
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 1 }} role="list" aria-label="Findings list">
        {filtered.length === 0 && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary', fontSize: '13px' }}>
              No findings match this filter
            </Typography>
          </Box>
        )}

        {SEVERITY_ORDER.map((severity) => {
          const items = grouped.get(severity) ?? []
          if (items.length === 0) return null

          return (
            <Box key={severity}>
              <Typography
                variant="overline"
                sx={{
                  display: 'block',
                  px: 0.5,
                  py: 1,
                  mt: 0.5,
                  color: 'textHierarchy.tertiary',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                }}
              >
                {formatSeverity(severity)} ({items.length})
              </Typography>

              {items.map((finding) => {
                const isSelected = selectedFindingId === finding.id
                return (
                  <ListItemButton
                    key={finding.id}
                    onClick={() => onFindingSelect(finding.id)}
                    role="listitem"
                    aria-pressed={isSelected}
                    sx={{
                      mb: 0.5,
                      borderRadius: 2,
                      py: 1.5,
                      px: 1.5,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      borderLeft: 2,
                      borderColor: isSelected ? 'brand.primary' : `severity.${finding.severity}.badge`,
                      bgcolor: isSelected ? 'brand.subtle' : 'background.paper',
                      transition: 'background-color 100ms',
                      '&:hover': { bgcolor: isSelected ? 'brand.subtle' : 'surface.raised' },
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: 'monospace', color: 'textHierarchy.tertiary', fontSize: '10px' }}
                    >
                      {finding.id}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="line-clamp-2"
                      sx={{ color: 'text.secondary', mt: 0.25, fontSize: '13px', textAlign: 'left' }}
                    >
                      {finding.finding}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        color: 'textHierarchy.tertiary',
                        mt: 0.5,
                        fontSize: '10px',
                      }}
                    >
                      {finding.clause} · {finding.section}
                    </Typography>
                  </ListItemButton>
                )
              })}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default FindingsPanel
