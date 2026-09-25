import React from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, TrendingUp, ShieldAlert } from 'lucide-react';
import { RiskLevel } from '../../types';

interface RiskAssessmentCardProps {
  score: number; // e.g. 87
  level: RiskLevel;
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({
  score = 87,
  level = 'HIGH'
}) => {
  // Semi-circular gauge parameters
  const radius = 64;
  const strokeWidth = 10;
  const circumference = Math.PI * radius; // Half-circle
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-5 shadow-subtle flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
              RISK ASSESSMENT
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-100 text-coral-700 border border-coral-200">
            {level} RISK
          </span>
        </div>

        {/* Semi-circular Confidence Gauge */}
        <div className="my-4 flex flex-col items-center justify-center relative">
          <svg width="170" height="100" className="overflow-visible">
            {/* Background Arc */}
            <path
              d="M 15 90 A 64 64 0 0 1 155 90"
              fill="none"
              stroke="#EDE8E0"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Animated Value Arc */}
            <motion.path
              d="M 15 90 A 64 64 0 0 1 155 90"
              fill="none"
              stroke="#C85246"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>

          {/* Centered Values inside Arc */}
          <div className="absolute bottom-2 flex flex-col items-center">
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-charcoal-800 font-sans tracking-tight">
                {score}
              </span>
              <span className="text-base font-bold text-coral-600 ml-0.5">%</span>
            </div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-500 -mt-1">
              Model Confidence
            </span>
          </div>
        </div>

        {/* Primary Risk Drivers */}
        <div className="space-y-1.5 pt-1 text-xs">
          <div className="flex items-center justify-between text-[11px] py-1 border-b border-stone-200/50">
            <span className="text-stone-600">Shared Hardware D-221</span>
            <span className="font-mono font-bold text-coral-700">+34%</span>
          </div>
          <div className="flex items-center justify-between text-[11px] py-1 border-b border-stone-200/50">
            <span className="text-stone-600">Velocity Deviation (+320%)</span>
            <span className="font-mono font-bold text-coral-700">+28%</span>
          </div>
          <div className="flex items-center justify-between text-[11px] py-1">
            <span className="text-stone-600">Case Memory CASE-892 Match</span>
            <span className="font-mono font-bold text-coral-700">+25%</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-500 font-mono">
        <span>GSQL Rule Engine</span>
        <span className="text-coral-600 font-semibold">Elevated Threat</span>
      </div>
    </div>
  );
};
