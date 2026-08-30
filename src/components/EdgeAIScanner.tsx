import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Camera, Loader2, CheckCircle2, AlertTriangle, Smartphone } from 'lucide-react';
import { analyzeOffline, loadEdgeAIModel, isModelLoaded, getModelStatus } from '../lib/edgeAIEngine';

interface EdgeResult {
  source: string;
  colorAnalysis: { dominantColor: string; healthScore: number; greenPixels?: number; yellowPixels?: number; brownPixels?: number };
  isHealthy: boolean | null;
  likelyDiseases: string[];
  recommendation: string;
  topPredictions?: { className: string; probability: number }[];
}

export const EdgeAIScanner: React.FC = () => {
  const [result, setResult] = useState<EdgeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modelStatus, setModelStatus] = useState({ loaded: false, loading: false });

  useEffect(() => {
    setModelStatus(getModelStatus());
    if (!isModelLoaded()) {
      loadEdgeAIModel().then(() => setModelStatus(getModelStatus()));
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setLoading(true);
    try {
      const data = await analyzeOffline(url);
      setResult(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
      setModelStatus(getModelStatus());
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-100 rounded-xl">
              <Smartphone className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-800">
                100% Offline Edge-AI Scanner
              </h3>
              <p className="text-xs text-slate-500">No internet needed — runs in your browser</p>
            </div>
          </div>
          <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
            modelStatus.loaded ? 'bg-green-100 text-green-700' : 
            modelStatus.loading ? 'bg-amber-100 text-amber-700' : 
            'bg-slate-100 text-slate-500'
          }`}>
            {modelStatus.loaded ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            <span>{modelStatus.loaded ? 'Model Ready' : modelStatus.loading ? 'Loading...' : 'Loading Model'}</span>
          </div>
        </div>
      </div>

      {/* Model Info */}
      <div className="px-5 py-3 bg-cyan-50 border-b border-cyan-100 flex items-center space-x-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
        <span className="text-[10px] text-cyan-700 font-medium">
          Uses TensorFlow.js MobileNet — 100% client-side processing. No data sent to any server.
        </span>
      </div>

      {!result && (
        <div className="p-6">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-cyan-400 transition-colors">
            <Camera className="w-8 h-8 text-slate-400 mb-2" />
            <span className="text-sm text-slate-500 font-medium">Upload plant photo</span>
            <span className="text-xs text-slate-400 mt-1">Works offline — no internet required</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      )}

      {loading && (
        <div className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-cyan-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Running Edge-AI analysis...</p>
        </div>
      )}

      {result && (
        <>
          {/* Preview */}
          {previewUrl && (
            <div className="p-4 border-b border-slate-100 flex items-center space-x-4">
              <img src={previewUrl} alt="Plant" className="w-16 h-16 object-cover rounded-xl border border-slate-200" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${result.isHealthy === true ? 'bg-green-500' : result.isHealthy === false ? 'bg-amber-500' : 'bg-slate-400'}`} />
                  <span className="text-sm font-bold text-slate-800">
                    {result.isHealthy === true ? 'Healthy' : result.isHealthy === false ? 'Abnormal' : 'Analysis Complete'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Source: {result.source}</p>
              </div>
              <button onClick={() => { setResult(null); setPreviewUrl(null); }} className="text-xs text-cyan-600 font-semibold cursor-pointer">Scan Again</button>
            </div>
          )}

          {/* Color Analysis */}
          {result.colorAnalysis && (
            <div className="p-5 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Color Analysis</h4>
              <div className="grid grid-cols-3 gap-3">
                {result.colorAnalysis.greenPixels !== undefined && (
                  <>
                    <div className="p-3 bg-green-50 rounded-xl text-center border border-green-100">
                      <div className="text-lg font-extrabold text-green-700">{result.colorAnalysis.greenPixels}%</div>
                      <div className="text-[10px] text-green-600">Green</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-xl text-center border border-yellow-100">
                      <div className="text-lg font-extrabold text-yellow-700">{result.colorAnalysis.yellowPixels}%</div>
                      <div className="text-[10px] text-yellow-600">Yellow</div>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl text-center border border-amber-100">
                      <div className="text-lg font-extrabold text-amber-700">{result.colorAnalysis.brownPixels}%</div>
                      <div className="text-[10px] text-amber-600">Brown</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Top Predictions */}
          {result.topPredictions && result.topPredictions.length > 0 && (
            <div className="p-5 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">MobileNet Predictions</h4>
              <div className="space-y-2">
                {result.topPredictions.slice(0, 5).map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-xs text-slate-700 max-w-[200px] truncate">{p.className}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-200 rounded-full h-1.5">
                        <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${p.probability}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600">{p.probability}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Likely Diseases */}
          {result.likelyDiseases.length > 0 && (
            <div className="p-5 border-b border-slate-100">
              <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Possible Issues</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {result.likelyDiseases.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-semibold rounded-full border border-amber-200">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation */}
          <div className="p-5 bg-cyan-50 border-t border-cyan-100">
            <p className="text-xs text-cyan-800 leading-relaxed">{result.recommendation}</p>
            <p className="text-[10px] text-cyan-600 mt-2 italic">{result.offlineDisclaimer}</p>
          </div>
        </>
      )}
    </div>
  );
};
