import { MetadataRoute } from 'next'
import { posts } from '@/lib/posts' // ✅ 저장된 글 데이터를 직접 가져옵니다

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://umbi-blog.vercel.app'

  // 1. 고정 페이지 (작성해주신 목록 그대로 유지)
  const routes = [
    '',
    '/finance',
    '/tech',
    '/wellness',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/finance/tools/calculator',
    '/wellness/tools/bmi-calculator',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.9,
  }))

  // 2. 블로그 글 목록 (✅ 여기가 핵심! 자동으로 불러오도록 변경)
  const blogPosts = posts.map((post) => ({
    // 카테고리와 슬러그를 조합해서 주소를 만듭니다
    url: `${baseUrl}/${post.category}/${post.slug}`,
    // 글 작성 날짜를 반영합니다
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 두 목록을 합쳐서 리턴
  return [...routes, ...blogPosts]
}