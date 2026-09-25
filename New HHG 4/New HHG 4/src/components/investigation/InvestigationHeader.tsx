import React from 'react';
import { 
  AlertOctagon, 
  ArrowLeft, 
  CreditCard, 
  User, 
  Hash, 
  Share2, 
  FileText,
  Clock
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const InvestigationHeader: React.FC = () => {
  const { selectedCase, setCurrentTab } = useInvestigation();

  return (
    <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-5 shadow-subtle mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Back button + Case Number & Risk Pill */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentTab('OVERVIEW')}
            className="p-2 rounded-xl text-stone-600 hover:text-charcoal-800 hover:bg-stone-200/60 transition-colors"
            title="Return to Overview"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                ACTIVE CASE
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-coral-100 text-coral-700 border border-coral-200">
                <AlertOctagon size={12} />
                {selectedCase.riskLevel} RISK ({selectedCase.riskScore}%)
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200/70 text-stone-600 font-mono">
                {selectedCase.status.replace('_', ' ')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-800 font-mono tracking-tight mt-0.5">
              {selectedCase.caseNumber}
            </h1>
          </div>
        </div>

        {/* Center/Right: Core Investigation Identifiers */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
          <div className="px-3.5 py-2 rounded-xl bg-stone-100/80 border border-stone-200/80">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              TRANSACTION AMOUNT
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <CreditCard size={13} className="text-coral-600" />
              <span className="text-base font-extrabold text-charcoal-800 font-mono">
                {selectedCase.formattedAmount}
              </span>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-stone-100/80 border border-stone-200/80">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              CUSTOMER
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <User size={13} className="text-sage-700" />
              <span className="text-sm font-bold text-charcoal-800 font-mono">
                {selectedCase.customerNumber}
              </span>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-stone-100/80 border border-stone-200/80">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              TRANSACTION ID
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Hash size={13} className="text-stone-500" />
              <span className="text-sm font-bold text-charcoal-800 font-mono">
                {selectedCase.transactionNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
