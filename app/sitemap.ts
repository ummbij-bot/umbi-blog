import { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 기본 도메인 주소 (나중에 실제 도메인 사면 여기만 바꾸면 됩니다)
  // 지금은 Vercel 배포 주소를 넣거나, 없으면 예시 주소를 둡니다.
const baseUrl = 'https://umbi-blog.vercel.app';
  // 2. 고정 페이지들 (Home, About, 카테고리)
  const routes = [
    '',
    '/about',
    '/finance',
    '/finance/tools/calculator',
    '/tech',
    '/wellness',
    '/wellness/tools/bmi-calculator',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // 3. 블로그 글 페이지들 (자동 생성)
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  return [...routes, ...blogPosts];
}
