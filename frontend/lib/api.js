// Base Configuration
const API_BASE = 'http://localhost:5000';
const ML_BASE = 'http://localhost:8000';

const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

export const api = {
  // =========================
  // Health & Status
  // =========================

  getBackendHealth: async () => {
    // GET /health
    const res = await fetch(`${API_BASE}/health`);
    return handleResponse(res);
  },

  getBlockchainHealth: async () => {
    // GET /api/settlement/health
    const res = await fetch(`${API_BASE}/api/settlement/health`);
    return handleResponse(res);
  },

  // =========================
  // Trade Operations
  // =========================

  getAllTrades: async () => {
    // GET /api/settlement/trades
    const res = await fetch(`${API_BASE}/api/settlement/trade`);
    return handleResponse(res);
  },

  recordTrade: async (trade) => {
    // POST /api/settlement/trade
    // Body: { tradeId, buyer, seller, quantity, price }
    const res = await fetch(`${API_BASE}/api/settlement/trade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trade),
    });

    return handleResponse(res);
  },

  settleTrade: async (tradeId) => {
    // POST /api/settlement/settle/{tradeId}
    const res = await fetch(
      `${API_BASE}/api/settlement/settle/${tradeId}`,
      {
        method: 'POST',
      }
    );

    return handleResponse(res);
  },

  getTradeStatus: async (tradeId) => {
    // GET /api/settlement/status/{tradeId}
    const res = await fetch(
      `${API_BASE}/api/settlement/status/${tradeId}`
    );

    return handleResponse(res);
  },

  // =========================
  // ML Risk Detection
  // =========================

  checkRisk: async (trade) => {
    // POST http://localhost:8000/api/predict
    const res = await fetch(`${ML_BASE}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tradeId: Number(trade.tradeId),
        buyer: trade.buyer,
        seller: trade.seller,
        quantity: Number(trade.quantity),
        price: Number(trade.price),
      }),
    });

    return handleResponse(res);
  },
};
