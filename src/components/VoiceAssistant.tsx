import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Volume2, VolumeX, Globe, Loader2, X, AlertTriangle, Upload, FileAudio, Send } from 'lucide-react';
import { chatWithAIRemote, sendVoiceAudio } from '../lib/api';
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

function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const base64 = dataUrl.split(',')[1] || '';
      resolve({ base64, mimeType: file.type || 'audio/webm' });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const historyRef = useRef<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    return () => { synthRef.current?.cancel(); };
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

  const processTextQuery = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setProcessing(true);
    setError(null);
    addDebug('text query: ' + query.substring(0, 40));

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
      speak(reply, selectedLang.code);
    } catch {
      const fallback = 'Sorry, could not process your request. Please try again.';
      setMessages(prev => [...prev, {
        id: `v-err-${Date.now()}`,
        sender: 'bot',
        text: fallback,
        timestamp: new Date().toLocaleTimeString(),
      }]);
      speak(fallback, selectedLang.code);
    } finally {
      setProcessing(false);
    }
  }, [selectedLang, speak, addDebug]);

  const processAudioFile = useCallback(async (file: File) => {
    setProcessing(true);
    setError(null);
    addDebug('uploading: ' + file.name + ' (' + (file.size / 1024).toFixed(0) + 'KB)');

    const userMsg: ChatMessage = {
      id: `v-${Date.now()}`,
      sender: 'user',
      text: `[Audio: ${file.name}]`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const { base64, mimeType } = await fileToBase64(file);
      addDebug('audio ready, sending to server...');

      const reply = await sendVoiceAudio(base64, mimeType, [...historyRef.current, userMsg], selectedLang.code);
      const botMsg: ChatMessage = {
        id: `v-${Date.now() + 1}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, botMsg]);
      addDebug('response received, speaking...');
      speak(reply, selectedLang.code);
    } catch (err: any) {
      addDebug('audio error: ' + (err.message || 'unknown'));
      const fallback = 'Could not process audio. Please try again or type your question.';
      setMessages(prev => [...prev, {
        id: `v-err-${Date.now()}`,
        sender: 'bot',
        text: fallback,
        timestamp: new Date().toLocaleTimeString(),
      }]);
      speak(fallback, selectedLang.code);
    } finally {
      setProcessing(false);
      setSelectedFile(null);
    }
  }, [selectedLang, speak, addDebug]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      processAudioFile(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [processAudioFile]);

  const handleTextSubmit = useCallback(() => {
    if (textInput.trim() && !processing) {
      processTextQuery(textInput);
      setTextInput('');
    }
  }, [textInput, processing, processTextQuery]);

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <h3 className="font-heading font-bold text-sm">Voice Assistant</h3>
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

        {/* Conversation */}
        <div ref={chatEndRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.length === 0 && !processing && (
            <div className="text-center text-slate-400 text-sm py-6">
              <FileAudio className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium text-slate-500">Upload an audio file</p>
              <p className="text-xs mt-1">Record on your phone, then upload here. Or type below.</p>
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
                <span className="text-xs text-slate-500">
                  {selectedFile ? 'Processing audio...' : 'Thinking...'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 pb-2 shrink-0">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-[11px] text-amber-700 flex items-start space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Debug Log */}
        {debugInfo.length > 0 && (
          <div className="px-4 pb-2 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-[9px] text-slate-500 font-mono max-h-16 overflow-y-auto">
              {debugInfo.map((d, i) => <div key={i}>{d}</div>)}
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Controls */}
        <div className="p-4 space-y-3 shrink-0">
          {/* Text Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder="Type your question..."
              disabled={processing}
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
            />
            <button
              onClick={handleTextSubmit}
              disabled={processing || !textInput.trim()}
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Upload + Stop Speaking */}
          <div className="flex items-center justify-center space-x-3">
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-3 py-2 bg-orange-100 hover:bg-orange-200 text-orange-600 text-[11px] font-semibold rounded-full cursor-pointer transition-colors flex items-center space-x-1"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop</span>
              </button>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={processing}
              className={`flex items-center space-x-2 px-5 py-3 rounded-full shadow-xl transition-all cursor-pointer ${
                processing
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30'
              } text-white`}
            >
              {processing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              <span className="text-xs font-semibold">
                {processing ? 'Processing...' : 'Upload Audio'}
              </span>
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            Record audio on your phone, then upload here. Or type above.
          </p>
        </div>
      </div>
    </div>
  );
};
