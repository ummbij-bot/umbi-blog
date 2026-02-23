import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin-auth';
import { posts } from '@/lib/posts';

export async function GET() {
  const isAuth = await requireAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = {
    totalPosts: posts.length,
    byCategory: {
      finance: posts.filter(p => p.category === 'finance').length,
      tech: posts.filter(p => p.category === 'tech').length,
      wellness: posts.filter(p => p.category === 'wellness').length,
    },
    authors: [...new Set(posts.map(p => p.author))],
    recentPosts: posts.slice(0, 5).map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: p.date,
    })),
    supabaseConfigured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  };

  return NextResponse.json(stats);
}
