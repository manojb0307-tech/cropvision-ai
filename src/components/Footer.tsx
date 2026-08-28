import React from 'react';
import { Sprout, Heart, ShieldCheck, Mail, Phone, Globe, Github, Twitter, Linkedin, Facebook } from 'lucide-react';
import { MenuModalPage } from '../types';

interface FooterProps {
  onOpenMenuPage: (page: MenuModalPage) => void;
  onScrollToScanner: () => void;
  onScrollToCrops: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMenuPage,
  onScrollToScanner,
  onScrollToCrops
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-heading text-xl font-extrabold text-white tracking-tight">
                CropVision
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              AI-Powered Plant Disease Detection & Smart Crop Health Assistant. Empowering farmers, researchers, and agronomists with instant computer vision diagnosis and sustainable organic remedies.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-extrabold text-white uppercase tracking-wider">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onScrollToScanner} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  AI Disease Scanner
                </button>
              </li>
              <li>
                <button onClick={onScrollToCrops} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  16 Major Crops Guide
                </button>
              </li>
              <li>
                <button onClick={() => onOpenMenuPage('how_ai_works')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  How AI Works
                </button>
              </li>
              <li>
                <button onClick={() => onOpenMenuPage('user_guide')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Farmer User Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Legal Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading text-xs font-extrabold text-white uppercase tracking-wider">
              Help Center & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenMenuPage('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  About CropVision
                </button>
              </li>
              <li>
                <button onClick={() => onOpenMenuPage('contact')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Contact Us & Support
                </button>
              </li>
              <li>
                <button onClick={() => onOpenMenuPage('faq')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Help Center & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onOpenMenuPage('privacy')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenMenuPage('terms')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} CropVision AI Inc. All rights reserved. Made for Sustainable Agriculture.</p>
          <div className="flex items-center space-x-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI Agricultural Diagnostic System</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
