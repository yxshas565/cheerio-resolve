import React, { useState } from 'react';
import { Investigation } from '../types';
import { useApp } from '../context/AppContext';
import { StatusBadge } from './StatusBadge';
import { EvidencePanel } from './EvidencePanel';
import {
  ArrowLeft,
  Clock,
  HelpCircle,
  AlertTriangle,
  UserCheck,
  ShieldAlert,
  Info,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface EdgeCaseInvestigationProps {
  investigation: Investigation;
  onBack: () => void;
}

export const EdgeCaseInvestigation: React.FC<EdgeCaseInvestigationProps> = ({
  investigation,
  onBack
}) => {
  const { openEscalationModal } = useApp();
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [simulatedRefresh, setSimulatedRefresh] = useState(false);

  const isPendingTemplate = investigation.isEdgeCase === 'pending_template';

  const handleRefreshCheck = () => {
    setSimulatedRefresh(true);
    setTimeout(() => {
      setSimulatedRefresh(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fade-in">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Investigations</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">{investigation.id}</span>
          <StatusBadge status={investigation.status} />
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {isPendingTemplate ? 'EDGE CASE: PENDING ASYNC STATE' : 'EDGE CASE: INSUFFICIENT EVIDENCE'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Campaign: {investigation.campaignName}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              {isPendingTemplate ? 'WhatsApp Template Status Pending' : 'Campaign Failed with Insufficient Telemetry'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {isPendingTemplate
                ? 'Template is awaiting external review. Cheerio Resolve explicitly avoids guessing approval times or recommending premature resubmissions.'
                : 'Upstream gateway returned contradictory logs. Cheerio Resolve declines to guess and prepares a structured support handoff.'}
            </p>
          </div>

          <button
            onClick={() => openEscalationModal(investigation)}
            className="shrink-0 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Prepare for human support</span>
          </button>
        </div>

        {/* User Goal Context */}
        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 dark:text-slate-500 font-semibold block text-[10px] uppercase tracking-wider">
              Target Objective:
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{investigation.userGoal}</span>
          </div>
          <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">
            Owner: {investigation.owner}
          </span>
        </div>
      </div>

      {/* Structured Evidence Section */}
      <EvidencePanel
        evidence={investigation.initialEvidence}
        title={
          isPendingTemplate
            ? 'Observed Facts vs Unknown External Queue'
            : 'Available Provider Logs vs Missing Payload'
        }
      />

      {/* Case-specific Logic Panel */}
      {isPendingTemplate ? (
        /* SCENARIO 5: TEMPLATE PENDING LOGIC */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5 transition-colors">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Distinguishing Known Facts from Assumptions
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Meta's WhatsApp Business review pipeline operates asynchronously. A pending template does not mean it is rejected or defective.
              </p>
            </div>
          </div>

          {/* Known vs Unknown Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Observed Facts (Confirmed)</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                <li>Template was successfully submitted 2.5 hours ago.</li>
                <li>Webhook listener confirms status is currently <strong>Pending Review</strong>.</li>
                <li>Zero policy violation flags or rejection codes have been received.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
                <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Unknown / Safe Boundary</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                <li>Exact completion minute cannot be predicted (SLA up to 24-48h).</li>
                <li>External queue velocity depends on Meta regional review load.</li>
                <li>System will not speculate on approval probability.</li>
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefreshCheck}
                disabled={simulatedRefresh}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${simulatedRefresh ? 'animate-spin' : ''}`} />
                <span>{simulatedRefresh ? 'Querying Webhook...' : 'View current status'}</span>
              </button>

              <button
                onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Review troubleshooting guidance</span>
              </button>
            </div>

            <button
              onClick={() => openEscalationModal(investigation)}
              className="px-4 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-lg border border-rose-200 dark:border-rose-800 transition-colors"
            >
              Request human help
            </button>
          </div>

          {/* Expandable Troubleshooting Guidance */}
          {showTroubleshooting && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2 animate-fade-in">
              <span className="font-bold text-slate-900 dark:text-white block">Recommended Safe Procedure:</span>
              <p className="text-slate-600 dark:text-slate-300">
                1. <strong>Do not submit duplicate templates:</strong> Submitting identical templates creates duplicate review queues and can reset approval timestamps.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                2. <strong>Prepare draft audience:</strong> You can continue configuring segmentation tags while the template review finishes in the background.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                3. <strong>Set automated alert:</strong> Cheerio Resolve will log an Activity Event the instant Meta's webhook changes to <em>Approved</em> or <em>Rejected</em>.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* SCENARIO 6: INSUFFICIENT EVIDENCE LOGIC */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5 transition-colors">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-700 dark:text-rose-300 shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                We cannot confirm the cause yet.
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The available information is insufficient to recommend a reliable correction. We will not guess.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] block">
              Missing Evidence Catalog
            </span>
            <div className="space-y-2">
              <div className="flex items-start gap-2 bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-700">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200">Missing Subcode:</strong> Upstream gateway terminated connection with HTTP 502 Bad Gateway without returning nested Meta JSON error body.
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-700">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200">Ambiguous Cause:</strong> Telemetry cannot conclusively differentiate between provider rate throttling and transient network socket reset.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-300 flex items-start justify-between gap-4">
            <div>
              <strong className="block font-semibold">Zero-speculation Handoff Protocol:</strong>
              <p className="mt-0.5 text-indigo-800 dark:text-indigo-300">
                Rather than suggesting unverified configuration edits that could corrupt campaign settings, Resolve compiles the exact error trace into a Level 2 support ticket.
              </p>
            </div>
            <button
              onClick={() => openEscalationModal(investigation)}
              className="shrink-0 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
            >
              Open Handoff
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
