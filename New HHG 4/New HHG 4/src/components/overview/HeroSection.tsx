import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Sparkles, ArrowRight, Share2, AlertTriangle } from 'lucide-react';
import { AgentHeroVisual } from './AgentHeroVisual';
import { useInvestigation } from '../../context/InvestigationContext';

export const HeroSection: React.FC = () => {
  const { openCase } = useInvestigation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative pt-2 pb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Heading and Narrative */}
        <div className="max-w-2xl">
          {/* STEP 2: Command Center Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/80 border border-stone-300/80 mb-4 shadow-subtle">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-600"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-700">
              FRAUD INVESTIGATION COMMAND CENTER
            </span>
          </motion.div>

          {/* STEP 3 & 4: Heading with Line-by-Line Motion */}
          <div className="space-y-1">
            <motion.div variants={itemVariants} className="overflow-hidden">
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-charcoal-800 leading-[1.12] tracking-tight">
                Investigations that
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="overflow-hidden">
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-charcoal-800 leading-[1.12] tracking-tight">
                <span className="relative inline-block px-1.5 py-0.5 rounded-lg">
                  <span className="relative z-10 text-charcoal-900">explain themselves.</span>
                  <span className="absolute inset-0 bg-sage-200/60 rounded-lg highlight-underline -z-0" />
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Colorful Signal Telemetry Tags */}
          <motion.div variants={itemVariants} className="mt-3.5 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-coral-100/80 text-coral-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
              Fraud Trigger
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-lavender-100/80 text-lavender-800 font-medium">
              <Share2 size={11} className="text-lavender-600" />
              TigerGraph Subgraph
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100/80 text-amber-800 font-medium">
              <AlertTriangle size={11} className="text-amber-600" />
              Uncertainty Assessment
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sage-100/80 text-sage-800 font-medium">
              <Sparkles size={11} className="text-sage-600" />
              Next Best Action
            </span>
          </motion.div>

          {/* STEP 5: Supporting Paragraph */}
          <motion.p variants={itemVariants} className="mt-4 text-base text-stone-700 leading-relaxed max-w-xl font-normal">
            AI investigates connected activity, gathers evidence, assesses uncertainty, and recommends the next best action.
          </motion.p>

          {/* STEP 6: Primary CTA & Governance Status */}
          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openCase('HH-1042')}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-sage-700 hover:bg-sage-800 text-stone-50 font-semibold text-xs transition-all shadow-soft hover:shadow-elevated hover:-translate-y-0.5 group"
            >
              <Sparkles size={14} className="text-sage-200" />
              <span>Inspect Priority Case HH-1042</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-2 text-xs text-stone-600 pl-1">
              <div className="w-5 h-5 rounded-md bg-sage-100 flex items-center justify-center text-sage-700 shadow-subtle">
                <ShieldCheck size={13} />
              </div>
              <span className="font-medium text-charcoal-700">Human-in-the-loop governance active</span>
            </div>
          </motion.div>
        </div>

        {/* STEP 7: Right Column AI Visual */}
        <div className="flex-shrink-0">
          <AgentHeroVisual />
        </div>
      </div>
    </motion.section>
  );
};
