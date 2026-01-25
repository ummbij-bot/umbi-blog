'use client';

import { useState } from 'react';

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>(''); // 키 (cm)
  const [weight, setWeight] = useState<string>(''); // 몸무게 (kg)
  const [bmi, setBmi] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');

  const calculateBmi = () => {
    if (!height || !weight) return;

    const h = parseFloat(height) / 100; // cm를 m로 변환
    const w = parseFloat(weight);
    
    // BMI 공식: 몸무게 / (키 * 키)
    const bmiValue = w / (h * h);
    setBmi(bmiValue);

    // 결과 판정
    if (bmiValue < 18.5) setMessage('Underweight (저체중)');
    else if (bmiValue < 23) setMessage('Normal Weight (정상)');
    else if (bmiValue < 25) setMessage('Overweight (과체중)');
    else setMessage('Obesity (비만)');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-rose-100 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--color-neutral-900)' }}>
        💪 BMI Calculator
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-700">Height (cm)</label>
          <input
            type="number"
            placeholder="Ex: 175"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-700">Weight (kg)</label>
          <input
            type="number"
            placeholder="Ex: 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
          />
        </div>

        <button
          onClick={calculateBmi}
          className="w-full py-4 rounded-xl font-bold text-white text-lg transition-transform active:scale-95 shadow-md bg-rose-500 hover:bg-rose-600"
        >
          Calculate BMI
        </button>

        {bmi !== null && (
          <div className="mt-8 p-6 bg-rose-50 rounded-xl text-center border border-rose-100 animate-fade-in">
            <p className="text-sm text-rose-600 font-medium mb-1">Your BMI Score</p>
            <p className="text-4xl font-bold text-rose-700 mb-2">
              {bmi.toFixed(1)}
            </p>
            <p className="text-lg font-bold text-neutral-700">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}