import { notFound } from 'next/navigation';
import { posts } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AuthorBox from '@/components/blog/AuthorBox';
import ContentDisclaimer from '@/components/blog/ContentDisclaimer';
const Comments = dynamic(() => import('@/components/Comments'), {
  loading: () => <div className="mt-16 pt-12 border-t border-neutral-200 text-center py-8 text-neutral-400">Loading comments...</div>,
});
import { InArticleAd, DisplayAd } from '@/components/ads/AdSense';
import BlogCard from '@/components/blog/BlogCard';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

// Next.js 15 타입 수정
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const post = posts.find(
    (p) => p.slug === slug && p.category === 'wellness'
  );

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const url = `https://umbi-blog.vercel.app/wellness/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ['wellness', 'health', 'fitness', ...post.title.split(' ').slice(0, 5)],
    authors: [{ name: post.author || 'Umbi Team' }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author || 'Umbi Team'],
      section: 'Wellness',
      images: [{ url: post.image || '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image || '/og-image.png'],
    },
  };
}

export async function generateStaticParams() {
  return posts
    .filter((post) => post.category === 'wellness')
    .map((post) => ({
      slug: post.slug,
    }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  const post = posts.find(
    (p) => p.slug === slug && p.category === 'wellness'
  );

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter((p) => p.category === 'wellness' && p.slug !== post.slug)
    .slice(0, 3);

  const articleUrl = `https://umbi-blog.vercel.app/wellness/${post.slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://umbi-blog.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Wellness', item: 'https://umbi-blog.vercel.app/wellness' },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image || 'https://umbi-blog.vercel.app/og-image.png',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Umbi Team',
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
      '@id': articleUrl,
    },
    articleSection: 'Wellness',
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="min-h-screen bg-neutral-50">
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

        <div className="relative w-full h-[400px] md:h-[500px] bg-neutral-900">
          <Image
            src={post.image || '/placeholder.jpg'}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-100 text-purple-700">
                Wellness
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

            <ContentDisclaimer
              category={post.category}
              date={post.date}
              readTime={post.readTime}
              wordCount={post.content.split(/\s+/).filter(Boolean).length}
            />

            <InArticleAd adSlot="auto" />

            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  img: (props) => (
                    <span className="block relative w-full h-[400px] my-8 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={(props.src as string) || '/placeholder.jpg'}
                        alt={props.alt || 'Blog Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                      />
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

            <InArticleAd adSlot="auto" />

            {/* Author Profile */}
            <AuthorBox author={post.author} date={post.date} />

            {/* Interactive Tools CTA */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
              <h3 className="text-lg font-bold text-purple-800 mb-2">Try Our Free Wellness Tools</h3>
              <p className="text-purple-700 text-sm mb-4">Track your health metrics and get personalized wellness advice.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/wellness/tools/bmi-calculator" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                  BMI Calculator
                </Link>
                <Link href="/wellness/tools/ai-coach" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-700 border border-purple-200 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  AI Wellness Coach
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-200">
              <Comments slug={post.slug} />
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-neutral-200">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((rp) => (
                    <BlogCard
                      key={rp.slug}
                      title={rp.title}
                      excerpt={rp.excerpt}
                      date={rp.date}
                      category="Wellness"
                      slug={rp.slug}
                      image={rp.image}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}