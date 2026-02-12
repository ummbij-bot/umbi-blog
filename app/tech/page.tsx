import BlogCard from '@/components/blog/BlogCard';
import { getPostsByCategory } from '@/lib/posts';
import { FiCpu, FiActivity, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Tech & Productivity - Umbi',
  description: 'Stay ahead with the latest technology trends, AI tools, productivity hacks, remote work setups, and software reviews. Expert guides for modern professionals.',
  alternates: {
    canonical: 'https://umbi-blog.vercel.app/tech',
  },
  openGraph: {
    title: 'Tech & Productivity - Umbi',
    description: 'Stay ahead with the latest technology trends, tools, and productivity hacks.',
    url: 'https://umbi-blog.vercel.app/tech',
    type: 'website',
  },
};

export default function TechPage() {
  const posts = getPostsByCategory('tech');

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tech & Productivity Articles',
    description: 'Stay ahead with the latest technology trends, tools, and productivity hacks.',
    url: 'https://umbi-blog.vercel.app/tech',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://umbi-blog.vercel.app/tech/${post.slug}`,
        name: post.title,
      })),
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Umbi',
      url: 'https://umbi-blog.vercel.app',
    },
  };

  return (
    <>
    <Script id="collection-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    <div style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4 text-blue-200">
            <FiCpu size={32} />
            <span className="font-bold text-lg tracking-wider uppercase">Category</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Tech & Productivity
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mb-6">
            Stay ahead with the latest technology trends, tools, and productivity hacks for modern life.
          </p>
          <div className="text-white/80 max-w-3xl space-y-3 text-base leading-relaxed">
            <p>
              Welcome to Umbi&apos;s Tech &amp; Productivity hub — your go-to destination for navigating the rapidly evolving world of technology. From the latest AI tools reshaping how we work to essential cybersecurity practices that keep your data safe, we break down complex tech topics into clear, actionable guides that anyone can follow.
            </p>
            <p>
              Our technology coverage spans a wide range of topics: artificial intelligence and machine learning applications, productivity software reviews and comparisons, remote work setup optimization, coding and development resources, cloud computing essentials, smartphone and gadget recommendations, and digital privacy best practices. We test and evaluate every tool we recommend, providing honest assessments backed by hands-on experience and real-world benchmarks.
            </p>
            <p>
              Whether you&apos;re a seasoned developer looking for the next great tool or a non-technical professional wanting to boost your productivity, our articles are written to meet you where you are. We focus on practical value — not just features, but how technology can genuinely improve your daily workflow and long-term career growth.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          {/* Tools 섹션 헤더 */}
          <h2
            className="text-2xl font-bold mb-6 flex items-center gap-2"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-neutral-900)',
            }}
          >
            <FiActivity className="text-blue-600" /> Useful Tools
          </h2>

          {/* AI Tech Advisor 배너 */}
          <div className="mb-20">
            
             
            <Link href="/tech/tools/ai-advisor" className="block group bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-3">
                    NEW! AI POWERED
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    AI Tech Advisor
                  </h3>
                  <p className="text-neutral-600">
                    Get expert advice on productivity tools, automation, cybersecurity, and tech solutions. Free, instant guidance.
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <div className="btn-primary inline-flex items-center gap-2 bg-blue-600 group-hover:bg-blue-700 w-full md:w-auto justify-center px-6 py-3 rounded-xl text-white font-bold">
                    Get Tech Advice <FiArrowRight />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Latest Articles */}
          <div className="mb-8">
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-neutral-900)',
              }}
            >
              Latest Articles
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard 
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  category="Tech"
                  slug={post.slug}
                  image={post.image} 
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center rounded-2xl bg-white border border-dashed border-slate-300">
              <p className="text-lg text-slate-500">No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
}
