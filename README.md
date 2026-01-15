# SettleTrack

## Overview

SettleTrack is a comprehensive trade settlement platform that leverages blockchain technology for secure and immutable trade settlements, machine learning for risk assessment and anomaly detection, and a modern web interface for seamless user interaction. The system enables efficient post-trade processing with real-time risk monitoring and automated settlement execution.

## Features

- **Blockchain-Based Settlement**: Immutable recording of trade settlements using Ethereum smart contracts
- **Machine Learning Risk Analysis**: AI-powered risk assessment and anomaly detection for trade validation
- **Web Dashboard**: Intuitive Next.js frontend for trade management and monitoring
- **RESTful API**: Node.js backend providing integration endpoints
- **Real-time Monitoring**: Live status updates and settlement tracking

## Tech Stack

### Frontend
- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Build Tool**: Next.js CLI

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Blockchain Integration**: Ethers.js 6
- **HTTP Client**: Axios
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv for configuration

### Blockchain
- **Language**: Solidity ^0.8.0
- **Network**: Ethereum (deployable to mainnet/testnets)
- **Development**: Remix IDE (for testing)
- **Contract**: TradeSettlement.sol - Immutable post-trade settlement recorder

### Machine Learning
- **Language**: Python
- **Framework**: FastAPI
- **ASGI Server**: Uvicorn
- **Data Processing**: Pandas, NumPy
- **ML Library**: Scikit-learn
- **Models**: Anomaly detection and risk assessment models

## Folder Structure

```
SettleTrack/
├── backend/                    # Node.js backend application
│   ├── package.json           # Backend dependencies and scripts
│   └── src/
│       ├── index.js           # Main server entry point
│       ├── config/
│       │   └── blockchain.config.js  # Blockchain configuration
│       ├── routes/
│       │   └── settlement.routes.js  # API routes for settlements
│       └── services/
│           ├── blockchain.service.js # Blockchain interaction service
│           └── ml.service.js         # ML service integration
├── blockchain/                # Smart contract development
│   ├── abi/
│   │   └── TradeSettlement.json     # Contract ABI
│   ├── contracts/
│   │   └── TradeSettlement.sol      # Solidity smart contract
│   └── deployment/
│       └── deployed-address.txt     # Deployment information
├── frontend/                  # Next.js web application
│   ├── package.json           # Frontend dependencies
│   ├── next.config.mjs        # Next.js configuration
│   ├── postcss.config.mjs     # PostCSS configuration
│   ├── eslint.config.mjs      # ESLint configuration
│   ├── jsconfig.json          # JavaScript configuration
│   ├── app/                   # Next.js app directory
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   ├── risk/
│   │   │   └── page.js        # Risk assessment page
│   │   └── settle/
│   │       └── page.js        # Settlement page
│   ├── components/            # Reusable React components
│   │   ├── Navbar.js          # Navigation component
│   │   ├── StatusCard.js      # Status display component
│   │   └── TradeForm.js       # Trade input form
│   ├── lib/                   # Utility libraries
│   │   ├── api.js             # API client utilities
│   │   └── utils.js           # General utilities
│   └── public/                # Static assets
├── ml/                        # Machine learning services
│   ├── api.py                 # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── __pycache__/           # Python cache
│   ├── data/
│   │   └── sample_track.csv   # Sample training data
│   ├── model/
│   │   └── training/
│   │       ├── __init__.py
│   │       ├── train_anomaly_model.py  # Anomaly detection training
│   │       └── train_risk_model.py     # Risk assessment training
│   └── utils/
│       ├── __init__.py
│       ├── decision_engine.py # ML decision logic
│       ├── feature_builder.py # Feature engineering
│       └── preprocess.py      # Data preprocessing
└── .gitignore                 # Git ignore rules
```

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v18.17 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/downloads/)
- **npm** (comes with Node.js)
- **pip** (Python package installer)
- **Git** - [Download](https://git-scm.com/)
- **Ethereum Wallet** (MetaMask recommended for blockchain interactions)
- **Remix IDE** (for smart contract development/testing) - [Access](https://remix.ethereum.org/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SettleTrack
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with necessary environment variables:

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
