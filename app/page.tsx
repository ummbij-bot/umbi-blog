import Hero from '@/components/ui/Hero';
import CategoryCard from '@/components/ui/CategoryCard';
import BlogCard from '@/components/blog/BlogCard';
import { posts } from '@/lib/posts';
import { FiDollarSign, FiCpu, FiHeart } from 'react-icons/fi';

export default function Home() {
  const recentPosts = posts.slice(0, 3);

  const categories = [
    {
      title: 'Personal Finance',
      description: 'Master your money with expert advice on budgeting, investing, saving, and building wealth.',
      href: '/finance',
      icon: <FiDollarSign />,
      color: '#10b981',
    },
    {
      title: 'Tech & Productivity',
      description: 'Stay ahead with the latest technology trends, tools, and productivity hacks for modern life.',
      href: '/tech',
      icon: <FiCpu />,
      color: '#3b82f6',
    },
    {
      title: 'Health & Wellness',
      description: 'Achieve optimal health with tips on fitness, nutrition, mental wellness, and lifestyle.',
      href: '/wellness',
      icon: <FiHeart />,
      color: '#ef4444',
    },
  ];

  return (
    <>
      <Hero />
      
      {/* 1. 카테고리 섹션 */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              Explore Our Categories
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-neutral-600)' }}>
              Discover insights tailored to your interests
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                href={category.href}
                icon={category.icon}
                color={category.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. 최신 글 섹션 */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              Latest Articles
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* index를 추가해서 첫 번째(0번) 게시물만 priority를 true로 설정 */}
            {recentPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                slug={post.slug}
                image={post.image}
                priority={index === 0} // 👈 이 부분이 LCP 경고를 해결해줍니다!
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. 뉴스레터 섹션 */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              Stay Updated
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--color-neutral-600)' }}>
              Subscribe to our newsletter for the latest articles and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl border-2 focus:outline-none focus:border-primary-500 transition-colors"
                style={{ borderColor: 'var(--color-neutral-200)' }}
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}