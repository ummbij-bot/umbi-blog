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

  // Cmd/Ctrl + K로 검색 열기
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
    { name: 'Finance', href: '/finance' },
    { name: 'Tech', href: '/tech' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'About', href: '/about' },
  ];

  const toolCategories = [
    {
      category: 'Finance Tools',
      color: 'emerald',
      tools: [
        { 
          name: 'Compound Interest Calculator', 
          icon: '📊', 
          href: '/finance/tools/calculator',
          badge: 'POPULAR',
          badgeColor: 'bg-emerald-100 text-emerald-700'
        },
        { 
          name: 'AI Financial Advisor', 
          icon: '💰', 
          href: '/finance/tools/ai-advisor',
          badge: 'NEW',
          badgeColor: 'bg-purple-100 text-purple-700'
        },
      ]
    },
    {
      category: 'Tech Tools',
      color: 'blue',
      tools: [
        { 
          name: 'AI Tech Advisor', 
          icon: '💻', 
          href: '/tech/tools/ai-advisor',
          badge: 'NEW',
          badgeColor: 'bg-purple-100 text-purple-700'
        },
      ]
    },
    {
      category: 'Wellness Tools',
      color: 'purple',
      tools: [
        { 
          name: 'BMI Calculator', 
          icon: '⚖️', 
          href: '/wellness/tools/bmi-calculator',
          badge: 'POPULAR',
          badgeColor: 'bg-purple-100 text-purple-700'
        },
        { 
          name: 'AI Wellness Coach', 
          icon: '💜', 
          href: '/wellness/tools/ai-coach',
          badge: 'NEW',
          badgeColor: 'bg-purple-100 text-purple-700'
        },
      ]
    }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            
            {/* 로고 */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                U
              </div>
              <span className="font-bold text-2xl tracking-tight text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
                umbi
              </span>
            </Link>

            {/* 데스크탑 메뉴 */}
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
              
              {/* 검색 버튼 */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-lg hover:bg-neutral-100 transition-colors relative group"
                title="Search (Cmd/Ctrl + K)"
              >
                <FiSearch size={20} className="text-neutral-600 group-hover:text-emerald-600 transition-colors" />
              </button>
              
              {/* Tools 드롭다운 */}
              <div className="relative">
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  onBlur={() => setTimeout(() => setIsToolsOpen(false), 200)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-all shadow-sm text-sm flex items-center gap-2 hover:shadow-md"
                >
                  Tools
                  <FiChevronDown 
                    size={16}
                    className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {/* 드롭다운 메뉴 */}
                {isToolsOpen && (
                  <div 
                    className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-neutral-200 py-3 animate-fade-in overflow-hidden"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {toolCategories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'border-t border-neutral-100 mt-2 pt-2' : ''}>
                        {/* 카테고리 헤더 */}
                        <div className="px-4 py-2">
                          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                            {category.category}
                          </h3>
                        </div>
                        
                        {/* 툴 목록 */}
                        {category.tools.map((tool, toolIndex) => (
                          <Link
                            key={toolIndex}
                            href={tool.href}
                            className="group block px-4 py-3 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-transparent transition-all"
                            onClick={() => setIsToolsOpen(false)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                {/* 아이콘 */}
                                <span className="text-2xl group-hover:scale-110 transition-transform">
                                  {tool.icon}
                                </span>
                                
                                {/* 이름 */}
                                <span className="font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                                  {tool.name}
                                </span>
                              </div>
                              
                              {/* 뱃지 */}
                              <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${tool.badgeColor}`}>
                                {tool.badge}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                    
                    {/* 하단 CTA */}
                    <div className="border-t border-neutral-100 mt-2 pt-3 px-4">
                      <div className="text-xs text-neutral-500 text-center">
                        More tools coming soon! 🚀
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-neutral-200 shadow-xl animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="container-custom py-6">
              {/* 네비게이션 링크 */}
              <div className="flex flex-col gap-1 mb-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-neutral-600 hover:text-emerald-600 py-3 px-2 rounded-lg hover:bg-neutral-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* 모바일 Tools 섹션 */}
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-sm font-bold text-neutral-900 mb-4 px-2 flex items-center gap-2">
                  <span>🔧</span>
                  <span>All Tools</span>
                </div>
                
                {toolCategories.map((category, catIndex) => (
                  <div key={catIndex} className="mb-4">
                    {/* 카테고리 헤더 */}
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 px-2">
                      {category.category}
                    </div>
                    
                    {/* 툴 목록 */}
                    <div className="space-y-1">
                      {category.tools.map((tool, toolIndex) => (
                        <Link
                          key={toolIndex}
                          href={tool.href}
                          className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-neutral-50 transition-colors group"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl group-hover:scale-110 transition-transform">
                              {tool.icon}
                            </span>
                            <span className="text-neutral-700 group-hover:text-neutral-900 font-medium">
                              {tool.name}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${tool.badgeColor}`}>
                            {tool.badge}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* 모바일 CTA */}
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="text-xs text-neutral-500 text-center py-2">
                    More tools coming soon! 🚀
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* 검색 모달 */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}