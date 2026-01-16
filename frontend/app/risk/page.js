'use client';
export const dynamic = 'force-dynamic';

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

 const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const RISK_API = `${BACKEND_URL}/api/settlement/risk`;

    const handleChange = (e) => {
    const { name, value } = e.target;
    setTradeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setRiskResult(null);

  try {
    const res = await fetch(RISK_API, {
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
      throw new Error(data.error || 'Risk service error');
    }

    setRiskResult(data);
  } catch (err) {
    console.error(err);
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
    if (prob < 0.3) return 'bg-emerald-50 border-emerald-100';
    if (prob <= 0.7) return 'bg-amber-50 border-amber-100';
    return 'bg-rose-50 border-rose-100';
  };

  const getRiskBadgeColor = (prob) => {
    if (prob < 0.3) return 'bg-emerald-500 text-white';
    if (prob <= 0.7) return 'bg-amber-500 text-white';
    return 'bg-rose-500 text-white';
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
      `}</style>

      <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-8 font-sans">
        <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden animate-fade-in">

          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>

          <div className="p-8 md:p-10">

            <div className="flex items-center gap-4 mb-10">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 leading-none">Risk Analysis</h1>
                <p className="text-slate-500 text-sm mt-1">Neural Network Trade Verification</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Trade Reference ID</label>
                  <input
                    name="tradeId"
                    type="number"
                    placeholder="e.g. 88291"
                    onChange={handleChange}
                    className="w-full bg-slate-50 text-slate-600 border border-slate-200 p-3.5 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Buyer Address</label>
                  <input
                    name="buyer"
                    placeholder="0x..."
                    onChange={handleChange}
                    className="w-full bg-slate-50 text-slate-600 border border-slate-200 p-3.5 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Seller Address</label>
                  <input
                    name="seller"
                    placeholder="0x..."
                    onChange={handleChange}
                    className="w-full bg-slate-50 text-slate-600 border border-slate-200 p-3.5 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Quantity</label>
                  <input
                    name="quantity"
                    type="number"
                    placeholder="0"
                    onChange={handleChange}
                    className="w-full bg-slate-50 text-slate-600 border border-slate-200 p-3.5 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Price (USD)</label>
                  <input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    onChange={handleChange}
                    className="w-full bg-slate-50 text-slate-600 border border-slate-200 p-3.5 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 mt-4 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-indigo-400" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                  </>
                ) : 'Execute Risk Scoring'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 animate-slide-up">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                <p className="text-rose-700 text-xs font-bold">{error}</p>
              </div>
            )}

            {riskResult && (
              <div className={`mt-10 rounded-2xl border ${getRiskColor(riskResult.fraud_probability)} overflow-hidden animate-slide-up`}>
                <div className="px-6 py-4 border-b border-inherit flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Analysis Results</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${getRiskBadgeColor(riskResult.fraud_probability)}`}>
                    {getRiskLevel(riskResult.fraud_probability)}
                  </span>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-500">Fraud Probability Score</span>
                      <span className="text-xl font-black text-slate-900">{(riskResult.fraud_probability * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          riskResult.fraud_probability < 0.3 ? 'bg-emerald-500' : 
                          riskResult.fraud_probability <= 0.7 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${riskResult.fraud_probability * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/50 p-4 rounded-xl border border-inherit">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Anomaly Found</span>
                      <span className={`text-sm font-black ${riskResult.unusual_behavior ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {riskResult.unusual_behavior ? 'DETECTED' : 'CLEAN'}
                      </span>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl border border-inherit">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Verdict</span>
                      <span className="text-sm font-black text-slate-800">
                        {getRiskLevel(riskResult.fraud_probability)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/80 p-4 rounded-xl border border-inherit">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2 tracking-widest">Protocol Recommendation</span>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
                      {riskResult.recommended_action}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
