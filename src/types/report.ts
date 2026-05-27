export interface Report {
  company: string;
  standard: string;
  assessmentScore: {
    overall: number;
    dimensions: {
      Management: number;
      Operations: number;
      Quality: number;
      Documentation: number;
    };
  };
  findings: string[];
  generatedAt: string;
  status: 'final' | 'draft' | 'in_progress';
  auditor: string;
  auditPeriod: {
    start: string;
    end: string;
  };
}

export interface ReportRoadmapItem {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  effort: string;
  owner?: string;
}
