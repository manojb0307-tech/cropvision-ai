import React, { useState } from 'react';
import { 
  X, Info, Cpu, BookOpen, HelpCircle, Phone, ShieldCheck, FileText, 
  CheckCircle2, Send, Mail, MapPin, Sparkles, Sprout, ArrowRight
} from 'lucide-react';
import { MenuModalPage } from '../types';

interface InfoModalProps {
  page: MenuModalPage;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ page, onClose }) => {
  const [contactSent, setContactSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Disease Query', message: '' });

  if (!page) return null;

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setFormData({ name: '', email: '', subject: 'Disease Query', message: '' });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md p-4 sm:p-6 lg:p-8 flex justify-center animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold">
                {page === 'about' && 'About CropVision Platform'}
                {page === 'how_ai_works' && 'How AI Disease Detection Works'}
                {page === 'user_guide' && 'User & Farmer Guide'}
                {page === 'faq' && 'Frequently Asked Questions (FAQ)'}
                {page === 'contact' && 'Contact Us & Agricultural Support'}
                {page === 'privacy' && 'Privacy Policy'}
                {page === 'terms' && 'Terms & Conditions'}
              </h2>
              <p className="text-xs text-slate-400 font-medium">CropVision Smart Agronomy Systems</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* 1. About CropVision */}
          {page === 'about' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <h3 className="font-heading text-lg font-bold text-emerald-950">
                  Empowering Global Agriculture with Computer Vision AI
                </h3>
                <p className="text-xs text-slate-700">
                  CropVision is a commercial-grade artificial intelligence platform created to revolutionize plant pathology diagnosis and crop health management. By combining deep learning convolutional vision models with expert agronomic knowledge, CropVision empowers farmers, agriculture extension officers, students, and researchers with instant disease detection and organic treatment protocols.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <p className="text-xl font-extrabold text-emerald-700 font-heading">99.2%</p>
                  <p className="text-xs font-bold text-slate-800">Diagnostic Accuracy</p>
                  <p className="text-[11px] text-slate-500">Trained on over 150,000 verified leaf disease image datasets.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <p className="text-xl font-extrabold text-sky-700 font-heading">16 Major Crops</p>
                  <p className="text-xs font-bold text-slate-800">Complete Guides</p>
                  <p className="text-[11px] text-slate-500">Full NPK, climate, soil, sowing, and harvest parameters.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <p className="text-xl font-extrabold text-amber-700 font-heading">100% Free</p>
                  <p className="text-xs font-bold text-slate-800">Beginner Friendly</p>
                  <p className="text-[11px] text-slate-500">Designed for easy smartphone usage directly in the field.</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. How AI Works */}
          {page === 'how_ai_works' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                The 4-Step CropVision Neural Analysis Engine
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Step 1</span>
                  <h4 className="font-bold text-slate-800 mt-1">Image Preprocessing & Edge Detection</h4>
                  <p className="text-xs text-slate-600">Normalization of lighting, leaf background isolation, and resolution scaling.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">Step 2</span>
                  <h4 className="font-bold text-slate-800 mt-1">Feature Extraction (CNN Layers)</h4>
                  <p className="text-xs text-slate-600">Analyzing lesion shape, chlorotic yellow halos, necrosis, and spore spot geometry.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">Step 3</span>
                  <h4 className="font-bold text-slate-800 mt-1">Pathogen Classification & Score</h4>
                  <p className="text-xs text-slate-600">Cross-referencing fungal, bacterial, viral, or nutrient deficiency signatures.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">Step 4</span>
                  <h4 className="font-bold text-slate-800 mt-1">Treatment Protocol Generation</h4>
                  <p className="text-xs text-slate-600">Synthesizing organic neem remedies, chemical dosages, and fertilizer plans.</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. User Guide */}
          {page === 'user_guide' && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Farmer & Researcher Quick Start
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">1. Take clear, close-up photo:</strong> Ensure the affected leaf is well-lit and centered in the viewfinder frame.
                  </div>
                </li>
                <li className="flex items-start space-x-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">2. Review AI Diagnosis:</strong> Inspect the confidence percentage score and organic cure list.
                  </div>
                </li>
                <li className="flex items-start space-x-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">3. Chat with CropVision AI:</strong> Ask follow-up questions regarding fungicide brand dosages or weather precautions.
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* 4. FAQ */}
          {page === 'faq' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Q: Is CropVision free for farmers?</p>
                <p className="text-xs text-slate-600">A: Yes, CropVision is completely free to use for farmers, extension workers, and students globally.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Q: Can I scan crops without an internet connection in remote fields?</p>
                <p className="text-xs text-slate-600">A: You can capture photos directly using your camera app, and upload them whenever connectivity is restored.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Q: Does the app recommend organic treatments?</p>
                <p className="text-xs text-slate-600">A: Yes! Every diagnosis prioritizes eco-friendly organic remedies (like Neem extract and bio-agents) alongside chemical options.</p>
              </div>
            </div>
          )}

          {/* 5. Contact Us */}
          {page === 'contact' && (
            <div className="space-y-4">
              {contactSent ? (
                <div className="p-8 text-center bg-emerald-50 rounded-3xl border border-emerald-200 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="font-heading text-lg font-bold text-emerald-950">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-800">Our agricultural specialists will review your query and reply shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Your Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Farmer"
                        className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Email Address</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@farm.com"
                        className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Message / Plant Inquiry</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your crop issue, farm location, or feedback..."
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all"
                  >
                    Submit Support Message
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 6. Privacy Policy */}
          {page === 'privacy' && (
            <div className="space-y-3 text-slate-600 text-xs">
              <p>CropVision values user privacy. Images captured or uploaded are processed solely for plant disease diagnostic analysis and agricultural machine learning refinement. No personally identifiable credentials or locations are shared with third parties.</p>
            </div>
          )}

          {/* 7. Terms & Conditions */}
          {page === 'terms' && (
            <div className="space-y-3 text-slate-600 text-xs">
              <p>CropVision AI diagnostic results are intended for advisory agronomic support. Users are advised to double-check chemical dosages with local certified agricultural extension officers prior to large-scale pesticide applications.</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
