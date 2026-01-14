'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Settlement() {
  const [tradeId, setTradeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Record Trade Form State
  const [recordForm, setRecordForm] = useState({
    tradeId: '',
    buyer: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    seller: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    quantity: '',
    price: '',
  });

  const BASE_URL = 'http://localhost:5000';

  // Record Trade
  const handleRecordTrade = async () => {
    if (!recordForm.tradeId || !recordForm.quantity || !recordForm.price) {
      setError('Please fill all trade fields');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`${BASE_URL}/api/settlement/trade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tradeId: Number(recordForm.tradeId),
          buyer: recordForm.buyer,
          seller: recordForm.seller,
          quantity: Number(recordForm.quantity),
          price: Number(recordForm.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to record trade');
      }

      setResponse({
        type: 'record',
        txHash: data.txHash,
        message: 'Trade recorded successfully!',
      });
      setTradeId(recordForm.tradeId);
      setRecordForm({
        tradeId: '',
        buyer: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
        seller: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
        quantity: '',
        price: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Settle Trade
  const handleSettleTrade = async () => {
    if (!tradeId) {
      setError('Please enter a Trade ID');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(
        `${BASE_URL}/api/settlement/settle/${tradeId}`,
        {
          method: 'POST',
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Settlement failed');
      }

      setResponse({
        type: 'settle',
        txHash: data.txHash,
        message: 'Trade settled successfully',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check Trade Status
  const handleCheckStatus = async () => {
    if (!tradeId) {
      setError('Please enter a Trade ID');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(
        `${BASE_URL}/api/settlement/status/${tradeId}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Unable to fetch status');
      }

      setResponse({
        type: 'status',
        status: data.status,
        details: data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Trade Settlement</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {response && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">{response.message}</p>
            {response.txHash && (
              <p className="text-sm mt-2 font-mono break-all">
                TX Hash: {response.txHash}
              </p>
            )}
            {response.status && (
              <p className="text-sm mt-2">
                Status: <strong>{response.status}</strong>
              </p>
            )}
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Record Trade Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Record Trade
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              First, record a new trade on the blockchain
            </p>

            <div className="space-y-3">
              <input
                type="number"
                placeholder="Trade ID"
                value={recordForm.tradeId}
                onChange={(e) =>
                  setRecordForm({ ...recordForm, tradeId: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Buyer Address"
                value={recordForm.buyer}
                onChange={(e) =>
                  setRecordForm({ ...recordForm, buyer: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Seller Address"
                value={recordForm.seller}
                onChange={(e) =>
                  setRecordForm({ ...recordForm, seller: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Quantity"
                value={recordForm.quantity}
                onChange={(e) =>
                  setRecordForm({ ...recordForm, quantity: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Price"
                value={recordForm.price}
                onChange={(e) =>
                  setRecordForm({ ...recordForm, price: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleRecordTrade}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-semibold"
              >
                {loading ? 'Recording...' : 'Record Trade'}
              </button>
            </div>
          </div>

          {/* Settle & Check Status Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Settle Trade
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              After recording, settle or check the trade status
            </p>

            <div className="space-y-3">
              <input
                type="text"
                value={tradeId}
                onChange={(e) => setTradeId(e.target.value)}
                placeholder="Enter Trade ID"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleSettleTrade}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
              >
                {loading ? 'Settling...' : 'Settle Trade'}
              </button>

              <button
                onClick={handleCheckStatus}
                disabled={loading}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 font-semibold"
              >
                {loading ? 'Checking...' : 'Check Status'}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">How it works:</h3>
              <ol className="text-sm text-gray-600 space-y-2">
                <li>1. Enter trade details and click "Record Trade"</li>
                <li>2. Copy the Trade ID from response</li>
                <li>3. Paste it above and click "Settle Trade"</li>
                <li>4. Use "Check Status" to verify settlement</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
