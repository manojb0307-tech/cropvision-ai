import React from 'react';
import { Camera, Upload, Sparkles, ShieldCheck, CheckCircle2, Zap, ArrowRight, Activity, Leaf } from 'lucide-react';

interface HeroProps {
  onScrollToScanner: () => void;
  onScrollToCrops: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToScanner, onScrollToCrops }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-sky-50/40 to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative background glow circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-300/20 via-sky-300/20 to-amber-200/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Hero Action */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/90 border border-emerald-200 shadow-xs px-3.5 py-1.5 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-800">
                Next-Gen Agriculture Intelligence
              </span>
            </div>

            {/* Large Title */}
            <div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 bg-clip-text text-transparent">
                  CropVision
                </span>
              </h1>
              
              {/* Subtitle */}
              <h2 className="mt-3 text-lg sm:text-xl font-bold text-slate-700 leading-snug">
                AI-Powered Plant Disease Detection & Smart Crop Health Assistant
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Capture or upload a crop image and let Artificial Intelligence detect diseases instantly. Get detailed disease analysis, treatment recommendations, and complete crop information in one place.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">99.2% Accuracy</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-sky-100 shadow-2xs">
                <Zap className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Instant AI Diagnosis</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-amber-100 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Organic Remedies</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToScanner}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-200 flex items-center space-x-2 group cursor-pointer"
              >
                <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Scan Plant Disease Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToCrops}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Explore 16 Major Crops</span>
              </button>
            </div>
          </div>

          {/* Right Column: Farming / Crop Visual & Live Interactive AI Preview */}
          <div className="lg:col-span-5 relative">
            {/* Main Interactive Illustration Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80"
                alt="Green Smart Farming Field"
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Top Floating Badge: AI Scanning Active */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center space-x-2">
                  <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  <span>CropVision AI Active</span>
                </div>
                <div className="bg-emerald-500/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  Ready to Scan
                </div>
              </div>

              {/* Bottom Card Content Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      🌾
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">Rice Leaf Blast Analysis</p>
                      <p className="text-[10px] text-slate-500 font-medium">Magnaporthe oryzae detected</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    98.4% Confidence
                  </span>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100">
                  <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                    Organic Neem Remedy Available
                  </span>
                  <button 
                    onClick={onScrollToScanner}
                    className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Try Sample →
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative Floating Mini Badges */}
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-emerald-100 hidden sm:flex items-center space-x-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg">
                🍅
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Early Blight Cure</p>
                <p className="text-[10px] text-slate-500">Tomato & Potato</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-sky-100 hidden sm:flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-lg">
                🌽
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Maize Rust Shield</p>
                <p className="text-[10px] text-slate-500">Instant Organic Guide</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
