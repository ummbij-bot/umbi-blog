import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin-auth';
import { posts } from '@/lib/posts';

export async function GET(request: NextRequest) {
  const isAuth = await requireAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let filtered = [...posts];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    posts: paginated.map(p => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      author: p.author,
      date: p.date,
      readTime: p.readTime,
      image: p.image,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

// POST - currently returns info about static nature
export async function POST(request: NextRequest) {
  const isAuth = await requireAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'Post creation requires Supabase configuration. Posts are currently stored as static files.',
    supabaseConfigured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  }, { status: 501 });
}
