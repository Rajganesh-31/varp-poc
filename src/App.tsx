import React, { useState } from 'react';
import { AuditProvider } from './context/AuditContext';
import { DocumentProvider } from './context/DocumentContext';
import { ReportProvider } from './context/ReportContext';
import DocumentAnalysis from './components/DocumentAnalysis/DocumentAnalysis';
import ReportGeneration from './components/ReportGeneration/ReportGeneration';
import AppShell from './components/layout/AppShell';
import TopBar, { type AppPage } from './components/layout/TopBar';

/**
 * App — root shell component.
 *
 * Composes all three Context providers and renders the top-bar navigation
 * shell. Tab state lives here; both modules are rendered conditionally below
 * the bar. No context is needed for shell-level routing state.
 */
const App: React.FC = () => {
  const [activePage, setActivePage] = useState<AppPage>('analysis');

  return (
    <AuditProvider>
      <DocumentProvider>
        <ReportProvider>
          <AppShell
            header={<TopBar activePage={activePage} onPageChange={setActivePage} />}
          >
            {activePage === 'analysis' && <DocumentAnalysis />}
            {activePage === 'report' && <ReportGeneration />}
          </AppShell>
        </ReportProvider>
      </DocumentProvider>
    </AuditProvider>
  );
};

export default App;
