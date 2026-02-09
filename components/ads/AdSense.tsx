'use client';

import { useEffect } from 'react';

// 1. Window 객체에 adsbygoogle이 있다는 것을 정식으로 선언합니다.
// any 대신 unknown[]을 사용하여 ESLint 에러를 방지합니다.
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto',
  fullWidthResponsive = true 
}: AdSenseProps) {
  useEffect(() => {
    try {
      // 2. 이제 window.adsbygoogle을 바로 사용할 수 있습니다.
      // (window as any) 같은 편법을 쓰지 않아도 됩니다.
      const ads = window.adsbygoogle || [];
      ads.push({});
      window.adsbygoogle = ads;
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="my-8 overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6470985227057240"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}