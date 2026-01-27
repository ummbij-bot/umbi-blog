'use client';

import { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/lib/posts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Escape 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 검색 로직 - useMemo 사용
  const searchResults = useMemo(() => {
    let filtered = posts;

    // 카테고리 필터
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // 검색어 필터
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // 검색어 하이라이트
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={index} className="bg-yellow-200 text-neutral-900">{part}</mark>
        : part
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* 검색 모달 */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl animate-slide-up overflow-hidden">
        {/* 검색 입력 */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center gap-4 mb-4">
            <FiSearch className="text-neutral-400" size={24} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 text-lg outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex gap-2">
            {['all', 'finance', 'tech', 'wellness'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="max-h-[60vh] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="p-4 space-y-2">
              {searchResults.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${post.category}/${post.slug}`}
                  onClick={onClose}
                  className="block p-4 rounded-xl hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex gap-4">
                    {/* 썸네일 */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                      <Image
                        src={post.image || '/placeholder.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* 내용 */}
                    <div className="flex-1 min-w-0">
                      {/* 카테고리 + 날짜 */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          post.category === 'finance' 
                            ? 'bg-emerald-100 text-emerald-700'
                            : post.category === 'tech'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                        <span className="text-xs text-neutral-500">{post.date}</span>
                      </div>

                      {/* 제목 */}
                      <h3 className="font-bold text-neutral-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                        {highlightText(post.title, searchQuery)}
                      </h3>

                      {/* 발췌문 */}
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {highlightText(post.excerpt, searchQuery)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // 검색 결과 없음
            <div className="py-20 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">No results found</h3>
              <p className="text-neutral-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* 하단 힌트 */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-4">
              <span>Press <kbd className="px-2 py-1 bg-white border border-neutral-300 rounded">ESC</kbd> to close</span>
            </div>
            <span>{searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}