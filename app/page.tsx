"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyModal } from '@/components/PropertyModal';
import { AiCopilotChat } from '@/components/AiCopilotChat';
import { MortgageCalculator } from '@/components/MortgageCalculator';
import { PROPERTIES, Property } from '@/lib/properties';
import { Search, Sparkles, Building2, ArrowUpDown, Bookmark } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'explore' | 'favorites' | 'copilot' | 'calculator'>('explore');
  const [favorites, setFavorites] = useState<string[]>(['prop-1', 'prop-3']);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [copilotPrompt, setCopilotPrompt] = useState<string>('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'value'>('value');

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAskCopilot = (question: string) => {
    setCopilotPrompt(question);
    setActiveTab('copilot');
  };

  const filteredProperties = PROPERTIES.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prop.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || prop.type === typeFilter;
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'value') return (b.aiValuation - b.price) - (a.aiValuation - a.price);
    return 0;
  });

  const favoriteProperties = PROPERTIES.filter(prop => favorites.includes(prop.id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} favoritesCount={favorites.length} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'explore' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI-Powered Real Estate Intelligence</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Find your next dream property with AI precision.
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Explore curated listings equipped with instant AI valuations, cap rate analysis, and expert copilot insights.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by city, neighborhood, or property title..."
                    className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 backdrop-blur-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-wrap gap-2">
                {['All', 'House', 'Condo', 'Townhouse', 'Penthouse'].map(type => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      typeFilter === type
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <ArrowUpDown className="w-4 h-4 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  <option value="value">Highest AI Value Margin</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={setSelectedProperty}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No properties found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your search query or property filters.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Saved Properties</h1>
              <p className="text-slate-600 text-sm">Review your shortlisted properties and compare AI valuations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={setSelectedProperty}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {favoriteProperties.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                <Bookmark className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No saved properties yet</h3>
                <p className="text-slate-500 text-sm mt-1">Click the bookmark icon on any property card to save it here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'copilot' && (
          <AiCopilotChat initialPrompt={copilotPrompt} />
        )}

        {activeTab === 'calculator' && (
          <MortgageCalculator />
        )}
      </main>

      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onAskCopilot={handleAskCopilot}
      />
    </div>
  );
}
