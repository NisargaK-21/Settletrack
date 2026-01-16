'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const BASE_URL = 'https://zonal-forgiveness-production-a585.up.railway.app';

const healthRes = await fetch(`${BASE_URL}/health`);
const settlementRes = await fetch(`${BASE_URL}/api/settlement/health`);


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
      color: 'bg-emerald-500',
      shadow: 'shadow-emerald-500/20',
    },
    warning: {
      text: 'Partially Connected',
      color: 'bg-amber-500',
      shadow: 'shadow-amber-500/20',
    },
    disconnected: {
      text: 'Disconnected',
      color: 'bg-rose-500',
      shadow: 'shadow-rose-500/20',
    },
    connecting: {
      text: 'Connecting...',
      color: 'bg-slate-400',
      shadow: 'shadow-slate-400/20',
    },
  };

  return (
    <div className="min-h-screen bg-[#4f7fb0] text-slate-900 font-sans selection:bg-indigo-100">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
            Settle<span className="text-indigo-800">Track</span>
          </h1>
          <p className="text-lg text-slate-900 max-w-2xl mx-auto leading-relaxed">
            Smart Settlement Risk Detection using Blockchain & Machine Learning
          </p>
        </header>

        <div className="flex flex-col items-center mb-10">
          <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm ${statusConfig[connectionStatus].shadow} transition-all duration-500`}>
            <span className={`relative flex h-3 w-3`}>
              {connectionStatus === 'connected' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${statusConfig[connectionStatus].color}`}></span>
            </span>
            <span className="text-sm font-medium text-slate-700">
              System {statusConfig[connectionStatus].text}
            </span>
          </div>

          {error && (
            <div className="mt-4 px-4 py-2 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-lg">
              {error}
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden mb-10">
          <div className="px-8 py-6 border-b border-slate-300 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">System Overview</h2>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Blockchain Integration', desc: 'Smart contracts deployed' },
                { label: 'ML Models', desc: 'Anomaly detection ready' },
                { label: 'Backend API', desc: 'Running & monitored' },
                { label: 'Frontend', desc: 'Next.js & Tailwind CSS' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 bg-indigo-50 rounded-full p-1">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{item.label}</p>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/settle" 
            className="flex items-center justify-center px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Settlement Platform
          </Link>
          <Link 
            href="/risk" 
            className="flex items-center justify-center px-6  py-3.5 bg-white text-slate-700 border border-slate-200 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            ML Risk Detection
          </Link>
  
        </div>
      </div>
    </div>
  );
}