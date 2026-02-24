'use client';

import { useState, useMemo, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ExpenseItem {
  id: string;
  label: string;
  amount: string;
  suggestedPct: number;
}

interface CategoryGroup {
  key: 'needs' | 'wants' | 'savings';
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  barColor: string;
  suggestedPct: number;
  items: ExpenseItem[];
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const defaultCategories = (): CategoryGroup[] => [
  {
    key: 'needs',
    title: 'Needs (50%)',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    barColor: 'bg-blue-500',
    suggestedPct: 50,
    items: [
      { id: 'housing', label: 'Housing (Rent / Mortgage)', amount: '', suggestedPct: 25 },
      { id: 'utilities', label: 'Utilities', amount: '', suggestedPct: 5 },
      { id: 'groceries', label: 'Groceries', amount: '', suggestedPct: 10 },
      { id: 'transportation', label: 'Transportation', amount: '', suggestedPct: 5 },
      { id: 'insurance', label: 'Insurance', amount: '', suggestedPct: 3 },
      { id: 'min-debt', label: 'Minimum Debt Payments', amount: '', suggestedPct: 2 },
    ],
  },
  {
    key: 'wants',
    title: 'Wants (30%)',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    barColor: 'bg-amber-500',
    suggestedPct: 30,
    items: [
      { id: 'dining', label: 'Dining Out', amount: '', suggestedPct: 8 },
      { id: 'entertainment', label: 'Entertainment', amount: '', suggestedPct: 5 },
      { id: 'shopping', label: 'Shopping', amount: '', suggestedPct: 7 },
      { id: 'subscriptions', label: 'Subscriptions', amount: '', suggestedPct: 5 },
      { id: 'hobbies', label: 'Hobbies', amount: '', suggestedPct: 5 },
    ],
  },
  {
    key: 'savings',
    title: 'Savings & Debt Payoff (20%)',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    barColor: 'bg-emerald-500',
    suggestedPct: 20,
    items: [
      { id: 'emergency', label: 'Emergency Fund', amount: '', suggestedPct: 5 },
      { id: 'retirement', label: 'Retirement (401k / IRA)', amount: '', suggestedPct: 7 },
      { id: 'investments', label: 'Investments', amount: '', suggestedPct: 4 },
      { id: 'debt-payoff', label: 'Extra Debt Payoff', amount: '', suggestedPct: 4 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmt = (n: number): string =>
  '$' +
  n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const pct = (part: number, total: number): number =>
  total > 0 ? Math.round((part / total) * 100) : 0;

const pctExact = (part: number, total: number): number =>
  total > 0 ? (part / total) * 100 : 0;

// ---------------------------------------------------------------------------
// Tip generator
// ---------------------------------------------------------------------------

interface Tip {
  message: string;
  type: 'warning' | 'success' | 'info';
}

function generateTips(
  income: number,
  categories: CategoryGroup[],
  needsTotal: number,
  wantsTotal: number,
  savingsTotal: number,
): Tip[] {
  if (income <= 0) return [];

  const tips: Tip[] = [];
  const needsPct = pctExact(needsTotal, income);
  const wantsPct = pctExact(wantsTotal, income);
  const savingsPct = pctExact(savingsTotal, income);
  const totalExpenses = needsTotal + wantsTotal + savingsTotal;

  // Overspending
  if (totalExpenses > income) {
    tips.push({
      message: `You are spending ${fmt(totalExpenses - income)} more than you earn. Review your expenses to avoid going into debt.`,
      type: 'warning',
    });
  }

  // Needs check
  if (needsPct > 55) {
    tips.push({
      message: `Your needs are ${needsPct.toFixed(0)}% of income. The recommended target is 50% or less. Look for ways to reduce fixed costs.`,
      type: 'warning',
    });
  } else if (needsPct <= 50 && needsPct > 0) {
    tips.push({
      message: `Great job! Your needs are at ${needsPct.toFixed(0)}% of income, within the recommended 50%.`,
      type: 'success',
    });
  }

  // Housing check
  const housing = categories[0].items.find((i) => i.id === 'housing');
  if (housing) {
    const housingAmt = parseFloat(housing.amount) || 0;
    const housingPct = pctExact(housingAmt, income);
    if (housingPct > 30) {
      tips.push({
        message: `Your housing is ${housingPct.toFixed(0)}% of income - try to keep it under 30% for better financial flexibility.`,
        type: 'warning',
      });
    }
  }

  // Wants check
  if (wantsPct > 35) {
    tips.push({
      message: `Wants spending is ${wantsPct.toFixed(0)}% of income. Consider trimming discretionary spending to stay closer to 30%.`,
      type: 'warning',
    });
  } else if (wantsPct <= 30 && wantsPct > 0) {
    tips.push({
      message: `Your wants are at ${wantsPct.toFixed(0)}% - nicely within the 30% guideline.`,
      type: 'success',
    });
  }

  // Savings check
  if (savingsPct < 10 && savingsTotal > 0) {
    tips.push({
      message: `Your savings rate is only ${savingsPct.toFixed(0)}%. Aim for at least 20% to build long-term wealth.`,
      type: 'warning',
    });
  } else if (savingsPct >= 20) {
    tips.push({
      message: `Excellent! You are saving ${savingsPct.toFixed(0)}% of your income, meeting or exceeding the recommended 20%.`,
      type: 'success',
    });
  } else if (savingsPct >= 10) {
    tips.push({
      message: `You are saving ${savingsPct.toFixed(0)}% of income. Try to increase this to 20% over time for a stronger safety net.`,
      type: 'info',
    });
  }

  // Emergency fund check
  const emergency = categories[2].items.find((i) => i.id === 'emergency');
  if (emergency) {
    const emergencyAmt = parseFloat(emergency.amount) || 0;
    if (emergencyAmt === 0 && savingsTotal > 0) {
      tips.push({
        message: `Consider allocating some savings to an emergency fund. Experts recommend 3-6 months of expenses saved.`,
        type: 'info',
      });
    }
  }

  // Under budget congratulations
  if (totalExpenses > 0 && totalExpenses < income * 0.9) {
    tips.push({
      message: `You have ${fmt(income - totalExpenses)} unallocated. Consider directing it toward savings or debt payoff.`,
      type: 'info',
    });
  }

  return tips;
}

// ---------------------------------------------------------------------------
// Donut Chart (pure CSS conic-gradient)
// ---------------------------------------------------------------------------

function DonutChart({
  needsPct,
  wantsPct,
  savingsPct,
  unallocatedPct,
}: {
  needsPct: number;
  wantsPct: number;
  savingsPct: number;
  unallocatedPct: number;
}) {
  const needsEnd = needsPct;
  const wantsEnd = needsEnd + wantsPct;
  const savingsEnd = wantsEnd + savingsPct;

  const gradient = `conic-gradient(
    #3b82f6 0% ${needsEnd}%,
    #f59e0b ${needsEnd}% ${wantsEnd}%,
    #10b981 ${wantsEnd}% ${savingsEnd}%,
    #e7e5e4 ${savingsEnd}% 100%
  )`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative rounded-full"
        style={{
          width: 200,
          height: 200,
          background: gradient,
        }}
      >
        {/* Inner white circle for donut effect */}
        <div
          className="absolute bg-white rounded-full flex items-center justify-center"
          style={{
            width: 120,
            height: 120,
            top: 40,
            left: 40,
          }}
        >
          <div className="text-center">
            <p className="text-xs text-stone-500 font-medium">Allocated</p>
            <p className="text-lg font-bold text-stone-900">
              {Math.min(needsPct + wantsPct + savingsPct, 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-stone-600">Needs {needsPct.toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-stone-600">Wants {wantsPct.toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-stone-600">Savings {savingsPct.toFixed(0)}%</span>
        </div>
        {unallocatedPct > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-stone-300" />
            <span className="text-stone-600">Unallocated {unallocatedPct.toFixed(0)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function BudgetPlanner() {
  const [income, setIncome] = useState<string>('5000');
  const [categories, setCategories] = useState<CategoryGroup[]>(defaultCategories);

  // ---- derived values ----
  const incomeNum = useMemo(() => {
    const v = parseFloat(income);
    return isNaN(v) || v < 0 ? 0 : v;
  }, [income]);

  const groupTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const cat of categories) {
      totals[cat.key] = cat.items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0);
    }
    return totals;
  }, [categories]);

  const needsTotal = groupTotals['needs'] || 0;
  const wantsTotal = groupTotals['wants'] || 0;
  const savingsTotal = groupTotals['savings'] || 0;
  const totalExpenses = needsTotal + wantsTotal + savingsTotal;
  const remaining = incomeNum - totalExpenses;

  const needsPctVal = pctExact(needsTotal, incomeNum);
  const wantsPctVal = pctExact(wantsTotal, incomeNum);
  const savingsPctVal = pctExact(savingsTotal, incomeNum);
  const unallocatedPctVal = Math.max(0, 100 - needsPctVal - wantsPctVal - savingsPctVal);

  const savingsRate = incomeNum > 0 ? pctExact(savingsTotal, incomeNum) : 0;

  const tips = useMemo(
    () => generateTips(incomeNum, categories, needsTotal, wantsTotal, savingsTotal),
    [incomeNum, categories, needsTotal, wantsTotal, savingsTotal],
  );

  // ---- handlers ----
  const updateItemAmount = useCallback(
    (catKey: string, itemId: string, value: string) => {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.key === catKey
            ? {
                ...cat,
                items: cat.items.map((it) =>
                  it.id === itemId ? { ...it, amount: value } : it,
                ),
              }
            : cat,
        ),
      );
    },
    [],
  );

  const prefillSuggested = useCallback(() => {
    if (incomeNum <= 0) return;
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((it) => ({
          ...it,
          amount: ((incomeNum * it.suggestedPct) / 100).toFixed(0),
        })),
      })),
    );
  }, [incomeNum]);

  const resetAll = useCallback(() => {
    setCategories(defaultCategories());
  }, []);

  // ---- render helpers ----
  const hasAnyExpense = totalExpenses > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Income Input */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-stone-900 mb-1">Monthly Take-Home Pay</h3>
        <p className="text-sm text-stone-500 mb-5">
          Enter your after-tax monthly income to get started.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 w-full">
            <label htmlFor="monthly-income" className="block text-sm font-semibold mb-2 text-stone-700">
              Income ($)
            </label>
            <input
              id="monthly-income"
              type="number"
              min="0"
              step="100"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow text-lg font-semibold"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={prefillSuggested}
              disabled={incomeNum <= 0}
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              Auto-Fill 50/30/20
            </button>
            <button
              onClick={resetAll}
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-stone-200 hover:bg-stone-300 active:bg-stone-400 text-stone-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Reset
            </button>
          </div>
        </div>

        {incomeNum > 0 && (
          <p className="mt-4 text-sm text-stone-500">
            Based on the 50/30/20 rule: <strong className="text-blue-600">{fmt(incomeNum * 0.5)}</strong> needs,{' '}
            <strong className="text-amber-600">{fmt(incomeNum * 0.3)}</strong> wants,{' '}
            <strong className="text-emerald-600">{fmt(incomeNum * 0.2)}</strong> savings.
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Expense Categories */}
      {/* ------------------------------------------------------------------ */}
      {categories.map((cat) => {
        const catTotal = groupTotals[cat.key] || 0;
        const catPct = pctExact(catTotal, incomeNum);
        const overBudget = catPct > cat.suggestedPct + 5;

        return (
          <div
            key={cat.key}
            className={`bg-white rounded-2xl shadow-lg border p-6 sm:p-8 ${
              overBudget ? 'border-red-300' : 'border-stone-200'
            }`}
          >
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <h3 className={`text-lg font-bold ${cat.color}`}>{cat.title}</h3>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-stone-600 font-medium">
                  {fmt(catTotal)} of {fmt(incomeNum)}
                </span>
                <span
                  className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                    overBudget
                      ? 'bg-red-100 text-red-700'
                      : `${cat.bgColor} ${cat.color}`
                  }`}
                >
                  {catPct.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Category progress bar */}
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden mb-6">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  overBudget ? 'bg-red-500' : cat.barColor
                }`}
                style={{ width: `${Math.min(catPct, 100)}%` }}
              />
            </div>

            {/* Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.items.map((item) => {
                const itemAmt = parseFloat(item.amount) || 0;
                const itemPct = pctExact(itemAmt, incomeNum);
                const suggestedAmt = incomeNum > 0 ? (incomeNum * item.suggestedPct) / 100 : 0;

                return (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`item-${item.id}`}
                        className="text-sm font-semibold text-stone-700"
                      >
                        {item.label}
                      </label>
                      {incomeNum > 0 && (
                        <span className="text-xs text-stone-400">
                          ~{item.suggestedPct}% = {fmt(suggestedAmt)}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium text-sm">
                        $
                      </span>
                      <input
                        id={`item-${item.id}`}
                        type="number"
                        min="0"
                        step="10"
                        value={item.amount}
                        onChange={(e) => updateItemAmount(cat.key, item.id, e.target.value)}
                        placeholder="0"
                        className="w-full pl-7 pr-3 py-2.5 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow text-sm"
                      />
                    </div>
                    {/* Per-item bar */}
                    {itemAmt > 0 && incomeNum > 0 && (
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${cat.barColor}`}
                          style={{ width: `${Math.min(itemPct, 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ------------------------------------------------------------------ */}
      {/* Visual Breakdown (donut chart) */}
      {/* ------------------------------------------------------------------ */}
      {hasAnyExpense && incomeNum > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-stone-900 mb-6 text-center">
            Budget Breakdown
          </h3>

          <DonutChart
            needsPct={Math.min(needsPctVal, 100)}
            wantsPct={Math.min(wantsPctVal, 100 - Math.min(needsPctVal, 100))}
            savingsPct={Math.min(
              savingsPctVal,
              100 - Math.min(needsPctVal, 100) - Math.min(wantsPctVal, 100 - Math.min(needsPctVal, 100)),
            )}
            unallocatedPct={Math.max(unallocatedPctVal, 0)}
          />

          {/* Comparison bars: Actual vs Recommended */}
          <div className="mt-8 space-y-5">
            <p className="text-sm font-semibold text-stone-700 text-center">
              Your Allocation vs. Recommended 50/30/20
            </p>

            {/* Needs */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-600 font-medium">Needs</span>
                <span className={needsPctVal > 55 ? 'text-red-600 font-bold' : 'text-stone-700 font-semibold'}>
                  {needsPctVal.toFixed(0)}% <span className="text-stone-400 font-normal">/ 50%</span>
                </span>
              </div>
              <div className="relative w-full h-4 bg-stone-100 rounded-full overflow-hidden">
                {/* Recommended marker */}
                <div
                  className="absolute top-0 h-full border-r-2 border-dashed border-stone-400 z-10"
                  style={{ left: '50%' }}
                />
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    needsPctVal > 55 ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(needsPctVal, 100)}%` }}
                />
              </div>
            </div>

            {/* Wants */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-600 font-medium">Wants</span>
                <span className={wantsPctVal > 35 ? 'text-red-600 font-bold' : 'text-stone-700 font-semibold'}>
                  {wantsPctVal.toFixed(0)}% <span className="text-stone-400 font-normal">/ 30%</span>
                </span>
              </div>
              <div className="relative w-full h-4 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full border-r-2 border-dashed border-stone-400 z-10"
                  style={{ left: '30%' }}
                />
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    wantsPctVal > 35 ? 'bg-red-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(wantsPctVal, 100)}%` }}
                />
              </div>
            </div>

            {/* Savings */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-600 font-medium">Savings</span>
                <span className={savingsPctVal < 15 && savingsTotal > 0 ? 'text-red-600 font-bold' : 'text-stone-700 font-semibold'}>
                  {savingsPctVal.toFixed(0)}% <span className="text-stone-400 font-normal">/ 20%</span>
                </span>
              </div>
              <div className="relative w-full h-4 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full border-r-2 border-dashed border-stone-400 z-10"
                  style={{ left: '20%' }}
                />
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    savingsPctVal >= 20 ? 'bg-emerald-500' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min(savingsPctVal, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Summary Section */}
      {/* ------------------------------------------------------------------ */}
      {hasAnyExpense && incomeNum > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Income */}
          <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 text-center">
            <p className="text-sm font-medium text-stone-500 mb-1">Total Income</p>
            <p className="text-2xl font-bold text-stone-900">{fmt(incomeNum)}</p>
          </div>

          {/* Total Expenses */}
          <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 text-center">
            <p className="text-sm font-medium text-stone-500 mb-1">Total Allocated</p>
            <p className="text-2xl font-bold text-stone-900">{fmt(totalExpenses)}</p>
          </div>

          {/* Remaining */}
          <div
            className={`rounded-2xl shadow-md border p-5 text-center ${
              remaining >= 0
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <p className="text-sm font-medium text-stone-500 mb-1">
              {remaining >= 0 ? 'Remaining' : 'Over Budget'}
            </p>
            <p
              className={`text-2xl font-bold ${
                remaining >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {remaining >= 0 ? fmt(remaining) : `-${fmt(Math.abs(remaining))}`}
            </p>
          </div>

          {/* Savings Rate */}
          <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 text-center">
            <p className="text-sm font-medium text-stone-500 mb-1">Your Savings Rate</p>
            <p
              className={`text-2xl font-bold ${
                savingsRate >= 20
                  ? 'text-emerald-600'
                  : savingsRate >= 10
                  ? 'text-amber-600'
                  : 'text-red-600'
              }`}
            >
              {savingsRate.toFixed(1)}%
            </p>
            <p className="text-xs text-stone-400 mt-1">
              {savingsRate >= 20 ? 'On track' : savingsRate >= 10 ? 'Getting there' : 'Needs work'}
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Monthly Savings Highlight */}
      {/* ------------------------------------------------------------------ */}
      {hasAnyExpense && incomeNum > 0 && (
        <div
          className={`rounded-2xl shadow-lg p-6 text-center text-white ${
            remaining >= 0 ? 'bg-emerald-600' : 'bg-red-600'
          }`}
        >
          <p className="text-sm font-medium opacity-80 mb-1">
            Monthly Savings Amount
          </p>
          <p className="text-4xl sm:text-5xl font-bold">
            {fmt(savingsTotal)}
          </p>
          <p className="text-sm opacity-80 mt-2">
            {savingsRate >= 20
              ? 'You meet the recommended 20% savings rate'
              : `Increase savings by ${fmt(Math.max(0, incomeNum * 0.2 - savingsTotal))} to reach the recommended 20%`}
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Tips Section */}
      {/* ------------------------------------------------------------------ */}
      {tips.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-stone-900 mb-5">
            Personalized Tips
          </h3>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 rounded-xl border text-sm leading-relaxed ${
                  tip.type === 'warning'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : tip.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-blue-50 border-blue-200 text-blue-800'
                }`}
              >
                <span className="mt-0.5 shrink-0 text-base">
                  {tip.type === 'warning' ? '\u26A0' : tip.type === 'success' ? '\u2713' : '\u2139'}
                </span>
                <span>{tip.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* How It Works */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-stone-900 mb-4">
          How the 50/30/20 Rule Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm text-stone-600 leading-relaxed">
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-bold text-blue-700">50% - Needs</span>
            </div>
            <p>
              Essential expenses you cannot avoid: housing, utilities, groceries, transportation,
              insurance, and minimum debt payments.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-3 h-3 rounded-full bg-amber-500" />
              <span className="font-bold text-amber-700">30% - Wants</span>
            </div>
            <p>
              Non-essential spending that improves quality of life: dining out, entertainment,
              shopping, subscriptions, and hobbies.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-bold text-emerald-700">20% - Savings</span>
            </div>
            <p>
              Money set aside for the future: emergency fund, retirement contributions,
              investments, and extra debt payoff beyond minimums.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center">
        <p className="text-xs text-stone-400 leading-relaxed max-w-2xl mx-auto">
          This calculator is for informational purposes only and does not constitute financial advice.
          The 50/30/20 rule is a general guideline; your ideal budget may differ based on your
          location, income level, and personal circumstances. Consult a financial advisor for
          personalized recommendations.
        </p>
      </div>
    </div>
  );
}
