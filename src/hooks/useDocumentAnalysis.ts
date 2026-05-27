import { useState, useCallback } from 'react';
import { Finding } from '../types';

type AnalysisStatus = 'idle' | 'analyzing' | 'complete' | 'error';

interface AnalysisResult {
  findings: Finding[];
  score: number;
  status: AnalysisStatus;
}

/**
 * useDocumentAnalysis - encapsulates document analysis state machine.
 *
 * Currently simulates an async API call. Replace the setTimeout stub with
 * a real fetch/axios call to the backend when available.
 */
export const useDocumentAnalysis = () => {
  const [result, setResult] = useState<AnalysisResult>({
    findings: [],
    score: 0,
    status: 'idle',
  });

  const analyze = useCallback(async () => {
    setResult((prev) => ({ ...prev, status: 'analyzing' }));
    try {
      /* Simulate async API call - replace with real endpoint */
      await new Promise<void>((resolve) => setTimeout(resolve, 2000));
      setResult({
        findings: [],
        score: 85,
        status: 'complete',
      });
    } catch {
      setResult((prev) => ({ ...prev, status: 'error' }));
    }
  }, []);

  return { result, analyze };
};
