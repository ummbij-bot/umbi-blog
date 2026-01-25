import { notFound } from 'next/navigation';
import { getPostBySlug, posts } from '@/lib/posts';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiUser, FiCalendar } from 'react-icons/fi';

export async function generateStaticParams() {
  return posts
    .filter(post => post.category === 'wellness')
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug('wellness', resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Umbi`,
    description: post.excerpt,
  };
}

export default async function WellnessPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug('wellness', resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <div className="py-8" style={{ backgroundColor: 'white', borderBottom: '1px solid var(--color-neutral-200)' }}>
        <div className="container-custom max-w-4xl">
          <Link 
            href="/wellness" 
            className="inline-flex items-center gap-2 mb-6 font-medium"
            style={{ color: 'var(--color-primary-600)' }}
          >
            <FiArrowLeft /> Back to Wellness
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: 'var(--color-neutral-600)' }}>
            <div className="flex items-center gap-2">
              <FiUser />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8', fontSize: '1.125rem' }} dangerouslySetInnerHTML={{ 
              __html: post.content.split('\n').map(line => {
                if (line.startsWith('# ')) {
                  return `<h1 style="font-family: var(--font-display); color: var(--color-neutral-900); font-size: 2.5rem; font-weight: 700; margin: 2rem 0 1rem;">${line.substring(2)}</h1>`;
                } else if (line.startsWith('## ')) {
                  return `<h2 style="font-family: var(--font-display); color: var(--color-neutral-900); font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem;">${line.substring(3)}</h2>`;
                } else if (line.startsWith('### ')) {
                  return `<h3 style="font-family: var(--font-display); color: var(--color-neutral-800); font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 0.75rem;">${line.substring(4)}</h3>`;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return `<p style="font-weight: 700; color: var(--color-neutral-900); margin: 1rem 0;">${line.substring(2, line.length - 2)}</p>`;
                } else if (line.startsWith('- ')) {
                  return `<li style="margin: 0.5rem 0 0.5rem 1.5rem;">${line.substring(2)}</li>`;
                } else if (line.trim() === '') {
                  return '<br>';
                } else {
                  return `<p style="margin: 1rem 0;">${line}</p>`;
                }
              }).join('') 
            }} />
          </div>

          <div className="mt-12 text-center">
            <Link href="/wellness" className="btn-primary inline-block">
              Read More Wellness Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}