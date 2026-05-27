export const loadMockData = async <T,>(fileName: string): Promise<T> => {
  try {
    const response = await fetch(`/mock/${fileName}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${fileName}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading mock data from ${fileName}:`, error);
    throw error;
  }
};

export const loadDocuments = () => loadMockData('/mock/documents.json');
export const loadFindings = () => loadMockData('/mock/findings.json');
export const loadReport = () => loadMockData('/mock/report.json');
export const loadComplianceRules = () =>
  loadMockData('/mock/compliance-rules.json');
