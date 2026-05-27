import React from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Finding } from '../../types'
import { parseAnnotatedContent } from '../../utils/annotationParser'
import AnnotationTooltipContent from './AnnotationTooltipContent'
import AnnotationExpandCard from './AnnotationExpandCard'

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

interface Props {
  content: string
  findings: Finding[]
  annotation: AnnotationHandlers
}

/**
 * AnnotatedDocumentBody — renders document content with underlined annotation spans.
 */
const AnnotatedDocumentBody: React.FC<Props> = ({ content, findings, annotation }) => {
  const segments = parseAnnotatedContent(content, findings)
  const tooltipsDisabled = annotation.expandedFindingId !== null

  return (
    <Typography
      component="div"
      variant="body1"
      sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '15px' }}
    >
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <React.Fragment key={`text-${index}`}>{segment.value}</React.Fragment>
        }

        const { finding, value } = segment
        const isExpanded = annotation.expandedFindingId === finding.id
        const isHighlighted = annotation.highlightedFindingId === finding.id
        const showTooltip = !tooltipsDisabled && annotation.isTooltipVisible(finding.id)

        const span = (
          <Box
            component="span"
            key={`ann-${finding.id}`}
            onMouseEnter={() => annotation.onSpanMouseEnter(finding.id)}
            onMouseLeave={annotation.onSpanMouseLeave}
            onClick={(e) => {
              e.stopPropagation()
              annotation.onSpanClick(finding.id)
            }}
            sx={{
              borderBottom: 2,
              borderColor: `severity.${finding.severity}.badge`,
              cursor: 'pointer',
              transition: 'border-color 150ms',
              bgcolor: isHighlighted ? 'brand.subtle' : 'transparent',
              ...(isHighlighted && { borderColor: 'brand.primary' }),
              '&:hover': {
                borderColor: `severity.${finding.severity}.fg`,
              },
            }}
          >
            {value}
            {isExpanded && (
              <AnnotationExpandCard
                finding={finding}
                onViewFull={annotation.onViewFull}
                onDismiss={annotation.onDismissExpanded}
              />
            )}
          </Box>
        )

        return (
          <Tooltip
            key={`tooltip-${finding.id}`}
            title={<AnnotationTooltipContent finding={finding} />}
            enterDelay={150}
            leaveDelay={0}
            open={showTooltip}
            disableHoverListener={tooltipsDisabled}
            disableFocusListener
            placement="top"
            slotProps={{
              tooltip: {
                sx: {
                  bgcolor: 'surface.float',
                  border: 1,
                  borderColor: 'border.default',
                  boxShadow: 4,
                  p: 1.5,
                  maxWidth: 300,
                },
              },
            }}
          >
            {span}
          </Tooltip>
        )
      })}
    </Typography>
  )
}

export default AnnotatedDocumentBody
