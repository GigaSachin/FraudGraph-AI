import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCheck2, 
  HelpCircle, 
  AlertCircle, 
  Database, 
  Share2, 
  BrainCircuit, 
  PlusCircle,
  ExternalLink 
} from 'lucide-react';
import { EvidenceItem } from '../../types';
import { useInvestigation } from '../../context/InvestigationContext';

interface EvidenceTimelineProps {
  evidenceList: EvidenceItem[];
}

export const EvidenceTimeline: React.FC<EvidenceTimelineProps> = ({ evidenceList }) => {
  const { requestMissingEvidence, evidenceRequestedState } = useInvestigation();

  const getSourceIcon = (source: EvidenceItem['source']) => {
    switch (source) {
      case 'Transaction History': return <Database size={13} className="text-coral-600" />;
      case 'Graph Analysis': return <Share2 size={13} className="text-sage-700" />;
      case 'Case Memory': return <BrainCircuit size={13} className="text-lavender-700" />;
      default: return <HelpCircle size={13} className="text-amber-600" />;
    }
  };

  const getSeverityBadge = (severity: EvidenceItem['severity'], status: EvidenceItem['status']) => {
    if (status === 'MISSING') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
          REQUIRED
        </span>
      );
    }
    if (status === 'REQUESTED') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sage-100 text-sage-800 border border-sage-200">
          REQUESTED
        </span>
      );
    }
    switch (severity) {
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-100 text-coral-700 border border-coral-200">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sage-100 text-sage-800 border border-sage-200">
            INFO
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 shadow-subtle flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sage-100 flex items-center justify-center text-sage-700">
              <FileCheck2 size={15} />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                EVIDENCE GATHERED
              </h3>
              <p className="text-[10px] text-stone-500">Autonomous evidentiary chain</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-stone-500">
            {evidenceList.filter(e => e.status !== 'MISSING').length} of {evidenceList.length} verified
          </span>
        </div>

        {/* Evidence Timeline */}
        <div className="mt-5 relative pl-4">
          {/* Vertical Connecting Line */}
          <div className="absolute top-2 bottom-4 left-6 w-0.5 bg-stone-200" />

          <div className="space-y-4">
            {evidenceList.map((item, idx) => {
              const isMissing = item.status === 'MISSING';
              const isRequested = item.status === 'REQUESTED';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                  className="relative flex items-start gap-4"
                >
                  {/* Timeline Node Bullet */}
                  <div className="relative z-10 mt-0.5 flex-shrink-0">
                    {isMissing ? (
                      <div className="w-5 h-5 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center shadow-subtle">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      </div>
                    ) : isRequested ? (
                      <div className="w-5 h-5 rounded-full bg-sage-100 border-2 border-sage-600 flex items-center justify-center shadow-subtle animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage-700" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-sage-700 border-2 border-white flex items-center justify-center shadow-subtle">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-50" />
                      </div>
                    )}
                  </div>

                  {/* Evidence Card */}
                  <div className={`flex-1 p-3 rounded-2xl border transition-all ${
                    isMissing
                      ? 'bg-amber-50/50 border-amber-200/80'
                      : isRequested
                      ? 'bg-sage-50/50 border-sage-200/80'
                      : 'bg-stone-100/60 border-stone-200/70'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-charcoal-800">
                        {item.title}
                      </span>
                      {getSeverityBadge(item.severity, item.status)}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-1.5">
                      <span className="flex items-center gap-1">
                        {getSourceIcon(item.source)}
                        <span>{item.source}</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono">{item.timestamp}</span>
                      {item.confidenceContribution > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-sage-700 font-semibold font-mono">
                            +{item.confidenceContribution}% weight
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-[11px] text-stone-600 leading-snug">
                      {item.description}
                    </p>

                    {isMissing && (
                      <button
                        onClick={() => requestMissingEvidence(item.id)}
                        className="mt-2 text-xs font-semibold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 hover:underline"
                      >
                        <PlusCircle size={12} />
                        <span>Request this evidence now</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-200/60 text-[10px] text-stone-500 font-mono flex items-center justify-between">
        <span>TigerGraph MCP GraphRAG Evidence Store</span>
        <span className="text-sage-700 font-semibold">Integrity Verified</span>
      </div>
    </div>
  );
};
