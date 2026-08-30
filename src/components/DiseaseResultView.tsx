import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Printer, Share2, 
  MessageSquare, Calendar, Sparkles, Sprout, Activity, FileText, Droplets, 
  Sun, Leaf, Zap, Award
} from 'lucide-react';
import { DiseaseDiagnosis } from '../types';
import { DiseasePrognosis } from './DiseasePrognosis';

interface DiseaseResultViewProps {
  diagnosis: DiseaseDiagnosis;
  onScanAnother: () => void;
  onAskAIAboutDisease: (diseaseName: string) => void;
}

export const DiseaseResultView: React.FC<DiseaseResultViewProps> = ({
  diagnosis,
  onScanAnother,
  onAskAIAboutDisease
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `CropVision Diagnosis Result:\nPlant: ${diagnosis.plantName}\nCondition: ${diagnosis.diseaseName}\nConfidence: ${diagnosis.confidence}%\nSuggested Treatment: ${diagnosis.organicTreatment[0] || 'See full report'}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Circular progress math
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (diagnosis.confidence / 100) * circumference;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Banner Navigation & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <Sprout className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-heading text-base font-extrabold text-slate-800">
                AI Health Diagnostic Report
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Scanned on {diagnosis.scanTimestamp} • ID: {diagnosis.id}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Link!' : 'Share Diagnosis'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>

            <button
              onClick={onScanAnother}
              className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Scan Another Plant</span>
            </button>
          </div>
        </div>

        {/* Primary Diagnosis Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Image Column */}
          <div className="md:col-span-5 relative bg-slate-950 flex items-center justify-center min-h-[280px]">
            <img
              src={diagnosis.imageUrl}
              alt={diagnosis.plantName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Status Overlay Badge */}
            <div className="absolute top-4 left-4">
              {diagnosis.isHealthy ? (
                <span className="px-3 py-1 bg-emerald-500/90 text-white font-extrabold text-xs rounded-full shadow-md flex items-center space-x-1 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Healthy Plant</span>
                </span>
              ) : (
                <span className="px-3 py-1 bg-amber-500/90 text-white font-extrabold text-xs rounded-full shadow-md flex items-center space-x-1 backdrop-blur-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Diseased Condition ({diagnosis.severityLevel || 'Moderate'} Severity)</span>
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-white text-[11px] flex items-center justify-between">
              <span className="font-semibold text-slate-300">Target Specimen</span>
              <span className="font-extrabold text-emerald-400">{diagnosis.plantName} Leaf</span>
            </div>
          </div>

          {/* AI Score & Details Column */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Plant Category: {diagnosis.plantName}
                  </span>
                  <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    {diagnosis.diseaseName}
                  </h1>
                </div>

                {/* Animated Circular Progress Score */}
                <div className="relative flex flex-col items-center justify-center shrink-0">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      stroke="#e2e8f0"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      stroke={diagnosis.isHealthy ? "#10b981" : "#f59e0b"}
                      strokeWidth="7"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-extrabold text-slate-900">
                      {diagnosis.confidence}%
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                      Accuracy
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {diagnosis.description}
              </p>
            </div>

            {/* Quick Action bar for AI Chat */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Next Inspection: <strong className="text-slate-800">{diagnosis.nextInspectionDate}</strong></span>
              </div>

              <button
                onClick={() => onAskAIAboutDisease(diagnosis.diseaseName)}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

          </div>

        </div>

        {/* Detailed Analysis Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Symptoms */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Disease Symptoms
              </h3>
            </div>
            <ul className="space-y-2">
              {diagnosis.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Causes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Disease Causes & Triggers
              </h3>
            </div>
            <ul className="space-y-2">
              {diagnosis.causes.map((cause, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Organic Treatment */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-2xs space-y-3 bg-gradient-to-br from-emerald-50/40 to-white">
            <div className="flex items-center space-x-2 border-b border-emerald-100 pb-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-emerald-950">
                Organic & Bio-Treatments
              </h3>
            </div>
            <ul className="space-y-2">
              {diagnosis.organicTreatment.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4: Chemical Treatment */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <div className="p-2 bg-indigo-100 text-indigo-800 rounded-xl">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Recommended Chemical Fungicides
              </h3>
            </div>
            <ul className="space-y-2">
              {diagnosis.chemicalTreatment.map((chem, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span>{chem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 5: Recommended Fertilizers */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <div className="p-2 bg-teal-100 text-teal-800 rounded-xl">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Recommended Fertilizers & Nutrition
              </h3>
            </div>
            <ul className="space-y-2">
              {diagnosis.recommendedFertilizers.map((fert, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span>{fert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 6: Care Instructions & Prevention */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <div className="p-2 bg-slate-100 text-slate-800 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Prevention & Long-Term Care
              </h3>
            </div>
            <ul className="space-y-2">
              {diagnosis.preventionMethods.map((prev, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                  <span>{prev}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Disease Prognosis Simulator */}
        {!diagnosis.isHealthy && (
          <DiseasePrognosis 
            diseaseName={diagnosis.diseaseName} 
            severity={diagnosis.severityLevel || 'Moderate'} 
          />
        )}

        {/* Bottom Call to Action */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-heading text-lg font-bold">
              Need Personalized Guidance for Your Farm?
            </h3>
            <p className="text-xs text-emerald-200">
              Ask CropVision AI Assistant any follow-up question about dosages, irrigation, or harvest timing.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => onAskAIAboutDisease(diagnosis.diseaseName)}
              className="px-5 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              Ask AI Assistant
            </button>
            <button
              onClick={onScanAnother}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all border border-emerald-400 cursor-pointer"
            >
              Scan Another Crop
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
