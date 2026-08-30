import React, { useState, useEffect } from 'react';
import { 
  TrendingDown, TrendingUp, Cloud, Sun, CloudRain, CloudSnow, 
  AlertTriangle, ShieldCheck, Calendar, Thermometer, Droplets, 
  BarChart3, ChevronDown, ChevronUp, Loader2
} from 'lucide-react';

interface PrognosisDay {
  day: number;
  date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: string;
  untreatedHealth: number;
  treatedHealth: number;
  spreadRisk: 'Low' | 'Moderate' | 'High';
}

interface PrognosisData {
  disease: string;
  severity: string;
  overallRisk: string;
  weatherSummary: {
    avgTemperature: number;
    avgHumidity: number;
    totalRainfall: number;
    highRiskDays: number;
  };
  untreated: {
    finalHealth: number;
    yieldLoss: number;
    outcome: string;
  };
  treated: {
    finalHealth: number;
    yieldSaved: number;
    outcome: string;
  };
  symptoms: string[];
  progression: PrognosisDay[];
}

interface DiseasePrognosisProps {
  diseaseName: string;
  severity?: string;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  const cls = 'w-5 h-5';
  switch (condition) {
    case 'Clear': return <Sun className={`${cls} text-amber-500`} />;
    case 'Cloudy': return <Cloud className={`${cls} text-slate-400`} />;
    case 'Rain': return <CloudRain className={`${cls} text-blue-500`} />;
    case 'Snow': return <CloudSnow className={`${cls} text-blue-300`} />;
    default: return <Sun className={`${cls} text-slate-400`} />;
  }
};

export const DiseasePrognosis: React.FC<DiseasePrognosisProps> = ({ 
  diseaseName, 
  severity = 'Moderate' 
}) => {
  const [data, setData] = useState<PrognosisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchPrognosis = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/prognosis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ diseaseName, severity, lat: 20.5937, lng: 78.9629 })
        });
        if (!res.ok) throw new Error('Failed to fetch prognosis');
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Prognosis unavailable');
      } finally {
        setLoading(false);
      }
    };
    fetchPrognosis();
  }, [diseaseName, severity]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-center space-x-3 py-8">
          <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
          <span className="text-sm text-slate-500 font-medium">Simulating disease progression...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-slate-400">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">Prognosis simulation unavailable</span>
        </div>
      </div>
    );
  }

  const riskColors: Record<string, string> = {
    Critical: 'bg-red-100 text-red-800 border-red-200',
    High: 'bg-orange-100 text-orange-800 border-orange-200',
    Moderate: 'bg-amber-100 text-amber-800 border-amber-200',
    Low: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-800">
                14-Day Prognosis
              </h3>
              <p className="text-xs text-slate-500">Disease progression simulator with weather</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${riskColors[data.overallRisk] || riskColors.Moderate}`}>
            {data.overallRisk} Risk
          </span>
        </div>
      </div>

      {/* Weather Summary */}
      <div className="p-5 bg-slate-50 border-b border-slate-100">
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <Thermometer className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <div className="text-xs text-slate-500">Avg Temp</div>
            <div className="text-sm font-bold text-slate-800">{data.weatherSummary.avgTemperature}°C</div>
          </div>
          <div className="text-center">
            <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <div className="text-xs text-slate-500">Avg Humidity</div>
            <div className="text-sm font-bold text-slate-800">{data.weatherSummary.avgHumidity}%</div>
          </div>
          <div className="text-center">
            <CloudRain className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <div className="text-xs text-slate-500">Total Rain</div>
            <div className="text-sm font-bold text-slate-800">{data.weatherSummary.totalRainfall}mm</div>
          </div>
          <div className="text-center">
            <AlertTriangle className="w-4 h-4 text-red-500 mx-auto mb-1" />
            <div className="text-xs text-slate-500">High Risk Days</div>
            <div className="text-sm font-bold text-red-600">{data.weatherSummary.highRiskDays}</div>
          </div>
        </div>
      </div>

      {/* Treatment Comparison */}
      <div className="p-5 border-b border-slate-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold text-red-700 uppercase">Without Treatment</span>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-extrabold text-red-700">{data.untreated.yieldLoss}%</span>
              <span className="text-xs text-red-600 mb-1">yield loss</span>
            </div>
            <p className="text-xs text-red-600 mt-2 leading-relaxed">{data.untreated.outcome}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center space-x-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-green-700 uppercase">With Treatment</span>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-extrabold text-green-700">{data.treated.yieldSaved}%</span>
              <span className="text-xs text-green-600 mb-1">yield saved</span>
            </div>
            <p className="text-xs text-green-600 mt-2 leading-relaxed">{data.treated.outcome}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Daily Forecast</h4>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <span>{expanded ? 'Show Less' : 'Show All Days'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        <div className="space-y-2">
          {(expanded ? data.progression : data.progression.slice(0, 7)).map((day) => (
            <div 
              key={day.day} 
              className={`flex items-center space-x-3 p-3 rounded-xl ${
                day.spreadRisk === 'High' ? 'bg-red-50 border border-red-100' : 
                day.spreadRisk === 'Moderate' ? 'bg-amber-50 border border-amber-100' : 
                'bg-slate-50 border border-slate-100'
              }`}
            >
              <div className="text-center min-w-[40px]">
                <div className="text-xs font-bold text-slate-600">Day {day.day}</div>
                <div className="text-[10px] text-slate-400">{day.date}</div>
              </div>
              
              <WeatherIcon condition={day.condition} />
              
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-[10px] text-slate-400">Temp</div>
                  <div className="text-xs font-bold text-slate-700">{day.temperature}°</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-400">Humidity</div>
                  <div className="text-xs font-bold text-slate-700">{day.humidity}%</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-400">Rain</div>
                  <div className="text-xs font-bold text-slate-700">{day.rainfall}mm</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 min-w-[180px]">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-red-500 font-medium">No treatment</span>
                    <span className="text-[10px] font-bold text-red-600">{day.untreatedHealth}%</span>
                  </div>
                  <div className="w-full bg-red-100 rounded-full h-1.5">
                    <div 
                      className="bg-red-500 h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${day.untreatedHealth}%` }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-green-500 font-medium">Treated</span>
                    <span className="text-[10px] font-bold text-green-600">{day.treatedHealth}%</span>
                  </div>
                  <div className="w-full bg-green-100 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${day.treatedHealth}%` }}
                    />
                  </div>
                </div>
              </div>

              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                day.spreadRisk === 'High' ? 'bg-red-200 text-red-700' :
                day.spreadRisk === 'Moderate' ? 'bg-amber-200 text-amber-700' :
                'bg-green-200 text-green-700'
              }`}>
                {day.spreadRisk}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
