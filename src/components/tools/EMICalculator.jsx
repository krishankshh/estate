import React from 'react';
import { useEMICalculator } from '../../hooks/useEMICalculator';

/**
 * Interactive EMI Calculator Widget
 * Calculates monthly EMI, total interest, and payment breakdown
 */
const EMICalculator = ({ className = '' }) => {
  const {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    tenure,
    setTenure,
    calculations
  } = useEMICalculator();

  // Format currency in Indian format
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Download calculation as image (simple text version)
  const handleDownload = () => {
    const content = `
EMI Calculation Summary
======================

Loan Amount: ${formatINR(loanAmount)}
Interest Rate: ${interestRate}%
Tenure: ${tenure} years

Monthly EMI: ${formatINR(calculations.monthlyEMI)}
Total Interest: ${formatINR(calculations.totalInterest)}
Total Amount: ${formatINR(calculations.totalAmount)}

Principal: ${calculations.principalPercentage.toFixed(1)}%
Interest: ${calculations.interestPercentage.toFixed(1)}%
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'emi-calculation.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">EMI Calculator</h3>
        <p className="text-neutral-600">Calculate your monthly installment</p>
      </div>

      {/* Loan Amount Slider */}
      <div className="mb-6">
        <label className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-700">Loan Amount</span>
          <span className="text-lg font-bold text-accent-500">{formatINR(loanAmount)}</span>
        </label>
        <input
          type="range"
          min="1000000"
          max="100000000"
          step="100000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>₹10L</span>
          <span>₹10Cr</span>
        </div>
      </div>

      {/* Interest Rate Slider */}
      <div className="mb-6">
        <label className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-700">Interest Rate</span>
          <span className="text-lg font-bold text-accent-500">{interestRate}%</span>
        </label>
        <input
          type="range"
          min="6"
          max="15"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>6%</span>
          <span>15%</span>
        </div>
      </div>

      {/* Tenure Selector */}
      <div className="mb-6">
        <label className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-700">Loan Tenure</span>
          <span className="text-lg font-bold text-accent-500">{tenure} years</span>
        </label>
        <div className="grid grid-cols-6 gap-2">
          {[5, 10, 15, 20, 25, 30].map((year) => (
            <button
              key={year}
              onClick={() => setTenure(year)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                tenure === year
                  ? 'bg-accent-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {year}Y
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6 mb-6">
        <div className="text-center mb-4">
          <p className="text-sm text-neutral-600 mb-1">Monthly EMI</p>
          <p className="text-4xl font-bold text-accent-600">
            {formatINR(calculations.monthlyEMI)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xs text-neutral-600 mb-1">Principal Amount</p>
            <p className="text-lg font-semibold text-neutral-800">
              {formatINR(calculations.principalAmount)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-neutral-600 mb-1">Total Interest</p>
            <p className="text-lg font-semibold text-neutral-800">
              {formatINR(calculations.totalInterest)}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-accent-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-600">Total Payment</span>
            <span className="text-xl font-bold text-neutral-900">
              {formatINR(calculations.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="mb-6">
        <p className="text-sm font-medium text-neutral-700 mb-3">Payment Breakdown</p>
        <div className="h-8 flex rounded-lg overflow-hidden">
          <div
            className="bg-accent-500 flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${calculations.principalPercentage}%` }}
          >
            {calculations.principalPercentage.toFixed(1)}%
          </div>
          <div
            className="bg-red-400 flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${calculations.interestPercentage}%` }}
          >
            {calculations.interestPercentage.toFixed(1)}%
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-accent-500 rounded"></span>
            Principal
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-400 rounded"></span>
            Interest
          </span>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="w-full btn-secondary flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Calculation
      </button>
    </div>
  );
};

export default EMICalculator;
