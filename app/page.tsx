import { Suspense } from 'react';
import HomeClient from '@/components/HomeClient';
import { getAllPosts } from '@/lib/posts';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://umbi-blog.vercel.app',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Umbi',
  url: 'https://umbi-blog.vercel.app',
  description: 'Expert advice on personal finance, technology, and wellness. Actionable insights to help you make better decisions in life.',
  publisher: {
    '@type': 'Organization',
    name: 'Umbi',
    logo: {
      '@type': 'ImageObject',
      url: 'https://umbi-blog.vercel.app/logo.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://umbi-blog.vercel.app/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default async function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
        <HomeClient initialPosts={posts} />
      </Suspense>
    </>
  );
}
