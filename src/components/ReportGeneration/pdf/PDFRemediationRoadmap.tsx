import { Page, View, Text } from '@react-pdf/renderer'
import { Finding } from '../../../types'
import { styles, C, severityColors } from './pdfStyles'

interface Props { findings: Finding[] }

type Band = 'immediate' | 'short' | 'medium'

const BANDS: { key: Band; label: string; subtitle: string; bg: string; border: string; text: string }[] = [
  { key: 'immediate', label: 'IMMEDIATE',   subtitle: '0 – 30 days',  bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C' },
  { key: 'short',     label: 'SHORT TERM',  subtitle: '31 – 60 days', bg: '#FFFBEB', border: '#FDE68A', text: '#B45309' },
  { key: 'medium',    label: 'MEDIUM TERM', subtitle: '61+ days',     bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D' },
]

function bandFor(days: number | undefined): Band {
  if (!days || days <= 30) return 'immediate'
  if (days <= 60) return 'short'
  return 'medium'
}

export function PDFRemediationRoadmap({ findings }: Props) {
  const grouped: Record<Band, Finding[]> = { immediate: [], short: [], medium: [] }
  findings.forEach(f => { grouped[bandFor(f.daysToRemediate)].push(f) })

  const totalDays = findings.reduce((s, f) => s + (f.daysToRemediate ?? 0), 0)

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.h2}>Remediation Roadmap</Text>
      <View style={styles.divider} />

      {/* Summary stats */}
      <View style={[styles.row, { marginBottom: 20 }]}>
        {[
          { label: 'Total Effort',    value: `${totalDays} days` },
          { label: 'Total Findings',  value: `${findings.length}` },
          { label: 'Status',          value: 'Pending' },
        ].map((stat, i) => (
          <View key={stat.label} style={[styles.card, { flex: 1, alignItems: 'center', paddingVertical: 12, marginRight: i < 2 ? 8 : 0 }]}>
            <Text style={{ fontSize: 8, color: C.textTertiary, marginBottom: 4 }}>{stat.label}</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: C.textPrimary }}>{stat.value}</Text>
          </View>
        ))}
      </View>

      {BANDS.map(band => {
        const items = grouped[band.key]
        if (items.length === 0) return null
        return (
          <View key={band.key} style={{ marginBottom: 16 }}>
            {/* Band header */}
            <View style={{
              backgroundColor: band.bg,
              borderRadius: 4,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: band.border,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 4,
            }}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: band.text }}>{band.label}</Text>
              <Text style={{ fontSize: 8, color: band.text }}>
                {band.subtitle} · {items.length} finding{items.length > 1 ? 's' : ''}
              </Text>
            </View>

            {/* Table header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { width: 56 }]}>ID</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>FINDING</Text>
              <Text style={[styles.tableHeaderCell, { width: 60 }]}>SEVERITY</Text>
              <Text style={[styles.tableHeaderCell, { width: 36, textAlign: 'right' }]}>DAYS</Text>
            </View>

            {items.map(f => {
              const sc = severityColors(f.severity)
              return (
                <View key={f.id} style={styles.tableRow} wrap={false}>
                  <Text style={[styles.mono, { width: 56 }]}>{f.id}</Text>
                  <Text style={[styles.tableCell, { flex: 1, lineHeight: 1.4 }]}>
                    {f.finding.length > 100 ? f.finding.slice(0, 100) + '…' : f.finding}
                  </Text>
                  <View style={{ width: 60, paddingTop: 1 }}>
                    <View style={{ backgroundColor: sc.bg, borderRadius: 3, paddingHorizontal: 4, paddingVertical: 1, borderWidth: 1, borderColor: sc.border, alignSelf: 'flex-start' }}>
                      <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: sc.fg }}>
                        {f.severity.charAt(0).toUpperCase() + f.severity.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.tableCell, { width: 36, textAlign: 'right' }]}>
                    {f.daysToRemediate ?? '—'}
                  </Text>
                </View>
              )
            })}
          </View>
        )
      })}
    </Page>
  )
}
