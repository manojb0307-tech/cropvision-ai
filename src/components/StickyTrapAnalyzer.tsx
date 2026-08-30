import React, { useState } from 'react';
import { Bug, Camera, Loader2, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { analyzeStickyTrap } from '../lib/stickyTrapAnalyzer';

interface TrapResult {
  trapColor: string;
  analysis: {
    estimatedPestCount: number;
    sizeDistribution: { small: number; medium: number; large: number };
    spotDensity: number;
  };
  riskLevel: string;
  topPestThreat: { name: string; confidence: number; controlMethods: string[] };
  allPotentialPests: { name: string; probability: number; control: string }[];
  recommendations: string[];
  nextAction: string;
}

export const StickyTrapAnalyzer: React.FC = () => {
  const [result, setResult] = useState<TrapResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [trapColor, setTrapColor] = useState<'yellow' | 'blue'>('yellow');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setLoading(true);
    try {
      const data = await analyzeStickyTrap(url, trapColor);
      setResult(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const riskColors: Record<string, string> = {
    Critical: 'bg-red-100 text-red-800 border-red-300',
    High: 'bg-orange-100 text-orange-800 border-orange-300',
    Moderate: 'bg-amber-100 text-amber-800 border-amber-300',
    Low: 'bg-green-100 text-green-800 border-green-300',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-violet-100 rounded-xl">
            <Bug className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="font-heading text-base font-extrabold text-slate-800">
              Sticky-Trap Pest Analyzer
            </h3>
            <p className="text-xs text-slate-500">Count & identify insects from trap images</p>
          </div>
        </div>
      </div>

      {!result && (
        <div className="p-6 space-y-4">
          {/* Trap Color Selector */}
          <div className="flex items-center justify-center space-x-3">
            <span className="text-xs text-slate-500">Trap Color:</span>
            <button
              onClick={() => setTrapColor('yellow')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                trapColor === 'yellow' ? 'bg-yellow-400 text-yellow-900 shadow-md' : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              Yellow
            </button>
            <button
              onClick={() => setTrapColor('blue')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                trapColor === 'blue' ? 'bg-blue-500 text-white shadow-md' : 'bg-blue-100 text-blue-700'
              }`}
            >
              Blue
            </button>
          </div>

          {/* Upload */}
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-violet-400 transition-colors">
            <Camera className="w-8 h-8 text-slate-400 mb-2" />
            <span className="text-sm text-slate-500 font-medium">Upload sticky trap photo</span>
            <span className="text-xs text-slate-400 mt-1">Flat, well-lit photo works best</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      )}

      {loading && (
        <div className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-violet-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Analyzing pest count...</p>
        </div>
      )}

      {result && (
        <>
          {/* Preview + Summary */}
          <div className="p-4 border-b border-slate-100 flex items-center space-x-4">
            {previewUrl && <img src={previewUrl} alt="Trap" className="w-16 h-16 object-cover rounded-xl border border-slate-200" />}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold text-slate-800">{result.analysis.estimatedPestCount}</span>
                <span className="text-xs text-slate-500">pests estimated</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${riskColors[result.riskLevel]}`}>
                  {result.riskLevel} Risk
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{result.nextAction}</p>
            </div>
            <button onClick={() => { setResult(null); setPreviewUrl(null); }} className="text-xs text-violet-600 font-semibold cursor-pointer">Scan Again</button>
          </div>

          {/* Top Threat */}
          <div className="p-5 bg-red-50 border-b border-red-100">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <h4 className="text-sm font-bold text-red-800">Top Threat: {result.topPestThreat.name}</h4>
                <p className="text-xs text-red-600">{result.topPestThreat.confidence}% confidence</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {result.topPestThreat.controlMethods.map((m, i) => (
                <span key={i} className="px-2 py-0.5 bg-white text-red-700 text-[10px] font-semibold rounded-full border border-red-200">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Size Distribution */}
          <div className="p-5 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Size Distribution</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Small (< 2mm)', count: result.analysis.sizeDistribution.small, color: 'bg-blue-100 text-blue-700' },
                { label: 'Medium (2-5mm)', count: result.analysis.sizeDistribution.medium, color: 'bg-amber-100 text-amber-700' },
                { label: 'Large (> 5mm)', count: result.analysis.sizeDistribution.large, color: 'bg-red-100 text-red-700' },
              ].map((s, i) => (
                <div key={i} className={`${s.color} p-3 rounded-xl text-center`}>
                  <div className="text-lg font-extrabold">{s.count}</div>
                  <div className="text-[10px] font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* All Potential Pests */}
          <div className="p-5 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Potential Pests</h4>
            <div className="space-y-2">
              {result.allPotentialPests.map((pest, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <div>
                    <span className="text-xs font-bold text-slate-700">{pest.name}</span>
                    <span className="text-[10px] text-slate-500 ml-2">{pest.probability}%</span>
                  </div>
                  <div className="w-20 bg-slate-200 rounded-full h-1.5">
                    <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: `${pest.probability}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-5">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>IPM Recommendations</span>
            </h4>
            <ul className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
