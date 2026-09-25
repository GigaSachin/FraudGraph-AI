import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Radio, 
  FolderPlus, 
  History, 
  Smartphone, 
  BrainCircuit, 
  Send, 
  AlertOctagon, 
  Zap 
} from 'lucide-react';
import { CaseTimelineItem } from '../../types';

interface CaseTimelineProps {
  timeline: CaseTimelineItem[];
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({ timeline }) => {
  const getTimelineIcon = (iconType: CaseTimelineItem['iconType']) => {
    switch (iconType) {
      case 'signal': return <Radio size={12} className="text-coral-600" />;
      case 'case': return <FolderPlus size={12} className="text-stone-600" />;
      case 'history': return <History size={12} className="text-stone-600" />;
      case 'device': return <Smartphone size={12} className="text-lavender-700" />;
      case 'memory': return <BrainCircuit size={12} className="text-sage-700" />;
      case 'request': return <Send size={12} className="text-amber-600" />;
      case 'risk': return <AlertOctagon size={12} className="text-coral-600" />;
      case 'action': return <Zap size={12} className="text-amber-600" />;
      default: return <Clock size={12} className="text-stone-500" />;
    }
  };

  return (
    <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 shadow-subtle flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
              <Clock size={15} />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                CASE TIMELINE
              </h3>
              <p className="text-[10px] text-stone-500">Chronological agent telemetry</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-stone-500">Autonomous log</span>
        </div>

        {/* Timeline Items */}
        <div className="mt-4 relative pl-3">
          {/* Continuous vertical line */}
          <div className="absolute top-2 bottom-2 left-[21px] w-0.5 bg-stone-200" />

          <div className="space-y-3.5">
            {timeline.map((item, idx) => {
              const isActive = item.status === 'active';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="relative flex items-start gap-3 text-xs"
                >
                  {/* Timestamp */}
                  <span className="font-mono text-[10px] text-stone-500 w-10 flex-shrink-0 pt-0.5">
                    {item.time}
                  </span>

                  {/* Bullet */}
                  <div className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                    isActive
                      ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-100'
                      : 'bg-white border-stone-300'
                  }`}>
                    {getTimelineIcon(item.iconType)}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <span className={`font-semibold block ${isActive ? 'text-amber-800' : 'text-charcoal-800'}`}>
                      {item.title}
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-200/60 text-[10px] text-stone-500 font-mono">
        Audit Hash: 0x8a92f09...41c
      </div>
    </div>
  );
};
