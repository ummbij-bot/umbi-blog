'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/lib/posts';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredPosts = selectedCategory === 'all'
    ? sortedPosts
    : sortedPosts.filter((post) => post.category === selectedCategory);

  const categories = ['all', 'finance', 'tech', 'wellness'];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <section className="bg-white border-b py-16 px-4 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Umbi&apos;s Blog</h1>
          <p className="text-xl text-gray-600">Finance, Tech, and Wellness for a better life.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="flex justify-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors capitalize
                ${selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link 
                key={post.slug} 
                // ✅ 여기가 수정되었습니다! (/blog -> /${post.category})
                href={`/${post.category}/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-600">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mt-auto">
                    Read more 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>No posts found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}