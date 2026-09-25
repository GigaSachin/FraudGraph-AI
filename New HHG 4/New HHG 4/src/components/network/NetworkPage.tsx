import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  Search, 
  Filter, 
  GitFork, 
  Layers, 
  Maximize2, 
  Sparkles,
  Share2,
  Cpu
} from 'lucide-react';
import { FraudGraphWorkspace } from '../investigation/FraudGraphWorkspace';
import { useInvestigation } from '../../context/InvestigationContext';

export const NetworkPage: React.FC = () => {
  const { selectedCase, setArchitectureModalOpen } = useInvestigation();
  const [networkSearch, setNetworkSearch] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4 max-w-7xl mx-auto pb-12"
    >
      {/* Top Banner */}
      <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-sage-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-sage-800">
              TIGERGRAPH GSQL EXPLORER
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal-800 tracking-tight">
            Connected Entity Network
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Multi-hop relational graph exploration across accounts, devices, cards, and historical syndicates.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setArchitectureModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200/90 text-charcoal-700 font-semibold text-xs transition-colors"
          >
            <GitFork size={14} className="text-sage-700" />
            <span>MCP Architecture</span>
          </button>
        </div>
      </div>

      {/* Main Graph Explorer (Occupies 80%+ of available vertical workspace) */}
      <div className="relative">
        <FraudGraphWorkspace
          graphData={selectedCase.graphData}
          heightClass="h-[680px]"
          isFullNetworkExplorer={true}
        />
      </div>

      {/* Supporting Subgraph Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-subtle">
          <span className="text-[10px] uppercase font-semibold text-stone-500 block">Total Vertices</span>
          <p className="text-xl font-bold font-mono text-charcoal-800 mt-0.5">8 Entities</p>
          <span className="text-[10px] text-stone-500">1 Tx, 1 Cust, 3 Accs, 1 Dev, 1 Merch, 1 Case</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-subtle">
          <span className="text-[10px] uppercase font-semibold text-stone-500 block">Total Edges</span>
          <p className="text-xl font-bold font-mono text-charcoal-800 mt-0.5">8 Relationships</p>
          <span className="text-[10px] text-stone-500">5 High-Risk weighted paths</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-subtle">
          <span className="text-[10px] uppercase font-semibold text-stone-500 block">Syndicate Diameter</span>
          <p className="text-xl font-bold font-mono text-charcoal-800 mt-0.5">3 Hops</p>
          <span className="text-[10px] text-coral-600 font-medium">Shared device convergence detected</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-subtle">
          <span className="text-[10px] uppercase font-semibold text-stone-500 block">Graph Engine Query</span>
          <p className="text-xs font-mono text-sage-800 mt-1 font-semibold truncate">
            tg_subgraph_expand_2hop()
          </p>
          <span className="text-[10px] text-stone-500">Execution: 14ms via FastMCP</span>
        </div>
      </div>
    </motion.div>
  );
};
