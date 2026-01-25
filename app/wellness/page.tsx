import { getPostsByCategory } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';
import { FiHeart, FiActivity, FiArrowRight } from 'react-icons/fi';

export const metadata = {
  title: 'Health & Wellness - Umbi',
  description:
    'Achieve optimal health with tips on fitness, nutrition, mental wellness, and lifestyle.',
};

export default function WellnessPage() {
  const posts = getPostsByCategory('wellness');

  return (
    <div
      style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}
    >
      {/* 1. 헤더 섹션 (붉은색 테마) */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}
      >
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4 text-rose-100">
            <FiHeart size={32} />
            <span className="font-bold text-lg tracking-wider uppercase">
              Category
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Health & Wellness
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Achieve optimal health with tips on fitness, nutrition, mental
            wellness, and lifestyle.
          </p>
        </div>
      </section>

      {/* 2. 메인 콘텐츠 */}
      <section className="py-16">
        <div className="container-custom">
          {/* ========== [NEW] BMI 계산기 배너 ========== */}
          <div className="mb-20">
            <h2
              className="text-2xl font-bold mb-6 flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-neutral-900)',
              }}
            >
              <FiActivity className="text-rose-600" /> Useful Tools
            </h2>

            <Link href="/wellness/tools/bmi-calculator" className="block group">
              <div className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-3">
                    POPULAR
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-rose-600 transition-colors">
                    BMI Calculator
                  </h3>
                  <p className="text-neutral-600">
                    Are you in a healthy weight range? Use our free tool to
                    calculate your Body Mass Index (BMI) instantly.
                  </p>
                </div>

                <div className="w-full md:w-auto">
                  <span className="btn-primary inline-flex items-center gap-2 bg-rose-500 group-hover:bg-rose-600 w-full md:w-auto justify-center px-6 py-3 rounded-xl text-white font-bold">
                    Check My BMI <FiArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* 3. 글 목록 */}
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
                category="Wellness"
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
