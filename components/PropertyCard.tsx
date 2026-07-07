import React from 'react';
import { Property, formatINR } from '@/lib/properties';
import { Bed, Bath, Square, MapPin, Bookmark, Sparkles, TrendingUp } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function PropertyCard({ property, onSelect, isFavorite, onToggleFavorite }: PropertyCardProps) {
  const isUndervalued = property.aiValuation > property.price;
  const diffPercent = Math.abs(Math.round(((property.aiValuation - property.price) / property.price) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="relative h-60 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(property)}>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
            {property.type}
          </span>
          {isUndervalued && (
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
              <TrendingUp className="w-3 h-3" />
              <span>{diffPercent}% Below AI Value</span>
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
          <div>
            <p className="text-2xl font-bold tracking-tight">{formatINR(property.price)}</p>
            <p className="text-xs text-slate-200 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{property.address}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg mb-1 group-hover:text-emerald-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-slate-600 text-xs line-clamp-2 mb-4">
            {property.description}
          </p>

          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-600 text-xs font-medium">
            <div className="flex items-center space-x-1.5">
              <Bed className="w-4 h-4 text-emerald-600" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Bath className="w-4 h-4 text-emerald-600" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Square className="w-4 h-4 text-emerald-600" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold">AI Est: {formatINR(property.aiValuation)}</span>
          </div>

          <button
            onClick={() => onSelect(property)}
            className="text-xs font-semibold text-slate-900 hover:text-emerald-600 transition-colors bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg"
          >
            View Insights →
          </button>
        </div>
      </div>
    </div>
  );
}
