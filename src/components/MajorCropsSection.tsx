import React, { useState } from 'react';
import { Crop } from '../types';
import { CROPS_DATA } from '../data/cropsData';
import { Leaf, ArrowRight, Filter, Search } from 'lucide-react';

interface MajorCropsSectionProps {
  onSelectCrop: (crop: Crop) => void;
}

export const MajorCropsSection: React.FC<MajorCropsSectionProps> = ({ onSelectCrop }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Cereals', 'Vegetables', 'Fruits', 'Cash Crops', 'Legumes'];

  const filteredCrops = CROPS_DATA.filter((crop) => {
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crop.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="major-crops-section" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Comprehensive Agronomy Guide</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Major Agricultural Crops
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Explore complete scientific agronomic profiles, cultivation guides, nutrient requirements, pest prevention, and market uses for 16 essential global crops.
          </p>
        </div>

        {/* Filter Tabs & Quick Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          
          {/* Category Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter crops..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition-all"
            />
          </div>

        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="group bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Crop Image Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Crop Icon Badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs flex items-center justify-center text-xl shadow-md border border-white/60">
                    {crop.icon}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-[10px] font-extrabold text-emerald-300 border border-emerald-500/30">
                    {crop.category}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] font-semibold text-emerald-300 italic">
                      {crop.scientificName}
                    </p>
                    <h3 className="font-heading text-xl font-extrabold text-white">
                      {crop.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {crop.shortDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded-md">
                       Yield: {crop.averageYield.split(' ')[0]} {crop.averageYield.split(' ')[1]}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-medium rounded-md">
                       Harvest: {crop.harvestTime.split(' ')[0]} days
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Learn More Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectCrop(crop)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 text-slate-800 hover:text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-sm font-bold text-slate-700">No major crops match your search "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
