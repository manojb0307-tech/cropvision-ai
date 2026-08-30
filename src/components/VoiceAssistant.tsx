import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Globe, Loader2, X, AlertTriangle, Send, Keyboard } from 'lucide-react';
import { chatWithAIRemote } from '../lib/api';
import { ChatMessage } from '../types';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES = [
  { code: 'en-US', name: 'English', sttCode: 'en-US', ttsCode: 'en-US', flag: 'EN', sttSupport: 'full', ttsSupport: 'full' },
  { code: 'hi-IN', name: 'Hindi', sttCode: 'hi-IN', ttsCode: 'hi-IN', flag: 'HI', sttSupport: 'full', ttsSupport: 'full' },
  { code: 'ta-IN', name: 'Tamil', sttCode: 'ta-IN', ttsCode: 'ta-IN', flag: 'TA', sttSupport: 'partial', ttsSupport: 'full' },
  { code: 'te-IN', name: 'Telugu', sttCode: 'te-IN', ttsCode: 'te-IN', flag: 'TE', sttSupport: 'partial', ttsSupport: 'full' },
  { code: 'bn-IN', name: 'Bengali', sttCode: 'bn-BD', ttsCode: 'bn-IN', flag: 'BN', sttSupport: 'partial', ttsSupport: 'partial' },
  { code: 'mr-IN', name: 'Marathi', sttCode: 'mr-IN', ttsCode: 'mr-IN', flag: 'MR', sttSupport: 'partial', ttsSupport: 'partial' },
  { code: 'gu-IN', name: 'Gujarati', sttCode: 'gu-IN', ttsCode: 'gu-IN', flag: 'GU', sttSupport: 'partial', ttsSupport: 'partial' },
  { code: 'kn-IN', name: 'Kannada', sttCode: 'kn-IN', ttsCode: 'kn-IN', flag: 'KN', sttSupport: 'partial', ttsSupport: 'partial' },
  { code: 'ml-IN', name: 'Malayalam', sttCode: 'ml-IN', ttsCode: 'ml-IN', flag: 'ML', sttSupport: 'partial', ttsSupport: 'partial' },
  { code: 'pa-IN', name: 'Punjabi', sttCode: 'pa-IN', ttsCode: 'pa-IN', flag: 'PA', sttSupport: 'partial', ttsSupport: 'partial' },
];

const SYSTEM_PROMPTS: Record<string, string> = {
  'en-US': 'You are CropVision AI, a smart farming assistant. Answer concisely in English.',
  'hi-IN': 'You are CropVision AI, an intelligent farming assistant. Answer concisely in Hindi (Devanagari script).',
  'ta-IN': 'You are CropVision AI, an intelligent farming assistant. Answer concisely in Tamil.',
  'te-IN': 'You are CropVision AI, an intelligent farming assistant. Answer concisely in Telugu.',
  'bn-IN': 'You are CropVision AI, an intelligent farming assistant. Answer concisely in Bengali.',
  'mr-IN': 'You are CropVision AI, an intelligent farming assistant. Answer concisely in Marathi.',
  'gu-IN': 'You are CropVision AI, an intelligent farming assistant. Answer concisely in Gujarati.',
  'kn-IN': 'You are CropVision AI, an intelligent farming assistant. Answer concisely in Kannada.',
  'ml-IN': 'You are CropVision AI, an intelligent farming assistant. Answer concisely in Malayalam.',
  'pa-IN': 'You are CropVision AI, an intelligent farming assistant. Answer concisely in Punjabi.',
};

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [micAvailable, setMicAvailable] = useState<boolean | null>(null);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const historyRef = useRef<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    historyRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [messages, processing, isOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      try { recognitionRef.current?.abort(); } catch {}
      synthRef.current?.cancel();
    };
  }, []);

  useEffect(() => {
    if (isOpen && showTextInput && textInputRef.current) {
      setTimeout(() => textInputRef.current?.focus(), 200);
    }
  }, [isOpen, showTextInput]);

  // Check mic availability on open
  useEffect(() => {
    if (!isOpen) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setMicAvailable(false);
      return;
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        stream.getTracks().forEach(t => t.stop());
        setMicAvailable(true);
      }).catch(() => {
        setMicAvailable(false);
      });
    } else {
      setMicAvailable(false);
    }
  }, [isOpen]);

  const speak = useCallback((text: string, lang: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const plainText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#{1,6}\s/g, '').replace(/`[^`]+`/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Try to find a voice matching the language
    const voices = synthRef.current.getVoices();
    const match = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (match) utterance.voice = match;

    synthRef.current.speak(utterance);
  }, []);

  const processQuery = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setProcessing(true);
    setError(null);

    const userMsg: ChatMessage = {
      id: `v-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const systemPrompt = SYSTEM_PROMPTS[selectedLang.code] || SYSTEM_PROMPTS['en-US'];
      const fullQuery = `${systemPrompt}\n\nUser: ${query}`;
      const reply = await chatWithAIRemote(fullQuery, [...historyRef.current, userMsg]);
      const botMsg: ChatMessage = {
        id: `v-${Date.now() + 1}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, botMsg]);
      speak(reply, selectedLang.ttsCode);
    } catch {
      const fallback = selectedLang.code === 'en-US'
        ? 'Sorry, I could not process your request. Please try again.'
        : 'क्षमा करें, आपके अनुरोध को संसाधित नहीं कर सका। कृपया पुनः प्रयास करें।';
      setMessages(prev => [...prev, {
        id: `v-err-${Date.now()}`,
        sender: 'bot',
        text: fallback,
        timestamp: new Date().toLocaleTimeString(),
      }]);
      speak(fallback, selectedLang.ttsCode);
    } finally {
      setProcessing(false);
    }
  }, [selectedLang, speak]);

  const startListening = useCallback(async () => {
    setError(null);
    setTranscript('');
    synthRef.current?.cancel();
    setIsSpeaking(false);

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError('Speech recognition not available. Use the text input below.');
      setShowTextInput(true);
      return;
    }

    try {
      recognitionRef.current?.abort();
    } catch {}

    // Request mic permission explicitly first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        setError('Microphone permission denied. Use the text input below.');
        setShowTextInput(true);
      } else {
        setError('No microphone found. Use the text input below.');
        setShowTextInput(true);
      }
      return;
    }

    try {
      const recognition = new SR();
      recognition.lang = selectedLang.sttCode;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);

      recognition.onresult = (event: any) => {
        let finalT = '';
        let interimT = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalT += t;
          } else {
            interimT += t;
          }
        }
        setTranscript(finalT || interimT);
        if (finalT) processQuery(finalT);
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setError('Mic blocked. Use the text input below.');
          setShowTextInput(true);
        } else if (event.error === 'no-speech') {
          setError('No speech detected. Tap mic again.');
        } else if (event.error !== 'aborted') {
          setError('Speech error: ' + event.error + '. Use text input.');
          setShowTextInput(true);
        }
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e: any) {
      setError('Failed to start mic. Use text input.');
      setShowTextInput(true);
      setIsListening(false);
    }
  }, [selectedLang, processQuery]);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch {}
    setIsListening(false);
  }, []);

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  const handleTextSubmit = useCallback(() => {
    if (!textInput.trim()) return;
    processQuery(textInput);
    setTextInput('');
  }, [textInput, processQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <h3 className="font-heading font-bold text-sm">Voice Assistant</h3>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowTextInput(!showTextInput)}
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${showTextInput ? 'bg-white/30' : 'hover:bg-white/20'}`}
              title="Toggle text input"
            >
              <Keyboard className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="p-3 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide">
            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLang(lang);
                  synthRef.current?.cancel();
                  setIsSpeaking(false);
                }}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full shrink-0 transition-all cursor-pointer ${
                  selectedLang.code === lang.code
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-[10px] text-slate-500">
              {selectedLang.name} — STT: {selectedLang.sttSupport === 'full' ? 'Full' : 'Partial'} | TTS: {selectedLang.ttsSupport === 'full' ? 'Full' : 'Partial'}
            </p>
            {micAvailable === false && (
              <p className="text-[9px] text-amber-500 font-medium">Mic unavailable — use text</p>
            )}
          </div>
        </div>

        {/* Conversation */}
        <div ref={chatEndRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.length === 0 && !processing && (
            <div className="text-center text-slate-400 text-sm py-6">
              <Mic className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium text-slate-500">
                {micAvailable === false ? 'Type your question below' : 'Tap the mic and speak'}
              </p>
              <p className="text-xs mt-1">Ask about any crop, disease, or fertilizer in {selectedLang.name}</p>
              {micAvailable === false && (
                <button
                  onClick={() => { setShowTextInput(true); setTimeout(() => textInputRef.current?.focus(), 200); }}
                  className="mt-3 px-4 py-2 bg-emerald-600 text-white text-xs rounded-full cursor-pointer hover:bg-emerald-700"
                >
                  Start typing
                </button>
              )}
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-sm'
                  : 'bg-slate-100 text-slate-800 rounded-bl-sm'
              }`}>
                {msg.text.split('\n').filter((l: string) => l.trim()).map((line: string, i: number) => (
                  <p key={i} className={i > 0 ? 'mt-1.5' : ''}>{line}</p>
                ))}
              </div>
            </div>
          ))}

          {processing && (
            <div className="flex justify-start">
              <div className="bg-slate-100 px-3 py-2 rounded-2xl rounded-bl-sm flex items-center space-x-2">
                <Loader2 className="w-3 h-3 text-emerald-600 animate-spin" />
                <span className="text-xs text-slate-500">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Live Transcript */}
        {transcript && (
          <div className="px-4 pb-2 shrink-0">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-xs text-emerald-700 italic">
              &quot;{transcript}&quot;
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="px-4 pb-2 shrink-0">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-[11px] text-amber-700 flex items-start space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Text Input */}
        {showTextInput && (
          <div className="px-4 pb-3 shrink-0">
            <div className="flex items-center space-x-2">
              <input
                ref={textInputRef}
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                placeholder={`Type in ${selectedLang.name}...`}
                className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                onClick={handleTextSubmit}
                disabled={!textInput.trim() || processing}
                className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 flex flex-col items-center space-y-3 shrink-0 border-t border-slate-100">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-600 text-xs font-semibold rounded-full cursor-pointer transition-colors flex items-center space-x-1.5"
            >
              <VolumeX className="w-4 h-4" />
              <span>Stop Speaking</span>
            </button>
          )}

          {/* Mic + Text toggle row */}
          <div className="flex items-center space-x-3">
            {/* Text input toggle */}
            <button
              onClick={() => { setShowTextInput(!showTextInput); if (!showTextInput) setTimeout(() => textInputRef.current?.focus(), 200); }}
              className={`p-3 rounded-full cursor-pointer transition-all ${
                showTextInput
                  ? 'bg-slate-600 text-white shadow-lg'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
              title="Type instead"
            >
              <Keyboard className="w-5 h-5" />
            </button>

            {/* Main Mic Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={processing}
              className={`relative p-6 rounded-full shadow-xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 text-white scale-110 shadow-red-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/30'
              } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isListening && (
                <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30" />
              )}
              {isListening ? <MicOff className="w-8 h-8 relative z-10" /> : <Mic className="w-8 h-8 relative z-10" />}
            </button>

            {/* Silence mic */}
            <div className="w-11" />
          </div>

          <p className="text-[11px] text-slate-400 font-medium">
            {isListening ? `Listening in ${selectedLang.name}...` : processing ? 'Processing...' : isSpeaking ? 'Speaking...' : 'Tap mic or type'}
          </p>
        </div>
      </div>
    </div>
  );
};
