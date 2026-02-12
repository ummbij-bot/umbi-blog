'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import NewsletterCTA from '@/components/blog/NewsletterCTA';

interface HomeClientProps {
  initialPosts: Post[];
}

const categoryConfig = {
  finance: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-500 to-teal-600',
    hoverBorder: 'hover:border-emerald-300',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Personal Finance',
    desc: 'Budgeting, investing, saving strategies, and wealth building guides.',
    count: 0,
  },
  tech: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    gradient: 'from-blue-500 to-indigo-600',
    hoverBorder: 'hover:border-blue-300',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Tech & Productivity',
    desc: 'AI tools, software reviews, remote work setups, and productivity hacks.',
    count: 0,
  },
  wellness: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    gradient: 'from-purple-500 to-pink-600',
    hoverBorder: 'hover:border-purple-300',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Health & Wellness',
    desc: 'Evidence-based fitness, nutrition, sleep science, and mental health.',
    count: 0,
  },
} as const;

type CategoryKey = keyof typeof categoryConfig;

export default function HomeClient({ initialPosts }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryKey>('all');

  // Count posts per category
  const counts = { finance: 0, tech: 0, wellness: 0 };
  initialPosts.forEach((p) => { if (p.category in counts) counts[p.category as CategoryKey]++; });

  const filteredPosts = selectedCategory === 'all'
    ? initialPosts
    : initialPosts.filter((post) => post.category === selectedCategory);

  const categories: ('all' | CategoryKey)[] = ['all', 'finance', 'tech', 'wellness'];

  // Latest 6 posts
  const latestPosts = [...initialPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  // Featured: longest content from each category
  const featuredPosts = (['finance', 'tech', 'wellness'] as const).map((cat) => {
    const catPosts = initialPosts.filter((p) => p.category === cat);
    return catPosts.sort((a, b) => b.content.length - a.content.length)[0];
  }).filter(Boolean);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8 bg-white/[0.07] text-white/80 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {initialPosts.length} expert-written articles
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            Your Guide to a<br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Smarter, Healthier Life
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert-driven insights on personal finance, cutting-edge technology, and evidence-based wellness to help you make better decisions every day.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {(['finance', 'tech', 'wellness'] as const).map((cat) => {
              const config = categoryConfig[cat];
              return (
                <Link
                  key={cat}
                  href={`/${cat}`}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.15] border border-white/10 hover:border-white/20 text-white text-sm font-medium transition-all duration-200"
                >
                  {config.icon}
                  {config.title}
                  <span className="text-white/40 text-xs">{counts[cat]}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-center gap-8 md:gap-16 flex-wrap text-center">
          {[
            { label: 'Articles', value: initialPosts.length.toString() },
            { label: 'Categories', value: '3' },
            { label: 'Free Tools', value: '5' },
            { label: 'Words Written', value: '60K+' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-neutral-900">{stat.value}</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Explore Our Topics</h2>
            <p className="text-neutral-500 max-w-lg mx-auto">Three pillars of knowledge to help you thrive</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {(['finance', 'tech', 'wellness'] as const).map((cat) => {
              const config = categoryConfig[cat];
              return (
                <Link key={cat} href={`/${cat}`} className="group block">
                  <div className={`relative rounded-2xl p-7 border ${config.border} ${config.hoverBorder} bg-white hover:shadow-lg transition-all duration-200 h-full`}>
                    <div className={`w-12 h-12 rounded-xl ${config.bg} ${config.text} flex items-center justify-center mb-4`}>
                      {config.icon}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-neutral-700">
                      {config.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      {config.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.badge}`}>
                        {counts[cat]} articles
                      </span>
                      <svg className="w-5 h-5 text-neutral-300 group-hover:text-neutral-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 bg-white border-y border-neutral-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-emerald-500 to-blue-500" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Editor&apos;s Picks</h2>
                <p className="text-sm text-neutral-500">Our most comprehensive, in-depth guides</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post, i) => {
                const config = categoryConfig[post.category as CategoryKey];
                return (
                  <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group">
                    <article className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 hover:shadow-md transition-all duration-200 h-full flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={i < 2}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${config?.badge || 'bg-neutral-100 text-neutral-700'}`}>
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="text-xs text-neutral-400 mb-2">{post.date} &middot; {post.readTime}</div>
                        <h3 className="font-bold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-neutral-500 line-clamp-2 flex-grow">{post.excerpt}</p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Latest Articles</h2>
              <p className="text-sm text-neutral-500">Fresh content across all categories</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => {
              const config = categoryConfig[post.category as CategoryKey];
              return (
                <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 hover:shadow-md transition-all duration-200 h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${config?.badge || 'bg-neutral-100 text-neutral-700'}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs text-neutral-400 mb-2">{post.date} &middot; {post.readTime}</div>
                      <h3 className="font-bold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-neutral-500 line-clamp-2 flex-grow">{post.excerpt}</p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <div className="max-w-6xl mx-auto px-4">
        <NewsletterCTA />
      </div>

      {/* All Posts with Filter */}
      <section className="py-16 px-4 bg-white border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-neutral-900">
            Browse All Articles
          </h2>

          <div className="flex justify-center gap-2 flex-wrap mb-10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const config = cat !== 'all' ? categoryConfig[cat] : null;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize border
                    ${isActive
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900'}`}
                >
                  {cat === 'all' ? `All (${initialPosts.length})` : `${config?.title || cat} (${counts[cat as CategoryKey]})`}
                </button>
              );
            })}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const config = categoryConfig[post.category as CategoryKey];
                return (
                  <Link
                    key={post.slug}
                    href={`/${post.category}/${post.slug}`}
                    className="group bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 hover:shadow-md transition-all duration-200 flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-neutral-300">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${config?.badge || 'bg-neutral-100 text-neutral-700'}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs text-neutral-400 mb-2 flex items-center gap-1.5">
                        <span>{post.date}</span>
                        <span>&middot;</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-neutral-500 line-clamp-2 flex-grow">{post.excerpt}</p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 group-hover:text-neutral-600 mt-3 pt-3 border-t border-neutral-100 transition-colors">
                        Read article
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-neutral-400">
              <svg className="w-16 h-16 mx-auto mb-4 text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
