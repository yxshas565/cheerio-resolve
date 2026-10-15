import React from 'react';
import { InvestigationStatus, RecipeReviewStatus } from '../types';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface StatusBadgeProps {
  status: InvestigationStatus | RecipeReviewStatus | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', className = '' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Resolved and verified':
      case 'Approved for demo use':
      case 'Resolved':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
          label: status
        };
      case 'Action required':
      case 'Needs attention':
      case 'Needs review':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dot: 'bg-amber-500',
          icon: AlertTriangle,
          label: status
        };
      case 'Investigating':
      case 'Under review':
      case 'Awaiting verification':
      case 'Awaiting status confirmation':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200/80',
          dot: 'bg-blue-500',
          icon: Clock,
          label: status
        };
      case 'Escalated':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
          dot: 'bg-rose-500',
          icon: ArrowUpRight,
          label: status
        };
      case 'Unable to verify':
      case 'Flagged for review':
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          dot: 'bg-slate-500',
          icon: HelpCircle,
          label: status
        };
      case 'New':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-500',
          icon: AlertCircle,
          label: status
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
          icon: ShieldCheck,
          label: status
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-colors ${config.bg} ${sizeClasses[size]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};
