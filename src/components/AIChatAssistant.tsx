import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Minus, Sprout, User, RefreshCw, Trash2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithAIRemote } from '../lib/api';

interface AIChatAssistantProps {
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

// Simple markdown-to-JSX renderer
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    // Headers
    if (line.startsWith('### ')) {
      elements.push(<h4 key={idx} className="font-bold text-slate-800 mt-3 mb-1 text-xs">{line.slice(4)}</h4>);
    } else if (line.startsWith('## ')) {
      elements.push(<h3 key={idx} className="font-bold text-slate-800 mt-3 mb-1 text-sm">{line.slice(3)}</h3>);
    } else if (line.startsWith('# ')) {
      elements.push(<h2 key={idx} className="font-bold text-slate-900 mt-3 mb-1">{line.slice(2)}</h2>);
    } else if (line.startsWith('**') && line.endsWith('**') && !line.includes('**:**')) {
      // Bold line (like a section header)
      elements.push(<p key={idx} className="font-bold text-slate-800 mt-2 mb-0.5 text-[11px]">{line.replace(/\*\*/g, '')}</p>);
    } else if (line.startsWith('- **') || line.startsWith('- ')) {
      // Bullet point with optional bold prefix
      const content = line.slice(2);
      const parts = splitBold(content);
      elements.push(
        <div key={idx} className="flex items-start ml-2 mb-0.5">
          <span className="text-emerald-500 mr-1.5 mt-px text-[10px]">•</span>
          <span className="text-[11px] leading-relaxed">{parts}</span>
        </div>
      );
    } else if (line.match(/^\d+\. /)) {
      // Numbered list
      const num = line.match(/^(\d+)\. /)?.[1];
      const content = line.replace(/^\d+\. /, '');
      const parts = splitBold(content);
      elements.push(
        <div key={idx} className="flex items-start ml-2 mb-0.5">
          <span className="text-emerald-600 font-bold mr-1.5 text-[10px]">{num}.</span>
          <span className="text-[11px] leading-relaxed">{parts}</span>
        </div>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={idx} className="h-1.5" />);
    } else {
      // Regular paragraph with inline bold
      const parts = splitBold(line);
      elements.push(<p key={idx} className="text-[11px] leading-relaxed mb-0.5">{parts}</p>);
    }
  });

  return <>{elements}</>;
}

function splitBold(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={match.index} className="font-bold text-slate-800">{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello! I'm **CropVision AI**, your expert smart farming assistant. 🌱

Ask me anything about:
- 🌾 **Crops** — growing guides, varieties, seasons
- 🦠 **Diseases** — identification, treatment, prevention
- 🧪 **Fertilizers** — NPK, micronutrients, organic options
- 🐛 **Pests** — IPM, biological control, sprays
- 💧 **Irrigation** — water management, drip systems
- 🌿 **Organic farming** — natural alternatives
- 📅 **Seasonal guides** — what to plant and when

Try asking:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Tell me about rice farming',
        'How to treat tomato early blight?',
        'Best fertilizer for wheat?',
        'Organic pest control for cotton',
        'When to sow potato?',
        'How to start organic farming?'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setIsOpen(true);
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const clearChat = () => {
    setMessages([{
      id: 'welcome-' + Date.now(),
      sender: 'bot',
      text: `Chat cleared! I'm **CropVision AI** — ready to help with any farming question. What would you like to know?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Tell me about rice farming',
        'How to treat tomato early blight?',
        'Best fertilizer for wheat?',
        'Organic pest control for cotton'
      ]
    }]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    const addBotReply = (replyText: string, delayMs: number) => {
      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, delayMs);
    };

    try {
      const replyText = await chatWithAIRemote(text, updatedMessages);
      addBotReply(replyText, 400);
    } catch {
      addBotReply('Sorry, I encountered an error. Please try again.', 400);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 100); }}
          className="relative group p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2.5 cursor-pointer"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
          <div className="w-6 h-6 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white animate-bounce" />
          </div>
          <span className="font-heading font-extrabold text-xs hidden sm:inline-block">
            Ask CropVision AI
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 zoom-in-95 duration-200 transition-all ${
          isExpanded ? 'w-[95vw] h-[90vh] sm:w-[680px] sm:h-[85vh]' : 'w-[92vw] h-[520px] sm:w-[400px] sm:h-[580px]'
        }`}>
          
          {/* Header Bar */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-heading text-sm font-bold">CropVision AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-emerald-200 font-medium">Smart Farming Assistant • {messages.length - 1} messages</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="New Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer hidden sm:block"
                title={isExpanded ? 'Shrink' : 'Expand'}
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex items-end space-x-2 max-w-[92%] ${isExpanded ? 'max-w-[85%]' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shrink-0 mb-1 shadow-sm">
                      <Sprout className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`px-3.5 py-2.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-sm shadow-sm font-medium text-[11px]'
                        : 'bg-white text-slate-700 rounded-bl-sm border border-slate-200 shadow-xs'
                    }`}
                  >
                    {msg.sender === 'bot' ? renderMarkdown(msg.text) : <p className="text-[11px] leading-relaxed">{msg.text}</p>}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mb-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-slate-400 font-medium mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Suggestion Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 space-y-1.5 w-full">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Try asking:</p>
                    <div className="flex flex-col space-y-1">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(sug)}
                          className="text-left p-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-[11px] font-medium transition-all cursor-pointer flex items-center space-x-1.5"
                        >
                          <Sparkles className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{sug}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl w-32 border border-slate-200 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about crops, diseases, fertilizers..."
                className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
