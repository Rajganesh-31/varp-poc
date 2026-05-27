import React, { useState, useMemo } from 'react'
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
import { Finding, Document, ComplianceRule, Severity } from '../../types'
import SeverityBadge from '../common/SeverityBadge'

interface ComplianceTableViewProps {
  findings: Finding[]
  documents: Document[]
  rules: ComplianceRule[]
  onViewDetails: (finding: Finding) => void
}

type SortField = 'clause' | 'requirement' | 'status' | 'findings' | 'priority'
type SortDir = 'asc' | 'desc'
type ComplianceStatus = 'Compliant' | 'Partial' | 'Missing'

const SEVERITY_RANK: Record<Severity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

function findingStatus(ruleFindings: Finding[]): ComplianceStatus {
  if (ruleFindings.length === 0) return 'Compliant'
  const hasCritical = ruleFindings.some((f) => f.severity === 'critical')
  const hasHigh = ruleFindings.some((f) => f.severity === 'high')
  if (hasCritical || hasHigh) return 'Missing'
  return 'Partial'
}

const statusChipSx: Record<ComplianceStatus, object> = {
  Compliant: {
    bgcolor: 'severity.low.bg',
    color: 'severity.low.fg',
    borderColor: 'severity.low.border',
  },
  Partial: {
    bgcolor: 'severity.medium.bg',
    color: 'severity.medium.fg',
    borderColor: 'severity.medium.border',
  },
  Missing: {
    bgcolor: 'severity.critical.bg',
    color: 'severity.critical.fg',
    borderColor: 'severity.critical.border',
  },
}

/**
 * ComplianceTableView — sortable compliance rules table cross-referenced with findings.
 */
const ComplianceTableView: React.FC<ComplianceTableViewProps> = ({
  findings,
  documents,
  rules,
  onViewDetails,
}) => {
  const [sortField, setSortField] = useState<SortField>('priority')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [selectedClause, setSelectedClause] = useState<string | null>(null)

  const getDocName = (docId: string): string =>
    documents.find((d) => d.id === docId)?.name ?? docId

  const rows = useMemo(() => {
    return rules.map((rule) => {
      const ruleFindings = findings.filter((f) => f.clause === rule.clause)
      const status = findingStatus(ruleFindings)
      const worstSeverity =
        ruleFindings.length > 0
          ? ruleFindings.reduce<Severity>(
              (worst, f) =>
                SEVERITY_RANK[f.severity] < SEVERITY_RANK[worst] ? f.severity : worst,
              ruleFindings[0].severity
            )
          : 'low'
      const priority = SEVERITY_RANK[worstSeverity]
      return { rule, ruleFindings, status, worstSeverity, priority }
    })
  }, [rules, findings])

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      let cmp = 0
      if (sortField === 'clause') cmp = a.rule.clause.localeCompare(b.rule.clause)
      else if (sortField === 'requirement') cmp = a.rule.title.localeCompare(b.rule.title)
      else if (sortField === 'status') {
        const statusOrder: Record<ComplianceStatus, number> = {
          Missing: 0,
          Partial: 1,
          Compliant: 2,
        }
        cmp = statusOrder[a.status] - statusOrder[b.status]
      } else if (sortField === 'findings') cmp = b.ruleFindings.length - a.ruleFindings.length
      else if (sortField === 'priority') cmp = a.priority - b.priority
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [rows, sortField, sortDir])

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const sortIndicator = (field: SortField): string => {
    if (sortField !== field) return ''
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  const headerCellSx = (field: SortField) => ({
    fontSize: '10px',
    fontWeight: 600,
    color: sortField === field ? 'text.primary' : 'textHierarchy.tertiary',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    cursor: 'pointer',
    userSelect: 'none' as const,
    borderBottom: 1,
    borderColor: 'border.default',
    bgcolor: 'surface.raised',
    transition: 'color 150ms',
    '&:hover': { color: 'text.secondary' },
  })

  return (
    <Box
      id="view-panel-compliance"
      role="tabpanel"
      aria-label="Compliance Table View"
      sx={{ flex: 1, minHeight: 0, overflow: 'auto', bgcolor: 'background.default', p: 3 }}
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        elevation={0}
        sx={{ bgcolor: 'background.paper', borderColor: 'border.default', borderRadius: 2 }}
      >
        <Table aria-label="Compliance requirements table">
          <TableHead>
            <TableRow>
              {(
                [
                  ['clause', 'Clause'],
                  ['requirement', 'Requirement'],
                  ['status', 'Status'],
                  ['findings', 'Findings'],
                  ['priority', 'Priority'],
                ] as [SortField, string][]
              ).map(([field, label]) => (
                <TableCell
                  key={field}
                  onClick={() => handleSort(field)}
                  aria-sort={
                    sortField === field ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'
                  }
                  sx={headerCellSx(field)}
                >
                  {label}
                  {sortIndicator(field)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map(({ rule, ruleFindings, status, worstSeverity }) => {
              const isSelected = selectedClause === rule.clause
              return (
                <React.Fragment key={rule.id}>
                  <TableRow
                    hover
                    selected={isSelected}
                    onClick={() => {
                      setSelectedClause(isSelected ? null : rule.clause)
                      if (ruleFindings.length > 0) onViewDetails(ruleFindings[0])
                    }}
                    sx={{
                      cursor: 'pointer',
                      borderLeft: isSelected ? 2 : 0,
                      borderColor: isSelected ? 'brand.primary' : 'transparent',
                      bgcolor: isSelected ? 'brand.subtle' : 'transparent',
                      '&:hover': { bgcolor: isSelected ? 'brand.subtle' : 'surface.raised' },
                    }}
                  >
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: 'monospace', color: 'brand.primary', fontWeight: 600, fontSize: '12px' }}
                      >
                        {rule.clause}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5, maxWidth: 280 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', fontSize: '13px' }}>
                        {rule.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '11px' }}>
                        {rule.category}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Chip
                        label={status}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '11px',
                          fontWeight: 500,
                          border: 1,
                          ...statusChipSx[status],
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 1.5, textAlign: 'center' }}>
                      {ruleFindings.length > 0 ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 0.5,
                          }}
                        >
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '13px' }}>
                            {ruleFindings.length}
                          </Typography>
                          <SeverityBadge severity={worstSeverity} size="sm" />
                        </Box>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                          —
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', fontSize: '13px', textTransform: 'capitalize' }}
                      >
                        {rule.importance}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {isSelected &&
                    ruleFindings.map((finding) => (
                      <TableRow
                        key={finding.id}
                        hover
                        onClick={(e) => {
                          e.stopPropagation()
                          onViewDetails(finding)
                        }}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: 'brand.subtle',
                          '&:hover': { bgcolor: 'brand.subtle' },
                        }}
                      >
                        <TableCell sx={{ py: 1, pl: 4 }}>
                          <Typography
                            variant="caption"
                            sx={{ fontFamily: 'monospace', color: 'textHierarchy.tertiary', fontSize: '10px' }}
                          >
                            {finding.id}
                          </Typography>
                        </TableCell>
                        <TableCell colSpan={2} sx={{ py: 1 }}>
                          <Typography
                            variant="body2"
                            className="line-clamp-2"
                            sx={{ color: 'text.secondary', fontSize: '13px' }}
                          >
                            {finding.finding}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '10px' }}>
                            {getDocName(finding.document)} · {finding.section}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <SeverityBadge severity={finding.severity} size="sm" />
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '10px' }}>
                            {finding.daysToRemediate}d
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              )
            })}

            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 6, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary' }}>
                    No compliance rules found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ComplianceTableView
