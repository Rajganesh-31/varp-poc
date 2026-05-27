import { Page, View, Text } from '@react-pdf/renderer'
import { Finding, Severity } from '../../../types'
import { styles, C, severityColors } from './pdfStyles'

interface Props { findings: Finding[] }

function SeverityBadge({ severity }: { severity: string }) {
  const c = severityColors(severity)
  const label = severity.charAt(0).toUpperCase() + severity.slice(1)
  return (
    <View style={{
      backgroundColor: c.bg, borderRadius: 3,
      paddingHorizontal: 5, paddingVertical: 1,
      borderWidth: 1, borderColor: c.border, alignSelf: 'flex-start',
    }}>
      <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: c.fg }}>{label}</Text>
    </View>
  )
}

const SEV_ORDER: Severity[] = ['critical', 'high', 'medium', 'low']

export function PDFFindingsReview({ findings }: Props) {
  const counts = SEV_ORDER.reduce((acc, s) => {
    acc[s] = findings.filter(f => f.severity === s).length
    return acc
  }, {} as Record<Severity, number>)

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.h2}>Findings Review</Text>
      <View style={styles.divider} />

      {/* Severity summary */}
      <View style={[styles.row, { marginBottom: 16 }]}>
        {SEV_ORDER.map(sev => {
          const c = severityColors(sev)
          return (
            <View key={sev} style={[styles.row, { alignItems: 'center', marginRight: 16 }]}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.badge, marginRight: 4 }} />
              <Text style={{ fontSize: 9, color: C.textSecondary }}>
                {counts[sev]} {sev.charAt(0).toUpperCase() + sev.slice(1)}
              </Text>
            </View>
          )
        })}
      </View>

      {/* Table header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { width: 56 }]}>ID</Text>
        <Text style={[styles.tableHeaderCell, { width: 60 }]}>SEVERITY</Text>
        <Text style={[styles.tableHeaderCell, { width: 44 }]}>CLAUSE</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>FINDING</Text>
        <Text style={[styles.tableHeaderCell, { width: 36, textAlign: 'right' }]}>DAYS</Text>
      </View>

      {findings.map((f, idx) => (
        <View key={f.id} break={idx > 0 && idx % 6 === 0} wrap={false}>
          <View style={styles.tableRow}>
            <Text style={[styles.mono, { width: 56 }]}>{f.id}</Text>
            <View style={{ width: 60, paddingTop: 1 }}>
              <SeverityBadge severity={f.severity} />
            </View>
            <Text style={[styles.mono, { width: 44 }]}>{f.clause}</Text>
            <Text style={[styles.tableCell, { flex: 1, lineHeight: 1.4 }]}>{f.finding}</Text>
            <Text style={[styles.tableCell, { width: 36, textAlign: 'right' }]}>
              {f.daysToRemediate ?? '—'}
            </Text>
          </View>
          {f.recommendation && (
            <View style={{
              backgroundColor: C.elevated,
              borderLeftWidth: 2,
              borderLeftColor: C.borderDefault,
              marginHorizontal: 8,
              paddingHorizontal: 8,
              paddingVertical: 5,
              marginBottom: 2,
            }}>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.textTertiary, marginBottom: 2 }}>RECOMMENDATION</Text>
              <Text style={{ fontSize: 9, color: C.textSecondary, lineHeight: 1.4 }}>{f.recommendation}</Text>
            </View>
          )}
          {f.impact && (
            <View style={{
              backgroundColor: C.severity.high.bg,
              borderLeftWidth: 2,
              borderLeftColor: C.severity.high.border,
              marginHorizontal: 8,
              paddingHorizontal: 8,
              paddingVertical: 5,
              marginBottom: 8,
            }}>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.severity.high.fg, marginBottom: 2 }}>IMPACT</Text>
              <Text style={{ fontSize: 9, color: C.severity.high.fg, lineHeight: 1.4 }}>{f.impact}</Text>
            </View>
          )}
        </View>
      ))}
    </Page>
  )
}
