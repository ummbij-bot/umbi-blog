import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Script from 'next/script';
import GoogleAnalytics from '@/components/GoogleAnalytics';  // 👈 추가

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Umbi - Finance, Tech, Wellness',
  description: 'Your guide to a better life.',
  verification: {
    google: '1QSlAE3jDipmCdo8vIUhI6ZAj3YWi-onN9ypVH8wfiE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6470985227057240"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <GoogleAnalytics />  {/* 👈 추가 */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}