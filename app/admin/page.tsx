'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  totalPosts: number;
  byCategory: { finance: number; tech: number; wellness: number };
  authors: string[];
  recentPosts: { slug: string; title: string; category: string; date: string }[];
  supabaseConfigured: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-stone-800 rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-stone-800 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!stats) return <p className="text-stone-400">Failed to load stats</p>;

  const categoryCards = [
    { label: 'Finance', count: stats.byCategory.finance, color: 'emerald', gradient: 'from-emerald-600 to-emerald-800' },
    { label: 'Tech', count: stats.byCategory.tech, color: 'blue', gradient: 'from-blue-600 to-blue-800' },
    { label: 'Wellness', count: stats.byCategory.wellness, color: 'purple', gradient: 'from-purple-600 to-purple-800' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-100">Dashboard</h1>
        <Link href="/admin/posts/new" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors">
          + New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
          <p className="text-stone-400 text-sm">Total Posts</p>
          <p className="text-4xl font-bold text-stone-100 mt-2">{stats.totalPosts}</p>
          <p className="text-stone-500 text-xs mt-1">{stats.authors.length} authors</p>
        </div>
        {categoryCards.map(cat => (
          <div key={cat.label} className={`bg-gradient-to-br ${cat.gradient} rounded-xl p-6`}>
            <p className="text-white/70 text-sm">{cat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{cat.count}</p>
            <p className="text-white/50 text-xs mt-1">posts</p>
          </div>
        ))}
      </div>

      {/* Status & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
          <h2 className="text-lg font-semibold text-stone-100 mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-sm">Data Source</span>
              <span className="px-2 py-1 bg-amber-600/20 text-amber-400 text-xs rounded-full">Static Files</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-sm">Supabase</span>
              <span className={`px-2 py-1 text-xs rounded-full ${stats.supabaseConfigured ? 'bg-emerald-600/20 text-emerald-400' : 'bg-stone-700 text-stone-500'}`}>
                {stats.supabaseConfigured ? 'Connected' : 'Not Configured'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-sm">Search</span>
              <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded-full">Active</span>
            </div>
          </div>
          {!stats.supabaseConfigured && (
            <div className="mt-4 p-3 bg-stone-700/50 rounded-lg">
              <p className="text-stone-400 text-xs">
                Connect Supabase to enable full CRUD operations, real-time analytics, and database-backed content management.
              </p>
            </div>
          )}
        </div>

        {/* Recent Posts */}
        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-stone-100">Recent Posts</h2>
            <Link href="/admin/posts" className="text-emerald-400 text-sm hover:text-emerald-300">View all</Link>
          </div>
          <div className="space-y-3">
            {stats.recentPosts.map(post => (
              <Link key={post.slug} href={`/admin/posts/${post.slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-700/50 transition-colors group">
                <div className="min-w-0">
                  <p className="text-stone-200 text-sm truncate group-hover:text-emerald-400 transition-colors">{post.title}</p>
                  <p className="text-stone-500 text-xs mt-0.5">{post.date}</p>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded-full shrink-0 ml-3 ${
                  post.category === 'finance' ? 'bg-emerald-600/20 text-emerald-400' :
                  post.category === 'tech' ? 'bg-blue-600/20 text-blue-400' :
                  'bg-purple-600/20 text-purple-400'
                }`}>
                  {post.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
