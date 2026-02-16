'use client';

import { useState } from 'react';

interface MonthlyBreakdown {
  month: number;
  contribution: number;
  interest: number;
  balance: number;
}

interface CalculationResult {
  monthsToGoal: number;
  totalContributed: number;
  totalInterest: number;
  finalBalance: number;
  breakdown: MonthlyBreakdown[];
}

export default function SavingsGoalCalculator() {
  const [targetAmount, setTargetAmount] = useState<string>('10000');
  const [currentSavings, setCurrentSavings] = useState<string>('1000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [annualRate, setAnnualRate] = useState<string>('5');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const formatCurrency = (value: number): string => {
    return '$' + value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const validate = (): boolean => {
    const target = parseFloat(targetAmount);
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualRate);

    if (isNaN(target) || isNaN(current) || isNaN(monthly) || isNaN(rate)) {
      setError('Please fill in all fields with valid numbers.');
      return false;
    }

    if (target <= 0) {
      setError('Target amount must be greater than zero.');
      return false;
    }

    if (current < 0) {
      setError('Current savings cannot be negative.');
      return false;
    }

    if (monthly <= 0) {
      setError('Monthly contribution must be greater than zero.');
      return false;
    }

    if (rate < 0 || rate > 50) {
      setError('Annual interest rate must be between 0% and 50%.');
      return false;
    }

    if (current >= target) {
      setError('You have already reached your savings goal!');
      return false;
    }

    return true;
  };

  const calculate = () => {
    setError('');
    setResult(null);

    if (!validate()) return;

    const target = parseFloat(targetAmount);
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualRate);

    const monthlyRate = rate / 100 / 12;
    const breakdown: MonthlyBreakdown[] = [];
    let balance = current;
    let totalContributed = current;
    let totalInterest = 0;
    let month = 0;
    const maxMonths = 1200; // 100-year cap to prevent infinite loops

    while (balance < target && month < maxMonths) {
      month++;
      const interest = balance * monthlyRate;
      balance += monthly + interest;
      totalContributed += monthly;
      totalInterest += interest;

      breakdown.push({
        month,
        contribution: totalContributed,
        interest: totalInterest,
        balance: Math.min(balance, target + (balance - target)),
      });
    }

    if (month >= maxMonths) {
      setError('It would take over 100 years to reach this goal. Consider increasing your monthly contribution or adjusting your target.');
      return;
    }

    setResult({
      monthsToGoal: month,
      totalContributed,
      totalInterest,
      finalBalance: balance,
      breakdown,
    });
  };

  const getDisplayBreakdown = (): MonthlyBreakdown[] => {
    if (!result) return [];

    const { breakdown } = result;

    if (breakdown.length <= 24) {
      return breakdown;
    }

    // Show first 12 months + last 6 months
    const firstTwelve = breakdown.slice(0, 12);
    const lastSix = breakdown.slice(-6);
    return [...firstTwelve, ...lastSix];
  };

  const shouldShowEllipsis = (): boolean => {
    return !!result && result.breakdown.length > 24;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Input Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-stone-900 mb-6">
          Enter Your Savings Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Target Amount */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-stone-700">
              Target Amount ($)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="e.g. 10000"
              className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
            />
          </div>

          {/* Current Savings */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-stone-700">
              Current Savings ($)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
            />
          </div>

          {/* Monthly Contribution */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-stone-700">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="e.g. 500"
              className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
            />
          </div>

          {/* Annual Interest Rate */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-stone-700">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="e.g. 5"
              className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={calculate}
          className="mt-6 w-full py-4 rounded-xl font-bold text-white text-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-colors shadow-md cursor-pointer"
        >
          Calculate Savings Plan
        </button>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 text-center">
              <p className="text-sm font-medium text-stone-500 mb-1">Time to Goal</p>
              <p className="text-3xl font-bold text-emerald-600">
                {result.monthsToGoal}
              </p>
              <p className="text-sm text-stone-500 mt-1">
                {result.monthsToGoal === 1 ? 'month' : 'months'}
                {result.monthsToGoal >= 12 && (
                  <span className="text-stone-400">
                    {' '}({Math.floor(result.monthsToGoal / 12)}y {result.monthsToGoal % 12}m)
                  </span>
                )}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 text-center">
              <p className="text-sm font-medium text-stone-500 mb-1">Total Contributed</p>
              <p className="text-2xl font-bold text-stone-900">
                {formatCurrency(result.totalContributed)}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                including initial savings
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 text-center">
              <p className="text-sm font-medium text-stone-500 mb-1">Interest Earned</p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatCurrency(result.totalInterest)}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                compound interest
              </p>
            </div>
          </div>

          {/* Final Balance */}
          <div className="bg-emerald-600 rounded-2xl shadow-lg p-6 text-center text-white">
            <p className="text-sm font-medium text-emerald-100 mb-1">
              Final Balance at Month {result.monthsToGoal}
            </p>
            <p className="text-4xl sm:text-5xl font-bold">
              {formatCurrency(result.finalBalance)}
            </p>
            <p className="text-sm text-emerald-200 mt-2">
              Goal of {formatCurrency(parseFloat(targetAmount))} reached
            </p>
          </div>

          {/* Month-by-Month Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-stone-100">
              <h4 className="text-lg font-bold text-stone-900">
                Month-by-Month Breakdown
              </h4>
              <p className="text-sm text-stone-500 mt-1">
                Track your progress toward your savings goal
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-100 text-stone-700">
                    <th className="px-4 py-3 text-left font-semibold">Month</th>
                    <th className="px-4 py-3 text-right font-semibold">Total Contributed</th>
                    <th className="px-4 py-3 text-right font-semibold">Interest Earned</th>
                    <th className="px-4 py-3 text-right font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Starting row */}
                  <tr className="border-b border-stone-100 bg-stone-50">
                    <td className="px-4 py-3 font-medium text-stone-700">Start</td>
                    <td className="px-4 py-3 text-right text-stone-700">
                      {formatCurrency(parseFloat(currentSavings))}
                    </td>
                    <td className="px-4 py-3 text-right text-stone-400">
                      {formatCurrency(0)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-stone-900">
                      {formatCurrency(parseFloat(currentSavings))}
                    </td>
                  </tr>

                  {getDisplayBreakdown().map((row, index) => {
                    const displayRows = getDisplayBreakdown();
                    const isEllipsisBoundary =
                      shouldShowEllipsis() && index === 12;

                    return (
                      <>
                        {isEllipsisBoundary && (
                          <tr key="ellipsis" className="border-b border-stone-100">
                            <td
                              colSpan={4}
                              className="px-4 py-3 text-center text-stone-400 font-medium bg-stone-50"
                            >
                              ... months {13} to {result.breakdown.length - 6} ...
                            </td>
                          </tr>
                        )}
                        <tr
                          key={row.month}
                          className={`border-b border-stone-100 transition-colors hover:bg-stone-50 ${
                            row.month === result.monthsToGoal
                              ? 'bg-emerald-50'
                              : ''
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-stone-700">
                            {row.month}
                            {row.month === result.monthsToGoal && (
                              <span className="ml-2 inline-block text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                Goal
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right text-stone-700">
                            {formatCurrency(row.contribution)}
                          </td>
                          <td className="px-4 py-3 text-right text-emerald-600">
                            {formatCurrency(row.interest)}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-stone-900">
                            {formatCurrency(row.balance)}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 text-center">
              <p className="text-xs text-stone-400">
                Calculations assume monthly compounding. Actual results may vary based on interest compounding frequency and market conditions.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
