'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/firestore-posts';

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '# Title\n\nStart writing your post here...',
    category: 'finance' as 'finance' | 'tech' | 'wellness',
    author: 'Umbi Team',
    readTime: '',
    image: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function generateSlug(title: string) {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  function handleTitleChange(title: string) {
    setForm(f => ({ ...f, title, slug: generateSlug(title) }));
  }

  async function handleSave() {
    if (!form.title || !form.slug || !form.content) {
      setError('Title, slug, and content are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await createPost({
        ...form,
        date: new Date().toISOString().split('T')[0],
        readTime: form.readTime || `${Math.ceil(form.content.split(' ').length / 200)} min read`,
      });
      router.push('/admin/posts');
    } catch (err) {
      setError('Failed to save post. Make sure Firestore is configured.');
      console.error(err);
    }
    setSaving(false);
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-100">New Post</h1>
        <div className="flex gap-3">
          <button onClick={() => router.back()} className="px-4 py-2 text-stone-400 hover:text-stone-100 text-sm transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {saving ? 'Saving...' : 'Publish to Firestore'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-4">
          <input
            type="text"
            placeholder="Post title..."
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-lg font-medium"
          />
          <input
            type="text"
            placeholder="excerpt..."
            value={form.excerpt}
            onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
            className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm"
          />
          <textarea
            placeholder="Write markdown content here..."
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            rows={24}
            className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm font-mono resize-y"
          />
        </div>

        {/* Sidebar settings */}
        <div className="space-y-4">
          <div className="bg-stone-800 border border-stone-700 rounded-xl p-4 space-y-4">
            <h3 className="text-stone-100 font-medium text-sm">Post Settings</h3>

            <div>
              <label className="text-stone-400 text-xs mb-1 block">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-stone-400 text-xs mb-1 block">Category</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as 'finance' | 'tech' | 'wellness' }))}
                className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-100 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="finance">Finance</option>
                <option value="tech">Tech</option>
                <option value="wellness">Wellness</option>
              </select>
            </div>

            <div>
              <label className="text-stone-400 text-xs mb-1 block">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-stone-400 text-xs mb-1 block">Read Time (auto if blank)</label>
              <input
                type="text"
                placeholder="e.g. 8 min read"
                value={form.readTime}
                onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))}
                className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-stone-400 text-xs mb-1 block">Cover Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={form.image}
                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-100 text-sm focus:outline-none focus:border-emerald-500"
              />
              {form.image && (
                <img src={form.image} alt="preview" className="mt-2 w-full h-24 object-cover rounded-lg" />
              )}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-700 text-white font-medium rounded-lg transition-colors"
          >
            {saving ? 'Publishing...' : 'Publish to Firestore'}
          </button>
        </div>
      </div>
    </div>
  );
}
