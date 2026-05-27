import { Finding, Document } from '../types';

export const validateFinding = (finding: Partial<Finding>): boolean => {
  return !!(
    finding.id &&
    finding.finding &&
    finding.severity &&
    finding.clause &&
    finding.section
  );
};

export const validateDocument = (document: Partial<Document>): boolean => {
  return !!(document.id && document.name && document.content);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateScore = (score: number): boolean => {
  return score >= 0 && score <= 100;
};
