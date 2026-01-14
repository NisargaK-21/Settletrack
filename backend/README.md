# SettleTrack – Backend & Blockchain Integration Overview

This repository contains the **backend service** for the **Instant Trade Settlement Platform**.

The backend acts as the **orchestration layer** between:

- Blockchain settlement smart contract  
- Machine Learning risk intelligence service  
- Frontend dashboard  

The backend exposes REST APIs to:
- Record trades
- Settle trades
- Query settlement status

---

## System Architecture

Frontend (React / Web)
|
| REST API
v
Backend (Node.js / Express)
|
| Smart Contract Calls (ethers.js)
v
Blockchain (Ethereum / Ganache / Remix VM)

Backend ↔ Machine Learning Risk Service (REST-based)


## Folder Structure

backend/
│
├── src/
│ ├── index.js # App entry point
│ │
│ ├── config/
│ │ └── blockchain.config.js # RPC URL, contract address, private key
│ │
│ ├── routes/
│ │ └── settlement.routes.js # REST API routes
│ │
│ ├── services/
│ │ ├── blockchain.service.js # Smart contract interaction logic
│ │ └── ml.service.js # Machine learning risk intelligence integration
│
├── .env # Environment variables
├── package.json
└── README.md


## Blockchain Layer – Smart Contract

**Contract Name:** `TradeSettlement`

### Responsibilities

- Record trade with **Pending** status
- Settle trade and mark as **Settled**
- Emit events for audit and traceability

---

## Required Blockchain Files

Located in the `/blockchain` folder (outside backend):

blockchain/
├── abi/
│ └── TradeSettlement.json
├── deployment/
│ └── deployed-address.txt


## Environment Setup – Prerequisites

- Node.js ≥ 18
- Ganache **OR** Remix VM (contract already deployed)
- Git

---

## Installation

Navigate to the backend directory and install dependencies:

```
cd backend
npm install
Environment Variables (.env)
Create a .env file inside the backend directory with the following values:

env
Copy code
PORT=5000
BLOCKCHAIN_RPC_URL=http://127.0.0.1:8545
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=your_deployed_contract_address
ML_SERVICE_URL=http://127.0.0.1:8000/api/predict
⚠️ Important:
Ensure the RPC URL and account match the environment where the smart contract was deployed.

Running the Backend
Start the backend server:


npm run dev
Expected output confirms the backend is running on the configured port.

API Endpoints
1️⃣ Record Trade
POST /api/settlement/trade

Records a trade on the blockchain with Pending status.

Before writing to the blockchain, the backend performs a machine learning risk evaluation.

2️⃣ Settle Trade
POST /api/settlement/settle/:tradeId

Marks the specified trade as Settled on the blockchain.

3️⃣ Get Trade Status
GET /api/settlement/status/:tradeId

Returns the current status of the trade.

Status Values
0 → Pending

1 → Settled

Machine Learning Integration (Enabled)
Purpose
The machine learning service acts as an intelligence layer that evaluates fraud risk before irreversible blockchain settlement.

Blockchain ensures immutability and trust

Machine learning ensures fraud detection and decision support

Current Implementation
The backend is integrated with a live ML risk service

ML evaluation is performed via a REST API

Trade data is converted into transaction-style features expected by the ML model

ML Risk Evaluation Flow

Trade Request
   ↓
Backend receives request
   ↓
Backend calls ML service
   ↓
ML service returns risk classification
   ↓
Backend proceeds with blockchain execution
Risk Categories
The ML service returns one of the following decisions:

ALLOW – Trade is considered safe

REVIEW – Trade is suspicious and may require manual verification

BLOCK – Trade is considered high risk

Current Enforcement Mode
ML risk evaluation is enabled and logged

Trades are not blocked automatically (demo-friendly mode)

Why this mode?
Full end-to-end flow demonstration

Easy switch to enforcement in production

Blocking logic can be enabled later without architectural changes

ML Service Dependency
ML service runs independently

Backend communicates via REST

Failure of ML service can be handled gracefully

Frontend Integration Guide
Frontend never communicates directly with the blockchain

Frontend consumes backend APIs only

Data provided to frontend
Trade ID

Settlement status

Blockchain transaction hash

Timestamps

Suggested UI Components
Trade cards

Settlement timeline

Blockchain transaction audit links

Summary
SettleTrack’s backend ensures:

Secure blockchain settlement

Intelligent ML-based risk analysis

Clean separation between frontend, blockchain, and ML layers

Scalable, production-ready architecture
