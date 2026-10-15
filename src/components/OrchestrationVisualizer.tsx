import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileSearch,
  CheckCircle2,
  Cpu,
  Brain,
  Lightbulb,
  ShieldCheck,
  BookOpenCheck,
  UserCheck,
  Info,
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';

export type OrchestrationNodeId =
  | 'user_context'
  | 'evidence_inspector'
  | 'deterministic_checks'
  | 'ai_interpretation'
  | 'action_guidance'
  | 'verification_engine'
  | 'resolution_passport'
  | 'fix_memory'
  | 'human_escalation';

interface NodeDetail {
  id: OrchestrationNodeId;
  title: string;
  role: string;
  input: string;
  output: string;
  limitations: string;
  currentStatus: 'Idle' | 'Active' | 'Completed' | 'Blocked' | 'Needs attention' | 'Escalated';
  details: string;
}

export const OrchestrationVisualizer: React.FC = () => {
  const {
    investigations,
    activeInvestigationId,
    setActiveInvestigationId,
    setCurrentRoute,
    openEscalationModal
  } = useApp();

  const [selectedNode, setSelectedNode] = useState<OrchestrationNodeId | null>('evidence_inspector');

  // Derive dynamic state based on primary case INV-4092 or active selected case
  const primaryCase = investigations.find(i => i.id === 'INV-4092') || investigations[0];
  const isVerified = primaryCase.status === 'Resolved and verified';
  const isEscalated = investigations.some(i => i.status === 'Escalated');

  // Node details dictionary
  const nodeDetails: Record<OrchestrationNodeId, NodeDetail> = {
    user_context: {
      id: 'user_context',
      title: 'User Context',
      role: 'Captures user objective, campaign draft parameters, and audience scope.',
      input: 'Spring Welcome Campaign draft payload & user goal description.',
      output: 'Normalized problem envelope: Blocked pre-flight dispatch status.',
      limitations: 'Relies on accurate client workspace configuration state.',
      currentStatus: isVerified ? 'Completed' : 'Active',
      details: 'Evaluates campaign intention before inspecting lower-level protocol errors.'
    },
    evidence_inspector: {
      id: 'evidence_inspector',
      title: 'Evidence Inspector',
      role: 'Collects and categorizes raw telemetry without speculative inference.',
      input: 'Meta WhatsApp template review status, variable parameter array {{1}}, contact schema.',
      output: '4 immutable evidence telemetry items classified as Observed Facts vs Unknowns.',
      limitations: 'Only indexes telemetry available through sandbox provider webhooks.',
      currentStatus: 'Completed',
      details: 'Separates confirmed facts (Approved template, unmapped {{1}}) from hypotheses.'
    },
    deterministic_checks: {
      id: 'deterministic_checks',
      title: 'Deterministic Checks',
      role: 'Executes rule-based gatekeeper algorithms without probabilistic guesswork.',
      input: 'Template schema requirements vs campaign attribute binding dictionary.',
      output: 'Pre-flight check failure: Token {{1}} requires non-null contact attribute binding.',
      limitations: 'Binary policy evaluator; cannot invent new business schema mappings.',
      currentStatus: isVerified ? 'Completed' : 'Needs attention',
      details: 'Runs sequential automated passes: Template status -> Token bindings -> Campaign readiness.'
    },
    ai_interpretation: {
      id: 'ai_interpretation',
      title: 'AI Interpretation',
      role: 'Controlled language assistance that explains diagnostics in human terms.',
      input: 'Structured check findings and template greeting token context.',
      output: 'Human-readable explanation: {{1}} appears in greeting; First name recommended.',
      limitations: 'Never independently authorizes changes or executes mutations without confirmation.',
      currentStatus: isVerified ? 'Completed' : 'Active',
      details: 'Assists nontechnical users with semantic understanding while keeping boundaries explicit.'
    },
    action_guidance: {
      id: 'action_guidance',
      title: 'Action Guidance',
      role: 'Provides an interactive, validated correction UI with live message preview.',
      input: 'Available CRM contact attributes (First name, Last name, Email, Phone).',
      output: 'Validated mapping candidate: {{1}} -> First name.',
      limitations: 'Requires explicit human confirmation to apply changes to simulated configuration.',
      currentStatus: isVerified ? 'Completed' : 'Active',
      details: 'Ensures the user observes the exact impact on the WhatsApp preview bubble before applying.'
    },
    verification_engine: {
      id: 'verification_engine',
      title: 'Verification Engine',
      role: 'Re-runs gatekeeper pre-flight pipeline against the newly applied configuration.',
      input: 'Updated campaign configuration with {{1}} bound to First name.',
      output: isVerified ? '3 of 3 verification passes confirmed: Ready for review.' : 'Awaiting user correction submission.',
      limitations: 'Validates configuration readiness only; does not claim message has been delivered to handsets.',
      currentStatus: isVerified ? 'Completed' : 'Idle',
      details: 'Enforces the core principle: An applied setting is not verified until proven by automated check.'
    },
    resolution_passport: {
      id: 'resolution_passport',
      title: 'Resolution Passport',
      role: 'Seals an immutable, auditable certificate of the entire investigation lifecycle.',
      input: 'Inspected evidence, diagnosis, user correction, and verification checklist.',
      output: isVerified ? 'Sealed Resolution Passport (Case INV-4092, Hash: SHA256-8F02).' : 'Draft audit record in progress.',
      limitations: 'Captures the sandbox audit boundary; scopes out post-launch handset delivery.',
      currentStatus: isVerified ? 'Completed' : 'Idle',
      details: 'Gives support and engineering a structured, complete record without reading transcripts.'
    },
    fix_memory: {
      id: 'fix_memory',
      title: 'Fix Memory',
      role: 'Submits verified procedures for human peer review as reusable troubleshooting knowledge.',
      input: 'Repeated variable mapping resolution outcome and applicability criteria.',
      output: 'Recipe REC-101 (Approved for demo use).',
      limitations: 'Never auto-approves a recipe after one case; explicit human governance required.',
      currentStatus: isVerified ? 'Completed' : 'Active',
      details: 'Ensures support teams build institutional memory from verified individual cases.'
    },
    human_escalation: {
      id: 'human_escalation',
      title: 'Human Escalation',
      role: 'Zero-loss contextual handoff when telemetry is missing or contradictory.',
      input: 'Truncated gateway logs, failed automated classification, user objective.',
      output: 'Pre-filled Level 2 Support Ticket (#CS-xxxx) with full telemetry attached.',
      limitations: 'Invoked only when automated deterministic certainty is impossible.',
      currentStatus: isEscalated ? 'Escalated' : 'Idle',
      details: 'Prevents unsafe guessing by preparing structured dossiers for support engineers.'
    }
  };

  const activeNodeInfo = selectedNode ? nodeDetails[selectedNode] : nodeDetails.evidence_inspector;

  const getNodeStatusBadge = (status: NodeDetail['currentStatus']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Active':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 animate-pulse';
      case 'Needs attention':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Escalated':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Blocked':
        return 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'Idle':
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const handleLaunchPrimary = () => {
    setActiveInvestigationId('INV-4092');
    setCurrentRoute('investigations');
  };

  const handleLaunchEscalationDemo = () => {
    const escCase = investigations.find(i => i.id === 'INV-3914') || investigations[2];
    openEscalationModal(escCase);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      {/* Visualizer Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              SIGNATURE ORCHESTRATION ENGINE
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Live State Sync: {primaryCase.status}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Resolve Intelligent Diagnostic Orchestration
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Click any node below to inspect its role, telemetry inputs, gatekeeper boundaries, and real-time state.
          </p>
        </div>

        {/* Live Quick Actions */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {!isVerified ? (
            <button
              onClick={handleLaunchPrimary}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Step through Primary Flow</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pipeline Verified
              </span>
              <button
                onClick={handleLaunchPrimary}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Inspect Passport
              </button>
            </div>
          )}

          <button
            onClick={handleLaunchEscalationDemo}
            className="px-3 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-800 rounded-xl transition-colors flex items-center gap-1"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Handoff Path</span>
          </button>
        </div>
      </div>

      {/* Main Orchestration Canvas */}
      <div className="p-4 sm:p-6 lg:p-8 bg-slate-50/70 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
        <div className="min-w-[780px] max-w-5xl mx-auto space-y-6">
          {/* Main Primary Flow Stream */}
          <div className="relative">
            {/* Background SVG Connective Flow Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ overflow: 'visible' }}
            >
              <line
                x1="8%"
                y1="50%"
                x2="92%"
                y2="50%"
                className="stroke-slate-200 dark:stroke-slate-800 stroke-[2]"
              />
              <line
                x1="8%"
                y1="50%"
                x2={isVerified ? '92%' : '50%'}
                y2="50%"
                className="stroke-indigo-500/60 dark:stroke-indigo-400/60 stroke-[2] animate-flow-dash"
              />
            </svg>

            <div className="grid grid-cols-7 gap-3 relative z-10 items-stretch">
              {/* 1. User Context */}
              <button
                onClick={() => setSelectedNode('user_context')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  selectedNode === 'user_context'
                    ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                    <FileSearch className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                    1. User Context
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Campaign draft & goal envelope
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border block text-center ${getNodeStatusBadge(nodeDetails.user_context.currentStatus)}`}>
                    {nodeDetails.user_context.currentStatus}
                  </span>
                </div>
              </button>

              {/* 2. Evidence Inspector */}
              <button
                onClick={() => setSelectedNode('evidence_inspector')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  selectedNode === 'evidence_inspector'
                    ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                    2. Evidence Inspector
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Observed facts vs unknown state
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border block text-center ${getNodeStatusBadge(nodeDetails.evidence_inspector.currentStatus)}`}>
                    {nodeDetails.evidence_inspector.currentStatus}
                  </span>
                </div>
              </button>

              {/* 3. Deterministic Checks */}
              <button
                onClick={() => setSelectedNode('deterministic_checks')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  selectedNode === 'deterministic_checks'
                    ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                    3. Rule Engine
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Deterministic gatekeeper checks
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border block text-center ${getNodeStatusBadge(nodeDetails.deterministic_checks.currentStatus)}`}>
                    {nodeDetails.deterministic_checks.currentStatus}
                  </span>
                </div>
              </button>

              {/* 4. AI Interpretation */}
              <button
                onClick={() => setSelectedNode('ai_interpretation')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  selectedNode === 'ai_interpretation'
                    ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                    4. AI Assist
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Non-authoritative explanation
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border block text-center ${getNodeStatusBadge(nodeDetails.ai_interpretation.currentStatus)}`}>
                    {nodeDetails.ai_interpretation.currentStatus}
                  </span>
                </div>
              </button>

              {/* 5. Action Guidance */}
              <button
                onClick={() => setSelectedNode('action_guidance')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  selectedNode === 'action_guidance'
                    ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                    5. Guided Fix
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Mapping form & preview
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border block text-center ${getNodeStatusBadge(nodeDetails.action_guidance.currentStatus)}`}>
                    {nodeDetails.action_guidance.currentStatus}
                  </span>
                </div>
              </button>

              {/* 6. Verification Engine */}
              <button
                onClick={() => setSelectedNode('verification_engine')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  selectedNode === 'verification_engine'
                    ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                    6. Verification
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Automated post-fix validation
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border block text-center ${getNodeStatusBadge(nodeDetails.verification_engine.currentStatus)}`}>
                    {nodeDetails.verification_engine.currentStatus}
                  </span>
                </div>
              </button>

              {/* 7. Resolution Passport */}
              <button
                onClick={() => setSelectedNode('resolution_passport')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  selectedNode === 'resolution_passport'
                    ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                    7. Passport
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Immutable case certificate
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border block text-center ${getNodeStatusBadge(nodeDetails.resolution_passport.currentStatus)}`}>
                    {nodeDetails.resolution_passport.currentStatus}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Secondary Dual Loop Branches: Fix Memory Learning & Human Escalation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Fix Memory Knowledge Loop Branch */}
            <button
              onClick={() => setSelectedNode('fix_memory')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                selectedNode === 'fix_memory'
                  ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-sm ring-2 ring-indigo-500/10'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <BookOpenCheck className="w-4 h-4" />
              </div>
              <div className="grow min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    8. Verified Fix Memory Loop
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${getNodeStatusBadge(nodeDetails.fix_memory.currentStatus)}`}>
                    {nodeDetails.fix_memory.currentStatus}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Proposes verified resolutions as reusable troubleshooting recipes, subject to explicit human review.
                </p>
              </div>
            </button>

            {/* Safe Boundary & Human Escalation Branch */}
            <button
              onClick={() => setSelectedNode('human_escalation')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                selectedNode === 'human_escalation'
                  ? 'bg-white dark:bg-slate-800 border-rose-500 shadow-sm ring-2 ring-rose-500/10'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="grow min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    9. Contextual Human Handoff Path
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${getNodeStatusBadge(nodeDetails.human_escalation.currentStatus)}`}>
                    {nodeDetails.human_escalation.currentStatus}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  When provider telemetry is missing or contradictory, halts speculative guesses and generates zero-loss dossier.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Node Inspector Drawer / Popover Detail */}
      {activeNodeInfo && (
        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 animate-fade-in transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  NODE INSPECTION: {activeNodeInfo.id.toUpperCase()}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{activeNodeInfo.role}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {activeNodeInfo.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold border ${getNodeStatusBadge(activeNodeInfo.currentStatus)}`}>
                State: {activeNodeInfo.currentStatus}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] block">
                Telemetry Input
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-mono text-[11px] leading-relaxed">
                {activeNodeInfo.input}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] block">
                Deterministic Output
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-mono text-[11px] leading-relaxed">
                {activeNodeInfo.output}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
                Safe Boundary & Limitations
              </span>
              <p className="text-amber-900 dark:text-amber-300 text-[11px] leading-relaxed">
                {activeNodeInfo.limitations}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
