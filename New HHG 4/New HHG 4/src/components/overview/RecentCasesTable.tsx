import React from 'react';
import { ArrowRight, ChevronRight, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import { MOCK_CASES } from '../../data/mockData';
import { RiskLevel, CaseStatus } from '../../types';

export const RecentCasesTable: React.FC = () => {
  const { openCase, setCurrentTab } = useInvestigation();
  const recentCases = MOCK_CASES.slice(0, 6);

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL':
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-100/90 text-coral-700 border border-coral-200">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
            {risk}
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/90 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            MEDIUM
          </span>
        );
      case 'LOW':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sage-100/90 text-sage-800 border border-sage-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
            LOW
          </span>
        );
    }
  };

  const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'UNDER_INVESTIGATION':
        return (
          <span className="text-[11px] font-medium text-charcoal-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
            Investigating
          </span>
        );
      case 'AWAITING_EVIDENCE':
        return (
          <span className="text-[11px] font-medium text-amber-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Awaiting Evidence
          </span>
        );
      case 'ESCALATED':
        return (
          <span className="text-[11px] font-medium text-coral-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
            Escalated
          </span>
        );
      case 'CLEARED':
      case 'RESOLVED':
        return (
          <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-sage-600" />
            Cleared
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 shadow-subtle">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200/70">
        <div>
          <h3 className="text-sm font-bold text-charcoal-800">Recent Priority Cases</h3>
          <p className="text-[11px] text-stone-500">Autonomous signals queued for review</p>
        </div>

        <button
          onClick={() => setCurrentTab('CASES')}
          className="text-xs font-semibold text-sage-700 hover:text-sage-800 flex items-center gap-1 hover:underline"
        >
          <span>View All 12 Cases</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse mt-2">
          <thead>
            <tr className="border-b border-stone-200/60 text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
              <th className="py-2.5 px-3">Case</th>
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Risk</th>
              <th className="py-2.5 px-3">Pattern</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Updated</th>
              <th className="py-2.5 px-2 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/40 text-xs">
            {recentCases.map(c => (
              <tr
                key={c.id}
                onClick={() => openCase(c.caseNumber)}
                className="group hover:bg-stone-100/70 transition-colors cursor-pointer"
              >
                <td className="py-3 px-3 font-mono font-bold text-charcoal-800 group-hover:text-sage-800 flex items-center gap-1.5">
                  <span>{c.caseNumber}</span>
                  {c.caseNumber === 'HH-1042' && (
                    <span className="text-[9px] font-sans px-1 py-0.2 rounded bg-coral-100 text-coral-700 font-medium">Focus</span>
                  )}
                </td>
                <td className="py-3 px-3 font-mono text-stone-700">
                  {c.customerNumber}
                </td>
                <td className="py-3 px-3">
                  {getRiskBadge(c.riskLevel)}
                </td>
                <td className="py-3 px-3 font-medium text-charcoal-700 max-w-xs truncate">
                  {c.pattern}
                </td>
                <td className="py-3 px-3">
                  {getStatusBadge(c.status)}
                </td>
                <td className="py-3 px-3 text-right text-stone-500 font-mono text-[11px]">
                  {c.updatedAt}
                </td>
                <td className="py-3 px-2 text-right text-stone-400 group-hover:text-sage-700 transition-colors">
                  <ChevronRight size={14} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
