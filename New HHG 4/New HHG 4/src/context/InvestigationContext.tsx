import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  InvestigationCase, 
  NavigationTab, 
  GraphNode, 
  EvidenceItem 
} from '../types';
import { MOCK_CASES } from '../data/mockData';
import { apiService } from '../services/api';

interface InvestigationContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  selectedCase: InvestigationCase;
  setSelectedCase: (caseItem: InvestigationCase) => void;
  openCase: (caseIdOrNumber: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedNode: GraphNode | null;
  setSelectedNode: (node: GraphNode | null) => void;
  architectureModalOpen: boolean;
  setArchitectureModalOpen: (open: boolean) => void;
  requestMissingEvidence: (evidenceId: string) => Promise<void>;
  escalateCurrentCase: () => Promise<void>;
  evidenceRequestedState: boolean;
  notificationMessage: string | null;
  clearNotification: () => void;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('OVERVIEW');
  const [selectedCase, setSelectedCase] = useState<InvestigationCase>(MOCK_CASES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [architectureModalOpen, setArchitectureModalOpen] = useState<boolean>(false);
  const [evidenceRequestedState, setEvidenceRequestedState] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const clearNotification = () => setNotificationMessage(null);

  const openCase = (caseIdOrNumber: string) => {
    const found = MOCK_CASES.find(
      c => c.id === caseIdOrNumber || c.caseNumber.toLowerCase() === caseIdOrNumber.toLowerCase()
    );
    if (found) {
      setSelectedCase(found);
      setSelectedNode(null);
      setCurrentTab('INVESTIGATIONS');
    }
  };

  // Interactive handler for requesting missing evidence
  const requestMissingEvidence = async (evidenceId: string) => {
    setNotificationMessage('AI Agent dispatching Step-Up Authentication challenge to customer device...');
    await apiService.requestEvidence(selectedCase.caseNumber, evidenceId);
    
    // Update local state to reflect the requested evidence
    setSelectedCase(prev => {
      const updatedEvidence: EvidenceItem[] = prev.evidence.map(ev => {
        if (ev.status === 'MISSING') {
          return {
            ...ev,
            status: 'REQUESTED' as const,
            title: 'Customer biometric/step-up verification (Dispatched)',
            description: 'Out-of-band push notification sent to enrolled device. Challenge pending customer response.'
          };
        }
        return ev;
      });

      // Recalibrate uncertainty
      return {
        ...prev,
        status: 'AWAITING_EVIDENCE',
        uncertaintyScore: 24, // reduced uncertainty!
        uncertaintyLevel: 'LOW',
        evidence: updatedEvidence,
        nextBestAction: {
          ...prev.nextBestAction,
          reason: 'Step-up challenge dispatched to customer token. Awaiting biometric confirmation.',
          executionStatus: 'TRIGGERED'
        }
      };
    });

    setEvidenceRequestedState(true);
    setNotificationMessage('Step-Up Authentication dispatched. Case status updated to Awaiting Evidence.');
    setTimeout(() => {
      clearNotification();
    }, 4500);
  };

  // Interactive handler for escalating case
  const escalateCurrentCase = async () => {
    setNotificationMessage(`Escalating case ${selectedCase.caseNumber} to Tier-2 Fraud Syndicate Unit...`);
    await apiService.executeAction(selectedCase.caseNumber, 'ESCALATE_L2');
    
    setSelectedCase(prev => ({
      ...prev,
      status: 'ESCALATED',
      nextBestAction: {
        ...prev.nextBestAction,
        executionStatus: 'EXECUTED'
      }
    }));

    setNotificationMessage(`Case ${selectedCase.caseNumber} escalated to Tier-2 Fraud Syndicate Unit.`);
    setTimeout(() => {
      clearNotification();
    }, 4500);
  };

  // Handle global search triggering
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      // Check if matches a known case
      const matched = MOCK_CASES.find(c => 
        c.caseNumber.toLowerCase() === searchQuery.toLowerCase() ||
        c.customerNumber.toLowerCase() === searchQuery.toLowerCase() ||
        c.transactionNumber.toLowerCase() === searchQuery.toLowerCase()
      );
      if (matched) {
        setSelectedCase(matched);
      }
    }
  }, [searchQuery]);

  return (
    <InvestigationContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedCase,
        setSelectedCase,
        openCase,
        searchQuery,
        setSearchQuery,
        selectedNode,
        setSelectedNode,
        architectureModalOpen,
        setArchitectureModalOpen,
        requestMissingEvidence,
        escalateCurrentCase,
        evidenceRequestedState,
        notificationMessage,
        clearNotification,
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
};

export const useInvestigation = () => {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
};
