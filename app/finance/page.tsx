import BlogCard from '@/components/blog/BlogCard';
import { getPostsByCategory } from '@/lib/posts';

export const metadata = {
  title: 'Personal Finance - Umbi',
  description: 'Expert advice on budgeting, investing, saving, and building wealth.',
};

export default function FinancePage() {
  const posts = getPostsByCategory('finance');

  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Personal Finance
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Master your money with expert advice on budgeting, investing, and building wealth.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard 
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category="Finance"
                slug={post.slug}
                image={post.image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}