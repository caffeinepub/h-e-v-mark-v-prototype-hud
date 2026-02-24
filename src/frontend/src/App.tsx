import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { HudLayout } from './components/hud/HudLayout';
import { BootSequenceOverlay } from './components/boot/BootSequenceOverlay';
import { FactionSwitchOverlay } from './components/boot/FactionSwitchOverlay';
import { MainTab } from './tabs/MainTab';
import { TacticalTab } from './tabs/TacticalTab';
import { InfoTab } from './tabs/InfoTab';
import { MedicalTab } from './tabs/MedicalTab';
import { ObjectivesTab } from './tabs/ObjectivesTab';
import { ArsenalTab } from './tabs/ArsenalTab';
import { SystemsDiagnosticsTab } from './tabs/SystemsDiagnosticsTab';
import { UtilitiesTab } from './tabs/UtilitiesTab';
import { ResearchLabTab } from './tabs/ResearchLabTab';
import { CommandBriefingTab } from './tabs/CommandBriefingTab';
import { FacilityMonitoringTab } from './tabs/FacilityMonitoringTab';
import { useInfoSettingsStore } from './state/infoSettingsStore';
import { useSuitStore } from './state/suitState';
import { useGetModuleStates } from './hooks/useQueries';
import { registerServiceWorker } from './pwa/registerServiceWorker';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MiniAudioPlayer } from './components/utilities/MiniAudioPlayer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

type TabId = 'main' | 'tactical' | 'info' | 'medical' | 'objectives' | 'arsenal' | 'diagnostics' | 'utilities' | 'research' | 'command' | 'facility';

function AppContent() {
  const [bootComplete, setBootComplete] = useState(() => {
    return sessionStorage.getItem('bootSequenceComplete') === 'true';
  });
  const [activeTab, setActiveTab] = useState<TabId>('main');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const { systemStyle, factionSwitching } = useInfoSettingsStore();
  const { data: modules } = useGetModuleStates();
  const setSuitModules = useSuitStore((state) => state.setModules);

  // Preload critical images
  useEffect(() => {
    const imagesToPreload = [
      '/assets/generated/lambda-boot.dim_800x800.png',
      '/assets/generated/hev-logo.dim_256x256.png',
      '/assets/generated/hecu-logo.dim_256x256.png',
      '/assets/generated/security-logo.dim_256x256.png',
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  // Sync backend module state to Zustand store
  useEffect(() => {
    if (modules) {
      setSuitModules(modules);
    }
  }, [modules, setSuitModules]);

  // Register service worker for PWA
  useEffect(() => {
    registerServiceWorker();
  }, []);

  const handleBootComplete = () => {
    setBootComplete(true);
    sessionStorage.setItem('bootSequenceComplete', 'true');
  };

  // Show boot sequence if not complete or images not loaded
  if (!bootComplete || !imagesLoaded) {
    return <BootSequenceOverlay onComplete={handleBootComplete} />;
  }

  // Show faction switch overlay
  if (factionSwitching) {
    return <FactionSwitchOverlay />;
  }

  // Get available tabs based on faction
  const getAvailableTabs = (): TabId[] => {
    const baseTabs: TabId[] = ['main', 'tactical', 'info', 'medical', 'objectives', 'arsenal', 'diagnostics', 'utilities'];
    
    switch (systemStyle) {
      case 'hev':
        return [...baseTabs, 'research'];
      case 'hecu':
        return [...baseTabs, 'command'];
      case 'security':
      case 'guard':
        return [...baseTabs, 'facility'];
      default:
        return baseTabs;
    }
  };

  const availableTabs = getAvailableTabs();

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'main':
        return <MainTab />;
      case 'tactical':
        return <TacticalTab />;
      case 'info':
        return <InfoTab />;
      case 'medical':
        return <MedicalTab />;
      case 'objectives':
        return <ObjectivesTab />;
      case 'arsenal':
        return <ArsenalTab />;
      case 'diagnostics':
        return <SystemsDiagnosticsTab />;
      case 'utilities':
        return <UtilitiesTab />;
      case 'research':
        return systemStyle === 'hev' ? <ResearchLabTab /> : <MainTab />;
      case 'command':
        return systemStyle === 'hecu' ? <CommandBriefingTab /> : <MainTab />;
      case 'facility':
        return (systemStyle === 'security' || systemStyle === 'guard') ? <FacilityMonitoringTab /> : <MainTab />;
      default:
        return <MainTab />;
    }
  };

  return (
    <HudLayout>
      <div className="hud-tabs-container">
        {/* Tab Navigation */}
        <div className="hud-tabs-bar">
          {availableTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`hud-tab-button ${activeTab === tab ? 'active' : ''}`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="hud-tab-content">
          {renderTabContent()}
        </div>
      </div>
      <MiniAudioPlayer />
    </HudLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
