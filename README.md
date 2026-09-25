# FraudGraph-AI

Autonomous Agentic Fraud Investigation System built for the TigerGraph Hacker House Goa 2026.

## Architecture
- **Graph Database**: TigerGraph Savanna (`HHGOA_FraudGraph`)
- **Loaded Volume**: 590,742 transactions, 14,894 cards
- **GraphRAG Reasoning**: Multi-hop entity linkages across Cards, Transactions, Customers, and Devices.
- **Policy Engine**: Adaptive two-stage Next-Best-Action (NBA) engine with automated regulatory SAR generation.
- **Benchmark Suite**: 20 fully resolved case records in `/cases`.
