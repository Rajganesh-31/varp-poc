import React, { createContext, useContext, useState } from 'react';

interface Report {
  id: string;
  title: string;
  score: number;
  summary: string;
}

interface ReportContextType {
  report: Report | null;
  setReport: (report: Report) => void;
  clearReport: () => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [report, setReport] = useState<Report | null>(null);

  const clearReport = () => {
    setReport(null);
  };

  return (
    <ReportContext.Provider value={{ report, setReport, clearReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReport must be used within ReportProvider');
  }
  return context;
};
