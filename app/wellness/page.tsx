import { getPostsByCategory } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';
import { FiHeart, FiActivity, FiArrowRight } from 'react-icons/fi';

export const revalidate = 0;

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
      {/* 1. 헤더 섹션 */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #a855f7, #9333ea)' }}
      >
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4 text-purple-100">
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
          <p className="text-xl text-white opacity-90 max-w-2xl mb-6">
            Achieve optimal health with tips on fitness, nutrition, mental
            wellness, and lifestyle.
          </p>
          <div className="text-white/80 max-w-3xl space-y-3 text-base leading-relaxed">
            <p>
              Welcome to Umbi&apos;s Health &amp; Wellness hub — your trusted companion on the journey to a healthier, happier life. We believe that wellness is not just about the absence of illness, but about building sustainable habits that nourish your body, mind, and spirit every single day.
            </p>
            <p>
              Our wellness content covers a broad spectrum of topics designed to support your overall well-being: evidence-based fitness routines for every level, from beginner bodyweight workouts to advanced training splits; nutrition guides including meal prep strategies, macronutrient breakdowns, and seasonal eating plans; sleep science and optimization techniques backed by clinical research; stress management and mindfulness practices; and mental health awareness resources.
            </p>
            <p>
              Each article is informed by contributors with credentials in sports medicine, nutrition science, and certified personal training (NASM). We reference peer-reviewed studies and clinical guidelines wherever possible. However, our content is for educational purposes only and should never replace professional medical advice. Always consult your healthcare provider before making significant changes to your diet or exercise routine.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 메인 콘텐츠 */}
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
            <FiActivity className="text-purple-600" /> Useful Tools
          </h2>

          {/* BMI Calculator 배너 */}
          <div className="mb-6">
            <Link href="/wellness/tools/bmi-calculator" className="block group">
              <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-3">
                    POPULAR
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                    BMI Calculator
                  </h3>
                  <p className="text-neutral-600">
                    Are you in a healthy weight range? Use our free tool to
                    calculate your Body Mass Index (BMI) instantly.
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <span className="btn-primary inline-flex items-center gap-2 bg-purple-500 group-hover:bg-purple-600 w-full md:w-auto justify-center px-6 py-3 rounded-xl text-white font-bold">
                    Check My BMI <FiArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* AI Wellness Coach 배너 */}
          <div className="mb-20">
            <Link href="/wellness/tools/ai-coach" className="block group">
              <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-3">
                    NEW! AI POWERED
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                    AI Wellness Coach
                  </h3>
                  <p className="text-neutral-600">
                    Get compassionate guidance on stress management, mindfulness, and mental wellbeing. Free, instant support.
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <span className="btn-primary inline-flex items-center gap-2 bg-purple-600 group-hover:bg-purple-700 w-full md:w-auto justify-center px-6 py-3 rounded-xl text-white font-bold">
                    Talk to Coach <FiArrowRight />
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
