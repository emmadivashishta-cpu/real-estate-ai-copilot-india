'use client';

import React from 'react';
import { Home, Building2, Bot, Bookmark, Sparkles, User } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explore' | 'favorites' | 'copilot' | 'calculator';
  setActiveTab: (tab: 'explore' | 'favorites' | 'copilot' | 'calculator') => void;
  favoritesCount: number;
}

export function Navbar({ activeTab, setActiveTab, favoritesCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('explore')}>
          <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-md shadow-emerald-600/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">EstateAI</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded-full ml-1.5 hidden xs:inline-block">Copilot</span>
          </div>
        </div>

        <nav className="flex items-center space-x-1 sm:space-x-1.5">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-2.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'explore'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-2.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 shrink-0 relative ${
              activeTab === 'favorites'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Saved</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] sm:text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('copilot')}
            className={`px-2.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'copilot'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bot className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-2.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'calculator'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">EMI & ROI</span>
          </button>
        </nav>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200 cursor-pointer transition-colors">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
