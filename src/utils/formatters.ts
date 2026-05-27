import { SeverityLevel } from '../types';

export const formatSeverity = (severity: SeverityLevel): string => {
  const map: Record<SeverityLevel, string> = {
    low: 'Medium',
    medium: 'Medium-High',
    high: 'High',
    critical: 'Critical',
  };
  return map[severity];
};

export const formatScore = (score: number): string => {
  return `${Math.round(score)}%`;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const formatPercentage = (value: number, total: number): string => {
  const percentage = Math.round((value / total) * 100);
  return `${percentage}%`;
};
