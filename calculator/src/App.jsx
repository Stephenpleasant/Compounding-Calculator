import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Clock } from 'lucide-react';


const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState('12');
  const [monthlyAddition, setMonthlyAddition] = useState('');
  const [results, setResults] = useState(null);

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
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <Calculator className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Compound Interest Calculator</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Investment Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Initial Principal Amount
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="10000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Compounding Frequency
                </label>
                <select
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={calculateCompoundInterest}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Calculate
              </button>
              <button
                onClick={clearCalculator}
                className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Results</h2>
            
            {results ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Future Value</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(results.futureValue)}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Total Interest Earned</h4>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(results.totalInterest)}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Total Contributions</h4>
                  <p className="text-xl font-bold text-gray-600">
                    {formatCurrency(results.totalContributions)}
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-3">Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Initial Principal:</span>
                      <span className="font-medium">{formatCurrency(results.principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Additions:</span>
                      <span className="font-medium">{formatCurrency(results.monthlyAdditions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Earned:</span>
                      <span className="font-medium">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total Amount:</span>
                      <span>{formatCurrency(results.futureValue)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Growth Multiple</h4>
                  <p className="text-lg text-yellow-700">
                    Your money will grow by{' '}
                    <span className="font-bold">
                      {((results.futureValue / results.principal) - 1).toFixed(2)}x
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
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