import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { MOCK_CASE_MEMORY } from '../../data/mockData';
import { useInvestigation } from '../../context/InvestigationContext';

export const MemoryPage: React.FC = () => {
  const { openCase } = useInvestigation();

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'Confirmed Fraud':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-coral-100 text-coral-800 border border-coral-200">
            <XCircle size={12} className="text-coral-600" />
            Confirmed Fraud
          </span>
        );
      case 'Cleared':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sage-100 text-sage-800 border border-sage-200">
            <CheckCircle2 size={12} className="text-sage-600" />
            Cleared (False Positive)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle size={12} className="text-amber-600" />
            {outcome}
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
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-sage-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-sage-800">
              GRAPHRAG EPISODIC REPOSITORY
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal-800 tracking-tight">
            Case Memory
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Previous investigations that can inform current cases through topological similarity and outcome precedent.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-sage-800 font-mono">
          <BrainCircuit size={14} className="text-sage-700" />
          <span>Vector Index: 4 Active Graph Clusters</span>
        </div>
      </div>

      {/* Spacious Horizontal Cards */}
      <div className="space-y-5">
        {MOCK_CASE_MEMORY.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 sm:p-7 shadow-subtle hover:shadow-soft transition-all"
          >
            {/* Card Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-charcoal-700 font-mono font-bold text-xs">
                  {mem.caseId.replace('CASE-', '#')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-charcoal-800 tracking-tight">
                      {mem.title}
                    </h3>
                  </div>
                  <span className="text-xs text-stone-500 font-mono">
                    Pattern: {mem.pattern} • Closed: {mem.dateClosed}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                {/* Similarity Score Pill */}
                <div className="px-3 py-1 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono font-bold text-sage-800 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-sage-600" />
                  <span>{mem.similarityScore}% similarity</span>
                </div>
                {getOutcomeBadge(mem.outcome)}
              </div>
            </div>

            {/* Why This Case is Relevant */}
            <div className="my-5 p-4 rounded-2xl bg-stone-100/70 border border-stone-200/70">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Why this case is relevant to HH-1042
              </span>
              <p className="text-xs text-charcoal-800 font-medium leading-relaxed">
                "{mem.relevanceExplanation}"
              </p>
            </div>

            {/* Grid: Matched Graph Signatures & Action Taken */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                  Matched Graph Signatures
                </span>
                <ul className="space-y-1.5">
                  {mem.matchedGraphSignatures.map((sig, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-600 mt-1.5 flex-shrink-0" />
                      <span className="leading-snug">{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                  Historical Action Taken & Notes
                </span>
                <p className="text-stone-700 leading-relaxed mb-2 font-medium">
                  {mem.actionTaken}
                </p>
                <p className="text-[11px] text-stone-500 italic bg-stone-100/50 p-2.5 rounded-xl border border-stone-200/50">
                  Analyst note: "{mem.analystNotes}"
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-5 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs">
              <span className="text-[10px] text-stone-500 font-mono">
                GraphRAG Embedding: 1536-dim vector cosine match
              </span>
              <button
                onClick={() => openCase('HH-1042')}
                className="text-sage-700 hover:text-sage-800 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Compare Subgraph Topology</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
