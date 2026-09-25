import React from 'react';
import { HeroSection } from './HeroSection';
import { OverviewMetrics } from './OverviewMetrics';
import { FeaturedInvestigation } from './FeaturedInvestigation';
import { AgentLiveActivity } from './AgentLiveActivity';
import { RecentCasesTable } from './RecentCasesTable';

export const OverviewPage: React.FC = () => {
  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Overview Metrics (Exactly 3) */}
      <OverviewMetrics />

      {/* 3. Featured Investigation (Primary Focus) */}
      <FeaturedInvestigation />

      {/* 4. Supporting Information: Agent Activity & Recent Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-1">
          <AgentLiveActivity />
        </div>
        <div className="lg:col-span-2">
          <RecentCasesTable />
        </div>
      </div>
    </div>
  );
};
