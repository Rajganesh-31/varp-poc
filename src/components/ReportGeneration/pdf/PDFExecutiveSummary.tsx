import { Page, View, Text, Svg, Path } from '@react-pdf/renderer'
import { Report, Finding } from '../../../types'
import { styles, C, scoreColor, severityColors, scoreArcPath } from './pdfStyles'

interface Props { report: Report; findings: Finding[] }

const NEXT_STEPS = [
  'Prioritize immediate remediation of all critical-severity findings',
  'Establish calibration tracking for measurement and test equipment',
  'Deploy document control system with version enforcement',
  'Enroll all quality inspection personnel in API Q1 training',
  'Implement automated non-conformance logging with daily reconciliation',
]

export function PDFExecutiveSummary({ report, findings }: Props) {
  const score = report.assessmentScore.overall
  const color = scoreColor(score)
  const criticalFindings = findings.filter(f => f.severity === 'critical')
  const priorityFindings = findings.slice(0, 5)

  const r = 44
  const cx = 60
  const cy = 60
  const trackPath = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`
  const arcD = scoreArcPath(cx, cy, r, score)

  const statusLabel = score >= 80 ? 'Good Standing' : score >= 60 ? 'Moderate Gaps' : 'Needs Attention'
  const statusC = score >= 80 ? C.severity.low : score >= 60 ? C.severity.medium : C.severity.critical

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.h2}>Executive Summary</Text>
      <View style={styles.divider} />

      {/* Score ring + metadata */}
      <View style={[styles.row, { marginBottom: 16 }]}>
        {/* Ring */}
        <View style={{ width: 120, height: 120, position: 'relative', marginRight: 24 }}>
          <Svg width="120" height="120" viewBox="0 0 120 120">
            <Path d={trackPath} fill="none" stroke={C.elevated} strokeWidth="10" />
            <Path d={arcD} fill="none" stroke={color} strokeWidth="10" />
          </Svg>
          <View style={{
            position: 'absolute', top: 0, left: 0, width: 120, height: 120,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Text style={{ fontSize: 26, fontFamily: 'Helvetica-Bold', color: C.textPrimary }}>{score}</Text>
            <Text style={{ fontSize: 8, color: C.textTertiary }}>/100</Text>
          </View>
        </View>

        {/* Metadata */}
        <View style={{ flex: 1 }}>
          <View style={{
            backgroundColor: statusC.bg,
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: statusC.border,
            alignSelf: 'flex-start',
            marginBottom: 12,
          }}>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: statusC.fg }}>{statusLabel}</Text>
          </View>

          {/* 2×2 grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {([
              ['Auditor', report.auditor ?? '—'],
              ['Standard', report.standard],
              ['Period Start', report.auditPeriod?.start ?? '—'],
              ['Period End', report.auditPeriod?.end ?? '—'],
            ] as [string, string][]).map(([label, value]) => (
              <View key={label} style={{ width: '50%', marginBottom: 10 }}>
                <Text style={{ fontSize: 8, color: C.textTertiary, marginBottom: 2 }}>{label}</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.textPrimary }}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Critical alert */}
      {criticalFindings.length > 0 && (
        <View style={{
          backgroundColor: C.severity.critical.bg,
          borderRadius: 4,
          padding: 10,
          borderLeftWidth: 3,
          borderLeftColor: C.severity.critical.badge,
          marginBottom: 12,
        }}>
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.severity.critical.fg }}>
            {criticalFindings.length} Critical Finding{criticalFindings.length > 1 ? 's' : ''} Require Immediate Action
          </Text>
          <Text style={{ fontSize: 9, color: C.severity.critical.fg, marginTop: 2 }}>
            These items represent significant compliance risk and must be addressed before the next audit cycle.
          </Text>
        </View>
      )}

      {/* Priority issues */}
      <Text style={[styles.h4, { marginBottom: 6 }]}>Priority Issues</Text>
      {priorityFindings.map((f) => {
        const sc = severityColors(f.severity)
        return (
          <View key={f.id} style={[styles.row, { marginBottom: 6 }]}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: sc.badge, marginTop: 2, marginRight: 8, flexShrink: 0 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, color: C.textPrimary, lineHeight: 1.4 }}>
                {f.finding.length > 120 ? f.finding.slice(0, 120) + '…' : f.finding}
              </Text>
              <Text style={[styles.mono, { marginTop: 1 }]}>{f.clause}</Text>
            </View>
          </View>
        )
      })}

      <View style={styles.divider} />

      {/* Next Steps */}
      <Text style={[styles.h4, { marginBottom: 6 }]}>Next Steps</Text>
      {NEXT_STEPS.map((step, i) => (
        <View key={i} style={[styles.row, { marginBottom: 4 }]}>
          <Text style={{ fontSize: 9, color: C.brand, fontFamily: 'Helvetica-Bold', marginRight: 6 }}>{i + 1}.</Text>
          <Text style={{ fontSize: 9, color: C.textSecondary, flex: 1, lineHeight: 1.4 }}>{step}</Text>
        </View>
      ))}
    </Page>
  )
}
