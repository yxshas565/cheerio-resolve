import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { OrchestrationVisualizer } from '../components/OrchestrationVisualizer';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  BookOpenCheck,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const { investigations, setCurrentRoute, setActiveInvestigationId } = useApp();

  const openCount = investigations.filter(i => i.status !== 'Resolved and verified').length;

  const handleStartInvestigation = () => {
    setActiveInvestigationId('INV-4092');
    setCurrentRoute('investigations');
  };

  const handleOpenCase = (id: string) => {
    setActiveInvestigationId(id);
    setCurrentRoute('investigations');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 animate-fade-in">
      {/* Header Greeting Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evidence-First Troubleshooting</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Good morning.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
              Let's get your work moving again.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentRoute('investigations')}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
            >
              View open investigations ({openCount})
            </button>
            <button
              onClick={handleStartInvestigation}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-500/20 flex items-center gap-2 group"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start an investigation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Core Principles Pill Banner */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
            <span>
              <strong className="text-slate-800 dark:text-slate-200">An answer is not a resolution:</strong> We inspect telemetry first.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>
              <strong className="text-slate-800 dark:text-slate-200">Recommendation is not proof:</strong> Every fix must be verified.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>
              <strong className="text-slate-800 dark:text-slate-200">Safe Boundaries:</strong> Never guess when evidence is missing.
            </span>
          </div>
        </div>
      </div>

      {/* SIGNATURE ENHANCEMENT: Orchestration Engine Visualizer */}
      <OrchestrationVisualizer />

      {/* Summary Metrics Row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            System Pulse · Simulated Sample Data
          </span>
          <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">DEMO SNAPSHOT</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Open investigations</span>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">12</span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">sample cases</span>
            </div>
            <div className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              3 need user action
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Resolved today</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">28</span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">verified in demo</span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              100% passports generated
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Awaiting human help</span>
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">3</span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">escalated queue</span>
            </div>
            <div className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
              Zero-loss handoffs
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Verified fix recipes</span>
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">16</span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">curated procedures</span>
            </div>
            <div className="mt-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
              Human reviewed & trusted
            </div>
          </div>
        </div>
      </div>

      {/* Pick up where you left off */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Pick up where you left off</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active simulated campaign troubleshooting cases</p>
          </div>
          <button
            onClick={() => setCurrentRoute('investigations')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View all cases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {investigations.slice(0, 3).map(inv => (
            <div
              key={inv.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                    {inv.id}
                  </span>
                  <StatusBadge status={inv.status} size="sm" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {inv.campaignName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {inv.title}
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Category: {inv.category}</span>
                  <span>{inv.lastUpdated}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleOpenCase(inv.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 text-slate-700 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 border border-slate-200/80 dark:border-slate-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors"
                >
                  <span>Open Investigation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
