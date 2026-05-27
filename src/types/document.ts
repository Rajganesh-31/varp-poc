export interface Document {
  id: string;
  type: string;
  name: string;
  content: string;
  lastUpdated: string;
  version: string;
  author: string;
}

export interface DocumentAnalysisResult {
  documentId: string;
  findings: string[];
  score: number;
  analysisDate: Date;
}
