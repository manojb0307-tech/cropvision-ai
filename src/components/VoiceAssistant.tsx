import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Globe, Loader2, X, Send, MessageCircle } from 'lucide-react';
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
  const [textInput, setTextInput] = useState('');
  const [speechSupported, setSpeechSupported] = useState<boolean | null>(null);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [history, processing, isOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechSupported(!!SR);
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      synthRef.current?.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const plainText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#{1,6}\s/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
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
      const fallback = 'Sorry, I could not process your request. Please try again.';
      setResponse(fallback);
      speak(fallback);
    } finally {
      setProcessing(false);
    }
  }, [history, speak]);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Please type your question below.');
      return;
    }

    synthRef.current?.cancel();
    setIsSpeaking(false);

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
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone in browser settings, or type your question below.');
      } else if (event.error === 'no-speech') {
        setError('No speech detected. Please try again or type your question.');
      } else if (event.error !== 'aborted') {
        setError(`Recognition error: ${event.error}. You can type your question instead.`);
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
    setError(null);
  }, [selectedLang, processQuery]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  const handleTextSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || processing) return;
    const text = textInput.trim();
    setTextInput('');
    processQuery(text);
  }, [textInput, processing, processQuery]);

  const quickQuestions = [
    'How to treat rice blast disease?',
    'What fertilizer for wheat?',
    'Best organic pest control?',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <h3 className="font-heading font-bold text-sm">Voice Assistant</h3>
            {speechSupported === false && (
              <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full">Text Mode</span>
            )}
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Selector */}
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

        {/* Conversation Area */}
        <div ref={chatEndRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {history.length === 0 && !processing && (
            <div className="text-center text-slate-400 text-sm py-4">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="font-medium">Ask about any crop disease</p>
              <p className="text-xs mt-1">Use the microphone or type below</p>
              <div className="mt-3 space-y-1.5">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setTextInput(q); processQuery(q); }}
                    className="block w-full text-left px-3 py-2 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {history.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-sm'
                  : 'bg-slate-100 text-slate-800 rounded-bl-sm'
              }`}>
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
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

        {/* Transcript Display */}
        {transcript && (
          <div className="px-4 pb-2 shrink-0">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-xs text-emerald-700">
              {transcript}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="px-4 pb-2 shrink-0">
            <div className="bg-red-50 border border-red-200 rounded-xl p-2 text-xs text-red-600">
              {error}
            </div>
          </div>
        )}

        {/* Text Input */}
        <form onSubmit={handleTextSubmit} className="px-4 pb-2 shrink-0">
          <div className="flex items-center space-x-2 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2">
            <input
              ref={inputRef}
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your question..."
              disabled={processing}
              className="flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || processing}
              className="p-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-lg cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Mic Controls */}
        <div className="p-4 flex items-center justify-center space-x-4 shrink-0 border-t border-slate-100">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="p-3 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full cursor-pointer transition-colors"
            >
              <VolumeX className="w-5 h-5" />
            </button>
          )}

          {speechSupported !== false && (
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
          )}

          <p className="text-[10px] text-slate-400 text-center">
            {isListening ? 'Listening...' : speechSupported === false ? 'Type above' : 'Tap mic or type'}
          </p>
        </div>
      </div>
    </div>
  );
};
