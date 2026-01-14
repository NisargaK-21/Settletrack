'use client';

import { useState } from 'react';

export default function RiskDetection() {
  const [tradeData, setTradeData] = useState({
    tradeId: '',
    buyer: '',
    seller: '',
    quantity: '',
    price: '',
  });

  const [riskResult, setRiskResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ML_URL = 'http://localhost:8000/api/predict';

  const handleChange = (e) => {
    setTradeData({
      ...tradeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRiskResult(null);

    try {
      const res = await fetch(ML_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tradeId: Number(tradeData.tradeId),
          buyer: tradeData.buyer,
          seller: tradeData.seller,
          quantity: Number(tradeData.quantity),
          price: Number(tradeData.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error('ML service error');
      }

      setRiskResult(data);
    } catch (err) {
      setError('Unable to fetch ML risk analysis');
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (prob) => {
    if (prob < 0.3) return 'LOW';
    if (prob <= 0.7) return 'MEDIUM';
    return 'HIGH';
  };

  const getRiskColor = (prob) => {
    if (prob < 0.3) return 'bg-green-100 text-green-800';
    if (prob <= 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ML Risk Detection
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="tradeId"
            placeholder="Trade ID"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="buyer"
            placeholder="Buyer Address"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="seller"
            placeholder="Seller Address"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? 'Analyzing Risk...' : 'Run Risk Analysis'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mt-4">
            {error}
          </div>
        )}

        {/* Risk Result */}
        {riskResult && (
          <div
            className={`mt-6 p-5 rounded-lg ${getRiskColor(
              riskResult.fraud_probability
            )}`}
          >
            <h2 className="text-xl font-semibold mb-3">
              Risk Report
            </h2>

            <p>
              <b>Fraud Probability:</b>{' '}
              {(riskResult.fraud_probability * 100).toFixed(2)}%
            </p>

            <p>
              <b>Unusual Behavior:</b>{' '}
              {riskResult.unusual_behavior ? 'Yes' : 'No'}
            </p>

            <p>
              <b>Risk Level:</b>{' '}
              {getRiskLevel(riskResult.fraud_probability)}
            </p>

            <p>
              <b>Recommended Action:</b>{' '}
              {riskResult.recommended_action}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
