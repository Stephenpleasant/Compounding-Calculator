import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Clock } from 'lucide-react';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState('12');
  const [monthlyAddition, setMonthlyAddition] = useState('');
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('NGN');

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFrequency);
    const PMT = parseFloat(monthlyAddition) || 0;

    if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || r <= 0 || t <= 0) {
      alert('Please enter valid positive numbers for principal, rate, and time.');
      return;
    }

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const compoundAmount = P * Math.pow(1 + r / n, n * t);
    
    // Future value of monthly additions (annuity)
    let futureValueOfAdditions = 0;
    if (PMT > 0) {
      const monthlyRate = r / 12;
      const totalMonths = t * 12;
      if (monthlyRate > 0) {
        futureValueOfAdditions = PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      } else {
        futureValueOfAdditions = PMT * totalMonths;
      }
    }

    const totalAmount = compoundAmount + futureValueOfAdditions;
    const totalInterest = totalAmount - P - (PMT * t * 12);
    const totalContributions = P + (PMT * t * 12);

    setResults({
      futureValue: totalAmount,
      totalInterest: totalInterest,
      totalContributions: totalContributions,
      principal: P,
      monthlyAdditions: PMT * t * 12
    });
  };

  const clearCalculator = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompoundFrequency('12');
    setMonthlyAddition('');
    setResults(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
          <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2 sm:mb-3" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 text-center">INVESTING CLUB</h1>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-600 text-center">Compound Interest Calculator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Investment Details</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Initial Principal Amount
                </label>
                <div className="flex">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm font-medium min-w-[80px]"
                  >
                    <option value="NGN">₦ NGN</option>
                    <option value="USD">$ USD</option>
                  </select>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="10000"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-l-0 min-w-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="5"
                  step="0.1"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="10"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Compounding Frequency
                </label>
                <select
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">Annually</option>
                  <option value="2">Semi-annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                  <option value="52">Weekly</option>
                  <option value="365">Daily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Monthly Addition (Optional)
                </label>
                <input
                  type="number"
                  value={monthlyAddition}
                  onChange={(e) => setMonthlyAddition(e.target.value)}
                  placeholder="100"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={calculateCompoundInterest}
                className="flex-1 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
              >
                Calculate
              </button>
              <button
                onClick={clearCalculator}
                className="flex-1 bg-gray-500 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm sm:text-base"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Results</h2>
            
            {results ? (
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2">Future Value</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 break-words">
                    {formatCurrency(results.futureValue)}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Total Interest Earned</h4>
                  <p className="text-lg sm:text-xl font-bold text-blue-600 break-words">
                    {formatCurrency(results.totalInterest)}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Total Contributions</h4>
                  <p className="text-lg sm:text-xl font-bold text-gray-600 break-words">
                    {formatCurrency(results.totalContributions)}
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-purple-800 mb-3 text-sm sm:text-base">Breakdown</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span>Initial Principal:</span>
                      <span className="font-medium break-words text-right">{formatCurrency(results.principal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Additions:</span>
                      <span className="font-medium break-words text-right">{formatCurrency(results.monthlyAdditions)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Interest Earned:</span>
                      <span className="font-medium break-words text-right">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Amount:</span>
                      <span className="break-words text-right">{formatCurrency(results.futureValue)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">Growth Multiple</h4>
                  <p className="text-sm sm:text-lg text-yellow-700">
                    Your money will grow by{' '}
                    <span className="font-bold">
                      {((results.futureValue / results.principal) - 1).toFixed(2)}x
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 text-center">
                <Calculator className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-500 text-sm sm:text-base">
                  Enter your investment details and click "Calculate" to see your compound interest results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;