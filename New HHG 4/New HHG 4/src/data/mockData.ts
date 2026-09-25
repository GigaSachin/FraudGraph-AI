import { 
  InvestigationCase, 
  HistoricalCaseMemory, 
  PolicyRule, 
  GraphData, 
  EvidenceItem, 
  NextBestActionData, 
  AgentActivityEvent, 
  CaseTimelineItem 
} from '../types';

// Graph topology specifically organized to guarantee ZERO node and label overlaps
// Coordinates are represented in 0-100 normalized canvas grid
export const PRIMARY_CASE_GRAPH: GraphData = {
  nodes: [
    {
      id: 'TX-8821',
      type: 'TRANSACTION',
      label: 'TRANSACTION',
      sublabel: 'TX-8821',
      x: 50,
      y: 44,
      risk: 'HIGH',
      metadata: {
        amount: '₹80,000',
        firstSeen: '2026-09-24 09:38:12',
        riskSignals: ['Unusual Velocity (+320%)', 'Immediate Outflow', 'New Merchant Category'],
        notes: 'Out-of-band high value transfer initiated via mobile channel.'
      }
    },
    {
      id: 'CUST-1092',
      type: 'CUSTOMER',
      label: 'CUSTOMER',
      sublabel: 'CUST-1092',
      x: 18,
      y: 20,
      risk: 'MEDIUM',
      metadata: {
        connectedAccounts: 3,
        firstSeen: '2023-04-12',
        riskSignals: ['Recent contact info change (36h ago)'],
        notes: 'KYC verified tier-2 individual profile.'
      }
    },
    {
      id: 'ACC-4431',
      type: 'ACCOUNT',
      label: 'PRIMARY ACCOUNT',
      sublabel: 'ACC-4431',
      x: 48,
      y: 18,
      risk: 'HIGH',
      metadata: {
        amount: 'Balance: ₹14,200',
        transactionCount: 342,
        firstSeen: '2023-04-14',
        riskSignals: ['Sudden balance depletion in 8 mins'],
        notes: 'Originating source account for transaction TX-8821.'
      }
    },
    {
      id: 'D-221',
      type: 'DEVICE',
      label: 'DEVICE',
      sublabel: 'D-221',
      x: 18,
      y: 68,
      risk: 'HIGH',
      metadata: {
        connectedAccounts: 3,
        transactionCount: 18,
        deviceFingerprint: 'fp_a7f921_darwin',
        riskSignals: ['Shared Device (3 distinct owners)', 'Hardware ID mismatch', 'Rooted / Jailbroken indicator'],
        notes: 'Previously flagged in fraud investigation CASE-892.'
      }
    },
    {
      id: 'ACC-7652',
      type: 'ACCOUNT',
      label: 'LINKED ACCOUNT',
      sublabel: 'ACC-7652',
      x: 82,
      y: 18,
      risk: 'HIGH',
      metadata: {
        connectedAccounts: 2,
        transactionCount: 29,
        riskSignals: ['Associated with shared device D-221'],
        notes: 'Secondary recipient account created 4 days ago.'
      }
    },
    {
      id: 'M-8819',
      type: 'MERCHANT',
      label: 'MERCHANT',
      sublabel: 'M-8819',
      x: 82,
      y: 50,
      risk: 'MEDIUM',
      metadata: {
        category: 'Digital Gaming & Gift Cards',
        firstSeen: '2025-11-03',
        riskSignals: ['High chargeback ratio (4.2%)', 'High velocity settlement'],
        notes: 'Frequent liquidation endpoint for compromised credentials.'
      }
    },
    {
      id: 'CASE-892',
      type: 'PREVIOUS_CASE',
      label: 'PREVIOUS CASE',
      sublabel: 'CASE-892',
      x: 48,
      y: 84,
      risk: 'HIGH',
      metadata: {
        similarityScore: 91,
        riskSignals: ['Identical device fingerprint', 'Shared payout destination'],
        notes: 'Confirmed account takeover ring resolved 14 days ago.'
      }
    },
    {
      id: 'ACC-9948',
      type: 'ACCOUNT',
      label: 'MULE ACCOUNT',
      sublabel: 'ACC-9948',
      x: 82,
      y: 80,
      risk: 'HIGH',
      metadata: {
        transactionCount: 9,
        riskSignals: ['Rapid cashout beneficiary', 'Flagged in CASE-892'],
        notes: 'Intermediary clearing account with zero resting balance.'
      }
    }
  ],
  edges: [
    {
      id: 'e1',
      source: 'CUST-1092',
      target: 'ACC-4431',
      label: 'OWNS',
      risk: 'LOW'
    },
    {
      id: 'e2',
      source: 'ACC-4431',
      target: 'TX-8821',
      label: 'MADE',
      risk: 'HIGH'
    },
    {
      id: 'e3',
      source: 'TX-8821',
      target: 'D-221',
      label: 'USES',
      risk: 'HIGH'
    },
    {
      id: 'e4',
      source: 'TX-8821',
      target: 'M-8819',
      label: 'ROUTED_VIA',
      risk: 'MEDIUM'
    },
    {
      id: 'e5',
      source: 'D-221',
      target: 'ACC-7652',
      label: 'CONNECTED_TO',
      risk: 'HIGH',
      dashed: true
    },
    {
      id: 'e6',
      source: 'D-221',
      target: 'CASE-892',
      label: 'ASSOCIATED_WITH',
      risk: 'HIGH'
    },
    {
      id: 'e7',
      source: 'CASE-892',
      target: 'ACC-9948',
      label: 'CONNECTED_TO',
      risk: 'HIGH',
      dashed: true
    },
    {
      id: 'e8',
      source: 'TX-8821',
      target: 'ACC-7652',
      label: 'CONNECTED_TO',
      risk: 'MEDIUM',
      dashed: true
    }
  ]
};

export const PRIMARY_CASE_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EV-1',
    title: 'Unusual transaction amount',
    source: 'Transaction History',
    severity: 'HIGH',
    status: 'GATHERED',
    timestamp: '09:41',
    description: 'Transaction value of ₹80,000 exceeds 90-day moving average by 320% for customer profile.',
    confidenceContribution: 28,
    graphReference: 'TX-8821'
  },
  {
    id: 'EV-2',
    title: 'Shared device fingerprint',
    source: 'Graph Analysis',
    severity: 'HIGH',
    status: 'GATHERED',
    timestamp: '09:42',
    description: 'Hardware fingerprint D-221 links 3 distinct KYC accounts within TigerGraph 2-hop traversal.',
    confidenceContribution: 34,
    graphReference: 'D-221'
  },
  {
    id: 'EV-3',
    title: 'Similar historical fraud case',
    source: 'Case Memory',
    severity: 'MEDIUM',
    status: 'GATHERED',
    timestamp: '09:42',
    description: 'Vector match of 91% similarity with CASE-892 ("Shared device syndicate") via GraphRAG index.',
    confidenceContribution: 25,
    graphReference: 'CASE-892'
  },
  {
    id: 'EV-4',
    title: 'Customer biometric/step-up verification',
    source: 'Missing',
    severity: 'REQUIRED',
    status: 'MISSING',
    timestamp: '09:43',
    description: 'Out-of-band mobile verification token was bypassed due to silent SMS timeout fallback.',
    confidenceContribution: 0
  }
];

export const PRIMARY_CASE_TIMELINE: CaseTimelineItem[] = [
  {
    id: 'TL-1',
    time: '09:40',
    title: 'Fraud signal received',
    detail: 'Real-time scoring rule trigger on ₹80,000 outbound transfer.',
    iconType: 'signal',
    status: 'completed'
  },
  {
    id: 'TL-2',
    time: '09:41',
    title: 'Investigation case created',
    detail: 'Autonomous Agent initialized case workspace and attached CUST-1092 profile.',
    iconType: 'case',
    status: 'completed'
  },
  {
    id: 'TL-3',
    time: '09:41',
    title: 'Transaction history retrieved',
    detail: 'Retrieved 180-day baseline; detected 320% burst above typical user variance.',
    iconType: 'history',
    status: 'completed'
  },
  {
    id: 'TL-4',
    time: '09:42',
    title: 'Connected device identified',
    detail: 'TigerGraph MCP sub-query resolved D-221 to 3 distinct customer accounts.',
    iconType: 'device',
    status: 'completed'
  },
  {
    id: 'TL-5',
    time: '09:42',
    title: 'Similar case retrieved',
    detail: 'GraphRAG matched CASE-892 (similarity: 91%, outcome: confirmed fraud).',
    iconType: 'memory',
    status: 'completed'
  },
  {
    id: 'TL-6',
    time: '09:43',
    title: 'Additional evidence requested',
    detail: 'Identified missing verification. Flagged step-up requirement.',
    iconType: 'request',
    status: 'completed'
  },
  {
    id: 'TL-7',
    time: '09:44',
    title: 'Risk & uncertainty reassessed',
    detail: 'Confidence calibrated to 87% with moderate uncertainty pending customer response.',
    iconType: 'risk',
    status: 'completed'
  },
  {
    id: 'TL-8',
    time: '09:44',
    title: 'Next Best Action recommended',
    detail: 'Proposed STEP-UP AUTHENTICATION with escalation pathway for Fraud Analyst sign-off.',
    iconType: 'action',
    status: 'active'
  }
];

export const PRIMARY_CASE_AGENT_ACTIVITY: AgentActivityEvent[] = [
  {
    id: 'ACT-1',
    timestamp: '09:40:14',
    toolUsed: 'VelocityEngine',
    event: 'Fraud signal received',
    details: 'Velocity alert on TX-8821: ₹80,000 to new beneficiary within 2 mins of login.',
    status: 'COMPLETED'
  },
  {
    id: 'ACT-2',
    timestamp: '09:41:02',
    toolUsed: 'TigerGraph MCP',
    event: 'Transaction history analyzed',
    details: 'GSQL query retrieved 6-month transaction subgraph across 3 accounts.',
    status: 'COMPLETED'
  },
  {
    id: 'ACT-3',
    timestamp: '09:42:15',
    toolUsed: 'TigerGraph MCP',
    event: 'Connected device identified',
    details: 'Identified Device D-221 shared across ACC-4431, ACC-7652, and ACC-9948.',
    status: 'COMPLETED'
  },
  {
    id: 'ACT-4',
    timestamp: '09:42:48',
    toolUsed: 'CaseMemory',
    event: 'Similar case found',
    details: 'GraphRAG retrieved CASE-892 with 91% subgraph topology match.',
    status: 'COMPLETED'
  },
  {
    id: 'ACT-5',
    timestamp: '09:44:00',
    toolUsed: 'EvidenceEvaluator',
    event: 'Assessing uncertainty',
    details: 'Synthesizing evidence weights and uncertainty bounds for Next Best Action.',
    status: 'IN_PROGRESS',
    isCurrent: true
  }
];

export const PRIMARY_CASE_NEXT_BEST_ACTION: NextBestActionData = {
  id: 'NBA-1042',
  recommendation: 'REQUEST STEP-UP AUTHENTICATION',
  actionCode: 'STEP_UP_AUTH',
  reason: 'Current evidence indicates elevated risk, but customer verification is unavailable.',
  requiredApprovalRole: 'Fraud Analyst',
  policyReference: 'POL-AUTH-204 (High-Risk Anomaly Verification Rule)',
  alternativeActions: ['Temporary 2h Transaction Hold', 'Full Account Freeze (ACC-4431)', 'Escalate to Tier-2 Syndicate Unit'],
  executionStatus: 'RECOMMENDED'
};

export const MOCK_CASES: InvestigationCase[] = [
  {
    id: 'case-1042',
    caseNumber: 'HH-1042',
    customerNumber: 'CUST-1092',
    transactionNumber: 'TX-8821',
    amount: 80000,
    formattedAmount: '₹80,000',
    currency: 'INR',
    riskLevel: 'HIGH',
    riskScore: 87,
    uncertaintyLevel: 'MODERATE',
    uncertaintyScore: 42,
    pattern: 'Shared Device & Account Syndicate',
    patternDescription: 'Multiple accounts linked via single hardware fingerprint with immediate high-value liquidation.',
    status: 'UNDER_INVESTIGATION',
    createdAt: '2026-09-24 09:40:10',
    updatedAt: '2 mins ago',
    triggerReason: 'High-value transfer following credential update on shared hardware ID.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: PRIMARY_CASE_NEXT_BEST_ACTION,
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 1,
    linkedEntitiesSummary: {
      accounts: 3,
      devices: 1,
      merchants: 1,
      historicalCases: 1
    }
  },
  {
    id: 'case-1043',
    caseNumber: 'HH-1043',
    customerNumber: 'CUST-3041',
    transactionNumber: 'TX-9104',
    amount: 145000,
    formattedAmount: '₹145,000',
    currency: 'INR',
    riskLevel: 'CRITICAL',
    riskScore: 94,
    uncertaintyLevel: 'LOW',
    uncertaintyScore: 18,
    pattern: 'Mule Ring Liquidation',
    patternDescription: 'Fan-out payment structure routing through 4 student accounts within 12 minutes.',
    status: 'ESCALATED',
    createdAt: '2026-09-24 09:15:00',
    updatedAt: '12 mins ago',
    triggerReason: 'Graph anomaly: 4 newly provisioned accounts receiving concurrent transfers from single clearing node.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1043',
      recommendation: 'FREEZE BENEFICIARY ACCOUNTS',
      actionCode: 'FREEZE_ACCOUNTS',
      reason: 'Conclusive 4-hop ring detected with matching mule cashout node.',
      requiredApprovalRole: 'Senior Investigator',
      policyReference: 'POL-MULE-109',
      alternativeActions: ['Report to FIU', 'Revoke API Tokens'],
      executionStatus: 'RECOMMENDED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 0,
    linkedEntitiesSummary: {
      accounts: 5,
      devices: 2,
      merchants: 0,
      historicalCases: 2
    }
  },
  {
    id: 'case-1044',
    caseNumber: 'HH-1044',
    customerNumber: 'CUST-2180',
    transactionNumber: 'TX-7649',
    amount: 52000,
    formattedAmount: '₹52,000',
    currency: 'INR',
    riskLevel: 'HIGH',
    riskScore: 82,
    uncertaintyLevel: 'HIGH',
    uncertaintyScore: 68,
    pattern: 'Velocity Surge & New Beneficiary',
    patternDescription: '5 transfers executed within 60 seconds to newly added digital wallet.',
    status: 'AWAITING_EVIDENCE',
    createdAt: '2026-09-24 08:52:10',
    updatedAt: '28 mins ago',
    triggerReason: 'Velocity limit exceeded by 400% on freshly added recipient.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1044',
      recommendation: 'REQUEST STEP-UP AUTHENTICATION',
      actionCode: 'STEP_UP_AUTH',
      reason: 'Elevated uncertainty due to lack of historical telemetry on recipient wallet.',
      requiredApprovalRole: 'Fraud Analyst',
      policyReference: 'POL-AUTH-204',
      alternativeActions: ['Place 4h Cooling Period', 'Cancel Outgoing Transfers'],
      executionStatus: 'RECOMMENDED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 2,
    linkedEntitiesSummary: {
      accounts: 2,
      devices: 1,
      merchants: 1,
      historicalCases: 0
    }
  },
  {
    id: 'case-1045',
    caseNumber: 'HH-1045',
    customerNumber: 'CUST-8831',
    transactionNumber: 'TX-6532',
    amount: 98000,
    formattedAmount: '₹98,000',
    currency: 'INR',
    riskLevel: 'HIGH',
    riskScore: 89,
    uncertaintyLevel: 'LOW',
    uncertaintyScore: 22,
    pattern: 'Account Takeover / SIM Swap',
    patternDescription: 'SIM swap carrier ping registered 4 hours prior to password reset and high-value wire.',
    status: 'UNDER_INVESTIGATION',
    createdAt: '2026-09-24 08:30:00',
    updatedAt: '45 mins ago',
    triggerReason: 'Telco telco-carrier signal reported recent IMSI swap on primary MFA device.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1045',
      recommendation: 'LOCK DIGITAL BANKING & CALL CUSTOMER',
      actionCode: 'FREEZE_ACCOUNTS',
      reason: 'Confirmed carrier-level SIM swap preceding authentication resets.',
      requiredApprovalRole: 'Senior Investigator',
      policyReference: 'POL-ATO-301',
      alternativeActions: ['Step-up via video KYC', 'Revoke active sessions'],
      executionStatus: 'RECOMMENDED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 0,
    linkedEntitiesSummary: {
      accounts: 2,
      devices: 2,
      merchants: 1,
      historicalCases: 1
    }
  },
  {
    id: 'case-1046',
    caseNumber: 'HH-1046',
    customerNumber: 'CUST-4119',
    transactionNumber: 'TX-5201',
    amount: 19500,
    formattedAmount: '₹19,500',
    currency: 'INR',
    riskLevel: 'MEDIUM',
    riskScore: 64,
    uncertaintyLevel: 'MODERATE',
    uncertaintyScore: 48,
    pattern: 'Structured Micro-Deposits (Smurfing)',
    patternDescription: 'Repeated transactions just below ₹20,000 compliance threshold across multiple UPI handles.',
    status: 'UNDER_INVESTIGATION',
    createdAt: '2026-09-24 08:05:00',
    updatedAt: '1 hour ago',
    triggerReason: 'Structuring detection pattern matched 6 consecutive transactions under reporting threshold.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1046',
      recommendation: 'REQUEST SOURCE OF FUNDS DOCUMENTATION',
      actionCode: 'STEP_UP_AUTH',
      reason: 'Aggregated transactions suggest deliberate avoidance of CTR threshold.',
      requiredApprovalRole: 'Fraud Analyst',
      policyReference: 'POL-AML-014',
      alternativeActions: ['Escalate to AML Unit', 'Aggregate Reporting Threshold'],
      executionStatus: 'RECOMMENDED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 1,
    linkedEntitiesSummary: {
      accounts: 4,
      devices: 1,
      merchants: 0,
      historicalCases: 1
    }
  },
  {
    id: 'case-1047',
    caseNumber: 'HH-1047',
    customerNumber: 'CUST-9014',
    transactionNumber: 'TX-4481',
    amount: 220000,
    formattedAmount: '₹220,000',
    currency: 'INR',
    riskLevel: 'CRITICAL',
    riskScore: 96,
    uncertaintyLevel: 'LOW',
    uncertaintyScore: 12,
    pattern: 'Cross-Border Merchant Laundering',
    patternDescription: 'Funds routed through high-risk offshore gaming merchant with zero gameplay activity.',
    status: 'ESCALATED',
    createdAt: '2026-09-24 07:42:00',
    updatedAt: '1.5 hours ago',
    triggerReason: 'Graph link to known rogue merchant node M-7104 sanctioned in cross-border investigation.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1047',
      recommendation: 'BLOCK MERCHANT & ESCALATE TO FIU',
      actionCode: 'MERCHANT_HOLD',
      reason: 'Direct edge connection to sanctioned merchant entity in TigerGraph knowledge base.',
      requiredApprovalRole: 'Senior Investigator',
      policyReference: 'POL-SANCT-002',
      alternativeActions: ['Freeze Source Account', 'File STR Report'],
      executionStatus: 'RECOMMENDED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 0,
    linkedEntitiesSummary: {
      accounts: 3,
      devices: 2,
      merchants: 2,
      historicalCases: 3
    }
  },
  {
    id: 'case-1048',
    caseNumber: 'HH-1048',
    customerNumber: 'CUST-5572',
    transactionNumber: 'TX-3990',
    amount: 35000,
    formattedAmount: '₹35,000',
    currency: 'INR',
    riskLevel: 'MEDIUM',
    riskScore: 58,
    uncertaintyLevel: 'HIGH',
    uncertaintyScore: 71,
    pattern: 'Compromised API Credential Spike',
    patternDescription: 'Sudden burst of programmatic payments from headless browser user-agent.',
    status: 'AWAITING_EVIDENCE',
    createdAt: '2026-09-24 07:10:00',
    updatedAt: '2 hours ago',
    triggerReason: 'User-agent anomaly: Playwright automation fingerprint detected during transaction signing.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1048',
      recommendation: 'REVOKE API TOKEN & PROMPT RE-AUTH',
      actionCode: 'STEP_UP_AUTH',
      reason: 'Automated script headers detected without corresponding interactive session.',
      requiredApprovalRole: 'Fraud Analyst',
      policyReference: 'POL-API-101',
      alternativeActions: ['Throttle Rate Limit', 'Require Device Re-registration'],
      executionStatus: 'RECOMMENDED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 2,
    linkedEntitiesSummary: {
      accounts: 1,
      devices: 1,
      merchants: 1,
      historicalCases: 0
    }
  },
  {
    id: 'case-1049',
    caseNumber: 'HH-1049',
    customerNumber: 'CUST-7230',
    transactionNumber: 'TX-2911',
    amount: 65000,
    formattedAmount: '₹65,000',
    currency: 'INR',
    riskLevel: 'HIGH',
    riskScore: 79,
    uncertaintyLevel: 'MODERATE',
    uncertaintyScore: 38,
    pattern: 'Dormant Account Reactivation',
    patternDescription: 'Account inactive for 410 days received sudden inflow and immediate outbound transfer.',
    status: 'UNDER_INVESTIGATION',
    createdAt: '2026-09-24 06:45:00',
    updatedAt: '2.5 hours ago',
    triggerReason: 'Dormant account reactivation rule triggered by immediate debit following transfer.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1049',
      recommendation: 'TEMPORARY HOLD PENDING RE-KYC',
      actionCode: 'STEP_UP_AUTH',
      reason: 'High dormancy period followed by rapid outbound transaction matches mule reactivation.',
      requiredApprovalRole: 'Fraud Analyst',
      policyReference: 'POL-DORM-005',
      alternativeActions: ['Request Photo ID Upload', 'Escalate to Branch Manager'],
      executionStatus: 'RECOMMENDED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 1,
    linkedEntitiesSummary: {
      accounts: 2,
      devices: 1,
      merchants: 0,
      historicalCases: 1
    }
  },
  {
    id: 'case-1050',
    caseNumber: 'HH-1050',
    customerNumber: 'CUST-1940',
    transactionNumber: 'TX-1884',
    amount: 175000,
    formattedAmount: '₹175,000',
    currency: 'INR',
    riskLevel: 'CRITICAL',
    riskScore: 92,
    uncertaintyLevel: 'LOW',
    uncertaintyScore: 19,
    pattern: 'High-Value Rapid Drain',
    patternDescription: 'Entire savings account liquidated within 4 minutes across three virtual cards.',
    status: 'ESCALATED',
    createdAt: '2026-09-24 05:50:00',
    updatedAt: '3 hours ago',
    triggerReason: 'Drain velocity alert: 98% balance liquidated across newly generated virtual card tokens.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1050',
      recommendation: 'IMMEDIATE CARD SUSPENSION & REVERSAL',
      actionCode: 'FREEZE_ACCOUNTS',
      reason: 'Rapid card issuance and instant merchant drain match compromised banking credential.',
      requiredApprovalRole: 'Senior Investigator',
      policyReference: 'POL-CARD-402',
      alternativeActions: ['Recall Clearing Batch', 'Notify Card Network'],
      executionStatus: 'RECOMMENDED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 0,
    linkedEntitiesSummary: {
      accounts: 3,
      devices: 2,
      merchants: 3,
      historicalCases: 2
    }
  },
  {
    id: 'case-1051',
    caseNumber: 'HH-1051',
    customerNumber: 'CUST-6318',
    transactionNumber: 'TX-1209',
    amount: 42000,
    formattedAmount: '₹42,000',
    currency: 'INR',
    riskLevel: 'MEDIUM',
    riskScore: 54,
    uncertaintyLevel: 'HIGH',
    uncertaintyScore: 65,
    pattern: 'Geolocation Jump / Proxy Spoofing',
    patternDescription: 'Login originating from Tor exit node 12 minutes after in-person ATM inquiry.',
    status: 'AWAITING_EVIDENCE',
    createdAt: '2026-09-24 05:15:00',
    updatedAt: '4 hours ago',
    triggerReason: 'Impossible travel velocity: 4,000 km physical distance in 12 minutes.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1051',
      recommendation: 'REQUEST IN-APP LOCATION VERIFICATION',
      actionCode: 'STEP_UP_AUTH',
      reason: 'Tor proxy obfuscates true user origin; requires native GPS confirmation.',
      requiredApprovalRole: 'Fraud Analyst',
      policyReference: 'POL-GEO-108',
      alternativeActions: ['Challenge with SMS OTP', 'Allow with Risk Tag'],
      executionStatus: 'RECOMMENDED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 1,
    linkedEntitiesSummary: {
      accounts: 1,
      devices: 2,
      merchants: 1,
      historicalCases: 0
    }
  },
  {
    id: 'case-1052',
    caseNumber: 'HH-1052',
    customerNumber: 'CUST-8022',
    transactionNumber: 'TX-0941',
    amount: 31000,
    formattedAmount: '₹31,000',
    currency: 'INR',
    riskLevel: 'LOW',
    riskScore: 32,
    uncertaintyLevel: 'LOW',
    uncertaintyScore: 15,
    pattern: 'Recurring Payroll Surge',
    patternDescription: 'Monthly corporate disbursement cycle; standard deviation within expected variance.',
    status: 'CLEARED',
    createdAt: '2026-09-24 04:30:00',
    updatedAt: '5 hours ago',
    triggerReason: 'Routine threshold alert for bulk salary distribution batch.',
    graphData: PRIMARY_CASE_GRAPH,
    evidence: PRIMARY_CASE_EVIDENCE,
    nextBestAction: {
      id: 'NBA-1052',
      recommendation: 'AUTO-APPROVE UNDER CORPORATE POLICY',
      actionCode: 'CLEAR_TRANSACTION',
      reason: 'Historical recurring payroll pattern matches verified company entity graph.',
      requiredApprovalRole: 'Automated / Policy Rule',
      policyReference: 'POL-CORP-001',
      alternativeActions: ['None required'],
      executionStatus: 'EXECUTED'
    },
    agentActivity: PRIMARY_CASE_AGENT_ACTIVITY,
    timeline: PRIMARY_CASE_TIMELINE,
    missingEvidenceCount: 0,
    linkedEntitiesSummary: {
      accounts: 1,
      devices: 1,
      merchants: 0,
      historicalCases: 0
    }
  }
];

export const MOCK_CASE_MEMORY: HistoricalCaseMemory[] = [
  {
    id: 'MEM-892',
    caseId: 'CASE-892',
    title: 'Multi-Account Takeover via Shared Emulated Device',
    similarityScore: 91,
    pattern: 'Shared Device Syndicate + Rapid Payout',
    outcome: 'Confirmed Fraud',
    dateClosed: '2026-09-10',
    matchedGraphSignatures: [
      'Identical hardware canvas fingerprint (Darwin kernel)',
      '3 KYC identities registered on same MAC address',
      'Immediate liquidation to digital gift card merchant within 6 minutes of deposit'
    ],
    relevanceExplanation: 'Both cases exhibit exact device signature D-221 operating as a nexus for disparate accounts, using the same digital gaming merchant (M-8819) as a cashout channel.',
    actionTaken: 'Blacklisted device fingerprint, froze linked mule accounts ACC-9948 & ACC-7652, recovered ₹42,000 via merchant escrow reversal.',
    analystNotes: 'Syndicate uses Android emulators with mocked battery status. Device fingerprint remained persistent despite cleared application caches.'
  },
  {
    id: 'MEM-741',
    caseId: 'CASE-741',
    title: 'High-Velocity Out-of-State Jewelry Purchase',
    similarityScore: 78,
    pattern: 'Unusual Transaction Behavior & Spike',
    outcome: 'Cleared',
    dateClosed: '2026-08-28',
    matchedGraphSignatures: [
      'Transaction amount >300% above 90-day moving average',
      'First-time high-end luxury merchant connection'
    ],
    relevanceExplanation: 'Initial velocity spike matched fraud heuristics, but subsequent out-of-band biometric verification and zero shared device connections confirmed legitimate high-value wedding expenditure.',
    actionTaken: 'Released transaction hold after successful interactive video authentication. Adjusted customer baseline threshold.',
    analystNotes: 'Important false-positive baseline: single spike without shared device topology should not be auto-frozen without prompt step-up verification.'
  },
  {
    id: 'MEM-629',
    caseId: 'CASE-629',
    title: 'Distributed Smurfing Ring across 6 Neobanks',
    similarityScore: 84,
    pattern: 'Fan-Out Micro Transfers',
    outcome: 'Confirmed Fraud',
    dateClosed: '2026-08-14',
    matchedGraphSignatures: [
      'Sub-threshold micro transactions (₹19,000 - ₹19,800)',
      'Common IP subnet 103.24.x.x proxy cluster',
      'Shared UPI beneficiary routing'
    ],
    relevanceExplanation: 'Demonstrates graph topology where initial individual transactions appear benign, but 2-hop TigerGraph aggregation exposes an organized smurfing operation.',
    actionTaken: 'Consolidated graph evidence handed to Cyber Crime Cell. All 6 destination accounts embargoed.',
    analystNotes: 'Traditional rule engines missed this because individual transactions passed threshold checks. TigerGraph multi-hop analysis caught the common sink node.'
  },
  {
    id: 'MEM-518',
    caseId: 'CASE-518',
    title: 'Dormant Account Credential Stuffing',
    similarityScore: 72,
    pattern: 'Dormancy Followed by Immediate Drain',
    outcome: 'Mitigated',
    dateClosed: '2026-07-30',
    matchedGraphSignatures: [
      'Account inactive >300 days',
      'Password reset followed by new device registration in under 5 minutes',
      'Immediate RTGS transfer attempt'
    ],
    relevanceExplanation: 'Shares timeline signature with current dormant account attacks, reinforcing the policy requirement for a 24-hour cooling window on dormant password updates.',
    actionTaken: 'Triggered step-up SMS OTP which caught unauthorized access attempt. Account secured.',
    analystNotes: 'Customer confirmed their email password was leaked in third-party data breach.'
  }
];

export const MOCK_POLICIES: PolicyRule[] = [
  {
    id: 'POL-1',
    category: 'Fraud Policies',
    code: 'POL-FRAUD-101',
    title: 'High Velocity Transaction Anomaly Rule',
    description: 'Any transaction exceeding 300% of the customer 90-day rolling average must trigger automated graph expansion and risk scoring.',
    condition: 'TransactionAmount > (3.0 * RollingAvg90d) AND AccountAge > 30d',
    enforcement: 'Automated',
    lastUpdated: '2026-08-01'
  },
  {
    id: 'POL-2',
    category: 'Fraud Policies',
    code: 'POL-FRAUD-104',
    title: 'Shared Device Multi-Account Threshold',
    description: 'When a hardware fingerprint or device ID links more than 2 distinct KYC-verified accounts, all high-value transactions require secondary verification.',
    condition: 'ConnectedKYCCount(DeviceID) > 2 AND TransactionAmount >= ₹50,000',
    enforcement: 'Automated',
    lastUpdated: '2026-09-12'
  },
  {
    id: 'POL-3',
    category: 'Evidence Requirements',
    code: 'POL-EVID-201',
    title: 'Mandatory Step-Up Evidence for High Uncertainty Cases',
    description: 'If overall investigation uncertainty exceeds 35%, autonomous actions cannot freeze or reject transactions without customer verification evidence or manual analyst sign-off.',
    condition: 'UncertaintyScore >= 35% AND ActionType IN (FREEZE, REJECT)',
    enforcement: 'Human Sign-off',
    lastUpdated: '2026-09-01'
  },
  {
    id: 'POL-4',
    category: 'Evidence Requirements',
    code: 'POL-EVID-204',
    title: 'GraphRAG Case Memory Corroboration Standard',
    description: 'Historical case matches retrieved via TigerGraph MCP with similarity score >= 85% constitute primary evidentiary weight in risk calculations.',
    condition: 'GraphRAGSimilarityScore >= 85%',
    enforcement: 'Advisory',
    lastUpdated: '2026-07-15'
  },
  {
    id: 'POL-5',
    category: 'Approval Rules',
    code: 'POL-APPR-301',
    title: 'Human-in-the-Loop Thresholds for High-Risk Actions',
    description: 'Any action affecting customer account status exceeding ₹50,000 must be reviewed and approved by a certified Fraud Analyst or Senior Investigator.',
    condition: 'RiskScore >= 80 OR TransactionAmount >= ₹50,000',
    enforcement: 'Human Sign-off',
    lastUpdated: '2026-09-15'
  },
  {
    id: 'POL-6',
    category: 'Allowed Actions',
    code: 'POL-ACT-402',
    title: 'Step-Up Authentication Dispatch Authority',
    description: 'AI Agent is authorized to automatically dispatch out-of-band biometric or in-app push step-up challenges without delaying downstream processing.',
    condition: 'RiskLevel IN (MEDIUM, HIGH) AND MissingEvidence(STEP_UP_AUTH) == TRUE',
    enforcement: 'Automated',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'POL-7',
    category: 'Escalation Rules',
    code: 'POL-ESC-501',
    title: 'Multi-Hop Mule Ring Immediate Escalation',
    description: 'When TigerGraph GSQL graph traversal detects >= 3 connected accounts with concurrent outgoing transactions to identical destination nodes, escalate immediately to Tier-2 Syndicate Unit.',
    condition: 'ConnectedMuleNodes >= 3 AND TransactionWindow <= 15m',
    enforcement: 'Automated',
    lastUpdated: '2026-09-18'
  }
];
