import React, { useState } from 'react';
import { Eye, Bone, Leaf, Droplets, Sun, Bug, CheckCircle2, ChevronRight } from 'lucide-react';

const PLANT_PARTS = [
  {
    id: 'roots',
    name: 'Root System',
    icon: '🌿',
    color: 'amber',
    description: 'Absorbs water and nutrients from soil. Anchors the plant.',
    diseases: ['Root Rot', 'Nematode Damage', 'Fusarium Wilt'],
    nutrients: 'N-P-K absorption, Micronutrients',
    healthTips: ['Ensure proper drainage', 'Avoid overwatering', 'Use mycorrhizal inoculants'],
    x: 50, y: 85
  },
  {
    id: 'stem',
    name: 'Stem & Stalk',
    icon: '🪵',
    color: 'slate',
    description: 'Transports water, nutrients, and sugars between roots and leaves.',
    diseases: ['Stem Borer', 'Bacterial wilt', 'Sheath Blight'],
    nutrients: 'Vascular transport system',
    healthTips: ['Check for bore holes', 'Look for oozing bacteria', 'Maintain proper spacing'],
    x: 50, y: 65
  },
  {
    id: 'leaves',
    name: 'Leaves',
    icon: '🍃',
    color: 'green',
    description: 'Primary photosynthesis organs. Convert sunlight to energy.',
    diseases: ['Blast', 'Leaf Blight', 'Rust', 'Powdery Mildew'],
    nutrients: 'Chlorophyll (Mg), N for growth',
    healthTips: ['Monitor leaf color daily', 'Check both leaf surfaces', 'Look for spots, wilting, yellowing'],
    x: 35, y: 45
  },
  {
    id: 'flowers',
    name: 'Flowers / Panicles',
    icon: '🌸',
    color: 'pink',
    description: 'Reproductive structures. Critical for grain/fruit set.',
    diseases: ['Neck Blast', 'Panicle Mites', 'Flower Thrips'],
    nutrients: 'Boron for pollen, P for flowering',
    healthTips: ['Protect during flowering stage', 'Avoid stress during anthesis', 'Monitor for thrips'],
    x: 65, y: 30
  },
  {
    id: 'grain',
    name: 'Grain / Fruit',
    icon: '🌾',
    color: 'yellow',
    description: 'Harvestable yield. Fill depends on nutrition and health.',
    diseases: ['Grain Discoloration', 'Kernel Smut', 'Fruit Cracking'],
    nutrients: 'K for grain filling, Si for strength',
    healthTips: ['Maintain irrigation during filling', 'Avoid late-season nitrogen', 'Harvest at optimal moisture'],
    x: 55, y: 20
  }
];

const colorMap: Record<string, string> = {
  amber: 'bg-amber-100 border-amber-300 text-amber-700',
  slate: 'bg-slate-100 border-slate-300 text-slate-700',
  green: 'bg-green-100 border-green-300 text-green-700',
  pink: 'bg-pink-100 border-pink-300 text-pink-700',
  yellow: 'bg-yellow-100 border-yellow-300 text-yellow-700',
};

export const PlantXRay: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<typeof PLANT_PARTS[0] | null>(null);
  const [showXRay, setShowXRay] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <Eye className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-800">
                AR Plant X-Ray & Education
              </h3>
              <p className="text-xs text-slate-500">Interactive plant anatomy explorer</p>
            </div>
          </div>
          <button
            onClick={() => setShowXRay(!showXRay)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              showXRay ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {showXRay ? 'X-Ray ON' : 'X-Ray OFF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Plant Diagram */}
        <div className="p-6 relative bg-gradient-to-b from-blue-50 via-green-50 to-amber-50 min-h-[400px]">
          {/* Simple plant illustration using divs */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Roots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1 bg-amber-600 rounded-full" style={{ height: `${20 + Math.random() * 15}px`, transform: `rotate(${(i - 2) * 15}deg)` }} />
                ))}
              </div>
            </div>

            {/* Stem */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-2 bg-green-700 rounded-full" style={{ height: '120px' }} />

            {/* Leaves */}
            <div className="absolute" style={{ bottom: '140px', left: '30%' }}>
              <div className="w-16 h-6 bg-green-500 rounded-full -rotate-30 shadow-md" />
            </div>
            <div className="absolute" style={{ bottom: '140px', right: '30%' }}>
              <div className="w-16 h-6 bg-green-500 rounded-full rotate-30 shadow-md" />
            </div>
            <div className="absolute" style={{ bottom: '170px', left: '32%' }}>
              <div className="w-14 h-5 bg-green-400 rounded-full -rotate-25 shadow-md" />
            </div>

            {/* Panicle/Flower */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center">
                <div className="w-1 h-8 bg-green-600 rounded-full" />
                <div className="flex space-x-1 -mt-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-300 rounded-full -mt-1" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* X-Ray overlay markers */}
            {showXRay && PLANT_PARTS.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm cursor-pointer transition-all hover:scale-125 z-10 ${
                  selectedPart?.id === part.id
                    ? 'bg-indigo-600 border-indigo-800 text-white shadow-lg animate-pulse'
                    : `bg-white border-indigo-400 hover:bg-indigo-50`
                }`}
                style={{ left: `${part.x}%`, top: `${part.y}%`, transform: 'translate(-50%, -50%)' }}
                title={part.name}
              >
                {part.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Part Detail Panel */}
        <div className="p-5 border-t lg:border-t-0 lg:border-l border-slate-100">
          {selectedPart ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedPart.icon}</span>
                <div>
                  <h4 className="font-heading text-lg font-extrabold text-slate-800">{selectedPart.name}</h4>
                  <p className="text-xs text-slate-500">{selectedPart.description}</p>
                </div>
              </div>

              {/* Diseases */}
              <div>
                <h5 className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-2">Common Diseases</h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPart.diseases.map((d, i) => (
                    <span key={i} className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-semibold rounded-full border border-red-100">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrients */}
              <div>
                <h5 className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-2">Key Nutrients</h5>
                <p className="text-xs text-slate-700 bg-blue-50 p-2 rounded-lg border border-blue-100">{selectedPart.nutrients}</p>
              </div>

              {/* Health Tips */}
              <div>
                <h5 className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-2">Health Monitoring Tips</h5>
                <ul className="space-y-1.5">
                  {selectedPart.healthTips.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <Eye className="w-10 h-10 text-indigo-200 mb-3" />
              <h4 className="text-sm font-bold text-slate-400">Tap a plant part to explore</h4>
              <p className="text-xs text-slate-400 mt-1">Learn about diseases, nutrients & health monitoring</p>
              <div className="mt-4 space-y-1">
                {PLANT_PARTS.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className="flex items-center space-x-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                  >
                    <span>{part.icon}</span>
                    <span>{part.name}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
