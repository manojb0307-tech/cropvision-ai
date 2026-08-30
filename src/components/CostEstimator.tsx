import React, { useState } from 'react';
import { 
  IndianRupee, TrendingDown, TrendingUp, Leaf, Beaker, 
  Loader2, Calculator, BarChart3, Shield
} from 'lucide-react';

interface CostEstimate {
  crop: string;
  disease: string;
  severity: string;
  areaHectares: number;
  yieldAnalysis: {
    avgYieldPerHectare: number;
    marketPricePerQuintal: number;
    estimatedYieldLossKg: number;
    estimatedFinancialLoss: number;
    yieldLossPercent: number;
  };
  organicOptions: { name: string; costPerHectare: number; frequency: number; effectiveness: number; totalCost: number; expectedRecovery: number }[];
  chemicalOptions: { name: string; costPerHectare: number; frequency: number; effectiveness: number; totalCost: number; expectedRecovery: number }[];
  recommendation: {
    bestValue: { name: string; totalCost: number };
    mostEffective: { name: string; effectiveness: number };
    chemicalBestValue: { name: string; totalCost: number };
    roi: string;
    inputCostPerHectare: number;
    totalInputCost: number;
  };
}

interface CostEstimatorProps {
  crop: string;
  disease: string;
  severity?: string;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ crop, disease, severity = 'Moderate' }) => {
  const [data, setData] = useState<CostEstimate | null>(null);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState(1);
  const [showChemical, setShowChemical] = useState(false);

  const fetchEstimate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cost-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, disease, severity, areaHectares: area })
      });
      if (!res.ok) throw new Error('Failed');
      setData(await res.json());
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Calculator className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-800">
                Cost & Yield Estimator
              </h3>
              <p className="text-xs text-slate-500">Treatment economics for {crop}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-xs text-slate-500">Area (ha):</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(Number(e.target.value) || 1)}
              min={0.1}
              step={0.5}
              className="w-20 px-2 py-1 text-xs border border-slate-200 rounded-lg text-center font-bold"
            />
          </div>
        </div>
      </div>

      {!data && (
        <div className="p-6 text-center">
          <button
            onClick={fetchEstimate}
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Calculating...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <IndianRupee className="w-4 h-4" />
                <span>Calculate Cost Estimate</span>
              </span>
            )}
          </button>
        </div>
      )}

      {data && (
        <>
          {/* Yield Loss Summary */}
          <div className="p-5 bg-red-50 border-b border-red-100">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <TrendingDown className="w-5 h-5 text-red-500 mx-auto mb-1" />
                <div className="text-2xl font-extrabold text-red-700">
                  {data.yieldAnalysis.yieldLossPercent}%
                </div>
                <div className="text-[10px] text-red-600">Yield Loss</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold text-red-700">
                  {data.yieldAnalysis.estimatedYieldLossKg.toLocaleString()} kg
                </div>
                <div className="text-[10px] text-red-600">Estimated Loss ({data.areaHectares} ha)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold text-red-700">
                  ₹{data.yieldAnalysis.estimatedFinancialLoss.toLocaleString()}
                </div>
                <div className="text-[10px] text-red-600">Financial Loss</div>
              </div>
            </div>
          </div>

          {/* Treatment Toggle */}
          <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-center space-x-2">
            <button
              onClick={() => setShowChemical(false)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !showChemical ? 'bg-green-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Leaf className="w-3 h-3 inline mr-1" /> Organic
            </button>
            <button
              onClick={() => setShowChemical(true)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                showChemical ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Beaker className="w-3 h-3 inline mr-1" /> Chemical
            </button>
          </div>

          {/* Treatment Options */}
          <div className="p-5 space-y-2">
            {(showChemical ? data.chemicalOptions : data.organicOptions).map((opt, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-700">{opt.name}</div>
                  <div className="text-[10px] text-slate-500">{opt.frequency}x spray • {opt.effectiveness}% effectiveness</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-slate-800">₹{opt.totalCost.toLocaleString()}</div>
                  <div className="text-[10px] text-green-600 font-semibold">{opt.expectedRecovery}% recovery</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-100">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Recommendation</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-3 border border-emerald-100">
                <div className="text-[10px] text-emerald-600 font-semibold mb-1">Best Value (Organic)</div>
                <div className="text-xs font-bold text-slate-800">{data.recommendation.bestValue.name}</div>
                <div className="text-sm font-extrabold text-emerald-700">₹{data.recommendation.bestValue.totalCost.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-blue-100">
                <div className="text-[10px] text-blue-600 font-semibold mb-1">Most Effective</div>
                <div className="text-xs font-bold text-slate-800">{data.recommendation.mostEffective.name}</div>
                <div className="text-sm font-extrabold text-blue-700">{data.recommendation.mostEffective.effectiveness}%</div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-white rounded-lg border border-emerald-100 text-center">
              <span className="text-xs text-slate-600">ROI on treatment: </span>
              <span className="text-sm font-extrabold text-emerald-700">{data.recommendation.roi}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
