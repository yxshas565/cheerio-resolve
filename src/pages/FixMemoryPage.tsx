import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { FixRecipe, RecipeReviewStatus } from '../types';
import {
  BookOpenCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flag,
  ArrowRight,
  ShieldCheck,
  Layers,
  Info,
  Check,
  X,
  UserCheck,
  Sparkles,
  GitBranch
} from 'lucide-react';

export const FixMemoryPage: React.FC = () => {
  const { recipes, updateRecipeStatus } = useApp();
  const [selectedRecipe, setSelectedRecipe] = useState<FixRecipe | null>(recipes[0]);
  const [confirmModalAction, setConfirmModalAction] = useState<{
    recipeId: string;
    newStatus: RecipeReviewStatus;
  } | null>(null);

  const handleActionClick = (recipeId: string, newStatus: RecipeReviewStatus) => {
    setConfirmModalAction({ recipeId, newStatus });
  };

  const handleConfirmStatusChange = () => {
    if (confirmModalAction) {
      updateRecipeStatus(confirmModalAction.recipeId, confirmModalAction.newStatus);
      if (selectedRecipe && selectedRecipe.id === confirmModalAction.recipeId) {
        setSelectedRecipe({
          ...selectedRecipe,
          status: confirmModalAction.newStatus,
          lastReviewed: 'Today by Demo Reviewer'
        });
      }
      setConfirmModalAction(null);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
              KNOWLEDGE CURATION & GOVERNANCE
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Simulated Library</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Verified Fix Memory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Reusable troubleshooting procedures reviewed for accuracy, applicability, and safety.
          </p>
        </div>

        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-xs max-w-sm">
          <strong className="block font-semibold">Governance Principle:</strong>
          A single successful case does not automatically make a procedure trusted. Fix recipes require explicit human review.
        </div>
      </div>

      {/* SIGNATURE KNOWLEDGE LOOP EXPLANATION PANEL */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs transition-colors">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            How Resolve learns from verified outcomes
          </h3>
        </div>

        {/* 5-Stage Learning Loop Micro Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block font-bold">STAGE 1</span>
            <strong className="text-slate-800 dark:text-slate-200 block">Verified Case</strong>
            <p className="text-[10px] text-slate-500">Case INV-4092 clears pre-flight gatekeeper</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block font-bold">STAGE 2</span>
            <strong className="text-slate-800 dark:text-slate-200 block">Candidate Recipe</strong>
            <p className="text-[10px] text-slate-500">System extracts conditions and telemetry requirements</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-amber-600 block font-bold">STAGE 3</span>
            <strong className="text-amber-900 dark:text-amber-200 block">Human Review</strong>
            <p className="text-[10px] text-amber-700 dark:text-amber-400">Support lead validates procedure safety</p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-emerald-600 block font-bold">STAGE 4</span>
            <strong className="text-emerald-900 dark:text-emerald-200 block">Approved Recipe</strong>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-400">Recipe REC-101 published to Fix Memory</p>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-indigo-600 block font-bold">STAGE 5</span>
            <strong className="text-indigo-900 dark:text-indigo-200 block">Future Case Match</strong>
            <p className="text-[10px] text-indigo-700 dark:text-indigo-400">Instantly available for matching issues</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recipe List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Curated Procedures ({recipes.length})
          </div>

          <div className="space-y-3">
            {recipes.map(recipe => {
              const isSelected = selectedRecipe?.id === recipe.id;
              return (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                      {recipe.id}
                    </span>
                    <StatusBadge status={recipe.status} size="sm" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                    {recipe.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span>{recipe.category}</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                      {recipe.successRateDemo} success rate
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Recipe Details & Review Actions (7 cols) */}
        {selectedRecipe && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {selectedRecipe.id}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{selectedRecipe.category}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {selectedRecipe.name}
                </h2>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  Last review: {selectedRecipe.lastReviewed}
                </div>
              </div>

              <StatusBadge status={selectedRecipe.status} />
            </div>

            {/* Problem Conditions */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] block">
                Trigger & Problem Conditions
              </span>
              <ul className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                {selectedRecipe.problemConditions.map((cond, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Evidence */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] block">
                Required Diagnostic Evidence
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedRecipe.requiredEvidence.map((ev, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
                  >
                    {ev}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Procedure */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] block">
                Deterministic Troubleshooting Sequence
              </span>
              <div className="space-y-1.5">
                {selectedRecipe.recommendedProcedure.map((step, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 flex items-start gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <span className="font-mono font-bold text-indigo-700 dark:text-indigo-400 shrink-0">
                      0{i + 1}.
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Result Expectation */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
                <span>Expected Verification Result</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-900 dark:text-emerald-300">
                {selectedRecipe.expectedVerificationResult}
              </p>
            </div>

            {/* Known Limitations */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4" />
                <span>Known Limitations & Boundary Rules</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-900 dark:text-amber-300">
                {selectedRecipe.knownLimitations.map((lim, i) => (
                  <li key={i}>{lim}</li>
                ))}
              </ul>
            </div>

            {/* Explicit Human Review Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Governance Review Actions
                </span>
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  Simulated Human Review
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    handleActionClick(selectedRecipe.id, 'Approved for demo use')
                  }
                  className="px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve for demo use</span>
                </button>

                <button
                  onClick={() =>
                    handleActionClick(selectedRecipe.id, 'Needs review')
                  }
                  className="px-3.5 py-2 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Request revision</span>
                </button>

                <button
                  onClick={() =>
                    handleActionClick(selectedRecipe.id, 'Flagged for review')
                  }
                  className="px-3.5 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Flag for review</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog Modal */}
      {confirmModalAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 max-w-sm w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Confirm Governance State Transition
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to transition procedure <strong>{confirmModalAction.recipeId}</strong> to <strong>"{confirmModalAction.newStatus}"</strong>? An audit record will be logged.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setConfirmModalAction(null)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStatusChange}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
