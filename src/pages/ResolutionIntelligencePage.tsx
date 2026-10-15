import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResolutionInsight } from '../types';
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Check,
  Clock,
  Layers,
  Info
} from 'lucide-react';

export const ResolutionIntelligencePage: React.FC = () => {
  const { insights, updateInsightStatus } = useApp();
  const [reviewedInsightId, setReviewedInsightId] = useState<string | null>(null);

  const handleMarkReview = (id: string) => {
    updateInsightStatus(id, 'Under review');
    setReviewedInsightId(id);
    setTimeout(() => setReviewedInsightId(null), 2500);
  };

  const getConfidenceBadge = (confidence: ResolutionInsight['confidenceLevel']) => {
    switch (confidence) {
      case 'High':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Medium':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Cautious':
      default:
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400">
              INTERNAL PRODUCT & SUPPORT INSIGHTS
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              SIMULATED EXAMPLE DATA
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Resolution Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Recurring support patterns reveal concrete opportunities to improve troubleshooting workflows and product usability.
          </p>
        </div>

        <div className="p-3 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900 text-indigo-900 dark:text-indigo-300 text-xs max-w-sm">
          <strong className="block font-semibold">Learning Loop Principle:</strong>
          Evidence collected during resolution assists product managers in identifying UI friction before users churn.
        </div>
      </div>

      {/* 3 Insight Cards */}
      <div className="grid grid-cols-1 gap-6">
        {insights.map(item => {
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {item.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item.category}</span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Impact: {item.impactArea}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getConfidenceBadge(
                      item.confidenceLevel
                    )}`}
                  >
                    Confidence: {item.confidenceLevel}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      item.status === 'Under review'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.pattern}
                </h3>
              </div>

              {/* 4-section Structured Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* 1. Observation */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 block">
                    Observed Pattern
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{item.observation}</p>
                </div>

                {/* 2. Telemetry In Demo */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 block">
                    Telemetry In Demo
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
                    {item.evidenceAvailable}
                  </p>
                </div>

                {/* 3. Possible Interpretation */}
                <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-blue-700 dark:text-blue-400 block">
                    Possible Interpretation
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    {item.possibleInterpretation}
                  </p>
                </div>

                {/* 4. Suggested Next Step */}
                <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-purple-700 dark:text-purple-400 block">
                    Product Recommendation
                  </span>
                  <p className="text-purple-950 dark:text-purple-200 font-semibold leading-relaxed">
                    {item.suggestedNextStep}
                  </p>
                </div>
              </div>

              {/* Footer action */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span>Linked Cases:</span>
                  {item.sampleCases.map(cId => (
                    <span
                      key={cId}
                      className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {cId}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleMarkReview(item.id)}
                  disabled={item.status === 'Under review'}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                    item.status === 'Under review'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                  }`}
                >
                  {reviewedInsightId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Status updated!</span>
                    </>
                  ) : item.status === 'Under review' ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Under review</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Mark for review</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
