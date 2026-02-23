import { NextRequest, NextResponse } from 'next/server';
import { posts } from '@/lib/posts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters' }, { status: 400 });
  }

  let results = posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.content.toLowerCase().includes(q)
  );

  if (category && category !== 'all') {
    results = results.filter(p => p.category === category);
  }

  return NextResponse.json({
    results: results.slice(0, limit).map(p => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      image: p.image,
      date: p.date,
      readTime: p.readTime,
    })),
    total: results.length,
    query: q,
  });
}
