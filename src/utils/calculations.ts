import { Finding } from '../types';

export const calculateAuditScore = (findings: Finding[]): number => {
  if (findings.length === 0) return 100;

  const severityWeights: Record<string, number> = {
    critical: 20,
    high: 10,
    medium: 5,
    low: 2,
  };

  const totalDeductions = findings.reduce((sum, finding) => {
    return sum + (severityWeights[finding.severity] || 0);
  }, 0);

  return Math.max(0, 100 - totalDeductions);
};

export const calculateHeatmapValues = (): number[][] => {
  // Generate sample heatmap data
  return Array(10)
    .fill(null)
    .map(() => Array(10).fill(Math.random()));
};

export const groupFindingsBySeverity = (
  findings: Finding[]
): Record<string, Finding[]> => {
  return findings.reduce(
    (acc, finding) => {
      if (!acc[finding.severity]) {
        acc[finding.severity] = [];
      }
      acc[finding.severity].push(finding);
      return acc;
    },
    {} as Record<string, Finding[]>
  );
};
