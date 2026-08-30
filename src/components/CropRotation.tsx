import React, { useState } from 'react';
import { 
  RefreshCw, Sprout, TreePine, AlertTriangle, CheckCircle2, 
  Loader2, ArrowRight, Leaf
} from 'lucide-react';

interface RotationData {
  crop: string;
  family: string;
  isNitrogenFixer: boolean;
  breakYears: number;
  soilBenefit: string;
  rotationSchedule: { season: string; crop: string; reason: string }[];
  bestPreceding: string[];
  worstPreceding: string[];
  companions: { name: string; benefit: string }[];
  antagonists: string[];
  tips: string[];
}

interface CropRotationProps {
  initialCrop?: string;
}

export const CropRotation: React.FC<CropRotationProps> = ({ initialCrop }) => {
  const [crop, setCrop] = useState(initialCrop || 'Rice');
  const [data, setData] = useState<RotationData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRotation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/crop-rotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop })
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
            <div className="p-2 bg-green-100 rounded-xl">
              <RefreshCw className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-800">
                Crop Rotation & Companion Planting AI
              </h3>
              <p className="text-xs text-slate-500">Optimize your field rotation plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="flex-1 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl cursor-pointer"
          >
            {['Rice','Wheat','Maize','Cotton','Tomato','Potato','Sugarcane','Banana','Soybean','Groundnut','Pulses'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={fetchRotation}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition-all cursor-pointer disabled:opacity-50 flex items-center space-x-1.5"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            <span>Get Plan</span>
          </button>
        </div>
      </div>

      {data && !('error' in data) && (
        <>
          {/* Crop Info */}
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <h4 className="text-lg font-extrabold text-slate-800">{data.crop}</h4>
                <p className="text-xs text-slate-500">Family: {data.family}</p>
              </div>
              {data.isNitrogenFixer && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                  N₂ Fixer
                </span>
              )}
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">
                {data.breakYears}-year break
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{data.soilBenefit}</p>
          </div>

          {/* Rotation Schedule */}
          <div className="p-5 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Rotation Schedule</h4>
            <div className="space-y-2">
              {data.rotationSchedule.map((step, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 font-medium">{step.season}</span>
                        <div className="text-xs font-bold text-slate-800">{step.crop}</div>
                      </div>
                      <span className="text-[10px] text-slate-500 max-w-[150px] text-right">{step.reason}</span>
                    </div>
                  </div>
                  {i < data.rotationSchedule.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Companions & Antagonists */}
          <div className="p-5 grid grid-cols-2 gap-4 border-b border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Best Companions</span>
              </h4>
              <div className="space-y-2">
                {data.companions.map((c, i) => (
                  <div key={i} className="p-2 bg-green-50 rounded-lg border border-green-100">
                    <div className="text-xs font-bold text-green-800">{c.name}</div>
                    <div className="text-[10px] text-green-600">{c.benefit}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Avoid (Antagonists)</span>
              </h4>
              {data.antagonists.length > 0 ? (
                <div className="space-y-1">
                  {data.antagonists.map((a, i) => (
                    <div key={i} className="p-2 bg-red-50 rounded-lg border border-red-100 text-xs font-medium text-red-700">
                      {a}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No known antagonists</p>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="p-5">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center space-x-1">
              <Leaf className="w-3 h-3" />
              <span>Smart Tips</span>
            </h4>
            <ul className="space-y-2">
              {data.tips.map((tip, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
