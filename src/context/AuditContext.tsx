import React, { createContext, useContext, useState } from 'react';
import { Finding } from '../types';

interface AuditContextType {
  findings: Finding[];
  addFinding: (finding: Finding) => void;
  clearFindings: () => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

/**
 * AuditProvider - React Context provider that holds the list of audit findings
 * surfaced during the session. Components can add findings via addFinding
 * (e.g. when a user marks a finding in the inline viewer) or clear them
 * when starting a fresh analysis.
 */
export const AuditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [findings, setFindings] = useState<Finding[]>([]);

  const addFinding = (finding: Finding) => {
    setFindings((prev) => [...prev, finding]);
  };

  const clearFindings = () => {
    setFindings([]);
  };

  return (
    <AuditContext.Provider value={{ findings, addFinding, clearFindings }}>
      {children}
    </AuditContext.Provider>
  );
};

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAudit must be used within AuditProvider');
  }
  return context;
};
