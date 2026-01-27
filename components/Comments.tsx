'use client';

import { useEffect, useRef } from 'react';

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    // 기존 스크립트 제거
    const existingScript = commentsRef.current.querySelector('script');
    if (existingScript) {
      existingScript.remove();
    }

    // Giscus 스크립트 생성
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'ummbij-bot/umbi-blog'); // 여기에 본인 repo 입력
    script.setAttribute('data-repo-id', 'R_kgDORApzdQ'); // Giscus에서 받은 ID
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDORApzdc4C1ex9'); // Giscus에서 받은 ID
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    commentsRef.current.appendChild(script);
  }, [slug]);

  return (
    <div className="mt-16 pt-12 border-t border-neutral-200">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
          💬 Comments
        </h3>
        <p className="text-neutral-600">
          Share your thoughts and join the conversation!
        </p>
      </div>
      <div ref={commentsRef} className="giscus" />
    </div>
  );
}