import React from 'react';
import { 
  LayoutDashboard, 
  SearchCode, 
  FolderKanban, 
  Network, 
  BrainCircuit, 
  ShieldCheck, 
  Settings,
  Sparkles,
  GitFork
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import { NavigationTab } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, setArchitectureModalOpen } = useInvestigation();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'OVERVIEW', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'INVESTIGATIONS', label: 'Investigation', icon: <SearchCode size={18} />, badge: 'Live' },
    { id: 'CASES', label: 'Cases', icon: <FolderKanban size={18} />, badge: '12' },
    { id: 'NETWORK', label: 'Network', icon: <Network size={18} /> },
    { id: 'MEMORY', label: 'Case Memory', icon: <BrainCircuit size={18} /> },
  ];

  const secondaryNav: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'POLICIES', label: 'Policies', icon: <ShieldCheck size={18} /> },
    { id: 'SETTINGS', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-stone-50/90 border-r border-stone-200/80 flex flex-col justify-between h-screen sticky top-0 select-none z-20 backdrop-blur-md">
      {/* Brand Header */}
      <div>
        <div className="p-5 pb-6 border-b border-stone-200/60">
          <div className="flex items-center gap-3">
            {/* Logo Badge */}
            <div className="w-9 h-9 rounded-lg bg-sage-700 text-stone-50 flex items-center justify-center font-bold text-sm tracking-wider shadow-subtle flex-shrink-0">
              FG
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-charcoal-800 tracking-tight">FraudGraph</span>
                <span className="text-xs uppercase px-1.5 py-0.5 rounded font-semibold bg-sage-100 text-sage-700 tracking-wider">AI</span>
              </div>
              <p className="text-[11px] text-stone-600 font-medium tracking-wide mt-0.5">
                Investigate. Understand. Act.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="p-3 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 px-3 py-1.5">
            WORKSPACE
          </p>
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-sage-100/80 text-sage-800 font-semibold border-l-2 border-sage-700 shadow-sm'
                    : 'text-charcoal-600 hover:text-charcoal-800 hover:bg-stone-200/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-sage-700' : 'text-stone-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                    isActive ? 'bg-sage-200/70 text-sage-800' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-stone-200/60" />

        {/* Secondary Navigation */}
        <nav className="p-3 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 px-3 py-1.5">
            GOVERNANCE
          </p>
          {secondaryNav.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-sage-100/80 text-sage-800 font-semibold border-l-2 border-sage-700 shadow-sm'
                    : 'text-charcoal-600 hover:text-charcoal-800 hover:bg-stone-200/60'
                }`}
              >
                <span className={isActive ? 'text-sage-700' : 'text-stone-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Architecture Visual Quick Trigger Banner */}
      <div className="p-3.5 m-3 rounded-xl bg-sage-50/70 border border-sage-200/80">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-sage-800">
            <GitFork size={13} className="text-sage-600" />
            <span>Architecture Flow</span>
          </div>
          <span className="text-[9px] font-mono uppercase bg-sage-200/60 text-sage-800 px-1 py-0.5 rounded">MCP</span>
        </div>
        <p className="text-[11px] text-stone-600 leading-snug mb-2">
          TigerGraph MCP + GraphRAG pipeline connected.
        </p>
        <button
          onClick={() => setArchitectureModalOpen(true)}
          className="w-full flex items-center justify-center gap-1 text-[11px] font-semibold text-sage-700 bg-white hover:bg-sage-100/60 py-1.5 px-2.5 rounded-lg border border-sage-200 transition-colors shadow-subtle"
        >
          <Sparkles size={12} />
          <span>View Agent Pipeline</span>
        </button>
      </div>
    </aside>
  );
};
