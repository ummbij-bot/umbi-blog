'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // sitemap이 아닐 때만 scripts 로드
    if (!pathname?.includes('sitemap') && !pathname?.includes('/api/')) {
      // Google Analytics
      const gaScript = document.createElement('script');
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-W9NQ9Y92KM';
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaInit = document.createElement('script');
      gaInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-W9NQ9Y92KM');
      `;
      document.head.appendChild(gaInit);

      // AdSense
      const adsScript = document.createElement('script');
      adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6470985227057240';
      adsScript.async = true;
      adsScript.crossOrigin = 'anonymous';
      document.head.appendChild(adsScript);
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}