import { useState, useCallback } from 'react';
import { Report } from '../types';

type GenerationStatus = 'idle' | 'generating' | 'complete' | 'error';

interface GenerationResult {
  report: Report | null;
  status: GenerationStatus;
}

/**
 * useReportGeneration - encapsulates report generation state machine.
 *
 * Currently simulates an async API call. Replace the setTimeout stub with
 * a real fetch/axios call to the backend when available.
 */
export const useReportGeneration = () => {
  const [result, setResult] = useState<GenerationResult>({
    report: null,
    status: 'idle',
  });

  const generate = useCallback(async () => {
    setResult((prev) => ({ ...prev, status: 'generating' }));
    try {
      /* Simulate async API call - replace with real endpoint */
      await new Promise<void>((resolve) => setTimeout(resolve, 2000));
      setResult({
        report: null, /* will be replaced by real API response */
        status: 'complete',
      });
    } catch {
      setResult((prev) => ({ ...prev, status: 'error' }));
    }
  }, []);

  return { result, generate };
};
