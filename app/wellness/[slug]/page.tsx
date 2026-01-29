import { notFound } from 'next/navigation';
import { posts } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import Comments from '@/components/Comments';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

// 1. 메타데이터 생성 (Wellness 전용)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = posts.find(
    (p) => p.slug === params.slug && p.category === 'wellness'
  );

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const url = `https://umbi-blog.vercel.app/wellness/${params.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ['wellness', 'health', ...post.title.split(' ').slice(0, 5)],
    authors: [{ name: 'Umbi Team' }],
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image || '/og-image.png' }],
    },
  };
}

// 2. 정적 경로 생성
export async function generateStaticParams() {
  return posts
    .filter((post) => post.category === 'wellness')
    .map((post) => ({
      slug: post.slug,
    }));
}

// 3. 페이지 컴포넌트
export default function BlogPost({ params }: PageProps) {
  const post = posts.find(
    (p) => p.slug === params.slug && p.category === 'wellness'
  );

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://umbi-blog.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Wellness', item: 'https://umbi-blog.vercel.app/wellness' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://umbi-blog.vercel.app/wellness/${post.slug}` },
    ],
  };

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="min-h-screen bg-neutral-50">
        {/* 네비게이션 */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-custom py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-neutral-500 hover:text-neutral-900">Home</Link>
              <span className="text-neutral-300">/</span>
              <Link href="/wellness" className="text-neutral-500 hover:text-neutral-900">Wellness</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-900 font-medium line-clamp-1">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* 히어로 이미지 */}
        <div className="relative w-full h-[400px] md:h-[500px] bg-neutral-900">
          <Image
            src={post.image || '/placeholder.jpg'}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* 본문 내용 */}
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-100 text-purple-700">
                Wellness
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

            <div className="flex items-center gap-4 text-neutral-600 mb-8 pb-8 border-b border-neutral-200">
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  img: (props) => (
                    <span className="block relative w-full h-[400px] my-8 rounded-xl overflow-hidden shadow-lg">
                      <Image src={props.src as string} alt={props.alt as string} fill className="object-cover" />
                    </span>
                  ),
                  h2: (props) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                  p: (props) => <p className="mb-4 leading-relaxed text-neutral-700" {...props} />,
                  a: (props) => <a className="text-purple-600 hover:text-purple-700 underline font-medium" {...props} />,
                  blockquote: (props) => <blockquote className="border-l-4 border-purple-500 pl-4 italic my-4 text-neutral-700 bg-neutral-50 py-2" {...props} />,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-200">
              <Comments slug={post.slug} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}