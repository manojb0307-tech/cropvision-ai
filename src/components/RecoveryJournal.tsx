import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Clock, Plus, Trash2, ChevronRight, Image, 
  Calendar, BarChart3, CheckCircle2, AlertTriangle
} from 'lucide-react';

interface JournalEntry {
  id: string;
  imageUrl: string;
  timestamp: string;
  dayNumber: number;
  notes: string;
  healthScore: number;
  symptoms: string[];
}

interface PlantJournal {
  id: string;
  plantName: string;
  diseaseName: string;
  startDate: string;
  entries: JournalEntry[];
}

const STORAGE_KEY = 'cropvision_recovery_journals';

function loadJournals(): PlantJournal[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveJournals(journals: PlantJournal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(journals));
}

function estimateHealthScore(imageUrl: string): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);
      const data = ctx.getImageData(0, 0, 50, 50).data;
      let green = 0, total = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 1] > data[i] && data[i + 1] > data[i + 2]) green++;
      }
      resolve(Math.min(100, Math.round((green / total) * 130)));
    };
    img.onerror = () => resolve(50);
    img.src = imageUrl;
  });
}

export const RecoveryJournal: React.FC = () => {
  const [journals, setJournals] = useState<PlantJournal[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<PlantJournal | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlant, setNewPlant] = useState('');
  const [newDisease, setNewDisease] = useState('');
  const [addingEntry, setAddingEntry] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setJournals(loadJournals());
  }, []);

  const createJournal = () => {
    if (!newPlant.trim()) return;
    const journal: PlantJournal = {
      id: `j-${Date.now()}`,
      plantName: newPlant,
      diseaseName: newDisease || 'Unknown',
      startDate: new Date().toISOString(),
      entries: [],
    };
    const updated = [...journals, journal];
    setJournals(updated);
    saveJournals(updated);
    setSelectedJournal(journal);
    setIsCreating(false);
    setNewPlant('');
    setNewDisease('');
  };

  const addEntry = async (file: File) => {
    if (!selectedJournal) return;
    setAddingEntry(true);
    const url = URL.createObjectURL(file);
    const healthScore = await estimateHealthScore(url);
    
    const entry: JournalEntry = {
      id: `e-${Date.now()}`,
      imageUrl: url,
      timestamp: new Date().toISOString(),
      dayNumber: selectedJournal.entries.length + 1,
      notes: '',
      healthScore,
      symptoms: healthScore < 40 ? ['Yellowing', 'Spots visible'] : healthScore < 70 ? ['Some discoloration'] : ['Healthy green'],
    };

    const updated = journals.map(j => 
      j.id === selectedJournal.id 
        ? { ...j, entries: [...j.entries, entry] }
        : j
    );
    setJournals(updated);
    saveJournals(updated);
    setSelectedJournal(updated.find(j => j.id === selectedJournal.id) || null);
    setAddingEntry(false);
  };

  const deleteJournal = (id: string) => {
    const updated = journals.filter(j => j.id !== id);
    setJournals(updated);
    saveJournals(updated);
    if (selectedJournal?.id === id) setSelectedJournal(null);
  };

  const getRecoveryTrend = (entries: JournalEntry[]) => {
    if (entries.length < 2) return 'insufficient';
    const first = entries[0].healthScore;
    const last = entries[entries.length - 1].healthScore;
    if (last > first + 10) return 'improving';
    if (last < first - 10) return 'declining';
    return 'stable';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-100 rounded-xl">
              <Clock className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-800">
                Recovery Journal
              </h3>
              <p className="text-xs text-slate-500">Track plant healing over time</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-3 py-1.5 bg-pink-600 text-white text-xs font-bold rounded-xl hover:bg-pink-700 transition-all cursor-pointer flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Journal</span>
          </button>
        </div>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="p-5 bg-pink-50 border-b border-pink-100 space-y-3">
          <input
            value={newPlant}
            onChange={(e) => setNewPlant(e.target.value)}
            placeholder="Plant name (e.g., Rice)"
            className="w-full px-3 py-2 text-xs border border-pink-200 rounded-xl bg-white"
          />
          <input
            value={newDisease}
            onChange={(e) => setNewDisease(e.target.value)}
            placeholder="Disease name (optional)"
            className="w-full px-3 py-2 text-xs border border-pink-200 rounded-xl bg-white"
          />
          <div className="flex space-x-2">
            <button onClick={createJournal} className="px-4 py-2 bg-pink-600 text-white text-xs font-bold rounded-xl cursor-pointer">Create</button>
            <button onClick={() => setIsCreating(false)} className="px-4 py-2 bg-white text-slate-600 text-xs font-bold rounded-xl border border-slate-200 cursor-pointer">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Journal List */}
        <div className="lg:col-span-1 border-r border-slate-100 max-h-[500px] overflow-y-auto">
          {journals.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No journals yet</p>
              <p className="text-[10px] mt-1">Create one to start tracking recovery</p>
            </div>
          ) : (
            journals.map((j) => {
              const trend = getRecoveryTrend(j.entries);
              return (
                <div
                  key={j.id}
                  onClick={() => setSelectedJournal(j)}
                  className={`p-4 border-b border-slate-100 cursor-pointer transition-colors ${
                    selectedJournal?.id === j.id ? 'bg-pink-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">{j.plantName}</div>
                      <div className="text-[10px] text-slate-500">{j.diseaseName} • {j.entries.length} entries</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {trend === 'improving' && <span className="text-[10px] font-bold text-green-600">↑</span>}
                      {trend === 'declining' && <span className="text-[10px] font-bold text-red-600">↓</span>}
                      <button onClick={(e) => { e.stopPropagation(); deleteJournal(j.id); }} className="p-1 hover:bg-red-100 rounded cursor-pointer">
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Journal Detail */}
        <div className="lg:col-span-2 p-5">
          {selectedJournal ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">{selectedJournal.plantName}</h4>
                  <p className="text-xs text-slate-500">Started {new Date(selectedJournal.startDate).toLocaleDateString()} • {selectedJournal.diseaseName}</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) addEntry(file);
                  }}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={addingEntry}
                  className="px-4 py-2 bg-pink-600 text-white text-xs font-bold rounded-xl hover:bg-pink-700 transition-all cursor-pointer disabled:opacity-50 flex items-center space-x-1.5"
                >
                  {addingEntry ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5" />
                      <span>Add Photo</span>
                    </>
                  )}
                </button>
              </div>

              {/* Timeline */}
              {selectedJournal.entries.length === 0 ? (
                <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                  <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No entries yet. Add your first photo!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Health Trend Chart */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[10px] font-bold text-slate-600 uppercase">Health Trend</span>
                    </div>
                    <div className="flex items-end space-x-1 h-16">
                      {selectedJournal.entries.map((e, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className={`w-full rounded-t ${
                              e.healthScore > 70 ? 'bg-green-400' : e.healthScore > 40 ? 'bg-amber-400' : 'bg-red-400'
                            }`}
                            style={{ height: `${e.healthScore * 0.6}px` }}
                          />
                          <span className="text-[8px] text-slate-400 mt-0.5">D{e.dayNumber}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Entries */}
                  {selectedJournal.entries.map((entry) => (
                    <div key={entry.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <img src={entry.imageUrl} alt={`Day ${entry.dayNumber}`} className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-800">Day {entry.dayNumber}</span>
                          <span className="text-[10px] text-slate-400">{new Date(entry.timestamp).toLocaleDateString()}</span>
                          <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                            entry.healthScore > 70 ? 'bg-green-100 text-green-700' :
                            entry.healthScore > 40 ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {entry.healthScore}%
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {entry.symptoms.map((s, i) => (
                            <span key={i} className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 text-slate-400">
              <Clock className="w-10 h-10 mb-3 opacity-50" />
              <p className="text-sm">Select a journal or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
