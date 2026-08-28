import React from 'react';
import { Crop } from '../types';
import { 
  X, Sprout, Sun, Droplets, FlaskConical, Calendar, Compass, 
  Ruler, Clock, TrendingUp, AlertTriangle, ShieldCheck, Leaf, Pill, 
  Bug, Tractor, Package, DollarSign, Utensils, BookOpen, Layers
} from 'lucide-react';

interface CropDetailsModalProps {
  crop: Crop | null;
  onClose: () => void;
  onAskAIAboutCrop: (cropName: string) => void;
}

export const CropDetailsModal: React.FC<CropDetailsModalProps> = ({
  crop,
  onClose,
  onAskAIAboutCrop
}) => {
  if (!crop) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md p-4 sm:p-6 lg:p-8 flex justify-center animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-50 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Sticky Header */}
        <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold border border-emerald-200">
              {crop.icon}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-heading text-xl font-extrabold text-slate-900">
                  {crop.name}
                </h2>
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                  {crop.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 italic">
                Scientific Name: {crop.scientificName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8">
          
          {/* Top Banner: Large Image & Overview Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* 1. Large Crop Image */}
            <div className="lg:col-span-5 relative h-64 lg:h-auto bg-slate-900">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-bold text-emerald-300">
                  Common Name: {crop.commonName}
                </p>
                <p className="text-lg font-extrabold font-heading">{crop.name} Cultivation Guide</p>
              </div>
            </div>

            {/* 2. Crop Overview & Key Specs */}
            <div className="lg:col-span-7 p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  📖 Crop Overview
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2 font-medium">
                  {crop.shortDescription}
                </p>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">🔬 Scientific Name</p>
                  <p className="text-xs font-bold text-slate-800 italic truncate">{crop.scientificName}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">📝 Common Name</p>
                  <p className="text-xs font-bold text-slate-800 truncate">{crop.commonName}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">🌱 Category</p>
                  <p className="text-xs font-bold text-slate-800 truncate">{crop.category}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">🌾 Harvest Time</p>
                  <p className="text-xs font-bold text-emerald-700 truncate">{crop.harvestTime}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">📈 Average Yield</p>
                  <p className="text-xs font-bold text-emerald-700 truncate">{crop.averageYield}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">📅 Growing Season</p>
                  <p className="text-xs font-bold text-slate-800 truncate">{crop.growingSeason}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Section A: Climate, Soil & Growing Requirements */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>Climate, Soil & Water Requirements</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Suitable Regions */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>🌍 Suitable Regions</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {crop.suitableRegions.map((region, idx) => (
                    <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-semibold rounded-lg border border-emerald-200">
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              {/* Climate Requirements */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>🌞 Climate Requirements</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {crop.climate}
                </p>
              </div>

              {/* Soil Type */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>🪨 Soil Type & pH</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {crop.soilType}
                </p>
              </div>

            </div>
          </div>

          {/* Section B: Agronomic & Fertilizer Management */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center space-x-2">
              <FlaskConical className="w-5 h-5 text-teal-600" />
              <span>Fertilizer, Nutrients & Sowing Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Water Requirement */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <span className="text-[11px] font-bold text-sky-700 flex items-center space-x-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-500" />
                  <span>💧 Water Requirement</span>
                </span>
                <p className="text-xs text-slate-700 font-medium">{crop.waterRequirement}</p>
              </div>

              {/* Fertilizer Recommendation */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <span className="text-[11px] font-bold text-teal-700 flex items-center space-x-1">
                  <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
                  <span>🧪 Fertilizer Rec (NPK)</span>
                </span>
                <p className="text-xs text-slate-700 font-medium">{crop.fertilizerRecommendation}</p>
              </div>

              {/* Sowing Method */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-700 flex items-center space-x-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  <span>🌱 Sowing Method</span>
                </span>
                <p className="text-xs text-slate-700 font-medium">{crop.sowingMethod}</p>
              </div>

              {/* Plant Spacing */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <span className="text-[11px] font-bold text-indigo-700 flex items-center space-x-1">
                  <Ruler className="w-3.5 h-3.5 text-indigo-600" />
                  <span>📏 Plant Spacing</span>
                </span>
                <p className="text-xs text-slate-700 font-medium">{crop.plantSpacing}</p>
              </div>

            </div>

            {/* Nutrient Requirements */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-teal-800 flex items-center space-x-1.5 mb-2">
                <Leaf className="w-4 h-4 text-teal-600" />
                <span>🌿 Nutrient Requirements & Micronutrient Management</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {crop.nutrientRequirements}
              </p>
            </div>
          </div>

          {/* Section C: Pathogen & Protection Guide (Diseases, Symptoms, Causes, Organic/Chemical Treatments) */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Plant Pathology & Disease Protection Protocol</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Common Diseases */}
              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
                <div className="flex items-center space-x-2 border-b border-amber-100 pb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h4 className="font-bold text-xs text-amber-900">🦠 Common Diseases & Symptoms</h4>
                </div>
                <div className="space-y-3">
                  {crop.commonDiseasesList.map((disease, idx) => (
                    <div key={idx} className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 space-y-1">
                      <p className="text-xs font-extrabold text-amber-950">{disease.name}</p>
                      <p className="text-[11px] text-slate-700 font-medium">• Symptoms: {disease.symptoms.join('; ')}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disease Causes & Prevention */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-bold text-xs text-slate-900">🔍 Causes & 🛡 Prevention Methods</h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase">Primary Causes:</p>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 mt-0.5">
                      {crop.diseaseCauses.map((c, idx) => <li key={idx}>{c}</li>)}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-emerald-700 uppercase">Prevention Protocols:</p>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 mt-0.5">
                      {crop.preventionMethods.map((p, idx) => <li key={idx}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Organic Treatment */}
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs bg-emerald-50/30 space-y-2">
                <div className="flex items-center space-x-2 border-b border-emerald-100 pb-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-bold text-xs text-emerald-950">🌿 Organic & Biological Treatment</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                  {crop.organicTreatment.map((org, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{org}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Treatment & Common Pests */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div>
                  <span className="text-xs font-bold text-indigo-900 flex items-center space-x-1 mb-1">
                    <Pill className="w-4 h-4 text-indigo-600" />
                    <span>💊 Chemical Fungicide Treatment</span>
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                    {crop.chemicalTreatment.map((chem, idx) => <li key={idx}>{chem}</li>)}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-amber-900 flex items-center space-x-1 mb-1">
                    <Bug className="w-4 h-4 text-amber-600" />
                    <span>🐛 Common Pests</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {crop.commonPests.map((pest, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-amber-50 text-amber-900 text-[11px] font-medium rounded-md border border-amber-200">
                        {pest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Section D: Farming Tips, Storage & Commercial Uses */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Tractor className="w-5 h-5 text-emerald-600" />
              <span>Farming Practices, Storage & Commercial Uses</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Farming Tips */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Tractor className="w-4 h-4 text-emerald-600" />
                  <span>🚜 Pro Farming Tips</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {crop.farmingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Storage Methods */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Package className="w-4 h-4 text-amber-600" />
                  <span>📦 Post-Harvest Storage</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {crop.storageMethods.join(' ')}
                </p>
              </div>

              {/* Market & Food Uses */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div>
                  <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-1">
                    <DollarSign className="w-4 h-4 text-teal-600" />
                    <span>💰 Commercial & Market Uses</span>
                  </span>
                  <p className="text-xs text-slate-600">{crop.marketUses.join(', ')}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-1">
                    <Utensils className="w-4 h-4 text-orange-500" />
                    <span>🍽 Food & Culinary Uses</span>
                  </span>
                  <p className="text-xs text-slate-600">{crop.foodUses.join(', ')}</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={() => onAskAIAboutCrop(crop.name)}
            className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span>Ask CropVision AI about {crop.name}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
