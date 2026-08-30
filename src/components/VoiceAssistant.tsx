import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Globe, Loader2, X } from 'lucide-react';
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

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [processing, setProcessing] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      synthRef.current?.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang.code;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  }, [selectedLang]);

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
    setHistory(prev => [...prev, userMsg]);

    try {
      const reply = await chatWithAIRemote(query, [...history, userMsg]);
      setResponse(reply);
      speak(reply);
      const botMsg: ChatMessage = {
        id: `v-${Date.now() + 1}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistory(prev => [...prev, botMsg]);
    } catch {
      const fallback = 'I apologize, I could not process your request. Please try again.';
      setResponse(fallback);
      speak(fallback);
    } finally {
      setProcessing(false);
    }
  }, [history, speak]);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang.code;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript || interimTranscript);
      if (finalTranscript) {
        processQuery(finalTranscript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error !== 'no-speech') {
        setError(`Recognition error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setTranscript('');
    setResponse('');
  }, [selectedLang, processQuery]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <h3 className="font-heading font-bold text-sm">Voice Assistant</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Selector */}
        <div className="p-3 border-b border-slate-100 bg-slate-50">
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

        {/* Conversation Area */}
        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {history.length === 0 && !processing && (
            <div className="text-center text-slate-400 text-sm py-8">
              <Mic className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Tap the microphone and ask about any crop disease</p>
              <p className="text-xs mt-1">e.g., "What is rice blast?"</p>
            </div>
          )}

          {history.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-sm'
                  : 'bg-slate-100 text-slate-800 rounded-bl-sm'
              }`}>
                {msg.text}
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

        {/* Transcript Display */}
        {transcript && (
          <div className="px-4 pb-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-xs text-emerald-700">
              {transcript}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="px-4 pb-2">
            <div className="bg-red-50 border border-red-200 rounded-xl p-2 text-xs text-red-600">
              {error}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 flex items-center justify-center space-x-4">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="p-3 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full cursor-pointer"
            >
              <VolumeX className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={isListening ? stopListening : startListening}
            disabled={processing}
            className={`p-5 rounded-full shadow-lg transition-all cursor-pointer ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>

          <div className="text-center">
            <p className="text-[10px] text-slate-400 mt-2">
              {isListening ? 'Listening... Tap to stop' : 'Tap to speak'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
