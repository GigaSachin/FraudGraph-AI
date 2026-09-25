import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, Bot, Layers, ArrowUpRight } from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const AgentLiveActivity: React.FC = () => {
  const { setArchitectureModalOpen } = useInvestigation();

  const events = [
    {
      id: '1',
      title: 'Fraud signal received',
      time: '09:40:14',
      tool: 'VelocityEngine',
      detail: 'TX-8821 triggered high-value velocity alert (+320% baseline)',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Transaction history analyzed',
      time: '09:41:02',
      tool: 'TigerGraph MCP',
      detail: 'GSQL traversal retrieved 6-month historical activity across 3 accounts',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Connected device identified',
      time: '09:42:15',
      tool: 'TigerGraph MCP',
      detail: 'Hardware D-221 resolved to 3 distinct customer KYC profiles',
      status: 'completed',
    },
    {
      id: '4',
      title: 'Similar case found',
      time: '09:42:48',
      tool: 'CaseMemory',
      detail: 'GraphRAG matched CASE-892 with 91% subgraph similarity',
      status: 'completed',
    },
    {
      id: '5',
      title: 'Assessing uncertainty',
      time: '09:44:00',
      tool: 'EvidenceEvaluator',
      detail: 'Synthesizing missing customer verification against policy POL-AUTH-204',
      status: 'in_progress',
    },
  ];

  return (
    <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 shadow-subtle flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center text-sage-700">
              <Bot size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-charcoal-800">AI Agent Activity</h3>
              <p className="text-[11px] text-stone-500">Observable investigation events</p>
            </div>
          </div>

          <button
            onClick={() => setArchitectureModalOpen(true)}
            className="text-[11px] font-medium text-sage-700 hover:text-sage-800 flex items-center gap-1 hover:underline"
          >
            <span>Architecture</span>
            <ArrowUpRight size={12} />
          </button>
        </div>

        {/* Live event list */}
        <div className="mt-4 space-y-3.5">
          {events.map((ev, idx) => {
            const isCompleted = ev.status === 'completed';
            const isInProgress = ev.status === 'in_progress';

            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="flex items-start gap-3 text-xs"
              >
                {/* Indicator icon */}
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-sage-100 border border-sage-300 flex items-center justify-center text-sage-700">
                      <Check size={11} strokeWidth={2.5} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                      <Loader2 size={11} className="animate-spin" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-semibold ${isInProgress ? 'text-amber-800' : 'text-charcoal-800'}`}>
                      {ev.title}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 flex-shrink-0">
                      {ev.time}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-600 mt-0.5 truncate">
                    {ev.detail}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-stone-200/60 text-stone-600">
                      {ev.tool}
                    </span>
                    {isInProgress && (
                      <span className="text-[9px] font-semibold text-amber-700 uppercase tracking-wider animate-pulse">
                        Active Step
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
        <span>Autonomous Agent: v1.4.2</span>
        <span className="flex items-center gap-1 text-sage-700 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
          5 tools executed
        </span>
      </div>
    </div>
  );
};
