import BlogCard from '@/components/blog/BlogCard';
import { getPostsByCategory } from '@/lib/posts';
import { FiHeart } from 'react-icons/fi'; // 아이콘 추가

export const metadata = {
  title: 'Health & Wellness - Umbi',
  description: 'Achieve optimal health with tips on fitness, nutrition, mental wellness, and lifestyle.',
};

export default function WellnessPage() {
  const posts = getPostsByCategory('wellness');

  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
        <div className="container-custom">
          {/* 아이콘 추가 */}
          <div className="flex items-center gap-3 mb-4 text-red-100">
             <FiHeart size={32} />
             <span className="font-bold text-lg tracking-wider uppercase">Category</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Health & Wellness
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Achieve optimal health with tips on fitness, nutrition, mental wellness, and lifestyle.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard 
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  category="Wellness"
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
  );
}