import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import { Document, Finding, Severity } from '../../types'

interface DocumentNavigatorProps {
  documents: Document[]
  findings: Finding[]
  activeDocumentId: string
  activeSectionId: string | null
  onDocumentSelect: (id: string) => void
  onSectionSelect: (section: string | null) => void
}

const SEVERITY_RANK: Record<Severity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

function worstSeverity(sectionFindings: Finding[]): Severity | null {
  if (sectionFindings.length === 0) return null
  return sectionFindings.reduce<Severity>((worst, f) => {
    return SEVERITY_RANK[f.severity] < SEVERITY_RANK[worst] ? f.severity : worst
  }, sectionFindings[0].severity)
}

/**
 * DocumentNavigator — left sidebar listing documents and sections with severity dots.
 */
const DocumentNavigator: React.FC<DocumentNavigatorProps> = ({
  documents,
  findings,
  activeDocumentId,
  activeSectionId,
  onDocumentSelect,
  onSectionSelect,
}) => {
  const sections = useMemo<string[]>(() => {
    const seen = new Set<string>()
    const result: string[] = []
    findings
      .filter((f) => f.document === activeDocumentId && f.section)
      .forEach((f) => {
        const section = f.section as string
        if (!seen.has(section)) {
          seen.add(section)
          result.push(section)
        }
      })
    return result
  }, [findings, activeDocumentId])

  return (
    <Box
      component="nav"
      aria-label="Document navigator"
      sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
    >
      <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'border.subtle', flexShrink: 0 }}>
        <Typography
          variant="overline"
          sx={{ color: 'textHierarchy.tertiary', fontSize: '10px', letterSpacing: '0.08em' }}
        >
          Documents
        </Typography>
      </Box>

      <Box sx={{ flexShrink: 0, py: 1 }}>
        {documents.map((doc) => {
          const isActive = doc.id === activeDocumentId
          return (
            <ListItemButton
              key={doc.id}
              selected={isActive}
              onClick={() => {
                onDocumentSelect(doc.id)
                onSectionSelect(null)
              }}
              aria-pressed={isActive}
              sx={{
                mx: 1,
                mb: 0.25,
                borderRadius: 1.5,
                py: 1,
                fontSize: '13px',
                fontWeight: 500,
                color: isActive ? 'text.primary' : 'text.secondary',
                bgcolor: isActive ? 'surface.raised' : 'transparent',
                borderLeft: isActive ? 2 : 0,
                borderColor: isActive ? 'brand.primary' : 'transparent',
                pl: isActive ? 1.25 : 1.5,
                '&:hover': { bgcolor: 'surface.raised', color: 'text.primary' },
              }}
            >
              <Typography component="span" sx={{ mr: 1, flexShrink: 0 }} aria-hidden>
                📄
              </Typography>
              <Typography component="span" className="truncate" variant="body2" sx={{ fontSize: '13px' }}>
                {doc.name}
              </Typography>
            </ListItemButton>
          )
        })}
      </Box>

      {sections.length > 0 && (
        <>
          <Box sx={{ px: 2, py: 1, mt: 0.5, flexShrink: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: 'textHierarchy.tertiary', fontSize: '10px', letterSpacing: '0.08em' }}
            >
              Sections
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', pb: 1 }}>
            {sections.map((section) => {
              const sectionFindings = findings.filter(
                (f) => f.document === activeDocumentId && f.section === section
              )
              const severity = worstSeverity(sectionFindings)
              const isActive = activeSectionId === section

              return (
                <ListItemButton
                  key={section}
                  selected={isActive}
                  onClick={() => onSectionSelect(isActive ? null : section)}
                  aria-pressed={isActive}
                  className="flex items-center justify-between"
                  sx={{
                    mx: 1,
                    mb: 0.25,
                    borderRadius: 1.5,
                    py: 0.75,
                    fontSize: '13px',
                    color: isActive ? 'text.primary' : 'text.secondary',
                    bgcolor: isActive ? 'surface.raised' : 'transparent',
                    '&:hover': { bgcolor: 'surface.raised', color: 'text.primary' },
                  }}
                >
                  <Typography component="span" className="truncate" variant="body2" sx={{ fontSize: '13px' }}>
                    {section}
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      flexShrink: 0,
                      ml: 1,
                      bgcolor: severity
                        ? `severity.${severity}.badge`
                        : 'border.default',
                    }}
                    aria-label={severity ? `${severity} severity` : 'no findings'}
                  />
                </ListItemButton>
              )
            })}
          </Box>
        </>
      )}
    </Box>
  )
}

export default DocumentNavigator
