import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  X,
  Send,
  HelpCircle,
  FileCheck2,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickAction?: {
    label: string;
    action: () => void;
  };
}

export const ResolveAssistantDrawer: React.FC = () => {
  const {
    isAssistantOpen,
    toggleAssistant,
    investigations,
    activeInvestigationId,
    setActiveInvestigationId,
    setCurrentRoute,
    currentRoute,
    openEscalationModal
  } = useApp();

  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Derive active case
  const primaryCase = investigations.find(i => i.id === (activeInvestigationId || 'INV-4092')) || investigations[0];
  const isVerified = primaryCase.status === 'Resolved and verified';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I am Resolve Intelligence. I'm connected to your active simulated case (${primaryCase.id}: "${primaryCase.campaignName}"). How can I clarify our telemetry findings, validation rules, or verification boundaries?`,
      timestamp: 'Just now'
    }
  ]);

  const suggestedPrompts = [
    'Explain this diagnosis.',
    'What evidence supports this recommendation?',
    'What should I do next?',
    "Why can't this issue be verified?",
    'When should a human step in?',
    'Show me the Resolution Passport.'
  ];

  const handleSendPrompt = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: questionText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsTyping(true);

    // Contextual deterministic response generator
    setTimeout(() => {
      let replyText = '';
      let actionObj: { label: string; action: () => void } | undefined = undefined;

      const q = questionText.toLowerCase();

      if (q.includes('explain') || q.includes('diagnosis')) {
        replyText = `The template "Welcome_Offer_v2" is Meta-approved, but variable {{1}} was detected with "Not configured" mapping. Because {{1}} sits in the opening greeting ("Hi, {{1}}!"), pre-flight rule checking halts campaign readiness until it binds to a valid recipient attribute.`;
      } else if (q.includes('evidence') || q.includes('support')) {
        replyText = `Our Evidence Inspector recorded 4 telemetry facts: Template Status is Approved, parameter {{1}} is required, mapping is missing, and campaign readiness is blocked. We do not speculate beyond these verified payload records.`;
        actionObj = {
          label: 'View Case Evidence',
          action: () => {
            setActiveInvestigationId(primaryCase.id);
            setCurrentRoute('investigations');
          }
        };
      } else if (q.includes('what should i do') || q.includes('next')) {
        if (!isVerified) {
          replyText = `Step into the Guided Correction flow: select "First name" in the contact attribute dropdown, run deterministic validation, and apply the configuration to trigger automated verification.`;
          actionObj = {
            label: 'Start Guided Correction',
            action: () => {
              setActiveInvestigationId('INV-4092');
              setCurrentRoute('investigations');
            }
          };
        } else {
          replyText = `The primary case is already verified! All 3 pre-flight checks passed. You can inspect the Resolution Passport or review our curated Fix Memory procedures.`;
          actionObj = {
            label: 'Open Resolution Passport',
            action: () => {
              setActiveInvestigationId('INV-4092');
              setCurrentRoute('investigations');
            }
          };
        }
      } else if (q.includes("can't") || q.includes('insufficient') || q.includes('verify')) {
        replyText = `When provider telemetry is missing or contradictory (like case INV-3914 with truncated HTTP 502 headers), Resolve refuses to guess. Instead of suggesting ungrounded fixes, we preserve the exact error log and initiate human escalation.`;
      } else if (q.includes('human') || q.includes('escalat')) {
        replyText = `Human escalation is initiated whenever telemetry is incomplete, when external provider policies require manual account appeal, or upon explicit user request. Case details and evidence are pre-compiled into a Level 2 ticket dossier with zero repeated questions.`;
        actionObj = {
          label: 'Open Escalation Modal',
          action: () => openEscalationModal(primaryCase)
        };
      } else if (q.includes('passport')) {
        replyText = `The Resolution Passport serves as an official, immutable record containing problem summary, inspected evidence, user action, and automated check results (SHA256-8F02). It is designed to be shared with technical leads without reading chat transcripts.`;
        actionObj = {
          label: 'Inspect Resolution Passport',
          action: () => {
            setActiveInvestigationId('INV-4092');
            setCurrentRoute('investigations');
          }
        };
      } else {
        replyText = `Based on the current sandbox context (${primaryCase.id}), Resolve operates deterministically: we inspect confirmed telemetry, guide parameter corrections, verify outcomes through automated gatekeepers, and escalate when evidence is insufficient.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        quickAction: actionObj
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Assistant Trigger Launcher (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleAssistant}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all hover:scale-105 active:scale-95"
          aria-label="Ask Resolve Intelligence"
          title="Ask Resolve"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-bold tracking-tight">Ask Resolve</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-1 right-1" />
        </button>
      </div>

      {/* Slide-over Contextual Drawer Panel */}
      {isAssistantOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={toggleAssistant}
          />

          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col h-full z-10 animate-fade-in transition-colors">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
                  <Sparkles className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">Resolve Intelligence</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                      Context Aware
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Deterministic assistance for Case {primaryCase.id}
                  </p>
                </div>
              </div>

              <button
                onClick={toggleAssistant}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Case Snapshot Pill */}
            <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="truncate">
                <span className="text-slate-400 dark:text-slate-500 font-mono text-[10px]">CASE:</span>{' '}
                <span className="font-semibold text-slate-800 dark:text-slate-200">{primaryCase.campaignName}</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                isVerified ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
              }`}>
                {primaryCase.status}
              </span>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {msg.text}

                    {msg.quickAction && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => {
                            msg.quickAction?.action();
                            toggleAssistant();
                          }}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <span>{msg.quickAction.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs w-24">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Suggested Prompts Grid */}
            <div className="p-3 bg-slate-50/80 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
                Suggested Contextual Questions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendPrompt(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendPrompt(inputQuestion);
              }}
              className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about this diagnosis, evidence, or next step..."
                value={inputQuestion}
                onChange={e => setInputQuestion(e.target.value)}
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!inputQuestion.trim()}
                className={`p-2.5 rounded-xl transition-all ${
                  inputQuestion.trim()
                    ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
                aria-label="Send Question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
