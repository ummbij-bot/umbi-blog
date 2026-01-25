import { posts } from '@/lib/posts'

export async function GET() {
  const baseUrl = 'https://umbi-blog.vercel.app'

  const staticPages = [
    { url: baseUrl, lastmod: new Date().toISOString(), priority: 0.8 },
    { url: `${baseUrl}/finance`, lastmod: new Date().toISOString(), priority: 0.8 },
    { url: `${baseUrl}/tech`, lastmod: new Date().toISOString(), priority: 0.8 },
    { url: `${baseUrl}/wellness`, lastmod: new Date().toISOString(), priority: 0.8 },
  ]

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/${post.category}/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    priority: 1,
  }))

  const allPages = [...staticPages, ...postPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}