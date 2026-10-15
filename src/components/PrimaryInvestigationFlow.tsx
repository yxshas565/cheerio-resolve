import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from './StatusBadge';
import { EvidencePanel } from './EvidencePanel';
import { ResolutionPassportView } from './ResolutionPassportView';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info,
  HelpCircle,
  UserCheck,
  ArrowRight,
  Check,
  CheckCheck,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PrimaryInvestigationFlowProps {
  onBack: () => void;
}

export const PrimaryInvestigationFlow: React.FC<PrimaryInvestigationFlowProps> = ({ onBack }) => {
  const {
    investigations,
    updateVariableMapping,
    completePrimaryVerification,
    openEscalationModal,
    setCurrentRoute
  } = useApp();

  const primaryCase = investigations.find(i => i.id === 'INV-4092') || investigations[0];

  // Journey steps: 'understand' | 'diagnosing' | 'inspect' | 'correct' | 'verifying' | 'verified' | 'passport'
  const isInitiallyVerified = primaryCase.status === 'Resolved and verified';
  const [phase, setPhase] = useState<
    'understand' | 'diagnosing' | 'inspect' | 'correct' | 'verifying' | 'verified' | 'passport'
  >(isInitiallyVerified ? 'verified' : 'understand');

  // Diagnostic checks animation state
  const [checkProgress, setCheckProgress] = useState<number>(0);

  // Correction form state
  const [selectedAttribute, setSelectedAttribute] = useState<string>(
    primaryCase.currentVariableMapping === 'first_name' ? 'First name' : 'No mapping'
  );
  const [isValidated, setIsValidated] = useState(
    primaryCase.currentVariableMapping === 'first_name'
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  // Verification checks sequence animation state
  const [verifyStep, setVerifyStep] = useState<number>(0);

  // Why are we recommending this expandable toggle
  const [showWhyRecommend, setShowWhyRecommend] = useState(false);

  // Run Diagnostic Sequence
  const handleRunDiagnostic = () => {
    setPhase('diagnosing');
    setCheckProgress(1);

    setTimeout(() => {
      setCheckProgress(2);
    }, 600);

    setTimeout(() => {
      setCheckProgress(3);
    }, 1200);

    setTimeout(() => {
      setPhase('inspect');
    }, 1700);
  };

  // Validate Mapping
  const handleValidateMapping = () => {
    if (selectedAttribute === 'First name') {
      setIsValidated(true);
      setValidationError(null);
    } else {
      setIsValidated(false);
      setValidationError(
        'Variable {{1}} is used for greeting recipient. Please map to "First name" or a compatible textual name field.'
      );
    }
  };

  // Apply Configuration and Run Verification
  const handleApplyAndVerify = () => {
    updateVariableMapping(primaryCase.id, 'first_name');
    setPhase('verifying');
    setVerifyStep(1);

    setTimeout(() => {
      setVerifyStep(2);
    }, 700);

    setTimeout(() => {
      setVerifyStep(3);
    }, 1400);

    setTimeout(() => {
      completePrimaryVerification(primaryCase.id);
      setPhase('verified');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // graceful fallback if canvas not available
      }
    }, 2100);
  };

  if (phase === 'passport' && primaryCase.resolutionPassport) {
    return (
      <ResolutionPassportView
        passport={primaryCase.resolutionPassport}
        onBackToInvestigation={() => setPhase('verified')}
        onViewAuditEvents={() => setCurrentRoute('activity')}
      />
    );
  }

  // 6-step Journey Stages
  const journeyStages = [
    { id: 'understand', label: '1. Understand', short: 'Goal' },
    { id: 'inspect', label: '2. Inspect', short: 'Telemetry' },
    { id: 'guide', label: '3. Guide', short: 'Rule' },
    { id: 'correct', label: '4. Correct', short: 'Mapping' },
    { id: 'verify', label: '5. Verify', short: 'Gatekeeper' },
    { id: 'preserve', label: '6. Preserve', short: 'Passport' }
  ];

  const getStageStatus = (stageId: string) => {
    if (phase === 'verified' || phase === 'passport') return 'completed';
    if (stageId === 'understand') return phase === 'understand' || phase === 'diagnosing' ? 'active' : 'completed';
    if (stageId === 'inspect') return phase === 'inspect' ? 'active' : phase === 'correct' || phase === 'verifying' ? 'completed' : 'future';
    if (stageId === 'guide') return phase === 'inspect' ? 'active' : phase === 'correct' || phase === 'verifying' ? 'completed' : 'future';
    if (stageId === 'correct') return phase === 'correct' ? 'active' : phase === 'verifying' ? 'completed' : 'future';
    if (stageId === 'verify') return phase === 'verifying' ? 'active' : 'future';
    if (stageId === 'preserve') return 'future';
    return 'future';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fade-in">
      {/* Top Navigation Strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Investigations</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">{primaryCase.id}</span>
          <StatusBadge status={primaryCase.status} />
        </div>
      </div>

      {/* Primary Investigation Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                CAMPAIGN READINESS INVESTIGATION
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Template: {primaryCase.templateName}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Let's fix your campaign.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              We'll check the available information, guide you through the next step, and verify the result.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => openEscalationModal(primaryCase)}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50/50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Request Human Help</span>
            </button>
          </div>
        </div>

        {/* SIGNATURE 6-STAGE CONNECTED TIMELINE */}
        <div className="pt-5 overflow-x-auto">
          <div className="min-w-[620px] flex items-center justify-between relative">
            {journeyStages.map((stg, idx) => {
              const status = getStageStatus(stg.id);
              const isCompleted = status === 'completed';
              const isActive = status === 'active';

              return (
                <div key={stg.id} className="flex-1 flex flex-col items-center relative group">
                  {/* Connective Line Between Nodes */}
                  {idx > 0 && (
                    <div
                      className={`absolute top-4 -left-1/2 w-full h-0.5 transition-colors ${
                        isCompleted
                          ? 'bg-emerald-500 dark:bg-emerald-600'
                          : isActive
                          ? 'bg-indigo-400 dark:bg-indigo-600'
                          : 'bg-slate-200 dark:bg-slate-800'
                      }`}
                    />
                  )}

                  {/* Stage Node Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all relative z-10 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-xs shadow-emerald-500/30'
                        : isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 ring-4 ring-indigo-100 dark:ring-indigo-950/70'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      idx + 1
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-2 text-center">
                    <span
                      className={`text-[11px] block transition-colors ${
                        isActive
                          ? 'font-bold text-indigo-600 dark:text-indigo-400'
                          : isCompleted
                          ? 'font-semibold text-slate-800 dark:text-slate-200'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {stg.label}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono hidden sm:block">
                      {isCompleted ? 'Passed' : isActive ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PHASE 1: UNDERSTAND & RUN DIAGNOSTIC */}
      {(phase === 'understand' || phase === 'diagnosing') && (
        <div className="space-y-6">
          {/* User Goal Card */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 block font-bold">
                USER GOAL
              </span>
              <p className="text-sm font-semibold text-white mt-1">
                {primaryCase.userGoal}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 font-medium">
                Blocked at Pre-flight
              </span>
            </div>
          </div>

          {/* Inspectable Evidence Panel */}
          <EvidencePanel evidence={primaryCase.initialEvidence} />

          {/* Diagnostic Action Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs text-center space-y-4 transition-colors">
            <div className="max-w-md mx-auto">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ready to execute diagnostic pipeline
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Resolve will query the WhatsApp template definition, inspect personalization parameter bounds, and evaluate campaign launch requirements.
              </p>
            </div>

            {phase === 'diagnosing' ? (
              <div className="max-w-sm mx-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  <span>Executing deterministic checks...</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">1. Checking template status</span>
                    {checkProgress >= 1 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono">
                        <Check className="w-3.5 h-3.5" /> Approved
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono">Running...</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">2. Checking variable configuration</span>
                    {checkProgress >= 2 ? (
                      <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 font-mono">
                        <AlertTriangle className="w-3.5 h-3.5" /> Missing
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono">Waiting...</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">3. Checking campaign readiness</span>
                    {checkProgress >= 3 ? (
                      <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1 font-mono">
                        <AlertTriangle className="w-3.5 h-3.5" /> Blocked
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono">Waiting...</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleRunDiagnostic}
                className="px-6 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Run diagnostic check</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* PHASE 2: INSPECT & GUIDE DIAGNOSIS STATE */}
      {phase === 'inspect' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/60 shadow-xs space-y-4 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-800 dark:text-amber-300 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-amber-950 dark:text-amber-200">We found something to fix.</h3>
                <p className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
                  The template is approved, but a required personalization variable has no matching contact attribute. The available demo evidence supports correcting the field mapping before continuing.
                </p>
              </div>
            </div>

            {/* What we checked: Distinct Facts vs Recommendation */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-amber-200/80 dark:border-slate-800 space-y-3 transition-colors">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                What we checked
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    OBSERVED FACT
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    WhatsApp template <strong>Welcome_Offer_v2</strong> status is <strong>Approved</strong> by Meta.
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    OBSERVED FACT
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    Variable <strong>{'{{1}}'}</strong> is currently unmapped in campaign draft parameters.
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    OBSERVED FACT
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    Pre-flight validation engine requires all template tokens to resolve to non-empty audience attributes.
                  </span>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                    RECOMMENDATION
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    Map variable <strong>{'{{1}}'}</strong> to contact attribute <strong>First name</strong>.
                  </span>
                </div>
              </div>

              {/* Expandable: Why are we recommending this? */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowWhyRecommend(!showWhyRecommend)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Why are we recommending this?</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      showWhyRecommend ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {showWhyRecommend && (
                  <div className="mt-2 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-950 dark:text-indigo-300 space-y-1">
                    <p>
                      The template text opens with: <em>"Hi, {'{{1}}'}! Your welcome offer is ready."</em>
                    </p>
                    <p className="text-[11px] text-indigo-800 dark:text-indigo-400">
                      Based on semantic token placement and customer schema analysis, mapping this to <strong>First name</strong> satisfies the required parameter check and ensures message formatting conforms to WhatsApp template specifications.
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                      Boundary note: This recommendation applies strictly to simulated configuration readiness. It does not warrant external Meta delivery guarantees.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPhase('correct')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <span>Review and correct mapping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: CORRECT STATE */}
      {phase === 'correct' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6 transition-colors">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Configure Template Variable Mapping
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select the contact attribute to inject into token {'{{1}}'} during campaign execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Column */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Template Variable:
                </label>
                <div className="text-xs font-mono font-bold px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200">
                  {'{{1}}'} (Header Greeting Token)
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Contact Attribute:
                </label>
                <select
                  value={selectedAttribute}
                  onChange={e => {
                    setSelectedAttribute(e.target.value);
                    setIsValidated(false);
                  }}
                  className="w-full text-xs font-medium p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="No mapping">No mapping (Current / Unconfigured)</option>
                  <option value="First name">First name (Recommended)</option>
                  <option value="Last name">Last name</option>
                  <option value="Email address">Email address</option>
                  <option value="Phone number">Phone number</option>
                </select>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  Schema source: Cheerio Audience CRM dictionary
                </p>
              </div>

              {validationError && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <span>{validationError}</span>
                </div>
              )}

              {isValidated && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Mapping Validated Deterministically</span>
                    <span className="text-[11px]">
                      Field type match: String → Parameter format confirmed.
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleValidateMapping}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Validate mapping
                </button>

                <button
                  type="button"
                  disabled={!isValidated}
                  onClick={handleApplyAndVerify}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    isValidated
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span>Apply configuration in demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Realistic Preview Column */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between transition-colors">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    SIMULATED MESSAGE PREVIEW
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                    NOT A REAL MESSAGE
                  </span>
                </div>

                {/* WhatsApp simulated chat bubble */}
                <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                      W
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Cheerio Bot</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">10:45 AM</span>
                  </div>

                  <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                    {selectedAttribute === 'First name' ? (
                      <span>
                        Hi, <strong className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1 py-0.5 rounded">Alex</strong>! Your welcome offer is ready. Use promo code <strong>SPRING26</strong> for 20% off your first reservation.
                      </span>
                    ) : selectedAttribute === 'No mapping' ? (
                      <span className="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1 py-0.5 rounded font-mono">
                        Hi, [MISSING VARIABLE]! Your welcome offer is ready...
                      </span>
                    ) : (
                      <span>
                        Hi, <strong className="text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">[{selectedAttribute}]</strong>! Your welcome offer is ready.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-400 dark:text-slate-500">
                Sample preview rendered using simulated test contact: <em>Alex Rivera</em>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 4: VERIFYING PROGRESS SEQUENCE */}
      {phase === 'verifying' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs text-center space-y-6 transition-colors">
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Executing Verification Sequence
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Re-checking configuration constraints and pre-flight gatekeeper checks.
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300">1. Rechecking variable mapping</span>
              {verifyStep >= 1 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-4 h-4" /> FIRST_NAME
                </span>
              ) : (
                <span className="text-slate-400 font-mono">Evaluating...</span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300">2. Checking required fields completeness</span>
              {verifyStep >= 2 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-4 h-4" /> 100% COMPLETE
                </span>
              ) : (
                <span className="text-slate-400 font-mono">Waiting...</span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300">3. Rechecking campaign readiness</span>
              {verifyStep >= 3 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-4 h-4" /> PASSED
                </span>
              ) : (
                <span className="text-slate-400 font-mono">Waiting...</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PHASE 5: VERIFIED SUCCESS STATE */}
      {phase === 'verified' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 p-6 sm:p-8 shadow-xs space-y-5 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-emerald-800 dark:text-emerald-300 uppercase">
                      VERIFICATION SUCCESSFUL
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400">·</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">Status: Ready for review</span>
                  </div>
                  <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-200 mt-0.5">
                    Configuration verified.
                  </h2>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => setPhase('passport')}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span>View Resolution Passport</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
              The required field mapping is now valid and the simulated campaign readiness check has passed.
            </p>

            {/* Checklist Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-800">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-mono block">Template Status</span>
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Approved</span>
              </div>
              <div className="p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-800">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-mono block">Variable Mapping</span>
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Valid ({'{{1}}'} → First name)</span>
              </div>
              <div className="p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-800">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-mono block">Campaign Readiness</span>
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Ready for review</span>
              </div>
            </div>

            {/* Important Boundary Clarification */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="font-semibold">Important clarification:</strong> This confirms the simulated configuration checks only. It does not prove that a live campaign has been sent or that any message has been delivered.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-200/80 dark:border-emerald-800/80">
              <button
                onClick={onBack}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
              >
                Return to workspace
              </button>

              <button
                onClick={() => setPhase('passport')}
                className="px-5 py-2.5 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-xs flex items-center gap-2"
              >
                <span>Open Resolution Passport</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
