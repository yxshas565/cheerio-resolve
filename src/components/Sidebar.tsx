import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  SearchCode,
  BookOpenCheck,
  Sparkles,
  History,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Layers
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentRoute, setCurrentRoute, investigations, recipes, resetDemoData } = useApp();

  const openCount = investigations.filter(i => i.status !== 'Resolved and verified').length;
  const verifiedCount = investigations.filter(i => i.status === 'Resolved and verified').length;

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'investigations',
      label: 'Investigations',
      icon: SearchCode,
      badge: openCount > 0 ? openCount : null
    },
    {
      id: 'fix-memory',
      label: 'Fix Memory',
      icon: BookOpenCheck,
      badge: recipes.length
    },
    {
      id: 'resolution-intelligence',
      label: 'Resolution Intelligence',
      icon: Sparkles,
      badge: '3 insights'
    },
    {
      id: 'activity',
      label: 'Activity Log',
      icon: History,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">CHEERIO</span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                RESOLVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">Evidence to resolution</p>
          </div>
        </div>

        {/* Demo Tag Notice */}
        <div className="mt-3.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold truncate">
            DEMO WORKSPACE · SIMULATED
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Core Workflows
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentRoute(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== null && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                    isActive
                      ? 'bg-indigo-700/90 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Guided Scenarios
        </div>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => {
              setCurrentRoute('investigations');
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 flex items-center justify-between"
          >
            <span className="truncate">Primary: Variable Fix</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </button>
          <button
            onClick={() => {
              setCurrentRoute('investigations');
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 flex items-center justify-between"
          >
            <span className="truncate">Edge: Pending Template</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </button>
          <button
            onClick={() => {
              setCurrentRoute('investigations');
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 flex items-center justify-between"
          >
            <span className="truncate">Edge: Gateway Insufficient</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </button>
        </div>
      </nav>

      {/* Footer / Reset Action */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/60">
        <div className="mb-2 px-2 py-2 rounded-lg bg-slate-800/40 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-slate-300">Deterministic Engine</div>
            <div className="text-[10px] text-slate-400 font-mono">100% Mock Safe</div>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.5 rounded font-mono">
            READY
          </span>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset prototype back to initial deterministic demonstration state?')) {
              resetDemoData();
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg border border-slate-800 hover:border-rose-900/40 transition-colors"
          title="Restore original sample data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo State</span>
        </button>
      </div>
    </aside>
  );
};
