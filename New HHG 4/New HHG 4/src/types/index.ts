export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type UncertaintyLevel = 'HIGH' | 'MODERATE' | 'LOW';
export type CaseStatus = 'UNDER_INVESTIGATION' | 'AWAITING_EVIDENCE' | 'ESCALATED' | 'RESOLVED' | 'CLEARED';
export type NavigationTab = 'OVERVIEW' | 'INVESTIGATIONS' | 'CASES' | 'NETWORK' | 'MEMORY' | 'POLICIES' | 'SETTINGS';

export type EntityType = 
  | 'TRANSACTION'
  | 'CUSTOMER'
  | 'ACCOUNT'
  | 'DEVICE'
  | 'MERCHANT'
  | 'PREVIOUS_CASE'
  | 'IP_ADDRESS'
  | 'PHONE';

export interface GraphNode {
  id: string;
  type: EntityType;
  label: string;
  sublabel: string;
  x: number; // Percentage or coordinate
  y: number;
  risk?: RiskLevel;
  highlighted?: boolean;
  metadata: {
    riskSignals?: string[];
    connectedAccounts?: number;
    transactionCount?: number;
    amount?: string;
    firstSeen?: string;
    lastSeen?: string;
    similarityScore?: number;
    deviceFingerprint?: string;
    ipCountry?: string;
    category?: string;
    notes?: string;
  };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: 'OWNS' | 'USES' | 'MADE' | 'ROUTED_VIA' | 'CONNECTED_TO' | 'ASSOCIATED_WITH' | 'SHARED_BY';
  risk?: RiskLevel;
  dashed?: boolean;
  notes?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface EvidenceItem {
  id: string;
  title: string;
  source: 'Transaction History' | 'Graph Analysis' | 'Case Memory' | 'TigerGraph MCP' | 'Device Intelligence' | 'Missing';
  severity: RiskLevel | 'REQUIRED' | 'INFO';
  status: 'GATHERED' | 'MISSING' | 'REQUESTED' | 'VERIFIED';
  timestamp: string;
  description: string;
  confidenceContribution: number; // percentage
  graphReference?: string;
}

export interface NextBestActionData {
  id: string;
  recommendation: string;
  actionCode: 'STEP_UP_AUTH' | 'FREEZE_ACCOUNTS' | 'MERCHANT_HOLD' | 'CLEAR_TRANSACTION' | 'ESCALATE_L2';
  reason: string;
  requiredApprovalRole: 'Fraud Analyst' | 'Senior Investigator' | 'Automated / Policy Rule';
  policyReference: string;
  alternativeActions: string[];
  executionStatus?: 'RECOMMENDED' | 'TRIGGERED' | 'EXECUTED' | 'REJECTED';
}

export interface AgentActivityEvent {
  id: string;
  timestamp: string;
  toolUsed: 'TigerGraph MCP' | 'GraphRAG' | 'VelocityEngine' | 'CaseMemory' | 'PolicyCheck' | 'EvidenceEvaluator';
  event: string;
  details: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  isCurrent?: boolean;
}

export interface CaseTimelineItem {
  id: string;
  time: string;
  title: string;
  detail: string;
  iconType: 'signal' | 'case' | 'history' | 'device' | 'memory' | 'request' | 'risk' | 'action';
  status: 'completed' | 'active' | 'pending';
}

export interface InvestigationCase {
  id: string;
  caseNumber: string;
  customerNumber: string;
  transactionNumber: string;
  amount: number;
  formattedAmount: string;
  currency: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  uncertaintyLevel: UncertaintyLevel;
  uncertaintyScore: number; // 0 - 100
  pattern: string;
  patternDescription: string;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  triggerReason: string;
  
  // Connected investigation artifacts
  graphData: GraphData;
  evidence: EvidenceItem[];
  nextBestAction: NextBestActionData;
  agentActivity: AgentActivityEvent[];
  timeline: CaseTimelineItem[];
  missingEvidenceCount: number;
  linkedEntitiesSummary: {
    accounts: number;
    devices: number;
    merchants: number;
    historicalCases: number;
  };
}

export interface HistoricalCaseMemory {
  id: string;
  caseId: string;
  title: string;
  similarityScore: number; // percentage e.g. 91
  pattern: string;
  outcome: 'Confirmed Fraud' | 'False Positive' | 'Cleared' | 'Mitigated';
  dateClosed: string;
  matchedGraphSignatures: string[];
  relevanceExplanation: string;
  actionTaken: string;
  analystNotes: string;
}

export interface PolicyRule {
  id: string;
  category: 'Fraud Policies' | 'Evidence Requirements' | 'Approval Rules' | 'Allowed Actions' | 'Escalation Rules';
  code: string;
  title: string;
  description: string;
  condition: string;
  enforcement: 'Automated' | 'Human Sign-off' | 'Advisory';
  lastUpdated: string;
}
