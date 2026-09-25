import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  FileCode, 
  UserCheck, 
  Zap, 
  AlertTriangle,
  Lock,
  Search
} from 'lucide-react';
import { MOCK_POLICIES } from '../../data/mockData';
import { PolicyRule } from '../../types';

export const PoliciesPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('Fraud Policies');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = [
    'Fraud Policies',
    'Evidence Requirements',
    'Approval Rules',
    'Allowed Actions',
    'Escalation Rules'
  ] as const;

  const toggleSection = (cat: string) => {
    setExpandedSection(expandedSection === cat ? null : cat);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Fraud Policies': return <ShieldCheck size={16} className="text-sage-700" />;
      case 'Evidence Requirements': return <FileCode size={16} className="text-amber-700" />;
      case 'Approval Rules': return <UserCheck size={16} className="text-olive-700" />;
      case 'Allowed Actions': return <Zap size={16} className="text-coral-700" />;
      case 'Escalation Rules': return <Lock size={16} className="text-coral-800" />;
      default: return <ShieldCheck size={16} className="text-stone-700" />;
    }
  };

  const getEnforcementBadge = (enf: PolicyRule['enforcement']) => {
    switch (enf) {
      case 'Automated':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sage-100 text-sage-800 border border-sage-200">
            Automated Enforcement
          </span>
        );
      case 'Human Sign-off':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Human Approval Mandatory
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            Advisory
          </span>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 max-w-5xl mx-auto pb-16"
    >
      {/* Header Banner */}
      <div className="rounded-3xl bg-stone-50 border border-stone-200/90 p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
            GOVERNANCE & COMPLIANCE FRAMEWORK
          </span>
          <h2 className="text-2xl font-extrabold text-charcoal-800 tracking-tight">
            Policies & Decision Rules
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Defines the guardrails governing autonomous agent evidence collection and next best action thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-mono text-stone-600">
          <span>Active Rules: {MOCK_POLICIES.length}</span>
        </div>
      </div>

      {/* Expandable Document Sections */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const rules = MOCK_POLICIES.filter(p => p.category === cat);
          const isExpanded = expandedSection === cat;

          return (
            <div
              key={cat}
              className="rounded-3xl bg-stone-50 border border-stone-200/90 shadow-subtle overflow-hidden transition-colors"
            >
              {/* Section Header Button */}
              <button
                onClick={() => toggleSection(cat)}
                className="w-full p-5 sm:px-6 flex items-center justify-between hover:bg-stone-100/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center">
                    {getCategoryIcon(cat)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-charcoal-800">{cat}</h3>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {rules.length} rule{rules.length === 1 ? '' : 's'} registered
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-400">
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Section Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-stone-200/70 bg-stone-50/50 p-5 sm:px-6 space-y-4"
                  >
                    {rules.map((rule) => (
                      <div
                        key={rule.id}
                        className="p-4 rounded-2xl bg-white border border-stone-200 shadow-subtle"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-charcoal-800">
                              {rule.code}
                            </span>
                            <span className="text-xs font-bold text-charcoal-800">
                              — {rule.title}
                            </span>
                          </div>
                          {getEnforcementBadge(rule.enforcement)}
                        </div>

                        <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                          {rule.description}
                        </p>

                        {/* Condition Code Snippet */}
                        <div className="mt-3 p-2.5 rounded-xl bg-stone-100/80 border border-stone-200 font-mono text-[11px] text-charcoal-800 overflow-x-auto">
                          <span className="text-stone-400 select-none mr-2">// Condition logic</span>
                          <code>{rule.condition}</code>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                          <span>Last calibrated: {rule.lastUpdated}</span>
                          <span className="text-sage-700">Governance Level: Active</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
