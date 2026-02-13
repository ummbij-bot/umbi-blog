import { notFound } from 'next/navigation';
import { posts } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AuthorBox from '@/components/blog/AuthorBox';
import ContentDisclaimer from '@/components/blog/ContentDisclaimer';
import ReadingProgress from '@/components/blog/ReadingProgress';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import NewsletterCTA from '@/components/blog/NewsletterCTA';
const Comments = dynamic(() => import('@/components/Comments'), {
  loading: () => <div className="mt-16 pt-12 border-t border-stone-200 text-center py-8 text-stone-400">Loading comments...</div>,
});
import { InArticleAd } from '@/components/ads/AdSense';
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
    (p) => p.slug === slug && p.category === 'tech'
  );

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const url = `https://umbi-blog.vercel.app/tech/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ['tech', 'technology', 'productivity', ...post.title.split(' ').slice(0, 5)],
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
      section: 'Technology',
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
    .filter((post) => post.category === 'tech')
    .map((post) => ({
      slug: post.slug,
    }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  const post = posts.find(
    (p) => p.slug === slug && p.category === 'tech'
  );

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter((p) => p.category === 'tech' && p.slug !== post.slug)
    .slice(0, 3);

  const articleUrl = `https://umbi-blog.vercel.app/tech/${post.slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://umbi-blog.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Tech', item: 'https://umbi-blog.vercel.app/tech' },
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
    articleSection: 'Technology',
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      <ReadingProgress />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="min-h-screen bg-[#fefdfb]">
        <div className="bg-white border-b border-stone-200">
          <div className="container-custom py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-stone-400 hover:text-stone-700 transition-colors">Home</Link>
              <span className="text-stone-300">/</span>
              <Link href="/tech" className="text-stone-400 hover:text-stone-700 transition-colors">Tech</Link>
              <span className="text-stone-300">/</span>
              <span className="text-stone-700 font-medium line-clamp-1">{post.title}</span>
            </nav>
          </div>
        </div>

        <div className="relative w-full aspect-[2/1] max-h-[420px] bg-stone-900">
          <Image
            src={post.image || '/placeholder.jpg'}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container-custom">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-blue-500 text-white mb-4">
                  Tech
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <ContentDisclaimer
                    category={post.category}
                    date={post.date}
                    readTime={post.readTime}
                    wordCount={post.content.split(/\s+/).filter(Boolean).length}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-10">
          <div className="max-w-3xl mx-auto">
            {/* Share + Meta bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-200">
              <div className="text-sm text-stone-500">
                By <span className="font-medium text-stone-700">{post.author}</span>
              </div>
              <ShareButtons title={post.title} slug={post.slug} category="tech" />
            </div>

            {/* Table of Contents */}
            <TableOfContents content={post.content} />

            <InArticleAd adSlot="auto" />

            <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20">
              <ReactMarkdown
                components={{
                  img: (props) => (
                    <span className="block relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={(props.src as string) || '/placeholder.jpg'}
                        alt={props.alt || 'Blog Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                      />
                    </span>
                  ),
                  h2: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 60);
                    return <h2 id={id} className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-stone-900" {...props}>{children}</h2>;
                  },
                  h3: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 60);
                    return <h3 id={id} className="text-xl font-bold mt-8 mb-3 text-stone-800" {...props}>{children}</h3>;
                  },
                  p: (props) => <p className="mb-4 leading-relaxed text-stone-700" {...props} />,
                  blockquote: (props) => <blockquote className="border-l-4 border-blue-500 pl-4 my-6 text-stone-600 italic" {...props} />,
                  table: (props) => <div className="overflow-x-auto my-6"><table className="min-w-full" {...props} /></div>,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Bottom share */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-stone-200">
              <span className="text-sm text-stone-500">Enjoyed this article?</span>
              <ShareButtons title={post.title} slug={post.slug} category="tech" />
            </div>

            <InArticleAd adSlot="auto" />

            {/* Author Profile */}
            <AuthorBox author={post.author} date={post.date} />

            {/* Interactive Tools CTA */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Try Our Free Tech Tools</h3>
              <p className="text-blue-700 text-sm mb-4">Get personalized tech recommendations from our AI-powered advisor.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/tech/tools/ai-advisor" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  AI Tech Advisor
                </Link>
              </div>
            </div>

            <NewsletterCTA />

            <div className="mt-8 pt-8 border-t border-stone-200">
               <Comments slug={post.slug} />
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-stone-200">
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
                      category="Tech"
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
