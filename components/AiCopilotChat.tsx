'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles, Building2, HelpCircle } from 'lucide-react';
import { AI_COPILOT_QA } from '@/lib/properties';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiCopilotChatProps {
  initialPrompt?: string;
}

export function AiCopilotChat({ initialPrompt }: AiCopilotChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am your Real Estate AI Copilot. I can help you analyze property investments, calculate mortgage scenarios, compare neighborhoods, and review market trends. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = "That's a great real estate question. Based on current market data, macroeconomic trends, and comparable property sales in our database, properties with strong walk scores and energy efficiency are appreciating 4.2% faster than the regional average. Let me know if you'd like a detailed valuation report for any specific listing!";
      
      const matched = AI_COPILOT_QA.find(item => item.q.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(item.q.toLowerCase()));
      if (matched) {
        response = matched.a;
      } else if (query.toLowerCase().includes('mortgage') || query.toLowerCase().includes('rate') || query.toLowerCase().includes('emi')) {
        response = "Current home loan interest rates in India average around 8.5% - 9.0%. For example, with a 20% down payment on a ₹1.5 Crore property (loan amount ₹1.2 Crore) at 8.6% interest for 20 years, your monthly EMI (Principal & Interest) would be approximately ₹1,04,913/month.";
      } else if (query.toLowerCase().includes('investment') || query.toLowerCase().includes('roi') || query.toLowerCase().includes('cap rate')) {
        response = "To maximize rental yields in India (typically 2.5% to 4.0% for residential and 7.0% to 9.0% for commercial), focus on premium properties in high-demand IT corridors or commercial districts like Gurgaon, Bengaluru ORR, or Mumbai Western Suburbs. Our platform calculates simulated cap rates and ROI based on localized rent indices.";
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[75vh]">
      <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 p-2.5 rounded-xl shadow-md">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Real Estate AI Copilot</h2>
            <p className="text-xs text-slate-300">Powered by advanced real estate market analytics & valuation models</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-xs text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Copilot Online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 ${
              msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white font-bold text-xs'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={`max-w-xl rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200 space-y-3">
        <div className="flex flex-wrap gap-2">
          {AI_COPILOT_QA.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item.q)}
              className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium px-3.5 py-1.5 rounded-full border border-slate-200 transition-colors text-left"
            >
              {item.q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about properties, mortgages, or market trends..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition-all shadow-md flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
