import { Page, View, Text } from '@react-pdf/renderer'
import { ComplianceRule } from '../../../types'
import { styles, C, severityColors } from './pdfStyles'

interface Props { rules: ComplianceRule[] }

export function PDFComplianceRulesReference({ rules }: Props) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.h2}>Compliance Rules Reference</Text>
      <View style={styles.divider} />
      <Text style={{ fontSize: 9, color: C.textTertiary, marginBottom: 16 }}>
        {rules.length} rules referenced in this audit
      </Text>

      {rules.map(rule => {
        const ic = severityColors(rule.importance)
        return (
          <View key={rule.id} style={styles.card} wrap={false}>
            {/* Clause + Importance badge */}
            <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }]}>
              <Text style={styles.mono}>{rule.clause}</Text>
              <View style={{ backgroundColor: ic.bg, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 1, borderWidth: 1, borderColor: ic.border }}>
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: ic.fg }}>
                  {rule.importance.charAt(0).toUpperCase() + rule.importance.slice(1)}
                </Text>
              </View>
            </View>
            {/* Title */}
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.textPrimary, marginBottom: 3 }}>
              {rule.title}
            </Text>
            {/* Description */}
            <Text style={{ fontSize: 9, color: C.textSecondary, lineHeight: 1.4, marginBottom: 6 }}>
              {rule.description}
            </Text>
            {/* Category chip */}
            <View style={{ backgroundColor: C.brandMuted, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 1, alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 7, color: C.brand }}>{rule.category}</Text>
            </View>
          </View>
        )
      })}
    </Page>
  )
}
