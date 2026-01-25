import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // 모든 검색엔진 로봇 허용
      allow: '/',     // 모든 페이지 긁어가도 됨
    },
    // 👇 사이트맵 위치를 알려줍니다
    sitemap: 'https://umbi-blog.vercel.app/sitemap.xml',
  };
}