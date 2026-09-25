import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  AlertOctagon, 
  CheckCircle2, 
  SlidersHorizontal,
  X,
  CreditCard
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import { MOCK_CASES } from '../../data/mockData';
import { RiskLevel, CaseStatus } from '../../types';

export const CasesPage: React.FC = () => {
  const { openCase } = useInvestigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredCases = useMemo(() => {
    return MOCK_CASES.filter(c => {
      const matchSearch =
        c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.customerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.transactionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.pattern.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRisk =
        selectedRisk === 'ALL' || c.riskLevel === selectedRisk;

      const matchStatus =
        selectedStatus === 'ALL' || c.status === selectedStatus;

      return matchSearch && matchRisk && matchStatus;
    });
  }, [searchTerm, selectedRisk, selectedStatus]);

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL':
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-coral-100/90 text-coral-700 border border-coral-200">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
            {risk}
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/90 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            MEDIUM
          </span>
        );
      case 'LOW':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sage-100/90 text-sage-800 border border-sage-200">
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
          <span className="text-xs font-medium text-charcoal-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
            Investigating
          </span>
        );
      case 'AWAITING_EVIDENCE':
        return (
          <span className="text-xs font-medium text-amber-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Awaiting Evidence
          </span>
        );
      case 'ESCALATED':
        return (
          <span className="text-xs font-medium text-coral-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
            Escalated
          </span>
        );
      case 'CLEARED':
      case 'RESOLVED':
        return (
          <span className="text-xs font-medium text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-sage-600" />
            Cleared
          </span>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 max-w-7xl mx-auto pb-16"
    >
      {/* Header Banner */}
      <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
            WORKSPACE REPOSITORY
          </span>
          <h2 className="text-2xl font-extrabold text-charcoal-800 tracking-tight">
            Fraud Investigation Cases
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Centralized registry of signals, graph investigations, and agent evaluations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-mono text-charcoal-700">
            Total Cases: <span className="font-bold">{MOCK_CASES.length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-stone-50 border border-stone-200/90 p-4 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search case, customer or transaction"
            className="w-full bg-stone-100/90 border border-stone-200 rounded-xl pl-9 pr-8 py-2 text-xs text-charcoal-800 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Risk & Status Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Risk Filter */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <span className="font-semibold text-[11px] text-stone-500 uppercase">Risk:</span>
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(risk => (
              <button
                key={risk}
                onClick={() => setSelectedRisk(risk)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedRisk === risk
                    ? 'bg-sage-700 text-stone-50 shadow-subtle'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-stone-300 hidden md:block" />

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <span className="font-semibold text-[11px] text-stone-500 uppercase">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1 text-[11px] text-charcoal-800 focus:outline-none focus:ring-1 focus:ring-sage-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="UNDER_INVESTIGATION">Under Investigation</option>
              <option value="AWAITING_EVIDENCE">Awaiting Evidence</option>
              <option value="ESCALATED">Escalated</option>
              <option value="CLEARED">Cleared</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Table */}
      <div className="rounded-3xl bg-stone-50 border border-stone-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200/80 bg-stone-100/50 text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                <th className="py-3 px-4">Case</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Pattern / Topology</th>
                <th className="py-3 px-4">Investigation Status</th>
                <th className="py-3 px-4 text-right">Updated</th>
                <th className="py-3 px-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/50 text-xs">
              {filteredCases.map(c => (
                <tr
                  key={c.id}
                  onClick={() => openCase(c.caseNumber)}
                  className="group hover:bg-stone-100/80 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-charcoal-800 group-hover:text-sage-800">
                    <div className="flex items-center gap-1.5">
                      <span>{c.caseNumber}</span>
                      {c.caseNumber === 'HH-1042' && (
                        <span className="text-[9px] font-sans px-1.5 py-0.2 rounded bg-coral-100 text-coral-700 font-semibold">
                          Active Focus
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-700">
                    {c.customerNumber}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-charcoal-800">
                    {c.formattedAmount}
                  </td>
                  <td className="py-3.5 px-4">
                    {getRiskBadge(c.riskLevel)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-charcoal-800 block">
                      {c.pattern}
                    </span>
                    <span className="text-[11px] text-stone-500 truncate block max-w-sm">
                      {c.patternDescription}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(c.status)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-stone-500 font-mono text-[11px]">
                    {c.updatedAt}
                  </td>
                  <td className="py-3.5 px-3 text-right text-stone-400 group-hover:text-sage-700 transition-colors">
                    <ChevronRight size={16} />
                  </td>
                </tr>
              ))}

              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-500">
                    <p className="text-sm font-semibold">No cases match your filters.</p>
                    <button
                      onClick={() => { setSearchTerm(''); setSelectedRisk('ALL'); setSelectedStatus('ALL'); }}
                      className="mt-2 text-xs font-semibold text-sage-700 underline"
                    >
                      Reset filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
