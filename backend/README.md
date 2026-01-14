SettleTrack – Backend & Blockchain Integration
Overview

This repository contains the backend service for the Instant Trade Settlement Platform.

The backend acts as the orchestration layer between:

Blockchain settlement smart contract

Machine Learning risk intelligence service

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

Backend ↔ Machine Learning Risk Service (REST-based)

Folder Structure

backend/
│
├── src/
│ ├── index.js – App entry point
│ │
│ ├── config/
│ │ └── blockchain.config.js – RPC URL, contract address, private key
│ │
│ ├── routes/
│ │ └── settlement.routes.js – REST API routes
│ │
│ ├── services/
│ │ ├── blockchain.service.js – Smart contract interaction logic
│ │ └── ml.service.js – Machine learning risk intelligence integration
│
├── .env – Environment variables
├── package.json
└── README.md

Blockchain Layer
Smart Contract

Contract Name: TradeSettlement

Responsibilities

Record trade with Pending status

Settle trade and mark as Settled

Emit events for audit and traceability

Required Blockchain Files

Located in the /blockchain folder (outside backend):

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

Navigate to backend folder and install dependencies.

Environment Variables (.env)

Create a .env file inside the backend directory with:

Backend port

Ganache RPC URL

Private key used during contract deployment

Deployed contract address

⚠️ Ensure the RPC URL and account match the deployment environment.

Running Backend

Start the backend server using npm.

Expected output confirms the backend is running on the configured port.

API Endpoints
1️⃣ Record Trade

POST
/api/settlement/trade

Records a trade on the blockchain with Pending status.

Before writing to the blockchain, the backend performs a machine learning risk evaluation.

2️⃣ Settle Trade

POST
/api/settlement/settle/:tradeId

Marks the specified trade as Settled on the blockchain.

3️⃣ Get Trade Status

GET
/api/settlement/status/:tradeId

Returns the current status of the trade.

Status values:

0 → Pending

1 → Settled

Machine Learning Integration (Enabled)
Purpose

The machine learning service acts as an intelligence layer that evaluates fraud risk before irreversible blockchain settlement.

Blockchain ensures immutability and trust

Machine learning ensures fraud detection and decision support

Current Implementation

The backend is now integrated with a live ML risk service instead of a mocked response.

The ML service is accessed via a REST API and evaluates each trade before it is recorded on-chain.

The backend converts trade data into transaction-style features expected by the ML model and sends them for inference.

ML Risk Evaluation Flow

Trade request
→ Backend receives request
→ Backend calls ML service
→ ML service returns risk classification
→ Backend proceeds with blockchain execution

Risk Categories

The ML service returns one of the following decisions:

ALLOW – Trade is considered safe

REVIEW – Trade is suspicious and may require manual verification

BLOCK – Trade is considered high risk

Current Enforcement Mode

ML risk evaluation is enabled and logged

Trades are not blocked automatically (demo-friendly mode)

This allows:

Full end-to-end flow demonstration

Easy switch to enforcement in production

Blocking logic can be enabled later without architectural changes.

ML Service Dependency

The backend expects a machine learning service running locally.

ML service runs independently

Backend communicates via REST

Failure of ML service can be handled gracefully

Frontend Integration Guide

Frontend never communicates directly with the blockchain.

Frontend consumes data provided by backend APIs:

Trade ID

Settlement status

Blockchain transaction hash

Timestamps

Suggested UI components:

Trade cards

Settlement timeline

Blockchain transaction audit link
