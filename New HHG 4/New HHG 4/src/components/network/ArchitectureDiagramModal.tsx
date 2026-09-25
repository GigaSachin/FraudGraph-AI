import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Bot, 
  Cpu, 
  Share2, 
  GitBranch, 
  Database, 
  FileText, 
  ShieldCheck, 
  Zap,
  ArrowDown,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const ArchitectureDiagramModal: React.FC = () => {
  const { architectureModalOpen, setArchitectureModalOpen } = useInvestigation();

  if (!architectureModalOpen) return null;

  const pipelineSteps = [
    {
      step: '01',
      title: 'AI Agent Runtime',
      badge: 'Orchestrator',
      icon: <Bot size={18} className="text-sage-700" />,
      bg: 'bg-sage-100',
      description: 'Continuous monitoring daemon ingests fraud telemetry and schedules contextual investigation tasks.',
      tech: 'Agentic Core / FastMCP'
    },
    {
      step: '02',
      title: 'TigerGraph MCP Server',
      badge: 'Protocol',
      icon: <Cpu size={18} className="text-stone-700" />,
      bg: 'bg-stone-200',
      description: 'Model Context Protocol connector bridges LLM tools with TigerGraph GSQL query endpoints.',
      tech: 'MCP Standard / REST'
    },
    {
      step: '03',
      title: 'TigerGraph Database',
      badge: 'Enterprise Graph',
      icon: <Share2 size={18} className="text-olive-700" />,
      bg: 'bg-olive-100',
      description: 'Ultra-fast graph compute engine storing millions of accounts, cards, devices, and merchants.',
      tech: 'GSQL Native Engine'
    },
    {
      step: '04',
      title: 'Graph Traversal Algorithms',
      badge: 'GSQL Analytics',
      icon: <GitBranch size={18} className="text-coral-700" />,
      bg: 'bg-coral-100',
      description: 'Executes PageRank, Connected Components, and 2-to-4 hop path traversals for syndicate detection.',
      tech: 'Community Detection / Louvain'
    },
    {
      step: '05',
      title: 'GraphRAG Context Augmentation',
      badge: 'Hybrid Retrieval',
      icon: <Database size={18} className="text-lavender-700" />,
      bg: 'bg-lavender-100',
      description: 'Blends graph subgraph topology embeddings with historical fraud vector memory (Case Memory).',
      tech: 'Vector Similarity + Graph Subgraphs'
    },
    {
      step: '06',
      title: 'Evidence + Policies + Memory',
      badge: 'Synthesis Layer',
      icon: <FileText size={18} className="text-amber-700" />,
      bg: 'bg-amber-100',
      description: 'Calibrates epistemic uncertainty and aggregates evidence against formal compliance policies.',
      tech: 'Epistemic Uncertainty Engine'
    },
    {
      step: '07',
      title: 'Next Best Action Recommendation',
      badge: 'Human-in-the-Loop',
      icon: <Zap size={18} className="text-coral-700" />,
      bg: 'bg-coral-100',
      description: 'Proposes step-up authentication, temporary hold, or syndicate escalation for analyst sign-off.',
      tech: 'Policy Decision Matrix'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-3xl max-h-[90vh] bg-stone-50 border border-stone-300 rounded-3xl shadow-elevated overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-100/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage-600 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-800">
                  SYSTEM ARCHITECTURE SPECIFICATION
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-charcoal-800 tracking-tight mt-0.5">
                FraudGraph AI End-to-End Pipeline
              </h2>
            </div>

            <button
              onClick={() => setArchitectureModalOpen(false)}
              className="p-2 rounded-xl text-stone-500 hover:text-charcoal-800 hover:bg-stone-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Pipeline Diagram Content */}
          <div className="p-6 overflow-y-auto space-y-3.5">
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              FraudGraph AI bridges real-time agentic reasoning with enterprise graph intelligence through the TigerGraph Model Context Protocol (MCP) and hybrid GraphRAG.
            </p>

            {pipelineSteps.map((s, idx) => (
              <React.Fragment key={s.step}>
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-subtle flex items-start gap-3.5 hover:border-sage-300 transition-colors">
                  <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    {s.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-400">{s.step}</span>
                        <h4 className="text-xs font-bold text-charcoal-800">{s.title}</h4>
                      </div>
                      <span className="text-[10px] font-medium font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                        {s.badge}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {s.description}
                    </p>

                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-sage-800 font-mono">
                      <span className="text-stone-400">Stack:</span>
                      <span>{s.tech}</span>
                    </div>
                  </div>
                </div>

                {idx < pipelineSteps.length - 1 && (
                  <div className="flex justify-center -my-1">
                    <ArrowDown size={14} className="text-stone-400" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 bg-stone-100/60 flex items-center justify-between text-xs text-stone-600">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <CheckCircle2 size={13} className="text-sage-600" />
              <span>Ready for live backend TigerGraph MCP integration</span>
            </span>
            <button
              onClick={() => setArchitectureModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-sage-700 hover:bg-sage-800 text-white font-semibold text-xs transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
