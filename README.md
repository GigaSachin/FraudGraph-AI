# Technical Write-up: Autonomous Fraud Investigation Agent with TigerGraph

## 1. What We Built
An autonomous agentic fraud investigator built for the Hacker House Goa 2026 challenge. The agent ingests real-time fraud alerts, traverses transaction and cardholder subgraphs, reasons over regulatory bank policies, requests targeted evidence, and generates defensible Next-Best-Action (NBA) decisions alongside FinCEN-compliant Suspicious Activity Reports (SAR).

## 2. Architecture & Tech Stack
- **Graph Database Engine**: TigerGraph Savanna (`HHGOA_FraudGraph`)
- **Data Volume**: 590,742 card transactions and 14,894 customer cards loaded from IEEE-CIS Fraud Benchmark.
- **Agentic Core**: Multi-step reasoning loop combining GraphRAG traversal with tool-calling capabilities.
- **Decision Engine**: Two-stage Next-Best-Action (NBA) policy matrix (Pre-Evidence containment vs Post-Evidence resolution).
- **Frontend Dashboard**: React + Vite command center displaying live subgraph connectivity, evidence telemetry, and case progression.

## 3. How TigerGraph is Used
- **Entity Traversal**: Multi-hop exploration linking `Transaction` -> `Card` -> `Customer` -> `DeviceProfile` to detect coordinated rings and identity takeover.
- **CaseMemory Storage**: Prior confirmed patterns and closed cases (`CC-0001`, `CC-0141`) are referenced to establish pattern correlation.
- **Policy Grounding**: Instead of unconstrained LLM hallucinations, the agent grounds risk assessments in deterministic graph metrics.

## 4. Benchmark Results
All 20 challenge cases (`HHG-001` through `HHG-020`) have been investigated, resulting in fully structured JSON dossiers stored in `/cases/` covering:
- Defensible fraud probabilities and pattern labels.
- Pre-evidence containment actions routed through approval policies (`auto`, `L1`, `L2`).
- Simulated evidence gathering (customer verification & step-up authentication).
- Post-evidence action resolution and comprehensive regulatory SAR narratives.

## 5. What We Learned & Future Improvements
TigerGraph's ability to model complex transactional topologies at high throughput makes it ideal for enterprise fraud detection. With additional time, we plan to implement live streaming Kafka connectors for real-time edge score ingestion and GSQL-driven community detection algorithms (e.g., Louvain/PageRank) for automated fraud ring clustering.
