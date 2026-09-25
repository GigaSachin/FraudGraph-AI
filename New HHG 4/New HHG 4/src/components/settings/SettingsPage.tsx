import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Cpu, 
  Database, 
  Sliders, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw,
  GitBranch,
  Bot
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const SettingsPage: React.FC = () => {
  const { setArchitectureModalOpen } = useInvestigation();
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'testing'>('connected');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [uncertaintyThreshold, setUncertaintyThreshold] = useState(35);
  const [similarityThreshold, setSimilarityThreshold] = useState(85);

  const testConnection = () => {
    setMcpStatus('testing');
    setTimeout(() => {
      setMcpStatus('connected');
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 max-w-4xl mx-auto pb-16"
    >
      {/* Header Banner */}
      <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
            ENVIRONMENT & INTEGRATIONS
          </span>
          <h2 className="text-2xl font-extrabold text-charcoal-800 tracking-tight">
            Platform Settings & MCP Config
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Configure TigerGraph MCP connector, GraphRAG similarity weights, and agent autonomy limits.
          </p>
        </div>

        <button
          onClick={() => setArchitectureModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-sage-700 hover:bg-sage-800 text-stone-50 font-semibold text-xs transition-colors self-start sm:self-auto"
        >
          View System Architecture
        </button>
      </div>

      {/* Integration Card: TigerGraph MCP */}
      <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center text-sage-700">
              <Cpu size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-charcoal-800">TigerGraph Model Context Protocol (MCP)</h3>
              <p className="text-[11px] text-stone-500">FastMCP endpoint providing graph tools to AI Agent</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-sage-100 text-sage-800 border border-sage-200">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-600 animate-pulse" />
              {mcpStatus === 'connected' ? 'Connected (tg-mcp:9000)' : 'Verifying...'}
            </span>
            <button
              onClick={testConnection}
              className="p-1.5 rounded-lg text-stone-500 hover:text-charcoal-800 hover:bg-stone-200/60 transition-colors"
              title="Ping MCP Server"
            >
              <RefreshCw size={14} className={mcpStatus === 'testing' ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
              MCP Server Host
            </label>
            <input
              type="text"
              readOnly
              value="http://127.0.0.1:9000/mcp/v1/tools"
              className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 font-mono text-charcoal-800 text-xs"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
              TigerGraph Database Graph Name
            </label>
            <input
              type="text"
              readOnly
              value="FinancialFraudGraph"
              className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 font-mono text-charcoal-800 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Agent Autonomy & Uncertainty Guardrails */}
      <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 shadow-subtle space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-stone-200/70">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Sliders size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-charcoal-800">Agent Autonomy & Thresholds</h3>
            <p className="text-[11px] text-stone-500">Governance controls for autonomous vs human approval</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Slider 1: Uncertainty Threshold */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-charcoal-800">
                Mandatory Human-in-the-Loop Uncertainty Threshold
              </span>
              <span className="font-mono font-bold text-amber-700">{uncertaintyThreshold}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={uncertaintyThreshold}
              onChange={(e) => setUncertaintyThreshold(Number(e.target.value))}
              className="w-full accent-amber-600 bg-stone-200 h-1.5 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              When uncertainty exceeds this value, AI Agent cannot execute automatic holds without human sign-off.
            </p>
          </div>

          {/* Slider 2: GraphRAG Similarity Threshold */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-charcoal-800">
                GraphRAG Case Memory Similarity Match Cutoff
              </span>
              <span className="font-mono font-bold text-sage-700">{similarityThreshold}%</span>
            </div>
            <input
              type="range"
              min="60"
              max="95"
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
              className="w-full accent-sage-600 bg-stone-200 h-1.5 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Subgraphs matching above this similarity threshold are automatically linked into evidentiary memory.
            </p>
          </div>

          {/* Toggle: Automatic Step-Up Dispatch */}
          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="font-semibold text-charcoal-800 block">
                Automatic Step-Up Verification Dispatch
              </span>
              <span className="text-[11px] text-stone-500">
                Allows AI Agent to ping customer device without delaying the investigation pipeline.
              </span>
            </div>
            <button
              onClick={() => setAutoDispatch(!autoDispatch)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                autoDispatch ? 'bg-sage-600' : 'bg-stone-300'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  autoDispatch ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
