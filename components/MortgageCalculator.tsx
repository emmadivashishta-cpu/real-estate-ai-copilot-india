import React, { useState } from 'react';
import { formatINR, formatINRFull } from '@/lib/properties';
import { Calculator, TrendingUp, Sparkles } from 'lucide-react';

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(15000000); // 1.5 Crores
  const [downPayment, setDownPayment] = useState(3000000); // 30 Lakhs
  const [interestRate, setInterestRate] = useState(8.6);
  const [loanTerm, setLoanTerm] = useState(20);
  const [propertyTaxRate, setPropertyTaxRate] = useState(0.5);
  const [insurance, setInsurance] = useState(12000); // Annual premium in ₹
  const [monthlyRentEst, setMonthlyRentEst] = useState(45000); // Monthly rent in ₹

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const principalAndInterest =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = insurance / 12;
  const totalMonthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance;

  const annualIncome = monthlyRentEst * 12;
  const annualExpenses = totalMonthlyPayment * 12;
  const netOperatingIncome = annualIncome - annualExpenses;
  const cashOnCashROI = ((netOperatingIncome) / downPayment) * 100;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="flex items-center space-x-3 border-b border-slate-200 pb-6">
        <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-md">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Advanced EMI & ROI Calculator</h2>
          <p className="text-slate-600 text-sm">Analyze monthly EMI payments, cash flow, and investment yield for any Indian property</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Home Price: {formatINRFull(homePrice)} ({formatINR(homePrice)})</label>
            <input
              type="range"
              min="1000000"
              max="100000000"
              step="500000"
              value={homePrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                setHomePrice(val);
                setDownPayment(Math.round(val * 0.2));
              }}
              className="w-full accent-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Down Payment: {formatINRFull(downPayment)} ({Math.round((downPayment/homePrice)*100)}%)</label>
            <input
              type="range"
              min="100000"
              max={homePrice * 0.5}
              step="50000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Tenure</label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Property Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Est. Monthly Rental (₹)</label>
              <input
                type="number"
                step="1000"
                value={monthlyRentEst}
                onChange={(e) => setMonthlyRentEst(Number(e.target.value))}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Financial Breakdown</span>
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Principal & Interest EMI</span>
                <span className="font-bold">{formatINRFull(Math.round(principalAndInterest))}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Property Taxes</span>
                <span className="font-bold">{formatINRFull(Math.round(monthlyTax))}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Home Insurance</span>
                <span className="font-bold">{formatINRFull(Math.round(monthlyInsurance))}</span>
              </div>
              <div className="flex justify-between py-3 text-lg font-extrabold text-emerald-400">
                <span>Total Monthly Outflow</span>
                <span>{formatINRFull(Math.round(totalMonthlyPayment))}/mo</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 bg-slate-800/50 p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Estimated Cash-on-Cash ROI</span>
              <span className={`text-xl font-extrabold ${cashOnCashROI >= 5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {cashOnCashROI.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {cashOnCashROI >= 3 
                ? 'Strong rental yield relative to standard Indian metropolitan averages.' 
                : 'Conservative return profile. Capital appreciation is likely the primary value driver.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
