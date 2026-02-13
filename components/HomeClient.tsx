'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import NewsletterCTA from '@/components/blog/NewsletterCTA';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface HomeClientProps {
  initialPosts: Post[];
}

const categoryConfig = {
  finance: {
    badge: 'bg-emerald-100 text-emerald-700',
    surface: 'from-emerald-50/60 to-white',
    accent: 'bg-emerald-500',
    accentText: 'text-emerald-600',
    border: 'border-emerald-500',
    borderLight: 'border-emerald-100',
    hoverGlow: 'hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)]',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Personal Finance',
    desc: 'Budgeting, investing, saving strategies, and wealth building guides.',
  },
  tech: {
    badge: 'bg-blue-100 text-blue-700',
    surface: 'from-blue-50/60 to-white',
    accent: 'bg-blue-500',
    accentText: 'text-blue-600',
    border: 'border-blue-500',
    borderLight: 'border-blue-100',
    hoverGlow: 'hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)]',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Tech & Productivity',
    desc: 'AI tools, software reviews, remote work setups, and productivity hacks.',
  },
  wellness: {
    badge: 'bg-purple-100 text-purple-700',
    surface: 'from-purple-50/60 to-white',
    accent: 'bg-purple-500',
    accentText: 'text-purple-600',
    border: 'border-purple-500',
    borderLight: 'border-purple-100',
    hoverGlow: 'hover:shadow-[0_4px_20px_rgba(147,51,234,0.15)]',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Health & Wellness',
    desc: 'Evidence-based fitness, nutrition, sleep science, and mental health.',
  },
} as const;

type CategoryKey = keyof typeof categoryConfig;

export default function HomeClient({ initialPosts }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryKey>('all');

  const counts = { finance: 0, tech: 0, wellness: 0 };
  initialPosts.forEach((p) => { if (p.category in counts) counts[p.category as CategoryKey]++; });

  const filteredPosts = selectedCategory === 'all'
    ? initialPosts
    : initialPosts.filter((post) => post.category === selectedCategory);

  const categories: ('all' | CategoryKey)[] = ['all', 'finance', 'tech', 'wellness'];

  const latestPosts = [...initialPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const featuredPosts = (['finance', 'tech', 'wellness'] as const).map((cat) => {
    const catPosts = initialPosts.filter((p) => p.category === cat);
    return catPosts.sort((a, b) => b.content.length - a.content.length)[0];
  }).filter(Boolean);

  return (
    <main className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-[#fefdfb]">
        {/* Subtle color wash */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-emerald-100 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-blue-100 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-[400px] h-[300px] bg-purple-100 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <p className="overline mb-6 text-stone-400">Finance &nbsp;/&nbsp; Tech &nbsp;/&nbsp; Wellness</p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-stone-900 mb-6">
            Insights for a Smarter,<br />Healthier Life
          </h1>

          <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Expert-driven articles on personal finance, cutting-edge technology, and evidence-based wellness to help you make better decisions every day.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="#articles"
              className="px-7 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              Browse Articles
            </Link>
            <Link
              href="/about"
              className="px-7 py-3 rounded-xl bg-white text-stone-700 font-semibold text-sm border border-stone-200 hover:border-stone-300 transition-all duration-200 hover:-translate-y-0.5"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="overline mb-3">What We Cover</p>
              <h2 className="text-3xl md:text-4xl text-stone-900">Explore Our Topics</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {(['finance', 'tech', 'wellness'] as const).map((cat, i) => {
              const config = categoryConfig[cat];
              return (
                <ScrollReveal key={cat} delay={i * 0.1}>
                  <Link href={`/${cat}`} className="group block h-full">
                    <div className={`relative rounded-2xl p-7 bg-gradient-to-br ${config.surface} border ${config.borderLight} border-t-[3px] ${config.border} hover:shadow-lg transition-all duration-300 h-full ${config.hoverGlow}`}>
                      <div className={`w-11 h-11 rounded-xl ${config.accent} text-white flex items-center justify-center mb-5`}>
                        {config.icon}
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-stone-700">
                        {config.title}
                      </h3>
                      <p className="text-sm text-stone-500 leading-relaxed mb-5">
                        {config.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.badge}`}>
                          {counts[cat]} articles
                        </span>
                        <svg className="w-5 h-5 text-stone-300 group-hover:text-stone-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Featured Posts — Magazine Layout ─── */}
      {featuredPosts.length >= 3 && (
        <section className="py-20 px-4 bg-white border-y border-stone-100">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="mb-10">
                <p className="overline mb-3">Editor&apos;s Picks</p>
                <h2 className="text-3xl md:text-4xl text-stone-900">Our Best Guides</h2>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Large featured card */}
              <ScrollReveal className="lg:col-span-3">
                <Link href={`/${featuredPosts[0].category}/${featuredPosts[0].slug}`} className="group block h-full">
                  <article className={`rounded-2xl overflow-hidden bg-white border border-stone-100 h-full flex flex-col transition-all duration-300 hover:shadow-lg border-b-4 ${categoryConfig[featuredPosts[0].category as CategoryKey].border}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                      {featuredPosts[0].image && (
                        <Image
                          src={featuredPosts[0].image}
                          alt={featuredPosts[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          priority
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold ${categoryConfig[featuredPosts[0].category as CategoryKey].badge}`}>
                        {featuredPosts[0].category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-xs text-stone-400 mb-3">{featuredPosts[0].date} &middot; {featuredPosts[0].readTime}</div>
                      <h3 className="text-xl md:text-2xl font-bold text-stone-900 mb-3 group-hover:text-stone-600 transition-colors leading-tight">
                        {featuredPosts[0].title}
                      </h3>
                      <p className="text-sm text-stone-500 line-clamp-3 flex-grow leading-relaxed">{featuredPosts[0].excerpt}</p>
                      <div className={`flex items-center gap-1.5 text-sm font-semibold mt-4 pt-4 border-t border-stone-100 ${categoryConfig[featuredPosts[0].category as CategoryKey].accentText} transition-colors`}>
                        Read full guide
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>

              {/* Two stacked smaller cards */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {featuredPosts.slice(1, 3).map((post, i) => {
                  const config = categoryConfig[post.category as CategoryKey];
                  return (
                    <ScrollReveal key={post.slug} delay={0.1 + i * 0.1} className="flex-1">
                      <Link href={`/${post.category}/${post.slug}`} className="group block h-full">
                        <article className={`rounded-2xl overflow-hidden bg-white border border-stone-100 h-full flex flex-col transition-all duration-300 hover:shadow-lg border-b-4 ${config.border}`}>
                          <div className="relative aspect-[16/9] overflow-hidden">
                            {post.image && (
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                              />
                            )}
                            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${config.badge}`}>
                              {post.category}
                            </span>
                          </div>
                          <div className="p-5 flex flex-col flex-grow">
                            <div className="text-xs text-stone-400 mb-2">{post.date} &middot; {post.readTime}</div>
                            <h3 className="font-bold text-stone-900 mb-2 group-hover:text-stone-600 transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </h3>
                            <p className="text-sm text-stone-500 line-clamp-2 flex-grow">{post.excerpt}</p>
                          </div>
                        </article>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Latest Articles — Staggered Grid ─── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="mb-10">
              <p className="overline mb-3">Fresh Content</p>
              <h2 className="text-3xl md:text-4xl text-stone-900">Latest Articles</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post, i) => {
              const config = categoryConfig[post.category as CategoryKey];
              const isFirst = i === 0;
              return (
                <ScrollReveal key={post.slug} delay={i * 0.05} className={isFirst ? 'md:col-span-2 lg:col-span-2' : ''}>
                  <Link href={`/${post.category}/${post.slug}`} className="group block h-full">
                    <article className={`rounded-2xl overflow-hidden bg-white border border-stone-100 h-full transition-all duration-300 hover:shadow-lg ${config.hoverGlow} ${isFirst ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}>
                      <div className={`relative overflow-hidden bg-stone-100 ${isFirst ? 'md:w-1/2 aspect-[16/10] md:aspect-auto' : 'aspect-[16/10]'}`}>
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes={isFirst ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                          />
                        )}
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${config.badge}`}>
                          {post.category}
                        </span>
                      </div>
                      <div className={`p-6 flex flex-col flex-grow ${isFirst ? 'md:w-1/2 justify-center' : ''}`}>
                        <div className="text-xs text-stone-400 mb-3">{post.date} &middot; {post.readTime}</div>
                        <h3 className={`font-bold text-stone-900 mb-3 group-hover:text-stone-600 transition-colors leading-snug ${isFirst ? 'text-xl md:text-2xl' : 'line-clamp-2'}`}>
                          {post.title}
                        </h3>
                        <p className={`text-sm text-stone-500 leading-relaxed ${isFirst ? 'line-clamp-4' : 'line-clamp-2'} flex-grow`}>{post.excerpt}</p>
                        <div className={`flex items-center gap-1.5 text-sm font-semibold mt-4 pt-4 border-t border-stone-100 ${config.accentText}`}>
                          Read article
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <ScrollReveal>
        <div className="max-w-6xl mx-auto px-4">
          <NewsletterCTA />
        </div>
      </ScrollReveal>

      {/* ─── Browse All ─── */}
      <section id="articles" className="py-20 px-4 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="overline mb-3">Library</p>
              <h2 className="text-3xl md:text-4xl text-stone-900">Browse All Articles</h2>
            </div>
          </ScrollReveal>

          <div className="flex justify-center gap-2 flex-wrap mb-10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const config = cat !== 'all' ? categoryConfig[cat] : null;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 capitalize border
                    ${isActive
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                      : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-800'}`}
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
                    className={`group rounded-2xl overflow-hidden bg-white border border-stone-100 transition-all duration-300 flex flex-col hover:shadow-lg ${config.hoverGlow}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center">
                            <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${config.badge}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs text-stone-400 mb-2">{post.date} &middot; {post.readTime}</div>
                      <h3 className="font-bold text-stone-900 mb-2 group-hover:text-stone-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-stone-500 line-clamp-2 flex-grow">{post.excerpt}</p>
                      <div className={`flex items-center gap-1.5 text-sm font-semibold mt-3 pt-3 border-t border-stone-100 ${config.accentText}`}>
                        Read article
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-400">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p>No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
