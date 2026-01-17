# SettleTrack 🚀

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Architecture](#project-architecture)
- [API Endpoints](#api-endpoints)
- [Smart Contract](#smart-contract)
- [Machine Learning Models](#machine-learning-models)
- [Contributing](#contributing)
- [License](#license)

## Overview

SettleTrack is a comprehensive **blockchain-enabled trade settlement platform** that combines cutting-edge technologies to revolutionize post-trade processing. The platform leverages:

- **Ethereum Smart Contracts** for immutable, transparent trade recording
- **Machine Learning** for intelligent risk assessment and anomaly detection
- **Modern Web Technologies** for intuitive user experience
- **RESTful API** for seamless integration with third-party systems

SettleTrack enables financial institutions and trading platforms to automate trade settlements with enhanced security, reduced counterparty risk, and real-time monitoring capabilities.

## Features

### 🔐 Blockchain-Based Settlement
- Immutable recording of trade settlements using Ethereum smart contracts
- Transparent audit trail for regulatory compliance
- Decentralized trade status tracking
- Support for pending and settled trade states
- Event-driven architecture for real-time notifications

### 🤖 Machine Learning Risk Analysis
- **AI-powered risk assessment** for trade validation
- **Anomaly detection** to identify suspicious trading patterns
- Trade delay prediction and risk scoring
- Feature engineering for financial data
- Decision engine for automated trade approval/rejection

### 📊 Web Dashboard
- Intuitive Next.js frontend for trade management
- Real-time risk monitoring and status updates
- Trade form for new trade submissions
- Risk visualization components
- Settlement tracking interface
- Responsive design with Tailwind CSS

### 🔌 RESTful API
- Node.js/Express backend for integration
- Blockchain service integration
- ML model inference endpoints
- Health check and status monitoring
- Cross-origin resource sharing (CORS) enabled

### 📈 Real-time Monitoring
- Live status updates for trade settlements
- Risk score visualization
- Settlement execution tracking
- System health monitoring

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework for production-ready applications |
| **React** | 19.2.3 | UI component library |
| **React DOM** | 19.2.3 | React rendering engine |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |
| **PostCSS** | 8.5.6 | CSS transformation tool |
| **ESLint** | 9 | Code quality and linting |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **Express.js** | 5.2.1 | Web application framework |
| **Ethers.js** | 6.16.0 | Ethereum blockchain interaction |
| **Axios** | 1.13.2 | HTTP client for API calls |
| **CORS** | 2.8.5 | Cross-origin resource sharing middleware |
| **dotenv** | 17.2.3 | Environment variable management |
| **Nodemon** | 3.1.11 | Auto-reload during development |

### Blockchain
| Technology | Details |
|------------|---------|
| **Language** | Solidity ^0.8.0 |
| **Network** | Ethereum (compatible with mainnet/testnets/L2s) |
| **Smart Contract** | TradeSettlement.sol - Immutable post-trade settlement recorder |
| **ABI** | Generated from compiled contract |
| **Development** | Remix IDE support for testing |

### Machine Learning
| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.x | Programming language |
| **FastAPI** | Latest | Modern async web framework |
| **Uvicorn** | Latest | ASGI server |
| **Pandas** | Latest | Data manipulation and analysis |
| **NumPy** | Latest | Numerical computing |
| **Scikit-learn** | Latest | Machine learning library |
| **Pickle** | Built-in | Model serialization |

## Folder Structure

```
SettleTrack/
├── backend/                         # Node.js Backend Application
│   ├── package.json                # Backend dependencies and npm scripts
│   ├── src/
│   │   ├── index.js                # Express app initialization
│   │   ├── config/
│   │   │   └── blockchain.config.js # Blockchain network configuration
│   │   ├── routes/
│   │   │   └── settlement.routes.js # API route handlers
│   │   ├── services/
│   │   │   ├── blockchain.service.js # Smart contract interaction
│   │   │   └── ml.service.js        # ML model integration
│   │   └── abi/
│   │       └── TradeSettlement.json # Smart contract ABI
│
├── frontend/                        # Next.js Frontend Application
│   ├── package.json                # Frontend dependencies
│   ├── next.config.mjs             # Next.js configuration
│   ├── tailwind.config.js          # Tailwind CSS setup
│   ├── postcss.config.mjs          # PostCSS configuration
│   ├── jsconfig.json               # JavaScript path aliases
│   ├── eslint.config.mjs           # ESLint rules
│   ├── app/
│   │   ├── layout.js               # Root layout component
│   │   ├── page.js                 # Home page
│   │   ├── globals.css             # Global styles
│   │   ├── risk/
│   │   │   └── page.js             # Risk assessment page
│   │   └── settle/
│   │       └── page.js             # Settlement management page
│   ├── components/
│   │   ├── Navbar.js               # Navigation component
│   │   ├── StatusCard.js           # Trade status display
│   │   └── TradeForm.js            # Trade submission form
│   ├── lib/
│   │   ├── api.js                  # API client utilities
│   │   └── utils.js                # Helper functions
│   └── public/                     # Static assets
│
├── blockchain/                      # Ethereum Smart Contracts
│   ├── contracts/
│   │   └── TradeSettlement.sol     # Main settlement smart contract
│   ├── abi/
│   │   └── TradeSettlement.json    # Contract ABI for integration
│   └── deployment/
│       └── deployed-address.txt    # Deployed contract addresses
│
├── ml/                              # Machine Learning Pipeline
│   ├── api.py                       # FastAPI server for ML predictions
│   ├── requirements.txt             # Python dependencies
│   ├── data/
│   │   └── sample_track.csv        # Sample training data
│   ├── model/                       # Pre-trained model storage
│   ├── training/
│   │   ├── train_anomaly_model.py  # Anomaly detection model training
│   │   ├── train_risk_model.py     # Risk assessment model training
│   │   └── __pycache__/
│   └── utils/
│       ├── feature_builder.py       # Feature engineering utilities
│       ├── decision_engine.py       # Trade approval decision logic
│       ├── preprocess.py            # Data preprocessing
│       └── __pycache__/
│
└── README.md                        # Project documentation
```

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v18.17 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/downloads/)
- **npm** (comes with Node.js)
- **pip** (Python package installer)
- **Git** - [Download](https://git-scm.com/)
- **Ethereum Wallet** (MetaMask or compatible) for blockchain interactions
- **Web3 Provider** (Infura, Alchemy, or local node for Ethereum network access)

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd SettleTrack
```

### Step 2: Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Environment
NODE_ENV=development
PORT=5000

# Blockchain Configuration
BLOCKCHAIN_NETWORK=sepolia  # or mainnet, goerli, etc.
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
CONTRACT_ADDRESS=0x...      # Your deployed TradeSettlement contract address
CONTRACT_ABI_PATH=./src/abi/TradeSettlement.json

# ML Service Configuration
ML_SERVICE_URL=http://localhost:8000
ML_API_TIMEOUT=30000

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=sepolia
```

### Step 4: Machine Learning Setup

```bash
cd ../ml
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `ml` directory:

```env
FASTAPI_ENV=development
PORT=8000
WORKERS=4

# Model Configuration
MODEL_PATH=./model
ANOMALY_MODEL=anomaly_model.pkl
RISK_MODEL=risk_model.pkl
```

## Configuration

### Blockchain Configuration

Edit [backend/src/config/blockchain.config.js](backend/src/config/blockchain.config.js):

```javascript
export const blockchainConfig = {
  network: process.env.BLOCKCHAIN_NETWORK || 'sepolia',
  rpcUrl: process.env.BLOCKCHAIN_RPC_URL,
  contractAddress: process.env.CONTRACT_ADDRESS,
  contractABI: require('../abi/TradeSettlement.json'),
  chainId: {
    'mainnet': 1,
    'sepolia': 11155111,
    'goerli': 5,
    'localhost': 31337
  }
};
```

### Smart Contract Deployment

1. Copy the contract from `blockchain/contracts/TradeSettlement.sol`
2. Deploy using Remix IDE or Hardhat:
   - Go to [Remix IDE](https://remix.ethereum.org/)
   - Create new file and paste contract code
   - Compile with Solidity 0.8.0+
   - Deploy to your target network
3. Copy deployed contract address to `CONTRACT_ADDRESS` in `.env`

## Running the Application

### Development Mode

Open three terminal windows and run each service:

**Terminal 1 - Backend (Node.js/Express)**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend (Next.js)**
```bash
cd frontend
npm run dev
# Application runs on http://localhost:3000
```

**Terminal 3 - ML Service (FastAPI)**
```bash
cd ml
python -m uvicorn api:app --reload --port 8000
# API runs on http://localhost:8000
```

### Production Build

**Backend:**
```bash
cd backend
npm run build    # If applicable
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**ML Service:**
```bash
cd ml
python -m uvicorn api:app --workers 4 --port 8000
```

## Project Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                       │
│              (Next.js Frontend - Port 3000)                 │
│  ┌──────────────┬────────────────┬──────────────────────┐  │
│  │ Home Page    │ Risk Page      │ Settlement Page      │  │
│  │ Dashboard    │ Monitoring     │ Trade Management     │  │
│  └──────────────┴────────────────┴──────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST (Axios)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API LAYER                         │
│            (Express.js - Port 5000)                         │
│  ┌──────────────┬────────────────┬──────────────────────┐  │
│  │ Settlement   │ Risk Check     │ Trade Status         │  │
│  │ Routes       │ Endpoint       │ Endpoint             │  │
│  └──────────────┴────────────────┴──────────────────────┘  │
└──────┬───────────────────────────────────────┬──────────────┘
       │                                       │
       ├─── Web3/Ethers.js ──────────┐        │
       │                             │        │
       ▼                             ▼        ▼
┌────────────────┐         ┌──────────────────────┐
│  Blockchain    │         │  ML Service          │
│  (Ethereum)    │         │  (FastAPI - 8000)    │
│                │         │                      │
│ TradeSettlement│         │ Risk Prediction      │
│ Smart Contract │         │ Anomaly Detection    │
└────────────────┘         └──────────────────────┘
```

### Data Flow

1. **Trade Submission**
   - User submits trade via frontend form
   - Frontend sends to backend API
   - Backend initiates risk check with ML service
   
2. **Risk Assessment**
   - ML service analyzes trade features
   - Returns risk score and anomaly status
   - Decision engine approves/rejects trade
   
3. **Blockchain Recording**
   - Approved trades sent to smart contract
   - Smart contract records trade immutably
   - Event emitted for logging
   
4. **Settlement**
   - Frontend queries trade status
   - Settlement status updated on blockchain
   - User notified of completion

## API Endpoints

### Settlement Endpoints

#### Health Check
```http
GET /api/settlement/health
```

**Response:**
```json
{
  "status": "ok",
  "backend": "running",
  "blockchain": {
    "connected": true,
    "network": "sepolia"
  }
}
```

#### Risk Assessment
```http
POST /api/settlement/risk
Content-Type: application/json

{
  "trade_id": "TRADE123",
  "trade_amount": 1000000,
  "volatility": 0.15,
  "past_delays": 2
}
```

**Response:**
```json
{
  "trade_id": "TRADE123",
  "risk_score": 0.35,
  "delay_prediction": 2,
  "is_anomaly": false,
  "recommendation": "APPROVE",
  "confidence": 0.92
}
```

#### Get Trades List
```http
GET /api/settlement/trades
```

**Response:**
```json
{
  "trades": [],
  "message": "Trade history endpoint",
  "blockchain": {
    "connected": true,
    "network": "sepolia"
  }
}
```

#### Record Trade on Blockchain
```http
POST /api/settlement/record
Content-Type: application/json

{
  "tradeId": 1,
  "buyer": "0x123...",
  "seller": "0x456...",
  "quantity": 100,
  "price": 1000
}
```

#### Settle Trade
```http
POST /api/settlement/settle
Content-Type: application/json

{
  "tradeId": 1
}
```

#### Get Trade Status
```http
GET /api/settlement/status/:tradeId
```

**Response:**
```json
{
  "tradeId": 1,
  "status": "Settled",
  "timestamp": 1705449600
}
```

## Smart Contract

### TradeSettlement Contract

**Location:** [blockchain/contracts/TradeSettlement.sol](blockchain/contracts/TradeSettlement.sol)

#### Key Functions

**recordTrade()**
- Records a new trade on the blockchain
- Requires: Trade ID not already recorded
- Emits: TradeRecorded event

**settleTrade()**
- Marks a trade as settled
- Requires: Trade exists and is pending
- Emits: TradeSettled event

**getTradeStatus()**
- Returns current status of a trade
- Returns: Status enum (Pending/Settled)

#### Trade Struct

```solidity
struct Trade {
    uint256 tradeId;        // Unique trade identifier
    address buyer;          // Buyer address
    address seller;         // Seller address
    uint256 quantity;       // Trade quantity
    uint256 price;          // Trade price per unit
    Status status;          // Current status (Pending/Settled)
    uint256 timestamp;      // Block timestamp of recording
}
```

#### Events

```solidity
event TradeRecorded(uint256 tradeId, uint256 timestamp);
event TradeSettled(uint256 tradeId, uint256 timestamp);
```

## Machine Learning Models

### Anomaly Detection Model

**Location:** [ml/training/train_anomaly_model.py](ml/training/train_anomaly_model.py)

- **Algorithm:** Isolation Forest
- **Input Features:** Trade amount, volatility, past delays, frequency
- **Output:** Anomaly flag (-1 = anomaly, 1 = normal)
- **Use Case:** Detect unusual trading patterns

### Risk Assessment Model

**Location:** [ml/training/train_risk_model.py](ml/training/train_risk_model.py)

- **Algorithm:** Gradient Boosting/Random Forest
- **Input Features:** Trade characteristics and historical data
- **Output:** Risk score (0-1) and delay prediction
- **Use Case:** Predict settlement delays and risk levels

### Feature Engineering

**Location:** [ml/utils/feature_builder.py](ml/utils/feature_builder.py)

Extracts and engineered features from raw trade data:
- Trade amount normalization
- Volatility metrics
- Historical delay patterns
- Counterparty risk indicators
- Market conditions

### Decision Engine

**Location:** [ml/utils/decision_engine.py](ml/utils/decision_engine.py)

Business logic for trade approval:
- Threshold-based risk evaluation
- Anomaly weight consideration
- Approval/rejection/review recommendations
- Confidence scoring

## Component Details

### Frontend Components

#### Navbar Component
- Navigation menu across pages
- Link to home, risk monitoring, settlement
- Status indicator

#### TradeForm Component
- Input fields for trade details
- Form validation
- API submission handling
- Error and success messaging

#### StatusCard Component
- Displays trade status
- Risk score visualization
- Settlement progress
- Action buttons

### Backend Services

#### Blockchain Service
```javascript
- recordTrade()     // Record trade on smart contract
- settleTrade()    // Mark trade as settled
- getTradeStatus() // Query trade status
- getBlockchainStatus() // Check connection status
```

#### ML Service
```javascript
- checkRisk()      // Call ML API for risk assessment
- parseResponse()  // Process ML model outputs
- handleError()    // Error handling for ML failures
```

## Deployment Guide

### Deploying to Production

#### Using Railway, Heroku, or Similar Platforms

**Backend:**
```bash
# Add remote repository
git remote add heroku <heroku-git-url>

# Deploy
git push heroku main
```

**Frontend:**
```bash
# Deploy to Vercel (recommended for Next.js)
npm i -g vercel
vercel --prod
```

**ML Service:**
```bash
# Create requirements.txt
pip freeze > requirements.txt

# Deploy using Docker or platform-specific method
```

#### Environment Variables for Production

Update `.env` files with production values:
- Production RPC URLs (Infura, Alchemy)
- Real contract addresses
- Production domain URLs
- SSL certificates enabled

## Testing

### Manual Testing

1. **Trade Recording:**
   - Submit form on frontend
   - Verify trade appears in blockchain
   - Check status endpoint

2. **Risk Assessment:**
   - Submit trade with various characteristics
   - Verify ML predictions are reasonable
   - Check anomaly detection

3. **Settlement:**
   - Record trade
   - Mark as settled
   - Verify status updates

### Automated Testing (Future)

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# ML tests
cd ml
pytest tests/
```

## Troubleshooting

### Common Issues

**Backend can't connect to blockchain:**
- Check RPC URL is correct
- Verify network is accessible
- Check contract address is deployed on that network

**ML service returning errors:**
- Verify models are trained and saved
- Check FastAPI server is running
- Verify input data format matches expected schema

**Frontend not connecting to API:**
- Check backend is running on correct port
- Verify CORS configuration
- Check API_BASE_URL in frontend env

**Smart contract errors:**
- Ensure contract address is correct
- Verify contract is deployed
- Check ABI matches deployed contract

## Future Enhancements

- [ ] Database integration for trade history
- [ ] User authentication and authorization
- [ ] Advanced analytics dashboard
- [ ] WebSocket support for real-time updates
- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] Advanced ML models with deep learning
- [ ] Mobile app development
- [ ] Integration with external data providers
- [ ] Compliance and reporting features
- [ ] Automated market maker (AMM) integration

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Support

For issues, questions, or suggestions, please:
- Open an issue on GitHub
- Contact the development team
- Check existing documentation

## Acknowledgments

- Ethereum Foundation for smart contract standards
- OpenZeppelin for contract security patterns
- Scikit-learn for ML algorithms
- Next.js team for the amazing framework

```env
PORT=5000
GANACHE_RPC=http://127.0.0.1:7545
PRIVATE_KEY=<your-private-key>
CONTRACT_ADDRESS=0xd9145CCE52D386f254917e481eB44e9943F39138
ML_SERVICE_URL=http://localhost:8000/api/predict
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Machine Learning Setup

```bash
cd ../ml
pip install -r requirements.txt
```

### 5. Blockchain Setup

The smart contract is already deployed on Remix VM for testing. For production deployment:

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Load `blockchain/contracts/TradeSettlement.sol`
3. Compile and deploy to your preferred network
4. Update the contract address in backend configuration

## Running the Application

### Start Machine Learning Service

```bash
cd ml
python api.py
```

The ML API will be available at `http://localhost:8000`

### Start Backend Server

```bash
cd backend
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Start Frontend Application

```bash
cd frontend
npm run dev
```

The web application will be available at `http://localhost:3000`

## Usage

1. **Access the Web Interface**: Open `http://localhost:3000` in your browser
2. **Navigate to Trade Settlement**: Use the "Settle" page to initiate new trades
3. **Risk Assessment**: Visit the "Risk" page to view ML-powered risk analysis
4. **Monitor Status**: Check settlement status through the dashboard components

## API Endpoints

### Backend API (`http://localhost:5000`)

- `GET /api/settlement/health` - Health check endpoint
- `GET /api/settlement/trades` - Retrieve trade records
- `POST /api/settlement/trade` - Create new trade settlement

### ML API (`http://localhost:8000`)

- `POST /api/predict` - Predict trade risk and anomaly detection

## Development

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend linting
cd frontend
npm run lint
```

### Building for Production

```bash
# Frontend build
cd frontend
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
