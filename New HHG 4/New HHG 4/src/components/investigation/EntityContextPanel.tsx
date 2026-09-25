import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  AlertTriangle, 
  Smartphone, 
  User, 
  CreditCard, 
  Store, 
  FolderArchive,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { GraphNode } from '../../types';

interface EntityContextPanelProps {
  node: GraphNode | null;
  onClose: () => void;
  onExpandNode?: (nodeId: string) => void;
  dockSide?: 'left' | 'right';
}

export const EntityContextPanel: React.FC<EntityContextPanelProps> = ({
  node,
  onClose,
  onExpandNode,
  dockSide = 'right'
}) => {
  if (!node) return null;

  const getNodeIcon = () => {
    switch (node.type) {
      case 'TRANSACTION': return <CreditCard size={15} className="text-coral-600" />;
      case 'CUSTOMER': return <User size={15} className="text-sage-700" />;
      case 'ACCOUNT': return <CreditCard size={15} className="text-olive-700" />;
      case 'DEVICE': return <Smartphone size={15} className="text-lavender-700" />;
      case 'MERCHANT': return <Store size={15} className="text-amber-700" />;
      case 'PREVIOUS_CASE': return <FolderArchive size={15} className="text-coral-700" />;
      default: return <Layers size={15} className="text-stone-600" />;
    }
  };

  const getNodeTypeBadge = () => {
    switch (node.type) {
      case 'TRANSACTION': return 'bg-coral-100 text-coral-800 border-coral-200';
      case 'CUSTOMER': return 'bg-sage-100 text-sage-800 border-sage-200';
      case 'ACCOUNT': return 'bg-olive-100 text-olive-800 border-olive-200';
      case 'DEVICE': return 'bg-lavender-100 text-lavender-800 border-lavender-200';
      case 'MERCHANT': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'PREVIOUS_CASE': return 'bg-coral-100 text-coral-800 border-coral-200';
      default: return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const positionClass = dockSide === 'left' ? 'left-4 bottom-14' : 'right-4 bottom-14';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.22 }}
        className={`absolute ${positionClass} w-72 bg-stone-50/95 border border-stone-300/90 rounded-2xl shadow-elevated p-3.5 z-40 backdrop-blur-md`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-stone-200/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0">
              {getNodeIcon()}
            </div>
            <div>
              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${getNodeTypeBadge()}`}>
                {node.type.replace('_', ' ')}
              </span>
              <h3 className="text-xs font-bold text-charcoal-800 font-mono leading-tight mt-0.5">
                {node.sublabel}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-charcoal-800 hover:bg-stone-200/60 transition-colors"
            title="Close Panel"
          >
            <X size={14} />
          </button>
        </div>

        {/* Compact Metrics */}
        <div className="py-2.5 space-y-1.5 text-[11px]">
          {node.metadata.connectedAccounts !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Connected Accounts:</span>
              <span className="font-mono font-bold text-charcoal-800">
                {node.metadata.connectedAccounts}
              </span>
            </div>
          )}

          {node.metadata.transactionCount !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Transactions:</span>
              <span className="font-mono font-bold text-charcoal-800">
                {node.metadata.transactionCount}
              </span>
            </div>
          )}

          {node.metadata.amount && (
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Amount / Balance:</span>
              <span className="font-mono font-bold text-charcoal-800">
                {node.metadata.amount}
              </span>
            </div>
          )}

          {node.metadata.similarityScore && (
            <div className="flex items-center justify-between">
              <span className="text-stone-500">GraphRAG Match:</span>
              <span className="font-mono font-bold text-sage-800 bg-sage-100/70 px-1.5 py-0.2 rounded">
                {node.metadata.similarityScore}%
              </span>
            </div>
          )}

          {/* Risk Signals */}
          {node.metadata.riskSignals && node.metadata.riskSignals.length > 0 && (
            <div className="pt-2 border-t border-stone-200/60">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                Risk Signals
              </span>
              <div className="space-y-1">
                {node.metadata.riskSignals.map((sig, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[10px] text-coral-700 leading-tight">
                    <AlertTriangle size={11} className="flex-shrink-0 mt-0.5 text-coral-600" />
                    <span>{sig}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-[10px]">
          <span className="text-stone-500 font-mono">TigerGraph MCP Vertex</span>
          {onExpandNode && (
            <button
              onClick={() => onExpandNode(node.id)}
              className="text-sage-700 hover:text-sage-800 font-semibold flex items-center gap-1"
            >
              <span>Expand 1-Hop</span>
              <ExternalLink size={10} />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
