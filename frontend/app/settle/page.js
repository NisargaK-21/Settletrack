'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Settlement() {
  const [tradeId, setTradeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [recordForm, setRecordForm] = useState({
    tradeId: '',
    buyer: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    seller: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    quantity: '',
    price: '',
  });

 const BASE_URL = 'https://zonal-forgiveness-production-a585.up.railway.app';


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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tradeId: Number(recordForm.tradeId),
          buyer: recordForm.buyer,
          seller: recordForm.seller,
          quantity: Number(recordForm.quantity),
          price: Number(recordForm.price),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to record trade');
      setResponse({ type: 'record', txHash: data.txHash, message: 'Trade recorded successfully!' });
      setTradeId(recordForm.tradeId);
      setRecordForm({ tradeId: '', buyer: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', seller: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', quantity: '', price: '' });
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleSettleTrade = async () => {
    if (!tradeId) { setError('Please enter a Trade ID'); return; }
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch(`${BASE_URL}/api/settlement/settle/${tradeId}`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Settlement failed');
      setResponse({ type: 'settle', txHash: data.txHash, message: 'Trade settled successfully' });
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleCheckStatus = async () => {
    if (!tradeId) { setError('Please enter a Trade ID'); return; }
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch(`${BASE_URL}/api/settlement/status/${tradeId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unable to fetch status');
      setResponse({ type: 'status', status: data.status, details: data });
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Settlement <span className="text-indigo-600">Platform</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Execute and monitor ledger-based trade settlements.</p>
          </div>
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Return to Dashboard
          </Link>
        </header>

        <div className="mb-8">
          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <strong>Error:</strong> {error}
            </div>
          )}
          {response && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl text-sm animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
              <p className="font-bold flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                {response.message}
              </p>
              {response.txHash && <p className="mt-1 font-mono text-xs opacity-70 break-all">TX ID: {response.txHash}</p>}
              {response.status && <p className="mt-1 text-xs font-bold uppercase tracking-wider text-emerald-800">Current Status: {response.status}</p>}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[10px] flex items-center justify-center">01</span>
                Record On-Chain Trade
              </h2>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Trade ID</label>
                  <input
                    type="number"
                    placeholder="e.g. 501"
                    value={recordForm.tradeId}
                    onChange={(e) => setRecordForm({ ...recordForm, tradeId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Qty</label>
                    <input
                      type="number"
                      value={recordForm.quantity}
                      onChange={(e) => setRecordForm({ ...recordForm, quantity: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Price</label>
                    <input
                      type="number"
                      value={recordForm.price}
                      onChange={(e) => setRecordForm({ ...recordForm, price: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Buyer Address</label>
                <input
                  type="text"
                  value={recordForm.buyer}
                  onChange={(e) => setRecordForm({ ...recordForm, buyer: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-xs font-mono text-slate-600 focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Seller Address</label>
                <input
                  type="text"
                  value={recordForm.seller}
                  onChange={(e) => setRecordForm({ ...recordForm, seller: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-xs font-mono text-slate-600 focus:bg-white transition-colors"
                />
              </div>

              <button
                onClick={handleRecordTrade}
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-slate-200 active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Record Trade Data'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[10px] flex items-center justify-center">02</span>
                Action Center
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Target Trade ID</label>
                  <input
                    type="text"
                    value={tradeId}
                    onChange={(e) => setTradeId(e.target.value)}
                    placeholder="Enter ID for settlement"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleSettleTrade}
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.99] disabled:opacity-50"
                  >
                    Execute Settlement
                  </button>
                  <button
                    onClick={handleCheckStatus}
                    disabled={loading}
                    className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all active:scale-[0.99]"
                  >
                    Verify Status
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <h3 className="text-indigo-900 font-bold text-xs uppercase tracking-widest mb-3">Protocol Steps</h3>
              <ul className="space-y-3 text-xs text-indigo-800 leading-relaxed">
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-400">1.</span>
                  <span>Input trade parameters and record them to the distributed ledger.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-400">2.</span>
                  <span>Initiate the settlement function to trigger smart contract transfers.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-400">3.</span>
                  <span>Verify completion status to ensure risk-free finality.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}