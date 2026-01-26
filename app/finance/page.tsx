import { getPostsByCategory } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';
import { FiDollarSign, FiActivity, FiArrowRight } from 'react-icons/fi';

// Next.js App Router 캐싱 설정 (ISR/SSG 옵션에 따라 조정 가능)
export const revalidate = 0;

export const metadata = {
  title: 'Personal Finance - Umbi',
  description:
    'Expert advice on budgeting, investing, saving, and building wealth.',
};

export default function FinancePage() {
  const posts = getPostsByCategory('finance');

  return (
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
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Master your money with expert advice on budgeting, investing, and
            building wealth.
          </p>
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
  );
}