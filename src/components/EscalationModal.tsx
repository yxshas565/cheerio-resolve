import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  X,
  UserCheck,
  Send,
  FileText,
  CheckCircle2,
  HelpCircle,
  Copy,
  ArrowRight
} from 'lucide-react';

export const EscalationModal: React.FC = () => {
  const { isEscalationModalOpen, escalationCase, closeEscalationModal, confirmEscalation } = useApp();
  const [reason, setReason] = useState<string>('Unresolvable telemetry gap in provider delivery logs.');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isEscalationModalOpen || !escalationCase) return null;

  const handleConfirm = () => {
    const tId = confirmEscalation(escalationCase.id, reason);
    setCreatedTicketId(tId);
    setIsConfirmed(true);
  };

  const handleCopy = () => {
    if (createdTicketId) {
      navigator.clipboard.writeText(`Ticket ${createdTicketId} | Case ${escalationCase.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh] transition-colors">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Let's get the right person involved</h3>
              <p className="text-xs text-slate-300">
                Your investigation details are pre-compiled so you do not have to start over.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsConfirmed(false);
              closeEscalationModal();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {!isConfirmed ? (
            <>
              {/* Notice */}
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 flex gap-3 text-amber-900 dark:text-amber-300">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <span className="font-semibold">Safe Resolution Policy:</span> When diagnostic evidence is incomplete or ambiguous, Cheerio Resolve explicitly declines to speculate and compiles a verified handoff dossier for Level 2 support engineering.
                </div>
              </div>

              {/* Dossier Summary Card */}
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Compiled Handoff Dossier
                  </span>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                    Case: {escalationCase.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Affected Campaign:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{escalationCase.campaignName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Category:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{escalationCase.category}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">User's Goal:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{escalationCase.userGoal}</span>
                  </div>
                </div>

                {/* Inspected Evidence */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Evidence Checked ({escalationCase.initialEvidence.length} items):
                  </span>
                  <div className="space-y-1">
                    {escalationCase.initialEvidence.map(ev => (
                      <div
                        key={ev.id}
                        className="text-xs bg-white dark:bg-slate-900 p-2 rounded border border-slate-200/80 dark:border-slate-700 flex items-start justify-between"
                      >
                        <div>
                          <span className="font-medium text-slate-800 dark:text-slate-200">{ev.label}:</span>{' '}
                          <span className="text-slate-600 dark:text-slate-400">{ev.value}</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {ev.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Information / Reason */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    Handoff Justification / Missing Information:
                  </label>
                  <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    rows={2}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                    placeholder="Describe what additional telemetry or administrative action is required..."
                  />
                </div>
              </div>
            </>
          ) : (
            /* Success confirmation */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Simulated Escalation Dispatched</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  A high-priority diagnostic ticket has been generated in the simulated support queue with full evidence attached.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-sm text-slate-800 dark:text-slate-200 font-bold">
                <span>Ticket Ref: #{createdTicketId}</span>
                <button
                  onClick={handleCopy}
                  className="p-1 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded"
                  title="Copy reference"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {copied && <span className="text-xs font-sans text-emerald-600 dark:text-emerald-400 font-medium">Copied!</span>}
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-slate-500 dark:text-slate-400 text-xs text-left border border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Audit Record Established:</p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  <li>Case {escalationCase.id} status transitioned to <strong className="text-rose-600 dark:text-rose-400">Escalated</strong></li>
                  <li>Diagnostic payload sealed with zero data loss</li>
                  <li>Activity Log updated for organizational review</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Demo Prototype · Simulated Support API
          </div>
          <div className="flex items-center gap-2">
            {!isConfirmed ? (
              <>
                <button
                  onClick={() => closeEscalationModal()}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm Demo Escalation</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsConfirmed(false);
                  closeEscalationModal();
                }}
                className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
              >
                Close & Return
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
