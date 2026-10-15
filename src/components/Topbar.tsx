import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Info,
  Menu,
  Sun,
  Moon,
  Sparkles,
  Bot
} from 'lucide-react';

interface TopbarProps {
  onToggleMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileMenu }) => {
  const { currentRoute, investigations, theme, toggleTheme, toggleAssistant, isAssistantOpen } = useApp();

  const getPageTitle = () => {
    switch (currentRoute) {
      case 'overview':
        return 'Resolve Workspace';
      case 'investigations':
        return 'Support Investigations';
      case 'fix-memory':
        return 'Verified Fix Memory';
      case 'resolution-intelligence':
        return 'Resolution Intelligence';
      case 'activity':
        return 'Audit & Traceability Log';
      default:
        return 'Resolve Workspace';
    }
  };

  const pendingEscalations = investigations.filter(i => i.status === 'Escalated').length;

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-xs transition-colors">
      <div className="flex items-center gap-3 sm:gap-4">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            {getPageTitle()}
            <span className="hidden sm:inline-flex text-[11px] font-normal px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Cheerio Sandbox
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Environment banner indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs">
          <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span className="font-medium">Simulated Data Environment</span>
          <span className="text-amber-600/70 dark:text-amber-400/60">· Zero Live Message Risk</span>
        </div>

        {/* Global Action Badge */}
        {pendingEscalations > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>{pendingEscalations} Escalated</span>
          </div>
        )}

        {/* Theme Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label="Toggle theme mode"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-slate-600" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* Quick Assistant Toggle */}
        <button
          onClick={toggleAssistant}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
            isAssistantOpen
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
              : 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
          }`}
          title="Open Resolve Intelligence Assistant"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask Resolve</span>
        </button>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5 sm:mx-1" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
            AR
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">Alex Rivera</div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500">Marketing Ops Lead</div>
          </div>
        </div>
      </div>
    </header>
  );
};
