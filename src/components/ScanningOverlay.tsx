import React, { useEffect, useState } from 'react';
import { Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface ScanningOverlayProps {
  imagePreviewUrl: string;
}

export const ScanningOverlay: React.FC<ScanningOverlayProps> = ({
  imagePreviewUrl
}) => {
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(2);
      setProgress(55);
    }, 700);

    const timer2 = setTimeout(() => {
      setStage(3);
      setProgress(88);
    }, 1500);

    const timer3 = setTimeout(() => {
      setStage(4);
      setProgress(100);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 text-white space-y-6 text-center">
        
        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>CropVision Neural Processing</span>
          </div>
          <h3 className="font-heading text-lg font-bold">Analyzing Plant Health...</h3>
        </div>

        {/* Image Box with Laser Scan Effect */}
        <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center shadow-inner">
          <img
            src={imagePreviewUrl}
            alt="Scanning specimen"
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />

          {/* Laser Scan Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-laser z-10" />

          {/* Grid Overlay */}
          <div className="absolute inset-0 border border-emerald-500/20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        </div>

          {/* Stages text */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400 font-semibold px-1">
              <span>
                {stage === 1 && '1/3 Preprocessing leaf geometry...'}
                {stage === 2 && '2/3 Matching pathogen spot patterns...'}
                {stage === 3 && '3/3 Synthesizing treatment protocol...'}
                {stage === 4 && 'Analysis complete - preparing results...'}
              </span>
              <span className="text-emerald-400 font-bold">{progress}%</span>
            </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_#10b981]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
