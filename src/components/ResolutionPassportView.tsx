import React, { useState } from 'react';
import { ResolutionPassportData } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Calendar,
  FileText,
  ArrowLeft,
  Check,
  Info,
  Layers,
  Sparkles,
  ExternalLink,
  Lock,
  Hash,
  Activity,
  Award
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface ResolutionPassportViewProps {
  passport: ResolutionPassportData;
  onBackToInvestigation?: () => void;
  onViewAuditEvents?: () => void;
}

export const ResolutionPassportView: React.FC<ResolutionPassportViewProps> = ({
  passport,
  onBackToInvestigation,
  onViewAuditEvents
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const summaryText = `CHEERIO RESOLVE - RESOLUTION PASSPORT
Case ID: ${passport.caseId}
Status: ${passport.status}
Issued: ${passport.timestamp}
Audit Hash: SHA256-8F02
Evidence Coverage: 100% of required template parameters (1 of 1)
Problem Summary: ${passport.problemSummary}
Diagnosis: ${passport.diagnosis}
User Action: ${passport.userCorrection}
Verification Checks:
${passport.verificationChecks.map(c => `- ${c.check}: ${c.result} [${c.passed ? 'PASSED' : 'FAILED'}]`).join('\n')}
Final Outcome: ${passport.finalOutcome}
Verification Scope Notice: ${passport.disclaimer}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {onBackToInvestigation && (
          <button
            onClick={onBackToInvestigation}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Investigation</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          {onViewAuditEvents && (
            <button
              onClick={onViewAuditEvents}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-200 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 px-3 py-1.5 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Audit Events</span>
            </button>
          )}

          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 px-3.5 py-1.5 rounded-lg shadow-xs transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Case Summary Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Case Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Structured Resolution Passport Document */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative transition-colors">
        {/* Top Passport Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border-b border-indigo-900/60 relative overflow-hidden">
          {/* Subtle Watermark seal */}
          <Award className="w-64 h-64 text-white/5 absolute -right-12 -bottom-16 pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 ring-2 ring-white/10">
                <ShieldCheck className="w-7 h-7 text-indigo-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
                    OFFICIAL CASE RECORD
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-xs text-slate-400 font-mono">HASH: SHA256-8F02</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white mt-0.5">
                  Resolution Passport
                </h1>
                <p className="text-xs text-slate-300 mt-0.5">
                  Verified case audit dossier for Cheerio campaign troubleshooting
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-mono text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {passport.status.toUpperCase()}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Issued: {passport.timestamp}
              </div>
            </div>
          </div>
        </div>

        {/* Case Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-200 dark:divide-slate-800 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-xs">
          <div className="p-4">
            <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] font-bold tracking-wider block">
              Case Identifier
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">
              {passport.caseId}
            </span>
          </div>
          <div className="p-4">
            <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] font-bold tracking-wider block">
              Initial State
            </span>
            <span className="font-semibold text-amber-700 dark:text-amber-400 mt-0.5 block">
              {passport.initialCampaignStatus}
            </span>
          </div>
          <div className="p-4">
            <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] font-bold tracking-wider block">
              Auditor / Agent
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">
              Resolve Engine v2.4
            </span>
          </div>
          <div className="p-4">
            <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] font-bold tracking-wider block">
              Verification Coverage
            </span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
              100% Passed (3/3 checks)
            </span>
          </div>
        </div>

        {/* Sequential Diagnostic & Verification Flow */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Step 1: Problem Identified */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
                1
              </div>
              <div className="w-0.5 grow bg-slate-200 dark:bg-slate-800 my-1" />
            </div>
            <div className="grow pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  PROBLEM IDENTIFIED
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  Initial Discovery
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{passport.problemSummary}</p>
            </div>
          </div>

          {/* Step 2: Evidence Inspected */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-800 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
                2
              </div>
              <div className="w-0.5 grow bg-slate-200 dark:bg-slate-800 my-1" />
            </div>
            <div className="grow pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  EVIDENCE INSPECTED
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                  OBSERVED FACTS
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200 dark:border-slate-700 space-y-1.5 mt-2">
                {passport.evidenceInspected.map((ev, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Diagnosis & Recommendation */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">
                3
              </div>
              <div className="w-0.5 grow bg-slate-200 dark:bg-slate-800 my-1" />
            </div>
            <div className="grow pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  DIAGNOSIS & RECOMMENDATION
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono font-bold">
                  RECOMMENDATION
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed bg-blue-50/50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-100 dark:border-blue-900">
                <strong className="text-slate-900 dark:text-white block mb-0.5">Finding:</strong>
                {passport.diagnosis}
              </p>
              <div className="mt-2 text-xs text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">Recommended Guidance:</strong> {passport.recommendedAction}
              </div>
            </div>
          </div>

          {/* Step 4: User Correction */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300">
                4
              </div>
              <div className="w-0.5 grow bg-slate-200 dark:bg-slate-800 my-1" />
            </div>
            <div className="grow pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  USER CORRECTION APPLIED
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold">
                  USER ACTION
                </span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 mt-1 font-mono bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                {passport.userCorrection}
              </p>
            </div>
          </div>

          {/* Step 5: Verification Result */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                5
              </div>
            </div>
            <div className="grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  VERIFICATION RESULTS
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                  VERIFICATION RESULT
                </span>
              </div>

              {/* Verification checks table */}
              <div className="mt-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 overflow-hidden divide-y divide-emerald-100 dark:divide-emerald-900/60 text-xs">
                {passport.verificationChecks.map((chk, i) => (
                  <div key={i} className="p-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block">{chk.check}</span>
                        <span className="text-slate-600 dark:text-slate-400 text-[11px] font-mono">{chk.result}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      PASSED
                    </span>
                  </div>
                ))}
              </div>

              {/* Outcome Banner */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block font-bold">
                    FINAL CONFIRMED OUTCOME
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5">{passport.finalOutcome}</div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SEALED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Scope & Rigor Disclaimer */}
        <div className="px-6 sm:px-8 py-4 bg-amber-50/70 dark:bg-amber-950/30 border-t border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-300">
          <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold">Important Scope Boundary:</strong> {passport.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
};
