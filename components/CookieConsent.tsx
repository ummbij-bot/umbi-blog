'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay so it doesn't flash on initial load
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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6" role="dialog" aria-label="Cookie consent">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-base font-bold text-neutral-900 mb-1">We value your privacy</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized ads via Google AdSense,
              and analyze site traffic with Google Analytics. By clicking &quot;Accept All&quot;, you consent to
              our use of cookies as described in our{' '}
              <Link href="/privacy" className="text-blue-600 underline hover:text-blue-800">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={acceptEssential}
              className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
