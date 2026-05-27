import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { Report } from '../../types'
import SkeletonBlock from '../common/SkeletonBlock'
import { getScoreColor, getScoreStatusChip } from '../../utils/scoreTheme'

interface Props {
  report: Report
  isLoading: boolean
}

/**
 * ScoreDashboard — overall score and dimension breakdown with animated bars.
 */
const ScoreDashboard: React.FC<Props> = ({ report, isLoading }) => {
  const theme = useTheme()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (isLoading) return undefined
    const t = setTimeout(() => setAnimated(true), 100)
    return () => {
      clearTimeout(t)
      setAnimated(false)
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <Box className="flex flex-col gap-4">
        <SkeletonBlock height={112} />
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBlock key={i} height={48} />
        ))}
      </Box>
    )
  }

  const score = report.assessmentScore.overall
  const scoreColor = getScoreColor(score, theme)
  const chip = getScoreStatusChip(score, theme)
  const dimEntries = Object.entries(report.assessmentScore.dimensions) as [string, number][]
  const lowest = dimEntries.reduce((prev, curr) => (curr[1] < prev[1] ? curr : prev))
  const highest = dimEntries.reduce((prev, curr) => (curr[1] > prev[1] ? curr : prev))

  const insights = [
    `${lowest[0]} requires immediate attention at ${lowest[1]}%`,
    `${highest[0]} is your strongest area at ${highest[1]}%`,
    'Focus remediation efforts on lower-scoring dimensions first',
    'Schedule a re-assessment after implementing corrective actions',
  ]

  return (
    <Box>
      <Paper
        variant="outlined"
        elevation={0}
        sx={{ p: 2.5, mb: 2, bgcolor: 'background.paper', borderColor: 'border.default', borderRadius: 3 }}
      >
        <Box className="mb-4 flex items-center justify-between">
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '14px' }}>
            Overall Compliance Score
          </Typography>
          <Chip
            label={chip.label}
            size="small"
            sx={{
              height: 24,
              fontSize: '11px',
              fontWeight: 600,
              bgcolor: chip.bgcolor,
              color: chip.color,
              border: 1,
              borderColor: chip.borderColor,
            }}
          />
        </Box>
        <Box className="flex items-baseline">
          <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: 1, color: scoreColor, fontSize: '48px' }}>
            {score}
          </Typography>
          <Typography variant="body1" sx={{ color: 'textHierarchy.tertiary', ml: 1, fontSize: '16px' }}>
            / 100
          </Typography>
        </Box>
      </Paper>

      <Paper
        variant="outlined"
        elevation={0}
        sx={{ p: 2.5, mb: 2, bgcolor: 'background.paper', borderColor: 'border.default', borderRadius: 3 }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 2, fontSize: '14px' }}>
          Dimensional Breakdown
        </Typography>

        {dimEntries.map(([dim, dimScore], idx) => {
          const dimColor = getScoreColor(dimScore, theme)
          return (
            <Box
              key={dim}
              className="flex items-center gap-4"
              sx={{
                py: 1.5,
                borderBottom: idx < dimEntries.length - 1 ? 1 : 0,
                borderColor: 'border.subtle',
              }}
            >
              <Typography
                variant="body2"
                sx={{ width: 128, flexShrink: 0, color: 'text.secondary', fontWeight: 500, fontSize: '13px' }}
              >
                {dim}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={animated ? dimScore : 0}
                sx={{
                  flex: 1,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'surface.raised',
                  transition: 'width 700ms ease-out',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    bgcolor: dimColor,
                    transition: 'transform 700ms ease-out',
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{ width: 32, textAlign: 'right', flexShrink: 0, fontWeight: 600, color: dimColor, fontSize: '13px' }}
              >
                {dimScore}
              </Typography>
            </Box>
          )
        })}
      </Paper>

      <Paper
        variant="outlined"
        elevation={0}
        sx={{ p: 2.5, bgcolor: 'background.paper', borderColor: 'border.default', borderRadius: 3 }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1.5, fontSize: '14px' }}>
          Analysis
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {insights.map((text, i) => (
            <Box component="li" key={i} className="flex items-start gap-2" sx={{ py: 0.75 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '13px' }}>
                → {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}

export default ScoreDashboard
