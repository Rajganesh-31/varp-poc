import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Document, Finding } from '../../types'
import { formatDate } from '../../utils/formatters'
import AnnotatedDocumentBody from './AnnotatedDocumentBody'

interface AnnotationHandlers {
  expandedFindingId: string | null
  highlightedFindingId: string | null
  isTooltipVisible: (findingId: string) => boolean
  onSpanMouseEnter: (findingId: string) => void
  onSpanMouseLeave: () => void
  onSpanClick: (findingId: string) => void
  onDismissExpanded: () => void
  onViewFull: (finding: Finding) => void
}

interface DocumentViewerProps {
  document: Document | null
  findings: Finding[]
  annotation: AnnotationHandlers
}

/**
 * DocumentViewer — document header card and annotated body content.
 */
const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, findings, annotation }) => {
  if (!document) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary' }}>
          Select a document to view
        </Typography>
      </Box>
    )
  }

  const content = document.content ?? ''

  return (
    <Box>
      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          mx: 'auto',
          maxWidth: 672,
          p: 2,
          mb: 3,
          bgcolor: 'background.paper',
          borderColor: 'border.subtle',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: 'text.primary' }}>
          {document.name}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
          <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '11px' }}>
            v{document.version}
          </Typography>
          <Typography variant="caption" sx={{ color: 'textHierarchy.disabled' }} aria-hidden>
            ·
          </Typography>
          <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '11px' }}>
            Updated {document.lastUpdated ? formatDate(document.lastUpdated) : '—'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'textHierarchy.disabled' }} aria-hidden>
            ·
          </Typography>
          <Typography variant="caption" sx={{ color: 'textHierarchy.tertiary', fontSize: '11px' }}>
            {document.author}
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ mx: 'auto', maxWidth: 672 }}>
        <AnnotatedDocumentBody content={content} findings={findings} annotation={annotation} />
      </Box>
    </Box>
  )
}

export default DocumentViewer
