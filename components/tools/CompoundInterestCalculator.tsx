'use client'; // 👈 이 줄이 없으면 useState 에러가 납니다!

import { useState } from 'react';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(1000); // 초기 자금
  const [rate, setRate] = useState<number>(5); // 이자율
  const [years, setYears] = useState<number>(10); // 기간
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // 복리 계산 공식
    const amount = principal * Math.pow((1 + rate / 100), years);
    setResult(amount);
  };

  return (
    <div className="card p-8 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-neutral-100">
      <h3 className="text-2xl font-bold mb-6 text-center text-neutral-900">
        💰 복리 계산기 (Savings Calculator)
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-700">Initial Deposit ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-700">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-700">Years to Grow</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full py-4 rounded-xl font-bold text-white text-lg bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md"
        >
          Calculate Growth
        </button>

        {result !== null && (
          <div className="mt-8 p-6 bg-emerald-50 rounded-xl text-center border border-emerald-100">
            <p className="text-sm text-emerald-600 font-medium mb-1">In {years} years, you will have:</p>
            <p className="text-4xl font-bold text-emerald-700">
              ${result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}