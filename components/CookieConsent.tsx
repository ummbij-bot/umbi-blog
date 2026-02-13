'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="dialog"
      aria-label="Cookie consent"
      style={{ animation: 'slide-up-fade 0.4s ease-out' }}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-stone-200 p-5 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-bold text-stone-900 mb-1">We value your privacy</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              We use cookies to enhance your experience, serve personalized ads via Google AdSense,
              and analyze traffic with Google Analytics. See our{' '}
              <Link href="/privacy" className="text-emerald-600 underline hover:text-emerald-700">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={acceptEssential}
              className="px-4 py-2 text-xs font-medium text-stone-500 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
