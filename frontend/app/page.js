
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const healthRes = await fetch('http://localhost:5000/health');
        const settlementRes = await fetch(
          'http://localhost:5000/api/settlement/health'
        );

        if (healthRes.ok && settlementRes.ok) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('warning');
        }
      } catch (err) {
        setConnectionStatus('disconnected');
        setError('Backend not reachable');
      }
    };

    checkBackendHealth();
  }, []);

  const statusConfig = {
    connected: {
      text: 'Connected',
      color: 'bg-green-500',
    },
    warning: {
      text: 'Partially Connected',
      color: 'bg-yellow-500',
    },
    disconnected: {
      text: 'Disconnected',
      color: 'bg-red-500',
    },
    connecting: {
      text: 'Connecting...',
      color: 'bg-gray-400',
    },
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          SettleTrack
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Smart Settlement Risk Detection using Blockchain & Machine Learning
        </p>

        {/* Connection Status */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span
            className={`w-3 h-3 rounded-full ${statusConfig[connectionStatus].color}`}
          />
          <span className="font-medium text-gray-700">
            Backend Status: {statusConfig[connectionStatus].text}
          </span>
        </div>

        {error && (
          <p className="text-center text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* System Info */}
        <div className="bg-gray-50 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            System Overview
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Blockchain Integration: Smart contracts deployed</li>
            <li>✓ ML Models: Anomaly detection ready</li>
            <li>✓ Backend API: Running & monitored</li>
            <li>✓ Frontend: Next.js with Tailwind CSS</li>
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/settle"
            className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Settlement Platform
          </Link>

          <Link
            href="/risk"
            className="flex-1 text-center bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            ML Risk Detection
          </Link>

          <Link
            href="/dashboard"
            className="flex-1 text-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
