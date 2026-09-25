import { 
  InvestigationCase, 
  HistoricalCaseMemory, 
  PolicyRule, 
  GraphData, 
  EvidenceItem, 
  AgentActivityEvent 
} from '../types';
import { 
  MOCK_CASES, 
  MOCK_CASE_MEMORY, 
  MOCK_POLICIES 
} from '../data/mockData';

/**
 * FRAUDGRAPH AI API SERVICE
 * 
 * Provides an asynchronous service layer structured to seamlessly connect
 * to the real backend:
 * Frontend -> AI Agent -> TigerGraph MCP -> TigerGraph -> GraphRAG -> Case Memory / Policies
 */

// Simulate network latency for realistic feel
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Retrieve all cases with optional filtering
  async getCases(params?: { 
    risk?: string; 
    status?: string; 
    search?: string 
  }): Promise<InvestigationCase[]> {
    await delay(200);
    let cases = [...MOCK_CASES];

    if (params?.risk && params.risk !== 'ALL') {
      cases = cases.filter(c => c.riskLevel === params.risk);
    }

    if (params?.status && params.status !== 'ALL') {
      cases = cases.filter(c => c.status === params.status);
    }

    if (params?.search && params.search.trim()) {
      const q = params.search.toLowerCase();
      cases = cases.filter(c => 
        c.caseNumber.toLowerCase().includes(q) ||
        c.customerNumber.toLowerCase().includes(q) ||
        c.transactionNumber.toLowerCase().includes(q) ||
        c.pattern.toLowerCase().includes(q)
      );
    }

    return cases;
  },

  // Retrieve single case by ID or Case Number
  async getCaseById(caseIdOrNumber: string): Promise<InvestigationCase | null> {
    await delay(180);
    const found = MOCK_CASES.find(
      c => c.id === caseIdOrNumber || c.caseNumber.toLowerCase() === caseIdOrNumber.toLowerCase()
    );
    return found || MOCK_CASES[0];
  },

  // Retrieve Graph Data for an investigation (TigerGraph MCP query)
  async getGraphData(caseNumber: string): Promise<GraphData> {
    await delay(350);
    const c = MOCK_CASES.find(item => item.caseNumber === caseNumber);
    return c?.graphData || MOCK_CASES[0].graphData;
  },

  // Retrieve Evidence trail
  async getEvidence(caseNumber: string): Promise<EvidenceItem[]> {
    await delay(200);
    const c = MOCK_CASES.find(item => item.caseNumber === caseNumber);
    return c?.evidence || MOCK_CASES[0].evidence;
  },

  // Retrieve Historical Case Memory matches (GraphRAG vector + subgraph index)
  async getSimilarCases(_caseNumber?: string): Promise<HistoricalCaseMemory[]> {
    await delay(250);
    return MOCK_CASE_MEMORY;
  },

  // Retrieve Governance Policies
  async getPolicies(): Promise<PolicyRule[]> {
    await delay(150);
    return MOCK_POLICIES;
  },

  // Retrieve Live Agent Activity
  async getAgentActivity(caseNumber?: string): Promise<AgentActivityEvent[]> {
    await delay(180);
    const c = MOCK_CASES.find(item => item.caseNumber === caseNumber);
    return c?.agentActivity || MOCK_CASES[0].agentActivity;
  },

  // Interactive Action: Request missing evidence
  async requestEvidence(caseNumber: string, evidenceTitle: string): Promise<{ success: boolean; message: string }> {
    await delay(450);
    return {
      success: true,
      message: `Step-up authentication challenge dispatched to customer token for ${caseNumber}. Awaiting out-of-band response.`
    };
  },

  // Interactive Action: Escalate or execute Next Best Action
  async executeAction(caseNumber: string, actionCode: string): Promise<{ success: boolean; newStatus: string }> {
    await delay(500);
    return {
      success: true,
      newStatus: actionCode === 'STEP_UP_AUTH' ? 'AWAITING_EVIDENCE' : 'ESCALATED'
    };
  }
};
