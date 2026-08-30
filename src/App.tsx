/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DiseaseDetectionSection } from './components/DiseaseDetectionSection';
import { DiseaseResultView } from './components/DiseaseResultView';
import { MajorCropsSection } from './components/MajorCropsSection';
import { CropDetailsModal } from './components/CropDetailsModal';
import { CameraModal } from './components/CameraModal';
import { ScanningOverlay } from './components/ScanningOverlay';
import { AIChatAssistant } from './components/AIChatAssistant';
import { SearchPage } from './components/SearchPage';
import { InfoModal } from './components/InfoModal';
import { Footer } from './components/Footer';
import { OutbreakMap } from './components/OutbreakMap';
import { VoiceAssistant } from './components/VoiceAssistant';
import { CropRotation } from './components/CropRotation';
import { NPKScanner } from './components/NPKScanner';
import { PlantXRay } from './components/PlantXRay';
import { StickyTrapAnalyzer } from './components/StickyTrapAnalyzer';
import { EdgeAIScanner } from './components/EdgeAIScanner';
import { RecoveryJournal } from './components/RecoveryJournal';

import { Crop, DiseaseDiagnosis, MenuModalPage } from './types';
import { analyzePlantImage, SAMPLE_DIAGNOSES } from './data/sampleDiagnoses';

export default function App() {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiseaseDiagnosis | null>(null);
  const [selectedCropDetails, setSelectedCropDetails] = useState<Crop | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanningPreviewUrl, setScanningPreviewUrl] = useState<string | null>(null);
  const [menuModalPage, setMenuModalPage] = useState<MenuModalPage>(null);
  const [aiChatPrompt, setAiChatPrompt] = useState<string | null>(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  // Scroll Helpers
  const scrollToScanner = () => {
    const el = document.getElementById('disease-scanner-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCrops = () => {
    const el = document.getElementById('major-crops-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartAnalysis = async (imageInput: string | File, overridePlantName?: string) => {
    const previewUrl = typeof imageInput === 'string' ? imageInput : URL.createObjectURL(imageInput);

    setScanningPreviewUrl(previewUrl);
    setIsScanning(true);

    // Run the AI analysis (backend Gemini call with offline fallback)
    const startedAt = Date.now();
    const diagnosis = await analyzePlantImage(imageInput, overridePlantName);

    // Keep the scanning animation visible for a minimum time so it feels natural
    const minScanTime = 2200;
    const elapsed = Date.now() - startedAt;
    if (elapsed < minScanTime) {
      await new Promise((resolve) => setTimeout(resolve, minScanTime - elapsed));
    }

    setIsScanning(false);
    setSelectedDiagnosis(diagnosis);
    // Smooth scroll to top of diagnosis view
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSelectSampleDiagnosis = (sample: DiseaseDiagnosis) => {
    const sampleDiagnosis = { ...sample, id: 'sample-' + Date.now() };
    setScanningPreviewUrl(sample.imageUrl);
    setIsScanning(true);
    // Let the scanning animation play out before showing the preset result
    setTimeout(() => {
      setIsScanning(false);
      setSelectedDiagnosis(sampleDiagnosis);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 2600);
  };

  const handleAskAI = (promptText: string) => {
    setAiChatPrompt(promptText);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Header with Sticky Nav, Search & Three-Dot Menu */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMenuPage={(page) => setMenuModalPage(page)}
        onNavigateHome={() => {
          setSelectedDiagnosis(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateScanner={() => {
          setSelectedDiagnosis(null);
          setTimeout(scrollToScanner, 100);
        }}
        onNavigateCrops={() => {
          setSelectedDiagnosis(null);
          setTimeout(scrollToCrops, 100);
        }}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        
        {/* If user is viewing a active Disease Diagnosis Result */}
        {selectedDiagnosis ? (
          <DiseaseResultView
            diagnosis={selectedDiagnosis}
            onScanAnother={() => {
              setSelectedDiagnosis(null);
              setTimeout(scrollToScanner, 100);
            }}
            onAskAIAboutDisease={(diseaseName) => {
              handleAskAI(`How can I treat ${diseaseName} on my crop? What are the best organic remedies?`);
            }}
          />
        ) : (
          <>
            {/* 2. Hero Section */}
            <Hero
              onScrollToScanner={scrollToScanner}
              onScrollToCrops={scrollToCrops}
            />

            {/* Features Quick Navigation */}
            <div className="bg-white border-y border-slate-200 sticky top-0 z-30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-hide">
                  <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0 mr-1">Features:</span>
                  {[
                    { label: 'Disease Scanner', id: 'disease-scanner-section', icon: '🔍' },
                    { label: 'Outbreak Map', id: 'section-outbreak-map', icon: '🗺️' },
                    { label: 'Crop Rotation', id: 'section-crop-rotation', icon: '🔄' },
                    { label: 'NPK Scanner', id: 'section-npk-scanner', icon: '🧪' },
                    { label: 'Plant X-Ray', id: 'section-plant-xray', icon: '🔬' },
                    { label: 'Sticky Trap', id: 'section-sticky-trap', icon: '🪤' },
                    { label: 'Edge-AI Scanner', id: 'section-edge-ai', icon: '🤖' },
                    { label: 'Recovery Journal', id: 'section-recovery', icon: '📔' },
                    { label: 'All Crops', id: 'major-crops-section', icon: '🌾' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedDiagnosis(null);
                        setTimeout(() => {
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 50);
                      }}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 text-[10px] font-bold rounded-full whitespace-nowrap transition-all cursor-pointer shrink-0"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Disease Detection Section (Compact Camera & Upload Cards) */}
            <DiseaseDetectionSection
              onStartAnalysis={handleStartAnalysis}
              onSelectSampleDiagnosis={handleSelectSampleDiagnosis}
              onOpenCameraModal={() => setIsCameraModalOpen(true)}
            />

            {/* 3.5. Community Outbreak Alert Map */}
            <section id="section-outbreak-map" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <OutbreakMap />
            </section>

            {/* 3.6. Crop Rotation & Companion Planting AI */}
            <section id="section-crop-rotation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <CropRotation />
            </section>

            {/* 3.7. NPK Chlorophyll Scanner */}
            <section id="section-npk-scanner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <NPKScanner />
            </section>

            {/* 3.8. AR Plant X-Ray & Education */}
            <section id="section-plant-xray" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <PlantXRay />
            </section>

            {/* 3.9. Sticky-Trap Pest Vector Analyzer */}
            <section id="section-sticky-trap" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <StickyTrapAnalyzer />
            </section>

            {/* 3.10. Offline Edge-AI Browser Scanner */}
            <section id="section-edge-ai" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <EdgeAIScanner />
            </section>

            {/* 3.11. Time-Lapse Recovery Journal */}
            <section id="section-recovery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <RecoveryJournal />
            </section>

            {/* 4. Major Crops Section */}
            <MajorCropsSection
              onSelectCrop={(crop) => setSelectedCropDetails(crop)}
            />
          </>
        )}

      </main>

      {/* 5. Footer */}
      <Footer
        onOpenMenuPage={(page) => setMenuModalPage(page)}
        onScrollToScanner={scrollToScanner}
        onScrollToCrops={scrollToCrops}
      />

      {/* Floating AI Chat Assistant (Bottom-Right) */}
      <AIChatAssistant
        initialPrompt={aiChatPrompt}
        onClearInitialPrompt={() => setAiChatPrompt(null)}
      />

      {/* Voice Assistant Modal */}
      <VoiceAssistant
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />

      {/* Floating Voice Button (Bottom-Left) */}
      <button
        onClick={() => setIsVoiceOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all hover:scale-105 cursor-pointer border-2 border-emerald-400"
        title="Voice Assistant — Speak in 10 languages"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        <span className="text-xs font-bold hidden sm:inline">Voice Assistant</span>
      </button>

      {/* Modals & Overlays */}
      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={(dataUrl) => handleStartAnalysis(dataUrl)}
      />

      {/* Neural Laser Scanning Animation Overlay */}
      {isScanning && scanningPreviewUrl && (
        <ScanningOverlay imagePreviewUrl={scanningPreviewUrl} />
      )}

      {/* Dedicated Crop Details Modal (All 26 parameters) */}
      <CropDetailsModal
        crop={selectedCropDetails}
        onClose={() => setSelectedCropDetails(null)}
        onAskAIAboutCrop={(cropName) => {
          setSelectedCropDetails(null);
          handleAskAI(`Tell me about optimal growing conditions, fertilizer ratios, and pest prevention for ${cropName}.`);
        }}
      />

      {/* Dedicated Search Overlay Page */}
      <SearchPage
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCrop={(crop) => setSelectedCropDetails(crop)}
      />

      {/* Menu Pages Modal (About, How AI Works, User Guide, FAQ, Contact Us, Privacy, Terms) */}
      <InfoModal
        page={menuModalPage}
        onClose={() => setMenuModalPage(null)}
      />

    </div>
  );
}
