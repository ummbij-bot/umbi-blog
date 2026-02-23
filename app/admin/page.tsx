'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPostsFromDB, getPostStats, getAllViewCounts } from '@/lib/firestore-posts';
import { posts as staticPosts } from '@/lib/posts';
import { createPost } from '@/lib/firestore-posts';

export default function AdminDashboard() {
  const [stats, setStats] = useState<{ total: number; byCategory: Record<string, number>; totalViews: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [migrationResult, setMigrationResult] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'checking' | 'firestore' | 'static'>('checking');

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const firestoreStats = await getPostStats();
      if (firestoreStats.total > 0) {
        setStats(firestoreStats);
        setDataSource('firestore');
      } else {
        // Fallback to static data
        const byCategory: Record<string, number> = {};
        staticPosts.forEach(p => {
          byCategory[p.category] = (byCategory[p.category] || 0) + 1;
        });
        setStats({ total: staticPosts.length, byCategory, totalViews: 0 });
        setDataSource('static');
      }
    } catch {
      // Firestore not available, use static
      const byCategory: Record<string, number> = {};
      staticPosts.forEach(p => {
        byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      });
      setStats({ total: staticPosts.length, byCategory, totalViews: 0 });
      setDataSource('static');
    }
    setLoading(false);
  }

  async function handleMigrate() {
    setMigrating(true);
    setMigrationResult(null);
    let success = 0;
    let failed = 0;

    for (const post of staticPosts) {
      try {
        await createPost(post);
        success++;
      } catch (err) {
        console.error(`Failed to migrate: ${post.slug}`, err);
        failed++;
      }
    }

    setMigrationResult(`Migration complete: ${success} posts migrated, ${failed} failed`);
    setMigrating(false);
    // Reload stats
    loadStats();
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-stone-800 rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-stone-800 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!stats) return <p className="text-stone-400">Failed to load stats</p>;

  const categoryCards = [
    { label: 'Finance', count: stats.byCategory['finance'] || 0, gradient: 'from-emerald-600 to-emerald-800' },
    { label: 'Tech', count: stats.byCategory['tech'] || 0, gradient: 'from-blue-600 to-blue-800' },
    { label: 'Wellness', count: stats.byCategory['wellness'] || 0, gradient: 'from-purple-600 to-purple-800' },
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
          <p className="text-4xl font-bold text-stone-100 mt-2">{stats.total}</p>
          <p className="text-stone-500 text-xs mt-1">{stats.totalViews} total views</p>
        </div>
        {categoryCards.map(cat => (
          <div key={cat.label} className={`bg-gradient-to-br ${cat.gradient} rounded-xl p-6`}>
            <p className="text-white/70 text-sm">{cat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{cat.count}</p>
            <p className="text-white/50 text-xs mt-1">posts</p>
          </div>
        ))}
      </div>

      {/* System Status & Migration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
          <h2 className="text-lg font-semibold text-stone-100 mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-sm">Data Source</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                dataSource === 'firestore'
                  ? 'bg-emerald-600/20 text-emerald-400'
                  : 'bg-amber-600/20 text-amber-400'
              }`}>
                {dataSource === 'firestore' ? 'Firebase Firestore' : 'Static Files'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-sm">Firebase Auth</span>
              <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded-full">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-sm">Search</span>
              <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded-full">Active</span>
            </div>
          </div>

          {dataSource === 'static' && (
            <div className="mt-4 p-4 bg-amber-900/20 border border-amber-800/50 rounded-lg">
              <p className="text-amber-200 text-sm font-medium mb-2">Posts are in static files</p>
              <p className="text-stone-400 text-xs mb-3">
                Migrate your {staticPosts.length} posts to Firestore to enable full CRUD, real-time editing, and view tracking.
              </p>
              <button
                onClick={handleMigrate}
                disabled={migrating}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {migrating ? 'Migrating...' : `Migrate ${staticPosts.length} Posts to Firestore`}
              </button>
              {migrationResult && (
                <p className="text-emerald-400 text-xs mt-2">{migrationResult}</p>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
          <h2 className="text-lg font-semibold text-stone-100 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/posts/new" className="p-4 bg-stone-700/50 hover:bg-stone-700 rounded-lg transition-colors text-center">
              <span className="text-2xl">✏️</span>
              <p className="text-stone-200 text-sm mt-2">New Post</p>
            </Link>
            <Link href="/admin/posts" className="p-4 bg-stone-700/50 hover:bg-stone-700 rounded-lg transition-colors text-center">
              <span className="text-2xl">📚</span>
              <p className="text-stone-200 text-sm mt-2">All Posts</p>
            </Link>
            <Link href="/" className="p-4 bg-stone-700/50 hover:bg-stone-700 rounded-lg transition-colors text-center">
              <span className="text-2xl">🌐</span>
              <p className="text-stone-200 text-sm mt-2">View Site</p>
            </Link>
            <a href="https://console.firebase.google.com" target="_blank" rel="noopener" className="p-4 bg-stone-700/50 hover:bg-stone-700 rounded-lg transition-colors text-center">
              <span className="text-2xl">🔥</span>
              <p className="text-stone-200 text-sm mt-2">Firebase Console</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
