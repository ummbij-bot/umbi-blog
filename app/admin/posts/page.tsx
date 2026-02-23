'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPostsFromDB, deletePost } from '@/lib/firestore-posts';
import { posts as staticPosts } from '@/lib/posts';
import type { Post } from '@/lib/post-types';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [source, setSource] = useState<'firestore' | 'static'>('static');

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const firestorePosts = await getAllPostsFromDB();
      if (firestorePosts.length > 0) {
        setPosts(firestorePosts);
        setSource('firestore');
      } else {
        setPosts(staticPosts);
        setSource('static');
      }
    } catch {
      setPosts(staticPosts);
      setSource('static');
    }
    setLoading(false);
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    try {
      await deletePost(slug);
      setPosts(prev => prev.filter(p => p.slug !== slug));
    } catch {
      alert('Failed to delete post. Make sure you are reading from Firestore.');
    }
    setDeletingSlug(null);
  }

  const filtered = posts.filter(p => {
    const matchCat = category === 'all' || p.category === category;
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-100">Posts</h1>
          <p className="text-stone-500 text-sm mt-1">
            {posts.length} posts · source:{' '}
            <span className={source === 'firestore' ? 'text-emerald-400' : 'text-amber-400'}>
              {source === 'firestore' ? 'Firestore' : 'Static files'}
            </span>
          </p>
        </div>
        <Link href="/admin/posts/new" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors">
          + New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-emerald-500 text-sm"
        >
          <option value="all">All Categories</option>
          <option value="finance">Finance</option>
          <option value="tech">Tech</option>
          <option value="wellness">Wellness</option>
        </select>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-20 bg-stone-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(post => (
            <div key={post.slug} className="flex items-center gap-4 p-4 bg-stone-800 border border-stone-700 rounded-xl hover:border-stone-600 transition-colors group">
              {post.image && (
                <img src={post.image} alt="" className="w-16 h-12 object-cover rounded-lg shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    post.category === 'finance' ? 'bg-emerald-600/20 text-emerald-400' :
                    post.category === 'tech' ? 'bg-blue-600/20 text-blue-400' :
                    'bg-purple-600/20 text-purple-400'
                  }`}>
                    {post.category}
                  </span>
                  <span className="text-stone-500 text-xs">{post.date}</span>
                  <span className="text-stone-600 text-xs">{post.readTime}</span>
                </div>
                <p className="text-stone-100 font-medium text-sm mt-1 truncate">{post.title}</p>
                <p className="text-stone-500 text-xs truncate">{post.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/${post.category}/${post.slug}`}
                  target="_blank"
                  className="px-3 py-1.5 text-xs text-stone-400 hover:text-stone-100 bg-stone-700 rounded-lg transition-colors"
                >
                  View
                </Link>
                <Link
                  href={`/admin/posts/${post.slug}`}
                  className="px-3 py-1.5 text-xs text-stone-400 hover:text-emerald-400 bg-stone-700 rounded-lg transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  disabled={deletingSlug === post.slug || source === 'static'}
                  title={source === 'static' ? 'Migrate to Firestore first' : 'Delete'}
                  className="px-3 py-1.5 text-xs text-stone-400 hover:text-red-400 bg-stone-700 disabled:opacity-40 rounded-lg transition-colors"
                >
                  {deletingSlug === post.slug ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-500">No posts found</div>
          )}
        </div>
      )}
    </div>
  );
}
