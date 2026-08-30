import React, { useState, useEffect } from 'react';
import { 
  MapPin, AlertTriangle, Filter, RefreshCw, Activity, 
  TrendingUp, Shield, Loader2, ChevronDown
} from 'lucide-react';

interface OutbreakMarker {
  id: string;
  crop: string;
  disease: string;
  lat: number;
  lng: number;
  severity: string;
  district: string;
  state: string;
  reports: number;
  date: string;
  weight: number;
  pulse: boolean;
}

interface Hotspot {
  state: string;
  totalReports: number;
  locations: number;
  diseases: string[];
  riskLevel: string;
}

interface OutbreakData {
  summary: {
    totalReports: number;
    totalLocations: number;
    severeOutbreaks: number;
    highAlerts: number;
    overallThreatLevel: string;
  };
  markers: OutbreakMarker[];
  hotspots: Hotspot[];
  topDiseases: { name: string; occurrences: number; totalReports: number; states: string[] }[];
  recentAlerts: OutbreakMarker[];
}

const severityColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Severe: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  High: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
  Moderate: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  Low: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
};

const threatColors: Record<string, string> = {
  Critical: 'bg-red-100 text-red-800 border-red-300',
  High: 'bg-orange-100 text-orange-800 border-orange-300',
  Moderate: 'bg-amber-100 text-amber-800 border-amber-300',
  Low: 'bg-green-100 text-green-800 border-green-300',
};

export const OutbreakMap: React.FC = () => {
  const [data, setData] = useState<OutbreakData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterCrop, setFilterCrop] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<OutbreakMarker | null>(null);

  const fetchData = async (crop?: string) => {
    setLoading(true);
    try {
      const params = crop ? `?crop=${encodeURIComponent(crop)}` : '';
      const res = await fetch(`/api/outbreak-map${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const result = await res.json();
      setData(result);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleFilter = (crop: string) => {
    setFilterCrop(crop);
    fetchData(crop);
  };

  if (loading && !data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center justify-center space-x-3">
          <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
          <span className="text-sm text-slate-500">Loading outbreak data...</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-xl">
              <MapPin className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-800">
                Community Outbreak Map
              </h3>
              <p className="text-xs text-slate-500">Real-time disease reports from farmers across India</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterCrop}
              onChange={(e) => handleFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-100 text-xs font-semibold text-slate-700 rounded-lg border-0 cursor-pointer"
            >
              <option value="">All Crops</option>
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Maize">Maize</option>
              <option value="Tomato">Tomato</option>
              <option value="Cotton">Cotton</option>
              <option value="Potato">Potato</option>
              <option value="Banana">Banana</option>
              <option value="Sugarcane">Sugarcane</option>
            </select>
            <button 
              onClick={() => fetchData(filterCrop)} 
              className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-5 bg-slate-50 border-b border-slate-100">
        <div className="grid grid-cols-5 gap-3">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-slate-800">{data.summary.totalReports}</div>
            <div className="text-[10px] text-slate-500 font-medium">Total Reports</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-slate-800">{data.summary.totalLocations}</div>
            <div className="text-[10px] text-slate-500 font-medium">Affected Areas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-red-600">{data.summary.severeOutbreaks}</div>
            <div className="text-[10px] text-slate-500 font-medium">Severe</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-orange-600">{data.summary.highAlerts}</div>
            <div className="text-[10px] text-slate-500 font-medium">High Alerts</div>
          </div>
          <div className="text-center">
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${threatColors[data.summary.overallThreatLevel]}`}>
              {data.summary.overallThreatLevel}
            </span>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Threat Level</div>
          </div>
        </div>
      </div>

      {/* Map placeholder + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Map Area */}
        <div className="lg:col-span-2 p-5">
          <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 rounded-xl border border-slate-200 h-[400px] overflow-hidden">
            {/* India outline simplified */}
            <svg viewBox="0 0 500 500" className="w-full h-full opacity-20">
              <path d="M250,50 Q350,100 380,200 Q400,300 350,400 Q300,450 250,460 Q200,450 150,400 Q100,300 120,200 Q150,100 250,50 Z" 
                fill="currentColor" className="text-emerald-300" />
            </svg>
            
            {/* Markers */}
            {(data.markers || []).map((marker) => {
              const x = ((marker.lng - 68) / (98 - 68)) * 100;
              const y = ((marker.lat - 6) / (38 - 6)) * 100;
              const colors = severityColors[marker.severity] || severityColors.Moderate;
              return (
                <div
                  key={marker.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setSelectedMarker(marker)}
                >
                  <div className={`relative ${marker.pulse ? 'animate-pulse' : ''}`}>
                    <div className={`w-4 h-4 rounded-full ${colors.dot} border-2 border-white shadow-lg`} />
                    {marker.pulse && (
                      <div className={`absolute inset-0 w-4 h-4 rounded-full ${colors.dot} animate-ping opacity-50`} />
                    )}
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap shadow-xl">
                      {marker.district}: {marker.reports} reports
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Marker Detail */}
          {selectedMarker && (
            <div className={`mt-3 p-4 rounded-xl border ${severityColors[selectedMarker.severity]?.border || 'border-slate-200'} ${severityColors[selectedMarker.severity]?.bg || 'bg-slate-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-bold text-sm ${severityColors[selectedMarker.severity]?.text || 'text-slate-700'}`}>
                    {selectedMarker.disease} — {selectedMarker.crop}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {selectedMarker.district}, {selectedMarker.state} • {selectedMarker.reports} reports • {selectedMarker.date}
                  </p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${severityColors[selectedMarker.severity]?.text} ${severityColors[selectedMarker.severity]?.bg}`}>
                  {selectedMarker.severity}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-slate-100">
          {/* Hotspots */}
          <div className="p-4 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Top Hotspots</span>
            </h4>
            <div className="space-y-2">
              {(data.hotspots || []).slice(0, 5).map((h, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-700">{h.state}</div>
                      <div className="text-[10px] text-slate-500">{h.diseases.slice(0, 2).join(', ')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-800">{h.totalReports}</div>
                    <span className={`text-[10px] font-semibold ${h.riskLevel === 'Critical' ? 'text-red-600' : h.riskLevel === 'High' ? 'text-orange-600' : 'text-amber-600'}`}>
                      {h.riskLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Diseases */}
          <div className="p-4">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Top Diseases</span>
            </h4>
            <div className="space-y-2">
              {(data.topDiseases || []).map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-orange-500' : 'bg-amber-500'}`} />
                    <span className="text-xs font-medium text-slate-700">{d.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{d.totalReports}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
