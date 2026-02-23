'use client';

import { useState } from 'react';

export default function NewPostPage() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'finance' as 'finance' | 'tech' | 'wellness',
    author: 'Umbi Team',
    readTime: '',
    image: '',
  });
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'error' | 'info'>('idle');
  const [message, setMessage] = useState('');

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
    if (!form.title || !form.content || !form.excerpt) {
      setStatus('error');
      setMessage('Title, excerpt, and content are required');
      return;
    }
    setStatus('saving');
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('info');
        setMessage('Post saved successfully!');
      } else {
        setStatus('info');
        setMessage(data.message || 'Failed to save post');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-100">New Post</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-stone-800 border border-stone-700 text-stone-300 text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors">
            {showPreview ? 'Editor' : 'Preview'}
          </button>
          <button onClick={handleSave} disabled={status === 'saving'}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-700 text-white text-sm font-medium rounded-lg transition-colors">
            {status === 'saving' ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm ${status === 'error' ? 'bg-red-600/20 text-red-400' : 'bg-blue-600/20 text-blue-400'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className={`${showPreview ? 'hidden lg:block' : ''} lg:col-span-2 space-y-4`}>
          <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)}
            placeholder="Post title" className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-lg font-semibold placeholder-stone-500 focus:outline-none focus:border-emerald-500" />

          <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
            placeholder="post-slug" className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-400 text-sm font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500" />

          <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
            placeholder="Write a brief excerpt..." rows={2}
            className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-200 text-sm placeholder-stone-500 focus:outline-none focus:border-emerald-500 resize-none" />

          <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            placeholder="Write your post in Markdown..." rows={20}
            className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-200 text-sm font-mono placeholder-stone-500 focus:outline-none focus:border-emerald-500 resize-y leading-relaxed" />
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-2 bg-stone-800 border border-stone-700 rounded-lg p-6 prose prose-invert prose-sm max-w-none">
            <h1>{form.title || 'Untitled'}</h1>
            <p className="text-stone-400">{form.excerpt}</p>
            <hr />
            <div className="whitespace-pre-wrap">{form.content || 'Start writing...'}</div>
          </div>
        )}

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-stone-800 border border-stone-700 rounded-lg p-4 space-y-4">
            <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider">Settings</h3>

            <div>
              <label className="text-stone-400 text-xs mb-1 block">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as typeof form.category }))}
                className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-200 text-sm focus:outline-none focus:border-emerald-500">
                <option value="finance">Finance</option>
                <option value="tech">Tech</option>
                <option value="wellness">Wellness</option>
              </select>
            </div>

            <div>
              <label className="text-stone-400 text-xs mb-1 block">Author</label>
              <input type="text" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-200 text-sm focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label className="text-stone-400 text-xs mb-1 block">Read Time</label>
              <input type="text" value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))}
                placeholder="8 min read" className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-200 text-sm placeholder-stone-500 focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label className="text-stone-400 text-xs mb-1 block">Cover Image URL</label>
              <input type="text" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                placeholder="https://..." className="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-200 text-sm placeholder-stone-500 focus:outline-none focus:border-emerald-500" />
              {form.image && (
                <img src={form.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
