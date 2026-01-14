'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function Dashboard() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    settled: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setLoading(true);
        const data = await api.getAllTrades();
        setTrades(data.trades || []);

        // Calculate stats
        const total = data.trades?.length || 0;
        const settled = data.trades?.filter(t => t.status === 'Settled').length || 0;
        const pending = total - settled;

        setStats({
          total,
          settled,
          pending,
        });
      } catch (err) {
        setError(err.message || 'Failed to load trades');
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Trades</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Settled</h3>
            <p className="text-3xl font-bold text-green-600">{stats.settled}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
        </div>

        {/* Trades Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Trade History</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-600">
              Loading trades...
            </div>
          ) : trades.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              No trades recorded yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Trade ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Buyer
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Seller
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade, idx) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {trade.tradeId || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-mono text-xs">
                        {trade.buyer?.slice(0, 10)}...
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-mono text-xs">
                        {trade.seller?.slice(0, 10)}...
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {trade.quantity || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {trade.price || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            trade.status === 'Settled'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {trade.status || 'Unknown'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
