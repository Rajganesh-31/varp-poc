/**
 * pdfStyles.ts — Shared StyleSheet + color constants for PDF export.
 * All hex values sourced from tokenMap to ensure design token consistency.
 * The PDF is a light-background, print-friendly document.
 */
import { StyleSheet } from '@react-pdf/renderer'
import { tokens } from '../../../theme/tokenMap'

export const C = {
  white: '#FFFFFF',
  elevated: tokens.surface.elevated,    // #F9FAFB
  raised: tokens.surface.raised,         // #F3F4F6
  borderSubtle: tokens.border.subtle,    // #E4E4E7
  borderDefault: tokens.border.default,  // #D4D4D8
  brand: tokens.brand.primary,           // #4F6EF7
  brandMuted: tokens.brand.muted,        // #E0E7FF
  textPrimary: tokens.text.primary,      // #09090B
  textSecondary: tokens.text.secondary,  // #52525B
  textTertiary: tokens.text.tertiary,    // #71717A
  textDisabled: tokens.text.disabled,    // #A1A1AA
  severity: tokens.severity,
  success: tokens.status.success,        // #16A34A
  warning: tokens.status.warning,        // #D97706
  error: tokens.status.error,            // #DC2626
} as const

/** scoreColor — maps a numeric score to a hex color */
export function scoreColor(score: number): string {
  if (score >= 80) return tokens.status.success
  if (score >= 60) return tokens.status.warning
  return tokens.status.error
}

type SeverityTokens = { fg: string; bg: string; border: string; badge: string }

/** severityColors — maps a severity string to its color token group */
export function severityColors(sev: string): SeverityTokens {
  const map: Record<string, SeverityTokens> = {
    critical: tokens.severity.critical,
    high:     tokens.severity.high,
    medium:   tokens.severity.medium,
    low:      tokens.severity.low,
  }
  return map[sev] ?? tokens.severity.low
}

/**
 * scoreArcPath — SVG arc path starting from 12-o'clock, going clockwise.
 * Used to draw the score ring in the executive summary.
 */
export function scoreArcPath(cx: number, cy: number, r: number, score: number): string {
  if (score <= 0) return `M ${cx} ${cy - r}`
  if (score >= 100) {
    const top = `${cx} ${cy - r}`
    const bot = `${cx} ${cy + r}`
    return `M ${top} A ${r} ${r} 0 1 1 ${bot} A ${r} ${r} 0 1 1 ${top}`
  }
  const angleDeg = (score / 100) * 360 - 90
  const rad = (angleDeg * Math.PI) / 180
  const ex = cx + r * Math.cos(rad)
  const ey = cy + r * Math.sin(rad)
  const largeArc = score > 50 ? 1 : 0
  return `M ${cx} ${cy - r} A ${r} ${r} 0 ${largeArc} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`
}

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: tokens.text.primary,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
  },
  coverPage: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: tokens.text.primary,
  },
  h1: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: tokens.text.primary,
    marginBottom: 8,
  },
  h2: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: tokens.text.primary,
    marginBottom: 12,
  },
  h3: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: tokens.text.primary,
    marginBottom: 8,
  },
  h4: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: tokens.text.primary,
    marginBottom: 4,
  },
  body: {
    fontSize: 10,
    color: tokens.text.secondary,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: 8,
    color: tokens.text.tertiary,
  },
  mono: {
    fontSize: 9,
    fontFamily: 'Courier',
    color: tokens.brand.primary,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  card: {
    backgroundColor: tokens.surface.elevated,
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.border.subtle,
    marginBottom: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: tokens.border.subtle,
    marginVertical: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: tokens.surface.raised,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: tokens.border.subtle,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: tokens.text.tertiary,
  },
  tableCell: {
    fontSize: 9,
    color: tokens.text.secondary,
  },
})
