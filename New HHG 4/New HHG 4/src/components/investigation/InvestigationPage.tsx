import React from 'react';
import { motion } from 'framer-motion';
import { InvestigationHeader } from './InvestigationHeader';
import { FraudGraphWorkspace } from './FraudGraphWorkspace';
import { RiskAssessmentCard } from './RiskAssessmentCard';
import { UncertaintyPanel } from './UncertaintyPanel';
import { EvidenceTimeline } from './EvidenceTimeline';
import { NextBestActionCard } from './NextBestActionCard';
import { CaseTimeline } from './CaseTimeline';
import { InvestigationJourney } from '../overview/InvestigationJourney';
import { useInvestigation } from '../../context/InvestigationContext';

export const InvestigationPage: React.FC = () => {
  const { selectedCase } = useInvestigation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 max-w-7xl mx-auto pb-16"
    >
      {/* 1. TOP: Case Information Header */}
      <InvestigationHeader />

      {/* 2. Top Progress Stepper */}
      <div className="rounded-3xl bg-stone-50 border border-stone-200/90 px-6 py-2 shadow-subtle">
        <InvestigationJourney activeStage="DECISION" />
      </div>

      {/* 3. CENTER & RIGHT: Main Workspace (Graph ~62%, Risk & Uncertainty ~38%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Large FraudGraph Workspace (62% width on desktop) */}
        <div className="lg:col-span-8">
          <FraudGraphWorkspace graphData={selectedCase.graphData} heightClass="h-[560px]" />
        </div>

        {/* Right Column: Clearly Separated Risk Assessment & Uncertainty */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* SECTION A: RISK ASSESSMENT (Coral) */}
          <RiskAssessmentCard
            score={selectedCase.riskScore}
            level={selectedCase.riskLevel}
          />

          {/* SECTION B: UNCERTAINTY (Amber) */}
          <UncertaintyPanel
            score={selectedCase.uncertaintyScore}
            level={selectedCase.uncertaintyLevel}
          />
        </div>
      </div>

      {/* 4. BOTTOM: Evidence + Next Best Action + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pt-2">
        {/* Evidence Stream */}
        <div className="lg:col-span-1">
          <EvidenceTimeline evidenceList={selectedCase.evidence} />
        </div>

        {/* Next Best Action */}
        <div className="lg:col-span-1">
          <NextBestActionCard action={selectedCase.nextBestAction} />
        </div>

        {/* Case Timeline */}
        <div className="lg:col-span-1">
          <CaseTimeline timeline={selectedCase.timeline} />
        </div>
      </div>
    </motion.div>
  );
};
