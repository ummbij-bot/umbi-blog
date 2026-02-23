'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
}

interface PostsResponse {
  posts: PostSummary[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminPostsPage() {
  const [data, setData] = useState<PostsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [search, category, page]);

  async function fetchPosts() {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '15' });
    if (category !== 'all') params.set('category', category);
    if (search) params.set('search', search);

    try {
      const res = await fetch(`/api/admin/posts?${params}`);
      const json = await res.json();
      setData(json);
    } catch {
      console.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'finance', label: 'Finance', color: 'emerald' },
    { value: 'tech', label: 'Tech', color: 'blue' },
    { value: 'wellness', label: 'Wellness', color: 'purple' },
  ];

  const getCategoryBadge = (cat: string) => {
    const colors: Record<string, string> = {
      finance: 'bg-emerald-600/20 text-emerald-400',
      tech: 'bg-blue-600/20 text-blue-400',
      wellness: 'bg-purple-600/20 text-purple-400',
    };
    return colors[cat] || 'bg-stone-700 text-stone-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-100">Posts</h1>
        <Link href="/admin/posts/new" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors">
          + New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search posts..."
          className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm"
        />
        <div className="flex gap-1 bg-stone-800 rounded-lg p-1 border border-stone-700">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => { setCategory(cat.value); setPage(1); }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                category === cat.value
                  ? 'bg-stone-700 text-stone-100'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-stone-800 rounded-xl border border-stone-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500 mx-auto" />
          </div>
        ) : data && data.posts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-700">
                    <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wider px-6 py-3">Title</th>
                    <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Category</th>
                    <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Author</th>
                    <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Date</th>
                    <th className="text-right text-xs font-medium text-stone-400 uppercase tracking-wider px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-700/50">
                  {data.posts.map(post => (
                    <tr key={post.slug} className="hover:bg-stone-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-stone-200 text-sm font-medium truncate max-w-xs">{post.title}</p>
                        <p className="text-stone-500 text-xs truncate max-w-xs mt-0.5 md:hidden">{post.category}</p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryBadge(post.category)}`}>
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-stone-400 text-sm">{post.author}</span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-stone-400 text-sm">{post.date}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/${post.category}/${post.slug}`} target="_blank"
                            className="px-2 py-1 text-xs text-stone-400 hover:text-stone-100 transition-colors" title="View">
                            View
                          </Link>
                          <Link href={`/admin/posts/${post.slug}`}
                            className="px-2 py-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors" title="Edit">
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-3 border-t border-stone-700">
                <span className="text-stone-500 text-sm">
                  Showing {(data.page - 1) * 15 + 1}-{Math.min(data.page * 15, data.total)} of {data.total}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-3 py-1 text-sm text-stone-400 hover:text-stone-100 disabled:text-stone-600 transition-colors">
                    Prev
                  </button>
                  <button onClick={() => setPage(p => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages}
                    className="px-3 py-1 text-sm text-stone-400 hover:text-stone-100 disabled:text-stone-600 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center text-stone-500">
            No posts found
          </div>
        )}
      </div>
    </div>
  );
}
