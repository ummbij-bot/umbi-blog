import BlogCard from '@/components/blog/BlogCard';
import { getPostsByCategory } from '@/lib/posts';

export const metadata = {
  title: 'Tech & Productivity - Umbi',
  description: 'Stay ahead with the latest technology trends, tools, and productivity hacks.',
};

export default function TechPage() {
  const posts = getPostsByCategory('tech');

  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Tech & Productivity
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Stay ahead with the latest technology trends, tools, and productivity hacks for modern life.
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
                category="Tech"
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}