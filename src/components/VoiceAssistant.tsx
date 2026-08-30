import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Globe, Loader2, X, AlertTriangle } from 'lucide-react';
import { chatWithAIRemote } from '../lib/api';
import { ChatMessage } from '../types';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES = [
  { code: 'en-US', name: 'English', flag: 'EN' },
  { code: 'hi-IN', name: 'Hindi', flag: 'HI' },
  { code: 'ta-IN', name: 'Tamil', flag: 'TA' },
  { code: 'te-IN', name: 'Telugu', flag: 'TE' },
  { code: 'bn-IN', name: 'Bengali', flag: 'BN' },
  { code: 'mr-IN', name: 'Marathi', flag: 'MR' },
  { code: 'gu-IN', name: 'Gujarati', flag: 'GU' },
  { code: 'kn-IN', name: 'Kannada', flag: 'KN' },
  { code: 'ml-IN', name: 'Malayalam', flag: 'ML' },
  { code: 'pa-IN', name: 'Punjabi', flag: 'PA' },
];

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const historyRef = useRef<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  const addDebug = useCallback((msg: string) => {
    setDebugInfo(prev => [...prev.slice(-6), `${new Date().toLocaleTimeString()}: ${msg}`]);
  }, []);

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
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(t => t.stop());
        micStreamRef.current = null;
      }
    };
  }, []);

  const speak = useCallback((text: string, lang: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const plainText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#{1,6}\s/g, '').replace(/`[^`]+`/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  }, []);

  const processQuery = useCallback(async (query: string, lang: string) => {
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
      const reply = await chatWithAIRemote(query, [...historyRef.current, userMsg]);
      const botMsg: ChatMessage = {
        id: `v-${Date.now() + 1}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, botMsg]);
      speak(reply, lang);
    } catch {
      const fallback = 'Sorry, I could not process your request. Please try again.';
      setMessages(prev => [...prev, {
        id: `v-err-${Date.now()}`,
        sender: 'bot',
        text: fallback,
        timestamp: new Date().toLocaleTimeString(),
      }]);
      speak(fallback, lang);
    } finally {
      setProcessing(false);
    }
  }, [speak]);

  const startListening = useCallback(async () => {
    setError(null);
    setTranscript('');
    setDebugInfo([]);
    synthRef.current?.cancel();
    setIsSpeaking(false);

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError('Speech recognition not supported. Please use Chrome or Edge.');
      addDebug('SpeechRecognition API NOT found');
      return;
    }
    addDebug('SpeechRecognition API found');

    try {
      recognitionRef.current?.abort();
    } catch {}

    // Step 1: Explicitly request mic access via getUserMedia first
    try {
      addDebug('requesting mic via getUserMedia...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      addDebug('mic stream acquired, tracks: ' + stream.getTracks().length);
      // Stop the stream tracks — SpeechRecognition will re-acquire its own
      stream.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    } catch (err: any) {
      addDebug('getUserMedia failed: ' + err.name + ' - ' + err.message);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone permission denied. Go to browser settings → Microphone → Allow this site, then refresh.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found on this device.');
      } else {
        setError('Mic error: ' + err.name + ' - ' + err.message);
      }
      return;
    }

    // Step 2: Now start SpeechRecognition
    try {
      const recognition = new SR();
      recognition.lang = selectedLang.code;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        addDebug('recognition listening (lang=' + selectedLang.code + ')');
        setIsListening(true);
      };

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
        const display = finalT || interimT;
        setTranscript(display);
        if (finalT) {
          addDebug('heard: ' + finalT.substring(0, 60));
          processQuery(finalT, selectedLang.code);
        }
      };

      recognition.onerror = (event: any) => {
        addDebug('recognition error: ' + event.error);
        if (event.error === 'not-allowed') {
          setError('Mic blocked. Go to edge://settings/content/microphone → Remove this site from Block list → Refresh page.');
        } else if (event.error === 'no-speech') {
          setError('No speech detected. Tap mic and try again.');
        } else if (event.error === 'network') {
          setError('Network error during speech recognition.');
        } else if (event.error !== 'aborted') {
          setError('Speech error: ' + event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        addDebug('recognition ended');
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      addDebug('calling start()...');
    } catch (e: any) {
      addDebug('start exception: ' + (e.message || e));
      setError('Failed: ' + (e.message || 'unknown'));
      setIsListening(false);
    }
  }, [selectedLang, processQuery, addDebug]);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch {}
    setIsListening(false);
  }, []);

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden max-h-[85vh] flex flex-col">
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <h3 className="font-heading font-bold text-sm">Voice Assistant</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang)}
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
          <p className="text-[10px] text-slate-500 mt-1">Speaking: {selectedLang.name}</p>
        </div>

        <div ref={chatEndRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.length === 0 && !processing && (
            <div className="text-center text-slate-400 text-sm py-6">
              <Mic className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium text-slate-500">Tap the mic and speak</p>
              <p className="text-xs mt-1">Ask about any crop, disease, or fertilizer</p>
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

        {transcript && (
          <div className="px-4 pb-2 shrink-0">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-xs text-emerald-700 italic">
              &quot;{transcript}&quot;
            </div>
          </div>
        )}

        {error && (
          <div className="px-4 pb-2 shrink-0">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-[11px] text-amber-700 flex items-start space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {debugInfo.length > 0 && (
          <div className="px-4 pb-2 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-[9px] text-slate-500 font-mono max-h-20 overflow-y-auto">
              {debugInfo.map((d, i) => <div key={i}>{d}</div>)}
            </div>
          </div>
        )}

        <div className="p-5 flex flex-col items-center space-y-3 shrink-0">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-600 text-xs font-semibold rounded-full cursor-pointer transition-colors flex items-center space-x-1.5"
            >
              <VolumeX className="w-4 h-4" />
              <span>Stop Speaking</span>
            </button>
          )}

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

          <p className="text-[11px] text-slate-400 font-medium">
            {isListening ? 'Listening... speak now' : processing ? 'Processing...' : isSpeaking ? 'Speaking...' : 'Tap to speak'}
          </p>
        </div>
      </div>
    </div>
  );
};
