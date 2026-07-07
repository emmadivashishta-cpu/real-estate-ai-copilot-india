import React, { useState } from 'react';
import { Property, formatINR, formatINRFull } from '@/lib/properties';
import { X, Bed, Bath, Square, MapPin, Sparkles, TrendingUp, ShieldCheck, Compass, Calculator } from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onAskCopilot: (question: string) => void;
}

export function PropertyModal({ property, onClose, onAskCopilot }: PropertyModalProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(8.6);
  const [loanTerm, setLoanTerm] = useState(20); // 20 years is very common in India

  if (!property) return null;

  const loanAmount = property.price * (1 - downPaymentPct / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="relative h-80 sm:h-96">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-800 p-2.5 rounded-full transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {property.type}
              </span>
              <span className="bg-slate-800/80 backdrop-blur-md text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Cap Rate: {property.capRate}</span>
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-1">{property.title}</h2>
            <p className="text-slate-200 text-sm flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{property.address}</span>
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 p-6 rounded-2xl border border-slate-200 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Listing Price</p>
              <p className="text-3xl font-extrabold text-slate-900">{formatINRFull(property.price)} <span className="text-sm font-normal text-slate-500">({formatINR(property.price)})</span></p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-xl flex items-center space-x-3">
              <div className="bg-emerald-600 text-white p-2 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-emerald-800 font-medium">AI Estimated Value</p>
                <p className="text-lg font-bold text-emerald-900">{formatINRFull(property.aiValuation)} <span className="text-xs font-normal text-emerald-700">({formatINR(property.aiValuation)})</span></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <Bed className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-slate-500">Bedrooms</p>
              <p className="font-bold text-slate-900">{property.bedrooms}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <Bath className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-slate-500">Bathrooms</p>
              <p className="font-bold text-slate-900">{property.bathrooms}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <Square className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-slate-500">Square Footage</p>
              <p className="font-bold text-slate-900">{property.sqft} sqft</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <Compass className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-slate-500">Walk Score</p>
              <p className="font-bold text-slate-900">{property.walkScore} / 100</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">About This Property</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{property.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Key Features & Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>Home Loan EMI Estimator</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Down Payment ({downPaymentPct}%)</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Interest Rate ({interestRate}%)</label>
                <input
                  type="range"
                  min="7.0"
                  max="12.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Loan Tenure</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
                >
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={25}>25 Years</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-sm font-medium text-slate-600">Estimated Monthly EMI (Principal & Interest):</span>
              <span className="text-2xl font-extrabold text-emerald-700">₹{Math.round(monthlyPayment).toLocaleString('en-IN')}/mo</span>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                onClose();
                onAskCopilot(`Tell me more about the investment potential and neighborhood analysis for ${property.title} at ${property.address}.`);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Copilot about this property</span>
            </button>
            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
