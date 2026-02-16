import CalorieCalculator from '@/components/tools/CalorieCalculator';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Daily Calorie Calculator - Find Your TDEE & Macros',
  description:
    'Calculate your daily calorie needs using the Mifflin-St Jeor equation. Get your BMR, TDEE, and personalized macro breakdown for weight loss, maintenance, or muscle gain.',
  keywords: [
    'calorie calculator',
    'TDEE calculator',
    'BMR calculator',
    'macro calculator',
    'daily calorie needs',
    'weight loss calories',
    'Mifflin-St Jeor',
  ],
  alternates: {
    canonical: 'https://umbi-blog.vercel.app/wellness/tools/calorie-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://umbi-blog.vercel.app/wellness/tools/calorie-calculator',
    title: 'Free Daily Calorie Calculator - Find Your TDEE & Macros',
    description:
      'Calculate your daily calorie needs using the Mifflin-St Jeor equation. Get your BMR, TDEE, and personalized macro breakdown.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Daily Calorie Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Daily Calorie Calculator',
    description: 'Calculate your daily calorie needs, BMR, TDEE, and suggested macros.',
  },
};

export default function CalorieCalculatorPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefdfb' }}>
      {/* Breadcrumb */}
      <div className="border-b border-stone-200 bg-stone-50">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-sm text-stone-500">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/wellness" className="hover:text-purple-600 transition-colors">
              Wellness
            </Link>
            <span>/</span>
            <span className="text-stone-900 font-medium">Calorie Calculator</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-14 sm:py-16">
        <div className="container-custom text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 rounded-full mb-4 border border-purple-100">
            Free Tool
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-stone-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Daily Calorie Calculator
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-stone-600 leading-relaxed">
            Estimate your daily calorie needs based on your body stats, activity level, and goals.
            Powered by the clinically-backed Mifflin-St Jeor equation.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-16">
        <div className="container-custom">
          <CalorieCalculator />
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 border-t border-stone-200 bg-stone-50">
        <div className="container-custom max-w-2xl">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            Related Articles
          </h2>
          <div className="grid gap-4">
            <Link
              href="/wellness/7-day-meal-prep-guide"
              className="block p-5 bg-white rounded-2xl border border-stone-200 hover:border-purple-300 hover:shadow-md transition-all group"
            >
              <p className="font-bold text-stone-900 group-hover:text-purple-600 transition-colors">
                7-Day Meal Prep Guide
              </p>
              <p className="text-sm text-stone-500 mt-1">
                Plan and prepare a full week of balanced, calorie-conscious meals.
              </p>
            </Link>
            <Link
              href="/wellness/healthy-snacking-guide-nutritious-snacks"
              className="block p-5 bg-white rounded-2xl border border-stone-200 hover:border-purple-300 hover:shadow-md transition-all group"
            >
              <p className="font-bold text-stone-900 group-hover:text-purple-600 transition-colors">
                Healthy Snacking Guide: Nutritious Snacks
              </p>
              <p className="text-sm text-stone-500 mt-1">
                Discover smart snacking strategies that fit your calorie goals.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
