import React from 'react';
import { InvestigationProvider, useInvestigation } from './context/InvestigationContext';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { OverviewPage } from './components/overview/OverviewPage';
import { InvestigationPage } from './components/investigation/InvestigationPage';
import { CasesPage } from './components/cases/CasesPage';
import { NetworkPage } from './components/network/NetworkPage';
import { MemoryPage } from './components/memory/MemoryPage';
import { PoliciesPage } from './components/policies/PoliciesPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { ArchitectureDiagramModal } from './components/network/ArchitectureDiagramModal';

const AppContent: React.FC = () => {
  const { currentTab } = useInvestigation();

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'OVERVIEW':
        return <OverviewPage />;
      case 'INVESTIGATIONS':
        return <InvestigationPage />;
      case 'CASES':
        return <CasesPage />;
      case 'NETWORK':
        return <NetworkPage />;
      case 'MEMORY':
        return <MemoryPage />;
      case 'POLICIES':
        return <PoliciesPage />;
      case 'SETTINGS':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex relative overflow-x-hidden selection:bg-sage-200 selection:text-sage-900 font-sans text-charcoal-800">
      {/* Visual Intelligence Layer: Ambient Background */}
      <AmbientBackground />

      {/* Global Minimal Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <TopHeader />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {renderActiveTab()}
        </main>
      </div>

      {/* System Architecture Modal */}
      <ArchitectureDiagramModal />
    </div>
  );
};

export default function App() {
  return (
    <InvestigationProvider>
      <AppContent />
    </InvestigationProvider>
  );
}
