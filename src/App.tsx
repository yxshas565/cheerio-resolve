import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { EscalationModal } from './components/EscalationModal';
import { ResolveAssistantDrawer } from './components/ResolveAssistantDrawer';
import { OverviewPage } from './pages/OverviewPage';
import { InvestigationsPage } from './pages/InvestigationsPage';
import { FixMemoryPage } from './pages/FixMemoryPage';
import { ResolutionIntelligencePage } from './pages/ResolutionIntelligencePage';
import { ActivityPage } from './pages/ActivityPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'overview':
        return <OverviewPage />;
      case 'investigations':
        return <InvestigationsPage />;
      case 'fix-memory':
        return <FixMemoryPage />;
      case 'resolution-intelligence':
        return <ResolutionIntelligencePage />;
      case 'activity':
        return <ActivityPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex animate-fade-in">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 z-50 shadow-2xl">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Workspace Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Global Contextual Resolve Intelligence Assistant Drawer */}
      <ResolveAssistantDrawer />

      {/* Global Human Escalation Modal */}
      <EscalationModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
