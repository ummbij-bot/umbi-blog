'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
}

export default function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`/api/admin/posts/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setPost(null);
        } else {
          setPost(data);
          setForm(data);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-stone-800 rounded w-64" />
        <div className="h-64 bg-stone-800 rounded-xl" />
      </div>
    );
  }

  if (!post || !form) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-400">Post not found</p>
        <Link href="/admin/posts" className="text-emerald-400 text-sm mt-2 inline-block">Back to posts</Link>
      </div>
    );
  }

  const categoryBadge: Record<string, string> = {
    finance: 'bg-emerald-600/20 text-emerald-400',
    tech: 'bg-blue-600/20 text-blue-400',
    wellness: 'bg-purple-600/20 text-purple-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className="text-stone-400 hover:text-stone-200 transition-colors">
            &larr; Back
          </Link>
          <h1 className="text-xl font-bold text-stone-100 truncate max-w-lg">{post.title}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/${post.category}/${post.slug}`} target="_blank"
            className="px-3 py-2 bg-stone-800 border border-stone-700 text-stone-300 text-sm rounded-lg hover:bg-stone-700 transition-colors">
            View Live
          </Link>
          <button onClick={() => setEditing(!editing)}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg transition-colors">
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Post Meta */}
      <div className="bg-stone-800 rounded-xl border border-stone-700 p-6">
        <div className="flex flex-wrap gap-4 items-center text-sm">
          <span className={`px-2 py-0.5 rounded-full ${categoryBadge[post.category] || ''}`}>{post.category}</span>
          <span className="text-stone-400">{post.author}</span>
          <span className="text-stone-500">{post.date}</span>
          <span className="text-stone-500">{post.readTime}</span>
        </div>

        {post.image && (
          <img src={post.image} alt={post.title} className="mt-4 w-full h-48 object-cover rounded-lg" />
        )}

        <div className="mt-4">
          <h3 className="text-stone-400 text-xs uppercase tracking-wider mb-1">Excerpt</h3>
          {editing ? (
            <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })}
              rows={2} className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-200 text-sm resize-none focus:outline-none focus:border-emerald-500" />
          ) : (
            <p className="text-stone-300 text-sm">{post.excerpt}</p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-stone-400 text-xs uppercase tracking-wider mb-1">Content ({post.content.length.toLocaleString()} chars)</h3>
          {editing ? (
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
              rows={20} className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-200 text-sm font-mono resize-y focus:outline-none focus:border-emerald-500 leading-relaxed" />
          ) : (
            <div className="bg-stone-900 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-stone-300 text-sm font-mono whitespace-pre-wrap">{post.content.slice(0, 3000)}{post.content.length > 3000 ? '\n\n... (truncated)' : ''}</pre>
            </div>
          )}
        </div>

        {editing && (
          <div className="mt-4 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <p className="text-blue-400 text-xs">
              Full editing requires Supabase configuration. Currently viewing posts in read-only mode from static files.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
