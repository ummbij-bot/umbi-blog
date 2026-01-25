'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Finance', href: '/finance' },
    { name: 'Tech', href: '/tech' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. 로고 */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              U
            </div>
            <span className="font-bold text-2xl tracking-tight text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
              umbi
            </span>
          </Link>

          {/* 2. 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-neutral-600 hover:text-emerald-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-emerald-500 after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/finance/tools/calculator"
              className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-colors shadow-sm text-sm"
            >
              Tools
            </Link>
          </div>

          {/* 3. 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* 4. 모바일 드롭다운 메뉴 */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-neutral-200 shadow-lg animate-fade-in">
          <div className="container-custom py-6 flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-neutral-600 hover:text-emerald-600 py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
             <Link
              href="/finance/tools/calculator"
              className="text-lg font-medium text-emerald-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              Useful Tools
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}