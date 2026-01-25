'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  // .env.local 파일에 적은 변수명(NEXT_PUBLIC_GA_ID)과 똑같아야 합니다.
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
console.log('GA ID Check:', gaId);
  // ID가 없으면 로드하지 않음
  if (!gaId) return null;

  return (
    <>
      {/* 1. 구글 애널리틱스 스크립트 로드 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      
      {/* 2. 구글 애널리틱스 설정 초기화 */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}