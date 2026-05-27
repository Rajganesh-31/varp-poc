import { Theme } from '@mui/material/styles'

export function getScoreColor(score: number, theme: Theme): string {
  if (score >= 80) return theme.palette.success.main
  if (score >= 60) return theme.palette.warning.main
  if (score >= 40) return theme.palette.severity.high.badge
  return theme.palette.error.main
}

export function getScoreStatusChip(score: number, theme: Theme) {
  if (score >= 80) {
    return {
      label: 'Good Standing',
      bgcolor: theme.palette.severity.low.bg,
      color: theme.palette.severity.low.fg,
      borderColor: theme.palette.severity.low.border,
    }
  }
  if (score >= 60) {
    return {
      label: 'Moderate Gaps',
      bgcolor: theme.palette.severity.medium.bg,
      color: theme.palette.severity.medium.fg,
      borderColor: theme.palette.severity.medium.border,
    }
  }
  return {
    label: 'Needs Attention',
    bgcolor: theme.palette.severity.critical.bg,
    color: theme.palette.severity.critical.fg,
    borderColor: theme.palette.severity.critical.border,
  }
}
