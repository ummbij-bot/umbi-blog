import { notFound } from 'next/navigation';
import { getPostBySlug, posts } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image'; // 이미지 컴포넌트 추가
import { FiArrowLeft, FiClock, FiUser, FiCalendar } from 'react-icons/fi';

export async function generateStaticParams() {
  return posts
    .filter(post => post.category === 'finance')
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug('finance', resolvedParams.slug);
  
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

export default async function FinancePost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug('finance', resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
      <div className="py-8" style={{ backgroundColor: 'white', borderBottom: '1px solid var(--color-neutral-200)' }}>
        <div className="container-custom max-w-4xl">
          <Link 
            href="/finance" 
            className="inline-flex items-center gap-2 mb-8 font-medium transition-colors hover:underline"
            style={{ color: 'var(--color-primary-600)' }}
          >
            <FiArrowLeft /> Back to Finance
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm mb-8" style={{ color: 'var(--color-neutral-600)' }}>
            <div className="flex items-center gap-2">
              <FiUser className="text-lg" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-lg" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-lg" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* [NEW] 대표 이미지 추가 영역 */}
          {post.image && (
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg mb-4">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>

      <div className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12" style={{ boxShadow: 'var(--shadow-soft)' }}>
            {/* 수동 마크다운 렌더링 로직 (그대로 유지) */}
            <div style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8', fontSize: '1.125rem' }} dangerouslySetInnerHTML={{ 
              __html: post.content.split('\n').map(line => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('# ')) {
                  return `<h1 style="font-family: var(--font-display); color: var(--color-neutral-900); font-size: 2.25rem; font-weight: 800; margin: 2.5rem 0 1.5rem; letter-spacing: -0.025em;">${trimmedLine.substring(2)}</h1>`;
                } else if (trimmedLine.startsWith('## ')) {
                  return `<h2 style="font-family: var(--font-display); color: var(--color-neutral-900); font-size: 1.75rem; font-weight: 700; margin: 2rem 0 1rem; border-bottom: 1px solid #e5e5e5; padding-bottom: 0.5rem;">${trimmedLine.substring(3)}</h2>`;
                } else if (trimmedLine.startsWith('### ')) {
                  return `<h3 style="font-family: var(--font-display); color: var(--color-neutral-800); font-size: 1.35rem; font-weight: 600; margin: 1.5rem 0 0.75rem;">${trimmedLine.substring(4)}</h3>`;
                } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                  return `<p style="font-weight: 700; color: var(--color-neutral-900); margin: 1rem 0;">${trimmedLine.substring(2, trimmedLine.length - 2)}</p>`;
                } else if (trimmedLine.startsWith('- ')) {
                  return `<li style="margin: 0.5rem 0 0.5rem 1.5rem; list-style-type: disc;">${trimmedLine.substring(2)}</li>`;
                } else if (trimmedLine === '') {
                  return '<div style="height: 1rem;"></div>'; // 빈 줄 처리 개선
                } else {
                  return `<p style="margin-bottom: 1.25rem;">${line}</p>`;
                }
              }).join('') 
            }} />
          </div>

          <div className="mt-12 text-center">
            <Link href="/finance" className="btn-primary inline-flex items-center gap-2">
              <FiArrowLeft /> Back to List
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}