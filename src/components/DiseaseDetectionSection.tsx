import React, { useRef, useState } from 'react';
import { Camera, Upload, Sparkles, Image as ImageIcon, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SAMPLE_DIAGNOSES } from '../data/sampleDiagnoses';
import { DiseaseDiagnosis } from '../types';

interface DiseaseDetectionSectionProps {
  onStartAnalysis: (imageInput: string | File, overridePlantName?: string) => void;
  onSelectSampleDiagnosis: (diagnosis: DiseaseDiagnosis) => void;
  onOpenCameraModal: () => void;
}

export const DiseaseDetectionSection: React.FC<DiseaseDetectionSectionProps> = ({
  onStartAnalysis,
  onSelectSampleDiagnosis,
  onOpenCameraModal
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onStartAnalysis(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onStartAnalysis(file);
    }
  };

  return (
    <section id="disease-scanner-section" className="py-12 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Disease Scanner</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Detect Plant Diseases Instantly
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Choose your preferred method to capture or upload a crop leaf image for immediate AI diagnosis and treatment recommendations.
          </p>
        </div>

        {/* Two Compact Modern Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          {/* 1. Compact Camera Card */}
          <div className="gradient-border-emerald rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 glass-panel flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                  Live Camera
                </span>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  Camera Photo
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Take a fresh photo of the affected crop leaf directly using your mobile or desktop camera.
                </p>
              </div>
            </div>

            <div className="pt-5">
              <button
                onClick={onOpenCameraModal}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Photo</span>
              </button>
            </div>
          </div>

          {/* 2. Compact Upload Card */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`gradient-border-emerald rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 glass-panel flex flex-col justify-between group ${
              isDragOver ? 'ring-2 ring-sky-500 bg-sky-50/50' : ''
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-sky-100 text-sky-800 rounded-full border border-sky-200">
                  File Upload
                </span>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
                  Upload Card
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Select an existing photo from your device gallery or drag & drop a leaf image file here.
                </p>
              </div>
            </div>

            <div className="pt-5">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-600/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload from Gallery</span>
              </button>
            </div>
          </div>

        </div>

        {/* Try Sample Preset Bar */}
        <div className="mt-8 max-w-3xl mx-auto bg-white/80 rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-extrabold text-slate-800">
                Or Try Preset Sample Crop Scans (1-Click Test):
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              No photo needed for testing
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {SAMPLE_DIAGNOSES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onSelectSampleDiagnosis(sample)}
                className="p-2 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/60 transition-all text-left flex items-center space-x-2 group cursor-pointer"
              >
                <img
                  src={sample.imageUrl}
                  alt={sample.plantName}
                  className="w-8 h-8 rounded-lg object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-slate-800 truncate">
                    {sample.plantName}
                  </p>
                  <p className="text-[10px] text-emerald-700 truncate font-medium">
                    {sample.isHealthy ? 'Healthy' : sample.diseaseName.split('(')[0]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
