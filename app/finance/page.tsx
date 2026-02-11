import { getPostsByCategory } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';
import Script from 'next/script';
import { FiDollarSign, FiActivity, FiArrowRight } from 'react-icons/fi';
import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Personal Finance - Umbi',
  description: 'Expert advice on budgeting, investing, saving, and building wealth. Comprehensive guides on emergency funds, retirement planning, debt reduction, and smart money management.',
  alternates: {
    canonical: 'https://umbi-blog.vercel.app/finance',
  },
  openGraph: {
    title: 'Personal Finance - Umbi',
    description: 'Expert advice on budgeting, investing, saving, and building wealth.',
    url: 'https://umbi-blog.vercel.app/finance',
    type: 'website',
  },
};

export default function FinancePage() {
  const posts = getPostsByCategory('finance');

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Personal Finance Articles',
    description: 'Expert advice on budgeting, investing, saving, and building wealth.',
    url: 'https://umbi-blog.vercel.app/finance',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://umbi-blog.vercel.app/finance/${post.slug}`,
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
    <div
      style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}
    >
      {/* 1. 상단 헤더 섹션 */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
      >
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4 text-emerald-100">
            <FiDollarSign size={32} />
            <span className="font-bold text-lg tracking-wider uppercase">
              Category
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Personal Finance
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mb-6">
            Master your money with expert advice on budgeting, investing, and
            building wealth.
          </p>
          <div className="text-white/80 max-w-3xl space-y-3 text-base leading-relaxed">
            <p>
              Welcome to Umbi&apos;s Personal Finance hub — your comprehensive resource for taking control of your financial future. Whether you&apos;re just starting your financial journey or looking to optimize an existing strategy, our expert-written guides cover everything from foundational budgeting techniques to advanced investment strategies.
            </p>
            <p>
              Our finance articles are crafted by contributors with backgrounds in certified financial planning (CFP) and chartered financial analysis (CFA). We cover essential topics including emergency fund building, debt reduction strategies, retirement planning with 401(k) and IRA accounts, stock market fundamentals, real estate investing, and tax optimization. Each article includes actionable steps, real-world data, comparison tables, and links to trusted sources so you can make informed decisions with confidence.
            </p>
            <p>
              All content is for educational purposes only and should not replace professional financial advice. We recommend consulting a licensed financial advisor for personalized guidance tailored to your specific situation.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 메인 콘텐츠 섹션 */}
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
            <FiActivity className="text-emerald-600" /> Useful Tools
          </h2>

          {/* 계산기 배너 (수정됨: Link 태그 추가) */}
          <div className="mb-6">
            <Link
              href="/finance/tools/calculator"
              className="block group bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-3">
                    POPULAR
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                    Compound Interest Calculator
                  </h3>
                  <p className="text-neutral-600">
                    See how your savings can grow over time. Visualize the power
                    of compound interest with our free tool.
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <div className="btn-primary inline-flex items-center gap-2 bg-emerald-600 group-hover:bg-emerald-700 w-full md:w-auto justify-center px-6 py-3 rounded-xl text-white font-bold">
                    Try Calculator <FiArrowRight />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* AI Advisor 배너 (수정됨: Link 태그 추가) */}
          <div className="mb-20">
            <Link
              href="/finance/tools/ai-advisor"
              className="block group bg-white p-8 rounded-2xl border border-purple-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-3">
                    NEW! AI POWERED
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                    AI Financial Advisor
                  </h3>
                  <p className="text-neutral-600">
                    Get data-driven financial advice from an AI with 10+ years of wealth management experience. Free, instant analysis.
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <div className="btn-primary inline-flex items-center gap-2 bg-purple-600 group-hover:bg-purple-700 w-full md:w-auto justify-center px-6 py-3 rounded-xl text-white font-bold">
                    Get Advice <FiArrowRight />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* 3. 최신 글 목록 섹션 */}
          <div className="mb-8 flex items-center justify-between">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category="Finance"
                slug={post.slug}
                image={post.image}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}