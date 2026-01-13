Blockchain – Trade Settlement Layer
Overview

This module implements the blockchain-based settlement and trust layer for the Instant Trade Settlement Platform.

Its purpose is to:

Immutably record finalized trade settlements

Enforce a simple settlement lifecycle

Provide a verifiable blockchain transaction hash for audit and transparency

This module does NOT handle trade execution, risk analysis, or UI logic.
It only focuses on post-trade settlement recording.

What Problem This Solves

In traditional systems, settlement records are:

Spread across multiple intermediaries

Prone to reconciliation disputes

Difficult to audit in real time

This smart contract acts as a single source of truth for settlement status, ensuring:

Transparency

Immutability

Instant auditability

Smart Contract Responsibilities

The smart contract performs only three responsibilities:

Record a trade sent by the backend

Mark the trade as settled

Emit blockchain events that generate transaction hashes for audit

All validation, compliance, and risk logic happens off-chain.

Settlement Lifecycle

Each trade follows this lifecycle on-chain:

Pending  →  Settled


Pending → Trade recorded but not yet finalized

Settled → Trade settlement finalized and immutable

Smart Contract Interface
Contract Name
TradeSettlement

Data Stored On-Chain

For each trade:

tradeId (uint256)

buyer (address)

seller (address)

quantity (uint256)

price (uint256)

status (Pending / Settled)

timestamp (block time)

No sensitive or large metadata is stored on-chain.

Public Functions (Used by Backend)
1. Record Trade
recordTrade(
  uint256 tradeId,
  address buyer,
  address seller,
  uint256 quantity,
  uint256 price
)


Called by: Backend
Purpose: Registers a trade on-chain with Pending status.

2. Settle Trade
settleTrade(uint256 tradeId)


Called by: Backend
Purpose: Marks the trade as Settled.
This transaction hash is used as the final settlement proof.

Events (Used for Audit & Frontend)
event TradeRecorded(uint256 tradeId);
event TradeSettled(uint256 tradeId, uint256 timestamp);


Each event emits a blockchain transaction hash that:

Backend returns to frontend

Frontend displays as immutable audit proof

Demo Trade (Hackathon Setup)

For demo purposes, the backend uses a fixed simulated trade:

Trade ID: 101
Quantity: 50
Price: 100
Buyer & Seller: Test addresses


The smart contract itself is generic and reusable.

Deployment Details

Network: Ethereum Testnet (Sepolia) / Remix VM

Contract Address:

blockchain/deployment/deployed-address.txt


ABI File:

blockchain/abi/TradeSettlement.json


Backend must use this ABI and address to interact with the contract.

How Backend Should Use This Module

Load contract using ABI + address

Call recordTrade() when trade execution is received

Call settleTrade() after validation and ML risk analysis

Capture transaction hash

Send hash + settlement status to frontend

Backend should not store settlement state separately once it is on-chain.

How Frontend Should Use This Module

Frontend does not directly interact with blockchain.

Frontend receives from backend:

Trade ID

Settlement status

Blockchain transaction hash

Timestamp

Frontend displays:

Settlement status (Pending / Settled)

TX hash as immutable proof

Timeline / audit trail

How ML Integrates With This Module

ML runs off-chain

ML does not call blockchain

ML risk output is combined by backend with blockchain status

Blockchain is the final authority on settlement, ML is advisory.

Design Decisions (For Judges)

Blockchain used only where immutability and trust are required

No on-chain ML or heavy computation

No exchange or order-book logic

Clean separation of responsibilities

Disclaimer

This is a conceptual prototype for educational and hackathon purposes.
It is not a production trading or settlement system.