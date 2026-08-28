import React, { useState } from 'react';
import { Search, X, TrendingUp, Clock, Sparkles, Leaf, ArrowRight, AlertTriangle } from 'lucide-react';
import { CROPS_DATA } from '../data/cropsData';
import { Crop } from '../types';

interface SearchPageProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCrop: (crop: Crop) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ isOpen, onClose, onSelectCrop }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Tomato Early Blight', 'Rice Blast', 'Potato Late Blight', 'Maize Nitrogen Schedule', 'Cotton Whitefly'
  ]);

  if (!isOpen) return null;

  const popularCrops = CROPS_DATA.slice(0, 6);
  const trendingCrops = CROPS_DATA.slice(6, 12);

  const filteredCrops = query.trim() === '' ? [] : CROPS_DATA.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.scientificName.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase()) ||
    c.commonDiseasesList.some(d => d.name.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelectRecent = (term: string) => {
    setQuery(term);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 lg:p-8 flex justify-center animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Top Search Input Header */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center space-x-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-emerald-600 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search crops, diseases, scientific names, or fertilizers..."
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all shadow-2xs"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            title="Close Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* Active Search Results */}
          {query.trim() !== '' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Search Results ({filteredCrops.length})
                </span>
                <span className="text-xs font-semibold text-emerald-700">Live AI Filtering</span>
              </div>

              {filteredCrops.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredCrops.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => {
                        onSelectCrop(crop);
                        onClose();
                      }}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left flex items-center space-x-3 group cursor-pointer"
                    >
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-12 h-12 rounded-xl object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-heading font-extrabold text-sm text-slate-900 group-hover:text-emerald-800">
                            {crop.name}
                          </span>
                          <span className="text-xs">{crop.icon}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 italic truncate">{crop.scientificName}</p>
                        <p className="text-[10px] text-emerald-700 font-bold mt-0.5">{crop.category}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="text-sm font-bold text-slate-800">No matching crops or diseases found for "{query}"</p>
                  <p className="text-xs text-slate-500">Try searching for broader terms like "Rice", "Tomato", "Blast", or "Fungicide"</p>
                </div>
              )}
            </div>
          )}

          {/* Default Content when query is empty */}
          {query.trim() === '' && (
            <div className="space-y-8">
              
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Recent Searches</span>
                    </div>
                    <button
                      onClick={handleClearRecent}
                      className="text-[11px] font-bold text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      Clear Recent
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectRecent(term)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
                      >
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Crops */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Popular Staples</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {popularCrops.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => {
                        onSelectCrop(crop);
                        onClose();
                      }}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition-all text-left flex items-center space-x-2.5 group cursor-pointer"
                    >
                      <span className="text-xl">{crop.icon}</span>
                      <div className="overflow-hidden">
                        <p className="text-xs font-extrabold text-slate-800 group-hover:text-emerald-800 truncate">{crop.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{crop.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Crops */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                  <span>Trending Horticultures</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {trendingCrops.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => {
                        onSelectCrop(crop);
                        onClose();
                      }}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 transition-all text-left flex items-center space-x-2.5 group cursor-pointer"
                    >
                      <span className="text-xl">{crop.icon}</span>
                      <div className="overflow-hidden">
                        <p className="text-xs font-extrabold text-slate-800 group-hover:text-sky-800 truncate">{crop.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{crop.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
