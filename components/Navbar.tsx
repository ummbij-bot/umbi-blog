'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiChevronDown, FiSearch } from 'react-icons/fi';
import dynamic from 'next/dynamic';
const SearchModal = dynamic(() => import('./SearchModal'), { ssr: false });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigation = [
    { name: 'Finance', href: '/finance', dot: 'bg-emerald-500' },
    { name: 'Tech', href: '/tech', dot: 'bg-blue-500' },
    { name: 'Wellness', href: '/wellness', dot: 'bg-purple-500' },
    { name: 'About', href: '/about', dot: '' },
  ];

  const toolCategories = [
    {
      category: 'Finance Tools',
      color: 'emerald',
      accent: 'bg-emerald-500',
      tools: [
        { name: 'Compound Interest Calculator', icon: '📊', href: '/finance/tools/calculator', badge: 'POPULAR', badgeColor: 'bg-emerald-100 text-emerald-700' },
        { name: 'AI Financial Advisor', icon: '💰', href: '/finance/tools/ai-advisor', badge: 'NEW', badgeColor: 'bg-purple-100 text-purple-700' },
      ]
    },
    {
      category: 'Tech Tools',
      color: 'blue',
      accent: 'bg-blue-500',
      tools: [
        { name: 'AI Tech Advisor', icon: '💻', href: '/tech/tools/ai-advisor', badge: 'NEW', badgeColor: 'bg-blue-100 text-blue-700' },
      ]
    },
    {
      category: 'Wellness Tools',
      color: 'purple',
      accent: 'bg-purple-500',
      tools: [
        { name: 'BMI Calculator', icon: '⚖️', href: '/wellness/tools/bmi-calculator', badge: 'POPULAR', badgeColor: 'bg-purple-100 text-purple-700' },
        { name: 'AI Wellness Coach', icon: '💜', href: '/wellness/tools/ai-coach', badge: 'NEW', badgeColor: 'bg-purple-100 text-purple-700' },
      ]
    }
  ];

  return (
    <>
      {/* Brand gradient line */}
      <div className="h-[2px] bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200/60">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
                U
              </div>
              <span className="font-extrabold text-xl tracking-tight text-stone-900">
                umbi
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-7">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative font-medium text-stone-500 hover:text-stone-900 transition-colors text-sm py-1 group"
                >
                  {item.name}
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-[2px] rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
                title="Search (Cmd/Ctrl + K)"
              >
                <FiSearch size={18} className="text-stone-400 hover:text-stone-600 transition-colors" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  onBlur={() => setTimeout(() => setIsToolsOpen(false), 200)}
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-all shadow-sm text-sm flex items-center gap-1.5 hover:shadow-md"
                >
                  Tools
                  <FiChevronDown size={14} className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isToolsOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 animate-fade-in overflow-hidden"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {toolCategories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'border-t border-stone-100 mt-1 pt-1' : ''}>
                        <div className="px-4 py-2 flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${category.accent}`} />
                          <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                            {category.category}
                          </h3>
                        </div>
                        {category.tools.map((tool, toolIndex) => (
                          <Link
                            key={toolIndex}
                            href={tool.href}
                            className="group block px-4 py-2.5 hover:bg-stone-50 transition-colors"
                            onClick={() => setIsToolsOpen(false)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <span className="text-lg">{tool.icon}</span>
                                <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900">{tool.name}</span>
                              </div>
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${tool.badgeColor}`}>{tool.badge}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-stone-500 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200 shadow-lg animate-slide-up max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="container-custom py-4">
              <div className="flex flex-col gap-0.5 mb-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 text-base font-medium text-stone-600 hover:text-stone-900 py-3 px-3 rounded-lg hover:bg-stone-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.dot && <span className={`w-2 h-2 rounded-full ${item.dot}`} />}
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-3">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 px-3">Tools</div>
                {toolCategories.map((category, catIndex) => (
                  <div key={catIndex} className="mb-2">
                    {category.tools.map((tool, toolIndex) => (
                      <Link
                        key={toolIndex}
                        href={tool.href}
                        className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-stone-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm text-stone-700 font-medium">{tool.name}</span>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${tool.badgeColor}`}>{tool.badge}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
