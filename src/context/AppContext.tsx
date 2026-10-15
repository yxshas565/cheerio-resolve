import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Investigation,
  FixRecipe,
  ResolutionInsight,
  ActivityEvent,
  InvestigationStatus,
  RecipeReviewStatus
} from '../types';
import {
  INITIAL_INVESTIGATIONS,
  INITIAL_RECIPES,
  INITIAL_INSIGHTS,
  INITIAL_ACTIVITY_LOG
} from '../data/demoData';

export type ThemeMode = 'light' | 'dark';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  investigations: Investigation[];
  recipes: FixRecipe[];
  insights: ResolutionInsight[];
  activityLog: ActivityEvent[];
  activeInvestigationId: string | null;
  activeRecipeId: string | null;
  currentRoute: string;
  isEscalationModalOpen: boolean;
  escalationCase: Investigation | null;
  isAssistantOpen: boolean;
  toggleAssistant: () => void;
  setIsAssistantOpen: (open: boolean) => void;
  setCurrentRoute: (route: string) => void;
  setActiveInvestigationId: (id: string | null) => void;
  setActiveRecipeId: (id: string | null) => void;
  openEscalationModal: (investigation: Investigation) => void;
  closeEscalationModal: () => void;
  confirmEscalation: (caseId: string, reason: string) => string;
  updateInvestigationStatus: (caseId: string, status: InvestigationStatus) => void;
  updateVariableMapping: (caseId: string, mapping: string) => void;
  completePrimaryVerification: (caseId: string) => void;
  updateRecipeStatus: (recipeId: string, newStatus: RecipeReviewStatus) => void;
  updateInsightStatus: (insightId: string, newStatus: 'Active' | 'Under review' | 'Resolved') => void;
  addActivityEvent: (event: Omit<ActivityEvent, 'id' | 'timestamp'>) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'cheerio_resolve_state_v1';
const THEME_KEY = 'cheerio_resolve_theme';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [investigations, setInvestigations] = useState<Investigation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_investigations`);
    return saved ? JSON.parse(saved) : INITIAL_INVESTIGATIONS;
  });

  const [recipes, setRecipes] = useState<FixRecipe[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_recipes`);
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  const [insights, setInsights] = useState<ResolutionInsight[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_insights`);
    return saved ? JSON.parse(saved) : INITIAL_INSIGHTS;
  });

  const [activityLog, setActivityLog] = useState<ActivityEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_activity`);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOG;
  });

  const [currentRoute, setCurrentRoute] = useState<string>('overview');
  const [activeInvestigationId, setActiveInvestigationId] = useState<string | null>(null);
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);

  const [isEscalationModalOpen, setIsEscalationModalOpen] = useState(false);
  const [escalationCase, setEscalationCase] = useState<Investigation | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Apply dark theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleAssistant = () => {
    setIsAssistantOpen(prev => !prev);
  };

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_investigations`, JSON.stringify(investigations));
  }, [investigations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_recipes`, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_insights`, JSON.stringify(insights));
  }, [insights]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_activity`, JSON.stringify(activityLog));
  }, [activityLog]);

  const addActivityEvent = (event: Omit<ActivityEvent, 'id' | 'timestamp'>) => {
    const newEvent: ActivityEvent = {
      ...event,
      id: `ACT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Just now'
    };
    setActivityLog(prev => [newEvent, ...prev]);
  };

  const updateInvestigationStatus = (caseId: string, status: InvestigationStatus) => {
    setInvestigations(prev =>
      prev.map(item => (item.id === caseId ? { ...item, status, lastUpdated: 'Just now' } : item))
    );
  };

  const updateVariableMapping = (caseId: string, mapping: string) => {
    setInvestigations(prev =>
      prev.map(item =>
        item.id === caseId ? { ...item, currentVariableMapping: mapping, lastUpdated: 'Just now' } : item
      )
    );
    addActivityEvent({
      eventType: 'Mapping changed',
      caseOrRecipeId: caseId,
      description: `Variable {{1}} mapped to "${mapping}".`,
      outcome: 'Info'
    });
  };

  const completePrimaryVerification = (caseId: string) => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setInvestigations(prev =>
      prev.map(item => {
        if (item.id === caseId) {
          const verifiedPassport = {
            caseId: item.id,
            problemSummary: 'Required template variable {{1}} had no mapped contact attribute.',
            initialCampaignStatus: 'Action required',
            evidenceInspected: [
              'Meta WhatsApp template definition: Welcome_Offer_v2 (Approved)',
              'Variable parameters dictionary: {{1}} required in body text',
              'Campaign pre-flight validation status: Blocked'
            ],
            diagnosis: 'The template is approved, but variable {{1}} was unmapped. Verified mapping to "First name" resolves pre-flight blocking check.',
            recommendedAction: 'Map variable {{1}} to contact attribute "First name".',
            userCorrection: 'User mapped {{1}} -> First name and applied configuration in demo environment.',
            verificationChecks: [
              {
                check: 'Contact field schema binding verification',
                result: 'Variable {{1}} successfully bound to contact.first_name',
                passed: true
              },
              {
                check: 'Required fields completeness scan',
                result: '100% of required template parameters mapped (1 of 1)',
                passed: true
              },
              {
                check: 'Campaign pre-flight execution pipeline',
                result: 'All automated gatekeeper checks passed: Ready for review',
                passed: true
              }
            ],
            finalOutcome: 'Configuration verified. Campaign readiness check passed.',
            status: 'Resolved and verified' as InvestigationStatus,
            timestamp: now,
            verifiedAt: now,
            disclaimer: 'The verification covers the simulated configuration checks shown in this prototype. Message delivery has not been tested.'
          };

          return {
            ...item,
            status: 'Resolved and verified',
            lastUpdated: 'Just now',
            currentVariableMapping: 'first_name',
            resolutionPassport: verifiedPassport,
            diagnosticChecks: item.diagnosticChecks.map(chk => ({
              ...chk,
              status: 'passed',
              message: 'Check passed and confirmed in simulated environment.'
            }))
          };
        }
        return item;
      })
    );

    addActivityEvent({
      eventType: 'Verification completed',
      caseOrRecipeId: caseId,
      description: 'Pre-flight verification sequence successfully confirmed for Spring Welcome Campaign.',
      outcome: 'Success'
    });

    addActivityEvent({
      eventType: 'Resolution Passport generated',
      caseOrRecipeId: caseId,
      description: 'Resolution Passport sealed with verified status.',
      outcome: 'Success'
    });
  };

  const openEscalationModal = (investigation: Investigation) => {
    setEscalationCase(investigation);
    setIsEscalationModalOpen(true);
  };

  const closeEscalationModal = () => {
    setIsEscalationModalOpen(false);
    setEscalationCase(null);
  };

  const confirmEscalation = (caseId: string, reason: string): string => {
    const ticketId = `CS-${Math.floor(1000 + Math.random() * 9000)}`;
    setInvestigations(prev =>
      prev.map(item =>
        item.id === caseId
          ? {
              ...item,
              status: 'Escalated',
              humanSupportInvolved: true,
              ticketId,
              escalationReason: reason,
              lastUpdated: 'Just now'
            }
          : item
      )
    );

    addActivityEvent({
      eventType: 'Human handoff created',
      caseOrRecipeId: caseId,
      description: `Case escalated to Support Engineering. Simulated ticket ${ticketId} created.`,
      outcome: 'Escalated',
      metadata: { ticketId, reason }
    });

    return ticketId;
  };

  const updateRecipeStatus = (recipeId: string, newStatus: RecipeReviewStatus) => {
    setRecipes(prev =>
      prev.map(item =>
        item.id === recipeId
          ? { ...item, status: newStatus, lastReviewed: `Today by Demo Reviewer` }
          : item
      )
    );

    addActivityEvent({
      eventType: 'Recipe reviewed',
      caseOrRecipeId: recipeId,
      description: `Recipe status updated to "${newStatus}".`,
      outcome: newStatus === 'Approved for demo use' ? 'Success' : 'Warning'
    });
  };

  const updateInsightStatus = (insightId: string, newStatus: 'Active' | 'Under review' | 'Resolved') => {
    setInsights(prev =>
      prev.map(item => (item.id === insightId ? { ...item, status: newStatus } : item))
    );

    addActivityEvent({
      eventType: 'Insight reviewed',
      caseOrRecipeId: insightId,
      description: `Resolution insight "${insightId}" moved to "${newStatus}".`,
      outcome: 'Info'
    });
  };

  const resetDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_investigations`);
    localStorage.removeItem(`${STORAGE_KEY}_recipes`);
    localStorage.removeItem(`${STORAGE_KEY}_insights`);
    localStorage.removeItem(`${STORAGE_KEY}_activity`);
    setInvestigations(INITIAL_INVESTIGATIONS);
    setRecipes(INITIAL_RECIPES);
    setInsights(INITIAL_INSIGHTS);
    setActivityLog(INITIAL_ACTIVITY_LOG);
    setActiveInvestigationId(null);
    setActiveRecipeId(null);
    setCurrentRoute('overview');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        investigations,
        recipes,
        insights,
        activityLog,
        activeInvestigationId,
        activeRecipeId,
        currentRoute,
        isEscalationModalOpen,
        escalationCase,
        isAssistantOpen,
        toggleAssistant,
        setIsAssistantOpen,
        setCurrentRoute,
        setActiveInvestigationId,
        setActiveRecipeId,
        openEscalationModal,
        closeEscalationModal,
        confirmEscalation,
        updateInvestigationStatus,
        updateVariableMapping,
        completePrimaryVerification,
        updateRecipeStatus,
        updateInsightStatus,
        addActivityEvent,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
