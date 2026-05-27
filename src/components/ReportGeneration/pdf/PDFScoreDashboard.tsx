import { Page, View, Text } from '@react-pdf/renderer'
import { Report } from '../../../types'
import { styles, C, scoreColor } from './pdfStyles'

interface Props { report: Report }

export function PDFScoreDashboard({ report }: Props) {
  const { overall, dimensions } = report.assessmentScore
  const overallColor = scoreColor(overall)
  const dimEntries = Object.entries(dimensions) as [string, number][]

  const statusLabel = overall >= 80 ? 'Good Standing' : overall >= 60 ? 'Moderate Gaps' : 'Needs Attention'
  const statusC = overall >= 80 ? C.severity.low : overall >= 60 ? C.severity.medium : C.severity.critical

  const autoAnalysis = [
    `Overall compliance score of ${overall}/100 places the organization in the "${statusLabel}" category.`,
    `Documentation (${dimensions.Documentation}/100) is the lowest-scoring dimension and the primary driver of overall risk.`,
    `Implementation (${dimensions.Implementation}/100) is the strongest area and indicates solid operational execution.`,
    `Personnel (${dimensions.Personnel}) and Calibration (${dimensions.Calibration}) scores indicate targeted investment is required.`,
  ]

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.h2}>Score Dashboard</Text>
      <View style={styles.divider} />

      {/* Overall score card */}
      <View style={[styles.card, { alignItems: 'center', paddingVertical: 24, marginBottom: 20 }]}>
        <Text style={{ fontSize: 8, color: C.textTertiary, marginBottom: 4 }}>OVERALL COMPLIANCE SCORE</Text>
        <Text style={{ fontSize: 56, fontFamily: 'Helvetica-Bold', color: overallColor, lineHeight: 1 }}>{overall}</Text>
        <Text style={{ fontSize: 12, color: C.textTertiary, marginBottom: 10 }}>/100</Text>
        <View style={{
          backgroundColor: statusC.bg,
          borderRadius: 4,
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderWidth: 1,
          borderColor: statusC.border,
        }}>
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: statusC.fg }}>{statusLabel}</Text>
        </View>
      </View>

      {/* Dimension bars */}
      <Text style={[styles.h3, { marginBottom: 12 }]}>Dimensional Analysis</Text>
      {dimEntries.map(([dim, score]) => {
        const color = scoreColor(score)
        return (
          <View key={dim} style={{ marginBottom: 14 }}>
            <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 4 }]}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.textPrimary }}>{dim}</Text>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color }}>{score}/100</Text>
            </View>
            {/* Track */}
            <View style={{ height: 8, backgroundColor: C.elevated, borderRadius: 4 }}>
              <View style={{ width: `${score}%` as `${number}%`, height: 8, backgroundColor: color, borderRadius: 4 }} />
            </View>
          </View>
        )
      })}

      <View style={styles.divider} />

      {/* Auto analysis */}
      <Text style={[styles.h4, { marginBottom: 8 }]}>Automated Analysis</Text>
      {autoAnalysis.map((line, i) => (
        <View key={i} style={[styles.row, { marginBottom: 5 }]}>
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: C.brand, marginTop: 4, marginRight: 6, flexShrink: 0 }} />
          <Text style={{ fontSize: 9, color: C.textSecondary, flex: 1, lineHeight: 1.5 }}>{line}</Text>
        </View>
      ))}
    </Page>
  )
}
