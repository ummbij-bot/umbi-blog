import { posts } from '@/lib/posts';

export async function GET() {
  return Response.json({
    total: posts.length,
    finance: posts.filter(p => p.category === 'finance').length,
    tech: posts.filter(p => p.category === 'tech').length,
    wellness: posts.filter(p => p.category === 'wellness').length,
  });
}
