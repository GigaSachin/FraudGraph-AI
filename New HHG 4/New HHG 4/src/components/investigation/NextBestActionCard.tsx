import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ShieldAlert, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Lock
} from 'lucide-react';
import { NextBestActionData } from '../../types';
import { useInvestigation } from '../../context/InvestigationContext';

interface NextBestActionCardProps {
  action: NextBestActionData;
}

export const NextBestActionCard: React.FC<NextBestActionCardProps> = ({ action }) => {
  const { requestMissingEvidence, escalateCurrentCase, evidenceRequestedState } = useInvestigation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRequestEvidence = async () => {
    setIsProcessing(true);
    await requestMissingEvidence('EV-4');
    setIsProcessing(false);
  };

  const handleEscalate = async () => {
    setIsProcessing(true);
    await escalateCurrentCase();
    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl bg-gradient-to-br from-amber-50/70 via-stone-50 to-sage-50/60 border border-amber-200/90 p-6 shadow-soft relative overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle animated accent line on top */}
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
      />

      <div>
        {/* Title & Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <Zap size={15} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                RECOMMENDED INTERVENTION
              </span>
              <h3 className="text-xs font-bold text-charcoal-800">
                NEXT BEST ACTION
              </h3>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            Sign-off: {action.requiredApprovalRole}
          </span>
        </div>

        {/* Action Recommendation Banner */}
        <div className="my-4">
          <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-subtle">
            <div className="flex items-center gap-2 text-xs font-extrabold text-charcoal-800 tracking-tight">
              <ShieldAlert size={16} className="text-amber-600 flex-shrink-0" />
              <span>{action.recommendation}</span>
            </div>

            <p className="mt-2 text-xs text-charcoal-700 leading-relaxed font-normal">
              "{action.reason}"
            </p>

            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-stone-500 font-mono">
              <span>Governing Policy:</span>
              <span className="font-semibold text-charcoal-700">{action.policyReference}</span>
            </div>
          </div>
        </div>

        {/* Alternative Pathway Options */}
        <div className="pt-1">
          <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
            Alternative Actions
          </span>
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {action.alternativeActions.map((alt, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-stone-200/60 text-stone-700 font-medium"
              >
                {alt}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="mt-6 pt-4 border-t border-stone-200/70 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleRequestEvidence}
          disabled={isProcessing || evidenceRequestedState}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-subtle ${
            evidenceRequestedState
              ? 'bg-sage-100 text-sage-800 border border-sage-300 cursor-default'
              : 'bg-sage-700 hover:bg-sage-800 text-stone-50 hover:shadow-soft'
          }`}
        >
          {evidenceRequestedState ? (
            <>
              <CheckCircle2 size={14} className="text-sage-700" />
              <span>Evidence Dispatched</span>
            </>
          ) : (
            <>
              <Send size={14} />
              <span>Request Evidence</span>
            </>
          )}
        </button>

        <button
          onClick={handleEscalate}
          disabled={isProcessing}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-200/80 hover:bg-coral-100/80 hover:text-coral-800 text-charcoal-700 font-semibold text-xs border border-stone-300 transition-colors"
        >
          <Lock size={13} />
          <span>Escalate Case</span>
        </button>
      </div>
    </motion.div>
  );
};
