import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { PrimaryInvestigationFlow } from '../components/PrimaryInvestigationFlow';
import { EdgeCaseInvestigation } from '../components/EdgeCaseInvestigation';
import { ResolutionPassportView } from '../components/ResolutionPassportView';
import {
  Search,
  Filter,
  Plus,
  ArrowRight,
  ShieldAlert,
  Clock,
  Sparkles,
  UserCheck,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { InvestigationStatus, IssueCategory } from '../types';

export const InvestigationsPage: React.FC = () => {
  const {
    investigations,
    activeInvestigationId,
    setActiveInvestigationId,
    setCurrentRoute
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<IssueCategory>('Campaign readiness');
  const [newCampaignName, setNewCampaignName] = useState('Autumn Special Promotion');

  // If an active investigation is selected, render the corresponding detail view
  if (activeInvestigationId) {
    const activeInv = investigations.find(i => i.id === activeInvestigationId);
    if (activeInv) {
      if (activeInv.id === 'INV-4092') {
        return (
          <PrimaryInvestigationFlow
            onBack={() => setActiveInvestigationId(null)}
          />
        );
      } else if (activeInv.isEdgeCase) {
        return (
          <EdgeCaseInvestigation
            investigation={activeInv}
            onBack={() => setActiveInvestigationId(null)}
          />
        );
      } else if (activeInv.resolutionPassport) {
        return (
          <ResolutionPassportView
            passport={activeInv.resolutionPassport}
            onBackToInvestigation={() => setActiveInvestigationId(null)}
            onViewAuditEvents={() => setCurrentRoute('activity')}
          />
        );
      }
    }
  }

  // Filtered investigations list
  const filteredInvestigations = investigations.filter(inv => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' || inv.status === selectedStatus;

    const matchesCategory =
      selectedCategory === 'All' || inv.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Support Investigations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track problems from the first diagnostic check to the verified final outcome.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Start investigation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between transition-colors">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by case ID, campaign, or error keyword..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-transparent text-slate-700 dark:text-slate-300 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="All" className="dark:bg-slate-900">All Statuses</option>
              <option value="New" className="dark:bg-slate-900">New</option>
              <option value="Investigating" className="dark:bg-slate-900">Investigating</option>
              <option value="Action required" className="dark:bg-slate-900">Action required</option>
              <option value="Awaiting verification" className="dark:bg-slate-900">Awaiting verification</option>
              <option value="Resolved and verified" className="dark:bg-slate-900">Resolved and verified</option>
              <option value="Escalated" className="dark:bg-slate-900">Escalated</option>
              <option value="Unable to verify" className="dark:bg-slate-900">Unable to verify</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg text-xs">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-transparent text-slate-700 dark:text-slate-300 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="All" className="dark:bg-slate-900">All Categories</option>
              <option value="Campaign readiness" className="dark:bg-slate-900">Campaign readiness</option>
              <option value="Template status" className="dark:bg-slate-900">Template status</option>
              <option value="Contact mapping" className="dark:bg-slate-900">Contact mapping</option>
              <option value="Provider delivery" className="dark:bg-slate-900">Provider delivery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Investigations Table / List */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Campaign & Issue Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredInvestigations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    No investigations match your filters.
                  </td>
                </tr>
              ) : (
                filteredInvestigations.map(inv => (
                  <tr
                    key={inv.id}
                    onClick={() => setActiveInvestigationId(inv.id)}
                    className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-700 dark:text-indigo-400">
                      {inv.id}
                    </td>

                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {inv.campaignName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {inv.title}
                      </div>
                      {inv.humanSupportInvolved && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.2 rounded border border-rose-200 dark:border-rose-800 font-mono">
                          <UserCheck className="w-3 h-3" /> Human Escalated: #{inv.ticketId}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px]">
                        {inv.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={inv.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 truncate">
                      {inv.owner}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                      {inv.lastUpdated}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setActiveInvestigationId(inv.id);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 dark:group-hover:text-indigo-300"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Start New Investigation Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 transition-colors">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Start New Support Investigation</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select an issue category to launch a simulated guided diagnostic.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Campaign Title:</label>
                <input
                  type="text"
                  value={newCampaignName}
                  onChange={e => setNewCampaignName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Issue Category:</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as IssueCategory)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  <option value="Campaign readiness">Campaign readiness (Variable token mapping)</option>
                  <option value="Template status">Template status (Pending Meta review)</option>
                  <option value="Provider delivery">Provider delivery (Gateway telemetry error)</option>
                  <option value="Contact mapping">Contact mapping (E.164 phone formatting)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsNewModalOpen(false);
                  if (newCategory === 'Template status') {
                    setActiveInvestigationId('INV-3881');
                  } else if (newCategory === 'Provider delivery') {
                    setActiveInvestigationId('INV-3914');
                  } else {
                    setActiveInvestigationId('INV-4092');
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
              >
                Launch Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
