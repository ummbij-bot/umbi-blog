import BlogCard from '@/components/blog/BlogCard';

export const metadata = {
  title: 'Personal Finance - Umbi',
  description: 'Expert advice on budgeting, investing, saving, and building wealth.',
};

export default function FinancePage() {
  const posts = [
    {
      title: '10 Simple Ways to Save Money Every Month',
      excerpt: 'Discover practical strategies to cut expenses and boost your savings without sacrificing your lifestyle.',
      date: 'Jan 20, 2026',
      category: 'Finance',
      slug: '10-ways-save-money',
    },
    {
      title: 'Investing 101: A Beginner\'s Guide to the Stock Market',
      excerpt: 'Learn the fundamentals of stock market investing and how to build a diversified portfolio.',
      date: 'Jan 18, 2026',
      category: 'Finance',
      slug: 'investing-101-beginners-guide',
    },
    {
      title: 'How to Create a Budget That Actually Works',
      excerpt: 'Master the art of budgeting with these proven techniques that help you take control of your finances.',
      date: 'Jan 15, 2026',
      category: 'Finance',
      slug: 'create-budget-that-works',
    },
  ];

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
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}