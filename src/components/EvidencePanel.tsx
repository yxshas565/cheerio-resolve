import React, { useState } from 'react';
import { EvidenceItem } from '../types';
import {
  FileCheck2,
  HelpCircle,
  Sparkles,
  User,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
  ExternalLink
} from 'lucide-react';

interface EvidencePanelProps {
  evidence: EvidenceItem[];
  title?: string;
  allowToggleDetails?: boolean;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  evidence,
  title = 'Inspectable Evidence Log',
  allowToggleDetails = true
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    if (!allowToggleDetails) return;
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getTypeBadge = (type: EvidenceItem['type']) => {
    switch (type) {
      case 'fact':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          dot: 'bg-emerald-500',
          label: 'OBSERVED FACT'
        };
      case 'recommendation':
        return {
          bg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
          dot: 'bg-indigo-500',
          label: 'RECOMMENDATION'
        };
      case 'user_action':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
          dot: 'bg-blue-500',
          label: 'USER ACTION'
        };
      case 'verification':
        return {
          bg: 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-800',
          dot: 'bg-teal-500',
          label: 'VERIFICATION RESULT'
        };
      case 'unknown':
      default:
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          dot: 'bg-amber-500',
          label: 'UNKNOWN / MISSING'
        };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      <div className="px-5 py-3.5 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">{title}</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
          {evidence.length} telemetry records
        </span>
      </div>

      {/* Distinction Header Legend */}
      <div className="px-5 py-2 bg-slate-100/60 dark:bg-slate-950/40 border-b border-slate-200/50 dark:border-slate-800 flex flex-wrap items-center gap-3 text-[10px] font-medium text-slate-600 dark:text-slate-400">
        <span className="text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Legend:</span>
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Observed Fact
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Recommendation
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Unknown / Missing Evidence
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {evidence.map(item => {
          const typeConfig = getTypeBadge(item.type);
          const isExpanded = !!expandedItems[item.id];

          return (
            <div
              key={item.id}
              className={`p-4 transition-colors ${
                isExpanded ? 'bg-slate-50/50 dark:bg-slate-800/40' : 'hover:bg-slate-50/30 dark:hover:bg-slate-800/20'
              }`}
            >
              <div
                className="flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider border shrink-0 ${typeConfig.bg}`}
                  >
                    <span className={`w-1 h-1 rounded-full ${typeConfig.dot}`} />
                    {typeConfig.label}
                  </span>
                  <div className="truncate">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{item.label}:</span>{' '}
                    <span className="text-xs font-mono font-medium text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200/60 dark:border-slate-700">
                      {item.value}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.timestamp && (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono hidden sm:inline">
                      {item.timestamp}
                    </span>
                  )}
                  {allowToggleDetails && item.description && (
                    <button
                      type="button"
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Expandable Technical Context */}
              {isExpanded && item.description && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 dark:border-slate-700 pl-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200/40 dark:border-slate-800">
                  <div className="flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <p>{item.description}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                        Source: Sandbox Telemetry Logger · Verification: Confirmed Fact
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
