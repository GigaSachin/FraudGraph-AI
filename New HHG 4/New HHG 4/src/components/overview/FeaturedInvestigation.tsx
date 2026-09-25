import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertOctagon, 
  ArrowRight, 
  Share2, 
  ShieldAlert, 
  Cpu, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { InvestigationJourney } from './InvestigationJourney';
import { useInvestigation } from '../../context/InvestigationContext';

export const FeaturedInvestigation: React.FC = () => {
  const { openCase } = useInvestigation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="my-8 rounded-3xl bg-stone-50 border border-stone-200/90 p-6 sm:p-7 shadow-soft relative overflow-hidden"
    >
      {/* Soft warm background glow on the left */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-coral-100/30 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200/70 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-coral-700">
              Investigation requiring attention
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-extrabold text-charcoal-800 tracking-tight font-sans">
              Case <span className="font-mono text-charcoal-900">HH-1042</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-coral-100/80 text-coral-700 border border-coral-200 flex items-center gap-1">
              <AlertOctagon size={12} />
              HIGH RISK (87%)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100/70 text-amber-800 border border-amber-200 flex items-center gap-1">
              <HelpCircle size={12} />
              UNCERTAINTY: MODERATE (42%)
            </span>
          </div>
        </div>

        <button
          onClick={() => openCase('HH-1042')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage-700 hover:bg-sage-800 text-stone-50 font-semibold text-xs transition-all shadow-subtle hover:shadow-soft self-start sm:self-auto group"
        >
          <span>Open Full Investigation</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Metadata Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-stone-200/60 relative z-10 text-xs">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">Transaction Amount</span>
          <p className="text-lg font-bold text-charcoal-800 font-mono mt-0.5">₹80,000</p>
          <span className="text-[10px] text-coral-600 font-medium">+320% vs baseline</span>
        </div>

        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">Customer ID</span>
          <p className="text-base font-semibold text-charcoal-800 font-mono mt-0.5">CUST-1092</p>
          <span className="text-[10px] text-stone-500">KYC Level 2 Verified</span>
        </div>

        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">Linked Hardware</span>
          <p className="text-base font-semibold text-lavender-700 font-mono mt-0.5">Device D-221</p>
          <span className="text-[10px] text-coral-600 font-medium">Shared across 3 KYC IDs</span>
        </div>

        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">GraphRAG Precedent</span>
          <p className="text-base font-semibold text-sage-800 font-mono mt-0.5">CASE-892</p>
          <span className="text-[10px] text-sage-700 font-medium">91% Subgraph Match</span>
        </div>
      </div>

      {/* Investigation Journey Stepper */}
      <div className="pt-2 relative z-10">
        <InvestigationJourney activeStage="DECISION" />
      </div>

      {/* Recommended Action Summary Strip */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
            <ShieldAlert size={17} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-charcoal-800">
                Next Best Action: REQUEST STEP-UP AUTHENTICATION
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-amber-200/60 text-amber-800">
                Pending Approval
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              "Current evidence indicates elevated risk (87%), but customer verification is unavailable."
            </p>
          </div>
        </div>

        <button
          onClick={() => openCase('HH-1042')}
          className="text-xs font-semibold text-sage-700 hover:text-sage-800 flex items-center gap-1 flex-shrink-0"
        >
          <span>Review Evidence</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
};
