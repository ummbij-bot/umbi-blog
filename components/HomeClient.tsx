'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';

interface HomeClientProps {
  initialPosts: Post[];
}

const categoryColors: Record<string, { bg: string; text: string; gradient: string }> = {
  finance: { bg: 'bg-emerald-100', text: 'text-emerald-700', gradient: 'from-emerald-500 to-emerald-700' },
  tech: { bg: 'bg-blue-100', text: 'text-blue-700', gradient: 'from-blue-500 to-blue-700' },
  wellness: { bg: 'bg-purple-100', text: 'text-purple-700', gradient: 'from-purple-500 to-purple-700' },
};

const categoryDescriptions: Record<string, { title: string; desc: string; icon: string }> = {
  finance: {
    title: 'Personal Finance',
    desc: 'Budgeting, investing, saving strategies, and wealth building guides written by certified financial experts.',
    icon: '$',
  },
  tech: {
    title: 'Tech & Productivity',
    desc: 'AI tools, software reviews, remote work setups, and productivity hacks to supercharge your workflow.',
    icon: '/',
  },
  wellness: {
    title: 'Health & Wellness',
    desc: 'Evidence-based fitness routines, nutrition plans, sleep science, and mental health resources.',
    icon: '+',
  },
};

export default function HomeClient({ initialPosts }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all'
    ? initialPosts
    : initialPosts.filter((post) => post.category === selectedCategory);

  const categories = ['all', 'finance', 'tech', 'wellness'];

  // Latest posts: sorted by date descending, take first 6
  const latestPosts = [...initialPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  // Featured posts: one from each category (longest content = most in-depth)
  const featuredPosts = (['finance', 'tech', 'wellness'] as const).map((cat) => {
    const catPosts = initialPosts.filter((p) => p.category === cat);
    return catPosts.sort((a, b) => b.content.length - a.content.length)[0];
  }).filter(Boolean);

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      {/* Hero Section */}
      <section className="relative py-20 px-4" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-white/10 text-white/90 backdrop-blur-sm">
            Finance &middot; Technology &middot; Wellness
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Your Guide to a<br />Smarter, Healthier Life
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Umbi delivers expert-written, in-depth articles on personal finance, cutting-edge technology, and evidence-based wellness. We help you make informed decisions that improve your financial health, boost your productivity, and enhance your well-being.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/finance" className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors">
              Explore Finance
            </Link>
            <Link href="/tech" className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors">
              Explore Tech
            </Link>
            <Link href="/wellness" className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors">
              Explore Wellness
            </Link>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            What We Cover
          </h2>
          <p className="text-center mb-10" style={{ color: 'var(--color-neutral-600)' }}>
            Three pillars of knowledge to help you thrive in every aspect of life
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {(['finance', 'tech', 'wellness'] as const).map((cat) => {
              const colors = categoryColors[cat];
              const info = categoryDescriptions[cat];
              return (
                <Link key={cat} href={`/${cat}`} className="group block">
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                    <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center text-2xl font-bold mb-4`}>
                      {info.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors" style={{ color: 'var(--color-neutral-900)' }}>
                      {info.title}
                    </h3>
                    <p style={{ color: 'var(--color-neutral-600)' }} className="leading-relaxed">
                      {info.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-primary-600)' }}>
                      Browse articles
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Featured / Editor's Picks */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4" style={{ backgroundColor: 'white' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              Editor&apos;s Picks
            </h2>
            <p className="mb-10" style={{ color: 'var(--color-neutral-600)' }}>
              Our most comprehensive, in-depth guides from each category
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  category={post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  slug={post.slug}
                  image={post.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                Latest Articles
              </h2>
              <p style={{ color: 'var(--color-neutral-600)' }}>
                Freshly published content across all categories
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                slug={post.slug}
                image={post.image}
                priority={index < 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Posts with Filter */}
      <section className="py-16 px-4" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            Browse All Articles
          </h2>

          <div className="flex justify-center gap-3 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all capitalize
                  ${selectedCategory === cat
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                    )}
                    <span className={`absolute top-4 left-4 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[post.category]?.bg || 'bg-white/90'} ${categoryColors[post.category]?.text || 'text-blue-600'}`}>
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mt-auto">
                      Read more
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
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
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Start Your Journey Today
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
              Whether you want to grow your wealth, master new technology, or improve your health, Umbi has the expert guidance you need. Explore our categories and find your starting point.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/about" className="px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors">
                Learn About Us
              </Link>
              <Link href="/contact" className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
