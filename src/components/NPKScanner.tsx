import React, { useState } from 'react';
import { 
  Leaf, AlertTriangle, CheckCircle2, Camera, Loader2, Info, Droplets
} from 'lucide-react';
import { analyzeNPK } from '../lib/npkScanner';

interface NPKResult {
  nitrogen: { level: string; value: number; color: string; confidence: number };
  phosphorus: { level: string; value: number; color: string; confidence: number };
  potassium: { level: string; value: number; color: string; confidence: number };
  chlorophyll: {
    exg: number;
    vari: number;
    greenRatio: number;
    darkGreenRatio: number;
    yellowRatio: number;
    brownRatio: number;
    avgRGB: { r: number; g: number; b: number };
  };
  overallHealth: string;
  recommendations: { nutrient: string; action: string; urgency: string }[];
  disclaimer: string;
}

export const NPKScanner: React.FC = () => {
  const [result, setResult] = useState<NPKResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setLoading(true);
    try {
      const npk = await analyzeNPK(url);
      setResult(npk);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const levelColors: Record<string, string> = {
    Optimal: 'text-green-600',
    Moderate: 'text-amber-600',
    Low: 'text-red-600',
    Unknown: 'text-slate-400',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-lime-100 rounded-xl">
            <Droplets className="w-5 h-5 text-lime-600" />
          </div>
          <div>
            <h3 className="font-heading text-base font-extrabold text-slate-800">
              NPK Chlorophyll Scanner
            </h3>
            <p className="text-xs text-slate-500">Estimate Nitrogen, Phosphorus, Potassium from leaf color</p>
          </div>
        </div>
      </div>

      {/* Upload */}
      {!result && (
        <div className="p-6">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-emerald-400 transition-colors">
            <Camera className="w-8 h-8 text-slate-400 mb-2" />
            <span className="text-sm text-slate-500 font-medium">Upload a leaf photo</span>
            <span className="text-xs text-slate-400 mt-1">Close-up of the leaf surface</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      )}

      {loading && (
        <div className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-lime-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Analyzing chlorophyll & nutrients...</p>
        </div>
      )}

      {result && (
        <>
          {/* Preview */}
          {previewUrl && (
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center space-x-4">
                <img src={previewUrl} alt="Leaf" className="w-20 h-20 object-cover rounded-xl border border-slate-200" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Analysis Complete</h4>
                  <p className="text-xs text-slate-500">{result.overallHealth}</p>
                </div>
                <button
                  onClick={() => { setResult(null); setPreviewUrl(null); }}
                  className="ml-auto text-xs text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                >
                  Scan Again
                </button>
              </div>
            </div>
          )}

          {/* NPK Gauges */}
          <div className="p-5 grid grid-cols-3 gap-4 border-b border-slate-100">
            {[
              { label: 'Nitrogen (N)', data: result.nitrogen, icon: 'N' },
              { label: 'Phosphorus (P)', data: result.phosphorus, icon: 'P' },
              { label: 'Potassium (K)', data: result.potassium, icon: 'K' },
            ].map((item) => (
              <div key={item.icon} className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-lg font-extrabold ${
                  item.data.color === 'green' ? 'bg-green-100 text-green-700' :
                  item.data.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                  item.data.color === 'red' ? 'bg-red-100 text-red-700' :
                  'bg-slate-100 text-slate-400'
                }`}>
                  {item.icon}
                </div>
                <div className="mt-2 text-[10px] text-slate-500">{item.label}</div>
                <div className={`text-sm font-extrabold ${levelColors[item.data.level]}`}>
                  {item.data.level}
                </div>
                <div className="text-[10px] text-slate-400">{item.data.value} mg/kg • {item.data.confidence}%</div>
              </div>
            ))}
          </div>

          {/* Chlorophyll Indices */}
          <div className="p-5 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Chlorophyll Indices</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <div className="text-[10px] text-green-600 font-medium">ExG (Excess Green)</div>
                <div className="text-lg font-extrabold text-green-700">{result.chlorophyll.exg}</div>
              </div>
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
                <div className="text-[10px] text-teal-600 font-medium">VARI</div>
                <div className="text-lg font-extrabold text-teal-700">{result.chlorophyll.vari}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">Green Pixels</div>
                <div className="text-lg font-extrabold text-slate-700">{result.chlorophyll.greenRatio}%</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">Dark Green</div>
                <div className="text-lg font-extrabold text-slate-700">{result.chlorophyll.darkGreenRatio}%</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="p-5">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center space-x-1">
                <Leaf className="w-3 h-3" />
                <span>Recommendations</span>
              </h4>
              <div className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${
                    rec.urgency === 'High' ? 'bg-red-50 border-red-100' :
                    rec.urgency === 'Medium' ? 'bg-amber-50 border-amber-100' :
                    'bg-green-50 border-green-100'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-700">{rec.nutrient}</span>
                      {rec.urgency !== 'None' && (
                        <span className={`text-[10px] font-bold ${
                          rec.urgency === 'High' ? 'text-red-600' : 'text-amber-600'
                        }`}>
                          {rec.urgency} Priority
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{rec.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <div className="flex items-start space-x-2">
              <Info className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <p className="text-[10px] text-slate-500 leading-relaxed">{result.disclaimer}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
