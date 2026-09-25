import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Bot, 
  CheckCircle2, 
  X,
  ExternalLink 
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const TopHeader: React.FC = () => {
  const { 
    currentTab, 
    searchQuery, 
    setSearchQuery, 
    openCase, 
    notificationMessage, 
    clearNotification 
  } = useInvestigation();

  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    switch (currentTab) {
      case 'OVERVIEW': return 'Investigation Command Center';
      case 'INVESTIGATIONS': return 'Investigation Workspace';
      case 'CASES': return 'Case Repository';
      case 'NETWORK': return 'Graph Network Explorer';
      case 'MEMORY': return 'Case Memory & Patterns';
      case 'POLICIES': return 'Policy & Governance Engine';
      case 'SETTINGS': return 'System Architecture & Settings';
      default: return 'FraudGraph AI';
    }
  };

  const notifications = [
    { id: 1, title: 'Uncertainty threshold reached on HH-1042', time: '2m ago', type: 'alert' },
    { id: 2, title: 'TigerGraph MCP resolved 3-hop mule ring on HH-1043', time: '14m ago', type: 'info' },
    { id: 3, title: 'GraphRAG matched CASE-892 with 91% similarity', time: '38m ago', type: 'memory' }
  ];

  return (
    <header className="h-16 border-b border-stone-200/80 bg-stone-50/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Page Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold text-charcoal-800 tracking-tight">
          {getPageTitle()}
        </h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200/60 text-stone-600 font-mono">
          v2.4-agentic
        </span>
      </div>

      {/* Center: Search Bar */}
      <div className="w-96 max-w-md relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" size={15} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search case, customer, transaction, device..."
          className="w-full bg-stone-100/90 border border-stone-200/90 rounded-xl pl-9 pr-8 py-1.5 text-xs text-charcoal-800 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500 transition-all shadow-subtle"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-700"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Right: AI Agent Status + Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Real-time Notification Banner if active */}
        {notificationMessage && (
          <div className="hidden lg:flex items-center gap-2 bg-sage-50 border border-sage-200 text-sage-800 text-xs px-3 py-1.5 rounded-lg shadow-sm animate-fadeIn">
            <CheckCircle2 size={13} className="text-sage-600 flex-shrink-0" />
            <span className="truncate max-w-xs">{notificationMessage}</span>
            <button onClick={clearNotification} className="text-sage-600 hover:text-sage-800 ml-1">
              <X size={12} />
            </button>
          </div>
        )}

        {/* AI Agent Status with subtle animated sage pulse */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-50/80 border border-sage-200/80 shadow-subtle">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-600"></span>
          </span>
          <span className="text-[11px] font-medium text-sage-800 flex items-center gap-1">
            <Bot size={12} className="text-sage-700" />
            <span>AI Agent Online</span>
          </span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-charcoal-600 hover:text-charcoal-800 hover:bg-stone-200/60 transition-colors"
            title="Notifications"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-stone-100" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-stone-50 border border-stone-200 rounded-xl shadow-elevated p-3 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-2">
                <span className="text-xs font-bold text-charcoal-800">Agent Dispatches</span>
                <span className="text-[10px] text-stone-500">3 unread</span>
              </div>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div 
                    key={n.id}
                    onClick={() => {
                      openCase('HH-1042');
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded-lg hover:bg-stone-100 cursor-pointer text-xs transition-colors"
                  >
                    <p className="text-charcoal-800 font-medium leading-snug">{n.title}</p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-stone-500">
                      <span>{n.time}</span>
                      <span className="text-sage-700 flex items-center gap-0.5">
                        Inspect <ExternalLink size={9} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Analyst Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-stone-200/80">
          <div className="w-8 h-8 rounded-full bg-stone-200/80 border border-stone-300/80 flex items-center justify-center text-charcoal-700 text-xs font-semibold">
            <User size={15} />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-charcoal-800 leading-tight">Fraud Unit</p>
            <p className="text-[10px] text-stone-500 leading-tight">L2 Investigator</p>
          </div>
        </div>
      </div>
    </header>
  );
};
