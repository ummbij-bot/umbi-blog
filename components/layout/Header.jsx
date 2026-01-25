'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Finance', href: '/finance' },
    { name: 'Tech', href: '/tech' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50" style={{ boxShadow: 'var(--shadow-soft)' }}>
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" 
                 style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}>
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-display)' }}>U</span>
            </div>
            <span className="font-bold text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              umbi
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium transition-colors duration-200"
                style={{ color: 'var(--color-neutral-600)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-600)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-neutral-600)'}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4" style={{ borderTop: '1px solid var(--color-neutral-200)' }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 font-medium transition-colors duration-200"
                style={{ color: 'var(--color-neutral-600)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}