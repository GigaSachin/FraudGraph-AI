import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, AlertTriangle, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { UncertaintyLevel } from '../../types';
import { useInvestigation } from '../../context/InvestigationContext';

interface UncertaintyPanelProps {
  score: number;
  level: UncertaintyLevel;
}

export const UncertaintyPanel: React.FC<UncertaintyPanelProps> = ({
  score = 42,
  level = 'MODERATE'
}) => {
  const { requestMissingEvidence, evidenceRequestedState } = useInvestigation();

  return (
    <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-5 shadow-subtle flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
              UNCERTAINTY
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            {level}
          </span>
        </div>

        {/* Score & Uncertainty Bar */}
        <div className="my-4">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-[11px] text-stone-600 font-medium">Epistemic Uncertainty</span>
            <span className="text-xl font-extrabold text-charcoal-800 font-sans">
              {score}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-amber-500 rounded-full"
            />
          </div>
          <p className="text-[10px] text-stone-500 mt-1">
            Higher uncertainty requires human-in-the-loop verification before irreversible action.
          </p>
        </div>

        {/* Missing Evidence Callout Box */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
          <div className="flex items-center gap-1.5 text-amber-800 font-semibold text-xs mb-1">
            <AlertTriangle size={13} className="text-amber-600 flex-shrink-0" />
            <span>Missing Evidence:</span>
          </div>
          <p className="text-xs font-bold text-charcoal-800">
            Customer verification
          </p>
          <p className="text-[11px] text-stone-600 mt-1 leading-snug">
            {evidenceRequestedState
              ? 'Verification challenge dispatched. Awaiting customer confirmation token.'
              : 'Out-of-band biometric or step-up token was bypassed during payment initialization.'}
          </p>

          {!evidenceRequestedState ? (
            <button
              onClick={() => requestMissingEvidence('EV-4')}
              className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors shadow-subtle"
            >
              <UserCheck size={13} />
              <span>Dispatch Step-Up Challenge</span>
            </button>
          ) : (
            <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-sage-800 bg-sage-100 py-1.5 px-2 rounded-lg border border-sage-200">
              <ShieldCheck size={13} className="text-sage-700" />
              <span>Challenge Sent (Awaiting Response)</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-500 font-mono">
        <span>Policy POL-EVID-201</span>
        <span className="text-amber-700 font-semibold">Evidence Required</span>
      </div>
    </div>
  );
};
