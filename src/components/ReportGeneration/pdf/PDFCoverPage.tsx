/**
 * PDFCoverPage — Title page for the audit report PDF.
 * Shows brand bar, company name, standard, status, and metadata.
 */
import { Page, View, Text } from '@react-pdf/renderer'
import { Report } from '../../../types'
import { styles, C } from './pdfStyles'

interface PDFCoverPageProps {
  report: Report
}

export function PDFCoverPage({ report }: PDFCoverPageProps) {
  const generated = new Date(report.generatedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const isComplete = report.status === 'Complete'
  const statusColors = isComplete ? C.severity.low : C.severity.medium

  return (
    <Page size="A4" style={styles.coverPage}>
      {/* Brand bar — full width */}
      <View style={{ backgroundColor: C.brand, height: 8 }} />

      {/* Inner padded content */}
      <View style={{ padding: 48, flex: 1 }}>
        {/* Logo text */}
        <Text style={{ fontSize: 13, fontFamily: 'Helvetica-Bold', color: C.brand, marginBottom: 48 }}>
          Vegas Audit Platform
        </Text>

        {/* Center block */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles.h1, { textAlign: 'center', marginBottom: 6 }]}>
            {report.company}
          </Text>

          {/* Standard badge */}
          <View style={{
            backgroundColor: C.brandMuted,
            borderRadius: 4,
            paddingHorizontal: 12,
            paddingVertical: 4,
            marginBottom: 24,
          }}>
            <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.brand }}>
              {report.standard}
            </Text>
          </View>

          {/* Status chip */}
          <View style={{
            backgroundColor: statusColors.bg,
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: statusColors.border,
            marginBottom: 40,
          }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: statusColors.fg }}>
              {report.status}
            </Text>
          </View>

          {/* Metadata row */}
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', marginRight: 32 }}>
              <Text style={{ fontSize: 8, color: C.textTertiary, marginBottom: 3 }}>AUDITOR</Text>
              <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: C.textPrimary }}>
                {report.auditor ?? '—'}
              </Text>
            </View>
            {report.auditPeriod && (
              <>
                <View style={{ alignItems: 'center', marginRight: 32 }}>
                  <Text style={{ fontSize: 8, color: C.textTertiary, marginBottom: 3 }}>PERIOD START</Text>
                  <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: C.textPrimary }}>
                    {report.auditPeriod.start}
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 8, color: C.textTertiary, marginBottom: 3 }}>PERIOD END</Text>
                  <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: C.textPrimary }}>
                    {report.auditPeriod.end}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.caption}>Confidential — Internal Use Only</Text>
          <Text style={styles.caption}>Generated {generated}</Text>
        </View>
      </View>
    </Page>
  )
}
