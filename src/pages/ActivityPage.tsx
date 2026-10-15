import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowUpRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { ActivityEvent } from '../types';

export const ActivityPage: React.FC = () => {
  const { activityLog } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredLog = activityLog.filter(event => {
    if (selectedType === 'All') return true;
    return event.eventType === selectedType;
  });

  const getOutcomeBadge = (outcome: ActivityEvent['outcome']) => {
    switch (outcome) {
      case 'Success':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          icon: CheckCircle2
        };
      case 'Warning':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          icon: AlertTriangle
        };
      case 'Escalated':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
          icon: ArrowUpRight
        };
      case 'Info':
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800',
          icon: Info
        };
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
              TRACEABILITY & AUDITING
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Immutable Event Stream</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Activity Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Chronological audit trail of diagnostic checks, corrections applied, verifications, and escalations.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-xs text-xs transition-colors">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-transparent text-slate-700 dark:text-slate-300 font-medium focus:outline-hidden cursor-pointer"
          >
            <option value="All" className="dark:bg-slate-900">All Event Types</option>
            <option value="Investigation created" className="dark:bg-slate-900">Investigation created</option>
            <option value="Diagnostic check completed" className="dark:bg-slate-900">Diagnostic check completed</option>
            <option value="Mapping changed" className="dark:bg-slate-900">Mapping changed</option>
            <option value="Verification completed" className="dark:bg-slate-900">Verification completed</option>
            <option value="Resolution Passport generated" className="dark:bg-slate-900">Resolution Passport generated</option>
            <option value="Human handoff created" className="dark:bg-slate-900">Human handoff created</option>
            <option value="Recipe reviewed" className="dark:bg-slate-900">Recipe reviewed</option>
            <option value="Insight reviewed" className="dark:bg-slate-900">Insight reviewed</option>
          </select>
        </div>
      </div>

      {/* Audit List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredLog.length === 0 ? (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs">
              No activity events match your filter.
            </div>
          ) : (
            filteredLog.map(event => {
              const outcomeConfig = getOutcomeBadge(event.outcome);
              const Icon = outcomeConfig.icon;

              return (
                <div
                  key={event.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${outcomeConfig.bg}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{event.eventType}</span>
                        <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded border border-slate-200 dark:border-slate-700">
                          {event.caseOrRecipeId}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1">{event.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${outcomeConfig.bg}`}
                    >
                      {event.outcome}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px] min-w-[70px] text-right">
                      {event.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
