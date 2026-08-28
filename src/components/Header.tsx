import React, { useState } from 'react';
import { Search, MoreVertical, Sprout, Leaf, Sparkles, BookOpen, Cpu, HelpCircle, Phone, ShieldCheck, FileText, Info } from 'lucide-react';
import { MenuModalPage } from '../types';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenMenuPage: (page: MenuModalPage) => void;
  onNavigateHome: () => void;
  onNavigateScanner: () => void;
  onNavigateCrops: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenMenuPage,
  onNavigateHome,
  onNavigateScanner,
  onNavigateCrops
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: { page: MenuModalPage; label: string; icon: React.ReactNode }[] = [
    { page: 'about', label: 'About CropVision', icon: <Info className="w-4 h-4 text-emerald-600" /> },
    { page: 'how_ai_works', label: 'How AI Works', icon: <Cpu className="w-4 h-4 text-sky-600" /> },
    { page: 'user_guide', label: 'User Guide', icon: <BookOpen className="w-4 h-4 text-amber-600" /> },
    { page: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4 text-indigo-600" /> },
    { page: 'contact', label: 'Contact Us', icon: <Phone className="w-4 h-4 text-teal-600" /> },
    { page: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
    { page: 'terms', label: 'Terms & Conditions', icon: <FileText className="w-4 h-4 text-slate-600" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-emerald-100 shadow-xs backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left Side: Brand Logo and Title */}
        <button 
          onClick={onNavigateHome}
          className="flex items-center space-x-3 text-left focus:outline-hidden group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sprout className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-heading text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 bg-clip-text text-transparent">
                CropVision
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                AI 3.0
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Smart Plant Disease Detection & Crop Health
            </p>
          </div>
        </button>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80">
          <button
            onClick={onNavigateHome}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-white rounded-full transition-all cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={onNavigateScanner}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-white rounded-full transition-all flex items-center space-x-1 cursor-pointer"
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Scanner</span>
          </button>
          <button
            onClick={onNavigateCrops}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-white rounded-full transition-all cursor-pointer"
          >
            Major Crops
          </button>
        </nav>

        {/* Right Side: Search Icon & Three-dot Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-hidden transition-all duration-200 flex items-center space-x-2 border border-slate-200 sm:border-transparent sm:hover:border-emerald-200 cursor-pointer"
            title="Search Crops & Diseases"
          >
            <Search className="w-5 h-5 text-slate-700" />
            <span className="text-xs font-medium text-slate-500 hidden sm:inline-block pr-1">
              Search...
            </span>
          </button>

          {/* Three-Dot Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2.5 rounded-full text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-hidden transition-all duration-200 border border-slate-200 cursor-pointer ${
                isMenuOpen ? 'bg-emerald-50 text-emerald-600 border-emerald-300 ring-2 ring-emerald-400/20' : ''
              }`}
              title="Menu Options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {/* Menu Popover */}
            {isMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 py-2 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      CropVision Platform
                    </p>
                  </div>
                  <div className="py-1">
                    {menuItems.map((item) => (
                      <button
                        key={item.page || 'home'}
                        onClick={() => {
                          setIsMenuOpen(false);
                          onOpenMenuPage(item.page);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center space-x-3 transition-colors cursor-pointer"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-50/80 rounded-b-2xl">
                    <div className="flex items-center space-x-2 text-[11px] text-emerald-800 bg-emerald-100/70 p-2 rounded-xl border border-emerald-200">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Empowering 50,000+ farmers & researchers worldwide.</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
