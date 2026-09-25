import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const AgentHeroVisual: React.FC = () => {
  const steps = [
    { label: 'Monitoring', done: true, pulse: false },
    { label: 'Investigating', done: true, pulse: false },
    { label: 'Assessing', done: false, pulse: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="w-full max-w-sm rounded-3xl bg-stone-50/95 border border-stone-200/90 p-5 shadow-soft relative overflow-hidden backdrop-blur-md"
    >
      {/* Soft background ambient glow */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-sage-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Mini Abstract Investigation Network Animation */}
      <div className="relative w-full h-36 rounded-2xl bg-stone-100/80 border border-stone-200/80 flex items-center justify-center overflow-hidden mb-3.5">
        <svg viewBox="0 0 320 140" className="w-full h-full select-none">
          {/* Connecting lines from satellites to central AI core */}
          <line x1="160" y1="70" x2="60" y2="40" stroke="#DD7A72" strokeWidth="1.4" strokeDasharray="3,3" />
          <line x1="160" y1="70" x2="260" y2="40" stroke="#9E91B9" strokeWidth="1.4" strokeDasharray="3,3" />
          <line x1="160" y1="70" x2="80" y2="105" stroke="#869766" strokeWidth="1.4" strokeDasharray="3,3" />
          <line x1="160" y1="70" x2="240" y2="105" stroke="#DFA65C" strokeWidth="1.4" strokeDasharray="3,3" />

          {/* Traveling subtle data signal pulses */}
          <circle r="2.5" fill="#C85246">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 60 40 L 160 70" />
          </circle>
          <circle r="2.5" fill="#7E6F9D">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M 260 40 L 160 70" />
          </circle>
          <circle r="2.5" fill="#515E39">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M 80 105 L 160 70" />
          </circle>
          <circle r="2.5" fill="#C78832">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M 240 105 L 160 70" />
          </circle>

          {/* Satellite 1: Transaction (Coral) */}
          <g transform="translate(60, 40)">
            <circle r="15" fill="#FCF3F2" stroke="#C85246" strokeWidth="1.8" />
            <text y="3" textAnchor="middle" className="text-[7.5px] font-bold fill-coral-800 font-mono">TX</text>
            <text y="21" textAnchor="middle" className="text-[8px] font-semibold fill-stone-500 uppercase">Transaction</text>
          </g>

          {/* Satellite 2: Device (Lavender) */}
          <g transform="translate(260, 40)">
            <circle r="15" fill="#F5F3F8" stroke="#7E6F9D" strokeWidth="1.8" />
            <text y="3" textAnchor="middle" className="text-[7.5px] font-bold fill-lavender-800 font-mono">DEV</text>
            <text y="21" textAnchor="middle" className="text-[8px] font-semibold fill-stone-500 uppercase">Device</text>
          </g>

          {/* Satellite 3: Account (Olive) */}
          <g transform="translate(80, 105)">
            <circle r="15" fill="#F8F9F5" stroke="#69784D" strokeWidth="1.8" />
            <text y="3" textAnchor="middle" className="text-[7.5px] font-bold fill-olive-800 font-mono">ACC</text>
            <text y="21" textAnchor="middle" className="text-[8px] font-semibold fill-stone-500 uppercase">Account</text>
          </g>

          {/* Satellite 4: Evidence (Amber) */}
          <g transform="translate(240, 105)">
            <circle r="15" fill="#FDF8F0" stroke="#C78832" strokeWidth="1.8" />
            <text y="3" textAnchor="middle" className="text-[7.5px] font-bold fill-amber-800 font-mono">EVID</text>
            <text y="21" textAnchor="middle" className="text-[8px] font-semibold fill-stone-500 uppercase">Evidence</text>
          </g>

          {/* Central AI Agent Node */}
          <g transform="translate(160, 70)">
            {/* Outer ambient wave */}
            <circle r="29" fill="none" stroke="#3B6656" strokeWidth="1" strokeOpacity="0.3" className="animate-pulse-slow" />
            {/* Core circle */}
            <circle r="22" fill="#E3ECE8" stroke="#3B6656" strokeWidth="2.2" className="shadow-subtle" />
            <circle r="10" fill="#FFFFFF" opacity="0.8" />
            <text y="3.5" textAnchor="middle" className="text-[9px] font-bold fill-sage-900 font-sans tracking-tight">AI</text>
          </g>
        </svg>
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between pb-2.5 border-b border-stone-200/70">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sage-100 border border-sage-300 flex items-center justify-center text-sage-800">
            <Cpu size={14} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-charcoal-800">AI AGENT</span>
              <span className="text-[10px] text-stone-500 font-mono">v2.4</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-600 animate-pulse" />
              <span className="text-[10px] font-semibold text-sage-800 uppercase tracking-wider">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-200/60 text-stone-600 text-[10px] font-mono">
          <Sparkles size={11} className="text-sage-600" />
          <span>Autonomous</span>
        </div>
      </div>

      {/* Current Task Description */}
      <div className="py-2.5">
        <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
          Current Focus
        </span>
        <div className="mt-1 flex items-start gap-1.5">
          <ShieldAlert size={13} className="text-coral-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-charcoal-700 font-medium leading-snug">
            "Monitoring investigation signals & evaluating 3-hop graph connectivity for HH-1042"
          </p>
        </div>
      </div>

      {/* Flow: Monitoring -> Investigating -> Assessing */}
      <div className="pt-2.5 border-t border-stone-200/70">
        <div className="flex items-center justify-between text-xs">
          {steps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  {step.pulse ? (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0.2, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-5 h-5 rounded-full bg-amber-300"
                    />
                  ) : null}
                  <div
                    className={`w-3 h-3 rounded-full z-10 transition-colors ${
                      step.pulse
                        ? 'bg-amber-500 shadow-sm'
                        : step.done
                        ? 'bg-sage-600'
                        : 'bg-stone-300'
                    }`}
                  />
                </div>
                <span
                  className={`mt-1 text-[10px] font-medium ${
                    step.pulse
                      ? 'text-amber-800 font-bold'
                      : step.done
                      ? 'text-sage-800 font-medium'
                      : 'text-stone-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight size={10} className="text-stone-400 mb-3" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
