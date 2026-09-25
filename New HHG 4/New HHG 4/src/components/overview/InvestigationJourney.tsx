import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

interface Stage {
  key: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  detail: string;
}

export const InvestigationJourney: React.FC<{ activeStage?: string }> = ({ activeStage = 'DECISION' }) => {
  const stages: Stage[] = [
    { key: 'TRIGGER', label: 'Trigger', status: 'completed', detail: 'Velocity spike detected' },
    { key: 'INVESTIGATE', label: 'Investigate', status: 'completed', detail: 'TigerGraph 2-hop search' },
    { key: 'EVIDENCE', label: 'Evidence', status: 'completed', detail: '3 indicators gathered' },
    { key: 'ASSESS', label: 'Assess', status: 'completed', detail: '87% Risk / 42% Uncertainty' },
    { key: 'DECISION', label: 'Decision', status: activeStage === 'DECISION' ? 'current' : 'completed', detail: 'Step-up auth recommended' },
    { key: 'MEMORY', label: 'Memory', status: 'upcoming', detail: 'Vector index commit' },
  ];

  return (
    <div className="w-full py-4 px-2">
      <div className="flex items-center justify-between relative">
        {/* Continuous background connector track */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-stone-300/70 -z-0" />

        {/* Animated active progress line up to Decision */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '80%' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute top-4 left-6 h-0.5 bg-gradient-to-r from-sage-600 via-sage-500 to-coral-500 -z-0"
        />

        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';

          return (
            <div key={stage.key} className="flex flex-col items-center relative z-10 group">
              {/* Node Circle */}
              <div className="relative flex items-center justify-center">
                {isCurrent && (
                  <motion.div
                    animate={{ scale: [1, 1.45, 1], opacity: [0.65, 0.15, 0.65] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-8 h-8 rounded-full bg-coral-300"
                  />
                )}

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-sage-600 text-stone-50 shadow-subtle ring-2 ring-sage-200'
                      : isCurrent
                      ? 'bg-coral-500 text-white shadow-soft ring-4 ring-coral-100 ring-offset-1'
                      : 'bg-stone-200 text-stone-500 border border-stone-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={14} strokeWidth={2.5} />
                  ) : isCurrent ? (
                    <AlertCircle size={15} />
                  ) : (
                    <span className="text-[10px] font-mono">{idx + 1}</span>
                  )}
                </div>
              </div>

              {/* Stage Label */}
              <div className="mt-2.5 text-center">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider block ${
                    isCurrent
                      ? 'text-coral-700'
                      : isCompleted
                      ? 'text-charcoal-800'
                      : 'text-stone-500'
                  }`}
                >
                  {stage.label}
                </span>
                <span className="text-[10px] text-stone-600 hidden sm:block mt-0.5 max-w-[100px] leading-tight">
                  {stage.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
