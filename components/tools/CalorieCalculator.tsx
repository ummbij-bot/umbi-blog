'use client';

import { useState } from 'react';

type Gender = 'male' | 'female';
type WeightUnit = 'kg' | 'lbs';
type HeightUnit = 'cm' | 'ft';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'lose' | 'maintain' | 'gain';

interface Results {
  bmr: number;
  tdee: number;
  goalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (little or no exercise)',
  light: 'Lightly Active (1-3 days/week)',
  moderate: 'Moderately Active (3-5 days/week)',
  active: 'Active (6-7 days/week)',
  very_active: 'Very Active (intense daily exercise)',
};

const GOAL_LABELS: Record<Goal, string> = {
  lose: 'Lose Weight (-500 cal/day)',
  maintain: 'Maintain Weight',
  gain: 'Gain Weight (+500 cal/day)',
};

export default function CalorieCalculator() {
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [heightCm, setHeightCm] = useState<string>('');
  const [heightFt, setHeightFt] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [gender, setGender] = useState<Gender>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');
  const [results, setResults] = useState<Results | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const validate = (): boolean => {
    const newErrors: string[] = [];

    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      newErrors.push('Please enter a valid age (1-120).');
    }

    const weightNum = parseFloat(weight);
    if (!weight || isNaN(weightNum) || weightNum <= 0) {
      newErrors.push('Please enter a valid weight.');
    } else {
      const weightKg = weightUnit === 'lbs' ? weightNum * 0.453592 : weightNum;
      if (weightKg < 20 || weightKg > 300) {
        newErrors.push('Weight seems out of range. Please check your input.');
      }
    }

    if (heightUnit === 'cm') {
      const h = parseFloat(heightCm);
      if (!heightCm || isNaN(h) || h < 50 || h > 280) {
        newErrors.push('Please enter a valid height in cm (50-280).');
      }
    } else {
      const ft = parseInt(heightFt, 10);
      const inches = parseInt(heightIn, 10);
      if (!heightFt || isNaN(ft) || ft < 1 || ft > 8) {
        newErrors.push('Please enter valid feet (1-8).');
      }
      if (heightIn && (isNaN(inches) || inches < 0 || inches > 11)) {
        newErrors.push('Inches must be between 0 and 11.');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const calculate = () => {
    if (!validate()) return;

    // Convert weight to kg
    const weightNum = parseFloat(weight);
    const weightKg = weightUnit === 'lbs' ? weightNum * 0.453592 : weightNum;

    // Convert height to cm
    let heightCmVal: number;
    if (heightUnit === 'cm') {
      heightCmVal = parseFloat(heightCm);
    } else {
      const ft = parseInt(heightFt, 10);
      const inches = parseInt(heightIn || '0', 10);
      heightCmVal = (ft * 12 + inches) * 2.54;
    }

    const ageNum = parseInt(age, 10);

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCmVal - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCmVal - 5 * ageNum - 161;
    }

    // TDEE
    const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];

    // Goal adjustment
    let goalCalories = tdee;
    if (goal === 'lose') goalCalories = tdee - 500;
    if (goal === 'gain') goalCalories = tdee + 500;

    // Ensure minimum calories
    goalCalories = Math.max(goalCalories, 1200);

    // Macro breakdown (moderate balanced split)
    // Protein: 30%, Carbs: 40%, Fat: 30%
    const proteinCals = goalCalories * 0.3;
    const carbsCals = goalCalories * 0.4;
    const fatCals = goalCalories * 0.3;

    const protein = proteinCals / 4; // 4 cal per gram
    const carbs = carbsCals / 4;     // 4 cal per gram
    const fat = fatCals / 9;         // 9 cal per gram

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
    });
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-stone-200 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center text-stone-900">
        Daily Calorie Calculator
      </h3>

      <div className="space-y-5">
        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-stone-700">Gender</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`py-3 rounded-xl font-semibold text-sm transition-colors border-2 ${
                gender === 'male'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-purple-300'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`py-3 rounded-xl font-semibold text-sm transition-colors border-2 ${
                gender === 'female'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-purple-300'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-stone-700">Age</label>
          <input
            type="number"
            placeholder="e.g. 30"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={1}
            max={120}
            className="w-full p-3 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-stone-50 text-stone-900 transition-colors"
          />
        </div>

        {/* Weight */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-stone-700">Weight</label>
            <div className="flex rounded-lg overflow-hidden border border-stone-200">
              <button
                type="button"
                onClick={() => setWeightUnit('kg')}
                className={`px-3 py-1 text-xs font-bold transition-colors ${
                  weightUnit === 'kg'
                    ? 'bg-purple-600 text-white'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                kg
              </button>
              <button
                type="button"
                onClick={() => setWeightUnit('lbs')}
                className={`px-3 py-1 text-xs font-bold transition-colors ${
                  weightUnit === 'lbs'
                    ? 'bg-purple-600 text-white'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                lbs
              </button>
            </div>
          </div>
          <input
            type="number"
            placeholder={weightUnit === 'kg' ? 'e.g. 70' : 'e.g. 154'}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min={0}
            className="w-full p-3 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-stone-50 text-stone-900 transition-colors"
          />
        </div>

        {/* Height */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-stone-700">Height</label>
            <div className="flex rounded-lg overflow-hidden border border-stone-200">
              <button
                type="button"
                onClick={() => setHeightUnit('cm')}
                className={`px-3 py-1 text-xs font-bold transition-colors ${
                  heightUnit === 'cm'
                    ? 'bg-purple-600 text-white'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                cm
              </button>
              <button
                type="button"
                onClick={() => setHeightUnit('ft')}
                className={`px-3 py-1 text-xs font-bold transition-colors ${
                  heightUnit === 'ft'
                    ? 'bg-purple-600 text-white'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                ft/in
              </button>
            </div>
          </div>
          {heightUnit === 'cm' ? (
            <input
              type="number"
              placeholder="e.g. 175"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              min={0}
              className="w-full p-3 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-stone-50 text-stone-900 transition-colors"
            />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  placeholder="Feet"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  min={0}
                  max={8}
                  className="w-full p-3 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-stone-50 text-stone-900 transition-colors"
                />
                <span className="text-xs text-stone-500 mt-1 block">ft</span>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Inches"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  min={0}
                  max={11}
                  className="w-full p-3 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-stone-50 text-stone-900 transition-colors"
                />
                <span className="text-xs text-stone-500 mt-1 block">in</span>
              </div>
            </div>
          )}
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-stone-700">Activity Level</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            className="w-full p-3 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-stone-50 text-stone-900 transition-colors appearance-none cursor-pointer"
          >
            {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map((level) => (
              <option key={level} value={level}>
                {ACTIVITY_LABELS[level]}
              </option>
            ))}
          </select>
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-stone-700">Your Goal</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGoal(g)}
                className={`py-3 px-2 rounded-xl font-semibold text-xs sm:text-sm transition-colors border-2 leading-tight ${
                  goal === g
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-purple-300'
                }`}
              >
                {g === 'lose' && 'Lose Weight'}
                {g === 'maintain' && 'Maintain'}
                {g === 'gain' && 'Gain Weight'}
              </button>
            ))}
          </div>
          <p className="text-xs text-stone-500 mt-1.5">
            {goal === 'lose' && 'A 500 cal/day deficit for ~0.45 kg (1 lb) loss per week.'}
            {goal === 'maintain' && 'Eat at your maintenance level to keep current weight.'}
            {goal === 'gain' && 'A 500 cal/day surplus for ~0.45 kg (1 lb) gain per week.'}
          </p>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={calculate}
          className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all active:scale-[0.98] shadow-md bg-purple-600 hover:bg-purple-500"
        >
          Calculate Calories
        </button>

        {/* Results */}
        {results && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {/* Primary Result */}
            <div className="p-6 bg-purple-50 rounded-2xl text-center border border-purple-100">
              <p className="text-sm text-purple-600 font-medium mb-1">Recommended Daily Intake</p>
              <p className="text-5xl font-bold text-purple-600 mb-1">
                {formatNumber(results.goalCalories)}
              </p>
              <p className="text-sm text-stone-500">calories / day</p>
            </div>

            {/* BMR and TDEE */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-stone-50 rounded-xl text-center border border-stone-200">
                <p className="text-xs text-stone-500 font-medium mb-1">Basal Metabolic Rate</p>
                <p className="text-2xl font-bold text-stone-900">{formatNumber(results.bmr)}</p>
                <p className="text-xs text-stone-500">cal/day at rest</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl text-center border border-stone-200">
                <p className="text-xs text-stone-500 font-medium mb-1">Total Daily Energy</p>
                <p className="text-2xl font-bold text-stone-900">{formatNumber(results.tdee)}</p>
                <p className="text-xs text-stone-500">cal/day (TDEE)</p>
              </div>
            </div>

            {/* Macro Breakdown */}
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 mb-4 text-center">
                Suggested Macro Breakdown
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <span className="text-lg font-bold text-purple-600">{results.protein}g</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-700">Protein</p>
                  <p className="text-xs text-stone-500">30%</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-stone-200 flex items-center justify-center mb-2">
                    <span className="text-lg font-bold text-stone-700">{results.carbs}g</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-700">Carbs</p>
                  <p className="text-xs text-stone-500">40%</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center mb-2">
                    <span className="text-lg font-bold text-stone-700">{results.fat}g</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-700">Fat</p>
                  <p className="text-xs text-stone-500">30%</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-stone-400 text-center leading-relaxed">
              Calculated using the Mifflin-St Jeor equation. Results are estimates and may vary.
              Consult a healthcare professional before making dietary changes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
