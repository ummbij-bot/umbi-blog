import BlogCard from '@/components/blog/BlogCard';

export const metadata = {
  title: 'Health & Wellness - Umbi',
  description: 'Achieve optimal health with tips on fitness, nutrition, mental wellness, and lifestyle.',
};

export default function WellnessPage() {
  const posts = [
    {
      title: '7-Day Meal Prep Guide for Busy Professionals',
      excerpt: 'Simplify your week with healthy, delicious meals that you can prepare in advance.',
      date: 'Jan 23, 2026',
      category: 'Wellness',
      slug: '7-day-meal-prep-guide',
    },
    {
      title: '15-Minute Morning Workout Routine for Beginners',
      excerpt: 'Start your day right with this simple yet effective workout routine that requires no equipment.',
      date: 'Jan 21, 2026',
      category: 'Wellness',
      slug: '15-minute-morning-workout',
    },
    {
      title: 'The Science of Better Sleep: 10 Evidence-Based Tips',
      excerpt: 'Improve your sleep quality with scientifically proven strategies for deeper, more restorative rest.',
      date: 'Jan 17, 2026',
      category: 'Wellness',
      slug: 'science-of-better-sleep',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
        <div className="container-custom">
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