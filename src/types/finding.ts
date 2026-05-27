export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Finding {
  id: string;
  document: string;
  finding: string;
  severity: SeverityLevel;
  clause: string;
  impact: string;
  recommendation: string;
  section: string;
  daysToRemediate: number;
}
