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
    category: string;
    slug: string;
  };
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = posts.find(
    (p) => p.slug === params.slug && p.category === params.category,
  );

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const url = `https://umbi-blog.vercel.app/${params.category}/${params.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, ...post.title.split(' ').slice(0, 5)],
    authors: [{ name: 'Umbi Team' }],
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: ['Umbi Team'],
      images: [
        {
          url: post.image || 'https://umbi-blog.vercel.app/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : ['/og-image.png'],
      creator: '@umbi',
    },
    alternates: {
      canonical: url,
    },
  };
}

// Static params 생성
export async function generateStaticParams() {
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: PageProps) {
  const post = posts.find(
    (p) => p.slug === params.slug && p.category === params.category,
  );

  if (!post) {
    notFound();
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://umbi-blog.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.category.charAt(0).toUpperCase() + post.category.slice(1),
        item: `https://umbi-blog.vercel.app/${post.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://umbi-blog.vercel.app/${post.category}/${post.slug}`,
      },
    ],
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Umbi Team',
      url: 'https://umbi-blog.vercel.app/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Umbi',
      logo: {
        '@type': 'ImageObject',
        url: 'https://umbi-blog.vercel.app/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://umbi-blog.vercel.app/${post.category}/${post.slug}`,
    },
  };

  return (
    <>
      {/* Structured Data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen bg-neutral-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-custom py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-neutral-500 hover:text-neutral-900"
              >
                Home
              </Link>
              <span className="text-neutral-300">/</span>
              <Link
                href={`/${post.category}`}
                className="text-neutral-500 hover:text-neutral-900 capitalize"
              >
                {post.category}
              </Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-900 font-medium line-clamp-1">
                {post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[400px] md:h-[500px] bg-neutral-900">
        <Image
  src={post.image || '/placeholder.jpg'}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            {/* Category Badge */}
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                  post.category === 'finance'
                    ? 'bg-emerald-100 text-emerald-700'
                    : post.category === 'tech'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                }`}
              >
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-neutral-600 mb-8 pb-8 border-b border-neutral-200">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>5 min read</span>
            </div>

            {/* Excerpt */}
            <div className="text-xl text-neutral-700 leading-relaxed mb-8 bg-neutral-100 p-6 rounded-2xl border-l-4 border-emerald-500">
              {post.excerpt}
            </div>

            {/* Content - 마크다운 렌더링 */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  // 이미지 최적화
        img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const src = typeof props.src === 'string' ? props.src : '/placeholder.jpg';
  const alt = typeof props.alt === 'string' ? props.alt : '';
  
  return (
    <span className="block relative w-full h-[400px] my-8 rounded-xl overflow-hidden shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    </span>
  );
},
                  // 제목
                  h2: (props) => (
                    <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />
                  ),
                  h3: (props) => (
                    <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />
                  ),
                  // 본문
                  p: (props) => (
                    <p
                      className="mb-4 leading-relaxed text-neutral-700"
                      {...props}
                    />
                  ),
                  // 리스트
                  ul: (props) => (
                    <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
                  ),
                  ol: (props) => (
                    <ol
                      className="list-decimal pl-6 mb-4 space-y-2"
                      {...props}
                    />
                  ),
                  li: (props) => <li className="leading-relaxed" {...props} />,
                  // 인용문
                  blockquote: (props) => (
                    <blockquote
                      className="border-l-4 border-emerald-500 pl-4 italic my-4 text-neutral-700 bg-neutral-50 py-2"
                      {...props}
                    />
                  ),
                  // 코드
                  code: ({
                    inline,
                    children,
                    ...props
                  }: {
                    inline?: boolean;
                    children?: React.ReactNode;
                  }) =>
                    inline ? (
                      <code
                        className="bg-neutral-100 px-2 py-1 rounded text-sm font-mono text-emerald-700"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <code
                        className="block bg-neutral-900 text-white p-4 rounded-lg my-4 overflow-x-auto font-mono text-sm"
                        {...props}
                      >
                        {children}
                      </code>
                    ),
                  // 링크
                  a: (props) => (
                    <a
                      className="text-emerald-600 hover:text-emerald-700 underline font-medium"
                      {...props}
                    />
                  ),
                  // 굵은 글씨
                  strong: (props) => (
                    <strong className="font-bold text-neutral-900" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center gap-4">
                <span className="font-bold text-neutral-900">Share:</span>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://umbi-blog.vercel.app/${post.category}/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Twitter
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://umbi-blog.vercel.app/${post.category}/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Comments */}
            <Comments slug={post.slug} />
          </div>
        </div>
      </article>
    </>
  );
}
