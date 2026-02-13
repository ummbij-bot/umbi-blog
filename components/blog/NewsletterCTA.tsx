'use client';

import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="my-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700 text-white relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-xs font-medium text-white/90 mb-4 backdrop-blur-sm">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Free Weekly Newsletter
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Get Smarter Every Week
        </h3>
        <p className="text-white/75 text-sm md:text-base mb-6 leading-relaxed">
          Join readers who receive our best articles on finance, tech, and wellness every Thursday. No spam, unsubscribe anytime.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white/15 border border-white/20 rounded-xl text-white font-medium backdrop-blur-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You&apos;re subscribed! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400/60 transition-all backdrop-blur-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        )}
        <p className="text-white/40 text-xs mt-3">
          2,000+ readers. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
