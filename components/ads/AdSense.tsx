'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdLayout = 'in-article' | 'in-feed' | 'display';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid';
  adLayout?: AdLayout;
  fullWidthResponsive?: boolean;
  className?: string;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  adLayout,
  fullWidthResponsive = true,
  className = '',
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    isLoaded.current = true;

    try {
      const ads = window.adsbygoogle || [];
      ads.push({});
      window.adsbygoogle = ads;
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div ref={adRef} className={`ad-container my-8 overflow-hidden text-center ${className}`}>
      <p className="text-xs text-neutral-400 mb-1 uppercase tracking-wider">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6470985227057240"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(adLayout ? { 'data-ad-layout': adLayout } : {})}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

/** Pre-configured ad components for common placements */
export function InArticleAd({ adSlot }: { adSlot: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="fluid"
      adLayout="in-article"
      className="my-12"
    />
  );
}

export function DisplayAd({ adSlot }: { adSlot: string }) {
  return (
    <AdSense
      adSlot={adSlot}
      adFormat="auto"
      fullWidthResponsive={true}
    />
  );
}
