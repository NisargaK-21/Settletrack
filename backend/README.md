Instant Trade Settlement – Backend & Blockchain Integration
Overview

This repository contains the backend service for the Instant Trade Settlement Platform.
The backend acts as the orchestration layer between:

Blockchain settlement smart contract

Machine Learning risk intelligence service (pluggable)

Frontend dashboard

The backend exposes REST APIs to record trades, settle trades, and query settlement status.

System Architecture
Frontend (React / Web)
|
| REST API
v
Backend (Node.js / Express)
|
| Smart Contract Calls (ethers.js)
v
Blockchain (Ethereum / Ganache / Remix VM)

Backend ↔ ML Service (optional, REST)

Folder Structure
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
│ │ └── ml.service.js # Risk intelligence abstraction
│
├── .env # Environment variables
├── package.json
└── README.md

Blockchain Layer
Smart Contract

Contract Name: TradeSettlement

Responsibilities:

Record trade (Pending)

Settle trade (Settled)

Emit events for audit

Required Blockchain Files

Located in /blockchain folder (outside backend):

blockchain/
├── abi/
│ └── TradeSettlement.json
├── deployment/
│ └── deployed-address.txt

Environment Setup
Prerequisites

Node.js ≥ 18

Ganache OR Remix VM (contract already deployed)

Git

Installation
cd backend
npm install

Environment Variables (.env)

Create .env in backend/:

PORT=5000

RPC_URL=http://127.0.0.1:7545
PRIVATE_KEY=<ganache_account_private_key>
CONTRACT_ADDRESS=<deployed_contract_address>

⚠️ Use same RPC + accounts used during contract deployment

Running Backend
npm start

Expected output:

Backend running on port 5000

API Endpoints
1️⃣ Record Trade

POST

/api/settlement/trade

Request Body

{
"tradeId": 101,
"buyer": "0xBuyerAddress",
"seller": "0xSellerAddress",
"quantity": 50,
"price": 100
}

Response

{
"txHash": "0xabc123..."
}

Records trade on-chain with Pending status.

2️⃣ Settle Trade

POST

/api/settlement/settle/:tradeId

Response

{
"txHash": "0xsettlementHash..."
}

Marks trade as Settled on blockchain.

3️⃣ Get Trade Status

GET

/api/settlement/status/:tradeId

Response

{
"status": 1
}

Status:

0 → Pending

1 → Settled

Machine Learning Integration (Pluggable)
Current Implementation (Mocked)
export const checkRisk = async (trade) => {
return { level: "LOW" };
};

This ensures:

Backend works without ML service

No runtime dependency failure

How ML Team Integrates Later

Replace mock with real inference call:

import axios from "axios";

export const checkRisk = async (trade) => {
const res = await axios.post("http://localhost:8000/predict", trade);
return res.data;
};

ML service responsibilities:

Accept trade features

Return:

riskScore

riskLevel (LOW / MEDIUM / HIGH)

Backend already handles:

Blocking HIGH risk trades

Allowing LOW/MEDIUM trades

Frontend Integration Guide

Frontend never talks to blockchain directly.

Frontend consumes:

Trade ID

Settlement status

Blockchain transaction hash

Timestamp

Suggested UI:

Trade cards

Settlement timeline

TX hash audit link
