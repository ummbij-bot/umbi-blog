import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';

const inter = localFont({
  src: '../public/fonts/Inter-Variable.woff2',
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://umbi-blog.vercel.app'),
  title: {
    default: 'Umbi - Personal Finance, Tech & Wellness Insights',
    template: '%s | Umbi'
  },
  description: 'Expert advice on personal finance, technology, and wellness. Actionable insights to help you make better decisions in life.',
  keywords: ['personal finance', 'financial advice', 'investing', 'budgeting', 'technology', 'productivity', 'wellness', 'mental health', 'AI tools'],
  authors: [{ name: 'Umbi Team' }],
  creator: 'Umbi',
  publisher: 'Umbi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://umbi-blog.vercel.app',
    siteName: 'Umbi',
    title: 'Umbi - Personal Finance, Tech & Wellness Insights',
    description: 'Expert advice on personal finance, technology, and wellness. Actionable insights to help you make better decisions in life.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Umbi - Personal Finance, Tech & Wellness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umbi - Personal Finance, Tech & Wellness Insights',
    description: 'Expert advice on personal finance, technology, and wellness.',
    images: ['/og-image.png'],
    creator: '@umbi',
  },
  // verification: { google: 'ADD_YOUR_GOOGLE_SEARCH_CONSOLE_CODE_HERE' },
  alternates: {
    canonical: 'https://umbi-blog.vercel.app',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6470985227057240"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Umbi',
              url: 'https://umbi-blog.vercel.app',
              logo: {
                '@type': 'ImageObject',
                url: 'https://umbi-blog.vercel.app/logo.png',
              },
              description: 'Expert advice on personal finance, technology, and wellness. Actionable insights to help you make better decisions in life.',
              email: 'ummbij@gmail.com',
              sameAs: [
                'https://github.com/ummbij-bot/umbi-blog',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <Navbar />
        {children}
        <Footer />
        
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}