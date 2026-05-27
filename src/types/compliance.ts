export interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  status: 'pass' | 'fail' | 'pending';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ComplianceRule {
  id: string;
  clause: string;
  title: string;
  description: string;
  category: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}
